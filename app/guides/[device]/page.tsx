import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DEVICE_GUIDES } from "../../../lib/content/devices";
import { SITE, DEVICE_SLUGS, waLink, type DeviceSlug } from "../../../lib/site";

export function generateStaticParams() {
  return DEVICE_SLUGS.map((device) => ({ device }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ device: string }>;
}): Promise<Metadata> {
  const { device } = await params;
  const guide = DEVICE_GUIDES[device as DeviceSlug];
  if (!guide) return {};
  // The brand suffix comes from the root layout title template — appending it
  // here too is what produced "… | Best IPTV VIP | Best IPTV VIP".
  const title = `IPTV on ${guide.name}: Setup Guide`;
  return {
    title,
    description: guide.description,
    alternates: { canonical: `${SITE.domain}/guides/${guide.slug}` },
    openGraph: {
      title,
      description: guide.description,
      url: `${SITE.domain}/guides/${guide.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ device: string }>;
}) {
  const { device } = await params;
  const guide = DEVICE_GUIDES[device as DeviceSlug];
  if (!guide) notFound();

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.hero,
    description: guide.description,
    totalTime: "PT10M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    supply: guide.apps.map((a) => ({ "@type": "HowToSupply", name: a })),
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
    mainEntity: guide.troubleshooting.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <PageShell fabMessage={`Hi! I need help installing IPTV on ${guide.name}.`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Install Guides", href: "/guides/firestick" },
          { name: guide.name, href: `/guides/${guide.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 56, textAlign: "center", marginBottom: 12 }} aria-hidden="true">
          {guide.emoji}
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>{guide.hero}</h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 24px" }}>
          {guide.description}
        </p>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <a
            className="btn btn-green"
            href={waLink(`Hi! I need help installing IPTV on ${guide.name}.`, `Guide-${guide.slug}`)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Get help on WhatsApp
          </a>
        </div>

        <section className="section">
          <h2>Supported IPTV apps</h2>
          <ul className="bullet-list">
            {guide.apps.map((a) => <li key={a}>✓ {a}</li>)}
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

        <section className="section">
          <h2>Troubleshooting</h2>
          {guide.troubleshooting.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section cta-section">
          <h2>Ready to watch in 4K?</h2>
          <p>Get instant Best IPTV VIP credentials via WhatsApp — free 24h trial, no credit card.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <a
              className="btn btn-green"
              href={waLink("Hi! I want a free 24h trial.", `Guide-${guide.slug}-Trial`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Free 24h trial
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Other install guides</h2>
          <div className="link-grid">
            {DEVICE_SLUGS.filter((s) => s !== guide.slug).map((s) => (
              <Link key={s} href={`/guides/${s}`} className="link-card">
                <span style={{ fontSize: 22 }} aria-hidden="true">{DEVICE_GUIDES[s].emoji}</span>
                <span>{DEVICE_GUIDES[s].name}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
