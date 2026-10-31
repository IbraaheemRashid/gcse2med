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

The production project had only NEXT_PUBLIC_SITE_URL configured. Resend's
mail.gcse2med.com domain was not verified and its three required DNS records
were absent. The new records are prepared in GoDaddy but have not been saved:
resend._domainkey.mail (TXT), rsend.mail (CNAME) and send.mail (CNAME).
Existing Outlook MX/SPF records are unchanged.

The default EMAIL_FROM and .env.example now use
`GCSE2MED <hello@mail.gcse2med.com>`; enquiries go to yahiya@gcse2med.com.
User approved saving DNS, creating a domain-restricted sending
key, storing it in Vercel and sending one test email. EMAIL_FROM and EMAIL_INTERNAL_TO are now saved in Vercel Production. GoDaddy requires an SMS identity check before it will save the DNS records; the user has been asked to complete it in Chrome. The sending key and delivery test remain pending that step. No credentials are stored in
the repository. Delivery is not yet verified. Environment changes will need a
later authorized deployment to take effect on the live site.

User authorized deployment on 31 October 2026 and explicitly deferred the remaining email verification and delivery test.

The topic review panel shows five active topics by default, preserving due-first ordering. Expand reveals a bounded scrollable list; resting topics are collapsed together. Expansion resets when changing the subject or due filter. Browser-checked using 45 active and 20 resting example topics.


