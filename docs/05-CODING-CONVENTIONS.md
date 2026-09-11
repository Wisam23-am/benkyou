# Coding Conventions & Rules
## Benkyou Shimashou by ウィ (Wi)

**Versi:** 2.0
**Stack:** Next.js + TypeScript + Supabase + PostgreSQL + Tailwind CSS + shadcn/ui + TanStack Query + Zustand

---

## 1. Prinsip Umum

- **Type-safe end-to-end** — TypeScript strict, schema validation dengan Zod, dan tipe domain yang konsisten.
- **Server/client boundary jelas** — business logic dan akses data tidak ditaruh sembarangan di komponen UI.
- **Supabase managed services** — Auth, PostgreSQL, Storage digunakan sebagai layanan backend utama; jangan membuat ulang fitur yang sudah disediakan.
- **SRS adalah domain kritikal** — algoritma scheduling diisolasi dari Route Handler dan UI.
- **Minim abstraksi** — jangan membuat repository/service/utility hanya karena "mungkin nanti diperlukan".
- **Security by default** — authorization server-side dan RLS wajib untuk data user-owned.

---

## 2. Struktur Project

Struktur utama:

```text
apps/web/
 ├─ app/
 │   ├─ (auth)/
 │   ├─ (dashboard)/
 │   ├─ belajar/
 │   ├─ review/
 │   ├─ latihan-soal/
 │   ├─ listening/
 │   ├─ kamus/
 │   └─ api/v1/
 ├─ components/
 ├─ hooks/
 ├─ lib/
 │   ├─ api/
 │   ├─ services/
 │   ├─ supabase/
 │   ├─ validations/
 │   ├─ srs/
 │   └─ utils/
 ├─ store/
 ├─ types/
 └─ middleware.ts
```

### Tanggung jawab folder

| Folder | Tanggung jawab |
|---|---|
| `app/` | Routing, pages, layouts, Route Handlers |
| `components/` | UI reusable dan feature components |
| `hooks/` | React hooks dan TanStack Query hooks |
| `lib/api/` | Client untuk endpoint HTTP |
| `lib/services/` | Business logic/server-side application logic |
| `lib/supabase/` | Supabase browser/server client |
| `lib/validations/` | Schema Zod dan validation rules |
| `lib/srs/` | Pure SRS algorithm/domain utilities |
| `store/` | Zustand state client-only |
| `types/` | Shared domain/application types |

---

## 3. Frontend (Next.js + TypeScript)

### 3.1 Penamaan File & Folder

- Folder route mengikuti URL Next.js.
- React component: `PascalCase.tsx`, misalnya `VocabCard.tsx`.
- Hook: `camelCase` dengan prefix `use`, misalnya `useSrsQueue.ts`.
- Utility: `kebab-case.ts`, misalnya `srs-utils.ts`.
- API module: `kebab-case.ts`, misalnya `vocabulary.ts`.
- Test: berdampingan dengan source, misalnya `srs-utils.test.ts`.

### 3.2 Komponen React

- Default gunakan **Server Component**.
- Tambahkan `'use client'` hanya jika komponen membutuhkan state, event handler, browser API, Zustand, atau TanStack Query.
- Komponen presentational tidak boleh melakukan query database langsung.
- Komponen feature menggunakan hook/service abstraction yang sesuai.
- Props harus eksplisit dan typed.
- Hindari komponen raksasa; pecah jika memiliki tanggung jawab yang berbeda.

Contoh:

```tsx
type VocabCardProps = {
  item: VocabItem;
  showFurigana?: boolean;
};

export function VocabCard({ item, showFurigana = true }: VocabCardProps) {
  // UI only
}
```

### 3.3 Import Order

Urutan standar:

1. React/Next.js
2. Third-party packages
3. Absolute internal imports (`@/`)
4. Relative imports
5. Styles/assets jika diperlukan

ESLint harus membantu menjaga urutan ini.

### 3.4 State Management

**TanStack Query:**

- data dari server;
- caching;
- loading/error state;
- query invalidation;
- mutation.

**Zustand:**

- tab aktif;
- preferensi tampilan lokal;
- quiz timer UI;
- toggle furigana;
- state client-only lain.

Jangan menyimpan salinan seluruh database/API response di Zustand.

### 3.5 Styling (Tailwind + shadcn/ui)

- Gunakan Tailwind utility classes.
- Komponen dasar UI memakai shadcn/ui bila tersedia.
- Jangan membuat style inline untuk kasus yang dapat ditangani Tailwind.
- Warna identitas Shiken/Seikatsu harus berasal dari design token/Tailwind theme, bukan hex acak di setiap komponen.
- Responsive dimulai dari mobile lalu ditingkatkan ke layar lebih besar.

### 3.6 TypeScript

- `strict: true` wajib.
- Hindari `any`.
- Gunakan `unknown` untuk data eksternal yang belum tervalidasi.
- Validasi input eksternal dengan Zod sebelum dipakai sebagai domain object.
- Gunakan union untuk domain yang terbatas:

