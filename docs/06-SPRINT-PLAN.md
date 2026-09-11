# Sprint Plan
## Benkyou Shimashou by ウィ (Wi)

**Versi:** 1.0  
**Tanggal:** September 2026  
**Status:** Draft — Sprint Plan MVP  
**Durasi Sprint:** 2 minggu  
**Target MVP:** Phase 0–1

---

## 1. Tujuan Sprint Plan

Sprint plan ini menerjemahkan roadmap produk Benkyou Shimashou menjadi pekerjaan teknis dan produk yang dapat dikerjakan secara bertahap.

Arsitektur yang digunakan:

- **Next.js + React + TypeScript** sebagai full-stack application.
- **Tailwind CSS + shadcn/ui** untuk UI.
- **TanStack Query** untuk server state.
- **Zustand** untuk client/UI state.
- **Supabase Auth** untuk autentikasi.
- **Supabase PostgreSQL** untuk database.
- **PostgreSQL Row Level Security (RLS)** untuk authorization data user.
- **Supabase Storage** untuk audio, gambar, dan asset pembelajaran.
- **Next.js Route Handlers + Server Actions** untuk backend application layer.
- **Zod** untuk validasi input.
- **Vercel** untuk deployment.
- **GitHub Actions** untuk quality checks dan CI.

Komponen seperti Redis, Meilisearch, Cloudflare R2, worker permanen, dan monitoring khusus **tidak menjadi dependency MVP** dan hanya ditambahkan ketika kebutuhan scaling sudah nyata.

---

# 2. Target MVP

MVP dibagi menjadi dua target utama:

### Phase 0 — Fondasi + N5 Core

Hasil akhir:

- User dapat register/login/logout.
- User dapat masuk ke dashboard.
- Struktur kurikulum N5 tersedia.
- Vocabulary N5 tersedia.
- Kanji N5 tersedia.
- User dapat mempelajari lesson dasar.
- User memiliki review card SRS.
- User dapat melakukan review harian.
- Progress dasar tersimpan per user.

### Phase 1 — Seikatsu N5 + Quiz + Dashboard

Hasil akhir:

- Materi Seikatsu Michi N5 tersedia.
- Quiz JLPT dasar tersedia.
- Hasil quiz tersimpan.
- Dashboard menampilkan progress.
- Exam Readiness Score versi awal tersedia.
- Life Fluency Score versi awal tersedia.
- Alur belajar utama dapat digunakan dari awal sampai selesai.

---

# 3. Definition of Done Global

Sebuah task dianggap selesai apabila:

- [ ] Implementasi sudah masuk repository.
- [ ] TypeScript tidak menghasilkan error.
- [ ] ESLint tidak menghasilkan error.
- [ ] Validasi input menggunakan schema yang sesuai.
- [ ] Authorization user-owned data menggunakan session + RLS.
- [ ] Tidak ada secret/API key yang masuk ke repository.
- [ ] UI responsive untuk desktop dan mobile browser.
- [ ] Loading, empty, dan error state tersedia jika relevan.
- [ ] Test dibuat untuk business logic penting.
- [ ] Tidak ada regression pada fitur yang sudah selesai.
- [ ] Perubahan terdokumentasi jika memengaruhi API, database, atau arsitektur.
- [ ] Preview deployment berhasil.

Untuk fitur SRS, Definition of Done tambahan:

- [ ] Algoritma tidak berada di komponen UI.
- [ ] Perhitungan scheduling memiliki unit test.
- [ ] Edge case tanggal/waktu diuji.
- [ ] Review log tidak dapat diubah oleh user lain.

---

# 4. Sprint Overview

