#!/usr/bin/env node
/**
 * Batch export + Postiz staging for a day's authored bundles.
 * Does NOT generate content — the agent writes bundles + daily brief first.
 *
 * Usage:
 *   eval "$(npm run -s social:resolve)"
 *   node scripts/stage-day.mjs --date 2026-06-22
 *   node scripts/stage-day.mjs --date 2026-06-22 --schedule
 *   node scripts/stage-day.mjs --date 2026-06-22 --export-missing --dry-run
 *
 * Reads each matching bundle under brands/<brand>/output/organic/posts/<date>-*
 * Uses post.md frontmatter: channels, placements, schedule, verify (optional).
 */

import { execFileSync, spawnSync } from 'node:child_process';
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  statSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
}
const hasFlag = (name) => args.includes(name);

const date = flag('--date');
const brand = flag('--brand', process.env.BRAND || 'albert-prep');
const mode = hasFlag('--schedule') ? 'schedule' : 'draft';
const exportMissing = hasFlag('--export-missing');
const dryRun = hasFlag('--dry-run');

if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error('Usage: node scripts/stage-day.mjs --date YYYY-MM-DD [--schedule] [--export-missing] [--dry-run]');
  process.exit(1);
}

const POSTS = join(ROOT, 'brands', brand, 'output/organic/posts');
const CONFIG_PATH = join(ROOT, 'brands', brand, 'content-engine.config.json');

function run(cmd, cmdArgs, opts = {}) {
  return execFileSync(cmd, cmdArgs, {
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
    ...opts,
  });
}

