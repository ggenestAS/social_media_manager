# Paid winner → organic post-type map

**Source:** Meta Ads Manager, Albert Prep account, 13–23 Jun 2026.  
**Winning mechanic:** one incomplete calc (`= ?`), speed/automaticity pain, diagnostic CTA.  
**Paid brief for variants:** [`../output/paid/campaigns/2026-06-24-accroche-scale/brief.md`](../output/paid/campaigns/2026-06-24-accroche-scale/brief.md)

This file tells the organic engine **where to copy the paid hook** and where **not** to — paid conversion ≠ organic engagement.

---

## Summary matrix

| Post type | Adopt accroche hook? | Role | CTA |
|---|---|---|---|
| **calcul-du-jour** | **Yes — primary** | conversion + comments | comment default; diagnostic **1 in 3** |
| **qcm (feed slide 1)** | **Yes — partial** | comment bait + diagnostic | A/B/C prompt; diagnostic on slide 2 or caption |
| **reel** | **Partial — slide 1 only** | reach + saves | no diagnostic in first 3 s; soft CTA in caption |
| **astuce** | **Partial — cover only** | saves + follow | method carousel; diagnostic rare |
| **serie** | **No — keep batch quiz** | engagement depth | score in comments; no paid-style diagnostic slide |
| **EXP exam-automatismes reels** | **No for conversion** | authority + exam framing | keep exam eyebrow; separate from paid clone |

---

## calcul-du-jour — **clone paid accroche**

**Why:** same `= ?` interrupt, same CORE math families, already 4:5 feed-native.

| Paid element | Organic adaptation |
|---|---|
| Hero `= ?` | keep — this *is* the post |
| « 10 s en tête » badge | optional on medium/hard calcs |
| Pain line (*automatismes* / *réflexes*) | **add as subtitle** under hero (paid proves it converts) |
| Diagnostic CTA on image | **omit** from slide; use caption rotation (~1 in 3 posts) |
| Comment prompt | default: « Pose ta réponse en commentaire ↓ » |

**Segment tagging (optional, 1 in 5 posts):** rotate eyebrow « Prêt pour la Spé Maths ? » or « Tu sais le faire. Mais en combien de temps ? » on calcul-du-jour — test whether segment copy lifts saves without hurting comments.

**Do not:** turn every calcul-du-jour into a diagnostic ad — [`content-guide.md`](content-guide.md) CTA rotation still applies.

---

## qcm — **accroche on slide 1, trap on slide 2**

**Why:** slide 1 is already a stop-scroll question; paid data says incomplete calc beats promise copy.

| Do | Don't |
|---|---|
| Slide 1 = hero expression or « lequel… ? » + A/B/C | Replicate full paid layout (too salesy for organic) |
| Use **diagnostic distractors** (wrong = specific mistake) | Generic numeric distractors |
| Slide 2 reveal = teaching moment | Slide 2 = hard sell only |

**Conversion path:** caption or slide 2 footer — « Entraîne-toi → prep.albertschool.com » on ~1 in 3 QCM posts.

---

## reel — **Frame A = accroche; rest = value**

**Why:** paid Reels (*Correction*, *Avant-Après*) failed; organic reels still work for **discovery** if the hook matches paid statics.

| Frame | Accroche alignment |
|---|---|
| **Intro (navy, 2 s)** | Large `= ?` — same typography scale as paid hero |
| **Countdown** | keep timer; matches « combien de temps ? » |
| **Reveal** | show answer + one-line *why* (method), not product pitch |
| **Caption** | « Tu as N secondes ⏱ » + calc; diagnostic link **max 1 in 4 reels** |

**Do not:** open with « Albert Prep corrige tes automatismes » (promise-title — paid loser).  
**Do not:** exam-anchor eyebrow on the same reel you expect to drive diagnostic clicks — see experiment split below.

---

## astuce — **cover hook only**

**Why:** 4-slide arc needs room to teach; paid accroche is a **slide-1 pattern**, not the whole carousel.

