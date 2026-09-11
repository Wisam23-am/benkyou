import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { getSrsQueue } from '@/lib/services/srs/get-srs-queue';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  try {
    const queue = await getSrsQueue(supabase, user.id);
    return apiSuccess(queue);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal mengambil antrean review';
    return apiError('QUEUE_FAILED', 500, message);
  }
}