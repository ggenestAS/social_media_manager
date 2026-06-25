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
- Timeline (animation seconds, generated in-page): `INTRO 2.4s` → `5 × 5.0s`
  (5-second chrono: depleting ring + 5→1 countdown, no reveal) → `OUTRO 3.0s`.
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
