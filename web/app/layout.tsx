import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  JsonLd,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seo';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

/**
 * Root metadata — the SEO floor. Every page below inherits these
 * defaults and overrides as needed via its own `metadata` / `generateMetadata`.
 *
 * `title.template` means subpages can ship just the bare page name
 * (e.g. `title: 'Project Spiritless'`) and the browser tab + SERP
 * listing read "Project Spiritless — Void Soul Studio" without us
 * concatenating manually everywhere.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Void Soul Studio — Indie Game Studio, Atmospheric Games & AI Tools',
    template: '%s — Void Soul Studio',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'games',
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/SqaureLogo.png',
  },
  openGraph: {
    title: 'Void Soul Studio — Indie Game Studio & AI Tools',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_LOGO,
        width: 1200,
        height: 630,
        alt: 'Void Soul Studio',
      },
    ],
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Void Soul Studio — Indie Game Studio & AI Tools',
    description: SITE_DESCRIPTION,
    images: [SITE_LOGO],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  /**
   * Search engine ownership verification. Uncomment and paste the codes
   * once you've added the property in each console:
   *
   * Google Search Console
   *   https://search.google.com/search-console
   *   Add property → voidsoulstudio.com → HTML tag method
   *   Copy the `content="..."` value into `google` below.
   *   Then submit /sitemap.xml from the Sitemaps section.
   *
   * Bing Webmaster Tools (also surfaces in DuckDuckGo + Yahoo)
   *   https://www.bing.com/webmasters
   *   Add site → HTML meta tag verification
   *   Copy the `content="..."` value into `other['msvalidate.01']`.
   *
   * Yandex Webmaster (optional, useful if you target Eastern Europe)
   *   https://webmaster.yandex.com
   *   Add site → Meta tag method → paste into `yandex` below.
   *
   * Once any one of these is non-empty, the corresponding meta tag
   * lands in <head> on every page automatically.
   */
  verification: {
    google: 'NImN8sZ9vIDGyjb-RHs5IpvqJQue58lcvW39ZbW4IP8',
    // Paste a Bing Webmaster Tools code into the next line and uncomment
    // to also verify Bing / DuckDuckGo / Yahoo:
    // other: { 'msvalidate.01': 'PASTE-BING-CODE-HERE' },
    // Yandex (only matters for Russian / Eastern European search):
    // yandex: 'PASTE-YANDEX-CODE-HERE',
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
    <html lang="en-AU" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0a0a12]">
        {/* Site-wide structured data — Organization + WebSite. Lives in the
            body so Next.js streams it on first paint and crawlers index it
            without waiting for client JS. Per-page schemas (VideoGame,
            SoftwareApplication, BreadcrumbList) ride alongside this from
            their own pages. */}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

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
