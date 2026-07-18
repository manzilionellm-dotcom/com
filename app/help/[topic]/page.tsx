import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { HELP_ARTICLES } from "../../../lib/content/help";
import { DEVICE_GUIDES } from "../../../lib/content/devices";
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
  const a = HELP_ARTICLES[topic as HelpSlug];
  if (!a) return {};
  const title = `${a.title} — IPTV Fix | Best IPTV VIP`;
  return {
    title,
    description: a.description,
    alternates: { canonical: `${SITE.domain}/help/${a.slug}` },
    openGraph: { title, description: a.description, url: `${SITE.domain}/help/${a.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: a.description },
  };
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const a = HELP_ARTICLES[topic as HelpSlug];
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: a.title,
    description: a.description,
    step: a.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  };

  const others = HELP_SLUGS.filter((s) => s !== a.slug).slice(0, 5);

  return (
    <PageShell fabMessage={`Hi! I'm having this issue: ${a.title}.`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Help Center", href: "/help" },
          { name: a.title, href: `/help/${a.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 52, textAlign: "center", marginBottom: 12 }} aria-hidden="true">{a.emoji}</div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.4rem)" }}>{a.title}</h1>
        <p style={{ textAlign: "center", color: "#888", fontSize: 12, marginBottom: 8 }}>
          Updated {new Date(a.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        {/* Answer-first */}
        <div className="section" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 20px", margin: "8px 0 24px" }}>
          <p style={{ color: "#eaeaf0", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "var(--gold)" }}>Fastest fix: </strong>{a.answer}
          </p>
        </div>

        <section className="section">
          <h2>Most likely causes</h2>
          <ul className="bullet-list">{a.causes.map((c) => <li key={c}>• {c}</li>)}</ul>
        </section>

        <section className="section">
          <h2>Step-by-step solution</h2>
          <ol className="steps-list">
            {a.steps.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <h2>FAQ</h2>
          {a.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        {/* Funnel: turn a problem into a support contact + trial */}
        <section className="section cta-section">
          <h2>Still stuck? We&apos;ll fix it for you</h2>
          <p>
            Send us a message on WhatsApp describing what you see — most issues are solved in minutes. New here?
            Grab a free 24h trial or open the <Link href={`/guides/${money.slug}`} style={{ color: "var(--gold)" }}>{money.name} guide</Link>.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <a
              className="btn btn-green"
              href={waLink(`Hi! I'm having this issue: ${a.title}. Steps didn't fully fix it.`, `Help-${a.slug}`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Get help on WhatsApp
            </a>
            <Link className="btn btn-gold" href="/free-trial">Free 24h trial</Link>
          </div>
        </section>

        <section className="section">
          <h2>More help topics</h2>
          <div className="link-grid">
            {others.map((s) => (
              <Link key={s} href={`/help/${s}`} className="link-card">
                <span style={{ fontSize: 20 }} aria-hidden="true">{HELP_ARTICLES[s].emoji}</span>
                <span>{HELP_ARTICLES[s].title}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
