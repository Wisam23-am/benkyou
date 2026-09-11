import { curriculum } from '@/lib/curriculum';

export interface ProgressSummary {
  totalLessons: number;
  completedLessons: number;
  totalVocabulary: number;
  learnedVocabulary: number;
  totalKanji: number;
  learnedKanji: number;
  dueReviews: number;
  quizScore: number;
  quizAttempts: number;
  examReadiness: number;
  lifeFluency: number;
}

export function getCurriculumTotals() {
  const lessons = curriculum.tracks.flatMap((track) => track.units.flatMap((unit) => unit.lessons));
  return {
    totalLessons: lessons.length,
    totalVocabulary: lessons.reduce((total, lesson) => total + lesson.content.vocabulary.length, 0),
    totalKanji: lessons.reduce((total, lesson) => total + lesson.content.kanji.length, 0),
  };
}

export function calculateProgressSummary(input: {
  completedLessons: number;
  learnedVocabulary: number;
  learnedKanji: number;
  dueReviews: number;
  quizScore: number;
  quizAttempts: number;
  seikatsuCompleted: number;
}) : ProgressSummary {
  const totals = getCurriculumTotals();
  const vocabularyProgress = totals.totalVocabulary ? input.learnedVocabulary / totals.totalVocabulary : 0;
  const kanjiProgress = totals.totalKanji ? input.learnedKanji / totals.totalKanji : 0;
  const lessonProgress = totals.totalLessons ? input.completedLessons / totals.totalLessons : 0;
  const examReadiness = Math.round((vocabularyProgress * 0.3 + kanjiProgress * 0.25 + lessonProgress * 0.2 + input.quizScore / 100 * 0.25) * 100);
  const lifeFluency = Math.round((input.seikatsuCompleted / 1 * 0.5 + vocabularyProgress * 0.25 + (input.dueReviews > 0 ? 0 : 0.25)) * 100);

  return { ...totals, ...input, examReadiness, lifeFluency };
}