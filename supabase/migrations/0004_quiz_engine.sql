create table
    public.quiz_questions (
        id uuid primary key default gen_random_uuid (),
        level_id uuid not null references public.levels (id) on delete cascade,
        category text not null check (
            category in (
                'vocabulary',
                'grammar',
                'kanji',
                'reading',
                'listening'
            )
        ),
        prompt text not null,
        explanation text not null,
        correct_option_id uuid not null,
        created_at timestamptz not null default now ()
    );

create table
    public.quiz_options (
        id uuid primary key default gen_random_uuid (),
        question_id uuid not null references public.quiz_questions (id) on delete cascade,
        label text not null,
        sort_order integer not null
    );

create table
    public.quiz_sessions (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references auth.users (id) on delete cascade,
        level_id uuid not null references public.levels (id),
        started_at timestamptz not null default now (),
        completed_at timestamptz,
        score integer,
        percentage numeric(5, 2)
    );

create table
    public.quiz_answers (
        id uuid primary key default gen_random_uuid (),
        session_id uuid not null references public.quiz_sessions (id) on delete cascade,
        question_id uuid not null references public.quiz_questions (id),
        selected_option_id uuid not null references public.quiz_options (id),
        response_time_ms integer not null default 0 check (response_time_ms >= 0),
        is_correct boolean not null default false
    );

alter table public.quiz_sessions enable row level security;

alter table public.quiz_answers enable row level security;

create policy "Quiz sessions are readable by owner" on public.quiz_sessions for
select
    using (auth.uid () = user_id);

create policy "Quiz sessions are insertable by owner" on public.quiz_sessions for insert
with
    check (auth.uid () = user_id);

create policy "Quiz sessions are updateable by owner" on public.quiz_sessions for
update using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

create policy "Quiz answers are readable by session owner" on public.quiz_answers for
select
    using (
        exists (
            select
                1
            from
                public.quiz_sessions
            where
                quiz_sessions.id = quiz_answers.session_id
                and quiz_sessions.user_id = auth.uid ()
        )
    );

create policy "Quiz answers are insertable by session owner" on public.quiz_answers for insert
with
    check (
        exists (
            select
                1
            from
                public.quiz_sessions
            where
                quiz_sessions.id = quiz_answers.session_id
                and quiz_sessions.user_id = auth.uid ()
        )
    );