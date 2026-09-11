import Link from 'next/link';
import { ResetPasswordForm } from '@/components/reset-password-form';

export default function ForgotPasswordPage() {
  return (
    <section className="rounded-neutral border border-neutral-300 bg-paper-raised p-7 sm:p-10">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold text-ai">Atur ulang akses</p>
        <h1 className="text-3xl font-semibold">Mulai lagi dengan ringan.</h1>
        <p className="text-muted-foreground">
          Kami akan mengirim tautan untuk membuat kata sandi baru.
        </p>
      </div>
      <ResetPasswordForm />
      <p className="mt-7 text-center text-sm">
        <Link
          href="/login"
          className="font-bold text-primary underline-offset-4 hover:underline"
        >
          Kembali ke masuk
        </Link>
      </p>
    </section>
  );
}
