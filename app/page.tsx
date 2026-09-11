import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Sparkles, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-ai/20">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.jpg" 
              alt="Benkyou Logo" 
              width={32} 
              height={32} 
              className="rounded-lg object-cover shadow-sm" 
            />
            <span className="font-bold text-sumi tracking-tight">Benkyou Shimashou</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-sumi-muted hover:text-sumi transition">
              Masuk
            </Link>
            <Link href="/register" className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-sumi px-4 text-sm font-semibold text-white transition hover:bg-sumi/90">
              Mulai Belajar
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-ai/5 to-white px-4 py-20 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2 lg:items-center">
            
            {/* Hero Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-ai/20 bg-ai/10 px-4 py-1.5 text-sm font-semibold text-ai">
                <Sparkles size={16} />
                Jalur cepat menguasai JLPT N5
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-sumi sm:text-6xl sm:leading-[1.1]">
                Kuasai Bahasa Jepang <span className="text-ai">Tanpa Tersesat.</span>
              </h1>
              
              <p className="max-w-lg text-lg leading-relaxed text-sumi-muted sm:text-xl">
                Tinggalkan metode belajar yang membosankan. Benkyou merangkai Kanji, Kosakata, dan Tata Bahasa ke dalam simulasi JLPT interaktif agar Anda siap ujian sungguhan.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-ai px-8 text-lg font-bold text-white shadow-lg shadow-ai/30 transition hover:bg-ai/90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Mulai Sekarang Gratis <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Hero Visual (Floating Cards instead of fake progress) */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-ai/20 via-transparent to-transparent blur-3xl" />
              
              <div className="relative grid gap-6 sm:grid-cols-2">
                {/* Kanji Card */}
                <div className="translate-y-4 transform rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl transition hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-sumi">100+ Kanji Inti</h3>
                  <p className="mt-2 text-sm text-sumi-muted">Pelajari kanji esensial N5 lengkap dengan Onyomi dan Kunyomi.</p>
                  <div className="mt-6 flex justify-between rounded-lg bg-neutral-50 p-3">
                    <span className="font-jp text-3xl font-bold text-sumi">学</span>
                    <div className="text-right">
                      <span className="block text-xs font-semibold text-sumi-muted">ガク • まな.ぶ</span>
                      <span className="block text-sm font-semibold text-ai">Belajar</span>
                    </div>
                  </div>
                </div>

                {/* JLPT Card */}
                <div className="sm:-translate-y-4 transform rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl transition hover:-translate-y-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-matcha/10 text-matcha">
                    <Target size={24} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-sumi">Simulasi JLPT</h3>
                  <p className="mt-2 text-sm text-sumi-muted">Uji kemampuan dengan format soal bahasa Jepang penuh & timer resmi.</p>
                  <div className="mt-6 space-y-2 rounded-lg bg-neutral-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-sumi">
                      <Clock3Icon className="text-matcha" /> 25 Menit
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-200">
                      <div className="h-full w-2/3 rounded-full bg-matcha" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white px-4 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-sumi sm:text-4xl">Kenapa belajar di Benkyou?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-sumi-muted">Fokus pada apa yang penting. Kami membuang gangguan dan merancang lingkungan yang murni untuk kelulusan JLPT Anda.</p>
            </div>

            <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <Feature 
                icon={<BookOpen size={28} />}
                title="Kosakata Berbasis Konteks"
                description="Hafalkan ratusan kosakata (Vocab) yang dilengkapi dengan audio Text-to-Speech dan contoh kalimat aplikatif."
              />
              <Feature 
                icon={<Target size={28} />}
                title="Tata Bahasa Terarah"
                description="Pahami partikel dan struktur kalimat Jepang dengan penjelasan yang lugas tanpa istilah linguistik yang membingungkan."
              />
              <Feature 
                icon={<GraduationCap size={28} />}
                title="Spaced Repetition (SRS)"
                description="Sistem pintar yang akan mengingatkan Anda untuk mengulang Kanji tepat sebelum otak Anda melupakannya."
              />
            </div>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-12">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm font-semibold text-sumi-muted sm:px-6">
          &copy; {new Date().getFullYear()} Benkyou Shimashou. by ウィ.
        </div>
      </footer>
    </div>
  );
}

// Icon helper
function Clock3Icon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16.5 12"/>
    </svg>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-sumi">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-sumi">{title}</h3>
      <p className="mt-3 leading-relaxed text-sumi-muted">{description}</p>
    </div>
  );
}
