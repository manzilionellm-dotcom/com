# Markets — NO DATA COLLECTED (run-001)

**Status: empty.** No market sizing, demand data or geographic breakdown has been
collected. No Search Console or Bing Webmaster Tools property is connected
(`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is unset), so the site has **no query data, no
impression data and no country breakdown at all**. Search volumes were not fetched in
run-001.

The working assumption recorded in `assumptions.md` (A-002) — worldwide, English-first —
comes from the code (only English is server-rendered), **not** from market evidence.
It is a default, not a finding, and must not be cited here as one.

Queued as `BL-001` (T-CI) and `BL-002` (search consoles) in `backlog.json`.

## Required evidence per market entry

| Field | Requirement |
|---|---|
| `market` | Country or language market, e.g. `US`, `FR`, `MENA-ar`. |
| `demand_signal` | The measured quantity: monthly search volume for a stated keyword, or impressions from a connected search console. State which. |
| `keyword` | The exact query the volume belongs to. A volume with no keyword is meaningless. |
| `source_tool` | Where the number came from: Search Console, Bing Webmaster Tools, or a named keyword tool. Not "industry estimate". |
| `proof_url` | URL of the report, export, or console view. |
| `fetch_date` | ISO date. Demand data expires. |
| `currency_and_price_band` | Only if observed on real pages, with per-value proof URLs. |
| `confidence` | `observed` / `inferred` (state the derivation) / `unknown`. |

## Rules

- **No total addressable market figure may be written without a dated source URL.**
  Industry "IPTV market size" numbers repeated by content farms are not sources.
- Do not convert an assumption into a market finding. A-002 stays an assumption until a
  console or a keyword tool supplies numbers.
- A market with no measured demand signal is recorded as UNMEASURED, never estimated.
- A market is only "confirmed to convert" on operator-confirmed sales from it — that is
  the gate for the routed-i18n work in `roadmap.md` item 6.
