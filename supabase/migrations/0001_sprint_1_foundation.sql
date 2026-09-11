create extension if not exists "pgcrypto";

create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, jlpt_level text not null default 'N5' check (jlpt_level in ('N5', 'N4', 'N3', 'N2', 'N1')), created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.levels (id uuid primary key default gen_random_uuid(), code text unique not null check (code in ('N5', 'N4', 'N3', 'N2', 'N1')), name text not null, description text, sort_order integer not null unique);
create table public.tracks (id uuid primary key default gen_random_uuid(), code text unique not null check (code in ('shiken', 'seikatsu')), name text not null);
create table public.units (id uuid primary key default gen_random_uuid(), level_id uuid not null references public.levels(id) on delete cascade, track_id uuid not null references public.tracks(id) on delete cascade, title text not null, description text, sort_order integer not null, unique(level_id, track_id, sort_order));
create table public.lessons (id uuid primary key default gen_random_uuid(), unit_id uuid not null references public.units(id) on delete cascade, title text not null, slug text unique not null, content jsonb not null default '{}'::jsonb, sort_order integer not null, unique(unit_id, sort_order));
create table public.vocab_items (id uuid primary key default gen_random_uuid(), lesson_id uuid references public.lessons(id) on delete set null, term text not null, reading text, meaning text not null, example_sentence text);
create table public.kanji_items (id uuid primary key default gen_random_uuid(), lesson_id uuid references public.lessons(id) on delete set null, character text not null, readings text[] not null default '{}', meaning text not null, stroke_count integer);
create table public.grammar_points (id uuid primary key default gen_random_uuid(), lesson_id uuid references public.lessons(id) on delete set null, pattern text not null, explanation text not null, examples jsonb not null default '[]'::jsonb);
create table public.user_progress (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, lesson_id uuid not null references public.lessons(id) on delete cascade, status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')), score numeric(5,2), completed_at timestamptz, updated_at timestamptz not null default now(), unique(user_id, lesson_id));

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
create policy "Profiles are readable by owner" on public.profiles for select using (auth.uid() = id);
create policy "Profiles are insertable by owner" on public.profiles for insert with check (auth.uid() = id);
create policy "Profiles are updateable by owner" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Progress is readable by owner" on public.user_progress for select using (auth.uid() = user_id);
create policy "Progress is insertable by owner" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Progress is updateable by owner" on public.user_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles (id) values (new.id); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
