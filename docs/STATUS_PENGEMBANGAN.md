# 📊 Status Lengkap Implementasi Pengembangan

Berdasarkan roadmap di `docs/DEVELOPMENT_PLAN.md`, berikut adalah status detail antara apa yang **sudah selesai di kode aplikasi** dan apa yang **menjadi target jangka panjang / data pipeline**:

---

## ✅ Yang SUDAH Selesai 100% (Fitur & Frontend/Backend App):

1. **Arsitektur Modular & Focus Mode**:
   - ✅ `FocusType` terintegrasi di sistem (`kanji`, `grammar`, `vocab`, `date`, `listening`, `mixed`).
   - ✅ UI **Focus Selector** di halaman belajar aktif: pengguna bisa beralih antara *Fokus Kanji*, *Fokus Bunpou*, *Fokus Kotoba*, *Fokus Menyimak*, atau *Semua*.
   - ✅ Tab pembelajaran menyaring materi sesuai fokus yang dipilih secara dinamis.

2. **Modul Tematik Tanggal & Waktu**:
   - ✅ Ditambahkan unit terpisah `time-and-dates` di track Seikatsu.
   - ✅ Lesson *Hari dalam Seminggu* (7 hari + kanji filosofi alam + grammar + dialog).
   - ✅ Lesson *Pola Tanggal 1–10* (*tsuitachi* s.d. *tooka* + kanji `年` + grammar tanggal lahir/perjalanan).

3. **Mesin Kuis & Ujian**:
   - ✅ **Timer 30 Detik per soal** aktif dengan peringatan visual saat sisa waktu <= 10 detik dan auto-timeout.
   - ✅ **Filter Kategori Kuis** (Kosakata, Bunpou, Kanji, Waktu/Bacaan, Menyimak, Semua).
   - ✅ **Penjelasan Jawaban (Explanation)** muncul langsung setelah menjawab dan di review hasil.
   - ✅ Perhitungan skor dan persentase dinamis.

4. **SRS Spaced Repetition**:
   - ✅ Filter kategori review kartu (Semua, Kosakata saja, Kanji saja) beserta jumlah kartu.

5. **Stabilitas & Kualitas**:
   - ✅ TypeScript 0 error (`npm run type-check`).
   - ✅ Vitest 100% lolos (7/7 tests).
   - ✅ Next.js Production Build lolos (36 rute).

---

## ⏳ Yang Belum / Tahap Data Masif (Sprint 9 - 11 Pipeline):

1. **Volume Data Skala Penuh (Bulk Import)**:
   - Saat ini materi N5 di aplikasi sudah modular dan mencakup contoh riil, namun target penuh JLPT N5 lengkap (**100 kanji resmi, ~800 kosakata, dan 400+ bank soal**) membutuhkan file CSV eksternal dan script database migrasi Supabase (`scripts/seed-n5-data.ts`).
2. **Audio Asli untuk Seluruh 15+ Dialog Listening**:
   - Saat ini menggunakan Web Speech Synthesis API (`speechSynthesis`) dan audio mock lokal, belum audio rekaman native speaker format `.mp3` di storage bucket.
3. **Fitur Playlist Belajar Kustom (`user_playlists`)**:
   - Tabel playlist kustom di database Supabase untuk pengguna menyusun urutan materi sendiri.

---

## Rekomendasi Langkah Selanjutnya:
Jika Anda ingin melengkapi hingga target kuantitas data massal:
- Kita bisa membuat **script seeder data masif N5** (`scripts/seed-n5-data.ts` beserta file CSV data kanji & vocab lengkap N5).
- Atau membuat **tabel migrasi database Supabase** untuk `quiz_questions` dan `user_playlists`.
