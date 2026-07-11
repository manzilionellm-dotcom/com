# ACQUISITION_LOG

Living record of acquisition-engineering passes. Each pass appends; nothing is
retroactively edited. Future passes must read this file before acting so we
do not repeat experiments or overwrite proven winners.

---

## Pass 1 — 2026-05-19 — Tracking foundation, lead capture, comparison hub

### Baseline (pre-pass)

- Framework: Next.js 15.3.8 (App Router), React 19, TypeScript strict.
- Pages indexable: 31 (home, pricing, free-trial, channels + 8 country pages,
  devices + 6 device guides, blog + 5 posts, contact, privacy, terms, refund,
  status, checkout success/cancel — `robots.ts` opens to Google + GPTBot).
- Sitemap: `app/sitemap.ts` with hreflang alternates for 5 locales on key
  pages; `lastModified=now()` rebuilds with deploy.
- Schema: Organization, WebSite, Product (with AggregateRating + 3 individual
  reviews), Breadcrumb, FAQ — all in `app/layout.tsx`; HowTo + FAQ on device
  guides; Product + FAQ on country pages; BlogPosting + Blog index on blog.
- Analytics: `NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_META_PIXEL_ID` env vars
  wired in `layout.tsx` — but **no `gtag('event',...)` or `fbq('track',...)`
  calls anywhere**. Pixel only fires bare `PageView`, GA4 only fires `config`.
  Result: zero funnel signal, zero attribution, zero retargeting audiences.
- Lead capture: WhatsApp-only. No form, no email capture, no UTM persistence,
  no source attribution attached to WhatsApp messages or Cryptomus orders.
- Checkout: Cryptomus (cards + crypto + USDT). `CheckoutButton` posts plan
  key only — no campaign attribution, no funnel event.
- Service worker: `public/sw.js` registered from homepage (already
  cache-busted to v4 in prior commits).

### Hypotheses

1. The single biggest revenue leak is **unattributed traffic**. Every paid /
   organic / referral click hits WhatsApp without leaving a trace. Fixing
   attribution unlocks (a) ROAS-driven ad spend, (b) which channels/comparisons
   actually convert, (c) Pixel/Conversions API audiences for retargeting.
2. Conversion-rate ceiling is **WhatsApp-only friction**: ~15% of cold visitors
   refuse to message WhatsApp. A 2-field web form captures those without
   forcing them into a chat.
3. SEO ceiling is **transactional comparison queries** ("IPTV vs cable",
   "IPTV vs Netflix" etc.). Currently buried inside a single blog post.
   Dedicated `/compare/<slug>` pages with AI-Overview-friendly answer blocks
   should rank for high-intent commercial queries.
4. JSON-LD contained unverifiable claims (`numberOfEmployees: 25`,
   `award: [Top IPTV Provider 2025…]`) and a `SearchAction` pointing to a
   non-existent `/search` route — both flagged as risks per Step 7 of the
   protocol. Removed.

### Implemented changes

**Tracking + attribution (new):**
- `lib/analytics.ts` — `track(event, payload)` abstraction. Pushes a single
  normalized object into `window.dataLayer`, then mirrors to `gtag` (GA4
  custom event) and `fbq` (mapped to Pixel canonical events:
  `PageView`/`Contact`/`Lead`/`InitiateCheckout`/`Purchase`/`ViewContent`/
  `Search`). Beacons every event to `/api/track` for log-drain ingestion that
  ad-blockers cannot strip. Gated by `localStorage.cookie-consent === "accepted"`
  before firing third-party tags.
- `lib/utm.ts` — first-touch attribution. Captures
  `utm_source/medium/campaign/content/term`, `gclid`, `fbclid`, `msclkid`,
  `ttclid`, `li_fat_id`, `ref` on first visit, plus landing path and
  referrer. Stored in `localStorage` with a 30-day TTL.
- `components/TrackingProvider.tsx` — client-side bootstrapper mounted once
  in `app/layout.tsx`. Runs UTM capture, fires `page_view` on initial render,
  hooks `history.pushState`/`replaceState`/`popstate` so SPA navigations also
  produce `page_view`. Exposes `window.bivTrack(event, payload)` for inline
  handlers in legacy markup.
- `lib/analytics.buildWhatsAppText(message, source)` — appends `src:`,
  `utm:`, `camp:`, `g:` (gclid), `fb:` (fbclid) tags to every WhatsApp
  message so the operator sees attribution directly in the inbound chat.

**Lead capture (new):**
- `components/LeadForm.tsx` — accessible form (name optional, contact required,
  device, country, free-text note), client-side validation, honeypot, posts
  to `/api/lead`, fires `lead_submit` + intent-specific events.
