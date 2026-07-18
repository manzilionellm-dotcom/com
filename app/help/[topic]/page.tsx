import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { HELP_TOPICS, HELP_ORDER } from "../../../lib/content/help";
import { SITE, HELP_SLUGS, waLink, type HelpSlug } from "../../../lib/site";

export function generateStaticParams() {
  return HELP_SLUGS.map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = HELP_TOPICS[topic as HelpSlug];
  if (!t) return {};
  const title = `${t.title} | Best IPTV VIP Help`;
  return {
    title,
    description: t.description,
    alternates: { canonical: `${SITE.domain}/help/${t.slug}` },
    openGraph: { title, description: t.description, url: `${SITE.domain}/help/${t.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: t.description },
  };
}

export default async function HelpTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = HELP_TOPICS[topic as HelpSlug];
  if (!t) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t.title,
    description: t.description,
    step: t.solutions.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };

  const others = HELP_ORDER.filter((s) => s !== t.slug).slice(0, 5);

  return (
    <PageShell fabMessage={`Hi! I need help with: ${t.title}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Help Center", href: "/help" },
          { name: t.title, href: `/help/${t.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }} aria-hidden="true">
          {t.emoji}
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.5rem,5vw,2.4rem)" }}>{t.title}</h1>

        {/* Answer-first block */}
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
            Quick answer
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{t.answer}</p>
        </div>
        <p style={{ textAlign: "center", color: "#8a8f98", fontSize: 12, marginBottom: 24 }}>
          Updated {t.updated}
        </p>

        <section className="section">
          <h2>Probable causes</h2>
          <ul className="bullet-list">
            {t.causes.map((c) => <li key={c}>• {c}</li>)}
          </ul>
        </section>

        <section className="section">
          <h2>Step-by-step fix</h2>
          <ol className="steps-list">
            {t.solutions.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Support funnel — turn the problem into a contact */}
        <section className="section cta-section">
          <h2>Still not fixed?</h2>
          <p>
            Send us your device, app and the exact message on screen — our team fixes most issues in
            a couple of minutes on WhatsApp.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <a
              className="btn btn-green"
              href={waLink(`Hi! I still have this issue: ${t.title}. My device/app is: `, `Help-${t.slug}`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Message support on WhatsApp
            </a>
            <Link className="btn btn-gold" href="/pricing">See plans</Link>
          </div>
        </section>

        <section className="section">
          <h2>FAQ</h2>
          {t.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section">
          <h2>Other help topics</h2>
          <div className="link-grid">
            {others.map((s) => (
              <Link key={s} href={`/help/${s}`} className="link-card">
                <span style={{ fontSize: 20 }} aria-hidden="true">{HELP_TOPICS[s].emoji}</span>
                <span>{HELP_TOPICS[s].title}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
