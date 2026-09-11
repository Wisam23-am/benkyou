'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Headphones,
  Languages,
  RotateCcw,
} from 'lucide-react';
import type { KanjiEntry, LessonContent, VocabEntry } from '@/lib/curriculum';

type StudyMode = 'vocabulary' | 'kanji';

interface LessonStudySessionProps {
  lessonSlug: string;
  content: LessonContent;
}

export function LessonStudySession({
  lessonSlug,
  content,
}: LessonStudySessionProps) {
  const [mode, setMode] = useState<StudyMode>('vocabulary');
  const [cardIndex, setCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [learned, setLearned] = useState<string[]>([]);
  const [difficult, setDifficult] = useState<string[]>([]);
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  const cards = mode === 'vocabulary' ? content.vocabulary : content.kanji;
  const currentCard = cards[cardIndex];
  const getCardId = (card: VocabEntry | KanjiEntry) =>
    mode === 'vocabulary'
      ? (card as VocabEntry).term
      : (card as KanjiEntry).character;
  const cardId = currentCard ? getCardId(currentCard) : '';
  const learnedCount = learned.filter((id) =>
    cards.some((card) => getCardId(card) === id)
  ).length;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const saved = window.localStorage.getItem(`benkyou:lesson:${lessonSlug}`);
      if (saved) {
        try {
          const progress = JSON.parse(saved) as {
            learned?: string[];
            difficult?: string[];
          };
          setLearned(progress.learned ?? []);
          setDifficult(progress.difficult ?? []);
        } catch {
          window.localStorage.removeItem(`benkyou:lesson:${lessonSlug}`);
        }
      }
      setHasLoadedProgress(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [lessonSlug]);

  useEffect(() => {
    if (!hasLoadedProgress) return;
    window.localStorage.setItem(
      `benkyou:lesson:${lessonSlug}`,
      JSON.stringify({ learned, difficult })
    );
  }, [difficult, hasLoadedProgress, learned, lessonSlug]);

  function moveCard(direction: 'next' | 'previous') {
    setCardIndex((current) => {
      const nextIndex = direction === 'next' ? current + 1 : current - 1;
      return Math.min(Math.max(nextIndex, 0), cards.length - 1);
    });
    setIsRevealed(false);
  }

  function toggleStatus(status: 'learned' | 'difficult') {
    if (!cardId) return;
    const setter = status === 'learned' ? setLearned : setDifficult;
    setter((current) =>
      current.includes(cardId)
        ? current.filter((id) => id !== cardId)
        : [...current, cardId]
    );
  }

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.82;
      window.speechSynthesis.speak(utterance);
    }
  }

  function resetProgress() {
    setLearned([]);
    setDifficult([]);
    setCardIndex(0);
    setIsRevealed(false);
  }

  if (!currentCard) return null;

  const isLearned = learned.includes(cardId);
  const isDifficult = difficult.includes(cardId);
  const progressPercent = Math.round(
    ((learnedCount + 0.01) / cards.length) * 100
  );
  const cardLabel = getCardId(currentCard);

  return (
    <section
      className="track-frame max-w-[680px] space-y-6 border border-neutral-300 bg-paper-raised p-5 sm:p-8"
      aria-labelledby="study-session-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--track-color)]">
            Latihan aktif
          </p>
          <h2 id="study-session-title" className="mt-1 text-3xl font-semibold">
            Kuasai kata dan kanji
          </h2>
        </div>
        <button
          type="button"
          onClick={resetProgress}
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-neutral px-3 text-sm font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai sm:self-auto"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Mulai ulang
        </button>
      </div>

      <div
        className="grid gap-2 rounded-neutral bg-muted p-1 sm:grid-cols-2"
        role="tablist"
        aria-label="Jenis materi"
      >
        {(['vocabulary', 'kanji'] as const).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={mode === item}
            onClick={() => {
              setMode(item);
              setCardIndex(0);
              setIsRevealed(false);
            }}
            className={`min-h-12 rounded-neutral px-4 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${mode === item ? 'bg-paper-raised text-[var(--track-color)] shadow-sm' : 'text-sumi-muted hover:text-sumi'}`}
          >
            {item === 'vocabulary' ? 'Kosakata' : 'Kanji'}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 text-sm font-semibold">
        <span>
          Kartu {cardIndex + 1} dari {cards.length}
        </span>
        <span className="text-[var(--track-color)]">
          {learnedCount} sudah dikuasai
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-neutral-300"
        aria-label={`${progressPercent}% materi dikuasai`}
      >
        <div
          className="h-full rounded-full bg-[var(--track-color)] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="track-frame border border-neutral-300 bg-paper p-6 text-center sm:p-10">
        <p className="text-sm font-semibold text-sumi-muted">
          {mode === 'vocabulary' ? 'Kata' : 'Karakter'}
        </p>
        <p className="font-jp mt-4 text-6xl tracking-wide sm:text-8xl">
          {cardLabel}
        </p>
        {isRevealed ? (
          <div className="mt-6 space-y-2" aria-live="polite">
            <p className="font-jp text-xl text-[var(--track-color)]">
              {currentCard.reading}
            </p>
            <p className="text-lg">{currentCard.meaning}</p>
            {mode === 'vocabulary' && 'example' in currentCard ? (
              <div className="space-y-1 pt-3 text-sm text-muted-foreground">
                <p>{currentCard.example}</p>
                {currentCard.partOfSpeech && (
                  <p>
                    {currentCard.partOfSpeech} · {currentCard.context}
                  </p>
                )}
              </div>
            ) : 'onyomi' in currentCard ? (
              <div className="space-y-1 pt-3 text-sm text-muted-foreground">
                {currentCard.onyomi && <p>Onyomi: {currentCard.onyomi}</p>}
                {currentCard.kunyomi && <p>Kunyomi: {currentCard.kunyomi}</p>}
                {currentCard.strokeCount && (
                  <p>Jumlah coretan: {currentCard.strokeCount}</p>
                )}
                {currentCard.examples && (
                  <p>Contoh: {currentCard.examples.join(' · ')}</p>
                )}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-5 text-muted-foreground">
            Coba ingat dulu sebelum membuka jawaban.
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => speak(cardLabel)}
            className="inline-flex min-h-12 items-center gap-2 rounded-neutral border border-[var(--track-color)] px-4 font-semibold text-[var(--track-color)] transition hover:bg-[var(--track-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
          >
            <Headphones size={18} aria-hidden="true" />
            Dengarkan
          </button>
          <button
            type="button"
            onClick={() => setIsRevealed((current) => !current)}
            className="min-h-12 rounded-neutral bg-hanko px-5 font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
          >
            {isRevealed ? 'Sembunyikan' : 'Lihat jawaban'}
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => toggleStatus('difficult')}
          aria-pressed={isDifficult}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-neutral border px-4 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${isDifficult ? 'border-hanko bg-hanko/10 text-hanko' : 'border-border hover:border-hanko hover:text-hanko'}`}
        >
          <CircleAlert size={18} aria-hidden="true" />
          {isDifficult ? 'Ditandai sulit' : 'Tandai sulit'}
        </button>
        <button
          type="button"
          onClick={() => toggleStatus('learned')}
          aria-pressed={isLearned}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-neutral border px-4 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${isLearned ? 'border-[var(--track-color)] bg-[var(--track-soft)] text-[var(--track-color)]' : 'border-border hover:border-[var(--track-color)] hover:text-[var(--track-color)]'}`}
        >
          <Check size={18} aria-hidden="true" />
          {isLearned ? 'Sudah dikuasai' : 'Saya sudah paham'}
        </button>
      </div>

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={() => moveCard('previous')}
          disabled={cardIndex === 0}
          className="inline-flex min-h-12 items-center gap-2 rounded-neutral px-3 font-semibold text-[var(--track-color)] transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
        >
          <ChevronLeft size={20} aria-hidden="true" />
          Sebelumnya
        </button>
        <button
          type="button"
          onClick={() => moveCard('next')}
          disabled={cardIndex === cards.length - 1}
          className="inline-flex min-h-12 items-center gap-2 rounded-neutral px-3 font-semibold text-[var(--track-color)] transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
        >
          Berikutnya
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <Languages size={16} aria-hidden="true" />
        Progress tersimpan otomatis di perangkat ini.
      </p>
    </section>
  );
}
