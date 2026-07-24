#!/usr/bin/env node
// Revenue report.
//
// The rule this script exists to enforce: a metric with no data behind it
// prints NOT MEASURED, never 0%. A closing rate of "0%" computed over an empty
// ledger reads as "the site converts nothing" when the truth is "nobody has
// entered a sale yet" — the two lead to opposite decisions.
//
//   node scripts/revenue-rollup.mjs [--days 28]

import { existsSync, readFileSync } from "node:fs";

const LEDGER = ".company/data/sales/ledger.ndjson";
const daysArg = process.argv.indexOf("--days");
const DAYS = daysArg > -1 ? Number(process.argv[daysArg + 1]) || 28 : 28;
const since = Date.now() - DAYS * 24 * 60 * 60 * 1000;

function readLedger() {
  if (!existsSync(LEDGER)) return [];
  return readFileSync(LEDGER, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((r) => new Date(r.confirmed_at).getTime() >= since);
}

// Funnel counts come from the analytics store, not from Git. Until a sink is
// configured there is nothing to read, and we say so rather than guessing.
function readFunnel() {
  const path = process.env.FUNNEL_EXPORT_PATH;
  if (!path || !existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

const rows = readLedger();
const funnel = readFunnel();

const purchases = rows.filter((r) => r.type === "purchase_confirmed");
const refunds = rows.filter((r) => r.type === "refund_confirmed");

const gross = purchases.reduce((sum, r) => sum + (r.amount_gross_usd || 0), 0);
const refunded = refunds.reduce((sum, r) => sum + (r.amount_usd || 0), 0);
const net = gross - refunded;

const NOT_MEASURED = "NOT MEASURED";
const fmtMoney = (v) => `$${v.toFixed(2)}`;
const pct = (num, den) => (den > 0 ? `${((num / den) * 100).toFixed(1)}%` : NOT_MEASURED);

function line(label, value, source, confidence) {
  console.log(`${label.padEnd(30)} ${String(value).padEnd(14)} ${source.padEnd(22)} ${confidence}`);
}

console.log(`\nRevenue report — last ${DAYS} days\n`);
console.log(`${"metric".padEnd(30)} ${"value".padEnd(14)} ${"source".padEnd(22)} confidence`);
console.log("-".repeat(84));

if (!purchases.length) {
  console.log("\nNOT OPERATIONAL — sales entry required.");
  console.log("The sales ledger holds no confirmed purchase for this window, so every");
  console.log("revenue metric below is unmeasured rather than zero. Confirm sales with:");
  console.log("  node scripts/sale.mjs confirm <ref_id> <plan> <amount> <expires_at> <consent>\n");
}

const visitors = funnel?.qualified_visitors ?? null;
const ctaClicks = funnel?.cta_click ?? null;
const conversations = funnel?.conversation_started ?? null;

line("qualified visitors", visitors ?? NOT_MEASURED, visitors ? "analytics sink" : "no sink configured", visitors ? "medium" : "-");
line("CTA clicks", ctaClicks ?? NOT_MEASURED, ctaClicks ? "analytics sink" : "no sink configured", ctaClicks ? "medium" : "-");
line("conversations started", conversations ?? NOT_MEASURED, conversations ? "analytics sink" : "no sink configured", conversations ? "low" : "-");
line("purchases confirmed", purchases.length || NOT_MEASURED, purchases.length ? "sales ledger" : "empty ledger", purchases.length ? "high" : "-");
line("refunds confirmed", refunds.length, "sales ledger", refunds.length ? "high" : "high");
line("gross revenue", purchases.length ? fmtMoney(gross) : NOT_MEASURED, "sales ledger", purchases.length ? "high" : "-");
line("net revenue", purchases.length ? fmtMoney(net) : NOT_MEASURED, "sales ledger", purchases.length ? "high" : "-");
line(
  "net revenue / visitor",
  purchases.length && visitors ? fmtMoney(net / visitors) : NOT_MEASURED,
  "ledger + analytics",
  purchases.length && visitors ? "medium" : "-",
);
line(
  "closing rate",
  conversations ? pct(purchases.length, conversations) : NOT_MEASURED,
  "ledger + analytics",
  conversations && purchases.length ? "medium" : "-",
);

// Attribution health. Below 60% certain attribution, per-page revenue
// comparisons are biased — the customers who keep the reference are not a
// random sample — so the report says so instead of ranking pages anyway.
const attributed = purchases.filter((p) => p.attribution === "certain").length;
const attributionRate = purchases.length ? attributed / purchases.length : null;
line(
  "certain attribution",
  attributionRate === null ? NOT_MEASURED : pct(attributed, purchases.length),
  "sales ledger",
  attributionRate === null ? "-" : "high",
);

const eligible = purchases.filter((p) => p.expires_at && new Date(p.expires_at).getTime() < Date.now());
line(
  "renewal rate",
  eligible.length ? pct(rows.filter((r) => r.type === "renewal_confirmed").length, eligible.length) : NOT_MEASURED,
  eligible.length ? "sales ledger" : "no expiries yet",
  eligible.length ? "medium" : "-",
);

console.log("");
if (attributionRate !== null && attributionRate < 0.6) {
  console.log(
    `WARNING: only ${(attributionRate * 100).toFixed(0)}% of sales carry a certain reference. ` +
      "Per-page revenue comparisons are NOT RELIABLE at this rate (selection bias).",
  );
}
if (!funnel) {
  console.log(
    "Funnel counts are unavailable: set FUNNEL_EXPORT_PATH to a daily export from the\n" +
      "analytics sink (ANALYTICS_WEBHOOK_URL) to make conversion rates computable.",
  );
}
console.log("");
