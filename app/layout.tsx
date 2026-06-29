import type { Metadata } from 'next';
import { Inter, Barlow } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'CC — Campaigns That Convert',
  description: 'Full-service marketing agency driving ATL, BTL and digital growth across India.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body className="bg-white text-cc-dark antialiased font-body">{children}</body>
    </html>
  );
}
