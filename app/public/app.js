/* Brand browser — vanilla JS, hash-routed, read-only. Data comes from /api/*; files from /f/<repo path>. */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') n.className = v; else if (k === 'html') n.innerHTML = v; else if (k.startsWith('on')) n.addEventListener(k.slice(2), v); else n.setAttribute(k, v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(String(k)));
  return n;
};
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (ms) => ms ? new Date(ms).toISOString().slice(0, 10) : '';
const dirOf = (p) => p.split('/').slice(0, -1).join('/');

// ── data ─────────────────────────────────────────────────────────────────
const cache = { brands: null, brand: {}, text: {} };
const api = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(`${u}: ${r.status}`); return r.json(); };
const brands = async () => cache.brands || (cache.brands = await api('/api/brands'));
const brand = async (slug) => cache.brand[slug] || (cache.brand[slug] = await api('/api/brands/' + encodeURIComponent(slug)));
const text = async (path) => cache.text[path] ?? (cache.text[path] = (await api('/api/text?path=' + encodeURIComponent(path))).text);
$('#refresh').addEventListener('click', () => { cache.brands = null; cache.brand = {}; cache.text = {}; route(); });

// ── markdown (small, good enough for the repo's docs) ────────────────────
function inline(s, base) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, a, u) => `<img alt="${a}" src="${resolveHref(u, base)}">`);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${resolveHref(u, base)}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
  return s;
}
function resolveHref(u, base) {
  if (/^(https?:|mailto:|#)/.test(u)) return u;
  const parts = (base + '/' + u.split('#')[0]).split('/');
  const out = [];
  for (const p of parts) { if (p === '..') out.pop(); else if (p && p !== '.') out.push(p); }
  const path = out.join('/');
  if (/\.md$/i.test(path)) { const slug = path.split('/')[1]; return `#/b/${slug}/docs?path=${encodeURIComponent(path)}`; }
  return '/f/' + path;
}
function markdown(md, base = '') {
  const lines = md.replace(/\r/g, '').split('\n');
  let html = '', i = 0, list = null;
  const closeList = () => { if (list) { html += `</${list}>`; list = null; } };
  while (i < lines.length) {
    const L = lines[i];
    if (/^```/.test(L)) { closeList(); let code = ''; i++; while (i < lines.length && !/^```/.test(lines[i])) code += lines[i++] + '\n'; i++; html += `<pre><code>${esc(code)}</code></pre>`; continue; }
    if (/^\s*$/.test(L)) { closeList(); i++; continue; }
    const h = /^(#{1,6})\s+(.*)$/.exec(L);
    if (h) { closeList(); html += `<h${h[1].length}>${inline(h[2], base)}</h${h[1].length}>`; i++; continue; }
    if (/^(-{3,}|\*{3,})\s*$/.test(L)) { closeList(); html += '<hr>'; i++; continue; }
    if (/^>/.test(L)) { closeList(); let q = ''; while (i < lines.length && /^>/.test(lines[i])) q += lines[i++].replace(/^>\s?/, '') + '\n'; html += `<blockquote>${markdown(q, base)}</blockquote>`; continue; }
    if (/^\|/.test(L) && i + 1 < lines.length && /^\|?\s*:?-{2,}/.test(lines[i + 1])) {
      closeList();
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim(), base));
      html += '<table><thead><tr>' + cells(L).map((c) => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      i += 2;
      while (i < lines.length && /^\|/.test(lines[i])) html += '<tr>' + cells(lines[i++]).map((c) => `<td>${c}</td>`).join('') + '</tr>';
      html += '</tbody></table>'; continue;
    }
    const li = /^(\s*)([-*]|\d+\.)\s+(.*)$/.exec(L);
    if (li) {
      const kind = /\d/.test(li[2]) ? 'ol' : 'ul';
      if (list !== kind) { closeList(); html += `<${kind}>`; list = kind; }
      let item = li[3]; i++;
      while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s/.test(lines[i])) item += ' ' + lines[i++].trim();
      html += `<li>${inline(item, base)}</li>`; continue;
    }
    closeList();
    let p = L; i++;
    while (i < lines.length && lines[i].trim() && !/^(#|```|>|\||\s*[-*]\s|\s*\d+\.\s|-{3,})/.test(lines[i])) p += ' ' + lines[i++];
    html += `<p>${inline(p, base)}</p>`;
  }
  closeList();
  return html;
}
function splitFrontmatter(md) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(md);
  return m ? { fm: m[1], body: md.slice(m[0].length) } : { fm: null, body: md };
}
function docView(path, md) {
  const { fm, body } = splitFrontmatter(md);
  const box = el('div', { class: 'doc' });
  if (fm) box.append(el('pre', {}, el('code', {}, fm)));
  box.append(el('div', { html: markdown(body, dirOf(path)) }));
  return box;
}

// ── previews: isolate one board of a source.html inside a scaled iframe ───
function previewDoc(html, dir, label) {
  const base = `<base href="/f/${dir}/">`;
  const iso = `<script>(function(){var L=${JSON.stringify(label || '')};var s=L?document.querySelector('[data-screen-label='+JSON.stringify(L)+']'):document.querySelector('[data-screen-label]');if(!s)return;var w=parseInt(s.style.width)||s.offsetWidth||1080,h=parseInt(s.style.height)||s.offsetHeight||1350;var bg=getComputedStyle(s).backgroundColor;document.documentElement.style.cssText='margin:0;padding:0;overflow:hidden;width:'+w+'px;height:'+h+'px';document.body.style.cssText='margin:0;padding:0;overflow:hidden;width:'+w+'px;height:'+h+'px;background:'+bg;['transform','none','position','fixed','top','0','left','0','margin','0','z-index','99999','box-shadow','none','border-radius','0'].reduce(function(a,v,i,arr){if(i%2===0)s.style.setProperty(v,arr[i+1],'important');return a;},0);document.body.appendChild(s);Array.prototype.slice.call(document.body.children).forEach(function(c){if(c!==s&&c.tagName!=='SCRIPT')c.remove();});})();<\/script>`;
  let out = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + base) : base + html;
  out = /<\/body>/i.test(out) ? out.replace(/<\/body>/i, iso + '</body>') : out + iso;
  return out;
}
function fitFrame(frame) {
  const box = frame.parentElement; if (!box || !box.clientWidth) return; // not laid out yet — the observer will call again
  const w = +frame.dataset.w || 1080, h = +frame.dataset.h || 1350;
  const s = box.clientWidth / w;
  frame.style.width = w + 'px'; frame.style.height = h + 'px'; frame.style.transform = `scale(${s})`;
}
const sizer = new ResizeObserver((entries) => { for (const e of entries) { const f = e.target.querySelector('iframe[data-w]'); if (f) fitFrame(f); } });
const lazy = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { lazy.unobserve(e.target); e.target.dispatchEvent(new Event('lazyload')); }
}, { rootMargin: '300px' });
function boardFrame(source, board, { lazyLoad = true } = {}) {
  const w = board?.w || 1080, h = board?.h || 1350;
  const box = el('div', { class: 'thumb', style: `aspect-ratio:${w}/${h}` }, el('div', { class: 'ph' }, 'preview'));
  const load = async () => {
    try {
      const html = await text(source);
      const f = el('iframe', { 'data-w': w, 'data-h': h, sandbox: 'allow-scripts allow-same-origin', loading: 'lazy', title: board?.label || source });
      f.srcdoc = previewDoc(html, dirOf(source), board?.label);
      box.replaceChildren(f); fitFrame(f); sizer.observe(box);
    } catch (e) { box.replaceChildren(el('div', { class: 'ph' }, 'preview failed')); }
  };
  if (lazyLoad) { box.addEventListener('lazyload', load); lazy.observe(box); } else load();
  return box;
}

