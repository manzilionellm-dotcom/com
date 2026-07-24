# Competitors — NO DATA COLLECTED (run-001)

**Status: empty.** No competitor has been observed for this site. The competitive
intelligence pass (T-CI) was not run in run-001 — outbound SERP fetching was out of
scope — so this file contains zero values by design, not by oversight. It is queued as
`BL-001` in `backlog.json` and as item 1 in `roadmap.md`.

**No competitor name, price, or metric may be written into this file from memory,
inference, or plausibility.** A value without a dated source URL does not go in.

## Required evidence per competitor

When this file is populated, each competitor entry must carry all of:

| Field | Requirement |
|---|---|
| `competitor_domain` | The apex domain as observed, e.g. `example-iptv.com`. Not a brand name alone. |
| `title_formula` | The observed pattern of their `<title>` tags across several pages, quoted verbatim from at least two pages. |
| `displayed_offer` | What the page actually shows: plan durations, prices with currency, trial terms, connection counts. Quoted, not summarised. |
| `proof_url` | The exact URL the value was read from. One URL per claim — not the homepage as a catch-all. |
| `fetch_date` | ISO date the page was fetched. Pricing pages change; an undated price is worthless. |
| `confidence` | `observed` (read directly off the page), `inferred` (derived from observed values, with the derivation stated), or `unknown`. Never blank. |

## Rules

- One claim, one `proof_url`. A claim covered by no URL is deleted.
- Values older than 90 days are re-fetched or marked stale — not carried forward.
- Screenshots or archived copies do not replace the URL and date; they supplement them.
- If a competitor's page could not be fetched, record the attempt and the failure. An
  unreachable page is a finding; a guessed page is a fabrication.
