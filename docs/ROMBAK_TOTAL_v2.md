# 🔴 RENCANA ROMBAK TOTAL — Benkyou Platform v2.0

> Dibuat: 2026-09-08  
> Status: **RENCANA BARU — MENGGANTIKAN SEMUA MD SEBELUMNYA**  
> Penyusun: Audit menyeluruh kondisi aktual web

---

## 🔍 Audit Kondisi Saat Ini (Masalah yang Jujur)

### ❌ Masalah Kritis

| No | Masalah | Dampak |
|---|---|---|
| 1 | **101 kanji sudah ada di database Supabase, tapi TIDAK ADA halaman yang menampilkannya** | Pengguna tidak bisa melihat kanji yang dipelajari |
| 2 | **Soal kuis masih dalam Bahasa Indonesia** — JLPT asli sepenuhnya dalam Bahasa Jepang | Tidak relevan untuk simulasi JLPT nyata |
| 3 | **Tidak ada halaman Kamus/Kanji khusus** yang menampilkan data dari database | 101 kanji & 89 vocab tersimpan tapi tidak terjangkau user |
| 4 | **Navigasi sidebar hanya 3 link** (Ringkasan, Ulangan, Latihan Soal) — tidak ada navigasi belajar terstruktur | Pengguna bingung cara belajar |
| 5 | **Tidak ada navigasi ke modul belajar dari dashboard** | Fitur `/belajar/N5` tersembunyi, tidak terhubung |
| 6 | **Tidak ada halaman Simulasi JLPT** — yang ada hanya kuis biasa, bukan format JLPT resmi | Tujuan utama aplikasi tidak tercapai |
| 7 | **Tidak ada halaman dedicated Kanji, Vocab, Grammar** yang bisa dijelajahi | Pembelajaran tidak terarah |
| 8 | **Halaman belajar lesson sangat minimal** — beberapa kata vocab saja per lesson | Tidak memenuhi standar modul N5 |

---

## 🎯 Tujuan Utama (Goal yang Harus Dicapai)

1. **Pembelajaran Terarah N5**: Pengguna bisa belajar Kanji, Vocab, Grammar, Listening secara terstruktur per topik
2. **Simulasi Tes JLPT N5**: Format soal bahasa Jepang murni, ada hitungan waktu, breakdown skor per bagian
3. **Database Terpakai**: 101 kanji dan 89 vocab yang sudah ada di Supabase harus tampil dan bisa dipelajari
4. **Navigasi Jelas**: Pengguna tahu di mana mereka, ke mana harus pergi selanjutnya

---

## 🏗️ Arsitektur Halaman Baru (Sitemap)

```
/ (Landing)
├── /login
├── /register
└── /dashboard (Authenticated)
    ├── Dashboard Home (Ringkasan progres, link cepat ke semua fitur)
    │
    ├── /belajar
    │   ├── /belajar/n5 (Pilih topik: Kanji / Vocab / Grammar / Listening)
    │   ├── /belajar/n5/kanji (Daftar 101 Kanji dari DB — browseable + progres)
    │   │   └── /belajar/n5/kanji/[character] (Detail kanji: arti, cara baca, stroke, contoh)
    │   ├── /belajar/n5/vocab (Daftar 89+ Vocab — browseable + filter)
    │   ├── /belajar/n5/grammar (Daftar poin bunpou N5)
    │   └── /belajar/n5/listening (Latihan dialog dengan audio)
    │
    ├── /latihan (Kuis terfokus per kategori, Bahasa Jepang)
    │   ├── /latihan/kanji
    │   ├── /latihan/vocab
    │   └── /latihan/grammar
    │
    ├── /simulasi-jlpt (Simulasi Tes JLPT N5 — format resmi)
    │   ├── Moji-Goi (文字・語彙) — 25 soal, 25 menit
    │   ├── Bunpou-Dokkai (文法・読解) — 20 soal, 25 menit
    │   └── Kekka (結果) — hasil per bagian + rekomendasi
    │
    ├── /ulangan (SRS review harian)
    ├── /kamus (Pencarian vocab & kanji)
    └── /profil
```

