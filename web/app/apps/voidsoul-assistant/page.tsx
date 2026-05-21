import Link from 'next/link';
import type { Metadata } from 'next';
import { getApp } from '@/lib/apps';
import VoidSoulOrb from '@/components/voidsoul/VoidSoulOrb';
import ChatPanelMock from '@/components/voidsoul/ChatPanelMock';
import ProviderRotator from '@/components/voidsoul/ProviderRotator';
import AgentToolStream from '@/components/voidsoul/AgentToolStream';
import QuickAIMock from '@/components/voidsoul/QuickAIMock';
import CostChartMock from '@/components/voidsoul/CostChartMock';
import Stage3D from '@/components/voidsoul/Stage3D';
import SetupJourney from '@/components/voidsoul/SetupJourney';

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

const PILLARS = [
  {
    icon: '🧠',
    title: 'Four-layer memory',
    body: 'Threads, story-so-far summaries, durable facts, RAG over chat + indexed files. The model never forgets — and follows you across providers.',
  },
  {
    icon: '🤖',
    title: '18 agent tools + MCP',
    body: 'Open apps. Run shell. Read & write files. Drive mouse and keyboard. OCR your screen. Search the web. Run Python. Plus any MCP server.',
  },
  {
    icon: '👁️',
    title: 'Vision + screen control',
    body: 'see_screen captures your screen as an image the model literally looks at. Combine with mouse control and the assistant uses your GUI.',
  },
  {
    icon: '🎙️',
    title: 'Local voice loop',
    body: 'Whisper STT and wake-word run locally — no API key, no audio leaving your machine. Speak mid-reply to interrupt.',
  },
  {
    icon: '🌐',
    title: '12 providers',
    body: 'Anthropic · OpenAI · Gemini · Ollama · LM Studio · llama.cpp · Groq · xAI · OpenRouter · DeepSeek · Mistral · Custom. Switch per-thread.',
  },
  {
    icon: '🪟',
    title: 'Raycast-style Quick AI',
    body: 'Cmd+Shift+J from anywhere. One-shot answers, reads your clipboard, no thread, no config. The fastest path to "I have a tiny question".',
  },
  {
    icon: '📁',
    title: 'Projects & Notebooks',
    body: 'Pinned mode + custom instructions. Notebook cells for prompt, python, search, markdown. Schedule prompts on a cron.',
  },
  {
    icon: '💰',
    title: 'Per-token cost only',
    body: 'No subscription floor. Bring your own keys, pay for what you use. Dashboard with daily-spend chart and budget alerts.',
  },
  {
    icon: '🔒',
    title: 'Local-first by default',
    body: 'Keys encrypted in your OS keychain. History in local SQLite. No telemetry. Pollinations, DuckDuckGo, and local Whisper as keyless defaults.',
  },
];

const POSSIBILITIES = [
  'Tell it to read your error log, fix the bug, run the test suite, and commit.',
  'Speak a thought aloud — it transcribes, refines, and pastes into your editor.',
  'Paste a screenshot — it identifies the failing widget and writes the patch.',
  'Schedule it to grep your codebase for unused exports every morning.',
  'Drop a PDF into the chat — talk to it without any "Pro plan" upsell.',
  'Use Claude for reasoning, GPT-4o for vision, Ollama for cheap follow-ups, all in one thread.',
  'Wake the orb with a phrase. Ask a question while doing something else. Hear it answered.',
  'Chain MCP servers — read a Notion page, query GitHub, write a file, all in one prompt.',
];

const PERMISSIONS = [
  { name: 'Terminal', unlocks: 'Shell commands · sandboxed Python', risk: 'High' },
  { name: 'Filesystem', unlocks: 'Read, write, organise files (writes are undoable)', risk: 'High' },
  { name: 'App control', unlocks: 'Launch apps, foreground windows', risk: 'Medium' },
  { name: 'Input access', unlocks: 'Keyboard + mouse control', risk: 'High' },
  { name: 'Screen capture', unlocks: 'Screenshots, OCR, vision', risk: 'Medium' },
  { name: 'Microphone', unlocks: 'Voice input + wake-word', risk: 'Medium' },
  { name: 'Browser', unlocks: 'Opening URLs', risk: 'Low' },
];

const riskColor = {
  Low: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
} as const;

