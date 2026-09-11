'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { quizApi } from '@/lib/api/quiz';
import { qk } from '@/lib/api/query-keys';

export function useCreateQuizSession() {
  return useMutation({
    mutationFn: (level: string) => quizApi.createSession(level),
  });
}

export function useSubmitQuizAnswer(sessionId: string) {
  return useMutation({
    mutationFn: (body: { questionId: string; selectedOptionId: string; responseTimeMs: number }) =>
      quizApi.submitAnswer(sessionId, body),
  });
}

export function useCompleteQuizSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => quizApi.complete(sessionId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.dashboard() });
      qc.invalidateQueries({ queryKey: qk.progress.dashboard() });
    },
  });
}
