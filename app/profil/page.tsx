import Link from 'next/link';
import { ArrowLeft, User, Bell, Languages } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="page-enter mx-auto max-w-[680px] space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ai"
        >
          <ArrowLeft size={16} /> Kembali ke dashboard
        </Link>
        <h1 className="text-4xl font-semibold">Pengaturan Profil</h1>
        <p className="prose-id text-sumi-muted">
          Kelola preferensi akun, tampilan belajar, dan notifikasi SRS.
        </p>
      </div>

      <section className="space-y-6 rounded-neutral border border-neutral-300 bg-paper-raised p-6">
        <div className="flex items-center gap-4 border-b border-neutral-300 pb-5">
          <div className="grid size-14 place-items-center rounded-full bg-ai-soft text-ai font-bold text-xl">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {user?.email?.split('@')[0] ?? 'Pelajar'}
            </h2>
            <p className="text-sm text-sumi-muted">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-sumi flex items-center gap-2">
            <Languages size={18} className="text-ai" /> Preferensi Pembelajaran
          </h3>
          <div className="rounded-neutral border border-neutral-300 bg-paper p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Bahasa Antarmuka</p>
                <p className="text-xs text-sumi-muted">Penjelasan materi dan tata bahasa</p>
              </div>
              <span className="text-sm font-semibold text-ai">Bahasa Indonesia</span>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-300 pt-3">
              <div>
                <p className="font-semibold text-sm">Target Level Saat Ini</p>
                <p className="text-xs text-sumi-muted">Silabus ujian & kotoba</p>
              </div>
              <span className="text-sm font-semibold text-matcha">JLPT N5</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-sumi flex items-center gap-2">
            <Bell size={18} className="text-yuzu" /> Jadwal Review SRS
          </h3>
          <div className="rounded-neutral border border-neutral-300 bg-paper p-4">
            <p className="text-sm text-sumi">
              Kartu review kosakata dan kanji dijadwalkan secara otomatis setiap hari berdasarkan tingkat kemudahan ingatanmu (algoritma FSRS / SM-2).
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-300">
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-neutral border border-hanko px-5 text-sm font-semibold text-hanko transition hover:bg-hanko/10"
            >
              Keluar dari akun
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
