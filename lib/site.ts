/* ============================================================
   CENTRAL SITE CONFIG — single source of truth.
   Every number shown on the site (channels, VOD, 4K, uptime,
   activation time, prices, device limits, rating) MUST come from
   here. Do not hard-code these values in components or pages.
   ============================================================ */

export const SITE = {
  brand: "Best IPTV VIP",
  domain: "https://bestiptv-vip.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "447307410512",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@bestiptv-vip.com",

  // ---- Catalogue / service stats (canonical) -----------------
  channelsCount: 22000,
  vodCount: 120000,
  channels4kCount: 3500,
  uptime: "99.9%",
  activationMinutes: 10, // "activation < 10 min"
  trialHours: 24,
  foundingYear: 2019,

  // ---- Social proof rating -----------------------------------
  // NOTE(missing-data): ratingValue/reviewCount are currently
  // internal figures. For the trust bar to link to an EXTERNAL,
  // verifiable source (Trustpilot / Google), fill reviewSourceUrl
  // with the real public profile. If no such profile exists, set
  // reviewSourceUrl to "" — the UI then hides the rating link and
  // shows the guarantee only, avoiding an unverifiable claim.
  ratingValue: 4.9,
  reviewCount: 12847,
  reviewSourceName: "Trustpilot",
  reviewSourceUrl: process.env.NEXT_PUBLIC_REVIEW_SOURCE_URL || "",

  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
} as const;

/* ------------------------------------------------------------
   Legal identity — shown in the rich footer.
   NOTE(missing-data): these are placeholders. Provide the real
   registered company name, registration number, and address, or
   set them via env. Until then the footer shows a discreet
   "à compléter" marker instead of fake data.
   ------------------------------------------------------------ */
export const LEGAL = {
  companyName: process.env.NEXT_PUBLIC_LEGAL_COMPANY || "",
  registration: process.env.NEXT_PUBLIC_LEGAL_REG || "",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
  email: SITE.email,
} as const;

/* ------------------------------------------------------------
   PLANS — canonical pricing + comparison matrix.
   Keys (p1/p3/p6/p12) and prices MUST match the checkout API
   (app/api/checkout/create). Comparison features drive both the
   pricing cards and the comparative table on the homepage.
   ------------------------------------------------------------ */
export type PlanKey = "p1" | "p3" | "p6" | "p12";

export type Plan = {
  key: PlanKey;
  months: number;
  price: number; // one-time total, USD
  recommended?: boolean;
  /** Comparison-matrix values (locale-independent tokens). */
  simultaneousDevices: number;
  /** Whether extended 7-day catch-up is included. */
  catchup: boolean;
  /** Support tier token — mapped to a localized label in the UI. */
  supportTier: "standard" | "priority" | "vip";
};

export const PLANS: Plan[] = [
  { key: "p1", months: 1, price: 10, simultaneousDevices: 1, catchup: false, supportTier: "standard" },
  { key: "p3", months: 3, price: 25, recommended: true, simultaneousDevices: 2, catchup: true, supportTier: "priority" },
  { key: "p6", months: 6, price: 35, simultaneousDevices: 2, catchup: true, supportTier: "priority" },
  { key: "p12", months: 12, price: 60, simultaneousDevices: 3, catchup: true, supportTier: "vip" },
];

/** Lowest effective monthly price across all plans (for "from $X/mo"). */
export const LOWEST_MONTHLY = Math.min(...PLANS.map((p) => p.price / p.months));

/** Per-month price for a plan, trimmed (e.g. 5, 8.33). */
export function monthlyPrice(plan: Plan): string {
  return (plan.price / plan.months).toFixed(2).replace(/\.00$/, "");
}

/** Savings % of a plan vs the 1-month reference. */
export function planSavings(plan: Plan): number {
  const base = PLANS[0].price / PLANS[0].months;
  const per = plan.price / plan.months;
  return base > 0 ? Math.round((1 - per / base) * 100) : 0;
}

export const LOCALES = ["en", "fr", "ar", "es", "de"] as const;
export type Locale = (typeof LOCALES)[number];

/** Locales with a full on-page translation (hero → footer). */
export const UI_LOCALES = ["en", "fr", "ar"] as const;
export type UiLocale = (typeof UI_LOCALES)[number];

export const DEVICE_SLUGS = [
  "firestick",
  "smart-tv",
  "android",
  "ios",
  "mag-box",
  "pc-mac",
] as const;
export type DeviceSlug = (typeof DEVICE_SLUGS)[number];

export const COUNTRY_SLUGS = [
  "arabic",
  "english",
  "french",
  "spanish",
  "turkish",
  "indian",
  "german",
  "african",
] as const;
export type CountrySlug = (typeof COUNTRY_SLUGS)[number];

export const BLOG_SLUGS = [
  "best-iptv-2026",
  "how-to-fix-iptv-buffering",
  "iptv-vs-cable-tv",
  "how-to-watch-iptv-in-4k",
  "iptv-smarters-vs-tivimate",
] as const;
export type BlogSlug = (typeof BLOG_SLUGS)[number];

export const COMPARE_SLUGS = [
  "iptv-vs-cable-tv",
  "iptv-vs-netflix",
  "iptv-vs-disney-plus",
  "iptv-vs-sling-tv",
  "iptv-vs-youtube-tv",
] as const;
export type CompareSlug = (typeof COMPARE_SLUGS)[number];

export function waLink(message: string, ref?: string) {
  const text = encodeURIComponent(message + (ref ? ` | Ref: ${ref}` : ""));
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

/** Locale-aware compact number formatting (e.g. 22000 → "22 000" fr / "22,000" en). */
export function fmtCount(n: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : locale).format(n);
  } catch {
    return String(n);
  }
}
