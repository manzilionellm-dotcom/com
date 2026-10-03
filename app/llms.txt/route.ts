import {
  BLOG_SLUGS,
  COMPARE_SLUGS,
  COUNTRY_SLUGS,
  DEVICE_SLUGS,
  SITE,
} from "../../lib/site";

export const dynamic = "force-static";

const COUNTRY_LABEL: Record<(typeof COUNTRY_SLUGS)[number], string> = {
  arabic: "Arabic IPTV (MENA)",
  english: "English IPTV (USA / UK)",
  french: "French IPTV (France / Belgique / Suisse)",
  spanish: "Spanish IPTV (España / LATAM)",
  turkish: "Turkish IPTV (Türkiye)",
  indian: "Indian IPTV (Hindi / Tamil / Telugu)",
  german: "German IPTV (Deutschland / Österreich / Schweiz)",
  african: "African IPTV (Afrique francophone & anglophone)",
};

const DEVICE_LABEL: Record<(typeof DEVICE_SLUGS)[number], string> = {
  firestick: "Amazon Firestick",
  "smart-tv": "Smart TV (Samsung, LG, Sony)",
  android: "Android TV / Android Box",
  ios: "iPhone / iPad / Apple TV",
  "mag-box": "MAG Box (Infomir)",
  "pc-mac": "PC / Mac / Linux",
};

const BLOG_LABEL: Record<(typeof BLOG_SLUGS)[number], string> = {
  "best-iptv-2026": "Buyer's guide article (2026)",
  "how-to-fix-iptv-buffering": "Buffering troubleshooting article",
  "iptv-vs-cable-tv": "IPTV and cable TV article",
  "how-to-watch-iptv-in-4k": "4K setup article",
  "iptv-smarters-vs-tivimate": "IPTV Smarters and TiviMate article",
};

const COMPARE_LABEL: Record<(typeof COMPARE_SLUGS)[number], string> = {
  "iptv-vs-cable-tv": "IPTV vs cable TV",
  "iptv-vs-netflix": "IPTV vs Netflix",
  "iptv-vs-disney-plus": "IPTV vs Disney+",
  "iptv-vs-sling-tv": "IPTV vs Sling TV",
  "iptv-vs-youtube-tv": "IPTV vs YouTube TV",
};

function link(origin: string, path: string, label: string) {
  return `- [${label}](${origin}${path})`;
}

/**
 * Factual index of published URLs. No prices, ratings, or stream promises.
 * Paths that 404 (/trial, /essai, /firestick, /faq) are omitted.
 * /ops is noindex and disallowed in robots.txt, so it is omitted too.
 */
function document(): string {
  const origin = SITE.domain;

  const lines = [
    "# Best IPTV VIP",
    "",
    "> Marketing site for an IPTV subscription (live channels, films and series) under the name Best IPTV VIP. Access is requested through WhatsApp or a form on the site. This file lists published URLs on the canonical host. It does not state prices, ratings, reviews, or a guarantee of stream stability or of the legal status of the streams.",
    "",
    `Canonical host: ${origin}`,
    "",
    "## Main pages",
    "",
    `${link(origin, "/", "Home")}: product presentation. A FAQ section is on this page at ${origin}/#faq. There is no separate /faq URL.`,
    `${link(origin, "/pricing", "Pricing")}: plan list published by the site.`,
    `${link(origin, "/free-trial", "Free trial")}: trial request via WhatsApp or a form. There is no /trial or /essai URL.`,
    `${link(origin, "/refer", "Refer")}: referral page.`,
    `${link(origin, "/channels", "Channels")}: channel lineup index.`,
    `${link(origin, "/devices", "Devices")}: device index. Firestick setup is ${origin}/guides/firestick, not /firestick.`,
    `${link(origin, "/blog", "Blog")}: article index.`,
    `${link(origin, "/compare", "Compare")}: comparison index.`,
    `${link(origin, "/contact", "Contact")}: WhatsApp number and email published on this page.`,
    `${link(origin, "/privacy", "Privacy")}: privacy text published by the site.`,
    `${link(origin, "/terms", "Terms")}: terms text published by the site.`,
    `${link(origin, "/refund", "Refund")}: refund text published by the site.`,
    `${link(origin, "/status", "Status")}: network status page published by the site.`,
    `${link(origin, "/checkout/success", "Checkout success")}: screen after a payment return.`,
    `${link(origin, "/checkout/cancel", "Checkout cancel")}: screen when a payment is cancelled.`,
    "",
    "## Channel lineups",
    "",
    ...COUNTRY_SLUGS.map((slug) => link(origin, `/channels/${slug}`, COUNTRY_LABEL[slug])),
    "",
    "## Device guides",
    "",
    ...DEVICE_SLUGS.map((slug) => link(origin, `/guides/${slug}`, DEVICE_LABEL[slug])),
    "",
    "## Blog",
    "",
    ...BLOG_SLUGS.map((slug) => link(origin, `/blog/${slug}`, BLOG_LABEL[slug])),
    "",
    "## Comparisons",
    "",
    ...COMPARE_SLUGS.map((slug) => link(origin, `/compare/${slug}`, COMPARE_LABEL[slug])),
    "",
    "## Notes",
    "",
    "- The homepage includes copy in English, French, and Arabic.",
    "- Metadata on some pages advertises locales en, fr, ar, es, and de through a ?lang= query. Those queries are not separate pages.",
    "- /ops exists, is marked noindex, and is disallowed in robots.txt. It is not listed here.",
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(document(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
