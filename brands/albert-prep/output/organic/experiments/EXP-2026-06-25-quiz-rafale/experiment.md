# EXP-2026-06-25-quiz-rafale

**Hypothesis:** A rapid-fire "défi" reel that asks 5 questions in a row (one
asset, ~25 s) will beat the single-question `reel` on watch-time and comments
("ton score /5") because it creates a self-scored game loop and a reason to
replay/pause — the single-calc reel ends in 8 s and has no scoreboard.

**Deviation axis:** structure (series of 5 timed Q→A beats in one asset, scoreboard
CTA) + modality (sound-led quiz rhythm: tick on each question, chime on each answer).

**Breaks from:** `reel` post-type — that type is exactly **one** calc
(`2s intro + timer + 3s reveal`). This is a multi-beat quiz with a hook screen,
five Q/A cycles, progress dots, and a "note ton score /5" outro. No paper-card
single reveal.

**What "worked" would look like:** comments posting a score (`4/5`, `3/5`),
saves, replays/loops, completion to the outro. Judged by eye via comment
quality + Postiz reach, no formal stats.

**Platform(s):** ig (primary), tiktok, fb — all organic.

## Format spec (shared by all drafts)

- 1080×1920, `[data-screen-label]`, data-driven: a single `#quiz-data` JSON block
  holds `post`, `cat`, `eyebrow`, and a `questions[]` array (`expr`, `ans`).
- Timeline (animation seconds, generated in-page): `INTRO 2.4s` → `5 × 4.2s`
  (2.8 s think w/ depleting ring → 1.4 s answer reveal) → `OUTRO 3.0s`.
- Audio cues written to `data-audio-cues`; export with
  `npm run html:to-mp4 -- source.html --out export/ --audio cues --speed 1`.
- Every number is verified (recompute before shipping). Head-doable only.

## Drafts
1. `calcul-mental-express` — Première warm-up (×, carré, %, ÷) — renderable
2. `spe-terminale` — Spé/Terminale automatisms (dérivée, ln, puissances) — renderable
3. `pourcentages-evolutions` — % of / % change family — renderable
4. `puissances-racines` — powers & roots (incl. √ de fraction) — renderable
5. `pieges-ordre-operations` — order-of-operations traps — renderable
