import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getApp } from '@/lib/apps';
import AgentHubMark from '@/components/agenthub/AgentHubMark';
import ToolColumnsMock from '@/components/agenthub/ToolColumnsMock';
import AgentChatMock from '@/components/agenthub/AgentChatMock';
import ThemeRotator from '@/components/agenthub/ThemeRotator';
import BootUpMock from '@/components/agenthub/BootUpMock';
import Stage3D from '@/components/voidsoul/Stage3D';
import Tilt3D from '@/components/voidsoul/Tilt3D';
import {
  JsonLd,
  SITE_NAME,
  SITE_URL,
  breadcrumbJsonLd,
  webApplicationJsonLd,
} from '@/lib/seo';

const app = getApp('agenthub')!;
const LIVE_URL = 'https://agenthub.solutions';
const REPO_URL = 'https://github.com/Dev-Kyron/AgentHub';
const PAGE_URL = `${SITE_URL}/apps/agenthub`;
const OG_IMAGE = `${SITE_URL}/agenthub/Features_Highlighted.png`;

/**
 * Tuned for the SERP snippet: leads with "call-centre productivity",
 * mentions the key features Google's seen me typing into the page, and
 * fits inside Google's snippet length cap.
 */
const SEO_DESCRIPTION =
  'AgentHub is a call-centre productivity dashboard that collapses every shift tool into one tab — three workflow columns, one-click Boot Up, and an AI Agent that answers from company-approved sources only.';

