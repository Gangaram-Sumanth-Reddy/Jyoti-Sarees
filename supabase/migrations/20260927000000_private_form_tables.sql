-- Private tables for website form submissions.
--
-- Access model:
--   * RLS is enabled on every table and NO policies are granted to the `anon`
--     or `authenticated` roles, so the public anon key cannot read, insert,
--     update or delete anything here.
--   * The website writes through server-side route handlers (app/api/*) using
--     SUPABASE_SERVICE_ROLE_KEY, which is never exposed to the browser.
--   * Staff review submissions in the Supabase dashboard (or a future admin
--     tool that authenticates staff and runs server-side).
--   * Testimonial submissions live in their own table and never modify the
--     testimonials published on the website.

create extension if not exists pgcrypto;

-- Enquiries -------------------------------------------------------------------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 1 and 100),
  phone_country_code text not null check (char_length(phone_country_code) <= 8),
  phone text not null check (phone ~ '^[0-9]{6,15}$'),
  email text check (email is null or char_length(email) <= 254),
  address text check (address is null or char_length(address) <= 300),
  pincode text check (pincode is null or pincode ~ '^[0-9]{6}$'),
  state text check (state is null or char_length(state) <= 60),
  city text check (city is null or char_length(city) <= 80),
  requirement text not null check (char_length(requirement) between 1 and 500),
  quantity integer not null check (quantity between 1 and 999),
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  marketing_consent_text text,
  marketing_consent_withdrawn_at timestamptz,
  policy_version text not null,
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'closed')),
  check (marketing_consent = false or marketing_consent_at is not null)
);

-- Testimonial submissions (moderation queue) ----------------------------------
create table if not exists public.testimonial_submissions (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 80),
  city text check (city is null or char_length(city) <= 80),
  saree text check (saree is null or char_length(saree) <= 120),
  message text not null check (char_length(message) between 1 and 1500),
  publication_consent boolean not null check (publication_consent),
  publication_consent_at timestamptz not null,
  publication_consent_text text not null,
  publication_consent_withdrawn_at timestamptz,
  policy_version text not null,
  status text not null default 'pending_review'
    check (status in ('pending_review', 'approved', 'rejected', 'withdrawn')),
  reviewed_at timestamptz
);

-- Privacy / data-rights requests ----------------------------------------------
create table if not exists public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  contact text not null check (char_length(contact) between 3 and 254),
  request_type text not null
    check (request_type in ('access', 'correction', 'deletion', 'withdraw_consent', 'grievance')),
  description text not null check (char_length(description) between 1 and 2000),
  policy_version text not null,
  status text not null default 'received'
    check (status in ('received', 'verifying', 'in_progress', 'completed', 'declined')),
  resolved_at timestamptz,
  resolution_note text
);

-- Lock everything down --------------------------------------------------------
alter table public.enquiries enable row level security;
alter table public.testimonial_submissions enable row level security;
alter table public.privacy_requests enable row level security;

alter table public.enquiries force row level security;
alter table public.testimonial_submissions force row level security;
alter table public.privacy_requests force row level security;

revoke all on public.enquiries from anon, authenticated;
revoke all on public.testimonial_submissions from anon, authenticated;
revoke all on public.privacy_requests from anon, authenticated;

-- Retention -------------------------------------------------------------------
-- Retention periods are a business decision (see lib/privacy-config.ts) and
-- are intentionally NOT hardcoded here. Once confirmed, call this function
-- on a schedule (e.g. pg_cron) with the agreed periods, for example:
--   select public.purge_expired_form_data(
--     enquiry_retention => interval '<confirmed period>',
--     unpublished_testimonial_retention => interval '<confirmed period>',
--     privacy_request_retention => interval '<confirmed period>'
--   );
create or replace function public.purge_expired_form_data(
  enquiry_retention interval,
  unpublished_testimonial_retention interval,
  privacy_request_retention interval
) returns void
language sql
as $$
  delete from public.enquiries
    where created_at < now() - enquiry_retention;
  delete from public.testimonial_submissions
    where status in ('rejected', 'withdrawn', 'pending_review')
      and created_at < now() - unpublished_testimonial_retention;
  delete from public.privacy_requests
    where status in ('completed', 'declined')
      and created_at < now() - privacy_request_retention;
$$;

revoke all on function public.purge_expired_form_data(interval, interval, interval)
  from public, anon, authenticated;
