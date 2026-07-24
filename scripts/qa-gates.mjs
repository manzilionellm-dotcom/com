#!/usr/bin/env node
// Publication gates. "Green" means this script exits 0 — never an opinion.
//
// It reads the built HTML in .next/server/app, so it checks what visitors and
// crawlers actually receive rather than what the source appears to intend.
// Run `pnpm build` first. `--self-test` verifies the gates themselves.

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILD_DIR = ".next/server/app";
const DOMAIN = "https://bestiptv-vip.com";

const failures = [];
const warnings = [];
const fail = (gate, detail) => failures.push(`${gate}: ${detail}`);
const warn = (gate, detail) => warnings.push(`${gate}: ${detail}`);

/* ------------------------------------------------------------------ */
/* Extraction                                                          */
/* ------------------------------------------------------------------ */

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (entry.endsWith(".html")) out.push(path);
  }
  return out;
}

export function parsePage(html, route) {
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const hreflang = [...html.matchAll(/rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map(
    (m) => ({ lang: m[1], href: m[2] }),
  );
  const jsonLdRaw = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => m[1],
  );
  const internalLinks = new Set(
    [...html.matchAll(/href="(\/[^"#?][^"]*)"/g)].map((m) => m[1].replace(/\/$/, "") || "/"),
  );
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    route,
    canonicals,
    title,
    description,
    hreflang,
    jsonLdRaw,
    internalLinks,
    words: text.split(" ").filter(Boolean).length,
    text,
  };
}

/* ------------------------------------------------------------------ */
/* Gates                                                               */
/* ------------------------------------------------------------------ */

// Pages excluded from indexing gates: not linkable landing pages.
const NON_INDEXED = new Set(["/_not-found", "/checkout/success", "/checkout/cancel"]);

// Claims that cannot be traced to a source. These deindex sites and attract
// consumer-protection complaints, so they are a hard stop rather than a warning.
export const FABRICATION_PATTERNS = [
  { re: /\b\d{1,3},\d{3}\+?\s+(customers|clients|reviews|avis)\b/i, why: "invented customer/review count" },
  // A decimal is required: ratings are written "4.9/5". A bare "4/5" also
  // occurs inside channel lists such as "France 2/3/4/5", which is not a claim.
  { re: /\b\d[.,]\d\s*\/\s*5\b/, why: "star rating with no auditable review source" },
  { re: /⭐{3,}/, why: "star-rating badge with no auditable review source" },
  { re: /\b(?:world'?s\s+)?#\s?1\b/i, why: "unsubstantiated #1 ranking claim" },
  { re: /\b99\.9\d?%\s*(uptime|sla)/i, why: "uptime figure with no monitoring behind it" },
  { re: /\ball systems operational\b/i, why: "hard-coded live status" },
  { re: /"aggregateRating"/, why: "aggregateRating markup without a real review corpus" },
];

const SECRET_PATTERNS = [
  { re: /\bsk_live_[A-Za-z0-9]{10,}/, why: "live secret key" },
  { re: /\bghp_[A-Za-z0-9]{20,}/, why: "GitHub token" },
  { re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, why: "private key" },
  { re: /CRYPTOMUS_PAYMENT_API_KEY\s*[:=]\s*["'][^"'$][^"']+["']/, why: "hard-coded payment API key" },
];

function checkPage(page) {
  const { route } = page;

  // Exactly one canonical, pointing at this route. Two canonicals let the
  // crawler pick, and the layout used to inject a second one for the homepage.
  if (page.canonicals.length !== 1) {
    fail("canonical", `${route} has ${page.canonicals.length} canonical tags (expected 1)`);
  } else if (!NON_INDEXED.has(route)) {
    const expected = route === "/index" ? DOMAIN : `${DOMAIN}${route}`;
    const actual = page.canonicals[0].replace(/\/$/, "");
    if (actual !== expected.replace(/\/$/, "")) {
      fail("canonical", `${route} points at ${actual} (expected ${expected})`);
    }
  }

  // hreflang must be self-referential and describe URLs that really differ.
  for (const alt of page.hreflang) {
    if (alt.href.includes("?lang=")) {
      fail("hreflang", `${route} declares ${alt.lang} -> ${alt.href}, a URL that serves identical HTML`);
    }
  }
  if (page.hreflang.length > 0) {
    const selfRef = page.hreflang.some((a) => a.href.replace(/\/$/, "").endsWith(route === "/index" ? "" : route));
    if (!selfRef) fail("hreflang", `${route} declares alternates but no self-referential entry`);
  }

  if (!NON_INDEXED.has(route)) {
    if (!page.title) fail("title", `${route} has no <title>`);
    if (page.title.length > 65) fail("title", `${route} title is ${page.title.length} chars (max 65)`);
    const brandCount = (page.title.match(/Best IPTV VIP/g) || []).length;
    if (brandCount > 1) fail("title", `${route} repeats the brand ${brandCount}x in the title`);

    if (!page.description) fail("meta-description", `${route} has no meta description`);
    else if (page.description.length < 110 || page.description.length > 175) {
      fail("meta-description", `${route} description is ${page.description.length} chars (want 110-175)`);
    } else if (page.description.length < 140 || page.description.length > 165) {
      warn("meta-description", `${route} description is ${page.description.length} chars (ideal 140-165)`);
    }

    if (page.words < 250) fail("thin-content", `${route} renders only ${page.words} words`);
    if (page.internalLinks.size < 3) {
      fail("internal-links", `${route} has ${page.internalLinks.size} internal links (min 3)`);
    }
  }

  // Structured data must parse, and must describe this page once.
  const types = [];
  for (const raw of page.jsonLdRaw) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      fail("schema", `${route} has JSON-LD that does not parse`);
      continue;
    }
    for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
      if (node && node["@type"]) types.push(node["@type"]);
    }
  }
  for (const type of ["FAQPage", "BreadcrumbList", "Product"]) {
    const n = types.filter((t) => t === type).length;
    if (n > 1) fail("schema", `${route} emits ${n} ${type} blocks (expected at most 1)`);
  }

  for (const { re, why } of FABRICATION_PATTERNS) {
    const hit = page.text.match(re) || page.jsonLdRaw.join(" ").match(re);
    if (hit) fail("unverifiable-claim", `${route} publishes "${String(hit[0]).slice(0, 60)}" — ${why}`);
  }

  if (/\{\{[^}]+\}\}/.test(page.text)) {
    fail("placeholder", `${route} publishes an unrendered {{placeholder}}`);
  }
}

function checkSourceSecrets() {
  const roots = ["app", "lib", "components", "scripts", ".company"];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    const files = [];
    const walkSrc = (dir) => {
      for (const entry of readdirSync(dir)) {
        if (entry === "node_modules" || entry === ".next") continue;
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walkSrc(path);
        else files.push(path);
      }
    };
    walkSrc(root);
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      for (const { re, why } of SECRET_PATTERNS) {
        if (re.test(content)) fail("secret", `${file} appears to contain a ${why}`);
      }
    }
  }
}

