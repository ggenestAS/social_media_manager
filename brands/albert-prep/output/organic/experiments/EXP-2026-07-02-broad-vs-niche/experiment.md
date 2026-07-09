# EXP-2026-07-02-broad-vs-niche — thème large vs thème pointu

> Recréé le 2026-07-09 avec le verdict (l'original du 2026-07-02 a disparu
> avant le premier commit git — voir LOG, entrée INFRA du 2026-07-02).

## Question

L'écart de vues « 9× » observé en juin entre quiz broad (thèmes mélangés) et
niche (un seul chapitre) est-il un effet réel de la largeur d'audience, ou un
confound format/horaire ?

## Design

- Slot fixe 10:00 Paris, un quiz-rafale/jour, 7 jours (Jul 3–9), alternance
  broad / niche (broad : Jul 3, 5, 7, 9 · niche : Jul 4, 6, 8).
- Même moteur quiz-rafale 5 questions, même durée, mêmes CTA — seule la
  composition thématique varie.
- Bundles : `drafts/` (symlinkés `posts/2026-07-0X-reel-defibac-06…12`).
- Métrique primaire : vues IG à 72 h/post.
- **Règle de décision : médiane broad ≥ 2× médiane niche → abandonner les
  quiz niche.**

## Verdict (2026-07-09) — NÉGATIF : pas d'effet, distinction abandonnée

- Médianes vues IG (Jul 3–8, posts ≥ 24 h) : broad 1 399 (1 348 / 1 399 /
  1 416) vs niche 1 236 (1 236 / 2 240 / 218). Ratio ~1,1× — très loin de 2×.
- Le meilleur post de la semaine est un **niche** (probas, 2 240 vues, Jul 6).
- Lecture contaminée à partir du Jul 6 par le cap de distribution découvert
  pendant le reach sprint (1 seul reel distribué/jour), mais les deux arms la
  subissent symétriquement.

Conclusion : l'écart de juin était un confound format + horaire, comme
suspecté dès le early read du Jul 5. La distinction broad/niche sort des
specs ; les thèmes des quiz-rafale sont libres. Consigné dans LOG
(READOUT 2026-07-09).
