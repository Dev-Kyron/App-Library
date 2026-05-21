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
  metadataBase: new URL('https://voidsoulstudio.com'),
  title: 'Void Soul Studio — Game Library',
  description:
    'Play games crafted by Void Soul Studio. Atmospheric platformers, ambient puzzles, and more — all in one place.',
  openGraph: {
    title: 'Void Soul Studio — Game Library',
    description: 'Crafting worlds beyond the void.',
    images: ['/Logo.png'],
    url: 'https://voidsoulstudio.com',
    siteName: 'Void Soul Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Void Soul Studio — Game Library',
    description: 'Crafting worlds beyond the void.',
    images: ['/Logo.png'],
  },
};

export const viewport = {
  themeColor: '#0a0a12',
  width: 'device-width',
  initialScale: 1,
  // Allow zooming up to 5× for accessibility — never lock at 1×.
  maximumScale: 5,
  // Use the safe-area viewport so iOS notches don't clip content.
  viewportFit: 'cover',
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0a0a12]">
        <Header />
        {/* Header is fixed (69px) plus the iOS safe-area top inset so notched
            iPhones don't slide content under the Dynamic Island. */}
        <main
          className="flex-1"
          style={{ paddingTop: 'calc(69px + env(safe-area-inset-top, 0px))' }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
