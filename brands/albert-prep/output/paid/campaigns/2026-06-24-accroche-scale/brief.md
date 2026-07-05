# Accroche scale brief — Meta paid (June 2026)

**Based on:** live winners from [`../2026-06-18-meta/brief.md`](../2026-06-18-meta/brief.md)  
**Product:** Albert Prep — free mental math diagnostic · prep.albertschool.com  
**Format:** static **1:1 feed only** (1080×1080) — clone `P1` / `T1` layout from `Meta Ads Spe Maths.dc.html`  
**Goal:** scale the winning **quiz-interrupt** mechanic; stop funding losers

## What to pause immediately

| Asset | Why |
|---|---|
| `Promesse-titre` (P2 / T2) | ~10× fewer clicks; promise without live problem |
| Reels (*Correction*, *Avant-Après*) | 3–4 clicks total; pedagogical video loses in paid feed |
| `Copie corrigée`, `Tableau noir`, Story-only variants | no evidence; budget → accroches |

Keep the two control ads running while testing variants below.

---

## Creative shell (non-negotiable)

Every variant uses the **same frame** as the live winners:

| Element | Première (paper bg) | Terminale (paper + margin rule) |
|---|---|---|
| Logo + segment tag | top | top — « Entrée en Terminale » |
| Eyebrow | « Prêt pour la Spé Maths ? » | « Tu sais le faire. Mais en combien de temps ? » |
| Hero | one expression, mono ~150px, red `?` | same |
| Pain line | automatismes / rentrée | réflexes / 21 jours / Bac |
| CTA button | **Diagnostic gratuit →** | **Commencer le diagnostic →** |
| Optional badge | « 10 s en tête » (fractions) | omit unless `%` calc |

**Do not** bake Meta primary text into the PNG — keep it in Ads Manager for A/B.  
**Do** bake eyebrow, pain line, and diagnostic CTA (matches live winners).

Design source: duplicate `[data-screen-label="P1 Première 1:1"]` or `T1 Terminale 1:1` screens; swap hero math only.

---

## Variant specs (10 total)

Math verified with `npm run verify:math` on 2026-06-24.

### Première — Entrée en Spé Maths

| ID | Status | On-slide hero | Answer | verify |
|---|---|---|---|---|
| **V-P0** | **control** | `3/4 + 2/3 = ?` | 17/12 | `--expr "3/4+2/3" --expect "17/12"` |
| **V-P1** | new | `5/6 − 1/4 = ?` | 7/12 | `--expr "5/6-1/4" --expect "7/12"` |
| **V-P2** | new | `2/5 + 3/4 = ?` | 23/20 | `--expr "2/5+3/4" --expect "23/20"` |
| **V-P3** | new | `15 % de 80 = ?` | 12 | `--expr "0.15*80" --expect 12` |
| **V-P4** | new | `7² = ?` | 49 | `--expr "7^2" --expect 49` |

**Shared pain line (rotate one):**

- « Si la réponse ne vient pas tout de suite, ce sont tes *automatismes* qui te ralentiront. » *(control copy)*
- « La Spé Maths va vite. Tes calculs doivent *suivre*. »

**Meta copy (Ads Manager — all Première variants):**

- Primary: « La Spé Maths va vite. Un diagnostic gratuit + 5 min/jour pour consolider tes automatismes avant la rentrée. »
- Headline: **Prêt pour la Spé Maths ?** *(match eyebrow)*
- CTA button: **Commencer le diagnostic** or **En savoir plus** → prep.albertschool.com

**Export filenames:**

```
static/Albert-Prep_Premiere_Feed-1x1_Accroche-V-P0_3-4-plus-2-3.png
static/Albert-Prep_Premiere_Feed-1x1_Accroche-V-P1_5-6-moins-1-4.png
static/Albert-Prep_Premiere_Feed-1x1_Accroche-V-P2_2-5-plus-3-4.png
static/Albert-Prep_Premiere_Feed-1x1_Accroche-V-P3_15pct-de-80.png
static/Albert-Prep_Premiere_Feed-1x1_Accroche-V-P4_7-carre.png
```

