import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { curriculum } from '@/lib/curriculum';

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const isN5 = level.toUpperCase() === 'N5';
  if (!isN5)
    return (
      <main className="mx-auto max-w-[680px] px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold">Level tidak ditemukan</h1>
        <Link
          href="/dashboard"
          className="mt-5 inline-block font-bold text-primary"
        >
          Kembali ke dashboard
        </Link>
      </main>
    );
  return (
    <main className="page-enter mx-auto max-w-[1200px] space-y-10 px-4 py-10 sm:px-6">
      <div className="space-y-3">
        <Link href="/dashboard" className="text-sm font-semibold text-ai">
          Dashboard / Belajar
        </Link>
        <p className="text-sm font-semibold text-sumi-muted">
          Pilih jalur belajar
        </p>
        <h1 className="text-4xl font-semibold">{curriculum.title}</h1>
        <p className="prose-id text-lg text-sumi-muted">
          {curriculum.description}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {curriculum.tracks.map((track) => (
          <Link
            key={track.code}
            href={`/belajar/${level}/${track.code}`}
            className={`group track-frame border border-neutral-300 bg-paper-raised p-7 transition hover:border-[var(--track-color)] hover:shadow-[0_4px_12px_rgba(35,38,43,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai ${track.code === 'shiken' ? 'track-shiken' : 'track-seikatsu'}`}
          >
            <span className="grid size-12 place-items-center rounded-[var(--track-radius)] bg-[var(--track-soft)] text-[var(--track-color)]">
              <BookOpen size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-7 text-3xl font-semibold">{track.title}</h2>
            <p className="mt-2 leading-7 text-sumi-muted">
              {track.description}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 font-semibold text-[var(--track-color)]">
              Lihat jalur <ChevronRight size={18} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
