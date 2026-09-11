import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

// Kumpulan 120+ Kosakata (Kotoba) N5 Tambahan Lengkap
const SUPER_VOCAB = [
  // --- KATA KERJA (VERBS) ---
  { term: '行く', reading: 'いく', meaning: 'Pergi', example_sentence: '東京へ行きます。' },
  { term: '来る', reading: 'くる', meaning: 'Datang', example_sentence: '友達が家に来ます。' },
  { term: '帰る', reading: 'かえる', meaning: 'Pulang', example_sentence: 'うちに帰ります。' },
  { term: '話す', reading: 'はなす', meaning: 'Berbicara', example_sentence: '日本語で話します。' },
  { term: '言う', reading: 'いう', meaning: 'Mengatakan / Berkata', example_sentence: '「ありがとう」と言いました。' },
  { term: '読む', reading: 'よむ', meaning: 'Membaca', example_sentence: '新聞を読みます。' },
  { term: '書く', reading: 'かく', meaning: 'Menulis', example_sentence: '日記を書きます。' },
  { term: '聞く', reading: 'きく', meaning: 'Mendengarkan / Bertanya', example_sentence: 'ラジオを聞きます。' },
  { term: '見る', reading: 'みる', meaning: 'Melihat / Menonton', example_sentence: 'アニメを見ます。' },
  { term: '食べる', reading: 'たべる', meaning: 'Makan', example_sentence: '朝ごはんを食べます。' },
  { term: '飲む', reading: 'のむ', meaning: 'Minum', example_sentence: 'ジュースを飲みます。' },
  { term: '寝る', reading: 'ねる', meaning: 'Tidur', example_sentence: '11時に寝ます。' },
  { term: '起きる', reading: 'おきる', meaning: 'Bangun tidur', example_sentence: '毎朝6時に起きます。' },
  { term: '会う', reading: 'あう', meaning: 'Bertemu', example_sentence: '駅で友達に会います。' },
  { term: '遊ぶ', reading: 'あそぶ', meaning: 'Bermain / Bersenang-senang', example_sentence: '公園で遊びます。' },
  { term: '泳ぐ', reading: 'およぐ', meaning: 'Berenang', example_sentence: 'プールで泳ぎます。' },
  { term: '買う', reading: 'かう', meaning: 'Membeli', example_sentence: '靴を買いました。' },
  { term: '売る', reading: 'うる', meaning: 'Menjual', example_sentence: '野菜を売っています。' },
  { term: '待つ', reading: 'まつ', meaning: 'Menunggu', example_sentence: 'ここで待ってください。' },
  { term: '持つ', reading: 'もつ', meaning: 'Membawa / Memiliki', example_sentence: '荷物を持ちます。' },
  { term: '取る', reading: 'とる', meaning: 'Mengambil', example_sentence: '塩を取ってください。' },
  { term: '置く', reading: 'おく', meaning: 'Meletakkan / Menaruh', example_sentence: '机の上に本を置きます。' },
  { term: '貸す', reading: 'かす', meaning: 'Meminjamkan', example_sentence: 'ペンを貸してください。' },
  { term: '借りる', reading: 'かりる', meaning: 'Meminjam', example_sentence: '図書館で本を借ります。' },
  { term: '教える', reading: 'おしえる', meaning: 'Mengajar / Memberitahu', example_sentence: '英語を教えます。' },
  { term: '習う', reading: 'ならう', meaning: 'Belajar (dari orang)', example_sentence: 'ピアノを習っています。' },
  { term: '忘れる', reading: 'わすれる', meaning: 'Lupa', example_sentence: '宿題を忘れました。' },
  { term: '覚える', reading: 'おぼえる', meaning: 'Mengingat / Menghafal', example_sentence: '漢字を覚えます。' },
  { term: '出かける', reading: 'でかける', meaning: 'Bepergian keluar', example_sentence: '午後から出かけます。' },
  { term: '入る', reading: 'はいる', meaning: 'Masuk', example_sentence: 'お風呂に入ります。' },
  { term: '出る', reading: 'でる', meaning: 'Keluar / Meninggalkan', example_sentence: '家を出ます。' },
  { term: '開ける', reading: 'あける', meaning: 'Membuka', example_sentence: 'ドアを開けてください。' },
  { term: '閉める', reading: 'しめる', meaning: 'Menutup', example_sentence: '窓を閉めます。' },
  { term: 'つける', reading: 'つける', meaning: 'Menyalakan (lampu/AC)', example_sentence: 'エアコンをつけます。' },
  { term: '消す', reading: 'けす', meaning: 'Mematikan / Menghapus', example_sentence: '電気を消してください。' },
  { term: '始まる', reading: 'はじまる', meaning: 'Dimulai', example_sentence: '授業が始まります。' },
  { term: '終わる', reading: 'おわる', meaning: 'Selesai / Berakhir', example_sentence: '仕事が終わりました。' },
  { term: '座る', reading: 'すわる', meaning: 'Duduk', example_sentence: '椅子に座ってください。' },
  { term: '立つ', reading: 'たつ', meaning: 'Berdiri', example_sentence: '席を立ちます。' },
  { term: '働く', reading: 'はたらく', meaning: 'Bekerja', example_sentence: '会社で働いています。' },
  { term: '休む', reading: 'やすむ', meaning: 'Istirahat / Libur', example_sentence: '少し休みましょう。' },

  // --- KATA SIFAT (ADJECTIVES) ---
  { term: '楽しい', reading: 'たのしい', meaning: 'Menyenangkan', example_sentence: '旅行はとても楽しかったです。' },
  { term: '面白い', reading: 'おもしろい', meaning: 'Menarik / Lucu', example_sentence: 'この本は面白いです。' },
  { term: 'つまらない', reading: 'つまらない', meaning: 'Membosankan', example_sentence: '昨日の映画はつまらなかったです。' },
  { term: '難しい', reading: 'むずかしい', meaning: 'Sulit / Sukar', example_sentence: '日本語の漢字は難しいです。' },
  { term: '易しい', reading: 'やさしい', meaning: 'Mudah / Gampang', example_sentence: 'このテストは易しいです。' },
  { term: '優しい', reading: 'やさしい', meaning: 'Baik hati / Ramah', example_sentence: '田中先生はとても優しいです。' },
  { term: '近い', reading: 'ちかい', meaning: 'Dekat', example_sentence: '駅は家から近いです。' },
  { term: '遠い', reading: 'とおい', meaning: 'Jauh', example_sentence: '学校はここから遠いです。' },
  { term: '早い', reading: 'はやい', meaning: 'Cepat / Pagi (waktu)', example_sentence: '今朝は早く起きました。' },
  { term: '速い', reading: 'はやい', meaning: 'Cepat (laju kecepatan)', example_sentence: '新幹線は速いです。' },
  { term: '遅い', reading: 'おそい', meaning: 'Lambat / Terlambat', example_sentence: '足が遅いです。' },
  { term: '忙しい', reading: 'いそがしい', meaning: 'Sibuk', example_sentence: '今日はとても忙しいです。' },
  { term: '暇', reading: 'ひま', meaning: 'Senggang / Luang', example_sentence: '明日は暇ですか。' },
  { term: '静か', reading: 'しずか', meaning: 'Tenang / Sunyi', example_sentence: '夜の町は静かです。' },
  { term: '賑やか', reading: 'にぎやか', meaning: 'Ramai / Meriah', example_sentence: '祭りはとても賑やかでした。' },
  { term: '親切', reading: 'しんせつ', meaning: 'Ramah / Suka menolong', example_sentence: '日本の人は親切です。' },
  { term: '元気', reading: 'げんき', meaning: 'Sehat / Semangat', example_sentence: 'お元気ですか。' },
  { term: '有名', reading: 'ゆうめい', meaning: 'Terkenal', example_sentence: '富士山は有名です。' },
  { term: '好き', reading: 'すき', meaning: 'Suka', example_sentence: '果物が好きです。' },
  { term: '嫌い', reading: 'きらい', meaning: 'Benci / Tidak suka', example_sentence: '魚が嫌いです。' },
  { term: '上手', reading: 'じょうず', meaning: 'Pintar / Mahir', example_sentence: '歌が上手ですね。' },
  { term: '下手', reading: 'へた', meaning: 'Kurang mahir / Payah', example_sentence: '料理が下手です。' },
  { term: '便利', reading: 'べんり', meaning: 'Praktis / Nyaman', example_sentence: 'スマホはとても便利です。' },
  { term: '不便', reading: 'ふべん', meaning: 'Tidak praktis', example_sentence: '車がないと不便です。' },
  { term: '大切', reading: 'たいせつ', meaning: 'Penting / Berharga', example_sentence: '家族は大切です。' },

  // --- KELUARGA & ORANG (FAMILY & PEOPLE) ---
  { term: '家族', reading: 'かぞく', meaning: 'Keluarga', example_sentence: '家族と一緒に住んでいます。' },
  { term: '両親', reading: 'りょうしん', meaning: 'Kedua Orang Tua', example_sentence: '両親に手紙を送ります。' },
  { term: '父', reading: 'ちち', meaning: 'Ayah (saya)', example_sentence: '父は会社員です。' },
  { term: '母', reading: 'はは', meaning: 'Ibu (saya)', example_sentence: '母の料理は美味しいです。' },
  { term: 'お父さん', reading: 'おとうさん', meaning: 'Ayah (orang lain/panggilan)', example_sentence: 'お父さんはお元気ですか。' },
  { term: 'お母さん', reading: 'おかあさん', meaning: 'Ibu (orang lain/panggilan)', example_sentence: 'お母さんに電話します。' },
  { term: '兄', reading: 'あに', meaning: 'Kakak Laki-laki (saya)', example_sentence: '兄は大学生です。' },
  { term: 'お兄さん', reading: 'おにいさん', meaning: 'Kakak Laki-laki (orang lain)', example_sentence: 'お兄さんは背が高いですね。' },
  { term: '姉', reading: 'あね', meaning: 'Kakak Perempuan (saya)', example_sentence: '姉は結婚しています。' },
  { term: 'お姉さん', reading: 'おねえさん', meaning: 'Kakak Perempuan (orang lain)', example_sentence: 'お姉さんは優しいです。' },
  { term: '弟', reading: 'おとうと', meaning: 'Adik Laki-laki', example_sentence: '弟とサッカーをします。' },
  { term: '妹', reading: 'いもうと', meaning: 'Adik Perempuan', example_sentence: '妹は高校生です。' },
  { term: '兄弟', reading: 'きょうだい', meaning: 'Saudara Kandung', example_sentence: '兄弟は何人ですか。' },
  { term: '友達', reading: 'ともだち', meaning: 'Teman / Sahabat', example_sentence: '友達と遊びに行きます。' },

  // --- BENDA RUMAH & SEKOLAH (OBJECTS & PLACES) ---
  { term: '部屋', reading: 'へや', meaning: 'Kamar / Ruangan', example_sentence: '部屋を掃除します。' },
  { term: '机', reading: 'つくえ', meaning: 'Meja tulis', example_sentence: '机の上に本があります。' },
  { term: '椅子', reading: 'いす', meaning: 'Kursi', example_sentence: '椅子に座ります。' },
  { term: '時計', reading: 'とけい', meaning: 'Jam dinding / Jam tangan', example_sentence: '時計を見ます。' },
  { term: '鍵', reading: 'かぎ', meaning: 'Kunci', example_sentence: '鍵をかけます。' },
  { term: '電話', reading: 'でんわ', meaning: 'Telepon', example_sentence: '電話がかかってきました。' },
  { term: '傘', reading: 'かさ', meaning: 'Payung', example_sentence: '傘を持っていきます。' },
  { term: '財布', reading: 'さいふ', meaning: 'Dompet', example_sentence: '財布を忘れました。' },
  { term: '雑誌', reading: 'ざっし', meaning: 'Majalah', example_sentence: '雑誌を読みます。' },
  { term: '新聞', reading: 'しんぶん', meaning: 'Koran', example_sentence: '毎朝新聞を読みます。' },
  { term: '切手', reading: 'きって', meaning: 'Prangko', example_sentence: '切手を貼ります。' },
  { term: '教室', reading: 'きょうしつ', meaning: 'Ruang Kelas', example_sentence: '教室に入ります。' },
  { term: '食堂', reading: 'しょくどう', meaning: 'Kantin / Ruang Makan', example_sentence: '食堂で昼ごはんを食べます。' },
  { term: '階段', reading: 'かいだん', meaning: 'Tangga', example_sentence: '階段を上がります。' },

  // --- WAKTU & KETERANGAN (TIME & ADVERBS) ---
  { term: '今朝', reading: 'けさ', meaning: 'Tadi pagi', example_sentence: '今朝はパンを食べました。' },
  { term: '今晩', reading: 'こんばん', meaning: 'Malam ini', example_sentence: '今晩勉強します。' },
  { term: '夕方', reading: 'ゆうがた', meaning: 'Sore hari', example_sentence: '夕方に散歩します。' },
  { term: '夜', reading: 'よる', meaning: 'Malam hari', example_sentence: '夜は早く寝ます。' },
  { term: '午前', reading: 'ごぜん', meaning: 'Pagi hari / A.M.', example_sentence: '午前9時に始まります。' },
  { term: '午後', reading: 'ごご', meaning: 'Siang/Sore/Malam / P.M.', example_sentence: '午後2時に会いましょう。' },
  { term: '先月', reading: 'せんげつ', meaning: 'Bulan lalu', example_sentence: '先月日本へ来ました。' },
  { term: '今月', reading: 'こんげつ', meaning: 'Bulan ini', example_sentence: '今月は忙しいです。' },
  { term: '来月', reading: 'らいげつ', meaning: 'Bulan depan', example_sentence: '来月テストがあります。' },
  { term: '去年', reading: 'きょねん', meaning: 'Tahun lalu', example_sentence: '去年卒業しました。' },
  { term: '今年', reading: 'ことし', meaning: 'Tahun ini', example_sentence: '今年は20歳になります。' },
  { term: '来年', reading: 'らいねん', meaning: 'Tahun depan', example_sentence: '来年日本へ行きたいです。' },
  { term: 'いつも', reading: 'いつも', meaning: 'Selalu', example_sentence: 'いつもここでコーヒーを飲みます。' },
  { term: 'よく', reading: 'よく', meaning: 'Sering / Dengan baik', example_sentence: 'よく図書館へ行きます。' },
  { term: 'ときどき', reading: 'ときどき', meaning: 'Kadang-kadang', example_sentence: 'ときどき映画を見ます。' },
  { term: 'あまり', reading: 'あまり', meaning: 'Tidak begitu (diikuti bentuk negatif)', example_sentence: 'あまり肉を食べません。' },
  { term: 'ぜんぜん', reading: 'ぜんぜん', meaning: 'Sama sekali tidak (diikuti negatif)', example_sentence: 'お酒はぜんぜん飲みません。' },
  { term: 'もう', reading: 'もう', meaning: 'Sudah', example_sentence: 'もう昼ごはんを食べましたか。' },
  { term: 'まだ', reading: 'まだ', meaning: 'Belum / Masih', example_sentence: 'まだ宿題が終わっていません。' },
  { term: 'たくさん', reading: 'たくさん', meaning: 'Banyak', example_sentence: '果物をたくさん買いました。' },
  { term: '少し', reading: 'すこし', meaning: 'Sedikit', example_sentence: '日本語が少し分かります。' },
  { term: 'とても', reading: 'とても', meaning: 'Sangat', example_sentence: 'とても美味しいです。' },

  // --- UNGKAPAN & SALAM (DAILY EXPRESSIONS) ---
  { term: 'どうぞ', reading: 'どうぞ', meaning: 'Silakan', example_sentence: 'どうぞお入りください。' },
  { term: 'ありがとう', reading: 'ありがとう', meaning: 'Terima kasih', example_sentence: '本当にありがとうございます。' },
  { term: 'すみません', reading: 'すみません', meaning: 'Permisi / Maaf', example_sentence: 'すみません、駅はどこですか。' },
  { term: 'ごめんなさい', reading: 'ごめんなさい', meaning: 'Mohon maaf', example_sentence: '遅れてごめんなさい。' },
  { term: 'いってきます', reading: 'いってきます', meaning: 'Saya berangkat (pergi dulu)', example_sentence: '「いってきます」「いってらっしゃい」' },
  { term: 'ただいま', reading: 'ただいま', meaning: 'Saya pulang', example_sentence: '「ただいま」「おかえりなさい」' },
  { term: 'おやすみなさい', reading: 'おやすみなさい', meaning: 'Selamat tidur / Selamat malam', example_sentence: 'おやすみなさい、また明日。' },
  { term: 'いただきます', reading: 'いただきます', meaning: 'Selamat makan (sebelum makan)', example_sentence: 'いただきますと言って食べます。' },
  { term: 'ごちそうさまでした', reading: 'ごちそうさまでした', meaning: 'Terima kasih atas hidangannya (setelah makan)', example_sentence: '美味しかったです、ごちそうさまでした。' },
  { term: 'はじめまして', reading: 'はじめまして', meaning: 'Senang berkenalan dengan Anda (salam pertama kali)', example_sentence: 'はじめまして、田中です。' },
  { term: 'よろしくお願いします', reading: 'よろしくおねがいします', meaning: 'Mohon bantuannya / Senang bekerjasama', example_sentence: 'どうぞよろしくお願いします。' }
];

async function seedSuperVocab() {
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

  const newVocabs = SUPER_VOCAB.filter(v => !existingTerms.has(v.term));
  
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
    console.log(`✅ Successfully seeded ${newVocabs.length} SUPER vocab items!`);
    const { count } = await supabase.from('vocab_items').select('*', { count: 'exact', head: true });
    console.log(`📊 TOTAL KOSAKATA DI DATABASE SEKARANG: ${count} KATA`);
  }
}

seedSuperVocab();
