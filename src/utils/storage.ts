import { Match, MatchSettings } from '../types/cricket';

const CURRENT_MATCH_KEY = 'cricketscore_current_match';
const MATCHES_HISTORY_KEY = 'cricketscore_matches_history';
const SETTINGS_KEY = 'cricketscore_settings';

export const DEFAULT_SETTINGS: MatchSettings = {
  soundEnabled: true,
  confirmBeforeUndo: true,
  darkMode: true,
  showAuditBadge: true,
};

// Safe JSON parse helper
function safeJsonParse<T>(data: string | null, fallback: T): T {
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch (err) {
    console.error('Failed to parse localStorage data:', err);
    return fallback;
  }
}

/**
 * Save current active match
 */
export function saveCurrentMatch(match: Match): void {
  try {
    match.updatedAt = new Date().toISOString();
    localStorage.setItem(CURRENT_MATCH_KEY, JSON.stringify(match));
    // Also sync into history list
    saveMatchToHistory(match);
  } catch (err) {
    console.error('Error saving current match:', err);
  }
}

/**
 * Load current active match
 */
export function loadCurrentMatch(): Match | null {
  const data = localStorage.getItem(CURRENT_MATCH_KEY);
  return safeJsonParse<Match | null>(data, null);
}

/**
 * Clear current active match from live slot
 */
export function clearCurrentMatch(): void {
  localStorage.removeItem(CURRENT_MATCH_KEY);
}

/**
 * Save match to history list (upsert by id)
 */
export function saveMatchToHistory(match: Match): void {
  try {
    const history = loadMatchHistory();
    const existingIndex = history.findIndex((m) => m.id === match.id);
    if (existingIndex >= 0) {
      history[existingIndex] = match;
    } else {
      history.unshift(match);
    }
    localStorage.setItem(MATCHES_HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Error saving match to history:', err);
  }
}

/**
 * Load all matches from history
 */
export function loadMatchHistory(): Match[] {
  const data = localStorage.getItem(MATCHES_HISTORY_KEY);
  return safeJsonParse<Match[]>(data, []);
}

/**
 * Delete a match from history
 */
export function deleteMatchFromHistory(matchId: string): void {
  try {
    const history = loadMatchHistory().filter((m) => m.id !== matchId);
    localStorage.setItem(MATCHES_HISTORY_KEY, JSON.stringify(history));

    const current = loadCurrentMatch();
    if (current && current.id === matchId) {
      clearCurrentMatch();
    }
  } catch (err) {
    console.error('Error deleting match:', err);
  }
}

/**
 * Load user settings
 */
export function loadSettings(): MatchSettings {
  const data = localStorage.getItem(SETTINGS_KEY);
  return safeJsonParse<MatchSettings>(data, DEFAULT_SETTINGS);
}

/**
 * Save user settings
 */
export function saveSettings(settings: MatchSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

/**
 * Factory reset: clear all matches and settings
 */
export function factoryReset(): void {
  localStorage.removeItem(CURRENT_MATCH_KEY);
  localStorage.removeItem(MATCHES_HISTORY_KEY);
  localStorage.removeItem(SETTINGS_KEY);
}
