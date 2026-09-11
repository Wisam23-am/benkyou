export type TrackCode = 'shiken' | 'seikatsu';

export interface VocabEntry {
  term: string;
  reading: string;
  meaning: string;
  example: string;
  partOfSpeech?: string;
  context?: string;
}

export interface KanjiEntry {
  character: string;
  reading: string;
  meaning: string;
  onyomi?: string;
  kunyomi?: string;
  strokeCount?: number;
  examples?: string[];
}

export interface ListeningPractice {
  id?: string;
  japanese: string;
  reading?: string;
  translation: string;
  question: string;
  answer: string;
  audioUrl?: string;
}

export type FocusType = 'kanji' | 'grammar' | 'vocab' | 'date' | 'listening' | 'mixed';

export interface LessonContent {
  focusType?: FocusType;
  vocabulary: VocabEntry[];
  kanji: KanjiEntry[];
  grammar: {
    pattern: string;
    meaning: string;
    example: string;
    formal?: string;
    casual?: string;
  }[];
  contextTags?: string[];
  listening?: ListeningPractice;
}

export interface LessonSummary {
  slug: string;
  title: string;
  description: string;
  duration: string;
  content: LessonContent;
}

export interface UnitSummary {
  slug: string;
  title: string;
  description: string;
  lessons: LessonSummary[];
}

export interface TrackSummary {
  code: TrackCode;
  title: string;
  description: string;
  units: UnitSummary[];
}

