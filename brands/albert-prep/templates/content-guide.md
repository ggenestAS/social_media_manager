# Albert Prep — Content Guide

The companion to [`design-system.md`](design-system.md): that file governs how a
post **looks**, this one governs what it **says**. The organic-post skill reads
both before writing any post. Per-type slide arcs live in each
`post-types/<type>/spec.md`; this file holds the cross-cutting rules.

> Brand scope: this is **Albert Prep**. Never reference any parent company or
> other brand in copy, tags, or handles. The only external string is the
> functional CTA link below.

---

## 1. Canonical identity (single source of truth)

Every spec's caption formula pulls from this block. Do not invent variants.

- **Handle:** `@albert.prep` (everywhere — slides, captions, CTAs)
- **CTA link:** `prep.albertschool.com` (functional diagnostic URL only; never
  written as a brand name)
- **Core hashtags (every post):** `#calculmental #albertprep`
- **Contextual hashtags (pick 1–3):** `#mathsrapides #astucemaths #spémaths
  #révisions #mathématiques` · reel only: `#chronométré`
- **Cap:** 3–5 hashtags total. Never use a company/parent-brand tag.

### CTA rotation (avoid fatigue — see brand.md "soft CTA rotation")

Rotate; don't push the diagnostic on every post.

| CTA | When | Example |
|---|---|---|
| Comment prompt | default (engagement) | « Pose ta réponse en commentaire ↓ » |
| Save | astuce / méthode posts | « Enregistre pour t'entraîner » |
| Follow | series / recurring hooks | « Suivre @albert.prep » |
| Diagnostic link | ~1 in 3 posts max | « Entraîne-toi → prep.albertschool.com » |

---

## 2. Creating questions (agent-authored)

Agents **write original calculations** for each post. Do not query the app
database at authoring time — invent fresh operands that *feel like* what the
product drills.

### Calibration reference — the app's CORE pool

The Albert Prep app maintains a **CORE** question bank: general mental-math
fluency (not exam-track content like Bac Spé or SAT). It spans **six themes**,
each with **easy / medium / hard** tiers. Use this pool as a **style guide** —
match its skill families, operand ranges, and difficulty feel; do not copy
prompts verbatim.

| Theme | Skill families (CORE-shaped) | Easy feels like | Medium feels like | Hard feels like |
|---|---|---|---|---|
| **1** Representations | fraction ↔ decimal ↔ %, simplify | `3/8 → 0,375` · `12/18 → 2/3` | `3/5 → 60 %` · `7/8 → 87,5 %` | cross-format chains (astuce only) |
| **2** Operations | ×2d×1d, signed ×, order of ops | `33 × 3` · `(−7) × (−4)` | `8 + 3 × 5` · `30 ÷ 5 + 2 × 3` | nested signed ops (astuce only) |
| **3** Powers & roots | small powers, √ estimate | `7²` · `2⁵` | `√50 ≈ ?` (between perfect squares) | radical simplification (astuce only) |
| **4** Percents | % of, % change | `15 % de 80` | `+20 % de 50` · `−15 % de 200` | reverse-percent (astuce only) |
| **5** Ratios | unit rate, scaling | « 4 articles → 12 € » | « 3 → 12, donc 5 → ? » | inverse proportion (astuce only) |
| **6** Estimation | compensation, anchors, regroup | round-and-adjust | `49 × 21` (50−1) · `996 + 1004` | multi-step compensation (astuce only) |

