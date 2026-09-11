import { JLPTEngine } from '@/components/jlpt-engine';
import { n5Questions } from '@/lib/quiz';

export default function Sesi1Page() {
  // Hanya ambil soal Moji-Goi (Kosakata & Kanji)
  // Untuk demo, kita ambil yang ada di n5Questions
  const mojiGoiQuestions = n5Questions.filter(
    (q) => q.category === 'vocab' || q.category === 'kanji'
  );

  return (
    <JLPTEngine 
      questions={mojiGoiQuestions}
      sectionName="文字・語彙 (Moji - Goi)"
      timeLimitMinutes={25}
    />
  );
}


