import Link from 'next/link';
import { CirclePlay } from 'lucide-react';
import { getTrack, getUnit } from '@/lib/curriculum';

export default async function UnitPage({
  params,
}: {
  params: Promise<{ level: string; track: string; unit: string }>;
}) {
  const { level, track: trackCode, unit: unitSlug } = await params;
  const track = getTrack(trackCode);
  const unit = getUnit(trackCode, unitSlug);
  if (!track || !unit)
    return (
      <main className="mx-auto max-w-[680px] px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold">Unit tidak ditemukan</h1>
        <Link
          href={`/belajar/${level}/${trackCode}`}
          className="mt-5 inline-block font-bold text-primary"
        >
          Kembali ke jalur
        </Link>
      </main>
    );
  return (
    <main
      className={`page-enter track-${track.code} mx-auto max-w-[1200px] space-y-10 px-4 py-10 sm:px-6`}
    >
      <div className="space-y-3">
        <Link
          href={`/belajar/${level}/${trackCode}`}
          className="text-sm font-semibold text-[var(--track-color)]"
        >
          N5 / {track.title} / {unit.title}
        </Link>
        <p className="text-sm font-semibold text-[var(--track-color)]">
          Unit belajar
        </p>
        <h1 className="text-4xl font-semibold">{unit.title}</h1>
        <p className="prose-id text-lg text-sumi-muted">{unit.description}</p>
      </div>
      <div className="space-y-4">
        {unit.lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/belajar/${level}/${trackCode}/${unitSlug}/${lesson.slug}`}
            className="track-frame flex items-center gap-5 border border-neutral-300 bg-paper-raised p-5 transition hover:border-[var(--track-color)] hover:shadow-[0_4px_12px_rgba(35,38,43,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
          >
            <span className="font-jp text-2xl text-[var(--track-color)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-semibold">
                {lesson.title}
              </span>
              <span className="mt-1 block text-sumi-muted">
                {lesson.description}
              </span>
              <span className="mt-3 block text-sm font-semibold text-[var(--track-color)]">
                {lesson.duration}
              </span>
            </span>
            <CirclePlay
              className="shrink-0 text-[var(--track-color)]"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
