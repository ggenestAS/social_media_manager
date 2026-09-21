# Press split

**Format:** 1080 × 1350 px (4:5) · 1 board · optional 9:16 adapt in the same
file. The 9:16 board follows the safe zone: paper padding 290 / 160 / 96 / 96,
ink padding 80 / 160 / 480 / 96, reply 84 px (see `design-system.md`
§ 9:16 safe zone).
**Export:** `npm run html:to-image -- source.html --all --out export/`

## Concept

Top half: a real headline about AI and students, on warm paper in Georgia,
with masthead and date. Bottom half: Albert's reply on ink — a short kicker
that *agrees*, a display reply that *turns*, an optional "why" line. The
material contrast is the argument: they say, we do.

## Board anatomy

```
┌ PAPER (flex:1) ─────────────────────────────────────┐
│ Masthead (Georgia 700, 48px)              Date 26px │
│                                                     │
│ Headline — Georgia 700, 58–66px, −0.025em, 1.08    │
├ INK (flex:1) ───────────────────────────────────────┤
│ KICKER · 28px · 0.18em · uppercase · --mute         │
│ Reply — Helvetica 500, 82px (84px story), 1.0       │
│ Why line — 34px --soft, max 28ch (optional)         │
│                                                     │
│ ⠿ Albert Prep              Free · early access …    │
└─────────────────────────────────────────────────────┘
```

Headline size: pick 58–66px so the headline sits in ≤ 4 lines; override with
an inline `style="font-size:60px"` on `.headline`.

## Content needed

- Masthead name, publication date, **exact headline wording**, article URL
  (kept in `post.md`, verified — see content guide §Press mechanic).
- Kicker (agrees with the headline, ≤ 10 words).
- Reply (turns it toward Albert, ≤ 9 words).
- Why line (optional, product-truth).
- Language matches the outlet's language.

## Production notes

Text masthead is the default. To use the real logo, drop a PNG in
`assets/press/` and swap `.mast` for `<img class="mast-logo">` — only with
rights sign-off. Never alter the headline to fit; change the size.

## Caption formula (organic)

Quote the headline in « » / “ ”, credit « — Masthead, date », blank line,
the kicker + reply as prose, one product line, trust line, "Link in bio.",
two hashtags.
