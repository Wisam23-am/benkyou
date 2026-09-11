import Link from 'next/link';
import { ArrowLeft, Clock, FileText, CheckCircle2 } from 'lucide-react';

export default function SimulasiJLPTPage() {
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
      
      <main className="mx-auto max-w-[800px] px-4 py-8 sm:px-6 sm:py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Simulasi JLPT N5</h1>
          <p className="text-lg text-sumi-muted max-w-2xl mx-auto">
            Uji kemampuan bahasamu dalam simulasi tes resmi JLPT N5. 
            Soal sepenuhnya dalam Bahasa Jepang sesuai format asli.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Moji Goi Section */}
          <div className="rounded-2xl border border-neutral-300 bg-paper-raised p-8">
            <div className="mb-6 inline-flex rounded-xl bg-ai-soft p-4 text-ai">
              <FileText size={32} />
            </div>
            <h2 className="font-jp text-2xl font-bold text-sumi">文字・語彙</h2>
            <p className="font-semibold text-sumi-muted">Kosakata & Kanji</p>
            
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-sm"><Clock size={18} className="text-neutral-400" /> 25 Menit</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 size={18} className="text-neutral-400" /> 25 Soal Pilihan Ganda</li>
            </ul>

            <Link href="/simulasi-jlpt/sesi-1" className="mt-8 flex w-full justify-center rounded-xl bg-ai py-3 font-semibold text-white transition-colors hover:bg-ai/90">
              Mulai Sesi 1
            </Link>
          </div>

          {/* Bunpou Dokkai Section */}
          <div className="rounded-2xl border border-neutral-300 bg-paper-raised p-8">
            <div className="mb-6 inline-flex rounded-xl bg-matcha/10 p-4 text-matcha">
              <FileText size={32} />
            </div>
            <h2 className="font-jp text-2xl font-bold text-sumi">文法・読解</h2>
            <p className="font-semibold text-sumi-muted">Tata Bahasa & Membaca</p>
            
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-sm"><Clock size={18} className="text-neutral-400" /> 50 Menit</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 size={18} className="text-neutral-400" /> 32 Soal Pilihan Ganda</li>
            </ul>

            <button className="mt-8 w-full rounded-xl bg-neutral-200 py-3 font-semibold text-neutral-500 cursor-not-allowed">
              Selesaikan Sesi 1 Dulu
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