function checkSitemap(pages) {
  const sitemapBody = join(BUILD_DIR, "sitemap.xml.body");
  let urls = [];
  if (existsSync(sitemapBody)) {
    urls = [...readFileSync(sitemapBody, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  } else {
    warn("sitemap", "no prerendered sitemap body found — skipped URL-count comparison");
    return;
  }
  const indexable = pages
    .filter((p) => !NON_INDEXED.has(p.route))
    .map((p) => (p.route === "/index" ? `${DOMAIN}/` : `${DOMAIN}${p.route}`));
  const missing = indexable.filter((u) => !urls.includes(u) && !urls.includes(u.replace(/\/$/, "")));
  if (missing.length) fail("sitemap", `${missing.length} built page(s) absent from sitemap: ${missing.slice(0, 5).join(", ")}`);
  for (const url of urls) {
    if (url.includes("?lang=")) fail("sitemap", `sitemap lists a language-parameter URL: ${url}`);
  }
}

/* ------------------------------------------------------------------ */
/* Self-test                                                           */
/* ------------------------------------------------------------------ */

function selfTest() {
  const cases = [
    ["4.9/5 from 12,847 customers", true],
    ["World's #1 Premium IPTV", true],
    ["99.9% uptime SLA", true],
    ["ALL SYSTEMS OPERATIONAL", true],
    ["24h free trial before you pay, no contract", false],
    ["22,000+ live channels in 4K", false],
  ];
  let bad = 0;
  for (const [sample, shouldFlag] of cases) {
    const flagged = FABRICATION_PATTERNS.some((p) => p.re.test(sample));
    if (flagged !== shouldFlag) {
      console.error(`self-test FAILED: "${sample}" flagged=${flagged}, expected=${shouldFlag}`);
      bad++;
    }
  }
  const page = parsePage(
    '<html><head><title>T</title><link rel="canonical" href="https://x/a"/></head><body><a href="/b">b</a></body></html>',
    "/a",
  );
  if (page.canonicals.length !== 1 || page.internalLinks.size !== 1) {
    console.error("self-test FAILED: parser did not extract canonical/link counts");
    bad++;
  }
  if (bad) {
    console.error(`\nqa-gates self-test: ${bad} failure(s)`);
    process.exit(1);
  }
  console.log("qa-gates self-test: OK");
  process.exit(0);
}

/* ------------------------------------------------------------------ */

if (process.argv.includes("--self-test")) selfTest();

if (!existsSync(BUILD_DIR)) {
  console.error(`qa-gates: ${BUILD_DIR} not found — run \`pnpm build\` first.`);
  process.exit(1);
}

const pages = walk(BUILD_DIR)
  .sort()
  .map((file) => {
    const route = "/" + file.replace(`${BUILD_DIR}/`, "").replace(/\.html$/, "");
    return parsePage(readFileSync(file, "utf8"), route);
  });

for (const page of pages) checkPage(page);

const titles = new Map();
for (const page of pages) {
  if (NON_INDEXED.has(page.route)) continue;
  const seen = titles.get(page.title);
  if (seen) fail("title", `duplicate title on ${seen} and ${page.route}: "${page.title}"`);
  else titles.set(page.title, page.route);
}

checkSitemap(pages);
checkSourceSecrets();

console.log(`qa-gates: checked ${pages.length} built pages`);
for (const w of warnings) console.log(`  warn  ${w}`);
if (failures.length) {
  console.error(`\nqa-gates: ${failures.length} FAILURE(S)`);
  for (const f of failures) console.error(`  fail  ${f}`);
  process.exit(1);
}
console.log(`qa-gates: PASS (${warnings.length} warning(s))`);
