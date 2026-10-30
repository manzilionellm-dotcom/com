#!/usr/bin/env node
// Génère public/llms.txt depuis aio.config.json + l'index d'URLs déjà publié.
// Usage: node scripts/aio-llms.mjs
import fs from "node:fs";

const c = JSON.parse(fs.readFileSync(new URL("../aio.config.json", import.meta.url), "utf8"));
const L = c.defaultLang;
const i = c.i18n[L];
const origin = c.siteUrl;
const usd = (n) => (n === 0 ? "free ($0)" : `$${n}`);

const wc = (s) => [(s.match(/\S+/g) || []).length, (s.match(/[\p{L}\p{N}€$%]+(?:['’][\p{L}]+)?/gu) || []).length];
for (const f of i.faq) {
  if (!/\?\s*$/.test(f.q)) {
    console.error("Question EN sans ? final:", f.q);
    process.exit(1);
  }
  const [w1, w2] = wc(f.a);
  if (w1 < 40 || w1 > 60 || w2 < 40 || w2 > 60) {
    console.error(`Réponse hors 40–60 mots (${w1}/${w2}): ${f.q}`);
    process.exit(1);
  }
}

const link = (path, label) => `- [${label}](${origin}${path})`;

const lines = [];
lines.push(
  `# ${c.siteName}`,
  "",
  `> Marketing site for an IPTV subscription (live channels, films and series) under the name ${c.siteName}. Access is requested through WhatsApp or a form on the site. This file lists published URLs on the canonical host, plus the prices, technical points and questions already published on the site or in its source. It does not state ratings, reviews, or a guarantee of stream stability or of the legal status of the streams.`,
  "",
  `Canonical host: ${origin}`,
  "",
  "## Services",
  "",
  `- IPTV subscription (live channels, films and series). Ordering and support on WhatsApp: ${c.contact.whatsapp}`,
  `- Email published on the site: ${c.contact.email}`,
  `- Free 24 hour trial, no card required, as stated on the homepage and on ${origin}/free-trial`,
  `- Website: ${origin}/ (homepage copy: en, fr, ar)`,
  "",
  "## Prices",
  "",
);
for (const p of c.plans) {
  const days = p.durationDays == null ? "" : ` (${p.durationDays} day)`;
  lines.push(`- ${p.name[L]}: ${p.price === 0 ? "free ($0)" : usd(p.price)}${days}`);
}
lines.push(
  "",
  "The pricing page headline also says plans start from $5 a month. That figure is the 12 month plan at $60 divided across the year on the page. Each paid term is billed once.",
  "",
  "## Technical characteristics",
  "",
);
const t = c.tech;
lines.push(`- Maximum picture quality: ${t.maxResolution ?? "not stated"}`);
lines.push(`- Devices: ${t.devices.join(", ")}`);
lines.push(`- Activation: ${t.activationMinutes ?? "not stated"}`);
lines.push(`- Bitrates / minimum bandwidth: ${t.bitrate ?? "not published as a single figure"}`);
lines.push(`- Channel count: ${t.channelCount ?? "not stated"}`);
lines.push(`- Films and series on demand: ${t.vodCount ?? "not stated"}`);
lines.push("", `## Frequently asked questions (${i.faq.length})`, "");
for (const f of i.faq) lines.push(`### ${f.q}`, "", f.a, "");

lines.push(
  "## Main pages",
  "",
  `${link("/", "Home")}: product presentation. The FAQ section is on this page at ${origin}/#faq. There is no separate /faq URL.`,
  `${link("/pricing", "Pricing")}: plan list published by the site.`,
  `${link("/free-trial", "Free trial")}: trial request via WhatsApp or a form. There is no /trial or /essai URL.`,
  `${link("/refer", "Refer")}: referral page.`,
  `${link("/channels", "Channels")}: channel lineup index.`,
  `${link("/devices", "Devices")}: device index. Firestick setup is ${origin}/guides/firestick, not /firestick.`,
  `${link("/blog", "Blog")}: article index.`,
  `${link("/compare", "Compare")}: comparison index.`,
  `${link("/contact", "Contact")}: WhatsApp number and email published on this page.`,
  `${link("/privacy", "Privacy")}: privacy text published by the site.`,
  `${link("/terms", "Terms")}: terms text published by the site.`,
  `${link("/refund", "Refund")}: refund text published by the site.`,
  `${link("/status", "Status")}: network status page published by the site.`,
  `${link("/checkout/success", "Checkout success")}: screen after a payment return.`,
  `${link("/checkout/cancel", "Checkout cancel")}: screen when a payment is cancelled.`,
  "",
  "## Channel lineups",
  "",
  link("/channels/arabic", "Arabic IPTV (MENA)"),
  link("/channels/english", "English IPTV (USA / UK)"),
  link("/channels/french", "French IPTV (France / Belgique / Suisse)"),
  link("/channels/spanish", "Spanish IPTV (España / LATAM)"),
  link("/channels/turkish", "Turkish IPTV (Türkiye)"),
  link("/channels/indian", "Indian IPTV (Hindi / Tamil / Telugu)"),
  link("/channels/german", "German IPTV (Deutschland / Österreich / Schweiz)"),
  link("/channels/african", "African IPTV (Afrique francophone & anglophone)"),
  "",
  "## Device guides",
  "",
  link("/guides/firestick", "Amazon Firestick"),
  link("/guides/smart-tv", "Smart TV (Samsung, LG, Sony)"),
  link("/guides/android", "Android TV / Android Box"),
  link("/guides/ios", "iPhone / iPad / Apple TV"),
  link("/guides/mag-box", "MAG Box (Infomir)"),
  link("/guides/pc-mac", "PC / Mac / Linux"),
  "",
  "## Blog",
  "",
  link("/blog/best-iptv-2026", "Buyer's guide article (2026)"),
  link("/blog/how-to-fix-iptv-buffering", "Buffering troubleshooting article"),
  link("/blog/iptv-vs-cable-tv", "IPTV and cable TV article"),
  link("/blog/how-to-watch-iptv-in-4k", "4K setup article"),
  link("/blog/iptv-smarters-vs-tivimate", "IPTV Smarters and TiviMate article"),
  "",
  "## Comparisons",
  "",
  link("/compare/iptv-vs-cable-tv", "IPTV vs cable TV"),
  link("/compare/iptv-vs-netflix", "IPTV vs Netflix"),
  link("/compare/iptv-vs-disney-plus", "IPTV vs Disney+"),
  link("/compare/iptv-vs-sling-tv", "IPTV vs Sling TV"),
  link("/compare/iptv-vs-youtube-tv", "IPTV vs YouTube TV"),
  "",
  "## Notes",
  "",
  "- The homepage includes copy in English, French, and Arabic.",
  "- Metadata on some pages advertises locales en, fr, ar, es, and de through a ?lang= query. Those queries are not separate pages. Spanish and German body copy is not in the homepage dictionary, so this file does not invent it.",
  "- /ops exists, is marked noindex, and is disallowed in robots.txt. It is not listed here.",
  "- Prices above are the amounts in the site source (homepage plans, pricing page, and the existing Offer JSON-LD). Where the homepage rounds a count and another page gives a different count, both are stated.",
  "",
);

fs.mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../public/llms.txt", import.meta.url), lines.join("\n").trimEnd() + "\n");
console.log("public/llms.txt écrit (" + i.faq.length + " Q/R)");
