import fs from 'fs';
import path from 'path';

const newQuestions = `
  // --- TAMBAHAN SOAL MOJI-GOI (Hingga total 25 soal) ---
  {
    id: 'q11',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：あした、[くるま|くるま]で[行|い]きます。',
    options: ['[電車|でんしゃ]', '[自転車|じてんしゃ]', '[車|くるま]', '[飛行機|ひこうき]'],
    correctOption: '[車|くるま]',
    explanation: '「くるま」 ditulis dengan kanji 車 (Mobil).'
  },
  {
    id: 'q12',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。A・B・C・Dから一[番|ばん]いいものを一[つ|つ]えらんでください。\n[問題|もんだい]：[朝|あさ]、いつも＿＿を[飲|の]みます。',
    options: ['コーヒー', 'パン', 'りんご', 'にく'],
    correctOption: 'コーヒー',
    explanation: 'Dari pilihan yang ada, hanya コーヒー (kopi) yang bisa diminum (飲みます).'
  },
  {
    id: 'q13',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：この[本|ほん]は[安|やす]いです。',
    options: ['やすい', 'たかい', 'ひろい', 'せまい'],
    correctOption: 'やすい',
    explanation: '「安い」 dibaca やすい (murah).'
  },
  {
    id: 'q14',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[雨|あめ]が[降|ふ]っていますから、＿＿を[持|も]って[行|い]きます。',
    options: ['かさ', 'かばん', 'くつ', 'ぼうし'],
    correctOption: 'かさ',
    explanation: 'Karena hujan (雨が降っています), maka membawa payung (かさ).'
  },
  {
    id: 'q15',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：[きょう|きょう]は[休|やす]みです。',
    options: ['[明日|あした]', '[今日|きょう]', '[昨日|きのう]', '[毎日|まいにち]'],
    correctOption: '[今日|きょう]',
    explanation: '「きょう」 ditulis dengan kanji 今日 (hari ini).'
  },
  {
    id: 'q16',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[部屋|へや]が＿＿ですから、[電気|でんき]をつけます。',
    options: ['くらい', 'あかるい', 'ひろい', 'せまい'],
    correctOption: 'くらい',
    explanation: 'Karena menyalakan lampu (電気をつけます), berarti ruangannya gelap (くらい).'
  },
  {
    id: 'q17',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：あの[人|ひと]の[耳|みみ]は[大|おお]きいです。',
    options: ['め', 'みみ', 'くち', 'はな'],
    correctOption: 'みみ',
    explanation: '「耳」 dibaca みみ (telinga).'
  },
  {
    id: 'q18',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[駅|えき]まで＿＿で[行|い]きます。',
    options: ['じてんしゃ', 'えんぴつ', 'めがね', 'しんぶん'],
    correctOption: 'じてんしゃ',
    explanation: 'Alat transportasi yang logis untuk pergi ke stasiun adalah sepeda (じてんしゃ).'
  },
  {
    id: 'q19',
    category: 'vocab',
    prompt: '＿＿とだいたいおなじ[意味|いみ]の[文|ぶん]はどれですか。\n[問題|もんだい]：[父|ちち]の[姉|あね]です。',
    options: ['おばです', 'おばあさんです', 'おじです', 'お母さんです'],
    correctOption: 'おばです',
    explanation: 'Kakak perempuan dari ayah adalah bibi (おば).'
  },
  {
    id: 'q20',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：[うえ|うえ]を[見|み]てください。',
    options: ['[下|した]', '[右|みぎ]', '[左|ひだり]', '[上|うえ]'],
    correctOption: '[上|うえ]',
    explanation: '「うえ」 ditulis dengan kanji 上 (atas).'
  },
  {
    id: 'q21',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[夏|なつ]はとても＿＿です。',
    options: ['あつい', 'さむい', 'すずしい', 'つめたい'],
    correctOption: 'あつい',
    explanation: 'Musim panas (夏) identik dengan cuaca yang panas (あつい).'
  },
  {
    id: 'q22',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：[新|あたら]しい[靴|くつ]です。',
    options: ['くつ', 'ふく', 'かばん', 'ぼうし'],
    correctOption: 'くつ',
    explanation: '「靴」 dibaca くつ (sepatu).'
  },
  {
    id: 'q23',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：[みず|みず]をください。',
    options: ['[木|き]', '[金|きん]', '[火|ひ]', '[水|みず]'],
    correctOption: '[水|みず]',
    explanation: '「みず」 ditulis dengan kanji 水 (air).'
  },
  {
    id: 'q24',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：ノートに[名前|なまえ]を＿＿。',
    options: ['かきます', 'よみます', 'ききます', 'みます'],
    correctOption: 'かきます',
    explanation: 'Tindakan yang dilakukan untuk "nama" di buku catatan adalah menulisnya (かきます).'
  },
  {
    id: 'q25',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：[先週|せんしゅう]、[友達|ともだち]と[遊|あそ]びました。',
    options: ['せんしゅう', 'こんしゅう', 'らいしゅう', 'まいしゅう'],
    correctOption: 'せんしゅう',
    explanation: '「先週」 dibaca せんしゅう (minggu lalu).'
  },
  {
    id: 'q26',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：[そら|そら]が[青|あお]いです。',
    options: ['[空|そら]', '[海|うみ]', '[川|かわ]', '[山|やま]'],
    correctOption: '[空|そら]',
    explanation: '「そら」 ditulis dengan kanji 空 (langit).'
  },
  {
    id: 'q27',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[風邪|かぜ]をひきましたから、＿＿を[飲|の]みます。',
    options: ['くすり', 'おちゃ', 'みず', 'おさけ'],
    correctOption: 'くすり',
    explanation: 'Karena sedang flu (風邪をひきました), hal yang wajar diminum adalah obat (くすり).'
  },
  {
    id: 'q28',
    category: 'vocab',
    prompt: '＿＿とだいたいおなじ[意味|いみ]の[文|ぶん]はどれですか。\n[問題|もんだい]：[電話|でんわ]をかけます。',
    options: ['[電話|でんわ]をします', '[電話|でんわ]をききます', '[電話|でんわ]をみます', '[電話|でんわ]をかきます'],
    correctOption: '[電話|でんわ]をします',
    explanation: 'Menelepon (電話をかける) sama artinya dengan 電話をする.'
  },
  {
    id: 'q29',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：[白|しろ]いシャツを[着|き]ます。',
    options: ['しろい', 'くろい', 'あかい', 'あおい'],
    correctOption: 'しろい',
    explanation: '「白い」 dibaca しろい (putih).'
  },
  {
    id: 'q30',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[時計|とけい]が＿＿なりました。',
    options: ['こわれ', 'やぶれ', 'おれ', 'はずれ'],
    correctOption: 'こわれ',
    explanation: 'Jam biasanya rusak dengan menggunakan kata kerja 壊れる (こわれる).'
  }
`;

const filePath = path.join(process.cwd(), 'lib/quiz.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Insert before the last bracket of the array
const arrayEndIndex = fileContent.lastIndexOf('];');
if (arrayEndIndex !== -1) {
  fileContent = fileContent.slice(0, arrayEndIndex) + ',' + newQuestions + fileContent.slice(arrayEndIndex);
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log('Successfully injected 20 new questions!');
} else {
  console.error('Could not find end of array');
}
