'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Wrapper that gives its child a 3D perspective tilt. Three behaviours:
 *
 *  - **Desktop (fine pointer)** — mouse-tracked tilt, strong; the card
 *    feels like a magnetised pane of glass under your cursor.
 *  - **Mobile / touch (coarse pointer)** — a gentle scroll-tilt: the
 *    further the card's centre is from the viewport centre, the more it
 *    rotates. Gives phones the same "alive" 3D feel without needing
 *    hover, and (unlike DeviceOrientation) requires no permission.
 *  - **`prefers-reduced-motion`** — flat render, no transforms.
 *
 * Children render inside a `perspective: 1200px` parent so transforms
 * read as real depth, not skew.
 */

interface Tilt3DProps {
  children: ReactNode;
  /** Max degrees the card rotates on each axis (desktop hover). */
  strength?: number;
  /** Max degrees applied via scroll tilt on coarse-pointer devices. */
  scrollStrength?: number;
  /** Pop the card toward the camera while hovered (px on Z). */
  liftZ?: number;
  /** Pass-through class for the wrapper. */
  className?: string;
}

type Mode = 'static' | 'hover' | 'scroll';

export default function Tilt3D({
  children,
  strength = 8,
  scrollStrength = 4,
  liftZ = 18,
  className = '',
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>('static');
  const [tilt, setTilt] = useState({ x: 0, y: 0, z: 0 });

  // Decide which interaction model applies to the current device.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compute = () => {
      if (rm.matches) return 'static' as const;
      if (fine.matches) return 'hover' as const;
      return 'scroll' as const;
    };
    setMode(compute());
    const update = () => setMode(compute());
    fine.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      rm.removeEventListener('change', update);
    };
  }, []);

  // Scroll-tilt — runs only in `scroll` mode (coarse pointer + motion allowed).
  // The card's rotation tracks where its centre sits relative to the viewport
  // centre. As you scroll past, the card pitches forward then settles flat,
  // then pitches back — feels like the screen has parallax depth.
  useEffect(() => {
    if (mode !== 'scroll' || !ref.current) return;
    let raf = 0;
    const el = ref.current;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      // -1 (above) → 0 (centred) → +1 (below).
      const centreOffset = (rect.top + rect.height / 2 - viewportH / 2) / (viewportH / 2);
      const clamped = Math.max(-1, Math.min(1, centreOffset));
      setTilt({ x: clamped * -scrollStrength, y: clamped * (scrollStrength * 0.4), z: 0 });
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };
    tick(); // initial pose
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [mode, scrollStrength]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (mode !== 'hover' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: ny * -strength, y: nx * strength, z: liftZ });
  }

  function onMouseLeave() {
    if (mode !== 'hover') return;
    setTilt({ x: 0, y: 0, z: 0 });
  }

  // Static mode (reduced motion) — render flat, no perspective container.
  if (mode === 'static') {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ perspective: '1200px' }}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${tilt.z}px)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
