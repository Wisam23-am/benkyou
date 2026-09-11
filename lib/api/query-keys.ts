import type { Track } from '@/types';

export const qk = {
  curriculum: {
    levels: () => ['curriculum', 'levels'] as const,
    level: (level: string) => ['curriculum', 'level', level] as const,
    units: (level: string, track?: Track) => ['curriculum', 'units', level, track] as const,
    lessons: (unitId: string) => ['curriculum', 'lessons', unitId] as const,
    lesson: (lessonId: string) => ['curriculum', 'lesson', lessonId] as const,
  },
  vocabulary: {
    list: (params?: Record<string, string>) => ['vocabulary', 'list', params] as const,
    item: (id: string) => ['vocabulary', 'item', id] as const,
  },
  kanji: {
    list: (params?: Record<string, string>) => ['kanji', 'list', params] as const,
    item: (id: string) => ['kanji', 'item', id] as const,
  },
  grammar: {
    list: (params?: Record<string, string>) => ['grammar', 'list', params] as const,
    item: (id: string) => ['grammar', 'item', id] as const,
  },
  srs: {
    queue: () => ['srs', 'queue'] as const,
    stats: () => ['srs', 'stats'] as const,
  },
  quiz: {
    types: (level: string) => ['quiz', 'types', level] as const,
    session: (sessionId: string) => ['quiz', 'session', sessionId] as const,
  },
  progress: {
    dashboard: () => ['progress', 'dashboard'] as const,
  },
  dashboard: () => ['dashboard'] as const,
};
