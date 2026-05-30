import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24">
      {/* Top glow line — mirrors header bottom line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#7c3aed]/40 to-transparent" />

      <div className="bg-[#0b0b16]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

            {/* Brand */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <Image
                  src="/Logo.png"
                  alt="Void Soul Studio"
                  width={64}
                  height={64}
                  className="brand-glow-strong h-12 w-12 flex-none transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                />
                <div className="leading-none">
                  <p className="brand-text-glow text-[15px] font-bold tracking-widest text-[#e2e8f0] uppercase group-hover:text-[#c084fc] transition-colors">
                    Void Soul
                  </p>
                  <p className="text-[10px] tracking-[0.28em] text-[#a855f7] uppercase mt-1">
                    Studio
                  </p>
                </div>
              </Link>
              <p className="text-xs text-[#334155] leading-relaxed max-w-[220px]">
                Crafting atmospheric games that live in the space between worlds.
              </p>
            </div>

            {/* Library links */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#475569] mb-1">
                Library
              </p>
              <Link href="/#games" className="text-sm text-[#475569] hover:text-[#a855f7] transition-colors w-fit">
                All Games
              </Link>
              <Link href="/games/spiritless" className="text-sm text-[#475569] hover:text-[#a855f7] transition-colors w-fit">
                Project Spiritless
              </Link>
              <Link href="/#about" className="text-sm text-[#475569] hover:text-[#a855f7] transition-colors w-fit">
                About
              </Link>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#475569] mb-1">
                Connect
              </p>
              <a
                href="https://discord.gg/Tn78RHqT4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#a855f7] transition-colors w-fit"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="flex-none">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
                Discord — Community
              </a>
              <a
                href="https://www.youtube.com/@voidsoul_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#a855f7] transition-colors w-fit"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="flex-none">
                  <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.1 2.8 12 2.8 12 2.8s-4.1 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.8 12 21.8s4.1 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
                </svg>
                YouTube — Devlog
              </a>
              <a
                href="https://github.com/Dev-Kyron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#a855f7] transition-colors w-fit"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="flex-none">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#15152a] mx-4 sm:mx-6">
          <div className="mx-auto max-w-7xl py-5 flex flex-col items-center justify-between gap-3 text-xs text-[#334155] md:flex-row">
            <p>© {new Date().getFullYear()} Void Soul Studio. All rights reserved.</p>
            <p>Built in Australia.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
