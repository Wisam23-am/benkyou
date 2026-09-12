-- =========================================================================
-- SCRIPT TABEL FEEDBACK & SARAN DARI USER
-- =========================================================================
-- Jalankan kode ini di Supabase Dashboard -> SQL Editor
-- Tujuannya agar pengguna dapat mengirim laporan bug, ide fitur, atau masukan.

CREATE TABLE IF NOT EXISTS public.user_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'content', 'other')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  contact_email TEXT,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'in_review', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Mengaktifkan Row Level Security
ALTER TABLE public.user_feedbacks ENABLE ROW LEVEL SECURITY;

-- Policy untuk insert feedback (Bisa user login ataupun anonymous)
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.user_feedbacks;
CREATE POLICY "Anyone can submit feedback"
ON public.user_feedbacks FOR INSERT
WITH CHECK (true);

-- Policy untuk user melihat feedback miliknya sendiri
DROP POLICY IF EXISTS "Users can only view their own feedback" ON public.user_feedbacks;
CREATE POLICY "Users can only view their own feedback"
ON public.user_feedbacks FOR SELECT
USING (auth.uid() = user_id);
