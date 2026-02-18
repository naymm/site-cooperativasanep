-- Supabase SQL (run in SQL Editor)
-- Creates visit booking resource with:
-- - Allowed slots: Wednesday & Friday at 10:00 or 15:00
-- - Limit: 10 bookings per slot (atomic enforcement)

create extension if not exists pgcrypto;

create table if not exists public.visit_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  project_name text,
  first_name text not null,
  last_name text not null,
  document_type text not null check (document_type in ('BI', 'PASSAPORTE')),
  document_number text not null,
  phone_primary text not null,
  phone_alt text,
  email text not null,

  slot_at timestamptz not null
);

create index if not exists visit_bookings_slot_at_idx on public.visit_bookings (slot_at);

-- Validate slot rules on the DB side too
alter table public.visit_bookings
  drop constraint if exists visit_bookings_slot_rules;

alter table public.visit_bookings
  add constraint visit_bookings_slot_rules
  check (
    -- Postgres: dow 0=Sunday, 3=Wednesday, 5=Friday
    extract(dow from slot_at at time zone 'UTC') in (3, 5)
    and extract(minute from slot_at at time zone 'UTC') = 0
    and extract(hour from slot_at at time zone 'UTC') in (10, 15)
  );

alter table public.visit_bookings enable row level security;

-- Optional (no reads from public/anon by default)
drop policy if exists "visit_bookings_no_select" on public.visit_bookings;
create policy "visit_bookings_no_select"
  on public.visit_bookings
  for select
  using (false);

-- RPC: atomic insert with per-slot limit of 10
create or replace function public.create_visit_booking(
  p_project_name text,
  p_first_name text,
  p_last_name text,
  p_document_type text,
  p_document_number text,
  p_phone_primary text,
  p_phone_alt text,
  p_email text,
  p_slot_at timestamptz
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
  v_id uuid;
begin
  -- Validate allowed slots (keeps API errors friendly)
  if not (
    extract(dow from p_slot_at at time zone 'UTC') in (3, 5)
    and extract(minute from p_slot_at at time zone 'UTC') = 0
    and extract(hour from p_slot_at at time zone 'UTC') in (10, 15)
  ) then
    raise exception 'invalid_slot';
  end if;

  -- Serialize per slot to enforce the limit safely under concurrency
  perform pg_advisory_xact_lock(hashtext(p_slot_at::text));

  select count(*) into v_count
  from public.visit_bookings
  where slot_at = p_slot_at;

  if v_count >= 10 then
    raise exception 'slot_full';
  end if;

  insert into public.visit_bookings (
    project_name,
    first_name,
    last_name,
    document_type,
    document_number,
    phone_primary,
    phone_alt,
    email,
    slot_at
  ) values (
    nullif(trim(p_project_name), ''),
    trim(p_first_name),
    trim(p_last_name),
    trim(p_document_type),
    trim(p_document_number),
    trim(p_phone_primary),
    nullif(trim(p_phone_alt), ''),
    trim(p_email),
    p_slot_at
  )
  returning id into v_id;

  return v_id;
end;
$$;

-- Allow anonymous users to call the RPC (the function itself controls insertion)
grant execute on function public.create_visit_booking(
  text, text, text, text, text, text, text, text, timestamptz
) to anon, authenticated;

