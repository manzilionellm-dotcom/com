import { NextResponse } from "next/server";
import { buildEvent, emitEvent, rateLimited } from "../../../lib/server/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Legacy endpoint. Cached client bundles and the service worker still beacon
// here, so it stays alive and routes through the same PII-free pipeline as
// /api/e. It previously logged the raw IP and user-agent; it no longer does.
// Remove only once /api/e has been live long enough for old bundles to expire.
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;

  if (rateLimited(ip)) return new NextResponse(null, { status: 204 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const event = buildEvent(
    body,
    req.headers,
    process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
  );
  if (!event) return new NextResponse(null, { status: 204 });

  await emitEvent(event);
  return new NextResponse(null, { status: 204 });
}
