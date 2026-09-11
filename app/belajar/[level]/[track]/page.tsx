import Link from 'next/link';
import { ChevronRight, Layers3 } from 'lucide-react';
import { getTrack } from '@/lib/curriculum';

export default async function TrackPage({
  params,
}: {
  params: Promise<{ level: string; track: string }>;
}) {
  const { level, track: trackCode } = await params;
  const track = getTrack(trackCode);
  if (!track)
    return (
      <main className="mx-auto max-w-[680px] px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold">Jalur tidak ditemukan</h1>
        <Link
          href={`/belajar/${level}`}
          className="mt-5 inline-block font-bold text-primary"
        >
          Kembali ke level
        </Link>
      </main>
    );
  return (
    <main
      className={`page-enter track-${track.code} mx-auto max-w-[1200px] space-y-10 px-4 py-10 sm:px-6`}
    >
      <div className="space-y-3">
        <Link
          href={`/belajar/${level}`}
          className="text-sm font-semibold text-[var(--track-color)]"
        >
          N5 / {track.title}
        </Link>
        <p className="text-sm font-semibold text-[var(--track-color)]">
          Jalur belajar
        </p>
        <h1 className="text-4xl font-semibold">{track.title}</h1>
        <p className="prose-id text-lg text-sumi-muted">{track.description}</p>
      </div>
      <div className="space-y-5">
        {track.units.map((unit, index) => (
          <Link
            key={unit.slug}
            href={`/belajar/${level}/${trackCode}/${unit.slug}`}
            className="track-frame flex items-center gap-5 border border-neutral-300 bg-paper-raised p-5 transition hover:border-[var(--track-color)] hover:shadow-[0_4px_12px_rgba(35,38,43,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-[var(--track-radius)] bg-[var(--track-soft)] text-xl font-semibold text-[var(--track-color)]">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 font-bold">
                <Layers3
                  size={17}
                  className="text-[var(--track-color)]"
                  aria-hidden="true"
                />
                Unit {unit.title}
              </span>
              <span className="mt-1 block text-sumi-muted">
                {unit.description}
              </span>
            </span>
            <ChevronRight
              className="shrink-0 text-[var(--track-color)]"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
