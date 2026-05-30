'use client';

import { useEffect, useState } from 'react';

/**
 * Display-only replica of VoidSoul AI Companion's MCP marketplace — the
 * headline v2.0 feature. A short list of curated Model Context Protocol
 * servers, each with a one-click "Install" pill. One row cycles through
 * Install → Installing… → ✓ Installed every few seconds so a passing
 * visitor sees the one-click flow without anything actually running.
 *
 * Mirrors the visual language of ProviderRotator so it drops into the 3D
 * stage and the deep-dive accordion as a native-feeling surface.
 */

interface Server {
  name: string;
  blurb: string;
  tools: number;
}

const SERVERS: Server[] = [
  { name: 'Filesystem', blurb: 'read · write · search', tools: 14 },
  { name: 'GitHub', blurb: 'issues · PRs · commits', tools: 26 },
  { name: 'Brave Search', blurb: 'web + local search', tools: 2 },
  { name: 'Slack', blurb: 'channels · messages', tools: 8 },
  { name: 'Puppeteer', blurb: 'drive headless Chrome', tools: 7 },
];

export default function McpMarketplaceMock({ className = '' }: { className?: string }) {
  // Which row is mid-install. Advances on a loop so the marketplace feels live.
  const [active, setActive] = useState(0);
  // 0 = idle (Install), 1 = installing…, 2 = installed ✓
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((p) => {
        if (p >= 2) {
          setActive((a) => (a + 1) % SERVERS.length);
          return 0;
        }
        return p + 1;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className={`relative w-full max-w-[340px] rounded-2xl border border-[#2a2550] bg-[#15152a] p-4 shadow-xl shadow-[#7c3aed]/10 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
          MCP marketplace
        </p>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400">
          10 servers
        </span>
      </div>

      <div className="space-y-1.5">
        {SERVERS.map((s, i) => {
          const isActive = i === active;
          const installed = isActive && phase === 2;
          const installing = isActive && phase === 1;
          return (
            <div
              key={s.name}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-500 ${
                isActive
                  ? 'border-[#7c3aed]/60 bg-[#7c3aed]/10'
                  : 'border-[#2a2550] bg-black/20'
              }`}
            >
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#e2e8f0] truncate">{s.name}</p>
                <p className="text-[9px] text-[#7c89a0] truncate">{s.blurb}</p>
              </div>
              <span
                className={`ml-2 flex-none rounded-md px-2 py-0.5 text-[9px] font-semibold transition-colors ${
                  installed
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : installing
                      ? 'bg-[#7c3aed]/20 text-[#a855f7]'
                      : 'border border-[#2a2550] text-[#94a3b8]'
                }`}
              >
                {installed ? `✓ ${s.tools} tools` : installing ? 'Installing…' : 'Install'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-[#2a2550] bg-black/20 px-2.5 py-1.5">
        <span className="text-emerald-400 text-[10px]">⇣</span>
        <p className="text-[9px] text-[#94a3b8] leading-relaxed">
          Imported <span className="text-[#e2e8f0] font-semibold">5</span> servers from Claude
          Desktop · Cursor
        </p>
      </div>
    </div>
  );
}