---

### Terminale — Année du Bac

| ID | Status | On-slide hero | Answer | verify |
|---|---|---|---|---|
| **V-T0** | **control** | `2⁵ × 2³ = ?` | 256 | `--expr "2^5*2^3" --expect 256` |
| **V-T1** | new | `2³ × 2⁴ = ?` | 128 | `--expr "2^3*2^4" --expect 128` |
| **V-T2** | new | `(2³)² = ?` | 64 | `--expr "2^6" --expect 64` |
| **V-T3** | new | `√50 = ?` | 5√2 | `--expr "√50" --expect 7.0710678118654755` |
| **V-T4** | new | `18 × 6 = ?` | 108 | `--expr "18*6" --expect 108` |

**Shared pain line (rotate one):**

- « En Terminale, comprendre ne suffit pas : reprends tes *réflexes* en 21 jours. » *(control copy)*
- « Avant l'année du Bac, la vitesse compte autant que la justesse. »

**Meta copy (Ads Manager — all Terminale variants):**

- Primary: « Avant l'année du Bac, récupère tes réflexes de calcul. Diagnostic gratuit, puis un sprint de 21 jours. »
- Headline: **Comprendre ne suffit pas, il faut aller vite.** or **Tu sais le faire. Mais en combien de temps ?**
- CTA button: **Commencer le diagnostic** → prep.albertschool.com

**Export filenames:**

```
static/Albert-Prep_Terminale_Feed-1x1_Accroche-V-T0_2puiss5-fois-2puiss3.png
static/Albert-Prep_Terminale_Feed-1x1_Accroche-V-T1_2puiss3-fois-2puiss4.png
static/Albert-Prep_Terminale_Feed-1x1_Accroche-V-T2_2puiss3-carre.png
static/Albert-Prep_Terminale_Feed-1x1_Accroche-V-T3_racine-50.png
static/Albert-Prep_Terminale_Feed-1x1_Accroche-V-T4_18-fois-6.png
```

---

## Campaign structure in Ads Manager

```
Campaign: Albert Prep — Accroche scale
├── Ad set: Première — broad (same targeting as winner)
│   ├── V-P0 control  ← keep ~40% of Première budget
│   └── V-P1…P4       ← 15% each, kill <50% of control CTR after 3 days
└── Ad set: Terminale — broad
    ├── V-T0 control  ← keep ~40% of Terminale budget
    └── V-T1…T4       ← 15% each, same kill rule
```

**Optimization:** link clicks → landing page view → (if pixel allows) diagnostic start.  
**Do not** mix Reels or promise statics into these ad sets — they pollute learning.

---

## KPIs to track (fill when live)

| Metric | Control baseline | Scale target |
|---|---|---|
| Link CTR | ~6% implied from your data | ≥ 80% of control |
| CPC | 0,02 € | ≤ 0,03 € |
| LPV rate | — | ≥ 70% of clicks |
| Diagnostic starts / spend | — | primary success metric |
| Cost per diagnostic start | — | beat promise-ad baseline |

---

## Production checklist

1. ~~Duplicate `P1` / `T1` screens~~ → [`../2026-06-18-meta/design-export/project/Meta Ads Accroche Variants.html`](../2026-06-18-meta/design-export/project/Meta%20Ads%20Accroche%20Variants.html) (standalone HTML, inline clone of winners)
2. ~~Export 1080×1080 PNGs~~ → [`static/`](static/) (8 files, 2026-06-24)
3. Upload to Meta; **reuse winning ad set targeting** — do not reset learning on controls.
4. Weekly: promote top variant → new control; retire bottom quartile.

Upload filenames: [`upload-checklist.md`](upload-checklist.md)

---

## Related

- Organic hook mapping: [`../../../templates/paid-organic-hook-map.md`](../../../templates/paid-organic-hook-map.md)
- Original campaign pack: [`../2026-06-18-meta/`](../2026-06-18-meta/)
