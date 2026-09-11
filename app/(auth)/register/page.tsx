import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

export default function RegisterPage() {
  return (
    <section className="rounded-neutral border border-neutral-300 bg-paper-raised p-7 sm:p-10">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold text-matcha">Mulai dengan tenang</p>
        <h1 className="text-3xl font-semibold">
          Buka ruang untuk bahasa Jepang.
        </h1>
        <p className="text-muted-foreground">
          Simpan jalur belajar harianmu dengan akun gratis.
        </p>
      </div>
      <AuthForm mode="register" />
      <p className="mt-7 text-center text-sm text-muted-foreground">
        Sudah punya akun?{' '}
        <Link
          href="/login"
          className="font-bold text-primary underline-offset-4 hover:underline"
        >
          Masuk
        </Link>
      </p>
    </section>
  );
}