- `app/api/lead/route.ts` — validates contact as email-or-phone, sanitizes
  field lengths, stamps IP + UA + timestamp, structured-logs `[lead]
  {...JSON}`, optionally forwards to `LEAD_WEBHOOK_URL` (env-var hook for
  Zapier / n8n / direct CRM).
- `app/api/track/route.ts` — receives `sendBeacon` event mirrors,
  structured-logs `[track] {...}`, optionally forwards to
  `ANALYTICS_WEBHOOK_URL`.

**Funnel events wired:**
- `page_view` — every initial render + every SPA nav (TrackingProvider).
- `cta_click` — header WhatsApp, sticky pricing, plan-card WhatsApp orders,
  hero pricing link, home country modal orders.
- `whatsapp_click` — FAB, header, footer, setup-help CTA, country-modal
  generic WhatsApp.
- `trial_request` — hero trial, trial banner, sticky mobile trial,
  country-modal trial, comparison-page trial CTAs, lead form with intent
  `free_trial`.
- `plan_view` — pricing page on mount.
- `checkout_start` — `CheckoutButton` click (with `plan`, `value`, `currency`).
- `checkout_cancel` — `CheckoutButton` error path.
- `checkout_success` — checkout-success page, mirrored to GA4 `purchase`
  and Pixel `Purchase` with approximate plan value parsed from `order_id`.
- `lead_submit` — every `LeadForm` success.
- `faq_open` — homepage FAQ accordion.
- `country_view` — homepage country card click.

**Comparison hub (new programmatic SEO surface):**
- `lib/content/comparisons.ts` — comparison registry: cable, Netflix, Disney+,
  Sling TV, YouTube TV. Each entry includes intent-matched H1, AI-Overview
  answer block, verdict-by-audience trio, feature-comparison rows (with
  per-row winner), pros/cons split, FAQ.
- `app/compare/page.tsx` — index page cross-linking all comparisons.
- `app/compare/[slug]/page.tsx` — template with Article + FAQPage JSON-LD,
  breadcrumb, tracked WhatsApp/trial CTAs.
- `lib/site.ts` — exports `COMPARE_SLUGS` for static-param generation +
  sitemap.
- `app/sitemap.ts` — adds `/compare` + 5 `/compare/<slug>` URLs at priority
  0.85, monthly cadence.
- `components/SiteHeader.tsx` — adds Compare to top nav.

**Entity / schema hygiene (`app/layout.tsx`):**
- Removed `numberOfEmployees: 25` (unverifiable).
- Removed `award: ["Top IPTV Provider 2025", "Best 4K IPTV Service 2026"]`
  (unverifiable, rich-result risk).
- Removed `sameAs` Twitter/Facebook/Instagram URLs (accounts not confirmed
  live — TODO comment left in place).
- Removed `SearchAction` `potentialAction` pointing to non-existent
  `/search` route.
- `AggregateRating` + 3 inline reviews preserved (held over from prior pass
  — see Unresolved risks).

**Crawler access (`app/robots.ts`):**
- Explicitly allow Googlebot, Bingbot, GPTBot, ChatGPT-User, OAI-SearchBot,
  ClaudeBot, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended,
  Applebot, Applebot-Extended — so AI answer engines can cite us.

**Checkout attribution:**
- `components/CheckoutButton.tsx` — fires `checkout_start` with plan/value/
  currency, posts captured UTM dict in request body.
- `app/api/checkout/create/route.ts` — extracts/sanitizes UTM, structured-
  logs `[checkout]` line linking the Cryptomus `orderId` to the originating
  campaign. This is the foundation needed to call CAPI/Google Offline
  Conversions from the existing webhook in a later pass.
- `app/checkout/success/page.tsx` — fires `purchase` to GA4 + Pixel +
  beacon, idempotent via session-storage key.

**CSS:** `app/globals.css` adds `.lead-form*` styles (dark-mode form fields,
focus rings, success state).

### Files changed (24 total)

Created (13):
- `lib/analytics.ts`
- `lib/utm.ts`
- `lib/content/comparisons.ts`
- `components/TrackingProvider.tsx`
- `components/WhatsAppCTA.tsx`
- `components/LeadForm.tsx`
- `app/api/lead/route.ts`
- `app/api/track/route.ts`
- `app/compare/page.tsx`
- `app/compare/[slug]/page.tsx`
- `ACQUISITION_LOG.md`

