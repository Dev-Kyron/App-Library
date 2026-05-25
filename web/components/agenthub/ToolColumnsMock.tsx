'use client';

import { useEffect, useState } from 'react';

/**
 * Display-only replica of AgentHub's three-column tool hub — Start of Day,
 * Main Day, End of Day. Each column lists draggable tool tiles with a
 * favicon-style glyph and edit/delete controls. Tiles "tick" one at a time
 * to mimic an agent clicking through tools as the shift progresses.
 *
 * Pure styling — nothing wired up. Mirrors the look from the AgentHub
 * Developer_Example.png screenshot so visitors recognise the product
 * surface immediately.
 */

interface Tool {
  name: string;
  host: string;
  /** Single-letter glyph used as a stand-in for the live favicon. */
  glyph: string;
  hue: number;
}

interface Column {
  id: 'sod' | 'md' | 'eod';
  title: string;
  badge: string;
  tools: Tool[];
}

const COLUMNS: Column[] = [
  {
    id: 'sod',
    title: 'Start of Day',
    badge: 'SOD',
    tools: [
      { name: 'Slack', host: 'slack.com', glyph: 'S', hue: 285 },
      { name: 'Google Calendar', host: 'calendar.google.com', glyph: 'C', hue: 220 },
      { name: 'GitHub', host: 'github.com', glyph: 'G', hue: 0 },
      { name: 'Notion', host: 'notion.so', glyph: 'N', hue: 30 },
      { name: 'Gmail', host: 'mail.google.com', glyph: 'M', hue: 5 },
    ],
  },
  {
    id: 'md',
    title: 'Main Day',
    badge: 'MD',
    tools: [
      { name: 'VS Code', host: 'vscode.dev', glyph: 'V', hue: 200 },
      { name: 'Vercel', host: 'vercel.com', glyph: 'V', hue: 0 },
      { name: 'Supabase', host: 'supabase.com', glyph: 'S', hue: 145 },
      { name: 'Figma', host: 'figma.com', glyph: 'F', hue: 5 },
      { name: 'Postman', host: 'postman.com', glyph: 'P', hue: 25 },
    ],
  },
  {
    id: 'eod',
    title: 'End of Day',
    badge: 'EOD',
    tools: [
      { name: 'GitHub PRs', host: 'github.com', glyph: 'G', hue: 280 },
      { name: 'Google Analytics', host: 'analytics.google.com', glyph: 'A', hue: 40 },
      { name: 'Trello', host: 'trello.com', glyph: 'T', hue: 210 },
      { name: 'Linear', host: 'linear.app', glyph: 'L', hue: 270 },
      { name: 'Discord', host: 'discord.com', glyph: 'D', hue: 250 },
    ],
  },
];

const TOTAL_TOOLS = COLUMNS.reduce((n, c) => n + c.tools.length, 0);

export default function ToolColumnsMock({ className = '' }: { className?: string }) {
  // "Live" cursor that walks through every tool to mimic an agent working
  // their shift. Loops forever, slow enough to read without dragging.
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIdx((n) => (n + 1) % TOTAL_TOOLS);
    }, 1700);
    return () => window.clearInterval(id);
  }, []);

  let runningIdx = -1;

  return (
    <div
      aria-hidden
      className={`relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#1e1a3a] shadow-2xl shadow-[#7c3aed]/20 ${className}`}
      style={{
        background: 'linear-gradient(155deg, rgba(26,29,61,0.92) 0%, rgba(8,10,22,0.96) 100%)',
      }}
    >
      {/* Faux app chrome — left sidebar rail + top header */}
      <div className="flex items-center gap-2 border-b border-[#1e1a3a] px-3 py-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#7c3aed]/20 text-[10px] font-bold text-[#a855f7]">
          A
        </div>
        <p className="text-[11px] font-semibold text-[#e2e8f0]">AgentHub</p>
        <span className="text-[10px] text-[#475569]">·</span>
        <span className="text-[10px] text-[#64748b]">agenthub.solutions</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="rounded border border-[#1e1a3a] bg-black/40 px-1.5 py-0.5 text-[9px] text-[#64748b]">
            Share
          </span>
          <span className="rounded border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-1.5 py-0.5 text-[9px] text-[#a855f7]">
            Theme ▾
          </span>
        </div>
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-3 gap-2 px-2 py-2.5">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="relative flex flex-col gap-1.5 rounded-lg border border-[#1e1a3a] bg-black/30 p-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-[8.5px] font-semibold uppercase tracking-widest text-[#7c3aed]">
                {col.title}
              </p>
              <span className="rounded bg-[#7c3aed]/15 px-1 py-0.5 text-[8px] font-semibold text-[#a855f7]">
                {col.badge}
              </span>
            </div>
            {col.tools.map((t) => {
              runningIdx++;
              const isActive = runningIdx === activeIdx;
              return (
                <div
                  key={t.name}
                  className={`flex items-center gap-1.5 rounded-md border px-1.5 py-1 transition-all duration-500 ${
                    isActive
                      ? 'border-[#7c3aed] bg-[#7c3aed]/15 shadow-[0_0_14px_rgba(124,58,237,0.35)]'
                      : 'border-[#1e1a3a] bg-black/40'
                  }`}
                >
                  <span
                    className="flex h-3.5 w-3.5 flex-none items-center justify-center rounded-sm text-[8px] font-bold text-white"
                    style={{
                      backgroundColor: `hsl(${t.hue} 70% 45%)`,
                    }}
                  >
                    {t.glyph}
                  </span>
                  <span
                    className={`truncate text-[9.5px] font-medium ${
                      isActive ? 'text-[#e2e8f0]' : 'text-[#94a3b8]'
                    }`}
                  >
                    {t.name}
                  </span>
                  <span className="ml-auto text-[8px] text-[#475569]">⋮</span>
                </div>
              );
            })}
            <button className="mt-1 rounded-md border border-dashed border-[#7c3aed]/40 px-2 py-1 text-[9px] text-[#a855f7]">
              + Add Tool
            </button>
          </div>
        ))}
      </div>

      {/* Boot-up footer button */}
      <div className="flex items-center justify-between border-t border-[#1e1a3a] bg-black/40 px-3 py-2">
        <button className="flex items-center gap-1.5 rounded-full bg-[#7c3aed] px-3 py-1 text-[10px] font-semibold text-white shadow-[0_0_18px_rgba(124,58,237,0.4)]">
          ⚡ Boot Up My Day
        </button>
        <p className="text-[9px] text-[#475569]">
          Opens all{' '}
          <span className="text-[#a855f7]">
            {COLUMNS[0].tools.length + COLUMNS[1].tools.length}
          </span>{' '}
          SOD + MD tools
        </p>
      </div>
    </div>
  );
}
