import Link from 'next/link';
import { ArrowLeft, Search, BookOpen, Sparkles, Volume2 } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { PlayAudioButton } from '@/components/play-audio-button';
import { AddToReviewButton } from '@/components/add-to-review-button';

export default async function KamusPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').trim().toLowerCase();

  const supabase = createAdminClient();

  // Fetch ALL vocabularies (342+ items) and kanji (101+ items) from Supabase
  const [{ data: vocabData }, { data: kanjiData }] = await Promise.all([
    supabase
      .from('vocab_items')
      .select('*')
      .order('term', { ascending: true }),
    supabase
      .from('kanji_items')
      .select('*')
      .order('character', { ascending: true }),
  ]);

  const allVocab = vocabData || [];
  const allKanji = kanjiData || [];

  // Filter Vocab
  const filteredVocab = query
    ? allVocab.filter(
        (v) =>
          v.term.toLowerCase().includes(query) ||
          v.reading?.toLowerCase().includes(query) ||
          v.meaning.toLowerCase().includes(query) ||
          (v.example_sentence && v.example_sentence.toLowerCase().includes(query))
      )
    : allVocab;

  // Filter Kanji
  const filteredKanji = query
    ? allKanji.filter(
        (k) =>
          k.character.toLowerCase().includes(query) ||
          k.meaning.toLowerCase().includes(query) ||
          (k.readings && k.readings.some((r: string) => r.toLowerCase().includes(query)))
      )
    : allKanji;

  const totalResults = filteredVocab.length + filteredKanji.length;

  return (
    <main className="page-enter mx-auto max-w-[1100px] space-y-8 px-4 py-10 sm:px-6 pb-20">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ai hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full bg-ai/10 px-3.5 py-1.5 text-xs font-bold text-ai">
          <BookOpen size={14} />
          Database Kamus Lengkap N5
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-sumi">
          Kamus & Pencarian Kosakata / Kanji
        </h1>
        <p className="text-sumi-muted text-base max-w-2xl">
          Cari di antara <strong>{allVocab.length} Kosakata</strong> dan <strong>{allKanji.length} Kanji N5</strong>. Ketik huruf kanji, hiragana, romaji, atau arti bahasa Indonesia.
        </p>
      </div>

      {/* Search Input Box */}
      <form method="GET" className="relative max-w-2xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-sumi-muted"
          size={22}
        />
        <input
          type="search"
          name="q"
          defaultValue={q ?? ''}
          placeholder="Cari kanji, kana, atau arti (contoh: makan, たべる, 水, sekolah)..."
          className="w-full rounded-2xl border border-neutral-300 bg-paper-raised py-4 pl-12 pr-4 text-base text-sumi placeholder:text-neutral-400 focus:border-ai focus:outline-hidden focus:ring-2 focus:ring-ai/20 shadow-xs"
        />
      </form>

      {/* Search Result Summary */}
      <div className="flex items-center justify-between text-sm text-sumi-muted border-b border-neutral-200 pb-3">
        <span>
          Ditemukan <strong>{totalResults}</strong> hasil ({filteredVocab.length} kosakata, {filteredKanji.length} kanji)
        </span>
        {query && <span>Kata Kunci: &quot;<strong className="text-ai">{query}</strong>&quot;</span>}
      </div>

      {/* RESULT SECTION 1: KANJI MATCHES */}
      {filteredKanji.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ai">
            <span className="font-jp text-base">漢</span>
            <span>Hasil Kanji ({filteredKanji.length})</span>
          </div>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filteredKanji.slice(0, 24).map((kanji) => (
              <Link
                key={kanji.id}
                href={`/belajar/n5/kanji/${kanji.character}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-neutral-300 bg-white p-4 transition-all hover:border-ai hover:shadow-md hover:-translate-y-1"
              >
                <span className="font-jp text-4xl font-bold text-sumi group-hover:text-ai transition-colors">
                  {kanji.character}
                </span>
                <span className="mt-2 text-center text-xs font-bold text-sumi line-clamp-1">
                  {kanji.meaning}
                </span>
                <span className="mt-1 font-jp text-[11px] text-ai font-semibold line-clamp-1">
                  {kanji.readings?.join(' · ')}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* RESULT SECTION 2: VOCABULARY MATCHES */}
      {filteredVocab.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-matcha">
            <span className="font-jp text-base">語</span>
            <span>Hasil Kosakata ({filteredVocab.length})</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVocab.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white p-5 shadow-xs transition-all hover:border-matcha hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-jp text-2xl font-bold text-sumi group-hover:text-matcha transition-colors">
                        {item.term}
                      </span>
                      <p className="mt-0.5 font-jp text-sm font-semibold text-matcha">
                        {item.reading}
                      </p>
                    </div>
                    <PlayAudioButton text={item.term} />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Arti</p>
                    <p className="mt-0.5 text-base font-bold text-sumi capitalize">
                      {item.meaning}
                    </p>
                  </div>
                </div>

                {item.example_sentence && (
                  <div className="mt-4 border-t border-neutral-100 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Contoh Kalimat</p>
                    <p className="mt-1 font-jp text-xs text-sumi-muted line-clamp-2 leading-relaxed">
                      {item.example_sentence}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {totalResults === 0 && (
        <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center space-y-3">
          <p className="text-2xl font-bold text-sumi">Kosakata &quot;{query}&quot; Tidak Ditemukan</p>
          <p className="text-sumi-muted text-sm max-w-md mx-auto">
            Coba gunakan kata kunci lain dalam bahasa Indonesia, hiragana, atau kanji.
          </p>
        </div>
      )}
    </main>
  );
}
