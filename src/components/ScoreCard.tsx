import React from 'react';
import { Match } from '../types/cricket';
import { calculateChaseDynamics, calculateInningsScore } from '../utils/scoring';
import { ShieldCheck, Tv } from 'lucide-react';

interface ScoreCardProps {
  match: Match;
  onOpenScoreboard: () => void;
  onOpenAuditLog: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  match,
  onOpenScoreboard,
  onOpenAuditLog,
}) => {
  const currentInnings = match.innings[match.currentInningsIndex];
  if (!currentInnings) return null;

  const battingTeam =
    currentInnings.battingTeamId === match.teamA.id ? match.teamA : match.teamB;
  const bowlingTeam =
    currentInnings.bowlingTeamId === match.teamA.id ? match.teamA : match.teamB;

  const score = calculateInningsScore(currentInnings.deliveries);
  const isSecondInnings = match.currentInningsIndex === 1;

  const chase = isSecondInnings
    ? calculateChaseDynamics(match, currentInnings.deliveries)
    : null;

  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel border border-slate-800 bg-gradient-to-b from-stadium-850/90 to-stadium-950/95 p-5 sm:p-6 shadow-2xl">
      {/* Stadium Light Glow Accent */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-cricket-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-10" />

      {/* Header bar: Match Name, Innings, Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">
            {match.status === 'completed' ? 'MATCH FINISHED' : 'LIVE MATCH'}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-semibold text-slate-300 truncate max-w-[200px] sm:max-w-md">
            {match.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAuditLog}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-cricket-950/80 text-cricket-300 border border-cricket-700/50 hover:bg-cricket-900/80 transition-colors shadow-sm"
            title="Inspect Ball-by-ball Audit Log to prevent disputes"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cricket-neon" />
            <span className="hidden sm:inline">Score Record</span>
            <span className="sm:hidden">Audit</span>
          </button>

          <button
            onClick={onOpenScoreboard}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-stadium-750 text-white hover:bg-stadium-700 border border-slate-700 transition-colors shadow-sm"
            title="Open large spectator scoreboard"
          >
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Spectator View</span>
            <span className="sm:hidden">Board</span>
          </button>
        </div>
      </div>

      {/* Main Score Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Team and Score */}
        <div className="md:col-span-7">
          <div className="flex items-baseline gap-3 mb-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {battingTeam.name}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {isSecondInnings ? '2nd Innings' : '1st Innings'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Bowling: <span className="font-semibold text-slate-300">{bowlingTeam.name}</span>
          </p>

          <div className="flex items-baseline gap-4">
            <div className="flex items-baseline">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                {score.totalRuns}
              </span>
              <span className="text-3xl sm:text-4xl font-light text-slate-500 mx-2">/</span>
              <span className="text-4xl sm:text-5xl font-black text-cricket-neon">
                {score.wickets}
              </span>
            </div>

            <div className="border-l border-slate-700/60 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-200">
                {score.oversFormatted}
                <span className="text-sm font-normal text-slate-400 ml-1">
                  / {match.overs} ov
                </span>
              </div>
              <div className="text-xs font-medium text-slate-400">
                CRR: <span className="text-slate-200 font-bold">{score.runRate.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chasing Dynamics or Target Breakdown */}
        <div className="md:col-span-5 bg-stadium-900/90 rounded-xl p-4 border border-slate-800/90 flex flex-col justify-between">
          {isSecondInnings && chase ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Target
                </span>
                <span className="text-xl font-black text-amber-400">{chase.target}</span>
              </div>

              {chase.isWon ? (
                <div className="p-2.5 rounded-lg bg-cricket-900/60 border border-cricket-500/40 text-center">
                  <span className="text-sm font-black text-cricket-neon tracking-wide">
                    TARGET REACHED! 🎉
                  </span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-slate-850 border border-slate-700/80">
                  <div className="text-sm font-extrabold text-white text-center">
                    Need{' '}
                    <span className="text-cricket-neon text-base font-black">
                      {chase.neededRuns}
                    </span>{' '}
                    runs from{' '}
                    <span className="text-amber-400 text-base font-black">
                      {chase.ballsRemaining}
                    </span>{' '}
                    balls
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-slate-700/50 text-slate-400">
                    <span>
                      Required Rate: <strong className="text-white">{chase.requiredRunRate.toFixed(2)}</strong>
                    </span>
                    <span>
                      Current Rate: <strong className="text-white">{score.runRate.toFixed(2)}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  1st Innings Setup
                </span>
                <span className="text-xs font-medium text-slate-400">
                  Max: {match.overs * 6} legal balls
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-stadium-850 p-2 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Extras Conceded</div>
                  <div className="text-base font-bold text-slate-200 mt-0.5">
                    {score.extras.total}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">
                      (w {score.extras.wides}, nb {score.extras.noBalls}, b {score.extras.byes}, lb{' '}
                      {score.extras.legByes})
                    </span>
                  </div>
                </div>

                <div className="bg-stadium-850 p-2 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Projected Score</div>
                  <div className="text-base font-bold text-cricket-300 mt-0.5">
                    {Math.round(score.runRate * match.overs)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
