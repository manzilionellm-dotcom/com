import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BLOG_POSTS } from "../../../lib/content/blog";
import { SITE, BLOG_SLUGS, waLink, type BlogSlug } from "../../../lib/site";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as BlogSlug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE.domain}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.domain}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as BlogSlug];
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: SITE.domain },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.domain}/blog/${post.slug}` },
    image: `${SITE.domain}/og-image.png`,
    wordCount: post.sections.reduce((acc, s) => acc + s.body.join(" ").split(" ").length, 0),
  };

  const otherPosts = BLOG_SLUGS.filter((s) => s !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span className="hero-pill">{post.category} • {post.readTime}</span>
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>{post.title}</h1>
        <p style={{ textAlign: "center", color: "#888", fontSize: 12, marginBottom: 32 }}>
          By {post.author} • {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <p className="lead" style={{ fontSize: "1.05rem", marginBottom: 28 }}>{post.intro}</p>

        {post.sections.map((s, i) => (
          <section key={i} className="section" style={{ padding: "20px 0" }}>
            <h2>{s.heading}</h2>
            {s.body.map((b, j) => (
              <p key={j} style={{ color: "#cfcfd6", fontSize: 14.5, lineHeight: 1.7, marginBottom: 12 }}>{b}</p>
            ))}
          </section>
        ))}

        <section className="section cta-section">
          <h2>Conclusion</h2>
          <p>{post.conclusion}</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <a
              className="btn btn-green"
              href={waLink("Hi! I want a free 24h trial.", `Blog-${post.slug}`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Free 24h trial
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Read next</h2>
          <div className="reviews-grid">
            {otherPosts.map((s) => {
              const p = BLOG_POSTS[s];
              return (
                <Link key={s} href={`/blog/${s}`} className="review" style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>
                    {p.category}
                  </div>
                  <h3 style={{ margin: "0 0 6px", fontSize: 14, color: "#fff" }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: "#bbb", margin: 0, fontStyle: "normal" }}>{p.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
