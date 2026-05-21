import Link from 'next/link';
import type { Metadata } from 'next';
import { getApp } from '@/lib/apps';
import VoidSoulOrb from '@/components/voidsoul/VoidSoulOrb';
import ChatPanelMock from '@/components/voidsoul/ChatPanelMock';
import ProviderRotator from '@/components/voidsoul/ProviderRotator';
import AgentToolStream from '@/components/voidsoul/AgentToolStream';
import QuickAIMock from '@/components/voidsoul/QuickAIMock';
import CostChartMock from '@/components/voidsoul/CostChartMock';

const app = getApp('voidsoul-assistant')!;

export const metadata: Metadata = {
  title: `${app.title} — Void Soul Studio`,
  description: app.description,
  openGraph: {
    title: `${app.title} — ${app.tagline}`,
    description: app.description,
    images: ['/Logo.png'],
  },
};

/* ------------------------------ static content ----------------------------- */

const FEATURES = [
  {
    icon: '🧠',
    title: 'Four-layer memory',
    body: 'Threads, story-so-far summaries, durable facts, and RAG over both your chat history and indexed files. The model never forgets — and it follows you across providers.',
  },
  {
    icon: '🤖',
    title: '18 agent tools + MCP',
    body: 'Open apps. Run shell. Read & write files. Drive mouse and keyboard. OCR your screen. Search the web. Run Python. Plus any MCP server you add — all permission-gated.',
  },
  {
    icon: '👁️',
    title: 'Vision + screen control',
    body: '`see_screen` captures your screen as an image the model literally looks at. Combine with mouse-control and the assistant can use your GUI like a careful junior dev.',
  },
  {
    icon: '🎙️',
    title: 'Local voice loop',
    body: 'Whisper STT and wake-word run locally — no API key, no audio leaving your machine. Speak mid-reply to interrupt. Two TTS personas: Void and Soul.',
  },
  {
    icon: '🌐',
    title: 'Multi-provider',
    body: '12 backends: Anthropic, OpenAI, Gemini, Ollama, LM Studio, llama.cpp, Groq, xAI, OpenRouter, DeepSeek, Mistral, and any custom endpoint. Switch per-thread.',
  },
  {
    icon: '🪟',
    title: 'Raycast-style Quick AI',
    body: 'Cmd+Shift+J from anywhere. One-shot answers, no thread. Reads your clipboard so "fix this" just works. The fastest path to "I have a tiny question, right now".',
  },
  {
    icon: '📁',
    title: 'Projects & Notebooks',
    body: 'Pinned mode + custom instructions à la Claude. Notebook cells for prompt, python, search, and markdown. Schedule prompts on a cron.',
  },
  {
    icon: '💰',
    title: 'Per-token cost only',
    body: 'No subscription floor. Bring your own keys, pay for what you use. Built-in dashboard with daily-spend chart and budget alerts at 75/90/100%.',
  },
  {
    icon: '🔒',
    title: 'Local-first by default',
    body: 'API keys encrypted in your OS keychain. Chat history in local SQLite. No telemetry, no cloud, no signup. Pollinations, DuckDuckGo, and local Whisper as keyless defaults.',
  },
];

const POSSIBILITIES = [
  'Tell it to read your error log, fix the bug, run the test suite, and commit.',
  'Speak a thought out loud — it transcribes, refines, and pastes the result into your editor.',
  'Paste a screenshot — it identifies the failing widget and writes the patch.',
  'Schedule it to grep your codebase for unused exports every morning and DM you the list.',
  'Drop a PDF into the chat — talk to it without any "Pro plan" upsell.',
  'Use Claude for reasoning, GPT-4o for vision, Ollama for cheap follow-ups, all in one thread.',
  'Wake the orb with a wake word, ask a question while doing something else, hear it answered.',
  'Chain MCP servers — read a Notion page, query GitHub, write a file, all in one prompt.',
];

const PERMISSIONS = [
  { name: 'Terminal', unlocks: 'Shell commands and sandboxed Python', risk: 'High' },
  { name: 'Filesystem', unlocks: 'Read, write, organise files (writes are undoable)', risk: 'High' },
  { name: 'App control', unlocks: 'Launching applications, foregrounding windows', risk: 'Medium' },
  { name: 'Input access', unlocks: 'Keyboard and mouse control', risk: 'High' },
  { name: 'Screen capture', unlocks: 'Screenshots, OCR, vision', risk: 'Medium' },
  { name: 'Microphone', unlocks: 'Voice input and wake-word listening', risk: 'Medium' },
  { name: 'Browser', unlocks: 'Opening URLs', risk: 'Low' },
];

