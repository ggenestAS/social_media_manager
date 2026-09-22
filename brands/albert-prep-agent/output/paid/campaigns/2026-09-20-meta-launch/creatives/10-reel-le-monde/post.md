---
type: paid-press-reel
campaign: 2026-09-20-meta-launch
experiment: EXP-2026-09-20-meta-directions
mechanic: press-reel
market: fr
language: fr
channels: []
schedule: null
status: draft
postiz_id: null
boards: ["Reel Le Monde A · 9:16", "Reel Le Monde B · 9:16"]
loop_s: 13.2
meta:
  objective: leads (Lead = early-access account created)
  ad_set: press-reel · FR
  cta_button: "S'inscrire"
  description: "Gratuit · accès anticipé · sans carte"
  ads:
    - { variant: A, destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-monde-a&exam=Bac%202027" }
    - { variant: B, destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-monde-b&exam=Bac%202027" }
press:
  - { mast: "Le Monde", date: "18 septembre 2026", headline: "Les avancées de l’IA provoquent une crise inédite chez les mathématiciens", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Le_Monde.svg", url: https://www.lemonde.fr/sciences/article/2026/09/18/les-avancees-de-l-ia-provoquent-une-crise-inedite-chez-les-mathematiciens_6776810_1650684.html }
export:
  command: npm run html:to-mp4 -- <this>/source.html --out <this>/export
  notes: data-speed=1, data-loop-ms, data-cta-ms, data-cover-ms and data-audio-cues are set by the inlined reel-timeline.js; sound design is mixed automatically from assets/audio (−14 LUFS, no music); cover = the full headline just before the panel rises
checklist:
  - verify the headline's exact wording + link; masthead renders as text (real logo only with sign-off)
  - QA the MP4 at 1× — pacing is authored, never time-stretch
---
Variant A (design default unless noted) — Le Monde
right: L’IA fait les maths. · kicker: Toi, tu passes le bac. · hero: Le jour J, tu es le seul modèle dans la salle. (accent à partir de « modèle ») · CTA : Construire mon plan

Variant B
right: OK. Et ton bac ? · kicker: L’agent qui te fait réussir. · hero: Dis-lui ton examen. Il t’entraîne jusqu’à la mention. (accent à partir de « t’entraîne »)
Texte principal — PROPOSÉ : L’IA provoque une crise inédite chez les mathématiciens. L’IA fait les maths ; toi, tu passes le bac. Le jour J, tu es le seul modèle dans la salle — Albert t’entraîne pour ça : un plan à rebours depuis l’épreuve, des sessions courtes chaque jour. Gratuit · accès anticipé · sans carte. — Note : la variante B promet « jusqu’à la mention » ; c’est une promesse de résultat, à écarter si la règle « aucune garantie de note » s’applique.
