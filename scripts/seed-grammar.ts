import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

const GRAMMAR_DATA = [
  {
    pattern: '〜は〜です',
    meaning: '[A] adalah [B]',
    explanation: 'Partikel は (dibaca wa) menandai topik kalimat, dan です (desu) adalah kopula penutup kalimat sopan.',
    example_sentence: '私は学生です。(Saya adalah pelajar.)'
  },
  {
    pattern: '〜も〜です',
    meaning: 'Juga',
    explanation: 'Partikel も (mo) menggantikan は, が, atau を untuk menyatakan sesuatu memiliki sifat atau status yang sama.',
    example_sentence: '彼も学生です。(Dia juga pelajar.)'
  },
  {
    pattern: '〜の〜',
    meaning: 'Kepemilikan / Atribut',
    explanation: 'Partikel の (no) menghubungkan dua kata benda. Kata benda pertama menjelaskan atau memiliki kata benda kedua.',
    example_sentence: '私の本。(Buku saya.)'
  },
  {
    pattern: '〜を〜ます',
    meaning: 'Penanda Objek',
    explanation: 'Partikel を (wo/o) menandai objek langsung dari sebuah kata kerja transitif.',
    example_sentence: 'りんごを食べます。(Makan apel.)'
  },
  {
    pattern: '〜に / 〜へ行く',
    meaning: 'Ke (Arah / Tujuan)',
    explanation: 'Partikel に (ni) atau へ (e) digunakan dengan kata kerja gerak (pergi, datang, pulang) untuk menunjukkan tujuan.',
    example_sentence: '学校に行きます。(Pergi ke sekolah.)'
  },
  {
    pattern: '〜で〜ます',
    meaning: 'Di (Tempat melakukan aktivitas)',
    explanation: 'Partikel で (de) menandai tempat di mana suatu tindakan/aktivitas terjadi.',
    example_sentence: 'レストランで食べます。(Makan di restoran.)'
  },
  {
    pattern: '〜ませんか',
    meaning: 'Maukah...? / Bagaimana kalau...?',
    explanation: 'Bentuk negatif dari kata kerja ditambah か digunakan untuk mengajak seseorang melakukan sesuatu dengan sopan.',
    example_sentence: '一緒に映画を見ませんか。(Maukah nonton film bersama?)'
  },
  {
    pattern: '〜ましょう',
    meaning: 'Ayo...',
    explanation: 'Bentuk ajakan (volitional) untuk mengajak melakukan sesuatu bersama-sama.',
    example_sentence: '行きましょう。(Ayo pergi.)'
  },
  {
    pattern: '〜があります / います',
    meaning: 'Ada (Benda mati / Makhluk hidup)',
    explanation: 'あります digunakan untuk benda mati atau tumbuhan. います digunakan untuk makhluk hidup (manusia/hewan).',
    example_sentence: '机の上に本があります。(Ada buku di atas meja.)'
  },
  {
    pattern: '〜がほしいです',
    meaning: 'Ingin (Benda)',
    explanation: 'Digunakan untuk menyatakan keinginan terhadap suatu benda. Selalu diikuti dengan partikel が (ga).',
    example_sentence: '私は車がほしいです。(Saya ingin mobil.)'
  },
  {
    pattern: '〜たいです',
    meaning: 'Ingin (Melakukan sesuatu)',
    explanation: 'Ditambahkan ke bentuk dasar kata kerja (tanpa masu) untuk menyatakan keinginan melakukan suatu tindakan.',
    example_sentence: '日本へ行きたいです。(Saya ingin pergi ke Jepang.)'
  },
  {
    pattern: '〜てください',
    meaning: 'Tolong...',
    explanation: 'Kata kerja bentuk-te + ください digunakan untuk meminta seseorang melakukan sesuatu dengan sopan.',
    example_sentence: 'これを見てください。(Tolong lihat ini.)'
  },
  {
    pattern: '〜てもいいです',
    meaning: 'Boleh...',
    explanation: 'Kata kerja bentuk-te + もいいです digunakan untuk memberikan atau meminta izin.',
    example_sentence: 'ここで写真を撮ってもいいです。(Boleh mengambil foto di sini.)'
  },
  {
    pattern: '〜てはいけません',
    meaning: 'Tidak boleh...',
    explanation: 'Kata kerja bentuk-te + はいけません digunakan untuk melarang suatu tindakan.',
    example_sentence: 'ここでタバコを吸ってはいけません。(Tidak boleh merokok di sini.)'
  },
  {
    pattern: '〜から',
    meaning: 'Karena...',
    explanation: 'Diletakkan di akhir kalimat untuk menyatakan alasan atau sebab.',
    example_sentence: '忙しいですから、行きません。(Karena sibuk, saya tidak pergi.)'
  }
];

async function seedGrammar() {
  console.log('Fetching lesson ID...');
  const { data: lessons } = await supabase.from('lessons').select('id').limit(1);
  if (!lessons || lessons.length === 0) {
    console.log('No lessons found. Please run seed-n5-data.ts first.');
    return;
  }
  const lessonId = lessons[0].id;

  console.log(`Preparing to insert ${GRAMMAR_DATA.length} grammar points...`);
  const inserts = GRAMMAR_DATA.map(g => ({
    lesson_id: lessonId,
    pattern: g.pattern,
    meaning: g.meaning,
    explanation: g.explanation,
    example_sentence: g.example_sentence
  }));

  const { error } = await supabase.from('grammar_items').insert(inserts);
  if (error) {
    console.error('Error seeding grammar:', error.message);
  } else {
    console.log('Successfully seeded grammar items!');
  }
}

seedGrammar();
