import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { APP_GUIDES } from "../../lib/content/apps";
import { SITE, APP_SLUGS } from "../../lib/site";

export const metadata: Metadata = {
  title: "Best IPTV Player Apps & Boxes — Setup Guides (2026) | Best IPTV VIP",
  description:
    "Setup guides for every top IPTV player and box: TiviMate, IPTV Smarters Pro, IBO Player, XCIPTV, Duplex Play, Formuler Z, STB Emulator. Pick your app and follow the step-by-step install.",
  alternates: { canonical: `${SITE.domain}/apps` },
};

export default function AppsHubPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IPTV Player Apps & Boxes",
    itemListElement: APP_SLUGS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: APP_GUIDES[s].name,
      url: `${SITE.domain}/apps/${s}`,
    })),
  };

  const players = APP_SLUGS.filter((s) => APP_GUIDES[s].category === "IPTV Player");
  const boxes = APP_SLUGS.filter((s) => APP_GUIDES[s].category === "Set-Top Box");

  return (
    <PageShell fabMessage="Hi! Which IPTV app should I use for my device?">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Breadcrumbs items={[{ name: "IPTV Apps", href: "/apps" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          IPTV Player Apps & Boxes — Setup Guides
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 740, margin: "12px auto 32px" }}>
          Every device needs the right IPTV player. Pick your app below for an honest, step-by-step
          setup guide with configuration tips, troubleshooting and a FAQ. All work with your Best
          IPTV VIP subscription.
        </p>

        <section className="section">
          <h2>IPTV player apps</h2>
          <div className="link-grid">
            {players.map((s) => {
              const a = APP_GUIDES[s];
              return (
                <Link key={s} href={`/apps/${s}`} className="link-card">
                  <span style={{ fontSize: 30 }} aria-hidden="true">{a.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{a.bestFor}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2>IPTV boxes</h2>
          <div className="link-grid">
            {boxes.map((s) => {
              const a = APP_GUIDES[s];
              return (
                <Link key={s} href={`/apps/${s}`} className="link-card">
                  <span style={{ fontSize: 30 }} aria-hidden="true">{a.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{a.bestFor}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="section cta-section">
          <h2>Not sure which app fits your device?</h2>
          <p>Tell us your device on WhatsApp and we&apos;ll pick the best player and send your login — free 24h trial, no card.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <Link className="btn btn-ghost" href="/free-trial">Start free trial</Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
