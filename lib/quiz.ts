export type QuizCategory = 'vocab' | 'kanji' | 'grammar' | 'reading' | 'listening';

export interface Question {
  id: string;
  category: QuizCategory;
  prompt: string;
  options: string[];
  correctOption: string;
  explanation?: string;
  timeLimitSeconds?: number;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export function calculateQuizResult(questions: Question[], answers: Record<string, string>): QuizResult {
  let correct = 0;
  questions.forEach(q => {
    if (answers[q.id] === q.correctOption) {
      correct++;
    }
  });
  
  const total = questions.length;
  return {
    score: correct,
    total,
    percentage: total > 0 ? (correct / total) * 100 : 0,
    correctAnswers: correct,
    incorrectAnswers: total - correct
  };
}

export const n5Questions: Question[] = [
  {
    id: 'q1',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：[今日|きょう]は「月曜日」です。',
    options: ['げつようび', 'にちようび', 'きんようび', 'かようび'],
    correctOption: 'げつようび',
    explanation: '「月曜日」は「げつようび」(Senin) と読みます。',
  },
  {
    id: 'q2',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：[毎日|まいにち]「水」を[飲|の]みます。',
    options: ['みず', 'き', 'ひ', 'つち'],
    correctOption: 'みず',
    explanation: '「水」は「みず」(Air) と読みます。',
  },
  {
    id: 'q3',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：「時間」がありません。',
    options: ['じかん', 'とけい', 'とき', 'じはん'],
    correctOption: 'じかん',
    explanation: '「時間」は「じかん」(Waktu) と読みます。',
  },
  {
    id: 'q4',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：[私|わたし]の「名前」は[田中|たなか]です。',
    options: ['なまえ', 'なまい', 'めいまえ', 'なめえ'],
    correctOption: 'なまえ',
    explanation: '「名前」は「なまえ」(Nama) と読みます。',
  },
  {
    id: 'q5',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：「こんにちは」、[私|わたし]は[学生|がくせい]です。',
    options: ['今日は', '今日わ', '近日', '今日'],
    correctOption: '今日は',
    explanation: '「こんにちは」 ditulis 今日は.',
  },
  {
    id: 'q6',
    category: 'grammar',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：わたし＿＿[学生|がくせい]です。',
    options: ['は', 'が', 'を', 'に'],
    correctOption: 'は',
    explanation: 'Partikel 「は」(wa) digunakan untuk menandai topik kalimat.',
  },
  {
    id: 'q7',
    category: 'grammar',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：あした、[学校|がっこう]＿＿[行|い]きます。',
    options: ['へ', 'を', 'が', 'で'],
    correctOption: 'へ',
    explanation: 'Partikel 「へ」(e) atau 「に」(ni) digunakan dengan kata kerja perpindahan seperti 行きます (pergi).',
  },
  {
    id: 'q8',
    category: 'grammar',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：りんご＿＿[食|た]べます。',
    options: ['を', 'が', 'は', 'で'],
    correctOption: 'を',
    explanation: 'Partikel 「を」(o/wo) menandai objek langsung dari kata kerja transitif seperti 食べます (makan).',
  },
  {
    id: 'q9',
    category: 'reading',
    prompt: 'つぎの[文|ぶん]を[読|よ]んで、[質問|しつもん]に[答|こた]えてください。\n「わたしは [毎朝|まいあさ] ６[時|じ]に おきます。それから、[朝|あさ]ごはんを [食|た]べます。７[時|じ]に [学校|がっこう]へ [行|い]きます。」\n\n[問題|もんだい]：この[人|ひと]は ６[時|じ]に [何|なに]を しますか。',
    options: ['おきます', '朝ごはんを食べます', '学校へ行きます', 'ねます'],
    correctOption: 'おきます',
    explanation: 'Di kalimat pertama tertulis 「６時に おきます」(Bangun jam 6).',
  },
  {
    id: 'q10',
    category: 'listening',
    prompt: '（[音声|おんせい]を[聞|き]いて[答|こた]えてください）\n[女|おんな]の[人|ひと]と[男|おとこ]の[人|ひと]が[話|はな]しています。[男|おとこ]の[人|ひと]は[何時|なんじ]に[起|お]きましたか。\n\n[男|おとこ]：おはよう。\n[女|おんな]：おはよう。[今日|きょう]は[早|はや]いですね。\n[男|おとこ]：ええ、いつもは７[時|じ]に[起|お]きますが、[今日|きょう]は６[時半|じはん]に[起|お]きました。',
    options: ['６時半', '６時', '７時', '７時半'],
    correctOption: '６時半',
    explanation: 'Pria tersebut berkata 「今日は６時半に起きました」(Hari ini saya bangun jam 6:30).',
  },
  {
    id: 'q11',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：あした、「くるま」で[行|い]きます。',
    options: ['電車', '自転車', '車', '飛行機'],
    correctOption: '車',
    explanation: '「くるま」 ditulis dengan kanji 車 (Mobil).'
  },
  {
    id: 'q12',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[朝|あさ]、いつも＿＿を[飲|の]みます。',
    options: ['コーヒー', 'パン', 'りんご', 'にく'],
    correctOption: 'コーヒー',
    explanation: 'Dari pilihan yang ada, hanya コーヒー (kopi) yang bisa diminum.'
  },
  {
    id: 'q13',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：この[本|ほん]は「安い」です。',
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
    explanation: 'Karena hujan (雨), maka membawa payung (かさ).'
  },
  {
    id: 'q15',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：「きょう」は[休|やす]みです。',
    options: ['明日', '今日', '昨日', '毎日'],
    correctOption: '今日',
    explanation: '「きょう」 ditulis dengan kanji 今日 (hari ini).'
  },
  {
    id: 'q16',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[部屋|へや]が＿＿ですから、[電気|でんき]をつけます。',
    options: ['くらい', 'あかるい', 'ひろい', 'せまい'],
    correctOption: 'くらい',
    explanation: 'Karena menyalakan lampu (電気), berarti ruangannya gelap (くらい).'
  },
  {
    id: 'q17',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：あの[人|ひと]の「耳」は[大|おお]きいです。',
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
    explanation: 'Alat transportasi ke stasiun adalah sepeda (じてんしゃ).'
  },
  {
    id: 'q19',
    category: 'vocab',
    prompt: '＿＿とだいたいおなじ[意味|いみ]の[文|ぶん]はどれですか。\n[問題|もんだい]：[父|ちち]の「姉」です。',
    options: ['おばです', 'おばあさんです', 'おじです', 'お母さんです'],
    correctOption: 'おばです',
    explanation: 'Kakak perempuan dari ayah adalah bibi (おば).'
  },
  {
    id: 'q20',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：「うえ」を[見|み]てください。',
    options: ['下', '右', '左', '上'],
    correctOption: '上',
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
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：[新|あたら]しい「靴」です。',
    options: ['くつ', 'ふく', 'かばん', 'ぼうし'],
    correctOption: 'くつ',
    explanation: '「靴」 dibaca くつ (sepatu).'
  },
  {
    id: 'q23',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：「みず」をください。',
    options: ['木', '金', '火', '水'],
    correctOption: '水',
    explanation: '「みず」 ditulis dengan kanji 水 (air).'
  },
  {
    id: 'q24',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：ノートに[名前|なまえ]を＿＿。',
    options: ['かきます', 'よみます', 'ききます', 'みます'],
    correctOption: 'かきます',
    explanation: 'Tindakan yang dilakukan untuk nama di buku catatan adalah menulisnya (かきます).'
  },
  {
    id: 'q25',
    category: 'vocab',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：「先週」、[友達|ともだち]と[遊|あそ]びました。',
    options: ['せんしゅう', 'こんしゅう', 'らいしゅう', 'まいしゅう'],
    correctOption: 'せんしゅう',
    explanation: '「先週」 dibaca せんしゅう (minggu lalu).'
  },
  {
    id: 'q26',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]は[漢字|かんじ]でどう[書|か]きますか。\n[問題|もんだい]：「そら」が[青|あお]いです。',
    options: ['空', '海', '川', '山'],
    correctOption: '空',
    explanation: '「そら」 ditulis dengan kanji 空 (langit).'
  },
  {
    id: 'q27',
    category: 'vocab',
    prompt: '＿＿に[何|なに]を[入|い]れますか。\n[問題|もんだい]：[風邪|かぜ]をひきましたから、＿＿を[飲|の]みます。',
    options: ['くすり', 'おちゃ', 'みず', 'おさけ'],
    correctOption: 'くすり',
    explanation: 'Karena sedang flu (風邪), hal yang wajar diminum adalah obat (くすり).'
  },
  {
    id: 'q28',
    category: 'vocab',
    prompt: '＿＿とだいたいおなじ[意味|いみ]の[文|ぶん]はどれですか。\n[問題|もんだい]：「電話」をかけます。',
    options: ['電話をします', '電話をききます', '電話をみます', '電話をかきます'],
    correctOption: '電話をします',
    explanation: 'Menelepon (電話をかける) sama artinya dengan 電話をする.'
  },
  {
    id: 'q29',
    category: 'kanji',
    prompt: '＿＿の[言葉|ことば]の[読|よ]み[方|かた]をえらんでください。\n[問題|もんだい]：「白い」シャツを[着|き]ます。',
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
];
