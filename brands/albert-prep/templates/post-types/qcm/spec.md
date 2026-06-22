# Pilier 5 — QCM (choix multiple)

One question, three options (A / B / C), **one** correct answer, and a comment
prompt that names the letters. QCM exists to **manufacture comments** — the
reader has to commit to a letter. Use it where an open prompt would be
ambiguous or where the *wrong* answers are the lesson (see
[`content-guide.md` § Answer format](../../content-guide.md)).

This type ships **three placements**, each its own template:

| Placement | File | Aspect | Size | Export |
|---|---|---|---|---|
| **Feed post** | `template-post.html` | 4:5 | 1080×1350 (2 slides) | `html:to-image --all` |
| **Reel** | `template-reel.html` | 9:16 | 1080×1920 (animated) | `html:to-mp4` |
| **Story** | `template-stories.html` | 9:16 | 1080×1920 (static) | `html:to-image --all` |

---

## When to use QCM (not open)

QCM only earns its place for:

- **Comparison / ordering** — « lequel est le plus grand ? », « lesquels sont
  égaux ? ». No single typed answer, so open prompts fail.
- **Trap questions** — the tempting wrong answer *is* the content
  (`100 € +10 % +10 %` → people say `120 €`).
- **Representation fluency** — `% vs fraction vs décimale`.

If the calc has one clean exact result and no juicy trap, use `calcul-du-jour`
or `reel` instead.

### The 4 non-negotiables (from content-guide § Answer format)

1. **3 options** A / B / C (4 max, only if the 4th is genuinely tempting).
2. **Diagnostic distractors** — every wrong option = a specific common mistake.
3. **Exactly one** correct option.
4. The comment prompt **names the letters**: « Réponds A, B ou C ↓ ».

---

## Shared option component

All three placements use the same choice row:

- `.choice` — a square **key chip** (A/B/C, sky bg / navy text) + the value in
  Spline Sans Mono.
- On reveal: the correct row gets `.is-correct` (key turns `--good`, ✓ appears);
  wrong rows get `.is-wrong` (dimmed to ~40 %).
- Keep each value to **one line** at hero size.

Canonical example used in the templates (each shows a different new family):

| Placement | Family | Question | Options | Answer |
|---|---|---|---|---|
| post | % vs fraction vs décimale | Lequel est le plus grand ? | 3/8 · 0,4 · 37 % | **0,4** (B) — 0,375 / 0,40 / 0,37 |
| reel | pourcentage de pourcentage | 100 €, +10 % puis +10 % | 120 € · 121 € · 110 € | **121 €** (B) |
| story | racine de fraction | √(9/16) = ? | 3/4 · 9/16 · 3/16 | **3/4** (A) |

---

## Placement 1 — Feed post (4:5, 2 slides)

Two `[data-screen-label]` screens at 1080×1350.

| Slide | Bg | Purpose |
|---|---|---|
| 1 | Paper | Question + 3 options + « Réponds A, B ou C ↓ » (no answer) |
| 2 | Navy | Reveal — correct option `--good` + ✓, one-line why, follow CTA |

Slide 1 is the comment engine: the prompt sits **above** the swipe hint so the
reader commits before seeing slide 2. You may publish **slide 1 only** as a
single-image comment-bait variant (drop slide 2).

---

## Placement 2 — Reel (9:16, animated)

Reuses the `reel-timeline.js` loop: **2 s** question → **`timer_sec`** countdown
→ **3 s** reveal. Options are on screen during the countdown; the paper-reveal
highlights the correct one.

- Set `data-timer-sec` to **5** (default for QCM — readers need to read 3
  options) or 10 for heavier ones. Record it in `post.md` → `timer_sec`.
- Same MP4 cross-posts to Story (`post_type: story`) — see `reel/spec.md`.

---

## Placement 3 — Story (9:16, static)

A single 1080×1920 image, exported as PNG. Two ways to run it:

1. **Native sticker (preferred):** the template leaves a clear band under the
   options. In the IG app, drop a **Quiz sticker** over the options so taps are
   native and IG reveals the answer. The baked image is just the backdrop.
2. **Reply-driven:** post as-is; prompt « Réponds A, B ou C 👆 » drives story
   replies / DMs.

Stories are ephemeral — use them for same-day boosts and to funnel the engaged
into the permanent feed/reel version of the same question.

---

## Caption formula

```
QCM #[N] — [famille] 🤔

[question]
A) … · B) … · C) …

Réponds A, B ou C en commentaire 👇

#calculmental #albertprep #[contextuel]
```

(`reel` captions also note placement; `story` usually needs no caption.)
