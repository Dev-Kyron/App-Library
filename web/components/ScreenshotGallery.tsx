'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function ScreenshotGallery({ shots, title }: { shots: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number>(0);

  const prev = useCallback(() => setActive(i => (i - 1 + shots.length) % shots.length), [shots.length]);
  const next = useCallback(() => setActive(i => (i + 1) % shots.length), [shots.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  };

  return (
    <div className="mb-6">
      {/* Main image */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-[#1e1a3a] bg-[#0a0a20]"
        style={{ aspectRatio: '16/9' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={active}
          src={shots[active]}
          alt={`${title} screenshot ${active + 1}`}
          fill
          className="object-cover"
          priority={active === 0}
        />

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-[#2a1a4e] bg-[#0a0a12]/80 text-[#a855f7] backdrop-blur-sm transition-all hover:bg-[#7c3aed]/30 hover:border-[#7c3aed] active:scale-95"
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-[#2a1a4e] bg-[#0a0a12]/80 text-[#a855f7] backdrop-blur-sm transition-all hover:bg-[#7c3aed]/30 hover:border-[#7c3aed] active:scale-95"
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Counter */}
        <span className="absolute bottom-3 right-3 rounded-full bg-[#0a0a12]/80 px-2.5 py-1 text-xs text-[#64748b] backdrop-blur-sm">
          {active + 1} / {shots.length}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {shots.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative flex-none overflow-hidden rounded-lg border transition-all active:scale-95 ${
              i === active
                ? 'border-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.4)]'
                : 'border-[#1e1a3a] opacity-50 hover:opacity-80 hover:border-[#2a1a4e]'
            }`}
            style={{ width: 96, height: 60 }}
          >
            <Image src={src} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
