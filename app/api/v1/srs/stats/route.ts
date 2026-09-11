import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  const { data, error } = await supabase
    .from('review_cards')
    .select('due_at, reviews')
    .eq('user_id', user.id);

  if (error) return apiError('STATS_FAILED', 500, error.message);

  const now = Date.now();
  const total = data?.length ?? 0;
  const due = (data ?? []).filter((card) => new Date(card.due_at).getTime() <= now).length;
  const reviewed = (data ?? []).filter((card) => card.reviews > 0).length;

  return apiSuccess({
    totalCards: total,
    totalDue: due,
    reviewsToday: reviewed,
  });
}