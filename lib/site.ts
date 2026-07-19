export const SITE = {
  brand: "Best IPTV VIP",
  domain: "https://bestiptv-vip.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "447307410512",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@bestiptv-vip.com",
  reviewCount: 12847,
  ratingValue: 4.9,
  channelsCount: 22000,
  vodCount: 120000,
  ga4: process.env.NEXT_PUBLIC_GA4_ID || "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
} as const;

export const LOCALES = ["en", "fr", "ar", "es", "de"] as const;
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

// MOTEUR 3 (BUILD) — Content Hub. Every slug below is validated in
// ./data/content-map.json (MOTEUR 1 INTEL). No entry there = no page.

// Device Hub — Niveau 1: IPTV apps/players (highest buy intent).
export const APP_SLUGS = [
  "tivimate",
  "iptv-smarters-pro",
  "ibo-player",
  "xciptv",
  "duplex-play",
  "sparkle-tv",
  "formuler-z",
  "stb-emulator",
] as const;
export type AppSlug = (typeof APP_SLUGS)[number];

// Help Center — dépannage (capte le trafic problème).
export const HELP_SLUGS = [
  "cant-connect",
  "playback-stops",
  "buffering",
  "black-screen",
  "network-error",
  "update-app",
  "change-device",
  "account-recovery",
] as const;
export type HelpSlug = (typeof HELP_SLUGS)[number];

// Knowledge Base — questions les plus recherchées.
export const KB_SLUGS = [
  "how-to-install-iptv",
  "which-device-for-iptv",
  "internet-speed-for-iptv",
  "improve-video-quality",
  "xtream-codes-vs-m3u",
  "what-is-epg",
  // seo_answers cluster — high-volume searched questions
  "what-is-iptv",
  "is-iptv-legal",
  "is-iptv-safe",
  "do-i-need-a-vpn-for-iptv",
  "how-much-does-iptv-cost",
  "iptv-free-trial",
  "best-iptv-for-firestick",
  "best-iptv-for-sports",
  "iptv-on-multiple-devices",
  "does-iptv-support-4k",
  "what-is-catch-up-tv",
  "how-to-pay-for-iptv-safely",
] as const;
export type KbSlug = (typeof KB_SLUGS)[number];

export function waLink(message: string, ref?: string) {
  const text = encodeURIComponent(message + (ref ? ` | Ref: ${ref}` : ""));
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
