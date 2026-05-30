'use client';

/**
 * Replica of the in-app daily-spend bar chart. Bars are hand-tuned to look
 * realistic (one peak day, a few quiet ones), with the budget bar at 67%.
 * Pure SVG so it scales with the card.
 */

const DAYS = [
  0.4, 0.1, 0, 1.2, 0.3, 0.05, 0,
  2.1, 0.7, 0.4, 0.6, 1.8, 0.2, 0.1,
  3.4, 0.9, 0.5, 1.1, 0.4, 0.3, 0,
  1.6, 0.8, 0.6, 0.4, 0.3, 0.2, 0.1,
  0.05, 0,
];

export default function CostChartMock({ className = '' }: { className?: string }) {
  const max = Math.max(...DAYS);
  const total = DAYS.reduce((a, b) => a + b, 0);
  const budget = 24;
  const pct = Math.min(100, (total / budget) * 100);

  return (
    <div
      className={`w-full max-w-[360px] rounded-2xl border border-[#2a2550] bg-[#15152a] p-4 shadow-xl shadow-[#7c3aed]/10 ${className}`}
    >
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#475569]">
            May 2026
          </p>
          <p className="mt-0.5 text-[22px] font-bold text-[#e2e8f0] tabular-nums leading-none">
            ${total.toFixed(2)}
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400">
          {Math.round(pct)}% of budget
        </span>
      </div>

      <svg viewBox="0 0 320 64" className="block h-16 w-full" role="img" aria-label="Daily spend">
        {DAYS.map((cost, i) => {
          const h = cost === 0 ? 1 : Math.max(1, (cost / max) * 58);
          const barWidth = (320 - 8 - 29) / 30;
          const x = 4 + i * (barWidth + 1);
          const y = 64 - h;
          const isPeak = cost > 0 && cost === max;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={1}
              fill="#7c3aed"
              fillOpacity={isPeak ? 1 : 0.4}
              className="cost-bar"
              style={{ animationDelay: `${i * 30}ms` }}
            />
          );
        })}
      </svg>

      <div className="mt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-[#7c3aed] transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] text-[#475569]">
          <span>Budget · ${budget.toFixed(0)}/mo</span>
          <span>${(budget - total).toFixed(2)} left</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes barGrow {
          from { transform: scaleY(0); transform-origin: bottom; }
          to { transform: scaleY(1); transform-origin: bottom; }
        }
        :global(.cost-bar) {
          transform-origin: bottom;
          transform-box: fill-box;
          animation: barGrow 800ms ease-out backwards;
        }
      `}</style>
    </div>
  );
}
