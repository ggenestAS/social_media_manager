# Statement

**Format:** 1080 × 1350 px (4:5) · 1 board · optional 9:16 story adapt
(1080 × 1920) in the same `source.html`. The 9:16 board uses the safe-zone
padding (top 270 · right 160 · bottom 480 · left 96) and 136 px display type
— see `design-system.md` § 9:16 safe zone.
**Export:** `npm run html:to-image -- source.html --all --out export/`

## Concept

The black frame. One sentence, set large in Helvetica 500, an eyebrow above,
one line of body below, the wordmark and trust line at the bottom. Nothing
moves except the reader. The ad version is the same board plus Meta primary
text; organically it's a feed post whose caption carries the argument.

## Board anatomy

```
│  EYEBROW · 30px · 0.18em · uppercase · --mute           (top)
│
│  Display sentence.▌          132px (4:5) / 136px (9:16), max 9–10ch,
│                              weight 500, tracking −0.035em, cursor optional
│  Body line in --soft, 40/44px, max 24ch.
│
│  ⠿ Albert Prep           Free · early access · no card   (bottom)
```

Dark by default (`.board--ink`). The light board (`.board--light`, fog
background, ink type) is a contrast move — at most one light board per set.
A two-line **stacked** display (`.display--stack`) dims the first line: use it
for the "X. Y." antithesis ("ChatGPT answers. / Albert gets you ready.").

## Content needed

- Eyebrow (2–4 words; a time cue like "9 weeks to go" or a frame like
  "honest question").
- The sentence (≤ 8 words; second person; a truth about exam day, not a
  feature).
- Body line (≤ 20 words; what Albert does about it, product-truth only).
- Trust line variant (`early access` or `2 minutes`).
- Language (EN or FR — never mixed on one board).

## Caption formula (organic)

Open with the sentence, one blank line, two or three lines that extend it in
the same voice (no bullets), the product in one line, trust line, "Link in
bio." Two or three hashtags from the content guide.
