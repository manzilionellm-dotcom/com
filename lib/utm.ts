// UTM + paid-click parameter capture and persistence.
// Captures on first-visit, persists for 30 days, exposes a read API.
// SSR-safe.

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "msclkid",
  "ttclid",
  "li_fat_id",
  "ref",
] as const;

const STORAGE_KEY = "biv_utm";
const LANDING_KEY = "biv_landing";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

type StoredAttribution = {
  data: Record<string, string>;
  landing?: string;
  landing_ts?: number;
  referrer?: string;
  expires_at: number;
};

export function captureFromLocation(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const incoming: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v) incoming[k] = v;
    }
    const hasIncoming = Object.keys(incoming).length > 0;

    let existing: StoredAttribution | null = null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredAttribution;
        if (parsed && parsed.expires_at > Date.now()) existing = parsed;
      }
    } catch {}

    // First-touch attribution: only overwrite when we receive new params
    if (hasIncoming) {
      const record: StoredAttribution = {
        data: existing && !hasIncoming ? existing.data : incoming,
        landing: window.location.pathname,
        landing_ts: Date.now(),
        referrer: document.referrer || undefined,
        expires_at: Date.now() + TTL_MS,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } else if (!existing) {
      // No params, no record yet — still capture landing page + referrer
      const record: StoredAttribution = {
        data: {},
        landing: window.location.pathname,
        landing_ts: Date.now(),
        referrer: document.referrer || undefined,
        expires_at: Date.now() + TTL_MS,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    }

    // Per-session landing page (always overwrite if missing for current session)
    try {
      if (!window.sessionStorage.getItem(LANDING_KEY)) {
        window.sessionStorage.setItem(
          LANDING_KEY,
          JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || null,
            ts: Date.now(),
          }),
        );
      }
    } catch {}
  } catch {}
}

export function readAttribution(): StoredAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed || parsed.expires_at < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readUTMFlat(): Record<string, string> {
  const att = readAttribution();
  if (!att) return {};
  return {
    ...att.data,
    landing: att.landing ?? "",
    referrer: att.referrer ?? "",
  };
}
