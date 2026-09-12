'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  MessageSquarePlus,
  Bug,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Star,
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { submitFeedback, FeedbackType } from '@/app/actions/feedback';

export default function FeedbackPage() {
  const [type, setType] = useState<FeedbackType>('feature');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const res = await submitFeedback({
      type,
      title,
      message,
      rating,
      email,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
      setTitle('');
      setMessage('');
    } else {
      setErrorMessage(res.error || 'Terjadi kesalahan saat mengirim.');
    }
  };

  const types: { id: FeedbackType; label: string; icon: typeof Bug; desc: string }[] = [
    { id: 'bug', label: 'Lapor Bug / Error', icon: Bug, desc: 'Tampilan rusak, audio tidak bunyi, atau error' },
    { id: 'feature', label: 'Rekomendasi Fitur', icon: Lightbulb, desc: 'Fitur baru yang Anda harapkan ada di Benkyou' },
    { id: 'content', label: 'Koreksi Materi', icon: BookOpen, desc: 'Typo kanji, arti kurang tepat, atau soal ujian' },
    { id: 'other', label: 'Kritik & Saran Umum', icon: HelpCircle, desc: 'Masukan lain seputar pengalaman belajar' },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ai transition hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold text-ai">
          <MessageSquarePlus size={18} />
          <span>Suara Pengguna</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-sumi">
          Kirim Masukan & Ide Fitur
        </h1>
        <p className="text-sumi-muted text-base">
          Aplikasi Benkyou Shimashou dibangun untuk Anda. Beritahu developer apa yang perlu diperbaiki atau fitur impian apa yang ingin Anda gunakan berikutnya!
        </p>
      </div>

      {isSuccess ? (
        <div className="rounded-3xl border border-matcha/30 bg-gradient-to-b from-matcha/10 to-white p-8 sm:p-12 text-center space-y-5 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-matcha/20 text-matcha">
            <CheckCircle2 size={44} />
          </div>
          <h2 className="text-3xl font-bold text-sumi">Masukan Anda Berhasil Terkirim!</h2>
          <p className="text-sumi-muted max-w-md mx-auto text-base">
            Developer akan membaca setiap laporan dan saran Anda untuk pembaruan versi berikutnya. Terima kasih atas kontribusi Anda!
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="w-full sm:w-auto rounded-xl border border-neutral-300 bg-white px-6 py-3 font-semibold text-sumi hover:bg-neutral-50 transition"
            >
              Kirim Masukan Lainnya
            </button>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-ai px-6 py-3 font-semibold text-white hover:bg-ai/90 transition shadow-sm"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-300 bg-paper-raised p-6 sm:p-10 shadow-sm space-y-6">
          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Kategori */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
              Pilih Jenis Masukan
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {types.map((t) => {
                const Icon = t.icon;
                const isSelected = type === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-ai bg-ai-soft/50 ring-2 ring-ai text-sumi shadow-xs'
                        : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50 text-sumi'
                    }`}
                  >
                    <div className={`mt-0.5 rounded-xl p-2.5 ${isSelected ? 'bg-ai text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-sumi">{t.label}</span>
                      <span className="block text-xs text-sumi-muted mt-0.5 leading-snug">{t.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
              Tingkat Kepuasan Pengalaman Anda
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-yuzu transition hover:scale-110"
                  aria-label={`${star} Bintang`}
                >
                  <Star
                    size={28}
                    className={star <= rating ? 'fill-yuzu text-yuzu' : 'text-neutral-300'}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm font-semibold text-sumi-muted">
                {rating === 5 ? 'Sangat Puas ⭐⭐⭐⭐⭐' : rating === 4 ? 'Puas' : rating === 3 ? 'Cukup' : rating === 2 ? 'Kurang Puas' : 'Sangat Kurang'}
              </span>
            </div>
          </div>

          {/* Judul Masukan */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
              Judul Masukan / Rekomendasi
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Fitur latihan stroke order / Audio kadang tidak jalan di iOS"
              className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-sumi placeholder:text-neutral-400 focus:border-ai focus:outline-hidden focus:ring-2 focus:ring-ai/20"
            />
          </div>

          {/* Detail Pesan */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
              Penjelasan Detail Masukan
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ceritakan sedetail mungkin bug yang Anda temukan, atau bagaimana fitur yang Anda bayangkan seharusnya bekerja..."
              className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-sumi placeholder:text-neutral-400 focus:border-ai focus:outline-hidden focus:ring-2 focus:ring-ai/20 resize-none leading-relaxed"
            />
          </div>

          {/* Email Opsional */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
              Email Anda (Opsional untuk balasan developer)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-sumi placeholder:text-neutral-400 focus:border-ai focus:outline-hidden focus:ring-2 focus:ring-ai/20"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !message.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ai py-4 text-base font-bold text-white shadow-lg shadow-ai/25 transition hover:bg-ai/90 disabled:opacity-50 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Mengirim Masukan...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Kirim Masukan ke Developer
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Info Card */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 flex items-start gap-4 text-sm text-sumi-muted">
        <HeartHandshake size={24} className="text-ai shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Setiap masukan dari Anda diperiksa langsung oleh tim pengembang untuk menentukan prioritas roadmap fitur berikutnya. Terima kasih telah membantu sesama pembelajar bahasa Jepang di Indonesia!
        </p>
      </div>
    </div>
  );
}
