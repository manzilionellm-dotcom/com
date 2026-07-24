# Roadmap — bestiptv-vip.com

Ordered by expected value per unit of effort. Effort is agent-run days.
Nothing here may be reported as done until the three gates (`pnpm build`,
`pnpm type-check`, `node scripts/qa-gates.mjs`) exit 0 on the change.

## 1. Competitive intelligence pass (T-CI) — currently unrun
**Impact:** high. Every positioning, pricing and title decision so far has been made
without a single observed competitor. This is the largest blind spot in the project.
**Effort:** low (1 run). Outbound SERP fetching for the head terms, then fill
`.company/intel/concurrents.md` and `marches.md` — each value with a source URL and a
fetch date, per the zero-fabrication rule. No competitor name gets written from memory.

## 2. Google Search Console + Bing Webmaster Tools connection
**Impact:** high. Indexation is currently **UNMEASURED** — we cannot tell whether the
37 pages are indexed, and cannot detect a de-indexing event caused by our own changes.
Also the only way to see real query data instead of guessed keywords.
**Effort:** low (verification token + property setup, then a reporting pull).

## 3. Payment-confirmed conversion loop
**Impact:** high. Until purchases are confirmed server-side, revenue is unmeasurable and
every "conversion" number is a click. This unblocks every CRO decision below.
**Effort:** medium. See backlog `BL-003`.

## 4. A linkable asset
**Impact:** medium-high, compounding. The site has nothing anyone would link to.
Candidates: a **device-compatibility checker** (answer the single most common pre-sale
question at scale) or a **cable-vs-IPTV savings calculator** (fed only by published,
citable operator prices — no invented savings figures).
**Effort:** medium (1–2 runs). Pick one; do not ship both half-built.

## 5. Commercial pages: `/faq-before-buying` and `/renewal`
**Impact:** medium. `/faq-before-buying` captures high-intent objection searches that
currently hit thin pages; `/renewal` gives existing customers a self-serve path instead
of an operator conversation. Both need internal links from the blog and pricing pages.
**Effort:** low-medium.

## 6. Routed server-rendered i18n (`/fr/`, `/ar/`, `/es/`, `/de/`)
**Impact:** potentially high, currently unproven. **Gated:** build this only once a
non-English market is *confirmed to convert* — evidence being operator-confirmed sales
from that language, or Search Console impressions in that language once step 2 lands.
Until then the client-only dictionaries stay unadvertised (no hreflang — see D-001).
**Effort:** high (every route, every metadata block, sitemap, hreflang cluster).

## 7. Renewal reminder drafting into `outbox/`
**Impact:** medium, on retained revenue rather than acquisition. Drafts only — the
system writes the message, an operator reads and sends it. Never automated sending
(see CLAUDE.md §6).
**Effort:** low. Depends on step 3 for a reliable purchase date.

## 8. CRO experiment on the pricing page
**Impact:** unknown until measured — which is the point.
**Gated on traffic:** do not start until the funnel can supply **200 conversions per
arm**; below that the result is noise and acting on it is worse than not testing.
Requires step 3 (payment-confirmed conversions) to define the metric.
**Effort:** medium, plus the run-time needed to reach the sample.
