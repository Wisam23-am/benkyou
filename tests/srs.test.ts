import { describe, expect, it } from 'vitest';
import { calculateNextReview, isDue } from '../lib/srs';

const initialState = { interval: 0, easeFactor: 2.5, reviews: 0 };
const now = new Date('2026-09-05T10:00:00.000Z');

describe('SRS scheduler', () => {
  it('schedules an easy card seven days ahead', () => {
    const next = calculateNextReview(initialState, 'mudah', now);
    expect(next.interval).toBe(2);
    expect(next.easeFactor).toBe(2.6);
    expect(next.dueAt.toISOString()).toBe('2026-09-07T10:00:00.000Z');
  });

  it('resets the interval when the learner forgets', () => {
    const next = calculateNextReview({ interval: 14, easeFactor: 1.4, reviews: 3 }, 'lupa', now);
    expect(next.interval).toBe(0);
    expect(next.easeFactor).toBe(1.3);
    expect(isDue(next.dueAt, now)).toBe(true);
  });

  it('recognizes a card that is due at the current time', () => {
    expect(isDue('2026-09-05T10:00:00.000Z', now)).toBe(true);
    expect(isDue('2026-09-06T10:00:00.000Z', now)).toBe(false);
  });
});