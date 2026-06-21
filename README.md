# Social Media Manager — Albert Prep

Plan, generate, and ship **paid** (Meta Ads) and **organic** (Instagram / Facebook) content for [Albert Prep](https://prep.albertschool.com).

Product context for accurate copy: [`context/brand/app-product.md`](context/brand/app-product.md).

## Layout

```
context/brand/          Shared product & brand knowledge
planner/                Content calendar & campaign planning
content/
├── paid/meta/          Paid ad campaigns (brief → assets → upload)
└── organic/            Organic posts, briefs, channel assets
tools/                  HTML → PNG / MP4 export CLIs
.agents/skills/         Agent skills (organic-post, postiz-plan, …)
.cursor/mcp.json        MCP integrations (Postiz scheduling)
```

### Paid (`content/paid/meta/<date>/`)

| Path | Purpose |
|---|---|
| `brief.md` | Strategy, audiences, ad copy |
| `upload-checklist.md` | Asset inventory + Meta upload guide |
| `design-export/` | HTML reel sources + design system |
| `static/` | Static ad PNGs (1:1, 4:5, 9:16) |
| `reels/covers/` | Reel cover images |
| `reels/scripts/` | Reel capture automation |
| `output/` | Generated MP4s (gitignored) |

### Organic (`content/organic/`)

| Path | Purpose |
|---|---|
| `brief/` | Editorial strategy & designer briefs |
| `posts/` | Generated HTML posts (1080×1350 / 1080×1920) |
| `assets/` | Profile photo, cover image, etc. |

### Planner (`planner/`)

| Path | Purpose |
|---|---|
| `content-calendar.template.md` | Weekly/monthly slot template |
| `campaigns/` | Roll-up plans linking paid + organic for a period |

## Active campaign

**[2026-06-18 Meta paid](content/paid/meta/2026-06-18/)** — Première & Terminale entry angles for Spé Maths prep.

| Doc | Purpose |
|---|---|
| [`brief.md`](content/paid/meta/2026-06-18/brief.md) | Audiences, angles, ad copy |
| [`upload-checklist.md`](content/paid/meta/2026-06-18/upload-checklist.md) | Asset inventory + Meta specs |
| [`design-export/`](content/paid/meta/2026-06-18/design-export/) | Reel HTML sources |

Planning doc: [`planner/campaigns/2026-06-18-meta.md`](planner/campaigns/2026-06-18-meta.md)

## Setup (one time)

```bash
npm install
npx playwright install chromium
# ffmpeg required — WSL: sudo apt install ffmpeg
cp .env.example .env   # then set POSTIZ_API_KEY
```

### Postiz MCP (scheduling)

Project MCP config: [`.cursor/mcp.json`](.cursor/mcp.json)

1. Get your API key: Postiz → **Settings → Developers → Public API**
2. Copy [`.env.example`](.env.example) → `.env` and set `POSTIZ_API_KEY`
3. Export the variable so Cursor can read it (Windows: set in System Environment Variables, or launch Cursor from a shell where it's set)
4. Reload Cursor → **Settings → MCP** — `postiz` should connect
5. Test: ask the agent to *"List my connected social media accounts"*

URL pattern: `https://mcp.postiz.com/mcp/<API_KEY>` (key injected via `${env:POSTIZ_API_KEY}` in config).

## Tools — HTML export

Generic CLIs in [`tools/`](tools/) (Playwright + ffmpeg). See [`tools/README.md`](tools/README.md).

```bash
# PNG — one artboard, all artboards, or full-page organic post
npm run html:to-image -- path/to/file.html --all
npm run html:to-image -- content/organic/posts/portrait_….html --width 1080 --height 1350

# MP4 — animated reel screens
npm run html:to-mp4 -- path/to/reels.html --all
```

## Generate paid reel MP4s

Reel HTML lives in `content/paid/meta/2026-06-18/design-export/project/`. Then:

```bash
npm run capture:reels
# or the generic tool:
npm run html:to-mp4 -- content/paid/meta/2026-06-18/design-export/project/Meta\ Ads\ Reels\ Animees.dc.html --all --out content/paid/meta/2026-06-18/output
```

Outputs land in `content/paid/meta/2026-06-18/output/`:

- `reel-<slug>.mp4` per 9:16 screen
- `preview-<slug>.png` — frame grab to verify framing

## Generate organic posts

Use the Cursor skill in [`.agents/skills/organic-post/`](.agents/skills/organic-post/). Output saves to `content/organic/posts/`.

Schedule with Postiz: skill [`.agents/skills/postiz-plan/`](.agents/skills/postiz-plan/) (CLI + calendar workflow). Interactive scheduling also works via Postiz MCP.

Organic pillars: calcul du jour · astuce · série · reel — see [`content/organic/brief/designer-brief.html`](content/organic/brief/designer-brief.html).

## New paid campaign checklist

1. Copy `content/paid/meta/2026-06-18/` → `content/paid/meta/<date>/`
2. Write `brief.md` and add a row in `planner/campaigns/`
3. Drop static PNGs in `static/`, reel covers in `reels/covers/`
4. Add design export under `design-export/project/`
5. Update `package.json` `capture:reels` path if the campaign id changed
6. Run `npm run capture:reels`, then follow `upload-checklist.md`

## New organic content checklist

1. Duplicate a week block in your content calendar from `planner/content-calendar.template.md`
2. Pick a pillar (1–4) and topic
3. Generate via `.agents/skills/organic-post/` → save to `content/organic/posts/`
4. Export PNG with `npm run html:to-image` · schedule via `.agents/skills/postiz-plan/` or Meta Business Suite
