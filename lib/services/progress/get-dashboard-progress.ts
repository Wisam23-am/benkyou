import type { SupabaseClient } from '@supabase/supabase-js';

export async function getDashboardProgress(supabase: SupabaseClient, userId: string) {
  const [lessonsResult, srsResult, quizResult] = await Promise.all([
    supabase
      .from('user_progress')
      .select('lesson_id, completed_at')
      .eq('user_id', userId)
      .not('completed_at', 'is', null),
    supabase
      .from('review_cards')
      .select('id, due_at')
      .eq('user_id', userId)
      .lte('due_at', new Date().toISOString()),
    supabase
      .from('quiz_sessions')
      .select('score')
      .eq('user_id', userId)
      .not('completed_at', 'is', null)
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const completedLessons = lessonsResult.data?.length ?? 0;
  const dueReviews = srsResult.data?.length ?? 0;
  const recentScores = quizResult.data?.map((q) => q.score) ?? [];
  const avgQuizScore = recentScores.length
    ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length
    : 0;

  return {
    completedLessons,
    dueReviews,
    avgQuizScore,
  };
}
