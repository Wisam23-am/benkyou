'use client';

import { useState } from 'react';
import {
  X,
  MessageSquarePlus,
  Bug,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Star,
  CheckCircle2,
  Loader2,
  Send,
} from 'lucide-react';
import { submitFeedback, FeedbackType } from '@/app/actions/feedback';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export function FeedbackModal({ isOpen, onClose, userEmail }: FeedbackModalProps) {
  const [type, setType] = useState<FeedbackType>('feature');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [email, setEmail] = useState(userEmail || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

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
      setTimeout(() => {
        setIsSuccess(false);
        setTitle('');
        setMessage('');
        onClose();
      }, 2500);
    } else {
      setErrorMessage(res.error || 'Terjadi kesalahan saat mengirim.');
    }
  };

  const types: { id: FeedbackType; label: string; icon: typeof Bug; desc: string }[] = [
    { id: 'bug', label: 'Lapor Bug', icon: Bug, desc: 'Error atau kendala di web' },
    { id: 'feature', label: 'Ide Fitur', icon: Lightbulb, desc: 'Rekomendasi fitur baru' },
    { id: 'content', label: 'Materi/Soal', icon: BookOpen, desc: 'Koreksi kanji/kosakata' },
    { id: 'other', label: 'Lainnya', icon: HelpCircle, desc: 'Kritik & saran umum' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl border border-neutral-300 bg-white p-6 sm:p-8 shadow-2xl transition-all animate-in zoom-in-95 duration-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute right-5 top-5 rounded-full p-2 text-sumi-muted transition hover:bg-neutral-100 hover:text-sumi"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-matcha/10 text-matcha">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-sumi">Terima Kasih!</h3>
            <p className="text-sumi-muted max-w-sm mx-auto">
              Masukan Anda sangat berharga untuk membuat Benkyou Shimashou semakin sempurna.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-ai/10 px-3 py-1 text-xs font-semibold text-ai">
                <MessageSquarePlus size={14} />
                Kotak Suara Pengguna
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-sumi">
                Kirim Masukan ke Developer
              </h2>
              <p className="text-sm text-sumi-muted">
                Ada bug, materi yang keliru, atau ide fitur yang ingin Anda lihat di web ini? Beritahu kami!
              </p>
            </div>

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600 font-medium">
                {errorMessage}
              </div>
            )}

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
                Kategori Masukan
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {types.map((t) => {
                  const Icon = t.icon;
                  const isSelected = type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all ${
                        isSelected
                          ? 'border-ai bg-ai-soft text-ai font-semibold shadow-xs ring-1 ring-ai'
                          : 'border-neutral-200 bg-white text-sumi-muted hover:border-neutral-300 hover:text-sumi'
                      }`}
                    >
                      <Icon size={20} className={isSelected ? 'text-ai' : 'text-neutral-400'} />
                      <span className="mt-1.5 text-xs font-semibold">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
                Rating Kepuasan Anda Saat Ini
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-yuzu transition hover:scale-110"
                    aria-label={`${star} Bintang`}
                  >
                    <Star
                      size={24}
                      className={star <= rating ? 'fill-yuzu text-yuzu' : 'text-neutral-300'}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-semibold text-sumi-muted">
                  {rating === 5 ? 'Sangat Puas ⭐' : rating === 4 ? 'Puas' : rating === 3 ? 'Cukup' : rating === 2 ? 'Kurang' : 'Sangat Kurang'}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label htmlFor="feedback-title" className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
                Judul Masukan
              </label>
              <input
                id="feedback-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Tambahkan mode latihan menulis kanji / Typo di kanji 水"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-sumi placeholder:text-neutral-400 focus:border-ai focus:outline-hidden focus:ring-2 focus:ring-ai/20"
              />
            </div>

            {/* Message Detail */}
            <div className="space-y-1.5">
              <label htmlFor="feedback-message" className="block text-xs font-bold uppercase tracking-wider text-sumi-muted">
                Detail Penjelasan
              </label>
              <textarea
                id="feedback-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Jelaskan secara rinci apa yang Anda alami atau ide fitur apa yang diinginkan..."
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-sumi placeholder:text-neutral-400 focus:border-ai focus:outline-hidden focus:ring-2 focus:ring-ai/20 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-sumi-muted transition hover:bg-neutral-100 hover:text-sumi disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !message.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-ai px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-ai/20 transition hover:bg-ai/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Kirim Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
