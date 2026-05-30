'use client';

import { useEffect, useState } from 'react';
import {
  DOWNLOAD_CONFIG,
  PLATFORM_LABEL,
  detectPlatform,
  getDownloadUrl,
  type Platform,
} from '@/lib/downloads';

/**
 * Free-tier CTA — auto-detects the visitor's OS and serves the matching
 * Electron build straight from GitHub Releases. Falls back to the
 * releases page if the UA is unrecognised or hydration hasn't run.
 *
 * While `DOWNLOAD_CONFIG.enabled` is false, renders the same disabled
 * "Free when downloads open" placeholder so the layout doesn't shift
 * the moment builds go live.
 */
export default function SmartDownloadButton() {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  if (!DOWNLOAD_CONFIG.enabled) {
    return (
      <button
        disabled
        className="mt-8 w-full cursor-not-allowed rounded-lg border border-[#2a2550] bg-black/40 py-3 text-sm font-medium text-[#64748b]"
      >
        Free when downloads open
      </button>
    );
  }

  // SSR / unknown UA — link to the releases page so the visitor picks.
  if (!platform) {
    return (
      <a
        href={DOWNLOAD_CONFIG.releasesPage}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500/90 py-3 text-sm font-semibold text-[#052e16] transition-all hover:bg-emerald-500 hover:shadow-[0_0_28px_rgba(52,211,153,0.5)]"
      >
        <DownloadIcon />
        Download free
      </a>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <a
        href={getDownloadUrl(platform)}
        download
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-[#052e16] transition-all hover:opacity-95 hover:shadow-[0_0_28px_rgba(52,211,153,0.55)]"
      >
        <DownloadIcon />
        Download free for {PLATFORM_LABEL[platform]}
      </a>
      <a
        href={DOWNLOAD_CONFIG.releasesPage}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] text-[#475569] transition-colors hover:text-emerald-300"
      >
        Not your OS? See all builds ↗
      </a>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
