import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ReviewSession } from '@/components/review-session';

export default function ReviewPage() {
  return (
    <div className="page-enter mx-auto max-w-[680px] space-y-8">
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ai focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali ke dashboard
        </Link>
        <p className="text-sm font-semibold text-hanko">Sesi review</p>
        <h1 className="text-4xl font-semibold">Ulangi dengan tenang.</h1>
        <p className="prose-id text-sumi-muted">
          Pilih jawaban yang paling jujur. Jadwal berikutnya akan menyesuaikan
          hasil reviewmu.
        </p>
      </div>
      <ReviewSession />
    </div>
  );
}
