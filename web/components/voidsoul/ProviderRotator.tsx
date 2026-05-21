'use client';

import { useEffect, useState } from 'react';

/**
 * Stacked provider chips that rotate one item to the top every few seconds —
 * shows off the multi-provider story without needing any animation library.
 * Display-only; clicking does nothing.
 */

interface Provider {
  name: string;
  model: string;
  vision: boolean;
  local: boolean;
  hint: string;
}

const PROVIDERS: Provider[] = [
  { name: 'Anthropic', model: 'claude-sonnet-4-5', vision: true, local: false, hint: 'Best reasoning' },
  { name: 'OpenAI', model: 'gpt-4o', vision: true, local: false, hint: 'Strong vision' },
  { name: 'Ollama', model: 'qwen2.5:14b', vision: false, local: true, hint: 'Local · free' },
  { name: 'Google', model: 'gemini-2.0-pro', vision: true, local: false, hint: 'Long context' },
  { name: 'LM Studio', model: 'llama-3.3-70b', vision: false, local: true, hint: 'Local · free' },
  { name: 'Groq', model: 'llama-3.3-70b', vision: false, local: false, hint: 'Lightning fast' },
];

export default function ProviderRotator({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % PROVIDERS.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`relative w-full max-w-[340px] rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e] p-4 shadow-xl shadow-[#7c3aed]/10 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
          Active model
        </p>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400">
          12 providers
        </span>
      </div>

      <div className="relative space-y-1.5">
        {PROVIDERS.map((p, i) => {
          const isActive = i === active;
          return (
            <div
              key={p.name + p.model}
              className={`relative flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-700 ${
                isActive
                  ? 'border-[#7c3aed] bg-[#7c3aed]/15 shadow-[0_0_20px_rgba(124,58,237,0.35)]'
                  : 'border-[#1e1a3a] bg-black/30 opacity-50'
              }`}
              style={{
                transform: isActive ? 'translateX(0)' : 'translateX(0)',
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                {p.vision && (
                  <span className="text-emerald-400 text-[10px]" title="Vision capable">
                    👁
                  </span>
                )}
                {p.local && (
                  <span className="text-amber-300 text-[10px]" title="Local provider">
                    🏠
                  </span>
                )}
                <div className="min-w-0">
                  <p className={`text-[11px] font-semibold truncate ${isActive ? 'text-[#e2e8f0]' : 'text-[#64748b]'}`}>
                    {p.name}
                  </p>
                  <p className="text-[9px] text-[#475569] font-mono truncate">{p.model}</p>
                </div>
              </div>
              <span className={`text-[9px] ${isActive ? 'text-[#a855f7]' : 'text-[#334155]'}`}>
                {p.hint}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[9px] text-[#475569] leading-relaxed">
        Switch mid-conversation. All memory, projects and tools follow.
      </p>
    </div>
  );
}
