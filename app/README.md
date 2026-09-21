# Brand browser (`npm run browse`)

A local, read-only web UI over `brands/`. Zero dependencies (Node `http` +
vanilla JS); it rescans the filesystem on every request, so whatever a skill
or script writes shows up on reload.

```bash
npm run browse                       # http://127.0.0.1:4173
npm run browse -- --port 5000        # other port; --host 0.0.0.0 to expose on the LAN
```

| View | What it shows |
|---|---|
| Brands | Every folder under `brands/` except `_template`, with counts |
| Overview | README, latest LOG.md entry, status tiles, recently changed bundles |
| Assets | Organic posts, experiment drafts, paid creatives (per campaign), post-type templates, brand assets, campaign media. Cards show the exported PNG from `export/` when present, else a **live render** of the first `data-screen-label` board straight from `source.html`. Search + filter chips. |
| Bundle | Board tabs with a scaled live preview, `post.md` frontmatter + caption, `export/` gallery (or the export command to run) |
| Calendar | Month grid built from the `schedule` field of every `post.md` (organic, experiments, paid), unscheduled open drafts, plus the calendar / brief / campaign-note markdown files |
| Docs | Every markdown file in the brand folder, rendered; relative `.md` links stay inside the app |
| Channels | `channels.json` aliases and the bundles that already carry a Postiz id |

## How it works

- `app/server.mjs` — `GET /api/brands`, `GET /api/brands/:slug` (full scan:
  docs, post types, bundles with parsed frontmatter and board list, campaigns
  with media), `GET /api/text?path=` and `GET /f/<repo path>` (files, served
  only from `brands/`; paths are validated against traversal).
- `app/public/` — `index.html`, `style.css`, `app.js` (hash router, small
  markdown renderer, iframe previews). Previews inject a `<base>` tag and an
  isolation script into the source so one board fills the frame — the same
  idea as `tools/lib/html-render.mjs#isolateScreen`, in the browser.
- Bundle detection is structural: any directory under `output/` holding a
  `source.html` or `post.md` is a bundle (depth-limited), so new post types
  and experiment layouts need no code change.
- Frontmatter parsing is a small YAML subset (scalars, inline `[a, b]` /
  `{k: v}`, nested maps and `- item` lists). Anything odd shows up raw in
  the bundle view rather than breaking the page.

Not a deployable app: it binds to localhost, has no auth, and writes nothing.
