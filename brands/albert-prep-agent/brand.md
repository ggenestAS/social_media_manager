# Albert Prep (exam agent) — brand definition

**Product:** Albert Prep, "the exam agent" — tell it which exam you're sitting
and when; it builds a plan backwards from exam day and trains you in short
daily sessions until you walk in ready. Any exam; launch markets: French bac
(FR) and A-levels (UK). Product facts and destinations:
[`context/product.md`](context/product.md).
Landing (as printed in the design's ad copy): <https://prep.albertschool.com>
— **confirm the production URL before spend** (the concept deck says
`prep.albert.com`; the previous identity used `prepai.albertschool.com`).

## Mission

Make the student the one who can do it without the tab open. Every other AI
tool does the remembering for them; the exam room takes those tools away.
Albert uses AI for the one thing that survives the door: getting it into
their head.

## Audience

- **Final-year students, 16–18, exam date already fixed** — Bac général &
  technologique (FR), A-levels (UK). Instagram-first, Reels-heavy. Uses AI
  daily, revises rarely, worries constantly. Wants a plan, not another app.
- **Parents, 25–54** (secondary, carousel test) — read the "AI is making
  students dumber" headlines; want the other kind of AI for their kid.
- **Two pressure points a year:** mocks (Nov–Jan) and the final run-in
  (Mar–May). The launch flight targets mocks ("Your exam is in 9 weeks").

## Visual identity — "The black frame"

Dark, typographic, almost still. Near-black ink, fog-white type, Helvetica at
weight 500 with tight tracking, one accent-blue typing cursor. No product UI
except the plan card; no photos. Press clippings appear on warm paper in
Georgia — someone else's newspaper — and Albert always answers on ink.
The full contract (tokens, CSS, wordmark, signatures) is
[`templates/design-system.md`](templates/design-system.md). Use it verbatim.

## Voice & tone

- **Language:** English (UK market, default for the design system) and
  French (FR market). French is **written natively, never translated** —
  see the copy bank in the campaign's `campaign.md`.
- **Register:** second person, short declaratives, calm and a little
  contrarian. "The exam room has no tabs." Lower-case openers are allowed
  when the ad is peer-to-peer ("honest question").
- **The argument:** *ChatGPT answers. Albert gets you ready.* Same technology,
  opposite goal. Never anti-AI — Albert *is* AI, aimed at the one thing that
  gets through the door.
- **Hard rules**
  - No grade guarantees, no success statistics, no user counts, no
    testimonials (none exist). Product-truth only — see `context/product.md`.
  - **Press material:** every quoted headline must be the exact published
    wording with masthead and date, verified against the article before
    publishing; EN headlines in the design are paraphrased placeholders.
    Real masthead logos are third-party trademarks — get sign-off before
    using them on paid media; the text masthead is the safe default.
  - The trust line is literal and unchanging: "Free · early access · no card"
    / « Gratuit · accès anticipé · sans carte ». Don't invent urgency.
- **CTA:** "Build my plan" / « Construire mon plan » on assets; Meta button
  "Sign up" / « S'inscrire ». Destination is always a tagged campaign URL
  (see `context/product.md`), never the bare homepage.

## Post types

Defined by the folders in [`templates/post-types/`](templates/post-types/):
`statement`, `press-split`, `carousel`, `press-reel` — all four derived
from the produced paid creatives, so organic and paid share one visual world.

## Channels

The former mental-math accounts are converted to this brand (decision
2026-09-21): Instagram `albert.prep`, Facebook `Albert Prep`, TikTok
`albertprep` — declared in [`channels.json`](channels.json); resolve live ids
with `BRAND=albert-prep-agent npm run social:resolve`. Their profile photo,
cover and bio still carry the old identity until the new assets land (Claude
Design, pending). Paid runs through Meta Ads Manager, not Postiz.
