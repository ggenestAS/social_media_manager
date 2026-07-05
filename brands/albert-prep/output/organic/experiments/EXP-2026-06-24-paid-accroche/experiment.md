# EXP-2026-06-24-paid-accroche

**Hypothesis:** The paid winner's accroche shell — segment eyebrow + incomplete calc +
automaticity pain line — will beat standard `calcul-du-jour` on organic saves and profile
visits, because it turns the same math into a self-diagnosis moment (speed/reflex anxiety)
instead of a bare comment game, without needing a diagnostic button baked into the image.

**Deviation axis:** Structure + hook (paid accroche arc vs number-first calcul-du-jour) × **surface**
(paper cahier vs navy intro).

**Breaks from:**
- **`calcul-du-jour`** — no segment eyebrow, no pain line, « Calcul *du jour* » pillar label.
- **`EXP-2026-06-22-exam-automatismes`** — exam-context eyebrow, not speed/automaticity framing.
- **`EXP-2026-06-22-outcome-hook`** — goal-first carousel arc; these stay calc-first like paid.
- **`reel` (default)** — opens « Fais-le de tête » + calcul-du-jour label, not paid segment hook.

**Organic guardrails (vs paid):**
- No **Diagnostic gratuit →** button on-slide — comment prompt default; diagnostic only in
  caption on draft 04.
- Same CORE math, verified; no exam-specific operands.
- **One unique calculation per post** — no duplicate operands across the bundle.

