# Product Requirements Document (PRD)
## Benkyou Shimashou by ウィ (Wi)

**Versi:** 1.0
**Tanggal:** September 2026
**Pemilik Produk:** Wisam (ウィ / Wi)
**Status:** Draft awal — untuk validasi & perencanaan MVP

---

## 1. Latar Belakang & Masalah

Belajar bahasa Jepang untuk JLPT (N5–N1) di platform-platform yang sudah ada umumnya berhenti pada kosakata dan tata bahasa "buku teks" yang disusun untuk lulus ujian. Masalahnya:

1. **Gap antara JLPT dan kehidupan nyata** — banyak kata, ungkapan, dan pola bicara yang dipakai sehari-hari di Jepang (percakapan kasual, bahasa media sosial, bahasa kerja/arubaito, bahasa toko/konbini, dsb.) tidak diajarkan dalam materi JLPT, sehingga pelajar lulus N-level tapi kesulitan berkomunikasi nyata.
2. **Materi terfragmentasi** — pelajar harus menggabungkan banyak sumber (Anki, buku Minna no Nihongo/Genki, YouTube, aplikasi SRS terpisah) tanpa satu alur belajar yang runtut.
3. **Kurangnya konteks budaya & situasional** — kosakata diajarkan tanpa konteks kapan/di mana dipakai (formal vs kasual, kanto vs kansai, dsb).
4. **Progress tracking lemah** — sulit melihat kesiapan nyata seseorang untuk ujian N-level tertentu sekaligus kemampuan komunikasi hariannya.

## 2. Visi Produk

> "Belajar bahasa Jepang yang membuatmu **lulus JLPT** sekaligus **bisa hidup nyaman di Jepang** — satu platform, dua tujuan."

Benkyou Shimashou adalah platform web pembelajaran bahasa Jepang terstruktur dari N5 sampai N1, yang memisahkan secara eksplisit dua jalur materi:
- **Jalur JLPT (Shiken Michi)** — kosakata, kanji, tata bahasa, listening, reading sesuai silabus resmi JLPT per level.
- **Jalur Kehidupan Nyata (Seikatsu Michi)** — kotoba, ungkapan, dan situasi percakapan otentik yang dipakai orang Jepang sehari-hari, ditandai dengan level kesulitan & konteks penggunaan (formal/kasual/slang/regional).

## 3. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Pelajar JLPT Terstruktur** | Mahasiswa/pekerja yang menargetkan lulus N5–N1 dalam waktu tertentu | Kurikulum bertahap, latihan soal, tracking progress per level |
| **Calon Perantau/Pekerja di Jepang** | Akan kuliah/kerja/magang (misal SSW, tokutei ginou) di Jepang | Kotoba praktis, listening situasi nyata, budaya kerja |
| **Otodidak Pemula** | Baru mulai dari nol, butuh bimbingan terstruktur | Onboarding jelas, mnemonic, gamifikasi ringan |
| **Penutur Menengah yang stuck** | Sudah N3/N2 tapi merasa Jepang "buku" tidak nyambung dengan Jepang asli | Modul slang, ungkapan native, shadowing audio otentik |

Catatan: bahasa antarmuka & penjelasan utama menggunakan **Bahasa Indonesia**, karena target awal adalah pelajar Indonesia (sesuai preferensi produk Wisam sendiri sebagai pembelajar JLPT N5).

## 4. Tujuan Produk (Goals)

1. Menyediakan kurikulum terstruktur 5 level (N5→N1) dengan progres yang bisa diukur.
2. Menyediakan modul "Kotoba Sehari-hari" yang terpisah dari silabus JLPT resmi tapi terhubung (linked) ke level kesulitan yang setara.
3. Sistem Spaced Repetition (SRS) untuk kosakata & kanji.
4. Latihan soal bergaya JLPT (mondai) dengan format resmi (moji-goi, bunpou-dokkai, choukai).
5. Audio/listening otentik (bukan hanya rekaman studio) untuk bagian kehidupan nyata.
6. Progress dashboard yang menunjukkan dua skor: **Kesiapan Ujian (Exam Readiness)** dan **Kesiapan Hidup (Life Readiness)**.

## 5. Non-Goals (di luar cakupan MVP)

- Tidak menyediakan sertifikasi resmi JLPT (bukan pengganti ujian resmi).
- Tidak menyediakan kelas tutor 1-on-1 langsung (live class) di MVP — bisa jadi fase lanjut.
- Tidak membangun aplikasi mobile native di fase awal (web-first, responsive).
- Tidak menerjemahkan seluruh dokumen bebas (bukan alat translate umum).

## 6. Fitur Utama (Fase MVP)

### 6.1 Kurikulum Berjenjang (N5–N1)
- Struktur: Level → Unit → Pelajaran (Lesson) → Materi (Kosakata/Kanji/Tata Bahasa/Latihan).
- Setiap level memiliki dua jalur paralel: **Shiken Michi** (JLPT) dan **Seikatsu Michi** (kehidupan nyata), dengan penanda silang (cross-reference) jika kotoba yang sama relevan di keduanya.

### 6.2 Modul Kosakata (Goi)
- Kartu kosakata: kanji, furigana, romaji, arti ID, contoh kalimat, audio native speaker.
- Tag konteks: `formal`, `kasual`, `slang`, `bisnis`, `konbini`, `medsos`, `kansai-ben`, dsb.
- Mnemonic buatan (AI-assisted) dalam Bahasa Indonesia.

