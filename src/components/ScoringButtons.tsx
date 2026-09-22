import React from 'react';
import { Undo2, AlertOctagon, Sparkles, Layers } from 'lucide-react';
import { ExtraType } from '../types/cricket';

interface ScoringButtonsProps {
  onScoreRuns: (runs: number) => void;
  onExtraBall: (type: ExtraType, runsBat: number, extras: number) => void;
  onWicketClick: () => void;
  onUndoClick: () => void;
  onOpenMultiExtrasModal: () => void;
  disabled?: boolean;
  canUndo?: boolean;
}

export const ScoringButtons: React.FC<ScoringButtonsProps> = ({
  onScoreRuns,
  onExtraBall,
  onWicketClick,
  onUndoClick,
  onOpenMultiExtrasModal,
  disabled = false,
  canUndo = false,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 bg-stadium-900/95 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cricket-neon" />
          Scoring Controls
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMultiExtrasModal}
            disabled={disabled}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stadium-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-colors disabled:opacity-50"
            title="Custom Extras (e.g. No-Ball + 4, Wide + 2 Byes)"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>More Extras</span>
          </button>

          <button
            onClick={onUndoClick}
            disabled={!canUndo || disabled}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              canUndo && !disabled
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 active:scale-95'
                : 'bg-stadium-850 text-slate-600 border border-slate-800 cursor-not-allowed'
            }`}
            title="Undo last recorded delivery"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo Ball</span>
          </button>
        </div>
      </div>

      {/* Row 1: Primary Runs (0, 1, 2, 3, 4, 6) */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-3">
        {/* 0 Runs (Dot) */}
        <button
          onClick={() => onScoreRuns(0)}
          disabled={disabled}
          className="h-14 sm:h-16 rounded-xl font-black text-xl sm:text-2xl bg-stadium-800 hover:bg-stadium-750 text-slate-300 border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all shadow-md flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>0</span>
          <span className="text-[9px] uppercase font-bold text-slate-500 -mt-1">Dot</span>
        </button>

        {/* 1 Run */}
        <button
          onClick={() => onScoreRuns(1)}
          disabled={disabled}
          className="h-14 sm:h-16 rounded-xl font-black text-xl sm:text-2xl bg-stadium-800 hover:bg-stadium-750 text-white border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all shadow-md flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>1</span>
          <span className="text-[9px] uppercase font-bold text-slate-500 -mt-1">Run</span>
        </button>

        {/* 2 Runs */}
        <button
          onClick={() => onScoreRuns(2)}
          disabled={disabled}
          className="h-14 sm:h-16 rounded-xl font-black text-xl sm:text-2xl bg-stadium-800 hover:bg-stadium-750 text-white border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all shadow-md flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>2</span>
          <span className="text-[9px] uppercase font-bold text-slate-500 -mt-1">Runs</span>
        </button>

        {/* 3 Runs */}
        <button
          onClick={() => onScoreRuns(3)}
          disabled={disabled}
          className="h-14 sm:h-16 rounded-xl font-black text-xl sm:text-2xl bg-stadium-800 hover:bg-stadium-750 text-white border border-slate-700/80 hover:border-slate-600 active:scale-95 transition-all shadow-md flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>3</span>
          <span className="text-[9px] uppercase font-bold text-slate-500 -mt-1">Runs</span>
        </button>

        {/* 4 Runs (Boundary) */}
        <button
          onClick={() => onScoreRuns(4)}
          disabled={disabled}
          className="h-14 sm:h-16 rounded-xl font-black text-2xl sm:text-3xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-500/50 hover:border-emerald-400 active:scale-95 transition-all shadow-lg flex flex-col items-center justify-center group disabled:opacity-50"
        >
          <span>4</span>
          <span className="text-[9px] uppercase font-black text-emerald-500 tracking-wider -mt-1 group-hover:text-emerald-300">
            Four
          </span>
        </button>

        {/* 6 Runs (Maximum) */}
        <button
          onClick={() => onScoreRuns(6)}
          disabled={disabled}
          className="h-14 sm:h-16 rounded-xl font-black text-2xl sm:text-3xl bg-gradient-to-tr from-purple-950/80 via-cricket-950/80 to-cricket-900/90 hover:from-purple-900 hover:to-cricket-800 text-cricket-neon border border-cricket-neon/60 hover:border-cricket-neon active:scale-95 transition-all shadow-neon flex flex-col items-center justify-center group disabled:opacity-50"
        >
          <span>6</span>
          <span className="text-[9px] uppercase font-black text-cricket-400 tracking-wider -mt-1 group-hover:text-cricket-neon">
            Six
          </span>
        </button>
      </div>

      {/* Row 2: Extras & WICKET Button */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3">
        {/* Wide (1 run extra, not legal) */}
        <button
          onClick={() => onExtraBall('wide', 0, 1)}
          disabled={disabled}
          className="col-span-3 sm:col-span-2 h-13 sm:h-14 rounded-xl font-black text-sm sm:text-base bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 hover:border-amber-400 active:scale-95 transition-all flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>WD</span>
          <span className="text-[9px] text-amber-400/80 font-bold -mt-0.5">+1 Wide</span>
        </button>

        {/* No Ball (0 runs extra, not legal) */}
        <button
          onClick={() => onExtraBall('noBall', 0, 0)}
          disabled={disabled}
          className="col-span-3 sm:col-span-2 h-13 sm:h-14 rounded-xl font-black text-sm sm:text-base bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 hover:border-amber-400 active:scale-95 transition-all flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>NB</span>
          <span className="text-[9px] text-amber-400/80 font-bold -mt-0.5">No Ball</span>
        </button>

        {/* Bye (1 run team extra, legal) */}
        <button
          onClick={() => onExtraBall('bye', 0, 1)}
          disabled={disabled}
          className="col-span-3 sm:col-span-2 h-13 sm:h-14 rounded-xl font-black text-sm sm:text-base bg-stadium-800 hover:bg-stadium-750 text-blue-300 border border-blue-500/30 hover:border-blue-400 active:scale-95 transition-all flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>1 B</span>
          <span className="text-[9px] text-blue-400/80 font-bold -mt-0.5">Bye</span>
        </button>

        {/* Leg Bye (1 run team extra, legal) */}
        <button
          onClick={() => onExtraBall('legBye', 0, 1)}
          disabled={disabled}
          className="col-span-3 sm:col-span-2 h-13 sm:h-14 rounded-xl font-black text-sm sm:text-base bg-stadium-800 hover:bg-stadium-750 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 active:scale-95 transition-all flex flex-col items-center justify-center disabled:opacity-50"
        >
          <span>1 LB</span>
          <span className="text-[9px] text-cyan-400/80 font-bold -mt-0.5">Leg Bye</span>
        </button>

        {/* WICKET - Visual Prominence */}
        <button
          onClick={onWicketClick}
          disabled={disabled}
          className="col-span-12 sm:col-span-4 h-13 sm:h-14 rounded-xl font-black text-base sm:text-lg bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white border border-red-400/60 shadow-wicket hover:shadow-red-500/50 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-wider"
        >
          <AlertOctagon className="w-5 h-5 animate-pulse" />
          <span>WICKET!</span>
        </button>
      </div>
    </div>
  );
};
