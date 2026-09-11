import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="page-enter flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3 text-xl font-semibold text-ai"
        >
          <span className="grid size-10 place-items-center rounded-neutral bg-ai text-primary-foreground">
            <BookOpen size={20} aria-hidden="true" />
          </span>
          Benkyou Shimashou
        </Link>
        {children}
      </div>
    </main>
  );
}
