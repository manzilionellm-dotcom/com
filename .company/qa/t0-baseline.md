# T0 baseline — run-001 — 2026-07-24

Measured before any file was edited. Every number here came from a command that
was actually run against the production build, not from reading the source and
inferring what it would emit.

Method: `pnpm build`, then parse the prerendered HTML in `.next/server/app/`.
That is what crawlers receive, so it is the only honest place to measure.

## Inventory

| Metric | Value | How it was measured |
|---|---|---|
| Built pages | 37 | count of `.html` files under `.next/server/app` |
| Build status | exit 0 | `pnpm build` |
| Type check | exit 0 | `tsc --noEmit` |
| Indexation rate | **UNMEASURED** | no Search Console key in the repo; no `site:` query was run, so no figure is published rather than an estimate presented as fact |
| Core Web Vitals | **UNMEASURED** | Lighthouse was not run against a deployed URL in this run |

## Blocking defects found

| # | Defect | Scope | Evidence |
|---|---|---|---|
| 1 | Two `<link rel="canonical">` per page, the first pointing at the homepage | 37 / 37 pages | `grep -o '<link rel="canonical"[^>]*>' .next/server/app/pricing.html` returned both `https://bestiptv-vip.com` and `https://bestiptv-vip.com/pricing` |
| 2 | hreflang advertised five language versions at `?lang=xx` URLs that serve byte-identical English HTML | 37 / 37 pages | rendered `<link rel="alternate" hrefLang="fr" href="…/?lang=fr">`; the homepage dictionary is client-side only, and `es` / `de` had no dictionary at all |
| 3 | Every page's hreflang set pointed at the homepage, not at itself | 37 / 37 pages | same source: alternates were hard-coded in the root layout |
| 4 | `AggregateRating` 4.9 with `reviewCount` 12,847, plus three named testimonials | site-wide (root layout + homepage, translated into 3 languages) | `lib/site.ts` held the constants; no review source exists anywhere in the repo |
| 5 | `Product`, `FAQPage` and `BreadcrumbList` JSON-LD injected on every route | 37 / 37 pages | `/privacy` and `/terms` carried product markup and a breadcrumb reading Home → Pricing → Free Trial |
| 6 | Duplicate `FAQPage` and `BreadcrumbList` blocks | 14 pages | country and guide pages emitted their own correct block plus the global one |
| 7 | A static page claiming live infrastructure status: 12 named servers, per-server uptime figures, "ALL SYSTEMS OPERATIONAL", "no incidents in the last 30 days" | `/status` | values hard-coded in `app/status/page.tsx`; nothing measures them, so the page would claim green during an outage |
| 8 | Brand repeated 2-3× in the rendered title | 12 pages | e.g. `Install IPTV on Amazon Firestick in under 5 minutes \| Best IPTV VIP \| Best IPTV VIP` — the page appended the brand that the layout template already adds |
| 9 | Titles over 60 characters | 30 / 37 pages | measured on the rendered `<title>` |
| 10 | Meta descriptions outside 150-160 characters | 27 / 37 pages | measured on the rendered tag |
| 11 | Raw visitor IP and user-agent written to application logs | `/api/track` | `console.log("[track]", …)` included `ip` and `ua` |
| 12 | Full customer contact details (email or phone) written to application logs | `/api/lead` | the whole lead object, contact included, was logged |
| 13 | Customer email written to application logs | `/api/checkout/create` | logged in the `[checkout]` line |
| 14 | GA4 and Meta Pixel loaded before consent | site-wide | the tags rendered whenever the IDs were configured; only the later custom events checked consent, while `gtag('config')` already sent a page view |
| 15 | Attribution UTM data written to `localStorage` on first visit, before consent | site-wide | `lib/utm.ts` wrote unconditionally |
| 16 | No sale attribution and no revenue truth source | site-wide | WhatsApp prefill carried a UTM tag but no reference; nothing recorded confirmed payments |
| 17 | Channel counts disagreed with the rest of the site | homepage | homepage said 20,000+ channels / 100,000+ VOD; `lib/site.ts`, `/pricing` and country pages said 22,000+ / 120,000+ |
| 18 | `/status` was absent from the sitemap | 1 page | compared built routes against `sitemap.xml` |

## Not measured, and deliberately not estimated

- Indexed page count, impressions, positions: no Search Console access.
- Competitor titles, offers, architecture: the competitive pass was deferred,
  so `.company/intel/` holds no values rather than plausible-looking ones.
- Backlink profile, competitor revenue, traffic: not observable from here.
