import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AddToReviewButton } from '@/components/add-to-review-button';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function KanjiDetailPage({
  params,
}: {
  params: Promise<{ character: string }>;
}) {
  const { character } = await params;
  const decodedChar = decodeURIComponent(character);

  const supabase = createAdminClient();
  const { data: kanji } = await supabase
    .from('kanji_items')
    .select('*')
    .eq('character', decodedChar)
    .single();

  if (!kanji) {
    notFound();
  }

  const isKatakana = (str: string) => /^[\u30A0-\u30FF]+$/.test(str.replace(/[-]/g, ''));
  const onyomi = kanji.readings.filter((r: string) => isKatakana(r));
  const kunyomi = kanji.readings.filter((r: string) => !isKatakana(r));

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-neutral-300 bg-paper-raised">
        <div className="mx-auto flex min-h-16 max-w-[1200px] items-center px-4 sm:px-6">
          <Link
            href="/belajar/n5/kanji"
            className="flex items-center gap-2 text-sm font-semibold text-sumi-muted hover:text-sumi"
          >
            <ArrowLeft size={16} />
            Kembali ke Kanji Explorer
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Card Kiri - Karakter Utama */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <div className="flex size-48 items-center justify-center rounded-2xl border-2 border-neutral-200 bg-paper-raised shadow-sm">
              <span className="font-jp text-9xl text-sumi">{kanji.character}</span>
            </div>
            <div className="flex w-full items-center justify-between px-2 text-sm text-sumi-muted">
              <span>{kanji.stroke_count} coretan</span>
              <AddToReviewButton itemId={kanji.id} itemType="kanji" />
            </div>
          </div>

          {/* Konten Kanan - Detail */}
          <div className="flex-1 space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sumi-muted/70">Arti</p>
              <h1 className="mt-1 text-3xl font-bold capitalize">{kanji.meaning}</h1>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3 rounded-xl border border-neutral-200 bg-neutral-50/50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-sumi-muted/70">Kunyomi (Jepang)</p>
                <div className="flex flex-wrap gap-2">
                  {kunyomi.length > 0 ? (
                    kunyomi.map((reading: string) => (
                      <span
                        key={reading}
                        className="font-jp text-lg font-medium text-sumi bg-white px-3 py-1 rounded-md border border-neutral-200 shadow-sm"
                      >
                        {reading}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-neutral-400 italic">Tidak ada</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-neutral-200 bg-neutral-50/50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-sumi-muted/70">Onyomi (China)</p>
                <div className="flex flex-wrap gap-2">
                  {onyomi.length > 0 ? (
                    onyomi.map((reading: string) => (
                      <span
                        key={reading}
                        className="font-jp text-lg font-medium text-sumi bg-white px-3 py-1 rounded-md border border-neutral-200 shadow-sm"
                      >
                        {reading}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-neutral-400 italic">Tidak ada</span>
                  )}
                </div>
              </div>
            </div>

            {/* Penjelasan Fitur Latih Kanji (SRS) */}
            <div className="rounded-2xl border border-ai/20 bg-ai-soft/50 p-4 text-xs leading-relaxed text-sumi-muted space-y-1">
              <p className="font-bold text-ai text-xs">💡 Kegunaan Tombol &quot;Latih Kanji Ini&quot;:</p>
              <p>
                Tombol ini memasukkan kanji <strong>{kanji.character}</strong> ke dalam jadwal <strong>Spaced Repetition System (SRS)</strong> Anda. Kanji ini akan otomatis muncul sebagai flashcard di menu <strong className="text-sumi">Ulangan (SRS)</strong> pada waktu-waktu yang tepat agar Anda tidak lupa.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
