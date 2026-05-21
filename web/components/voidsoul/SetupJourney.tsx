'use client';

import { useState } from 'react';

/**
 * Step-by-step "how to unlock the full app" walkthrough. Visitors can
 * scrub through the journey to see what each stage of setup actually
 * looks like. Pure visual — no real input wired, since the binary
 * isn't downloadable yet.
 *
 * Steps are intentionally in the order a real new user would go through
 * them — install, connect, permission, voice, MCP, projects, budget.
 */

interface Step {
  number: string;
  title: string;
  blurb: string;
  detail: string;
  mock: 'install' | 'provider' | 'permission' | 'voice' | 'mcp' | 'project' | 'budget';
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Install & summon the orb',
    blurb: 'Download the installer for your OS. First launch drops a glowing orb on your desktop and a tray icon — that\'s the assistant.',
    detail: 'Press Cmd/Ctrl+Shift+Space from anywhere to summon. Drag the orb to wherever it suits your workflow.',
    mock: 'install',
  },
  {
    number: '02',
    title: 'Connect a model',
    blurb: 'Already running Ollama, LM Studio, or llama.cpp? VoidSoul auto-detects them on launch — zero setup. Otherwise drop a key in Settings → Providers.',
    detail: 'OpenAI, Anthropic, Gemini, Groq, xAI, OpenRouter, DeepSeek, Mistral, plus the three local runners and a custom-endpoint slot — 12 in total. Pay-per-token only, no subscription floor.',
    mock: 'provider',
  },
  {
    number: '03',
    title: 'Grant the powers you want',
    blurb: 'Every capability that touches your machine is gated behind a permission you explicitly grant. Start with the basics, unlock more as you trust the loop.',
    detail: 'Filesystem · Terminal · App control · Input · Screen · Microphone · Browser. Revoke any of them in Settings → Permissions, any time.',
    mock: 'permission',
  },
  {
    number: '04',
    title: 'Turn on the voice loop',
    blurb: 'Settings → Voice. Pick Void or Soul as your persona. Enable the wake word if you want hands-free.',
    detail: 'Local Whisper transcription means no audio leaves your machine. Speak mid-reply to interrupt — the assistant stops talking and listens.',
    mock: 'voice',
  },
  {
    number: '05',
    title: 'Plug in an MCP server',
    blurb: 'Settings → MCP Servers → Add. Paste a one-line command (e.g. `npx -y @modelcontextprotocol/server-filesystem ~/Projects`). All tools that server exposes become callable.',
    detail: 'Tested with Filesystem (14 tools), GitHub (26 tools), and the bundled Unreal Engine 5 bridge. The agent uses them like its own.',
    mock: 'mcp',
  },
  {
    number: '06',
    title: 'Make it yours',
    blurb: 'Create a Project — pin a mode, write custom instructions, drop in a Notebook. The model picks up the context automatically for every thread inside.',
    detail: 'Six workflow modes — Indie Dev, Creator, Streamer, Researcher, Writer, Productivity — each with curated quick-actions and an accent.',
    mock: 'project',
  },
  {
    number: '07',
    title: 'Set a budget, sleep at night',
    blurb: 'Settings → Usage & Cost. Set a monthly cap. The dashboard shows daily spend, per-model totals, and alerts you at 75 / 90 / 100%.',
    detail: 'Local providers are free. Cloud calls are metered against the published pricing — estimates only, the real bill takes precedence.',
    mock: 'budget',
  },
];

const ACCENTS = ['#7c3aed', '#a855f7', '#c084fc'];

