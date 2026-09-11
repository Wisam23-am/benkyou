import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

// Kumpulan kosakata N5 (Ekstra untuk mencapai 200+)
const EXTRA_VOCAB = [
  // Waktu / Jam
  { term: '半', reading: 'はん', meaning: 'Setengah (Jam)', example_sentence: '1時半です。' },
  { term: '毎朝', reading: 'まいあさ', meaning: 'Setiap pagi', example_sentence: '毎朝コーヒーを飲みます。' },
  { term: '毎晩', reading: 'まいばん', meaning: 'Setiap malam', example_sentence: '毎晩テレビを見ます。' },
  { term: '毎日', reading: 'まいにち', meaning: 'Setiap hari', example_sentence: '毎日日本語を勉強します。' },
  { term: '毎週', reading: 'まいしゅう', meaning: 'Setiap minggu', example_sentence: '毎週テニスをします。' },
  { term: '毎月', reading: 'まいつき', meaning: 'Setiap bulan', example_sentence: '毎月本を買います。' },
  { term: '毎年', reading: 'まいとし', meaning: 'Setiap tahun', example_sentence: '毎年旅行します。' },
  
  // Pekerjaan / Tempat Umum
  { term: '銀行', reading: 'ぎんこう', meaning: 'Bank', example_sentence: '銀行でお金を下ろします。' },
  { term: '郵便局', reading: 'ゆうびんきょく', meaning: 'Kantor Pos', example_sentence: '郵便局へ行きます。' },
  { term: '図書館', reading: 'としょかん', meaning: 'Perpustakaan', example_sentence: '図書館で本を借ります。' },
  { term: '映画館', reading: 'えいがかん', meaning: 'Bioskop', example_sentence: '映画館で映画を見ます。' },
  { term: '公園', reading: 'こうえん', meaning: 'Taman', example_sentence: '公園を散歩します。' },
  { term: '病院', reading: 'びょういん', meaning: 'Rumah Sakit', example_sentence: '病院へ行きます。' },
  { term: '大学', reading: 'だいがく', meaning: 'Universitas', example_sentence: '大学で勉強します。' },
  { term: '大使館', reading: 'たいしかん', meaning: 'Kedutaan Besar', example_sentence: '大使館はどこですか。' },

  // Anggota Tubuh / Kesehatan
  { term: '病気', reading: 'びょうき', meaning: 'Sakit / Penyakit', example_sentence: '病気になりました。' },
  { term: '薬', reading: 'くすり', meaning: 'Obat', example_sentence: '薬を飲みます。' },
  { term: 'お腹', reading: 'おなか', meaning: 'Perut', example_sentence: 'お腹が痛いです。' },
  { term: '歯', reading: 'は', meaning: 'Gigi', example_sentence: '歯を磨きます。' },
  
  // Aktivitas Sehari-hari (Verbs)
  { term: '洗う', reading: 'あらう', meaning: 'Mencuci', example_sentence: '手を洗います。' },
  { term: '弾く', reading: 'ひく', meaning: 'Memainkan (alat musik berdawai/tuts)', example_sentence: 'ピアノを弾きます。' },
  { term: '歌う', reading: 'うたう', meaning: 'Menyanyi', example_sentence: '歌を歌います。' },
  { term: '集める', reading: 'あつめる', meaning: 'Mengumpulkan', example_sentence: '切手を集めます。' },
  { term: '捨てる', reading: 'すてる', meaning: 'Membuang', example_sentence: 'ゴミを捨てます。' },
  { term: '換える', reading: 'かえる', meaning: 'Menukar / Mengganti', example_sentence: 'お金を換えます。' },
  { term: '運転する', reading: 'うんてんする', meaning: 'Menyetir', example_sentence: '車を運転します。' },
  { term: '予約する', reading: 'よやくする', meaning: 'Memesan (Reservasi)', example_sentence: 'ホテルを予約します。' },
  { term: '散歩する', reading: 'さんぽする', meaning: 'Jalan-jalan', example_sentence: '公園を散歩します。' },
  { term: '買い物する', reading: 'かいものする', meaning: 'Berbelanja', example_sentence: 'スーパーで買い物します。' },
  { term: '結婚する', reading: 'けっこんする', meaning: 'Menikah', example_sentence: '来年結婚します。' },
  
  // Kata Sifat Lanjutan (Adjectives)
  { term: '甘い', reading: 'あまい', meaning: 'Manis', example_sentence: 'このケーキは甘いです。' },
  { term: '辛い', reading: 'からい', meaning: 'Pedas', example_sentence: 'カレーは辛いです。' },
  { term: '苦い', reading: 'にがい', meaning: 'Pahit', example_sentence: '薬は苦いです。' },
  { term: '塩辛い', reading: 'しおからい', meaning: 'Asin', example_sentence: 'このスープは塩辛いです。' },
  { term: '酸っぱい', reading: 'すっぱい', meaning: 'Asam', example_sentence: 'レモンは酸っぱいです。' },
  { term: '濃い', reading: 'こい', meaning: 'Pekat / Kental / Kuat (rasa/warna)', example_sentence: '味が濃いです。' },
  { term: '薄い', reading: 'うすい', meaning: 'Tipis / Hambar', example_sentence: '本が薄いです。' },
  { term: '太い', reading: 'ふとい', meaning: 'Tebal / Gemuk (benda)', example_sentence: '太いペン。' },
  { term: '細い', reading: 'ほそい', meaning: 'Tipis / Kurus (benda)', example_sentence: '細いペン。' },
  
  // Pakaian
  { term: '着る', reading: 'きる', meaning: 'Memakai (baju/atas)', example_sentence: 'シャツを着ます。' },
  { term: '履く', reading: 'はく', meaning: 'Memakai (sepatu/celana)', example_sentence: '靴を履きます。' },
  { term: '被る', reading: 'かぶる', meaning: 'Memakai (topi)', example_sentence: '帽子を被ります。' },
  { term: '掛ける', reading: 'かける', meaning: 'Memakai (kacamata)', example_sentence: '眼鏡を掛けます。' },
  { term: '脱ぐ', reading: 'ぬぐ', meaning: 'Melepas (pakaian/sepatu)', example_sentence: '靴を脱ぎます。' }
];

async function seedExtraVocab() {
  console.log('Fetching lesson ID...');
  const { data: lessons } = await supabase.from('lessons').select('id').limit(1);
  const lessonId = lessons![0].id;

  const { data: existing } = await supabase.from('vocab_items').select('term');
  const existingTerms = new Set(existing?.map(e => e.term) || []);

  const newVocabs = EXTRA_VOCAB.filter(v => !existingTerms.has(v.term));
  
  if (newVocabs.length === 0) return;

  const inserts = newVocabs.map(v => ({
    lesson_id: lessonId,
    term: v.term,
    reading: v.reading,
    meaning: v.meaning,
    example_sentence: v.example_sentence
  }));

  const { error } = await supabase.from('vocab_items').insert(inserts);
  if (!error) console.log(`✅ Successfully seeded ${newVocabs.length} MORE vocab items!`);
}

seedExtraVocab();
