// Funnel-tracking abstraction.
// Pushes a normalized event into window.dataLayer (GA4 + GTM friendly) and
// mirrors it to Meta Pixel where there is a canonical equivalent.
// All client-only. Safe to call from SSR — becomes a no-op.

import { getRefId } from "./ref";

export type FunnelEvent =
  | "page_view"
  | "cta_click"
  | "whatsapp_click"
  | "plan_view"
  | "plan_select"
  | "checkout_start"
  | "checkout_success"
  | "checkout_cancel"
  | "trial_request"
  | "lead_submit"
  | "faq_open"
  | "country_view"
  | "device_view"
  | "compare_view"
  | "blog_view"
  | "search";

export type EventPayload = {
  // free-form context — kept flat for analytics ingestion
  source?: string;        // CTA/component identifier (e.g. "fab", "pricing-p3")
  label?: string;         // human-readable label
  value?: number;         // monetary value where relevant
  currency?: string;      // ISO-4217 when value is present
  plan?: string;          // plan key (p1/p3/p6/p12)
  device?: string;        // device the user said they own
  country?: string;       // country slug
  blog_slug?: string;
  compare_slug?: string;
  page?: string;          // url path
  q?: string;             // search query
  [key: string]: unknown;
};

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

const PIXEL_MAP: Partial<Record<FunnelEvent, string>> = {
  page_view: "PageView",
  whatsapp_click: "Contact",
  trial_request: "Lead",
  lead_submit: "Lead",
  checkout_start: "InitiateCheckout",
  checkout_success: "Purchase",
  plan_view: "ViewContent",
  search: "Search",
};

export function getUTMSnapshot(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem("biv_utm");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function isConsented(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

export function track(event: FunnelEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  const utm = getUTMSnapshot();
  const enriched: Record<string, unknown> = {
    event,
    ...utm,
    ...payload,
    ref_id: getRefId(),
    ts: Date.now(),
    path:
      payload.page ||
      (typeof location !== "undefined" ? location.pathname + location.search : undefined),
    ref:
      typeof document !== "undefined" && document.referrer ? document.referrer : undefined,
  };

  // 1. dataLayer (always — even without consent we keep first-party signal local;
  //    GA4/GTM tags must be gated by consent themselves via window.gtag('consent'))
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(enriched);

  // 2. GA4 direct
  if (isConsented() && typeof w.gtag === "function") {
    try {
      w.gtag("event", event, enriched);
    } catch {}
  }

  // 3. Meta Pixel mirror
  if (isConsented() && typeof w.fbq === "function") {
    const pixelEvent = PIXEL_MAP[event];
    if (pixelEvent) {
      try {
        w.fbq("track", pixelEvent, {
          value: payload.value,
          currency: payload.currency,
          content_name: payload.label,
          content_category: payload.source,
        });
      } catch {}
    }
  }

  // 4. First-party sink (fire-and-forget). This is the measurement of record:
  //    it survives ad-blockers, and the server strips anything personal and
  //    labels bot traffic before the event is stored.
  try {
    const body = JSON.stringify(enriched);
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/e", blob);
    } else {
      void fetch("/api/e", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {}
}

// Convenience helper to attach to anchor onClick without preventing navigation.
export function trackOnClick(event: FunnelEvent, payload: EventPayload = {}) {
  return () => track(event, payload);
}

export function buildWhatsAppText(message: string, source: string): string {
  const utm = getUTMSnapshot();
  const tag: string[] = [`src:${source}`];
  if (utm.utm_source) tag.push(`utm:${utm.utm_source}`);
  if (utm.utm_campaign) tag.push(`camp:${utm.utm_campaign}`);
  if (utm.gclid) tag.push(`g:${utm.gclid}`);
  if (utm.fbclid) tag.push(`fb:${utm.fbclid}`);

  // The reference is pre-filled into the message rather than left to the
  // customer to type. It is what lets a confirmed sale be attributed back to
  // the page that produced it (scripts/sale.mjs confirm <ref_id> …).
  const ref = getRefId();
  const refPart = ref ? ` | Ref: ${ref}` : "";
  return `${message} | ${tag.join(" / ")}${refPart}`;
}