// ── shared bits ───────────────────────────────────────────────────────────
const statusBadge = (fm) => fm?.status ? el('span', { class: `badge s-${fm.status}` }, fm.status) : null;
function bundleBadges(b) {
  const out = [el('span', { class: `badge k-${b.kind}` }, b.kind)];
  if (b.fm?.type) out.push(el('span', { class: 'badge' }, b.fm.type));
  if (b.fm?.difficulty) out.push(el('span', { class: 'badge' }, b.fm.difficulty));
  if (b.fm?.language) out.push(el('span', { class: 'badge' }, String(b.fm.language)));
  const s = statusBadge(b.fm); if (s) out.push(s);
  if (b.fm?.schedule) out.push(el('span', { class: 'badge' }, String(b.fm.schedule).replace('T', ' ')));
  if (Array.isArray(b.fm?.channels) && b.fm.channels.length) out.push(el('span', { class: 'badge' }, b.fm.channels.join(' · ')));
  if (b.boards.length) out.push(el('span', { class: 'badge' }, `${b.boards.length} board${b.boards.length > 1 ? 's' : ''}`));
  if (b.exports.length) out.push(el('span', { class: 'badge' }, `${b.exports.length} export${b.exports.length > 1 ? 's' : ''}`));
  return el('div', { class: 'badges' }, out);
}
function bundleCard(slug, b) {
  const href = `#/b/${slug}/bundle/${encodeURIComponent(b.dir)}`;
  const png = b.exports.find((p) => /\.(png|jpe?g|webp)$/i.test(p) && !/cover-.*-1x1/.test(p));
  let thumb;
  if (png) thumb = el('div', { class: 'thumb', style: `aspect-ratio:${b.boards[0]?.w || 1080}/${b.boards[0]?.h || 1350}` }, el('img', { src: '/f/' + png, loading: 'lazy', alt: '' }));
  else if (b.source) thumb = boardFrame(b.source, b.boards[0]);
  else thumb = el('div', { class: 'thumb', style: 'aspect-ratio:4/5' }, el('div', { class: 'ph' }, 'no source.html — brief only'));
  return el('a', { class: 'card', href }, thumb, el('div', { class: 'meta' }, el('div', { class: 'title' }, b.slug), bundleBadges(b), b.caption ? el('div', { style: 'color:var(--mute);font-size:12px' }, b.caption) : null));
}
function allBundles(B) {
  const out = [...B.organic.posts];
  for (const e of B.organic.experiments) out.push(...e.drafts.map((d) => ({ ...d, experiment: e.slug })));
  for (const c of B.paid.campaigns) out.push(...c.bundles.map((d) => ({ ...d, campaign: c.slug })));
  return out;
}
const setMain = (...kids) => { const m = $('#main'); m.replaceChildren(...kids); m.scrollTop = 0; window.scrollTo(0, 0); };
const crumbs = (...parts) => el('div', { class: 'crumbs' }, parts.flatMap((p, i) => [i ? ' / ' : null, p]));

