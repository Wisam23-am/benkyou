# Benkyou Shimashou — Integration & Release Checklist

Dokumen ini dijalankan setelah implementasi sprint selesai. Urutan migration Supabase harus dipertahankan.

## Status

- [ ] Semua sprint yang direncanakan selesai.
- [ ] Review perubahan kode selesai.
- [ ] Tidak ada secret di repository.
- [ ] Supabase project sudah dibuat.
- [ ] Domain deployment sudah ditentukan.

## 1. Persiapan Lokal

### Prasyarat

- [ ] Node.js 20+ dan npm tersedia.
- [ ] Akun Supabase tersedia.
- [ ] Supabase CLI terpasang atau SQL Editor dapat digunakan.
- [ ] Akun Vercel tersedia.
- [ ] Repository GitHub tersedia.

Verifikasi project sebelum integrasi:

```powershell
npm install
npm run test
npm run lint
npm run type-check
npm run build
```

Semua perintah di atas harus berhasil sebelum migration dijalankan.

## 2. Buat Supabase Project

1. Buka [Supabase Dashboard](https://supabase.com/dashboard).
2. Buat project baru dengan region yang dekat dengan target user.
3. Simpan nama project dan project reference ID.
4. Buka `Project Settings > API`.
5. Catat hanya nilai berikut:
   - Project URL.
   - Publishable/anon key.
6. Jangan masukkan service role key ke browser, commit, log, atau file yang dikirim ke client.

## 3. Konfigurasi Environment Lokal

Buat `.env` dari `.env.example`:

```powershell
Copy-Item .env.example .env.local
```

Isi nilai berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

Catatan:

- `NEXT_PUBLIC_*` memang dapat dibaca browser, tetapi tetap gunakan anon/publishable key, bukan service role key.
- `SUPABASE_SERVICE_ROLE_KEY` belum diperlukan untuk flow aplikasi saat ini. Jika nanti digunakan untuk job server, simpan hanya di environment server/Vercel dan jangan awali dengan `NEXT_PUBLIC_`.
- Restart `npm run dev` setelah mengubah environment.

## 4. Jalankan Database Migration

Jalankan migration dalam urutan berikut:

```text
0001_sprint_1_foundation.sql
0002_srs_core.sql
0003_n5_seed.sql
0004_quiz_engine.sql
0005_quiz_n5_seed.sql
```

### Opsi A — Supabase CLI

Login dan link project:

```powershell
supabase login
supabase link --project-ref <PROJECT_REF>
supabase db push
```

Jika folder migration belum dikenali oleh CLI, gunakan SQL Editor dan jalankan file satu per satu dalam urutan di atas.

### Opsi B — SQL Editor

1. Buka `Supabase Dashboard > SQL Editor`.
2. Buat query baru.
3. Salin isi `0001_sprint_1_foundation.sql` dan jalankan.
4. Ulangi untuk `0002`, `0003`, `0004`, lalu `0005`.
5. Pastikan setiap query selesai tanpa error sebelum melanjutkan.

Verifikasi tabel setelah migration:

```sql
select tablename
from pg_tables
where schemaname = 'public'
order by tablename;
```

Tabel penting yang harus ada:

```text
profiles
levels
tracks
units
lessons
vocab_items
kanji_items
grammar_points
user_progress
review_cards
review_logs
quiz_questions
quiz_options
quiz_sessions
quiz_answers
```

## 5. Verifikasi Seed Data

Jalankan query berikut di SQL Editor:

```sql
select code, name from public.levels order by sort_order;
select code, name from public.tracks order by code;
select count(*) as lesson_count from public.lessons;
select count(*) as vocabulary_count from public.vocab_items;
select count(*) as kanji_count from public.kanji_items;
select count(*) as quiz_question_count from public.quiz_questions;
select count(*) as quiz_option_count from public.quiz_options;
```

Minimum yang diharapkan untuk seed saat ini:

- [ ] 1 level: `N5`.
- [ ] 2 track: `shiken` dan `seikatsu`.
- [ ] 3 lesson.
- [ ] 6 vocabulary item.
- [ ] 3 kanji item.
- [ ] 4 quiz question.
- [ ] 12 quiz option.

## 6. Konfigurasi Supabase Auth

Di `Authentication > Providers`:

- [ ] Email provider aktif.
- [ ] Email confirmation policy dipilih sesuai kebutuhan produk.
- [ ] Password minimum sesuai kebijakan produk.
- [ ] Reset password email template sudah berisi URL aplikasi.

Di `Authentication > URL Configuration`:

- [ ] Site URL lokal: `http://localhost:3000`.
- [ ] Redirect URL lokal: `http://localhost:3000/**`.
- [ ] Site URL preview/production ditambahkan setelah domain Vercel tersedia.
- [ ] Redirect reset password mengarah ke `/reset-password`.

Uji manual:

- [ ] Register user baru.
- [ ] Login.
- [ ] Refresh halaman dashboard dan session tetap ada.
- [ ] Logout.
- [ ] Forgot password.
- [ ] Reset password.
- [ ] Akses `/dashboard` tanpa session diarahkan ke `/login`.

## 7. Verifikasi RLS dan Ownership

Gunakan dua akun test berbeda: `user_a` dan `user_b`.

- [ ] `user_a` hanya dapat membaca profile miliknya.
- [ ] `user_a` tidak dapat membaca atau mengubah `user_b`.
- [ ] Review card dibuat dengan `user_id` session aktif.
- [ ] Review log menggunakan `user_id` session aktif.
- [ ] Quiz session hanya dapat dibaca oleh pemiliknya.
- [ ] Quiz answer tidak dapat dibuat untuk session milik user lain.
- [ ] Client tidak dapat menentukan `user_id` untuk mengambil data user lain.
- [ ] Service role key tidak pernah dikirim ke client.

Endpoint yang wajib diuji saat sudah login:

```text
GET  /api/v1/srs/queue
GET  /api/v1/srs/stats
POST /api/v1/srs/cards/{cardId}/answer
POST /api/v1/quiz/sessions
POST /api/v1/quiz/sessions/{sessionId}/answers
POST /api/v1/quiz/sessions/{sessionId}/complete
GET  /api/v1/progress
```

Endpoint yang wajib mengembalikan `401` tanpa session:

```text
/api/v1/srs/queue
/api/v1/srs/stats
/api/v1/srs/cards/{cardId}/answer
/api/v1/quiz/sessions
/api/v1/quiz/sessions/{sessionId}/answers
/api/v1/quiz/sessions/{sessionId}/complete
/api/v1/progress
```

## 8. Verifikasi Flow Produk

### Curriculum

- [ ] Dashboard → N5 → track → unit → lesson.
- [ ] Shiken Michi memakai radius dan warna Ai.
- [ ] Seikatsu Michi memakai radius dan warna Matcha.
- [ ] Vocabulary dapat dibuka dan didengarkan.
- [ ] Kanji menampilkan reading, onyomi, kunyomi, stroke count, dan contoh.
- [ ] Lesson Seikatsu menampilkan context tags.
- [ ] Listening menampilkan transcript, arti, playback speed, dan pertanyaan.
- [ ] Lesson dapat ditandai selesai.

### SRS

- [ ] Queue review memuat kartu yang jatuh tempo.
- [ ] Jawaban hanya dapat dipilih setelah reveal.
- [ ] Rating `Lupa`, `Sulit`, `Bisa`, dan `Mudah` bekerja.
- [ ] Review berikutnya memiliki `due_at` sesuai scheduler.
- [ ] Review log tersimpan.
- [ ] Empty queue state tampil dengan benar.

### Quiz

- [ ] Quiz N5 dapat dimulai.
- [ ] Setiap opsi hanya dapat dipilih sekali per soal.
- [ ] Jawaban dikirim saat berpindah soal.
- [ ] Session selesai setelah soal terakhir.
- [ ] Score dan percentage tersimpan.
- [ ] Pembahasan tampil setelah selesai.
- [ ] Coba lagi mengosongkan session lokal.

### Dashboard

- [ ] Exam Readiness membaca data aktual.
- [ ] Life Fluency membaca data aktual.
- [ ] Lesson completion tampil.
- [ ] Review due tampil.
- [ ] Quiz score tampil.
- [ ] Empty state tetap masuk akal untuk user baru.

## 9. Konfigurasi Vercel

1. Import repository ke Vercel.
2. Pilih framework Next.js.
3. Tambahkan environment variables untuk setiap environment:
   - Preview.
   - Production.
4. Tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://your-domain.example.com
NODE_ENV=production
```

5. Jangan tambahkan `SUPABASE_SERVICE_ROLE_KEY` kecuali benar-benar dibutuhkan server-side.
6. Tambahkan domain Vercel ke Supabase Auth URL Configuration.
7. Deploy preview terlebih dahulu.
8. Uji semua flow pada preview.
9. Promote ke production setelah checklist lulus.

## 10. Quality Gate Sebelum Release

```powershell
npm run test
npm run lint
npm run type-check
npm run build
```

- [ ] Semua command lulus.
- [ ] Tidak ada error browser console.
- [ ] Tidak ada request API yang mengirim secret.
- [ ] Tidak ada error hydration.
- [ ] Tidak ada horizontal scroll pada 375px.
- [ ] Keyboard focus terlihat.
- [ ] Reduced motion tetap usable.
- [ ] Error, loading, dan empty state sudah diuji.

## 11. Backup dan Rollback

Sebelum migration production:

- [ ] Pastikan backup database Supabase tersedia.
- [ ] Simpan commit/tag release.
- [ ] Catat urutan migration yang sudah dijalankan.
- [ ] Uji migration pada project/staging terpisah jika memungkinkan.

Jika migration gagal:

1. Jangan menjalankan migration berikutnya.
2. Simpan error SQL lengkap.
3. Perbaiki migration dalam file baru; jangan mengedit migration production yang sudah berhasil.
4. Uji ulang pada staging.
5. Jalankan migration perbaikan setelah disetujui.

## 12. Hal yang Masih Memerlukan Keputusan

- [ ] Apakah email confirmation wajib untuk MVP.
- [ ] Domain production final.
- [ ] Apakah audio Web Speech API cukup atau perlu file audio Supabase Storage.
- [ ] Kebijakan retention `review_logs`.
- [ ] Formula final Exam Readiness dan Life Fluency.
- [ ] Monitoring dan analytics yang digunakan.
- [ ] Rate limiting endpoint yang sensitif.

## Definition of Done Integrasi

Integrasi dianggap selesai jika:

- [ ] Migration `0001` sampai `0005` berhasil.
- [ ] Seed N5 terverifikasi.
- [ ] Auth register/login/logout/reset berhasil.
- [ ] RLS lolos uji dua akun.
- [ ] Curriculum, SRS, listening, quiz, dan dashboard dapat digunakan.
- [ ] Progress user tersimpan di Supabase.
- [ ] `npm run test`, `npm run lint`, `npm run type-check`, dan `npm run build` lulus.
- [ ] Preview Vercel berhasil.
- [ ] Production deployment berhasil.
- [ ] Backup dan rollback plan terdokumentasi.