**What "worked" would look like:** saves ( « je me suis testé » ), comment answers with
*time* not just result (« 8 s », « j'ai bloqué »), profile visits, and on draft 04 only —
link clicks to prep.albertschool.com. Compare save rate vs a matched `#calcul-du-jour` from
the same week.

**Platform(s):** ig (feed 4:5 + reel) · fb cross-post on feed drafts · tiktok on reels.

## Calc map (unique per draft)

| # | Slug | Calc | Answer | Paid ref |
|---|---|---|---|---|
| 01 | feed-premiere | 3/4 + 2/3 | 17/12 | V-P0 control |
| 02 | feed-terminale | 2⁵ × 2³ | 256 | V-T0 control |
| 03 | reel-accroche | 5/6 − 1/4 | 7/12 | V-P1 · navy |
| 04 | feed-diagnostic | 2/5 + 3/4 | 23/20 | V-P2 · diag caption |
| 05 | reel-premiere-paper | 7² | 49 | V-P4 · paper |
| 06 | reel-terminale-paper | 2³ × 2⁴ | 128 | V-T1 · paper |
| 07 | reel-navy-terminale-18x6 | 18 × 6 | 108 | V-T4 · navy |
| 08 | reel-paper-premiere-pct | 15 % de 80 | 12 | V-P3 · paper |
| 09 | reel-paper-terminale-power | (2³)² | 64 | V-T2 · paper |
| 10 | reel-navy-terminale-sqrt | √50 | 5√2 | V-T3 · navy |
| 11 | reel-paper-premiere-square | 19² | 361 | organic stretch |
| 12 | reel-paper-premiere-comment | 3/4 de 120 | 90 | comment-only · fraction · 3 s |
| 13 | reel-paper-terminale-comment | 10 % de 12 % | 1,2 % | comment-only · % composé · 5 s |
| 14 | reel-navy-premiere-comment | 1 % d'un milliard | 10 M | comment-only · échelle · 5 s |
| 15 | reel-navy-terminale-comment | mille × dix milles | 10 M | comment-only · verbal · 5 s |

## Drafts

Sub-variables = **segment shell** × **modality** × **surface** × **CTA path** × **reveal mode**
(answer reveal vs comment-only).

| # | Slug | Concept | Format |
|---|---|---|---|
| 1 | `01-feed-premiere` | Première shell · V-P0 | feed 4:5 |
| 2 | `02-feed-terminale` | Terminale shell · V-T0 | feed 4:5 |
| 3 | `03-reel-accroche` | Navy → paper reveal · V-P1 | reel |
| 4 | `04-feed-diagnostic-caption` | Première · V-P2 · diagnostic in caption | feed 4:5 |
| 5 | `05-reel-premiere-paper` | Paper cahier · V-P4 · 3 s | reel |
| 6 | `06-reel-terminale-paper` | Paper cahier · V-T1 · 5 s | reel |
| 7 | `07-reel-navy-terminale-18x6` | Navy → paper · V-T4 · 5 s | reel |
| 8 | `08-reel-paper-premiere-pct` | Paper · V-P3 · 5 s | reel |
| 9 | `09-reel-paper-terminale-power` | Paper · V-T2 · 5 s | reel |
| 10 | `10-reel-navy-terminale-sqrt` | Navy → paper · V-T3 · 10 s | reel |
| 11 | `11-reel-paper-premiere-square` | Paper · 19² · 10 s · reveal | reel |
| 12 | `12-reel-paper-premiere-comment` | Paper · 3/4 de 120 · 3 s · **comment-only** | reel |
| 13 | `13-reel-paper-terminale-comment` | Paper · 10 % de 12 % · 5 s · **comment-only** | reel |
| 14 | `14-reel-navy-premiere-comment` | Navy · 1 % d'un milliard · 5 s · **comment-only** | reel |
| 15 | `15-reel-navy-terminale-comment` | Navy · mille × dix milles · 5 s · **comment-only** | reel |

**Reel A/B:** paper (05–06, 08–09, 11–13) vs navy wipe (03, 07, 10, 14–15). **Reveal vs
comment-only** (03–11 vs 12–15): no answer in video; timer ends on `= ?` + pill
「↓ Pose ta réponse en commentaire」. Ship **one reel at a time**; stagger ≥48 h from feed
posts and alternate reveal / comment-only when possible to isolate engagement driver.

## Ship

```bash
EXP=brands/albert-prep/output/organic/experiments/EXP-2026-06-24-paid-accroche

npm run html:to-image -- "$EXP/drafts/01-feed-premiere/source.html" --all --out "$EXP/drafts/01-feed-premiere/export"
npm run html:to-image -- "$EXP/drafts/02-feed-terminale/source.html" --all --out "$EXP/drafts/02-feed-terminale/export"
npm run html:to-image -- "$EXP/drafts/04-feed-diagnostic-caption/source.html" --all --out "$EXP/drafts/04-feed-diagnostic-caption/export"

for d in 03-reel-accroche 05-reel-premiere-paper 06-reel-terminale-paper \
         07-reel-navy-terminale-18x6 08-reel-paper-premiere-pct 09-reel-paper-terminale-power \
         10-reel-navy-terminale-sqrt 11-reel-paper-premiere-square \
         12-reel-paper-premiere-comment 13-reel-paper-terminale-comment \
         14-reel-navy-premiere-comment 15-reel-navy-terminale-comment; do
  npm run html:to-mp4 -- "$EXP/drafts/$d/source.html" --out "$EXP/drafts/$d/export"
done
```

Schedule via postiz-plan. Stagger all posts ≥48 h apart.

**Scheduled 2026-06-24** — calendrier détaillé :
[`../../calendar/2026-06-24-exp-paid-accroche.md`](../../calendar/2026-06-24-exp-paid-accroche.md)  
27 posts Postiz (3 IG feed · 12 IG reel · 12 TikTok · **15 FB**) · mer 20h → ven 18h Paris · statut `QUEUE`.

```bash
# Re-stage (Node 20 required for postiz CLI)
export PATH="$HOME/.nvm/versions/node/v20.19.5/bin:$PATH"
eval "$(npm run -s social:resolve)"
node scripts/stage-experiment.mjs --experiment brands/albert-prep/output/organic/experiments/EXP-2026-06-24-paid-accroche
```

## Related

- Paid learnings: [`../../../paid/campaigns/2026-06-24-accroche-scale/brief.md`](../../../paid/campaigns/2026-06-24-accroche-scale/brief.md)
- Organic map: [`../../../../templates/paid-organic-hook-map.md`](../../../../templates/paid-organic-hook-map.md)
