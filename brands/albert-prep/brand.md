# Albert Prep — brand definition

**Product:** a spaced-repetition web app that builds mental-math *fluency*
(speed + accuracy) for business/data bachelor and Spé Maths students.
Full product context: [`context/app-product.md`](context/app-product.md).
Landing: <https://prep.albertschool.com>.

## Mission

Make mental calculation a daily, low-friction habit — 5 minutes a day — so
students gain automatic speed before the rentrée and the Bac, not just
understanding.

## Audience

- **Première** entering Spé Maths — fear of falling behind as the pace accelerates.
- **Terminale** in the Bac year — need speed under pressure, not just method.

## Visual identity — "Le Cahier"

Every post feels like a page from a rigorous, beautiful French exercise book:
- Séyès-ruled paper with a red margin line.
- **Numbers are the protagonists** — large, monospaced, centred.
- Corrections in red pen (strike-through wrong → italic red correct → green ✓).
- Alternation of warm paper slides and deep navy slides.

The exact palette, fonts, CSS, and visual signatures are the contract in
[`templates/design-system.md`](templates/design-system.md). Use it verbatim.

## Voice & tone

- **Language:** French (captions, CTAs, on-slide labels). All of it.
- **Tone:** rigorous but encouraging — a sharp tutor, never condescending.
- **Numbers must be real and correct.** Never ship an incorrect calculation.
- **Soft CTA rotation:** not every post pushes the diagnostic; avoid CTA fatigue.
  Typical CTA: *« Diagnostic gratuit → prep.albertschool.com »* or a comment prompt.
- **Albert Prep only:** never reference any parent or sibling brand in copy, tags,
  or handles. The social handle is **`@albert.prep`**.

What to actually write — difficulty calibration, topic selection, hooks, and the
canonical hashtag/handle/CTA set — is in
[`templates/content-guide.md`](templates/content-guide.md).

## Post types

Defined by the folders in [`templates/post-types/`](templates/post-types/) —
the directory listing is the menu. Today: `calcul-du-jour`, `astuce`, `serie`,
`reel`. Each folder has a `spec.md` (rules) and a `template.html` (starter).

## Channels

Instagram (primary), Facebook (cross-post), TikTok. Aliases and the stable
`{provider, handle}` identities are in [`channels.json`](channels.json); resolve
live Postiz ids with `npm run social:resolve`.
