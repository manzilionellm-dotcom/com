import { NextResponse } from "next/server";
import { buildEvent, emitEvent, rateLimited } from "../../../lib/server/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Funnel event sink. Beacons must stay cheap and must never block the page, so
// every path returns 204 with no body — including rejections.
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
