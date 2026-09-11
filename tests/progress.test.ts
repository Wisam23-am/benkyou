import { describe, expect, it } from 'vitest';
import { calculateProgressSummary, getCurriculumTotals } from '../lib/progress';

describe('progress summary', () => {
  it('uses the curriculum totals as the denominator', () => {
    const totals = getCurriculumTotals();
    const summary = calculateProgressSummary({ completedLessons: totals.totalLessons, learnedVocabulary: totals.totalVocabulary, learnedKanji: totals.totalKanji, dueReviews: 0, quizScore: 100, quizAttempts: 1, seikatsuCompleted: 1 });
    expect(summary.examReadiness).toBe(100);
    expect(summary.lifeFluency).toBe(100);
  });

  it('keeps an empty learner at zero', () => {
    const summary = calculateProgressSummary({ completedLessons: 0, learnedVocabulary: 0, learnedKanji: 0, dueReviews: 0, quizScore: 0, quizAttempts: 0, seikatsuCompleted: 0 });
    expect(summary.examReadiness).toBe(0);
    expect(summary.lifeFluency).toBe(25);
  });
});