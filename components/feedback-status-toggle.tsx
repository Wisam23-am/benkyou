'use client';

import { useState } from 'react';
import { updateFeedbackStatus } from '@/app/actions/feedback';
import { Loader2 } from 'lucide-react';

interface Props {
  id: string;
  currentStatus: 'unread' | 'in_review' | 'resolved';
}

export function FeedbackStatusToggle({ id, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newStatus: 'unread' | 'in_review' | 'resolved') => {
    if (newStatus === status || loading) return;
    setLoading(true);

    const res = await updateFeedbackStatus(id, newStatus);
    setLoading(false);

    if (res.success) {
      setStatus(newStatus);
    }
  };

  return (
    <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl">
      {loading && <Loader2 size={14} className="animate-spin text-ai mr-1" />}
      <button
        type="button"
        disabled={loading}
        onClick={() => handleUpdate('unread')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
          status === 'unread'
            ? 'bg-amber-500 text-white shadow-xs'
            : 'text-neutral-500 hover:text-sumi'
        }`}
      >
        Unread
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => handleUpdate('in_review')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
          status === 'in_review'
            ? 'bg-blue-600 text-white shadow-xs'
            : 'text-neutral-500 hover:text-sumi'
        }`}
      >
        In Review
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => handleUpdate('resolved')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
          status === 'resolved'
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'text-neutral-500 hover:text-sumi'
        }`}
      >
        Resolved
      </button>
    </div>
  );
}
