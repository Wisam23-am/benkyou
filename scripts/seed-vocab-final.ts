import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

// Kumpulan 100 kosakata N5 esensial lanjutan
const MORE_VOCAB = [
  // Interrogatives (Kata Tanya)
  { term: '何', reading: 'なに', meaning: 'Apa', example_sentence: 'これは何ですか。' },
  { term: '誰', reading: 'だれ', meaning: 'Siapa', example_sentence: 'あの人は誰ですか。' },
  { term: 'どこ', reading: 'どこ', meaning: 'Di mana', example_sentence: 'トイレはどこですか。' },
  { term: 'いつ', reading: 'いつ', meaning: 'Kapan', example_sentence: '誕生日はいつですか。' },
  { term: 'どうして', reading: 'どうして', meaning: 'Kenapa', example_sentence: 'どうして遅れましたか。' },
  { term: 'どう', reading: 'どう', meaning: 'Bagaimana', example_sentence: 'この料理はどうですか。' },
  { term: 'いくら', reading: 'いくら', meaning: 'Berapa (harga)', example_sentence: 'この鞄はいくらですか。' },
  { term: 'いくつ', reading: 'いくつ', meaning: 'Berapa banyak (umur/benda)', example_sentence: 'りんごはいくつありますか。' },

  // Numbers (Angka) - Core representations
  { term: 'ゼロ', reading: 'ゼロ', meaning: 'Nol', example_sentence: 'ゼロから始めます。' },
  { term: '百', reading: 'ひゃく', meaning: 'Seratus', example_sentence: '百円です。' },
  { term: '千', reading: 'せん', meaning: 'Seribu', example_sentence: '千円を払います。' },
  { term: '万', reading: 'まん', meaning: 'Sepuluh ribu', example_sentence: '一万円かかります。' },

  // Hari dan Tanggal khusus
  { term: '一日', reading: 'ついたち', meaning: 'Tanggal 1', example_sentence: '五月一日です。' },
  { term: '二日', reading: 'ふつか', meaning: 'Tanggal 2 / Dua hari', example_sentence: '二日間休みます。' },
  { term: '三日', reading: 'みっか', meaning: 'Tanggal 3 / Tiga hari', example_sentence: '三日かかります。' },
  { term: '四日', reading: 'よっか', meaning: 'Tanggal 4 / Empat hari', example_sentence: '四日待ってください。' },
  { term: '五日', reading: 'いつか', meaning: 'Tanggal 5 / Lima hari', example_sentence: '五日に行きます。' },
  { term: '六日', reading: 'むいか', meaning: 'Tanggal 6 / Enam hari', example_sentence: '六日は予定があります。' },
  { term: '七日', reading: 'なのか', meaning: 'Tanggal 7 / Tujuh hari', example_sentence: '七日後に帰ります。' },
  { term: '八日', reading: 'ようか', meaning: 'Tanggal 8 / Delapan hari', example_sentence: '八日までに必要です。' },
  { term: '九日', reading: 'ここのか', meaning: 'Tanggal 9 / Sembilan hari', example_sentence: '九日は日曜日です。' },
  { term: '十日', reading: 'とおか', meaning: 'Tanggal 10 / Sepuluh hari', example_sentence: '十日休みます。' },
  { term: '二十日', reading: 'はつか', meaning: 'Tanggal 20 / Dua puluh hari', example_sentence: '二十日に会いましょう。' },

  // Makanan & Minuman
  { term: '水', reading: 'みず', meaning: 'Air', example_sentence: '水を飲みます。' },
  { term: 'お茶', reading: 'おちゃ', meaning: 'Teh Hijau', example_sentence: 'お茶をどうぞ。' },
  { term: '紅茶', reading: 'こうちゃ', meaning: 'Teh Hitam', example_sentence: '紅茶が好きです。' },
  { term: 'お酒', reading: 'おさけ', meaning: 'Sake / Alkohol', example_sentence: 'お酒を飲みません。' },
  { term: '牛肉', reading: 'ぎゅうにく', meaning: 'Daging sapi', example_sentence: '牛肉を買います。' },
  { term: '豚肉', reading: 'ぶたにく', meaning: 'Daging babi', example_sentence: '豚肉を食べます。' },
  { term: '鶏肉', reading: 'とりにく', meaning: 'Daging ayam', example_sentence: '鶏肉が安いです。' },
  { term: '料理', reading: 'りょうり', meaning: 'Masakan / Memasak', example_sentence: '料理を作ります。' },

  // Hobi & Aktivitas
  { term: '音楽', reading: 'おんがく', meaning: 'Musik', example_sentence: '音楽が好きです。' },
  { term: '歌', reading: 'うた', meaning: 'Lagu', example_sentence: '歌を歌います。' },
  { term: '映画', reading: 'えいが', meaning: 'Film', example_sentence: '映画を見ます。' },
  { term: '写真', reading: 'しゃしん', meaning: 'Foto', example_sentence: '写真を撮ります。' },
  { term: '手紙', reading: 'てがみ', meaning: 'Surat', example_sentence: '手紙を書きます。' },
  { term: '旅行', reading: 'りょこう', meaning: 'Perjalanan / Wisata', example_sentence: '旅行へ行きます。' },

  // Transportasi
  { term: '車', reading: 'くるま', meaning: 'Mobil', example_sentence: '車で行きます。' },
  { term: '自転車', reading: 'じてんしゃ', meaning: 'Sepeda', example_sentence: '自転車に乗ります。' },
  { term: '飛行機', reading: 'ひこうき', meaning: 'Pesawat', example_sentence: '飛行機は速いです。' },
  { term: '船', reading: 'ふね', meaning: 'Kapal', example_sentence: '船で海を渡ります。' },
  { term: '地下鉄', reading: 'ちかてつ', meaning: 'Kereta Bawah Tanah', example_sentence: '地下鉄に乗ります。' },

  // Benda Sekolah / Alat
  { term: '鉛筆', reading: 'えんぴつ', meaning: 'Pensil', example_sentence: '鉛筆で書きます。' },
  { term: '辞書', reading: 'じしょ', meaning: 'Kamus', example_sentence: '辞書を引きます。' },
  { term: '鞄', reading: 'かばん', meaning: 'Tas', example_sentence: '鞄が重いです。' },
  { term: '紙', reading: 'かみ', meaning: 'Kertas', example_sentence: '紙をください。' },
  { term: '窓', reading: 'まど', meaning: 'Jendela', example_sentence: '窓を開けます。' },
  { term: 'ドア', reading: 'ドア', meaning: 'Pintu', example_sentence: 'ドアを閉めます。' },

  // Profesi & Orang
  { term: '医者', reading: 'いしゃ', meaning: 'Dokter', example_sentence: '医者になります。' },
  { term: '学生', reading: 'がくせい', meaning: 'Siswa / Mahasiswa', example_sentence: '彼は学生です。' },
  { term: '先生', reading: 'せんせい', meaning: 'Guru', example_sentence: '先生に聞きます。' },
  { term: '男の子', reading: 'おとこのこ', meaning: 'Anak Laki-laki', example_sentence: '男の子が走っています。' },
  { term: '女の子', reading: 'おんなのこ', meaning: 'Anak Perempuan', example_sentence: '女の子が遊んでいます。' },
  { term: '大人', reading: 'おとな', meaning: 'Orang Dewasa', example_sentence: '大人は千円です。' },

  // Arah & Letak (Sisa)
  { term: '右', reading: 'みぎ', meaning: 'Kanan', example_sentence: '右に曲がります。' },
  { term: '左', reading: 'ひだり', meaning: 'Kiri', example_sentence: '左を見てください。' },
  { term: '東', reading: 'ひがし', meaning: 'Timur', example_sentence: '東の空が明るいです。' },
  { term: '西', reading: 'にし', meaning: 'Barat', example_sentence: '西に山があります。' },
  { term: '南', reading: 'みなみ', meaning: 'Selatan', example_sentence: '南へ行きます。' },
  { term: '北', reading: 'きた', meaning: 'Utara', example_sentence: '北は寒いです。' },

  // Alam
  { term: '天気', reading: 'てんき', meaning: 'Cuaca', example_sentence: '天気がいいです。' },
  { term: '雨', reading: 'あめ', meaning: 'Hujan', example_sentence: '雨が降っています。' },
  { term: '雪', reading: 'ゆき', meaning: 'Salju', example_sentence: '雪が白いです。' },
  { term: '風', reading: 'かぜ', meaning: 'Angin', example_sentence: '風が強いです。' },
  { term: '空', reading: 'そら', meaning: 'Langit', example_sentence: '空が青いです。' },
  { term: '山', reading: 'やま', meaning: 'Gunung', example_sentence: '山に登ります。' },
  { term: '川', reading: 'かわ', meaning: 'Sungai', example_sentence: '川で泳ぎます。' },
  { term: '海', reading: 'うみ', meaning: 'Laut', example_sentence: '海が好きです。' },
  { term: '木', reading: 'き', meaning: 'Pohon', example_sentence: '木が大きいです。' },
  { term: '花', reading: 'はな', meaning: 'Bunga', example_sentence: '花が咲きます。' },
  { term: '道', reading: 'みち', meaning: 'Jalan', example_sentence: '道を歩きます。' }
];

async function seedMoreVocab() {
  console.log('Fetching lesson ID...');
  const { data: lessons } = await supabase.from('lessons').select('id').limit(1);
  if (!lessons || lessons.length === 0) {
    console.log('No lessons found.');
    return;
  }
  const lessonId = lessons[0].id;

  console.log('Fetching existing vocabularies...');
  const { data: existing } = await supabase.from('vocab_items').select('term');
  const existingTerms = new Set(existing?.map(e => e.term) || []);

  const newVocabs = MORE_VOCAB.filter(v => !existingTerms.has(v.term));
  
  if (newVocabs.length === 0) {
    console.log('Semua kosakata sudah ada di database.');
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

seedMoreVocab();
