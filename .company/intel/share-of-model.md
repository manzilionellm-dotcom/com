# Share of model — NO DATA COLLECTED (run-001)

**Status: empty.** "Share of model" tracks whether and how this brand appears when an AI
assistant is asked a buying question in this category ("best IPTV service", "IPTV that
works on Firestick", "is IPTV legal"). **No such prompt was run in run-001** — outbound
fetching and model probing were out of scope — so this file holds no measurements.

Nothing about the brand's visibility in AI answers may be asserted, positively or
negatively, until probes are actually run and recorded here. Queued alongside `BL-001`.

## Required evidence per probe

| Field | Requirement |
|---|---|
| `prompt` | The exact prompt text sent, verbatim. Paraphrases are not reproducible. |
| `model_and_version` | The assistant and version/date probed. Answers drift between versions. |
| `probe_date` | ISO date the probe was run. |
| `brand_mentioned` | `yes` / `no`. |
| `position` | Where the brand appeared in the answer, if at all: ordinal in a list, or `not_present`. |
| `brands_cited` | Every competing brand the answer named, in order — this is the real competitive set as the model sees it. |
| `sources_cited` | URLs the answer cited, if any. These are the pages worth being on. |
| `verbatim_excerpt` | The quoted passage mentioning the brand or its absence. |
| `confidence` | `observed` (transcript retained) / `unknown`. Never `inferred` — a probe is either run or it is not. |

## Rules

- **No value without a dated probe and a retained transcript.** There is no such thing
  as a plausible share-of-model estimate.
- Model answers are non-deterministic: run each prompt at least three times and record
  each run separately rather than reporting one run as the result.
- Do not treat a model's claim about a competitor (pricing, channel counts, uptime) as a
  fact about that competitor. It is evidence of what the model says, nothing more; any
  such figure still needs a real source URL before it reaches `concurrents.md`.
- Absence of the brand from an answer is a finding worth recording, not a failure to
  hide.
