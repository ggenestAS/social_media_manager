---
type: carousel
channels: [ig, fb]            # aliases in channels.json — placeholders until accounts exist
placements:
  - { channel: ig, post_type: post }
  - { channel: fb, post_type: post }
schedule: 2026-09-22T18:00    # Europe/Paris — proposed, not confirmed
status: draft
postiz_id: null
language: en
boards: ["Carousel · 1/4", "Carousel · 2/4", "Carousel · 3/4", "Carousel · 4/4"]
link_in_bio: https://albert-prep.vercel.app/?utm_source=instagram&utm_medium=organic&utm_campaign=2026-09-launch&utm_content=carousel-001
press:
  - { mast: Fortune, date: 2026-02-24, headline: "‘Students can’t reason’: Teachers warn AI is fueling a crisis in kids’ ability to think", url: TODO-verify }
  - { mast: Fortune, date: 2026-03-14, headline: "Math and reading scores fell after schools swapped textbooks for screens. AI could worsen the brain rot", url: TODO-verify }
  - { mast: Euronews, date: 2026-09-10, headline: "PISA founder: AI is ‘hollowing out’ young people’s critical skills", url: TODO-verify }
  - { mast: Philadelphia Inquirer, date: 2026-09-18, headline: "MIT report warns AI is causing ‘cognitive surrender’", url: TODO-verify }
checklist:
  - verify the four headlines; replace card-1 clippings with verified screenshots before publishing
  - export: npm run html:to-image -- <this>/source.html --all --out <this>/export
---
The press has spent 2026 saying AI is making students dumber. Fair — most AI tools are built to do the work for you. Albert is built to make you the one who can do it. Same technology, opposite goal. Free while we build it. Link in bio.

#alevels #revision #examseason
