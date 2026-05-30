'use client';

import { useEffect, useState } from 'react';

/**
 * Display-only theme picker mock — cycles through AgentHub's 14 colour
 * themes (the real palette from App.jsx) one swatch at a time, swapping
 * the preview tile's accent each time. Demonstrates the "live switching"
 * feature without needing a real theme engine.
 */

interface Theme {
  id: string;
  name: string;
  hex: string;
  /** Optional second colour for two-tone swatches (matches real product). */
  hex2?: string;
}

// Names + hexes pulled from the real THEMES array in
// AgentHub/src/App.jsx so visitors see the same palette they'd see in-app.
const THEMES: Theme[] = [
  { id: 'concentrix', name: 'Cyan', hex: '#1D50A0' },
  { id: 'orange', name: 'Orange', hex: '#e85d04' },
  { id: 'purple', name: 'Purple', hex: '#7c3aed' },
  { id: 'crimson', name: 'Crimson', hex: '#dc2626' },
  { id: 'emerald', name: 'Emerald', hex: '#10b981' },
  { id: 'gold', name: 'Gold', hex: '#f59e0b' },
  { id: 'rose', name: 'Rose', hex: '#f43f5e' },
  { id: 'sky', name: 'Sky', hex: '#0ea5e9' },
  { id: 'lime', name: 'Lime', hex: '#84cc16' },
  { id: 'violet', name: 'Violet', hex: '#a855f7' },
  { id: 'teal', name: 'Teal', hex: '#14b8a6' },
  { id: 'amber', name: 'Amber', hex: '#fbbf24' },
  { id: 'slate', name: 'Slate', hex: '#64748b' },
  { id: 'mono', name: 'Mono', hex: '#e2e8f0' },
];

export default function ThemeRotator({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(2); // start on Purple — matches site brand

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % THEMES.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  const t = THEMES[active];

  return (
    <div
      aria-hidden
      className={`relative w-full max-w-[320px] rounded-2xl border border-[#2a2550] bg-[#15152a] p-4 shadow-xl shadow-[#7c3aed]/10 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
          Theme
        </p>
        <span className="rounded-full bg-[#7c3aed]/15 px-2 py-0.5 text-[9px] text-[#a855f7]">
          14 colours
        </span>
      </div>

      {/* Live preview tile — swaps accent in time with the rotation */}
      <div
        className="mb-3 overflow-hidden rounded-lg border transition-all duration-500"
        style={{
          borderColor: `${t.hex}88`,
          background: `linear-gradient(155deg, ${t.hex}22 0%, rgba(8,10,22,0.96) 100%)`,
          boxShadow: `0 0 24px ${t.hex}33`,
        }}
      >
        <div className="flex items-center gap-2 border-b px-2.5 py-1.5"
          style={{ borderColor: `${t.hex}33` }}
        >
          <div
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: t.hex }}
          />
          <span className="text-[10px] font-semibold text-[#e2e8f0]">
            {t.name}
          </span>
          <span className="ml-auto rounded px-1.5 py-0.5 text-[8px] font-mono"
            style={{ color: t.hex, backgroundColor: `${t.hex}1f` }}
          >
            {t.hex}
          </span>
        </div>
        <div className="space-y-1 p-2">
          {[0.95, 0.7, 0.45].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{ width: `${w * 100}%`, backgroundColor: `${t.hex}${i === 0 ? 'cc' : i === 1 ? '88' : '44'}` }}
            />
          ))}
          <div className="pt-1.5 flex items-center justify-between">
            <button
              className="rounded-full px-2 py-0.5 text-[9px] font-semibold text-white"
              style={{ backgroundColor: t.hex }}
            >
              ⚡ Boot Up
            </button>
            <span className="text-[8.5px]" style={{ color: `${t.hex}99` }}>
              live preview
            </span>
          </div>
        </div>
      </div>

      {/* Swatch row */}
      <div className="grid grid-cols-7 gap-1.5">
        {THEMES.map((th, i) => {
          const isActive = i === active;
          return (
            <button
              key={th.id}
              className={`relative h-5 w-full rounded-md transition-all ${
                isActive ? 'ring-2 ring-white/80 scale-110' : 'ring-1 ring-white/10'
              }`}
              style={{ backgroundColor: th.hex }}
              title={th.name}
            />
          );
        })}
      </div>
      <p className="mt-3 text-[9px] text-[#475569] leading-relaxed">
        Hot-swap themes live. Brand-match per client — Concentrix, your in-house palette,
        whatever ops needs.
      </p>
    </div>
  );
}
