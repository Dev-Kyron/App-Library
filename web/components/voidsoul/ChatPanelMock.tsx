'use client';

import { useEffect, useState } from 'react';

/**
 * Display-only replica of VoidSoul Assistant's expanded chat panel —
 * header bar, message bubbles, agent live-progress strip, composer.
 *
 * Animations cycle through a scripted "conversation" so a passing visitor
 * sees the live feel without anything actually running. Nothing here is
 * wired to a real model.
 */

interface MockMessage {
  role: 'user' | 'assistant';
  content: string;
  /** When true, this message animates in mid-stream rather than appearing
   *  instantly — used for the assistant's reply at the end of the cycle. */
  streaming?: boolean;
  /** Optional tool call to render as a chip above the message. */
  tool?: { name: string; arg: string };
}

const SCRIPT: MockMessage[] = [
  { role: 'user', content: 'Find the build button in my editor and click it.' },
  { role: 'assistant', tool: { name: 'see_screen', arg: '' }, content: '' },
  { role: 'assistant', tool: { name: 'move_mouse', arg: '1240, 86' }, content: '' },
  { role: 'assistant', tool: { name: 'click_mouse', arg: '' }, content: '' },
  {
    role: 'assistant',
    streaming: true,
    content:
      'Build kicked off. Watching the output panel for errors — I\'ll let you know the moment it finishes.',
  },
];

const STEP_DELAY = 1400;

export default function ChatPanelMock({ className = '' }: { className?: string }) {
  const [step, setStep] = useState(0);
  // Stream-progress for the final assistant message — tick characters in
  // over time so the bubble feels live.
  const [streamChars, setStreamChars] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next > SCRIPT.length) {
          setStreamChars(0);
          return 0;
        }
        return next;
      });
    }, STEP_DELAY);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const lastIdx = step - 1;
    const msg = SCRIPT[lastIdx];
    if (!msg || !msg.streaming) {
      setStreamChars(msg ? (msg.content?.length ?? 0) : 0);
      return;
    }
    setStreamChars(0);
    const id = window.setInterval(() => {
      setStreamChars((n) => {
        if (n >= msg.content.length) {
          window.clearInterval(id);
          return n;
        }
        return n + 2;
      });
    }, 25);
    return () => window.clearInterval(id);
  }, [step]);

  const visible = SCRIPT.slice(0, step);

  return (
    <div
      aria-hidden
      className={`relative w-full max-w-[420px] rounded-2xl border border-[#1e1a3a] shadow-2xl shadow-[#7c3aed]/20 overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(155deg, rgba(26,29,61,0.92) 0%, rgba(8,10,22,0.96) 100%)',
        backdropFilter: 'blur(18px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#1e1a3a] px-3 py-2.5">
        <button className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-[#64748b]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="flex-1 truncate text-[12px] font-semibold text-[#e2e8f0]">
          Spiritless build pipeline
        </p>
        <span className="rounded-full bg-[#7c3aed]/15 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#a855f7]">
          Indie Dev
        </span>
      </div>

      {/* Messages */}
      <div className="space-y-3 px-3 py-3 min-h-[280px]">
        {visible.map((m, i) => {
          if (m.tool) {
            return (
              <div key={i} className="flex justify-start">
                <div className="rounded-lg border border-[#1e1a3a] bg-black/40 px-2 py-1.5 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#a855f7]">⚡</span>
                    <span className="font-mono font-semibold text-[#e2e8f0]">
                      {m.tool.name.replace(/_/g, ' ')}
                    </span>
                    {m.tool.arg && (
                      <span className="text-[#475569]">· {m.tool.arg}</span>
                    )}
                    <span className="ml-2 text-emerald-400">✓</span>
                  </div>
                </div>
              </div>
            );
          }
          const isUser = m.role === 'user';
          const isStreaming = m.streaming && i === visible.length - 1;
          const text = isStreaming ? m.content.slice(0, streamChars) : m.content;
          return (
            <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[86%] rounded-2xl px-3 py-2 text-[12px] leading-snug ${
                  isUser
                    ? 'rounded-br-sm bg-[#7c3aed] text-white'
                    : 'rounded-bl-sm border border-[#1e1a3a] bg-black/30 text-[#cbd0e2]'
                }`}
              >
                {text}
                {isStreaming && streamChars < m.content.length && (
                  <span className="ml-0.5 inline-block h-3 w-[2px] bg-[#a855f7] align-middle animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div className="border-t border-[#1e1a3a] bg-black/30 px-3 py-2.5">
        <div className="mb-1.5 flex items-center justify-end">
          <button className="flex items-center gap-1 rounded-full border border-[#7c3aed]/40 bg-[#7c3aed]/15 px-2 py-0.5 text-[9px] text-[#a855f7]">
            <span className="text-emerald-400">👁</span>
            claude-sonnet-4-5
            <span className="text-[#475569]">▾</span>
          </button>
        </div>
        <div className="flex items-end gap-1.5">
          <div className="flex gap-0.5 text-[#475569]">
            {['📎', '📷', '✍', '🎤', '🧠'].map((emoji, i) => (
              <span
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[12px] hover:bg-white/10"
              >
                {emoji}
              </span>
            ))}
          </div>
          <div className="scrollbar-void flex-1 rounded-xl border border-[#1e1a3a] bg-black/40 px-3 py-2 text-[12px] text-[#64748b]">
            Ask VoidSoul anything…
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7c3aed] text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
