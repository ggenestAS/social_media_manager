# Social Content Factory

Plan, generate, and ship **organic** (Instagram / Facebook / TikTok) and
**paid** (Meta Ads) social content. The repo is organized into three layers so
multiple brands can share one toolchain without entangling their content.

## Three layers

```
GENERIC TOOLING (account-independent, shared by every brand)
├── app/                   Brand browser — local read-only web UI (npm run browse)
├── tools/                 HTML → PNG / MP4 export CLIs (Playwright + ffmpeg)
├── scripts/               resolve-channels.mjs (Postiz alias → live id)
├── .agents/skills/        Brand-agnostic skills: organic-post, postiz-plan, postiz
└── .env                   Shared POSTIZ_API_KEY (one Postiz workspace for all brands)

BRANDS (one self-contained folder per brand)
└── brands/
    ├── _template/         Skeleton — copy to add a brand
    └── <brand>/
        ├── README.md      Per-brand orientation (read first)
        ├── brand.md       INPUT: mission, identity, voice, language
        ├── channels.json  INPUT: this brand's Postiz channel aliases
        ├── assets/        INPUT: profile, cover, logos
        ├── context/       INPUT: product/offer context for copy
        ├── templates/     INPUT: design-system.md + post-types/<type>/{template.html, spec.md}
        └── output/        GENERATED: organic posts/calendar, paid campaigns
```

**Inputs** are hand-authored and stable. **Outputs** are generated and churn —
everything regenerable lives under `brands/<brand>/output/`.

## The post bundle

Every deliverable — an organic post or a paid creative — is a folder with the
same three names, so skills never branch on context:

```
<date>-<type>-<nnn>/
├── source.html   the renderable
├── post.md       YAML frontmatter (type, channels, schedule, status, postiz_id) + caption
└── export/       rendered PNG/MP4 (gitignored)
```

State (status, schedule, postiz id) lives in `post.md` frontmatter — never in the
folder name, so nothing is renamed across its lifecycle.

## Brands

| Brand | Product | Status |
|---|---|---|
| [`brands/albert-prep/`](brands/albert-prep/) | Mental-math training, "Le Cahier" identity | **On hold** (2026-09-21) — accounts converted to albert-prep-agent |
| [`brands/prep-ai/`](brands/prep-ai/) | Exam agent, previous identity (Prep Albert, monochrome chat) | Paid-first, one experiment staged |
| [`brands/albert-prep-agent/`](brands/albert-prep-agent/) | Exam agent, "Albert Prep" (black frame + press mechanic) — owns the albert.prep / albertprep accounts | First Meta campaign + first organic bundles staged |

With several brands, set `BRAND=<brand>` for the scripts that resolve one
(`social:resolve` requires it; `stage:day` defaults to `albert-prep-agent`).
Start at each brand's README.

## Browse everything locally

```bash
npm run browse      # http://127.0.0.1:4173 — brands, assets (live previews), calendars, docs
```

A read-only UI over `brands/` (see [`app/README.md`](app/README.md)): every
bundle renders straight from its `source.html`, so you can review posts,
campaign creatives and experiment drafts without exporting PNGs first.

## Common commands

```bash
# Export a post bundle to media
npm run html:to-image -- brands/<brand>/output/organic/posts/<slug>/source.html --width 1080 --height 1350 --out brands/<brand>/output/organic/posts/<slug>/export
npm run html:to-mp4   -- brands/<brand>/output/organic/posts/<slug>/source.html --out brands/<brand>/output/organic/posts/<slug>/export

# Paid reels (campaign batch encoder)
npm run capture:reels

# Postiz: status, channels, resolve this brand's live ids
npm run social:status
npm run social:resolve          # one brand → automatic; many → BRAND=<brand> npm run social:resolve
```

## Setup (one time)

```bash
npm install
npx playwright install chromium
# ffmpeg required — WSL: sudo apt install ffmpeg
cp .env.example .env            # then set POSTIZ_API_KEY (shared workspace)
```

## Add a brand

```bash
cp -r brands/_template brands/<new-brand>   # then fill it in — see brands/_template/README.md
```

## Skills

- **organic-plan** — agent-authored daily brief at volume (8–10 assets/day,
  cross-post fan-out). `.agents/skills/organic-plan/`
- **organic-post** — create a post bundle for the active brand (reads the brand's
  `templates/`). `.agents/skills/organic-post/`
- **postiz-plan** — calendar → export → Postiz drafts/scheduling.
  `.agents/skills/postiz-plan/`
- **postiz** — authoritative Postiz CLI command reference. `.agents/skills/postiz/`
- **experiment** — design a content experiment + N shippable drafts that break
  out of the brand's post-types while staying on-brand. `.agents/skills/experiment/`

## Content factory plumbing

```bash
# Seatbelt — agent recomputes; script refuses wrong arithmetic
npm run verify:math -- --expr "48*11" --expect 528

# Batch export + Postiz drafts for all bundles on a date
eval "$(npm run -s social:resolve)"
npm run stage:day -- --date 2026-06-22 --export-missing
```

Volume constraints for Albert Prep: `brands/albert-prep/content-engine.config.json`
(brief template: `brands/albert-prep/templates/daily-brief.template.md`).
