'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export type FeedbackType = 'bug' | 'feature' | 'content' | 'other';

export interface FeedbackInput {
  type: FeedbackType;
  title: string;
  message: string;
  rating?: number;
  email?: string;
}

export async function submitFeedback(input: FeedbackInput) {
  try {
    if (!input.title || !input.title.trim()) {
      return { success: false, error: 'Judul masukan tidak boleh kosong.' };
    }
    if (!input.message || !input.message.trim()) {
      return { success: false, error: 'Pesan detail masukan tidak boleh kosong.' };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminClient = createAdminClient();

    const senderEmail = input.email?.trim() || user?.email || 'Anonim';

    const payload = {
      user_id: user?.id || null,
      type: input.type,
      title: input.title.trim(),
      message: input.message.trim(),
      rating: input.rating && input.rating >= 1 && input.rating <= 5 ? input.rating : null,
      contact_email: senderEmail,
      status: 'unread',
    };

    // 1. Simpan ke database Supabase (tabel user_feedbacks)
    const { error } = await adminClient.from('user_feedbacks').insert(payload);

    if (error) {
      console.error('Error inserting feedback:', error);
      if (error.code === '42P01' || error.message.includes('relation "public.user_feedbacks" does not exist')) {
        return {
          success: false,
          error: 'Tabel feedback belum dibuat di database. Harap jalankan script migration_feedback.sql di Supabase SQL Editor.',
        };
      }
      return { success: false, error: error.message };
    }

    // 2. Notifikasi Email ke Developer (menggunakan Resend API jika API Key dikonfigurasi)
    const resendApiKey = process.env.RESEND_API_KEY;
    const developerEmail = process.env.DEVELOPER_EMAIL;

    if (resendApiKey && developerEmail) {
      try {
        const typeLabels: Record<string, string> = {
          bug: '🐛 Laporan Bug / Error',
          feature: '💡 Rekomendasi Fitur',
          content: '📖 Koreksi Materi',
          other: '❓ Kritik & Saran Umum',
        };

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Benkyou Shimashou <onboarding@resend.dev>',
            to: developerEmail,
            subject: `[Feedback Baru] ${typeLabels[input.type] || input.type}: ${input.title}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; background-color: #ffffff;">
                <h2 style="color: #1e293b; margin-top: 0;">📬 Feedback Baru Diterima!</h2>
                <p style="color: #64748b; font-size: 14px;">Seorang pengguna baru saja mengirimkan masukan melalui web Benkyou Shimashou.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Jenis:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a;">${typeLabels[input.type] || input.type}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;"><strong>Rating:</strong></td>
                    <td style="padding: 8px 0; color: #eab308;">${input.rating ? `${'⭐'.repeat(input.rating)} (${input.rating}/5)` : 'Tanpa Rating'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;"><strong>Pengirim:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a;">${senderEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;"><strong>Judul:</strong></td>
                    <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${input.title}</td>
                  </tr>
                </table>

                <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">
                  <p style="margin: 0; color: #334155; font-size: 14px; whitespace: pre-line;">${input.message.replace(/\n/g, '<br />')}</p>
                </div>

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/admin/feedback" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; font-weight: bold; padding: 10px 20px; border-radius: 8px; font-size: 14px;">Buka Panel Admin Feedback</a>
                </div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('Gagal mengirim email notifikasi ke developer:', emailErr);
      }
    }

    return {
      success: true,
      message: 'Terima kasih atas masukan Anda! Masukan telah berhasil dikirim ke developer.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Gagal mengirim masukan.';
    return { success: false, error: errorMsg };
  }
}

export async function updateFeedbackStatus(feedbackId: string, status: 'unread' | 'in_review' | 'resolved') {
  try {
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('user_feedbacks')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', feedbackId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, message: 'Status feedback berhasil diperbarui.' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Gagal memperbarui status.';
    return { success: false, error: errorMsg };
  }
}
