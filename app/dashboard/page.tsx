import Link from 'next/link';
import { BookOpen, ClipboardCheck, Target, ArrowRight, Library, RotateCcw, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function DashboardPage() {
  const supabase = await createClient();
  const adminClient = createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: cards }, { count: kanjiCount }, { count: vocabCount }] =
    await Promise.all([
      supabase
        .from('review_cards')
        .select('due_at, reviews, item_type')
        .eq('user_id', user?.id ?? ''),
      adminClient.from('kanji_items').select('*', { count: 'exact', head: true }),
      adminClient.from('vocab_items').select('*', { count: 'exact', head: true }),
    ]);

  const dueReviews = cards?.filter((card) => card.due_at <= new Date().toISOString()).length ?? 0;
  
  return (
    <div className="page-enter space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ai to-indigo-600 px-8 py-10 shadow-lg sm:px-12 sm:py-14 text-white">
        <div className="absolute right-0 top-0 opacity-10 font-jp text-[12rem] leading-none pointer-events-none select-none translate-x-8 -translate-y-12">
          進
        </div>
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
            <Sparkles size={16} />
            Fase Persiapan JLPT N5
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tingkatkan Diri Anda Hari Ini.
          </h1>
          <p className="text-lg text-white/80">
            Masuk sebagai <span className="font-semibold text-white">{user?.email}</span>. Mari selesaikan target ulasan dan kuasai materi baru!
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* SRS Card */}
        {dueReviews > 0 ? (
          <Link href="/dashboard/review" className="group relative overflow-hidden rounded-3xl border border-warning/30 bg-gradient-to-b from-warning/10 to-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/20 text-warning-foreground">
                  <RotateCcw size={24} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-sumi">Waktunya Mengulang</h3>
                <p className="mt-1 text-sm font-semibold text-warning-foreground">Tersedia {dueReviews} kartu SRS</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:translate-x-1">
                <ArrowRight size={18} className="text-warning-foreground" />
              </div>
            </div>
            <p className="mt-4 text-sm text-sumi-muted">Ulangi kosakata dan kanji ini agar ingatan Anda menjadi permanen.</p>
          </Link>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm opacity-80">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-200 text-neutral-500">
              <RotateCcw size={24} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-400">Semua Bersih</h3>
            <p className="mt-1 text-sm font-semibold text-neutral-400">Tidak ada kartu yang menunggu</p>
            <p className="mt-4 text-sm text-neutral-400">Kembalilah beberapa jam lagi atau pelajari materi baru.</p>
          </div>
        )}

        {/* Kanji Card */}
        <Link href="/belajar/n5/kanji" className="group relative overflow-hidden rounded-3xl border border-ai/20 bg-gradient-to-b from-ai/5 to-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ai/10 text-ai">
                <BookOpen size={24} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-sumi">Eksplorasi Kanji</h3>
              <p className="mt-1 text-sm font-semibold text-ai">{kanjiCount ?? 0} karakter esensial N5</p>
            </div>
            <span className="font-jp text-5xl font-bold text-ai/20 transition-colors group-hover:text-ai/40">漢</span>
          </div>
          <p className="mt-4 text-sm text-sumi-muted">Pelajari On'yomi, Kun'yomi, dan latihan menulis dengan benar.</p>
        </Link>

        {/* Vocab Card */}
        <Link href="/belajar/n5/vocab" className="group relative overflow-hidden rounded-3xl border border-matcha/20 bg-gradient-to-b from-matcha/5 to-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-matcha/10 text-matcha">
                <Library size={24} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-sumi">Bank Kosakata</h3>
              <p className="mt-1 text-sm font-semibold text-matcha">{vocabCount ?? 0} kosakata wajib N5</p>
            </div>
            <span className="font-jp text-5xl font-bold text-matcha/20 transition-colors group-hover:text-matcha/40">語</span>
          </div>
          <p className="mt-4 text-sm text-sumi-muted">Dilengkapi dengan audio pengucapan asli dan contoh kalimat.</p>
        </Link>
      </div>

      {/* Pondasi Dasar Section: Kana & Counters */}
      <section className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-sumi">Pondasi & Tata Hitung</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Hiragana & Katakana */}
          <Link
            href="/belajar/n5/kana"
            className="group flex flex-col justify-between rounded-3xl border border-neutral-300 bg-white p-6 sm:p-7 shadow-xs transition-all hover:border-ai hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-ai">Alfabet Fonetik</span>
                <h3 className="text-xl font-bold text-sumi">Hiragana & Katakana</h3>
                <p className="text-sm text-sumi-muted max-w-sm">
                  Tabel 46 huruf dasar, bunyi turunan (゛゜), dan bunyi gabungan lengkap dengan audio.
                </p>
              </div>
              <span className="font-jp text-4xl font-bold text-ai/25 group-hover:text-ai transition-colors">
                あア
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-bold text-ai">
              <span>Buka Tabel Kana</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Angka & Satuan Hitung */}
          <Link
            href="/belajar/n5/angka-counters"
            className="group flex flex-col justify-between rounded-3xl border border-neutral-300 bg-white p-6 sm:p-7 shadow-xs transition-all hover:border-yuzu hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-yuzu-foreground">Satuan Hitung & Kalender</span>
                <h3 className="text-xl font-bold text-sumi">Angka, Tanggal & Counters</h3>
                <p className="text-sm text-sumi-muted max-w-sm">
                  Pelajari cara menghitung jumlah barang (~つ), orang, lantai (~階), kali (~回), uang Yen, dan tanggal.
                </p>
              </div>
              <span className="font-jp text-4xl font-bold text-yuzu/40 group-hover:text-yuzu transition-colors">
                階回
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-bold text-yuzu-foreground">
              <span>Pelajari Satuan Hitung</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Main CTA: JLPT Simulation */}
      <section className="pt-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-sumi">Tujuan Akhir</h2>
        <Link href="/simulasi-jlpt" className="group relative flex flex-col overflow-hidden rounded-3xl border border-sumi bg-sumi sm:flex-row sm:items-center shadow-xl transition-transform hover:scale-[1.01]">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-ai/20 to-transparent mix-blend-overlay"></div>
          <div className="relative z-10 flex-1 p-8 sm:p-10 text-white">
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-sm font-semibold text-white/90 backdrop-blur-sm">
              <Target size={16} />
              Ujian Resmi
            </div>
            <h3 className="mt-5 text-3xl font-extrabold sm:text-4xl">Simulasi JLPT N5</h3>
            <p className="mt-3 max-w-lg text-lg text-white/70">
              Persiapkan mental Anda. Tes menggunakan sistem perhitungan skor, batas waktu, dan standar soal asli JLPT.
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-white/5 px-8 py-6 sm:border-l sm:border-t-0 sm:py-0 h-full min-h-[140px] backdrop-blur-md">
            <span className="text-lg font-bold text-white">Mulai Ujian</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sumi transition-transform group-hover:translate-x-2">
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>
      </section>

      {/* Community Feedback Card */}
      <section className="pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-ai/20 bg-gradient-to-r from-ai-soft/60 via-white to-blue-50/40 p-6 sm:p-8 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ai">
              <Sparkles size={14} />
              <span>Suara Pembelajar</span>
            </div>
            <h3 className="text-xl font-bold text-sumi">Punya Ide Fitur atau Menemukan Bug?</h3>
            <p className="text-sm text-sumi-muted max-w-xl">
              Kami terus mengembangkan Benkyou Shimashou. Berikan masukan atau laporkan kendala langsung ke developer.
            </p>
          </div>
          <Link
            href="/dashboard/feedback"
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-ai px-6 py-3 text-sm font-bold text-white shadow-md shadow-ai/20 transition hover:bg-ai/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Beri Masukan Sekarang <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
