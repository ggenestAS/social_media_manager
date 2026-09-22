---
type: paid-press-split
campaign: 2026-09-20-meta-launch
experiment: EXP-2026-09-20-meta-directions
mechanic: press-split (round 1)
market: uk
language: en
channels: []
schedule: null
status: draft
postiz_id: null
boards: ["Split fortune · 4:5", "Split euronews · 4:5", "Split inquirer · 4:5", "Split fortune-screens · 4:5", "Split fortune · 9:16"]
meta:
  objective: leads (Lead = early-access account created)
  ad_set: press-split · UK
  cta_button: "Sign up"
  description: "Free · early access · no card"
  ads:
    - { board: fortune,         headline: "Albert is the AI that makes you do the thinking.", destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-fortune&exam=A-levels" }
    - { board: euronews,        headline: "An AI that puts it in your head, not your tab.",   destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-euronews&exam=A-levels" }
    - { board: inquirer,        headline: "On exam day, you’re the only model in the room.", destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-inquirer&exam=A-levels" }
    - { board: fortune-screens, headline: "It trains you until you can do it alone.",        destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-split-fortune-screens&exam=A-levels" }
press:
  - { board: fortune,         mast: Fortune,               date: 2026-02-24, headline: "‘Students can’t reason’: Teachers warn AI is fueling a crisis in kids’ ability to think", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Fortune_magazine_logo_2016.svg", url: https://fortune.com/2026/02/24/students-cant-reason-teachers-warn-ai-fueling-crisis-in-kids-ability-to-think/ }
  - { board: euronews,        mast: Euronews,              date: 2026-09-10, headline: "Youth losing critical skills and AI ‘hollowing out’ capabilities, PISA founder says", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Euronews_2022.svg", url: https://www.euronews.com/my-europe/2026/09/10/youth-losing-critical-skills-and-ai-hollowing-out-capabilities-pisa-founder-says }
  - { board: inquirer,        mast: Philadelphia Inquirer, date: 2026-09-18, headline: "MIT report warns AI is causing ‘cognitive surrender.’ Universities are in a bind.", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Inquirer_Nameplate_Black.svg", note: "NYT wire story (orig. NYT 2026-09-15); Inquirer h1 verbatim", url: https://www.inquirer.com/education/artificial-intelligence-college-students-universities-approaches-mit-harvard-ohio-chicago-20260918.html }
  - { board: fortune-screens, mast: Fortune,               date: 2026-03-14, headline: "America’s math and reading scores tanked after schools ditched textbooks for screens—and AI could worsen the brain rot", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Fortune_magazine_logo_2016.svg", url: https://fortune.com/2026/02/24/students-cant-reason-teachers-warn-ai-fueling-crisis-in-kids-ability-to-think/ }
checklist:
  - ~~verify every headline's exact wording + link~~ done 2026-09-22 (web fact-check): fortune + inquirer verbatim; euronews + fortune-screens boards rewritten to the published headline
  - mastheads render as text; real logos only with rights sign-off (drop PNGs in assets/press/)
  - export: npm run html:to-image -- <this>/source.html --all --out <this>/export
---
Primary text — PROPOSED (the design supplied none for splits; written from the board copy, one per ad):

fortune — Teachers say AI is fueling a crisis in kids’ ability to think. They’re right. So we built the other kind: Albert is the AI that makes you do the thinking — a plan backwards from your exam date, daily sessions until it sticks. Free during early access, no card.

euronews — Same technology, opposite goal. Every AI you use does the remembering for you; Albert puts it in your head, not your tab. Tell it your exam. It builds your plan and trains you every day until you sit it. Free · early access · no card.

inquirer — On exam day, you’re the only model in the room. Albert trains that one: a plan backwards from your exam date, short daily sessions, mistakes explained and re-served until they’re gone. Free during early access, no card.

fortune-screens — Albert doesn’t do your homework. It trains you until you can do it alone — active recall, spaced repetition, fifteen minutes a day, sequenced backwards from your exam. Free · early access · no card.
