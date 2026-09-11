import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PlayAudioButton } from '@/components/play-audio-button';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function VocabExplorerPage() {
  const supabase = createAdminClient();
  const { data: vocabItems } = await supabase
    .from('vocab_items')
    .select('*')
    .order('term', { ascending: true });

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-neutral-300 bg-paper-raised">
        <div className="mx-auto flex min-h-16 max-w-[1200px] items-center px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-sumi-muted hover:text-sumi"
          >
            <ArrowLeft size={16} />
            Kembali ke Dashboard
          </Link>
        </div>
      </header>
      
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-10 space-y-4">
          <p className="text-sm font-semibold text-matcha">Belajar N5</p>
          <h1 className="text-4xl font-bold tracking-tight">Kosakata (Vocabulary)</h1>
          <p className="text-lg text-sumi-muted">
            Pelajari {vocabItems?.length || 0} kosakata wajib untuk tingkat JLPT N5.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vocabItems?.map((vocab) => (
            <div
              key={vocab.id}
              className="group flex flex-col justify-between rounded-xl border border-neutral-300 bg-paper-raised p-6 transition-all hover:border-matcha hover:shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-jp text-3xl font-bold text-sumi">{vocab.term}</span>
                    <p className="mt-1 font-jp text-sm text-sumi-muted">{vocab.reading}</p>
                  </div>
                  <PlayAudioButton text={vocab.term} />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-sumi-muted/70">Arti</p>
                  <p className="mt-1 font-medium capitalize text-sumi">{vocab.meaning}</p>
                </div>
              </div>

              {vocab.example_sentence && (
                <div className="mt-6 border-t border-neutral-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sumi-muted/70">Contoh Kalimat</p>
                  <p className="mt-1 font-jp text-sm text-sumi line-clamp-2">{vocab.example_sentence}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

