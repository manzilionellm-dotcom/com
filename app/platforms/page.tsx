import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { PLATFORM_GUIDES } from "../../lib/content/platforms";
import { SITE, PLATFORM_SLUGS } from "../../lib/site";

export const metadata: Metadata = {
  title: "Install IPTV on Any Platform — Fire TV, Samsung, LG, Apple TV & More | Best IPTV VIP",
  description:
    "Platform-by-platform IPTV install guides: Fire TV, Android TV, Google TV, Apple TV, Samsung, LG, NVIDIA Shield, Windows, Mac, iPhone, iPad — plus honest Roku & Chromecast advice.",
  alternates: { canonical: `${SITE.domain}/platforms` },
};

const levelLabel: Record<number, string> = {
  2: "Popular platforms",
  3: "Phones & computers",
  4: "Limited support (honest advice)",
};

export default function PlatformsHubPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IPTV platform install guides",
    itemListElement: PLATFORM_SLUGS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: PLATFORM_GUIDES[s].name,
      url: `${SITE.domain}/platforms/${s}`,
    })),
  };

  const byLevel = [2, 3, 4] as const;

  return (
    <PageShell fabMessage="Hi! Which platform do you want to install IPTV on?">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Breadcrumbs items={[{ name: "Platforms", href: "/platforms" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Install IPTV on Any Platform
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 740, margin: "12px auto 32px" }}>
          Pick your exact platform for a step-by-step install guide with the best player app, settings
          and troubleshooting. We give straight advice — including where support is limited.
        </p>

        {byLevel.map((lvl) => (
          <section key={lvl} className="section">
            <h2>{levelLabel[lvl]}</h2>
            <div className="link-grid">
              {PLATFORM_SLUGS.filter((s) => PLATFORM_GUIDES[s].level === lvl).map((s) => {
                const p = PLATFORM_GUIDES[s];
                return (
                  <Link key={s} href={`/platforms/${s}`} className="link-card">
                    <span style={{ fontSize: 28 }} aria-hidden="true">{p.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff" }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: p.supportStatus === "Limited support" ? "#d98a8a" : "#888", marginTop: 4 }}>
                        {p.supportStatus}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="section cta-section">
          <h2>Not sure which guide is yours?</h2>
          <p>Tell us your device on WhatsApp and we&apos;ll point you to the right setup — plus a free 24h trial, no card.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <Link className="btn btn-ghost" href="/apps">Browse IPTV apps</Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
