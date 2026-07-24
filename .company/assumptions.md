# Assumptions — bestiptv-vip.com

Every entry is an assumption made in the absence of an operator answer. Format:
assumption, then the rationale that made it the most probable reading. Anything here
is provisional and must be overwritten by an operator-confirmed fact when one arrives.

## run-001 — 2026-07-24

### A-001 — Site identity harvested from the code, not from a registry
The repository `com` was not present in the site registry, so no external record of the
site's identity existed.
*Rationale:* the only authoritative identity signals in reach were in the code itself —
`NEXT_PUBLIC_SITE_URL=https://bestiptv-vip.com` in `.env.example` and the `SITE` object
in `lib/site.ts` (`brand: "Best IPTV VIP"`, `domain: "https://bestiptv-vip.com"`,
support email, WhatsApp number). Two independent files agreeing is stronger evidence
than an absent registry entry, so they were treated as the source of truth.

### A-002 — Market is worldwide, English-first
`markets` is recorded as `["worldwide-en"]`.
*Rationale:* only English is server-rendered. The `fr`/`ar`/`es`/`de` dictionaries live
in `app/page.tsx` and are applied client-side only, on the homepage alone — no other
route has any translated output. A language that a crawler never sees and that exists
on one page out of the whole site is not a market; it is an unshipped feature.

### A-003 — Currency is USD
*Rationale:* the Cryptomus checkout path and the pricing page both denominate in USD.
No second currency, no currency switcher and no localised price table exist anywhere in
the tree, so there is no competing candidate.

### A-004 — Competitive intelligence (T-CI) not run in run-001
No competitor file in `.company/intel/` contains any value.
*Rationale:* outbound SERP fetching was out of scope for this run, so no competitor
data could be collected from a real, citable source. The choice was between fabricating
plausible competitor names and metrics or leaving the files explicitly empty. Under the
zero-fabrication rule, the task is **queued in the backlog and roadmap** and the intel
files state plainly that they hold no data yet.

### A-005 — Indexation is UNMEASURED, not estimated
*Rationale:* no Google Search Console key or property is configured
(`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is empty in `.env.example`), and no Bing
Webmaster Tools connection exists. Without a search-console property there is no
indexation data at all. An estimated indexation rate would be an invented number, so
the field is recorded as UNMEASURED and connecting both consoles is on the roadmap.

### A-006 — Untraceable social proof treated as fabricated and removed
`lib/site.ts` carried `reviewCount: 12847` and `ratingValue: 4.9`; the pages carried
three named testimonials and a twelve-server uptime table with per-server percentages.
*Rationale:* none of these traced to any source in the repo — no review export, no
import script, no monitoring integration, no operator note. In the absence of a source,
the most probable explanation for a precise-looking number with no origin is that it was
written by hand. They were therefore treated as fabricated and **removed**, not
rewritten into vaguer wording. Channel and VOD counts (`channelsCount: 22000`,
`vodCount: 120000`) remain in `lib/site.ts` and are pending operator confirmation — they
are the next candidates for removal if no source is produced.
