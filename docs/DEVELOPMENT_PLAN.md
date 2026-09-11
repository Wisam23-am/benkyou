# 📘 Development Plan — Benkyou Advanced Modular Learning Platform

> Dibuat: 2026-09-08  
> Versi: 1.0  
> Status: Perencanaan

---

## Latar Belakang

Aplikasi **Benkyou** saat ini memiliki beberapa kekurangan:

- Modul pembelajaran terlalu sedikit dan belum memenuhi cakupan penuh JLPT N5.
- Satu pelajaran mencampur Kanji, Bunpou, dan Kotoba sekaligus — tidak sesuai dengan cara belajar yang fokus.
- Bank soal kuis terlalu sedikit dan tidak ada pembatasan waktu.
- Latihan mendengarkan (listening) masih minimal.
- Belum ada jalur belajar yang dapat dikustomisasi oleh pengguna.

Rencana ini mengusulkan pengembangan bertahap menjadi platform pembelajaran yang lebih kompleks, modular, dan lengkap.

---

## 1. Arsitektur Konten Modular

### 1.1 Prinsip Utama

> **"Satu Fokus, Satu Sesi"**  
> Jika pengguna memilih belajar Kanji, tampilkan hanya Kanji. Jika memilih Bunpou, tampilkan hanya Bunpou.

### 1.2 Perubahan Model Data (`lib/curriculum.ts`)

Tambahkan field `focusType` ke setiap lesson:

```ts
type FocusType = "kanji" | "grammar" | "vocab" | "date" | "listening" | "mixed";

interface LessonContent {
  focusType: FocusType;
  vocabItems?: VocabEntry[];
  kanjiItems?: KanjiEntry[];
  grammarPoints?: GrammarEntry[];
  listeningPractice?: ListeningPractice[];
  tags?: string[];
}
```

### 1.3 Contoh Struktur Lesson

| Lesson | focusType | Konten |
|--------|-----------|--------|
| "Kanji Angka 1–10" | `kanji` | Hanya `kanjiItems` |
| "Pola Kalimat: ~desu" | `grammar` | Hanya `grammarPoints` |
| "Kosakata Makanan" | `vocab` | Hanya `vocabItems` |
| "Hari & Tanggal" | `date` | `vocabItems` + `grammarPoints` (terkait waktu) |
| "Dialog di Konbini" | `listening` | Hanya `listeningPractice` |

### 1.4 API Endpoint

```
GET /api/v1/lessons/[lessonId]?focus=kanji
```

---

## 2. Ekspansi Kurikulum JLPT N5

| Area | Saat Ini | Target | Sumber Data |
|------|----------|--------|-------------|
| Kanji | ~30 | 100 kanji N5 | scripts/data/kanji_n5.csv |
| Kosakata | ~150 | ~800 kata | scripts/data/vocab_n5.csv |
| Bunpou | 15 poin | 25+ poin | scripts/data/grammar_n5.csv |
| Tanggal & Waktu | 3 lesson | 10+ lesson | Track baru: Waktu & Tanggal |
| Listening | 2 dialog | 15+ dialog | listening_items di Supabase |

### 2.1 Struktur Track Baru

```
Track: Shiken N5 (Ujian)
  Unit: Kanji Dasar
    - Lesson: Kanji Angka         (focusType: kanji)
    - Lesson: Kanji Hari          (focusType: kanji)
    - Lesson: Kanji Benda Sehari  (focusType: kanji)
  Unit: Bunpou Dasar
    - Lesson: Pola ~desu/~masu    (focusType: grammar)
    - Lesson: Partikel は が を   (focusType: grammar)
    - Lesson: Bentuk Negatif      (focusType: grammar)
  Unit: Kotoba Tematik
    - Lesson: Kata Kerja          (focusType: vocab)
    - Lesson: Kata Sifat          (focusType: vocab)

Track: Seikatsu (Kehidupan Sehari-hari)
  Unit: Waktu & Tanggal
    - Lesson: Hari dalam Seminggu (focusType: date)
    - Lesson: Bulan & Tanggal     (focusType: date)
    - Lesson: Jam & Waktu         (focusType: date)
    - Lesson: Musim & Cuaca       (focusType: date)
  Unit: Belanja & Transportasi
    - Lesson: Dialog di Konbini   (focusType: listening)
    - Lesson: Naik Kereta         (focusType: listening)
  Unit: Makanan & Restoran
    - Lesson: Memesan Makanan     (focusType: mixed)
```

