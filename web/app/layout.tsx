import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://voidsoul.app'),
  title: 'Void Soul Studio — Game Library',
  description:
    'Play games crafted by Void Soul Studio. Atmospheric platformers, ambient puzzles, and more — all in one place.',
  openGraph: {
    title: 'Void Soul Studio — Game Library',
    description: 'Crafting worlds beyond the void.',
    images: ['/Logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0a0a12]">
        <Header />
        <main className="flex-1 pt-[69px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
