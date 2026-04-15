/**
 * Microsoft Clarity – typed utility helpers.
 * Wraps the global `window.clarity` function so TypeScript won't complain
 * and provides a safe no-op when called during SSR.
 */

declare global {
  interface Window {
    // Clarity is injected as a global; allow any signature.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity: (...args: any[]) => void;
  }
}

/** Guard: returns true only in a browser context where Clarity is loaded. */
function isClarityAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
}

/**
 * Set a custom Clarity tag (key → value pair).
 * Appears in the Clarity dashboard as a filter dimension.
 *
 * @example claritySet('friction_type', 'rage_test_active');
 */
export function claritySet(key: string, value: string): void {
  if (isClarityAvailable()) {
    window.clarity('set', key, value);
  }
}

/**
 * Identify the current session with a custom user ID.
 * Useful for correlating Clarity replays with your own user database.
 */
export function clarityIdentify(userId: string, sessionId?: string, pageId?: string, friendlyName?: string): void {
  if (isClarityAvailable()) {
    window.clarity('identify', userId, sessionId, pageId, friendlyName);
  }
}

/**
 * Fire a named Clarity event.
 * Shows up as a distinct event marker in session replays.
 */
export function clarityEvent(eventName: string): void {
  if (isClarityAvailable()) {
    window.clarity('event', eventName);
  }
}

/**
 * Upgrade the current session priority.
 * Forces Clarity to record this session regardless of sampling rate.
 * Useful when a user lands on a critical friction flow.
 */
export function clarityUpgrade(reason: string): void {
  if (isClarityAvailable()) {
    window.clarity('upgrade', reason);
  }
}

export type FrictionType =
  | 'rage_test_active'
  | 'dead_zone_test_active'
  | 'scroll_depth_test_active'
  | 'quick_back_test_active';

/**
 * Convenience: tag the session with a friction-lab module name.
 * This is the primary way to segregate sessions by friction type in Clarity.
 */
export function tagFriction(type: FrictionType): void {
  claritySet('friction_type', type);
  clarityUpgrade(`Friction lab module visited: ${type}`);
}
