import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import WhatsAppCTA from "../../../components/WhatsAppCTA";
import AnswerBlock from "../../../components/AnswerBlock";
import LeadForm from "../../../components/LeadForm";
import { ALTERNATIVES, ALTERNATIVE_SLUGS } from "../../../lib/content/alternatives";
import { SITE } from "../../../lib/site";

export function generateStaticParams() {
  return ALTERNATIVE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ALTERNATIVES[slug];
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `${SITE.domain}/alternatives/${a.slug}` },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      url: `${SITE.domain}/alternatives/${a.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: a.metaTitle,
      description: a.metaDescription,
    },
  };
}

export default async function AlternativePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = ALTERNATIVES[slug];
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
    headline: a.h1,
    description: a.metaDescription,
    author: { "@type": "Organization", name: SITE.brand, url: SITE.domain },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.domain}/alternatives/${a.slug}` },
    image: `${SITE.domain}/og-image.png`,
  };

  return (
    <PageShell fabMessage={`Hi! I'm switching from ${a.competitor}. Send me a free 24h trial.`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Alternatives", href: "/alternatives" },
          { name: a.competitorShort, href: `/alternatives/${a.slug}` },
        ]}
      />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>
          <span aria-hidden="true" style={{ marginRight: 8 }}>{a.icon}</span>
          {a.h1}
        </h1>

        <AnswerBlock>{a.answer}</AnswerBlock>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>{" "}
          <WhatsAppCTA
            source={`alt-${a.slug}-hero`}
            event="trial_request"
            message={`Hi! I'm switching from ${a.competitor} — send me a free 24h trial.`}
            className="btn btn-green"
            meta={{ alt_slug: a.slug }}
          >
            Free 24h trial
          </WhatsAppCTA>
        </div>

        <section className="section">
          <h2>Why people leave {a.competitorShort}</h2>
          <ul className="bullet-list" style={{ maxWidth: 640, margin: "0 auto" }}>
            {a.leaving.map((l) => <li key={l}>– {l}</li>)}
          </ul>
        </section>

        <section className="section">
          <h2>What you keep &amp; what you gain</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <div className="trust-card">
              <div className="ic">🔒</div>
              <h4>You keep</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {a.keep.map((k) => <li key={k}>✓ {k}</li>)}
              </ul>
            </div>
            <div className="trust-card">
              <div className="ic">🚀</div>
              <h4>You gain</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {a.gain.map((g) => <li key={g}>✓ {g}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>How to switch from {a.competitorShort} in 3 steps</h2>
          <div className="steps-grid">
            {a.migration.map((m, i) => (
              <div key={i} className="step">
                <div className="step-num">{i + 1}</div>
                <h4 style={{ margin: "0 0 4px", color: "#fff", fontSize: 15 }}>{m.t}</h4>
                <p>{m.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>FAQ — switching from {a.competitorShort}</h2>
          {a.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section" style={{ maxWidth: 560, margin: "0 auto" }}>
          <LeadForm
            intent="free_trial"
            source={`alt-${a.slug}-form`}
            heading={`Leaving ${a.competitorShort}? Try free for 24h`}
            subheading="No card. Test the switch, then cancel your old bill only when you're happy."
          />
        </section>

        <section className="section">
          <h2>More switching guides</h2>
          <div className="link-grid">
            {a.related.map((s) => {
              const r = ALTERNATIVES[s];
              if (!r) return null;
              return (
                <Link key={s} href={`/alternatives/${s}`} className="link-card">
                  <span aria-hidden="true" style={{ fontSize: 22 }}>{r.icon}</span>
                  <span>Best {r.competitorShort} alternative</span>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
