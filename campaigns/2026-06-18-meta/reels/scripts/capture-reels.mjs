/**
 * capture-reels.mjs
 * Renders HTML reel animations and exports Meta-ready MP4s.
 *
 * Isolates each [data-screen-label] 9:16 screen, then captures frames by
 * seeking the CSS animation timeline (not wall-clock) so screenshot latency
 * cannot cause multiple loops. Ends with a frozen CTA hold.
 *
 * Prerequisites (repo root):
 *   npm install
 *   npx playwright install chromium
 *   ffmpeg in PATH — WSL: sudo apt install ffmpeg
 *
 * Run:
 *   npm run capture:reels
 *
 * Output (campaigns/2026-06-18-meta/output/):
 *   reel-<slug>.mp4 per discovered 9:16 screen
 *   preview-<slug>.png — frame grab to verify
 */

import { chromium } from 'playwright';
import { execSync, spawnSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname    = dirname(fileURLToPath(import.meta.url));
const CAMPAIGN_DIR = resolve(__dirname, '../..');
const SOURCE_DIR   = resolve(CAMPAIGN_DIR, 'meta-ads-for-prep-service/project');
const OUTPUT_DIR   = resolve(CAMPAIGN_DIR, 'output');

// Standalone files to capture from (in order). Both are always processed.
// dc.html versions are kept as fallbacks in case the standalone isn't exported yet.
const HTML_CANDIDATES_ORDERED = [
  [
    'Albert Prep - Reels Animees (standalone).html',
    'Meta Ads Reels Animees.dc.html',
  ],
  [
    'Albert Prep - Reels Variantes (standalone).html',
    'Meta Ads Reels Variantes.dc.html',
  ],
];

const WIDTH            = 1080;
const HEIGHT           = 1920;
const FPS              = 30;
const SPEED            = 1.5;   // playback speed multiplier
const LOOP_MS          = 8500;  // CSS animation duration (timeline ms)
const CTA_SNAPSHOT_MS  = 7750;  // ~91% of loop — CTA fully visible
const CTA_HOLD_MS      = 2000;  // CTA freeze duration at 1× (divided by SPEED)
const SETTLE_MS        = 1500;

/** Returns the first existing file in a list of candidates. */
function findHtmlFile(candidates) {
  for (const name of candidates) {
    const path = join(SOURCE_DIR, name);
    if (existsSync(path)) return path;
  }
  return null;
}

/** Returns all resolvable HTML files (one per candidate group). */
function findHtmlFiles() {
  return HTML_CANDIDATES_ORDERED
    .map(findHtmlFile)
    .filter(Boolean);
}

function slugFromLabel(label) {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function waitForPageReady(page) {
  const hasBundler = (await page.locator('#__bundler_loading').count()) > 0;
  if (hasBundler) {
    await page.waitForFunction(() => {
      const loading = document.getElementById('__bundler_loading');
      if (!loading) return true;
      const text = loading.textContent || '';
      return !text.includes('Unpacking') && !text.startsWith('Error');
    }, { timeout: 60000 }).catch(() => {});
  }

  await page.waitForSelector('[data-screen-label]', { timeout: 60000 });
  await page.waitForTimeout(SETTLE_MS);
}

async function discoverReelScreens(page) {
  const labels = await page.$$eval('[data-screen-label]', (nodes) =>
    nodes
      .filter((el) => {
        const label = el.getAttribute('data-screen-label') || '';
        const h = el.style.height;
        return label.includes('9:16') || h === '1920px';
      })
      .map((el) => el.getAttribute('data-screen-label'))
  );
  return [...new Set(labels)];
}

async function isolateReelScreen(page, screenLabel) {
  const found = await page.evaluate((label) => {
    const screen = document.querySelector(`[data-screen-label="${label}"]`);
    if (!screen) return false;

    const bg = window.getComputedStyle(screen).backgroundColor || '#000000';

    screen.style.setProperty('transform', 'none', 'important');
    screen.style.setProperty('transform-origin', 'top left', 'important');
    screen.style.setProperty('width', '1080px', 'important');
    screen.style.setProperty('height', '1920px', 'important');
    screen.style.setProperty('position', 'fixed', 'important');
    screen.style.setProperty('top', '0', 'important');
    screen.style.setProperty('left', '0', 'important');
    screen.style.setProperty('margin', '0', 'important');
    screen.style.setProperty('z-index', '99999', 'important');
    screen.style.setProperty('overflow', 'hidden', 'important');
    screen.style.setProperty('box-shadow', 'none', 'important');
    screen.style.setProperty('border-radius', '0', 'important');

    document.documentElement.style.cssText =
      'margin:0;padding:0;overflow:hidden;width:1080px;height:1920px';
    document.body.style.cssText =
      `margin:0;padding:0;overflow:hidden;width:1080px;height:1920px;background:${bg}`;

    document.body.appendChild(screen);

    for (const child of [...document.body.children]) {
      if (child !== screen) child.remove();
    }

    for (const id of ['__bundler_loading', '__bundler_thumbnail', '__bundler_err']) {
      document.getElementById(id)?.remove();
    }

    return true;
  }, screenLabel);

  if (!found) {
    throw new Error(`Screen not found: ${screenLabel}`);
  }

  await page.waitForTimeout(300);
}

/** Pause CSS animations and seek to a point on the timeline (ms). */
async function seekAnimations(page, timeMs) {
  await page.evaluate((t) => {
    for (const anim of document.getAnimations({ subtree: true })) {
      anim.pause();
      const duration = anim.effect?.getComputedTiming?.()?.duration;
      anim.currentTime =
        duration && duration > 0 && duration !== Infinity
          ? t % duration
          : t;
    }
  }, timeMs);
}

async function prepareAnimationCapture(page) {
  // Let Web Animations API register running CSS animations, then freeze at t=0
  await page.waitForTimeout(500);
  await seekAnimations(page, 0);
}

function checkFfmpeg() {
  const result = spawnSync('ffmpeg', ['-version'], { stdio: 'pipe' });
  if (result.status !== 0 && result.error) {
    console.error('ffmpeg not found. Install it first:');
    console.error('  WSL / Linux : sudo apt install ffmpeg');
    console.error('  Windows     : https://ffmpeg.org/download.html');
    process.exit(1);
  }
}

function framesToMp4(framesDir, mp4Path) {
  console.log(`   Encoding  → ${mp4Path}`);
  execSync(
    `ffmpeg -y -framerate ${FPS} ` +
    `-i "${join(framesDir, 'frame-%05d.png')}" ` +
    `-c:v libx264 -preset fast -crf 18 ` +
    `-pix_fmt yuv420p -movflags +faststart ` +
    `"${mp4Path}"`,
    { stdio: 'inherit' }
  );
}

async function recordReel(browser, htmlFile, screenLabel, slug) {
  console.log(`\n▶  Recording ${screenLabel}…`);

  const context = await browser.newContext({
    viewport:          { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on('console', () => {});
  page.on('pageerror', (err) => console.error('   Page error:', err.message));

  // Load + isolate BEFORE any frames are captured
  await page.goto(`file://${htmlFile}`);
  await waitForPageReady(page);
  await isolateReelScreen(page, screenLabel);
  await prepareAnimationCapture(page);

  const previewPath = join(OUTPUT_DIR, `preview-${slug}.png`);
  await seekAnimations(page, CTA_SNAPSHOT_MS);
  await page.screenshot({
    path: previewPath,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });
  console.log(`   Preview saved → ${previewPath}`);

  const framesDir = join(OUTPUT_DIR, `.frames-${slug}`);
  if (existsSync(framesDir)) rmSync(framesDir, { recursive: true });
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

  // Freeze on CTA peak — duplicate frames, animation stays paused at CTA_SNAPSHOT_MS
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
  framesToMp4(framesDir, mp4Path);
  rmSync(framesDir, { recursive: true });

  return mp4Path;
}

async function main() {
  checkFfmpeg();

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const htmlFiles = findHtmlFiles();

  if (htmlFiles.length === 0) {
    console.error('No HTML source files found. Expected in meta-ads-for-prep-service/project/:');
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
    const labels = await discoverReelScreens(probe);
    await probe.close();

    if (labels.length === 0) {
      console.warn(`   ⚠️  No 9:16 screens found — skipping.`);
      continue;
    }

    console.log(`   Found ${labels.length} screen(s): ${labels.map(l => `"${l}"`).join(', ')}`);

    for (const label of labels) {
      const slug = slugFromLabel(label) || `reel-${++reelIndex}`;
      const mp4Path = await recordReel(browser, htmlFile, label, slug);
      outputs.push(mp4Path);
    }
  }

  await browser.close();

  console.log('\n🎬  Done!');
  for (const path of outputs) {
    console.log(`   ${path}`);
  }
  console.log('\n   Check preview-*.png — should show only the ad, not the design board.');
  console.log('   Meta specs: MP4 · 9:16 · 1080×1920 · H.264 · < 4 GB');
}

main().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