function parsePostizJson(out) {
  const json = out.trim().split('\n').slice(1).join('\n');
  if (!json) throw new Error(`empty Postiz response: ${out.slice(0, 200)}`);
  return JSON.parse(json);
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw.trim() };
  const meta = {};
  const lines = m[1].split('\n');
  let placements = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('placements:')) {
      placements = [];
      for (let j = i + 1; j < lines.length; j++) {
        const pl = lines[j];
        if (!pl.startsWith('  ')) break;
        const hit = pl.match(/\{\s*channel:\s*(\w+),\s*post_type:\s*(\w+)\s*\}/);
        if (hit) placements.push({ channel: hit[1], post_type: hit[2] });
      }
      meta.placements = placements;
      continue;
    }
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) {
      let val = kv[2].trim();
      if (val.startsWith('[')) {
        meta[kv[1]] = val
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (val === 'null') meta[kv[1]] = null;
      else meta[kv[1]] = val.replace(/^['"]|['"]$/g, '');
    }
  }
  return { meta, body: m[2].trim() };
}

function loadPlacementDefaults() {
  if (!existsSync(CONFIG_PATH)) return {};
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf8')).placement_defaults || {};
}

function resolveChannelIds() {
  const out = run('node', [join(ROOT, 'scripts/resolve-channels.mjs'), '--json']);
  return JSON.parse(out);
}

function bundleDirsForDate() {
  return readdirSync(POSTS, { withFileTypes: true })
    .filter((d) => {
      if (!d.name.startsWith(`${date}-`)) return false;
      const full = join(POSTS, d.name);
      if (d.isDirectory()) return true;
      if (d.isSymbolicLink()) {
        try {
          return statSync(full).isDirectory();
        } catch {
          return false;
        }
      }
      return false;
    })
    .map((d) => d.name)
    .sort();
}

function mediaKind(type, placement) {
  if (placement.post_type === 'story' && type.includes('reel')) return 'reel';
  if (type === 'reel' || type === 'qcm' && placement.channel !== 'ig') return 'reel';
  if (type === 'qcm' && placement.post_type === 'story') return 'story-static';
  if (['astuce', 'serie', 'qcm'].includes(type)) return 'carousel';
  return 'single-image';
}

function exportBundle(dir, type) {
  const src = join(dir, 'source.html');
  const outDir = join(dir, 'export');
  mkdirSync(outDir, { recursive: true });
  const isReel =
    type === 'reel' ||
    (type === 'qcm' && readFileSync(src, 'utf8').includes('data-timer-sec'));
  if (isReel) {
    run('npm', ['run', '-s', 'html:to-mp4', '--', src, '--out', outDir], { cwd: ROOT });
  } else {
    run('npm', ['run', '-s', 'html:to-image', '--', src, '--all', '--out', outDir], { cwd: ROOT });
  }
}

function needsExport(dir, kind) {
  const exp = join(dir, 'export');
  if (!existsSync(exp)) return true;
  const files = readdirSync(exp);
  if (kind === 'reel') return !files.some((f) => f.endsWith('.mp4'));
  return !files.some((f) => f.endsWith('.png'));
}

function pickMedia(dir, kind) {
  const exp = join(dir, 'export');
  if (kind === 'reel') {
    const mp4 = readdirSync(exp).find((f) => f.endsWith('.mp4'));
    if (!mp4) throw new Error('no mp4 in export/');
    return [join(exp, mp4)];
  }
  if (kind === 'single-image') {
    const png = readdirSync(exp)
      .filter((f) => f.endsWith('.png') && !f.startsWith('preview') && !f.startsWith('cover'))
      .sort()[0];
    if (!png) throw new Error('no png in export/');
    return [join(exp, png)];
  }
  const pngs = readdirSync(exp)
    .filter((f) => f.endsWith('.png') && !f.startsWith('preview') && !f.startsWith('cover'))
    .sort()
    .map((f) => join(exp, f));
  if (!pngs.length) throw new Error('no carousel pngs in export/');
  return pngs;
}

function upload(paths) {
  return paths.map((p) => {
    const out = run('npx', ['postiz', 'upload', p]);
    const data = parsePostizJson(out);
    if (!data.path) throw new Error(`upload missing path for ${p}`);
    return data.path;
  });
}

function settingsFor(channel, postType) {
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
  if (channel === 'ig') return JSON.stringify({ post_type: postType });
  return JSON.stringify({ post_type: 'post' });
}

function captionFor(channel, postType, body, meta) {
  if (channel === 'ig' && postType === 'story') return '.';
  if (channel === 'tiktok') {
    const base = body.replace(/→ prep\.albertschool\.com/g, '').trim();
    const tags = '#calculmental #albertprep #mathsrapides #fyp';
    return base.includes('#fyp') ? base : `${base}\n\n${tags}`;
  }
  return body.replace(/\n\(story repost @[^\n]+\)\n?/g, '\n').trim();
}

function parseSchedule(str) {
  if (!str) return null;
  const normalized =
    str.length === 16 ? `${str}:00+02:00` : /[Z+]/.test(str) ? str : `${str}+02:00`;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function scheduleIso(meta, pl, slotIndex, cadenceMin) {
  if (pl.channel === 'ig' && pl.post_type === 'story' && meta.story_schedule) {
    const iso = parseSchedule(meta.story_schedule);
    if (iso) return iso;
  }
  if (meta.schedule) {
    const iso = parseSchedule(meta.schedule);
    if (iso) return iso;
  }
  const base = new Date(`${date}T08:00:00+02:00`);
  base.setMinutes(base.getMinutes() + slotIndex * cadenceMin);
  return base.toISOString();
}

function verifyBundle(dir) {
  const raw = readFileSync(join(dir, 'post.md'), 'utf8');
  if (!raw.includes('verify:')) return { skipped: true };
  const r = spawnSync('node', [join(ROOT, 'scripts/verify-math.mjs'), '--bundle', dir], {
    encoding: 'utf8',
  });
  if (r.status !== 0) throw new Error(r.stderr || r.stdout || 'verify failed');
  return { skipped: false, ok: true };
}

function updatePostMd(dir, { schedule, postizKey, postId }) {
  let raw = readFileSync(join(dir, 'post.md'), 'utf8');
  if (schedule) {
    raw = raw.replace(/^schedule: .*/m, `schedule: ${schedule.slice(0, 16)}`);
  }
  raw = raw.replace(/^status: .*/m, `status: ${mode === 'schedule' ? 'scheduled' : 'draft'}`);
  const key = postizKey || 'postiz_id';
  if (raw.includes(`${key}:`)) {
    raw = raw.replace(new RegExp(`^${key}: .*`, 'm'), `${key}: ${postId}`);
  } else {
    raw = raw.replace(/^status: .*/m, (m) => `${m}\n${key}: ${postId}`);
  }
  writeFileSync(join(dir, 'post.md'), raw);
}

const placementDefaults = loadPlacementDefaults();
const channelIds = resolveChannelIds();
const cadence = JSON.parse(readFileSync(CONFIG_PATH, 'utf8')).daily?.cadence_minutes || 10;

const bundles = bundleDirsForDate();
if (!bundles.length) {
  console.error(`No bundles found for ${date} under ${POSTS}`);
  process.exit(1);
}

console.log(`stage-day · ${brand} · ${date} · ${bundles.length} bundle(s) · mode=${mode}${dryRun ? ' · DRY RUN' : ''}`);

const results = [];
let slot = 0;

for (const name of bundles) {
  const dir = join(POSTS, name);
  const { meta, body } = parseFrontmatter(readFileSync(join(dir, 'post.md'), 'utf8'));
  const type = meta.type || name.split('-').slice(3).join('-');

  let placements = meta.placements;
  if (!placements?.length) {
    const key =
      type === 'qcm' && existsSync(join(dir, 'source.html')) &&
      readFileSync(join(dir, 'source.html'), 'utf8').includes('data-timer-sec')
        ? 'qcm-reel'
        : type === 'qcm' && readFileSync(join(dir, 'source.html'), 'utf8').includes('class="story"')
          ? 'qcm-story'
          : type;
    placements = placementDefaults[key] || placementDefaults[type] || [{ channel: 'ig', post_type: 'post' }];
  }

  console.log(`\n→ ${name} (${type}) · ${placements.length} placement(s)`);

  try {
    verifyBundle(dir);

    const primaryKind = mediaKind(type, placements[0]);
    if (exportMissing && needsExport(dir, primaryKind === 'story-static' ? 'single-image' : primaryKind)) {
      console.log('   export…');
      if (!dryRun) exportBundle(dir, type);
    }

    for (const pl of placements) {
      if (!channelIds[pl.channel]) {
        console.warn(`   skip ${pl.channel}:${pl.post_type} — channel not resolved`);
        continue;
      }
      const kind = mediaKind(type, pl);
      const iso = scheduleIso(meta, pl, slot, cadence);
      const label = `${pl.channel}:${pl.post_type} @ ${iso}`;

      if (dryRun) {
        console.log(`   [dry-run] ${label}`);
        results.push({ ok: true, name, label, dryRun: true });
        slot++;
        continue;
      }

      const files = pickMedia(dir, kind === 'story-static' ? 'single-image' : kind);
      console.log(`   upload ${files.length} file(s) · ${label}`);
      const urls = upload(files);
      const caption = captionFor(pl.channel, pl.post_type, body, meta);
      const cmdArgs = [
        'postiz', 'posts:create',
        '-c', caption,
        '-s', iso,
        '-t', mode,
        '-i', channelIds[pl.channel],
        '-m', urls.join(','),
        '--settings', settingsFor(pl.channel, pl.post_type),
      ];
      if (pl.channel === 'tiktok') {
        const title = (caption.split('\n').find((l) => l.trim()) || 'Calcul mental').slice(0, 90);
        cmdArgs[cmdArgs.indexOf('--settings') + 1] = JSON.stringify({
          ...JSON.parse(cmdArgs[cmdArgs.indexOf('--settings') + 1]),
          title,
        });
      }
      const out = run('npx', cmdArgs);
      const data = parsePostizJson(out);
      const postId = Array.isArray(data) ? data[0].postId : data.postId || data.id;
      console.log(`   ${mode} → ${postId}`);

      const postizKey =
        pl.channel === 'tiktok' ? 'postiz_tiktok_id' : pl.post_type === 'story' ? 'postiz_story_id' : 'postiz_id';
      if (pl.channel === 'ig' && pl.post_type === 'post') {
        updatePostMd(dir, { postizKey: 'postiz_id', postId });
      } else if (pl.channel === 'ig' && pl.post_type === 'story') {
        updatePostMd(dir, { postizKey: 'postiz_story_id', postId });
      } else if (pl.channel === 'tiktok') {
        updatePostMd(dir, { postizKey: 'postiz_tiktok_id', postId });
      }

      results.push({ ok: true, name, label, postId });
      slot++;
    }
  } catch (err) {
    console.error(`   FAILED: ${err.message}`);
    results.push({ ok: false, name, error: err.message });
  }
}

console.log('\n=== Summary ===');
const ok = results.filter((r) => r.ok).length;
console.log(`${ok}/${results.length} placement(s) staged`);
results.filter((r) => !r.ok).forEach((r) => console.error(`  ✗ ${r.name}: ${r.error}`));
process.exit(results.some((r) => !r.ok) ? 1 : 0);