```ts
type Track = 'shiken' | 'seikatsu' | 'both';
type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
type SrsRating = 'lupa' | 'sulit' | 'bisa' | 'mudah';
```

- Jangan menduplikasi type response yang sudah memiliki sumber kebenaran dari schema API/domain.

### 3.7 Validation dengan Zod

Schema request berada di `lib/validations/`.

```ts
export const submitSrsAnswerSchema = z.object({
  rating: z.enum(['lupa', 'sulit', 'bisa', 'mudah']),
  responseTimeMs: z.number().int().nonnegative(),
});
```

Route Handler melakukan parsing sebelum memanggil service.

### 3.8 Error & Loading UX

Setiap query utama menangani minimal:

1. loading → skeleton;
2. error → pesan + retry;
3. data kosong → empty state;
4. success → content.

Skeleton diberi nama `XxxSkeleton` dan dekat dengan komponen terkait.

---

## 4. Backend / Server Side (Next.js)

### 4.1 Struktur Tanggung Jawab

```text
Route Handler / Server Action
        ↓
Validation (Zod)
        ↓
Auth + Authorization
        ↓
Service / Business Logic
        ↓
Supabase server client
        ↓
PostgreSQL / Storage
```

- Route Handler adalah HTTP boundary, bukan tempat semua business logic.
- Service menangani business rule.
- Supabase client menangani akses managed backend.
- RLS menjadi lapisan authorization database untuk tabel yang user-owned.

### 4.2 Route Handler — Aturan

Contoh pola:

```ts
export async function POST(request: Request) {
  const body = await request.json();
  const input = submitSrsAnswerSchema.parse(body);

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return apiError('UNAUTHORIZED', 401);
  }

  const result = await submitSrsAnswer({
    userId: user.id,
    ...input,
  });

  return apiSuccess(result);
}
```

Aturan:

- Jangan mengambil `userId` dari body sebagai sumber kebenaran.
- Jangan memanggil `supabase.auth.getSession()` sebagai satu-satunya dasar authorization untuk operasi sensitif; validasi user/session dengan mekanisme server-side yang sesuai.
- Jangan mengembalikan database row mentah jika response API membutuhkan bentuk domain/DTO tertentu.
- Gunakan helper `apiSuccess()` dan `apiError()` agar response konsisten.
- Jangan menaruh algoritma SRS atau scoring panjang di `route.ts`.

### 4.3 Service Layer

Service satu tanggung jawab:

```text
lib/services/
 ├─ srs/
 │   └─ submit-srs-answer.ts
 ├─ quiz/
 │   └─ submit-quiz.ts
 ├─ progress/
 │   └─ calculate-readiness.ts
 └─ curriculum/
     └─ complete-lesson.ts
```

Service boleh dipanggil dari Route Handler, Server Action, atau background function. Service tidak boleh bergantung pada `Request`, `Response`, atau komponen React.

### 4.4 SRS Engine

SRS logic harus pure dan terisolasi sebanyak mungkin:

```text
lib/srs/
 ├─ scheduler.ts
 ├─ models.ts
 ├─ ratings.ts
 └─ scheduler.test.ts
```

- Input: state card + rating + waktu review.
- Output: state berikutnya (`dueAt`, interval, dan metadata algoritma yang diperlukan).
- Tidak boleh mengakses database langsung.
- Tidak boleh mengakses React/Zustand.
- Pemilihan SM-2 atau FSRS dapat berubah tanpa mengubah UI.

### 4.5 Data Access (Supabase/PostgreSQL)

- Gunakan Supabase server client untuk akses database pada server.
- Gunakan query terarah dan index PostgreSQL yang sesuai.
- Hindari `select('*')` jika hanya membutuhkan beberapa kolom.
- Query user-owned wajib mengandalkan filter user dan RLS.
- Untuk list besar, gunakan pagination.
- Jangan membuat generic repository layer hanya demi abstraksi; buat data-access function ketika query memang kompleks/reusable.

Contoh konsep:

```ts
const { data, error } = await supabase
  .from('review_cards')
  .select('id, item_type, item_id, due_at')
  .eq('user_id', userId)
  .lte('due_at', now)
  .order('due_at')
  .limit(limit);
```

### 4.6 Database Naming

Gunakan snake_case di PostgreSQL:

```text
vocab_items
kanji_items
review_cards
review_logs
quiz_sessions
quiz_answers
lesson_progress
```

Primary key dan foreign key konsisten:

```text
id
user_id
lesson_id
vocab_item_id
kanji_item_id
```

Enum/domain values yang dikonsumsi TypeScript harus memiliki representasi yang konsisten.

### 4.7 RLS (Row Level Security)

Setiap tabel yang menyimpan data milik user harus memiliki policy RLS yang membatasi akses berdasarkan authenticated user.

Contoh konsep policy:

```sql
using (user_id = auth.uid())
```

Aturan:

