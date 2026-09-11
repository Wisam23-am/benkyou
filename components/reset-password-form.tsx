'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setError('');
    const { error: resetError } =
      await createClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    if (resetError) setError(resetError.message);
    else
      setMessage(
        'Periksa kotak masuk untuk tautan pengaturan ulang kata sandi.'
      );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="reset-email" className="font-bold">
          Alamat email
        </label>
        <input
          id="reset-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-12 w-full rounded-neutral border border-input bg-paper px-4 outline-none transition focus:border-ai focus:ring-4 focus:ring-ai/15"
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
        Kirim tautan reset
      </button>
    </form>
  );
}
