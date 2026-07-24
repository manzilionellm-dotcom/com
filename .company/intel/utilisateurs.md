# Users — NO DATA COLLECTED (run-001)

**Status: empty.** Nothing is known about this site's actual visitors or customers. In
run-001 there was no analytics history, no connected search console, no payment-confirmed
purchase record, and no operator interview. Every visitor characteristic, objection, or
"persona" that might feel obvious is unevidenced.

Note specifically: the testimonials found in the code were **removed as fabricated**
(see `decisions.md` D-004). They are not user research and must never be re-imported
here as evidence of anything.

Depends on `BL-002` (search consoles) and `BL-003` (payment webhook) before this file
can hold real values.

## Required evidence per user finding

| Field | Requirement |
|---|---|
| `finding` | One observed behaviour or stated need, phrased as what was seen — not as a persona archetype. |
| `evidence_type` | `analytics_event` (aggregate, from our own `/api/e`), `search_query` (Search Console), `operator_report` (a specific dated conversation the operator described), or `payment_record`. |
| `sample_size` | The n behind the finding. A finding from n=1 is labelled n=1, never generalised. |
| `period` | The date range the evidence covers. |
| `proof_url` | Report, export, or console view the number was read from. |
| `confidence` | `observed` / `inferred` (state the derivation) / `unknown`. |

## Rules

- **No value may be written without a dated source URL or a dated operator confirmation.**
- **No PII, ever** — no names, emails, phone numbers, WhatsApp message content, IP
  addresses or payment details, in this file or in any export feeding it. Findings are
  aggregate only (see `CLAUDE.md` §7).
- Do not write invented personas, invented quotes, or "typical customer" narratives. An
  unevidenced persona reads exactly like research and is the most dangerous kind of
  fabrication because later decisions cite it.
- A CTA click is an intent signal, never a customer. Do not describe click data as
  purchase behaviour (see `CLAUDE.md` §8).
