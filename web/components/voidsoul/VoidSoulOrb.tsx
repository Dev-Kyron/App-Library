'use client';

/**
 * Replica of VoidSoul Assistant's signature floating orb — outer glow,
 * counter-rotating energy ring, core sphere, specular highlight. Pure
 * CSS / no canvas, so it stays buttery on a marketing page.
 *
 * The animation cadence here mimics the "wake-listening" tempo from the
 * real app — slower than processing, faster than idle — because that's
 * the most evocative state for a hero image.
 */

interface VoidSoulOrbProps {
  size?: number;
  className?: string;
}

export default function VoidSoulOrb({ size = 240, className = '' }: VoidSoulOrbProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Far ambient bloom — sits well outside the orb itself */}
      <div
        className="absolute inset-0 scale-[1.8] rounded-full blur-3xl orb-bloom"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0.15) 50%, transparent 75%)',
        }}
      />

      {/* Outer glow — pulses with the breathing animation */}
      <div
        className="absolute inset-0 rounded-full orb-glow"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.95) 0%, transparent 68%)',
          filter: 'blur(10px)',
          opacity: 0.7,
        }}
      />

      {/* Rotating energy ring — conic gradient masked to a thin band */}
      <div
        className="absolute rounded-full orb-ring"
        style={{
          inset: size * 0.05,
          background:
            'conic-gradient(from 0deg, transparent 0%, #7c3aed 35%, #ffffff 50%, #7c3aed 65%, transparent 100%)',
          opacity: 0.7,
          WebkitMask: 'radial-gradient(transparent 56%, #000 60%)',
          mask: 'radial-gradient(transparent 56%, #000 60%)',
        }}
      />

      {/* Counter-rotating second ring for depth */}
      <div
        className="absolute rounded-full orb-ring-reverse"
        style={{
          inset: size * 0.12,
          background:
            'conic-gradient(from 180deg, transparent 0%, #a855f7 40%, transparent 70%)',
          opacity: 0.35,
          WebkitMask: 'radial-gradient(transparent 50%, #000 55%)',
          mask: 'radial-gradient(transparent 50%, #000 55%)',
        }}
      />

      {/* Core sphere */}
      <div
        className="absolute rounded-full orb-core"
        style={{
          inset: size * 0.16,
          background:
            'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.98) 0%, #a855f7 40%, #161a36 100%)',
          boxShadow: `0 0 ${size * 0.32}px #7c3aed, inset 0 0 ${size * 0.22}px rgba(255,255,255,0.4)`,
        }}
      />

      {/* Specular highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          left: size * 0.31,
          top: size * 0.26,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)',
        }}
      />

      <style jsx>{`
        @keyframes orbGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.08); }
        }
        @keyframes orbBloom {
          0%, 100% { opacity: 0.7; transform: scale(1.8); }
          50% { opacity: 1; transform: scale(2); }
        }
        @keyframes orbSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes orbCore {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .orb-bloom { animation: orbBloom 7s ease-in-out infinite; transform-origin: center; }
        .orb-glow { animation: orbGlow 6s ease-in-out infinite; transform-origin: center; }
        .orb-ring { animation: orbSpin 14s linear infinite; transform-origin: center; }
        .orb-ring-reverse { animation: orbSpinReverse 22s linear infinite; transform-origin: center; }
        .orb-core { animation: orbCore 6s ease-in-out infinite; transform-origin: center; }
      `}</style>
    </div>
  );
}
