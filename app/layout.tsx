import type { Metadata } from 'next';
import { Shippori_Mincho } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-japanese',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Benkyou Shimashou',
  description: 'A focused path to practical Japanese fluency.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="id" className={`h-full antialiased ${shipporiMincho.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-paper text-sumi">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
