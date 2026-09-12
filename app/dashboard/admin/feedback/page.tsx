import Link from 'next/link';
import { ArrowLeft, MessageSquarePlus, Bug, Lightbulb, BookOpen, HelpCircle, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { FeedbackStatusToggle } from '@/components/feedback-status-toggle';

export default async function AdminFeedbackPage() {
  const adminClient = createAdminClient();
  const { data: feedbacks, error } = await adminClient
    .from('user_feedbacks')
    .select('*')
    .order('created_at', { ascending: false });

  const items = feedbacks || [];
  const unreadCount = items.filter((i) => i.status === 'unread').length;
  const inReviewCount = items.filter((i) => i.status === 'in_review').length;
  const resolvedCount = items.filter((i) => i.status === 'resolved').length;

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ai hover:underline"
        >
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ai/10 px-3.5 py-1.5 text-xs font-bold text-ai mb-2">
              <MessageSquarePlus size={14} />
              Panel Developer / Admin
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-sumi">
              Daftar Masukan & Laporan User
            </h1>
          </div>
        </div>
        <p className="text-sumi-muted text-sm">
          Semua feedback (laporan bug, ide fitur, koreksi materi) yang dikirim oleh pengguna web Benkyou Shimashou terkumpul di halaman ini.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-5 text-amber-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Belum Dibaca</span>
            <AlertCircle size={18} className="text-amber-600" />
          </div>
          <p className="mt-2 text-3xl font-extrabold">{unreadCount}</p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 sm:p-5 text-blue-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Sedang Ditinjau</span>
            <Clock size={18} className="text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-extrabold">{inReviewCount}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 text-emerald-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Terselesaikan</span>
            <CheckCircle size={18} className="text-emerald-600" />
          </div>
          <p className="mt-2 text-3xl font-extrabold">{resolvedCount}</p>
        </div>
      </div>

      {/* Error state if table doesn't exist yet */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 space-y-2">
          <h3 className="font-bold">Tabel database `user_feedbacks` belum dibuat</h3>
          <p className="text-xs leading-relaxed">
            Harap salin dan jalankan skrip SQL di file <code>docs/migration_feedback.sql</code> di Supabase SQL Editor Anda.
          </p>
        </div>
      )}

      {/* Feedbacks List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center space-y-2">
            <p className="text-xl font-bold text-sumi">Belum Ada Feedback Masuk</p>
            <p className="text-sumi-muted text-sm">
              Semua masukan dari pengguna akan otomatis tampil di sini saat ada yang mengirimnya.
            </p>
          </div>
        ) : (
          items.map((fb) => (
            <div
              key={fb.id}
              className={`rounded-3xl border p-6 transition-all space-y-4 ${
                fb.status === 'unread'
                  ? 'border-amber-300 bg-amber-50/30 shadow-sm ring-1 ring-amber-300/50'
                  : fb.status === 'in_review'
                  ? 'border-blue-200 bg-white shadow-xs'
                  : 'border-neutral-200 bg-neutral-50/70 opacity-90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                      fb.type === 'bug'
                        ? 'bg-red-100 text-red-700'
                        : fb.type === 'feature'
                        ? 'bg-blue-100 text-blue-700'
                        : fb.type === 'content'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-neutral-200 text-sumi'
                    }`}
                  >
                    {fb.type === 'bug' && <Bug size={14} />}
                    {fb.type === 'feature' && <Lightbulb size={14} />}
                    {fb.type === 'content' && <BookOpen size={14} />}
                    {fb.type === 'other' && <HelpCircle size={14} />}
                    <span className="capitalize">{fb.type}</span>
                  </span>

                  {fb.rating && (
                    <div className="flex items-center gap-0.5 text-yuzu">
                      {Array.from({ length: fb.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-yuzu" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-xs text-sumi-muted font-medium">
                  {new Date(fb.created_at).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-sumi">{fb.title}</h3>
                <p className="mt-2 text-sm text-sumi-muted leading-relaxed whitespace-pre-wrap bg-white/80 p-4 rounded-2xl border border-neutral-200/60">
                  {fb.message}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="text-xs text-sumi-muted">
                  Pengirim: <strong className="text-sumi">{fb.contact_email || 'Anonim'}</strong>
                </div>

                {/* Status Toggle Client Component */}
                <FeedbackStatusToggle id={fb.id} currentStatus={fb.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
