import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lessonId = url.searchParams.get('lessonId');
  const level = url.searchParams.get('level');

  const supabase = await createClient();

  let query = supabase
    .from('grammar_points')
    .select('id, lesson_id, level_id, pattern, meaning, example, formal_version, casual_version, track');

  if (lessonId) query = query.eq('lesson_id', lessonId);
  if (level) {
    const { data: lvl } = await supabase.from('levels').select('id').ilike('code', level).single();
    if (lvl) query = query.eq('level_id', lvl.id);
  }

  const { data, error } = await query;

  if (!error && data && data.length > 0) {
    return apiSuccess(data);
  }

  // Fallback to static curriculum
  const allGrammar = curriculum.tracks.flatMap((t) =>
    t.units.flatMap((u) =>
      u.lessons.flatMap((l) =>
        l.content.grammar.map((g, i) => ({
          id: `g-${l.slug}-${i}`,
          lesson_id: l.slug,
          level_id: 'n5-static-id',
          pattern: g.pattern,
          meaning: g.meaning,
          example: g.example,
          formal_version: null,
          casual_version: null,
          track: t.code,
        }))
      )
    )
  );

  const filtered = lessonId ? allGrammar.filter((g) => g.lesson_id === lessonId) : allGrammar;
  return apiSuccess(filtered);
}
