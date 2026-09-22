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
Base URL (owner, 2026-09-22): `https://prep.albertschool.com/` — the Vercel
project `albert-prep`; `albert-prep.vercel.app` is the same deployment but is
not the public name. Paid clicks with an exam pre-fill land on **`/start`**:
the root page ignores `?exam=`, `/start?exam=<label>` pre-fills the exam and
opens on the date step (verified headless 2026-09-22).

| Field | Convention |
|---|---|
| `utm_source` | `meta` |
| `utm_medium` | `paid` (organic link-in-bio: `organic`) |
| `utm_campaign` | `2026-09-meta-launch` |
| `utm_content` | `<direction>-<creative-slug>-<format>` e.g. `press-split-monde-4x5` |
| `exam` | exam pre-fill, **on `/start` only**: `/start?exam=A-levels`, `/start?exam=Bac%202027` (free-text label; verified live) |

Measurement as actually implemented (GTM container GTM-K7VPGZ55, pixel
`Albert Prep Data` 936385079418303, browser-side only — no Conversions API):
`PageView` (incl. SPA route changes), custom `FunnelStarted` (first in-funnel
choice: exam date), custom `PlacementCompleted` (three placement questions
answered), **`Lead`** (email captured / magic link sent, or Google sign-in
started at funnel step 7 — the optimised event), `CompleteRegistration`
(account exists and first brief claimed — the quality signal; the deck's
`PlanBuilt` and `InitiateCheckout` were never implemented). Attribution 7-day
click / 1-day view.