| Sprint | Fokus | Output Utama |
|---|---|---|
| Sprint 0 | Setup & Architecture | Repository, CI, Vercel, Supabase, struktur project |
| Sprint 1 | Auth & Database Foundation | Auth, schema database, RLS, layout aplikasi |
| Sprint 2 | Curriculum N5 | Level → Track → Unit → Lesson |
| Sprint 3 | Vocabulary & Kanji | Materi goi/kanji dan halaman belajar |
| Sprint 4 | SRS Core | ReviewCard, ReviewLog, scheduler, review session |
| Sprint 5 | Seikatsu Michi N5 | Materi kehidupan nyata + listening dasar |
| Sprint 6 | Quiz Engine | Bank soal, session, scoring, pembahasan |
| Sprint 7 | Dashboard & Progress | Progress, readiness, life fluency, polish |
| Sprint 8 | Hardening & MVP Release | QA, performance, security, production release |

Estimasi total: **16 minggu** untuk 1 developer dengan scope MVP yang realistis. Jika dikerjakan lebih dari satu developer, beberapa task dapat diparalelkan.

---

# 5. Sprint 0 — Project Setup & Architecture

**Durasi:** Minggu 1–2  
**Goal:** Membuat fondasi project yang siap digunakan untuk development berikutnya.

## Backlog

### Repository & Development

- [ ] Buat repository Git.
- [ ] Inisialisasi Next.js App Router + TypeScript strict.
- [ ] Konfigurasi ESLint.
- [ ] Konfigurasi formatter.
- [ ] Buat `.env.example`.
- [ ] Tetapkan branching strategy sederhana.
- [ ] Buat README development.

### UI Foundation

- [ ] Install Tailwind CSS.
- [ ] Setup shadcn/ui.
- [ ] Tentukan typography.
- [ ] Tentukan spacing dan radius.
- [ ] Buat design tokens dasar.
- [ ] Buat komponen Button, Input, Card, Badge, Dialog, Toast.

### Supabase

- [ ] Buat project Supabase.
- [ ] Hubungkan local development dengan Supabase.
- [ ] Setup browser client.
- [ ] Setup server client.
- [ ] Dokumentasikan environment variables.

### Deployment

- [ ] Hubungkan repository dengan Vercel.
- [ ] Buat preview deployment.
- [ ] Buat production deployment.
- [ ] Pastikan environment variable preview/production terpisah.

### CI

- [ ] GitHub Actions untuk lint.
- [ ] GitHub Actions untuk typecheck.
- [ ] GitHub Actions untuk test.
- [ ] CI wajib lulus sebelum merge.

## Acceptance Criteria

- [ ] `npm run dev` berjalan.
- [ ] Build production berhasil.
- [ ] Preview Vercel berhasil.
- [ ] Supabase dapat diakses dari server dan browser sesuai kebutuhan.
- [ ] CI berjalan otomatis pada pull request.

---

# 6. Sprint 1 — Authentication & Database Foundation

**Durasi:** Minggu 3–4  
**Goal:** User dapat memiliki akun dan data user terlindungi dengan benar.

## Authentication

- [ ] Register.
- [ ] Login.
- [ ] Logout.
- [ ] Session persistence.
- [ ] Forgot password.
- [ ] Reset password.
- [ ] Protected route.
- [ ] Redirect user yang belum login.

## Database Foundation

Buat schema awal untuk:

- [ ] `profiles`
- [ ] `levels`
- [ ] `tracks`
- [ ] `units`
- [ ] `lessons`
- [ ] `vocab_items`
- [ ] `kanji_items`
- [ ] `grammar_points`
- [ ] `user_progress`

## Security

- [ ] Aktifkan RLS pada tabel user-owned.
- [ ] Policy berdasarkan `auth.uid()`.
- [ ] Pastikan client tidak dapat mengirim `userId` untuk mengambil data user lain.
- [ ] Uji unauthorized access.

## UI

- [ ] Auth layout.
- [ ] Dashboard shell.
- [ ] Navbar/sidebar.
- [ ] User menu.
- [ ] Empty dashboard state.

## Acceptance Criteria

