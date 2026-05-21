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
    slug: 'voidsoul-assistant',
    title: 'VoidSoul Assistant',
    tagline: 'The Jarvis loop, finally local.',
    description:
      'A floating desktop AI that talks, listens, sees your screen, drives your mouse, and remembers every conversation. Bring whichever AI you already love — 12 providers, one body.',
    href: '/apps/voidsoul-assistant',
    status: 'coming-soon',
    platforms: ['windows', 'macos', 'linux'],
    badge: 'Founder\'s Edition soon',
  },
];

export function getApp(slug: string): AppItem | undefined {
  return apps.find((a) => a.slug === slug);
}
