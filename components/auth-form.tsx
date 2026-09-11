'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoaderCircle, LogIn, UserPlus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { loginSchema, registerSchema } from '@/lib/validations';

type AuthMode = 'login' | 'register';

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = mode === 'login';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const parsed = isLogin
      ? loginSchema.safeParse({ email, password })
      : registerSchema.safeParse({ email, password, confirmPassword });

    if (!parsed.success) {
      setStatus({
        type: 'error',
        message:
          parsed.error.issues[0]?.message ?? 'Periksa kembali data kamu.',
      });
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const result = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });

    setIsSubmitting(false);
    if (result.error) {
      setStatus({ type: 'error', message: result.error.message });
      return;
    }

    if (!isLogin && !result.data.session) {
      setStatus({
        type: 'success',
        message:
          'Periksa email kamu untuk mengonfirmasi akun, lalu kembali untuk masuk.',
      });
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="font-bold">
          Alamat email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-12 w-full rounded-neutral border border-input bg-paper px-4 outline-none transition focus:border-ai focus:ring-4 focus:ring-ai/15"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="font-bold">
          Kata sandi
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="min-h-12 w-full rounded-neutral border border-input bg-paper px-4 outline-none transition focus:border-ai focus:ring-4 focus:ring-ai/15"
        />
      </div>
      {!isLogin && (
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="font-bold">
            Ulangi kata sandi
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="min-h-12 w-full rounded-neutral border border-input bg-paper px-4 outline-none transition focus:border-ai focus:ring-4 focus:ring-ai/15"
          />
        </div>
      )}
      {isLogin && (
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-bold text-primary underline-offset-4 hover:underline"
          >
            Lupa kata sandi?
          </Link>
        </div>
      )}
      {status && (
        <p
          role="alert"
          className={`rounded-neutral px-4 py-3 text-sm font-semibold ${status.type === 'error' ? 'bg-red-50 text-hanko' : 'bg-green-50 text-matcha'}`}
        >
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-neutral bg-hanko px-5 font-semibold text-white transition hover:brightness-95 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
        ) : isLogin ? (
          <LogIn size={18} aria-hidden="true" />
        ) : (
          <UserPlus size={18} aria-hidden="true" />
        )}
        {isLogin ? 'Masuk' : 'Buat akun'}
      </button>
    </form>
  );
}
