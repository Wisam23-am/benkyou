'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

export function LessonCompletion({ lessonSlug }: { lessonSlug: string }) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let active = true;
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/v1/progress/lessons?lessonSlug=${encodeURIComponent(lessonSlug)}`
        );
        if (response.ok) {
          const result = (await response.json()) as {
            data: { completed: boolean };
          };
          if (active) setCompleted(result.data.completed);
          return;
        }
      } catch {
        // Use local progress when Supabase is unavailable or the user is signed out.
      }
      if (active)
        setCompleted(
          window.localStorage.getItem(
            `benkyou:lesson-complete:${lessonSlug}`
          ) === 'true'
        );
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [lessonSlug]);

  async function toggleCompletion() {
    const next = !completed;
    setCompleted(next);
    try {
      const response = await fetch('/api/v1/progress/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonSlug, completed: next }),
      });
      if (response.ok) return;
    } catch {
      // Keep the local fallback for offline or unauthenticated use.
    }
    window.localStorage.setItem(
      `benkyou:lesson-complete:${lessonSlug}`,
      String(next)
    );
  }

  return (
    <button
      type="button"
      onClick={toggleCompletion}
      aria-pressed={completed}
      className={`inline-flex min-h-12 items-center gap-2 rounded-neutral px-6 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${completed ? 'border border-matcha bg-matcha-soft text-matcha' : 'bg-hanko text-white hover:brightness-95'}`}
    >
      <Check size={18} aria-hidden="true" />
      {completed ? 'Lesson selesai' : 'Tandai lesson selesai'}
    </button>
  );
}
