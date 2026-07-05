# Albert Prep (brand)

Read this first to orient. This folder is fully self-contained: everything an
agent needs to plan, generate, and ship Albert Prep social content lives here.
Generic tooling (HTML→media export, Postiz CLI, skills) lives at the repo root.

> **Before planning, analyzing, or launching anything: read
> [`LOG.md`](LOG.md)** — the brand's decision log (what we've learned, what's
> running, what we expect, standing infrastructure gotchas). Append an entry
> before ending any session that changed what we believe or do.

## Inputs (hand-authored — the source of truth)

| Path | What |
|---|---|
| [`LOG.md`](LOG.md) | Decision log — analyses, experiment launches, results, decisions, infra caveats |
| [`brand.md`](brand.md) | Mission, audience, "Le Cahier" identity, voice, CTA rules |
| [`context/`](context/) | Product context for accurate copy (`app-product.md`) |
| [`channels.json`](channels.json) | Postiz channel aliases (`{provider, handle}`) |
| [`assets/`](assets/) | Profile photo, cover image |
| [`templates/`](templates/) | [`design-system.md`](templates/design-system.md) (look), [`content-guide.md`](templates/content-guide.md) (what to say), [`post-types/README.md`](templates/post-types/README.md), `content-calendar.template.md`, `post-types/<type>/{template.html, spec.md}` |

## Outputs (generated)

| Path | What |
|---|---|
| `output/organic/calendar/` | Dated content-plan files (temporal roll-up) |
| `output/organic/posts/<date>-<type>-<nnn>/` | One post bundle: `source.html` + `post.md` + `export/` |
| `output/paid/campaigns/<date>-<channel>/` | Campaign: `campaign.md` + `brief.md` + creative bundles + reels pipeline |

## How to work here

- **Plan a day (agent):** organic-plan skill → writes
  `output/organic/briefs/YYYY-MM-DD.md` against
  [`content-engine.config.json`](content-engine.config.json) (~8–10 assets/day,
  cross-post to IG/FB/TikTok, IG feed cap ≤2 carousels).
- **Create a post (agent):** organic-post skill → original `source.html` +
  `post.md` per brief slot (templates are reference, not fill-forms).
- **Verify math (script):** `npm run verify:math -- …` before saving.
- **Stage / schedule (script):** `npm run stage:day -- --date YYYY-MM-DD`
  → export + Postiz drafts. See postiz-plan skill to promote drafts.
- **Render media:** `npm run html:to-image` / `html:to-mp4` (paid reels:
  `npm run capture:reels`).

Per-post state (status, schedule, postiz id) lives in each bundle's `post.md`
frontmatter — never encoded in folder names.
