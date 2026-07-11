import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Breadcrumbs from "../../../components/Breadcrumbs";
import WhatsAppCTA from "../../../components/WhatsAppCTA";
import { WATCH_GUIDES, WATCH_SLUGS } from "../../../lib/content/sports";
import { SITE } from "../../../lib/site";

export function generateStaticParams() {
  return WATCH_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = WATCH_GUIDES[slug];
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: `${SITE.domain}/watch/${g.slug}` },
    openGraph: {
      title: g.metaTitle,
      description: g.metaDescription,
      url: `${SITE.domain}/watch/${g.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: g.metaTitle,
      description: g.metaDescription,
    },
  };
}

const SETUP_STEPS = [
  "Message us on WhatsApp and tell us your device (Firestick, Smart TV, phone…).",
  "Choose a plan and pay securely — or start the free 24h trial with no card.",
  "Receive your M3U link and login. Load it into TiviMate or IPTV Smarters.",
  "Open the sport's channel and watch live in HD/4K within 10 minutes.",
];

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = WATCH_GUIDES[slug];
  if (!g) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to watch ${g.short} live`,
    description: g.answer,
    step: SETUP_STEPS.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.metaDescription,
    author: { "@type": "Organization", name: SITE.brand, url: SITE.domain },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE.domain}/icon-512.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.domain}/watch/${g.slug}`,
    },
    image: `${SITE.domain}/og-image.png`,
  };

  return (
    <PageShell fabMessage={`Hi! I want to watch ${g.short} live. Send me a free 24h trial.`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Breadcrumbs
        items={[
          { name: "Watch", href: "/watch" },
          { name: g.short, href: `/watch/${g.slug}` },
        ]}
      />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>
          <span aria-hidden="true" style={{ marginRight: 8 }}>{g.icon}</span>
          {g.h1}
        </h1>

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
          <p style={{ margin: 0, lineHeight: 1.6, color: "#dcdce4", fontSize: 15 }}>{g.answer}</p>
        </div>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>{" "}
          <WhatsAppCTA
            source={`watch-${g.slug}-hero`}
            event="trial_request"
            message={`Hi! I want to watch ${g.short} live. Send me a free 24h trial.`}
            className="btn btn-green"
            meta={{ watch_slug: g.slug }}
          >
            Free 24h trial
          </WhatsAppCTA>
        </div>

        <section className="section">
          <h2>What&apos;s included</h2>
          <div className="trust-grid">
            <div className="trust-card">
              <div className="ic">🏆</div>
              <h4>Competitions</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {g.competitions.map((c) => <li key={c}>✓ {c}</li>)}
              </ul>
            </div>
            <div className="trust-card">
              <div className="ic">{g.icon}</div>
              <h4>Teams &amp; stars</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {g.highlights.map((h) => <li key={h}>▶ {h}</li>)}
              </ul>
            </div>
            <div className="trust-card">
              <div className="ic">📡</div>
              <h4>Channels &amp; feeds</h4>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                {g.broadcasters.map((b) => <li key={b}>📺 {b}</li>)}
              </ul>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#888", fontSize: 13, marginTop: 14 }}>
            <strong style={{ color: "var(--gold)" }}>Season:</strong> {g.season}
          </p>
        </section>

        <section className="section">
          <h2>Why watch {g.short} on Best IPTV VIP</h2>
          <div className="trust-grid">
            {g.why.map((w) => (
              <div key={w} className="trust-card">
                <div className="ic">✅</div>
                <p style={{ margin: 0 }}>{w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>How to watch {g.short} live in 4 steps</h2>
          <div className="steps-grid">
            {SETUP_STEPS.map((s, i) => (
              <div key={i} className="step">
                <div className="step-num">{i + 1}</div>
                <p>{s}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <WhatsAppCTA
              source={`watch-${g.slug}-steps`}
              event="trial_request"
              message={`Hi! Set me up to watch ${g.short} live — I want the free 24h trial.`}
              className="btn btn-gold"
              meta={{ watch_slug: g.slug }}
            >
              Start watching now
            </WhatsAppCTA>
          </div>
        </section>

        <section className="section">
          <h2>FAQ — watching {g.short} live</h2>
          {g.faq.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="section cta-section">
          <h2>Watch {g.short} free for 24h — no card</h2>
          <p>
            Test the exact feeds and 4K quality our paid members get. Credentials arrive on
            WhatsApp in under 10 minutes.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <WhatsAppCTA
              source={`watch-${g.slug}-footer`}
              event="trial_request"
              message={`Hi! I want a free 24h trial to watch ${g.short} live.`}
              className="btn btn-green"
              meta={{ watch_slug: g.slug }}
            >
              Free 24h trial
            </WhatsAppCTA>
          </div>
        </section>

        <section className="section">
          <h2>More sports to watch live</h2>
          <div className="link-grid">
            {g.related.map((s) => {
              const r = WATCH_GUIDES[s];
              if (!r) return null;
              return (
                <Link key={s} href={`/watch/${s}`} className="link-card">
                  <span aria-hidden="true" style={{ fontSize: 22 }}>{r.icon}</span>
                  <span>Watch {r.short} live</span>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
