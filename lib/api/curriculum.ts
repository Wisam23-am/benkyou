import { apiClient } from './client';
import type { Level, Unit, Lesson, VocabItem, KanjiItem, GrammarPoint } from '@/types';

export const curriculumApi = {
  getLevels: () => apiClient.get<Level[]>('/levels'),
  getLevel: (level: string) => apiClient.get<Level>(`/levels/${level}`),
  getUnits: (level: string, track?: string) =>
    apiClient.get<Unit[]>(`/levels/${level}/units${track ? `?track=${track}` : ''}`),
  getLessons: (unitId: string) => apiClient.get<Lesson[]>(`/units/${unitId}/lessons`),
  getLesson: (lessonId: string) => apiClient.get<Lesson>(`/lessons/${lessonId}`),
  getVocabularyItems: (params?: Record<string, string>) => {
    const qs = params ? new URLSearchParams(params).toString() : '';
    return apiClient.get<VocabItem[]>(`/vocabulary-items${qs ? `?${qs}` : ''}`);
  },
  getKanjiItems: (params?: Record<string, string>) => {
    const qs = params ? new URLSearchParams(params).toString() : '';
    return apiClient.get<KanjiItem[]>(`/kanji${qs ? `?${qs}` : ''}`);
  },
  getGrammarPoints: (params?: Record<string, string>) => {
    const qs = params ? new URLSearchParams(params).toString() : '';
    return apiClient.get<GrammarPoint[]>(`/grammar-points${qs ? `?${qs}` : ''}`);
  },
};
