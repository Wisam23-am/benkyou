create table
    public.review_cards (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references auth.users (id) on delete cascade,
        item_id uuid not null,
        item_type text not null check (item_type in ('vocab', 'kanji', 'grammar')),
        due_at timestamptz not null default now (),
        interval integer not null default 0 check (interval >= 0),
        ease_factor numeric(3, 2) not null default 2.50 check (ease_factor between 1.30 and 2.80),
        reviews integer not null default 0 check (reviews >= 0),
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now (),
        unique (user_id, item_id, item_type)
    );

create table
    public.review_logs (
        id uuid primary key default gen_random_uuid (),
        card_id uuid not null references public.review_cards (id) on delete cascade,
        user_id uuid not null references auth.users (id) on delete cascade,
        rating text not null check (rating in ('lupa', 'sulit', 'bisa', 'mudah')),
        response_time_ms integer not null check (response_time_ms >= 0),
        created_at timestamptz not null default now ()
    );

alter table public.review_cards enable row level security;

alter table public.review_logs enable row level security;

create policy "Review cards are readable by owner" on public.review_cards for
select
    using (auth.uid () = user_id);

create policy "Review cards are insertable by owner" on public.review_cards for insert
with
    check (auth.uid () = user_id);

create policy "Review cards are updateable by owner" on public.review_cards for
update using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

create policy "Review logs are readable by owner" on public.review_logs for
select
    using (auth.uid () = user_id);

create policy "Review logs are insertable by owner" on public.review_logs for insert
with
    check (auth.uid () = user_id);

create index review_cards_due_queue_idx on public.review_cards (user_id, due_at);

create index review_logs_card_idx on public.review_logs (card_id, created_at desc);