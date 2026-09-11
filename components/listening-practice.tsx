'use client';

import { useState } from 'react';
import { Check, Headphones, RotateCcw } from 'lucide-react';
import type { ListeningPractice } from '@/lib/curriculum';

export function ListeningPractice({
  practice,
}: {
  practice: ListeningPractice;
}) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [speed, setSpeed] = useState(0.8);

  function playAudio() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(practice.japanese);
    utterance.lang = 'ja-JP';
    utterance.rate = speed;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section
      className="space-y-6 rounded-[var(--track-radius)] border border-neutral-300 bg-paper-raised p-6"
      aria-labelledby="listening-title"
    >
      <div>
        <p className="text-sm font-semibold text-[var(--track-color)]">
          Latihan mendengar
        </p>
        <h2 id="listening-title" className="mt-1 text-2xl font-semibold">
          Dengar situasinya
        </h2>
        <p className="mt-2 text-sm text-sumi-muted">
          Putar beberapa kali, lalu cocokkan dengan konteks yang baru
          dipelajari.
        </p>
      </div>
      <div className="rounded-[var(--track-radius)] border border-neutral-300 bg-paper p-6 text-center">
        <ruby className="font-jp text-2xl text-sumi">
          {practice.japanese}
          <rt className="text-sm text-[var(--track-color)]">
            {practice.reading ?? ''}
          </rt>
        </ruby>
        {showTranslation && (
          <p className="mt-3 text-sumi-muted">{practice.translation}</p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={playAudio}
            className="inline-flex min-h-12 items-center gap-2 rounded-neutral bg-[var(--track-color)] px-5 font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
          >
            <Headphones size={18} aria-hidden="true" />
            Putar audio
          </button>
          <button
            type="button"
            onClick={() => setShowTranslation((current) => !current)}
            className="min-h-12 rounded-neutral border border-sumi-muted px-4 font-semibold text-sumi transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
          >
            {showTranslation ? 'Sembunyikan arti' : 'Lihat arti'}
          </button>
        </div>
        <label className="mx-auto mt-5 flex max-w-xs items-center gap-3 text-sm text-sumi-muted">
          Kecepatan
          <select
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="min-h-10 flex-1 rounded-neutral border border-neutral-300 bg-paper-raised px-2 text-sumi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
          >
            <option value={0.6}>Pelan</option>
            <option value={0.8}>Normal</option>
            <option value={1}>Cepat</option>
          </select>
        </label>
      </div>
      <div className="border-t border-neutral-300 pt-5">
        <p className="font-semibold">{practice.question}</p>
        {showAnswer ? (
          <p className="mt-3 text-matcha">Jawaban: {practice.answer}</p>
        ) : (
          <p className="mt-3 text-sm text-sumi-muted">
            Jawab dalam hati sebelum membuka pembahasan.
          </p>
        )}
        <button
          type="button"
          onClick={() => setShowAnswer((current) => !current)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-neutral px-3 font-semibold text-[var(--track-color)] transition hover:bg-[var(--track-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
        >
          {showAnswer ? (
            <RotateCcw size={16} aria-hidden="true" />
          ) : (
            <Check size={16} aria-hidden="true" />
          )}
          {showAnswer ? 'Coba lagi' : 'Periksa jawaban'}
        </button>
      </div>
    </section>
  );
}
