-- PikaMood Supabase Schema
-- Run this entire file in Supabase → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles ──────────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid references auth.users on delete cascade primary key,
  username      text not null default 'Trainer',
  xp            integer not null default 0,
  streak        integer not null default 0,
  last_checkin  date,
  dark_mode     boolean not null default false,
  achievements  jsonb not null default '[]',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-create profile when user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', 'Trainer'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── Mood Entries ──────────────────────────────────────────────────
create table if not exists mood_entries (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  mood        text not null,
  note        text default '',
  tags        text[] default '{}',
  intensity   integer default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Index for fast user queries
create index if not exists mood_entries_user_id_idx on mood_entries(user_id);
create index if not exists mood_entries_created_at_idx on mood_entries(created_at desc);

-- ── Partner Connections (Phase 2 — sharing) ───────────────────────
create table if not exists partner_connections (
  id            uuid default uuid_generate_v4() primary key,
  requester_id  uuid references auth.users on delete cascade not null,
  partner_id    uuid references auth.users on delete cascade not null,
  status        text not null default 'pending', -- pending | accepted | declined
  created_at    timestamptz not null default now(),
  unique(requester_id, partner_id)
);

-- ── Shared Moods (Phase 2) ────────────────────────────────────────
create table if not exists shared_entries (
  id            uuid default uuid_generate_v4() primary key,
  entry_id      uuid references mood_entries on delete cascade not null,
  shared_by     uuid references auth.users on delete cascade not null,
  shared_with   uuid references auth.users on delete cascade not null,
  message       text default '',
  created_at    timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────────
alter table profiles enable row level security;
alter table mood_entries enable row level security;
alter table partner_connections enable row level security;
alter table shared_entries enable row level security;

-- Profiles: users can read/write their own
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Mood entries: users can CRUD their own
create policy "Users can view own entries"
  on mood_entries for select using (auth.uid() = user_id);
create policy "Users can insert own entries"
  on mood_entries for insert with check (auth.uid() = user_id);
create policy "Users can update own entries"
  on mood_entries for update using (auth.uid() = user_id);
create policy "Users can delete own entries"
  on mood_entries for delete using (auth.uid() = user_id);

-- Phase 2: Partners can see shared entries
create policy "Partners can view shared entries"
  on shared_entries for select using (
    auth.uid() = shared_by or auth.uid() = shared_with
  );
create policy "Users can share their own entries"
  on shared_entries for insert with check (auth.uid() = shared_by);

-- Partner connections
create policy "Users can view own connections"
  on partner_connections for select using (
    auth.uid() = requester_id or auth.uid() = partner_id
  );
create policy "Users can create connection requests"
  on partner_connections for insert with check (auth.uid() = requester_id);
create policy "Partners can accept/decline"
  on partner_connections for update using (
    auth.uid() = partner_id or auth.uid() = requester_id
  );

-- ── Realtime ─────────────────────────────────────────────────────
-- Enable realtime on tables we want live updates for
alter publication supabase_realtime add table mood_entries;
alter publication supabase_realtime add table shared_entries;
alter publication supabase_realtime add table profiles;
