import fs from 'fs';
import path from 'path';

interface KanjiCsvRow {
  character: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  stroke_count: string;
  examples: string;
}

interface VocabCsvRow {
  kanji: string;
  kana: string;
  romaji: string;
  meaning: string;
  part_of_speech: string;
  example_sentence: string;
}

function parseCsv(content: string): Record<string, string>[] {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // simple CSV parser handling quoted values
    const values: string[] = [];
    let insideQuote = false;
    let currentVal = '';

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        values.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    values.push(currentVal.trim());

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] ? values[idx].replace(/^"|"$/g, '') : '';
    });
    rows.push(row);
  }
  return rows;
}

export function loadKanjiN5(): KanjiCsvRow[] {
  const p = path.join(process.cwd(), 'scripts', 'data', 'kanji_n5.csv');
  const raw = fs.readFileSync(p, 'utf-8');
  return parseCsv(raw) as unknown as KanjiCsvRow[];
}

export function loadVocabN5(): VocabCsvRow[] {
  const p = path.join(process.cwd(), 'scripts', 'data', 'vocab_n5.csv');
  const raw = fs.readFileSync(p, 'utf-8');
  return parseCsv(raw) as unknown as VocabCsvRow[];
}

async function runSeed() {
  console.log('🚀 Memulai parsing dan validasi data N5...');
  const kanjiList = loadKanjiN5();
  const vocabList = loadVocabN5();

  console.log(`✅ Berhasil memuat ${kanjiList.length} kanji N5.`);
  console.log(`✅ Berhasil memuat ${vocabList.length} kosakata N5.`);

  // Verifikasi struktur data
  if (kanjiList.length >= 100) {
    console.log('🎉 Target 100 Kanji N5 resmi terpenuhi!');
  }
  if (vocabList.length > 0) {
    console.log(`🎉 Sampel dataset kosakata N5 siap untuk sinkronisasi.`);
  }
  console.log('✨ Data pipeline siap digunakan untuk migrasi Supabase maupun static fallback!');
}

runSeed().catch(console.error);
