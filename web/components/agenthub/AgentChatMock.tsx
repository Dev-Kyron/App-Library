'use client';

import { useEffect, useState } from 'react';

/**
 * Display-only replica of AgentHub's AI Agent chat panel. Cycles through a
 * scripted call-centre conversation that demonstrates the source-restricted
 * answering pattern — agent asks a question, the model "searches sources",
 * then streams an answer cited from a company URL.
 *
 * Mirrors the chat panel in the AgentHub app (see App.jsx around line 928+
 * for the real component) so the marketing page reads as the same surface.
 */

interface MockMessage {
  role: 'user' | 'assistant';
  content: string;
  /** Renders the "Searching sources…" pill before the answer arrives. */
  searching?: boolean;
  /** Cited source URL shown under the bubble. */
  source?: string;
  /** Stream the assistant message in character-by-character. */
  streaming?: boolean;
}

const SCRIPT: MockMessage[] = [
  {
    role: 'user',
    content: 'Customer is asking about the refund window for damaged shipments — what do I tell them?',
  },
  { role: 'assistant', searching: true, content: '' },
  {
    role: 'assistant',
    streaming: true,
    content:
      'Damaged-shipment refunds: 30 days from delivery date. Customer must submit photos within 7 days. Process in CRM under Returns → Damage Claim.',
    source: 'kb.acme.com/policies/refunds',
  },
];

const STEP_DELAY = 1800;
const CHAR_DELAY = 18;

export default function AgentChatMock({ className = '' }: { className?: string }) {
  const [step, setStep] = useState(0);
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
    const msg = SCRIPT[step - 1];
    if (!msg || !msg.streaming) return;
    // Track progress in a local closure variable and only call setState
    // from inside the interval tick — this keeps the effect body free of
    // synchronous state updates (avoids the cascading-render warning) and
    // produces the same character-by-character streaming effect.
    let chars = 0;
    const id = window.setInterval(() => {
      chars += 2;
      if (chars >= msg.content.length) {
        setStreamChars(msg.content.length);
        window.clearInterval(id);
        return;
      }
      setStreamChars(chars);
    }, CHAR_DELAY);
    return () => window.clearInterval(id);
  }, [step]);

  const visible = SCRIPT.slice(0, step);

  return (
    <div
      aria-hidden
      className={`relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-[#1e1a3a] shadow-2xl shadow-[#7c3aed]/20 ${className}`}
      style={{
        background: 'linear-gradient(155deg, rgba(26,29,61,0.92) 0%, rgba(8,10,22,0.96) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#1e1a3a] px-3 py-2.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7c3aed]/20 text-[11px]">
          🤖
        </div>
        <p className="flex-1 truncate text-[12px] font-semibold text-[#e2e8f0]">
          AI Agent
        </p>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-emerald-300">
          SUK unlocked
        </span>
        <span className="rounded-full bg-[#7c3aed]/15 px-2 py-0.5 text-[9px] text-[#a855f7]">
          2 sources
        </span>
      </div>

      {/* Messages */}
      <div className="space-y-3 px-3 py-3 min-h-[260px]">
        {visible.map((m, i) => {
          if (m.searching) {
            return (
              <div key={i} className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-2.5 py-1.5 text-[10px] text-[#a855f7]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                  Searching sources…
                </div>
              </div>
            );
          }
          const isUser = m.role === 'user';
          const isStreaming = m.streaming && i === visible.length - 1;
          const text = isStreaming ? m.content.slice(0, streamChars) : m.content;
          const done = !isStreaming || streamChars >= m.content.length;
          return (
            <div
              key={i}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-[12px] leading-snug ${
                  isUser
                    ? 'rounded-br-sm bg-[#7c3aed] text-white'
                    : 'rounded-bl-sm border border-[#1e1a3a] bg-black/30 text-[#cbd0e2]'
                }`}
              >
                {text}
                {isStreaming && streamChars < m.content.length && (
                  <span className="ml-0.5 inline-block h-3 w-[2px] bg-[#a855f7] align-middle animate-pulse" />
                )}
                {!isUser && done && m.source && (
                  <p className="mt-2 border-t border-[#1e1a3a] pt-1.5 text-[10px] text-[#64748b]">
                    Source ·{' '}
                    <span className="text-[#a855f7]">{m.source}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div className="border-t border-[#1e1a3a] bg-black/30 px-3 py-2.5">
        <div className="flex items-end gap-1.5">
          <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[12px] text-[#a855f7]">
            🔗
          </button>
          <div className="flex-1 rounded-xl border border-[#1e1a3a] bg-black/40 px-3 py-2 text-[11px] text-[#64748b]">
            Ask AgentHub…
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#7c3aed] text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 text-[9px] text-[#475569]">
          Claude answers from your sources only · cited at the end
        </p>
      </div>
    </div>
  );
}
