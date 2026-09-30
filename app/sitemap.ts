import type { MetadataRoute } from "next";
import {
  SITE,
  LOCALES,
  DEVICE_SLUGS,
  COUNTRY_SLUGS,
  BLOG_SLUGS,
  COMPARE_SLUGS,
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
  const base: MetadataRoute.Sitemap = [
    {
      url: `${SITE.domain}/`,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: alt("/") },
    },
    {
      url: `${SITE.domain}/pricing`,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: alt("/pricing") },
    },
    {
      url: `${SITE.domain}/free-trial`,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: alt("/free-trial") },
    },
    {
      url: `${SITE.domain}/refer`,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: alt("/refer") },
    },
    {
      url: `${SITE.domain}/channels`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alt("/channels") },
    },
    {
      url: `${SITE.domain}/devices`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: alt("/devices") },
    },
    {
      url: `${SITE.domain}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.domain}/compare`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE.domain}/status`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE.domain}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE.domain}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.domain}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.domain}/refund`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const guides = DEVICE_SLUGS.map((slug) => ({
    url: `${SITE.domain}/guides/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    alternates: { languages: alt(`/guides/${slug}`) },
  }));

  const countries = COUNTRY_SLUGS.map((slug) => ({
    url: `${SITE.domain}/channels/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: { languages: alt(`/channels/${slug}`) },
  }));

  const blog = BLOG_SLUGS.map((slug) => ({
    url: `${SITE.domain}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const compare = COMPARE_SLUGS.map((slug) => ({
    url: `${SITE.domain}/compare/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...base, ...guides, ...countries, ...blog, ...compare];
}