| Slide | Hook style |
|---|---|
| **1 Cover** | Question form: « Comment faire … ? » or naked `47 × 11 = ?` |
| **2–3** | Method + worked example (unchanged) |
| **4 CTA** | « Enregistre » / « Suivre @albert.prep » — not diagnostic |

Optional: cover borrows paid pain line in small type (*« Si tu hésites, c'est un automatismes »*) — test vs pure method hook.

---

## serie — **stay exam-quiz; don't paste paid shell**

**Why:** série is 4 calcs + batch reveal — different job (depth, score comments). Collapsing to one hero `= ?` wastes the format.

| Keep | Change |
|---|---|
| 6-slide batch arc | — |
| « Commente ton score /4 » | — |
| Intro timer challenge | Wording: « 4 calculs · combien en moins de 2 min ? » (speed frame from Terminale winner) |

Diagnostic CTA: end of caption only, ~1 in 4 series.

---

## Experiments — split jobs

### EXP-2026-06-24-paid-accroche (current organic batch)

| Aspect | Guidance |
|---|---|
| **Job** | test paid accroche shell on organic (eyebrow + `= ?` + pain line) |
| **Hook** | Première / Terminale segment copy from paid winners — **use these drafts** |
| **vs calcul-du-jour** | adds pain line + segment eyebrow; drops « Calcul *du jour* » label |
| **Funnel** | drafts 01–03 = comment/save; draft 04 = diagnostic in caption only |
| **Bundle** | [`../output/organic/experiments/EXP-2026-06-24-paid-accroche/`](../output/organic/experiments/EXP-2026-06-24-paid-accroche/experiment.md) |

### EXP-2026-06-22-exam-automatismes

| Aspect | Guidance |
|---|---|
| **Job** | authority, exam-adjacent saves, method reels |
| **Hook** | exam eyebrow + Bac/Spé context — **keep** |
| **Paid clone?** | **No** — mixing exam framing + diagnostic CTA duplicates failed promise ads |
| **Funnel** | exam reels → follow/save → calcul-du-jour / QCM with accroche + soft diagnostic |

### EXP-2026-06-22-outcome-hook

| Aspect | Guidance |
|---|---|
| **Job** | outcome headlines (« prépare ton Bac ») |
| **Paid data** | promise-title underperformed ~10× |
| **Action** | **deprioritize** for conversion posts; OK for brand/awareness slots only |

---

## Weekly organic mix (suggested)

Target ~8–10 assets/day per [`content-engine.config.json`](../content-engine.config.json).

| Slot | Type | Hook style |
|---|---|---|
| 2× | calcul-du-jour | **full accroche** (+ pain subtitle 1 in 2) |
| 1× | qcm feed | accroche slide 1 |
| 2× | reel | accroche intro; **no** exam eyebrow on diagnostic-bound reel |
| 1× | astuce | method cover |
| 1× | serie | batch quiz |
| 1–2× | exam EXP reel | exam framing — engagement only |
| 1× | experimental | rotate |

**Diagnostic CTAs across the day:** cap at **3 posts** with prep.albertschool.com link; prefer calcul-du-jour + QCM for those slots.

---

## Decision rule (when authoring)

```
IF goal = diagnostic sign-up
  → calcul-du-jour or QCM slide 1
  → hero = ? + speed/automaticity copy
  → CTA in caption

IF goal = saves / follow / comments
  → astuce, serie, exam reel
  → no paid shell on every slide

IF format = paid Meta static
  → accroche brief only; never exam paragraph
```

---

## Files to read before authoring

- [`content-guide.md`](content-guide.md) — CORE calibration, CTA rotation
- [`post-types/calcul-du-jour/spec.md`](post-types/calcul-du-jour/spec.md)
- [`post-types/reel/spec.md`](post-types/reel/spec.md)
- Paid design shell: `output/paid/campaigns/2026-06-18-meta/design-export/project/Meta Ads Spe Maths.dc.html`
