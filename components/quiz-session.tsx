'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronRight, Clock, Filter, RotateCcw, X } from 'lucide-react';
import { calculateQuizResult, n5Questions, type QuizCategory } from '@/lib/quiz';

type CategoryFilter = 'all' | QuizCategory;

export function QuizSession() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return n5Questions;
    return n5Questions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const question = filteredQuestions[questionIndex];
  const result = calculateQuizResult(filteredQuestions, answers);
  const selectedOption = question ? answers[question.id] : undefined;
  const answered = Boolean(selectedOption);

  // Countdown timer per question
  useEffect(() => {
    if (isComplete || answered || !question) return;
    const initialTime = question.timeLimitSeconds ?? 30;
    setTimeLeft(initialTime);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // auto timeout: mark as timed-out if not answered
          setAnswers((curr) => ({ ...curr, [question.id]: 'TIMED_OUT' }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex, isComplete, answered, question]);

  function handleCategoryChange(cat: CategoryFilter) {
    setSelectedCategory(cat);
    setQuestionIndex(0);
    setAnswers({});
    setIsComplete(false);
    setSessionId(null);
  }

  function selectAnswer(optionId: string) {
    if (!question || answers[question.id]) return;
    setAnswers((current) => ({ ...current, [question.id]: optionId }));
  }

  async function saveAnswer() {
    if (!question || !selectedOption) return;
    setIsSaving(true);
    try {
      let activeSessionId = sessionId;
      if (!activeSessionId) {
        const sessionResponse = await fetch('/api/v1/quiz/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ level: 'N5' }),
        });
        if (!sessionResponse.ok) return;
        const sessionResult = (await sessionResponse.json()) as {
          data: { id: string };
        };
        activeSessionId = sessionResult.data.id;
        setSessionId(activeSessionId);
      }
      await fetch(`/api/v1/quiz/sessions/${activeSessionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          selectedOptionId: selectedOption,
          responseTimeMs: 0,
        }),
      });
      if (questionIndex === filteredQuestions.length - 1) {
        await fetch(`/api/v1/quiz/sessions/${activeSessionId}/complete`, {
          method: 'POST',
        });
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function nextQuestion() {
    await saveAnswer();
    if (questionIndex === filteredQuestions.length - 1) setIsComplete(true);
    else setQuestionIndex((current) => current + 1);
  }

  function reset() {
    setQuestionIndex(0);
    setAnswers({});
    setIsComplete(false);
    setSessionId(null);
  }

  if (isComplete) {
    return (
      <section className="space-y-7 rounded-neutral border border-neutral-300 bg-paper-raised p-6 sm:p-10">
        <div className="text-center">
          <Check className="mx-auto size-10 text-matcha" aria-hidden="true" />
          <p className="mt-5 text-sm font-semibold text-ai">Hasil latihan N5</p>
          <h2 className="mt-2 text-5xl font-semibold text-ai">
            {result.percentage}%
          </h2>
          <p className="mt-2 text-sumi-muted">
            {result.correctAnswers} dari {result.total} jawaban benar.
          </p>
        </div>
        <div className="space-y-3 border-t border-neutral-300 pt-6">
          {filteredQuestions.map((item, index) => {
            const isCorrect = answers[item.id] === item.correctOption;
            const isTimedOut = answers[item.id] === 'TIMED_OUT';
            return (
              <article
                key={item.id}
                className="rounded-neutral border border-neutral-300 bg-paper p-4"
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check
                      className="mt-1 shrink-0 text-matcha"
                      size={18}
                      aria-hidden="true"
                    />
                  ) : (
                    <X
                      className="mt-1 shrink-0 text-hanko"
                      size={18}
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-neutral-200 text-sumi-muted">
                        {categoryLabel(item.category)}
                      </span>
                      {isTimedOut && (
                        <span className="text-xs font-semibold text-hanko">
                          (Waktu Habis)
                        </span>
                      )}
                    </div>
                    <p className="font-semibold mt-1">
                      {index + 1}. {item.prompt}
                    </p>
                    <p className="mt-1 text-sm text-sumi-muted">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center gap-2 rounded-neutral border border-sumi-muted px-5 font-semibold transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
        >
          <RotateCcw size={18} aria-hidden="true" />
          Coba lagi
        </button>
      </section>
    );
  }

  if (!question) {
    return (
      <section className="p-8 text-center rounded-neutral border border-neutral-300 bg-paper-raised">
        <p className="text-sumi-muted">Tidak ada soal untuk kategori ini.</p>
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className="mt-4 px-4 py-2 bg-sumi text-paper rounded font-semibold text-sm"
        >
          Lihat Semua Soal
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6 rounded-neutral border border-neutral-300 bg-paper-raised p-6 sm:p-10">
      {/* Category selector pills */}
      <div className="border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-sumi-muted uppercase tracking-wider mb-2">
          <Filter size={13} className="text-ai" />
          <span>Filter Kategori Kuis:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'Semua Kategori' },
            { id: 'vocabulary', label: 'Kosakata' },
            { id: 'grammar', label: 'Bunpou' },
            { id: 'kanji', label: 'Kanji' },
            { id: 'reading', label: 'Waktu / Bacaan' },
            { id: 'listening', label: 'Menyimak' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id as CategoryFilter)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-ai text-white font-semibold shadow-xs'
                  : 'bg-paper border border-neutral-300 text-sumi hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm font-semibold text-sumi-muted">
        <span>
          Soal {questionIndex + 1} dari {filteredQuestions.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-ai font-medium">{categoryLabel(question.category)}</span>
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              timeLeft <= 10
                ? 'bg-hanko/15 text-hanko animate-pulse'
                : 'bg-neutral-200 text-sumi'
            }`}
          >
            <Clock size={13} />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-neutral-300">
        <div
          className="h-full bg-ai transition-all duration-300"
          style={{
            width: `${((questionIndex + 1) / filteredQuestions.length) * 100}%`,
          }}
        />
      </div>

      <div>
        <h2 className="prose-id text-2xl font-semibold">{question.prompt}</h2>
        <div className="mt-6 grid gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => selectAnswer(option)}
                aria-pressed={isSelected}
                disabled={answered}
                className={`min-h-14 rounded-neutral border px-4 text-left font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${
                  isSelected
                    ? 'border-ai bg-ai-soft text-ai'
                    : 'border-neutral-300 hover:border-ai hover:bg-ai-soft/50'
                } ${answered && !isSelected ? 'opacity-60' : ''}`}
              >
                <span className="mr-3 text-sumi-muted">
                  {option.slice(-2).toUpperCase()}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 p-4 rounded-neutral border border-neutral-300 bg-paper">
            <p className="text-xs font-bold text-ai uppercase tracking-wide">Penjelasan Jawaban:</p>
            <p className="text-sm mt-1 text-sumi leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={!answered || isSaving}
        onClick={nextQuestion}
        className="inline-flex min-h-12 items-center gap-2 rounded-neutral bg-hanko px-5 font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
      >
        {isSaving
          ? 'Menyimpan...'
          : questionIndex === filteredQuestions.length - 1
            ? 'Lihat hasil'
            : 'Soal berikutnya'}
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </section>
  );
}

function categoryLabel(category: string) {
  return (
    (
      {
        vocabulary: 'Kosakata',
        grammar: 'Bunpou',
        kanji: 'Kanji',
        reading: 'Waktu / Bacaan',
        listening: 'Menyimak',
      } as Record<string, string>
    )[category] ?? category
  );
}
