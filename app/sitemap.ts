import type { MetadataRoute } from "next";
import {
  SITE,
  LOCALES,
  DEVICE_SLUGS,
  COUNTRY_SLUGS,
  BLOG_SLUGS,
  COMPARE_SLUGS,
  APP_SLUGS,
  HELP_SLUGS,
  KB_SLUGS,
} from "../lib/site";

function alt(path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE.domain}${path}?lang=${l}`;
  }
  languages["x-default"] = `${SITE.domain}${path}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    {
      url: `${SITE.domain}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: alt("/") },
    },
    {
      url: `${SITE.domain}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: alt("/pricing") },
    },
    {
      url: `${SITE.domain}/free-trial`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: alt("/free-trial") },
    },
    {
      url: `${SITE.domain}/channels`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alt("/channels") },
    },
    {
      url: `${SITE.domain}/devices`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: alt("/devices") },
    },
    {
      url: `${SITE.domain}/apps`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: { languages: alt("/apps") },
    },
    {
      url: `${SITE.domain}/help`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: alt("/help") },
    },
    {
      url: `${SITE.domain}/kb`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: alt("/kb") },
    },
    {
      url: `${SITE.domain}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.domain}/compare`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE.domain}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE.domain}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.domain}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.domain}/refund`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const guides = DEVICE_SLUGS.map((slug) => ({
    url: `${SITE.domain}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    alternates: { languages: alt(`/guides/${slug}`) },
  }));

  const countries = COUNTRY_SLUGS.map((slug) => ({
    url: `${SITE.domain}/channels/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: { languages: alt(`/channels/${slug}`) },
  }));

  const blog = BLOG_SLUGS.map((slug) => ({
    url: `${SITE.domain}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const compare = COMPARE_SLUGS.map((slug) => ({
    url: `${SITE.domain}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const apps = APP_SLUGS.map((slug) => ({
    url: `${SITE.domain}/apps/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: alt(`/apps/${slug}`) },
  }));

  const help = HELP_SLUGS.map((slug) => ({
    url: `${SITE.domain}/help/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const kb = KB_SLUGS.map((slug) => ({
    url: `${SITE.domain}/kb/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...base, ...guides, ...countries, ...blog, ...compare, ...apps, ...help, ...kb];
}
