import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { BLOG_POSTS } from "../../lib/content/blog";
import { SITE, BLOG_SLUGS } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Blog — Best IPTV Guides, News & Reviews 2026",
  description:
    "Expert IPTV guides, troubleshooting, comparisons and 2026 buyer reviews. How to fix buffering, IPTV vs cable, best 4K setup, IPTV Smarters vs TiviMate and more.",
  alternates: { canonical: `${SITE.domain}/blog` },
};

export default function BlogIndex() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Best IPTV VIP Blog",
    url: `${SITE.domain}/blog`,
    publisher: { "@type": "Organization", name: SITE.brand, url: SITE.domain },
    blogPost: BLOG_SLUGS.map((s) => {
      const p = BLOG_POSTS[s];
      return {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        author: { "@type": "Organization", name: p.author },
        url: `${SITE.domain}/blog/${p.slug}`,
      };
    }),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          IPTV Blog — Guides, Reviews & News (2026)
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          Expert guides written by IPTV professionals. Fix buffering, set up 4K on Firestick, compare players and learn how to save $1,500/year vs cable.
        </p>

        <div className="reviews-grid">
          {BLOG_SLUGS.map((s) => {
            const p = BLOG_POSTS[s];
            return (
              <Link key={s} href={`/blog/${s}`} className="review" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
                  {p.category} • {p.readTime}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 16, color: "#fff" }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#bbb", margin: 0, fontStyle: "normal" }}>{p.description}</p>
                <div style={{ marginTop: 12, fontSize: 11, color: "#666" }}>
                  Published {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
              </Link>
            );
          })}
        </div>
      </article>
    </PageShell>
  );
}
