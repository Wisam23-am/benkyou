"use client";

import { useState } from 'react';
import { PenLine, Check } from 'lucide-react';
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
        setError(res.message || res.error || 'Terjadi kesalahan');
        if (res.message === 'Sudah ada di antrean review Anda.') {
          setSuccess(true); // Biarkan centang jika sudah ada
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
      <span className="flex items-center gap-1 font-semibold text-matcha">
        <Check size={16} /> Sedang dipelajari
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button 
        onClick={handleAdd}
        disabled={loading}
        className="flex items-center gap-1 font-semibold text-ai hover:underline disabled:opacity-50"
      >
        <PenLine size={14} /> {loading ? 'Menambahkan...' : 'Latih Kanji Ini'}
      </button>
      {error && <span className="text-xs text-warning-foreground mt-1">{error}</span>}
    </div>
  );
}
