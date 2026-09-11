-- Buka Supabase Dashboard > SQL Editor
-- Jalankan kode di bawah ini untuk membuat tabel grammar_items

CREATE TABLE public.grammar_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    pattern TEXT NOT NULL,
    meaning TEXT NOT NULL,
    explanation TEXT NOT NULL,
    example_sentence TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Izinkan akses baca publik
CREATE POLICY "Enable read access for all users" ON "public"."grammar_items" FOR SELECT USING (true);

-- Jangan lupa jalankan di SQL Editor Supabase!
