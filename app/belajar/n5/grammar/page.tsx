import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function GrammarExplorerPage() {
  const supabase = createAdminClient();
  const { data: grammarItems, error } = await supabase
    .from('grammar_items')
    .select('*')
    .order('created_at', { ascending: true });

  const hasData = grammarItems && grammarItems.length > 0;

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
      
      <main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-10 space-y-4">
          <p className="text-sm font-semibold text-blue-600">Belajar N5</p>
          <h1 className="text-4xl font-bold tracking-tight">Tata Bahasa (Grammar)</h1>
          <p className="text-lg text-sumi-muted">
            Pelajari {grammarItems?.length || 0} struktur dasar kalimat bahasa Jepang tingkat JLPT N5.
          </p>
        </div>

        {!hasData ? (
          <div className="rounded-xl border border-warning/50 bg-warning/10 p-6 text-center">
            <h2 className="text-lg font-semibold text-warning-foreground">Data Tata Bahasa Belum Ditemukan</h2>
            <p className="mt-2 text-sm text-warning-foreground/80">
              Tabel <code>grammar_items</code> belum dibuat atau belum diisi. Silakan jalankan script migrasi.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {grammarItems.map((grammar) => (
              <div
                key={grammar.id}
                className="overflow-hidden rounded-xl border border-neutral-300 bg-paper-raised transition-all hover:border-blue-500 hover:shadow-sm"
              >
                <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                  <h2 className="font-jp text-2xl font-bold text-sumi">{grammar.pattern}</h2>
                  <p className="mt-1 text-sm font-semibold text-blue-600">{grammar.meaning}</p>
                </div>
                <div className="p-6">
                  <p className="text-sumi-muted leading-relaxed">{grammar.explanation}</p>
                  <div className="mt-6 rounded-lg bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-800">Contoh</p>
                    <p className="mt-2 font-jp text-lg text-sumi">{grammar.example_sentence}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
