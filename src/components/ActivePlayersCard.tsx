import React from 'react';
import { ArrowLeftRight, UserCheck, Award } from 'lucide-react';
import { BatsmanStats, BowlerStats } from '../types/cricket';

interface ActivePlayersCardProps {
  striker: BatsmanStats | null;
  nonStriker: BatsmanStats | null;
  bowler: BowlerStats | null;
  onSwapStrike: () => void;
  onChangeBowler: () => void;
  onChangeBatter: (target: 'striker' | 'nonStriker') => void;
}

export const ActivePlayersCard: React.FC<ActivePlayersCardProps> = ({
  striker,
  nonStriker,
  bowler,
  onSwapStrike,
  onChangeBowler,
  onChangeBatter,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Batters Card */}
      <div className="md:col-span-7 glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 bg-stadium-900/90">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cricket-neon" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Batters at Crease
            </h3>
          </div>

          <button
            onClick={onSwapStrike}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-cricket-500/10 text-cricket-neon border border-cricket-500/30 hover:bg-cricket-500/20 transition-all shadow-sm active:scale-95"
            title="Rotate / Swap Strike manually"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Swap Strike</span>
          </button>
        </div>

        <div className="space-y-3 mt-3">
          {/* Striker */}
          <div className="p-3 rounded-xl bg-stadium-800/80 border border-cricket-500/40 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cricket-neon shadow-neon animate-pulse" />
                <span
                  onClick={() => onChangeBatter('striker')}
                  className="font-bold text-white text-base hover:text-cricket-neon cursor-pointer transition-colors"
                  title="Click to replace or choose different batter"
                >
                  {striker ? striker.name : 'Select Striker'} *
                </span>
                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-cricket-500/20 text-cricket-neon border border-cricket-500/30">
                  STRIKE
                </span>
              </div>

              <button
                onClick={() => onChangeBatter('striker')}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
              >
                Change
              </button>
            </div>

            {striker && (
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50 text-xs">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-white">{striker.runs}</span>
                  <span className="text-slate-400 font-medium">({striker.balls})</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <span>
                    4s: <strong className="text-white">{striker.fours}</strong>
                  </span>
                  <span>
                    6s: <strong className="text-white">{striker.sixes}</strong>
                  </span>
                  <span>
                    SR: <strong className="text-cricket-300">{striker.strikeRate.toFixed(1)}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Non-Striker */}
          <div className="p-3 rounded-xl bg-stadium-850/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span
                  onClick={() => onChangeBatter('nonStriker')}
                  className="font-bold text-slate-200 text-base hover:text-white cursor-pointer transition-colors"
                >
                  {nonStriker ? nonStriker.name : 'Select Non-Striker'}
                </span>
              </div>

              <button
                onClick={() => onChangeBatter('nonStriker')}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
              >
                Change
              </button>
            </div>

            {nonStriker && (
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/30 text-xs">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-slate-200">{nonStriker.runs}</span>
                  <span className="text-slate-400 font-medium">({nonStriker.balls})</span>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                  <span>
                    4s: <strong className="text-slate-200">{nonStriker.fours}</strong>
                  </span>
                  <span>
                    6s: <strong className="text-slate-200">{nonStriker.sixes}</strong>
                  </span>
                  <span>
                    SR: <strong className="text-slate-300">{nonStriker.strikeRate.toFixed(1)}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Bowler Card */}
      <div className="md:col-span-5 glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 bg-stadium-900/90 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Current Bowler
              </h3>
            </div>

            <button
              onClick={onChangeBowler}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stadium-800 text-slate-200 border border-slate-700 hover:bg-stadium-750 transition-colors"
            >
              Change
            </button>
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-black text-white tracking-tight">
              {bowler ? bowler.name : 'Select Bowler'}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Spell in progress</p>

            {bowler && (
              <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                <div className="bg-stadium-850 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Overs</div>
                  <div className="text-base font-black text-white mt-0.5">{bowler.overs}</div>
                </div>

                <div className="bg-stadium-850 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Maidens</div>
                  <div className="text-base font-black text-slate-200 mt-0.5">{bowler.maidens}</div>
                </div>

                <div className="bg-stadium-850 p-2 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Runs</div>
                  <div className="text-base font-black text-white mt-0.5">
                    {bowler.runsConceded}
                  </div>
                </div>

                <div className="bg-stadium-850 p-2 rounded-xl border border-cricket-500/30">
                  <div className="text-[10px] text-cricket-neon uppercase font-bold">Wickets</div>
                  <div className="text-base font-black text-cricket-neon mt-0.5">
                    {bowler.wickets}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {bowler && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>
              Econ: <strong className="text-white">{bowler.economy.toFixed(2)}</strong>
            </span>
            <span>
              Wd: <strong className="text-slate-300">{bowler.wides}</strong> | Nb:{' '}
              <strong className="text-slate-300">{bowler.noBalls}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
