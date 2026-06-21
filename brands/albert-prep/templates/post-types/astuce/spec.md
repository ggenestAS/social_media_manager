# Pilier 2 — Astuce (Carrousel)

**Format:** 1080 × 1350 px portrait (render at 540 × 675), ×4 slides  
**File name tag:** `carrousel`

---

## Concept

Teach one mental calculation technique in 4 swipe-steps. Slide 1 hooks, Slide 2 explains the method, Slide 3 shows it working on a real example with the correction gesture, Slide 4 pushes them to save and follow.

---

## Slide arc

| Slide | Name | Background | Purpose |
|-------|------|-----------|---------|
| 1 | Cover | Paper | Hook — pillar name + teaser question |
| 2 | Méthode | Navy | The technique, step by step |
| 3 | Exemple résolu | Paper | Worked example with correction gesture |
| 4 | CTA | Navy | Save + follow prompt |

---

## Slide 1 — Cover (paper background)

```
┌─────────────────────────────┐
│  #012  01/04    ALBERT PREP │
│                             │
│  [ASTUCE]  ← pill tag       │
│                             │
│  Comment                    │
│  multiplier                 │  ← Fraunces 700, "par" in italic blue
│  par 11 ?                   │
│                             │
│  ─────────────              │
│  En moins de 3 secondes     │
│  ① ② ③ →                   │  ← swipe hint
└─────────────────────────────┘
```

Key elements:
- `.pill` tag: "ASTUCE" in sky-blue
- Heading uses `<em>` for weak words: "par", "de", "du"
- Swipe hint: "① ② ③ Passe au slide →"

---

## Slide 2 — Méthode (navy background)

```
┌─────────────────────────────┐
│  #012  02/04    ALBERT PREP │
│                             │
│  La méthode                 │  ← Fraunces 700 on navy, 32px
│                             │
│  Pour 36 × 11 :             │
│                             │
│  ❶ 3 + 6 = 9                │  ← numbered steps, Spline Sans Mono
│  ❷ Insère : 3[9]6           │     [9] in sky-blue
│  ❸ Résultat : 396 ✓         │     ✓ in --good
│                             │
│  → Slide suivant : exemple  │
└─────────────────────────────┘
```

Key elements:
- `bg-navy`, all text `var(--paper)`
- Steps use ❶❷❸ circled Unicode numbers
- The "inserted" digit shown in `[brackets]` colored in `var(--sky)`

---

## Slide 3 — Exemple résolu (paper background)

```
┌─────────────────────────────┐
│  #012  03/04    ALBERT PREP │
│                             │
│  Essaie avec...             │
│                             │
│  63 × 11                    │  ← hero calculation
│                             │
│  ─────────────              │
│  [~~630~~] → 693 ✓          │  ← .correction block
│                             │
│  6+3=9 → 6[9]3 = 693        │  ← method recap in mono
│                             │
└─────────────────────────────┘
```

Key elements:
- `.correction` block: wrong answer struck through → correct in red italic → ✓ green
- One-line method recap in Spline Sans Mono, 14px

---

## Slide 4 — CTA (navy background)

```
┌─────────────────────────────┐
│  #012  04/04    ALBERT PREP │
│                             │
│  Enregistre                 │
│  pour ne                    │  ← Fraunces 700, large, on navy
│  pas oublier                │
│                             │
│  [SUIVRE @albert.prep]      │  ← .btn-ink.on-navy
│                             │
│  💡 Prochaine astuce :       │
│  les carrés en 5            │
└─────────────────────────────┘
```

Key elements:
- `bg-navy`
- `.btn-ink.on-navy` button
- Optional teaser for next post

---

## Practical notes

- Each slide: `<div class="slide slide-portrait bg-paper/bg-navy">`
- Padding: `padding: 28px 36px 32px 100px` (left clears margin rule)
- For navy slides: add `color: var(--paper)` on the slide element

## Caption formula

"Technique #[N] — [Name] 🧠\n\nTu connais cette méthode ? 👇\n\n#calculmental #mathsrapides #albertprep"
