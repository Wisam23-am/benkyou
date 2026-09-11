# Design System
## Benkyou Shimashou by ウィ (Wi)

**Versi:** 1.0
**Terkait:** 01-PRD.md, 03-COMPONENT-TREE-UI-FLOW.md, 05-CODING-CONVENTIONS.md

---

## 1. Titik Berangkat: Apa yang Membuat Ini Berbeda

Ini bukan "aplikasi produktivitas dengan tema Jepang" — ini aplikasi tentang **tulisan tangan, tinta, dan kertas**, karena itulah materi yang dipelajari: goresan kanji, kertas washi tempat kaligrafi ditulis, cap hanko sebagai tanda selesai. Sistem desain ini dibangun dari situ, bukan dari template SaaS dashboard generik yang kebetulan diberi font Jepang.

Dua jalur belajar (Shiken Michi / Seikatsu Michi) juga bukan sekadar dua warna label — keduanya harus **terasa** berbeda: Shiken Michi terasa seperti kertas ujian resmi (presisi, garis tegas, kotak kanji), Seikatsu Michi terasa seperti catatan harian tulisan tangan (lebih longgar, sudut membulat, hangat).

**Ditolak secara sadar** (agar tidak jatuh ke default generik):
- Kombinasi krem hangat + serif kontras tinggi + aksen terracotta (pola "AI-generated" paling umum) — palet kami memakai kertas abu-sejuk + indigo + hijau lumut/kuning yuzu, bukan krem-terracotta.
- Kartu seragam dengan radius & shadow yang sama untuk semua elemen — di sini radius justru dipakai sebagai **penanda makna** (formal vs kasual, lihat §3.3).
- Label ALL-CAPS bertitik dua/em-dash ("EYEBROW — label") dan tombol berakhiran panah "→" — tidak dipakai; suara produk sudah ditetapkan ramah & tidak menggurui (01-PRD §13), jadi copy ditulis sebagai kalimat biasa.

---

## 2. Prinsip Desain

1. **Kertas, bukan kaca.** Permukaan datar, hangat, sedikit bertekstur secara visual (bukan glassmorphism/gradient mengkilap). Belajar butuh tenang, bukan ramai.
2. **Tinta sebagai aksen, bukan dekorasi.** Warna kuat (indigo, hijau lumut, merah hanko) dipakai untuk menandai *makna* (jalur, status, prioritas) — bukan ditaburkan sebagai hiasan.
3. **Radius & struktur bicara.** Shiken Michi = garis lurus, sudut tajam (kertas ujian, kotak genkou youshi). Seikatsu Michi = sudut membulat (tulisan tangan, catatan santai). Ini konsisten dari badge sampai card container.
4. **Satu momen animasi yang diingat, sisanya senyap.** Satu urutan bermakna (goresan kaligrafi di landing page) lebih berharga daripada fade-slide-up di setiap section. Animasi lain hanya merespons aksi pengguna (buka kartu, geser rating, tab pindah).
5. **Bacaan nyaman dua skrip.** Teks Indonesia dan teks Jepang punya kebutuhan tipografi berbeda (line-height, ukuran minimum) dan tidak dipaksa memakai font yang sama.

---

## 3. Sistem Warna

### 3.1 Palet Inti

| Token | Hex | Nama | Peran |
|---|---|---|---|
| `paper` | `#EFF1EC` | Washi | Latar utama — abu-hijau pucat, dingin, seperti kertas washi didiamkan, bukan krem hangat |
| `paper-raised` | `#F8F9F6` | Washi Terang | Permukaan card/panel di atas `paper`, kontras lembut tanpa shadow berat |
| `sumi` | `#23262B` | Sumi (tinta) | Warna teks utama — hitam-kebiruan seperti tinta bak, bukan `#000`/`#111` datar |
| `sumi-muted` | `#6B6F73` | Sumi Pudar | Teks sekunder, placeholder, caption |
| `ai` | `#24425E` | Ai (indigo) | **Warna Shiken Michi** — identitas jalur JLPT, formal/akademis |
| `ai-soft` | `#DCE6EE` | Ai Pucat | Background badge/tag Shiken Michi |
| `matcha` | `#4F7A5B` | Matcha | **Warna Seikatsu Michi (primer)** — hijau hangat, hidup sehari-hari |
| `yuzu` | `#E3A23C` | Yuzu | **Warna Seikatsu Michi (sekunder)** — kuning-oranye sitrus, dipakai selang-seling dengan matcha untuk variasi tag konteks (kasual/slang/medsos) |
| `hanko` | `#B23A34` | Shu-iro (cap hanko) | Aksen langka — CTA utama, streak menyala, tanda "selesai". Dipakai **hemat**, seperti cap stempel: satu-dua per layar |

