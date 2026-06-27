# EXP-2026-06-25-quiz-rafale

**Hypothesis:** A rapid-fire "défi" reel that fires 5 timed questions in a row
(one asset, ~30 s) — **no answers shown** — will beat the single-question `reel`
on watch-time, replays and comments, because it's a self-test the viewer must
play along with (answer before each chrono ends) and a reason to comment a score
+ check answers. The single-calc reel ends in 8 s and gives the answer for free.

**Deviation axis:** structure (series of 5 timed question-only beats in one asset
+ scoreboard CTA) + modality (sound-led chrono: "go" per question, 3·2·1 ticks).

**Breaks from:** `reel` post-type — that type is exactly **one** calc that
ends on a big answer reveal (`2s intro + timer + 3s reveal`). This is a multi-beat
**question-only** drill: hook → 5 × (5-second chrono with depleting ring + 5→1
countdown, expression on screen, **no answer**) → "combien sur 5 ?" outro. Answers
live only in the caption/first comment, never in the video.

**What "worked" would look like:** comments posting a score (`4/5`, `3/5`),
saves, replays/loops, completion to the outro. Judged by eye via comment
quality + Postiz reach, no formal stats.

**Platform(s):** ig (primary), tiktok, fb — all organic.

## Format spec (shared by all drafts)

- 1080×1920, `[data-screen-label]`, data-driven: a single `#quiz-data` JSON block
  holds `post`, `cat`, `eyebrow`, and a `questions[]` array (`expr`, `ans`).
  `ans` is metadata only (caption/comment) — it is **never rendered**.
- `expr` is the on-screen prompt. `= ?` is appended automatically unless the
  prompt already contains `?` (e.g. `3/4 = ? %`, `200 → 250 = ? %`). Every prompt
  is **auto-fit** in-page so it can never exceed the frame.
- Timeline (animation seconds, generated in-page): **`5 × 5.0s`**
  (5-second chrono: depleting ring + 5→1 countdown, no reveal) → `OUTRO 3.0s`.
  **No intro/hook screen** — reel opens directly on Q1; progress dots + large
  `Question 1 / 5` counter signal the 5-question format.
- Audio cues written to `data-audio-cues`; export with
  `npm run html:to-mp4 -- source.html --out export/ --audio cues --speed 1`.
- Every number is verified (recompute before shipping). Head-doable only.
- Calculations are **varied** (mix of families) within and across reels.

## Drafts (themes; questions deliberately varied)
1. `calcul-mental-express` — Première mix: `7×8`, `15²`, `20 % de 80`, `3/4 = ? %`, `2⁵`
2. `spe-terminale` — Terminale: `(x³)′`, `ln(e⁵)`, `√144`, `2⁶`, `0,3×0,4`
3. `pourcentages-evolutions` — % shapes: `25 % de 60`, `50 +20 %`, `200→250 = ? %`, `80×1,5`, `7/8 = ? %`
4. `puissances-racines` — powers/roots/fractions: `3³`, `√(9/16)`, `(2/3)×(3/4)`, `5²`, `2⁴`
5. `pieges-ordre-operations` — traps & tricks: `8+3×5`, `(6+4)²`, `10−2×3`, `49×11`, `30÷5+2`

## Follow-up batch (2026-06-27) — doubling down on the winning theme

After #02 (Spé Maths Terminale) won the 7-day window, three more drafts replicate
that exact winning *shape* (1 dérivée + 1 ln + 1 racine + 1 puissance + 1 décimal/fraction)
with fresh, verified numbers. Same engine, Terminale/Spé branding kept constant.

