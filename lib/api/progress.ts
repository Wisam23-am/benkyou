import { apiClient } from './client';

export const progressApi = {
  getDashboard: () => apiClient.get<unknown>('/progress'),
  completeLesson: (lessonId: string) =>
    apiClient.post<unknown>('/progress/lessons', { lessonId }),
};