export const curriculum: {
  code: 'N5';
  title: string;
  description: string;
  tracks: TrackSummary[];
} = {
  code: 'N5',
  title: 'JLPT N5',
  description: 'Langkah terstruktur menuju kelulusan JLPT N5 dan kesiapan komunikasi sehari-hari di Jepang.',
  tracks: [
    {
      code: 'shiken',
      title: 'Shiken Michi',
      description: 'Bangun pola bahasa inti dan kosakata kurikulum resmi untuk JLPT N5.',
      units: [
        {
          slug: 'first-steps',
          title: 'Langkah pertama',
          description: 'Salam, perkenalan, dan bentuk kalimat dasar bahasa Jepang.',
          lessons: [
            {
              slug: 'greetings',
              title: 'Salam dan perkenalan',
              description: 'Mengucapkan salam, memperkenalkan diri, dan menanyakan nama.',
              duration: '12 menit',
              content: {
                vocabulary: [
                  {
                    term: 'こんにちは',
                    reading: 'こんにちは',
                    meaning: 'Halo / selamat siang',
                    example: 'こんにちは、田中さん。',
                    partOfSpeech: 'Ungkapan',
                    context: 'Salam sopan sehari-hari',
                  },
                  {
                    term: '名前',
                    reading: 'なまえ',
                    meaning: 'Nama',
                    example: 'お名前は何ですか。',
                    partOfSpeech: 'Kata benda',
                    context: 'Perkenalan',
                  },
                ],
                kanji: [
                  {
                    character: '日',
                    reading: 'ひ・にち',
                    meaning: 'Hari / matahari',
                    onyomi: 'ニチ・ジツ',
                    kunyomi: 'ひ・か',
                    strokeCount: 4,
                    examples: ['日本', '日曜日'],
                  },
                ],
                grammar: [
                  {
                    pattern: 'A は B です',
                    meaning: 'A adalah B.',
                    example: 'わたしは学生です。',
                  },
                ],
              },
            },
            {
              slug: 'numbers-and-time',
              title: 'Angka dan waktu',
              description: 'Menghitung dengan sederhana dan membicarakan waktu.',
              duration: '15 menit',
              content: {
                vocabulary: [
                  {
                    term: '今日',
                    reading: 'きょう',
                    meaning: 'Hari ini',
                    example: '今日は月曜日です。',
                    partOfSpeech: 'Kata benda',
                    context: 'Waktu',
                  },
                  {
                    term: '時間',
                    reading: 'じかん',
                    meaning: 'Waktu',
                    example: '時間があります。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal',
                  },
                ],
                kanji: [
                  {
                    character: '時',
                    reading: 'とき・じ',
                    meaning: 'Waktu / jam',
                    onyomi: 'ジ',
                    kunyomi: 'とき',
                    strokeCount: 10,
                    examples: ['時間', '何時'],
                  },
                ],
                grammar: [
                  {
                    pattern: 'N は 何時ですか',
                    meaning: 'Jam berapa N?',
                    example: '今は何時ですか。',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      code: 'seikatsu',
      title: 'Seikatsu Michi',
      description: 'Belajar kosakata situasi nyata: konbini, restoran, stasiun, dan percakapan harian di Jepang.',
      units: [
        {
          slug: 'daily-life',
          title: 'Kehidupan sehari-hari',
          description: 'Ungkapan penting di kafe dan tempat makan.',
          lessons: [
            {
              slug: 'at-the-cafe',
              title: 'Di kafe',
              description: 'Memesan dengan sopan dan memahami permintaan sederhana.',
              duration: '14 menit',
              content: {
                contextTags: ['Belanja', 'Sopan', 'Sosial'],
                vocabulary: [
                  {
                    term: '水',
                    reading: 'みず',
                    meaning: 'Air putih',
                    example: 'お水をください。',
                    partOfSpeech: 'Kata benda',
                    context: 'Restoran dan kafe',
                  },
                  {
                    term: 'お願いします',
                    reading: 'おねがいします',
                    meaning: 'Mohon / tolong',
                    example: 'コーヒーをお願いします。',
                    partOfSpeech: 'Ungkapan',
                    context: 'Memesan dengan sopan',
                  },
                ],
                kanji: [
                  {
                    character: '水',
                    reading: 'みず・すい',
                    meaning: 'Air',
                    onyomi: 'スイ',
                    kunyomi: 'みず',
                    strokeCount: 4,
                    examples: ['水曜日', '水道'],
                  },
                ],
                grammar: [
                  {
                    pattern: 'N を ください',
                    meaning: 'Tolong beri N.',
                    example: 'お水をください。',
                    formal: 'お水をいただけますか',
                    casual: '水ちょうだい',
                  },
                ],
                listening: {
                  id: 'cafe-order-1',
                  japanese: 'お水をお願いします。',
                  reading: 'おみずを おねがいします。',
                  translation: 'Air putih, tolong.',
                  question: 'Apa yang diminta pembicara?',
                  answer: 'Air putih',
                },
              },
            },
          ],
        },
        {
          slug: 'konbini-and-shopping',
          title: 'Konbini & Belanja',
          description: 'Berbelanja di toserba 24 jam (konbini) dan transaksi kasir harian.',
          lessons: [
            {
              slug: 'konbini-basics',
              title: 'Percakapan di Konbini',
              description: 'Menjawab pertanyaan kasir seperti kantong belanja, pemanasan bento, dan struk.',
              duration: '16 menit',
              content: {
                contextTags: ['Konbini', 'Belanja', 'Kasir'],
                vocabulary: [
                  {
                    term: '袋',
                    reading: 'ふくろ',
                    meaning: 'Kantong plastik / kantong belanja',
                    example: '袋はご利用ですか。(Apakah butuh kantong plastik?)',
                    partOfSpeech: 'Kata benda',
                    context: 'Kasir konbini',
                  },
                  {
                    term: '大丈夫',
                    reading: 'だいじょうぶ',
                    meaning: 'Tidak apa-apa / cukup / tidak perlu',
                    example: '袋は大丈夫です。(Tidak perlu kantong, terima kasih.)',
                    partOfSpeech: 'Kata sifat-na',
                    context: 'Menolak secara sopan',
                  },
                  {
                    term: '温め',
                    reading: 'あたため',
                    meaning: 'Pemanasan (microwave)',
                    example: 'お弁当温めますか。(Apakah bentonya mau dihangatkan?)',
                    partOfSpeech: 'Kata benda',
                    context: 'Layanan makanan konbini',
                  },
                ],
                kanji: [
                  {
                    character: '金',
                    reading: 'かね・きん',
                    meaning: 'Uang / emas',
                    onyomi: 'キン・コン',
                    kunyomi: 'かね',
                    strokeCount: 8,
                    examples: ['お金', '金曜日'],
                  },
                ],
                grammar: [
                  {
                    pattern: 'N は 大丈夫です',
                    meaning: 'Tidak perlu N / N sudah cukup.',
                    example: '袋は大丈夫です。',
                    formal: '袋は結構です',
                    casual: '袋いらないです',
                  },
                ],
                listening: {
                  id: 'konbini-bag-1',
                  japanese: '袋にお入れしますか。大丈夫です。',
                  reading: 'ふくろに おいれしますか。だいじょうぶです。',
                  translation: 'Apakah ingin dimasukkan ke dalam kantong? Tidak usah, terima kasih.',
                  question: 'Apakah pembeli menginginkan kantong belanja?',
                  answer: 'Tidak menginginkan kantong belanja',
                },
              },
            },
          ],
        },
        {
          slug: 'time-and-dates',
          title: 'Waktu & Tanggal (Fokus Spesifik)',
          description: 'Pelajari hari, tanggal, bulan, dan jam secara terisolasi dan mendalam.',
          lessons: [
            {
              slug: 'days-of-the-week',
              title: 'Hari dalam Seminggu',
              description: 'Menghafal 7 nama hari dengan kanji dan artinya.',
              duration: '15 menit',
              content: {
                focusType: 'date',
                contextTags: ['Tanggal', 'Jadwal', 'Hari'],
                vocabulary: [
                  {
                    term: '月曜日',
                    reading: 'げつようび',
                    meaning: 'Hari Senin (Hari Bulan)',
                    example: '月曜日にテストがあります。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal mingguan',
                  },
                  {
                    term: '火曜日',
                    reading: 'かようび',
                    meaning: 'Hari Selasa (Hari Api)',
                    example: '火曜日は休みです。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal mingguan',
                  },
                  {
                    term: '水曜日',
                    reading: 'すいようび',
                    meaning: 'Hari Rabu (Hari Air)',
                    example: '水曜日に会いましょう。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal mingguan',
                  },
                  {
                    term: '木曜日',
                    reading: 'もくようび',
                    meaning: 'Hari Kamis (Hari Kayu/Pohon)',
                    example: '木曜日は雨でした。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal mingguan',
                  },
                  {
                    term: '金曜日',
                    reading: 'きんようび',
                    meaning: 'Hari Jumat (Hari Emas/Uang)',
                    example: '金曜日の夜に出かけます。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal mingguan',
                  },
                  {
                    term: '土曜日',
                    reading: 'どようび',
                    meaning: 'Hari Sabtu (Hari Tanah/Bumi)',
                    example: '土曜日は買い物をします。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal mingguan',
                  },
                  {
                    term: '日曜日',
                    reading: 'にちようび',
                    meaning: 'Hari Minggu (Hari Matahari)',
                    example: '日曜日に休みます。',
                    partOfSpeech: 'Kata benda',
                    context: 'Jadwal mingguan',
                  },
                ],
                kanji: [
                  {
                    character: '月',
                    reading: 'つき・げつ・がつ',
                    meaning: 'Bulan (Moon / Month)',
                    onyomi: 'ゲツ・ガツ',
                    kunyomi: 'つき',
                    strokeCount: 4,
                    examples: ['月曜日', '一月'],
                  },
                  {
                    character: '火',
                    reading: 'ひ・か',
                    meaning: 'Api',
                    onyomi: 'カ',
                    kunyomi: 'ひ',
                    strokeCount: 4,
                    examples: ['火曜日', '火事'],
                  },
                  {
                    character: '土',
                    reading: 'つち・ど・と',
                    meaning: 'Tanah',
                    onyomi: 'ド・ト',
                    kunyomi: 'つち',
                    strokeCount: 3,
                    examples: ['土曜日', '土地'],
                  },
                ],
                grammar: [
                  {
                    pattern: '今日は 何曜日 ですか',
                    meaning: 'Hari ini hari apa?',
                    example: '今日は何曜日ですか。月曜日です。',
                  },
                  {
                    pattern: '[Hari] に [Kegiatan]',
                    meaning: 'Melakukan kegiatan pada [Hari]',
                    example: '日曜日に日本へ行きます。',
                  },
                ],
                listening: {
                  id: 'listening-date-1',
                  japanese: '今日は何曜日ですか。今日は金曜日ですよ。',
                  reading: 'きょうは なんようび ですか。きょうは きんようび ですよ。',
                  translation: 'Hari ini hari apa? Hari ini hari Jumat lho.',
                  question: 'Hari apakah yang disebutkan dalam percakapan?',
                  answer: 'Hari Jumat (金曜日)',
                },
              },
            },
            {
              slug: 'monthly-dates',
              title: 'Pola Tanggal 1–10 (Tsuitaichi s.d Toka)',
              description: 'Pelajari pengucapan unik tanggal 1 sampai 10 dalam kalender Jepang.',
              duration: '18 menit',
              content: {
                focusType: 'date',
                contextTags: ['Tanggal', 'Kalender', 'Khusus'],
                vocabulary: [
                  {
                    term: '一日',
                    reading: 'ついたち',
                    meaning: 'Tanggal 1',
                    example: '四月一日は入学式です。',
                    partOfSpeech: 'Kata benda',
                    context: 'Penanggalan',
                  },
                  {
                    term: '二日',
                    reading: 'ふつか',
                    meaning: 'Tanggal 2 / 2 hari',
                    example: '二日に荷物が届きます。',
                    partOfSpeech: 'Kata benda',
                    context: 'Penanggalan',
                  },
                  {
                    term: '三日',
                    reading: 'みっか',
                    meaning: 'Tanggal 3 / 3 hari',
                    example: '三日後に出発します。',
                    partOfSpeech: 'Kata benda',
                    context: 'Penanggalan',
                  },
                  {
                    term: '四日',
                    reading: 'よっか',
                    meaning: 'Tanggal 4 / 4 hari',
                    example: '五月四日は祝日です。',
                    partOfSpeech: 'Kata benda',
                    context: 'Penanggalan',
                  },
                  {
                    term: '五日',
                    reading: 'いつか',
                    meaning: 'Tanggal 5 / 5 hari',
                    example: '五日に友達と会います。',
                    partOfSpeech: 'Kata benda',
                    context: 'Penanggalan',
                  },
                  {
                    term: '十日',
                    reading: 'とおか',
                    meaning: 'Tanggal 10 / 10 hari',
                    example: '十日は給料日です。',
                    partOfSpeech: 'Kata benda',
                    context: 'Penanggalan',
                  },
                ],
                kanji: [
                  {
                    character: '年',
                    reading: 'とし・ねん',
                    meaning: 'Tahun',
                    onyomi: 'ネン',
                    kunyomi: 'とし',
                    strokeCount: 6,
                    examples: ['今年', '来年', '一年'],
                  },
                ],
                grammar: [
                  {
                    pattern: '[Bulan]月 [Tanggal]日',
                    meaning: 'Tanggal [X] Bulan [Y]',
                    example: '私の誕生日は三月三日です。',
                  },
                ],
                listening: {
                  id: 'listening-date-2',
                  japanese: '旅行はいつですか。来月の五日です。',
                  reading: 'りょこうは いつですか。らいげつの いつか です。',
                  translation: 'Kapan perjalanannya? Tanggal 5 bulan depan.',
                  question: 'Tanggal berapa perjalanan akan dilakukan?',
                  answer: 'Tanggal 5 (いつか)',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

export function getTrack(code: string) {
  return curriculum.tracks.find((track) => track.code === code);
}

export function getUnit(trackCode: string, unitSlug: string) {
  return getTrack(trackCode)?.units.find((unit) => unit.slug === unitSlug);
}

export function getLesson(trackCode: string, unitSlug: string, lessonSlug: string) {
  return getUnit(trackCode, unitSlug)?.lessons.find((lesson) => lesson.slug === lessonSlug);
}
