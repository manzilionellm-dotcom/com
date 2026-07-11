import type { MetadataRoute } from "next";
import {
  SITE,
  LOCALES,
  DEVICE_SLUGS,
  COUNTRY_SLUGS,
  BLOG_SLUGS,
  COMPARE_SLUGS,
} from "../lib/site";
import { WATCH_SLUGS } from "../lib/content/sports";
import { BEST_SLUGS } from "../lib/content/best";
import { ALTERNATIVE_SLUGS } from "../lib/content/alternatives";

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
      url: `${SITE.domain}/watch`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alt("/watch") },
    },
    {
      url: `${SITE.domain}/best`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alt("/best") },
    },
    {
      url: `${SITE.domain}/alternatives`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
      alternates: { languages: alt("/alternatives") },
    },
    {
      url: `${SITE.domain}/referral`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
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

  const watch = WATCH_SLUGS.map((slug) => ({
    url: `${SITE.domain}/watch/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: { languages: alt(`/watch/${slug}`) },
  }));

  const best = BEST_SLUGS.map((slug) => ({
    url: `${SITE.domain}/best/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: { languages: alt(`/best/${slug}`) },
  }));

  const alternatives = ALTERNATIVE_SLUGS.map((slug) => ({
    url: `${SITE.domain}/alternatives/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.82,
    alternates: { languages: alt(`/alternatives/${slug}`) },
  }));

  return [
    ...base,
    ...guides,
    ...countries,
    ...blog,
    ...compare,
    ...watch,
    ...best,
    ...alternatives,
  ];
}