export default function VoidSoulAssistantPage() {
  return (
    <div className="relative">
      {/* Page-wide ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 90% 40%, rgba(168,85,247,0.10) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 10% 70%, rgba(168,85,247,0.08) 0%, transparent 70%)',
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

      {/* ============================== HERO ============================== */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Copy */}
          <div className="relative z-10 reveal-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2a1a4e] bg-[#7c3aed]/10 px-3 py-1 text-xs text-[#a855f7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              Apps &amp; Tools · Coming Soon
            </div>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-[#e2e8f0] sm:text-6xl lg:text-7xl">
              VoidSoul
            </h1>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: '1px #7c3aed',
                  textShadow: '0 0 30px rgba(124,58,237,0.6)',
                }}
              >
                Assistant
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg italic leading-snug text-[#a855f7]">
              The Jarvis loop, finally local.
            </p>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#94a3b8]">
              A floating desktop AI that talks, listens, sees your screen, drives your mouse,
              opens your apps, edits your files, and remembers every conversation. Bring
              whichever AI you already love — twelve providers, one body.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <DownloadButton platform="windows" primary />
              <DownloadButton platform="macos" />
              <DownloadButton platform="linux" />
            </div>
            <p className="mt-3 text-xs text-[#475569]">
              Builds aren&apos;t live yet — Founder&apos;s Edition launches when downloads go public.
              <Link href="#pricing" className="ml-1 text-[#7c3aed] hover:underline">
                See pricing →
              </Link>
            </p>
          </div>

          {/* Orb */}
          <div className="relative flex items-center justify-center reveal-fade">
            <div className="relative">
              <VoidSoulOrb size={360} />
              <div className="absolute -bottom-2 left-1/2 w-[300px] -translate-x-1/2 reveal-up-delay">
                <AgentToolStream />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== 3D SHOWCASE STAGE ====================== */}
      <section className="relative">
        {/* Heading floats against the left margin; not a centered block */}
        <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
            Live surface
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-4xl font-bold leading-[1.05] text-[#e2e8f0] sm:text-5xl">
              See it,
              <span className="text-[#7c3aed]">{' '}floating.</span>
            </h2>
            <p className="max-w-md text-sm text-[#94a3b8]">
              Real panels from the running app — chat with live agent steps, the
              multi-provider picker, the cost dashboard, the Raycast-style overlay.
              Hover the canvas; it tilts with you.
            </p>
          </div>
        </div>

        {/* 3D stage spans full width for the parallax effect */}
        <div className="relative mx-auto max-w-[1400px] px-2 sm:px-6">
          <Stage3D
            height={780}
            panels={[
              {
                id: 'chat',
                x: 28,
                y: 50,
                width: 420,
                rotY: 10,
                rotX: -2,
                z: 60,
                delay: 0,
                caption: 'Chat panel',
                children: <ChatPanelMock />,
              },
              {
                id: 'providers',
                x: 70,
                y: 28,
                width: 340,
                rotY: -12,
                rotX: 3,
                z: 0,
                delay: 1.5,
                caption: '12 providers',
                children: <ProviderRotator />,
              },
              {
                id: 'cost',
                x: 76,
                y: 70,
                width: 340,
                rotY: -8,
                rotX: -4,
                z: 40,
                delay: 0.7,
                caption: 'Cost dashboard',
                children: <CostChartMock />,
              },
              {
                id: 'quickai',
                x: 22,
                y: 88,
                width: 380,
                rotY: 8,
                rotX: 4,
                z: -20,
                delay: 2.2,
                caption: 'Quick AI',
                children: <QuickAIMock />,
              },
            ]}
          />
        </div>
      </section>

      {/* ======================= WHY + POSSIBILITIES ======================= */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12">
          {/* Why */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-3">
              Why it exists
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              The AI you already pay for —
              <br />
              <span className="text-[#a855f7]">with a body.</span>
            </h2>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-[#94a3b8] max-w-2xl">
              <p>
                Today&apos;s AI apps split awkwardly. Cloud chatbots can&apos;t touch your computer.
                Editor copilots are trapped in one IDE. Closed ecosystems lock you to one
                vendor and one model. None of them remember you next month.
              </p>
              <p>
                VoidSoul Assistant is the third path. A single persistent assistant that&apos;s
                always there, can do real work on your machine, speaks every major model,
                never sends your data anywhere you didn&apos;t tell it to, and grows with you
                through plugins, MCP servers, and per-mode memory.
              </p>
              <p className="text-[#e2e8f0] font-medium border-l-2 border-[#7c3aed] pl-4">
                It&apos;s not a better chatbot. It&apos;s an operating layer that turns whatever AI
                you pay for into Jarvis.
              </p>
            </div>
          </div>

          {/* Possibilities — staggered, asymmetric */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-3">
              What you can do
            </p>
            <h3 className="text-2xl font-semibold text-[#e2e8f0] mb-6">
              Real workflows, not chat-toy demos.
            </h3>
            <ul className="space-y-2.5">
              {POSSIBILITIES.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-[#1e1a3a]/60 bg-gradient-to-br from-[#0f0f1e]/80 to-transparent px-4 py-3 transition-all hover:translate-x-1 hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/5 reveal-stagger"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    marginLeft: i % 2 === 0 ? 0 : 12,
                  }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-[#7c3aed]/15 text-[#a855f7] text-[11px]"
                  >
                    ✦
                  </span>
                  <span className="text-sm text-[#cbd0e2] leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================ PILLARS ============================ */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              What&apos;s in the box
            </p>
            <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">
              Nine pillars.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-[#1e1a3a] bg-[#1e1a3a]/50 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden bg-[#0a0a18] p-7 transition-all duration-300 hover:bg-[#0f0f1e] reveal-stagger"
                style={{ animationDelay: `${i * 50}ms` }}
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
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed]/15 text-[#a855f7] text-lg ring-1 ring-[#7c3aed]/30 transition-all group-hover:scale-110 group-hover:ring-[#7c3aed]">
                    {p.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#e2e8f0] mb-1.5 group-hover:text-[#c084fc] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= SETUP JOURNEY ========================= */}
      <section
        id="setup"
        className="relative border-y border-[#1e1a3a]"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 60%), linear-gradient(to bottom, #06060f 0%, #0a0a12 100%)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
                Full setup
              </p>
              <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl lg:text-5xl leading-tight">
                Seven steps to unlock everything.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#94a3b8]">
              From first launch to wake-word voice, MCP plugins, and budget alerts. Click a
              step to preview what setup actually looks like.
            </p>
          </div>

          <SetupJourney />
        </div>
      </section>

      {/* ======================== UI CLOSE-UPS ======================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mb-14 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
                Up close
              </p>
              <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl lg:text-5xl leading-tight">
                The details
                <br />
                <span className="text-[#a855f7]">you&apos;ll feel.</span>
              </h2>
            </div>
            <p className="max-w-sm justify-self-end text-sm text-[#94a3b8]">
              Real UI surfaces from the running app. Hover for the small lift.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <CloseUpPanel
              className="lg:col-span-5 lg:translate-y-4"
              tag="Floating orb"
              title="Always there, never in the way."
              caption="Drag-to-move. Click-to-summon. Tray-resident on every OS."
            >
              <div className="flex items-center justify-center py-14">
                <VoidSoulOrb size={200} />
              </div>
            </CloseUpPanel>

            <CloseUpPanel
              className="lg:col-span-7"
              tag="Live agent"
              title="See what it's doing, as it does it."
              caption="A live strip while the agent works — searching, reading, running, clicking — never silent."
            >
              <div className="flex flex-col gap-2 p-5 pt-2">
                <AgentToolStream />
                <AgentToolStream className="opacity-60" />
                <AgentToolStream className="opacity-30" />
                <p className="pt-2 text-[10px] text-[#475569]">
                  Six-step agent loop cap · partial content preserved on Stop · every step
                  logged.
                </p>
              </div>
            </CloseUpPanel>

            <CloseUpPanel
              className="lg:col-span-7 lg:-translate-y-4"
              tag="Quick AI"
              title="One shortcut. Every answer."
              caption="Press Cmd+Shift+J from anywhere — Word, Photoshop, your terminal. Ask. Done."
            >
              <div className="flex items-center justify-center py-10">
                <QuickAIMock />
              </div>
            </CloseUpPanel>

            <CloseUpPanel
              className="lg:col-span-5"
              tag="Cost honesty"
              title="Spend, daily. Budget, enforced."
              caption="Pay for tokens, not for a chat UI. Alerts at 75 / 90 / 100% of monthly cap."
            >
              <div className="flex items-center justify-center py-6">
                <CostChartMock />
              </div>
            </CloseUpPanel>
          </div>
        </div>
      </section>

      {/* ======================= SECURITY / PRIVACY ======================= */}
      <section
        id="security"
        className="relative border-y border-[#1e1a3a] bg-[#06060f]/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
                Privacy &amp; permissions
              </p>
              <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl lg:text-5xl leading-tight">
                It never
                <br />
                <span className="text-[#a855f7]">acts silently.</span>
              </h2>
              <p className="mt-6 max-w-md text-[#94a3b8] leading-relaxed">
                Every capability that touches your machine is gated behind a permission you
                explicitly grant — and can revoke any time. File writes are reversible.
                Every action is logged. Private mode strips the chat: no save, no facts,
                no screen context.
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
                  body="We don't run a server. No usage tracking, no crash phone-home, no analytics SDKs."
                />
                <SecurityRow
                  icon="📝"
                  title="Source-visible licence"
                  body="The code lives on GitHub for transparency — anyone can audit what the app actually does. Resale is reserved."
                />
                <SecurityRow
                  icon="⏯️"
                  title="Per-request abort"
                  body="Hit Stop and the model call, the tool subprocess, and any background fetch cancel in the same breath."
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-3">
                Permissions, explicit
              </p>
              <div className="space-y-2 rounded-2xl border border-[#1e1a3a] bg-gradient-to-br from-[#0f0f1e] to-[#0a0a18] p-3">
                {PERMISSIONS.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-lg border border-[#1e1a3a] bg-black/30 px-3.5 py-3 transition-all hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 hover:translate-x-1"
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
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
                See the loop
              </p>
              <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">
                90-second demo.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#94a3b8]">
              Wake word → question → multi-step agent run → spoken reply. The full Jarvis
              loop, end-to-end.
            </p>
          </div>

          <div
            className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-[#1e1a3a] bg-[#0a0a20] shadow-2xl shadow-[#7c3aed]/20"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.15) 0%, transparent 50%)',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <VoidSoulOrb size={170} />
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
              'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.22) 0%, transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-2">
              Pricing
            </p>
            <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              One price. Yours forever.
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-[#94a3b8] leading-relaxed">
              Cancel ChatGPT Plus. Cancel Claude Pro. Pay once. Bring your own keys.
              No subscription floor, ever.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative rounded-3xl border border-[#1e1a3a] bg-[#0f0f1e] p-8 transition-all hover:border-[#2a1a4e]">
              <p className="text-xs uppercase tracking-widest text-[#64748b] mb-3">Free</p>
              <p className="text-4xl font-bold text-[#e2e8f0] mb-1">$0</p>
              <p className="text-sm text-[#64748b] mb-7">Local-only. Forever.</p>
              <ul className="space-y-2.5 text-sm text-[#94a3b8]">
                {['Ollama, LM Studio, llama.cpp', 'Five threads max', 'Local voice loop', 'Basic agent tools'].map(
                  (l) => (
                    <li key={l} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{l}</span>
                    </li>
                  ),
                )}
              </ul>
              <button
                disabled
                className="mt-8 w-full rounded-lg border border-[#1e1a3a] bg-black/40 py-3 text-sm font-medium text-[#64748b] cursor-not-allowed"
              >
                Free when downloads open
              </button>
            </div>

            <div className="relative rounded-3xl border border-[#7c3aed] bg-gradient-to-b from-[#1a0a3a]/40 to-[#0f0f1e] p-8 shadow-2xl shadow-[#7c3aed]/30">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#7c3aed] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                Founder&apos;s Edition · First 100
              </span>
              <p className="text-xs uppercase tracking-widest text-[#a855f7] mb-3">Lifetime</p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-5xl font-bold text-[#e2e8f0]">$129</p>
                <p className="text-sm text-[#64748b] line-through">$199</p>
              </div>
              <p className="text-sm text-[#a855f7] mb-7">AUD · one-time · yours forever</p>
              <ul className="space-y-2.5 text-sm text-[#cbd0e2]">
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
                className="mt-8 w-full rounded-lg bg-[#7c3aed] py-3 text-sm font-semibold text-white cursor-not-allowed opacity-90 transition-all hover:opacity-100 hover:shadow-[0_0_28px_rgba(124,58,237,0.5)]"
              >
                Get notified when it launches →
              </button>
              <p className="mt-3 text-center text-xs text-[#64748b]">
                Climbs to <span className="text-[#cbd0e2]">$249</span> after the first 100.
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
      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 py-28 sm:px-6 text-center">
          <VoidSoulOrb size={140} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-5xl">
            Talk to the orb.
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-[#94a3b8]">
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
        </div>
      </section>

      {/* In-page CSS for reveals */}
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealUpSoft {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes revealFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .reveal-up { animation: revealUp 700ms ease-out backwards; }
        .reveal-up-delay { animation: revealUp 700ms 250ms ease-out backwards; }
        .reveal-up-soft { animation: revealUpSoft 500ms ease-out backwards; }
        .reveal-fade { animation: revealFade 900ms ease-out backwards; }
        .reveal-stagger { animation: revealUp 600ms ease-out backwards; }
      `}</style>
    </div>
  );
}

/* ----------------------------- subcomponents ----------------------------- */

function DownloadButton({
  platform,
  primary = false,
}: {
  platform: 'windows' | 'macos' | 'linux';
  primary?: boolean;
}) {
  const config = {
    windows: {
      label: 'Windows',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.65" />
        </svg>
      ),
    },
    macos: {
      label: 'macOS',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    linux: {
      label: 'Linux',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489.024.111.05.219.09.31a.703.703 0 00-.16.18c-.193.272-.4.553-.602.834-.196.276-.392.55-.589.825-.087.122-.175.245-.262.366-.094.13-.187.262-.281.39-.32.43-.66.857-1.027 1.255-.225.243-.402.534-.553.857C.892 21.21.808 21.55.84 21.9c.022.236.097.46.224.66.272.397.728.66 1.197.835.495.184 1.04.281 1.59.291.633.013 1.265-.087 1.866-.295a3.913 3.913 0 00.91-.452c.314-.218.605-.477.857-.773a3.846 3.846 0 00.687-1.044c.054-.13.103-.263.146-.398.038-.122.071-.247.097-.374.105-.523.151-1.06.155-1.594.001-.124-.002-.246-.011-.367a8.84 8.84 0 00-.039-.391c-.038-.305-.103-.61-.184-.913a8.41 8.41 0 00-.31-.978c-.131-.358-.291-.704-.483-1.032-.114-.197-.241-.385-.378-.567z" />
        </svg>
      ),
    },
  } as const;

  const c = config[platform];

  return (
    <button
      disabled
      className={`group/dl flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-medium transition-all disabled:cursor-not-allowed ${
        primary
          ? 'bg-[#7c3aed] text-white shadow-[0_0_22px_rgba(124,58,237,0.35)] hover:bg-[#6d28d9] hover:shadow-[0_0_32px_rgba(124,58,237,0.55)]'
          : 'border border-[#1e1a3a] bg-[#0f0f1e] text-[#cbd0e2] hover:border-[#7c3aed] hover:text-[#c084fc]'
      }`}
    >
      {c.icon}
      <span>Download for {c.label}</span>
      <span className={`text-[10px] font-medium uppercase tracking-widest ${primary ? 'text-white/70' : 'text-[#7c3aed]/70'}`}>
        Soon
      </span>
    </button>
  );
}

function CloseUpPanel({
  className = '',
  tag,
  title,
  caption,
  children,
}: {
  className?: string;
  tag: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-[#1e1a3a] bg-[#0f0f1e] transition-all duration-500 hover:-translate-y-1 hover:border-[#7c3aed]/60 hover:shadow-[0_0_32px_rgba(124,58,237,0.18)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top, rgba(124,58,237,0.12), transparent 60%)',
        }}
      />
      <div className="relative">
        <div className="px-7 pt-7">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
            {tag}
          </p>
          <h3 className="text-xl font-semibold text-[#e2e8f0]">{title}</h3>
          <p className="mt-2 text-sm text-[#64748b] leading-relaxed">{caption}</p>
        </div>
        <div className="border-t border-[#1e1a3a] bg-[#0a0a18]/60 mt-5">{children}</div>
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
    <div className="flex items-start gap-3 rounded-xl border border-[#1e1a3a] bg-black/30 px-4 py-3.5 transition-all hover:border-[#7c3aed]/40 hover:translate-x-1">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-[#e2e8f0]">{title}</p>
        <p className="mt-0.5 text-xs text-[#64748b] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
