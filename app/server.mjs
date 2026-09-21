#!/usr/bin/env node
/**
 * Brand browser — a local, zero-dependency web UI to navigate brands, assets,
 * calendars, campaigns, experiments and docs under brands/<brand>/.
 *
 *   npm run browse            # http://127.0.0.1:4173
 *   npm run browse -- --port 5000 --host 0.0.0.0
 *
 * Read-only. It scans the filesystem on every API call (no cache), so edits
 * made by skills/scripts show up on reload. Files are served only from brands/.
 */
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, extname, relative, resolve, sep, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BRANDS = join(ROOT, 'brands');
const PUBLIC = join(ROOT, 'app', 'public');

const args = process.argv.slice(2);
const argOf = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args[i + 1]; };
const PORT = Number(argOf('--port', process.env.PORT || 4173));
const HOST = argOf('--host', '127.0.0.1');

const MEDIA_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp4', '.webm', '.wav', '.mp3']);
const SKIP_DIRS = new Set(['node_modules', '.git']);
const rel = (p) => relative(ROOT, p).split(sep).join('/');

// ── fs helpers ─────────────────────────────────────────────────────────────
function ls(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => !d.name.startsWith('.') && !SKIP_DIRS.has(d.name))
    .sort((a, b) => a.name.localeCompare(b.name));
}
const dirs = (dir) => ls(dir).filter((d) => d.isDirectory()).map((d) => join(dir, d.name));
const files = (dir, pred = () => true) => ls(dir).filter((d) => d.isFile() && pred(d.name)).map((d) => join(dir, d.name));
function walk(dir, pred, out = [], depth = 6) {
  if (depth < 0) return out;
  for (const d of ls(dir)) {
    const p = join(dir, d.name);
    if (d.isDirectory()) walk(p, pred, out, depth - 1);
    else if (pred(p)) out.push(p);
  }
  return out;
}
const read = (p) => { try { return readFileSync(p, 'utf8'); } catch { return ''; } };
const mtime = (p) => { try { return statSync(p).mtimeMs; } catch { return 0; } };

// ── parsers ────────────────────────────────────────────────────────────────
/** Minimal YAML-ish frontmatter: scalars, inline [a, b] / {k: v}, nested maps and `- item` lists (recursive). */
function parseFrontmatter(md) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(md);
  if (!m) return { fm: {}, body: md };
  const scalar = (v) => {
    v = v.replace(/\s+#.*$/, '').trim();
    if (v === '') return '';
    if (v === 'null' || v === '~') return null;
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(',').map((x) => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    if (/^\{.*\}$/.test(v)) {
      const o = {};
      for (const part of v.slice(1, -1).split(/,(?=\s*[A-Za-z0-9_-]+\s*:)/)) {
        const j = part.indexOf(':'); if (j === -1) continue;
        o[part.slice(0, j).trim()] = scalar(part.slice(j + 1));
      }
      return o;
    }
    return v.replace(/^["']|["']$/g, '');
  };
  const indentOf = (l) => /^\s*/.exec(l)[0].length;
  /** Parse a block of lines that share the same indentation. */
  const parseBlock = (lines) => {
    const items = lines.filter((l) => l.trim() && !/^\s*#/.test(l.trim()));
    if (!items.length) return {};
    const base = Math.min(...items.map(indentOf));
    const rows = items.filter((l) => indentOf(l) === base);
    const isList = rows.every((l) => /^\s*-\s/.test(l));
    const out = isList ? [] : {};
    for (let i = 0; i < items.length; i++) {
      const l = items[i];
      if (indentOf(l) !== base) continue;
      const children = [];
      while (i + 1 < items.length && indentOf(items[i + 1]) > base) children.push(items[++i]);
      if (isList) {
        const v = l.replace(/^\s*-\s*/, '');
        if (children.length && !v) out.push(parseBlock(children));
        else if (children.length) { const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(v); const o = kv ? { [kv[1]]: scalar(kv[2]) } : {}; Object.assign(o, parseBlock(children)); out.push(o); }
        else out.push(scalar(v));
      } else {
        const kv = /^\s*([A-Za-z0-9_-]+):\s*(.*)$/.exec(l);
        if (!kv) continue;
        const rest = kv[2].replace(/\s+#.*$/, '').trim();
        out[kv[1]] = children.length && !rest ? parseBlock(children) : scalar(rest);
      }
    }
    return out;
  };
  let fm = {};
  try { fm = parseBlock(m[1].split(/\r?\n/)); } catch { fm = {}; }
  if (Array.isArray(fm)) fm = { items: fm };
  return { fm, body: md.slice(m[0].length) };
}
function boardsOf(html) {
  const out = [];
  const re = /<([a-z0-9-]+)([^>]*?)data-screen-label="([^"]+)"([^>]*)>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[2] + m[4];
    const st = /style="([^"]*)"/.exec(attrs)?.[1] || '';
    const w = /width:\s*(\d+)px/.exec(st)?.[1];
    const h = /height:\s*(\d+)px/.exec(st)?.[1];
    if (w && h) out.push({ label: m[3], w: +w, h: +h });
  }
  return out;
}
function titleOf(mdPath) {
  const md = read(mdPath);
  const { body } = parseFrontmatter(md);
  const h = /^#\s+(.+)$/m.exec(body);
  return h ? h[1].trim() : posix.basename(rel(mdPath), '.md');
}
function firstParagraph(md) {
  const { body } = parseFrontmatter(md);
  const paras = body.split(/\r?\n\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#') && !s.startsWith('>') && !s.startsWith('|') && !s.startsWith('```'));
  return (paras[0] || '').replace(/\s+/g, ' ').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]+/g, '').replace(/<(https?:[^>]+)>/g, '$1').slice(0, 320);
}
const doc = (p, group) => ({ path: rel(p), name: posix.basename(rel(p)), title: titleOf(p), group, mtime: mtime(p) });

