# Design export — Meta ads for prep service

Claude Design handoff bundle: HTML/CSS/JS prototypes for Albert Prep Meta creatives.

**In this repo:** source material for reel capture and static design reference — not a coding implementation target. Campaign ops docs live one level up ([`brief.md`](../brief.md), [`meta-upload.md`](../meta-upload.md)).

## Reel capture (automated)

From repo root:

```bash
npm run capture:reels
```

Reads `project/Albert Prep - Reels Variantes (standalone).html` by default. Outputs MP4s to [`../output/`](../output/).

## Bundle layout

| Path | Purpose |
|---|---|
| `project/*.html` | Standalone reel animations + `.dc.html` design sources |
| `project/ds/` | Design system (CSS tokens, fonts) |
| `project/assets/` | Logos, marks |
| `project/export/` | Original static PNG export notes (superseded by [`../meta-upload.md`](../meta-upload.md)) |

## Design files (reference)

| File | Role |
|---|---|
| `Albert Prep - Reels Variantes (standalone).html` | **Primary** — two reel variants, used by capture script |
| `Albert Prep - Reels Animees (standalone).html` | Alternate reel set |
| `Meta Ads Reels Variantes.dc.html` | Design canvas — variants B & C |
| `Meta Ads Reels Animees.dc.html` | Design canvas — animated reels |
| `Meta Ads Spe Maths.dc.html` | Design canvas — static ad layouts |

---

*Original handoff note below (from Claude Design export):*

This is a **handoff bundle** from Claude Design (claude.ai/design). The HTML prototypes are not production code — match visuals when implementing elsewhere; read source directly rather than screenshotting.
