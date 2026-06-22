#!/usr/bin/env node
/**
 * Export HTML design screens to PNG.
 *
 * Supports:
 *   - Design-export HTML with [data-screen-label] artboards
 *   - Standalone HTML (full viewport screenshot)
 *
 * Prerequisites (repo root):
 *   npm install
 *   npx playwright install chromium
 *
 * Examples:
 *   node tools/html-to-image.mjs brands/albert-prep/output/organic/posts/2026-06-21-calcul-du-jour-047/source.html
 *   node tools/html-to-image.mjs design-export/project/Meta\ Ads\ Spe\ Maths.dc.html --all
 *   node tools/html-to-image.mjs design-export/project/file.html --screen "P1 Première 1:1" --out ./output
 */

import { chromium } from 'playwright';
import { join } from 'path';
import {
  defaultOutputDir,
  discoverScreens,
  ensureDir,
  fitHeroCalcs,
  getScreenDimensions,
  isolateScreen,
  parseArgs,
  prepareAnimationCapture,
  printUsage,
  resolveHtmlInput,
  seekAnimations,
  slugFromLabel,
  openHtmlPage,
} from './lib/html-render.mjs';

const ARG_SPEC = {
  all: { type: 'flag' },
  screen: { type: 'string' },
  out: { type: 'string' },
  at: { type: 'number' },
  width: { type: 'number' },
  height: { type: 'number' },
  aspect: { type: 'string' },
};

function usage() {
  printUsage('html-to-image', [
    '<html-file>                 Input HTML path',
    '--all                       Export every [data-screen-label] screen',
    '--screen <label>            Export one labeled screen',
    '--out <dir>                 Output directory (default: <html-dir>/output)',
    '--at <ms>                   Seek CSS animations before capture (default: 0)',
    '--width <px>                Viewport width for full-page capture (default: 1080)',
    '--height <px>               Viewport height for full-page capture (default: 1350)',
    '--aspect <ratio>            Filter screens: 9:16, 4:5, 1:1, or substring',
  ]);
}

async function captureScreen(browser, htmlFile, screenLabel, outputDir, atMs) {
  const probeCtx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const probe = await probeCtx.newPage();
  await probe.goto(`file://${htmlFile}`);
  await probe.waitForTimeout(1500);

  const dims = await getScreenDimensions(probe, screenLabel);
  await probeCtx.close();

  if (!dims) throw new Error(`Screen not found: ${screenLabel}`);

  const { context, page } = await openHtmlPage(browser, htmlFile, dims.width, dims.height);
  await page.waitForSelector('[data-screen-label]', { timeout: 60000 });
  await isolateScreen(page, screenLabel);
  await prepareAnimationCapture(page);
  await fitHeroCalcs(page);
  if (atMs > 0) await seekAnimations(page, atMs);

  const slug = slugFromLabel(screenLabel) || 'screen';
  const outPath = join(outputDir, `${slug}.png`);

  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width: dims.width, height: dims.height },
  });

  await context.close();
  console.log(`   ${outPath}`);
  return outPath;
}

async function captureFullPage(browser, htmlFile, outputDir, width, height, atMs) {
  const { context, page } = await openHtmlPage(browser, htmlFile, width, height);
  await page.waitForTimeout(1500);
  await prepareAnimationCapture(page);
  if (atMs > 0) await seekAnimations(page, atMs);

  const baseName = htmlFile.split('/').pop()?.replace(/\.html?$/i, '') || 'page';
  const outPath = join(outputDir, `${baseName}.png`);

  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width, height },
  });

  await context.close();
  console.log(`   ${outPath}`);
  return outPath;
}

async function main() {
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
  const atMs = options.at ?? 0;
  const width = options.width ?? 1080;
  const height = options.height ?? 1350;

  console.log(`HTML → PNG`);
  console.log(`   Source : ${htmlFile}`);
  console.log(`   Output : ${outputDir}`);

  const browser = await chromium.launch({ headless: true });
  const outputs = [];

  try {
    if (options.all || options.screen) {
      const probe = await browser.newPage();
      await probe.goto(`file://${htmlFile}`);
      await probe.waitForSelector('[data-screen-label]', { timeout: 60000 });
      const labels = await discoverScreens(probe, { aspect: options.aspect });
      await probe.close();

      if (labels.length === 0) {
        throw new Error('No [data-screen-label] screens found. Use full-page mode or check the HTML file.');
      }

      const selected = options.screen
        ? labels.filter((l) => l === options.screen)
        : labels;

      if (options.screen && selected.length === 0) {
        throw new Error(`Screen not found: "${options.screen}". Available: ${labels.join(', ')}`);
      }

      for (const label of selected) {
        console.log(`\n▶  ${label}`);
        outputs.push(await captureScreen(browser, htmlFile, label, outputDir, atMs));
      }
    } else {
      console.log(`\n▶  Full page ${width}×${height}`);
      outputs.push(await captureFullPage(browser, htmlFile, outputDir, width, height, atMs));
    }
  } finally {
    await browser.close();
  }

  console.log(`\nDone — ${outputs.length} PNG(s).`);
}

main().catch((err) => {
  console.error('\nError:', err.message);
  process.exit(1);
});
