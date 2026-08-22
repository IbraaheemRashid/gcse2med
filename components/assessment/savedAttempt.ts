/**
 * Reads a part-finished attempt back out of sessionStorage so a refresh, or an
 * accidental back, does not throw away ten minutes of a student's work.
 *
 * The read is cached at module level and behind `useSyncExternalStore`, which
 * gives us a server snapshot of "nothing saved". That keeps the first client
 * render identical to the prerendered HTML — restoring state in an effect
 * instead would either mismatch on hydration or trigger a cascading re-render.
 */

export type SavedAttempt = {
  answers: Record<string, number | null>;
  index: number;
};

const EMPTY: SavedAttempt = { answers: {}, index: 0 };

/** Cached so getSnapshot returns a stable value across renders. */
const cache = new Map<string, string | null>();

function readRaw(key: string): string | null {
  if (!cache.has(key)) {
    try {
      cache.set(key, sessionStorage.getItem(key));
    } catch {
      // Private browsing, storage disabled — carry on with a fresh attempt.
      cache.set(key, null);
    }
  }
  return cache.get(key) ?? null;
}

/** sessionStorage never changes under us within a tab, so there is nothing to
 *  subscribe to — but useSyncExternalStore requires the argument. */
export function subscribe(): () => void {
  return () => {};
}

export function getSnapshot(key: string): string | null {
  return readRaw(key);
}

export function getServerSnapshot(): string | null {
  return null;
}

export function parseSavedAttempt(
  raw: string | null,
  questionCount: number,
): SavedAttempt {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as Partial<SavedAttempt>;
    const answers =
      parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {};
    const index =
      typeof parsed.index === "number"
        ? Math.min(Math.max(parsed.index, 0), Math.max(questionCount - 1, 0))
        : 0;
    return { answers, index };
  } catch {
    return EMPTY;
  }
}

export function saveAttempt(key: string, attempt: SavedAttempt): void {
  try {
    const raw = JSON.stringify(attempt);
    sessionStorage.setItem(key, raw);
    cache.set(key, raw);
  } catch {
    // Persistence is a convenience, not a requirement.
  }
}

export function clearAttempt(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
  cache.set(key, null);
}