**Scope:** general mental maths only — no exam-specific framing (no "question
Bac", no SAT-style setup). Strip word problems down to a bare on-slide
expression: `47 × 11 = ?`, not a paragraph of context. **Exact** non-integer
results are fine (`3/4`, `0,375`, `5√2`) — see the expression families below.

**Out of scope:** answers that require rounding in an *open* prompt
("≈ 41,7 %" — acceptable only as a QCM distractor, never as the asked value),
and anything that genuinely needs paper (multi-step factoring, rationalising a
denominator). Multiple-choice is now **in** scope — but only where it earns its
place; see [§ Answer format](#answer-format--open-vs-qcm).

### Expression & comparison families (astuce / serie / qcm)

Beyond the six CORE themes, these richer families raise *apparent* difficulty
while staying head-doable. They skew **medium/hard** and belong to teach/quiz
formats (astuce, serie, qcm) — **not** the naked `calcul-du-jour`. Invent fresh
operands and **verify the exact result** before saving.

| Family | Invent around | On-slide shape | Exact answer | Best types |
|---|---|---|---|---|
| **Racine de fraction** | √ d'un rapport de carrés parfaits | `√(9/16)` | `3/4` | qcm, astuce, reel |
| **Fraction de fraction** | diviser = multiplier par l'inverse | `(3/4) ÷ (2/5)` | `15/8` | astuce, qcm |
| **Puissances & radicaux** | `√a×√b`, `(aᵐ)ⁿ`, simplifier `√` | `√2 × √8` · `√50` | `4` · `5√2` | astuce, serie, qcm |
| **Pourcentage de pourcentage** | composer / enchaîner les % | `100 € +10 % +10 %` · `50 % de 20 %` | `121 €` · `10 %` | qcm, astuce |
| **% vs fraction vs décimale** | comparer / égaler les écritures | `3/8 · 0,4 · 37 % → le + grand ?` | `0,4` | qcm |

Keep the perfect-square / clean-ratio constraint so the answer stays exact and
mental (`√(9/16)`, not `√(7/10)`). The comparison family is the natural home
for QCM — « lequel est le plus grand / lesquels sont égaux ? » has no single
typed answer.

### Authoring workflow

1. Pick a **theme** (rotate across the week) and a **difficulty** tag (§3).
2. **Invent** operands in the same family as the calibration column above.
3. **Verify the answer** before saving — compute it yourself; wrong math is
   brand-damaging.
4. Write the bare expression on slides in **French**; keep captions in French.
5. Tag the post `difficulty: easy | medium | hard` in `post.md` frontmatter.

---

## Answer format — open vs QCM

Two ways to ask. **Default to open**; reach for QCM only when an open prompt
would be ambiguous, or when the *wrong* answers are the actual lesson.

| | Open (type the answer) | QCM (pick A / B / C) |
|---|---|---|
| **Use when** | one clean exact result (`47 × 11`, `√(9/16)`) | comparison / ordering, « lequel égale… », trap questions where a mistake is tempting |
| **Prompt** | « Pose ta réponse en commentaire ↓ » | « Réponds A, B ou C en commentaire ↓ » |
| **Reveal** | next slide / end of reel | same — correct option in `--good` + ✓, distractors dimmed |

### QCM design rules

1. **3 options** (A / B / C). A 4th only if it's genuinely tempting; never > 4.
2. **Diagnostic distractors** — each wrong option is the result of a *specific,
   common mistake* (e.g. `120 €` for `100 € +10 % +10 %` = forgetting the
   compounding). A random-number distractor wastes the slot.
3. **Exactly one** correct option. No « A et C », no « aucune des trois ».
4. The comment prompt **names the letters** (« A, B ou C ? ↓ »). QCM exists to
   manufacture comments — never bury the prompt.
5. Options stay **short** enough to fit one line at hero size.

---

## 3. Difficulty tags

Every post bundle carries a difficulty in `post.md` frontmatter:

```yaml
difficulty: easy    # easy | medium | hard — required
```

This mirrors the app's three tiers. It drives calendar mix and sets audience
expectations — it is not shown on slides unless the post type calls for it
(e.g. a `serie` intro can mention the level).

### Tier definitions

| Tag | Mental target | Operand feel | Default post types |
|---|---|---|---|
| **easy** | ~2 s, one recall step | Small powers, clean fractions, `%` of round numbers | `calcul-du-jour`, `serie`, `reel` |
| **medium** | ~3–4 s, one named trick | ×11 / ×25 / compensation, order of ops, % change | `astuce`, occasional `calcul-du-jour` |
| **hard** | method-heavy; not a naked hook | Chains taught step-by-step in carousel slides | `astuce` method slides only |

| Verdict | Test | Examples |
|---|---|---|
| ❌ Below easy | trivial recall | `2²`, `10 × 5`, `1/2 = 0,5` |
| ✅ easy | one step, no trick required | `18 × 6`, `15 % de 80`, `7²` |
| ✅ medium | rewards a named technique | `47 × 11`, `49 × 21`, `8 + 3 × 5` |
| ✅ hard (astuce only) | multi-step, taught not tested | compensation walkthrough, nested fraction method |
| ❌ Too hard | paper / brute force | `4728 ÷ 17`, `347 × 289` |

### Calendar mix (guideline)

Aim for variety across a week — not three `medium` posts in a row:

| Tag | Share of feed |
|---|---|
| easy | ~50 % |
| medium | ~35 % |
| hard | ~15 % (astuce only) |

Heuristics:
- **`serie`:** four calcs, **same family**, same difficulty tag (e.g. four
  easy `×25` variants, or four easy `% of`).
- **`astuce`:** usually **medium**; the technique justifies the tier.
- When unsure, tag **easy** — a solved calc earns a proud comment.

---

## 4. Topic selection — rotate the six themes

Don't run three Operations posts in a row. Each theme lists what to invent and
typical on-slide shapes (calibrated against CORE, not copied from it).

| Theme | Invent around | Slide examples |
|---|---|---|
| **1** Representations | fraction ↔ decimal ↔ % | `3/8 = ?` · `3/4 = ? %` |
| **2** Operations | × tricks, priority of ops | `47 × 11 = ?` · `8 + 3 × 5 = ?` |
| **3** Powers & roots | squares, small powers, √ estimate | `23² = ?` · `√144 = ?` |
| **4** Percents | % of, increase/decrease | `15 % de 80 = ?` · `−20 % de 50 = ?` |
| **5** Ratios | unit rate, scaling | strip context → `5 × 4 = ?` |
| **6** Estimation | compensation, anchors, regrouping | `49 × 21 = ?` · `996 + 1004 = ?` |

Full product context: [`context/app-product.md`](../context/app-product.md).

---

## 5. Hooks (slide 1 must stop the thumb)

- **calcul-du-jour:** the number *is* the hook — big calc + `= ?`. No preamble.
- **astuce:** pose a question or promise speed — « Comment multiplier *par* 11 ? »
  + a teaser calc. The italic-emphasis word carries the curiosity.
- **serie:** name the family + the challenge — « Calculs rapides *× 25* · 3 s
  par calcul » — four original calcs, same family and difficulty.
- **reel:** question on screen within the first second; countdown creates the
  "can I beat it?" tension. Set **`timer_sec`** (3 / 5 / 10 / 15) to match the
  calc — see [`post-types/reel/spec.md`](post-types/reel/spec.md).
- **qcm:** the *question + the three options* are the hook, all on screen at
  once — « Lequel est le plus grand ? · A 3/8 · B 0,4 · C 37 % ». The tension is
  "I think I know — am I right?". Lead with the comparison, never with theory.

Avoid: generic openers ("Le saviez-vous ?"), walls of text on slide 1, or
burying the calculation below explanatory copy.

---

## 6. Hard rules

1. **Math must be real and correct.** Verify every answer before saving. (brand.md)
2. **Agent-authored, CORE-calibrated.** Match the skill families and difficulty
   feel of the app's general pool; never exam-track framing.
3. **Tag every post** with `difficulty: easy | medium | hard` in `post.md`.
4. **French only** on slides and in captions. (brand.md)
5. **One idea per post.** One technique, one family — never two.
6. **No emoji on slides** — the export renderer has no emoji font. Emoji are fine
   in `post.md` captions.
7. **Albert Prep only** — no parent-brand names, handles, or hashtags.
8. **QCM = one correct option + diagnostic distractors.** Every wrong choice
   models a real mistake; verify the correct one. (see § Answer format)