// ── views ─────────────────────────────────────────────────────────────────
async function viewHome() {
  const list = await brands();
  setMain(
    el('h1', {}, 'Brands'),
    el('p', { class: 'sub' }, `${list.length} brand folder${list.length === 1 ? '' : 's'} under brands/ (excluding _template). Read-only view of the repo on disk.`),
    el('div', { class: 'grid', style: 'grid-template-columns:repeat(auto-fill,minmax(300px,1fr))' }, list.map((b) => el('a', { class: 'card', href: `#/b/${b.slug}` }, el('div', { class: 'meta' },
      el('div', { class: 'title', style: 'font-size:16px' }, b.name),
      el('div', { class: 'pathline' }, `brands/${b.slug}/`),
      el('div', { style: 'color:var(--soft);font-size:13px' }, b.summary),
      el('div', { class: 'badges' }, el('span', { class: 'badge' }, `${b.counts.posts} posts`), el('span', { class: 'badge' }, `${b.counts.campaigns} campaigns`), el('span', { class: 'badge' }, `${b.counts.postTypes} post types`)))))),
  );
}

async function viewOverview(B) {
  const bundles = allBundles(B);
  const byStatus = {};
  for (const b of bundles) byStatus[b.fm?.status || 'n/a'] = (byStatus[b.fm?.status || 'n/a'] || 0) + 1;
  const recent = [...bundles].sort((a, b) => b.mtime - a.mtime).slice(0, 8);
  const readme = B.docs.find((d) => d.name === 'README.md');
  const logMd = B.log ? await text(B.log) : '';
  const latest = logMd ? (logMd.split(/\n(?=## )/).find((s) => s.startsWith('## ')) || '') : '';
  setMain(
    crumbs(el('a', { href: '#/' }, 'Brands'), B.name),
    el('h1', {}, B.name), el('p', { class: 'sub' }, B.summary),
    el('div', { class: 'tiles' },
      el('div', { class: 'tile' }, el('b', {}, B.organic.posts.length), el('span', {}, 'organic posts')),
      el('div', { class: 'tile' }, el('b', {}, B.organic.experiments.reduce((n, e) => n + e.drafts.length, 0)), el('span', {}, `experiment drafts · ${B.organic.experiments.length} exp.`)),
      el('div', { class: 'tile' }, el('b', {}, B.paid.campaigns.reduce((n, c) => n + c.bundles.length, 0)), el('span', {}, `paid creatives · ${B.paid.campaigns.length} campaigns`)),
      el('div', { class: 'tile' }, el('b', {}, B.postTypes.length), el('span', {}, 'post types')),
      el('div', { class: 'tile' }, el('b', {}, B.organic.calendars.length + B.organic.briefs.length), el('span', {}, 'calendars + briefs')),
      ...Object.entries(byStatus).sort().map(([s, n]) => el('div', { class: 'tile' }, el('b', {}, n), el('span', { class: `badge s-${s}` }, s)))),
    el('div', { class: 'two' },
      el('div', {},
        el('h2', {}, 'Recently changed'),
        el('div', { class: 'list' }, recent.map((b) => el('a', { href: `#/b/${B.slug}/bundle/${encodeURIComponent(b.dir)}` }, el('span', {}, `${b.slug} `, el('span', { class: `badge k-${b.kind}` }, b.kind), ' ', statusBadge(b.fm) || ''), el('small', {}, fmt(b.mtime))))),
        B.log ? el('div', {}, el('h2', {}, 'Decision log — latest entry ', el('a', { href: `#/b/${B.slug}/docs?path=${encodeURIComponent(B.log)}`, style: 'font-size:12px;font-weight:400' }, 'open LOG.md')), el('div', { class: 'doc', html: markdown(latest.slice(0, 2500) + (latest.length > 2500 ? '\n\n…' : ''), dirOf(B.log)) })) : null),
      el('div', {}, el('h2', {}, 'README'), readme ? docView(readme.path, await text(readme.path)) : el('div', { class: 'empty' }, 'No README.md'))),
  );
}

async function viewAssets(B, q) {
  const filter = q.get('f') || 'all';
  const search = (q.get('q') || '').toLowerCase();
  const bundles = allBundles(B);
  const match = (b) => !search || [b.slug, b.caption, b.fm?.type, b.fm?.status, b.campaign, b.experiment, ...(b.boards || []).map((x) => x.label)].join(' ').toLowerCase().includes(search);
  const chips = [['all', 'All'], ['organic', 'Organic posts'], ['experiment', 'Experiments'], ['paid', 'Paid campaigns'], ['templates', 'Post-type templates'], ['brand', 'Brand assets'], ['media', 'Campaign media']];
  const bar = el('div', { class: 'bar' },
    chips.map(([k, l]) => el('a', { href: `#/b/${B.slug}/assets?f=${k}${search ? '&q=' + encodeURIComponent(search) : ''}` }, el('button', { class: k === filter ? 'on' : '' }, l))),
    el('input', { type: 'search', placeholder: 'search slug, type, status, caption…', value: search, oninput: (e) => { clearTimeout(bar._t); bar._t = setTimeout(() => location.hash = `#/b/${B.slug}/assets?f=${filter}&q=${encodeURIComponent(e.target.value)}`, 350); } }));
  const parts = [crumbs(el('a', { href: '#/' }, 'Brands'), el('a', { href: `#/b/${B.slug}` }, B.name), 'Assets'), el('h1', {}, 'Assets'), el('p', { class: 'sub' }, 'Cards show the exported PNG when one exists in export/ (gitignored), otherwise a live render of the first board straight from source.html.'), bar];
  const section = (title, kids, sub) => kids.length ? el('div', {}, el('h2', {}, title), sub ? el('p', { class: 'sub' }, sub) : null, el('div', { class: 'grid' }, kids)) : null;

  if (filter === 'all' || filter === 'organic') {
    const posts = B.organic.posts.filter(match).sort((a, b) => String(b.fm?.schedule || b.slug).localeCompare(String(a.fm?.schedule || a.slug)));
    parts.push(section(`Organic posts · ${posts.length}`, posts.map((b) => bundleCard(B.slug, b))));
  }
  if (filter === 'all' || filter === 'experiment') for (const e of B.organic.experiments) {
    const drafts = e.drafts.filter(match);
    parts.push(section(`Experiment · ${e.slug}`, drafts.map((b) => bundleCard(B.slug, b)), null));
    if (drafts.length && e.docs.length) parts[parts.length - 1].insertBefore(el('div', { class: 'badges', style: 'margin:-6px 0 12px' }, e.docs.map((d) => el('a', { class: 'badge', href: `#/b/${B.slug}/docs?path=${encodeURIComponent(d.path)}` }, d.name))), parts[parts.length - 1].lastChild);
  }
  if (filter === 'all' || filter === 'paid') for (const c of B.paid.campaigns) {
    const bs = c.bundles.filter(match);
    if (!bs.length && filter !== 'paid') continue;
    const head = el('div', {}, el('h2', {}, `Campaign · ${c.slug}`), el('div', { class: 'badges', style: 'margin:-6px 0 12px' }, c.docs.map((d) => el('a', { class: 'badge', href: `#/b/${B.slug}/docs?path=${encodeURIComponent(d.path)}` }, d.title.length > 48 ? d.name : d.title)), c.media.length ? el('a', { class: 'badge', href: `#/b/${B.slug}/assets?f=media&q=${encodeURIComponent(c.slug)}` }, `${c.media.length} media files`) : null, c.designExport.length ? el('span', { class: 'badge' }, `design-export · ${c.designExport.length} files`) : null));
    parts.push(head, bs.length ? el('div', { class: 'grid' }, bs.map((b) => bundleCard(B.slug, b))) : el('div', { class: 'empty' }, 'No renderable bundles in this campaign — see its docs and media.'));
  }
  if (filter === 'all' || filter === 'templates') parts.push(section(`Post-type templates · ${B.postTypes.length}`, B.postTypes.filter((t) => !search || t.name.includes(search)).flatMap((t) => t.templates.map((tp) => el('a', { class: 'card', href: `#/b/${B.slug}/template/${encodeURIComponent(tp.path)}` }, boardFrame(tp.path, tp.boards[0]), el('div', { class: 'meta' }, el('div', { class: 'title' }, t.title), el('div', { class: 'badges' }, el('span', { class: 'badge' }, t.name), el('span', { class: 'badge' }, tp.path.split('/').pop()), el('span', { class: 'badge' }, `${tp.boards.length} boards`))))))));
  if (filter === 'all' || filter === 'brand') parts.push(B.assets.length ? el('div', {}, el('h2', {}, `Brand assets · ${B.assets.length}`), gallery(B.assets.map((a) => a.path))) : null);
  if (filter === 'all' || filter === 'media') for (const c of B.paid.campaigns) {
    const m = c.media.filter((x) => !search || (c.slug + ' ' + x.path).toLowerCase().includes(search));
    if (m.length) parts.push(el('div', {}, el('h2', {}, `Campaign media · ${c.slug}`), gallery(m.map((x) => x.path))));
  }
  if (parts.length <= 4) parts.push(el('div', { class: 'empty' }, 'Nothing matches.'));
  setMain(...parts);
}
function gallery(paths) {
  return el('div', { class: 'gallery' }, paths.map((p) => el('a', { href: '/f/' + p, target: '_blank', rel: 'noopener' },
    /\.(mp4|webm)$/i.test(p) ? el('video', { src: '/f/' + p, muted: true, loop: true, playsinline: true, onmouseenter: (e) => e.target.play(), onmouseleave: (e) => e.target.pause() })
    : /\.(wav|mp3)$/i.test(p) ? el('div', { class: 'ph', style: 'aspect-ratio:4/5;display:grid;place-items:center' }, '♫')
    : el('img', { src: '/f/' + p, loading: 'lazy', alt: '' }),
    el('span', {}, p.split('/').slice(-2).join('/')))));
}

async function viewBundle(B, dir, q) {
  const b = allBundles(B).find((x) => x.dir === dir);
  if (!b) return setMain(el('div', { class: 'empty' }, 'Bundle not found: ' + dir));
  const bi = Math.min(+(q.get('board') || 0), Math.max(0, b.boards.length - 1));
  const board = b.boards[bi];
  const left = el('div', { style: 'flex:1 1 420px;min-width:0;max-width:640px' });
  if (b.source) {
    if (b.boards.length > 1) left.append(el('div', { class: 'tabs' }, b.boards.map((x, i) => el('a', { href: `#/b/${B.slug}/bundle/${encodeURIComponent(dir)}?board=${i}` }, el('button', { class: i === bi ? 'on' : '' }, x.label)))));
    left.append(boardFrame(b.source, board, { lazyLoad: false }));
    left.append(el('p', { class: 'pathline', style: 'margin-top:8px' }, board ? `${board.label} · ${board.w}×${board.h}` : 'no data-screen-label — whole page', ' · ', el('a', { href: '/f/' + b.source, target: '_blank', rel: 'noopener' }, 'open source.html'), ' · ', el('a', { href: '#', onclick: (e) => { e.preventDefault(); navigator.clipboard?.writeText(exportCmd(b)); e.target.textContent = 'copied'; } }, 'copy export command')));
  } else left.append(el('div', { class: 'empty' }, 'No source.html — this bundle is a production brief (capture-based).'));
  const right = el('div', { style: 'flex:1 1 380px;min-width:0' });
  right.append(el('h3', {}, 'post.md'));
  if (b.post) {
    const md = await text(b.post);
    const { body } = splitFrontmatter(md);
    right.append(el('table', { class: 'kv' }, Object.entries(b.fm).map(([k, v]) => el('tr', {}, el('th', {}, k), el('td', {}, typeof v === 'object' && v !== null ? el('pre', { style: 'margin:0;padding:6px 8px' }, JSON.stringify(v, null, 1).replace(/[{}]/g, '').trim()) : String(v))))));
    right.append(el('h3', {}, 'Caption / body'), el('div', { class: 'doc', html: markdown(body, dirOf(b.post)) }));
  } else right.append(el('div', { class: 'empty' }, 'No post.md'));
  if (b.exports.length) right.append(el('h3', {}, `export/ · ${b.exports.length}`), gallery(b.exports));
  else right.append(el('h3', {}, 'export/'), el('div', { class: 'empty', style: 'padding:6px 0' }, 'Nothing rendered yet (export/ is gitignored). ', el('code', {}, exportCmd(b))));
  setMain(
    crumbs(el('a', { href: '#/' }, 'Brands'), el('a', { href: `#/b/${B.slug}` }, B.name), el('a', { href: `#/b/${B.slug}/assets?f=${b.kind}` }, 'Assets'), b.slug),
    el('h1', {}, b.slug), el('div', { class: 'badges', style: 'margin-bottom:6px' }, bundleBadges(b).children.length ? [...bundleBadges(b).children] : null, b.campaign ? el('span', { class: 'badge' }, 'campaign · ' + b.campaign) : null, b.experiment ? el('span', { class: 'badge' }, 'experiment · ' + b.experiment) : null),
    el('p', { class: 'pathline' }, b.dir + '/'),
    el('div', { class: 'row', style: 'margin-top:16px' }, left, right),
  );
}
const exportCmd = (b) => b.boards.some((x) => x.h === 1920 && x.w === 1080 && /reel/i.test(b.fm?.type || b.slug || '')) || (b.boards.length && b.boards.every((x) => x.h === 1920))
  ? `npm run html:to-mp4 -- ${b.source} --out ${b.dir}/export`
  : `npm run html:to-image -- ${b.source} --all --out ${b.dir}/export`;

async function viewTemplate(B, path) {
  const t = B.postTypes.find((x) => x.templates.some((tp) => tp.path === path));
  const tp = t?.templates.find((x) => x.path === path);
  if (!tp) return setMain(el('div', { class: 'empty' }, 'Template not found'));
  const left = el('div', { style: 'flex:1 1 420px;min-width:0;max-width:640px' }, el('div', { class: 'tabs' }, tp.boards.map((x, i) => el('button', { class: i === 0 ? 'on' : '', onclick: (e) => { left.querySelector('.thumb').replaceWith(boardFrame(path, x, { lazyLoad: false })); left.querySelectorAll('button').forEach((bt) => bt.classList.remove('on')); e.target.classList.add('on'); } }, x.label))), boardFrame(path, tp.boards[0], { lazyLoad: false }));
  const right = el('div', { style: 'flex:1 1 380px;min-width:0' }, el('h3', {}, 'spec.md'), t.spec ? docView(t.spec, await text(t.spec)) : el('div', { class: 'empty' }, 'No spec.md'), el('h3', {}, 'files'), el('div', { class: 'list' }, t.files.map((f) => el('a', { href: '/f/' + f, target: '_blank', rel: 'noopener' }, f.split('/').pop()))));
  setMain(crumbs(el('a', { href: '#/' }, 'Brands'), el('a', { href: `#/b/${B.slug}` }, B.name), el('a', { href: `#/b/${B.slug}/assets?f=templates` }, 'Templates'), t.name), el('h1', {}, t.title), el('p', { class: 'pathline' }, path), el('div', { class: 'row', style: 'margin-top:16px' }, left, right));
}

async function viewCalendar(B, q) {
  const events = allBundles(B).filter((b) => b.fm?.schedule && /^\d{4}-\d{2}-\d{2}/.test(String(b.fm.schedule))).map((b) => ({ b, date: String(b.fm.schedule).slice(0, 10), time: String(b.fm.schedule).slice(11, 16) }));
  const unscheduled = allBundles(B).filter((b) => !b.fm?.schedule && b.fm?.status && !['published', 'live', 'done', 'killed'].includes(b.fm.status));
  const months = [...new Set(events.map((e) => e.date.slice(0, 7)))].sort();
  const today = new Date().toISOString().slice(0, 10);
  const month = q.get('m') || (months.includes(today.slice(0, 7)) ? today.slice(0, 7) : months[months.length - 1] || today.slice(0, 7));
  const [Y, M] = month.split('-').map(Number);
  const first = new Date(Date.UTC(Y, M - 1, 1));
  const shift = (d) => { const x = new Date(Date.UTC(Y, M - 1 + d, 1)); return x.toISOString().slice(0, 7); };
  const startDow = (first.getUTCDay() + 6) % 7; // Monday first
  const daysIn = new Date(Date.UTC(Y, M, 0)).getUTCDate();
  const cells = [el('div', { class: 'cal' }, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => el('div', { class: 'dow' }, d)))];
  const grid = cells[0];
  for (let i = 0; i < startDow; i++) grid.append(el('div', { class: 'day off' }));
  for (let d = 1; d <= daysIn; d++) {
    const iso = `${month}-${String(d).padStart(2, '0')}`;
    const evs = events.filter((e) => e.date === iso).sort((a, b) => a.time.localeCompare(b.time));
    grid.append(el('div', { class: 'day' + (iso === today ? ' today' : '') }, el('div', { class: 'n' }, el('span', {}, d), evs.length ? el('span', {}, evs.length) : null),
      evs.slice(0, 6).map((e) => el('a', { class: `ev s-${e.b.fm.status || 'n/a'} k-${e.b.kind}`, href: `#/b/${B.slug}/bundle/${encodeURIComponent(e.b.dir)}`, title: `${e.time} ${e.b.slug} · ${e.b.fm.status || ''} · ${(e.b.fm.channels || []).join(',')}` }, `${e.time} ${e.b.fm.type || e.b.slug}`)),
      evs.length > 6 ? el('a', { class: 'ev', href: `#/b/${B.slug}/assets?q=${iso}`, style: 'color:var(--mute)' }, `+${evs.length - 6} more`) : null));
  }
  const monthEvents = events.filter((e) => e.date.startsWith(month)).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  setMain(
    crumbs(el('a', { href: '#/' }, 'Brands'), el('a', { href: `#/b/${B.slug}` }, B.name), 'Calendar'),
    el('h1', {}, 'Calendar'), el('p', { class: 'sub' }, `Built from the schedule field of every post.md (organic, experiments, paid). ${events.length} scheduled bundles across ${months.length} month${months.length === 1 ? '' : 's'}.`),
    el('div', { class: 'bar' }, el('a', { href: `#/b/${B.slug}/calendar?m=${shift(-1)}` }, el('button', {}, '‹')), el('b', { style: 'min-width:120px;text-align:center' }, first.toLocaleString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })), el('a', { href: `#/b/${B.slug}/calendar?m=${shift(1)}` }, el('button', {}, '›')), el('span', { style: 'width:12px' }), months.map((m) => el('a', { href: `#/b/${B.slug}/calendar?m=${m}` }, el('button', { class: m === month ? 'on' : '' }, m)))),
    ...cells,
    el('div', { class: 'two', style: 'margin-top:28px' },
      el('div', {}, el('h2', {}, `This month · ${monthEvents.length}`), el('div', { class: 'list' }, monthEvents.map((e) => el('a', { href: `#/b/${B.slug}/bundle/${encodeURIComponent(e.b.dir)}` }, el('span', {}, `${e.date} ${e.time} · ${e.b.slug} `, statusBadge(e.b.fm) || '', ' ', el('span', { class: `badge k-${e.b.kind}` }, e.b.kind)), el('small', {}, (e.b.fm.channels || []).join(' · ')))), monthEvents.length ? null : el('div', { class: 'empty' }, 'Nothing scheduled this month.')),
        el('h2', {}, `Unscheduled, still open · ${unscheduled.length}`), el('div', { class: 'list' }, unscheduled.map((b) => el('a', { href: `#/b/${B.slug}/bundle/${encodeURIComponent(b.dir)}` }, el('span', {}, `${b.slug} `, statusBadge(b.fm) || ''), el('small', {}, b.kind))))),
      el('div', {}, el('h2', {}, `Calendar files · ${B.organic.calendars.length}`), docList(B, B.organic.calendars), el('h2', {}, `Daily briefs · ${B.organic.briefs.length}`), docList(B, B.organic.briefs), el('h2', {}, `Campaign notes · ${B.paid.notes.length}`), docList(B, B.paid.notes))),
  );
}
const docList = (B, docs) => docs.length ? el('div', { class: 'list' }, [...docs].sort((a, b) => b.name.localeCompare(a.name)).map((d) => el('a', { href: `#/b/${B.slug}/docs?path=${encodeURIComponent(d.path)}` }, el('span', {}, d.title === d.name.replace(/\.md$/, '') ? d.name : `${d.title}`), el('small', {}, d.name)))) : el('div', { class: 'empty', style: 'padding:4px 0' }, 'none');

