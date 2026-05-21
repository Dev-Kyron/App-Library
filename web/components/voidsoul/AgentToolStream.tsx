'use client';

import { useEffect, useState } from 'react';

/**
 * The "live agent progress" strip — a rotating banner that cycles through
 * the kind of tool calls the real agent makes during a multi-step task.
 * Mirrors the in-app `LiveToolStep` styling so the marketing page feels
 * like it lifted the look straight from the running product.
 *
 * When multiple streams render side-by-side (e.g. the close-up card's
 * stacked rows), pass a different `startIndex` to each so they don't all
 * land on the same task — without that, three mounted-at-once instances
 * stay in lockstep and the panel reads like a stuck progress bar.
 */

const TASKS = [
  { verb: 'Searching the web', detail: '"electron-builder code signing 2026"', icon: '🔎' },
  { verb: 'Reading', detail: 'src/main/services/storage/history.ts', icon: '📖' },
  { verb: 'Running Python', detail: 'data_cleanup.py', icon: '🐍' },
  { verb: 'Capturing screen', detail: 'analysing UI', icon: '📸' },
  { verb: 'Generating image', detail: '"neon city at dusk, isometric"', icon: '🎨' },
  { verb: 'Move mouse', detail: '1240, 86', icon: '🖱' },
  { verb: 'Click mouse', detail: 'Build button', icon: '👆' },
  { verb: 'Writing file', detail: 'CHANGELOG.md', icon: '✏️' },
];

interface Props {
  className?: string;
  /** Where in the TASKS rotation this stream should start. Used to desync
   *  multiple instances mounted at once. */
  startIndex?: number;
}

export default function AgentToolStream({ className = '', startIndex = 0 }: Props) {
  const [i, setI] = useState(startIndex % TASKS.length);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % TASKS.length), 1700);
    return () => window.clearInterval(id);
  }, []);

  const task = TASKS[i];
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-3 py-2 text-[11px] text-[#a855f7] ${className}`}
    >
      <span className="inline-block h-2 w-2 rounded-full bg-[#a855f7] animate-pulse" />
      <span className="font-semibold">{task.verb}:</span>
      <span className="truncate text-[#cbd0e2] flex-1">{task.detail}</span>
      <span className="text-base">{task.icon}</span>
    </div>
  );
}