const riskColor = {
  Low: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
} as const;

/* ---------------------------------- page ---------------------------------- */

export default function VoidSoulAssistantPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Page-wide ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 30%, rgba(168,85,247,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Back link */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#a855f7] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Library
        </Link>
      </div>

      {/* ============================= HERO ============================= */}
      <section className="relative mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 sm:pt-16 sm:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left — copy + CTAs */}
          <div className="relative z-10 reveal-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2a1a4e] bg-[#7c3aed]/10 px-3 py-1 text-xs text-[#a855f7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              Apps &amp; Tools · {app.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#e2e8f0] sm:text-5xl md:text-6xl">
              {app.title}
            </h1>
            <p className="mt-3 text-lg italic text-[#a855f7]">{app.tagline}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#94a3b8]">
              {app.description}
            </p>

            {/* Download buttons (visually wired, no real targets yet) */}
            <div className="mt-9 grid grid-cols-1 gap-3 sm:max-w-md">
              <DownloadButton platform="windows" />
              <div className="grid grid-cols-2 gap-3">
                <DownloadButton platform="macos" />
                <DownloadButton platform="linux" />
              </div>
              <p className="text-xs text-[#475569]">
                Builds aren&apos;t live yet — Founder&apos;s Edition launches when downloads go public.
                <Link href="#pricing" className="ml-1 text-[#7c3aed] hover:underline">
                  See pricing →
                </Link>
              </p>
            </div>
          </div>

          {/* Right — orb */}
          <div className="relative flex items-center justify-center reveal-fade">
            <div className="relative">
              <VoidSoulOrb size={340} />
              {/* Floating tool-stream chip */}
              <div className="absolute -bottom-4 left-1/2 w-[300px] -translate-x-1/2 reveal-up-delay">
                <AgentToolStream />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== UI SHOWCASE (sells it) ====================== */}
      <section className="relative border-t border-[#1e1a3a] bg-[#06060f]/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              See it in motion
            </p>
            <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">
              A surface that feels alive.
            </h2>
            <p className="mt-3 text-[#94a3b8] leading-relaxed">
              Every panel below is the real UI — chat with live agent steps, the multi-provider picker, the cost dashboard, the Raycast-style overlay. Hover them, scroll past, watch them work.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            {/* Chat panel — large, slightly tilted */}
            <ShowcaseTile
              className="lg:col-span-7 lg:row-span-2"
              title="The Chat panel"
              caption="Multi-turn, multi-step, multi-tool. Live progress as the agent works."
              tiltDeg={-3}
            >
              <div className="flex items-center justify-center py-2">
                <ChatPanelMock />
              </div>
            </ShowcaseTile>

            {/* Provider rotator */}
            <ShowcaseTile
              className="lg:col-span-5"
              title="12 providers · one body"
              caption="Auto-detects local Ollama / LM Studio / llama.cpp on boot. Switch mid-conversation; memory follows."
              tiltDeg={2}
            >
              <div className="flex items-center justify-center py-2">
                <ProviderRotator />
              </div>
            </ShowcaseTile>

            {/* Cost chart */}
            <ShowcaseTile
              className="lg:col-span-5"
              title="Cost, honest"
              caption="Daily spend, per-model breakdown, budget alerts at 75/90/100%. Local providers are free."
              tiltDeg={-2}
            >
              <div className="flex items-center justify-center py-2">
                <CostChartMock />
              </div>
            </ShowcaseTile>

            {/* Quick AI */}
            <ShowcaseTile
              className="lg:col-span-7"
              title="Quick AI — Cmd+Shift+J"
              caption="Raycast-style overlay. From anywhere, one keystroke, one-shot answers that read your clipboard."
              tiltDeg={1.5}
            >
              <div className="flex items-center justify-center py-4">
                <QuickAIMock />
              </div>
            </ShowcaseTile>
          </div>
        </div>
      </section>

      {/* ======================= WHY + POSSIBILITIES ======================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              Why it exists
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#e2e8f0] sm:text-4xl">
              The AI you already pay for, with a body.
            </h2>
            <div className="mt-6 space-y-4 text-[#94a3b8] leading-relaxed">
              <p>
                Today&apos;s AI desktop apps split awkwardly: cloud chatbots can&apos;t touch your
                computer, editor copilots are trapped in one IDE, and closed ecosystems lock
                you to one vendor.
              </p>
              <p>
                VoidSoul Assistant is the third path. A single persistent assistant that&apos;s
                always there, can do real work on your machine, speaks every major model,
                never sends your data anywhere you didn&apos;t tell it to, and grows with you
                through plugins, MCP servers, and per-mode memory.
              </p>
              <p className="text-[#e2e8f0] font-medium">
                It&apos;s not a better chatbot. It&apos;s an operating layer that turns whatever AI
                you pay for into Jarvis.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              What you can do
            </p>
            <h3 className="text-2xl font-semibold text-[#e2e8f0] mb-6">
              Real workflows, not chat-toy demos.
            </h3>
            <ul className="space-y-3">
              {POSSIBILITIES.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-[#1e1a3a] bg-[#0f0f1e]/60 px-4 py-3 transition-all hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/5 reveal-stagger"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-[#7c3aed]/15 text-[#a855f7] text-[11px]">
                    ✦
                  </span>
                  <span className="text-sm text-[#cbd0e2] leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================== FEATURE GRID =========================== */}
      <section className="relative border-t border-[#1e1a3a] bg-[#06060f]/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              What&apos;s in the box
            </p>
            <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">Nine pillars.</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-xl border border-[#1e1a3a] bg-[#0f0f1e] p-6 transition-all duration-300 hover:border-[#7c3aed] hover:shadow-[0_0_28px_0px_rgba(124,58,237,0.18)] hover:-translate-y-1 reveal-stagger"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(124,58,237,0.18), transparent 60%)',
                  }}
                />
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed]/15 text-[#a855f7] text-lg ring-1 ring-[#7c3aed]/30">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#e2e8f0] mb-2 group-hover:text-[#c084fc] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== UI CLOSE-UPS (angles) ====================== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              Up close
            </p>
            <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">
              The details you&apos;ll feel.
            </h2>
            <p className="mt-3 text-[#94a3b8]">
              Real UI surfaces from the running app. Hover for the small lift.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            <CloseUpPanel
              tag="Floating orb"
              title="Always there, never in the way."
              caption="Drag-to-move. Click-to-summon. Tray-resident on every OS. The home for your assistant."
            >
              <div className="flex items-center justify-center py-10">
                <VoidSoulOrb size={180} />
              </div>
            </CloseUpPanel>

            <CloseUpPanel
              tag="Live agent"
              title="See what it&apos;s doing, as it does it."
              caption="A live status strip while the agent works — searching, reading, running, clicking — never silent."
            >
              <div className="flex flex-col gap-2 p-4 mt-4">
                <AgentToolStream />
                <AgentToolStream className="opacity-60" />
                <AgentToolStream className="opacity-30" />
              </div>
            </CloseUpPanel>

            <CloseUpPanel
              tag="Quick AI"
              title="One shortcut. Every answer."
              caption="Press Cmd+Shift+J from anywhere — Word, Photoshop, your terminal. Ask. Done."
            >
              <div className="flex items-center justify-center py-8">
                <QuickAIMock />
              </div>
            </CloseUpPanel>
          </div>
        </div>
      </section>

      {/* ======================== SECURITY / PRIVACY ======================== */}
      <section
        id="security"
        className="relative border-y border-[#1e1a3a] bg-[#06060f]/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
                Privacy &amp; permissions
              </p>
              <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">
                It never acts silently.
              </h2>
              <p className="mt-4 text-[#94a3b8] leading-relaxed">
                Every capability that touches your machine is gated behind a permission you
                explicitly grant — and can revoke any time. File writes are reversible. Every
                action is logged. Private mode strips everything from the chat: no save, no
                facts, no screen context.
              </p>

              <div className="mt-8 space-y-3">
                <SecurityRow
                  icon="🔐"
                  title="Keys in your OS keychain"
                  body="API keys never leave the main process. Encrypted by Windows DPAPI / macOS Keychain / Linux libsecret."
                />
                <SecurityRow
                  icon="🛰️"
                  title="No telemetry, no cloud"
                  body="We don't run a server. No usage tracking, no crash phone-home, no analytics SDKs. Bring your own provider keys."
                />
                <SecurityRow
                  icon="📝"
                  title="Source-visible licence"
                  body="The code lives on GitHub for transparency — anyone can audit what the app actually does. Redistribution and resale are reserved."
                />
                <SecurityRow
                  icon="⏯️"
                  title="Per-request abort"
                  body="Hit Stop and the model call, the tool subprocess, and any background fetch all cancel in the same breath."
                />
              </div>
            </div>

            {/* Permission grid */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-3">
                Permissions, explicit
              </p>
              <div className="space-y-2 rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e] p-3">
                {PERMISSIONS.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-lg border border-[#1e1a3a] bg-black/30 px-3 py-3 transition-colors hover:border-[#7c3aed]/40"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#e2e8f0]">{p.name}</p>
                      <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                        {p.unlocks}
                      </p>
                    </div>
                    <span
                      className={`flex-none rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                        riskColor[p.risk as keyof typeof riskColor]
                      }`}
                    >
                      {p.risk}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#64748b] leading-relaxed">
                Every prompt that triggers a privileged action surfaces a dialog with the
                exact tool name and arguments. You always know what&apos;s about to run.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== VIDEO DEMO =========================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
            See the loop
          </p>
          <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">90-second demo.</h2>
          <p className="mt-3 text-[#94a3b8]">
            Wake word → question → multi-step agent run → spoken reply. The full Jarvis loop.
          </p>
        </div>

        <div
          className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#0a0a20] shadow-2xl shadow-[#7c3aed]/20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.15) 0%, transparent 50%)',
          }}
        >
          {/* Placeholder — wire up to a hosted video later. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <VoidSoulOrb size={160} />
            <button className="flex items-center gap-3 rounded-full border border-[#7c3aed]/40 bg-black/60 px-5 py-3 text-sm font-medium text-[#e2e8f0] backdrop-blur transition-all hover:border-[#7c3aed] hover:bg-[#7c3aed]/20 hover:scale-105">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c3aed] text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Demo video — coming soon
            </button>
            <p className="text-xs text-[#475569]">
              Devlog clips on{' '}
              <a
                href="https://www.youtube.com/@voidsoul_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7c3aed] hover:underline"
              >
                YouTube
              </a>{' '}
              meanwhile.
            </p>
          </div>
        </div>
      </section>

      {/* ============================ PRICING ============================ */}
      <section
        id="pricing"
        className="relative border-t border-[#1e1a3a] overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              Pricing
            </p>
            <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">
              One price. Yours forever.
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-[#94a3b8] leading-relaxed">
              Cancel ChatGPT Plus. Cancel Claude Pro. Pay once. Bring your own keys.
              No subscription floor, ever.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Free tier */}
            <div className="relative rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e] p-7 transition-all hover:border-[#2a1a4e]">
              <p className="text-xs uppercase tracking-widest text-[#64748b] mb-2">
                Free
              </p>
              <p className="text-3xl font-bold text-[#e2e8f0] mb-1">$0</p>
              <p className="text-sm text-[#64748b] mb-6">Local-only. Forever.</p>
              <ul className="space-y-2 text-sm text-[#94a3b8]">
                {[
                  'Ollama, LM Studio, llama.cpp',
                  'Five threads max',
                  'Local voice loop',
                  'Basic agent tools',
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="mt-7 w-full rounded-lg border border-[#1e1a3a] bg-black/40 py-3 text-sm font-medium text-[#64748b] cursor-not-allowed"
              >
                Free when downloads open
              </button>
            </div>

            {/* Founder's lifetime */}
            <div className="relative rounded-2xl border border-[#7c3aed] bg-gradient-to-b from-[#1a0a3a]/40 to-[#0f0f1e] p-7 shadow-2xl shadow-[#7c3aed]/30">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#7c3aed] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                Founder&apos;s Edition · First 100
              </span>
              <p className="text-xs uppercase tracking-widest text-[#a855f7] mb-2">
                Lifetime
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-4xl font-bold text-[#e2e8f0]">$129</p>
                <p className="text-sm text-[#64748b] line-through">$199</p>
              </div>
              <p className="text-sm text-[#a855f7] mb-6">AUD · one-time · yours forever</p>
              <ul className="space-y-2 text-sm text-[#cbd0e2]">
                {[
                  'All 12 providers · MCP support',
                  'Full voice loop · wake-word · barge-in',
                  'Projects · Notebooks · Quick AI',
                  'Scheduled tasks · cost dashboard',
                  'All themes & languages',
                  'Every future update, free',
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="text-[#a855f7] mt-0.5">✦</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="mt-7 w-full rounded-lg bg-[#7c3aed] py-3 text-sm font-semibold text-white cursor-not-allowed opacity-90 hover:opacity-100 transition-all hover:shadow-[0_0_28px_rgba(124,58,237,0.5)]"
              >
                Get notified when it launches →
              </button>
              <p className="mt-3 text-center text-xs text-[#64748b]">
                Price climbs to <span className="text-[#cbd0e2]">$249</span> after the first 100.
              </p>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-[#475569]">
            Paid plans handle their own provider costs (you bring your own API keys).
            VoidSoul never proxies your model traffic.
          </p>
        </div>
      </section>

      {/* ============================ FINAL CTA ============================ */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 text-center">
        <VoidSoulOrb size={120} className="mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">
          Talk to the orb.
        </h2>
        <p className="mt-3 mx-auto max-w-lg text-[#94a3b8]">
          When the first build ships, you&apos;ll see it here. Until then, follow the
          studio devlog for the build-in-public ride.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.youtube.com/@voidsoul_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#7c3aed] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)]"
          >
            Follow the devlog ↗
          </a>
          <Link
            href="/"
            className="rounded-lg border border-[#1e1a3a] px-6 py-3 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#7c3aed] hover:text-[#e2e8f0]"
          >
            Back to the Library
          </Link>
        </div>
      </section>

      {/* Scroll-reveal animations (in-page CSS) */}
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .reveal-up { animation: revealUp 700ms ease-out backwards; }
        .reveal-up-delay { animation: revealUp 700ms 250ms ease-out backwards; }
        .reveal-fade { animation: revealFade 900ms ease-out backwards; }
        .reveal-stagger { animation: revealUp 600ms ease-out backwards; }
      `}</style>
    </div>
  );
}

/* ----------------------------- subcomponents ----------------------------- */

function DownloadButton({ platform }: { platform: 'windows' | 'macos' | 'linux' }) {
  const config = {
    windows: {
      label: 'Download for Windows',
      sublabel: '.exe · NSIS installer',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.65" />
        </svg>
      ),
    },
    macos: {
      label: 'macOS',
      sublabel: '.dmg',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
    },
    linux: {
      label: 'Linux',
      sublabel: '.AppImage',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.563.187.166.124.245.291.342.526.094.233.143.529.146.829v.043a.49.49 0 01-.085.29.31.31 0 01-.155.07c-.07 0-.219-.011-.32-.131a.46.46 0 01-.118-.282c-.092-.097-.245-.197-.245-.371 0-.073.026-.143.073-.207a.31.31 0 01.155-.107c.058-.013.118-.027.171-.027z"/>
        </svg>
      ),
    },
  } as const;

  const c = config[platform];

  return (
    <button
      disabled
      className="group/dl flex items-center gap-3 rounded-xl border border-[#1e1a3a] bg-[#0f0f1e] px-5 py-3 text-left transition-all hover:border-[#7c3aed] hover:shadow-[0_0_24px_rgba(124,58,237,0.25)] disabled:cursor-not-allowed disabled:opacity-90"
    >
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#7c3aed]/15 text-[#a855f7] transition-colors group-hover/dl:bg-[#7c3aed]/25 group-hover/dl:text-[#c084fc]">
        {c.icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-[#e2e8f0] group-hover/dl:text-[#c084fc] transition-colors">
          {c.label}
        </span>
        <span className="block text-[10px] uppercase tracking-widest text-[#475569]">
          {c.sublabel}
        </span>
      </span>
      <span className="text-[10px] font-medium uppercase tracking-widest text-[#7c3aed]/60">
        Soon
      </span>
    </button>
  );
}

function ShowcaseTile({
  className = '',
  title,
  caption,
  tiltDeg = 0,
  children,
}: {
  className?: string;
  title: string;
  caption: string;
  tiltDeg?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e]/80 p-6 transition-all duration-500 hover:border-[#7c3aed]/60 hover:bg-[#0f0f1e] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top right, rgba(124,58,237,0.12), transparent 70%)',
        }}
      />
      <div className="relative">
        <p className="mb-1 text-base font-semibold text-[#e2e8f0]">{title}</p>
        <p className="mb-4 text-xs text-[#64748b] leading-relaxed">{caption}</p>
        <div
          className="transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ transform: `rotate(${tiltDeg}deg)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function CloseUpPanel({
  tag,
  title,
  caption,
  children,
}: {
  tag: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e] transition-all duration-500 hover:-translate-y-1 hover:border-[#7c3aed]/60 hover:shadow-[0_0_28px_rgba(124,58,237,0.18)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top, rgba(124,58,237,0.12), transparent 60%)',
        }}
      />
      <div className="relative">
        <div className="px-6 pt-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
            {tag}
          </p>
          <h3 className="text-lg font-semibold text-[#e2e8f0]">{title}</h3>
          <p className="mt-1.5 text-sm text-[#64748b] leading-relaxed">{caption}</p>
        </div>
        <div className="border-t border-[#1e1a3a] bg-[#0a0a18]/60">{children}</div>
      </div>
    </div>
  );
}

function SecurityRow({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#1e1a3a] bg-black/30 px-4 py-3">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-[#e2e8f0]">{title}</p>
        <p className="mt-0.5 text-xs text-[#64748b] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
