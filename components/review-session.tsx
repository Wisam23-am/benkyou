'use client';

import { useState } from 'react';
import { Check, CircleAlert, Eye, RotateCcw, Sparkles } from 'lucide-react';
import { useSrsQueue, useSubmitSrsAnswer } from '@/hooks/use-srs';
import type { SrsRating } from '@/types';

interface ReviewCardItem {
  id: string;
  item_id: string;
  item_type: 'vocab' | 'kanji' | 'grammar';
  prompt: string;
  reading?: string;
  meaning?: string;
  example?: string;
}

const ratings = [
  {
    value: 'lupa' as SrsRating,
    label: 'Lupa',
    tone: 'border-hanko text-hanko hover:bg-hanko/10',
  },
  {
    value: 'sulit' as SrsRating,
    label: 'Sulit',
    tone: 'border-yuzu text-yuzu hover:bg-yuzu/10',
  },
  {
    value: 'bisa' as SrsRating,
    label: 'Bisa',
    tone: 'border-matcha text-matcha hover:bg-matcha-soft',
  },
  {
    value: 'mudah' as SrsRating,
    label: 'Mudah',
    tone: 'border-ai text-ai hover:bg-ai-soft',
  },
] as const;

import { Filter } from 'lucide-react';

type SrsFilterType = 'all' | 'vocab' | 'kanji' | 'grammar';

export function ReviewSession() {
  const { data: queueData, isLoading, error, refetch } = useSrsQueue();
  const submitMutation = useSubmitSrsAnswer();

  const [selectedFilter, setSelectedFilter] = useState<SrsFilterType>('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const rawCards = (queueData as { cards?: unknown[] } | undefined)?.cards ?? [];
  const allCards = rawCards as ReviewCardItem[];
  const cards = selectedFilter === 'all'
    ? allCards
    : allCards.filter((c) => c.item_type === selectedFilter);

  function handleFilterChange(filter: SrsFilterType) {
    setSelectedFilter(filter);
    setCardIndex(0);
    setIsRevealed(false);
    setStartTime(Date.now());
  }

  async function handleRating(rating: SrsRating) {
    const card = cards[cardIndex];
    if (!card || submitMutation.isPending) return;

    const responseTimeMs = Date.now() - startTime;
    await submitMutation.mutateAsync({
      cardId: card.id,
      input: { rating, responseTimeMs },
    });

    setCardIndex((current) => current + 1);
    setIsRevealed(false);
    setStartTime(Date.now());
  }

  if (isLoading) {
    return (
      <p className="rounded-neutral border border-neutral-300 bg-paper-raised p-8 text-center text-sumi-muted">
        Menyiapkan kartu review...
      </p>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-neutral border border-hanko bg-paper-raised p-8 text-center text-hanko"
      >
        <p>{error instanceof Error ? error.message : 'Review gagal dimuat.'}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 inline-flex items-center gap-2 rounded-neutral border border-hanko px-4 py-2 text-sm font-semibold"
        >
          <RotateCcw size={16} /> Coba lagi
        </button>
      </div>
    );
  }

  const card = cards[cardIndex];
  if (!card) {
    return (
      <section className="rounded-neutral border border-neutral-300 bg-paper-raised p-8 text-center sm:p-12">
        <Check className="mx-auto size-10 text-matcha" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-semibold">Review hari ini selesai</h2>
        <p className="mx-auto mt-2 max-w-md text-sumi-muted">
          Belum ada kartu yang jatuh tempo. Kembali lagi saat waktunya mengulang.
        </p>
        <button
          type="button"
          onClick={() => {
            setCardIndex(0);
            refetch();
          }}
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-neutral border border-sumi-muted px-5 font-semibold transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
        >
          <RotateCcw size={18} aria-hidden="true" />
          Periksa lagi
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Category Filter for SRS */}
      <div className="rounded-neutral border border-neutral-300 bg-paper-raised p-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-sumi-muted uppercase tracking-wider mb-2">
          <Filter size={13} className="text-ai" />
          <span>Fokus Review:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: `Semua (${allCards.length})` },
            { id: 'vocab', label: `Kosakata (${allCards.filter((c) => c.item_type === 'vocab').length})` },
            { id: 'kanji', label: `Kanji (${allCards.filter((c) => c.item_type === 'kanji').length})` },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleFilterChange(item.id as SrsFilterType)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                selectedFilter === item.id
                  ? 'bg-ai text-white font-semibold shadow-xs'
                  : 'bg-paper border border-neutral-300 text-sumi hover:bg-neutral-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm font-semibold text-sumi-muted">
        <span>
          Kartu {cardIndex + 1} dari {cards.length}
        </span>
        <span className="text-ai">{cardTypeLabel(card.item_type)}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-neutral-300">
        <div
          className="h-full bg-ai transition-all duration-300"
          style={{ width: `${(cardIndex / cards.length) * 100}%` }}
        />
      </div>

      <article className="min-h-[320px] rounded-neutral border border-neutral-300 bg-paper-raised px-6 py-12 text-center sm:px-12">
        <Sparkles className="mx-auto size-5 text-yuzu" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-sumi-muted">
          Ingat kembali kartu ini
        </p>

        <p className="font-jp mt-6 text-5xl font-bold text-sumi">
          {card.prompt}
        </p>

        {isRevealed ? (
          <div className="mt-8 space-y-3">
            {card.reading && (
              <p className="font-jp text-lg text-ai font-medium">
                {card.reading}
              </p>
            )}
            {card.meaning && (
              <p className="text-xl font-semibold text-sumi">
                {card.meaning}
              </p>
            )}
            {card.example && (
              <p className="font-jp text-sm text-sumi-muted border-t border-neutral-300 pt-3 max-w-md mx-auto">
                {card.example}
              </p>
            )}
          </div>
        ) : (
          <p className="mt-8 text-sumi-muted text-sm">
            Coba tebak arti dan cara bacanya sebelum melihat jawaban.
          </p>
        )}

        <button
          type="button"
          onClick={() => setIsRevealed((current) => !current)}
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-neutral bg-hanko px-5 font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
        >
          <Eye size={18} aria-hidden="true" />
          {isRevealed ? 'Sembunyikan jawaban' : 'Lihat jawaban'}
        </button>
      </article>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            type="button"
            disabled={!isRevealed || submitMutation.isPending}
            onClick={() => handleRating(rating.value)}
            className={`min-h-12 rounded-neutral border font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${rating.tone}`}
          >
            {rating.label}
          </button>
        ))}
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-sm text-sumi-muted">
        <CircleAlert size={16} aria-hidden="true" />
        Buka jawaban sebelum memilih rating ingatanmu.
      </p>
    </section>
  );
}

function cardTypeLabel(type: ReviewCardItem['item_type']) {
  return type === 'vocab' ? 'Kosakata' : type === 'kanji' ? 'Kanji' : 'Bunpou';
}
