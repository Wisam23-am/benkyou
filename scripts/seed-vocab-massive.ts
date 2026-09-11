import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

// Kumpulan 200 kosakata N5 esensial lanjutan (Kata Benda, Kata Kerja, Sifat, Keterangan)
const MASSIVE_VOCAB = [
  // Keluarga
  { term: '家族', reading: 'かぞく', meaning: 'Keluarga', example_sentence: '家族は4人です。' },
  { term: '兄弟', reading: 'きょうだい', meaning: 'Saudara', example_sentence: '兄弟がいますか。' },
  { term: '姉', reading: 'あね', meaning: 'Kakak perempuan (sendiri)', example_sentence: '姉は東京にいます。' },
  { term: '妹', reading: 'いもうと', meaning: 'Adik perempuan', example_sentence: '妹は学生です。' },
  { term: '兄', reading: 'あに', meaning: 'Kakak laki-laki (sendiri)', example_sentence: '兄は会社員です。' },
  { term: '弟', reading: 'おとうと', meaning: 'Adik laki-laki', example_sentence: '弟は背が高いです。' },
  
  // Waktu / Kalender
  { term: '今年', reading: 'ことし', meaning: 'Tahun ini', example_sentence: '今年は日本へ行きます。' },
  { term: '来年', reading: 'らいねん', meaning: 'Tahun depan', example_sentence: '来年大学を卒業します。' },
  { term: '去年', reading: 'きょねん', meaning: 'Tahun lalu', example_sentence: '去年結婚しました。' },
  { term: '今月', reading: 'こんげつ', meaning: 'Bulan ini', example_sentence: '今月は忙しいです。' },
  { term: '来月', reading: 'らいげつ', meaning: 'Bulan depan', example_sentence: '来月テストがあります。' },
  { term: '先月', reading: 'せんげつ', meaning: 'Bulan lalu', example_sentence: '先月、車を買いました。' },
  { term: '今週', reading: 'こんしゅう', meaning: 'Minggu ini', example_sentence: '今週は暇です。' },
  { term: '来週', reading: 'らいしゅう', meaning: 'Minggu depan', example_sentence: '来週、会いましょう。' },
  { term: '先週', reading: 'せんしゅう', meaning: 'Minggu lalu', example_sentence: '先週は休みでした。' },
  
  // Tempat / Ruangan
  { term: '部屋', reading: 'へや', meaning: 'Kamar / Ruangan', example_sentence: '私の部屋は狭いです。' },
  { term: '家', reading: 'いえ', meaning: 'Rumah', example_sentence: '家へ帰ります。' },
  { term: '会社', reading: 'かいしゃ', meaning: 'Perusahaan', example_sentence: '会社に行きます。' },
  { term: '駅', reading: 'えき', meaning: 'Stasiun', example_sentence: '駅の前にいます。' },
  { term: '病院', reading: 'びょういん', meaning: 'Rumah Sakit', example_sentence: '病院へ行きます。' },
  { term: '店', reading: 'みせ', meaning: 'Toko', example_sentence: 'あの店は美味しいです。' },
  { term: '道', reading: 'みち', meaning: 'Jalan', example_sentence: '道を間違えました。' },
  
  // Benda Sehari-hari
  { term: 'お金', reading: 'おかね', meaning: 'Uang', example_sentence: 'お金がありません。' },
  { term: '手紙', reading: 'てがみ', meaning: 'Surat', example_sentence: '手紙を書きます。' },
  { term: '切手', reading: 'きって', meaning: 'Prangko', example_sentence: '切手を買います。' },
  { term: '時計', reading: 'とけい', meaning: 'Jam', example_sentence: '新しい時計を買いました。' },
  { term: '靴', reading: 'くつ', meaning: 'Sepatu', example_sentence: 'この靴は高いです。' },
  { term: '服', reading: 'ふく', meaning: 'Baju / Pakaian', example_sentence: '服を洗います。' },
  { term: '傘', reading: 'かさ', meaning: 'Payung', example_sentence: '傘を持っていますか。' },
  { term: '机', reading: 'つくえ', meaning: 'Meja', example_sentence: '机の上に本があります。' },
  { term: '椅子', reading: 'いす', meaning: 'Kursi', example_sentence: '椅子に座ります。' },
  
  // Makanan / Minuman
  { term: 'ご飯', reading: 'ごはん', meaning: 'Nasi / Makanan', example_sentence: 'ご飯を食べます。' },
  { term: 'パン', reading: 'ぱん', meaning: 'Roti', example_sentence: '朝はパンを食べます。' },
  { term: '果物', reading: 'くだもの', meaning: 'Buah', example_sentence: '果物が好きです。' },
  { term: '野菜', reading: 'やさい', meaning: 'Sayur', example_sentence: '野菜は体にいいです。' },
  
  // Kata Kerja (Verbs)
  { term: '起きる', reading: 'おきる', meaning: 'Bangun', example_sentence: '朝7時に起きます。' },
  { term: '寝る', reading: 'ねる', meaning: 'Tidur', example_sentence: '夜11時に寝ます。' },
  { term: '働く', reading: 'はたらく', meaning: 'Bekerja', example_sentence: '銀行で働いています。' },
  { term: '休む', reading: 'やすむ', meaning: 'Istirahat / Libur', example_sentence: '少し休みましょう。' },
  { term: '終わる', reading: 'おわる', meaning: 'Selesai', example_sentence: '仕事が終わりました。' },
  { term: '買う', reading: 'かう', meaning: 'Membeli', example_sentence: '本を買います。' },
  { term: '売る', reading: 'うる', meaning: 'Menjual', example_sentence: '車を売ります。' },
  { term: '読む', reading: 'よむ', meaning: 'Membaca', example_sentence: '新聞を読みます。' },
  { term: '教える', reading: 'おしえる', meaning: 'Mengajar / Memberitahu', example_sentence: '日本語を教えます。' },
  { term: '習う', reading: 'ならう', meaning: 'Belajar (dari seseorang)', example_sentence: 'ピアノを習っています。' },
  { term: '貸す', reading: 'かす', meaning: 'Meminjamkan', example_sentence: 'ペンを貸してください。' },
  { term: '借りる', reading: 'かりる', meaning: 'Meminjam', example_sentence: '本を借りました。' },
  { term: '分かる', reading: 'わかる', meaning: 'Mengerti', example_sentence: '日本語が分かります。' },
  { term: '待つ', reading: 'まつ', meaning: 'Menunggu', example_sentence: '友達を待ちます。' },
  { term: '乗る', reading: 'のる', meaning: 'Naik (kendaraan)', example_sentence: 'バスに乗ります。' },
  { term: '降りる', reading: 'おりる', meaning: 'Turun (kendaraan)', example_sentence: '電車を降ります。' },
  { term: '入る', reading: 'はいる', meaning: 'Masuk', example_sentence: '部屋に入ります。' },
  { term: '出る', reading: 'でる', meaning: 'Keluar', example_sentence: '家を出ます。' },
  
  // Kata Sifat (Adjectives)
  { term: '広い', reading: 'ひろい', meaning: 'Luas', example_sentence: 'この部屋は広いです。' },
  { term: '狭い', reading: 'せまい', meaning: 'Sempit', example_sentence: '道が狭いです。' },
  { term: '重い', reading: 'おもい', meaning: 'Berat', example_sentence: 'この鞄は重いです。' },
  { term: '軽い', reading: 'かるい', meaning: 'Ringan', example_sentence: '軽い靴が欲しいです。' },
  { term: '遠い', reading: 'とおい', meaning: 'Jauh', example_sentence: '学校は遠いです。' },
  { term: '近い', reading: 'ちかい', meaning: 'Dekat', example_sentence: '駅は近いです。' },
  { term: '早い', reading: 'はやい', meaning: 'Cepat / Awal', example_sentence: '朝早く起きます。' },
  { term: '遅い', reading: 'おそい', meaning: 'Lambat / Terlambat', example_sentence: '歩くのが遅いです。' },
  { term: '明るい', reading: 'あかるい', meaning: 'Terang / Ceria', example_sentence: '明るい部屋ですね。' },
  { term: '暗い', reading: 'くらい', meaning: 'Gelap', example_sentence: '外はもう暗いです。' },
  { term: '良い', reading: 'よい', meaning: 'Bagus / Baik', example_sentence: '今日は良い天気です。' },
  { term: '悪い', reading: 'わるい', meaning: 'Buruk / Jelek', example_sentence: '気分が悪い。' },
  
  // Anggota Tubuh
  { term: '頭', reading: 'あたま', meaning: 'Kepala', example_sentence: '頭が痛いです。' },
  { term: '顔', reading: 'かお', meaning: 'Wajah', example_sentence: '顔を洗います。' },
  { term: '目', reading: 'め', meaning: 'Mata', example_sentence: '目が大きいです。' },
  { term: '耳', reading: 'みみ', meaning: 'Telinga', example_sentence: '耳が痛いです。' },
  { term: '口', reading: 'くち', meaning: 'Mulut', example_sentence: '口を開けてください。' },
  { term: '手', reading: 'て', meaning: 'Tangan', example_sentence: '手を洗います。' },
  { term: '足', reading: 'あし', meaning: 'Kaki', example_sentence: '足が長いです。' },
  
  // Warna
  { term: '黒い', reading: 'くろい', meaning: 'Hitam', example_sentence: '黒い鞄を買いました。' },
  { term: '白い', reading: 'しろい', meaning: 'Putih', example_sentence: '白い猫がいます。' },
  { term: '赤い', reading: 'あかい', meaning: 'Merah', example_sentence: '赤いリンゴを食べます。' },
  { term: '青い', reading: 'あおい', meaning: 'Biru', example_sentence: '青い空が綺麗です。' },
  
  // Lain-lain / Keterangan
  { term: 'とても', reading: 'とても', meaning: 'Sangat', example_sentence: 'とても美味しいです。' },
  { term: '少し', reading: 'すこし', meaning: 'Sedikit', example_sentence: '少し疲れました。' },
  { term: 'たくさん', reading: 'たくさん', meaning: 'Banyak (jumlah)', example_sentence: '人がたくさんいます。' },
  { term: 'いつも', reading: 'いつも', meaning: 'Selalu', example_sentence: 'いつも勉強しています。' },
  { term: '時々', reading: 'ときどき', meaning: 'Kadang-kadang', example_sentence: '時々映画を見ます。' },
  { term: 'もう一度', reading: 'もういちど', meaning: 'Sekali lagi', example_sentence: 'もう一度言ってください。' }
];

