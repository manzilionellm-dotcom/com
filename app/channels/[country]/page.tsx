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
  const title = `${page.hero} | Best IPTV VIP`;
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
    { title: "Viewing checklist", items: page.channelsHero },
    { title: "Sports", items: page.sportsChannels },
    { title: "News", items: page.newsChannels },
    { title: "Entertainment", items: page.entertainmentChannels },
    { title: "Kids", items: page.kidsChannels },
  ];

  return (
    <PageShell regionalGuide fabMessage={`Can you help me check my device settings for ${page.name}?`}>
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
            href={waLink(`Which device settings should I check for ${page.name}?`, `Country-${page.slug}`)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Ask about device setup
          </a>
          {" "}
          <a
            className="btn btn-ghost"
            href="#region-faq"
          >
            Read the regional FAQ
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
          <h2>On-demand viewing checks</h2>
          <ul className="bullet-list">
            {page.vodHighlights.map((v) => <li key={v}>✓ {v}</li>)}
          </ul>
        </section>

        <section className="section">
          <h2 id="region-faq">FAQ</h2>
          {page.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section cta-section">
          <h2>Planning your viewing setup</h2>
          <p>Read the regional FAQ, no credit card. Activation in under 10 minutes via WhatsApp.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/devices">Find your device</Link>
            <a
              className="btn btn-green"
              href={waLink(`I need device setup help for ${page.name}.`, `Country-${page.slug}-Support`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Ask for setup help
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
