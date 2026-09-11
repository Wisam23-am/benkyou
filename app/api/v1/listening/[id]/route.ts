import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase
    .from('listening_items')
    .select('id, lesson_id, level_id, audio_url, transcript, translation, annotations, duration_seconds')
    .eq('id', id)
    .single();

  if (item) {
    return apiSuccess(item);
  }

  // Fallback to static curriculum
  for (const track of curriculum.tracks) {
    for (const unit of track.units) {
      for (const lesson of unit.lessons) {
        if (lesson.content.listening && (lesson.content.listening.id === id || lesson.slug === id)) {
          return apiSuccess({
            id: lesson.content.listening.id ?? id,
            lesson_id: lesson.slug,
            audio_url: lesson.content.listening.audioUrl ?? null,
            transcript: lesson.content.listening.japanese,
            translation: lesson.content.listening.translation,
            question: lesson.content.listening.question,
            answer: lesson.content.listening.answer,
          });
        }
      }
    }
  }

  return apiError('NOT_FOUND', 404, 'Listening item not found');
}
