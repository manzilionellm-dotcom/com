import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { KB_ARTICLES, KB_ORDER } from "../../../lib/content/kb";
import { SITE, KB_SLUGS, type KbSlug } from "../../../lib/site";

export function generateStaticParams() {
  return KB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = KB_ARTICLES[slug as KbSlug];
  if (!a) return {};
  const title = `${a.title} | Best IPTV VIP`;
  return {
    title,
    description: a.description,
    alternates: { canonical: `${SITE.domain}/kb/${a.slug}` },
    openGraph: { title, description: a.description, url: `${SITE.domain}/kb/${a.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: a.description },
  };
}

export default async function KbArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = KB_ARTICLES[slug as KbSlug];
  if (!a) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    dateModified: a.updated,
    author: { "@type": "Organization", name: SITE.brand },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
    },
    mainEntityOfPage: `${SITE.domain}/kb/${a.slug}`,
  };

  const others = KB_ORDER.filter((s) => s !== a.slug).slice(0, 5);

  return (
    <PageShell fabMessage={`Hi! I have a question about: ${a.title}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Knowledge Base", href: "/kb" },
          { name: a.title, href: `/kb/${a.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }} aria-hidden="true">
          {a.emoji}
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.5rem,5vw,2.4rem)" }}>{a.title}</h1>

        {/* Answer-first */}
        <div
          className="section"
          style={{
            background: "rgba(212,175,55,0.06)",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 14,
            padding: "18px 20px",
            maxWidth: 780,
            margin: "18px auto 6px",
          }}
        >
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#d4af37", marginBottom: 6 }}>
            In short
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{a.answer}</p>
        </div>
        <p style={{ textAlign: "center", color: "#8a8f98", fontSize: 12, marginBottom: 24 }}>
          Last updated {a.updated}
        </p>

        {a.sections.map((s, i) => (
          <section key={i} className="section">
            <h2>{s.heading}</h2>
            {s.body.map((p, j) => (
              <p key={j} style={{ color: "#c7cad0", lineHeight: 1.7, marginBottom: 12 }}>{p}</p>
            ))}
          </section>
        ))}

        <section className="section">
          <h2>FAQ</h2>
          {a.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        {/* Funnel */}
        <section className="section cta-section">
          <h2>Try Best IPTV VIP free for 24h</h2>
          <p>
            22,000+ live channels, 120,000+ movies &amp; series in 4K. No credit card for the trial —
            we send your login on WhatsApp in minutes.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing &amp; plans</Link>
            <Link className="btn btn-green" href="/free-trial">Free 24h trial</Link>
          </div>
        </section>

        <section className="section">
          <h2>More from the knowledge base</h2>
          <div className="link-grid">
            {others.map((s) => (
              <Link key={s} href={`/kb/${s}`} className="link-card">
                <span style={{ fontSize: 20 }} aria-hidden="true">{KB_ARTICLES[s].emoji}</span>
                <span>{KB_ARTICLES[s].title}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