async function viewDocs(B, q) {
  const path = q.get('path');
  const groups = [
    ['Brand', B.docs.filter((d) => d.group === 'brand' || d.group === 'context')],
    ['Templates', [...B.docs.filter((d) => d.group === 'templates'), ...B.postTypes.filter((t) => t.spec).map((t) => ({ path: t.spec, name: t.name + '/spec.md', title: t.title }))]],
    ['Calendars & briefs', [...B.organic.calendars, ...B.organic.briefs]],
    ['Experiments', B.organic.experiments.flatMap((e) => e.docs)],
    ['Campaigns', [...B.paid.notes, ...B.paid.campaigns.flatMap((c) => c.docs)]],
  ];
  const nav = el('div', { style: 'flex:0 0 300px' }, groups.map(([g, docs]) => docs.length ? el('div', {}, el('h3', {}, `${g} · ${docs.length}`), el('div', { class: 'list' }, docs.map((d) => el('a', { href: `#/b/${B.slug}/docs?path=${encodeURIComponent(d.path)}`, style: d.path === path ? 'border-color:var(--accent)' : '' }, el('span', {}, d.title && d.title !== d.name.replace(/\.md$/, '') ? d.title : d.name), el('small', {}, d.path.split('/').slice(2, -1).join('/')))))) : null));
  let reader;
  if (path) {
    const md = await text(path);
    reader = el('div', { style: 'flex:1 1 500px;min-width:0' }, el('p', { class: 'pathline' }, path, ' · ', el('a', { href: '/f/' + path, target: '_blank', rel: 'noopener' }, 'raw')), path.endsWith('.json') ? el('pre', {}, el('code', {}, md)) : docView(path, md));
  } else reader = el('div', { class: 'empty', style: 'flex:1' }, 'Pick a document.');
  setMain(crumbs(el('a', { href: '#/' }, 'Brands'), el('a', { href: `#/b/${B.slug}` }, B.name), 'Docs'), el('h1', {}, 'Docs'), el('p', { class: 'sub' }, 'Every markdown file in the brand folder: identity, context, templates, calendars, briefs, experiments, campaign plans, the decision log.'), el('div', { class: 'row', style: 'align-items:flex-start' }, nav, reader));
}

