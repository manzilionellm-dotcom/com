import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bestiptv-vip.com";
  const now = new Date();
  return [
    { url: `${base}/`,        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/?lang=en`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/?lang=fr`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/?lang=ar`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
  ];
}
