'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Volume2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { HIRAGANA_DATA, KATAKANA_DATA, KanaCharacter } from '@/lib/data/kana';

export default function KanaExplorerPage() {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seion' | 'dakuon' | 'yoon'>('all');
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  const currentData = activeTab === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;

  const seionList = currentData.filter((k) => k.category === 'seion');
  const dakuonList = currentData.filter((k) => k.category === 'dakuon' || k.category === 'handakuon');
  const yoonList = currentData.filter((k) => k.category === 'yoon');

  const playAudio = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    setPlayingChar(text);
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;

    utterance.onend = () => setPlayingChar(null);
    utterance.onerror = () => setPlayingChar(null);

    window.speechSynthesis.speak(utterance);
  };

  const renderSection = (
    title: string,
    badgeText: string,
    description: string,
    items: KanaCharacter[],
    accentColor: string
  ) => {
    if (items.length === 0) return null;

    return (
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-200 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${accentColor}`}>
                {badgeText}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-sumi">{title}</h2>
          </div>
          <p className="text-xs text-sumi-muted max-w-md">{description}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {items.map((item, idx) => {
            const isPlaying = playingChar === item.char;
            return (
              <button
                key={`${item.char}-${idx}`}
                type="button"
                onClick={() => playAudio(item.char)}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all cursor-pointer select-none ${
                  isPlaying
                    ? 'border-ai bg-ai-soft/80 ring-2 ring-ai scale-105 shadow-md'
                    : 'border-neutral-300 bg-white hover:border-ai hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-ai transition-opacity">
                  <Volume2 size={14} />
                </span>

                <span
                  className={`font-jp font-bold transition-colors ${
                    item.category === 'yoon' ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
                  } ${isPlaying ? 'text-ai' : 'text-sumi group-hover:text-ai'}`}
                >
                  {item.char}
                </span>

                <span className="mt-2 text-xs font-bold text-sumi-muted group-hover:text-ai transition-colors font-mono">
                  {item.romaji}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-paper pb-16">
      {/* Header */}
      <header className="border-b border-neutral-300 bg-paper-raised sticky top-0 z-20 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-sumi-muted hover:text-sumi transition"
          >
            <ArrowLeft size={16} />
            Kembali ke Dashboard
          </Link>
          <div className="text-xs font-bold uppercase tracking-wider text-ai bg-ai-soft px-3 py-1 rounded-full">
            Pondasi Bahasa Jepang
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 space-y-10">
        {/* Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-ai/10 px-3.5 py-1.5 text-xs font-bold text-ai">
            <Sparkles size={14} />
            Tabel Terpisah Berdasarkan Jenis Bunyi
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-sumi">
            Hiragana & Katakana (かな)
          </h1>
          <p className="text-sumi-muted max-w-2xl text-base leading-relaxed">
            Kuasai alfabet fonetik bahasa Jepang. Huruf dipisahkan dengan rapi ke dalam blok <strong>Huruf Dasar (Seion)</strong>, <strong>Bunyi Turunan (Dakuon/Handakuon)</strong>, dan <strong>Bunyi Gabungan (Yoon)</strong>.
          </p>
        </div>

        {/* Main Tab Switcher (Hiragana vs Katakana) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-neutral-200/80 border border-neutral-300">
            <button
              type="button"
              onClick={() => setActiveTab('hiragana')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'hiragana'
                  ? 'bg-ai text-white shadow-sm'
                  : 'text-sumi-muted hover:text-sumi'
              }`}
            >
              <span className="font-jp text-lg leading-none">あ</span>
              Hiragana (ひらがな)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('katakana')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'katakana'
                  ? 'bg-ai text-white shadow-sm'
                  : 'text-sumi-muted hover:text-sumi'
              }`}
            >
              <span className="font-jp text-lg leading-none">ア</span>
              Katakana (カタカナ)
            </button>
          </div>

          {/* Sub-Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: `Tampilkan Semua Baris` },
              { id: 'seion', label: 'Hanya Huruf Dasar (46)' },
              { id: 'dakuon', label: 'Hanya Turunan ゛゜ (25)' },
              { id: 'yoon', label: 'Hanya Gabungan ゃゅょ (33)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat.id
                    ? 'bg-sumi text-white shadow-xs'
                    : 'bg-white border border-neutral-300 text-sumi-muted hover:border-sumi hover:text-sumi'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="rounded-2xl border border-ai/20 bg-ai-soft/40 p-4 sm:p-5 flex items-start gap-3.5 text-xs text-sumi leading-relaxed">
          <BookOpen size={20} className="text-ai shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-ai block mb-0.5">
              {activeTab === 'hiragana'
                ? 'Fungsi Hiragana: Menulis kata asli Jepang, partikel tata bahasa, dan furigana.'
                : 'Fungsi Katakana: Menulis kata serapan asing (gairaigo), nama negara/orang asing, dan istilah teknis.'}
            </span>
            Klik pada kartu huruf manapun untuk mendengarkan pengucapan audio aslinya.
          </div>
        </div>

        {/* 3 DISTINCT SEPARATED BLOCKS */}

        {/* Block 1: Huruf Dasar (Seion) */}
        {(selectedCategory === 'all' || selectedCategory === 'seion') &&
          renderSection(
            `1. Huruf Dasar (Seion - 清音)`,
            '46 Karakter Utuh',
            'Satu karakter diwakili oleh 1 vokal atau kombinasi konsonan-vokal dasar.',
            seionList,
            'bg-ai/10 text-ai font-bold'
          )}

        {/* Block 2: Bunyi Turunan (Dakuon & Handakuon) */}
        {(selectedCategory === 'all' || selectedCategory === 'dakuon') &&
          renderSection(
            `2. Bunyi Turunan (Dakuon ゛ & Handakuon ゜)`,
            '25 Karakter Turunan',
            'Huruf dasar yang ditambahkan tanda maru (゜) atau tenten (゛) untuk mengubah konsonan k→g, s→z, t→d, h→b/p.',
            dakuonList,
            'bg-matcha/15 text-matcha font-bold'
          )}

        {/* Block 3: Bunyi Gabungan (Yoon) */}
        {(selectedCategory === 'all' || selectedCategory === 'yoon') &&
          renderSection(
            `3. Bunyi Gabungan (Yoon - 拗音)`,
            '33 Pasang Kombinasi',
            'Kombinasi vokal turunan dengan huruf kecil ゃ (ya), ゅ (yu), ょ (yo) untuk membentuk bunyi ganda.',
            yoonList,
            'bg-amber-100 text-amber-800 font-bold'
          )}
      </main>
    </div>
  );
}
