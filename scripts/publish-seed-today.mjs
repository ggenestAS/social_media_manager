#!/usr/bin/env node
/**
 * Publish seed batch to Postiz — scheduled today, 10-min cadence.
 * Usage: POSTIZ_API_KEY=… node scripts/publish-seed-today.mjs
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = join(ROOT, 'brands/albert-prep/output/organic/posts');
const IG_ID = process.env.IG_ID || 'cmqmx77sz01lkmm0yi32afgkc';
const FB_ID = process.env.FB_ID || 'cmqmx80wn03fdp40yfb0r3glx';

if (!process.env.POSTIZ_API_KEY) {
  console.error('POSTIZ_API_KEY required');
  process.exit(1);
}

// 21:20 Paris (CEST = UTC+2) → 19:20 UTC
const BASE_UTC = new Date('2026-06-21T19:20:00.000Z');

const SLOTS = [
  { bundle: '2026-06-22-calcul-du-jour-050', kind: 'cdj', channels: ['ig', 'fb'] },
  { bundle: '2026-06-22-reel-017', kind: 'reel', channels: ['ig'] },
  { bundle: '2026-06-22-reel-017', kind: 'story', channels: ['ig'] },
  { bundle: '2026-06-22-astuce-013', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-serie-009', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-calcul-du-jour-051', kind: 'cdj', channels: ['ig', 'fb'] },
  { bundle: '2026-06-22-reel-018', kind: 'reel', channels: ['ig'] },
  { bundle: '2026-06-22-reel-018', kind: 'story', channels: ['ig'] },
  { bundle: '2026-06-22-astuce-014', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-serie-010', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-calcul-du-jour-052', kind: 'cdj', channels: ['ig', 'fb'] },
  { bundle: '2026-06-22-reel-019', kind: 'reel', channels: ['ig'] },
  { bundle: '2026-06-22-reel-019', kind: 'story', channels: ['ig'] },
  { bundle: '2026-06-22-astuce-015', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-serie-011', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-calcul-du-jour-053', kind: 'cdj', channels: ['ig', 'fb'] },
  { bundle: '2026-06-22-reel-020', kind: 'reel', channels: ['ig'] },
  { bundle: '2026-06-22-reel-020', kind: 'story', channels: ['ig'] },
  { bundle: '2026-06-22-astuce-016', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-serie-012', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-calcul-du-jour-054', kind: 'cdj', channels: ['ig', 'fb'] },
  { bundle: '2026-06-22-reel-021', kind: 'reel', channels: ['ig'] },
  { bundle: '2026-06-22-reel-021', kind: 'story', channels: ['ig'] },
  { bundle: '2026-06-22-astuce-017', kind: 'carousel', channels: ['ig'] },
  { bundle: '2026-06-22-serie-013', kind: 'carousel', channels: ['ig'] },
];

function run(cmd, args) {
  return execFileSync(cmd, args, {
    encoding: 'utf8',
    env: { ...process.env, POSTIZ_API_KEY: process.env.POSTIZ_API_KEY },
    maxBuffer: 10 * 1024 * 1024,
  });
}

function parsePostizJson(out) {
  const json = out.trim().split('\n').slice(1).join('\n');
  if (!json) throw new Error(`empty response: ${out.slice(0, 200)}`);
  return JSON.parse(json);
}

function upload(localPath) {
  const out = run('npx', ['postiz', 'upload', localPath]);
  const data = parsePostizJson(out);
  if (!data.path) throw new Error(`no path in upload response`);
  return data.path;
}

function parsePostMd(dir) {
  const raw = readFileSync(join(dir, 'post.md'), 'utf8');
  const parts = raw.split(/^---\n/m);
  const body = parts.slice(2).join('---').trim();
  return body.replace(/\n\(story repost @[^\n]+\)\n?/g, '\n').trim();
}

function updatePostMd(dir, patch) {
  const raw = readFileSync(join(dir, 'post.md'), 'utf8');
  let next = raw
    .replace(/^schedule: .*/m, `schedule: ${patch.schedule}`)
    .replace(/^status: .*/m, 'status: scheduled')
    .replace(/^postiz_id: .*/m, `postiz_id: ${patch.postiz_id}`);
  if (!next.includes('postiz_id:')) {
    next = next.replace(/^status: scheduled/m, `status: scheduled\npostiz_id: ${patch.postiz_id}`);
  }
  writeFileSync(join(dir, 'post.md'), next);
}

function mediaFor(bundleDir, kind) {
  const exp = join(bundleDir, 'export');
  if (kind === 'cdj') {
    const png = readdirSync(exp).filter((f) => f.endsWith('.png') && !f.startsWith('preview')).sort()[0];
    return [join(exp, png)];
  }
  if (kind === 'reel' || kind === 'story') {
    const mp4 = readdirSync(exp).find((f) => f.endsWith('.mp4'));
    return [join(exp, mp4)];
  }
  if (kind === 'carousel') {
    return readdirSync(exp)
      .filter((f) => f.endsWith('.png'))
      .sort()
      .map((f) => join(exp, f));
  }
  throw new Error(`unknown kind ${kind}`);
}

function integrationIds(channels) {
  return channels.map((c) => (c === 'ig' ? IG_ID : FB_ID)).join(',');
}

function settingsFor(kind) {
  if (kind === 'story') return '{"post_type":"story"}';
  return '{"post_type":"post"}';
}

const results = [];

for (let i = 0; i < SLOTS.length; i++) {
  const slot = SLOTS[i];
  const dir = join(POSTS, slot.bundle);
  const when = new Date(BASE_UTC.getTime() + i * 10 * 60 * 1000);
  const iso = when.toISOString();
  const label = `${slot.kind} · ${slot.bundle} · ${iso}`;

  if (!existsSync(dir)) {
    console.error(`SKIP missing ${dir}`);
    continue;
  }

  console.log(`\n[${i + 1}/${SLOTS.length}] ${label}`);

  try {
    const files = mediaFor(dir, slot.kind);
    const urls = files.map((f) => {
      console.log(`   upload ${f}`);
      return upload(f);
    });
    const caption = slot.kind === 'story' ? '.' : parsePostMd(dir);
    const args = [
      'postiz', 'posts:create',
      '-c', caption,
      '-s', iso,
      '-t', 'schedule',
      '-i', integrationIds(slot.channels),
      '-m', urls.join(','),
    ];
    const settings = settingsFor(slot.kind);
    args.push('--settings', settings);

    const out = run('npx', args);
    const data = parsePostizJson(out);
    const postId = Array.isArray(data)
      ? data.map((p) => p.postId).join(',')
      : data.id || data.postId;
    if (!postId) throw new Error(`no post id in response: ${out.slice(0, 300)}`);
    console.log(`   scheduled → ${postId}`);

    if (slot.kind !== 'story') {
      updatePostMd(dir, { schedule: iso.slice(0, 16), postiz_id: postId });
    }
    results.push({ ok: true, label, postId, iso });
  } catch (err) {
    console.error(`   FAILED: ${err.message}`);
    results.push({ ok: false, label, error: err.message });
  }
}

console.log('\n=== Summary ===');
const ok = results.filter((r) => r.ok).length;
console.log(`${ok}/${results.length} scheduled`);
results.filter((r) => !r.ok).forEach((r) => console.error(`  ✗ ${r.label}: ${r.error}`));

if (ok < results.length) process.exit(1);
