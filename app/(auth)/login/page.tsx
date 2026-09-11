import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <section className="rounded-neutral border border-neutral-300 bg-paper-raised p-7 sm:p-10">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold text-ai">Kembali belajar</p>
        <h1 className="text-3xl font-semibold">Lanjutkan belajarmu.</h1>
        <p className="text-muted-foreground">
          Masuk untuk melanjutkan jalur belajar bahasa Jepangmu.
        </p>
      </div>
      <AuthForm mode="login" />
      <p className="mt-7 text-center text-sm text-muted-foreground">
        Belum punya akun?{' '}
        <Link
          href="/register"
          className="font-bold text-primary underline-offset-4 hover:underline"
        >
          Buat akun
        </Link>
      </p>
    </section>
  );
}