async function viewChannels(B) {
  const ch = B.channels;
  setMain(crumbs(el('a', { href: '#/' }, 'Brands'), el('a', { href: `#/b/${B.slug}` }, B.name), 'Channels'), el('h1', {}, 'Channels'),
    el('p', { class: 'sub' }, 'From channels.json — the brand\'s aliases in the shared Postiz workspace. Live integration ids are resolved at runtime with BRAND=' + B.slug + ' npm run social:resolve.'),
    ch ? el('div', {}, ch._comment ? el('blockquote', { class: 'doc', style: 'padding:12px 16px' }, ch._comment) : null,
      el('table', { class: 'kv', style: 'max-width:800px;margin-top:12px' }, el('tr', {}, el('th', {}, 'alias'), el('th', {}, 'provider'), el('th', {}, 'handle')), Object.entries(ch.channels || {}).map(([k, v]) => el('tr', {}, el('td', {}, el('code', {}, k)), el('td', {}, v.provider), el('td', {}, v.handle?.startsWith('<') ? el('span', { class: 'badge s-draft' }, v.handle) : v.handle))))) : el('div', { class: 'empty' }, 'No channels.json'),
    el('h2', {}, 'Postiz state in bundles'), el('p', { class: 'sub' }, 'Bundles whose post.md carries a postiz id.'),
    el('div', { class: 'list' }, allBundles(B).filter((b) => b.fm?.postiz_id || b.fm?.postiz_tiktok_id).map((b) => el('a', { href: `#/b/${B.slug}/bundle/${encodeURIComponent(b.dir)}` }, el('span', {}, `${b.slug} `, statusBadge(b.fm) || ''), el('small', {}, [b.fm.postiz_id, b.fm.postiz_tiktok_id].filter(Boolean).join(' · '))))));
}

