import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Deploy marker. Post-deploy verification reads this and compares it with the
// commit it just shipped: if they differ, the deploy did not actually take and
// a rollback is not confirmed until this endpoint serves the previous commit.
export async function GET() {
  return NextResponse.json(
    {
      sha:
        process.env.VERCEL_GIT_COMMIT_SHA ||
        process.env.GITHUB_SHA ||
        process.env.NEXT_PUBLIC_COMMIT_SHA ||
        "unknown",
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
      built_at: process.env.VERCEL_DEPLOYMENT_ID ? undefined : new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