// ── bundles ────────────────────────────────────────────────────────────────
function bundleAt(dir, kind) {
  const src = join(dir, 'source.html');
  const post = join(dir, 'post.md');
  if (!existsSync(src) && !existsSync(post)) return null;
  const md = existsSync(post) ? read(post) : '';
  const { fm, body } = parseFrontmatter(md);
  const exportDir = join(dir, 'export');
  const exports = existsSync(exportDir) ? files(exportDir, (n) => MEDIA_EXT.has(extname(n).toLowerCase())).map(rel) : [];
  const html = existsSync(src) ? read(src) : '';
  return {
    slug: posix.basename(rel(dir)),
    dir: rel(dir),
    kind,
    source: existsSync(src) ? rel(src) : null,
    post: existsSync(post) ? rel(post) : null,
    fm,
    caption: body.trim().split(/\r?\n/)[0]?.slice(0, 200) || '',
    boards: boardsOf(html),
    exports,
    mtime: Math.max(mtime(src), mtime(post)),
  };
}
/** Find bundle directories under root (depth-limited), returning bundles + the dirs claimed. */
function findBundles(root, kind, depth = 3) {
  const out = [];
  const claimed = new Set();
  const visit = (dir, d) => {
    const b = bundleAt(dir, kind);
    if (b) { out.push(b); claimed.add(dir); return; }
    if (d <= 0) return;
    for (const sub of dirs(dir)) if (posix.basename(rel(sub)) !== 'export') visit(sub, d - 1);
  };
  for (const sub of dirs(root)) visit(sub, depth);
  return { bundles: out, claimed };
}

