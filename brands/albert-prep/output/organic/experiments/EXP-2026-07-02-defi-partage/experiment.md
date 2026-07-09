# EXP-2026-07-02-defi-partage — CTA partage vs CTA score

> Recréé le 2026-07-09 avec le verdict (l'original du 2026-07-02 a disparu
> avant le premier commit git — voir LOG, entrée INFRA du 2026-07-02).

## Question

Un CTA explicite « défie un ami » (slide outro + caption) augmente-t-il le
taux de partage par rapport au CTA « note ton score en commentaire » ?
Hypothèse issue de l'outlier du Jul 1 (2 135 vues, 20 shares, ~1 % de share
rate — seul post où shares ≈ likes).

## Design

- Slot fixe 17:00 Paris, un quiz-rafale/jour, 7 jours (Jul 3–9), alternance
  defi / score (defi : Jul 3, 5, 7, 9 · score : Jul 4, 6, 8).
- Arm defi : outro vidéo « Envoie ce quiz à quelqu'un » + caption partage.
  Arm score : outro et caption score /5 classiques.
- Bundles : `drafts/` (symlinkés `posts/2026-07-0X-reel-defibac-13…19`).
- Métrique primaire : shares/vue IG à 72 h/post.
- **Règle de décision : defi ≥ 2× score en shares/vue → généraliser le CTA
  partage.**

## Verdict (2026-07-09) — NÉGATIF : le CTA ne fabrique pas le partage

- Arm defi : 1 share cumulé sur ~2 970 vues (3 posts mesurés). Arm score : 0.
  Les deux taux sont indistinguables de zéro ; la règle 2× est sans objet à
  ces volumes.
- Contre-signal décisif : les quiz de 10:00 **sans** CTA partage ont fait 3–4
  shares chacun (defibac-06 : 3, defibac-10 : 4). Le partage suit la qualité
  du contenu, pas l'injonction.
- L'outlier du Jul 1 (20 shares) reste inexpliqué — ni le thème ni le CTA ne
  le reproduisent.

Conclusion : arms CTA abandonnés, retour au CTA score standard. Le levier
partage est à chercher dans le contenu (cf. pari échelle), pas dans le
wording. Consigné dans LOG (READOUT 2026-07-09).
