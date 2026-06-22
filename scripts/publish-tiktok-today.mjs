#!/usr/bin/env node
/**
 * Schedule reel MP4s on TikTok for today.
 * Usage: POSTIZ_API_KEY=… node scripts/publish-tiktok-today.mjs
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = join(ROOT, 'brands/albert-prep/output/organic/posts');
const TIKTOK_ID = process.env.TIKTOK_ID;

const TIKTOK_SETTINGS = JSON.stringify({
  privacy_level: 'PUBLIC_TO_EVERYONE',
  duet: true,
  stitch: true,
  comment: true,
  autoAddMusic: 'no',
  brand_content_toggle: false,
  brand_organic_toggle: false,
  content_posting_method: 'DIRECT_POST',
});

/** bundle → ISO UTC (aligned with IG reel slots where applicable) */
const REELS = [
  { bundle: '2026-06-21-reel-015', iso: '2026-06-21T19:25:00.000Z', skipIfScheduled: 'cmqo6b86u03q7mm0ytcdcyrog' },
  { bundle: '2026-06-22-reel-017', iso: '2026-06-21T19:30:00.000Z' },
  { bundle: '2026-06-21-reel-016', iso: '2026-06-21T19:40:00.000Z' },
  { bundle: '2026-06-22-reel-018', iso: '2026-06-21T20:20:00.000Z' },
  { bundle: '2026-06-22-reel-019', iso: '2026-06-21T21:10:00.000Z' },
  { bundle: '2026-06-22-reel-020', iso: '2026-06-21T22:00:00.000Z' },
  { bundle: '2026-06-22-reel-021', iso: '2026-06-21T22:50:00.000Z' },
];

if (!process.env.POSTIZ_API_KEY || !TIKTOK_ID) {
  console.error('POSTIZ_API_KEY and TIKTOK_ID required (npm run social:resolve)');
  process.exit(1);
}

function run(cmd, args) {
  return execFileSync(cmd, args, {
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 10 * 1024 * 1024,
  });
}

function parsePostizJson(out) {
  return JSON.parse(out.trim().split('\n').slice(1).join('\n'));
}

function upload(path) {
  return parsePostizJson(run('npx', ['postiz', 'upload', path])).path;
}

function parsePostMd(dir) {
  const raw = readFileSync(join(dir, 'post.md'), 'utf8');
  const body = raw.split(/^---\n/m).slice(2).join('---').trim();
  return body.replace(/\n\(story repost @[^\n]+\)\n?/g, '\n').trim();
}

function tiktokTitle(caption) {
  const first = caption.split('\n').find((l) => l.trim())?.trim() || 'Calcul mental';
  return first.slice(0, 90);
}

function tiktokCaption(caption) {
  const base = caption.replace(/→ prep\.albertschool\.com/g, '').trim();
  const tags = '#calculmental #albertprep #mathsrapides #fyp';
  return base.includes('#fyp') ? base : `${base}\n\n${tags}`;
}

function findMp4(dir) {
  const exp = join(dir, 'export');
  const mp4 = readdirSync(exp).find((f) => f.endsWith('.mp4'));
  if (!mp4) throw new Error('no mp4 in export/');
  return join(exp, mp4);
}

function updatePostMd(dir, { iso, postId }) {
  let raw = readFileSync(join(dir, 'post.md'), 'utf8');
  if (!raw.includes('tiktok:')) {
    raw = raw.replace(/^channels: \[(.*)\]/m, 'channels: [$1, tiktok]');
  } else if (!raw.includes('tiktok')) {
    raw = raw.replace(/^channels: \[(.*)\]/m, (m, inner) =>
      inner.includes('tiktok') ? m : `channels: [${inner}, tiktok]`);
  }
  raw = raw
    .replace(/^schedule: .*/m, `schedule: ${iso.slice(0, 16)}`)
    .replace(/^status: .*/m, 'status: scheduled');
  if (raw.includes('postiz_tiktok_id:')) {
    raw = raw.replace(/^postiz_tiktok_id: .*/m, `postiz_tiktok_id: ${postId}`);
  } else {
    raw = raw.replace(/^postiz_id: .*/m, (m) => `${m}\npostiz_tiktok_id: ${postId}`);
    if (!raw.includes('postiz_tiktok_id:')) {
      raw = raw.replace(/^status: scheduled/m, `status: scheduled\npostiz_tiktok_id: ${postId}`);
    }
  }
  writeFileSync(join(dir, 'post.md'), raw);
}

let ok = 0;
for (const reel of REELS) {
  const dir = join(POSTS, reel.bundle);
  if (!existsSync(dir)) {
    console.error(`SKIP missing ${reel.bundle}`);
    continue;
  }
  if (reel.skipIfScheduled) {
    console.log(`SKIP ${reel.bundle} (already scheduled ${reel.skipIfScheduled})`);
    updatePostMd(dir, { iso: reel.iso, postId: reel.skipIfScheduled });
    ok++;
    continue;
  }

  console.log(`\n${reel.bundle} @ ${reel.iso}`);
  try {
    const mp4 = findMp4(dir);
    const caption = parsePostMd(dir);
    const url = upload(mp4);
    const title = tiktokTitle(caption);
    const settings = JSON.stringify({ ...JSON.parse(TIKTOK_SETTINGS), title });
    const out = run('npx', [
      'postiz', 'posts:create',
      '-c', tiktokCaption(caption),
      '-s', reel.iso,
      '-t', 'schedule',
      '-i', TIKTOK_ID,
      '-m', url,
      '--settings', settings,
    ]);
    const postId = parsePostizJson(out)[0].postId;
    console.log(`  → ${postId}`);
    updatePostMd(dir, { iso: reel.iso, postId });
    ok++;
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
  }
}

console.log(`\n${ok}/${REELS.length} TikTok posts scheduled`);
if (ok < REELS.length) process.exit(1);