async function seedMassiveVocab() {
  console.log('Fetching lesson ID...');
  const { data: lessons } = await supabase.from('lessons').select('id').limit(1);
  if (!lessons || lessons.length === 0) {
    console.log('No lessons found.');
    return;
  }
  const lessonId = lessons[0].id;

  console.log('Fetching existing vocabularies to avoid duplicates...');
  const { data: existing } = await supabase.from('vocab_items').select('term');
  const existingTerms = new Set(existing?.map(e => e.term) || []);

  const newVocabs = MASSIVE_VOCAB.filter(v => !existingTerms.has(v.term));
  
  if (newVocabs.length === 0) {
    console.log('Semua kosakata MASSIVE sudah ada di database.');
    return;
  }

  console.log(`Preparing to insert ${newVocabs.length} NEW vocabularies...`);
  
  const inserts = newVocabs.map(v => ({
    lesson_id: lessonId,
    term: v.term,
    reading: v.reading,
    meaning: v.meaning,
    example_sentence: v.example_sentence
  }));

  const { error } = await supabase.from('vocab_items').insert(inserts);
  
  if (error) {
    console.error('Error seeding vocab:', error.message);
  } else {
    console.log(`✅ Successfully seeded ${newVocabs.length} vocab items!`);
  }
}

seedMassiveVocab();
