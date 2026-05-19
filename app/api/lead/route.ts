import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadBody = {
  intent?: string;
  source?: string;
  name?: string;
  contact?: string;
  device?: string;
  country?: string;
  note?: string;
  page?: string;
  utm?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose WhatsApp / phone match (digits, spaces, +, -, parens, min 7 chars)
const PHONE_RE = /^[+]?[\d\s()\-]{7,}$/;

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const contact = (body.contact || "").trim();
  if (!contact || contact.length > 200) {
    return NextResponse.json({ ok: false, error: "Missing contact" }, { status: 400 });
  }
  if (!EMAIL_RE.test(contact) && !PHONE_RE.test(contact)) {
    return NextResponse.json(
      { ok: false, error: "Provide a valid WhatsApp number or email" },
      { status: 400 },
    );
  }

  const intent = String(body.intent || "contact").slice(0, 32);
  const source = String(body.source || "unknown").slice(0, 64);
  const name = body.name?.slice(0, 80);
  const device = body.device?.slice(0, 40);
  const country = body.country?.slice(0, 60);
  const note = body.note?.slice(0, 400);
  const page = body.page?.slice(0, 200);
  const utm: Record<string, string> = {};
  if (body.utm && typeof body.utm === "object") {
    for (const [k, v] of Object.entries(body.utm)) {
      if (typeof v === "string") utm[k.slice(0, 40)] = v.slice(0, 200);
    }
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ua = req.headers.get("user-agent") || "unknown";

  const lead = {
    type: "lead",
    intent,
    source,
    name,
    contact,
    device,
    country,
    note,
    page,
    utm,
    ip,
    ua,
    ts: new Date().toISOString(),
  };

  // Structured log so it can be picked up by Vercel/Cloudflare log drains and
  // forwarded to a CRM. Replace with direct CRM webhook if/when configured.
  console.log("[lead]", JSON.stringify(lead));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        cache: "no-store",
      });
    } catch (err) {
      console.error("[lead] webhook forward failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
