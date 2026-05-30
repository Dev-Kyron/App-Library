import Link from 'next/link';
import type { Metadata } from 'next';
import { getApp } from '@/lib/apps';
import VoidSoulOrb from '@/components/voidsoul/VoidSoulOrb';
import ChatPanelMock from '@/components/voidsoul/ChatPanelMock';
import ProviderRotator from '@/components/voidsoul/ProviderRotator';
import AgentToolStream from '@/components/voidsoul/AgentToolStream';
import CostChartMock from '@/components/voidsoul/CostChartMock';
import McpMarketplaceMock from '@/components/voidsoul/McpMarketplaceMock';
import Stage3D from '@/components/voidsoul/Stage3D';
import SetupJourney from '@/components/voidsoul/SetupJourney';
import Tilt3D from '@/components/voidsoul/Tilt3D';
import DeepDive from '@/components/voidsoul/DeepDive';
import SmartDownloadButton from '@/components/voidsoul/SmartDownloadButton';
import EmailCaptureForm from '@/components/voidsoul/EmailCaptureForm';
import { DOWNLOAD_CONFIG, getDownloadUrl, type Platform } from '@/lib/downloads';
import { hasReviews, recentReviews } from '@/lib/reviews';
import {
  JsonLd,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
} from '@/lib/seo';

const app = getApp('voidsoul-ai-companion')!;
const APP_URL = `${SITE_URL}/apps/voidsoul-ai-companion`;
const YOUTUBE_URL = 'https://www.youtube.com/@voidsoul_studio';

/**
 * Long-form metadata copy. The OG variant is keyword-rich for social
 * card previews; the canonical description is tuned to fit Google's
 * snippet length (~155 chars after the tagline).
 */
const SEO_DESCRIPTION =
  'The Jarvis loop, finally local. A floating desktop AI companion that talks, sees your screen, drives your mouse, controls your smart home, and remembers — 12 providers, MCP, local neural voices.';

