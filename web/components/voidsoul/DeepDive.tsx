'use client';

import { useState, type ReactNode } from 'react';
import ProviderRotator from './ProviderRotator';
import McpMarketplaceMock from './McpMarketplaceMock';

/**
 * "The full breakdown" — one big accordion that holds every dense reference
 * detail (the exhaustive tool list, memory layers, provider matrix, the full
 * permission table, voice internals, MCP, and the pricing FAQ) so the funnel
 * above it can stay a clean pitch.
 *
 * Single-open by design: opening one bar closes the others, so the section
 * never explodes into a wall of text. Height animates via the CSS
 * grid-rows 0fr → 1fr trick (no JS measuring, no library); honours
 * prefers-reduced-motion through the `.dd-panel` rule below.
 */

interface Bar {
  id: string;
  icon: string;
  title: string;
  summary: string;
  body: ReactNode;
}

/* ---------------------------- small building blocks ---------------------------- */

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-[#2a2550] bg-black/30 px-2 py-1 font-mono text-[11px] text-[#cbd0e2]">
      {children}
    </span>
  );
}

function ToolGroup({ label, tools }: { label: string; tools: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tools.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </div>
  );
}

function LayerRow({ name, body }: { name: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[#2a2550] bg-black/20 px-4 py-3">
      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-[#7c3aed]/15 text-[11px] text-[#a855f7]">
        ◆
      </span>
      <div>
        <p className="text-sm font-semibold text-[#e2e8f0]">{name}</p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-[#94a3b8]">{body}</p>
      </div>
    </div>
  );
}

const riskColor = {
  Low: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
} as const;

const PERMISSIONS: { name: string; unlocks: string; risk: keyof typeof riskColor }[] = [
  { name: 'Terminal', unlocks: 'Shell commands · sandboxed Python', risk: 'High' },
  { name: 'Filesystem', unlocks: 'Read, write, organise files (writes are undoable)', risk: 'High' },
  { name: 'Input access', unlocks: 'Keyboard + mouse control', risk: 'High' },
  { name: 'App control', unlocks: 'Launch apps, foreground windows', risk: 'Medium' },
  { name: 'Screen capture', unlocks: 'Screenshots, OCR, vision', risk: 'Medium' },
  { name: 'Microphone', unlocks: 'Voice input + wake word', risk: 'Medium' },
  { name: 'Home Assistant', unlocks: 'Read entity states, call services (lights, locks, climate)', risk: 'Medium' },
  { name: 'Browser', unlocks: 'Opening URLs', risk: 'Low' },
];

/* -------------------------------- bar content -------------------------------- */

const BARS: Bar[] = [
  {
    id: 'tools',
    icon: '🛠',
    title: 'Every agent tool',
    summary: '24 built-in tools + any MCP server',
    body: (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed text-[#94a3b8]">
          The agent doesn&apos;t just chat — it acts. Twenty-four built-in tools, each one
          gated behind a permission you grant, plus every tool exposed by any MCP server you add.
        </p>
        <ToolGroup
          label="System"
          tools={['open_app', 'run_shell', 'read_file', 'write_file', 'list_files', 'organize_folder', 'save_as_document']}
        />
        <ToolGroup
          label="Screen & input"
          tools={['see_screen', 'read_screen · OCR', 'move_mouse', 'click_mouse', 'click_on_screen', 'type_text', 'send_hotkey']}
        />
        <ToolGroup label="Web & research" tools={['web_search', 'web_fetch', 'deep_research']} />
        <ToolGroup label="Creative" tools={['generate_image', 'edit_image · inpaint', 'edit_image · upscale', 'edit_image · bg-remove']} />
        <ToolGroup label="Code" tools={['run_python · persistent sandbox']} />
        <ToolGroup label="Smart home" tools={['ha_list_entities', 'ha_get_state', 'ha_call_service']} />
        <p className="text-[13px] leading-relaxed text-[#7c89a0]">
          Agent runs stretch up to 60 steps in a single pass — multi-page audits and long
          automation chains finish without a &ldquo;type continue&rdquo; pause.
        </p>
      </div>
    ),
  },
  {
    id: 'memory',
    icon: '🧠',
    title: 'How memory works',
    summary: 'Five layers — it never forgets, and follows you across providers',
    body: (
      <div className="space-y-2.5">
        <LayerRow name="Threads" body="Every message, every conversation. Named, pinned, full-text searchable across your whole history." />
        <LayerRow name="Projects" body="Pin a mode and custom instructions that auto-prepend to every thread inside the project." />
        <LayerRow name="Story-so-far" body="A prose recap of older messages, injected into the system prompt so long chats stay coherent." />
        <LayerRow name="Facts" body="Short durable bullets the model extracts about you — mode-taggable, editable, capped so it stays sharp." />
        <LayerRow name="RAG" body="Embeddings of every message plus any files you index (PDFs, DOCX, code) — top matches retrieved on every send." />
      </div>
    ),
  },
  {
    id: 'providers',
    icon: '🌐',
    title: 'All 12 providers',
    summary: 'Bring your own keys — switch mid-conversation, or let it auto-route',
    body: (
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {['Anthropic', 'OpenAI', 'Gemini', 'Ollama', 'LM Studio', 'llama.cpp', 'Groq', 'xAI', 'OpenRouter', 'DeepSeek', 'Mistral', 'Custom'].map((p) => (
              <Chip key={p}>{p}</Chip>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-[#94a3b8]">
            Three of them — Ollama, LM Studio and llama.cpp — run fully local and free, and are
            auto-detected the moment you launch. The rest just need a key. Memory, projects and
            tools all follow you when you switch.
          </p>
          <p className="text-[13px] leading-relaxed text-[#7c89a0]">
            Leave it on <span className="text-[#a855f7]">✨ Auto</span> and a router picks the
            right model per prompt — vision model for screenshots, a fast model for tool-heavy
            runs, a reasoning model for long prompts, local when you&apos;re near your budget.
          </p>
        </div>
        <ProviderRotator />
      </div>
    ),
  },
  {
    id: 'mcp',
    icon: '🔌',
    title: 'MCP & plugins',
    summary: '10-server marketplace, one-click install, import your existing setup',
    body: (
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-[#94a3b8]">
            VoidSoul is a first-class Model Context Protocol client. Browse a curated marketplace
            of 10 popular servers — Filesystem, GitHub, Memory, Brave Search, Puppeteer, Fetch,
            Postgres, SQLite, Slack, Sequential Thinking — and install any of them in one click.
          </p>
          <p className="text-sm leading-relaxed text-[#94a3b8]">
            Already running Claude Desktop, Cursor, or ChatGPT Desktop? On first launch VoidSoul
            detects them and offers a one-click <span className="text-[#e2e8f0]">Import everything</span> —
            your MCP servers and API keys come across with zero typing.
          </p>
          <p className="text-[13px] leading-relaxed text-[#7c89a0]">
            A lightweight plugin marketplace (Dev Bookmarks, AI Research Shortcuts, Creator
            Toolkit) and collaborative decision cards round it out — the AI can ask you to pick
            between approaches with an interactive card, mid-conversation.
          </p>
        </div>
        <McpMarketplaceMock />
      </div>
    ),
  },
  {
    id: 'voice',
    icon: '🎙',
    title: 'The voice loop',
    summary: 'Local neural TTS, wake word, and speak-to-interrupt',
    body: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-[#94a3b8]">
          Voice runs locally end-to-end. Whisper transcribes on-device — no audio leaves your
          machine, no API key. Replies are spoken by <span className="text-[#e2e8f0]">Piper</span>{' '}
          neural TTS through two real character voices:
        </p>
        <div className="grid grid-cols-2 gap-3 sm:max-w-md">
          <div className="rounded-xl border border-[#2a2550] bg-black/20 px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-[#64748b]">Male</p>
            <p className="text-base font-semibold text-[#7c3aed]">Void</p>
            <p className="mt-0.5 text-[11px] text-[#7c89a0]">calm · analytical · dry</p>
          </div>
          <div className="rounded-xl border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-[#64748b]">Female</p>
            <p className="text-base font-semibold text-[#c084fc]">Soul</p>
            <p className="mt-0.5 text-[11px] text-[#7c89a0]">warm · expressive · playful</p>
          </div>
        </div>
        <p className="text-[13px] leading-relaxed text-[#7c89a0]">
          Set a wake word for hands-free. TTS streams per sentence, so it starts talking almost
          instantly. Speak mid-reply and it stops and listens — true barge-in. Summon the panel
          with <Chip>Ctrl+Shift+Space</Chip>, one-shot Quick AI with <Chip>Ctrl+Shift+J</Chip>.
        </p>
      </div>
    ),
  },
  {
    id: 'security',
    icon: '🔒',
    title: 'Security & permissions',
    summary: 'Eight explicit, revocable permissions — it never acts silently',
    body: (
      <div className="space-y-4">
        <div className="space-y-2 rounded-2xl border border-[#2a2550] bg-black/20 p-3">
          {PERMISSIONS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-lg border border-[#2a2550] bg-black/30 px-3.5 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#e2e8f0]">{p.name}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#7c89a0]">{p.unlocks}</p>
              </div>
              <span className={`flex-none rounded-full border px-2 py-0.5 text-[10px] font-medium ${riskColor[p.risk]}`}>
                {p.risk}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[13px] leading-relaxed text-[#7c89a0]">
          Keys are encrypted in your OS keychain and never leave the main process. No telemetry,
          no server, no analytics. Every privileged action surfaces a dialog with the exact tool
          name and arguments — and Stop cancels the model call, the tool subprocess, and any
          background fetch in the same breath.
        </p>
      </div>
    ),
  },
  {
    id: 'pricing-faq',
    icon: '💸',
    title: 'Pricing & licensing FAQ',
    summary: 'Pay once, bring your own keys, no subscription floor',
    body: (
      <div className="space-y-4">
        <FaqItem q="Is there a subscription?">
          No. The Founder&apos;s Edition is a one-time purchase, yours forever, including every
          future update. You only ever pay your model providers directly for the tokens you use.
        </FaqItem>
        <FaqItem q="What does “bring your own keys” mean for cost?">
          VoidSoul never proxies your model traffic and never marks it up. Local providers
          (Ollama, LM Studio, llama.cpp) are completely free. Cloud providers bill you at their
          published per-token rates — the in-app dashboard tracks spend and warns you at 75 / 90 / 100% of your budget.
        </FaqItem>
        <FaqItem q="What happens to the free beta at v1.0?">
          The public beta is fully unlocked while we polish. At v1.0 the Free tier locks to local
          providers + 5 threads — but everyone who downloads during the beta keeps a{' '}
          <span className="text-emerald-300">Founder&apos;s lifetime licence, free</span>.
        </FaqItem>
        <FaqItem q="Why AUD?">
          We&apos;re built in Australia, so prices are listed in Australian dollars. Stripe
          handles the conversion to your local currency at checkout.
        </FaqItem>
      </div>
    ),
  },
];

function FaqItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#2a2550] bg-black/20 px-4 py-3">
      <p className="text-sm font-semibold text-[#e2e8f0]">{q}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[#94a3b8]">{children}</p>
    </div>
  );
}

/* -------------------------------- the accordion -------------------------------- */

export default function DeepDive() {
  // Single-open. null = all closed. Default the first bar open so the section
  // doesn't read as an empty stack of headers.
  const [open, setOpen] = useState<string | null>('tools');

  return (
    <div className="space-y-2.5">
      {BARS.map((bar) => {
        const isOpen = open === bar.id;
        return (
          <div
            key={bar.id}
            className={`overflow-hidden rounded-2xl border bg-[#15152a] transition-colors ${
              isOpen ? 'border-[#7c3aed]/60' : 'border-[#2a2550] hover:border-[#7c3aed]/40'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : bar.id)}
              aria-expanded={isOpen}
              aria-controls={`dd-panel-${bar.id}`}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5"
            >
              <span
                className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl text-lg ring-1 transition-all ${
                  isOpen
                    ? 'bg-[#7c3aed]/20 ring-[#7c3aed] scale-105'
                    : 'bg-[#7c3aed]/10 ring-[#7c3aed]/30'
                }`}
              >
                {bar.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-[#e2e8f0] sm:text-lg">
                  {bar.title}
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-[#7c89a0]">
                  {bar.summary}
                </span>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`flex-none text-[#a855f7] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              id={`dd-panel-${bar.id}`}
              role="region"
              className="dd-panel grid"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="border-t border-[#2a2550] px-5 py-5 sm:px-6 sm:py-6">{bar.body}</div>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .dd-panel { transition: grid-template-rows 360ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .dd-panel { transition: none; }
        }
      `}</style>
    </div>
  );
}
