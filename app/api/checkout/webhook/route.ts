import { NextResponse } from "next/server";
import { verifyWebhookSignature, type WebhookPayload } from "../../../../lib/cryptomus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const raw = await req.text();
  let payload: WebhookPayload;
  try {
    payload = JSON.parse(raw) as WebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  if (!verifyWebhookSignature(payload)) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  if (payload.status === "paid" || payload.status === "paid_over") {
    console.log(
      `[cryptomus] PAID order=${payload.order_id} uuid=${payload.uuid} amount=${payload.amount} ${payload.currency} txid=${payload.txid ?? "-"}`,
    );
  } else if (payload.is_final) {
    console.log(
      `[cryptomus] FINAL non-paid order=${payload.order_id} status=${payload.status}`,
    );
  } else {
    console.log(
      `[cryptomus] update order=${payload.order_id} status=${payload.status}`,
    );
  }

  return NextResponse.json({ ok: true });
}
