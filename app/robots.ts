import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE } from "../lib/site";

const PUBLIC_CRAWL: { allow: string; disallow: string[] } = {
  allow: "/",
  disallow: ["/api/", "/_next/", "/admin", "/ops"],
};

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") || "";
  if (host.includes("vercel.app")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // No other AI user-agent is declared. Google-Extended copies the `*`
  // allow/disallow (fleet default: Allow). Sitemap stays on SITE.domain (apex).
  return {
    rules: [
      { userAgent: "*", ...PUBLIC_CRAWL },
      { userAgent: "Google-Extended", ...PUBLIC_CRAWL },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