6. `spe-maths-reflexes-a` — `(x⁴)′`, `ln(e⁷)`, `√169`, `2⁷`, `0,5×0,8` → **live IG ([reel](https://www.instagram.com/reel/DaF_r0oFbIe/)) + TikTok, 27/06 15:03 UTC**
7. `spe-maths-reflexes-b` — `(x⁵)′`, `ln(e⁶)`, `√225`, `3⁴`, `0,2×0,3` → **scheduled IG+TikTok 30/06 08:00 UTC** (winning slot)
8. `spe-maths-reflexes-c` — `(x²+5x)′`, `ln(1)`, `√121`, `2⁸`, `1/2+1/3` → **scheduled IG+TikTok 01/07 08:00 UTC**

> Slot choice: #02 won at **08:00 UTC** (10:00 Paris). #06 went out now as the
> live test; #07/#08 take the proven morning slot to keep the theme comparison clean.

## Learnings (2026-06-27, Postiz 7d window)

Source: `brands/albert-prep/output/analytics/post-stats-2026-06-20-to-2026-06-27.md`

### Verdict — hypothesis partially confirmed on IG

The multi-question **question-only** format can beat single-calc reels by a wide
margin on reach, but **theme and audience fit matter more than structure alone**.

| Draft | IG views (7d) | Reach | Likes | Comments | Shares | Notes |
|-------|------------:|------:|------:|---------:|-------:|-------|
| **#02 spe-terminale** | **1,452** | 1,150 | 6 | 3 | 2 | Best performer by ~7× vs single reels |
| #01 calcul-mental-express | 120 | 108 | 0 | 1 | 0 | Reposted after delete; ~24h of data |
| Single-calc baseline (week) | 150–280 | — | 0–3 | 0–1 | 0–1 | Typical `reel` batch in same window |

**#02 validates the core bet:** a 5-question self-test reel drove the week's
highest IG post views and the only meaningful comment cluster on an experiment
post (3 comments — score/check answers behaviour we hypothesised).

**#01 is inconclusive, not a refutation:** first publish was deleted after format
fixes (overflow, no-hook cut, answers removed). The repost (`DaBKOzDDDk_`) had
<24h in-window when stats were pulled. Do not compare #01 vs #02 until both have
a full 7-day window post-publish.

### What worked

1. **Spé/Terminale theming** — #02's "5 réflexes de Terminale" framing outran a
   generic "Défi Bac" hook. The audience self-selects into level-specific drills.
2. **No intro / direct Q1** — dropping the hook screen got viewers into the game
   immediately; combined with enlarged `Question 1 / 5` counter, the 5-beat
   structure reads in the first second.
3. **Question-only + answers in caption** — no answer reveal in-video; forces
   active play-along. Comments on #02 suggest viewers engage with the score mechanic.
4. **Sound-led chrono (`--audio cues`)** — per-question ticks make the drill
   feel like a timed test, not a passive watch.
5. **Auto-fit expressions** — long `%` prompts no longer overflow the frame
   (bug that killed the first #01 publish).

### What didn't / gaps

1. **Cross-platform stats unavailable at post level** — Postiz returns `[]` for
   every TikTok post and empty metrics for Facebook posts. IG-only read for now;
   TikTok account rollup shows 12.5k views / 155 recent likes for the week but
   cannot attribute to individual reels.
2. **Saves still near zero** — neither experiment post nor single-calc reels
   triggered saves in-window. The format wins on views/reach, not bookmarking yet.
3. **Likes remain low** — engagement is comment-weighted, not like-weighted. Fine
   for a drill format; watch comment quality over vanity metrics.
4. **Theme > structure** — same engine, different theme: 12× view gap between #02
   and #01. Future batches should lead with the strongest audience wedge
   (Terminale/Spé, pièges, %) rather than generic "défi" framing.

### Ship decisions

- **Keep the format** — promote to a reusable post-type if #03–#05 replicate #02's
  reach band (target: >500 IG views in 7d).
- **Default to themed titles** ("Spé Maths", "Pièges", "% & évolutions") over
  generic "Défi Bac".
- **Schedule #03–#05** with 24h+ spacing; compare themes after full windows.
- **Re-export pipeline:** `npm run html:to-mp4 -- source.html --out export/ --audio cues --speed 1`
