# 🚀 PERSIAPAN DEPLOYMENT & FINALISASI FITUR

> **Dibuat pada:** 2026-09-09
> **Konteks:** Menuju rilis produksi (Deployment). Memastikan simulasi JLPT 100% otentik dengan dukungan *Furigana*, dan sistem aman dari celah keamanan.

---

## 🎯 Target Pra-Deployment

### 1. Sistem Furigana (Otentikasi JLPT)
Pada soal JLPT N5, seluruh kanji (kecuali kanji yang sedang ditanyakan) **selalu** dilengkapi dengan Furigana (cara baca di atas huruf).
- [x] **Tugas 1.A:** Buat komponen `<FuriganaText />` yang bisa membaca sintaks khusus (contoh: `[月曜日|げつようび]`) dan merendernya menjadi elemen HTML `<ruby>`.
- [x] **Tugas 1.B:** Update bank soal di `lib/quiz.ts` agar menyertakan sintaks furigana tersebut di semua prompt dan opsi jawaban.
- [x] **Tugas 1.C:** Integrasikan komponen Furigana ke dalam `jlpt-engine.tsx` dan `quiz-session.tsx`.

### 2. Audit Keamanan & Kesiapan Produksi (Security)
Memastikan tidak ada data sensitif yang bocor atau dapat diakses oleh pengguna lain.
- [x] **Tugas 2.A:** Verifikasi kebijakan Row Level Security (RLS) Supabase untuk tabel profil pengguna, `review_cards`, dan `user_progress` (Pastikan `auth.uid() = user_id`).
- [x] **Tugas 2.B:** Pastikan semua *Server Actions* memvalidasi sesi (session check) sebelum melakukan operasi *Insert/Update/Delete*.
- [x] **Tugas 2.C:** Lakukan `npm run build` untuk memastikan tidak ada *build errors*, *hydration mismatch*, atau *type errors*.

### 3. Panduan Deployment
- **Frontend:** Vercel (Recomended).
- **Backend/DB:** Supabase (Proyek sudah live, tinggal memastikan Environment Variables Vercel terhubung ke `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
