import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LessonLearningFlow } from '@/components/lesson-learning-flow';
import { getLesson, getTrack, getUnit } from '@/lib/curriculum';

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    level: string;
    track: string;
    unit: string;
    lesson: string;
  }>;
}) {
  const {
    level,
    track: trackCode,
    unit: unitSlug,
    lesson: lessonSlug,
  } = await params;
  const track = getTrack(trackCode);
  const unit = getUnit(trackCode, unitSlug);
  const lesson = getLesson(trackCode, unitSlug, lessonSlug);
  if (!track || !unit || !lesson)
    return (
      <main className="mx-auto max-w-[680px] px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold">Lesson tidak ditemukan</h1>
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
      className={`page-enter track-${track.code} mx-auto max-w-[1200px] space-y-10 px-4 py-8 sm:px-6 sm:py-10`}
    >
      <div className="space-y-4">
        <Link
          href={`/belajar/${level}/${trackCode}/${unitSlug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--track-color)]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {track.title} / {unit.title}
        </Link>
        <p className="text-sm font-semibold text-[var(--track-color)]">
          Lesson
        </p>
        <h1 className="max-w-[680px] text-4xl font-semibold">{lesson.title}</h1>
        <p className="prose-id max-w-[680px] text-lg text-sumi-muted">
          {lesson.description}
        </p>
        {lesson.content.contextTags && (
          <div className="flex flex-wrap gap-2" aria-label="Konteks lesson">
            {lesson.content.contextTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--track-soft)] px-3 py-1 text-sm font-semibold text-[var(--track-color)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="h-2 max-w-[680px] overflow-hidden rounded-full bg-neutral-300"
          aria-label="Progress lesson"
        >
          <div className="h-full w-1/3 rounded-full bg-[var(--track-color)]" />
        </div>
      </div>
      <LessonLearningFlow lessonSlug={lessonSlug} content={lesson.content} />
    </main>
  );
}