- RLS bukan pengganti authorization di application layer; keduanya dipakai bersama.
- Tabel konten publik dapat memiliki policy read-only yang berbeda.
- Service role hanya digunakan server-side untuk pekerjaan administratif yang memang membutuhkannya.
- Service role key tidak boleh masuk browser bundle.

### 4.8 Background Jobs

MVP tidak menggunakan Hangfire.

Untuk pekerjaan terjadwal ringan:

```text
Vercel Cron
    ↓
Next.js Route Handler / Edge Function
    ↓
Service
    ↓
Supabase
```

Aturan:

- Job harus idempotent.
- Job memanggil service yang sama dengan flow utama.
- Jangan menaruh business logic SRS khusus hanya di cron.
- Jika pekerjaan menjadi panjang/berat, evaluasi Edge Function atau worker khusus sebelum menambah dependency permanen.

### 4.9 Logging & Error Handling

- Gunakan structured logging yang kompatibel dengan platform deployment.
- Jangan `console.log()` data sensitif seperti password, token, atau service key.
- Error response ke client tidak boleh berisi stack trace production.
- Sertakan request/trace identifier bila tersedia.
- Business error menggunakan error code yang stabil.

---

## 5. Konvensi Lintas Stack

### 5.1 Naming Domain

| Konsep | Istilah baku |
|---|---|
| N5–N1 | `Level` / `JlptLevel` |
| Shiken Michi / Seikatsu Michi | `Track` (`shiken` \| `seikatsu` \| `both`) |
| Kelompok tematik | `Unit` |
| Satuan belajar | `Lesson` |
| Kartu kosakata | `VocabItem` |
| Kartu kanji | `KanjiItem` |
| Poin tata bahasa | `GrammarPoint` |
| Kartu SRS | `ReviewCard` |
| Histori review | `ReviewLog` |
| Skor kesiapan ujian | `ExamReadinessScore` |
| Skor kesiapan hidup | `LifeFluencyScore` |

Jangan mengganti istilah yang sama menjadi `Chapter`, `Topic`, atau `Vocabulary` di layer berbeda.

### 5.2 Git & Commit

- Branch: `feature/srs-review-session`, `fix/quiz-timer-drift`, `chore/update-api-schema`.
- Conventional Commits:
  - `feat:`
  - `fix:`
  - `refactor:`
  - `chore:`
  - `docs:`
  - `test:`

Contoh:

```text
feat(srs): tambah endpoint queue harian
fix(quiz): perbaiki drift timer saat tab idle
refactor(api): pisahkan validation dari route handler
```

- Perubahan penting melalui Pull Request.
- CI harus lolos sebelum merge.

### 5.3 Testing Minimum

| Area | Wajib diuji |
|---|---|
| `lib/srs/*` | Unit test rating lupa/sulit/bisa/mudah dan transisi state |
| Readiness service | Unit test formula dan edge case |
| SRS API | Integration test auth + submit + update card |
| Quiz service/API | Integration test submit session + scoring |
| TanStack Query hooks | Query/mutation + invalidation |
| Zod schemas | Valid input + invalid input |
| RLS | Test akses user A tidak dapat membaca data user B |

Test file berada dekat source:

```text
srs/scheduler.ts
srs/scheduler.test.ts
```

### 5.4 Environment & Secrets

`.env.example` harus mendokumentasikan variable yang diperlukan, misalnya:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Aturan:

- `SUPABASE_SERVICE_ROLE_KEY` hanya server-side.
- Tidak ada secret hardcode.
- `.env.local` tidak masuk Git.
- Environment production disimpan di Vercel/Supabase sesuai kebutuhan.
- Jangan menamai secret dengan `NEXT_PUBLIC_` karena variable tersebut dapat masuk browser bundle.

### 5.5 Linting, Formatting & Typecheck

| Tool | Fungsi |
|---|---|
| ESLint | Lint JavaScript/TypeScript/React/Next.js |
| Prettier | Formatting |
| `prettier-plugin-tailwindcss` | Sorting Tailwind classes |
| TypeScript `tsc --noEmit` | Typecheck |
| Vitest / Testing Library | Unit & component tests |

CI minimal:

```text
lint → typecheck → test → build
```

---

## 6. Checklist Sebelum Merge PR

- [ ] Lint, typecheck, test, dan build berhasil.
- [ ] Route Handler baru melakukan validation + auth/authorization.
- [ ] Tidak ada `userId` yang dipercaya dari input client.
- [ ] Data user-owned dilindungi RLS.
- [ ] Query key TanStack Query menggunakan `qk.*`.
- [ ] Business logic tidak ditaruh langsung di komponen React atau Route Handler.
- [ ] SRS logic tetap terisolasi dan memiliki test.
- [ ] Response API mengikuti `success/data/meta` atau `success/error`.
- [ ] Tidak ada secret di source code atau browser bundle.
- [ ] Asset audio/gambar tidak disimpan sebagai binary di PostgreSQL.
- [ ] Perubahan schema database disertai migration yang jelas.
- [ ] UI menggunakan design token/Tailwind, bukan warna acak.
