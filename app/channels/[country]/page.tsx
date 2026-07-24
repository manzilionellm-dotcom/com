import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { COUNTRY_PAGES } from "../../../lib/content/countries";
import { SITE, COUNTRY_SLUGS, waLink, type CountrySlug } from "../../../lib/site";

export function generateStaticParams() {
  return COUNTRY_SLUGS.map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const page = COUNTRY_PAGES[country as CountrySlug];
  if (!page) return {};
  // Brand suffix is added by the root layout title template — do not repeat it.
  const title = `${page.name.split(" (")[0]} — Channel List`;
  return {
    title,
    description: page.description,
    alternates: { canonical: `${SITE.domain}/channels/${page.slug}` },
    openGraph: {
      title,
      description: page.description,
      url: `${SITE.domain}/channels/${page.slug}`,
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const page = COUNTRY_PAGES[country as CountrySlug];
  if (!page) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: page.hero,
    description: page.description,
    brand: { "@type": "Brand", name: SITE.brand },
    // No aggregateRating: we hold no verifiable review corpus. Re-add only
    // when ratings come from a real, auditable review source.
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "5",
      highPrice: "60",
      offerCount: "4",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const groups: { title: string; items: string[] }[] = [
    { title: "Top channels", items: page.channelsHero },
    { title: "Sports", items: page.sportsChannels },
    { title: "News", items: page.newsChannels },
    { title: "Entertainment", items: page.entertainmentChannels },
    { title: "Kids", items: page.kidsChannels },
  ];

  return (
    <PageShell fabMessage={`Hi! I want ${page.name} IPTV.`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Channels", href: "/channels" },
          { name: page.name, href: `/channels/${page.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 56, textAlign: "center", marginBottom: 12 }} aria-hidden="true">
          {page.flag}
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>{page.hero}</h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 24px" }}>
          {page.description}
        </p>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <a
            className="btn btn-green"
            href={waLink(`Hi! I want ${page.name} channels.`, `Country-${page.slug}`)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Order on WhatsApp
          </a>
          {" "}
          <a
            className="btn btn-ghost"
            href={waLink(`Hi! I want a free 24h trial for ${page.name}.`, `Country-${page.slug}-Trial`)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Free 24h trial
          </a>
        </div>

        {groups.map((g) => (
          <section key={g.title} className="section">
            <h2>{g.title}</h2>
            <div className="modal-channels">
              {g.items.map((c) => (
                <div key={c} className="modal-chip">
                  <span className="modal-chip-name">{c}</span>
                  <span aria-hidden="true">📺</span>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="section">
          <h2>VOD highlights</h2>
          <ul className="bullet-list">
            {page.vodHighlights.map((v) => <li key={v}>✓ {v}</li>)}
          </ul>
        </section>

        <section className="section">
          <h2>FAQ</h2>
          {page.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section cta-section">
          <h2>Start watching {page.name} today</h2>
          <p>Free 24h trial, no credit card. Activation in under 10 minutes via WhatsApp.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <a
              className="btn btn-green"
              href={waLink(`Hi! I want a free 24h trial for ${page.name}.`, `Country-${page.slug}-CTA`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Free trial
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Other regions</h2>
          <div className="link-grid">
            {COUNTRY_SLUGS.filter((s) => s !== page.slug).map((s) => (
              <Link key={s} href={`/channels/${s}`} className="link-card">
                <span aria-hidden="true" style={{ fontSize: 22 }}>{COUNTRY_PAGES[s].flag}</span>
                <span>{COUNTRY_PAGES[s].name}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
