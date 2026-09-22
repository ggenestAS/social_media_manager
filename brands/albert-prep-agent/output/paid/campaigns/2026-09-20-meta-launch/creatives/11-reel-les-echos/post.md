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
boards: ["Reel Les Echos A · 9:16", "Reel Les Echos B · 9:16"]
loop_s: 13.2
meta:
  objective: leads (Lead = early-access account created)
  ad_set: press-reel · FR
  cta_button: "S'inscrire"
  description: "Gratuit · accès anticipé · sans carte"
  ads:
    - { variant: A, destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-echos-a&exam=Bac%202027" }
    - { variant: B, destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-echos-b&exam=Bac%202027" }
press:
  - { mast: "Les Echos", date: "UNCONFIRMED — likely autumn 2025", headline: "Les jeunes diplômés, premières victimes de l’IA", logo_ref: "https://fr.wikipedia.org/wiki/Special:FilePath/Logo_Les_%C3%89chos_(2021).svg", url: https://www.lesechos.fr/monde/enjeux-internationaux/les-jeunes-diplomes-premieres-victimes-de-lia-2190496 }
export:
  command: npm run html:to-mp4 -- <this>/source.html --out <this>/export
  notes: data-speed=1, data-loop-ms, data-cta-ms, data-cover-ms and data-audio-cues are set by the inlined reel-timeline.js; sound design is mixed automatically from assets/audio (−14 LUFS, no music); cover = the full headline just before the panel rises
checklist:
  - **do not run until the Les Echos publication date is confirmed** (board says 2026; the article id points to 2025)
  - verify the headline's exact wording + link; masthead renders as text (real logo only with sign-off)
  - QA the MP4 at 1× — pacing is authored, never time-stretch
---
Variant A (design default unless noted) — Les Echos
right: Le diplôme ne protège plus. · kicker: Ce qui est dans ta tête, oui. · hero: Sois celui qui sait. Pas celui qui demande. (accent à partir de « Pas ») · CTA : Construire mon plan

Variant B
right: Commence par tes notes. · kicker: L’agent qui te fait réussir tes examens. · hero: Un plan, 15 minutes par jour, de meilleures notes. (accent à partir de « meilleures ») — **la variante B est le défaut du design** (TWEAK_DEFAULTS.variant = B)
Texte principal — PROPOSÉ : Les jeunes diplômés, premières victimes de l’IA. Le diplôme ne protège plus ; ce qui est dans ta tête, oui. Albert ne fait rien à ta place — il t’entraîne, chaque jour, jusqu’à ce que tu n’aies plus besoin de lui. Gratuit · accès anticipé · sans carte. — Note : la date de l’article manque (le design n’indique que 2026) ; « de meilleures notes » (B) frôle la promesse de résultat.
