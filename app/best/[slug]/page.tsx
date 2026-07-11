import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import WhatsAppCTA from "../../../components/WhatsAppCTA";
import LeadForm from "../../../components/LeadForm";
import { BEST_GUIDES, BEST_SLUGS } from "../../../lib/content/best";
import { SITE } from "../../../lib/site";

export function generateStaticParams() {
  return BEST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = BEST_GUIDES[slug];
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `${SITE.domain}/best/${g.slug}` },
    openGraph: {
      title: g.metaTitle,
      description: g.metaDescription,
      url: `${SITE.domain}/best/${g.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: g.metaTitle,
      description: g.metaDescription,
    },
  };
}

export default async function BestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = BEST_GUIDES[slug];
  if (!g) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.metaDescription,
    author: { "@type": "Organization", name: SITE.brand, url: SITE.domain },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.domain}/best/${g.slug}` },
    image: `${SITE.domain}/og-image.png`,
  };

  return (
    <PageShell fabMessage={`Hi! I'm looking for the best IPTV for ${g.short}. Send me a free 24h trial.`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Best IPTV", href: "/best" },
          { name: g.short, href: `/best/${g.slug}` },
        ]}
      />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>
          <span aria-hidden="true" style={{ marginRight: 8 }}>{g.icon}</span>
          {g.h1}
        </h1>

        {/* Direct-answer block for AI Overviews */}
        <div
          className="answer-block"
          style={{
            background: "rgba(212,175,55,0.06)",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 10,
            padding: 18,
            margin: "20px auto 24px",
            maxWidth: 760,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Quick answer
          </div>
          <p style={{ margin: 0, lineHeight: 1.6, color: "#dcdce4", fontSize: 15 }}>{g.answer}</p>
        </div>

        <p className="lead" style={{ maxWidth: 760, margin: "0 auto 28px", textAlign: "center" }}>{g.intro}</p>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>{" "}
          <WhatsAppCTA
            source={`best-${g.slug}-hero`}
            event="trial_request"
            message={`Hi! I want the best IPTV for ${g.short} — send me a free 24h trial.`}
            className="btn btn-green"
            meta={{ best_slug: g.slug }}
          >
            Free 24h trial
          </WhatsAppCTA>
        </div>

        <section className="section">
          <h2>What makes an IPTV service the best for {g.short}</h2>
          <div className="trust-grid">
            {g.criteria.map((c) => (
              <div key={c.label} className="trust-card">
                <div className="ic">✅</div>
                <h4>{c.label}</h4>
                <p>{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Why Best IPTV VIP is the top pick for {g.short}</h2>
          <ul className="bullet-list" style={{ maxWidth: 640, margin: "0 auto" }}>
            {g.reasons.map((r) => <li key={r}>✓ {r}</li>)}
          </ul>
          {g.seeAlso && g.seeAlso.length > 0 && (
            <div className="link-grid" style={{ marginTop: 20 }}>
              {g.seeAlso.map((s) => (
                <Link key={s.href} href={s.href} className="link-card">
                  <span aria-hidden="true" style={{ fontSize: 20 }}>➜</span>
                  <span>{s.label}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2>FAQ — best IPTV for {g.short}</h2>
          {g.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section" style={{ maxWidth: 560, margin: "0 auto" }}>
          <LeadForm
            intent="free_trial"
            source={`best-${g.slug}-form`}
            heading={`Try the best IPTV for ${g.short} — free 24h`}
            subheading="No card. We send your trial credentials to WhatsApp or email within 10 minutes."
          />
        </section>

        <section className="section">
          <h2>More buyer guides</h2>
          <div className="link-grid">
            {g.related.map((s) => {
              const r = BEST_GUIDES[s];
              if (!r) return null;
              return (
                <Link key={s} href={`/best/${s}`} className="link-card">
                  <span aria-hidden="true" style={{ fontSize: 22 }}>{r.icon}</span>
                  <span>Best IPTV for {r.short}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