- [ ] User dapat register dan login.
- [ ] Session tetap tersedia setelah refresh.
- [ ] User dapat logout.
- [ ] User hanya dapat membaca/mengubah data miliknya sendiri.
- [ ] Database migration/schema terdokumentasi.

---

# 7. Sprint 2 — Curriculum N5

**Durasi:** Minggu 5–6  
**Goal:** User dapat menjelajah struktur pembelajaran N5.

## Curriculum

Implementasi hierarchy:

```text
Level
└── Track
    └── Unit
        └── Lesson
            ├── Vocabulary
            ├── Kanji
            ├── Grammar
            └── Listening
```

## Backend

- [ ] `GET /api/v1/levels`
- [ ] `GET /api/v1/levels/{level}`
- [ ] `GET /api/v1/levels/{level}/units`
- [ ] `GET /api/v1/units/{unitId}`
- [ ] `GET /api/v1/lessons/{lessonId}`

## Frontend

- [ ] Level overview.
- [ ] Track selector.
- [ ] Unit list.
- [ ] Lesson list.
- [ ] Lesson detail.
- [ ] Breadcrumb.
- [ ] Progress indicator.

## Content

- [ ] Masukkan struktur N5 awal.
- [ ] Masukkan vocabulary N5 batch pertama.
- [ ] Masukkan kanji N5 batch pertama.
- [ ] Masukkan grammar N5 batch pertama.

## Acceptance Criteria

User dapat melakukan alur:

```text
Dashboard
→ N5
→ Shiken Michi
→ Unit
→ Lesson
→ Materi
```

Tanpa halaman kosong atau broken route.

---

# 8. Sprint 3 — Vocabulary & Kanji Learning

**Durasi:** Minggu 7–8  
**Goal:** Membuat pengalaman belajar vocabulary dan kanji yang usable.

## Vocabulary

- [ ] Vocabulary card.
- [ ] Kana.
- [ ] Kanji.
- [ ] Arti Bahasa Indonesia.
- [ ] Contoh kalimat.
- [ ] Reading.
- [ ] Part of speech.
- [ ] Konteks penggunaan.
- [ ] Audio jika asset tersedia.

## Kanji

- [ ] Kanji card.
- [ ] Onyomi.
- [ ] Kunyomi.
- [ ] Arti.
- [ ] Stroke count.
- [ ] Contoh vocabulary.
- [ ] Contoh penggunaan.

## Learning State

- [ ] Mark as learned.
- [ ] Mark as difficult.
- [ ] Track lesson completion.
- [ ] Simpan progress user.

## Acceptance Criteria

- [ ] User dapat menyelesaikan lesson vocabulary.
- [ ] User dapat melihat detail kanji.
- [ ] Progress tersimpan setelah refresh.
- [ ] Data user tidak bercampur dengan user lain.

---

# 9. Sprint 4 — SRS Core

**Durasi:** Minggu 9–10  
**Goal:** Membangun mesin review sebagai domain service yang terpisah dari UI.

## Domain Model

Implementasikan:

- [ ] `ReviewCard`
- [ ] `ReviewLog`
- [ ] `ReviewRating`
- [ ] `ReviewState`
- [ ] Scheduler service.

## Scheduling

MVP dapat menggunakan algoritma SRS yang dipilih pada implementasi awal, dengan interface yang memungkinkan penggantian algoritma tanpa mengubah UI.

Contoh boundary:

```text
SRSService
├── createCard()
├── getDueCards()
├── calculateNextReview()
└── recordReview()
```

## API

- [ ] `GET /api/v1/srs/queue`
- [ ] `POST /api/v1/srs/cards/{cardId}/answer`
- [ ] `GET /api/v1/srs/stats`

## Review UI

- [ ] Review session.
- [ ] Show question.
- [ ] Reveal answer.
- [ ] Rating buttons.
- [ ] Session progress.
- [ ] Session completion.
- [ ] Empty queue state.

## Testing

