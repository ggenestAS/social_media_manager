# albert-prep-agent — Albert Prep, the exam agent

Social content for **Albert Prep**, the AI exam agent ("Tell it your exam. It
builds your plan and trains you daily until you sit it."). Imported from the
Claude Design project *Hero background animation* (files `Meta Campaign
Concept`, `Meta Ad Statics`, `Meta Reel 1–4`) on 2026-09-20.

> **Naming resolved 2026-09-21.** "Albert Prep" now means this brand. The
> mental-math brand [`brands/albert-prep/`](../albert-prep/) is **on hold** and
> its social accounts — `albert.prep` (IG), `Albert Prep` (FB), `albertprep`
> (TikTok) — are being converted to this identity; they are declared in this
> folder's `channels.json`. The folder keeps the slug `albert-prep-agent` so
> paths stay stable. [`brands/prep-ai/`](../prep-ai/) remains the previous
> identity of the same product (archive candidate). Logged in [`LOG.md`](LOG.md).

Read in order:

1. [`LOG.md`](LOG.md) — decision log; open blockers live here.
2. [`brand.md`](brand.md) — identity, audience, voice, hard rules.
3. [`context/product.md`](context/product.md) — product truth, destinations
   and attribution rules for every paid click.
4. [`templates/design-system.md`](templates/design-system.md) — the visual
   contract. Its CSS is embedded verbatim in every artboard.
5. [`templates/content-guide.md`](templates/content-guide.md) — what to say.
6. [`templates/post-types/`](templates/post-types/) — the organic menu
   (`statement`, `press-split`, `carousel`, `press-reel`).

## Inputs (hand-authored)

| Path | What |
|---|---|
| `brand.md` · `context/` · `channels.json` · `assets/` | Identity, product facts, channel aliases (the converted albert.prep accounts), wordmark SVG, [profile kit](assets/README.md) |
| `templates/design-system.md` | Palette, type, shared CSS, signatures, artboard conventions |
| `templates/content-guide.md` | Handle/CTA/hashtag rules, hooks, copy bank pointers |
| `templates/post-types/<type>/{spec.md, template.html}` | The organic menu; `press-reel/reel-timeline.js` is the animation engine inlined by reel bundles |
| `templates/content-calendar.template.md` | Planning grid |

## Outputs (generated)

| Path | What |
|---|---|
| [`output/paid/campaigns/2026-09-20-meta-launch/`](output/paid/campaigns/2026-09-20-meta-launch/) | First Meta campaign: `campaign.md`, `experiment.md`, 12 creative bundles (5 statements, 1 carousel, 12 press splits in 2 bundles, 4 reels), `design-export/` |
| [`output/organic/posts/`](output/organic/posts/) | First four organic bundles (carousel, press split, statement, press reel) |
| [`output/organic/calendar/`](output/organic/calendar/) | Dated roll-ups |

## How to work here

- **Create a post:** organic-post skill → reads this folder's templates.
- **Render statics:** `npm run html:to-image -- <bundle>/source.html --all --out <bundle>/export`
- **Render reels:** `npm run html:to-mp4 -- <bundle>/source.html --out <bundle>/export`
  (the reel sets `data-speed="1"`; pacing is authored, don't time-stretch).
- **Paid:** upload manually via Meta Ads Manager — no ad account is wired to
  this repo. Copy, URLs and checklist are in the campaign's `campaign.md`.
- **Postiz:** `BRAND=albert-prep-agent npm run social:resolve` → the converted
  accounts. Profile picture, covers, highlight covers and bios for the
  switch-over: [`assets/README.md`](assets/README.md).

Per-post state (status, schedule, Postiz id) lives in each bundle's `post.md`
frontmatter, never in folder names.
