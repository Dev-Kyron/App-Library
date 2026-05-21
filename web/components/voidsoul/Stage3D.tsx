'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * 3D perspective stage that holds floating "windows" at different depths
 * and rotations. Two render modes:
 *
 *  - **Desktop (≥ 1024px)** — panels are absolutely positioned at their
 *    chosen `x` / `y` percentage with `rotateX` / `rotateY` / `translateZ`
 *    applied. The whole stage parallax-tilts with the mouse. Each panel
 *    breathes on its own staggered loop.
 *  - **Mobile / tablet (< 1024px)** — falls back to a clean vertical stack
 *    with each panel slightly tilted, no parallax. The 3D effect needs
 *    horizontal room to work; on narrow viewports it just produces
 *    overlapping clipped cards, so we don't try.
 *
 * The container uses `overflow-visible` so panel captions sitting just
 * below the panel never get clipped at the stage edge.
 */

interface FloatingPanel {
  id: string;
  caption?: string;
  /** % values, relative to the stage. Desktop-only. */
  x: number;
  y: number;
  width: number;
  /** Tilt in degrees — rotateY (yaw), rotateX (pitch). Desktop-only. */
  rotY: number;
  rotX: number;
  /** Z depth — negative pushes away, positive pulls forward. Desktop-only. */
  z: number;
  /** Staggers the breathing animation start. */
  delay?: number;
  children: ReactNode;
}

interface Stage3DProps {
  panels: FloatingPanel[];
  /** Stage height in px on desktop. The mobile stack ignores this. */
  height?: number;
}

export default function Stage3D({ panels, height = 860 }: Stage3DProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  // Render mode + parallax both depend on the viewport — start in a safe
  // state, then upgrade on mount once we know the actual width.
  const [isDesktop, setIsDesktop] = useState(false);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const desktopMq = window.matchMedia('(min-width: 1024px)');
    const finePointerMq = window.matchMedia('(pointer: fine)');
    const update = () => {
      setIsDesktop(desktopMq.matches);
      setParallaxEnabled(desktopMq.matches && finePointerMq.matches);
    };
    update();
    desktopMq.addEventListener('change', update);
    finePointerMq.addEventListener('change', update);
    return () => {
      desktopMq.removeEventListener('change', update);
      finePointerMq.removeEventListener('change', update);
    };
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!parallaxEnabled || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: ny * -4, y: nx * 6 });
  }

  function onMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  /* ---------------------------- mobile stack ---------------------------- */

  if (!isDesktop) {
    return (
      <div className="relative w-full">
        {/* Ambient bloom backdrop — same vibe as the 3D mode */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 30% at 50% 20%, rgba(124,58,237,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 30% at 50% 80%, rgba(168,85,247,0.14) 0%, transparent 70%)',
          }}
        />
        <div className="relative flex flex-col items-center gap-10 px-4 py-10">
          {panels.map((panel, i) => (
            <div
              key={panel.id}
              className="flex w-full flex-col items-center panel-float-soft"
              style={{
                animationDelay: `${(panel.delay ?? 0) * 0.4}s`,
                maxWidth: 'min(94vw, 480px)',
              }}
            >
              <div
                className="relative rounded-2xl shadow-2xl"
                style={{
                  boxShadow:
                    '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 30px rgba(124,58,237,0.18)',
                  // Subtle tilt only — full 3D rotations look bad on
                  // narrow viewports where the panel is most of the width.
                  transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.6}deg)`,
                }}
              >
                {panel.children}
              </div>
              {panel.caption && (
                <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-[#7c3aed]">
                  {panel.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes panelFloatSoft {
            0%, 100% { translate: 0 0; }
            50% { translate: 0 -4px; }
          }
          .panel-float-soft {
            animation: panelFloatSoft 8s ease-in-out infinite;
            will-change: translate;
          }
          @media (prefers-reduced-motion: reduce) {
            .panel-float-soft { animation: none; }
          }
        `}</style>
      </div>
    );
  }

  /* ---------------------------- desktop 3D ---------------------------- */

  return (
    <div
      ref={stageRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full"
      style={{
        // overflow-visible so panel captions hanging just below each panel
        // never get clipped by the stage's bottom edge.
        perspective: '2400px',
        perspectiveOrigin: '50% 40%',
        height,
        minHeight: 600,
      }}
    >
      {/* Ambient bloom behind the panels */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,58,237,0.22) 0%, transparent 60%), radial-gradient(ellipse 25% 30% at 20% 30%, rgba(168,85,247,0.18) 0%, transparent 70%), radial-gradient(ellipse 25% 30% at 80% 70%, rgba(168,85,247,0.14) 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {panels.map((panel) => (
          <div
            key={panel.id}
            className="absolute panel-float"
            style={{
              left: `${panel.x}%`,
              top: `${panel.y}%`,
              width: panel.width,
              maxWidth: '90%',
              transform: `translate(-50%, -50%) translateZ(${panel.z}px) rotateY(${panel.rotY}deg) rotateX(${panel.rotX}deg)`,
              transformStyle: 'preserve-3d',
              animationDelay: `${panel.delay ?? 0}s`,
            }}
          >
            <div
              className="relative rounded-2xl shadow-2xl"
              style={{
                boxShadow:
                  '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 30px rgba(124,58,237,0.18)',
              }}
            >
              {panel.children}
            </div>
            {panel.caption && (
              <p
                className="mt-3 text-center text-[11px] uppercase tracking-widest text-[#7c3aed]"
                style={{ transform: 'translateZ(0)' }}
              >
                {panel.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes panelFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }
        .panel-float {
          animation: panelFloat 7s ease-in-out infinite;
          will-change: transform, translate;
        }
        @media (prefers-reduced-motion: reduce) {
          .panel-float { animation: none; }
        }
      `}</style>
    </div>
  );
}
