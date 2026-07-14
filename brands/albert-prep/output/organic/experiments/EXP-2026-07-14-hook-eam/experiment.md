# EXP-2026-07-14-hook-eam — framing « épreuve anticipée » vs framing « calcul mental »

## Question

Le framing *note/examen* (« Épreuve anticipée : 6 points sans calculatrice »)
attire-t-il plus de distribution et de conversion profil que le framing
*défi calcul mental* actuel, à format strictement identique ?

Contexte : repositionnement en discussion (13–14 juil) — passer de « fais du
calcul mental » à « prends les points de l'épreuve anticipée ». Depuis juin
2026, tous les élèves de Première passent l'épreuve anticipée de maths (2 h,
coefficient 2, sans calculatrice, QCM automatismes sur 6 points — décret du
10-6-2025, première session 8–12 juin 2026). Ce test valide (ou non) le
repositionnement avec des données avant de réécrire la page.

## Design

- Slot fixe 10:00 Paris (le slot « distribué » gagnant de la semaine Jul 3–9),
  un quiz-rafale 5 questions/jour, Jul 15–20, alternance stricte :
  - **Arm `eam`** (Jul 15, 17, 19) : cat « Épreuve anticipée · Maths »,
    eyebrow « 6 points sans calculatrice », questions tirées des thèmes
    officiels des automatismes évaluables (développements, coefficients
    multiplicateurs, puissances de 10, fractions, ordre de grandeur, moyenne),
    caption citant les faits vérifiables de l'épreuve.
  - **Arm `classic`** (Jul 16, 18, 20) : cat « Défi Bac · Spé Maths »,
    eyebrow « Automatismes de Terminale », questions et caption au format
    défi habituel.
- Même moteur, même durée (5 s/question), même outro score, même heure.
  Seul le framing (cover + caption + choix thématique) varie.
- Bundles : `drafts/07XX-{eam,classic}` symlinkés
  `posts/2026-07-XX-reel-hook-{eam,classic}-NN`.

## Métriques & règle de décision

- Primaire : vues IG à 72 h/post + taux de victoire du slot distribué.
- Secondaire : commentaires, partages (le framing examen devrait mieux
  convertir si la thèse « ils veulent des points, pas du calcul » est vraie).
- **Règle : médiane eam ≥ 1,5× médiane classic (3 posts/arm) → adopter le
  framing épreuve anticipée partout et réécrire la page dans ce sens.**
  Entre 0,7× et 1,5× : neutre, décision sur les secondaires. < 0,7× :
  conserver le framing défi, repositionner uniquement la page.

## Caveats connus

- 3 points/arm seulement, et le cap de distribution (~1 reel/jour, cf. LOG
  READOUT 2026-07-09) rend les vues bruyantes — d'où la lecture par « victoire
  du slot » en plus des médianes.
- Redémarrage après 5 jours de silence (Jul 10–13) : la première journée peut
  être atypique ; le post de relance du Jul 14 17:00 (Défi Bac #20, hors
  expérience) sert de tampon.

## Vérification math

36 vérifications numériques passées à la génération (script gen-restart).
Réponses non numériques ((x+3)² = x²+6x+9, (2x)² = 4x², (x³)′ = 3x²,
10³×10⁻⁵ = 10⁻², 10⁻³×10⁵ = 10², e⁰+ln(1) = 1) vérifiées à la rédaction.
