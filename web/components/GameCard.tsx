import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/games';

const statusConfig = {
  available: { label: 'Play Now', color: '#22c55e', bg: '#052e16' },
  beta: { label: 'Beta', color: '#f59e0b', bg: '#1c1100' },
  'coming-soon': { label: 'Coming Soon', color: '#a855f7', bg: '#1a0a3a' },
};

export default function GameCard({ game }: { game: Game }) {
  const status = statusConfig[game.status];

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#2a2550] bg-[#15152a] transition-all duration-300 hover:border-[#7c3aed] hover:shadow-[0_0_24px_0px_rgba(124,58,237,0.25)]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#101028]">
        {game.thumbnail ? (
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(ellipse at center, #7c3aed 0%, transparent 70%)',
              }}
            />
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#2a1a4e] relative z-10"
            >
              <path
                d="M15 10l4.553-2.276A1 1 0 0121 8.724v6.552a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Status badge */}
        <span
          className="absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ color: status.color, backgroundColor: status.bg }}
        >
          {status.label}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold text-[#e2e8f0] transition-colors group-hover:text-[#a855f7] text-base leading-snug">
            {game.title}
          </h3>
          <p className="mt-1.5 text-sm text-[#64748b] line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {game.genre.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#2a2550] px-2 py-0.5 text-xs text-[#64748b]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-xs font-medium text-[#7c3aed] opacity-60 transition-opacity group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
