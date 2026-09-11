import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lessonId = url.searchParams.get('lessonId');
  const level = url.searchParams.get('level');
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(url.searchParams.get('pageSize') || '20', 10)));
  const offset = (page - 1) * pageSize;

  const supabase = await createClient();

  let query = supabase
    .from('vocab_items')
    .select('id, lesson_id, level_id, kanji, kana, romaji, meaning, example_sentence, audio_url, part_of_speech, context_tags, mnemonic', { count: 'exact' });

  if (lessonId) query = query.eq('lesson_id', lessonId);
  if (level) {
    const { data: lvl } = await supabase.from('levels').select('id').ilike('code', level).single();
    if (lvl) query = query.eq('level_id', lvl.id);
  }

  const { data, count, error } = await query.range(offset, offset + pageSize - 1);

  if (!error && data && data.length > 0) {
    return apiSuccess(data, 200, {
      page,
      pageSize,
      total: count ?? data.length,
      totalPages: Math.ceil((count ?? data.length) / pageSize),
    });
  }

  // Fallback to static curriculum
  const allVocab = curriculum.tracks.flatMap((t) =>
    t.units.flatMap((u) =>
      u.lessons.flatMap((l) =>
        l.content.vocabulary.map((v, i) => ({
          id: `v-${l.slug}-${i}`,
          lesson_id: l.slug,
          level_id: 'n5-static-id',
          kanji: v.term,
          kana: v.reading,
          romaji: null,
          meaning: v.meaning,
          example_sentence: v.example,
          audio_url: null,
          part_of_speech: v.partOfSpeech ?? null,
          context_tags: v.context ? [v.context] : null,
          mnemonic: null,
        }))
      )
    )
  );

  const filtered = lessonId ? allVocab.filter((v) => v.lesson_id === lessonId) : allVocab;
  const paged = filtered.slice(offset, offset + pageSize);

  return apiSuccess(paged, 200, {
    page,
    pageSize,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / pageSize),
  });
}
