import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { APP_GUIDES, APP_ORDER } from "../../../lib/content/apps";
import { SITE, APP_SLUGS, waLink, type AppSlug } from "../../../lib/site";

export function generateStaticParams() {
  return APP_SLUGS.map((app) => ({ app }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app } = await params;
  const guide = APP_GUIDES[app as AppSlug];
  if (!guide) return {};
  const title = `${guide.hero} | Best IPTV VIP`;
  return {
    title,
    description: guide.description,
    alternates: { canonical: `${SITE.domain}/apps/${guide.slug}` },
    openGraph: {
      title,
      description: guide.description,
      url: `${SITE.domain}/apps/${guide.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description: guide.description },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app } = await params;
  const guide = APP_GUIDES[app as AppSlug];
  if (!guide) notFound();

  const allSteps = [...guide.steps, ...guide.config];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.hero,
    description: guide.description,
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    tool: [{ "@type": "HowToTool", name: guide.name }],
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...guide.troubleshooting, ...guide.faq].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const others = APP_ORDER.filter((s) => s !== guide.slug).slice(0, 5);

  return (
    <PageShell fabMessage={`Hi! I need help setting up Best IPTV VIP on ${guide.name}.`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "IPTV Apps", href: "/apps" },
          { name: guide.name, href: `/apps/${guide.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 52, textAlign: "center", marginBottom: 10 }} aria-hidden="true">
          {guide.emoji}
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.5rem,5vw,2.5rem)" }}>{guide.hero}</h1>

        {/* Answer-first summary — GEO/LLM friendly */}
        <p className="lead" style={{ maxWidth: 760, margin: "14px auto 6px", textAlign: "center" }}>
          {guide.summary}
        </p>
        <p style={{ textAlign: "center", color: "#8a8f98", fontSize: 12, marginBottom: 20 }}>
          Updated {guide.updated} · {guide.price}
        </p>

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <a
            className="btn btn-green"
            href={waLink(`Hi! I need my login to set up ${guide.name}.`, `App-${guide.slug}`)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Get my login on WhatsApp
          </a>
        </div>

        <section className="section">
          <h2>Compatibility</h2>
          <ul className="bullet-list">
            {guide.platforms.map((p) => <li key={p}>✓ {p}</li>)}
          </ul>
          <p style={{ color: "#b9bcc2", marginTop: 10 }}>
            <strong>Connection method:</strong> {guide.connection.join(" · ")}
          </p>
          <p style={{ color: "#b9bcc2" }}>
            <strong>Best for:</strong> {guide.bestFor}
          </p>
        </section>

        <section className="section">
          <h2>Key features</h2>
          <ul className="bullet-list">
            {guide.features.map((f) => <li key={f}>★ {f}</li>)}
          </ul>
        </section>

        <section className="section">
          <h2>Step-by-step installation</h2>
          <ol className="steps-list">
            {guide.steps.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Mid-content contextual funnel */}
        <section className="section" style={{ textAlign: "center" }}>
          <p style={{ color: "#d7c9a0" }}>
            Don’t have credentials yet? Grab a{" "}
            <Link href="/free-trial" className="accent">free 24h trial</Link> or{" "}
            <Link href="/pricing" className="accent">view plans</Link> — activation takes minutes.
          </p>
        </section>

        <section className="section">
          <h2>Configuration &amp; tips</h2>
          <ol className="steps-list">
            {guide.config.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <h2>Troubleshooting {guide.short}</h2>
          {guide.troubleshooting.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
          <p style={{ marginTop: 14, color: "#b9bcc2" }}>
            Still stuck?{" "}
            <a
              className="accent"
              href={waLink(`Hi! I'm stuck setting up ${guide.name}.`, `App-${guide.slug}-Support`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Message support on WhatsApp
            </a>{" "}
            — we’ll walk you through it live.
          </p>
        </section>

        <section className="section">
          <h2>{guide.name} FAQ</h2>
          {guide.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        {guide.note && (
          <section className="section">
            <p style={{ color: "#8a8f98", fontSize: 13, fontStyle: "italic" }}>
              ⚠︎ {guide.note}
            </p>
          </section>
        )}

        {/* Money-page funnel */}
        <section className="section cta-section">
          <h2>Ready to watch 22,000+ channels in 4K?</h2>
          <p>
            {guide.name} is set up in minutes once you have your Best IPTV VIP line. Start free, then
            keep the plan that fits — no contract, cancel anytime.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing &amp; plans</Link>
            <a
              className="btn btn-green"
              href={waLink(`Hi! I want a free 24h trial for ${guide.name}.`, `App-${guide.slug}-Trial`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Free 24h trial
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Other IPTV apps</h2>
          <div className="link-grid">
            {others.map((s) => (
              <Link key={s} href={`/apps/${s}`} className="link-card">
                <span style={{ fontSize: 22 }} aria-hidden="true">{APP_GUIDES[s].emoji}</span>
                <span>{APP_GUIDES[s].name}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