> Catatan sengaja: `yuzu` (#E3A23C) dan `hanko` (#B23A34) dipilih agar tidak berdekatan secara nilai dengan terracotta klise (#D97757) — keduanya lebih jenuh dan condong ke kuning/merah murni, bukan oranye-pastel.

### 3.2 Skala Netral (border, divider, disabled)

```
neutral-100 #F8F9F6   neutral-300 #E4E6E1   neutral-500 #A7ABA4
neutral-700 #6B6F73   neutral-900 #23262B
```

### 3.3 Radius sebagai Penanda Jalur (bukan dekorasi)

```
--radius-shiken:   6px;   /* card, badge, tombol pada konten Shiken Michi   */
--radius-seikatsu: 18px;  /* card, badge, tombol pada konten Seikatsu Michi */
--radius-neutral:  10px;  /* komponen netral: dashboard, auth, settings    */
```

Aturan pemakaian: komponen yang menampilkan konten berlabel `track: shiken` memakai `--radius-shiken`; `track: seikatsu` memakai `--radius-seikatsu`. Komponen yang tidak terikat jalur (Dashboard, Profil, Auth) memakai `--radius-neutral`. Ini menggantikan pola "satu radius untuk semua card" yang umum di kit SaaS generik — di sini radius **membawa informasi**.

### 3.4 Dark Mode ("Mode Malam")

Dipakai saat sesi review malam hari (kebutuhan nyata: SRS harian sering dikerjakan sebelum tidur).

| Token | Hex | Catatan |
|---|---|---|
| `paper` (dark) | `#1B1D1F` | Bukan hitam pekat — tetap terasa "kertas", hanya gelap |
| `sumi` (dark) | `#EDEEEA` | Teks utama jadi hampir-putih hangat |
| `ai` (dark) | `#7FA7C9` | Dinaikkan luminansinya agar tetap kontras AA di atas gelap |
| `matcha` (dark) | `#8FBF9C` | idem |
| `yuzu` (dark) | `#EBB863` | idem |
| `hanko` (dark) | `#E2685F` | idem, tetap dipakai hemat |

---

## 4. Tipografi

**Prinsip:** Latin (UI, instruksi Bahasa Indonesia) dan Jepang (kanji, furigana, contoh kalimat) sengaja **tidak** memakai typeface yang sama — perbedaan ini menegaskan "ini bahasa yang sedang kamu pelajari" vs "ini panduan yang menuntunmu".

| Peran | Typeface | Alasan |
|---|---|---|
| UI & body teks Indonesia | **General Sans** (weight 400/500/600/700) | Grotesk humanis, netral, sangat terbaca untuk paragraf panjang instruksi tata bahasa |
| Konten Jepang (kanji, furigana, contoh kalimat, kartu kosakata) | **Shippori Mincho** | Serif Jepang bergaya kaligrafi/kuas — punya "terminal" yang menyerupai sapuan tinta, cocok secara tematik untuk huruf yang sedang dipelajari, dan membedakan "bahasa target" dari "bahasa antarmuka" |
| Angka data (skor, timer, statistik) | **General Sans** tabular figures | Agar digit sejajar rapi di gauge/leaderboard/timer |

### 4.1 Skala Tipe (dasar 16px, rasio ~1.25)

```
display   40 / 48   General Sans SemiBold   — hero landing, judul level
h1        28 / 36   General Sans SemiBold   — judul halaman (Dashboard, Lesson)
h2        22 / 30   General Sans Medium     — judul section/card
body      16 / 26   General Sans Regular    — paragraf instruksi
caption   13 / 18   General Sans Regular    — label, meta info
kanji-lg  32 / 44   Shippori Mincho         — kanji utama di KanjiCard
kanji-md  24 / 34   Shippori Mincho         — kanji inline di VocabCard/GrammarCard
furigana  13 / 16   Shippori Mincho         — selalu di atas kanji, ukuran ~40% dari kanji induk
```

### 4.2 Aturan Khusus

- **Ukuran font Jepang minimum 20px di mobile** untuk kartu kosakata/kanji utama (sudah ditetapkan di 03-COMPONENT-TREE §7) — jangan turunkan demi memuat lebih banyak dalam satu layar.
- Lebar baris teks instruksi Bahasa Indonesia dibatasi **~68–72 karakter** (kelas `.prose-id` di Tailwind, `max-width: 42rem`), agar nyaman dibaca saat menjelaskan tata bahasa panjang.
- Teks Jepang **tidak** dijustify dan tidak dipotong hyphenation Latin — gunakan `word-break: keep-all` khusus blok Jepang.
- Tidak ada teks ALL-CAPS untuk label kategori (mis. tag `formal`/`kasual` ditulis kapital awal biasa: "Formal", "Kasual", bukan "FORMAL").

---

## 5. Layout & Grid

```
Desktop  : container max-width 1200px, grid 12 kolom, gutter 24px
Tablet   : container fluid, grid 8 kolom, gutter 20px
Mobile   : single column, padding horizontal 16px
```

### 5.1 Kolom Bacaan Sempit untuk Konten Instruksional

Halaman Lesson (Kosakata/Kanji/Tata Bahasa) memakai **kolom konten 680px** yang dipusatkan secara vertikal-scroll, dengan `LessonTabs` menempel sebagai sidebar tersembunyi di mobile (bottom sheet) dan sidebar kiri sempit di desktop — bukan tab horizontal lebar yang meregangkan garis baca teks Jepang+Indonesia campuran.

```
Desktop Lesson Page:
┌────────────┬──────────────────────────────────────────┐
│ LessonTabs │  Breadcrumb + ProgressBar                 │
│ (sidebar,  │  ──────────────────────────────────────── │
│  80px ikon │  Konten tab aktif (max-width 680px,       │
│  + label)  │  center dalam area ini)                   │
│            │                                            │
│            │  LessonFooterNav                          │
└────────────┴──────────────────────────────────────────┘

Mobile Lesson Page:
┌────────────────────────────┐
│ Breadcrumb (ringkas)        │
│ ProgressBar                 │
│ ──────────────────────────  │
│ Konten tab aktif (full-w,   │
│  padding 16px)              │
│                              │
│ [Tab bar sebagai bottom     │
│  sheet/segmented control]   │
│ LessonFooterNav (sticky)    │
└────────────────────────────┘
```

### 5.2 Dashboard sebagai Hero

Karena Dashboard adalah halaman yang dibuka setiap hari, elemen paling dominan di viewport pertama **memang sengaja** dua gauge kesiapan (`ExamReadinessGauge`, `LifeFluencyGauge`) berukuran besar — ini bukan default "angka besar + label kecil" yang dipakai asal, tapi treatment paling jujur untuk produk yang inti nilainya adalah "seberapa siap kamu". `StreakCalendar` dan `ProgressChart` mengikuti di bawah, bukan bersaing untuk perhatian pertama.

```
┌───────────────────────────────────────────┐
│ WelcomeHeader (sapaan + streak kecil)      │
├───────────────────┬─────────────────────── │
│ ExamReadinessGauge │ LifeFluencyGauge       │  ← hero, besar, dua gauge berdampingan
├───────────────────┴─────────────────────── │
│ ContinueLearningCard │ TodayReviewCard      │
├───────────────────────────────────────────┤
│ StreakCalendar (heatmap)                   │
├───────────────────────────────────────────┤
│ ProgressChart                              │
└───────────────────────────────────────────┘
```

---

## 6. Komponen Kunci — Spesifikasi Visual

### 6.1 VocabCard / KanjiCard / GrammarCard

- Container: `paper-raised`, border 1px `neutral-300`, radius sesuai `track` (§3.3), **tanpa** drop-shadow default — shadow hanya muncul saat `:hover`/`:focus` (elevasi 2px, `shadow: 0 4px 12px rgba(35,38,43,0.08)`) sebagai afordansi bahwa kartu bisa diklik/diperluas.
- `ContextTagBadge`: pill kecil radius penuh (bukan mengikuti radius jalur — badge kontekstual seperti "slang"/"bisnis" adalah metadata lintas-jalur), warna diambil dari mapping tag → `ai-soft`/`matcha`/`yuzu` sesuai formalitas.
- `MnemonicBox`: collapsed by default, expand dengan animasi tinggi (lihat §7.4), ikon lampu/kertas catatan kecil, background sedikit beda (`neutral-100`) agar terasa seperti "catatan tempel" bukan bagian utama kartu.

### 6.2 ReviewCard (SRS)

- Ukuran besar, dominan di layar (mobile: hampir full-width dengan margin 16px), karena ini satu-satunya fokus tugas saat sesi review.
- `PromptSide` pakai tipografi `kanji-lg`/`furigana` di tengah, sangat lega (padding vertikal besar) — tidak ada elemen lain yang bersaing.
- `SelfRatingButtons` (Lupa/Sulit/Bisa/Mudah): warna progresif dari `hanko` (Lupa) → `yuzu` (Sulit) → `matcha` (Bisa) → `ai` (Mudah), memberi asosiasi warna-ke-hasil yang konsisten tanpa perlu label besar.

### 6.3 ExamReadinessGauge / LifeFluencyGauge

- Radial gauge (arc 270°), warna arc: `ai` untuk Exam Readiness, `matcha` untuk Life Fluency — konsisten dengan warna jalur di seluruh produk.
- Angka skor di tengah gauge pakai `display`/tabular figures, animasi count-up saat mount (§7.6).

### 6.4 Tombol & CTA

- Primary CTA: solid `hanko` dengan teks putih, radius `--radius-neutral`, dipakai **maksimal satu per layar** (mis. "Lanjut Belajar", "Mulai Review") — bukan setiap tombol memakai warna aksen ini.
- Secondary: outline `sumi-muted`, transparan.
- Tidak ada ikon panah "→" ditambahkan otomatis ke akhir label tombol; label berdiri sendiri sebagai kata kerja aktif ("Lanjut Belajar", bukan "Lanjut Belajar →").

---

## 7. Motion & Animasi (Framer Motion)

### 7.1 Prinsip Gerak

- **Satu momen orkestrasi** di landing page (goresan kaligrafi), sisanya **motion yang menjawab aksi pengguna** — bukan fade-slide-up otomatis di tiap section saat scroll.
- Semua animasi non-esensial dibungkus `useReducedMotion()` dari Framer Motion; jika `true`, ganti ke crossfade instan atau langsung tampilkan end-state (khususnya untuk stroke animation & confetti).
- Durasi standar: **micro** 120–180ms (hover, tap feedback), **transisi** 250–350ms (tab switch, expand/collapse), **showcase** 600–1200ms (stroke order, hero) — jangan campur skala durasi di luar tiga kelompok ini agar ritme aplikasi konsisten.
- Easing standar: `spring` (stiffness 300, damping 30) untuk apa pun yang terasa seperti objek fisik (flip kartu, swipe, gauge); `easeOut` untuk fade/height (tab, accordion).

### 7.2 Hero Landing — Goresan Kaligrafi (satu-satunya motion non-trigger)

Kanji 学 ("belajar") digambar ulang goresan demi goresan sebagai SVG saat landing page dimuat, lalu menetap sebagai bagian dari headline. Ini satu-satunya animasi yang berjalan otomatis tanpa interaksi.

```tsx
// components/marketing/HeroKanjiStroke.tsx
const strokeVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeInOut" },
  }),
};

<motion.svg viewBox="0 0 200 200">
  {strokes.map((d, i) => (
    <motion.path
      key={i}
      d={d}
      stroke="var(--color-sumi)"
      strokeWidth={6}
      fill="none"
      custom={i}
      variants={strokeVariants}
      initial="hidden"
      animate={prefersReducedMotion ? "visible" : "visible"}
      // reduced motion: set transition duration 0 lewat variants kondisional
    />
  ))}
</motion.svg>
```

### 7.3 KanjiStrokeAnimation (fitur belajar, user-triggered)

Berbeda dari hero — ini dipicu tombol "Putar" di `KanjiCard`, dipakai berulang kali sebagai alat bantu belajar cara menulis, bukan dekorasi:

```tsx
function KanjiStrokeAnimation({ strokes }: { strokes: string[] }) {
  const controls = useAnimationControls();
  const play = async () => {
    for (let i = 0; i < strokes.length; i++) {
      await controls.start(`stroke-${i}`);
    }
  };
  // tiap <motion.path> stroke_i punya variant stroke-i: { pathLength: 1 }
  // urutan sekuensial (await berurutan) meniru urutan tulisan tangan asli,
  // BUKAN stagger paralel — urutan goresan adalah bagian dari materi yang diajarkan
}
```

### 7.4 MnemonicBox / Accordion Expand

```tsx
<motion.div
  initial={false}
  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  style={{ overflow: "hidden" }}
>
  {children}
</motion.div>
```

### 7.5 ReviewCard — Flip & Swipe (mobile)

Flip saat "Lihat Jawaban":
```tsx
<motion.div
  animate={{ rotateY: isRevealed ? 180 : 0 }}
  transition={{ type: "spring", stiffness: 260, damping: 25 }}
  style={{ transformStyle: "preserve-3d" }}
>
  <div style={{ backfaceVisibility: "hidden" }}><PromptSide /></div>
  <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", inset: 0 }}>
    <AnswerSide />
  </div>
</motion.div>
```

Swipe opsional untuk rating (sesuai 03-COMPONENT-TREE §7 "swipe opsional"):
```tsx
const x = useMotionValue(0);
const rotate = useTransform(x, [-200, 200], [-15, 15]);
const ratingHint = useTransform(x, [-150, -40, 40, 150], ["Lupa", "", "", "Mudah"]);

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.6}
  style={{ x, rotate }}
  onDragEnd={(_, info) => {
    if (info.offset.x > 120) submitRating("mudah");
    else if (info.offset.x < -120) submitRating("lupa");
  }}
>
  <ReviewCardFace />
</motion.div>
```
Tombol `SelfRatingButtons` tetap ditampilkan sebagai jalur utama (aksesibel via tap/keyboard) — swipe murni shortcut opsional, tidak menggantikan kontrol eksplisit.

### 7.6 Gauge Count-Up (Dashboard)

```tsx
const spring = useSpring(0, { stiffness: 60, damping: 20 });
useEffect(() => { spring.set(readinessScore); }, [readinessScore]);
const display = useTransform(spring, (v) => Math.round(v));
// arc gauge: strokeDashoffset di-drive dari spring yang sama
```

### 7.7 Tab Switching (LessonTabs) — Shared Layout, Bukan Fade Semua Konten

```tsx
{tabs.map((tab) => (
  <button key={tab.id} onClick={() => setActive(tab.id)} className="relative">
    {tab.label}
    {active === tab.id && (
      <motion.div layoutId="lesson-tab-underline" className="absolute bottom-0 h-[2px] bg-ai" />
    )}
  </button>
))}
```
Konten tab berpindah dengan crossfade singkat (150ms) memakai `AnimatePresence mode="wait"`, bukan slide besar yang menggeser layout.

### 7.8 Micro-feedback "Lesson Selesai"

Saat `LessonFooterNav` → "Tandai Selesai" ditekan: scale-pop kecil pada tombol (0.95 → 1.05 → 1, 200ms) + 4–6 partikel kecil (bukan confetti penuh layar) memudar ke atas dari tombol, warna `hanko`/`matcha` bergantian. Selaras dengan prinsip 03-COMPONENT-TREE §7: "mendukung motivasi tanpa berlebihan".

### 7.9 Quiz Timer

Bar linear, `width` di-animate langsung (bukan `useState` + re-render tiap detik) via `animate(scope.current, { width: "0%" }, { duration: totalSeconds, ease: "linear" })`; warna bar transisi `matcha → yuzu → hanko` lewat `useTransform` pada progress value, bukan `setInterval` yang mengganti class warna secara diskrit (menghindari "loncat" warna yang terasa kasar).

---

## 8. Aksesibilitas & Kualitas Dasar

- Kontras teks minimum **WCAG AA** (4.5:1 body, 3:1 teks besar) — diverifikasi khusus untuk `ai`/`matcha`/`yuzu` di atas `paper` dan versi dark mode-nya.
- Semua elemen interaktif punya **focus ring terlihat** (`outline: 2px solid var(--color-ai); outline-offset: 2px`), tidak dihapus dengan `outline: none` tanpa pengganti.
- `prefers-reduced-motion` dihormati di seluruh komponen §7 — bukan opsional per komponen, tapi provider global (`MotionConfig reducedMotion="user"` di root layout) supaya tidak lupa di komponen baru.
- Target sentuh minimum 44×44px untuk `SelfRatingButtons`, `AudioPlayButton`, dan kontrol di mobile.
- Toggle furigana global (Zustand + persist, sudah ditetapkan di 03-COMPONENT-TREE §7) juga mempengaruhi ukuran baseline teks Jepang — memastikan pengguna pemula tidak kehilangan bantuan baca demi tata letak yang lebih ringkas.

---

## 9. Token untuk Implementasi (Tailwind)

```js
// tailwind.config.ts (potongan relevan)
export default {
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#EFF1EC", raised: "#F8F9F6" },
        sumi: { DEFAULT: "#23262B", muted: "#6B6F73" },
        ai: { DEFAULT: "#24425E", soft: "#DCE6EE" },
        matcha: "#4F7A5B",
        yuzu: "#E3A23C",
        hanko: "#B23A34",
      },
      borderRadius: {
        shiken: "6px",
        seikatsu: "18px",
        neutral: "10px",
      },
      fontFamily: {
        sans: ["General Sans", "sans-serif"],
        jp: ["Shippori Mincho", "serif"],
      },
    },
  },
};
```

Sesuai aturan di 05-CODING-CONVENTIONS.md §2.6: **tidak ada hex warna jalur yang di-hardcode di komponen** — semua lewat token `ai`/`matcha`/`yuzu`/`hanko` dan radius `shiken`/`seikatsu`/`neutral` di atas.

---

## 10. Ringkasan Keputusan (untuk referensi cepat)

| Elemen | Keputusan | Alasan singkat |
|---|---|---|
| Warna dasar | Washi abu-hijau pucat, bukan krem | Menghindari klise krem+terracotta |
| Aksen kuat | `hanko` merah, dipakai hemat | Meniru fungsi cap stempel: penanda, bukan hiasan |
| Radius | Berbeda per jalur (tajam vs bulat) | Radius membawa makna, bukan dekorasi seragam |
| Tipografi | Latin ≠ Jepang (General Sans vs Shippori Mincho) | Membedakan "bahasa panduan" vs "bahasa yang dipelajari" |
| Motion utama | Goresan kaligrafi di hero, satu kali | Satu momen orkestrasi, bukan animasi bertebaran |
| Motion lain | Selalu respons aksi (flip, swipe, expand, tab) | Motion menjawab pengguna, bukan menghiasi layar |
| Hero Dashboard | Dua gauge besar | Jujur terhadap nilai inti produk (kesiapan), bukan angka besar asal |
