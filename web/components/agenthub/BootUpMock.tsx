'use client';

import { useEffect, useState } from 'react';

/**
 * Display-only "Boot Up My Day" sequence — a styled trigger button on the
 * left, then a cascade of browser-tab chips that pop into existence one by
 * one on the right, mimicking the one-click multi-tab open behaviour from
 * the real product. Loops forever.
 */

const TABS = [
  { name: 'Slack', hue: 285 },
  { name: 'Google Calendar', hue: 220 },
  { name: 'GitHub', hue: 0 },
  { name: 'Notion', hue: 30 },
  { name: 'VS Code', hue: 200 },
  { name: 'Vercel', hue: 0 },
  { name: 'Supabase', hue: 145 },
  { name: 'Figma', hue: 5 },
  { name: 'Postman', hue: 25 },
];

export default function BootUpMock({ className = '' }: { className?: string }) {
  // Walks `count` from 0 → TABS.length, holds at the top, then resets.
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => (c >= TABS.length + 3 ? 0 : c + 1));
    }, 350);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className={`relative w-full max-w-[460px] rounded-2xl border border-[#1e1a3a] p-5 shadow-2xl shadow-[#7c3aed]/15 ${className}`}
      style={{
        background: 'linear-gradient(155deg, rgba(26,29,61,0.92) 0%, rgba(8,10,22,0.96) 100%)',
      }}
    >
      <div className="flex items-center gap-4">
        <button
          className={`group relative flex flex-none items-center gap-2 rounded-full bg-[#7c3aed] px-4 py-2.5 text-[12px] font-semibold text-white transition-all ${
            count > 0 && count <= TABS.length
              ? 'shadow-[0_0_32px_rgba(124,58,237,0.7)] scale-[1.02]'
              : 'shadow-[0_0_18px_rgba(124,58,237,0.35)]'
          }`}
        >
          <span className={`text-[14px] ${count > 0 && count <= TABS.length ? 'animate-pulse' : ''}`}>
            ⚡
          </span>
          Boot Up My Day
        </button>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
            One click
          </p>
          <p className="text-[12px] font-medium text-[#e2e8f0]">
            Opens {TABS.length} tabs simultaneously
          </p>
        </div>
      </div>

      {/* Tab cascade */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {TABS.map((t, i) => {
          const visible = i < count;
          return (
            <span
              key={t.name}
              className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] transition-all duration-300 ${
                visible
                  ? 'border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#e2e8f0] opacity-100 translate-y-0'
                  : 'border-[#1e1a3a] bg-black/30 text-[#475569] opacity-40 translate-y-1'
              }`}
            >
              <span
                className="flex h-3 w-3 items-center justify-center rounded-sm text-[8px] font-bold text-white"
                style={{ backgroundColor: `hsl(${t.hue} 70% 45%)` }}
              >
                {t.name[0]}
              </span>
              {t.name}
              {visible && i === count - 1 && (
                <span className="inline-block h-1 w-1 rounded-full bg-[#a855f7] animate-pulse" />
              )}
            </span>
          );
        })}
      </div>

      <p className="mt-4 text-[9.5px] leading-relaxed text-[#64748b]">
        Skips End-of-Day tools so morning boot doesn&apos;t flood the browser.{' '}
        <span className="text-[#a855f7]">⌘+T</span> all of them, gone.
      </p>
    </div>
  );
}
