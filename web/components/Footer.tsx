import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1a3a] bg-[#0a0a12] mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/SqaureLogo.png"
              alt="Void Soul Studio"
              width={36}
              height={36}
              className="rounded-lg opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div>
              <p className="text-sm font-semibold text-[#e2e8f0]">Void Soul Studio</p>
              <p className="text-xs text-[#475569]">Crafting worlds beyond the void</p>
            </div>
          </Link>

          <div className="flex items-center gap-6 text-xs text-[#475569]">
            <Link href="/" className="hover:text-[#a855f7] transition-colors">Games</Link>
            <Link href="#about" className="hover:text-[#a855f7] transition-colors">About</Link>
            <a href="https://www.youtube.com/@voidsoul_studio" target="_blank" rel="noopener noreferrer" className="hover:text-[#a855f7] transition-colors">
              YouTube
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1e1a3a] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#334155]">
          <p>© {new Date().getFullYear()} Void Soul Studio. All rights reserved.</p>
          <p>Made with passion and purple pixels.</p>
        </div>
      </div>
    </footer>
  );
}
