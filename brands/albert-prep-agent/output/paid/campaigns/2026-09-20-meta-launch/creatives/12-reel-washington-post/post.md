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
boards: ["Reel The Washington Post A · 9:16", "Reel The Washington Post B · 9:16"]
loop_s: 13.0
meta:
  objective: leads (Lead = early-access account created)
  ad_set: press-reel · UK
  cta_button: "Sign up"
  description: "Free · early access · no card"
  ads:
    - { variant: A, destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-wapo-a&exam=A-levels" }
    - { variant: B, destination: "https://prep.albertschool.com/start?utm_source=meta&utm_medium=paid&utm_campaign=2026-09-meta-launch&utm_content=press-reel-wapo-b&exam=A-levels" }
press:
  - { mast: "The Washington Post", date: "August 9, 2026", headline: "Universities are fighting AI cheating. But there’s a deeper problem.", logo_ref: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Logo_of_The_Washington_Post_Newspaper.svg", url: https://www.washingtonpost.com/opinions/2026/08/09/university-fight-against-ai-cheating-doesnt-go-far-enough/ }
export:
  command: npm run html:to-mp4 -- <this>/source.html --out <this>/export
  notes: data-speed=1, data-loop-ms, data-cta-ms, data-cover-ms and data-audio-cues are set by the inlined reel-timeline.js; sound design is mixed automatically from assets/audio (−14 LUFS, no music); cover = the full headline just before the panel rises
checklist:
  - note: the WaPo piece is an OPINION column (Dartmouth provost); Semafor reported it was flagged as AI-written — keep the masthead honest ("Opinion") or accept the caveat
  - verify the headline's exact wording + link; masthead renders as text (real logo only with sign-off)
  - QA the MP4 at 1× — pacing is authored, never time-stretch
---
Variant A (design default unless noted) — The Washington Post
right: Blue books are back. · kicker: The chatbot leaves the room. · hero: You stay. Albert trains what stays with you. (accent from “what”) · CTA: Build my plan

Variant B
right: Good. You’ll be ready. · kicker: The agent that gets you good grades. · hero: Fifteen minutes a day. Better grades on the day. (accent from “Better”)
Primary text — PROPOSED: Universities are fighting AI cheating — blue books and oral exams are back. The chatbot leaves the room; you stay. Albert trains what stays with you: a plan backwards from exam day, daily sessions until it sticks. Free · early access · no card. — Note: variant B (“gets you good grades”, “Better grades on the day”) edges toward an outcome promise; drop it if the no-grade-claims rule is enforced.
