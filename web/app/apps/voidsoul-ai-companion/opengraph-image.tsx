import { ImageResponse } from 'next/og';

/**
 * Dynamic OG image for the VoidSoul AI Companion product page. Visual
 * twin of the home-page card but framed around the app's name, tagline,
 * and platform support so social previews read as a product, not a
 * studio overview.
 */

export const alt = 'VoidSoul AI Companion — The Jarvis loop, finally local.';
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
            'radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.4) 0%, transparent 60%), radial-gradient(ellipse at 85% 80%, rgba(168,85,247,0.3) 0%, transparent 55%), #0a0a12',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
            Void Soul Studio · Apps & Tools
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '92px',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>VoidSoul</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #c084fc 0%, #7c3aed 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI Companion
            </span>
          </div>
          <div
            style={{
              fontSize: '34px',
              color: '#c084fc',
              fontStyle: 'italic',
              lineHeight: 1.2,
            }}
          >
            The Jarvis loop, finally local.
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Floating desktop AI · 12 providers · vision · voice · agent tools · MCP. Bring whichever model you already love.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '22px',
            color: '#64748b',
          }}
        >
          <span>voidsoulstudio.com/apps/voidsoul-ai-companion</span>
          <span style={{ color: '#7c3aed' }}>Windows · macOS · Linux</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
