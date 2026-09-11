import { apiClient } from './client';

export const quizApi = {
  getTypes: (level: string) => apiClient.get<unknown>(`/quiz/${level}`),
  createSession: (level: string) => apiClient.post<{ sessionId: string }>('/quiz/sessions', { level }),
  submitAnswer: (sessionId: string, body: { questionId: string; selectedOptionId: string; responseTimeMs: number }) =>
    apiClient.post<unknown>(`/quiz/sessions/${sessionId}/answers`, body),
  complete: (sessionId: string) =>
    apiClient.post<unknown>(`/quiz/sessions/${sessionId}/complete`, {}),
};
