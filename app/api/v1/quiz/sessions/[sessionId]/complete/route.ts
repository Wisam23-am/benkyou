import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  const { data: session } = await supabase
    .from('quiz_sessions')
    .select('id')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single();

  if (!session) return apiError('NOT_FOUND', 404, 'Quiz session not found');

  const { data: answers, error: answersError } = await supabase
    .from('quiz_answers')
    .select('is_correct')
    .eq('session_id', sessionId);

  if (answersError) return apiError('RESULT_FAILED', 500, answersError.message);

  const total = answers?.length ?? 0;
  const score = answers?.filter((answer) => answer.is_correct).length ?? 0;
  const percentage = total ? Math.round((score / total) * 100) : 0;

  const { data, error } = await supabase
    .from('quiz_sessions')
    .update({
      completed_at: new Date().toISOString(),
      score,
      percentage,
    })
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) return apiError('COMPLETE_FAILED', 500, error.message);
  return apiSuccess({ session: data, score, total, percentage });
}