export default function SetupJourney() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-12">
      {/* Step rail — horizontal scroller on mobile (snap + edge-fade so the
          user knows they can scroll), vertical list on desktop. */}
      <ol className="step-rail relative -mx-1 flex flex-row gap-1.5 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
        {/* Vertical accent line behind the dots (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[22px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#7c3aed]/40 via-[#7c3aed]/20 to-transparent lg:block"
        />
        {STEPS.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.number} className="snap-start shrink-0 lg:py-1">
              <button
                onClick={() => setActive(i)}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left transition-all lg:gap-3 lg:px-3 lg:py-2 ${
                  isActive
                    ? 'bg-[#7c3aed]/10 text-[#e2e8f0]'
                    : 'text-[#64748b] hover:bg-white/5 hover:text-[#cbd0e2]'
                }`}
              >
                <span
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full font-mono text-[10px] transition-all lg:h-9 lg:w-9 lg:text-[11px] ${
                    isActive
                      ? 'bg-[#7c3aed] text-white shadow-[0_0_18px_rgba(124,58,237,0.6)]'
                      : 'border border-[#1e1a3a] bg-[#0a0a18] text-[#475569] group-hover:border-[#7c3aed]/60'
                  }`}
                >
                  {s.number}
                </span>
                <span className="hidden flex-1 truncate text-[12px] font-medium lg:block">
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Active step card */}
      <div
        key={active}
        className="reveal-up-soft relative overflow-hidden rounded-2xl border border-[#1e1a3a] bg-gradient-to-br from-[#0f0f1e] via-[#0f0f1e] to-[#1a0a3a]/30 p-5 sm:p-7 lg:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative grid gap-5 sm:gap-6 md:grid-cols-[1fr_320px] md:items-start">
          <div>
            <p
              className="font-mono text-xs font-semibold tracking-widest sm:text-sm"
              style={{ color: ACCENTS[active % ACCENTS.length] }}
            >
              Step {step.number}
            </p>
            <h3 className="mt-2 text-xl font-bold leading-tight text-[#e2e8f0] sm:text-2xl lg:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#cbd0e2] sm:mt-4 sm:text-[15px]">
              {step.blurb}
            </p>
            <p className="mt-2.5 text-[12px] leading-relaxed text-[#64748b] sm:mt-3 sm:text-[13px]">
              {step.detail}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
              <button
                onClick={() => setActive((i) => Math.max(0, i - 1))}
                disabled={active === 0}
                className="rounded-lg border border-[#1e1a3a] px-3 py-1.5 text-xs font-medium text-[#94a3b8] transition-colors hover:border-[#7c3aed]/60 hover:text-[#e2e8f0] disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActive((i) => Math.min(STEPS.length - 1, i + 1))}
                disabled={active === STEPS.length - 1}
                className="rounded-lg bg-[#7c3aed] px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_18px_rgba(124,58,237,0.4)] disabled:cursor-not-allowed disabled:bg-[#1e1a3a] disabled:text-[#475569] disabled:shadow-none"
              >
                Next →
              </button>
              <span className="text-xs text-[#475569]">
                {active + 1} / {STEPS.length}
              </span>
            </div>
          </div>

          {/* Inline mock per step */}
          <div className="rounded-xl border border-[#1e1a3a] bg-black/40 p-4">
            <StepMock kind={step.mock} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- per-step mockups --------------------------- */

