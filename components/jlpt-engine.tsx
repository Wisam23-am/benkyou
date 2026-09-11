'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/lib/quiz';
import { FuriganaText } from '@/components/furigana-text';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Clock, LayoutGrid } from 'lucide-react';

interface JLPTEngineProps {
  questions: Question[];
  sectionName: string;
  timeLimitMinutes: number;
}

export function JLPTEngine({ questions, sectionName, timeLimitMinutes }: JLPTEngineProps) {
  const router = useRouter();

  const shuffledQuestions = useMemo(() => {
    return questions.map((q: Question) => {
      const opts = [...q.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      return { ...q, options: opts };
    });
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimitMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [shuffledQuestions[currentIndex].id]: option,
    }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = shuffledQuestions[currentIndex];
  const isAnswered = (idx: number) => !!answers[shuffledQuestions[idx].id];
  const allAnswered = shuffledQuestions.every((q: Question) => !!answers[q.id]);

  if (isFinished) {
    let correct = 0;
    shuffledQuestions.forEach((q: Question) => {
      if (answers[q.id] === q.correctOption) correct++;
    });
    const percentage = Math.round((correct / shuffledQuestions.length) * 100);
    const pointScore = Math.round((percentage / 100) * 120);
    const isPassed = percentage >= 60; 

    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-neutral-300 bg-paper-raised p-8 text-center shadow-sm">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-ai-soft text-ai">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-sumi">Simulasi Selesai</h1>
          <p className="mt-2 text-sumi-muted">Sesi: {sectionName}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-neutral-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-sumi-muted">Skor Anda</p>
              <p className="mt-2 text-4xl font-bold text-sumi">{pointScore} <span className="text-lg text-sumi-muted font-normal">/ 120</span></p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-sumi-muted">Akurasi</p>
              <p className="mt-2 text-4xl font-bold text-sumi">{percentage}%</p>
            </div>
          </div>

          <div className={`mt-6 rounded-xl p-4 font-semibold ${isPassed ? 'bg-matcha/10 text-matcha' : 'bg-warning/10 text-warning-foreground'}`}>
            {isPassed ? 'Bagus Sekali! Anda mencapai target kelulusan bagian ini.' : 'Masih butuh latihan. Mari tinjau kembali kosa kata yang salah.'}
          </div>

          <button 
            onClick={() => router.push('/simulasi-jlpt')}
            className="mt-8 w-full rounded-xl bg-sumi py-3 font-semibold text-white transition hover:bg-sumi/90"
          >
            Kembali ke Beranda Simulasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pb-20">
      <header className="sticky top-0 z-10 border-b border-neutral-300 bg-paper-raised/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-[1000px] items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => router.push('/simulasi-jlpt')}
            className="flex items-center gap-2 text-sm font-semibold text-sumi-muted hover:text-sumi"
          >
            <ArrowLeft size={16} /> Keluar
          </button>
          <div className="font-semibold text-sumi">{sectionName}</div>
          <div className={`flex items-center gap-2 font-mono text-lg font-semibold ${timeLeft < 300 ? 'text-warning-foreground' : 'text-sumi'}`}>
            <Clock size={18} /> {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-[800px] px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-semibold text-sumi-muted">Soal {currentIndex + 1} dari {shuffledQuestions.length}</p>
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-semibold text-sumi hover:bg-neutral-50"
          >
            <LayoutGrid size={16} /> Lembar Jawaban
          </button>
        </div>

        {showGrid && (
          <div className="mb-8 grid grid-cols-5 gap-2 rounded-xl border border-neutral-300 bg-white p-4 shadow-sm sm:grid-cols-10">
            {shuffledQuestions.map((q: Question, idx: number) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowGrid(false);
                }}
                className={`flex h-10 items-center justify-center rounded-lg border font-semibold transition ${
                  idx === currentIndex 
                    ? 'border-ai bg-ai/10 text-ai' 
                    : isAnswered(idx) 
                      ? 'border-neutral-300 bg-neutral-100 text-sumi-muted' 
                      : 'border-neutral-200 bg-white text-sumi'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        <div className="rounded-2xl border border-neutral-300 bg-white p-6 shadow-sm sm:p-10">
          <p className="whitespace-pre-line font-jp text-xl font-medium leading-loose text-sumi">
            <FuriganaText text={currentQuestion.prompt} />
          </p>
          
          <div className="mt-10 space-y-3">
            {currentQuestion.options.map((option: string, idx: number) => {
              const isSelected = answers[currentQuestion.id] === option;
              const labels = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-ai bg-ai/5 ring-1 ring-ai'
                      : 'border-neutral-200 hover:border-ai/50 hover:bg-neutral-50'
                  }`}
                >
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                    isSelected ? 'border-ai bg-ai text-white' : 'border-neutral-300 text-neutral-500'
                  }`}>
                    {labels[idx]}
                  </span>
                  <FuriganaText className="font-jp text-lg text-sumi" text={option} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 font-semibold text-sumi disabled:opacity-50 hover:bg-neutral-50 disabled:hover:bg-white"
          >
            <ChevronLeft size={18} /> Sebelumnya
          </button>

          {currentIndex === shuffledQuestions.length - 1 ? (
            <button
              onClick={handleFinish}
              className={`flex items-center gap-2 rounded-xl px-8 py-3 font-semibold text-white transition ${
                allAnswered ? 'bg-matcha hover:bg-matcha/90' : 'bg-neutral-400 hover:bg-neutral-500'
              }`}
            >
              Kumpulkan Ujian
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(shuffledQuestions.length - 1, prev + 1))}
              className="flex items-center gap-2 rounded-xl bg-ai px-5 py-3 font-semibold text-white hover:bg-ai/90"
            >
              Selanjutnya <ChevronRight size={18} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
