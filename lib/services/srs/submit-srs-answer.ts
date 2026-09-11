import { calculateNextReview } from '@/lib/srs';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { SrsRating } from '@/types';

interface SubmitSrsAnswerInput {
  userId: string;
  cardId: string;
  rating: SrsRating;
  responseTimeMs: number;
}

export async function submitSrsAnswer(
  supabase: SupabaseClient,
  input: SubmitSrsAnswerInput
) {
  const { data: card, error: cardError } = await supabase
    .from('review_cards')
    .select('id, interval, ease_factor, reviews, user_id')
    .eq('id', input.cardId)
    .eq('user_id', input.userId)
    .single();

  if (cardError || !card) {
    throw new Error('CARD_NOT_FOUND');
  }

  const next = calculateNextReview(
    { interval: card.interval, easeFactor: card.ease_factor, reviews: card.reviews },
    input.rating
  );

  const { error: updateError } = await supabase
    .from('review_cards')
    .update({
      due_at: next.dueAt.toISOString(),
      interval: next.interval,
      ease_factor: next.easeFactor,
      reviews: next.reviews,
      updated_at: new Date().toISOString(),
    })
    .eq('id', input.cardId)
    .eq('user_id', input.userId);

  if (updateError) throw new Error('UPDATE_FAILED');

  await supabase.from('review_logs').insert({
    card_id: input.cardId,
    user_id: input.userId,
    rating: input.rating,
    response_time_ms: input.responseTimeMs,
  });

  return {
    cardId: input.cardId,
    nextDueAt: next.dueAt.toISOString(),
    newInterval: next.interval,
  };
}
