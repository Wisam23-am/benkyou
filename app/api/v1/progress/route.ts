import { apiSuccess, apiError } from '@/lib/api-response';
import { calculateProgressSummary } from '@/lib/progress';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  const [{ data: progress }, { data: cards }, { data: quizSessions }] = await Promise.all([
    supabase.from('user_progress').select('status, lesson_id').eq('user_id', user.id),
    supabase.from('review_cards').select('due_at, reviews, item_type').eq('user_id', user.id),
    supabase.from('quiz_sessions').select('percentage').eq('user_id', user.id).not('completed_at', 'is', null),
  ]);

  const completedLessons = progress?.filter((item) => item.status === 'completed').length ?? 0;
  const dueReviews = cards?.filter((card) => new Date(card.due_at).getTime() <= Date.now()).length ?? 0;
  const quizAttempts = quizSessions?.length ?? 0;
  const quizScore = quizAttempts
    ? Math.round(
        (quizSessions ?? []).reduce(
          (total, item) => total + Number(item.percentage ?? 0),
          0
        ) / quizAttempts
      )
    : 0;

  const learnedVocabulary = cards?.filter((card) => card.reviews > 0 && card.item_type === 'vocab').length ?? 0;
  const learnedKanji = cards?.filter((card) => card.reviews > 0 && card.item_type === 'kanji').length ?? 0;

  const summary = calculateProgressSummary({
    completedLessons,
    learnedVocabulary,
    learnedKanji,
    dueReviews,
    quizScore,
    quizAttempts,
    seikatsuCompleted: 0,
  });

  return apiSuccess(summary);
}