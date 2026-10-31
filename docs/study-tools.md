# Integrated study tools

The tracker is implemented in React using the site's shared UI components. Its
`gcse2med-papers-v1` storage key and G2M1 backup format remain compatible with the
original tool. Invalid saved data is preserved until a valid backup is restored.

The science flashcards, Maths generator and GCSE assessments use native Next
routes with the site's header, footer, fonts and colour tokens. Their supplied
question banks and study engines are retained, mounted into an open shadow root
to isolate their styles and DOM queries. No iframe or second site navigation is
used. Timers, observers and external event listeners are disposed on navigation.
The generator's internal settings/sheet navigation is separate from Next's
browser history.

Source HTML is retained under `public/resources/flashcards`,
`public/resources/tools/maths-question-generator.html` and `public/assessments`.
Old public URLs redirect to the new routes. `npm run build:tools` extracts the
source engines and markup into `public/learning-tools`; `prebuild` runs it
automatically. Do not edit the generated modules. Shared integration code lives
in `lib/learning-tool-runtime.ts`, `components/resources/StudyTool.tsx` and
`components/resources/learning-tool-styles.ts`.

Progress stays local to the browser and origin, as before. Production progress
will be retained because the native routes use the same origin and storage
keys. Localhost previews have separate progress. PDF resources remain downloads
on their existing subject pages.

Validation: `npm run check` includes lint, TypeScript, question-bank checks and
five tracker regression tests (migration, Unicode backups, merge preservation,
invalid data and review scheduling). `npm run build` produces all native routes.
Browser checks covered desktop/mobile layout, tracker add/edit/remove and redo,
topic reviews, chart selection, invalid/duplicate backup restoration, science
course selection and progress transfer, sheet generation/answers/share links,
and assessment resume/marking. All three flashcard and four assessment pages
were checked for successful loading.

## Email setup status — 31 October 2026

All three Resend DNS records are saved and mail.gcse2med.com is verified. A sending-only API key restricted to that domain is stored as a Vercel Production secret, alongside EMAIL_FROM and EMAIL_INTERNAL_TO. No credentials are stored in the repository. Delivery testing follows the deployment.

## Tracker starting state

New trackers show one labelled example in the paper log. Examples are excluded from completed-paper totals, subject scores, graphs, revision topics and progress summaries. Existing saved examples are reduced to one without altering personal papers, review history or backups. Papers save automatically in localStorage under the existing key. Browser verification confirmed a real paper survives refresh and contributes to progress; the test paper was then removed. Six regression tests and the production build pass.

The topic review panel shows five active topics by default, preserving due-first ordering. Expand reveals a bounded scrollable list; resting topics are collapsed together. Expansion resets when changing the subject or due filter. Browser-checked using 45 active and 20 resting example topics.



