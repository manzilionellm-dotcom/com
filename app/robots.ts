import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE } from "../lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") || "";
  if (host.includes("vercel.app")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin", "/ops"],
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
