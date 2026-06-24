#!/usr/bin/env node
/**
 * Export animated HTML reel screens to MP4 (+ preview PNG).
 *
 * Seeks the CSS animation timeline frame-by-frame (not wall-clock), then encodes
 * with ffmpeg. Same approach as the paid campaign capture-reels script.
 *
 * Prerequisites (repo root):
 *   npm install
 *   npx playwright install chromium
 *   ffmpeg in PATH
 *
 * Examples:
 *   node tools/html-to-mp4.mjs design-export/project/reels.html --all
 *   node tools/html-to-mp4.mjs design-export/project/reels.html --screen "Reel Première 9:16"
 *   node tools/html-to-mp4.mjs reels.html --all --loop-ms 8500 --speed 1.5 --cta-ms 7750
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import {
  checkFfmpeg,
  cleanupFramesDir,
  defaultOutputDir,
  discoverScreens,
  ensureDir,
  framesToMp4,
  muxReelAudio,
  isolateScreen,
  openHtmlPage,
  parseArgs,
  prepareAnimationCapture,
  printUsage,
  resolveHtmlInput,
  seekAnimations,
  slugFromLabel,
  waitForPageReady,
} from './lib/html-render.mjs';

const ARG_SPEC = {
  all: { type: 'flag' },
  screen: { type: 'string' },
  out: { type: 'string' },
  aspect: { type: 'string' },
  fps: { type: 'number' },
  speed: { type: 'number' },
  'loop-ms': { type: 'number' },
  'cta-ms': { type: 'number' },
  'cover-hold-ms': { type: 'number' },
  audio: { type: 'string' },
};

const DEFAULTS = {
  fps: 30,
  speed: 1.5,
  loopMs: 8500,
  ctaMs: 7750,
  ctaHoldMs: 2000,
  coverHoldMs: 1000,
  aspect: '9:16',
};

function usage() {
  printUsage('html-to-mp4', [
    '<html-file>                 Input HTML path',
    '--all                       Export every matching screen (default when --screen omitted)',
    '--screen <label>            Export one labeled screen',
    '--out <dir>                 Output directory (default: <html-dir>/output)',
    '--aspect <ratio>            Filter screens (default: 9:16)',
    '--fps <n>                   Frame rate (default: 30)',
    '--speed <n>                 Playback speed multiplier (default: 1.5)',
    '--loop-ms <ms>              CSS animation loop length (default: 8500; auto from data-loop-ms)',
    '--cta-ms <ms>               Timeline point for CTA preview/hold (default: 7750; auto from data-cta-ms)',
    '--cta-hold-ms <ms>          Frozen CTA duration at 1× (default: 2000)',
    '--cover-hold-ms <ms>        Frozen cover frame prepended to MP4 at 1× (default: 1000)',
    '--audio <mode>              Mux audio after encode: ticks (countdown beeps + reveal chime)',
  ]);
}

async function recordScreen(browser, htmlFile, screenLabel, slug, outputDir, cfg, globalOptions = {}) {
  console.log(`\n▶  Recording ${screenLabel}…`);

  const probeCtx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const probe = await probeCtx.newPage();
  await probe.goto(`file://${htmlFile}`);
  await waitForPageReady(probe);
  const dims = await probe.evaluate((label) => {
    const screen = document.querySelector(`[data-screen-label="${label}"]`);
    if (!screen) return null;
    return {
      width: parseInt(screen.style.width, 10) || 1080,
      height: parseInt(screen.style.height, 10) || 1920,
    };
  }, screenLabel);
  await probeCtx.close();

  if (!dims) throw new Error(`Screen not found: ${screenLabel}`);

  const { context, page } = await openHtmlPage(
    browser,
    htmlFile,
    dims.width,
    dims.height
  );

  await waitForPageReady(page);
  await isolateScreen(page, screenLabel);

  const screenTiming = await page.evaluate((label) => {
    const screen = document.querySelector(`[data-screen-label="${label}"]`);
    if (!screen) return null;
    const loopMs = parseInt(screen.dataset.loopMs, 10);
    const ctaMs = parseInt(screen.dataset.ctaMs, 10);
    const coverMs = parseInt(screen.dataset.coverMs, 10);
    const timerSec = parseInt(screen.dataset.timerSec, 10);
    return {
      loopMs: Number.isFinite(loopMs) && loopMs > 0 ? loopMs : null,
      ctaMs: Number.isFinite(ctaMs) && ctaMs > 0 ? ctaMs : null,
      coverMs: Number.isFinite(coverMs) && coverMs > 0 ? coverMs : null,
      timerSec: Number.isFinite(timerSec) && timerSec > 0 ? timerSec : 5,
    };
  }, screenLabel);

  if (screenTiming?.loopMs) cfg.loopMs = screenTiming.loopMs;
  if (screenTiming?.ctaMs) cfg.ctaMs = screenTiming.ctaMs;
  if (screenTiming?.coverMs) cfg.coverMs = screenTiming.coverMs;
  else cfg.coverMs = 2500;

  await prepareAnimationCapture(page);

  const clip = { x: 0, y: 0, width: dims.width, height: dims.height };
  const gridY = Math.round((dims.height - dims.width) / 2);

  await seekAnimations(page, cfg.coverMs);
  const coverPath = join(outputDir, `cover-${slug}.png`);
  await page.screenshot({ path: coverPath, clip });
  console.log(`   Cover saved → ${coverPath}`);

  const cover1x1Path = join(outputDir, `cover-${slug}-1x1.png`);
  await page.screenshot({
    path: cover1x1Path,
    clip: { x: 0, y: gridY, width: dims.width, height: dims.width },
  });
  console.log(`   Cover 1:1 saved → ${cover1x1Path}`);

  const previewPath = join(outputDir, `preview-${slug}.png`);
  await page.screenshot({ path: previewPath, clip });
  console.log(`   Preview saved → ${previewPath}`);

  const framesDir = join(outputDir, `.frames-${slug}`);
  cleanupFramesDir(framesDir);
  mkdirSync(framesDir, { recursive: true });

  const loopFrameCount = Math.round((cfg.loopMs / cfg.speed / 1000) * cfg.fps);
  const holdFrameCount = Math.round((cfg.ctaHoldMs / cfg.speed / 1000) * cfg.fps);
  const coverHoldFrameCount = Math.round((cfg.coverHoldMs / cfg.speed / 1000) * cfg.fps);
  const totalSec = ((coverHoldFrameCount + loopFrameCount + holdFrameCount) / cfg.fps).toFixed(1);

  console.log(
    `   ${cfg.speed}× · ${coverHoldFrameCount} cover + ${loopFrameCount} loop + ${holdFrameCount} hold · ~${totalSec}s @ ${cfg.fps} fps`
  );

  let frameIndex = 0;

  await seekAnimations(page, cfg.coverMs);
  for (let k = 0; k < coverHoldFrameCount; k++) {
    await page.screenshot({
      path: join(framesDir, `frame-${String(frameIndex).padStart(5, '0')}.png`),
      clip,
    });
    frameIndex++;
  }

  for (let i = 0; i < loopFrameCount; i++) {
    const timeMs = Math.min(Math.round((i / cfg.fps) * 1000 * cfg.speed), cfg.loopMs - 1);
    await seekAnimations(page, timeMs);
    await page.screenshot({
      path: join(framesDir, `frame-${String(frameIndex).padStart(5, '0')}.png`),
      clip,
    });
    frameIndex++;
  }

  for (let j = 0; j < holdFrameCount; j++) {
    await seekAnimations(page, cfg.ctaMs);
    await page.screenshot({
      path: join(framesDir, `frame-${String(frameIndex).padStart(5, '0')}.png`),
      clip,
    });
    frameIndex++;
  }

  await context.close();

  const mp4Path = join(outputDir, `reel-${slug}.mp4`);
  framesToMp4(framesDir, mp4Path, cfg.fps);
  cleanupFramesDir(framesDir);

  if (globalOptions.audio === 'ticks') {
    muxReelAudio(mp4Path, {
      timerSec: screenTiming?.timerSec ?? 5,
      speed: cfg.speed,
      coverHoldMs: cfg.coverHoldMs,
    });
  }

  console.log(`   ${mp4Path}`);
  return mp4Path;
}

async function main() {
  checkFfmpeg();

  let positional;
  let options;

  try {
    ({ positional, options } = parseArgs(process.argv.slice(2), ARG_SPEC));
  } catch (err) {
    usage();
    console.error(`\n${err.message}`);
    process.exit(1);
  }

  if (positional.length === 0) {
    usage();
    process.exit(1);
  }

  const htmlFile = resolveHtmlInput(positional[0]);
  const outputDir = ensureDir(options.out ? join(process.cwd(), options.out) : defaultOutputDir(htmlFile));

  const cfg = {
    fps: options.fps ?? DEFAULTS.fps,
    speed: options.speed ?? DEFAULTS.speed,
    loopMs: options['loop-ms'] ?? DEFAULTS.loopMs,
    ctaMs: options['cta-ms'] ?? DEFAULTS.ctaMs,
    ctaHoldMs: options['cta-hold-ms'] ?? DEFAULTS.ctaHoldMs,
    coverHoldMs: options['cover-hold-ms'] ?? DEFAULTS.coverHoldMs,
    coverMs: 2500,
  };

  const aspect = options.aspect ?? DEFAULTS.aspect;

  console.log(`HTML → MP4`);
  console.log(`   Source : ${htmlFile}`);
  console.log(`   Output : ${outputDir}`);

  const browser = await chromium.launch({ headless: true });
  const outputs = [];

  try {
    const probe = await browser.newPage();
    await probe.goto(`file://${htmlFile}`);
    await waitForPageReady(probe);
    const labels = await discoverScreens(probe, { aspect });
    await probe.close();

    if (labels.length === 0) {
      throw new Error(`No screens matched aspect "${aspect}". Check [data-screen-label] markers.`);
    }

    const selected = options.screen
      ? labels.filter((l) => l === options.screen)
      : labels;

    if (options.screen && selected.length === 0) {
      throw new Error(`Screen not found: "${options.screen}". Available: ${labels.join(', ')}`);
    }

    console.log(`   Screens (${selected.length}): ${selected.map((l) => `"${l}"`).join(', ')}`);

    let index = 0;
    for (const label of selected) {
      const slug = slugFromLabel(label) || `reel-${++index}`;
      outputs.push(await recordScreen(browser, htmlFile, label, slug, outputDir, cfg, options));
    }
  } finally {
    await browser.close();
  }

  console.log('\nDone!');
  for (const path of outputs) console.log(`   ${path}`);
  console.log('\n   Meta specs: MP4 · H.264 · yuv420p · < 4 GB');
}

main().catch((err) => {
  console.error('\nError:', err.message);
  process.exit(1);
});
