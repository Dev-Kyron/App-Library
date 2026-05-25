import type { MetadataRoute } from 'next';

/**
 * Web App Manifest. Two things this buys us:
 *
 * 1. **PWA installability** — Chrome / Edge / Safari show an "Install"
 *    affordance once a site has a valid manifest + HTTPS + a service
 *    worker. We don't ship a service worker, so the install prompt
 *    won't trigger automatically, but Android Chrome still respects the
 *    manifest for "Add to Home Screen" and theme colour.
 * 2. **Trust signal** — search engines treat a valid manifest as a
 *    minor positive signal for mobile UX and brand identity.
 *
 * Icons reuse the existing public/Logo.png so we don't bloat the repo
 * with size-specific PNGs. The Logo is already 512×512 and renders
 * crisply when downscaled to icon sizes.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Void Soul Studio',
    short_name: 'Void Soul',
    description:
      'Indie game studio crafting atmospheric games, free browser titles, and AI desktop tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a12',
    theme_color: '#0a0a12',
    orientation: 'portrait-primary',
    categories: ['games', 'entertainment', 'productivity'],
    icons: [
      {
        src: '/Logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/SqaureLogo.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
