import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import WhatsAppCTA from "../../../components/WhatsAppCTA";
import { COMPARISONS, COMPARE_SLUGS } from "../../../lib/content/comparisons";
import { SITE } from "../../../lib/site";

export function generateStaticParams() {
  return COMPARE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = COMPARISONS[slug];
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${SITE.domain}/compare/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${SITE.domain}/compare/${c.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDescription,
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COMPARISONS[slug];
  if (!c) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.metaDescription,
    author: { "@type": "Organization", name: SITE.brand, url: SITE.domain },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.domain}/compare/${c.slug}`,
    },
    image: `${SITE.domain}/og-image.png`,
  };

  const usLabel = SITE.brand;
  const themLabel = c.competitor;

  return (
    <PageShell fabMessage={`Hi! I'm comparing Best IPTV VIP vs ${c.competitor}.`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Compare", href: "/compare" },
          { name: `vs ${c.competitorShort}`, href: `/compare/${c.slug}` },
        ]}
      />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>{c.h1}</h1>

        {/* Direct-answer block for AI Overviews */}
        <div
          className="answer-block"
          style={{
            background: "rgba(212,175,55,0.06)",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 10,
            padding: 18,
            margin: "20px auto 28px",
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
          <p style={{ margin: 0, lineHeight: 1.6, color: "#dcdce4", fontSize: 15 }}>{c.answer}</p>
        </div>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>{" "}
          <WhatsAppCTA
            source={`compare-${c.slug}-hero`}
            event="trial_request"
            message={`Hi! I'm comparing Best IPTV VIP vs ${c.competitor}. I want a free 24h trial.`}
            className="btn btn-green"
            meta={{ compare_slug: c.slug }}
          >
            Free 24h trial
          </WhatsAppCTA>
        </div>

        <section className="section">
          <h2>{usLabel} vs {themLabel} — feature comparison</h2>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{usLabel}</th>
                  <th>{themLabel}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr
                    key={r.feature}
                    className={r.winner === "us" ? "compare-row-hi" : undefined}
                  >
                    <td>{r.feature}</td>
                    <td>
                      {r.winner === "us" && (
                        <span style={{ color: "var(--green)", marginRight: 4 }}>✓</span>
                      )}
                      {r.us}
                    </td>
                    <td>
                      {r.winner === "them" && (
                        <span style={{ color: "var(--green)", marginRight: 4 }}>✓</span>
                      )}
                      {r.them}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <h2>Verdict by use case</h2>
          <div className="trust-grid">
            {c.verdict.map((v, i) => (
              <div key={i} className="trust-card">
                <div className="ic">{v.pick === "us" ? "🏆" : "⚖️"}</div>
                <h4>{v.audience}</h4>
                <p>
                  <strong>Pick:</strong> {v.pick === "us" ? usLabel : themLabel}
                  <br />
                  {v.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Pros and cons</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <div className="trust-card">
              <h4>{usLabel} — pros</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {c.pros.us.map((p) => <li key={p}>✓ {p}</li>)}
              </ul>
            </div>
            <div className="trust-card">
              <h4>{themLabel} — pros</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {c.pros.them.map((p) => <li key={p}>✓ {p}</li>)}
              </ul>
            </div>
            <div className="trust-card">
              <h4>{usLabel} — cons</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {c.cons.us.map((p) => <li key={p}>– {p}</li>)}
              </ul>
            </div>
            <div className="trust-card">
              <h4>{themLabel} — cons</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {c.cons.them.map((p) => <li key={p}>– {p}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>FAQ — {usLabel} vs {themLabel}</h2>
          {c.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section cta-section">
          <h2>Test it for 24h — free, no card</h2>
          <p>
            Try the same channels and 4K quality our paid customers get. Credentials sent on
            WhatsApp in under 10 minutes.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <WhatsAppCTA
              source={`compare-${c.slug}-footer`}
              event="trial_request"
              message={`Hi! I want a free 24h trial after reading the ${c.competitor} comparison.`}
              className="btn btn-green"
              meta={{ compare_slug: c.slug }}
            >
              Free 24h trial
            </WhatsAppCTA>
          </div>
        </section>

        <section className="section">
          <h2>Other comparisons</h2>
          <div className="link-grid">
            {COMPARE_SLUGS.filter((s) => s !== c.slug).map((s) => (
              <Link key={s} href={`/compare/${s}`} className="link-card">
                <span aria-hidden="true" style={{ fontSize: 22 }}>⚖️</span>
                <span>IPTV vs {COMPARISONS[s].competitorShort}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
