import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { PLATFORM_GUIDES } from "../../../lib/content/platforms";
import { APP_GUIDES } from "../../../lib/content/apps";
import { DEVICE_GUIDES } from "../../../lib/content/devices";
import { SITE, PLATFORM_SLUGS, waLink, type PlatformSlug } from "../../../lib/site";

export function generateStaticParams() {
  return PLATFORM_SLUGS.map((platform) => ({ platform }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ platform: string }>;
}): Promise<Metadata> {
  const { platform } = await params;
  const p = PLATFORM_GUIDES[platform as PlatformSlug];
  if (!p) return {};
  const title = `${p.hero} | Best IPTV VIP`;
  return {
    title,
    description: p.description,
    alternates: { canonical: `${SITE.domain}/platforms/${p.slug}` },
    openGraph: { title, description: p.description, url: `${SITE.domain}/platforms/${p.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: p.description },
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform } = await params;
  const p = PLATFORM_GUIDES[platform as PlatformSlug];
  if (!p) notFound();

  const money = DEVICE_GUIDES[p.funnelDevice];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: p.hero,
    description: p.description,
    totalTime: "PT10M",
    step: p.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...p.troubleshooting, ...p.faq].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const others = PLATFORM_SLUGS.filter((s) => s !== p.slug && PLATFORM_GUIDES[s].level === p.level).slice(0, 5);
  const statusColor = p.supportStatus === "Limited support" ? "#d98a8a" : "#4caf7d";

  return (
    <PageShell fabMessage={`Hi! I want to install IPTV on ${p.name}.`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Platforms", href: "/platforms" },
          { name: p.name, href: `/platforms/${p.slug}` },
        ]}
      />
      <article className="article">
        <div style={{ fontSize: 56, textAlign: "center", marginBottom: 12 }} aria-hidden="true">{p.emoji}</div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>{p.hero}</h1>
        <p style={{ textAlign: "center", fontSize: 12, marginBottom: 8 }}>
          <span style={{ color: statusColor, fontWeight: 700 }}>● {p.supportStatus}</span>
          <span style={{ color: "#888" }}>
            {" "}• Updated {new Date(p.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </p>

        {/* Answer-first */}
        <div className="section" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 20px", margin: "8px 0 20px" }}>
          <p style={{ color: "#eaeaf0", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "var(--gold)" }}>Quick answer: </strong>{p.answer}
          </p>
        </div>

        {/* Honest note (Niveau 4) */}
        {p.honestNote && (
          <div className="section" style={{ background: "rgba(217,138,138,0.08)", border: "1px solid rgba(217,138,138,0.25)", borderRadius: 14, padding: "16px 20px", margin: "0 0 24px" }}>
            <p style={{ color: "#f0dede", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#d98a8a" }}>Straight talk: </strong>{p.honestNote}
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <a
            className="btn btn-green"
            href={waLink(`Hi! I want to install IPTV on ${p.name}.`, `Platform-${p.slug}`)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Get help on WhatsApp
          </a>
        </div>

        <section className="section">
          <h2>Compatibility</h2>
          <ul className="bullet-list">
            {p.compatibility.map((c) => <li key={c}>✓ {c}</li>)}
          </ul>
        </section>

        {p.recommendedApps.length > 0 && (
          <section className="section">
            <h2>Recommended apps for {p.short}</h2>
            <div className="link-grid">
              {p.recommendedApps.map((a) => (
                <Link key={a} href={`/apps/${a}`} className="link-card">
                  <span style={{ fontSize: 22 }} aria-hidden="true">{APP_GUIDES[a].emoji}</span>
                  <span>{APP_GUIDES[a].name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <h2>Step-by-step installation</h2>
          <ol className="steps-list">
            {p.steps.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <h2>Troubleshooting</h2>
          {p.troubleshooting.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section">
          <h2>FAQ</h2>
          {p.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        {/* Funnel: trial + money page */}
        <section className="section cta-section">
          <h2>Ready to watch on {p.short}?</h2>
          <p>
            Start a free 24h trial with no card, or open the full{" "}
            <Link href={`/guides/${money.slug}`} style={{ color: "var(--gold)" }}>{money.name} install guide</Link>.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <a
              className="btn btn-green"
              href={waLink(`Hi! I want a free 24h trial for ${p.name}.`, `Platform-${p.slug}-Trial`)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Free 24h trial
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Other platforms</h2>
          <div className="link-grid">
            {others.map((s) => (
              <Link key={s} href={`/platforms/${s}`} className="link-card">
                <span style={{ fontSize: 20 }} aria-hidden="true">{PLATFORM_GUIDES[s].emoji}</span>
                <span>{PLATFORM_GUIDES[s].name}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
