-- =========================================================================
-- SCRIPT KEAMANAN DATABASE (RLS) - WAJIB DIJALANKAN SEBELUM DEPLOYMENT
-- =========================================================================
-- Jalankan kode ini di Supabase Dashboard -> SQL Editor
-- Tujuannya agar data progres dan ulasan antar-pengguna tidak saling bocor.

-- 1. Mengaktifkan Row Level Security (Jika belum aktif)
ALTER TABLE public.review_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 2. Menghapus policy lama jika ada (opsional untuk menghindari bentrok)
DROP POLICY IF EXISTS "Users can only select their own review cards" ON public.review_cards;
DROP POLICY IF EXISTS "Users can only insert their own review cards" ON public.review_cards;
DROP POLICY IF EXISTS "Users can only update their own review cards" ON public.review_cards;
DROP POLICY IF EXISTS "Users can only delete their own review cards" ON public.review_cards;

DROP POLICY IF EXISTS "Users can only see their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can only insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can only update their own progress" ON public.user_progress;

-- 3. Membuat Policy untuk review_cards
CREATE POLICY "Users can only select their own review cards" ON public.review_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own review cards" ON public.review_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own review cards" ON public.review_cards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can only delete their own review cards" ON public.review_cards FOR DELETE USING (auth.uid() = user_id);

-- 4. Membuat Policy untuk user_progress
CREATE POLICY "Users can only see their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can only insert their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can only update their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Catatan:
-- Tabel 'kanji_items', 'vocab_items', dan 'grammar_items' bisa dibaca oleh semua orang (sudah ada policy SELECT true)
-- karena sifatnya sebagai data referensi/katalog publik.
