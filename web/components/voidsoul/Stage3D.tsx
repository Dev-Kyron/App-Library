'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * 3D perspective stage that holds floating "windows" at different depths
 * and rotations. The whole stage parallax-tilts with the mouse, and each
 * floating panel breathes slowly so the scene never feels static.
 *
 * Panels are absolutely positioned inside the stage. The container picks
 * a tall enough min-height for mobile and scales down on smaller screens.
 */

interface FloatingPanel {
  id: string;
  caption?: string;
  /** % values, relative to the stage. */
  x: number;
  y: number;
  width: number; // px max
  /** Tilt in degrees — rotateY (yaw), rotateX (pitch). */
  rotY: number;
  rotX: number;
  /** Negative depth pushes the panel further away (smaller); positive nearer. */
  z: number;
  /** 0–N — staggers the breathing animation start. */
  delay?: number;
  children: ReactNode;
}

interface Stage3DProps {
  panels: FloatingPanel[];
  /** Total stage height in px on desktop. Scales down via CSS. */
  height?: number;
}

export default function Stage3D({ panels, height = 720 }: Stage3DProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  // Disable mouse-parallax on touch / coarse-pointer devices — feels janky
  // when the user is scrolling rather than hovering.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabled || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Normalise to roughly [-1, 1], then scale down so the parallax is
    // a hint not a swing.
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: ny * -4, y: nx * 6 });
  }

  function onMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={stageRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full overflow-hidden"
      style={{
        perspective: '2400px',
        perspectiveOrigin: '50% 40%',
        height,
        minHeight: 520,
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

      {/* The 3D scene */}
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
      `}</style>
    </div>
  );
}
