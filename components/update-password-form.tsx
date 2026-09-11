'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(6, 'Kata sandi harus terdiri dari minimal 6 karakter');

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setError('');
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? 'Pilih kata sandi yang lebih kuat.'
      );
      return;
    }
    if (password !== confirmPassword) {
      setError('Kata sandi tidak sama.');
      return;
    }
    const { error: updateError } = await createClient().auth.updateUser({
      password,
    });
    if (updateError) setError(updateError.message);
    else {
      setMessage('Kata sandi berhasil diperbarui.');
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 700);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="new-password" className="font-bold">
          Kata sandi baru
        </label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="min-h-12 w-full rounded-neutral border border-input bg-paper px-4 outline-none transition focus:border-ai focus:ring-4 focus:ring-ai/15"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-new-password" className="font-bold">
          Ulangi kata sandi baru
        </label>
        <input
          id="confirm-new-password"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="min-h-12 w-full rounded-neutral border border-input bg-paper px-4 outline-none transition focus:border-ai focus:ring-4 focus-visible:outline-ai focus:ring-ai/15"
        />
      </div>
      {(error || message) && (
        <p
          role="alert"
          className={`rounded-neutral px-4 py-3 text-sm font-semibold ${error ? 'bg-red-50 text-hanko' : 'bg-green-50 text-matcha'}`}
        >
          {error || message}
        </p>
      )}
      <button
        type="submit"
        className="min-h-12 w-full cursor-pointer rounded-neutral bg-hanko px-5 font-semibold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ai"
      >
        Perbarui kata sandi
      </button>
    </form>
  );
}
