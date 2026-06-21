# Prep — mental math training for Albert School

> **Context only.** This documents the product developed elsewhere. Use it
> when writing ad copy, understanding the offer, or checking feature claims.
> It is not the readme for this marketing repo.

A spaced-repetition web app that builds mental math fluency for business/data
bachelor students. Six themes (representations, operations, powers & roots,
percents, ratios & proportion, estimation habits), three difficulties, server-
validated answers, and a CEFR-style level scale (MA1–MC2) computed from
fluency evidence.

**Stack:** React 19 + TypeScript + Vite + Tailwind 4 (client) · Supabase
(auth, Postgres, edge functions) · deployed on Cloudflare Pages.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # or create it — see below
npm run dev
```

`.env.local` needs:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

`npm run dev` and `npm run build` both run `generate:questions` first (via
`predev`/`prebuild`) — see "Question bank pipeline" below. `npm run lint` runs
ESLint; `tsc -b` runs as part of the build.

## Architecture

```
┌──────────────── client (React/Vite) ────────────────┐
│ pages/        screens (Drill, Challenge, Docs, ...) │
│ components/   QuestionCard, RadarChart, ...         │
│ utils/        engine, mastery, level, storage, sync │
│ engine/       adaptive engine scaffold (Leitner)    │
│ data/         types + client question bank          │
└───────────┬─────────────────────────────────────────┘
            │ supabase-js (auth, sync) + fetch (edge functions)
┌───────────▼───────────── Supabase ──────────────────┐
│ edge functions: validate-answer, generate-problems, │
│                 send-daily-reminders                │
│ tables: questions, question_templates,              │
│         template_variants, trials, profiles,        │
│         question_progress, template_progress, ...   │
│ views: leaderboard_* (derived from trials)          │
└─────────────────────────────────────────────────────┘
```

Three principles drive the design:

1. **The client is never trusted with answers.** Correct answers, accepted
   alternates, and MCQ `isCorrect` flags exist only server-side. All grading
   goes through the `validate-answer` edge function, which also logs every
   attempt to the `trials` table (the source of truth for leaderboards).
2. **Fluency, not just accuracy.** Response time is captured at the moment of
   submission and sent to the server. Leitner promotion requires *fast*
   correct answers — slow-correct holds the item in place.
3. **Skills, not memorized items.** The `generate-problems` edge function
   serves fresh variants from question templates; the client tracks Leitner
   state per *template* (`templateProgress`), so mastery measures the skill,
   not recall of a specific item.

## The learning engine

### Leitner boxes (`src/utils/storage.ts`)

Five boxes with growing review intervals:

| Box | Meaning | Next review |
|---|---|---|
| 0 | unseen / just failed | immediately |
| 1 | learning | 1 day |
| 2 | reviewing | 3 days |
| 3 | mastered | 7 days |
| 4 | retained | 21 days |

`promotionDecision` encodes the speed rule: fast-correct promotes,
slow-correct holds, wrong drops to box 1, and a fast MCQ answer (< 2s) holds
to block guess-clicking. Mastery gates count box ≥ 3.

### Mastery gates (`src/utils/mastery.ts`)

A theme is mastered when four gates hold simultaneously: **depth** (15 items
at box ≥ 3, templates included), **difficulty spread** (≥ 3 medium, ≥ 2 hard),
**precision** (75% on trailing 40 attempts), and **consistency** (80% on
trailing 10).

### Level scale (`src/utils/level.ts`)

A CEFR-style proficiency ladder computed from Leitner evidence:

| Level | Name | Requirement |
|---|---|---|
| MA1 | Beginner | starting point |
| MA2 | Elementary | 4 easy learned in themes 1–2 |
| MB1 | Independent | 4 easy in every theme + 3 medium in two themes |
| MB2 | Professional | 3 medium in every theme + 2 hard in themes 4–5 |
| MC1 | Advanced | all six themes fully mastered |
| MC2 | Mastery | not certifiable from drill data — never awarded |

Because box ≥ 3 requires fast-correct answers, the level is a fluency claim,
not just an accuracy claim. The full rationale (and the CEFR analogy) is in
the in-app guide (`/guide` → "Your level"), the student-facing source of
truth for how levels work.

### Adaptive engine scaffold (`src/engine/`)

`adaptive.ts` implements the Scorer/Selector/Escalator interface from
`../adaptive-loop-technical-brief.md` with Leitner fallbacks — the upgrade
path (Leitner-RT → PFA → Thompson Sampling) is documented in the file header.

## Question bank pipeline

```
src/data/questions.full.ts     ← hand-authored source of truth (answers included;
        │                        never imported by client code)
        │  npm run generate:questions  (scripts/generate-client-questions.mjs)
        ▼
src/data/questions.ts          ← auto-generated, answers stripped — the only
                                 version the client bundles
```

Never edit `questions.ts` directly; edit `questions.full.ts` and regenerate.
The generator asserts that no answer material leaks into the client bundle.

Generated problems come from Supabase (`question_templates` ×
`template_variants`, 24 templates / 480 variants covering every
theme × difficulty cell). The template SQL is produced by:

- `scripts/generate-pdf-templates.py` — t2/t3 hard tiers, mined from French
  drill sheets (Calculs numériques I/II, Radicaux II/III, Automatismes
  Fondamentaux) and sliced into mental-math-sized atoms
- `scripts/generate-coverage-templates.py` — t1/t4 hard, all of t5/t6

Both compute answers with exact rational arithmetic and assert invariants
(unique answers per template, ≥ 2 named common errors per variant, exactly
one correct MCQ option) before emitting SQL into `supabase/fixes/`.

## Project layout

| Path | What lives there |
|---|---|
| `src/pages/` | One file per route — see `App.tsx` for the route table |
| `src/components/` | Shared UI (QuestionCard handles all answer input + RT capture) |
| `src/utils/storage.ts` | localStorage state, Leitner logic, streaks |
| `src/utils/sync.ts` | localStorage ⇄ Supabase merge (per-entity granular merge) |
| `src/utils/mastery.ts` | 4-gate theme mastery |
| `src/utils/level.ts` | MA1–MC2 level computation |
| `src/utils/api.ts` | Edge function clients (validate, generate) |
| `src/engine/` | Adaptive engine scaffold (Leitner-backed) |
| `scripts/` | Question/template generators |
| `supabase/` | Edge functions, SQL fixes/migrations, **deployment README** |

## Server-side docs

`supabase/README.md` documents the deployed state: applied SQL fixes,
edge-function behavior, RLS/grant hardening (clients cannot write `trials`),
leaderboard views, known advisor findings, and remaining trust gaps. Read it
before touching anything in `supabase/`.

The pedagogy and adaptive-engine theory live in
`../adaptive-loop-technical-brief.md` (scorer/selector/escalator models, RT
thresholds, the 49-node skill graph).

## Student-facing docs

The in-app guide (`/guide`, `src/pages/Docs.tsx`) covers installation (PWA),
why fluency matters, the Leitner system, mastery gates, the level scale, and
practice modes. When behavior changes (intervals, gates, level rules), update
the guide in the same PR — it is part of the product, not an afterthought.