---

## 3. Bank Soal Kuis

### 3.1 Schema Database

```sql
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level TEXT NOT NULL,
  focus_type TEXT NOT NULL,
  question_type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options JSONB NOT NULL,
  explanation TEXT,
  time_limit_seconds INT DEFAULT 30,
  difficulty INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX ON quiz_questions (level, focus_type);
```

### 3.2 Target Bank Soal

| Kategori | Saat Ini | Target |
|----------|----------|--------|
| Kanji | ~10 soal | 100 soal |
| Kotoba | ~15 soal | 150 soal |
| Bunpou | ~10 soal | 80 soal |
| Tanggal/Waktu | 0 soal | 50 soal |
| Mendengarkan | 0 soal | 30 soal |
| **Total** | **~35** | **410+** |

### 3.3 Fitur Kuis Baru

| Fitur | Deskripsi |
|-------|-----------|
| Timer per soal | Countdown 30 detik per soal |
| Filter fokus | Pilih soal berdasarkan kategori |
| Breakdown hasil | Persentase benar per kategori |
| Shuffle soal | Urutan diacak setiap sesi |
| Penjelasan | Tampilkan explanation setelah menjawab |

---

## 4. SRS (Spaced Repetition)

- Tambah field `example_sentence` ke `vocab_items` dan `kanji_items`.
- Kartu SRS per fokus: Kanji card, Vocab card, Grammar card.
- Pengguna memilih hanya mengulang tipe kartu tertentu.
- Tampilkan contoh kalimat untuk konteks belajar.

---

## 5. UX / Antarmuka Pengguna

### 5.1 Pilih Fokus Belajar

Sebelum masuk lesson, pengguna memilih:

```
Pilih fokus belajar hari ini:
  [ ] Kanji
  [ ] Bunpou
  [ ] Kotoba
  [ ] Tanggal
  [ ] Mendengarkan
  [x] Semua (Mixed)
```

### 5.2 Dashboard Progres per Fokus

```
Kanji:    ████████░░  80/100
Bunpou:   █████░░░░░  13/25
Kotoba:   ████░░░░░░  320/800
Tanggal:  ██░░░░░░░░  2/10
```

### 5.3 Playlist Belajar Kustom

- Pengguna membuat playlist dari lesson yang dipilih sendiri.
- Disimpan di tabel `user_playlists` Supabase.

---

## 6. Testing

| Layer | Cakupan | Tools |
|-------|---------|-------|
| Unit | SRS scheduler, Quiz scorer, helpers | Jest + ts-jest |
| Integration | API routes + Supabase | Supertest |
| E2E | Alur lesson, kuis, review | Playwright |
| Snapshot | Komponen UI | Storybook |

Target: Cakupan kode >= 80% pada service kritis.

---

## 7. Migrasi Database

```bash
# 1. Buat file migrasi
supabase migration new add_quiz_questions_focus_type

# 2. Jalankan di staging
supabase db push --db-url $STAGING_DB_URL

# 3. Seed data N5
npm run seed-n5

# 4. Deploy ke production
supabase db push
```

---

## 8. Timeline Sprint

| Sprint | Fokus | Deliverables |
|--------|-------|-------------|
| Sprint 9 | Fondasi Data | CSV N5, seed script, migrasi DB, schema quiz_questions |
| Sprint 10 | UI Modular | Focus selector, refactor LessonLearningFlow, API filter |
| Sprint 11 | Bank Soal & SRS | 400+ soal, timer kuis, SRS enriched |
| Sprint 12 | Testing & Polish | Test >=80%, E2E, caching, ISR |

---

## 9. Metrik Keberhasilan

| Metrik | Target |
|--------|--------|
| Kelengkapan N5 | >= 95% item |
| Bank soal | >= 400 soal |
| Cakupan test | >= 80% |
| Waktu respons API | < 200ms |
| Build CI | 0 TypeScript error |

---

## 10. Langkah Selanjutnya

1. Setujui plan ini dan prioritaskan Sprint 9.
2. Siapkan file CSV untuk kanji, vocab, grammar N5.
3. Buat branch `feature/modular-content` di Git.
4. Mulai implementasi seed script dan migrasi DB.
5. Kerjakan UI focus selector secara paralel.

---

*Rencana ini dirancang agar backward-compatible. Lesson "mixed" yang sudah ada tetap berjalan normal, sementara lesson fokus baru memberikan pengalaman belajar yang lebih terarah.*
