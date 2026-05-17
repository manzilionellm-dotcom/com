import crypto from "node:crypto";

const API_URL = "https://api.cryptomus.com/v1/payment";

function getCreds() {
  const merchant = process.env.CRYPTOMUS_MERCHANT_ID;
  const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY;
  if (!merchant || !apiKey) {
    throw new Error("Cryptomus credentials are missing in environment variables");
  }
  return { merchant, apiKey };
}

function phpStyleStringify(value: unknown): string {
  return JSON.stringify(value).replace(/\//g, "\\/");
}

export function makeSign(payloadJson: string, apiKey: string): string {
  const base64 = Buffer.from(payloadJson, "utf8").toString("base64");
  return crypto.createHash("md5").update(base64 + apiKey).digest("hex");
}

export type CreatePaymentInput = {
  amount: string;
  currency: string;
  orderId: string;
  successUrl: string;
  cancelUrl: string;
  callbackUrl: string;
  lifetimeSeconds?: number;
  toCurrency?: string;
};

export type CreatePaymentResult = {
  uuid: string;
  url: string;
  orderId: string;
  expiredAt: number;
};

export async function createPayment(
  input: CreatePaymentInput,
): Promise<CreatePaymentResult> {
  const { merchant, apiKey } = getCreds();

  const body = {
    amount: input.amount,
    currency: input.currency,
    order_id: input.orderId,
    url_return: input.cancelUrl,
    url_success: input.successUrl,
    url_callback: input.callbackUrl,
    lifetime: input.lifetimeSeconds ?? 3600,
    to_currency: input.toCurrency ?? "USDT",
    is_payment_multiple: false,
  };

  const json = phpStyleStringify(body);
  const sign = makeSign(json, apiKey);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      merchant,
      sign,
    },
    body: json,
    cache: "no-store",
  });

  const data = (await res.json()) as {
    state?: number;
    result?: {
      uuid: string;
      url: string;
      order_id: string;
      expired_at: number;
    };
    message?: string;
    errors?: Record<string, unknown>;
  };

  if (!res.ok || data.state !== 0 || !data.result) {
    const detail = data.message || JSON.stringify(data.errors || data);
    throw new Error(`Cryptomus createPayment failed: ${detail}`);
  }

  return {
    uuid: data.result.uuid,
    url: data.result.url,
    orderId: data.result.order_id,
    expiredAt: data.result.expired_at,
  };
}

export function verifyWebhookSignature(rawBody: unknown): boolean {
  const { apiKey } = getCreds();
  if (!rawBody || typeof rawBody !== "object") return false;
  const obj = { ...(rawBody as Record<string, unknown>) };
  const receivedSign = obj.sign;
  if (typeof receivedSign !== "string") return false;
  delete obj.sign;
  const json = phpStyleStringify(obj);
  const expected = makeSign(json, apiKey);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(receivedSign, "hex"),
    );
  } catch {
    return false;
  }
}

export type WebhookPayload = {
  type?: string;
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount?: string;
  payer_amount?: string;
  status:
    | "paid"
    | "paid_over"
    | "wrong_amount"
    | "process"
    | "confirm_check"
    | "wrong_amount_waiting"
    | "check"
    | "fail"
    | "cancel"
    | "system_fail"
    | "refund_paid"
    | "refund_fail"
    | "refund_process"
    | "locked";
  is_final: boolean;
  currency: string;
  network?: string;
  txid?: string;
  sign: string;
};