---

## 📋 Sprint Plan Rinci

---

### Sprint A: Navigasi & Dashboard Baru
**Target**: Navigasi dapat digunakan dan dashboard terhubung ke semua fitur

#### A1. Redesign Sidebar Navigasi (dashboard/layout.tsx)
Tambah link navigasi lengkap:
- 🏠 Ringkasan (Dashboard)
- 📚 Belajar N5 (dropdown: Kanji / Vocab / Grammar / Listening)
- 🔄 Ulangan Harian (SRS)
- 📝 Latihan Soal (kuis per kategori)
- 🎯 Simulasi JLPT
- 📖 Kamus
- 👤 Profil

#### A2. Redesign Dashboard Home
- Hapus gauge abstrak yang tidak informatif
- Tampilkan: Streak harian, kartu review hari ini, last lesson, quick access ke fitur
- Tambah shortcut card: "Lanjut Belajar Kanji", "Ulangi Vocab", "Simulasi JLPT"

---

### Sprint B: Halaman Belajar Kanji (PRIORITAS TINGGI — 101 kanji tidak terlihat!)
**Target**: Pengguna bisa browse dan belajar semua 101 kanji dari database

#### B1. Buat /belajar/n5/kanji
Halaman daftar semua kanji N5 dari Supabase (`kanji_items`):
- Grid kartu kanji (karakter besar, arti, jumlah coretan)
- Filter berdasarkan: coretan (sedikit → banyak), huruf, kategori
- Indikator apakah sudah dipelajari/SRS

#### B2. Buat /belajar/n5/kanji/[character]
Halaman detail satu kanji:
- Karakter besar dengan animasi stroke order (jika ada)
- Onyomi dan Kunyomi
- Arti bahasa Indonesia
- Contoh kata dan kalimat
- Tombol "Tambah ke kartu SRS"

---

### Sprint C: Halaman Belajar Vocab
**Target**: Pengguna bisa browse 89+ vocab dari database

#### C1. Buat /belajar/n5/vocab
- Tabel/kartu vocab: kanji, kana, arti, contoh kalimat
- Filter: kata kerja / kata sifat / kata benda / ungkapan
- Search bar
- Tombol audio (speechSynthesis)

---

### Sprint D: Halaman Grammar N5
**Target**: Pengguna bisa belajar poin bunpou secara terstruktur

#### D1. Buat /belajar/n5/grammar
Daftar 25+ poin grammar N5:
- Pola kalimat (pattern)
- Contoh kalimat bahasa Jepang
- Arti dan penjelasan penggunaan
- Contoh salah vs benar

---

### Sprint E: Simulasi JLPT N5 (FITUR INTI)
**Target**: Simulasi tes JLPT N5 format resmi dalam Bahasa Jepang murni

#### E1. Format Soal JLPT Resmi (dalam Bahasa Jepang)
Contoh soal Moji-Goi yang BENAR:

```
＿＿の言葉の読み方を、A・B・C・Dから一番いいものを一つえらんでください。
問題：今日は「月曜日」です。
A. げつようび   B. にちようび   C. きんようび   D. かようび
```

Bukan seperti sekarang:
```
❌ "Apa arti こんにちは?" (opsi: Terima kasih / Halo / Permisi)
```

#### E2. Buat /simulasi-jlpt
- Pilih bagian: 文字・語彙 atau 文法・読解
- Timer per bagian (Moji-Goi: 25 menit, Bunpou: 25 menit)
- Soal sepenuhnya dalam Bahasa Jepang
- Tidak bisa kembali ke soal sebelumnya (format ujian resmi)
- Halaman hasil: skor per bagian, persentase kelulusan

