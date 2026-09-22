import React from 'react';
import { Delivery } from '../types/cricket';
import { getBallBadgeText, getCurrentOverDeliveries, getCurrentOverNumber } from '../utils/scoring';

interface OverTrackerProps {
  deliveries: Delivery[];
  onBallClick?: (delivery: Delivery) => void;
}

export const OverTracker: React.FC<OverTrackerProps> = ({ deliveries, onBallClick }) => {
  const currentOverIndex = getCurrentOverNumber(deliveries);
  const currentOverDeliveries = getCurrentOverDeliveries(deliveries);

  const legalBallsInThisOver = currentOverDeliveries.filter((d) => d.isLegal).length;
  const runsInThisOver = currentOverDeliveries.reduce(
    (acc, d) => acc + d.runsBat + d.extras,
    0
  );

  // Badge styling helper
  const getBadgeStyle = (type: 'dot' | 'run' | 'four' | 'six' | 'wicket' | 'extra') => {
    switch (type) {
      case 'wicket':
        return 'bg-red-500/20 text-red-400 border-red-500/50 shadow-wicket font-black scale-105';
      case 'six':
        return 'bg-gradient-to-tr from-purple-600/30 to-cricket-neon/30 text-cricket-neon border-cricket-neon/60 shadow-neon font-black scale-105';
      case 'four':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-black';
      case 'extra':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold';
      case 'dot':
        return 'bg-slate-800 text-slate-400 border-slate-700 font-bold';
      default:
        return 'bg-slate-800 text-slate-100 border-slate-700 font-semibold';
    }
  };

  // Up to 6 legal balls in standard over
  const remainingLegalSlots = Math.max(0, 6 - legalBallsInThisOver);

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 bg-stadium-900/80">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-white tracking-wide">
            Over {currentOverIndex + 1}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {legalBallsInThisOver}/6 Legal Balls
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>This Over:</span>
          <span className="font-extrabold text-cricket-neon text-sm">{runsInThisOver} Runs</span>
        </div>
      </div>

      {/* Visual Ball Slots */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
        {currentOverDeliveries.map((delivery) => {
          const badge = getBallBadgeText(delivery);
          return (
            <button
              key={delivery.id}
              onClick={() => onBallClick?.(delivery)}
              className={`min-w-[42px] h-[42px] px-2 rounded-xl flex items-center justify-center text-sm border transition-all duration-150 select-none hover:scale-110 cursor-pointer ${getBadgeStyle(
                badge.type
              )}`}
              title={`Ball ${delivery.overNumber}.${delivery.ballInOver}: ${delivery.runsBat} bat runs, ${delivery.extras} extras (${delivery.extraType})`}
            >
              {badge.label}
            </button>
          );
        })}

        {/* Empty Pending Legal Ball Slots */}
        {Array.from({ length: remainingLegalSlots }).map((_, i) => (
          <div
            key={`empty-slot-${i}`}
            className="w-[42px] h-[42px] rounded-xl border border-dashed border-slate-700/80 bg-stadium-950/40 flex items-center justify-center text-xs font-medium text-slate-600 select-none"
          >
            {legalBallsInThisOver + i + 1}
          </div>
        ))}
      </div>

      <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Click any ball chip to inspect or edit delivery</span>
        {currentOverDeliveries.some((d) => !d.isLegal) && (
          <span className="text-amber-400 font-medium">
            * Extras (WD/NB) do not count towards the 6 legal balls
          </span>
        )}
      </div>
    </div>
  );
};
