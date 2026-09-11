do $$
declare
  n5_id uuid;
begin
  select id into n5_id from public.levels where code = 'N5';
  if n5_id is null then raise exception 'N5 level must be seeded before quiz questions'; end if;

  insert into public.quiz_questions (id, level_id, category, prompt, explanation, correct_option_id) values
    ('10000000-0000-4000-8000-000000000001', n5_id, 'vocabulary', 'Apa arti こんにちは?', 'こんにちは digunakan sebagai salam pada siang atau waktu umum.', '20000000-0000-4000-8000-000000000002'),
    ('10000000-0000-4000-8000-000000000002', n5_id, 'grammar', 'Lengkapi: わたし ___ 学生です。', 'は menandai topik: わたしは学生です berarti saya adalah pelajar.', '20000000-0000-4000-8000-000000000006'),
    ('10000000-0000-4000-8000-000000000003', n5_id, 'kanji', 'Apa arti kanji 水?', '水 dibaca みず atau スイ dan berarti air.', '20000000-0000-4000-8000-000000000007'),
    ('10000000-0000-4000-8000-000000000004', n5_id, 'reading', 'Kalimat 今日は月曜日です berarti...', '今日 berarti hari ini dan 月曜日 berarti hari Senin.', '20000000-0000-4000-8000-000000000011')
  on conflict (id) do update set prompt = excluded.prompt, explanation = excluded.explanation, correct_option_id = excluded.correct_option_id;

  insert into public.quiz_options (id, question_id, label, sort_order) values
    ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'Terima kasih', 1),
    ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', 'Halo / selamat siang', 2),
    ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', 'Permisi', 3),
    ('20000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000002', 'を', 1),
    ('20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000000002', 'の', 2),
    ('20000000-0000-4000-8000-000000000006', '10000000-0000-4000-8000-000000000002', 'は', 3),
    ('20000000-0000-4000-8000-000000000007', '10000000-0000-4000-8000-000000000003', 'Air', 1),
    ('20000000-0000-4000-8000-000000000008', '10000000-0000-4000-8000-000000000003', 'Api', 2),
    ('20000000-0000-4000-8000-000000000009', '10000000-0000-4000-8000-000000000003', 'Bumi', 3),
    ('20000000-0000-4000-8000-000000000010', '10000000-0000-4000-8000-000000000004', 'Besok hari Minggu', 1),
    ('20000000-0000-4000-8000-000000000011', '10000000-0000-4000-8000-000000000004', 'Hari ini hari Senin', 2),
    ('20000000-0000-4000-8000-000000000012', '10000000-0000-4000-8000-000000000004', 'Sekarang jam satu', 3)
  on conflict (id) do update set label = excluded.label, sort_order = excluded.sort_order;
end $$;