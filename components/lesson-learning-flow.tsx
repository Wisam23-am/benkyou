'use client';

import { useState } from 'react';
import {
  BookOpen,
  Check,
  Headphones,
  Languages,
  MessageCircle,
  PenLine,
} from 'lucide-react';
import type { LessonContent } from '@/lib/curriculum';
import { LessonStudySession } from '@/components/lesson-study-session';
import { LessonCompletion } from '@/components/lesson-completion';
import { ListeningPractice } from '@/components/listening-practice';

import { Filter } from 'lucide-react';

type LessonTab = 'vocabulary' | 'kanji' | 'grammar' | 'listening' | 'practice';
const tabs: { id: LessonTab; label: string; icon: typeof Languages; focusGroup: 'vocab' | 'kanji' | 'grammar' | 'listening' | 'practice' }[] = [
  { id: 'vocabulary', label: 'Kosakata', icon: Languages, focusGroup: 'vocab' },
  { id: 'kanji', label: 'Kanji', icon: BookOpen, focusGroup: 'kanji' },
  { id: 'grammar', label: 'Bunpou', icon: MessageCircle, focusGroup: 'grammar' },
  { id: 'listening', label: 'Menyimak', icon: Headphones, focusGroup: 'listening' },
  { id: 'practice', label: 'Latihan', icon: PenLine, focusGroup: 'practice' },
];

type FocusMode = 'all' | 'kanji' | 'grammar' | 'vocab' | 'listening';

