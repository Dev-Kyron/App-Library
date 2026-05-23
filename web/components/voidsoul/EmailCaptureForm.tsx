'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { FORMS, isFormReady } from '@/lib/forms';

type Status = 'idle' | 'expanded' | 'submitting' | 'success' | 'error';

/**
 * Inline-expanding email-capture button. Used by:
 *   - Earliest-Adopters tier (source = first-3)
 *   - Founder's tier once First-3 fills (source = founders-notify)
 *
 *   idle      → green "Get on the list →" button (configurable CTA)
 *   expanded  → email input + submit, button collapses on outside click
 *   submitting→ spinner state
 *   success   → "✓ You're on the list" message with deletion reassurance
 *   error     → retry with a helpful fallback path
 *
 * Falls back to a "DM the devlog" link if the Formspree URL hasn't
 * been pasted into lib/forms.ts yet.
 */
interface Props {
  /** Tag attached to the submission so you can filter in Formspree. */
  source?: string;
  /** Idle-state button label. */
  cta?: string;
}

export default function EmailCaptureForm({
  source = 'voidsoul-ai-companion/first-3',
  cta = 'Get on the list →',
}: Props = {}) {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const endpoint = FORMS.earliestAdoptersEndpoint;
  const ready = isFormReady(endpoint);

  // Focus the input the moment we expand. Smooth UX: click → type.
  useEffect(() => {
    if (status === 'expanded') inputRef.current?.focus();
  }, [status]);

  // Click outside closes the expanded state (unless we've already submitted).
  useEffect(() => {
    if (status !== 'expanded') return;
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setStatus('idle');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes('@') || !ready) return;
    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  // Form not configured yet — quietly point at the YouTube fallback.
  if (!ready) {
    return (
      <a
        href="https://www.youtube.com/@voidsoul_studio"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-[#052e16] transition-all hover:opacity-95 hover:shadow-[0_0_28px_rgba(52,211,153,0.55)]"
      >
        DM the devlog to claim a spot ↗
      </a>
    );
  }

  if (status === 'success') {
    return (
      <div className="mt-8 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-emerald-300">
          ✓ You&apos;re on the list
        </p>
        <p className="mt-1 text-xs leading-relaxed text-emerald-200/80">
          One email when v1.0 ships, then your address is deleted.
        </p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="mt-8">
      {status === 'idle' && (
        <button
          onClick={() => setStatus('expanded')}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-[#052e16] transition-all hover:opacity-95 hover:shadow-[0_0_28px_rgba(52,211,153,0.55)]"
        >
          {cta}
        </button>
      )}

      {(status === 'expanded' || status === 'submitting' || status === 'error') && (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@somewhere"
              autoComplete="email"
              disabled={status === 'submitting'}
              className="flex-1 rounded-lg border border-emerald-400/40 bg-black/40 px-3 py-2.5 text-sm text-[#e2e8f0] outline-none transition-colors placeholder:text-[#475569] focus:border-emerald-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'submitting' || !email.includes('@')}
              className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#052e16] transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'submitting' ? '…' : 'Join'}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-[11px] text-rose-400">
              Couldn&apos;t reach the list. Try again, or{' '}
              <a
                href="https://www.youtube.com/@voidsoul_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                DM the devlog
              </a>
              .
            </p>
          )}
          {status !== 'error' && (
            <p className="text-[11px] text-emerald-200/60">
              One email at launch, then deleted. No newsletters.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
