import type { InterviewScores } from "./types";

const STORAGE_KEY = "star-interview-exp";

interface StoredProgress {
  totalExp: number;
  sessionsCompleted: number;
  lastPlayedAt: string;
}

export function loadProgress(): StoredProgress {
  if (typeof window === "undefined") {
    return { totalExp: 0, sessionsCompleted: 0, lastPlayedAt: "" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { totalExp: 0, sessionsCompleted: 0, lastPlayedAt: "" };
    return JSON.parse(raw);
  } catch {
    return { totalExp: 0, sessionsCompleted: 0, lastPlayedAt: "" };
  }
}

export function saveProgress(exp: number): StoredProgress {
  const prev = loadProgress();
  const updated: StoredProgress = {
    totalExp: prev.totalExp + exp,
    sessionsCompleted: prev.sessionsCompleted + 1,
    lastPlayedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // quota exceeded - silently fail
  }
  return updated;
}
