'use client';

import { useQuery } from '@tanstack/react-query';
import { curriculumApi } from '@/lib/api/curriculum';
import { qk } from '@/lib/api/query-keys';
import type { Track } from '@/types';

export function useLevels() {
  return useQuery({
    queryKey: qk.curriculum.levels(),
    queryFn: curriculumApi.getLevels,
    staleTime: 30 * 60 * 1000,
  });
}

export function useUnits(level: string, track?: Track) {
  return useQuery({
    queryKey: qk.curriculum.units(level, track),
    queryFn: () => curriculumApi.getUnits(level, track),
    staleTime: 30 * 60 * 1000,
    enabled: !!level,
  });
}

export function useLessons(unitId: string) {
  return useQuery({
    queryKey: qk.curriculum.lessons(unitId),
    queryFn: () => curriculumApi.getLessons(unitId),
    staleTime: 30 * 60 * 1000,
    enabled: !!unitId,
  });
}

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: qk.curriculum.lesson(lessonId),
    queryFn: () => curriculumApi.getLesson(lessonId),
    staleTime: 30 * 60 * 1000,
    enabled: !!lessonId,
  });
}
