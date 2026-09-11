import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { createQuizSessionSchema } from '@/lib/validations';

export async function POST(request: Request) {
  const parsed = createQuizSessionSchema.safeParse(await request.json());
  if (!parsed.success) {
    return apiError('VALIDATION_ERROR', 400, 'Invalid quiz level');
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  const { data: level } = await supabase
    .from('levels')
    .select('id')
    .eq('code', parsed.data.level)
    .single();

  if (!level) return apiError('NOT_FOUND', 404, 'Level not found');

  const { data, error } = await supabase
    .from('quiz_sessions')
    .insert({ user_id: user.id, level_id: level.id })
    .select()
    .single();

  if (error) return apiError('SESSION_FAILED', 500, error.message);
  return apiSuccess(data, 201);
}
