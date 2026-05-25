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
  /**
   * Distribution surface — desktop OSes ship installers, `web` is a hosted
   * SaaS, `extension` is a browser add-on. Drives the meta chips on the
   * card and lets the detail page swap install vs. launch CTAs.
   */
  platforms: ('windows' | 'macos' | 'linux' | 'web')[];
  thumbnail?: string;
  badge?: string;
  /**
   * Which built-in artwork to render in the AppCard thumbnail slot. Defaults
   * to the VoidSoul orb; new apps can opt into their own brand mark.
   */
  thumbnailKind?: 'orb' | 'agenthub-mark';
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
    thumbnailKind: 'orb',
  },
  {
    slug: 'agenthub',
    title: 'AgentHub',
    tagline: 'One tab. Every tool. Powered by AI.',
    description:
      'A browser dashboard that collapses every shift tool into one tab — three workflow columns, one-click "Boot Up My Day", and an AI Agent that answers from company-approved sources only. Built for call centres.',
    href: '/apps/agenthub',
    status: 'available',
    platforms: ['web'],
    badge: 'Live · agenthub.solutions',
    thumbnailKind: 'agenthub-mark',
  },
];

export function getApp(slug: string): AppItem | undefined {
  return apps.find((a) => a.slug === slug);
}
