'use client';
import { useRef, useState, useEffect } from 'react';

export default function GamePlayer({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFS, setIsFS] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFS(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  const toggleFS = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      // No orientation lock — games are portrait or landscape, let them decide
      (el.requestFullscreen?.() ?? (el as any).webkitRequestFullscreen?.())?.catch(() => {});
    } else {
      (document.exitFullscreen?.() ?? (document as any).webkitExitFullscreen?.());
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Player */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl border border-[#1e1a3a] bg-[#0a0818] select-none"
        style={{ aspectRatio: '16/9', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties}
      >
        <iframe
          src={url}
          title={title}
          className="w-full h-full"
          allow="autoplay; fullscreen; accelerometer; gyroscope"
          style={{
            border: 'none',
            display: 'block',
            // Prevent iOS long-press selection highlight on the iframe
            WebkitUserSelect: 'none',
            userSelect: 'none',
            WebkitTouchCallout: 'none',
          } as React.CSSProperties}
        />

        {/* Fullscreen button — larger hit target on mobile */}
        <button
          onClick={toggleFS}
          title={isFS ? 'Exit Fullscreen' : 'Fullscreen'}
          className="absolute bottom-3 left-3 flex items-center justify-center rounded-lg transition-all active:scale-95"
          style={{
            width: 48, height: 48,
            background: 'rgba(10,8,24,0.78)',
            border: '1px solid rgba(124,58,237,0.45)',
            color: '#c084fc',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.22)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,8,24,0.78)')}
        >
          {isFS ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 2v5H2M11 2v5h5M2 11h5v5M11 13v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Hint + new tab link */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#334155]">Tap fullscreen for the best experience on mobile.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#475569] hover:text-[#a855f7] transition-colors"
        >
          Open in new tab ↗
        </a>
      </div>
    </div>
  );
}
