# Design export — Meta launch (Albert Prep, exam agent)

Claude Design handoff, imported 2026-09-20 from project *Hero background
animation* (`claude.ai/design/p/af40a352-d153-44f9-881b-01b136fb02ea`).
**Provenance only** — the repo's renderable assets are the `source.html`
files in [`../creatives/`](../creatives/), ported to the shared design-system
CSS so `html:to-image` / `html:to-mp4` work without the design runtime.

| File | Role | Ported to |
|---|---|---|
| `project/Meta Campaign Concept.dc.html` | 14-slide concept deck (objective, audience, insight, directions, formats, copy bank, test plan, measurement, timeline) | [`../campaign.md`](../campaign.md), [`../experiment.md`](../experiment.md) |
| `project/Meta Ad Statics.dc.html` | 30 artboards: 5 statement ads (4:5 + 9:16), 4-card carousel, 12 press splits | `creatives/01…08` |
| `project/Meta Reel 1.dc.html` … `Meta Reel 4 - Washington Post.dc.html` | Reel configs (copy variants A/B, scene durations) | `creatives/09…12` |
| `project/meta-reel-1.jsx` | The reel composition (React, on `animations-v3.jsx`) | `templates/post-types/press-reel/reel-timeline.js` (CSS keyframes) |
| `project/animations-v3.jsx`, `tweaks-panel.jsx`, `deck-stage.js`, `support.js`, `image-slot.js` | Design runtime scaffolding the `.dc.html` files import | — |

Not imported: the `uploads/*.png` pasted screenshots and the site/prototype
files (`Prep Albert.dc.html`, `Albert Home.dc.html`, …). Product copy from
`strings.js` was folded into [`../../../../context/product.md`](../../../../context/product.md).

Re-synced 2026-09-21 with the design's safe-zone revision (`meta-reel-1.jsx`
SAFE = top 250 / bottom 480 / right 160, panel at y = 800; `Split 1 · 9:16`
padding). The design's five statement 9:16 boards (`Ad 1–5 · 9:16`) were **not**
updated in the design; the repo applies the same safe zone to them anyway.
The port also fixes two things the design revision leaves: the headline
building inside the caption band during the first scene (paper bottom padding
animated 560 → 80) and the ×1.05 zoom pushing edges into the bands (wider
paper/panel margins). See LOG.md 2026-09-21.

Known deltas between design and port:
- Mastheads are rendered as **text** (Georgia 700) — the design pulled outlet
  logos from Wikimedia via `<image-slot>`; logo use needs rights sign-off.
- The design flags EN press headlines as **paraphrased** — verify exact
  wording before use (carried into every `post.md` checklist).
- Helvetica/Georgia fall back to Liberation Sans / DejaVu Serif on Linux
  renderers; line breaks can differ from the design canvas by a word.
