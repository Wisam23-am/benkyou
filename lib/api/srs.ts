import { apiClient } from './client';
import type { ReviewCard, SrsRating } from '@/types';

export interface SrsQueueResponse {
  totalDue: number;
  cards: ReviewCard[];
}

export interface SubmitAnswerInput {
  rating: SrsRating;
  responseTimeMs: number;
}

export interface SubmitAnswerResponse {
  cardId: string;
  nextDueAt: string;
  newInterval: number;
}

export const srsApi = {
  getQueue: () => apiClient.get<SrsQueueResponse>('/srs/queue'),
  submitAnswer: (cardId: string, input: SubmitAnswerInput) =>
    apiClient.post<SubmitAnswerResponse>(`/srs/cards/${cardId}/answer`, input),
  getStats: () => apiClient.get<{ totalCards: number; totalDue: number; reviewsToday: number }>('/srs/stats'),
};
