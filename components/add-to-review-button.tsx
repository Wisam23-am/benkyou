'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PenLine, Check, ArrowRight } from 'lucide-react';
import { addToReview } from '@/app/actions/review';

interface Props {
  itemId: string;
  itemType: 'kanji' | 'vocab' | 'grammar';
}

export function AddToReviewButton({ itemId, itemType }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await addToReview(itemId, itemType);
      if (res.success) {
        setSuccess(true);
      } else {
        if (res.message === 'Sudah ada di antrean review Anda.') {
          setSuccess(true);
        } else {
          setError(res.message || res.error || 'Terjadi kesalahan');
        }
      }
    } catch (e) {
      setError('Gagal menambahkan');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-matcha/10 px-3 py-1 text-xs font-bold text-matcha">
          <Check size={14} /> Masuk Jadwal SRS
        </span>
        <Link
          href="/dashboard/review"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-ai hover:underline"
        >
          Lihat di Ulangan (SRS) <ArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleAdd}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-xl bg-ai-soft px-3 py-1.5 text-xs font-bold text-ai transition hover:bg-ai hover:text-white disabled:opacity-50 shadow-2xs"
      >
        <PenLine size={14} /> {loading ? 'Menambahkan...' : 'Latih Kanji Ini'}
      </button>
      {error && <span className="text-xs text-red-500 mt-1 font-medium">{error}</span>}
    </div>
  );
}
