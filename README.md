# GCSE2MED

Marketing site and free self-marking assessment for GCSE2MED — small-group GCSE
and A-level tuition in Biology, Chemistry, Physics and Maths.

Built with Next.js 16 (App Router), TypeScript and Tailwind v4. Deploys to Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck + question bank validation
npm run build
```

Everything runs with **no environment variables set**: emails are logged instead
of sent, leads are not persisted, spam checks are skipped, and the booking modal
falls back to the contact form. See [`.env.example`](.env.example) for what to
configure before going live.

## What's here

| Route | Notes |
| --- | --- |
| `/` | Hero, methodology, assessment callout, delivery, tiers, mistake bank, reviews |
| `/how-it-works` | Diagnose → Expose → Take Action → Review, in depth |
| `/subjects-pricing` | Subjects, tiers in full, monthly/annual price explorer, FAQs |
| `/assessment` | Subject picker |
| `/assessment/[subject]/[level]` | The quiz itself — one static page per question bank |
| `/resources` | Materials, tracking, and the mistake bank explained |
| `/about`, `/contact`, `/book` | |
| `/privacy`, `/terms`, `/guarantee-terms` | Drafts — see "Before launch" |

## Editing content

No CMS. Everything a non-developer would want to change lives in `content/` as
typed data:

- `content/tiers.ts` — the three tiers and their feature lists
- `content/pricing.ts` — monthly and annual price tables. **Savings are always
  computed**, never written into copy, so a price change cannot leave a stale
  "save £28" anywhere on the site
- `content/subjects.ts` — subjects, levels, exam boards, which assessments exist
- `content/methodology.ts` — the four steps and the three mistake types
- `content/reviews.ts` — deliberately empty; see below
- `content/faqs.ts`, `content/resources.ts`, `content/site.ts`

### Reviews

`content/reviews.ts` is empty on purpose. Testimonials must be real — inventing
them would mislead parents and, since the DMCC Act 2024, fake reviews are
unlawful in the UK. The section renders an honest holding state until the array
has entries, and swaps to a Trustpilot feed later without a layout change.

## The assessment

Question banks live in `content/assessments/<subject>-<level>.ts` as plain data.
Adding the client's finalised questions is a data change — no code involved.

**The answer key never reaches the browser.** `content/assessments/index.ts`
imports `server-only`, so a Client Component importing it is a build error. The
page sends questions through `toPublicQuestion()`, which strips `correctIndex`
and `explanation`; marking happens in `app/api/assessment/submit/route.ts`
against the server-side bank. `/api/assessment/report` re-marks from the
submitted answers rather than trusting anything the client sends back.

`npm run check:banks` validates the banks for things TypeScript cannot see —
duplicate ids, out-of-range answers, missing explanations, and an answer key
concentrated in one option position (which would let a student score full marks
without reading a question).

Each question carries a `topic` and a `probes` tag (`knowledge` | `exam` |
`careless`). Those two fields turn a raw score into "areas to improve" and are
the seam the Phase 2 mistake bank plugs into — tag new questions properly.

## Data

`supabase/schema.sql` creates the two tables (`leads`, `assessment_attempts`).
RLS is enabled with no permissive policies: the app writes with the service role
key, so an exposed anon key still reads nothing. Persistence is best-effort
everywhere — a Supabase outage degrades lead capture rather than breaking the
assessment.

## Images

Client-supplied Unsplash originals live in `_brief/photos/` (2–4 MB each).
`npm run images` downscales them into `public/images/` and regenerates
`public/images/credits.md`. Replace the map in `scripts/optimize-images.mjs` to
change which photo goes where. These are placeholders — real photographs of
GCSE2MED tutors and lessons should replace the hero and About imagery.

## Before launch

1. **Assessment questions** — the six banks are placeholders pending the real set
2. **Legal** — `/privacy`, `/terms` and `/guarantee-terms` are drafts carrying a
   visible "not yet reviewed" notice and inline `TODO(client)` markers. They need
   the registered company details, concrete retention periods, the guarantee's
   actual conditions, and a solicitor's review
3. **About page** — founder story, tutor credentials and the safeguarding
   statement are marked `TODO(client)`; they are factual claims about real people
   and are not for us to invent
4. **Brand** — logo, fonts and exact brand hex values (`app/globals.css`)
5. **Accounts** — Cal.com or Calendly, Resend (with domain verification),
   Supabase, Cloudflare Turnstile, and the domain itself
6. **A-level pricing** — the brief's tables do not split by level; confirm
   A-level uses the same prices