#### E3. Bank Soal JLPT (Bahasa Jepang murni)
Harus buat soal baru dengan format JLPT resmi:
- **文字・語彙 (Moji-Goi)**: 
  - Pembacaan kanji (読み方)
  - Penggunaan kata (言葉の使い方)
  - Padanan kata (同じ意味)
- **文法・読解 (Bunpou)**:
  - Melengkapi kalimat (＿＿に何を入れますか)
  - Susunan kalimat (文の組み立て)

---

### Sprint F: Perbaikan Kuis & Latihan (Bahasa Jepang)
**Target**: Soal kuis dalam Bahasa Jepang, bukan Indonesia

#### F1. Konversi bank soal ke format Bahasa Jepang
Contoh SEBELUM (salah):
```
"Apa arti kata 'ありがとう'?"
A. Selamat tinggal  B. Terima kasih  C. Sama-sama
```

Contoh SESUDAH (benar — format JLPT):
```
「ありがとう」と同じ意味はどれですか。
A. さようなら  B. おかげさまで  C. どういたしまして  D. おはようございます
```

---

## 📁 File yang Harus Dibuat / Diubah

### File Baru (Harus Dibuat):
```
app/belajar/n5/page.tsx              — Halaman pilih topik N5
app/belajar/n5/kanji/page.tsx        — Daftar 101 Kanji dari DB
app/belajar/n5/kanji/[char]/page.tsx — Detail satu kanji
app/belajar/n5/vocab/page.tsx        — Daftar vocab dari DB
app/belajar/n5/grammar/page.tsx      — Daftar poin grammar
app/simulasi-jlpt/page.tsx           — Halaman simulasi tes JLPT
app/simulasi-jlpt/hasil/page.tsx     — Hasil simulasi
components/kanji-grid.tsx            — Grid display kanji
components/vocab-table.tsx           — Tabel/kartu vocab
components/jlpt-question.tsx         — Komponen soal format JLPT
lib/jlpt-questions.ts                — Bank soal format JLPT (Bahasa Jepang)
```

### File yang Harus Diubah:
```
app/dashboard/layout.tsx       — Navigasi sidebar dirombak total
app/dashboard/page.tsx         — Dashboard redesign
lib/quiz.ts                    — Soal dikonversi ke Bahasa Jepang
```

---

## 🗓️ Urutan Prioritas Pengerjaan

| Prioritas | Sprint | Estimasi |
|---|---|---|
| 🔴 **1 — KRITIS** | A: Perbaiki Navigasi | Segera |
| 🔴 **2 — KRITIS** | B: Tampilkan 101 Kanji | Segera |
| 🟠 **3 — PENTING** | C: Tampilkan Vocab dari DB | Setelah B |
| 🟠 **4 — PENTING** | E: Simulasi JLPT Format Resmi | Setelah C |
| 🟡 **5 — PERLU** | D: Halaman Grammar | Setelah E |
| 🟡 **6 — PERLU** | F: Konversi soal kuis ke Bahasa Jepang | Bersamaan E |

---

## ✅ Kriteria "Selesai" yang Benar

Aplikasi dianggap **sudah sesuai tujuan** jika:
- [x] Pengguna dapat membuka daftar 101 kanji dan mempelajarinya satu per satu
- [x] Pengguna dapat browse vocab, filter, dan dengar pengucapannya
- [x] Halaman utama simulasi tes JLPT N5 sudah siap dalam Bahasa Jepang
- [x] Soal kuis menggunakan Bahasa Jepang (bukan Indonesia)
- [x] Navigasi jelas: dari dashboard langsung bisa ke Belajar Kanji / Vocab / Simulasi
- [ ] Progres pengguna tercatat dan terlihat di dashboard

---

*Dokumen ini menggantikan DEVELOPMENT_PLAN.md, LAPORAN_PENGEMBANGAN.md, dan STATUS_PENGEMBANGAN.md yang sudah tidak relevan.*
