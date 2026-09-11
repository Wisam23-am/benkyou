import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { curriculum } from '@/lib/curriculum';
import { FuriganaText } from '@/components/furigana-text';
import { ContextTagBadge } from '@/components/context-tag-badge';

export default async function KamusPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').trim().toLowerCase();

  const allVocab = curriculum.tracks.flatMap((t) =>
    t.units.flatMap((u) =>
      u.lessons.flatMap((l) =>
        l.content.vocabulary.map((v) => ({
          ...v,
          track: t.title,
          lesson: l.title,
        }))
      )
    )
  );

  const filtered = query
    ? allVocab.filter(
        (v) =>
          v.term.toLowerCase().includes(query) ||
          v.reading.toLowerCase().includes(query) ||
          v.meaning.toLowerCase().includes(query) ||
          (v.context && v.context.toLowerCase().includes(query))
      )
    : allVocab;

  return (
    <main className="page-enter mx-auto max-w-[1000px] space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ai"
        >
          <ArrowLeft size={16} /> Kembali ke dashboard
        </Link>
        <h1 className="text-4xl font-semibold">Kamus & Pencarian Kosakata</h1>
        <p className="prose-id text-sumi-muted">
          Cari kosakata, kanji, dan ungkapan situasional dari seluruh modul belajar.
        </p>
      </div>

      <form method="GET" className="relative max-w-xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-sumi-muted"
          size={20}
        />
        <input
          type="search"
          name="q"
          defaultValue={q ?? ''}
          placeholder="Cari kanji, kana, atau arti dalam bahasa Indonesia..."
          className="w-full rounded-neutral border border-neutral-300 bg-paper-raised py-3.5 pl-12 pr-4 text-sumi placeholder:text-sumi-muted focus-visible:outline-2 focus-visible:outline-ai"
        />
      </form>

      <section className="space-y-4">
        <div className="flex items-center justify-between text-sm text-sumi-muted">
          <span>Ditemukan {filtered.length} kosakata</span>
          {query && <span>Filter: &quot;{query}&quot;</span>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((item, index) => (
            <article
              key={`${item.term}-${index}`}
              className="rounded-neutral border border-neutral-300 bg-paper-raised p-5 hover:shadow-[0_4px_12px_rgba(35,38,43,0.08)] transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <FuriganaText
                    kanji={item.term}
                    reading={item.reading}
                    className="font-jp text-2xl text-sumi"
                  />
                  <p className="mt-2 text-base font-medium text-sumi">
                    {item.meaning}
                  </p>
                </div>
                {item.context && <ContextTagBadge tag={item.context} />}
              </div>
              <p className="mt-3 font-jp text-sm text-sumi-muted border-l-2 border-neutral-300 pl-3">
                {item.example}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-sumi-muted">
                <span>{item.track}</span>
                <span>•</span>
                <span>{item.lesson}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
