import { ImageResponse } from 'next/og';

/**
 * Dynamic Open Graph image for the home page.
 *
 * Renders a 1200×630 PNG at build time. Replaces the static /Logo.png we
 * were pointing OG at before — gives social shares (Twitter / X, Facebook,
 * LinkedIn, Discord embeds) a branded card with the studio name + tagline
 * instead of a tiny squared logo on a blank background.
 *
 * Per-page OG images live next to their respective `page.tsx` — see
 * `app/apps/agenthub/opengraph-image.tsx` and the AI Companion equivalent.
 */

export const alt = 'Void Soul Studio — Indie Game Studio & AI Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.25) 0%, transparent 55%), #0a0a12',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top row — studio chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '999px',
              background: '#a855f7',
              boxShadow: '0 0 16px #a855f7',
            }}
          />
          <span
            style={{
              fontSize: '20px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#a855f7',
              fontWeight: 600,
            }}
          >
            Independent Studio · Australia
          </span>
        </div>

        {/* Centre — name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '120px',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              display: 'flex',
              gap: '24px',
            }}
          >
            <span>Void Soul</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #c084fc 0%, #7c3aed 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Studio
            </span>
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              lineHeight: 1.3,
              maxWidth: '900px',
            }}
          >
            Atmospheric games, free browser titles, and AI desktop tools — crafted in the space between worlds.
          </div>
        </div>

        {/* Bottom row — domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '22px',
            color: '#64748b',
          }}
        >
          <span>voidsoulstudio.com</span>
          <span style={{ color: '#7c3aed' }}>Games · Apps · Devlog</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
