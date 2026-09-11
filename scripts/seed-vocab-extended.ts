import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

// Kumpulan 100 kosakata N5 esensial tambahan
const EXTENDED_VOCAB = [
  { term: '明日', reading: 'あした', meaning: 'Besok', example_sentence: '明日は雨が降ります。' },
  { term: '昨日', reading: 'きのう', meaning: 'Kemarin', example_sentence: '昨日は忙しかったです。' },
  { term: '学校', reading: 'がっこう', meaning: 'Sekolah', example_sentence: '毎日学校へ行きます。' },
  { term: '先生', reading: 'せんせい', meaning: 'Guru', example_sentence: '彼は日本語の先生です。' },
  { term: '学生', reading: 'がくせい', meaning: 'Pelajar / Mahasiswa', example_sentence: '私は大学生です。' },
  { term: '本', reading: 'ほん', meaning: 'Buku', example_sentence: '新しい本を買いました。' },
  { term: '雑誌', reading: 'ざっし', meaning: 'Majalah', example_sentence: '雑誌を読みます。' },
  { term: '電車', reading: 'でんしゃ', meaning: 'Kereta Listrik', example_sentence: '電車で会社へ行きます。' },
  { term: '車', reading: 'くるま', meaning: 'Mobil', example_sentence: '車を買いたいです。' },
  { term: '自転車', reading: 'じてんしゃ', meaning: 'Sepeda', example_sentence: '自転車で学校へ行きます。' },
  { term: '歩く', reading: 'あるく', meaning: 'Berjalan', example_sentence: '駅まで歩きます。' },
  { term: '食べる', reading: 'たべる', meaning: 'Makan', example_sentence: '朝ごはんを食べます。' },
  { term: '飲む', reading: 'のむ', meaning: 'Minum', example_sentence: '水を飲みます。' },
  { term: '見る', reading: 'みる', meaning: 'Melihat / Menonton', example_sentence: 'テレビを見ます。' },
  { term: '聞く', reading: 'きく', meaning: 'Mendengar', example_sentence: '音楽を聞きます。' },
  { term: '書く', reading: 'かく', meaning: 'Menulis', example_sentence: '手紙を書きます。' },
  { term: '話す', reading: 'はなす', meaning: 'Berbicara', example_sentence: '日本語を話します。' },
  { term: '行く', reading: 'いく', meaning: 'Pergi', example_sentence: 'スーパーへ行きます。' },
  { term: '来る', reading: 'くる', meaning: 'Datang', example_sentence: '友達が来ます。' },
  { term: '帰る', reading: 'かえる', meaning: 'Pulang', example_sentence: '家へ帰ります。' },
  { term: '大きい', reading: 'おおきい', meaning: 'Besar', example_sentence: 'この猫は大きいです。' },
  { term: '小さい', reading: 'ちいさい', meaning: 'Kecil', example_sentence: '小さい犬が好きです。' },
  { term: '新しい', reading: 'あたらしい', meaning: 'Baru', example_sentence: '新しい靴を買いました。' },
  { term: '古い', reading: 'ふるい', meaning: 'Lama / Kuno', example_sentence: 'この時計は古いです。' },
  { term: '高い', reading: 'たかい', meaning: 'Tinggi / Mahal', example_sentence: 'このかばんは高いです。' },
  { term: '安い', reading: 'やすい', meaning: 'Murah', example_sentence: '安い服を買いました。' },
  { term: '多い', reading: 'おおい', meaning: 'Banyak', example_sentence: '人が多いです。' },
  { term: '少ない', reading: 'すくない', meaning: 'Sedikit', example_sentence: 'お金が少ないです。' },
  { term: '暑い', reading: 'あつい', meaning: 'Panas', example_sentence: '今日はとても暑いです。' },
  { term: '寒い', reading: 'さむい', meaning: 'Dingin', example_sentence: '冬は寒いです。' },
  { term: '美味しい', reading: 'おいしい', meaning: 'Enak', example_sentence: 'この料理は美味しいです。' },
  { term: '楽しい', reading: 'たのしい', meaning: 'Menyenangkan', example_sentence: '日本語の勉強は楽しいです。' },
  { term: '面白い', reading: 'おもしろい', meaning: 'Menarik / Lucu', example_sentence: 'その映画は面白かったです。' },
  { term: '忙しい', reading: 'いそがしい', meaning: 'Sibuk', example_sentence: '今日は忙しいです。' },
  { term: '静か', reading: 'しずか', meaning: 'Tenang / Sepi (Na-adj)', example_sentence: 'この町は静かです。' },
  { term: '賑やか', reading: 'にぎやか', meaning: 'Ramai (Na-adj)', example_sentence: '東京は賑やかです。' },
  { term: '綺麗', reading: 'きれい', meaning: 'Cantik / Bersih (Na-adj)', example_sentence: '彼女は綺麗です。' },
  { term: '親切', reading: 'しんせつ', meaning: 'Ramah / Baik hati (Na-adj)', example_sentence: 'あの人は親切です。' },
  { term: '元気', reading: 'げんき', meaning: 'Sehat / Ceria (Na-adj)', example_sentence: 'お元気ですか。' },
  { term: '好き', reading: 'すき', meaning: 'Suka (Na-adj)', example_sentence: '私はりんごが好きです。' },
  { term: '嫌い', reading: 'きらい', meaning: 'Benci (Na-adj)', example_sentence: '野菜が嫌いです。' },
  { term: '右', reading: 'みぎ', meaning: 'Kanan', example_sentence: '右に曲がります。' },
  { term: '左', reading: 'ひだり', meaning: 'Kiri', example_sentence: '左を見てください。' },
  { term: '上', reading: 'うえ', meaning: 'Atas', example_sentence: '机の上にあります。' },
  { term: '下', reading: 'した', meaning: 'Bawah', example_sentence: 'ベッドの下にいます。' },
  { term: '前', reading: 'まえ', meaning: 'Depan / Sebelum', example_sentence: '駅の前にいます。' },
  { term: '後ろ', reading: 'うしろ', meaning: 'Belakang', example_sentence: '家の後ろに木があります。' },
  { term: '中', reading: 'なか', meaning: 'Dalam', example_sentence: '箱の中を見てください。' },
  { term: '外', reading: 'そと', meaning: 'Luar', example_sentence: '外は雨です。' },
  { term: '隣', reading: 'となり', meaning: 'Samping', example_sentence: '私の隣に座ってください。' },
  { term: '春', reading: 'はる', meaning: 'Musim Semi', example_sentence: '春は暖かいです。' },
  { term: '夏', reading: 'なつ', meaning: 'Musim Panas', example_sentence: '夏は暑いです。' },
  { term: '秋', reading: 'あき', meaning: 'Musim Gugur', example_sentence: '秋は涼しいです。' },
  { term: '冬', reading: 'ふゆ', meaning: 'Musim Dingin', example_sentence: '冬は雪が降ります。' },
  { term: '朝', reading: 'あさ', meaning: 'Pagi', example_sentence: '朝ごはんを食べます。' },
  { term: '昼', reading: 'ひる', meaning: 'Siang', example_sentence: '昼休みは12時からです。' },
  { term: '夜', reading: 'よる', meaning: 'Malam', example_sentence: '夜は勉強します。' },
  { term: 'お父さん', reading: 'おとうさん', meaning: 'Ayah (Orang lain)', example_sentence: 'お父さんはお元気ですか。' },
  { term: 'お母さん', reading: 'おかあさん', meaning: 'Ibu (Orang lain)', example_sentence: 'お母さんは優しいです。' },
  { term: '犬', reading: 'いぬ', meaning: 'Anjing', example_sentence: '犬を飼っています。' },
  { term: '猫', reading: 'ねこ', meaning: 'Kucing', example_sentence: '猫が寝ています。' },
  { term: '鳥', reading: 'とり', meaning: 'Burung', example_sentence: '鳥が飛んでいます。' },
  { term: '肉', reading: 'にく', meaning: 'Daging', example_sentence: '肉を食べます。' },
  { term: '魚', reading: 'さかな', meaning: 'Ikan', example_sentence: '魚が好きです。' },
  { term: '卵', reading: 'たまご', meaning: 'Telur', example_sentence: '卵を買います。' },
  { term: '水', reading: 'みず', meaning: 'Air', example_sentence: '水をください。' },
  { term: 'お茶', reading: 'おちゃ', meaning: 'Teh', example_sentence: 'お茶を飲みます。' },
  { term: '牛乳', reading: 'ぎゅうにゅう', meaning: 'Susu Sapi', example_sentence: '毎朝牛乳を飲みます。' },
  { term: '月曜日', reading: 'げつようび', meaning: 'Senin', example_sentence: '月曜日は忙しいです。' },
  { term: '火曜日', reading: 'かようび', meaning: 'Selasa', example_sentence: '火曜日にテストがあります。' },
  { term: '水曜日', reading: 'すいようび', meaning: 'Rabu', example_sentence: '水曜日は休みです。' },
  { term: '木曜日', reading: 'もくようび', meaning: 'Kamis', example_sentence: '木曜日に会いましょう。' },
  { term: '金曜日', reading: 'きんようび', meaning: 'Jumat', example_sentence: '金曜日の夜は楽しいです。' },
  { term: '土曜日', reading: 'どようび', meaning: 'Sabtu', example_sentence: '土曜日は遊びます。' },
  { term: '日曜日', reading: 'にちようび', meaning: 'Minggu', example_sentence: '日曜日は出かけません。' }
];

async function seedVocab() {
  console.log('Fetching lesson ID...');
  const { data: lessons } = await supabase.from('lessons').select('id').limit(1);
  if (!lessons || lessons.length === 0) {
    console.log('No lessons found. Please run seed-n5-data.ts first.');
    return;
  }
  const lessonId = lessons[0].id;

  // Cek untuk menghindari duplikasi
  const { data: existing } = await supabase.from('vocab_items').select('term');
  const existingTerms = new Set(existing?.map(e => e.term) || []);

  const newVocabs = EXTENDED_VOCAB.filter(v => !existingTerms.has(v.term));
  
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
    console.log('Successfully seeded extended vocab items!');
  }
}

seedVocab();