- [ ] Unit test scheduling.
- [ ] Unit test review state transition.
- [ ] Test due-date calculation.
- [ ] Test unauthorized card access.

## Acceptance Criteria

User dapat:

```text
Dashboard
→ Review
→ Kartu muncul
→ Jawab
→ Pilih rating
→ Next card
→ Selesai
```

Dan review berikutnya memiliki jadwal berdasarkan hasil review sebelumnya.

---

# 10. Sprint 5 — Seikatsu Michi N5

**Durasi:** Minggu 11–12  
**Goal:** Menambahkan jalur kehidupan nyata sebagai pembeda utama produk.

## Curriculum

Contoh kategori:

- [ ] Konbini.
- [ ] Stasiun.
- [ ] Restoran.
- [ ] Belanja.
- [ ] Salam sehari-hari.
- [ ] Tempat kerja/arubaito.
- [ ] Percakapan sederhana.

## Context Tag

Setiap materi dapat memiliki metadata:

```text
formal
casual
polite
slang
workplace
shopping
transportation
social
```

## Listening

- [ ] Audio player.
- [ ] Transcript.
- [ ] Translation toggle.
- [ ] Repeat.
- [ ] Playback speed.
- [ ] Basic listening question.

## Storage

Asset audio/image menggunakan Supabase Storage pada MVP.

## Acceptance Criteria

- [ ] User dapat memilih Seikatsu Michi.
- [ ] User dapat menyelesaikan lesson situasional.
- [ ] Audio dapat diputar.
- [ ] Materi dapat ditandai selesai.
- [ ] Progress Seikatsu tersimpan.

---

# 11. Sprint 6 — Quiz Engine

**Durasi:** Minggu 13–14  
**Goal:** User dapat berlatih soal dan melihat hasilnya.

## Question Types MVP

- [ ] Multiple choice.
- [ ] Vocabulary.
- [ ] Grammar.
- [ ] Kanji.
- [ ] Reading sederhana.
- [ ] Listening sederhana.

## Database

- [ ] `quiz_questions`
- [ ] `quiz_options`
- [ ] `quiz_sessions`
- [ ] `quiz_answers`
- [ ] `quiz_results`

## API

- [ ] `GET /api/v1/quiz/{level}`
- [ ] `POST /api/v1/quiz/sessions`
- [ ] `POST /api/v1/quiz/sessions/{sessionId}/answers`
- [ ] `POST /api/v1/quiz/sessions/{sessionId}/complete`
- [ ] `GET /api/v1/quiz/sessions/{sessionId}`

## Scoring

- [ ] Hitung jawaban benar.
- [ ] Hitung persentase.
- [ ] Simpan hasil.
- [ ] Simpan waktu pengerjaan.
- [ ] Simpan breakdown per kategori.

## Acceptance Criteria

User dapat:

```text
Pilih Level
→ Pilih jenis soal
→ Mulai quiz
→ Jawab
→ Submit
→ Lihat skor
→ Lihat pembahasan
```

---

# 12. Sprint 7 — Dashboard & Progress

**Durasi:** Minggu 15–16  
**Goal:** Menyatukan seluruh aktivitas belajar dalam dashboard yang bermakna.

## Dashboard

Tampilkan:

- [ ] Current level.
- [ ] Progress kurikulum.
- [ ] Review due today.
- [ ] Vocabulary learned.
- [ ] Kanji learned.
- [ ] Quiz performance.
- [ ] Learning streak.
- [ ] Recent activity.

## Exam Readiness Score

Versi awal dapat dihitung dari kombinasi:

```text
Vocabulary progress
+ Kanji progress
+ Grammar progress
+ Quiz performance
+ Review consistency
```

Formula final harus diperlakukan sebagai product metric yang dapat berubah tanpa mengubah struktur database utama.

## Life Fluency Score

Versi awal dapat menggunakan indikator:

```text
Seikatsu lessons completed
+ listening practice
+ situational vocabulary
+ review consistency
```

## Acceptance Criteria