export const metadata: Metadata = {
  title: app.title,
  description: SEO_DESCRIPTION,
  applicationName: app.title,
  keywords: [
    'call centre productivity',
    'agent dashboard',
    'shift tools',
    'AI source-cited answers',
    'knowledge base assistant',
    'tab management dashboard',
    'browser productivity app',
    'BPO tools',
    'customer support AI',
    'AgentHub',
    SITE_NAME,
  ],
  alternates: { canonical: '/apps/agenthub' },
  openGraph: {
    title: `${app.title} — ${app.tagline}`,
    description: SEO_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: app.title }],
    url: PAGE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${app.title} — ${app.tagline}`,
    description: SEO_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const PILLARS = [
  {
    icon: '🧰',
    title: 'Custom tool hub',
    body: 'Three columns: Start of Day, Main Day, End of Day. Drag, rename, reorder. Add any URL — auto-fetched favicon, one-click open.',
  },
  {
    icon: '⚡',
    title: 'Boot Up My Day',
    body: 'One button opens every Start-of-Day and Main-Day tool in fresh tabs. Skip End-of-Day so the morning browser stays sane.',
  },
  {
    icon: '🤖',
    title: 'AI Agent panel',
    body: 'Floating Claude chat with real-time streaming. Add company URLs as sources — answers come from that content only. Cited at the end.',
  },
  {
    icon: '🔖',
    title: 'Bookmarklet capture',
    body: 'One-click capture of any internal page the agent is already logged into. Lighthouse, intranet, anything behind a VPN. PDFs auto-included.',
  },
  {
    icon: '🔐',
    title: 'SUK access gate',
    body: 'AI is unlocked per client by a System Unlock Key. Validated server-side. Revoke a key in Vercel and access dies instantly — no redeploy.',
  },
  {
    icon: '🎨',
    title: '14 colour themes',
    body: 'Live theme switching. Brand-match per client — Concentrix cyan, your in-house palette, or roll a custom hue.',
  },
  {
    icon: '📅',
    title: 'Shift scheduler',
    body: 'Rolling 7-day real-date calendar with reminders, follow-ups, and per-day tasks. Notes panel auto-saves every keystroke.',
  },
  {
    icon: '🔗',
    title: 'Share & backup',
    body: 'Export your full setup as a compressed code, or a short link. Restore on any machine — instant onboarding for new starters.',
  },
  {
    icon: '🛡️',
    title: 'No database, no logins',
    body: 'Agent data lives in their browser. AI calls proxy through serverless. No accounts, no analytics, no tracking. HTTPS everywhere.',
  },
];

const POSSIBILITIES = [
  'Drop every shift tool into one tab — no more 14-tab CRM circus.',
  'Hand a new starter a share link and their entire workspace appears.',
  'Paste a Lighthouse URL — the AI answers questions from that page only.',
  'Run the bookmarklet on an internal intranet page; the AI reads it on the next question.',
  'Brand-match per client — Concentrix cyan one shift, in-house purple the next.',
  'Boot Up My Day at 9am, End of Day at 5pm. One button each.',
  'Drop a 30-page PDF policy into sources; agents query it during live calls instead of redirecting.',
  'Revoke a client&apos;s SUK from Vercel — access dies before the next refresh.',
];

const PERMISSIONS = [
  { name: 'Browser storage', unlocks: 'Tools, notes, schedule, sources — all in localStorage', risk: 'Low' },
  { name: 'Clipboard', unlocks: 'Bookmarklet capture + share-code paste', risk: 'Low' },
  { name: 'Claude API (server)', unlocks: 'AI answers — proxied, key never in browser', risk: 'Medium' },
  { name: 'Jina Reader (server)', unlocks: 'Public-URL source fetching at query time', risk: 'Medium' },
  { name: 'SUK validation', unlocks: 'Server-side gate on every AI call', risk: 'Low' },
  { name: 'Outbound HTTPS', unlocks: 'Only to Anthropic + Jina, never elsewhere', risk: 'Low' },
];

const riskColor = {
  Low: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  High: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
} as const;

const FLOW_STEPS = [
  {
    n: 1,
    title: 'Click the 🤖 button',
    body: 'Floating in the corner of the dashboard. Opens the AI Agent panel — instant, no page navigation.',
  },
  {
    n: 2,
    title: 'Enter the SUK',
    body: 'Server validates the System Unlock Key on every request. No key, no panel — no AI traffic.',
  },
  {
    n: 3,
    title: 'Add company sources',
    body: 'Paste a knowledge-base URL via 🔗. Add a whole site root for whole-domain search. The AI fetches at query time, never stores.',
  },
  {
    n: 4,
    title: 'Capture private pages',
    body: 'For Lighthouse / intranet, install the one-click bookmarklet. Run it on any page you&apos;re already logged into — content + PDFs land in the clipboard.',
  },
  {
    n: 5,
    title: 'Ask the question',
    body: 'Streams in real time with a live "Searching sources…" pill. Structured for live calls — never redirects to a website.',
  },
  {
    n: 6,
    title: 'Cite & repeat',
    body: 'Every source-based answer ends with the URL it came from. History persists across sessions per agent.',
  },
];

/**
 * Checkout URLs for each tier. Create one Square Checkout Link per tier in
 * the Square Dashboard (Online → Checkout Links / Payment Links), paste the
 * resulting `square.link/u/XXXXX` URL into the matching slot below, and the
 * tier's Subscribe button switches from "Set up in Square" to a live link.
 *
 * Leaving an entry as '' renders the button in a disabled state so a
 * half-configured tier can't accidentally ship to production.
 */
const SQUARE_CHECKOUT_URLS = {
  solo:       'https://square.link/u/UJvifXp1',
  starter:    'https://square.link/u/f6qxOiYB',
  growth:     'https://square.link/u/3Q8En7gb',
  business:   'https://square.link/u/tuHYnIwM',
  enterprise: 'https://square.link/u/9rtixk42',
} as const;

const PRICING_TIERS: {
  id: keyof typeof SQUARE_CHECKOUT_URLS;
  name: string;
  users: string;
  price: string;
  subtle: string;
}[] = [
  { id: 'starter',    name: 'Starter',    users: 'Up to 10 users',  price: '$50–100',     subtle: '/mo' },
  { id: 'growth',     name: 'Growth',     users: 'Up to 25 users',  price: '$125–200',    subtle: '/mo' },
  { id: 'business',   name: 'Business',   users: 'Up to 50 users',  price: '$250–400',    subtle: '/mo' },
  { id: 'enterprise', name: 'Enterprise', users: 'Up to 100 users', price: '$500–1,000',  subtle: '/mo' },
];

const SCREENSHOTS = [
  {
    src: '/agenthub/Clean_HUD_Example.png',
    tag: 'Clean HUD',
    title: 'A fresh deployment.',
    caption: 'Three empty columns waiting for the workflow. Crimson theme — one of 14 brand options.',
  },
  {
    src: '/agenthub/Developer_Example.png',
    tag: 'Developer shift',
    title: 'A working day for an engineer.',
    caption: 'Slack, Calendar, GitHub on the left. Code, Vercel, Supabase mid-shift. PRs and analytics at end-of-day.',
  },
  {
    src: '/agenthub/Creator_Example.png',
    tag: 'Creator shift',
    title: 'A working day for a streamer.',
    caption: 'Twitch + Kick boot-up. Stream tools mid-day. YouTube uploads + Discord wrap-up. Same hub, totally different shape.',
  },
  {
    src: '/agenthub/Features_Highlighted.png',
    tag: 'Annotated',
    title: 'Everything called out.',
    caption: 'Tour mode + add-tool dialog + share/export overlay + theme picker — the full UI surface in one shot.',
  },
];

export default function AgentHubPage() {
  return (
    <div className="relative">
      {/* Per-page structured data — WebApplication + Breadcrumb. The
          offers array maps to the five paid tiers (Solo + four team
          plans) so Google can show pricing snippets in app-comparison
          queries. */}
      <JsonLd
        data={[
          webApplicationJsonLd({
            name: app.title,
            description: app.description,
            url: LIVE_URL,
            image: OG_IMAGE,
            category: 'BusinessApplication',
            offers: [
              { name: 'Free Forever — productivity suite', price: '0' },
              { name: 'Solo Evaluators — 1 user', price: '10' },
              { name: 'Starter — up to 10 users', price: '50' },
              { name: 'Growth — up to 25 users', price: '125' },
              { name: 'Business — up to 50 users', price: '250' },
              { name: 'Enterprise — up to 100 users', price: '500' },
            ],
          }),
          breadcrumbJsonLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Apps & Tools', url: `${SITE_URL}/#apps` },
            { name: app.title, url: PAGE_URL },
          ]),
        ]}
      />

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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 pb-16 sm:px-6 sm:pt-14 sm:pb-24 lg:pb-32 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Mark — on top on mobile, on the right on desktop */}
          <div className="relative order-first flex items-center justify-center reveal-fade lg:order-last">
            <Tilt3D strength={10} liftZ={24}>
              <div className="relative">
                <div className="sm:hidden">
                  <AgentHubMark size={220} />
                </div>
                <div className="hidden sm:block lg:hidden">
                  <AgentHubMark size={300} />
                </div>
                <div className="hidden lg:block">
                  <AgentHubMark size={380} />
                </div>
                {/* Live-status chip under the mark — same role as the
                    AgentToolStream chip on the VoidSoul page. */}
                <div className="absolute -bottom-2 left-1/2 w-[88vw] max-w-[300px] -translate-x-1/2 reveal-up-delay">
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-300">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold">Live:</span>
                    <span className="truncate text-[#cbd0e2] flex-1">
                      agenthub.solutions · Vercel · auto-deploy
                    </span>
                    <span className="text-base">🟢</span>
                  </div>
                </div>
              </div>
            </Tilt3D>
          </div>

          {/* Copy */}
          <div className="relative z-10 reveal-up lg:order-first">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2a1a4e] bg-[#7c3aed]/10 px-3 py-1 text-[11px] sm:text-xs text-[#a855f7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                Apps &amp; Tools · Web app
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                Live · agenthub.solutions
              </span>
            </div>
            <h1 className="text-[2.5rem] font-bold leading-[1.05] tracking-tight text-[#e2e8f0] sm:text-6xl lg:text-7xl">
              Agent
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: '1px #7c3aed',
                  textShadow: '0 0 30px rgba(124,58,237,0.6)',
                }}
              >
                Hub
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base italic leading-snug text-[#a855f7] sm:mt-5 sm:text-lg">
              One tab. Every tool. Powered by AI.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#94a3b8] sm:text-[15px] sm:mt-6">
              The call-centre productivity hub that collapses a dozen CRMs, portals, and
              knowledge bases into a single dashboard — organised the way agents actually
              work. The free core covers the whole shift; the paid AI Agent answers from
              company-approved sources only.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/dl flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#7c3aed] px-5 py-3 text-sm font-medium text-white shadow-[0_0_22px_rgba(124,58,237,0.35)] transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_32px_rgba(124,58,237,0.55)] sm:w-auto"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Launch AgentHub
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/70">
                  Free
                </span>
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#1e1a3a] bg-[#0f0f1e] px-5 py-3 text-sm font-medium text-[#cbd0e2] transition-all hover:border-[#7c3aed] hover:text-[#c084fc] sm:w-auto"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#475569]">
              Core suite is free forever · AI Agent unlocked per-deployment via SUK.{' '}
              <Link href="#pricing" className="text-[#7c3aed] hover:underline">
                See pricing →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ====================== 3D SHOWCASE STAGE ====================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 sm:pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
            Live surface
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <h2 className="text-3xl font-bold leading-[1.05] text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              See it,
              <span className="text-[#7c3aed]">{' '}in motion.</span>
            </h2>
            <p className="max-w-md text-sm text-[#94a3b8]">
              Real panels from the running app — the three-column tool hub, the AI Agent
              with source citations, the theme picker, the one-click boot-up.
              <span className="hidden sm:inline">{' '}Hover the canvas; it tilts with you.</span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-[1400px] px-2 sm:px-6">
          {/* Stage layout note: y values are tuned so every panel's caption
              has clearance from the panel below it. The AI Agent panel is
              taller than the original VoidSoul ProviderRotator it took the
              top-right slot from, so the right column gets a wider y gap
              (24 → 76) than the VoidSoul page did. */}
          <Stage3D
            height={940}
            panels={[
              {
                id: 'hub',
                x: 32,
                y: 36,
                width: 520,
                rotY: 10,
                rotX: -2,
                z: 60,
                delay: 0,
                caption: 'Tool hub',
                children: <ToolColumnsMock />,
              },
              {
                id: 'ai',
                x: 76,
                y: 24,
                width: 360,
                rotY: -12,
                rotX: 3,
                z: 0,
                delay: 1.5,
                caption: 'AI Agent · source-cited',
                children: <AgentChatMock />,
              },
              {
                id: 'theme',
                x: 78,
                y: 76,
                width: 320,
                rotY: -8,
                rotX: -4,
                z: 40,
                delay: 0.7,
                caption: '14 themes · live',
                children: <ThemeRotator />,
              },
              {
                id: 'boot',
                x: 28,
                y: 88,
                width: 420,
                rotY: 8,
                rotX: 4,
                z: -20,
                delay: 2.2,
                caption: 'Boot Up My Day',
                children: <BootUpMock />,
              },
            ]}
          />
        </div>
      </section>

      {/* ======================= WHY + POSSIBILITIES ======================= */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:gap-14 lg:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              Why it exists
            </p>
            <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              Call-centre tab fatigue,
              <br />
              <span className="text-[#a855f7]">collapsed into one HUD.</span>
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#94a3b8] max-w-2xl sm:mt-7 sm:space-y-5 sm:text-[15px]">
              <p>
                Every shift, an agent juggles a CRM, a knowledge base, two scheduling tools,
                an internal portal, a couple of dashboards, and a chat client. Every tab switch
                is cognitive load. Every search is a context break. Every &quot;let me put you on
                hold&quot; is a tiny customer disappointment.
              </p>
              <p>
                AgentHub puts the entire shift in one place — organised by Start of Day,
                Main Day, End of Day. Boot the whole stack with one click. Hot-swap themes
                to match the client. Hand a share-code to a new starter and their workspace
                is identical to a veteran&apos;s within seconds.
              </p>
              <p className="text-[#e2e8f0] font-medium border-l-2 border-[#7c3aed] pl-4">
                And when an agent needs an answer mid-call, the AI pulls it straight from
                company-approved sources — never redirecting them to a website while a
                customer waits.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              What you can do
            </p>
            <h3 className="mb-5 text-xl font-semibold text-[#e2e8f0] sm:mb-6 sm:text-2xl">
              Real shift workflows, not chat-toy demos.
            </h3>
            <ul className="space-y-2.5">
              {POSSIBILITIES.map((line, i) => (
                <li
                  key={i}
                  className="possibility-row flex items-start gap-3 rounded-xl border border-[#1e1a3a]/60 bg-gradient-to-br from-[#0f0f1e]/80 to-transparent px-4 py-3 transition-all hover:translate-x-1 hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/5 reveal-stagger"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    ['--ml' as string]: i % 2 === 0 ? '0px' : '12px',
                  }}
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-[#7c3aed]/15 text-[#a855f7] text-[11px]">
                    ✦
                  </span>
                  <span
                    className="text-sm text-[#cbd0e2] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
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
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:pb-32">
          <div className="mb-8 max-w-2xl sm:mb-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              What&apos;s in the box
            </p>
            <h2 className="text-[1.75rem] font-bold text-[#e2e8f0] sm:text-4xl">
              Nine pillars.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#1e1a3a]/50 sm:rounded-3xl md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden bg-[#0a0a18] p-5 transition-all duration-300 hover:bg-[#0f0f1e] reveal-stagger sm:p-7"
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

      {/* ========================= AI FLOW ========================= */}
      <section
        id="how-ai-works"
        className="relative border-y border-[#1e1a3a]"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 60%), linear-gradient(to bottom, #06060f 0%, #0a0a12 100%)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
                How the AI Agent works
              </p>
              <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
                Six steps to grounded answers.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#94a3b8]">
              No vector DB. No fine-tune. Just sources you control, fetched at query time
              and discarded. Every answer cites its URL.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FLOW_STEPS.map((step) => (
              <div
                key={step.n}
                className="group relative overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e] p-5 transition-all hover:border-[#7c3aed]/60 hover:bg-[#0a0a18] sm:p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#7c3aed]/40 bg-[#7c3aed]/15 font-mono text-sm font-semibold text-[#a855f7]">
                    {step.n}
                  </span>
                  <p className="text-base font-semibold text-[#e2e8f0]">{step.title}</p>
                </div>
                <p
                  className="text-sm leading-relaxed text-[#94a3b8]"
                  dangerouslySetInnerHTML={{ __html: step.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== UI CLOSE-UPS ======================== */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="mb-8 flex flex-col gap-3 sm:mb-14 sm:grid sm:grid-cols-[auto_1fr] sm:items-end sm:gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
                Up close
              </p>
              <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
                The details
                <br />
                <span className="text-[#a855f7]">that earn the shift.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#94a3b8] sm:justify-self-end">
              Real UI surfaces from the running app — each one tilts as you scroll.
            </p>
          </div>

          <div className="grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-12">
            <Tilt3D strength={8} className="h-full lg:col-span-7 lg:translate-y-4">
              <CloseUpPanel
                tag="Tool hub"
                title="Three columns. Every tool."
                caption="Drag, rename, reorder. Favicons auto-fetched. The agent's whole shift, mapped."
              >
                <div className="flex items-center justify-center px-6 py-8 sm:px-7 sm:py-10">
                  <ToolColumnsMock />
                </div>
              </CloseUpPanel>
            </Tilt3D>

            <Tilt3D strength={8} className="h-full lg:col-span-5">
              <CloseUpPanel
                tag="Boot up"
                title="One button. Every tab."
                caption="Opens every SOD + MD tool simultaneously. Skips EOD so morning boot doesn't flood the browser."
              >
                <div className="flex items-center justify-center px-6 py-10 sm:px-7 sm:py-12">
                  <BootUpMock />
                </div>
              </CloseUpPanel>
            </Tilt3D>

            <Tilt3D strength={8} className="h-full lg:col-span-5 lg:-translate-y-4">
              <CloseUpPanel
                tag="AI Agent"
                title="Answers from your sources only."
                caption="Floating Claude chat. Add company URLs as sources — answers come from that content, cited at the end."
              >
                <div className="flex items-center justify-center px-6 py-10 sm:px-7 sm:py-12">
                  <AgentChatMock />
                </div>
              </CloseUpPanel>
            </Tilt3D>

            <Tilt3D strength={8} className="h-full lg:col-span-7">
              <CloseUpPanel
                tag="Themes"
                title="Brand-match per client."
                caption="14 palettes ship with the app. Cyan for Concentrix, purple for in-house, anything in between."
              >
                <div className="flex items-center justify-center px-6 py-10 sm:px-7 sm:py-12">
                  <ThemeRotator />
                </div>
              </CloseUpPanel>
            </Tilt3D>
          </div>
        </div>
      </section>

      {/* ======================= SCREENSHOTS ======================= */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
                Real deployments
              </p>
              <h2 className="text-[1.75rem] font-bold text-[#e2e8f0] sm:text-4xl lg:text-5xl">
                Same hub, every shift.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#94a3b8]">
              Four screenshots from the actual app — empty, dev workflow, creator workflow,
              and annotated. Click any to view full size.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {SCREENSHOTS.map((shot, i) => (
              <Tilt3D key={shot.src} strength={6} liftZ={12}>
                <div
                  className="group relative overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#0a0a20] shadow-2xl shadow-[#7c3aed]/20 transition-all hover:border-[#7c3aed]/60"
                  style={{
                    backgroundImage:
                      'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.12) 0%, transparent 50%)',
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={shot.src}
                      alt={shot.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <span className="absolute top-3 left-3 rounded-full border border-[#7c3aed]/40 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-[#a855f7] backdrop-blur-sm">
                      {shot.tag}
                    </span>
                  </div>
                  <div className="border-t border-[#1e1a3a] bg-black/40 p-4 sm:p-5">
                    <p className="text-base font-semibold text-[#e2e8f0]">{shot.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#94a3b8]">{shot.caption}</p>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= SECURITY / IT ======================= */}
      <section
        id="security"
        className="relative border-y border-[#1e1a3a] bg-[#06060f]/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
                Hosting · security · IT
              </p>
              <h2 className="text-[1.75rem] font-bold leading-tight text-[#e2e8f0] sm:text-4xl lg:text-5xl">
                Nothing to
                <br />
                <span className="text-[#a855f7]">install or audit.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm text-[#94a3b8] leading-relaxed sm:mt-6 sm:text-base">
                Runs entirely in the browser. No servers to manage. No database. No logins.
                No analytics. No tracking. Vercel hosts the static app + serverless API;
                Anthropic powers the AI; Jina Reader briefly fetches URLs at query time.
              </p>

              <div className="mt-8 space-y-3">
                <SecurityRow
                  icon="🔐"
                  title="Keys live in Vercel env vars"
                  body="The Anthropic API key never reaches the browser. AI calls proxy through a serverless function — the only thing the client sees is the streamed answer."
                />
                <SecurityRow
                  icon="🚫"
                  title="No database, no logins"
                  body="Tools, notes, schedule, sources — all in the agent's own browser localStorage. Nothing stored server-side, nothing to leak."
                />
                <SecurityRow
                  icon="🎟️"
                  title="SUK-gated access"
                  body="System Unlock Key validated server-side on every AI request. Revoke from Vercel and access dies before the next refresh — no redeploy."
                />
                <SecurityRow
                  icon="🛰️"
                  title="No telemetry, no tracking"
                  body="No usage analytics, no crash reporters, no third-party SDKs. Anthropic does not use API data for training by default."
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed] mb-3">
                Permissions, by surface
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
                Full IT brief — hosting, dependencies, audit posture, and FAQ — lives in the{' '}
                <a
                  href={REPO_URL + '#hosting-security--it-overview'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a855f7] hover:underline"
                >
                  README&apos;s Hosting &amp; Security section
                </a>
                .
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
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7c3aed] sm:text-xs">
              Pricing
            </p>
            <h2 className="text-[1.75rem] font-bold text-[#e2e8f0] sm:text-4xl lg:text-5xl">
              Core free. AI by seat tier.
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-[#94a3b8] leading-relaxed sm:text-base">
              Full productivity suite is free forever. AI Agent is billed monthly per
              deployment based on how many users you&apos;re unlocking.
            </p>
          </div>

          {/* Free tier */}
          <div className="mx-auto mb-8 max-w-3xl">
            <Tilt3D strength={5} liftZ={10}>
              <div className="relative rounded-2xl border border-emerald-500/30 bg-[#0f0f1e] p-6 transition-colors hover:border-emerald-500/60 sm:rounded-3xl sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-xs uppercase tracking-widest text-[#64748b]">Free Forever</p>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-300">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                        Live · no signup
                      </span>
                    </div>
                    <p className="text-4xl font-bold text-[#e2e8f0]">$0</p>
                    <p className="mt-1 text-sm text-[#64748b]">
                      Full productivity suite. No accounts, no setup, no card.
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 gap-1.5 text-sm text-[#94a3b8] sm:grid-cols-2">
                    {[
                      'Custom tool hub · 3 columns',
                      'Boot Up My Day',
                      'Shift scheduler · notes',
                      'Share &amp; backup codes',
                      '14 colour themes',
                      'Guided tour',
                    ].map((l) => (
                      <li key={l} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span dangerouslySetInnerHTML={{ __html: l }} />
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-5 py-2.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/30 transition-all hover:bg-emerald-500/25 hover:ring-emerald-500/60"
                >
                  Launch the free hub ↗
                </a>
              </div>
            </Tilt3D>
          </div>

          {/* Paid AI Agent tiers */}
          <div>
            <div className="mb-5 flex flex-col gap-1 text-center sm:mb-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#a855f7] sm:text-xs">
                AI Agent · paid
              </p>
              <p className="text-lg font-semibold text-[#e2e8f0] sm:text-xl">
                Start solo, scale to call-centre teams.
              </p>
            </div>

            {/* Solo tier — slim banner above the team grid. Positioned as
                the "evaluate it" path so individual users have a way in
                without diluting the team-tier framing below. */}
            <div className="mb-6 sm:mb-7">
              <Tilt3D strength={4} liftZ={8}>
                <div className="group relative flex flex-col items-stretch gap-4 overflow-hidden rounded-2xl border border-[#1e1a3a] bg-[#0f0f1e] p-5 transition-colors hover:border-[#7c3aed]/60 sm:flex-row sm:items-center sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(ellipse at left, rgba(124,58,237,0.12), transparent 60%)',
                    }}
                  />
                  <div className="relative flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#a855f7]">
                      Solo Evaluators
                    </span>
                    <span className="text-2xl font-bold text-[#e2e8f0] sm:text-3xl">
                      $10
                      <span className="ml-1 text-sm font-normal text-[#64748b]">/mo</span>
                    </span>
                    <span className="rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#a855f7]">
                      1 user
                    </span>
                  </div>
                  <p className="relative max-w-md text-sm leading-relaxed text-[#94a3b8] sm:text-[13px]">
                    Trying it out before pitching to your team? Single seat with the full AI Agent —
                    upgrade to a team tier any time.
                  </p>
                  <div className="relative flex-none">
                    <SubscribeButton
                      url={SQUARE_CHECKOUT_URLS.solo}
                      featured={false}
                      compact
                    />
                  </div>
                </div>
              </Tilt3D>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PRICING_TIERS.map((tier, i) => (
                <Tilt3D key={tier.name} strength={6} liftZ={14}>
                  <div
                    className={`relative h-full rounded-2xl border p-5 transition-colors sm:p-6 ${
                      i === 1
                        ? 'border-[#7c3aed] bg-gradient-to-b from-[#1a0a3a]/40 to-[#0f0f1e] shadow-2xl shadow-[#7c3aed]/30'
                        : 'border-[#1e1a3a] bg-[#0f0f1e] hover:border-[#7c3aed]/60'
                    }`}
                  >
                    {i === 1 && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#7c3aed] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                        Most popular
                      </span>
                    )}
                    <p className="text-xs uppercase tracking-widest text-[#a855f7] mb-2">
                      {tier.name}
                    </p>
                    <p className="text-2xl font-bold text-[#e2e8f0] sm:text-3xl">
                      {tier.price}
                      <span className="ml-1 text-sm font-normal text-[#64748b]">{tier.subtle}</span>
                    </p>
                    <p className="mt-1 text-sm text-[#94a3b8]">{tier.users}</p>
                    <ul className="mt-4 space-y-1.5 text-[12px] text-[#cbd0e2]">
                      {[
                        'AI Agent panel · Claude',
                        'Source URLs · whole-site search',
                        'Bookmarklet + PDF capture',
                        'SUK access control',
                      ].map((l) => (
                        <li key={l} className="flex items-start gap-2">
                          <span className="text-[#a855f7] mt-0.5">✦</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                    <SubscribeButton
                      url={SQUARE_CHECKOUT_URLS[tier.id]}
                      featured={i === 1}
                    />
                  </div>
                </Tilt3D>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-[#475569]">
              All prices indicative · per deployment, per month. Custom enterprise
              agreements and volume discounts available.{' '}
              <a
                href={REPO_URL + '#pricing'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a855f7] hover:underline"
              >
                Full pricing →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ============================ FINAL CTA ============================ */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
          <AgentHubMark size={140} className="mx-auto mb-5 sm:mb-6" />
          <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-5xl">
            One tab. Every tool.
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-sm text-[#94a3b8] sm:text-base">
            Free forever for the core hub. AI Agent unlocked per deployment. No accounts,
            no setup, no servers. Just open the URL and go.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs rounded-lg bg-[#7c3aed] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#6d28d9] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] sm:w-auto"
            >
              Launch AgentHub ↗
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs rounded-lg border border-[#1e1a3a] px-6 py-3 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#7c3aed] hover:text-[#e2e8f0] sm:w-auto"
            >
              View on GitHub
            </a>
            <Link
              href="/"
              className="w-full max-w-xs rounded-lg border border-[#1e1a3a] px-6 py-3 text-sm font-medium text-[#94a3b8] transition-all hover:border-[#7c3aed] hover:text-[#e2e8f0] sm:w-auto"
            >
              Back to the Library
            </Link>
          </div>
        </div>
      </section>

      {/* In-page CSS for reveals — respects prefers-reduced-motion */}
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(28px); }
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
        @media (prefers-reduced-motion: reduce) {
          .reveal-up,
          .reveal-up-delay,
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

/**
 * Pricing-tier CTA. When `url` is a non-empty string the button is a live
 * link to the Square Checkout Link (opens in a new tab, noreferrer). When
 * `url` is empty the button renders as a non-interactive "Set up in Square"
 * placeholder — that way a half-configured tier can't accidentally ship a
 * dead button to production. The featured (highlighted) tier gets a solid
 * purple fill; the rest get an outlined treatment that matches the card.
 *
 * `compact` switches the default full-width / top-margined layout (sized
 * for a vertical tier card) to an inline auto-width button — used by the
 * Solo banner where the button sits in a horizontal row alongside copy.
 */
function SubscribeButton({
  url,
  featured,
  compact = false,
}: {
  url: string;
  featured: boolean;
  compact?: boolean;
}) {
  const live = url.length > 0;
  const layout = compact
    ? 'flex w-full items-center justify-center gap-2 sm:w-auto sm:min-w-[160px]'
    : 'mt-5 flex w-full items-center justify-center gap-2';
  const base = `${layout} rounded-lg px-4 py-2.5 text-sm font-medium transition-all`;

  if (!live) {
    return (
      <button
        type="button"
        disabled
        title="Add the Square Checkout Link URL in SQUARE_CHECKOUT_URLS to activate this button."
        className={`${base} cursor-not-allowed border border-dashed border-[#1e1a3a] bg-black/30 text-[#475569]`}
      >
        Set up in Square
      </button>
    );
  }

  const styled = featured
    ? 'bg-[#7c3aed] text-white shadow-[0_0_22px_rgba(124,58,237,0.4)] hover:bg-[#6d28d9] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)]'
    : 'border border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#c084fc] hover:border-[#7c3aed] hover:bg-[#7c3aed]/20 hover:text-white';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styled}`}
    >
      Subscribe
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
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
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#1e1a3a] bg-[#0f0f1e] transition-all duration-500 hover:border-[#7c3aed]/60 hover:shadow-[0_0_32px_rgba(124,58,237,0.18)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top, rgba(124,58,237,0.12), transparent 60%)',
        }}
      />
      <div className="relative flex flex-1 flex-col">
        <div className="px-7 pb-2 pt-7 sm:px-8 sm:pb-3 sm:pt-8">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-[#7c3aed]">
            {tag}
          </p>
          <h3 className="text-xl font-semibold leading-snug text-[#e2e8f0]">{title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#64748b]">{caption}</p>
        </div>
        <div className="mt-6 flex-1 border-t border-[#1e1a3a] bg-[#0a0a18]/60 sm:mt-8">
          {children}
        </div>
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
