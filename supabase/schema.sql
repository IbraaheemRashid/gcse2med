-- GCSE2MED — Phase 1 schema
--
-- Two tables: everything the marketing site and the free assessment need to
-- capture, and nothing more. Phase 2 (student accounts, flashcard tracking, the
-- mistake bank) builds on this same project rather than replacing it.
--
-- Apply with: Supabase dashboard > SQL editor > paste and run.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- leads: anyone who has given us an email address, from any entry point.
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  email              text not null,
  name               text,
  phone              text,
  -- 'assessment' | 'contact' | 'consultation' | 'resources'
  source             text not null,
  message            text,
  -- Explicit opt-in. False means we may only reply to the enquiry itself.
  marketing_consent  boolean not null default false,
  metadata           jsonb not null default '{}'::jsonb
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email));
create index if not exists leads_source_idx on public.leads (source);

-- ---------------------------------------------------------------------------
-- assessment_attempts: every completed assessment, with or without an email.
--
-- `outcomes` is questionId -> boolean and `gaps` is gapId -> count, which is
-- what the Phase 2 mistake bank reads to seed a student's first revision plan.
-- ---------------------------------------------------------------------------
create table if not exists public.assessment_attempts (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  subject      text not null,
  level        text not null,
  score        integer not null,
  total        integer not null,
  percentage   integer not null,
  focus_topics text[] not null default '{}',
  outcomes     jsonb not null default '{}'::jsonb,
  gaps         jsonb not null default '{}'::jsonb,
  -- Null when the student did not ask for an emailed report. Attempts stay
  -- anonymous unless someone chooses otherwise.
  email        text
);

create index if not exists attempts_created_at_idx on public.assessment_attempts (created_at desc);
create index if not exists attempts_subject_level_idx on public.assessment_attempts (subject, level);
create index if not exists attempts_email_idx on public.assessment_attempts (lower(email))
  where email is not null;

-- ---------------------------------------------------------------------------
-- Row level security.
--
-- The app writes with the service role key, which bypasses RLS. Enabling it
-- with no permissive policies means that if the anon key is ever exposed in the
-- browser, it still cannot read a single lead or assessment result.
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.assessment_attempts enable row level security;

-- ---------------------------------------------------------------------------
-- Retention. Personal data on minors should not sit here indefinitely — set the
-- period in the privacy policy first, then schedule this with pg_cron.
--
-- select cron.schedule('gcse2med-retention', '0 3 * * *', $$
--   delete from public.assessment_attempts
--    where created_at < now() - interval '24 months';
--   update public.leads set email = null, name = null, phone = null, message = null
--    where created_at < now() - interval '24 months' and marketing_consent = false;
-- $$);
