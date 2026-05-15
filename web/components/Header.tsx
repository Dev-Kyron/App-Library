'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1a3a] bg-[#0a0a12]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/SqaureLogo.png"
            alt="Void Soul Studio"
            width={40}
            height={40}
            className="rounded-lg transition-opacity group-hover:opacity-80"
          />
          <span className="text-lg font-semibold tracking-wide text-[#e2e8f0] group-hover:text-[#a855f7] transition-colors">
            Void Soul Studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#94a3b8] hover:text-[#a855f7] transition-colors text-sm tracking-wide">
            Games
          </Link>
          <Link href="#about" className="text-[#94a3b8] hover:text-[#a855f7] transition-colors text-sm tracking-wide">
            About
          </Link>
          <a
            href="https://www.youtube.com/@voidsoul_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#a855f7] transition-colors text-sm tracking-wide"
          >
            Devlog
          </a>
        </nav>

        <button
          className="md:hidden text-[#94a3b8] hover:text-[#a855f7] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1a3a] bg-[#0a0a12] px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-[#94a3b8] hover:text-[#a855f7] transition-colors text-sm" onClick={() => setMenuOpen(false)}>
            Games
          </Link>
          <Link href="#about" className="text-[#94a3b8] hover:text-[#a855f7] transition-colors text-sm" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <a href="https://www.youtube.com/@voidsoul_studio" target="_blank" rel="noopener noreferrer" className="text-[#94a3b8] hover:text-[#a855f7] transition-colors text-sm">
            Devlog
          </a>
        </div>
      )}
    </header>
  );
}
