#!/usr/bin/env node
// Sale confirmation — the bridge between WhatsApp and measured revenue.
//
// Sales close inside a WhatsApp conversation, where no automated system can
// see them. Nothing else in this repo may treat a click, an opened chat or a
// sent payment link as revenue, so this command is how a sale becomes real.
//
//   node scripts/sale.mjs confirm <ref_id> <plan> <amount> <expires_at> <consent:yes|no>
//   node scripts/sale.mjs refund  <ref_id> <amount>
//   node scripts/sale.mjs list
//
// Example:
//   node scripts/sale.mjs confirm AB7XKD p3 25 2026-10-24 yes
//
// The ref_id is the six-character reference pre-filled in the customer's first
// WhatsApp message ("Ref: AB7XKD"). Matching it is what attributes the sale to
// the page that produced it.
//
// Records go to the sales store, never into Git: SALES_WEBHOOK_URL if set,
// otherwise a local file under .company/data/ that .gitignore excludes.

import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const STORE_DIR = ".company/data/sales";
const STORE = `${STORE_DIR}/ledger.ndjson`;
const PLANS = new Set(["p1", "p3", "p6", "p12"]);

function usage(message) {
  if (message) console.error(`error: ${message}\n`);
  console.error(
    [
      "usage:",
      "  node scripts/sale.mjs confirm <ref_id> <plan> <amount> <expires_at> <consent:yes|no>",
      "  node scripts/sale.mjs refund  <ref_id> <amount>",
      "  node scripts/sale.mjs list",
      "",
      "  ref_id      six characters, as pre-filled in the WhatsApp message (e.g. AB7XKD)",
      "              use NONE when the customer did not keep the reference",
      "  plan        one of p1 p3 p6 p12",
      "  amount      gross amount actually received, in USD",
      "  expires_at  YYYY-MM-DD, when the subscription lapses (drives renewal reminders)",
      "  consent     yes only if the customer explicitly agreed to renewal messages",
    ].join("\n"),
  );
  process.exit(1);
}

function append(record) {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
  appendFileSync(STORE, JSON.stringify(record) + "\n");

  const webhook = process.env.SALES_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    }).catch((err) => console.error("warn: sales webhook forward failed:", err.message));
  }
}

function readLedger() {
  if (!existsSync(STORE)) return [];
  return readFileSync(STORE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

const [command, ...args] = process.argv.slice(2);

if (command === "confirm") {
  const [refId, plan, amountRaw, expiresAt, consentRaw] = args;
  if (!refId || !plan || !amountRaw || !expiresAt || !consentRaw) usage("missing argument");

  const ref = refId.toUpperCase();
  if (ref !== "NONE" && !/^[A-Z2-9]{6}$/.test(ref)) usage(`ref_id "${refId}" is not a six-character reference`);
  if (!PLANS.has(plan)) usage(`plan "${plan}" must be one of p1 p3 p6 p12`);

  const amount = Number(amountRaw);
  if (!Number.isFinite(amount) || amount <= 0) usage(`amount "${amountRaw}" is not a positive number`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expiresAt)) usage(`expires_at "${expiresAt}" must be YYYY-MM-DD`);

  const consent = consentRaw.toLowerCase();
  if (!["yes", "no", "y", "n"].includes(consent)) usage(`consent "${consentRaw}" must be yes or no`);

  append({
    type: "purchase_confirmed",
    schema_version: 1,
    // Pseudonymous customer key. No name, phone or email is ever stored here.
    customer_ref: randomBytes(8).toString("hex"),
    ref_id: ref === "NONE" ? null : ref,
    attribution: ref === "NONE" ? "unattributed" : "certain",
    plan,
    amount_gross_usd: amount,
    expires_at: expiresAt,
    renewal_consent: consent === "yes" || consent === "y",
    confirmed_at: new Date().toISOString(),
  });

  console.log(
    `recorded: ${plan} $${amount}, expires ${expiresAt}, ` +
      `attribution ${ref === "NONE" ? "unattributed" : ref}, ` +
      `renewal contact ${consent.startsWith("y") ? "permitted" : "NOT permitted"}`,
  );
  if (!consent.startsWith("y")) {
    console.log("note: no renewal reminder may be drafted for this customer.");
  }
} else if (command === "refund") {
  const [refId, amountRaw] = args;
  if (!refId || !amountRaw) usage("missing argument");
  const amount = Number(amountRaw);
  if (!Number.isFinite(amount) || amount <= 0) usage(`amount "${amountRaw}" is not a positive number`);

  append({
    type: "refund_confirmed",
    schema_version: 1,
    ref_id: refId.toUpperCase() === "NONE" ? null : refId.toUpperCase(),
    amount_usd: amount,
    confirmed_at: new Date().toISOString(),
  });
  console.log(`recorded refund: $${amount}`);
} else if (command === "list") {
  const rows = readLedger();
  if (!rows.length) {
    console.log("sales ledger is empty — revenue metrics are NOT OPERATIONAL until sales are entered.");
    process.exit(0);
  }
  for (const row of rows) {
    console.log(
      [row.confirmed_at, row.type, row.plan ?? "-", `$${row.amount_gross_usd ?? row.amount_usd}`, row.ref_id ?? "unattributed"].join(
        "  ",
      ),
    );
  }
  console.log(`\n${rows.length} record(s)`);
} else {
  usage(command ? `unknown command "${command}"` : null);
}