function StepMock({ kind }: { kind: Step['mock'] }) {
  if (kind === 'install') {
    return (
      <div className="space-y-2 font-mono text-[11px]">
        <p className="text-[#7c3aed]">$ download → install → launch</p>
        <p className="text-[#cbd0e2]">▸ orb mounted</p>
        <p className="text-[#cbd0e2]">▸ tray icon active</p>
        <p className="text-[#cbd0e2]">▸ hotkey registered <span className="text-[#475569]">(⌘⇧Space)</span></p>
        <p className="text-emerald-400">✓ ready</p>
      </div>
    );
  }
  if (kind === 'provider') {
    return (
      <div className="space-y-1.5 text-[11px]">
        {[
          ['Ollama', 'auto-detected', true],
          ['Anthropic', 'paste key →', false],
          ['OpenAI', 'paste key →', false],
          ['llama.cpp', 'auto-detected', true],
        ].map(([name, hint, ok]) => (
          <div
            key={name as string}
            className="flex items-center justify-between rounded-md border border-[#1e1a3a] bg-black/40 px-2.5 py-1.5"
          >
            <span className="text-[#e2e8f0] font-semibold">{name}</span>
            <span className={ok ? 'text-emerald-400 text-[10px]' : 'text-[#7c3aed] text-[10px]'}>
              {hint}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'permission') {
    return (
      <div className="space-y-1.5 text-[11px]">
        {[
          ['Filesystem', 'granted', '#22c55e'],
          ['Terminal', 'granted', '#22c55e'],
          ['Screen capture', 'granted', '#22c55e'],
          ['Microphone', 'ask each time', '#f59e0b'],
          ['Input access', 'denied', '#f43f5e'],
        ].map(([name, status, color]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-md border border-[#1e1a3a] bg-black/40 px-2.5 py-1.5"
          >
            <span className="text-[#cbd0e2]">{name}</span>
            <span className="text-[10px]" style={{ color }}>● {status}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'voice') {
    return (
      <div className="space-y-3 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c3aed]/20 text-[#a855f7]">🎙</span>
          <span className="text-[#cbd0e2]">Wake word</span>
          <span className="ml-auto text-emerald-400 text-[10px]">ON</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[['Void', '#7c3aed'], ['Soul', '#c084fc']].map(([n, c]) => (
            <div
              key={n}
              className={`rounded-md border px-2 py-1.5 text-center ${n === 'Soul' ? 'border-[#7c3aed]' : 'border-[#1e1a3a]'}`}
              style={{ background: n === 'Soul' ? 'rgba(124,58,237,0.12)' : 'transparent' }}
            >
              <p className="text-[10px] text-[#64748b]">{n === 'Void' ? 'male' : 'female'}</p>
              <p className="font-semibold" style={{ color: c }}>{n}</p>
            </div>
          ))}
        </div>
        <p className="text-[#475569] text-[10px] leading-relaxed">
          Whisper-tiny runs locally · barge-in cuts TTS on speech
        </p>
      </div>
    );
  }
  if (kind === 'mcp') {
    return (
      <div className="space-y-2 text-[11px]">
        <div className="rounded-md border border-[#1e1a3a] bg-black/60 p-2.5 font-mono">
          <p className="text-[9px] uppercase tracking-widest text-[#475569]">Command</p>
          <p className="mt-1 text-[#a855f7] text-[10px] break-all">
            npx -y @modelcontextprotocol/server-filesystem ~/Projects
          </p>
        </div>
        <div className="flex items-center justify-between rounded-md bg-[#7c3aed]/10 px-2.5 py-1.5 text-[10px]">
          <span className="text-[#e2e8f0] font-semibold">Filesystem</span>
          <span className="text-emerald-400">14 tools · connected</span>
        </div>
      </div>
    );
  }
  if (kind === 'project') {
    return (
      <div className="space-y-2 text-[11px]">
        <div className="rounded-md border border-[#7c3aed]/40 bg-[#7c3aed]/10 p-2.5">
          <p className="text-[10px] uppercase tracking-widest text-[#7c3aed]">Project</p>
          <p className="mt-0.5 font-semibold text-[#e2e8f0]">Spiritless UE5</p>
          <p className="mt-1 text-[#94a3b8] text-[10px]">
            Mode: <span className="text-[#a855f7]">Indie Dev</span> · 4 threads
          </p>
        </div>
        <div className="rounded-md border border-[#1e1a3a] bg-black/40 p-2.5">
          <p className="text-[9px] uppercase tracking-widest text-[#475569]">Instructions</p>
          <p className="mt-1 text-[10px] text-[#94a3b8] italic">
            Always assume Unreal 5.5, prefer C++ over Blueprints, my main is C:/Spiritless…
          </p>
        </div>
      </div>
    );
  }
  // budget
  return (
    <div className="space-y-2 text-[11px]">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-widest text-[#475569]">May 2026</p>
        <p className="text-lg font-bold text-[#e2e8f0]">$18.60</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-[78%] rounded-full bg-[#7c3aed]" />
      </div>
      <p className="text-[10px] text-[#64748b]">78% of $24/mo budget · $5.40 left</p>
      <div className="mt-2 flex gap-1 text-[9px]">
        <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">75%</span>
        <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">90%</span>
        <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-rose-300">100%</span>
        <span className="text-[#475569]">→ toast alerts</span>
      </div>
    </div>
  );
}
