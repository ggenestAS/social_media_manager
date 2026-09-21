# Albert Prep (exam agent) — product context for copy

Source of truth: the landing page strings in the Claude Design project
(`strings.js`, EN/FR/IT/ES) and the campaign concept deck. Nothing below is
invented; if a claim isn't here, don't make it.

**What it is.** An AI agent for exam preparation. The student types the exam
they're sitting ("Which exam are you sitting?"), gives the date and the hours
they can spare each week. The agent maps what the exam actually tests, places
their starting level, and sequences every week between now and exam day —
diagnose → rebuild foundations → targeted practice → exam simulation — then
trains them in short daily sessions that adapt: what they miss comes back
until it sticks, what they master gets out of the way.

**Launch status.** Early access, opening in small waves. Free, no credit
card; early members keep their free access when Albert becomes a subscription
later. "2 minutes" to set up.

**Positioning (the one argument).** *ChatGPT answers. Albert gets you ready.*
Every AI the student uses does the remembering for them; on exam day they are
the only model in the room. Albert is the AI that puts it in their head, not
their tab. Same technology, opposite goal. Use ChatGPT to do your homework for
you; use Albert to be ready when it counts.

## Product facts safe to use in copy

- Any exam: national finals (bac, A-levels), entrance tests, certifications;
  custom exams from provided course context.
- Plan built backwards from the real exam date, re-sequenced as you progress.
- The plan card: "Your exam is in 9 weeks." · 6 sessions a week · about
  40 minutes each · Week 1 Diagnose · Weeks 2–3 Rebuild foundations ·
  Weeks 4–7 Targeted practice · Weeks 8–9 Exam simulation.
- Memory: every weak point is scheduled for the moment it would slip.
- Feedback: names the misconception behind a wrong answer, re-serves it.
- Progress: mock scores, mastery by topic, sessions kept — an honest read on
  your level weeks before the result.
- Science: active recall, spaced repetition, feedback at the right moment.
- "Fifteen focused minutes a day beats a panicked weekend" (FAQ wording).
- The agent tells you honestly if your hours don't match your deadline.
- Free during early access, no card, early members keep access.

## Never claim

- Grade guarantees, « mention garantie », pass rates, success statistics.
- User counts, testimonials, press coverage *of Albert* (the press quoted in
  creatives is about AI and students, not about Albert — keep that honest).
- That the daily training is fully open (early access opens in waves).
- Anything about sibling brands in this repo (`albert-prep` mental-math,
  `prep-ai`) — never cross-reference.

## Destinations & attribution (critical for ads)

Every paid click lands on a tagged campaign URL, never the bare homepage.
Base URL as printed in the design's ad copy: `https://albert-prep.vercel.app/`
— **confirm before spend** (see LOG.md blocker 2).

| Field | Convention |
|---|---|
| `utm_source` | `meta` |
| `utm_medium` | `paid` (organic link-in-bio: `organic`) |
| `utm_campaign` | `2026-09-meta-launch` |
| `utm_content` | `<direction>-<creative-slug>-<format>` e.g. `press-split-monde-4x5` |
| `exam` | exam pre-fill from the ad (deck: "exam pre-filled from the ad via URL"); the landing prototype passes `?exam=` into the funnel — **confirm the live parameter name** |

Measurement plan (from the concept deck): Pixel + Conversions API live and
verified before the first euro; events `PageView` (utm_content = creative),
`InitiateCheckout` (exam typed, "Build my plan" pressed), `Lead` (early-access
account created — the optimised event), custom `PlanBuilt` (first plan
generated — the quality signal). Attribution 7-day click / 1-day view.
