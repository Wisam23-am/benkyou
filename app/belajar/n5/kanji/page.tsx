import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function KanjiExplorerPage() {
  const supabase = createAdminClient();
  const { data: kanjiItems } = await supabase
    .from('kanji_items')
    .select('*')
    .order('stroke_count', { ascending: true });

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
          <p className="text-sm font-semibold text-ai">Belajar N5</p>
          <h1 className="text-4xl font-bold tracking-tight">Kanji Explorer</h1>
          <p className="text-lg text-sumi-muted">
            Pelajari {kanjiItems?.length || 0} kanji wajib untuk tingkat JLPT N5.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {kanjiItems?.map((kanji) => (
            <Link
              key={kanji.id}
              href={`/belajar/n5/kanji/${kanji.character}`}
              className="group flex flex-col items-center justify-center rounded-xl border border-neutral-300 bg-paper-raised p-4 transition-all hover:border-ai hover:shadow-sm"
            >
              <span className="font-jp text-5xl text-sumi group-hover:text-ai transition-colors">
                {kanji.character}
              </span>
              <span className="mt-3 text-center text-xs font-medium text-sumi-muted line-clamp-1">
                {kanji.meaning}
              </span>
              <span className="mt-1 text-[10px] text-neutral-400">
                {kanji.stroke_count} coretan
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