// ── router ────────────────────────────────────────────────────────────────
async function renderNav(slug, section) {
  const list = await brands();
  $('#brandnav').replaceChildren(el('div', { style: 'color:var(--mute);font-size:11px;text-transform:uppercase;letter-spacing:.08em;padding:0 10px 6px' }, 'Brands'), ...list.map((b) => el('a', { href: `#/b/${b.slug}`, class: b.slug === slug ? 'on' : '', title: b.name }, el('span', {}, b.slug), el('small', {}, b.counts.posts))));
  $('#sectionnav').replaceChildren(...(slug ? [['', 'Overview'], ['assets', 'Assets'], ['calendar', 'Calendar'], ['docs', 'Docs'], ['channels', 'Channels']].map(([s, l]) => el('a', { href: `#/b/${slug}${s ? '/' + s : ''}`, class: (section || '') === s || (s === 'assets' && ['bundle', 'template'].includes(section)) ? 'on' : '' }, l)) : []));
}
async function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [pathPart, query = ''] = hash.split('?');
  const q = new URLSearchParams(query);
  const seg = pathPart.split('/').filter(Boolean);
  try {
    if (seg[0] !== 'b' || !seg[1]) { await renderNav(null); return viewHome(); }
    const slug = decodeURIComponent(seg[1]); const section = seg[2] || '';
    await renderNav(slug, section);
    setMain(el('div', { class: 'empty' }, 'Scanning…'));
    const B = await brand(slug);
    if (section === '') return viewOverview(B);
    if (section === 'assets') return viewAssets(B, q);
    if (section === 'calendar') return viewCalendar(B, q);
    if (section === 'docs') return viewDocs(B, q);
    if (section === 'channels') return viewChannels(B);
    if (section === 'bundle') return viewBundle(B, decodeURIComponent(seg.slice(3).join('/')), q);
    if (section === 'template') return viewTemplate(B, decodeURIComponent(seg.slice(3).join('/')));
    setMain(el('div', { class: 'empty' }, 'Unknown section'));
  } catch (err) { console.error(err); setMain(el('div', { class: 'empty' }, 'Error: ' + err.message)); }
}
window.addEventListener('hashchange', route);
route();
