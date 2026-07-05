# Meta upload — Accroche scale (2026-06-24)

8 new static 1:1 variants · controls stay in [`../2026-06-18-meta/static/`](../2026-06-18-meta/static/)

## Controls (do not re-upload — keep running)

| ID | File |
|---|---|
| V-P0 | `../2026-06-18-meta/static/Albert-Prep_Premiere_Feed-1x1_Accroche-calcul.png` |
| V-T0 | `../2026-06-18-meta/static/Albert-Prep_Terminale_Feed-1x1_Accroche-vitesse.png` |

## New variants (`static/`)

| ID | File | Hero |
|---|---|---|
| V-P1 | `Albert-Prep_Premiere_Feed-1x1_Accroche-V-P1_5-6-moins-1-4.png` | `5/6 − 1/4 = ?` |
| V-P2 | `Albert-Prep_Premiere_Feed-1x1_Accroche-V-P2_2-5-plus-3-4.png` | `2/5 + 3/4 = ?` |
| V-P3 | `Albert-Prep_Premiere_Feed-1x1_Accroche-V-P3_15pct-de-80.png` | `15 % de 80 = ?` |
| V-P4 | `Albert-Prep_Premiere_Feed-1x1_Accroche-V-P4_7-carre.png` | `7² = ?` |
| V-T1 | `Albert-Prep_Terminale_Feed-1x1_Accroche-V-T1_2puiss3-fois-2puiss4.png` | `2³ × 2⁴ = ?` |
| V-T2 | `Albert-Prep_Terminale_Feed-1x1_Accroche-V-T2_2puiss3-carre.png` | `(2³)² = ?` |
| V-T3 | `Albert-Prep_Terminale_Feed-1x1_Accroche-V-T3_racine-50.png` | `√50 = ?` |
| V-T4 | `Albert-Prep_Terminale_Feed-1x1_Accroche-V-T4_18-fois-6.png` | `18 × 6 = ?` |

All **1080×1080** PNG · Feed + Explore placement.

## Ad copy

See [`brief.md`](brief.md) — same primary text / headline per segment for all variants in that ad set.

## Re-export

```bash
npm run html:to-image -- \
  "brands/albert-prep/output/paid/campaigns/2026-06-18-meta/design-export/project/Meta Ads Accroche Variants.html" \
  --all --out brands/albert-prep/output/paid/campaigns/2026-06-24-accroche-scale/static
```

Then rename slugs to `Albert-Prep_*` filenames (see table above).  
Source must be the **standalone `.html`** (not `.dc.html`) — exact clone of P1/T1 inline styles.
