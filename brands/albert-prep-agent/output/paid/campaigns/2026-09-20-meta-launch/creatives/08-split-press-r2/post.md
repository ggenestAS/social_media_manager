---
type: paid-press-split
campaign: 2026-09-20-meta-launch
experiment: EXP-2026-09-20-meta-directions
mechanic: press-split (round 2)
market: fr+uk
language: fr+en (per board)
channels: []
schedule: null
status: draft
postiz_id: null
boards: ["Split echos · 4:5", "Split monde · 4:5", "Split wapo-teens · 4:5", "Split wapo-blue-books · 4:5", "Split wapo-learning · 4:5", "Split hbr · 4:5", "Split figaro · 4:5"]
meta:
  objective: leads (Lead = early-access account created)
  ad_sets: { fr: "press-split · FR (echos, monde, figaro)", uk: "press-split · UK (wapo ×3, hbr)" }
  cta_button: { fr: "S'inscrire", en: "Sign up" }
  description: { fr: "Gratuit · accès anticipé · sans carte", en: "Free · early access · no card" }
  ads:
    - { board: echos,           lang: fr, headline: "Sois celui qui sait. Pas celui qui demande.",         destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-echos&exam=Bac%202027" }
    - { board: monde,           lang: fr, headline: "Le jour J, tu es le seul modèle dans la salle.",     destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-monde&exam=Bac%202027" }
    - { board: wapo-teens,      lang: en, headline: "Albert uses it to make you do the work.",            destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-wapo-teens&exam=A-levels" }
    - { board: wapo-blue-books, lang: en, headline: "The chatbot leaves the room. You stay.",             destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-wapo-blue-books&exam=A-levels" }
    - { board: wapo-learning,   lang: en, headline: "Albert can — weeks before the exam does.",           destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-wapo-learning&exam=A-levels" }
    - { board: hbr,             lang: en, headline: "Be the one who can actually do it.",                 destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-hbr&exam=A-levels" }
    - { board: figaro,          lang: fr, headline: "Le jour du bac, tu es le seul modèle dans la salle.", destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-figaro&exam=Bac%202027" }
press:
  - { board: echos,           mast: Les Echos,               date: 2026,       headline: "Les jeunes diplômés, premières victimes de l’IA", logo_ref: "https://fr.wikipedia.org/wiki/Special:FilePath/Logo_Les_%C3%89chos_(2021).svg", url: TODO-verify }
  - { board: monde,           mast: Le Monde,                date: 2026-09-18, headline: "Les avancées de l’IA provoquent une crise inédite chez les mathématiciens", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Le_Monde.svg", url: TODO-verify }
  - { board: wapo-teens,      mast: The Washington Post,     date: 2026-02-24, headline: "Most teens believe their peers use AI to cheat. About half use it for schoolwork.", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Logo_of_The_Washington_Post_Newspaper.svg", url: TODO-verify }
  - { board: wapo-blue-books, mast: The Washington Post,     date: 2026-08-09, headline: "Universities are fighting AI cheating. But there’s a deeper problem.", url: TODO-verify }
  - { board: wapo-learning,   mast: The Washington Post,     date: 2026-07-15, headline: "AI is moving so fast that schools can’t tell if students are actually learning.", url: TODO-verify }
  - { board: hbr,             mast: Harvard Business Review, date: 2026-06-29, headline: "“We solved a cost problem and created a capability crisis.” Junior roles are the first to go to AI.", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Harvard_Business_Review_wordmark.svg", url: TODO-verify }
  - { board: figaro,          mast: Le Figaro,               date: 2026-05-28, headline: "« C’est un phénomène massif » : la triche généralisée à l’IA frappe les lycées", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Le_Figaro.svg", url: TODO-verify }
checklist:
  - verify every headline (exact wording, link); the Figaro kicker quotes "90 % des élèves de seconde" — must be attributable to the article or cut
  - Les Echos board carries only a year — add the publication date
  - mastheads render as text; real logos only with rights sign-off
  - export: npm run html:to-image -- <this>/source.html --all --out <this>/export
---
Primary text — PROPOSED (written from the board copy, one per ad):

echos (FR) — « Les jeunes diplômés, premières victimes de l’IA. » Le diplôme ne protège plus ; ce qui est dans ta tête, oui. Albert ne fait rien à ta place : il t’entraîne, chaque jour, jusqu’à ce que tu n’aies plus besoin de lui. Gratuit · accès anticipé · sans carte.

monde (FR) — L’IA fait les maths. Toi, tu passes le bac. Le jour J, tu es le seul modèle dans la salle — Albert t’entraîne pour ça : un plan à rebours depuis l’épreuve, des sessions courtes chaque jour. Gratuit pendant l’accès anticipé, sans carte.

wapo-teens (EN) — Half your class uses AI to skip the work. Albert uses it to make you do the work: a plan backwards from exam day, daily sessions, mistakes explained until they’re gone. Free · early access · no card.

wapo-blue-books (EN) — Blue books and oral exams are back. The chatbot leaves the room; you stay. Albert trains the only thing that gets through the door — what’s in your head. Free during early access, no card.

wapo-learning (EN) — Your school can’t tell if you’re learning. Albert can — weeks before the exam does: mock scores, mastery by topic, an honest read on your level. Free · early access · no card.

hbr (EN) — Entry-level is the first to go. Be the one who can actually do it: Albert trains you until you can — no tabs, no chatbot, no prompt. Free during early access, no card.

figaro (FR) — La triche à l’IA frappe les lycées. Le jour du bac, tu es le seul modèle dans la salle. Albert t’entraîne pour ça — un plan, chaque jour, jusqu’au jour J. Gratuit · accès anticipé · sans carte.
