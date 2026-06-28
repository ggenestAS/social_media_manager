# EXP-2026-06-28-fiche-exo

**Hypothesis:** A reel framed as a **timed exam "fiche d'exercices"** — value
catch-phrase + exercise counter/timer on top, a **real Spé-Maths-style exercise**
in the middle, and a labelled metadata strip (filière / niveau / thème / méthode)
on the bottom — will beat the bare mental-math quiz-rafale on **saves and
follows** among Première/Terminale, because it reframes the content from "fun
mental sprint" to "this is literally what you'll be graded on at the Bac, and
here's how hard it is." The metadata strip makes the value legible at a glance
(I'm a Terminale, this is *my* level/theme) and the points-on-the-Bac framing
raises stakes beyond "did I get it right".

**Deviation axis:** structure (3-zone fiche layout + persistent metadata strip)
+ content angle (real exam-style exercises with `papier-crayon` allowance, not
naked mental calc) + hook style (value/points framing instead of pure chrono).

**Breaks from:**
- the live `reel` post-type — single calc, 2 s intro + timer + 3 s reveal, mental-only.
- the winning `x-quiz-rafale` experiment format (EXP-2026-06-25) — it keeps the
  rafale engine (5 timed beats, no answer shown, audio cues) but **adds** the
  top value-phrase, the bottom metadata fiche, and **exam-shaped** middle content.

**Inherited from the winner (deliberately constant):** rafale engine (5 timed
question-only beats in one ~9:16 MP4), opens straight on exo 1 (no hook screen),
answers only in the first comment, per-beat audio cues, navy + faint-grid +
sky-accent palette. We change the *frame*, not the proven mechanic.

**What "worked" would look like:** saves (it reads as a revision tool, not a
gag), follows, and comments that post a score **and** name a track/level
("terminale ici, 4/5"). Judged by eye + Postiz reach vs the quiz-rafale baseline.

**Platform(s):** ig (primary), tiktok, fb — all organic. **Not published yet** —
drafts only, pending review of the format before it goes live.

## Format spec (shared by all drafts)

1080×1920 navy, faint grid. `[data-screen-label="Fiche Exo 9:16"]`, data-driven:
a single `#exo-data` JSON block per draft holds `post`, `track`, `theme`,
`method`, `catch`, and a `questions[]` array. Each question:
`{ context?, ask, ans, sec, level }`.

- **Top third** — `catch` (value/points phrase, Fraunces, 1 italic-sky word) +
  `EXERCICE n / 5` counter + per-exercise countdown ring (uses each question's
  own `sec`, so harder exos get more time).
- **Middle third** — the exercise: optional `context` line (the function / setup,
  e.g. `f(x) = (2x − 1)eˣ`) above the `ask` line (`f '(x) = ?`). Auto-fit so it
  never exceeds the frame. **`?` in sky. No answer is ever rendered.**
- **Bottom third** — a bordered "fiche" strip, four labelled rows:
  `FILIÈRE` (seconde / première / terminale / spé maths / maths expertes),
  `NIVEAU` (a 10→20 gauge with a marker that escalates per exercise + `n/20`),
  `THÈME` (mix / dérivées / automatisme / suites / …), `MÉTHODE`
  (de tête / papier-crayon / autre).
- `ans` is metadata only → first comment, **never on screen**.
- No emoji on slides (export renderer has no emoji font) — labels + CSS glyphs only.
- Audio cues in `data-audio-cues`; export:
  `npm run html:to-mp4 -- source.html --out export/ --audio cues --speed 1`.
- Every number verified (sympy for derivatives/limits/suites) before shipping.

## Drafts

1. `01-terminale-derivees` — **Terminale · Spé Maths · Dérivées · Papier-crayon**.
   5 exam-style derivative asks, escalating 12→18/20 (polynomial → produit → ln∘ →
   quotient → racine). Tests the "real exercise" content bet at full strength.
2. `02-terminale-suites` — **Terminale · Spé Maths · Suites · Papier-crayon**.
   5 suite asks (terme, géométrique, limite, arithmétique, somme), 12→18/20.
   Second probe of the exam-content bet on a different chapter.
3. `03-premiere-automatisme` — **Première · Spé Maths · Automatisme · De tête**.
   5 mental calcs, 10→13/20. **Control:** keeps mental-only content (per the
   brief's "except automatisme") so it isolates the *layout/framing* change from
   the *content-style* change. If #03 wins but #01/#02 don't, the fiche chrome is
   the lever; if #01/#02 win, the exam content is.

## Strategic risk (read before scaling this)

This experiment **knowingly breaks a brand content guardrail**: `content-guide.md`
scopes posts to *general mental math, no exam framing, nothing that needs paper*,
because the product is a mental-math **fluency** app (CORE pool), not a Bac-Spé
exercise solver. `papier-crayon` exam content is on-audience but **off-product**:
it can pull followers who want exam help the app doesn't deliver, weakening the
content→product bridge. Mitigations baked in:
- The CTA/handle stay Albert Prep; captions tie the exercise back to *speed/
  automatismes* ("ces points se jouent à la vitesse", not "voici la méthode").
- Draft #03 holds the product-true mental content as a control.
- Decide on **saves/follows + comment quality**, but also watch whether the
  audience it attracts is one the app can actually convert. A view win that
  draws the wrong audience is a strategic loss, not a content win.
