import Image from 'next/image';
import Link from 'next/link';
import GameCard from '@/components/GameCard';
import { games, getFeaturedGame } from '@/lib/games';

export default function HomePage() {
  const featured = getFeaturedGame();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/VoidBg.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/60 via-transparent to-[#0a0a12]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12]/80 via-transparent to-[#0a0a12]/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a1a4e] bg-[#7c3aed]/10 px-3 py-1 text-xs text-[#a855f7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              Independent Studio · Unreal Engine 5
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#e2e8f0] md:text-6xl">
              Void Soul{' '}
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: '1px #7c3aed',
                  textShadow: '0 0 30px rgba(124,58,237,0.6)',
                }}
              >
                Studio
              </span>
            </h1>
            <p className="mt-5 text-lg text-[#94a3b8] leading-relaxed">
              We craft atmospheric games that live in the space between worlds.
              Dark, deliberate, and built with obsessive care.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#games"
                className="rounded-lg bg-[#7c3aed] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
              >
                Explore Games
              </a>
              <a
                href="https://www.youtube.com/@voidsoul_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#1e1a3a] px-6 py-3 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#7c3aed] hover:text-[#e2e8f0]"
              >
                Watch Devlog ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured game */}
      {featured && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
            Featured
          </h2>
          <Link
            href={`/games/${featured.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e] md:flex-row transition-all duration-300 hover:border-[#7c3aed] hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]"
          >
            <div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:w-1/2 bg-[#0a0a20]">
              {featured.thumbnail ? (
                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    width={160}
                    height={160}
                    className="relative z-10 opacity-30"
                  />
                </div>
              )}
              <span className="absolute top-4 left-4 rounded-full bg-[#1a0a3a] px-3 py-1 text-xs font-medium text-[#a855f7]">
                Coming Soon
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-5 p-8 md:p-12">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#7c3aed] mb-2">
                  {featured.genre.join(' · ')}
                </p>
                <h3 className="text-3xl font-bold text-[#e2e8f0] group-hover:text-[#a855f7] transition-colors">
                  {featured.title}
                </h3>
                <p className="mt-3 text-[#64748b] leading-relaxed">
                  {featured.longDescription ?? featured.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#7c3aed]">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Game grid */}
      <section id="games" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              All Games
            </h2>
            <p className="text-2xl font-bold text-[#e2e8f0]">The Library</p>
          </div>
          <p className="text-sm text-[#475569]">{games.length} titles</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-[#1e1a3a] bg-[#0f0f1e]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <Image
              src="/SqaureLogo.png"
              alt="Void Soul Studio"
              width={80}
              height={80}
              className="rounded-2xl"
            />
            <h2 className="text-3xl font-bold text-[#e2e8f0]">About Void Soul Studio</h2>
            <p className="text-[#64748b] leading-relaxed">
              We&apos;re a small indie studio obsessed with atmosphere, feel, and the
              details most people won&apos;t notice — but will definitely feel. Every
              game we make lives at the intersection of dark aesthetics and tight
              gameplay. Follow our devlog to watch it all get built from scratch.
            </p>
            <div className="flex items-start gap-3 rounded-xl border border-[#2a1a4e] bg-[#7c3aed]/8 px-5 py-4 text-left">
              <span className="mt-0.5 text-[#a855f7]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </span>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                All ad revenue from our mini games goes directly toward funding{' '}
                <span className="text-[#a855f7] font-medium">Project Spiritless</span>{' '}
                development. Every ad watched is a direct contribution to the game.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@voidsoul_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#2a1a4e] bg-[#7c3aed]/10 px-6 py-3 text-sm font-medium text-[#a855f7] transition-all hover:bg-[#7c3aed]/20"
            >
              Follow the journey ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
