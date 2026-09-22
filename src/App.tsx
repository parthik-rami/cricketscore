import React, { useState, useEffect } from 'react';
import { Match, MatchSettings } from './types/cricket';
import {
  deleteMatchFromHistory,
  factoryReset,
  loadCurrentMatch,
  loadMatchHistory,
  loadSettings,
  saveCurrentMatch,
  saveSettings,
  DEFAULT_SETTINGS,
} from './utils/storage';
import { createDemoMatch } from './data/demoMatch';
import { soundManager } from './utils/sound';
import { Navbar } from './components/Navbar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Dashboard } from './pages/Dashboard';
import { CreateMatch } from './pages/CreateMatch';
import { LiveScoring } from './pages/LiveScoring';
import { Scoreboard } from './pages/Scoreboard';
import { BallHistory } from './pages/BallHistory';
import { MatchSummary } from './pages/MatchSummary';
import { MatchHistory } from './pages/MatchHistory';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [settings, setSettingsState] = useState<MatchSettings>(DEFAULT_SETTINGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load persisted state on mount
  useEffect(() => {
    const storedMatch = loadCurrentMatch();
    const storedHistory = loadMatchHistory();
    const storedSettings = loadSettings();

    if (storedMatch) {
      setActiveMatch(storedMatch);
    }
    setMatches(storedHistory);
    setSettingsState(storedSettings);
    soundManager.setEnabled(storedSettings.soundEnabled);
  }, []);

  // Toast notification helper
  const showToast = (
    message: string,
    type: 'success' | 'warning' | 'info' | 'error' = 'info'
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Start new match
  const handleStartMatch = (match: Match) => {
    setActiveMatch(match);
    saveCurrentMatch(match);
    setMatches(loadMatchHistory());
    setCurrentRoute('live-scoring');
    showToast(`Match "${match.name}" started! Play bold! 🏏`, 'success');
  };

  // Update match in state & localStorage
  const handleUpdateMatch = (updatedMatch: Match) => {
    setActiveMatch(updatedMatch);
    saveCurrentMatch(updatedMatch);
    setMatches(loadMatchHistory());
  };

  // Select match to view
  const handleSelectMatch = (match: Match) => {
    setActiveMatch(match);
    if (match.status === 'live') {
      setCurrentRoute('live-scoring');
    } else {
      setCurrentRoute('match-summary');
    }
  };

  // Resume match
  const handleResumeMatch = (match: Match) => {
    setActiveMatch(match);
    saveCurrentMatch(match);
    setCurrentRoute('live-scoring');
    showToast(`Resumed match: ${match.name}`, 'info');
  };

  // Delete match
  const handleDeleteMatch = (matchId: string) => {
    deleteMatchFromHistory(matchId);
    setMatches(loadMatchHistory());
    if (activeMatch && activeMatch.id === matchId) {
      setActiveMatch(null);
    }
    showToast('Match record deleted.', 'warning');
  };

  // Load Demo Match
  const handleLoadDemoMatch = () => {
    const demo = createDemoMatch();
    setActiveMatch(demo);
    saveCurrentMatch(demo);
    setMatches(loadMatchHistory());
    setCurrentRoute('live-scoring');
    showToast('Loaded demo match: Ahmedabad Strikers vs Gujarat Warriors', 'success');
  };

  // Update settings
  const handleUpdateSettings = (newSettings: MatchSettings) => {
    setSettingsState(newSettings);
    saveSettings(newSettings);
  };

  // Reset all data
  const handleResetAllData = () => {
    factoryReset();
    setActiveMatch(null);
    setMatches([]);
    setSettingsState(DEFAULT_SETTINGS);
    setCurrentRoute('dashboard');
    showToast('All local matches and data have been reset.', 'warning');
  };

  return (
    <div className="min-h-screen bg-stadium-950 text-slate-100 flex flex-col font-sans">
      {/* App Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={(route) => setCurrentRoute(route)}
        activeMatch={activeMatch}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {currentRoute === 'dashboard' && (
          <Dashboard
            matches={matches}
            activeMatch={activeMatch}
            onNavigate={(route) => setCurrentRoute(route)}
            onSelectMatch={handleSelectMatch}
            onLoadDemoMatch={handleLoadDemoMatch}
          />
        )}

        {currentRoute === 'create-match' && (
          <CreateMatch
            onStartMatch={handleStartMatch}
            onCancel={() => setCurrentRoute('dashboard')}
          />
        )}

        {currentRoute === 'live-scoring' && activeMatch && (
          <LiveScoring
            match={activeMatch}
            settings={settings}
            onUpdateMatch={handleUpdateMatch}
            onNavigate={(route) => setCurrentRoute(route)}
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'scoreboard' && activeMatch && (
          <Scoreboard
            match={activeMatch}
            onBack={() => setCurrentRoute('live-scoring')}
          />
        )}

        {currentRoute === 'ball-history' && activeMatch && (
          <BallHistory
            match={activeMatch}
            onUpdateMatch={handleUpdateMatch}
            onBack={() => setCurrentRoute('live-scoring')}
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'match-summary' && activeMatch && (
          <MatchSummary
            match={activeMatch}
            onUpdateMatch={handleUpdateMatch}
            onBack={() => setCurrentRoute('dashboard')}
            onResumeMatch={
              activeMatch.status === 'live'
                ? () => setCurrentRoute('live-scoring')
                : undefined
            }
            onShowToast={showToast}
          />
        )}

        {currentRoute === 'match-history' && (
          <MatchHistory
            matches={matches}
            onSelectMatch={handleSelectMatch}
            onResumeMatch={handleResumeMatch}
            onDeleteMatch={handleDeleteMatch}
            onNavigate={(route) => setCurrentRoute(route)}
          />
        )}

        {currentRoute === 'settings' && (
          <Settings
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetAllData={handleResetAllData}
            onLoadDemoMatch={handleLoadDemoMatch}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Persistent Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default App;
