import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { submitQuizAnswerSchema } from '@/lib/validations';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const parsed = submitQuizAnswerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return apiError('VALIDATION_ERROR', 400, 'Invalid quiz answer');
  }

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

  const { data: question } = await supabase
    .from('quiz_questions')
    .select('correct_option_id')
    .eq('id', parsed.data.questionId)
    .single();

  if (!question) return apiError('NOT_FOUND', 404, 'Quiz question not found');

  const isCorrect = question.correct_option_id === parsed.data.selectedOptionId;

  const { data, error } = await supabase
    .from('quiz_answers')
    .insert({
      session_id: sessionId,
      question_id: parsed.data.questionId,
      selected_option_id: parsed.data.selectedOptionId,
      response_time_ms: parsed.data.responseTimeMs,
      is_correct: isCorrect,
    })
    .select()
    .single();

  if (error) return apiError('ANSWER_FAILED', 500, error.message);
  return apiSuccess(data, 201);
}