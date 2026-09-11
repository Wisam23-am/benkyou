import Link from 'next/link';
import { UpdatePasswordForm } from '@/components/update-password-form';

export default function ResetPasswordPage() {
  return (
    <section className="rounded-neutral border border-neutral-300 bg-paper-raised p-7 sm:p-10">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold text-ai">Kata sandi baru</p>
        <h1 className="text-3xl font-semibold">Jalurmu siap dilanjutkan.</h1>
        <p className="text-muted-foreground">
          Pilih kata sandi baru untuk akunmu.
        </p>
      </div>
      <UpdatePasswordForm />
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
