import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { curriculum } from '@/lib/curriculum';
import { ListeningPractice } from '@/components/listening-practice';

export default async function ListeningPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Search listening item across all tracks and lessons
  let practiceItem = null;
  let sourceLesson = null;
  let sourceTrack = null;

  for (const track of curriculum.tracks) {
    for (const unit of track.units) {
      for (const lesson of unit.lessons) {
        if (lesson.content.listening && (lesson.content.listening.id === id || lesson.slug === id)) {
          practiceItem = lesson.content.listening;
          sourceLesson = lesson;
          sourceTrack = track;
          break;
        }
      }
    }
  }

  // Fallback to first available listening item if not found
  if (!practiceItem) {
    const defaultTrack = curriculum.tracks.find((t) => t.code === 'seikatsu') ?? curriculum.tracks[0];
    const defaultUnit = defaultTrack.units[0];
    sourceLesson = defaultUnit.lessons[0];
    sourceTrack = defaultTrack;
    practiceItem = sourceLesson.content.listening ?? {
      id: 'default-listening',
      japanese: 'お水をお願いします。',
      reading: 'おみずを おねがいします。',
      translation: 'Air putih, tolong.',
      question: 'Apa yang diminta pembicara?',
      answer: 'Air putih',
    };
  }

  return (
    <main className="page-enter mx-auto max-w-[720px] space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ai"
        >
          <ArrowLeft size={16} /> Kembali ke dashboard
        </Link>
        <p className="text-sm font-semibold text-matcha">
          {sourceTrack?.title} • {sourceLesson?.title}
        </p>
        <h1 className="text-4xl font-semibold">Nama no Nihongo (Listening Otentik)</h1>
        <p className="prose-id text-sumi-muted">
          Dengarkan percakapan situasi nyata orang Jepang, perhatikan transkrip, dan jawab pertanyaan pemahaman.
        </p>
      </div>

      <ListeningPractice practice={practiceItem} />
    </main>
  );
}
