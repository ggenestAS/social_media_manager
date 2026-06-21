# Meta upload guide — 2026-06-18

Albert Prep — Cahier de calcul mental  
Pack créas Meta Ads (Facebook / Instagram)

## Asset locations

| Asset | Folder |
|---|---|
| Static ads (8 PNG) | `static/` |
| Reel cover images (4 PNG) | `reels/covers/` |
| Reel HTML sources | `meta-ads-for-prep-service/project/` |
| Reel MP4s (generated) | `output/` |

## Static ads — Campagne 1 · Entrée en Première

| File | Size |
|---|---|
| `static/Albert-Prep_Premiere_Feed-1x1_Accroche-calcul.png` | 1080×1080 |
| `static/Albert-Prep_Premiere_Feed-1x1_Promesse-titre.png` | 1080×1080 |
| `static/Albert-Prep_Premiere_Portrait-4x5_Copie-corrigee.png` | 1080×1350 |
| `static/Albert-Prep_Premiere_Story-9x16_Diagnostic.png` | 1080×1920 |

## Static ads — Campagne 2 · Entrée en Terminale

| File | Size |
|---|---|
| `static/Albert-Prep_Terminale_Feed-1x1_Accroche-vitesse.png` | 1080×1080 |
| `static/Albert-Prep_Terminale_Feed-1x1_Pression-Bac.png` | 1080×1080 |
| `static/Albert-Prep_Terminale_Portrait-4x5_Tableau-noir.png` | 1080×1350 |
| `static/Albert-Prep_Terminale_Story-9x16_Reprends.png` | 1080×1920 |

## Reel covers (static thumbnail / story image)

| File | Size |
|---|---|
| `reels/covers/Albert-Prep_Premiere_Reel-cover_9x16.png` | 1080×1920 |
| `reels/covers/Albert-Prep_Terminale_Reel-cover_9x16.png` | 1080×1920 |
| `reels/covers/Albert-Prep_Premiere_Reel-cover_La-correction_9x16.png` | 1080×1920 |
| `reels/covers/Albert-Prep_Terminale_Reel-cover_Avant-Apres_9x16.png` | 1080×1920 |

## Format placement in Meta

| Ratio | Size | Placement |
|---|---|---|
| 1:1 | 1080×1080 | Facebook Feed, Instagram Feed, Explore |
| 4:5 | 1080×1350 | Feed (recommended — more mobile screen) |
| 9:16 | 1080×1920 | Stories, Reels |

Accepted: JPG or PNG, < 30 Mo. All PNGs above are conformant.

## Ad copy (enter in Ads Manager)

Visuals do not include primary text or headline — enter them in Meta for A/B testing.
Full copy variants: [`brief.md`](brief.md).

**Première**

- Primary: « La Spé Maths va vite. Un diagnostic gratuit + 5 min/jour pour consolider tes automatismes avant la rentrée. »
- Headline: Prêt pour la Spé Maths ?
- CTA: En savoir plus → prep.albertschool.com

**Terminale**

- Primary: « Avant l'année du Bac, récupère tes réflexes de calcul. Diagnostic gratuit, puis un sprint de 21 jours. »
- Headline: Comprendre ne suffit pas, il faut aller vite.
- CTA: En savoir plus → prep.albertschool.com

## Animated Reels (video)

Meta serves Reels as **video** (MP4). Generate from repo root:

```bash
# Sources: meta-ads-for-prep-service/project/
#   Albert Prep - Reels Variantes (standalone).html
npm run capture:reels
```

Outputs in `output/`:

- `reel-<slug>.mp4` — one per 9:16 screen, full-frame (not the design presentation)
- `preview-<slug>.png` — verify correct reel before upload

Pair each MP4 with a matching file from `reels/covers/` as the reel cover image.

**Meta video specs:** MP4/MOV, 9:16, ≥1080×1920, < 4 GB, Reels up to 90 s (our loops: ~8.5 s).
