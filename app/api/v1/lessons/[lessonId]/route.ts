import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params;
  const supabase = await createClient();

  // 1. Try finding by ID or slug in Supabase
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, title, description, unit_id, order')
    .eq('id', lessonId)
    .single();

  if (!lessonError && lesson) {
    const [{ data: vocab }, { data: kanji }, { data: grammar }] = await Promise.all([
      supabase.from('vocab_items').select('*').eq('lesson_id', lesson.id),
      supabase.from('kanji_items').select('*').eq('lesson_id', lesson.id),
      supabase.from('grammar_points').select('*').eq('lesson_id', lesson.id),
    ]);

    return apiSuccess({
      ...lesson,
      vocabulary: vocab ?? [],
      kanji: kanji ?? [],
      grammar: grammar ?? [],
    });
  }

  // 2. Fallback to static curriculum by slug
  for (const track of curriculum.tracks) {
    for (const unit of track.units) {
      const foundLesson = unit.lessons.find((item) => item.slug === lessonId);
      if (foundLesson) {
        return apiSuccess({
          ...foundLesson,
          track: track.code,
          unit: unit.slug,
        });
      }
    }
  }

  return apiError('NOT_FOUND', 404, 'Lesson not found');
}
