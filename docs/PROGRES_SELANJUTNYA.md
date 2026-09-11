# 🚀 PROGRES SELANJUTNYA: Fase Kelengkapan Data & Fitur Interaktif

> **Diperbarui pada:** 2026-09-08 (Akhir Sesi)
> **Konteks:** Infrastruktur halaman (Kanji, Vocab, Grammar, Simulasi JLPT) sudah berhasil dibangun. Bug RLS (data 0) sudah diatasi. Seeding data awal sudah dilakukan. 

---

## ✅ Apa yang Sudah Selesai (Fase Rombak UI & Database)
- [x] Navigasi sidebar terstruktur (Belajar, Latihan, Referensi).
- [x] Halaman **Kanji Explorer** (menampilkan 101 kanji aktual dari Supabase).
- [x] Halaman **Vocab Explorer** (menampilkan 342 vocab N5 aktual dari Supabase tanpa duplikasi).
- [x] Halaman **Grammar Explorer** (Tabel Supabase `grammar_items` telah dibuat dan berisi 15 pola tata bahasa aktual).
- [x] Halaman Utama **Simulasi JLPT N5** (UI siap).
- [x] Format pertanyaan kuis (lib/quiz.ts) diperbarui ke dalam Bahasa Jepang penuh mengikuti format JLPT resmi.
- [x] Bypass *Row Level Security* (RLS) menggunakan `adminClient` untuk data publik.

---

## 🎯 Target Progres Selanjutnya (Prioritas Sesi Mendatang)

### 1. Membangun Engine Simulasi JLPT (PRIORITAS UTAMA)
Halaman simulasi saat ini baru sekadar tampilan menu pendaftaran ujian. Kita butuh *engine* ujiannya.
- [x] **Tugas 1.A:** Buat halaman `/simulasi-jlpt/sesi-1` untuk tes *Moji-Goi* (Kosakata/Kanji) dengan timer mundur 25 menit.
- [x] **Tugas 1.B:** Pastikan soal dikunci setelah dijawab (opsional: format *no-back* atau format review sebelum submit).
- [x] **Tugas 1.C:** Buat kalkulasi skor JLPT (contoh: *Moji-Goi* skala 0-120 poin) beserta ambang batas kelulusan (passing grade resmi N5).
- [x] **Tugas 1.D:** Halaman Rapor Hasil Simulasi (Lulus / Tidak Lulus beserta breakdown kelemahan per kategori).

### 2. Fungsionalitas Interaktif (Audio & SRS)
- [x] **Tugas 2.A:** Aktifkan tombol *Speaker* 🔊 di halaman Kosakata menggunakan Web Speech API (Text-to-Speech) agar pengguna bisa mendengar pengucapan bahasa Jepang.
- [x] **Tugas 2.B:** Tambahkan tombol **"Latih Kanji Ini"** atau **"Ingatkan Saya"** di halaman Detail Kanji untuk memasukkan kanji tersebut ke tabel `review_cards` pengguna.

### 3. Ekstensi Data Tingkat Lanjut
- [x] **Tugas 3.A:** Menambahkan sisa ±600 kosakata N5 lainnya ke Supabase secara bertahap.
- [ ] **Tugas 3.B:** Menambahkan contoh kata turunan (Jukugo) di halaman detail tiap Kanji.

---

_Dokumen ini akan menjadi titik awal (checkpoint) ketika pengembangan dilanjutkan kembali._
