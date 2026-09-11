import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Library,
  Target,
  GraduationCap
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-neutral-300 bg-paper-raised sticky top-0 z-10">
        <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-xl font-semibold text-ai"
          >
            <Image src="/logo.jpg" alt="Benkyou Logo" width={36} height={36} className="rounded-md object-cover shadow-sm" priority />
            Benkyou Shimashou
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-neutral px-3 font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
            >
              <LogOut size={18} aria-hidden="true" />
              Keluar
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1200px]">
        <aside className="hidden w-56 shrink-0 border-r border-neutral-300 py-8 pr-6 md:block">
          <nav aria-label="Main navigation" className="space-y-1">
            <Link
              href="/dashboard"
              className="flex min-h-11 items-center gap-3 rounded-neutral bg-ai-soft px-3 font-semibold text-ai"
            >
              <LayoutDashboard size={18} aria-hidden="true" />
              Ringkasan
            </Link>
            
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-sumi-muted/60">
                Belajar N5
              </p>
            </div>
            <Link
              href="/belajar/n5/kanji"
              className="flex min-h-11 items-center gap-3 rounded-neutral px-3 font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi"
            >
              <span className="font-jp text-lg">漢</span>
              Kanji Explorer
            </Link>
            <Link
              href="/belajar/n5/vocab"
              className="flex min-h-11 items-center gap-3 rounded-neutral px-3 font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi"
            >
              <Library size={18} aria-hidden="true" />
              Kosakata
            </Link>
            <Link
              href="/belajar/n5/grammar"
              className="flex min-h-11 items-center gap-3 rounded-neutral px-3 font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi"
            >
              <GraduationCap size={18} aria-hidden="true" />
              Tata Bahasa
            </Link>

            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-sumi-muted/60">
                Latihan & Tes
              </p>
            </div>
            <Link
              href="/dashboard/review"
              className="flex min-h-11 items-center gap-3 rounded-neutral px-3 font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi"
            >
              <RotateCcw size={18} aria-hidden="true" />
              Ulangan (SRS)
            </Link>
            <Link
              href="/dashboard/quiz"
              className="flex min-h-11 items-center gap-3 rounded-neutral px-3 font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi"
            >
              <ClipboardCheck size={18} aria-hidden="true" />
              Latihan Soal
            </Link>
            <Link
              href="/simulasi-jlpt"
              className="flex min-h-11 items-center gap-3 rounded-neutral px-3 font-semibold text-matcha transition hover:bg-matcha/10"
            >
              <Target size={18} aria-hidden="true" />
              Simulasi JLPT
            </Link>
            
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-sumi-muted/60">
                Referensi
              </p>
            </div>
            <Link
              href="/kamus"
              className="flex min-h-11 items-center gap-3 rounded-neutral px-3 font-semibold text-sumi-muted transition hover:bg-muted hover:text-sumi"
            >
              <BookOpen size={18} aria-hidden="true" />
              Kamus
            </Link>
          </nav>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}


