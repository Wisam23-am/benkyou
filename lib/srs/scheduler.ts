import type { SrsRating } from '@/types';
import type { ReviewState, NextReview } from './models';
import { ratingIntervals } from './ratings';

export function calculateNextReview(
  state: ReviewState,
  rating: SrsRating,
  now = new Date()
): NextReview {
  const isForgotten = rating === 'lupa';
  const nextInterval = isForgotten
    ? 0
    : Math.max(1, Math.round((Math.max(state.interval, 1) * ratingIntervals[rating]) / 3));
  const easeChange = rating === 'mudah' ? 0.1 : rating === 'lupa' ? -0.2 : 0;
  const easeFactor = Math.min(2.8, Math.max(1.3, state.easeFactor + easeChange));
  const dueAt = new Date(now);
  dueAt.setDate(dueAt.getDate() + nextInterval);

  return {
    interval: nextInterval,
    easeFactor,
    reviews: state.reviews + 1,
    dueAt,
  };
}

export function isDue(dueAt: string | Date, now = new Date()): boolean {
  return new Date(dueAt).getTime() <= now.getTime();
}
