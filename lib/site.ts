export const SITE = {
  brand: "Best IPTV VIP",
  domain: "https://bestiptv-vip.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "447307410512",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@bestiptv-vip.com",
  // reviewCount / ratingValue removed: no auditable review source exists, and
  // publishing invented ratings breaks Google's structured-data policy.
  channelsCount: 22000,
  vodCount: 120000,
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
} as const;

// Locales the homepage switcher actually renders. Server-rendered HTML is
// English only, so these produce no separate URLs and no hreflang cluster.
export const LOCALES = ["en", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

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
