# Albert Prep (brand)

Read this first to orient. This folder is fully self-contained: everything an
agent needs to plan, generate, and ship Albert Prep social content lives here.
Generic tooling (HTML→media export, Postiz CLI, skills) lives at the repo root.

## Inputs (hand-authored — the source of truth)

| Path | What |
|---|---|
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

- **Create a post:** organic-post skill → resolves this brand → reads
  `templates/` → writes a bundle under `output/organic/posts/`.
- **Plan / schedule:** postiz-plan skill → calendar + export + Postiz drafts.
- **Render media:** `npm run html:to-image` / `html:to-mp4` (paid reels:
  `npm run capture:reels`).

Per-post state (status, schedule, postiz id) lives in each bundle's `post.md`
frontmatter — never encoded in folder names.
