import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { SITE } from "../../../../lib/site";
import { createPayment } from "../../../../lib/cryptomus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLANS: Record<string, { name: string; price: number; months: number }> = {
  p1: { name: "1 Month", price: 10, months: 1 },
  p3: { name: "3 Months", price: 25, months: 3 },
  p6: { name: "6 Months", price: 35, months: 6 },
  p12: { name: "12 Months", price: 60, months: 12 },
};

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || SITE.domain).replace(/\/+$/, "");
}

export async function POST(req: Request) {
  let body: { plan?: string; email?: string; utm?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const planKey = body.plan;
  if (!planKey || !PLANS[planKey]) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }
  const plan = PLANS[planKey];

  const email = (body.email || "").trim().toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const orderId = `biv-${planKey}-${Date.now()}-${crypto
    .randomBytes(4)
    .toString("hex")}`;

  // Attribution log — links the Cryptomus order_id to the originating
  // campaign so the webhook can later report Purchase events back to ad
  // platforms (CAPI, Google Offline Conversions, etc.).
  const utm =
    body.utm && typeof body.utm === "object"
      ? Object.fromEntries(
          Object.entries(body.utm)
            .filter(([, v]) => typeof v === "string")
            .slice(0, 20)
            .map(([k, v]) => [String(k).slice(0, 40), String(v).slice(0, 200)]),
        )
      : {};
  console.log(
    "[checkout]",
    JSON.stringify({
      type: "checkout_start",
      orderId,
      plan: planKey,
      amount: plan.price,
      currency: "USD",
      email: email || undefined,
      utm,
      ts: new Date().toISOString(),
    }),
  );

  const base = siteUrl();

  try {
    const payment = await createPayment({
      amount: plan.price.toFixed(2),
      currency: "USD",
      orderId,
      successUrl: `${base}/checkout/success?o=${orderId}`,
      cancelUrl: `${base}/checkout/cancel?o=${orderId}`,
      callbackUrl: `${base}/api/checkout/webhook`,
      lifetimeSeconds: 3600,
      toCurrency: "USDT",
    });

    return NextResponse.json({
      ok: true,
      checkoutUrl: payment.url,
      orderId: payment.orderId,
      uuid: payment.uuid,
      plan: { key: planKey, name: plan.name, price: plan.price, months: plan.months },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Payment provider error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