Dashboard menjawab tiga pertanyaan:

1. **Saya sudah belajar apa?**
2. **Apa yang harus saya lakukan sekarang?**
3. **Seberapa siap saya untuk target saya?**

---

# 13. Sprint 8 — Hardening & MVP Release

**Durasi:** Minggu 17–18  
**Goal:** Menjadikan MVP cukup stabil untuk digunakan pengguna awal.

## QA

- [ ] Regression test seluruh flow.
- [ ] Test auth.
- [ ] Test RLS.
- [ ] Test SRS.
- [ ] Test quiz.
- [ ] Test dashboard.
- [ ] Test mobile browser.
- [ ] Test empty state.
- [ ] Test error state.

## Performance

- [ ] Audit bundle.
- [ ] Optimalkan image.
- [ ] Optimalkan audio loading.
- [ ] Review database query.
- [ ] Tambahkan index yang diperlukan.
- [ ] Pastikan halaman konten dapat menggunakan caching yang sesuai.

## Security

- [ ] Audit environment variables.
- [ ] Audit RLS policies.
- [ ] Audit server/client boundary.
- [ ] Rate limiting untuk endpoint yang sensitif jika diperlukan.
- [ ] Pastikan service role key tidak pernah dikirim ke client.

## Production

- [ ] Production domain.
- [ ] Production Supabase configuration.
- [ ] Backup strategy.
- [ ] Error monitoring dasar.
- [ ] Analytics dasar jika diperlukan.
- [ ] Release checklist.

## Acceptance Criteria

MVP dinyatakan release-ready apabila:

- [ ] Critical user flow tidak memiliki blocker.
- [ ] Auth aman.
- [ ] RLS tervalidasi.
- [ ] SRS bekerja konsisten.
- [ ] Quiz dapat diselesaikan.
- [ ] Dashboard menampilkan data aktual.
- [ ] Production deployment berhasil.

---

# 14. Prioritas Backlog

Gunakan prioritas berikut:

| Prioritas | Arti |
|---|---|
| **P0** | Wajib untuk MVP; blocker jika tidak ada |
| **P1** | Penting untuk pengalaman MVP |
| **P2** | Bisa ditunda setelah MVP |
| **P3** | Eksperimen / future feature |

## P0

- Authentication.
- Database foundation.
- RLS.
- N5 curriculum.
- Vocabulary.
- Kanji.
- Basic SRS.
- Review session.
- Basic progress.
- Basic dashboard.

## P1

- Seikatsu Michi N5.
- Listening.
- Quiz.
- Exam Readiness.
- Life Fluency.
- Better content search.
- Gamification ringan.

## P2

- N4.
- N3.
- Advanced listening.
- Full JLPT simulation.
- Better analytics.
- Notifications.
- Cloudflare R2 untuk asset besar.
- Meilisearch.

## P3

- N2/N1 full content.
- Community.
- AI personalization.
- AI-generated explanations.
- Adaptive curriculum.
- Native mobile application.

---

# 15. Database Milestone

Database dikembangkan bertahap agar tidak terlalu banyak schema sejak awal.

### Milestone A — Foundation

```text
profiles
levels
tracks
units
lessons
```

### Milestone B — Learning Content

```text
vocab_items
kanji_items
grammar_points
listening_items
```

### Milestone C — User Learning

```text
user_progress
review_cards
review_logs
```

### Milestone D — Assessment

```text
quiz_questions
quiz_options
quiz_sessions
quiz_answers
quiz_results
```

### Milestone E — Future

```text
notifications
gamification
achievements
community
ai_personalization
```

---

# 16. API Milestone

API tidak perlu dibuat seluruhnya di awal.

```text
Sprint 1
└── auth/session + profile

Sprint 2
└── curriculum

Sprint 3
└── vocabulary + kanji

Sprint 4
└── SRS

Sprint 5
└── listening + Seikatsu

Sprint 6
└── quiz

Sprint 7
└── progress + dashboard
```

