#!/usr/bin/env node
/**
 * Schedule Postiz placements for an organic experiment bundle.
 *
 *   eval "$(npm run -s social:resolve)"
 *   node scripts/stage-experiment.mjs --experiment brands/.../EXP-... [--dry-run]
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const onlyChannel = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const expRel = args[args.indexOf('--experiment') + 1];
if (!expRel) {
  console.error('Usage: node scripts/stage-experiment.mjs --experiment <exp-dir> [--dry-run]');
  process.exit(1);
}
const EXP = join(ROOT, expRel);

/** Paris slots Wed 24 → Fri 26 2026 */
const PLAN = [
  { draft: '01-feed-premiere', at: '2026-06-24T20:00:00+02:00', ig: true, fb: true },
  { draft: '03-reel-accroche', at: '2026-06-24T21:30:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '02-feed-terminale', at: '2026-06-25T08:00:00+02:00', ig: true, fb: true },
  { draft: '05-reel-premiere-paper', at: '2026-06-25T10:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '12-reel-paper-premiere-comment', at: '2026-06-25T12:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '06-reel-terminale-paper', at: '2026-06-25T14:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '08-reel-paper-premiere-pct', at: '2026-06-25T16:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '14-reel-navy-premiere-comment', at: '2026-06-25T18:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '07-reel-navy-terminale-18x6', at: '2026-06-25T20:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '04-feed-diagnostic-caption', at: '2026-06-26T08:00:00+02:00', ig: true, fb: true },
  { draft: '13-reel-paper-terminale-comment', at: '2026-06-26T10:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '09-reel-paper-terminale-power', at: '2026-06-26T12:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '10-reel-navy-terminale-sqrt', at: '2026-06-26T14:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '11-reel-paper-premiere-square', at: '2026-06-26T16:00:00+02:00', ig: true, tiktok: true, fb: true },
  { draft: '15-reel-navy-terminale-comment', at: '2026-06-26T18:00:00+02:00', ig: true, tiktok: true, fb: true },
];

const POSTIZ_KEYS = { ig: 'postiz_id', tiktok: 'postiz_tiktok_id', fb: 'postiz_fb_id' };

function run(cmd, cmdArgs) {
  return execFileSync(cmd, cmdArgs, { encoding: 'utf8', env: process.env, maxBuffer: 20 * 1024 * 1024 });
}

function parsePostizJson(out) {
  return JSON.parse(out.trim().split('\n').slice(1).join('\n'));
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw.trim() };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    if (val.startsWith('[')) {
      meta[kv[1]] = val.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (val === 'null') meta[kv[1]] = null;
    else meta[kv[1]] = val.replace(/^['"]|['"]$/g, '');
  }
  return { meta, body: m[2].trim() };
}

function channelIds() {
  return JSON.parse(run('node', [join(ROOT, 'scripts/resolve-channels.mjs'), '--json']));
}

function toIso(at) {
  return new Date(at).toISOString();
}

function pickFeedPng(dir, draft) {
  const exp = join(dir, 'export');
  const files = readdirSync(exp).filter(
    (f) => f.endsWith('.png') && !f.startsWith('preview') && !f.startsWith('cover') && f.includes('4-5'),
  );
  if (draft.includes('diagnostic')) {
    const p2 = files.find((f) => f.includes('p2'));
    if (p2) return join(exp, p2);
  }
  if (draft.includes('terminale') && !draft.includes('diagnostic')) {
    const t = files.find((f) => f.includes('terminale'));
    if (t) return join(exp, t);
  }
  const p = files.find((f) => f.includes('premiere')) || files.sort()[0];
  if (!p) throw new Error(`no feed png in ${exp}`);
  return join(exp, p);
}

function pickReelMp4(dir) {
  const exp = join(dir, 'export');
  const mp4s = readdirSync(exp)
    .filter((f) => f.endsWith('.mp4'))
    .map((f) => ({ f, m: statSync(join(exp, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m);
  if (!mp4s.length) throw new Error(`no mp4 in ${exp}`);
  return join(exp, mp4s[0].f);
}

function upload(path) {
  const out = run('npx', ['postiz', 'upload', path]);
  const data = parsePostizJson(out);
  if (!data.path) throw new Error(`upload failed: ${path}`);
  return data.path;
}

function settingsFor(channel) {
  if (channel === 'tiktok') {
    return JSON.stringify({
      privacy_level: 'PUBLIC_TO_EVERYONE',
      duet: true,
      stitch: true,
      comment: true,
      autoAddMusic: 'no',
      brand_content_toggle: false,
      brand_organic_toggle: false,
      content_posting_method: 'DIRECT_POST',
    });
  }
  return JSON.stringify({ post_type: 'post' });
}

function captionFor(channel, body) {
  if (channel === 'tiktok') {
    const base = body.replace(/→ prep\.albertschool\.com/g, '').trim();
    const tags = '#calculmental #albertprep #mathsrapides #fyp';
    return base.includes('#fyp') ? base : `${base}\n\n${tags}`;
  }
  return body.trim();
}

function channelEnabled(slot, ch) {
  if (onlyChannel) return onlyChannel === ch && slot[ch];
  return Boolean(slot[ch]);
}

function alreadyScheduled(meta, ch) {
  const key = POSTIZ_KEYS[ch];
  const val = meta[key];
  return val && val !== 'null';
}

function updatePostMd(dir, { schedule, postizKey, postId }) {
  let raw = readFileSync(join(dir, 'post.md'), 'utf8');
  raw = raw.replace(/^schedule: .*/m, `schedule: ${schedule.slice(0, 16)}`);
  raw = raw.replace(/^status: .*/m, 'status: scheduled');
  if (raw.includes(`${postizKey}:`)) {
    raw = raw.replace(new RegExp(`^${postizKey}: .*`, 'm'), `${postizKey}: ${postId}`);
  } else {
    raw = raw.replace(/^status: .*/m, (m) => `${m}\n${postizKey}: ${postId}`);
  }
  writeFileSync(join(dir, 'post.md'), raw);
}

function createPost({ channel, id, caption, iso, mediaUrl }) {
  const cmdArgs = [
    'postiz', 'posts:create',
    '-c', caption,
    '-s', iso,
    '-t', 'schedule',
    '-i', id,
    '-m', mediaUrl,
    '--settings', settingsFor(channel),
  ];
  if (channel === 'tiktok') {
    const title = (caption.split('\n').find((l) => l.trim()) || 'Calcul mental').slice(0, 90);
    cmdArgs[cmdArgs.indexOf('--settings') + 1] = JSON.stringify({
      ...JSON.parse(cmdArgs[cmdArgs.indexOf('--settings') + 1]),
      title,
    });
  }
  const out = run('npx', cmdArgs);
  const data = parsePostizJson(out);
  return Array.isArray(data) ? data[0].postId : data.postId || data.id;
}

const ids = channelIds();
const modeLabel = onlyChannel ? `only ${onlyChannel}` : 'all channels';
console.log(`stage-experiment · ${expRel} · ${PLAN.length} slots · ${modeLabel} · ${dryRun ? 'DRY RUN' : 'schedule'} mode`);

let ok = 0;
let fail = 0;

for (const slot of PLAN) {
  const dir = join(EXP, 'drafts', slot.draft);
  if (!existsSync(dir)) {
    console.error(`✗ missing ${slot.draft}`);
    fail++;
    continue;
  }
  const { meta, body } = parseFrontmatter(readFileSync(join(dir, 'post.md'), 'utf8'));
  const iso = toIso(slot.at);
  const isFeed = slot.draft.includes('feed');
  console.log(`\n→ ${slot.draft} @ ${slot.at} (${iso})`);

  try {
    const mediaPath = isFeed ? pickFeedPng(dir, slot.draft) : pickReelMp4(dir);
    console.log(`   media: ${mediaPath.split('/').slice(-2).join('/')}`);

    const channels = ['ig', 'tiktok', 'fb'].filter((ch) => channelEnabled(slot, ch));
    const toCreate = channels.filter((ch) => !alreadyScheduled(meta, ch));
    if (!toCreate.length) {
      console.log('   skip — all target channels already scheduled');
      continue;
    }

    let mediaUrl = null;
    if (!dryRun) mediaUrl = upload(mediaPath);

    for (const ch of toCreate) {
      const label = `${ch}:post @ ${iso}`;
      if (dryRun) {
        console.log(`   [dry-run] ${label}`);
        ok++;
        continue;
      }
      const postId = createPost({
        channel: ch,
        id: ids[ch],
        caption: captionFor(ch, body),
        iso,
        mediaUrl,
      });
      console.log(`   ${label} → ${postId}`);
      updatePostMd(dir, { schedule: iso, postizKey: POSTIZ_KEYS[ch], postId });
      ok++;
    }
  } catch (err) {
    console.error(`   FAILED: ${err.message}`);
    fail++;
  }
}

console.log(`\n=== ${ok} scheduled · ${fail} failed ===`);
process.exit(fail ? 1 : 0);
