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

// MOTEUR 3 — Content Hub. Device Niveau 1 (apps/players/boxes — highest buy intent).
export const APP_SLUGS = [
  "tivimate",
  "iptv-smarters-pro",
  "ibo-player",
  "xciptv",
  "duplex-iptv",
  "sparkle-tv",
  "stb-emulator",
  "formuler-z",
] as const;
export type AppSlug = (typeof APP_SLUGS)[number];

// Help Center (dépannage — capte le trafic problème).
export const HELP_SLUGS = [
  "iptv-not-connecting",
  "iptv-buffering",
  "iptv-black-screen",
  "iptv-channels-not-loading",
  "iptv-app-crashing",
  "iptv-audio-video-out-of-sync",
  "iptv-frozen-playback",
  "iptv-change-device",
] as const;
export type HelpSlug = (typeof HELP_SLUGS)[number];

// Knowledge Base (questions les plus recherchées).
export const KB_SLUGS = [
  "what-is-iptv",
  "how-to-install-iptv",
  "iptv-internet-speed-requirements",
  "how-to-improve-iptv-video-quality",
  "xtream-codes-vs-m3u",
  "what-is-epg-iptv",
  "is-iptv-legal",
  "how-to-setup-vpn-for-iptv",
] as const;
export type KbSlug = (typeof KB_SLUGS)[number];

export function waLink(message: string, ref?: string) {
  const text = encodeURIComponent(message + (ref ? ` | Ref: ${ref}` : ""));
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