// ── brand scan ─────────────────────────────────────────────────────────────
function listBrands() {
  return dirs(BRANDS).filter((d) => { const n = posix.basename(rel(d)); return !n.startsWith('_') && !n.startsWith('.'); });
}
function brandSummary(dir) {
  const slug = posix.basename(rel(dir));
  const readme = join(dir, 'README.md');
  const md = read(readme);
  const h = /^#\s+(.+)$/m.exec(md);
  const posts = existsSync(join(dir, 'output/organic/posts')) ? dirs(join(dir, 'output/organic/posts')).length : 0;
  const campaigns = existsSync(join(dir, 'output/paid/campaigns')) ? ls(join(dir, 'output/paid/campaigns')).length : 0;
  const types = existsSync(join(dir, 'templates/post-types')) ? dirs(join(dir, 'templates/post-types')).length : 0;
  return { slug, name: h ? h[1].trim() : slug, summary: firstParagraph(md), counts: { posts, campaigns, postTypes: types } };
}
function scanBrand(dir) {
  const slug = posix.basename(rel(dir));
  const brand = { ...brandSummary(dir), path: rel(dir) };

  // root + templates docs (everything outside output/)
  brand.docs = [];
  for (const p of files(dir, (n) => n.endsWith('.md'))) brand.docs.push(doc(p, 'brand'));
  for (const p of files(dir, (n) => n.endsWith('.json'))) brand.docs.push({ path: rel(p), name: posix.basename(rel(p)), title: posix.basename(rel(p)), group: 'brand', mtime: mtime(p) });
  for (const p of walk(join(dir, 'context'), (p) => p.endsWith('.md'))) brand.docs.push(doc(p, 'context'));
  for (const p of files(join(dir, 'templates'), (n) => n.endsWith('.md'))) brand.docs.push(doc(p, 'templates'));

  brand.channels = (() => { try { return JSON.parse(read(join(dir, 'channels.json'))); } catch { return null; } })();
  brand.log = existsSync(join(dir, 'LOG.md')) ? rel(join(dir, 'LOG.md')) : null;

  brand.assets = walk(join(dir, 'assets'), (p) => MEDIA_EXT.has(extname(p).toLowerCase())).map((p) => ({ path: rel(p), name: posix.basename(rel(p)) }));

  brand.postTypes = dirs(join(dir, 'templates/post-types')).map((d) => {
    const spec = join(d, 'spec.md');
    const tpls = files(d, (n) => n.endsWith('.html'));
    return {
      name: posix.basename(rel(d)),
      title: existsSync(spec) ? titleOf(spec) : posix.basename(rel(d)),
      spec: existsSync(spec) ? rel(spec) : null,
      templates: tpls.map((t) => ({ path: rel(t), boards: boardsOf(read(t)) })),
      files: files(d).map(rel),
    };
  });

  const org = join(dir, 'output/organic');
  brand.organic = {
    posts: findBundles(join(org, 'posts'), 'organic', 1).bundles,
    calendars: files(join(org, 'calendar'), (n) => n.endsWith('.md')).map((p) => doc(p, 'calendar')),
    briefs: files(join(org, 'briefs'), (n) => n.endsWith('.md')).map((p) => doc(p, 'brief')),
    experiments: dirs(join(org, 'experiments')).map((e) => ({
      slug: posix.basename(rel(e)),
      docs: files(e, (n) => n.endsWith('.md')).map((p) => doc(p, 'experiment')),
      drafts: findBundles(e, 'experiment', 2).bundles,
    })),
  };

  const campRoot = join(dir, 'output/paid/campaigns');
  brand.paid = {
    campaigns: dirs(campRoot).map((c) => {
      const { bundles, claimed } = findBundles(c, 'paid', 3);
      const docsList = walk(c, (p) => p.endsWith('.md') && !p.includes(`${sep}design-export${sep}`)).filter((p) => ![...claimed].some((cl) => p.startsWith(cl + sep))).map((p) => doc(p, 'campaign'));
      const media = walk(c, (p) => MEDIA_EXT.has(extname(p).toLowerCase()) && !p.includes(`${sep}design-export${sep}`) && !p.includes(`${sep}.frames-`))
        .filter((p) => ![...claimed].some((cl) => p.startsWith(cl + sep)))
        .map((p) => ({ path: rel(p), name: posix.basename(rel(p)), sub: posix.dirname(posix.relative(rel(c), rel(p))) }));
      const designExport = existsSync(join(c, 'design-export')) ? walk(join(c, 'design-export'), () => true).map(rel) : [];
      return { slug: posix.basename(rel(c)), dir: rel(c), docs: docsList, bundles, media, designExport };
    }),
    notes: files(campRoot, (n) => n.endsWith('.md')).map((p) => doc(p, 'campaign-note')),
  };
  return brand;
}

// ── http ───────────────────────────────────────────────────────────────────
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm', '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.jsx': 'text/plain; charset=utf-8' };
const send = (res, code, body, type = 'application/json; charset=utf-8') => { res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store' }); res.end(body); };
const json = (res, obj) => send(res, 200, JSON.stringify(obj));

function safeBrandPath(urlPath) {
  const p = decodeURIComponent(urlPath).replace(/^\/+/, '');
  if (!p.startsWith('brands/') || p.split('/').includes('..')) return null;
  const abs = resolve(ROOT, p);
  if (!abs.startsWith(BRANDS + sep) || !existsSync(abs) || !statSync(abs).isFile()) return null;
  return abs;
}

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  try {
    if (url.pathname === '/api/brands') return json(res, listBrands().map(brandSummary));
    let m = /^\/api\/brands\/([^/]+)$/.exec(url.pathname);
    if (m) {
      const dir = join(BRANDS, m[1]);
      if (!listBrands().includes(dir)) return send(res, 404, '{"error":"unknown brand"}');
      return json(res, scanBrand(dir));
    }
    if (url.pathname === '/api/text') {
      const abs = safeBrandPath(url.searchParams.get('path') || '');
      if (!abs) return send(res, 404, '{"error":"not found"}');
      return json(res, { path: rel(abs), text: read(abs) });
    }
    if (url.pathname.startsWith('/f/')) {
      const abs = safeBrandPath(url.pathname.slice(3));
      if (!abs) return send(res, 404, 'not found', 'text/plain');
      const type = TYPES[extname(abs).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
      return res.end(readFileSync(abs));
    }
    // static UI
    const file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    const abs = resolve(PUBLIC, file);
    if (abs.startsWith(PUBLIC + sep) && existsSync(abs) && statSync(abs).isFile()) {
      return send(res, 200, readFileSync(abs), TYPES[extname(abs).toLowerCase()] || 'application/octet-stream');
    }
    if (!url.pathname.startsWith('/api/')) return send(res, 200, readFileSync(join(PUBLIC, 'index.html')), TYPES['.html']);
    return send(res, 404, '{"error":"not found"}');
  } catch (err) {
    console.error(err);
    return send(res, 500, JSON.stringify({ error: String(err.message || err) }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Brand browser → http://${HOST}:${PORT}  (scanning ${rel(BRANDS)}/, read-only)`);
});
