-- Migration 0006: Add content columns and missing tables
ALTER TABLE vocab_items ADD COLUMN IF NOT EXISTS romaji TEXT;
ALTER TABLE vocab_items ADD COLUMN IF NOT EXISTS example_sentence TEXT;
ALTER TABLE vocab_items ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE vocab_items ADD COLUMN IF NOT EXISTS part_of_speech TEXT;
ALTER TABLE vocab_items ADD COLUMN IF NOT EXISTS context_tags TEXT[] DEFAULT '{}';
ALTER TABLE vocab_items ADD COLUMN IF NOT EXISTS mnemonic TEXT;

ALTER TABLE kanji_items ADD COLUMN IF NOT EXISTS stroke_order_url TEXT;
ALTER TABLE kanji_items ADD COLUMN IF NOT EXISTS radicals TEXT[];
ALTER TABLE kanji_items ADD COLUMN IF NOT EXISTS examples JSONB DEFAULT '[]';

CREATE TABLE IF NOT EXISTS grammar_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  level_id UUID REFERENCES levels(id) ON DELETE CASCADE,
  pattern TEXT NOT NULL,
  meaning TEXT NOT NULL,
  example TEXT,
  formal_version TEXT,
  casual_version TEXT,
  track TEXT CHECK (track IN ('shiken', 'seikatsu', 'both')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS listening_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  level_id UUID REFERENCES levels(id) ON DELETE CASCADE,
  audio_url TEXT NOT NULL,
  transcript TEXT,
  translation TEXT,
  annotations JSONB DEFAULT '[]',
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE grammar_points ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "grammar_points_public_read" ON grammar_points;
CREATE POLICY "grammar_points_public_read" ON grammar_points FOR SELECT USING (true);

ALTER TABLE listening_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "listening_items_public_read" ON listening_items;
CREATE POLICY "listening_items_public_read" ON listening_items FOR SELECT USING (true);