### 6.3 Modul Kanji
- Stroke order animation, radikal penyusun, cara baca on'yomi/kun'yomi, contoh kata.
- Pengelompokan sesuai level JLPT resmi (N5: ~100 kanji, dst).

### 6.4 Modul Tata Bahasa (Bunpou)
- Penjelasan pola kalimat + kontras "versi buku" vs "versi lisan sehari-hari" (mis. すみません vs すいません, ~ている vs ~てる).

### 6.5 Sistem SRS (Spaced Repetition)
- Algoritma berbasis SM-2/FSRS untuk kosakata & kanji.
- Review harian otomatis dijadwalkan berdasarkan performa pengguna.

### 6.6 Latihan Soal (Mondai Renshuu)
- Bank soal per level meniru format resmi JLPT (moji-goi, bunpou, dokkai, choukai).
- Simulasi ujian dengan timer & skor estimasi.

### 6.7 Listening Otentik ("Nama no Nihongo")
- Klip audio/video pendek dari situasi nyata (belanja, naik kereta, obrolan teman) dengan transkrip & anotasi ungkapan yang tidak diajarkan di JLPT.

### 6.8 Dashboard Progress
- **Exam Readiness Score** per level (berdasarkan penguasaan silabus resmi).
- **Life Fluency Score** (berdasarkan penguasaan modul kehidupan nyata).
- Statistik streak, kalender belajar, heatmap review SRS.

### 6.9 Gamifikasi Ringan
- Streak harian, badge per unit selesai, leaderboard opsional (per grup/kelas).

## 7. User Stories (contoh, prioritas tinggi)

- Sebagai pelajar N5 pemula, saya ingin mnemonic berbahasa Indonesia untuk tiap kosakata agar lebih mudah diingat.
- Sebagai pengguna yang akan magang di Jepang, saya ingin modul "Kotoba Konbini & Arubaito" agar siap kerja paruh waktu.
- Sebagai pelajar N3, saya ingin tahu perbedaan ungkapan formal JLPT vs ungkapan lisan native agar tidak kaku saat bicara.
- Sebagai pengguna aktif, saya ingin notifikasi review SRS harian agar tidak lupa kosakata yang sudah dipelajari.
- Sebagai pengguna, saya ingin simulasi ujian JLPT lengkap dengan timer untuk mengukur kesiapan sebelum ujian resmi.

## 8. Struktur Konten (Ringkas)

```
Level (N5..N1)
 └─ Jalur: Shiken Michi | Seikatsu Michi
     └─ Unit (tematik, mis. "Perkenalan", "Belanja", "Transportasi")
         └─ Lesson
             ├─ Kosakata (Goi)
             ├─ Kanji
             ├─ Tata Bahasa (Bunpou)
             ├─ Listening
             └─ Latihan Soal (Mondai)
```

## 9. Metrik Keberhasilan (Success Metrics)

| Metrik | Target Indikatif |
|---|---|
| Retensi harian (DAU/MAU) | > 25% |
| Streak rata-rata pengguna aktif | ≥ 7 hari |
| Completion rate per unit | ≥ 60% |
| Skor akurasi latihan soal meningkat per bulan | Trend positif terukur |
| NPS (kepuasan) | ≥ 40 |

## 10. Kebutuhan Non-Fungsional

- **Bahasa UI:** Bahasa Indonesia (default), opsi Bahasa Inggris di fase lanjut.
- **Aksesibilitas:** Font Jepang jelas terbaca (dukungan furigana toggle), kontras warna WCAG AA.
- **Performa:** Waktu muat halaman < 2 detik pada koneksi 4G.
- **Skalabilitas:** Mendukung ribuan pengguna concurrent pada fase pertumbuhan.
- **Offline-friendly (fase lanjut):** Review SRS bisa cache lokal untuk koneksi lemah.
- **Keamanan:** Autentikasi aman melalui Supabase Auth, session management, PostgreSQL Row Level Security (RLS), validasi input, dan HTTPS pada deployment.

## 11. Roadmap Fase

| Fase | Fokus |
|---|---|
| **Fase 0 — Fondasi** | Auth, struktur kurikulum N5, modul kosakata+kanji+SRS dasar |
| **Fase 1 — MVP Publik** | Tambah Seikatsu Michi N5, latihan soal, dashboard progress |
| **Fase 2 — Ekspansi Level** | N4–N3, listening otentik, gamifikasi |
| **Fase 3 — Menuju N1** | N2–N1, simulasi ujian penuh, komunitas/leaderboard |
| **Fase 4 — Personalisasi** | Rekomendasi belajar adaptif berbasis performa (AI-assisted) |

## 12. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Konten "kehidupan nyata" sulit diverifikasi akurasinya | Kurasi dari sumber native/kolaborator penutur asli, review berkala |
| Lisensi audio otentik (hak cipta) | Gunakan rekaman original atau sumber berlisensi terbuka, hindari re-upload konten berhak cipta |
| Beban kurasi konten 5 level × 2 jalur sangat besar | Prioritaskan N5 dulu, gunakan AI-assist untuk draft awal + review manual |
| Retensi pengguna turun setelah beberapa minggu | SRS notifikasi, gamifikasi, streak, konten baru berkala |

## 13. Nama Produk & Branding

- **Nama:** Benkyou Shimashou (勉強しましょう — "Ayo belajar!")
- **Kreator:** ウィ (Wi)
- **Tone:** Ramah, memotivasi, tidak menggurui — seperti belajar bersama teman yang sudah tinggal di Jepang.
