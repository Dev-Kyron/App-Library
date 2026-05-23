/**
 * Apps & Tools — separate registry from `games.ts` because the surface,
 * pricing model, and routing differ. Right now there's one entry; the
 * type leaves room for more (export utilities, plugins, etc.).
 */

export interface AppItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Detail-route pathname. */
  href: string;
  status: 'available' | 'beta' | 'coming-soon';
  platforms: ('windows' | 'macos' | 'linux')[];
  thumbnail?: string;
  badge?: string;
}

export const apps: AppItem[] = [
  {
    // Slug rebranded for v1.6 — the legacy /apps/voidsoul-assistant URL is
    // kept alive via a permanent redirect in next.config.js so existing
    // bookmarks + SEO equity carry over.
    slug: 'voidsoul-ai-companion',
    title: 'VoidSoul AI Companion',
    tagline: 'The Jarvis loop, finally local.',
    description:
      'A floating desktop AI companion that talks, listens, sees your screen, drives your mouse, opens your apps, edits your files, and remembers every conversation. Bring whichever AI you already love — 12 providers, one body.',
    href: '/apps/voidsoul-ai-companion',
    status: 'coming-soon',
    platforms: ['windows', 'macos', 'linux'],
    badge: 'Founder\'s Edition soon',
  },
];

export function getApp(slug: string): AppItem | undefined {
  return apps.find((a) => a.slug === slug);
}
