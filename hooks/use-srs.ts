'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { srsApi } from '@/lib/api/srs';
import { qk } from '@/lib/api/query-keys';
import type { SrsRating } from '@/types';

export function useSrsQueue() {
  return useQuery({
    queryKey: qk.srs.queue(),
    queryFn: srsApi.getQueue,
    staleTime: 0,
  });
}

export function useSrsStats() {
  return useQuery({
    queryKey: qk.srs.stats(),
    queryFn: srsApi.getStats,
    staleTime: 60_000,
  });
}

export function useSubmitSrsAnswer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, input }: { cardId: string; input: { rating: SrsRating; responseTimeMs: number } }) =>
      srsApi.submitAnswer(cardId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.srs.queue() });
      qc.invalidateQueries({ queryKey: qk.srs.stats() });
      qc.invalidateQueries({ queryKey: qk.dashboard() });
      qc.invalidateQueries({ queryKey: qk.progress.dashboard() });
    },
  });
}
