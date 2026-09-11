import { z } from 'zod';
import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';

const progressSchema = z.object({
  lessonSlug: z.string().min(1),
  completed: z.boolean(),
});

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function GET(request: Request) {
  const lessonSlug = new URL(request.url).searchParams.get('lessonSlug');
  if (!lessonSlug) {
    return apiError('VALIDATION_ERROR', 400, 'lessonSlug is required');
  }

  const { supabase, user } = await getAuthenticatedContext();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('slug', lessonSlug)
    .single();

  if (!lesson) {
    // Return default state if not found in db yet
    return apiSuccess({ completed: false, status: 'not_started' });
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('status, completed_at')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .maybeSingle();

  if (error) return apiError('PROGRESS_FAILED', 500, error.message);

  return apiSuccess({
    completed: data?.status === 'completed',
    status: data?.status ?? 'not_started',
  });
}

export async function POST(request: Request) {
  const parsed = progressSchema.safeParse(await request.json());
  if (!parsed.success) {
    return apiError('VALIDATION_ERROR', 400, 'Invalid lesson progress');
  }

  const { supabase, user } = await getAuthenticatedContext();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('slug', parsed.data.lessonSlug)
    .single();

  if (!lesson) {
    // Acknowledge completion gracefully
    return apiSuccess({
      completed: parsed.data.completed,
      status: parsed.data.completed ? 'completed' : 'not_started',
    });
  }

  const completedAt = parsed.data.completed ? new Date().toISOString() : null;
  const { data, error } = await supabase
    .from('user_progress')
    .upsert(
      {
        user_id: user.id,
        lesson_id: lesson.id,
        status: parsed.data.completed ? 'completed' : 'not_started',
        completed_at: completedAt,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    )
    .select('status, completed_at')
    .single();

  if (error) return apiError('PROGRESS_FAILED', 500, error.message);

  return apiSuccess({
    completed: data.status === 'completed',
    status: data.status,
  });
}