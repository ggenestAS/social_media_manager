# Campaign brief — 2026-06-18 Meta

**Product:** Albert Prep — free mental math diagnostic + daily drill habit  
**Landing:** prep.albertschool.com  
**Channel:** Meta Ads (Facebook + Instagram)  
**Formats:** static feed/story + animated Reels

## Audiences

Two entry points, same product, different anxiety:

| Segment | Hook | Timing |
|---|---|---|
| **Première** (entering Spé Maths) | Fear of falling behind when pace accelerates | Before rentrée |
| **Terminale** (Bac year) | Pressure to be fast, not just correct | Before / during Bac year |

## Angles

### Première — "Entrée en Spé Maths"

- **Problem:** Spé Maths moves fast; weak automatisms become visible early.
- **Promise:** Free diagnostic + 5 min/day to consolidate reflexes before rentrée.
- **Proof cues:** Diagnostic, daily habit, structured themes (see `context/brand/app-product.md`).

### Terminale — "Année du Bac"

- **Problem:** Understanding isn't enough — exam conditions reward speed.
- **Promise:** Free diagnostic, then a 21-day sprint to recover calculation reflexes.
- **Proof cues:** Fluency framing (Leitner + response time), not just accuracy.

## Ad copy (primary variants)

Text is entered in Meta Ads Manager (not baked into visuals) so it can be A/B tested.

### Première

- **Primary text:** « La Spé Maths va vite. Un diagnostic gratuit + 5 min/jour pour consolider tes automatismes avant la rentrée. »
- **Headline:** Prêt pour la Spé Maths ?
- **CTA:** En savoir plus → prep.albertschool.com

### Terminale

- **Primary text:** « Avant l'année du Bac, récupère tes réflexes de calcul. Diagnostic gratuit, puis un sprint de 21 jours. »
- **Headline:** Comprendre ne suffit pas, il faut aller vite.
- **CTA:** En savoir plus → prep.albertschool.com

## Creative inventory

| Type | Count | Location |
|---|---|---|
| Static ads | 8 | `static/` |
| Reel covers | 4 | `reels/covers/` |
| Reel HTML sources | 2 standalone + 3 `.dc.html` | `design-export/project/` |
| Animated Reels | 2 variants | `output/` (generated) |

See [`upload-checklist.md`](upload-checklist.md) for filenames, dimensions, and placement.

## Reel variants

| Output | Source screen | Cover |
|---|---|---|
| `reel-variante-correction-9-16.mp4` | « La correction » (Première) | `reels/covers/Albert-Prep_Premiere_Reel-cover_La-correction_9x16.png` |
| `reel-variante-avantapres-9-16.mp4` | « Avant / Après » (Terminale) | `reels/covers/Albert-Prep_Terminale_Reel-cover_Avant-Apres_9x16.png` |

Capture isolates each `[data-screen-label]` 9:16 screen from the design file — not the full presentation board.

## Live learnings (Jun 2026)

**Winners:** `Accroche-calcul` (Première) and `Accroche-vitesse` (Terminale) — static 1:1, ~0,02 € CPC, 10×+ vs other creatives.  
**Losers:** Promesse-titre, Reels (Correction / Avant-Après).

**Scale pack:** [`../2026-06-24-accroche-scale/brief.md`](../2026-06-24-accroche-scale/brief.md) · **Organic map:** [`../../../templates/paid-organic-hook-map.md`](../../../templates/paid-organic-hook-map.md)
