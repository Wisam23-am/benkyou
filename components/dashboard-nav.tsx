'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Library,
  Target,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  MessageSquarePlus,
  Sparkles,
  Layers,
} from 'lucide-react';
import { FeedbackModal } from '@/components/feedback-modal';

interface DashboardNavProps {
  userEmail?: string;
  children: React.ReactNode;
}

export function DashboardNav({ userEmail, children }: DashboardNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const pathname = usePathname();

  // Tutup menu mobile ketika rute berpindah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Kunci scroll body ketika drawer mobile terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    {
      label: 'Ringkasan',
      href: '/dashboard',
      icon: LayoutDashboard,
      highlight: false,
    },
    {
      category: 'Belajar N5',
      items: [
        {
          label: 'Hiragana & Katakana',
          href: '/belajar/n5/kana',
          iconSymbol: 'あ',
        },
        {
          label: 'Angka & Satuan Hitung',
          href: '/belajar/n5/angka-counters',
          icon: Layers,
        },
        {
          label: 'Kanji Explorer',
          href: '/belajar/n5/kanji',
          iconSymbol: '漢',
        },
        {
          label: 'Kosakata',
          href: '/belajar/n5/vocab',
          icon: Library,
        },
        {
          label: 'Tata Bahasa',
          href: '/belajar/n5/grammar',
          icon: GraduationCap,
        },
      ],
    },
    {
      category: 'Latihan & Tes',
      items: [
        {
          label: 'Ulangan (SRS)',
          href: '/dashboard/review',
          icon: RotateCcw,
        },
        {
          label: 'Latihan Soal',
          href: '/dashboard/quiz',
          icon: ClipboardCheck,
        },
        {
          label: 'Simulasi JLPT',
          href: '/simulasi-jlpt',
          icon: Target,
          highlightMatcha: true,
        },
      ],
    },
    {
      category: 'Referensi & Bantuan',
      items: [
        {
          label: 'Kamus',
          href: '/kamus',
          icon: BookOpen,
        },
        {
          label: 'Kirim Feedback',
          href: '/dashboard/feedback',
          icon: MessageSquarePlus,
          isFeedbackTrigger: true,
        },
      ],
    },
  ];

  const renderLink = (link: {
    label: string;
    href: string;
    icon?: typeof LayoutDashboard;
    iconSymbol?: string;
    highlightMatcha?: boolean;
    isFeedbackTrigger?: boolean;
  }) => {
    const isActive = pathname === link.href;
    const Icon = link.icon;

    if (link.isFeedbackTrigger) {
      return (
        <button
          key={link.label}
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsFeedbackModalOpen(true);
          }}
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-sumi-muted transition hover:bg-ai/10 hover:text-ai text-left"
        >
          {Icon && <Icon size={18} className="text-ai" aria-hidden="true" />}
          <span>{link.label}</span>
          <span className="ml-auto rounded-md bg-ai/15 px-1.5 py-0.5 text-[10px] font-bold text-ai">
            Baru
          </span>
        </button>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition ${
          isActive
            ? 'bg-ai text-white shadow-xs shadow-ai/30'
            : link.highlightMatcha
            ? 'text-matcha hover:bg-matcha/10'
            : 'text-sumi-muted hover:bg-neutral-100 hover:text-sumi'
        }`}
      >
        {Icon ? (
          <Icon size={18} aria-hidden="true" />
        ) : link.iconSymbol ? (
          <span className="font-jp text-lg leading-none">{link.iconSymbol}</span>
        ) : null}
        <span>{link.label}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-300 bg-paper-raised/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex size-10 items-center justify-center rounded-xl border border-neutral-300 bg-white text-sumi transition hover:bg-neutral-100 md:hidden focus-visible:outline-2 focus-visible:outline-ai"
              aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 text-lg font-bold text-sumi tracking-tight sm:text-xl"
            >
              <Image
                src="/logo.jpg"
                alt="Benkyou Logo"
                width={34}
                height={34}
                className="rounded-lg object-cover shadow-xs"
                priority
              />
              <span>Benkyou Shimashou</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Feedback Button di Header */}
            <button
              type="button"
              onClick={() => setIsFeedbackModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-sumi-muted transition hover:border-ai hover:text-ai hover:bg-ai/5 shadow-xs"
            >
              <MessageSquarePlus size={15} className="text-ai" />
              <span>Feedback</span>
            </button>

            {/* Form Logout */}
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-sumi-muted transition hover:bg-neutral-100 hover:text-sumi focus-visible:outline-2 focus-visible:outline-ai"
              >
                <LogOut size={16} aria-hidden="true" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Container Layout (Flex) */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-1">
        {/* Desktop Sidebar (Flex Column) */}
        <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-neutral-300 py-8 pr-6 md:flex">
          <nav aria-label="Main navigation" className="space-y-6">
            {/* Single link */}
            <div className="space-y-1">{renderLink(navLinks[0] as any)}</div>

            {/* Grouped links */}
            {navLinks.slice(1).map((group: any, idx) => (
              <div key={idx} className="space-y-1.5">
                <p className="px-3.5 text-[11px] font-bold uppercase tracking-wider text-sumi-muted/60">
                  {group.category}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item: any) => renderLink(item))}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Feedback Card in Desktop Sidebar */}
          <div className="mt-8 rounded-2xl border border-ai/20 bg-gradient-to-br from-ai/5 to-transparent p-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-ai">
              <Sparkles size={14} />
              <span>Ada Bug / Rekomendasi?</span>
            </div>
            <p className="mt-1 text-sumi-muted leading-relaxed">
              Bantu kembangkan Benkyou jadi lebih baik.
            </p>
            <button
              type="button"
              onClick={() => setIsFeedbackModalOpen(true)}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white border border-ai/30 py-2 font-bold text-ai transition hover:bg-ai hover:text-white shadow-xs"
            >
              <MessageSquarePlus size={14} />
              Kirim Masukan
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer (Offcanvas Backdrop & Panel) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Sliding Drawer Panel */}
            <div className="fixed inset-y-0 left-0 z-50 flex w-4/5 max-w-xs flex-col justify-between border-r border-neutral-300 bg-paper-raised p-6 shadow-2xl transition-transform animate-in slide-in-from-left duration-250">
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/logo.jpg"
                      alt="Benkyou Logo"
                      width={30}
                      height={30}
                      className="rounded-md object-cover"
                    />
                    <span className="font-bold text-sumi text-base">Menu Belajar</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full p-1.5 text-sumi-muted hover:bg-neutral-100 hover:text-sumi"
                    aria-label="Tutup menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav aria-label="Mobile navigation" className="space-y-5">
                  <div className="space-y-1">{renderLink(navLinks[0] as any)}</div>

                  {navLinks.slice(1).map((group: any, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <p className="px-3.5 text-[11px] font-bold uppercase tracking-wider text-sumi-muted/60">
                        {group.category}
                      </p>
                      <div className="space-y-0.5">
                        {group.items.map((item: any) => renderLink(item))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Mobile Drawer Bottom User Info */}
              <div className="border-t border-neutral-200 pt-4 mt-6">
                {userEmail && (
                  <p className="px-3 text-xs text-sumi-muted truncate mb-3">
                    Masuk: <span className="font-semibold text-sumi">{userEmail}</span>
                  </p>
                )}
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-2.5 text-xs font-bold text-sumi-muted transition hover:bg-neutral-100 hover:text-sumi"
                  >
                    <LogOut size={16} /> Keluar Akun
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Content Main Area (Flex 1) */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>

      {/* Global Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        userEmail={userEmail}
      />
    </div>
  );
}
