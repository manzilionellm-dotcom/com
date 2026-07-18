import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { APP_GUIDES } from "../../../lib/content/apps";
import { DEVICE_GUIDES } from "../../../lib/content/devices";
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

  const money = DEVICE_GUIDES[guide.funnelDevice];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.hero,
    description: guide.description,
    totalTime: "PT10M",
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

  const others = APP_SLUGS.filter((s) => s !== guide.slug).slice(0, 5);

  return (
    <PageShell fabMessage={`Hi! I need help setting up ${guide.name}.`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "IPTV Apps", href: "/apps" },
          { name: guide.name, href: `/apps/${guide.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 56, textAlign: "center", marginBottom: 12 }} aria-hidden="true">{guide.emoji}</div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>{guide.hero}</h1>
        <p style={{ textAlign: "center", color: "#888", fontSize: 12, marginBottom: 8 }}>
          {guide.category} • Updated {new Date(guide.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        {/* Answer-first block for featured snippets / GEO */}
        <div className="section" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 20px", margin: "8px 0 24px" }}>
          <p style={{ color: "#eaeaf0", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "var(--gold)" }}>Quick answer: </strong>{guide.answer}
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a
            className="btn btn-green"
            href={waLink(`Hi! I need help setting up ${guide.name}.`, `App-${guide.slug}`)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Get setup help on WhatsApp
          </a>
        </div>

        <section className="section">
          <h2>Compatibility</h2>
          <ul className="bullet-list">
            {guide.platforms.map((p) => <li key={p}>✓ {p}</li>)}
          </ul>
          <p style={{ color: "#bbb", fontSize: 13.5, marginTop: 10 }}>
            <strong>Login method:</strong> {guide.loginMethod} &nbsp;•&nbsp; <strong>Price:</strong> {guide.price}
          </p>
        </section>

        <section className="section">
          <h2>Pros &amp; cons</h2>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
            <div>
              <h4 style={{ color: "#4caf7d", marginBottom: 8 }}>Strengths</h4>
              <ul className="bullet-list">{guide.pros.map((p) => <li key={p}>✓ {p}</li>)}</ul>
            </div>
            <div>
              <h4 style={{ color: "#d98a8a", marginBottom: 8 }}>Limitations</h4>
              <ul className="bullet-list">{guide.cons.map((c) => <li key={c}>• {c}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Step-by-step setup</h2>
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
          <h2>Configuration &amp; best settings</h2>
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
          <h2>Troubleshooting</h2>
          {guide.troubleshooting.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section">
          <h2>FAQ</h2>
          {guide.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        {/* Funnel: trial + money page for the concerned device */}
        <section className="section cta-section">
          <h2>Ready to watch on {money.name}?</h2>
          <p>
            {guide.name} works best with a stable Best IPTV VIP line. Start a free 24h trial, or open the
            full <Link href={`/guides/${money.slug}`} style={{ color: "var(--gold)" }}>{money.name} install guide</Link>.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <a
              className="btn btn-green"
              href={waLink(`Hi! I set up ${guide.name} and want a free 24h trial.`, `App-${guide.slug}-Trial`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Free 24h trial
            </a>
          </div>
          <p style={{ marginTop: 14, fontSize: 13 }}>
            <Link href={`/guides/${money.slug}`} style={{ color: "#cfcfd6" }}>
              → Full {money.name} setup guide
            </Link>
          </p>
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
