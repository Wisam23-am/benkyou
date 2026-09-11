import { describe, expect, it } from 'vitest';
import { calculateQuizResult, n5Questions } from '../lib/quiz';

describe('quiz scoring', () => {
  it('calculates a perfect score', () => {
    const answers = Object.fromEntries(n5Questions.map((question) => [question.id, question.correctOption]));
    expect(calculateQuizResult(n5Questions, answers)).toMatchObject({
      correct: n5Questions.length,
      total: n5Questions.length,
      percentage: 100,
    });
  });

  it('counts incomplete and incorrect answers as not correct', () => {
    const sampleQuestions = n5Questions.slice(0, 4);
    const answers = { [sampleQuestions[0].id]: sampleQuestions[0].correctOption, [sampleQuestions[1].id]: 'wrong-option' };
    expect(calculateQuizResult(sampleQuestions, answers)).toMatchObject({
      correct: 1,
      total: 4,
      percentage: 25,
    });
  });
});
