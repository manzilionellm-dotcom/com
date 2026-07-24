import { NextResponse } from "next/server";
import { verifyWebhookSignature, type WebhookPayload } from "../../../../lib/cryptomus";
import { emitEvent, serverEvent } from "../../../../lib/server/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Order ids are minted in /api/checkout/create as
//   biv-<plan>-<timestamp>-<random>[-r<REF>]
// Anything that does not match that shape yields no plan and no reference
// rather than a guess: an unattributed sale is worth more than a wrong one.
function parseOrderId(orderId: string): { plan?: string; ref_id?: string } {
  const match = /^biv-(p1|p3|p6|p12)-\d+-[0-9a-f]+(?:-r([A-Z2-9]{6}))?$/.exec(orderId || "");
  if (!match) return {};
  return { plan: match[1], ref_id: match[2] };
}

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
    // A signature-verified "paid" callback is the only automated signal that
    // may assert revenue. Sales closed over WhatsApp never reach here and are
    // entered by hand through scripts/sale.mjs.
    const { plan, ref_id } = parseOrderId(payload.order_id);
    await emitEvent(serverEvent("purchase_confirmed", { plan, ref_id }));
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
