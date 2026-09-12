'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Calendar,
  Hash,
  Layers,
  Coins,
  AlertTriangle,
  Info,
  Clock
} from 'lucide-react';
import {
  BASIC_NUMBERS,
  DAYS_OF_MONTH,
  MONTHS,
  DAYS_OF_WEEK,
  COUNTER_CATEGORIES,
  CounterItem
} from '@/lib/data/counters';

export default function AngkaCountersPage() {
  const [mainTab, setMainTab] = useState<'counters' | 'calendar' | 'numbers'>('counters');
  const [selectedCounterId, setSelectedCounterId] = useState<string>('general');
  const [playingText, setPlayingText] = useState<string | null>(null);

  const playAudio = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    setPlayingText(text);
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;

    utterance.onend = () => setPlayingText(null);
    utterance.onerror = () => setPlayingText(null);

    window.speechSynthesis.speak(utterance);
  };

  const selectedCategory = COUNTER_CATEGORIES.find((c) => c.id === selectedCounterId) || COUNTER_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-paper pb-20">
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
          <div className="text-xs font-bold uppercase tracking-wider text-yuzu bg-yuzu/10 px-3 py-1 rounded-full text-yuzu-foreground">
            Materi Esensial JLPT N5
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 space-y-8">
        {/* Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-ai/10 px-3.5 py-1.5 text-xs font-bold text-ai">
            <Sparkles size={14} />
            Panduan Lengkap Angka & Satuan Hitung
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-sumi">
            Angka, Tanggal & Satuan Hitung (助数詞)
          </h1>
          <p className="text-sumi-muted max-w-2xl text-base leading-relaxed">
            Bahasa Jepang memiliki sistem penghitungan unik untuk setiap jenis benda. Pelajari cara menghitung jumlah barang, orang, lantai, kali, tanggal, uang, dan pengecualian bunyinya.
          </p>
        </div>

        {/* Main Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
          <button
            type="button"
            onClick={() => setMainTab('counters')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
              mainTab === 'counters'
                ? 'bg-ai text-white shadow-md shadow-ai/20'
                : 'bg-white border border-neutral-300 text-sumi-muted hover:border-sumi hover:text-sumi'
            }`}
          >
            <Layers size={18} />
            Satuan Hitung (~つ, ~人, ~階, ~回, ~本, ~枚...)
          </button>
          <button
            type="button"
            onClick={() => setMainTab('calendar')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
              mainTab === 'calendar'
                ? 'bg-ai text-white shadow-md shadow-ai/20'
                : 'bg-white border border-neutral-300 text-sumi-muted hover:border-sumi hover:text-sumi'
            }`}
          >
            <Calendar size={18} />
            Tanggal, Bulan & Hari
          </button>
          <button
            type="button"
            onClick={() => setMainTab('numbers')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
              mainTab === 'numbers'
                ? 'bg-ai text-white shadow-md shadow-ai/20'
                : 'bg-white border border-neutral-300 text-sumi-muted hover:border-sumi hover:text-sumi'
            }`}
          >
            <Coins size={18} />
            Angka Dasar & Uang Yen (円)
          </button>
        </div>

        {/* TAB 1: SATUAN HITUNG (COUNTERS) */}
        {mainTab === 'counters' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Category Selector Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
                Pilih Jenis Satuan Hitung:
              </label>
              <div className="flex flex-wrap gap-2">
                {COUNTER_CATEGORIES.map((cat) => {
                  const isSelected = selectedCounterId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCounterId(cat.id)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-sumi text-white shadow-sm ring-2 ring-sumi'
                          : 'bg-white border border-neutral-300 text-sumi-muted hover:border-sumi hover:text-sumi'
                      }`}
                    >
                      {cat.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Explanation Banner */}
            <div className="rounded-3xl border border-ai/20 bg-gradient-to-r from-ai-soft/70 via-white to-blue-50/40 p-6 sm:p-8 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-jp text-3xl font-bold text-ai">{selectedCategory.unit}</span>
                <span className="rounded-full bg-ai/15 px-3 py-1 text-xs font-bold text-ai">
                  JLPT N5 Core
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-sumi">{selectedCategory.title}</h2>
              <p className="text-sumi font-medium text-sm">{selectedCategory.description}</p>
              <div className="flex items-start gap-2 pt-2 text-xs text-sumi-muted">
                <Info size={15} className="text-ai shrink-0 mt-0.5" />
                <p>{selectedCategory.explanation}</p>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {selectedCategory.items.map((item, idx) => (
                <CounterCard
                  key={idx}
                  item={item}
                  isPlaying={playingText === item.reading}
                  onPlay={() => playAudio(item.reading)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TANGGAL, BULAN & HARI (CALENDAR) */}
        {mainTab === 'calendar' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Bagian Tanggal Khusus (1-31) */}
            <section className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-ai text-sm">
                  <Calendar size={18} />
                  <span>Tanggal dalam Sebulan (~日)</span>
                </div>
                <h2 className="text-2xl font-bold text-sumi">Tanggal 1 s/d 31</h2>
                <p className="text-xs text-sumi-muted">
                  Tanggal 1-10, 14, 20, dan 24 memiliki sebutan vokal kuno Jepang khusus (ditandai dengan badge kuning).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {DAYS_OF_MONTH.map((item, idx) => (
                  <CounterCard
                    key={idx}
                    item={item}
                    isPlaying={playingText === item.reading}
                    onPlay={() => playAudio(item.reading)}
                  />
                ))}
              </div>
            </section>

            {/* Bagian 12 Bulan (~月) */}
            <section className="space-y-4 pt-6 border-t border-neutral-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-matcha text-sm">
                  <Clock size={18} />
                  <span>Nama 12 Bulan (~月)</span>
                </div>
                <h2 className="text-2xl font-bold text-sumi">Januari s/d Desember</h2>
                <p className="text-xs text-sumi-muted">
                  Hati-hati pada bulan April (四月 = しがつ / shi-gatsu), Juli (七月 = しちがつ / shichi-gatsu), dan September (九月 = くがつ / ku-gatsu).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {MONTHS.map((item, idx) => (
                  <CounterCard
                    key={idx}
                    item={item}
                    isPlaying={playingText === item.reading}
                    onPlay={() => playAudio(item.reading)}
                  />
                ))}
              </div>
            </section>

            {/* Bagian 7 Hari dalam Seminggu (~曜日) */}
            <section className="space-y-4 pt-6 border-t border-neutral-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-yuzu text-sm">
                  <Sparkles size={18} />
                  <span>Hari dalam Seminggu (~曜日)</span>
                </div>
                <h2 className="text-2xl font-bold text-sumi">Senin s/d Minggu</h2>
                <p className="text-xs text-sumi-muted">
                  Setiap hari diwakili oleh unsur alam (Bulan, Api, Air, Pohon, Emas/Uang, Tanah, Matahari).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {DAYS_OF_WEEK.map((item, idx) => (
                  <CounterCard
                    key={idx}
                    item={item}
                    isPlaying={playingText === item.reading}
                    onPlay={() => playAudio(item.reading)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 3: ANGKA DASAR & UANG */}
        {mainTab === 'numbers' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="rounded-3xl border border-yuzu/30 bg-gradient-to-r from-yuzu/10 via-white to-amber-50/40 p-6 sm:p-8 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yuzu-foreground">
                <Coins size={16} className="text-yuzu" />
                <span>Sistem Bilangan Jepang</span>
              </div>
              <h2 className="text-2xl font-extrabold text-sumi">Angka 0 s/d 1.000.000 & Uang Yen</h2>
              <p className="text-sm text-sumi-muted leading-relaxed">
                Bahasa Jepang mengelompokkan angka besar setiap kelipatan <strong>10.000 (万 / man)</strong>, bukan 1.000 (ribu) seperti bahasa Indonesia. 
                Contoh: 100.000 dibaca 10-man (十万), dan 1.000.000 dibaca 100-man (百万).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {BASIC_NUMBERS.map((item, idx) => (
                <CounterCard
                  key={idx}
                  item={item}
                  isPlaying={playingText === item.reading}
                  onPlay={() => playAudio(item.reading)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Reusable Interactive Card
function CounterCard({
  item,
  isPlaying,
  onPlay,
}: {
  item: CounterItem;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <div
      onClick={onPlay}
      className={`group relative flex flex-col justify-between rounded-2xl border p-4 transition-all cursor-pointer select-none ${
        isPlaying
          ? 'border-ai bg-ai-soft ring-2 ring-ai shadow-md scale-[1.02]'
          : 'border-neutral-300 bg-white hover:border-ai hover:shadow-md hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-bold text-sumi-muted">
          {item.number}
        </span>
        <button
          type="button"
          aria-label="Putar Suara"
          className="text-neutral-400 group-hover:text-ai transition-colors"
        >
          <Volume2 size={16} className={isPlaying ? 'text-ai animate-pulse' : ''} />
        </button>
      </div>

      <div className="my-3 space-y-1">
        <span className="font-jp block text-2xl font-bold text-sumi group-hover:text-ai transition-colors">
          {item.japanese}
        </span>
        <span className="font-jp block text-xs font-semibold text-ai">
          {item.reading}
        </span>
        <span className="block text-[11px] text-neutral-400 font-mono">
          {item.romaji}
        </span>
      </div>

      {(item.isSpecial || item.note) && (
        <div className="border-t border-neutral-100 pt-2 text-[10px]">
          {item.isSpecial && (
            <span className="inline-block rounded-md bg-amber-100 px-1.5 py-0.5 font-bold text-amber-800">
              Bunyi Khusus
            </span>
          )}
          {item.note && (
            <p className="mt-1 text-sumi-muted font-medium line-clamp-2">
              {item.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
