import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { games, getGame } from '@/lib/games';
import GamePlayer from '@/components/GamePlayer';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import {
  JsonLd,
  SITE_NAME,
  SITE_URL,
  breadcrumbJsonLd,
  videoGameJsonLd,
} from '@/lib/seo';

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  const url = `${SITE_URL}/games/${game.slug}`;
  // Use the game thumbnail as OG when available — already a 16:9-ish
  // asset, so it lays out nicely as a Twitter summary_large_image card.
  const ogImage = game.thumbnail ?? '/Logo.png';
  // Build a description that emphasises the genre tags + status. Helps
  // Google show the right snippet when a query matches "free idle
  // clicker" rather than just the game name.
  const genreLine = game.genre.join(' · ');
  const statusLine = game.status === 'available' ? 'Free in your browser' : 'Coming soon';
  const description = `${game.description} ${statusLine} · ${genreLine} · by ${SITE_NAME}.`;
  return {
    title: game.title,
    description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${game.title} — ${SITE_NAME}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${game.title} — ${SITE_NAME}`,
        },
      ],
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} — ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

const statusConfig = {
  available: { label: 'Available', color: '#22c55e', bg: '#052e16' },
  beta: { label: 'Beta', color: '#f59e0b', bg: '#1c1100' },
  'coming-soon': { label: 'Coming Soon', color: '#a855f7', bg: '#1a0a3a' },
};

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const status = statusConfig[game.status];
  const isPlayable = game.status === 'available' && !!game.url;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Per-page structured data — VideoGame + Breadcrumb. The browser
          ignores these <script type="application/ld+json"> tags; Googlebot
          uses them to render rich results and connect this game to the
          parent Organization defined in the root layout. */}
      <JsonLd
        data={[
          videoGameJsonLd(game),
          breadcrumbJsonLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Games', url: `${SITE_URL}/#games` },
            { name: game.title, url: `${SITE_URL}/games/${game.slug}` },
          ]),
        ]}
      />

      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a855f7] transition-colors mb-10"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Library
      </Link>

      {/* Title + tags */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{ color: status.color, backgroundColor: status.bg }}
        >
          {status.label}
        </span>
        {game.genre.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#1e1a3a] px-2.5 py-0.5 text-xs text-[#64748b]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-[#e2e8f0] leading-tight mb-8 sm:text-4xl">{game.title}</h1>

      {/* Media: player, gallery, or thumbnail */}
      {isPlayable ? (
        <GamePlayer url={game.url!} title={game.title} />
      ) : game.screenshots && game.screenshots.length > 0 ? (
        <ScreenshotGallery shots={game.screenshots} title={game.title} />
      ) : (
        <div className="relative w-full overflow-hidden rounded-xl border border-[#1e1a3a] bg-[#0f0f1e] mb-6" style={{ aspectRatio: '16/9' }}>
          {game.thumbnail ? (
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.2) 0%, transparent 50%)',
                }}
              />
              <Image
                src="/Logo.png"
                alt="Void Soul Studio"
                width={120}
                height={120}
                className="relative z-10 opacity-30"
              />
            </div>
          )}
        </div>
      )}

      {/* Description + CTA */}
      <div className="mt-8 flex flex-col gap-4 max-w-2xl">
        <p className="text-[#64748b] leading-relaxed">
          {game.longDescription ?? game.description}
        </p>

        {!isPlayable && (
          <div className="flex flex-col gap-2 mt-2">
            <button
              disabled
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#1a0a3a] px-6 py-3 text-sm font-medium text-[#a855f7] cursor-not-allowed opacity-70"
            >
              Coming Soon
            </button>
            <p className="text-xs text-[#334155]">
              Follow our{' '}
              <a
                href="https://www.youtube.com/@voidsoul_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7c3aed] hover:underline"
              >
                devlog
              </a>{' '}
              to stay updated.
            </p>
          </div>
        )}
      </div>

      {/* More games */}
      <div className="mt-20 border-t border-[#1e1a3a] pt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
          More Games
        </h2>
        <Link
          href="/"
          className="text-sm text-[#64748b] hover:text-[#a855f7] transition-colors"
        >
          Browse the full library →
        </Link>
      </div>
    </div>
  );
}
