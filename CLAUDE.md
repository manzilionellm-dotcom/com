# CLAUDE.md — Operating rules for agents on `com` (bestiptv-vip.com)

Next.js 15 (App Router, React 19, pnpm). Brand: **Best IPTV VIP**. Domain:
`https://bestiptv-vip.com`. Server-rendered English only. Conversion happens through
WhatsApp and Cryptomus checkout. Currency: USD.

Persistent memory for the project lives in `.company/`. Read `.company/meta.json`,
`.company/state.json`, `.company/assumptions.md` and `.company/decisions.md` **before**
doing anything.

---

## 1. Autonomous execution, zero questions

Do not ask the operator questions. When a requirement is ambiguous, pick the **most
probable assumption**, write it down in `.company/assumptions.md` with a one-line
rationale, and continue. A blocked run is a failed run; a documented assumption is a
recoverable one.

## 2. Measure before editing

No edit is made before a recon report exists for the thing being edited (what the file
currently contains, how many pages it affects, what the current output looks like).

"Green" means **a command exited 0**. It is never an opinion, a summary, or a belief.
The gates for this repo:

```
pnpm build                 # Next.js production build
pnpm type-check            # tsc --noEmit
node scripts/qa-gates.mjs  # SEO / trust gates, exits non-zero on failure
```

If a gate is red, the work is not done. If a gate does not exist yet for a claim you
want to make, write the gate.

## 3. Zero fabrication

Never invent: review counts, star ratings, testimonials, named customers, uptime
percentages, channel or VOD counts, subscriber numbers, competitor pricing, award
badges, "as seen on" logos, or dates.

- Every published number must be traceable to a source **in the repo** or to an
  **operator-confirmed fact**. If it is not traceable, it is fabricated.
- An unverifiable claim is **removed**, not softened. "Thousands of happy customers"
  is the same violation as "12,847 reviews" — it is a vaguer version of the same lie.
- Fake reviews and fake `AggregateRating` break Google's structured-data policy and
  consumer-protection law (FTC / EU UCPD). This is a legal boundary, not a style
  preference.
- Structured data must describe the page it is on, and only that page.

## 4. Live-site paranoia

This site is live and indexed. Therefore:

- **No indexed URL is ever lost without a 301** to the closest equivalent page.
- Never `git push --force`. Never push directly to `main`. Always open a PR.
- Never publish a broken state. If something breaks after publish, **roll back to the
  last green commit** first, diagnose second.
- Check `app/sitemap.ts` and `app/robots.ts` after any routing change.
- Canonical tags: exactly one per page, emitted by that page. `hreflang` alternates
  are only legal when the target URL really serves that language.

## 5. Secrets

Secrets live in environment variables and GitHub Secrets. Never in the repo, never in
`.company/`, never in a commit message, never in a log line, never in an artifact.
`.env.example` holds key **names** only — never values. Current keys: Cryptomus
merchant ID and payment API key, site URL, WhatsApp number, contact email, analytics
IDs, search-console verification.

## 6. Action boundary — what the system must never do

- **Drafts, never sends.** Outbound commercial messages (WhatsApp broadcasts, renewal
  reminders, email campaigns) are written to `outbox/` for human review and send.
  The system never transmits them.
- **Never changes the payment processor**, its keys, its price points, or its payout
  configuration.
- **Never runs destructive migrations.** Schema changes are **expand-contract**:
  additive change ships first, backfill and dual-read follow, removal of the old shape
  happens no earlier than **two deploys later**.
- Never deletes user data, never disables a live payment path, never edits DNS.

## 7. Analytics and privacy

- Events must **never contain PII**: no name, email, phone number, WhatsApp message
  content, IP address, precise geolocation, or payment data. Not in the payload, not
  in the URL, not in the referrer you forward.
- No cookie or `localStorage` write before consent (ePrivacy). Attribution uses an
  in-URL / in-session random `ref_id`.
- Event retention is capped at **13 months**. IP is never stored.
- Legal basis for event processing: legitimate interest, documented in
  `.company/decisions.md`.

## 8. A CTA click is never a sale

A WhatsApp click, a checkout button click, or a form submit is a **signal**, not
revenue. Only a **payment-processor confirmation** (Cryptomus webhook, verified
server-side) or an **operator-confirmed sale** counts as revenue. Never report
conversion rate, ARPU, or revenue derived from clicks. Label click metrics as
"intent", never as "conversions".

## 9. Working rhythm

1. Read `.company/` memory.
2. Recon → write findings.
3. Change the smallest thing that moves the metric.
4. Run all three gates; they must exit 0.
5. Open a PR; record the applied change hash in `.company/state.json`, the reasoning
   in `.company/decisions.md`, and anything you had to guess in
   `.company/assumptions.md`.
6. Anything you chose **not** to do goes in `.company/backlog.json` or
   `.company/roadmap.md` — never silently dropped, never invented instead.