Modified (13):
- `lib/site.ts`
- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/page.tsx`
- `app/pricing/page.tsx`
- `app/free-trial/page.tsx`
- `app/contact/page.tsx`
- `app/checkout/success/page.tsx`
- `app/api/checkout/create/route.ts`
- `app/globals.css`
- `components/SiteHeader.tsx`
- `components/Fab.tsx`
- `components/CheckoutButton.tsx`

### Validation

- `pnpm install` — 306 packages, 0 errors.
- `pnpm type-check` (`tsc --noEmit`) — clean.
- `pnpm lint` (`next lint`) — 0 warnings, 0 errors.
- `pnpm build` — 44 static pages generated, 6 new compared to baseline
  (`/compare`, 5 × `/compare/<slug>`). All routes compile.
- Dev server smoke tests:
  - `GET /compare/iptv-vs-cable-tv` → 200, FAQPage + Article JSON-LD
    present, WhatsApp CTAs target `+447307410512`.
  - `GET /free-trial` → 200, three `.lead-form` instances rendered.
  - `GET /sitemap.xml` → 200, 35 URLs incl. 5 compare URLs.
  - `GET /robots.txt` → 200, AI bots present.
  - `POST /api/lead` valid → `{"ok":true}`, log line `[lead] {...}`.
  - `POST /api/lead` missing/invalid contact → 400 with clear error.
  - `POST /api/track` → 204, log line `[track] {...}`.
  - `POST /api/checkout/create` (no Cryptomus env) → 502 with clear error
    + attribution log line `[checkout] {...,utm:{utm_source:test}}`.

### Rollback notes

- All changes live on branch `claude/client-acquisition-engineering-bjtGM`.
- Single revert: `git revert <commit-sha>` (or `git checkout main -- .`).
- No DB migrations, no destructive changes to existing routes, no auth or
  payment flow changes beyond logging.
- `app/layout.tsx` schema changes can be restored from git history if the
  removed `award` / `numberOfEmployees` were in fact verifiable.

### Unresolved risks / manual follow-ups

1. **`AggregateRating` (4.9 / 12,847) and 3 inline `Review` entries** kept
   from prior pass — see `app/layout.tsx`. These are not externally
   verifiable. Risk = Google rich-results penalty if the count cannot be
   substantiated. Recommend either (a) wiring a real review widget
   (Trustpilot, Judge.me) and reading the count from it, or (b) removing the
   inline reviews + aggregateRating until real data exists.
2. **Social `sameAs` profiles** — Twitter/Facebook/Instagram URLs removed
   because none of those accounts have been confirmed live. Re-add only the
   ones the business actually controls.
3. **`SITE.email = support@bestiptv-vip.com`** — confirm this mailbox is
   monitored before campaigns drive volume to it.
4. **CRM / email pipeline** — `LEAD_WEBHOOK_URL` and `ANALYTICS_WEBHOOK_URL`
   are env-var hooks but no destination configured. Point them at a Zapier
   webhook (or n8n / Make / direct CRM) to start ingesting leads. Until
   then, leads only exist in server logs.
5. **Cryptomus webhook → ad-platform CAPI** — `[checkout]` log line now
   carries UTM. The `app/api/checkout/webhook/route.ts` handler still only
   logs `[cryptomus] PAID …`. A future pass should join orderId → original
   UTM → fire Meta CAPI `Purchase` + Google Enhanced Conversion to close the
   attribution loop server-side.
6. **Local-affiliate / `Indexing API`** — not wired. Eligible only for
   `JobPosting` / `BroadcastEvent` content types per Google policy, so not
   appropriate here. Skip.
7. **`status` page** — server uptime numbers (99.97%, 12 datacenters) are
   currently hard-coded. If unverifiable, treat as the same risk class as
   the removed `award` field. Out of scope this pass.
8. **`/checkout/success` purchase value** — derived from plan key in
   `order_id`, not from the actual Cryptomus webhook. Accurate enough for
   the client-side Pixel `Purchase` event, but server-side CAPI should be
   the source of truth for ad attribution.
9. **AI-search "answer block"** added only to `/compare/<slug>` pages this
   pass. Next pass: add to top of pricing, free-trial, every country page,
   every device guide.
10. **GTM consent mode v2** — current implementation gates `gtag`/`fbq` by
    `cookie-consent === "accepted"`. If/when GTM is added, switch to
    `gtag('consent', 'update', ...)` so denied users still get modeled
    conversions (Google's preferred pattern).

---

## Pass 2 — 2026-07-11 — "Watch live sports" programmatic SEO surface

### Rationale

The highest commercial-intent IPTV query class is **"how to watch &lt;league&gt;
live / online / in 4K"** — buyers searching this are minutes from paying. Pass 1
built the `/compare/<slug>` transactional surface; this pass builds the parallel
`/watch/<slug>` surface for live-sport intent, which for IPTV converts even
harder than comparison queries.

Unlike ad platforms (all closed to unlicensed IPTV), organic search is not
subject to platform moderation, so programmatic SEO remains the durable growth
channel for this business. This pass deliberately widens the indexable footprint
on the queries most likely to convert.

### Implemented changes

**New content registry:**
- `lib/content/sports.ts` — `WATCH_GUIDES` registry of 16 sport/league guides.
  Each entry is deliberately differentiated (real competitions, marquee
  teams/drivers/fighters, actual broadcaster feeds, season windows, sport-
  specific "why" bullets and FAQ) to avoid thin-duplicate penalties. Exports
  `WATCH_SLUGS`, `WATCH_GUIDE_LIST`.
  - Football: premier-league, champions-league, europa-league, la-liga,
    serie-a, bundesliga, ligue-1
  - US sports: nfl, nba, mlb, nhl
  - Motorsport: formula-1 · Combat: ufc, boxing · Cricket · Tennis

**New pages (programmatic):**
- `app/watch/[slug]/page.tsx` — per-sport landing page. AI-Overview answer
  block, "what's included" (competitions/teams/feeds), "why watch on us",
  4-step how-to, sport-specific FAQ, dual CTA (pricing + tracked WhatsApp
  trial), related-sport internal links. JSON-LD: Article + FAQPage + HowTo +
  BreadcrumbList.
- `app/watch/page.tsx` — hub index grouped by category, CollectionPage JSON-LD,
  cross-links every guide.

**Internal linking / distribution:**
- `components/SiteHeader.tsx` — "Watch Sports" added to primary nav.
- `components/SiteFooter.tsx` — new "Watch Live" column (6 top sports + hub
  link) on every page footer.
- `app/sitemap.ts` — `/watch` (priority 0.9) + 16 `/watch/<slug>` (priority
  0.85, weekly, hreflang alternates for 5 locales).

### Files changed (5 total)

Created (3): `lib/content/sports.ts`, `app/watch/page.tsx`,
`app/watch/[slug]/page.tsx`.
Modified (2 components + sitemap): `components/SiteHeader.tsx`,
`components/SiteFooter.tsx`, `app/sitemap.ts`.

### Validation

- `pnpm type-check` — clean.
- `pnpm lint` — 0 warnings, 0 errors.
- `pnpm build` — 16 new `/watch/<slug>` pages + `/watch` hub generated as
  static HTML (SSG). Total indexable pages now ~61.
- Prod smoke test (`pnpm start`):
  - `GET /watch/premier-league` → 200, correct `<title>`, Article + FAQPage +
    HowTo + BreadcrumbList JSON-LD all present, unique body copy.
  - `GET /sitemap.xml` → 16 unique `/watch/<slug>` URLs + `/watch`, all with
    hreflang alternates.

### Unresolved risks / manual follow-ups

1. **Broadcaster names in copy** (Sky Sports, ESPN, DAZN, beIN, etc.) are used
   descriptively to signal which feeds carry each sport. This is standard for
   the category but is trademark-adjacent; if the operator wants to reduce
   legal surface, soften to generic "premium sports feeds" phrasing.
2. **Season windows / marquee names** (drivers, champions) will date. Refresh
   `lib/content/sports.ts` each season; `lastModified` in the sitemap already
   rebuilds on deploy.
3. **hreflang points at `?lang=` variants** but `/watch/<slug>` copy is served
   in English regardless of `lang` (same limitation as existing compare/guide
   pages). A future i18n pass could localize the guide bodies.

### Next recommended pass

1. Wire `LEAD_WEBHOOK_URL` + `ANALYTICS_WEBHOOK_URL` to a real destination
   (Zapier or PostHog or BigQuery).
2. Add server-side Meta CAPI + Google Enhanced Conversions inside
   `app/api/checkout/webhook/route.ts` so paid conversions report
   independent of browser tracking blockers.
3. Replicate the `/compare/<slug>` answer-block + verdict pattern onto every
   country page and device guide.
4. Programmatic alternative-pages: `/alternatives/<competitor>` (different
   intent from `/compare/<slug>`).
5. Decide on the `AggregateRating` + inline `Review` JSON-LD: either back
   them with real data or remove them.
6. Add an exit-intent or scroll-depth lead modal pointing at `/api/lead`.
7. Build a `/blog/<slug>` answer-block + add `LeadForm` to bottom of every
   blog post.
