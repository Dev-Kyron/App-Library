'use client';

import { useEffect, useState } from 'react';

/**
 * Raycast-style quick-AI overlay — the kbd hint + a typed query
 * that cycles through example prompts. Visual demo only.
 */

const PROMPTS = [
  'rewrite this commit message',
  'explain this stack trace',
  'summarise the page on my clipboard',
  'fix the json on my clipboard',
  'what does this regex match?',
];

export default function QuickAIMock({ className = '' }: { className?: string }) {
  const [text, setText] = useState('');
  const [promptIdx, setPromptIdx] = useState(0);

  // Type → pause → backspace → next prompt, loop forever.
  useEffect(() => {
    const target = PROMPTS[promptIdx];
    let dir: 'typing' | 'pause' | 'erasing' = 'typing';
    let pauseTicks = 0;
    const id = window.setInterval(() => {
      setText((curr) => {
        if (dir === 'typing') {
          if (curr.length < target.length) return target.slice(0, curr.length + 1);
          dir = 'pause';
          pauseTicks = 0;
          return curr;
        }
        if (dir === 'pause') {
          pauseTicks++;
          if (pauseTicks > 18) dir = 'erasing';
          return curr;
        }
        if (curr.length > 0) return curr.slice(0, -1);
        setPromptIdx((p) => (p + 1) % PROMPTS.length);
        return '';
      });
    }, 55);
    return () => window.clearInterval(id);
  }, [promptIdx]);

  return (
    <div className={`relative w-full max-w-[440px] ${className}`}>
      {/* Backdrop tint */}
      <div className="absolute inset-0 -m-6 rounded-3xl bg-black/40 backdrop-blur-md" />
      <div
        className="relative overflow-hidden rounded-xl border border-[#1e1a3a] shadow-2xl shadow-[#7c3aed]/25"
        style={{
          background: 'linear-gradient(155deg, rgba(26,29,61,0.95) 0%, rgba(8,10,22,0.98) 100%)',
        }}
      >
        <div className="flex items-center gap-2 px-3 py-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#7c3aed]/20 text-[#a855f7]">
            <span className="text-[11px]">✨</span>
          </div>
          <input
            value={text}
            readOnly
            className="flex-1 bg-transparent text-[13px] text-[#e2e8f0] outline-none placeholder:text-[#475569]"
            placeholder="Quick AI…"
          />
          <span className="ml-1 inline-block h-3 w-[2px] bg-[#a855f7] animate-pulse" />
          <kbd className="rounded border border-[#1e1a3a] bg-black/40 px-1.5 py-0.5 text-[9px] font-mono text-[#64748b]">
            ⌘ ⇧ J
          </kbd>
        </div>
        {text.length > 0 && (
          <div className="border-t border-[#1e1a3a] px-3 py-3 text-[11px] leading-relaxed text-[#94a3b8]">
            <p className="mb-1 text-[9px] uppercase tracking-widest text-[#7c3aed]">
              Streaming answer
            </p>
            <p className="font-mono opacity-70">
              <span className="text-[#a855f7]">{'>'}</span> Drafting a response based on your
              prompt and clipboard…
              <span className="ml-0.5 inline-block h-2.5 w-[2px] bg-[#a855f7] align-middle animate-pulse" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
