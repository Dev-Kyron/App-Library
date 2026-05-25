import type { MetadataRoute } from 'next';
import { games } from '@/lib/games';
import { apps } from '@/lib/apps';
import { SITE_URL } from '@/lib/seo';

/**
 * Dynamic sitemap. Next.js serves this at `/sitemap.xml` automatically.
 *
 * Priorities are tuned so Google understands the homepage is the
 * primary entry, the featured/flagship pages are next, then the
 * commodity browser games. `lastModified` is the build time — the site
 * is fully static so a fresh build is the only thing that changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1.0,
  };

  const gamePages = games.map((g) => ({
    url: `${SITE_URL}/games/${g.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    // Featured (flagship) game gets a higher signal than the casual
    // browser-game library so Google understands it's the headline title.
    priority: g.featured ? 0.9 : 0.7,
  }));

  const appPages = apps.map((a) => ({
    url: `${SITE_URL}${a.href}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    // Apps update more often than games (versions, pricing, copy).
    priority: 0.8,
  }));

  return [home, ...gamePages, ...appPages];
}
