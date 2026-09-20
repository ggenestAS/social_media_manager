---
type: paid-press-reel
campaign: 2026-09-20-meta-launch
experiment: EXP-2026-09-20-meta-directions
mechanic: press-reel
market: uk
language: en
channels: []
schedule: null
status: draft
postiz_id: null
boards: ["Reel Fortune A · 9:16", "Reel Fortune B · 9:16"]
loop_s: 13.0
meta:
  objective: leads (Lead = early-access account created)
  ad_set: press-reel · UK
  cta_button: "Sign up"
  description: "Free · early access · no card"
  ads:
    - { variant: A, destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-fortune-a&exam=A-levels" }
    - { variant: B, destination: "https://albert-prep.vercel.app/?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-fortune-b&exam=A-levels" }
press:
  - { mast: "Fortune", date: "February 24, 2026", headline: "‘Students can’t reason’: Teachers warn AI is fueling a crisis in kids’ ability to think", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/Fortune_magazine_logo_2016.svg", url: TODO-verify }
export:
  command: npm run html:to-mp4 -- <this>/source.html --out <this>/export
  notes: data-speed=1, data-loop-ms, data-cta-ms, data-cover-ms are set by the inlined reel-timeline.js; cover = the full headline just before the panel rises
checklist:
  - verify the headline's exact wording + link; masthead renders as text (real logo only with sign-off)
  - QA the MP4 at 1× — pacing is authored, never time-stretch
---
Variant A (design default unless noted) — Fortune
right: They’re right. · kicker: So we built the other kind. · hero: Albert is the AI that makes you do the thinking. (accent from “you”) · CTA: Build my plan

Variant B
right: Cool. Now pass the exam. · kicker: The agent that gets you there. · hero: Tell Albert your exam. It gets you ready for it. (accent from “gets”)
Primary text — PROPOSED: Teachers warn AI is fueling a crisis in kids’ ability to think. They’re right — so we built the other kind. Albert is the AI that makes you do the thinking: tell it your exam, it builds your plan backwards from the date and trains you daily until you walk in ready. Free · early access · no card.
