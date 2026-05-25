import { ImageResponse } from 'next/og';

/**
 * Dynamic OG image for the AgentHub product page. The static
 * Features_Highlighted.png we were using is dense — small text inside a
 * UI screenshot doesn't render well at OG card size. A branded card with
 * the product name + tagline reads cleanly across Twitter / X, Facebook,
 * LinkedIn, Slack, and Discord embeds.
 */

export const alt = 'AgentHub — One tab. Every tool. Powered by AI.';
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
            'radial-gradient(ellipse at 15% 20%, rgba(124,58,237,0.45) 0%, transparent 60%), radial-gradient(ellipse at 90% 80%, rgba(168,85,247,0.3) 0%, transparent 55%), #0a0a12',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(34,197,94,0.4)',
              background: 'rgba(34,197,94,0.12)',
              color: '#86efac',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '999px',
                background: '#22c55e',
              }}
            />
            Live · agenthub.solutions
          </div>
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#a855f7',
              fontWeight: 600,
            }}
          >
            By Void Soul Studio
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '160px',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              display: 'flex',
            }}
          >
            <span>Agent</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #c084fc 0%, #7c3aed 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Hub
            </span>
          </div>
          <div
            style={{
              fontSize: '36px',
              color: '#c084fc',
              fontStyle: 'italic',
              lineHeight: 1.2,
            }}
          >
            One tab. Every tool. Powered by AI.
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '950px',
            }}
          >
            Call-centre productivity dashboard. Three workflow columns, one-click Boot Up, source-cited AI answers.
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
          <span>voidsoulstudio.com/apps/agenthub</span>
          <span style={{ color: '#7c3aed' }}>Free core · Solo $10 · Team tiers</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
