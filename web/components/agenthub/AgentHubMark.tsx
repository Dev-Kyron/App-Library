'use client';

/**
 * AgentHub brand mark — re-creation of the real product's triangular node
 * graph (seven dots, eight connecting lines) as an animated SVG. Each node
 * breathes; each edge has a faint travelling pulse so the graph feels live.
 *
 * Pure SVG / CSS so it renders crisply at any size and never blocks paint.
 * Used as the hero visual and AppCard thumbnail for AgentHub. The actual
 * source SVG (web/public/agenthub/mark.svg) is the brand favicon; this
 * component is the in-page animated counterpart, tuned for hero placement.
 */

interface AgentHubMarkProps {
  size?: number;
  className?: string;
}

// Node positions chosen by tracing the logo (assets/logo.png in the
// AgentHub repo). Coords are on a 100×100 viewBox so the mark scales
// crisply at any rendered size.
const NODES = [
  { id: 'apex', cx: 52, cy: 14 },
  { id: 'l-mid', cx: 30, cy: 50 },
  { id: 'r-mid', cx: 55, cy: 48 },
  { id: 'centre', cx: 44, cy: 62 },
  { id: 'l-base', cx: 14, cy: 84 },
  { id: 'r-base', cx: 86, cy: 80 },
  { id: 'b-mid', cx: 70, cy: 60 },
] as const;

// Edges mirror the eight visible struts on the brand mark. Order doesn't
// matter for rendering but the pulse delays below assume this order.
const EDGES: [string, string][] = [
  ['apex', 'l-mid'],
  ['apex', 'r-mid'],
  ['apex', 'r-base'],
  ['l-mid', 'centre'],
  ['r-mid', 'centre'],
  ['l-mid', 'l-base'],
  ['centre', 'r-base'],
  ['l-base', 'r-base'],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export default function AgentHubMark({ size = 240, className = '' }: AgentHubMarkProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Ambient bloom behind the mark */}
      <div
        className="absolute inset-0 scale-[1.6] rounded-full blur-3xl mark-bloom"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0.15) 50%, transparent 75%)',
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full"
        style={{ filter: 'drop-shadow(0 0 18px rgba(124,58,237,0.55))' }}
      >
        <defs>
          <linearGradient id="ah-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <radialGradient id="ah-node" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f5e8ff" />
            <stop offset="55%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#6d28d9" />
          </radialGradient>
        </defs>

        {/* Edges — drawn first so node circles sit on top */}
        {EDGES.map(([a, b], i) => {
          const A = byId(a);
          const B = byId(b);
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={A.cx}
                y1={A.cy}
                x2={B.cx}
                y2={B.cy}
                stroke="url(#ah-edge)"
                strokeWidth={2.2}
                strokeLinecap="round"
                opacity={0.85}
              />
              {/* Travelling pulse dot — fakes packet flow along the edge.
                  Each edge gets its own delay so the mark feels alive
                  without all dots moving in lockstep. */}
              <circle
                r={1.2}
                fill="#ffffff"
                className="mark-pulse"
                style={{
                  offsetPath: `path('M ${A.cx} ${A.cy} L ${B.cx} ${B.cy}')`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            </g>
          );
        })}

        {/* Nodes — each gets its own breathing animation, slightly
            desynced so the mark never feels metronomic. */}
        {NODES.map((n, i) => (
          <circle
            key={n.id}
            cx={n.cx}
            cy={n.cy}
            r={n.id === 'apex' ? 3.4 : 4}
            fill="url(#ah-node)"
            className="mark-node"
            style={{ animationDelay: `${i * 0.35}s`, transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes markBloom {
          0%, 100% { opacity: 0.65; transform: scale(1.6); }
          50% { opacity: 1; transform: scale(1.8); }
        }
        @keyframes markNode {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(168,85,247,0.6)); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(168,85,247,0.95)); }
        }
        @keyframes markPulse {
          0% { offset-distance: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .mark-bloom { animation: markBloom 7s ease-in-out infinite; transform-origin: center; }
        .mark-node {
          animation: markNode 4.5s ease-in-out infinite;
          transform-box: fill-box;
        }
        .mark-pulse {
          animation: markPulse 2.6s ease-in-out infinite;
          offset-rotate: 0deg;
        }
        @media (prefers-reduced-motion: reduce) {
          .mark-bloom, .mark-node, .mark-pulse { animation: none; }
          .mark-pulse { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
