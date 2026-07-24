# Decisions — bestiptv-vip.com

Each decision records what was chosen, what was rejected, and why. Reversing a decision
requires a new dated entry, not an edit to an old one.

## run-001 — 2026-07-24

### D-001 — Removed the five fabricated hreflang alternates (`?lang=xx`)
The metadata declared alternates for `fr`, `ar`, `es`, `de` (and `en`) as `?lang=xx`
query URLs. Those URLs serve **identical English HTML** — the translation dictionaries
are client-side and homepage-only. An hreflang cluster whose members return the same
language is invalid: Google either ignores the cluster or treats the URLs as duplicates,
and it advertises a multilingual site that does not exist.
**Chosen:** delete the alternates now. **Rejected:** building routed i18n in the same
run — that is a multi-day change touching every route, and shipping it under time
pressure risked losing indexed URLs. Real routed i18n (`/fr/`, `/ar/`, …) is queued in
the roadmap, gated on a non-English market actually converting.

### D-002 — Removed the duplicate hard-coded canonical from the root layout
`app/layout.tsx` emitted a literal `<link rel="canonical">` pointing at the homepage.
Because it sat in the root layout it appeared on **all 37 pages**, so every page shipped
two canonicals: its own correct one and a second one claiming the page was the homepage.
Conflicting canonicals are resolved unpredictably by crawlers and can collapse the whole
site into a single indexed URL. Each page now emits exactly one canonical, its own.

### D-003 — Removed global Product / FAQPage / BreadcrumbList JSON-LD from the root layout
Structured data must describe the page it is on. Injected from the root layout, a
`Product` block claimed every page was a purchasable product — including `/privacy` and
`/terms` — and the global `FAQPage` and `BreadcrumbList` blocks duplicated the per-page
FAQ and breadcrumb markup that pages already emit correctly. Removed globally; per-page
schema is the only schema.

### D-004 — Removed AggregateRating, testimonials and the uptime table
Deleted: `AggregateRating` (4.9 from 12,847 reviews), three named testimonials, and an
invented twelve-server uptime table. None was traceable to any source in the repo.
Beyond the zero-fabrication rule, fabricated reviews violate Google's structured-data
policy (manual action risk on the whole domain) and consumer-protection law on fake
endorsements. Removed outright rather than softened — a vaguer version of an invented
claim is still an invented claim.

### D-005 — Analytics: first-party endpoint, not a third-party pixel
**Chosen:** a first-party event endpoint on our own domain (`/api/e`) with server-side
bot filtering and a strict no-PII payload.
**Rejected:** a third-party SaaS pixel. A pixel optimises for clicks, is blocked for a
large share of this audience, ships visitor data to a processor we do not control, and
would report click volume as if it were revenue. The funnel's truth source here is an
**operator-confirmed sale** (or a verified Cryptomus confirmation), not a click — so the
measurement layer had to be one we could reconcile against payments ourselves.

### D-006 — Attribution: random `ref_id`, no pre-consent storage
A random `ref_id` is generated per session, carried in the URL / in-memory session, and
injected into the WhatsApp prefill text so an operator can tie a conversation back to
the page that produced it. **No cookie and no `localStorage` write happens before
consent**, per ePrivacy. Rejected: a persistent first-party cookie set on landing —
simpler to implement, but it is terminal storage placed without consent.

### D-007 — Legal basis, retention, IP
Event processing is documented as **legitimate interest** (aggregate site measurement,
no profiling, no ad targeting, no data sharing). Event retention is capped at
**13 months**, after which rows are deleted. **IP is never stored** — it is used
transiently for bot filtering and discarded, never written to the event record and never
included in any exported dataset.
