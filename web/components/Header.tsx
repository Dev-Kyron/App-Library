'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/#games', label: 'Games' },
  { href: '/#about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#06060f]/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            <div className="relative flex-none">
              <div className="absolute inset-0 rounded-xl bg-[#7c3aed]/0 blur-md transition-all group-hover:bg-[#7c3aed]/30" />
              <Image
                src="/SqaureLogo.png"
                alt="Void Soul Studio"
                width={34}
                height={34}
                className="relative rounded-lg"
              />
            </div>
            <span className="text-sm font-semibold tracking-wide text-[#e2e8f0] transition-colors group-hover:text-[#c084fc]">
              Void Soul Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all
                  ${pathname !== '/' && label === 'Games' ? 'text-[#e2e8f0]' : 'text-[#94a3b8]'}
                  hover:text-[#e2e8f0] hover:bg-white/5`}
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div className="mx-2 h-4 w-px bg-[#1e1a3a]" />

            {/* Devlog CTA */}
            <a
              href="https://www.youtube.com/@voidsoul_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[#2a1a4e] bg-[#7c3aed]/10 px-4 py-2 text-sm font-medium text-[#a855f7] transition-all hover:bg-[#7c3aed]/20 hover:border-[#7c3aed]/60 hover:text-[#c084fc] hover:shadow-[0_0_16px_rgba(124,58,237,0.2)]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.1 2.8 12 2.8 12 2.8s-4.1 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.8 12 21.8s4.1 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
              </svg>
              Devlog
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-[#64748b] transition-all hover:bg-white/5 hover:text-[#a855f7]"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Bottom glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#7c3aed]/35 to-transparent" />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-b border-[#1e1a3a] bg-[#06060f]/98 backdrop-blur-lg px-6 py-4 flex flex-col gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#94a3b8] transition-all hover:bg-white/5 hover:text-[#e2e8f0]"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-[#1e1a3a]">
            <a
              href="https://www.youtube.com/@voidsoul_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-[#a855f7] transition-all hover:bg-[#7c3aed]/10"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.1 2.8 12 2.8 12 2.8s-4.1 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.8 12 21.8s4.1 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
              </svg>
              Watch Devlog ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
