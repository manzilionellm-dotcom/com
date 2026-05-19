import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Lightweight server-side mirror of client funnel events.
// Logged as structured JSON for log-drain ingestion. Optional forward to
// ANALYTICS_WEBHOOK_URL (e.g. PostHog Capture, Mixpanel, BigQuery proxy).
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  if (!body || typeof body !== "object") {
    return new NextResponse(null, { status: 204 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const ua = req.headers.get("user-agent") || undefined;

  const enriched = {
    ...(body as Record<string, unknown>),
    server_ts: Date.now(),
    ip,
    ua,
  };

  console.log("[track]", JSON.stringify(enriched));

  const webhook = process.env.ANALYTICS_WEBHOOK_URL;
  if (webhook) {
    // Fire-and-forget. We never block beacon responses on third-party latency.
    void fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched),
      cache: "no-store",
    }).catch(() => {});
  }

  // 204 keeps beacon responses cheap.
  return new NextResponse(null, { status: 204 });
}
