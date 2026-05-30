import Link from 'next/link';
import VoidSoulOrb from './voidsoul/VoidSoulOrb';
import AgentHubMark from './agenthub/AgentHubMark';
import { AppItem } from '@/lib/apps';

const statusStyle = {
  available: { label: 'Available', color: '#22c55e', bg: '#052e16' },
  beta: { label: 'Beta', color: '#f59e0b', bg: '#1c1100' },
  'coming-soon': { label: 'Coming Soon', color: '#a855f7', bg: '#1a0a3a' },
} as const;

const PLATFORM_LABEL = {
  windows: 'Win',
  macos: 'macOS',
  linux: 'Linux',
  web: 'Web',
} as const;

/**
 * Card variant for "apps & tools" — distinct from the GameCard because the
 * thumbnail is an interactive orb (no static screenshot needed) and the
 * meta row shows supported platforms instead of genre tags.
 */
export default function AppCard({ app }: { app: AppItem }) {
  const status = statusStyle[app.status];

  return (
    <Link
      href={app.href}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#2a2550] bg-[#15152a] transition-all duration-300 hover:border-[#7c3aed] hover:shadow-[0_0_28px_0px_rgba(124,58,237,0.3)]"
    >
      {/* Orb-as-thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#101028]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.18) 0%, transparent 50%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
          {app.thumbnailKind === 'agenthub-mark' ? (
            <AgentHubMark size={140} />
          ) : (
            <VoidSoulOrb size={120} />
          )}
        </div>
        <span
          className="absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-medium z-10"
          style={{ color: status.color, backgroundColor: status.bg }}
        >
          {status.label}
        </span>
        {app.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full border border-[#7c3aed]/40 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-[#a855f7] backdrop-blur-sm">
            {app.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold text-[#e2e8f0] transition-colors group-hover:text-[#a855f7] text-base leading-snug">
            {app.title}
          </h3>
          <p className="mt-1.5 text-sm text-[#64748b] line-clamp-2 leading-relaxed">
            {app.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {app.platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-[#2a2550] px-2 py-0.5 text-[10px] text-[#64748b]"
              >
                {PLATFORM_LABEL[p]}
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
