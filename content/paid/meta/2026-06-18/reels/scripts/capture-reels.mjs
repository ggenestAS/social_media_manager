/**
 * capture-reels.mjs
 * Campaign batch wrapper — scans known HTML sources and exports Meta-ready MP4s.
 *
 * Uses shared rendering in tools/lib/html-render.mjs.
 *
 * Run: npm run capture:reels
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import {
  checkFfmpeg,
  cleanupFramesDir,
  discoverScreens,
  framesToMp4,
  isolateScreen,
  prepareAnimationCapture,
  seekAnimations,
  slugFromLabel,
  waitForPageReady,
} from '../../../../../tools/lib/html-render.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CAMPAIGN_DIR = resolve(__dirname, '../..');
const SOURCE_DIR = resolve(CAMPAIGN_DIR, 'design-export/project');
const OUTPUT_DIR = resolve(CAMPAIGN_DIR, 'output');

const HTML_CANDIDATES_ORDERED = [
  ['Albert Prep - Reels Animees (standalone).html', 'Meta Ads Reels Animees.dc.html'],
  ['Albert Prep - Reels Variantes (standalone).html', 'Meta Ads Reels Variantes.dc.html'],
];

const FPS = 30;
const SPEED = 1.5;
const LOOP_MS = 8500;
const CTA_SNAPSHOT_MS = 7750;
const CTA_HOLD_MS = 2000;
const WIDTH = 1080;
const HEIGHT = 1920;

function findHtmlFile(candidates) {
  for (const name of candidates) {
    const path = join(SOURCE_DIR, name);
    if (existsSync(path)) return path;
  }
  return null;
}

function findHtmlFiles() {
  return HTML_CANDIDATES_ORDERED.map(findHtmlFile).filter(Boolean);
}

async function recordReel(browser, htmlFile, screenLabel, slug) {
  console.log(`\n▶  Recording ${screenLabel}…`);

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on('console', () => {});
  page.on('pageerror', (err) => console.error('   Page error:', err.message));

  await page.goto(`file://${htmlFile}`);
  await waitForPageReady(page);
  await isolateScreen(page, screenLabel);
  await prepareAnimationCapture(page);

  const previewPath = join(OUTPUT_DIR, `preview-${slug}.png`);
  await seekAnimations(page, CTA_SNAPSHOT_MS);
  await page.screenshot({
    path: previewPath,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });
  console.log(`   Preview saved → ${previewPath}`);

  const framesDir = join(OUTPUT_DIR, `.frames-${slug}`);
  cleanupFramesDir(framesDir);
  mkdirSync(framesDir, { recursive: true });

  const clip = { x: 0, y: 0, width: WIDTH, height: HEIGHT };
  const loopFrameCount = Math.round((LOOP_MS / SPEED / 1000) * FPS);
  const holdFrameCount = Math.round((CTA_HOLD_MS / SPEED / 1000) * FPS);
  const totalSec = ((loopFrameCount + holdFrameCount) / FPS).toFixed(1);

  let frameIndex = 0;
  console.log(
    `   ${SPEED}× speed · ${loopFrameCount} loop frames + ${holdFrameCount} CTA hold · ~${totalSec}s @ ${FPS} fps`
  );

  for (let i = 0; i < loopFrameCount; i++) {
    const timeMs = Math.min(Math.round((i / FPS) * 1000 * SPEED), LOOP_MS - 1);
    await seekAnimations(page, timeMs);
    await page.screenshot({
      path: join(framesDir, `frame-${String(frameIndex).padStart(5, '0')}.png`),
      clip,
    });
    frameIndex++;
  }

  for (let j = 0; j < holdFrameCount; j++) {
    await seekAnimations(page, CTA_SNAPSHOT_MS);
    await page.screenshot({
      path: join(framesDir, `frame-${String(frameIndex).padStart(5, '0')}.png`),
      clip,
    });
    frameIndex++;
  }

  await context.close();

  const mp4Path = join(OUTPUT_DIR, `reel-${slug}.mp4`);
  framesToMp4(framesDir, mp4Path, FPS);
  cleanupFramesDir(framesDir);

  return mp4Path;
}

async function main() {
  checkFfmpeg();

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const htmlFiles = findHtmlFiles();
  if (htmlFiles.length === 0) {
    console.error('No HTML source files found. Expected in design-export/project/:');
    for (const group of HTML_CANDIDATES_ORDERED) {
      console.error(`  (one of) ${group.join(', ')}`);
    }
    process.exit(1);
  }

  console.log(`   Source files (${htmlFiles.length}):`);
  for (const f of htmlFiles) console.log(`     ${f}`);

  const browser = await chromium.launch({ headless: true });
  const outputs = [];
  let reelIndex = 0;

  for (const htmlFile of htmlFiles) {
    console.log(`\n── Scanning ${htmlFile.split('/').pop() || htmlFile} ──`);

    const probe = await browser.newPage();
    await probe.goto(`file://${htmlFile}`);
    await waitForPageReady(probe);
    const labels = await discoverScreens(probe, { aspect: '9:16' });
    await probe.close();

    if (labels.length === 0) {
      console.warn('   ⚠️  No 9:16 screens found — skipping.');
      continue;
    }

    console.log(`   Found ${labels.length} screen(s): ${labels.map((l) => `"${l}"`).join(', ')}`);

    for (const label of labels) {
      const slug = slugFromLabel(label) || `reel-${++reelIndex}`;
      outputs.push(await recordReel(browser, htmlFile, label, slug));
    }
  }

  await browser.close();

  console.log('\n🎬  Done!');
  for (const path of outputs) console.log(`   ${path}`);
  console.log('\n   Check preview-*.png — should show only the ad, not the design board.');
  console.log('   Meta specs: MP4 · 9:16 · 1080×1920 · H.264 · < 4 GB');
}

main().catch((err) => {
  console.error('\nError:', err.message);
  process.exit(1);
});
