'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { progressApi } from '@/lib/api/progress';
import { qk } from '@/lib/api/query-keys';

export function useDashboard() {
  return useQuery({
    queryKey: qk.dashboard(),
    queryFn: progressApi.getDashboard,
    staleTime: 60_000,
  });
}

export function useCompleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => progressApi.completeLesson(lessonId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.dashboard() });
      qc.invalidateQueries({ queryKey: qk.progress.dashboard() });
    },
  });
}
