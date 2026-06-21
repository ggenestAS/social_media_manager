# Pilier 3 — Série de calculs (Carrousel)

**Format:** Feed carousel **4:5** — 1080 × 1350 px per slide (not 1:1, not 9:16)  
**Slides:** 6 (fixed arc — do not add or remove)  
**Export:** `npm run html:to-image -- source.html --all --out export/`

---

## Concept

A 6-slide quiz carousel: four rapid-fire questions, then one slide reveals all
answers and asks for a score in comments. Thematically coherent series (same
family: all ×25, all percentages, etc.).

**Batch-reveal model** (not alternating Q/A slides): keeps swipe count at 6 while
still fitting 4 calculations. Users answer mentally on slides 2–5, then verify on
slide 6.

---

## Slide arc

| Slide | Background | Purpose |
|-------|-----------|---------|
| 1 Intro | Navy | Series title + timer challenge |
| 2 Calcul 1 | Paper | Question only (`= ?`) |
| 3 Calcul 2 | Paper | Question only |
| 4 Calcul 3 | Paper | Question only |
| 5 Calcul 4 | Paper | Question only |
| 6 Score + answers | Navy | All four answers listed + "Commente ton score" |

---

## Slide 1 — Intro (navy)

```
│  SÉRIE #008  01/06  ALBERT PREP
│
│  [SÉRIE] ← pill
│
│  Calculs           ← display heading
│  rapides
│  × 25
│
│  ⏱  3 secondes par calcul
│  Prêt ? →
```

---

## Slides 2–5 — Questions (paper)

```
│  02/06  ALBERT PREP
│  Calcul 1 / 4
│
│     4 × 25         ← hero calc, ~192px Spline Mono
│
│     = ?            ← red-pen, ~128px
│
│  ─────────────
│  → Réponse au prochain slide   (slides 2–4)
│  → Réponses au prochain slide  (slide 5 only)
```

Increment `Calcul N / 4` on each question slide.

---

## Slide 6 — Score + all answers (navy)

```
│  06/06  ALBERT PREP
│
│  Ton score ?       ← Fraunces 700
│
│  ★ ★ ★ ★           ← gold stars
│  0/4 → 4/4
│
│  4×25 = 100        ← all four answers listed
│  12×25 = 300
│  16×25 = 400
│  20×25 = 500
│
│  [COMMENTE TON SCORE] ← .btn-ink.on-navy
│
│  @albert.prep
```

---

## Series selection advice

Good families: ×25, ×11, ×5, simple percentages (10%/20%/15%/5%), perfect squares.
Avoid mixing families within a series. Always **4 calculations** per série.

## Practical notes

- Each slide: `<div data-screen-label="Serie NN/06" … style="width:1080px;height:1350px">`
- Same `.inner` / `.inner-navy` padding as astuce (see `post-types/README.md`)

## Caption formula

"Série #[N] — [X] secondes par calcul ⏱\n\nCommente ton score 👇 (🔥 = 4/4 | 💪 = 3/4)\n\n#calculmental #albertprep"