export function LessonLearningFlow({
  lessonSlug,
  content,
}: {
  lessonSlug: string;
  content: LessonContent;
}) {
  const [focusMode, setFocusMode] = useState<FocusMode>('all');
  const [activeTab, setActiveTab] = useState<LessonTab>('vocabulary');

  const visibleTabs = tabs.filter((t) => {
    if (focusMode === 'all') return true;
    if (focusMode === 'kanji') return t.id === 'kanji' || t.id === 'practice';
    if (focusMode === 'grammar') return t.id === 'grammar' || t.id === 'practice';
    if (focusMode === 'vocab') return t.id === 'vocabulary' || t.id === 'practice';
    if (focusMode === 'listening') return t.id === 'listening' || t.id === 'practice';
    return true;
  });

  const handleFocusChange = (mode: FocusMode) => {
    setFocusMode(mode);
    if (mode === 'kanji') setActiveTab('kanji');
    else if (mode === 'grammar') setActiveTab('grammar');
    else if (mode === 'vocab') setActiveTab('vocabulary');
    else if (mode === 'listening') setActiveTab('listening');
    else setActiveTab('vocabulary');
  };

  return (
    <div className="max-w-[680px] space-y-6">
      {/* Focus Mode Selector */}
      <div className="rounded-neutral border border-neutral-300 bg-paper-raised p-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-sumi-muted uppercase tracking-wider mb-2">
          <Filter size={14} className="text-[var(--track-color)]" />
          <span>Fokus Belajar (Pilih materi yang ingin difokuskan)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'Semua (Campur)' },
            { id: 'kanji', label: 'Fokus Kanji' },
            { id: 'grammar', label: 'Fokus Bunpou' },
            { id: 'vocab', label: 'Fokus Kotoba' },
            { id: 'listening', label: 'Fokus Menyimak' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleFocusChange(item.id as FocusMode)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                focusMode === item.id
                  ? 'bg-sumi text-paper font-semibold shadow-xs'
                  : 'bg-paper border border-neutral-300 text-sumi hover:bg-neutral-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <nav
        className="sticky top-2 z-10 grid grid-cols-2 gap-1 rounded-neutral border border-neutral-300 bg-paper-raised/95 p-1 backdrop-blur sm:grid-cols-5"
        aria-label="Bagian lesson"
      >
        {visibleTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            aria-selected={activeTab === id}
            role="tab"
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-neutral px-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${activeTab === id ? 'bg-[var(--track-soft)] text-[var(--track-color)]' : 'text-sumi-muted hover:bg-paper hover:text-sumi'}`}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      {activeTab === 'vocabulary' && (
        <section className="space-y-4">
          <SectionIntro step="1 dari 5" title="Kenali kosakata">
            Baca kanji, lihat furigana, pahami arti, lalu dengarkan cara
            bacanya.
          </SectionIntro>
          {content.vocabulary.map((item) => (
            <article
              key={item.term}
              className="track-frame border border-neutral-300 bg-paper-raised p-5 transition hover:shadow-[0_4px_12px_rgba(35,38,43,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <ruby className="font-jp text-4xl text-sumi">
                    {item.term}
                    <rt className="text-sm text-[var(--track-color)]">
                      {item.reading}
                    </rt>
                  </ruby>
                  <p className="mt-3 text-xl font-semibold">{item.meaning}</p>
                </div>
                <button
                  type="button"
                  onClick={() => speakJapanese(item.term)}
                  aria-label={`Dengarkan ${item.term}`}
                  className="grid size-11 shrink-0 place-items-center rounded-neutral border border-[var(--track-color)] text-[var(--track-color)] transition hover:bg-[var(--track-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
                >
                  <Headphones size={18} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-3 font-jp text-lg text-sumi-muted">
                {item.example}
              </p>
              {(item.partOfSpeech || item.context) && (
                <p className="mt-3 text-sm text-sumi-muted">
                  {item.partOfSpeech}
                  {item.partOfSpeech && item.context ? ' · ' : ''}
                  {item.context}
                </p>
              )}
            </article>
          ))}
          <NextButton
            onClick={() => setActiveTab('kanji')}
            label="Lanjut ke kanji"
          />
        </section>
      )}

      {activeTab === 'kanji' && (
        <section className="space-y-4">
          <SectionIntro step="2 dari 5" title="Pelajari kanji">
            Perhatikan karakter, furigana, cara baca, jumlah coretan, dan contoh
            katanya.
          </SectionIntro>
          {content.kanji.map((item) => (
            <article
              key={item.character}
              className="track-frame border border-neutral-300 bg-paper-raised p-6"
            >
              <div className="flex items-start justify-between">
                <ruby className="font-jp text-7xl text-sumi">
                  {item.character}
                  <rt className="text-base text-[var(--track-color)]">
                    {item.reading}
                  </rt>
                </ruby>
                <button
                  type="button"
                  onClick={() => speakJapanese(item.character)}
                  aria-label={`Dengarkan kanji ${item.character}`}
                  className="grid size-11 place-items-center rounded-neutral border border-[var(--track-color)] text-[var(--track-color)]"
                >
                  <Headphones size={18} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-4 text-xl font-semibold">{item.meaning}</p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-sumi-muted">On&apos;yomi</dt>
                  <dd className="font-jp text-lg">{item.onyomi ?? '-'}</dd>
                </div>
                <div>
                  <dt className="text-sumi-muted">Kun&apos;yomi</dt>
                  <dd className="font-jp text-lg">
                    {item.kunyomi ?? item.reading}
                  </dd>
                </div>
                <div>
                  <dt className="text-sumi-muted">Jumlah coretan</dt>
                  <dd className="text-lg">{item.strokeCount ?? '-'} coretan</dd>
                </div>
              </dl>
              {item.examples && (
                <p className="mt-4 font-jp text-lg text-sumi-muted">
                  Contoh: {item.examples.join(' · ')}
                </p>
              )}
            </article>
          ))}
          <NextButton
            onClick={() => setActiveTab('grammar')}
            label="Lanjut ke bunpou"
          />
        </section>
      )}

      {activeTab === 'grammar' && (
        <section className="space-y-4">
          <SectionIntro step="3 dari 5" title="Pahami bunpou">
            Pelajari pola kalimat, arti, dan contoh penggunaannya sebelum
            mencoba latihan.
          </SectionIntro>
          {content.grammar.map((item) => (
            <article
              key={item.pattern}
              className="track-frame border border-neutral-300 bg-paper-raised p-6"
            >
              <p className="font-jp text-3xl text-[var(--track-color)]">
                {item.pattern}
              </p>
              <p className="mt-4 text-lg font-semibold">{item.meaning}</p>
              <div className="mt-5 border-l-2 border-[var(--track-color)] pl-4">
                <p className="text-sm text-sumi-muted">Contoh penggunaan</p>
                <p className="mt-1 font-jp text-xl">{item.example}</p>
              </div>
              <p className="mt-5 text-sm leading-6 text-sumi-muted">
                Cara memahami: bagian sebelum は adalah topik pembicaraan,
                sedangkan bagian setelahnya menjelaskan identitas atau keadaan
                topik tersebut.
              </p>
            </article>
          ))}
          <NextButton
            onClick={() =>
              setActiveTab(content.listening ? 'listening' : 'practice')
            }
            label={
              content.listening ? 'Lanjut ke menyimak' : 'Lanjut ke latihan'
            }
          />
        </section>
      )}

      {activeTab === 'listening' && (
        <section className="space-y-4">
          <SectionIntro step="4 dari 5" title="Latihan menyimak">
            Dengarkan kalimatnya, lihat furigana, lalu periksa pemahamanmu.
          </SectionIntro>
          {content.listening ? (
            <ListeningPractice practice={content.listening} />
          ) : (
            <p className="rounded-neutral border border-neutral-300 bg-paper-raised p-6 text-sumi-muted">
              Materi menyimak untuk lesson ini sedang disiapkan.
            </p>
          )}
          <NextButton
            onClick={() => setActiveTab('practice')}
            label="Lanjut ke latihan"
          />
        </section>
      )}

      {activeTab === 'practice' && (
        <section className="space-y-4">
          <SectionIntro step="5 dari 5" title="Uji pemahaman">
            Sekarang coba ingat kembali kosakata dan kanji tanpa melihat jawaban
            terlebih dahulu.
          </SectionIntro>
          <LessonStudySession lessonSlug={lessonSlug} content={content} />
          <LessonCompletion lessonSlug={lessonSlug} />
        </section>
      )}
    </div>
  );
}

function SectionIntro({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-neutral-300 pb-4">
      <p className="text-sm font-semibold text-[var(--track-color)]">
        Bagian {step}
      </p>
      <h2 className="mt-1 text-3xl font-semibold">{title}</h2>
      <p className="mt-2 text-sumi-muted">{children}</p>
    </div>
  );
}
function NextButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-12 items-center gap-2 rounded-neutral bg-hanko px-5 font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
    >
      <Check size={18} aria-hidden="true" />
      {label}
    </button>
  );
}
function speakJapanese(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }
}
