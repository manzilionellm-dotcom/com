import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { KB_ARTICLES } from "../../../lib/content/kb";
import { DEVICE_GUIDES } from "../../../lib/content/devices";
import { SITE, KB_SLUGS, waLink, type KbSlug } from "../../../lib/site";

export function generateStaticParams() {
  return KB_SLUGS.map((question) => ({ question }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ question: string }>;
}): Promise<Metadata> {
  const { question } = await params;
  const a = KB_ARTICLES[question as KbSlug];
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
  params: Promise<{ question: string }>;
}) {
  const { question } = await params;
  const a = KB_ARTICLES[question as KbSlug];
  if (!a) notFound();

  const money = DEVICE_GUIDES[a.funnelDevice];

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
    author: { "@type": "Organization", name: SITE.brand, url: SITE.domain },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.domain}/kb/${a.slug}` },
  };

  const others = KB_SLUGS.filter((s) => s !== a.slug).slice(0, 5);

  return (
    <PageShell fabMessage={`Hi! I have a question: ${a.title}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Knowledge Base", href: "/kb" },
          { name: a.title, href: `/kb/${a.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 52, textAlign: "center", marginBottom: 12 }} aria-hidden="true">{a.emoji}</div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.4rem)" }}>{a.title}</h1>
        <p style={{ textAlign: "center", color: "#888", fontSize: 12, marginBottom: 8 }}>
          {a.category} • Updated {new Date(a.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        {/* Answer-first */}
        <div className="section" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 20px", margin: "8px 0 24px" }}>
          <p style={{ color: "#eaeaf0", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "var(--gold)" }}>In short: </strong>{a.answer}
          </p>
        </div>

        {a.sections.map((s, i) => (
          <section key={i} className="section" style={{ padding: "16px 0" }}>
            <h2>{s.heading}</h2>
            {s.body.map((b, j) => (
              <p key={j} style={{ color: "#cfcfd6", fontSize: 14.5, lineHeight: 1.7, marginBottom: 12 }}>{b}</p>
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

        {/* Funnel: trial + money page */}
        <section className="section cta-section">
          <h2>Put it into practice</h2>
          <p>
            Start a free 24h trial with no card, or follow the step-by-step{" "}
            <Link href={`/guides/${money.slug}`} style={{ color: "var(--gold)" }}>{money.name} install guide</Link>.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <a
              className="btn btn-green"
              href={waLink(`Hi! I read about "${a.title}" and want a free 24h trial.`, `KB-${a.slug}`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Free 24h trial
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Related questions</h2>
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