Semua API utama menggunakan:

```text
/api/v1/...
```

Route Handler bertanggung jawab terhadap HTTP boundary, sedangkan business logic ditempatkan di service/domain layer ketika logic mulai kompleks.

---

# 17. Struktur Task di Repository

Rekomendasi struktur:

```text
apps/web/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── belajar/
│   ├── review/
│   ├── latihan-soal/
│   ├── listening/
│   ├── kamus/
│   └── api/v1/
│
├── components/
├── hooks/
├── lib/
│   ├── api/
│   ├── services/
│   ├── supabase/
│   ├── validators/
│   └── utils/
│
├── types/
├── tests/
└── supabase/
    ├── migrations/
    ├── seed.sql
    └── config.toml
```

---

# 18. Sprint Ceremonies

Untuk setiap sprint:

### Sprint Planning

Dilakukan sebelum sprint dimulai.

Output:

- Sprint Goal.
- Sprint backlog.
- Definition of Done.
- Risiko dan dependency.

### Daily Check

Jika dikerjakan sendiri, cukup gunakan catatan singkat:

```text
Yesterday:
Today:
Blocked:
```

### Sprint Review

Periksa fitur yang benar-benar dapat digunakan, bukan hanya kode yang selesai.

### Sprint Retrospective

Catat:

```text
Apa yang berjalan baik?
Apa yang menghambat?
Apa yang diperbaiki pada sprint berikutnya?
```

---

# 19. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten N5 terlalu lama dibuat | Tinggi | Buat content schema dan seed pipeline sejak awal |
| SRS terlalu kompleks | Tinggi | Isolasi SRS service dan mulai dari algoritma sederhana |
| Scope melebar | Tinggi | Patuhi P0/P1/P2/P3 |
| Supabase free-tier terbatas | Sedang | Pantau storage, database, dan egress; pindahkan asset besar ke R2 jika perlu |
| Audio besar | Sedang | Kompres audio dan gunakan CDN/object storage yang sesuai |
| Query database lambat | Sedang | Index dan profiling query sebelum menambah Redis |
| UI terlalu kompleks | Sedang | Gunakan shadcn/ui dan design system sederhana |
| Security regression | Tinggi | RLS test + server-side authorization |

---

# 20. Setelah MVP

Setelah Sprint 8, jangan langsung menambah semua fitur roadmap. Gunakan data penggunaan untuk menentukan prioritas.

Urutan yang disarankan:

```text
MVP
 ↓
Validasi penggunaan
 ↓
Perbaiki UX + content quality
 ↓
N4
 ↓
Listening yang lebih kaya
 ↓
N3
 ↓
Full JLPT simulation
 ↓
Scaling infrastructure
 ↓
N2/N1
 ↓
AI personalization
```

Komponen infrastructure tambahan baru diperkenalkan ketika ada alasan teknis yang jelas:

```text
PostgreSQL FTS
    ↓ jika search semakin kompleks
Meilisearch

Supabase Storage
    ↓ jika asset/egress semakin besar
Cloudflare R2

Database query
    ↓ jika benar-benar membutuhkan cache
Redis/Upstash

Vercel Cron / Edge Functions
    ↓ jika scheduled/background workload bertambah
Dedicated worker/job system
```

---

# 21. Definition of MVP Success

MVP tidak diukur dari jumlah halaman atau jumlah tabel, tetapi dari apakah pengguna dapat menyelesaikan learning loop utama:

```text
Register
  ↓
Onboarding
  ↓
Pilih Level / Track
  ↓
Belajar Lesson
  ↓
Review SRS
  ↓
Latihan Quiz
  ↓
Lihat Progress
  ↓
Kembali belajar
```

Jika learning loop tersebut berjalan stabil, aman, dan mudah digunakan, maka fondasi Benkyou Shimashou sudah cukup untuk masuk ke tahap pengembangan berikutnya.
