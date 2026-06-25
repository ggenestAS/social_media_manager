/**
 * Shared Playwright helpers for rendering Albert Prep HTML design exports.
 * Used by tools/html-to-image.mjs, tools/html-to-mp4.mjs, and campaign capture scripts.
 */

import { execSync, spawnSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join, resolve } from 'path';

export function slugFromLabel(label) {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function resolveHtmlInput(inputPath) {
  const resolved = resolve(inputPath);
  if (!existsSync(resolved)) {
    throw new Error(`HTML file not found: ${resolved}`);
  }
  return resolved;
}

export async function waitForPageReady(page, settleMs = 1500) {
  const hasBundler = (await page.locator('#__bundler_loading').count()) > 0;
  if (hasBundler) {
    await page
      .waitForFunction(
        () => {
          const loading = document.getElementById('__bundler_loading');
          if (!loading) return true;
          const text = loading.textContent || '';
          return !text.includes('Unpacking') && !text.startsWith('Error');
        },
        { timeout: 60000 }
      )
      .catch(() => {});
  }

  const hasScreens = (await page.locator('[data-screen-label]').count()) > 0;
  if (hasScreens) {
    await page.waitForSelector('[data-screen-label]', { timeout: 60000 });
  }

  await page.waitForTimeout(settleMs);
}

export async function discoverScreens(page, { aspect } = {}) {
  const labels = await page.$$eval('[data-screen-label]', (nodes, aspectFilter) => {
    return nodes
      .filter((el) => {
        const label = el.getAttribute('data-screen-label') || '';
        const h = el.style.height;
        const w = el.style.width;

        if (!aspectFilter) return true;
        if (aspectFilter === '9:16') return label.includes('9:16') || h === '1920px';
        if (aspectFilter === '4:5') return label.includes('4:5') || (w === '1080px' && h === '1350px');
        if (aspectFilter === '1:1') return label.includes('1:1') || (w === '1080px' && h === '1080px');
        return label.includes(aspectFilter);
      })
      .map((el) => el.getAttribute('data-screen-label'));
  }, aspect ?? null);

  return [...new Set(labels)];
}

export async function getScreenDimensions(page, screenLabel) {
  return page.evaluate((label) => {
    const screen = document.querySelector(`[data-screen-label="${label}"]`);
    if (!screen) return null;

    const width = parseInt(screen.style.width, 10) || screen.offsetWidth || 1080;
    const height = parseInt(screen.style.height, 10) || screen.offsetHeight || 1920;
    return { width, height };
  }, screenLabel);
}

export async function isolateScreen(page, screenLabel) {
  const dims = await page.evaluate((label) => {
    const screen = document.querySelector(`[data-screen-label="${label}"]`);
    if (!screen) return null;

    const width = parseInt(screen.style.width, 10) || 1080;
    const height = parseInt(screen.style.height, 10) || 1920;
    const bg = window.getComputedStyle(screen).backgroundColor || '#000000';

    screen.style.setProperty('transform', 'none', 'important');
    screen.style.setProperty('transform-origin', 'top left', 'important');
    screen.style.setProperty('width', `${width}px`, 'important');
    screen.style.setProperty('height', `${height}px`, 'important');
    screen.style.setProperty('position', 'fixed', 'important');
    screen.style.setProperty('top', '0', 'important');
    screen.style.setProperty('left', '0', 'important');
    screen.style.setProperty('margin', '0', 'important');
    screen.style.setProperty('z-index', '99999', 'important');
    screen.style.setProperty('overflow', 'hidden', 'important');
    screen.style.setProperty('box-shadow', 'none', 'important');
    screen.style.setProperty('border-radius', '0', 'important');

    document.documentElement.style.cssText =
      `margin:0;padding:0;overflow:hidden;width:${width}px;height:${height}px`;
    document.body.style.cssText =
      `margin:0;padding:0;overflow:hidden;width:${width}px;height:${height}px;background:${bg}`;

    document.body.appendChild(screen);

    for (const child of [...document.body.children]) {
      if (child !== screen) child.remove();
    }

    for (const id of ['__bundler_loading', '__bundler_thumbnail', '__bundler_err']) {
      document.getElementById(id)?.remove();
    }

    return { width, height, bg };
  }, screenLabel);

  if (!dims) {
    throw new Error(`Screen not found: ${screenLabel}`);
  }

  await page.waitForTimeout(300);
  return dims;
}

export async function fitHeroCalcs(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const MAX = 180;
    const MIN = 72;
    for (const el of document.querySelectorAll('.hero-calc')) {
      const box = el.closest('.body') || el.parentElement;
      if (!box) continue;
      const maxW = box.clientWidth;
      let size = MAX;
      el.style.fontSize = `${size}px`;
      while (el.scrollWidth > maxW && size > MIN) {
        size -= 2;
        el.style.fontSize = `${size}px`;
      }
    }
  });
}

export async function seekAnimations(page, timeMs) {
  await page.evaluate((t) => {
    for (const anim of document.getAnimations({ subtree: true })) {
      anim.pause();
      const duration = anim.effect?.getComputedTiming?.()?.duration;
      anim.currentTime =
        duration && duration > 0 && duration !== Infinity ? t % duration : t;
    }
  }, timeMs);
}

export async function prepareAnimationCapture(page) {
  await page.waitForTimeout(500);
  await seekAnimations(page, 0);
}

export function checkFfmpeg() {
  const result = spawnSync('ffmpeg', ['-version'], { stdio: 'pipe' });
  if (result.status !== 0 && result.error) {
    console.error('ffmpeg not found. Install it first:');
    console.error('  WSL / Linux : sudo apt install ffmpeg');
    console.error('  Windows     : https://ffmpeg.org/download.html');
    process.exit(1);
  }
}

