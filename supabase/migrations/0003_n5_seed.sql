alter table if exists public.levels
  add column if not exists description text;

do $$
declare
  n5_id uuid;
  shiken_id uuid;
  seikatsu_id uuid;
  first_steps_id uuid;
  daily_life_id uuid;
  greetings_id uuid;
  numbers_id uuid;
  cafe_id uuid;
begin
  insert into public.levels (code, name, description, sort_order)
  values ('N5', 'JLPT N5', 'A calm first step into practical Japanese.', 1)
  on conflict (code) do update set name = excluded.name, description = excluded.description
  returning id into n5_id;

  insert into public.tracks (code, name)
  values ('shiken', 'Shiken Michi')
  on conflict (code) do update set name = excluded.name
  returning id into shiken_id;

  insert into public.tracks (code, name)
  values ('seikatsu', 'Seikatsu Michi')
  on conflict (code) do update set name = excluded.name
  returning id into seikatsu_id;

  insert into public.units (level_id, track_id, title, description, sort_order)
  values (n5_id, shiken_id, 'First steps', 'Greetings, introductions, and the shape of a Japanese sentence.', 1)
  on conflict (level_id, track_id, sort_order) do update set title = excluded.title, description = excluded.description
  returning id into first_steps_id;

  insert into public.units (level_id, track_id, title, description, sort_order)
  values (n5_id, seikatsu_id, 'Daily life', 'Useful phrases for your first day in Japan.', 1)
  on conflict (level_id, track_id, sort_order) do update set title = excluded.title, description = excluded.description
  returning id into daily_life_id;

  insert into public.lessons (unit_id, title, slug, content, sort_order)
  values (first_steps_id, 'Greetings and introductions', 'greetings', '{"track":"shiken"}', 1)
  on conflict (slug) do update set title = excluded.title, unit_id = excluded.unit_id
  returning id into greetings_id;

  insert into public.lessons (unit_id, title, slug, content, sort_order)
  values (first_steps_id, 'Numbers and time', 'numbers-and-time', '{"track":"shiken"}', 2)
  on conflict (slug) do update set title = excluded.title, unit_id = excluded.unit_id
  returning id into numbers_id;

  insert into public.lessons (unit_id, title, slug, content, sort_order)
  values (daily_life_id, 'At the cafe', 'at-the-cafe', '{"track":"seikatsu"}', 1)
  on conflict (slug) do update set title = excluded.title, unit_id = excluded.unit_id
  returning id into cafe_id;

  insert into public.vocab_items (lesson_id, term, reading, meaning, example_sentence)
  values
    (greetings_id, 'こんにちは', 'こんにちは', 'Halo / selamat siang', 'こんにちは、田中さん。'),
    (greetings_id, '名前', 'なまえ', 'Nama', 'お名前は何ですか。'),
    (numbers_id, '今日', 'きょう', 'Hari ini', '今日は月曜日です。'),
    (numbers_id, '時間', 'じかん', 'Waktu', '時間があります。'),
    (cafe_id, '水', 'みず', 'Air putih', 'お水をください。'),
    (cafe_id, 'お願いします', 'おねがいします', 'Mohon / tolong', 'コーヒーをお願いします。')
  on conflict do nothing;

  insert into public.kanji_items (lesson_id, character, readings, meaning, stroke_count)
  values
    (greetings_id, '日', array['ひ', 'にち'], 'Hari / matahari', 4),
    (numbers_id, '時', array['とき', 'じ'], 'Waktu / jam', 10),
    (cafe_id, '水', array['みず', 'すい'], 'Air', 4)
  on conflict do nothing;
end $$;