export const metadata: Metadata = {
  title: app.title,
  description: SEO_DESCRIPTION,
  applicationName: app.title,
  keywords: [
    'AI desktop assistant',
    'local AI companion',
    'multi-provider AI',
    'Jarvis-like AI',
    'voice AI assistant',
    'screen-aware AI',
    'AI agent with tools',
    'MCP client',
    'Home Assistant AI',
    'local neural TTS',
    'Claude desktop app',
    'Ollama GUI',
    'AI productivity',
    'VoidSoul AI Companion',
    SITE_NAME,
  ],
  alternates: { canonical: '/apps/voidsoul-ai-companion' },
  openGraph: {
    title: `${app.title} — ${app.tagline}`,
    description: SEO_DESCRIPTION,
    images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: app.title }],
    url: APP_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${app.title} — ${app.tagline}`,
    description: SEO_DESCRIPTION,
    images: [SITE_LOGO],
  },
};

/* Six headline benefits — the encyclopedic detail lives in the deep-dive
   accordion near the bottom of the page, so this grid stays scannable. */
const PILLARS = [
  {
    icon: '🧠',
    title: 'Five-layer memory',
    body: 'Threads, projects, story-so-far recaps, durable facts, and RAG over your chats + indexed files. It never forgets — and follows you across providers.',
  },
  {
    icon: '🛠️',
    title: '24 tools + MCP',
    body: 'Open apps. Run shell. Read & write files. Drive mouse and keyboard. OCR your screen. Search, research, generate images, run Python. Plus any MCP server.',
  },
  {
    icon: '👁️',
    title: 'Vision + screen control',
    body: 'see_screen hands the model an image it literally looks at. Pair it with click_on_screen and the assistant drives your actual GUI — accessibility-tree first, vision as backup.',
  },
  {
    icon: '🎙️',
    title: 'Local voice loop',
    body: 'Whisper listens and Piper neural voices — Void and Soul — speak, all on-device. Set a wake word for hands-free. Speak mid-reply to interrupt.',
  },
  {
    icon: '🌐',
    title: '12 providers, auto-routed',
    body: 'Anthropic · OpenAI · Gemini · Ollama · LM Studio · llama.cpp · Groq · xAI · OpenRouter · DeepSeek · Mistral · Custom. Leave it on ✨ Auto and it picks per prompt.',
  },
  {
    icon: '🔒',
    title: 'Local-first by default',
    body: 'Keys encrypted in your OS keychain. History in local SQLite. No telemetry, no server. Eight explicit, revocable permissions — it never acts silently.',
  },
];

const POSSIBILITIES = [
  'Tell it to read your error log, fix the bug, run the test suite, and commit.',
  'Paste a screenshot — it identifies the failing widget and writes the patch.',
  '“Turn off the living-room lights” — it drives Home Assistant for you.',
  'Use Claude for reasoning, GPT-4o for vision, Ollama for cheap follow-ups — one thread.',
  'Wake the orb with a phrase. Ask a question while doing something else. Hear it answered.',
];

export default function VoidSoulAssistantPage() {
  return (
    <div className="relative">
      {/* Per-page structured data — SoftwareApplication + Breadcrumb. The
          SoftwareApplication schema is what surfaces app rich-results
          (rating, install, offers) in Google. Offers cover the free beta
          and the Founder's lifetime upgrade. */}
      <JsonLd
        data={[
          softwareApplicationJsonLd({
            name: app.title,
            description: app.description,
            url: APP_URL,
            image: SITE_LOGO,
            version: DOWNLOAD_CONFIG.version.replace(/^v/, ''),
            category: 'DesktopApplication',
            operatingSystems: ['Windows', 'macOS', 'Linux'],
            offers: [
              { name: 'Free Forever — public beta', price: '0' },
              { name: "Founder's Edition — lifetime", price: '129' },
            ],
          }),
          breadcrumbJsonLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Apps & Tools', url: `${SITE_URL}/#apps` },
            { name: app.title, url: APP_URL },
          ]),
        ]}
      />

      {/* Page-wide ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.16) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 90% 40%, rgba(168,85,247,0.09) 0%, transparent 70%), radial-gradient(ellipse 30% 25% at 10% 70%, rgba(168,85,247,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Back link */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 pb-14 sm:px-6 sm:pt-14 sm:pb-20 lg:pb-28 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Orb — sits ABOVE the copy on mobile so the visual lands first
              when scrolling. Order flips back on lg so the copy is left. */}
          <div className="relative order-first flex items-center justify-center reveal-fade lg:order-last">
            <Tilt3D strength={10} liftZ={24}>
              <div className="relative">
                <div className="sm:hidden">
                  <VoidSoulOrb size={200} />
                </div>
                <div className="hidden sm:block lg:hidden">
                  <VoidSoulOrb size={300} />
                </div>
                <div className="hidden lg:block">
                  <VoidSoulOrb size={380} />
                </div>
                {/* Tool-stream chip — narrower on mobile so it never
                    overflows the orb's bottom or the screen edge. */}
                <div className="absolute -bottom-2 left-1/2 w-[88vw] max-w-[300px] -translate-x-1/2 reveal-up-delay">
                  <AgentToolStream />
                </div>
              </div>
            </Tilt3D>
          </div>

          {/* Copy */}
          <div className="relative z-10 reveal-up lg:order-first">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2a1a4e] bg-[#7c3aed]/10 px-3 py-1 text-[11px] sm:text-xs text-[#a855f7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                Apps &amp; Tools · Beta
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                New in {DOWNLOAD_CONFIG.version} · MCP marketplace · Piper voices
              </span>
            </div>
            <h1 className="text-[2.5rem] font-bold leading-[1.05] tracking-tight text-[#e2e8f0] sm:text-6xl lg:text-7xl">
              VoidSoul
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: '1px #7c3aed',
                  textShadow: '0 0 30px rgba(124,58,237,0.6)',
                }}
              >
                AI Companion
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base italic leading-snug text-[#a855f7] sm:mt-5 sm:text-lg">
              The Jarvis loop, finally local.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#94a3b8] sm:text-[15px] sm:mt-6">
              A floating desktop AI companion that talks, listens, sees your screen, drives your
              mouse, opens your apps, edits your files, controls your smart home, and remembers
              every conversation. Bring whichever AI you already love — 12 providers, one body.
            </p>

            {/* Stacked on mobile (full-width buttons), inline on sm+. */}
            <div className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <DownloadButton platform="windows" primary />
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
                <DownloadButton platform="macos" />
                <DownloadButton platform="linux" />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs leading-relaxed text-[#475569]">
              <span>
                {DOWNLOAD_CONFIG.enabled ? (
                  <>Free tier · {DOWNLOAD_CONFIG.version} · bring your own keys</>
                ) : (
                  <>Builds aren&apos;t live yet — Founder&apos;s Edition launches when downloads go public.</>
                )}
              </span>
              <Link href="#pricing" className="text-[#7c3aed] hover:underline">
                See pricing ↓
              </Link>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] hover:text-[#a855f7] transition-colors"
              >
                Watch the loop ↗
              </a>
            </div>
          </div>
        </div>

        {/* Trust strip — one line of credibility right under the fold. */}
        <div className="mx-auto max-w-7xl px-4 pb-2 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-[#2a2550] bg-[#15152a]/50 px-5 py-3 text-center text-[12px] font-medium text-[#94a3b8] sm:text-[13px]">
            <span>🌐 12 providers</span>
            <span className="text-[#2a2550]">·</span>
            <span>🔑 Your keys, your machine</span>
            <span className="text-[#2a2550]">·</span>
            <span>🛰️ Zero telemetry</span>
            <span className="text-[#2a2550]">·</span>
            <span>🏠 Local-first</span>
            <span className="text-[#2a2550]">·</span>
            <span>💸 No subscription floor</span>
          </div>
        </div>
      </section>

      {/* ====================== 3D SHOWCASE STAGE ====================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-4 sm:px-6 sm:pt-16 sm:pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
            Live surface
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <h2 className="text-3xl font-bold leading-[1.05] text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              See it,
              <span className="text-[#7c3aed]">{' '}floating.</span>
            </h2>
            <p className="max-w-md text-sm text-[#94a3b8]">
              Real panels from the running app — chat with live agent steps, the
              multi-provider picker, the one-click MCP marketplace, the cost dashboard.
              <span className="hidden sm:inline">{' '}Hover the canvas; it tilts with you.</span>
            </p>
          </div>
        </div>

        {/* 3D stage spans full width for the parallax effect */}
        <div className="relative mx-auto max-w-[1400px] px-2 sm:px-6">
          <Stage3D
            height={880}
            panels={[
              {
                // Chat is the centrepiece — closest to camera, left of centre.
                id: 'chat',
                x: 30,
                y: 38,
                width: 420,
                rotY: 10,
                rotX: -2,
                z: 60,
                delay: 0,
                caption: 'Chat panel',
                children: <ChatPanelMock />,
              },
              {
                // Top-right — provider picker reads alongside the chat.
                id: 'providers',
                x: 74,
                y: 24,
                width: 340,
                rotY: -12,
                rotX: 3,
                z: 0,
                delay: 1.5,
                caption: '12 providers',
                children: <ProviderRotator />,
              },
              {
                // Mid-right — the headline v2.0 feature, the MCP marketplace.
                id: 'mcp',
                x: 77,
                y: 64,
                width: 340,
                rotY: -8,
                rotX: -4,
                z: 40,
                delay: 0.7,
                caption: 'MCP marketplace',
                children: <McpMarketplaceMock />,
              },
              {
                // Bottom-left — cost honesty. Pulled in from the edge a touch.
                id: 'cost',
                x: 26,
                y: 82,
                width: 360,
                rotY: 8,
                rotX: 4,
                z: -20,
                delay: 2.2,
                caption: 'Cost dashboard',
                children: <CostChartMock />,
              },
            ]}
          />
        </div>
      </section>

      {/* ======================= WHY + POSSIBILITIES ======================= */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:gap-14 lg:py-28 lg:grid-cols-12">
          {/* Why */}
          <div className="lg:col-span-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              Why it exists
            </p>
            <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              The AI you already pay for —
              <br />
              <span className="text-[#a855f7]">with a body.</span>
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#94a3b8] max-w-2xl sm:mt-7 sm:space-y-5 sm:text-[15px]">
              <p>
                Today&apos;s AI apps split awkwardly. Cloud chatbots can&apos;t touch your computer.
                Editor copilots are trapped in one IDE. Closed ecosystems lock you to one
                vendor and one model. None of them remember you next month.
              </p>
              <p>
                VoidSoul AI Companion is the third path. A single persistent companion that&apos;s
                always there, can do real work on your machine, speaks every major model,
                never sends your data anywhere you didn&apos;t tell it to, and grows with you
                through plugins, MCP servers, and per-mode memory.
              </p>
              <p className="text-[#e2e8f0] font-medium border-l-2 border-[#7c3aed] pl-4">
                Not a better chatbot — an operating layer for whatever AI you already pay for.
              </p>
            </div>
          </div>

          {/* Possibilities — staggered, asymmetric on desktop; flush on mobile. */}
          <div className="lg:col-span-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              What you can do
            </p>
            <h3 className="mb-5 text-xl font-semibold text-[#e2e8f0] sm:mb-6 sm:text-2xl">
              Real workflows, not chat-toy demos.
            </h3>
            <ul className="space-y-2.5">
              {POSSIBILITIES.map((line, i) => (
                <li
                  key={i}
                  className="possibility-row flex items-start gap-3 rounded-xl border border-[#2a2550]/60 bg-gradient-to-br from-[#15152a]/80 to-transparent px-4 py-3 transition-all hover:translate-x-1 hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/5 reveal-stagger"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    ['--ml' as string]: i % 2 === 0 ? '0px' : '12px',
                  }}
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
        <style>{`
          @media (min-width: 1024px) {
            .possibility-row { margin-left: var(--ml, 0); }
          }
        `}</style>
      </section>

      {/* ============================ PILLARS ============================ */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:pb-28">
          <div className="mb-8 max-w-2xl sm:mb-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              What&apos;s in the box
            </p>
            <h2 className="text-[1.75rem] font-bold text-[#e2e8f0] sm:text-4xl">
              Six pillars. One companion.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#2a2550] bg-[#2a2550]/50 sm:rounded-3xl md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden bg-[#0f0f1a] p-5 transition-all duration-300 hover:bg-[#15152a] reveal-stagger sm:p-7"
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
        className="relative border-y border-[#2a2550]"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 60%), linear-gradient(to bottom, #0b0b16 0%, #0f0f1a 100%)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
                How it works
              </p>
              <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
                Seven steps to your own Jarvis.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#94a3b8]">
              From first launch to wake-word voice, MCP plugins, and budget alerts. Tap a
              step to preview what setup actually looks like.
            </p>
          </div>

          <SetupJourney />
        </div>
      </section>

      {/* ======================= SECURITY / PRIVACY ======================= */}
      <section id="security" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
                Privacy &amp; permissions
              </p>
              <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
                It never
                <br />
                <span className="text-[#a855f7]">acts silently.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm text-[#94a3b8] leading-relaxed sm:mt-6 sm:text-base">
                Every capability that touches your machine is gated behind a permission you
                explicitly grant — and can revoke any time. File writes are reversible. Every
                action is logged. Private mode strips the chat: no save, no facts, no screen
                context.
              </p>
              <p className="mt-5 text-sm text-[#94a3b8]">
                Eight explicit, revocable permissions —{' '}
                <a href="#breakdown" className="text-[#7c3aed] hover:underline">
                  see the full table ↓
                </a>
              </p>
            </div>

            <div className="space-y-3">
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
                body="The code lives on GitHub for transparency — anyone can audit what the app actually does."
              />
              <SecurityRow
                icon="⏯️"
                title="Per-request abort"
                body="Hit Stop and the model call, the tool subprocess, and any background fetch cancel in the same breath."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PRICING ============================ */}
      <section
        id="pricing"
        className="relative border-t border-[#2a2550] overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              Pricing
            </p>
            <h2 className="text-[1.75rem] font-bold text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              One price. Yours forever.
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-[#94a3b8] leading-relaxed sm:text-base">
              Cancel ChatGPT Plus. Cancel Claude Pro. Pay once. Bring your own keys.
              No subscription floor, ever.
            </p>
          </div>

          {/* Two tiers during the beta: Free Forever (everyone, fully
             unlocked while we polish) and Founder's (waitlist for paid
             launch). */}
          <div className="mx-auto grid max-w-4xl gap-5 sm:gap-6 lg:grid-cols-2">
            {/* Free Forever — BETA mode: all features unlocked so testers
                get the real product to break. Beta downloaders keep a free
                lifetime Founder's licence at v1.0 launch. */}
            <Tilt3D strength={5} liftZ={10}>
              <div className="relative h-full rounded-2xl border border-emerald-500/30 bg-[#15152a] p-6 transition-colors hover:border-emerald-500/60 sm:rounded-3xl sm:p-8">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-widest text-[#64748b]">Free Forever</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                    Beta · live
                  </span>
                </div>
                <p className="text-4xl font-bold text-[#e2e8f0] mb-1">$0</p>
                <p className="text-sm text-[#64748b] mb-6 sm:mb-7">
                  Public beta. Everything unlocked while we polish.
                </p>
                <ul className="space-y-2.5 text-sm text-[#94a3b8]">
                  {[
                    'Every Founder’s feature, free',
                    'All 12 providers · MCP marketplace · voice loop',
                    'Unlimited threads (for now)',
                    'Full agent · Quick AI · Home Assistant',
                  ].map((l) => (
                    <li key={l} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
                <SmartDownloadButton />
                <p className="mt-3 text-center text-[11px] leading-relaxed text-[#475569]">
                  At v1.0 the Free tier locks to local providers + 5 threads.
                  <br />
                  Beta downloaders keep <span className="text-emerald-300">Founder&apos;s lifetime, free</span>.
                </p>
              </div>
            </Tilt3D>

            <Tilt3D strength={6} liftZ={16}>
              <div className="relative h-full rounded-2xl border border-[#7c3aed] bg-gradient-to-b from-[#1a0a3a]/40 to-[#15152a] p-6 shadow-2xl shadow-[#7c3aed]/30 sm:rounded-3xl sm:p-8">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#7c3aed] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Founder&apos;s · First 100
                </span>
                <p className="text-xs uppercase tracking-widest text-[#a855f7] mb-3">Lifetime</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-4xl font-bold text-[#e2e8f0] sm:text-5xl">$129</p>
                  <p className="text-sm text-[#64748b] line-through">$249</p>
                </div>
                <p className="mb-6 text-sm text-[#a855f7] sm:mb-7">AUD · one-time · yours forever</p>
                <ul className="space-y-2.5 text-sm text-[#cbd0e2]">
                  {[
                    'All 12 providers · MCP marketplace · plugins',
                    'Piper neural voices · wake word · barge-in',
                    'Projects · Notebooks · Quick AI',
                    'Home Assistant · scheduled tasks · cost dashboard',
                    'All themes & languages',
                    'Every future update, free',
                  ].map((l) => (
                    <li key={l} className="flex items-start gap-2">
                      <span className="text-[#a855f7] mt-0.5">✦</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
                <EmailCaptureForm
                  source="voidsoul-ai-companion/founders-notify"
                  cta="Notify me when checkout opens →"
                />
                <p className="mt-3 text-center text-xs text-[#64748b]">
                  Stripe checkout opens with v1.0 paid launch ·{' '}
                  <span className="text-[#cbd0e2]">$129 lifetime</span>, climbs to $249
                  after the first 100.
                </p>
              </div>
            </Tilt3D>
          </div>

          <p className="mt-10 text-center text-xs text-[#475569]">
            All prices in AUD. Paid plans handle their own provider costs (you bring your own
            API keys). VoidSoul never proxies your model traffic.
          </p>
        </div>
      </section>

      {/* ====================== DEEP-DIVE ACCORDION ======================
          The "big drop-down breakdown" — every dense reference detail lives
          here so the funnel above stays a clean pitch. */}
      <section id="breakdown" className="relative border-t border-[#2a2550] bg-[#0b0b16]/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mb-8 text-center sm:mb-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              The full breakdown
            </p>
            <h2 className="text-[1.75rem] font-bold text-[#e2e8f0] sm:text-4xl">
              Everything, in detail.
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-sm text-[#94a3b8] leading-relaxed">
              The exhaustive stuff — every tool, every provider, how memory works, the full
              permission table, and the pricing FAQ. Open what you care about.
            </p>
          </div>

          <DeepDive />

          <div className="mt-10 text-center">
            <Link
              href="#pricing"
              className="inline-flex rounded-lg bg-[#7c3aed] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)]"
            >
              Back to pricing ↑
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ REVIEWS ============================
          Renders real reviews from `web/lib/reviews.ts` when that file's
          REVIEWS array is non-empty, falls back to the dashed-border
          placeholder cards otherwise. */}
      <section id="reviews" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          {hasReviews() ? <RealReviews /> : <PlaceholderReviews />}
        </div>
      </section>

      {/* ====================== FINAL CTA / BUILT IN PUBLIC ======================
          Merges the old "Bug Report" + "Final CTA" into one closer. Keeps the
          #report anchor so existing links still resolve. */}
      <section id="report" className="relative border-t border-[#2a2550] bg-[#0b0b16]/40">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
          <VoidSoulOrb size={120} className="mx-auto mb-5 sm:mb-6" />
          <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-5xl">
            Talk to the orb.
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-sm text-[#94a3b8] sm:text-base">
            VoidSoul is built in public. Download the beta, then shape it — every bug report
            and feature wish gets read by the developer, no support queue, no scripted reply.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <Link
              href="#pricing"
              className="w-full max-w-xs rounded-lg bg-[#7c3aed] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] sm:w-auto"
            >
              Download the beta →
            </Link>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs rounded-lg border border-[#2a2550] px-6 py-3 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#7c3aed] hover:text-[#e2e8f0] sm:w-auto"
            >
              Watch the devlog ↗
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <a
              href="https://github.com/Dev-Kyron/SoulVoidAI/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#94a3b8] transition-colors hover:text-[#a855f7]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Open a GitHub issue ↗
            </a>
            <a
              href="https://discord.gg/Tn78RHqT4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#94a3b8] transition-colors hover:text-[#a855f7]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              Hop into Discord ↗
            </a>
          </div>
        </div>
      </section>

      {/* In-page CSS for reveals — respects prefers-reduced-motion */}
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
        @media (prefers-reduced-motion: reduce) {
          .reveal-up,
          .reveal-up-delay,
          .reveal-up-soft,
          .reveal-fade,
          .reveal-stagger {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------- subcomponents ----------------------------- */

function DownloadButton({
  platform,
  primary = false,
}: {
  platform: Platform;
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
  const live = DOWNLOAD_CONFIG.enabled;

  const className = `group/dl flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-all sm:w-auto sm:justify-start sm:px-5 ${
    primary
      ? 'bg-[#7c3aed] text-white shadow-[0_0_22px_rgba(124,58,237,0.35)] hover:bg-[#6d28d9] hover:shadow-[0_0_32px_rgba(124,58,237,0.55)]'
      : 'border border-[#2a2550] bg-[#15152a] text-[#cbd0e2] hover:border-[#7c3aed] hover:text-[#c084fc]'
  } ${live ? '' : 'cursor-not-allowed'}`;

  const inner = (
    <>
      {c.icon}
      <span className="whitespace-nowrap">
        <span className="sm:hidden">{c.label}</span>
        <span className="hidden sm:inline">Download for {c.label}</span>
      </span>
      <span
        className={`text-[10px] font-medium uppercase tracking-widest ${
          primary ? 'text-white/70' : 'text-[#7c3aed]/70'
        }`}
      >
        {live ? 'Free' : 'Soon'}
      </span>
    </>
  );

  if (live) {
    return (
      <a href={getDownloadUrl(platform)} download className={className}>
        {inner}
      </a>
    );
  }
  return (
    <button disabled className={className}>
      {inner}
    </button>
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
    <div className="flex items-start gap-3 rounded-xl border border-[#2a2550] bg-black/30 px-4 py-3.5 transition-all hover:border-[#7c3aed]/40 hover:translate-x-1">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-[#e2e8f0]">{title}</p>
        <p className="mt-0.5 text-xs text-[#64748b] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

/* ------------------------------ Reviews -------------------------------
 * Two render paths. `RealReviews` renders the curated `REVIEWS` array from
 * lib/reviews.ts (populated by hand from Formspree submissions).
 * `PlaceholderReviews` is the pre-launch dashed "open at launch" treatment.
 * ------------------------------------------------------------------- */

function ReviewsHeader({ heading, body }: { heading: React.ReactNode; body: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
          Reactions
        </p>
        <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      </div>
      <p className="max-w-sm text-sm text-[#94a3b8]">{body}</p>
    </div>
  );
}

function RealReviews() {
  const reviews = recentReviews(6);
  return (
    <>
      <ReviewsHeader
        heading={
          <>
            What beta testers <span className="text-[#a855f7]">are saying.</span>
          </>
        }
        body={
          <>
            Pulled straight from beta testers&apos; in-app reviews. Want to be next? Download the
            beta and hit Settings → About → Leave a review.
          </>
        }
      />
      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {reviews.map((review, i) => (
          <div
            key={`${review.name}-${review.date}`}
            className="flex flex-col gap-4 rounded-2xl border border-[#2a2550] bg-[#101022]/80 p-6 transition-colors hover:border-[#312e62]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#2a2550] font-mono text-sm text-[#a855f7]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#e2e8f0]">{review.name}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <svg
                        key={s}
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={s < review.rating ? 'text-[#f59e0b]' : 'text-[#2a2550]'}
                      >
                        <path d="M12 2l3 7h7l-5.5 4.5L18.5 22 12 17.5 5.5 22l2-8.5L2 9h7z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#64748b]">v{review.version}</span>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#cbd5e1]">{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function PlaceholderReviews() {
  return (
    <>
      <ReviewsHeader
        heading={
          <>
            Reviews <span className="text-[#a855f7]">open at launch.</span>
          </>
        }
        body={
          <>
            Beta is live. The first installs are landing right now — reviews start showing up here
            as testers ship their thoughts.
          </>
        }
      />
      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flex flex-col gap-4 rounded-2xl border border-dashed border-[#2a2550] bg-[#101022]/60 p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#2a2550]/80 font-mono text-sm text-[#475569]">
                0{n}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#64748b]">Beta tester · open</p>
                <div className="mt-0.5 flex gap-0.5 text-[#2a2550]">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3 7h7l-5.5 4.5L18.5 22 12 17.5 5.5 22l2-8.5L2 9h7z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#334155]">
              Reviews land here as beta testers ship their thoughts.
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