export function framesToMp4(framesDir, mp4Path, fps = 30) {
  console.log(`   Encoding  → ${mp4Path}`);
  execSync(
    `ffmpeg -y -framerate ${fps} ` +
      `-i "${join(framesDir, 'frame-%05d.png')}" ` +
      `-c:v libx264 -preset fast -crf 18 ` +
      `-pix_fmt yuv420p -movflags +faststart ` +
      `"${mp4Path}"`,
    { stdio: 'inherit' }
  );
}

/**
 * Mux beeps onto a reel MP4.
 *
 * Two cue sources (cues wins when provided):
 *  - `cues`: explicit [{ at, freq, dur }] in ANIMATION seconds (from data-audio-cues).
 *  - else: legacy single-question countdown (timerSec ticks + one reveal chime).
 *
 * Animation seconds are mapped to VIDEO time as: coverHold + animSec / speed,
 * matching how html-to-mp4 prepends a frozen cover frame and time-stretches the loop.
 */
export function muxReelAudio(mp4Path, {
  timerSec = 5,
  speed = 1.5,
  coverHoldMs = 1000,
  introSec = 2,
  revealSec = null,
  cues = null,
} = {}) {
  const coverSec = coverHoldMs / 1000;
  const toVideo = (animSec) => coverSec + animSec / speed;

  // Build the list of beeps (video time, freq, dur).
  let beeps;
  if (Array.isArray(cues) && cues.length) {
    beeps = cues.map((c) => ({
      t: toVideo(Number(c.at) || 0),
      freq: Number(c.freq) || 880,
      dur: Number(c.dur) || 0.08,
    }));
  } else {
    const revealAnimSec = revealSec ?? introSec + timerSec;
    beeps = [];
    for (let k = timerSec; k >= 1; k--) {
      beeps.push({ t: toVideo(introSec + (timerSec - k)), freq: 880, dur: 0.07 });
    }
    beeps.push({ t: toVideo(revealAnimSec), freq: 1320, dur: 0.14 });
  }

  const probe = spawnSync(
    'ffprobe',
    ['-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp4Path],
    { encoding: 'utf8' }
  );
  const duration = parseFloat(probe.stdout?.trim() || '10') + 0.05;

  const filters = [];
  const inputs = [`-f lavfi -i "anullsrc=r=44100:cl=mono"`];
  filters.push(`[0]atrim=0:${duration.toFixed(3)},asetpts=N/SR/TB[base]`);

  let idx = 1;
  const mixInputs = ['[base]'];

  for (const b of beeps) {
    const ms = Math.max(0, Math.round(b.t * 1000));
    inputs.push(`-f lavfi -i "sine=frequency=${b.freq}:duration=${b.dur.toFixed(3)}"`);
    filters.push(`[${idx}]adelay=${ms}|${ms}[b${idx}]`);
    mixInputs.push(`[b${idx}]`);
    idx++;
  }

  filters.push(
    `${mixInputs.join('')}amix=inputs=${mixInputs.length}:duration=longest:dropout_transition=0,volume=2.0[outa]`
  );

  const tmpAudio = mp4Path.replace(/\.mp4$/, '.audio.m4a');
  const tmpOut = mp4Path.replace(/\.mp4$/, '.with-audio.mp4');

  const genCmd =
    `ffmpeg -y ${inputs.join(' ')} ` +
    `-filter_complex "${filters.join(';')}" ` +
    `-map "[outa]" -t ${duration.toFixed(3)} -c:a aac -b:a 128k "${tmpAudio}"`;

  execSync(genCmd, { stdio: 'inherit' });

  execSync(
    `ffmpeg -y -i "${mp4Path}" -i "${tmpAudio}" ` +
      `-c:v copy -c:a aac -b:a 128k -map 0:v:0 -map 1:a:0 ` +
      `-movflags +faststart "${tmpOut}"`,
    { stdio: 'inherit' }
  );

  execSync(`mv "${tmpOut}" "${mp4Path}"`, { stdio: 'inherit' });
  rmSync(tmpAudio, { force: true });
  console.log(`   Audio muxed → ${mp4Path} (${beeps.length} cues)`);
}

export function ensureDir(dirPath) {
  if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

export function cleanupFramesDir(framesDir) {
  if (existsSync(framesDir)) rmSync(framesDir, { recursive: true });
}

export function printUsage(tool, lines) {
  console.error(`Usage: node tools/${tool}.mjs <html-file> [options]\n`);
  for (const line of lines) console.error(`  ${line}`);
}

export function parseArgs(argv, spec) {
  const positional = [];
  const options = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      positional.push(arg);
      continue;
    }

    const key = arg.slice(2);
    const def = spec[key];
    if (!def) {
      throw new Error(`Unknown option: ${arg}`);
    }

    if (def.type === 'flag') {
      options[key] = true;
      continue;
    }

    const value = argv[++i];
    if (value == null || value.startsWith('--')) {
      throw new Error(`Missing value for ${arg}`);
    }

    options[key] = def.type === 'number' ? Number(value) : value;
  }

  return { positional, options };
}

export async function openHtmlPage(browser, htmlFile, width, height) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on('console', () => {});
  page.on('pageerror', (err) => console.error('   Page error:', err.message));

  await page.goto(`file://${htmlFile}`);
  return { context, page };
}

export function defaultOutputDir(htmlFile) {
  return resolve(dirname(htmlFile), 'output');
}
