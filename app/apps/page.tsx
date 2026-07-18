import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { APP_GUIDES, APP_ORDER } from "../../lib/content/apps";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Apps & Players — Setup Guides for TiviMate, Smarters & More",
  description:
    "Pick your IPTV player and follow a full 2026 setup guide for Best IPTV VIP: IPTV Smarters Pro, TiviMate, IBO Player Pro, XCIPTV, Duplex, Sparkle TV, STB Emulator and Formuler Z. Xtream Codes login, EPG, catch-up.",
  alternates: { canonical: `${SITE.domain}/apps` },
};

export default function AppsHubPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IPTV apps and players supported by Best IPTV VIP",
    itemListElement: APP_ORDER.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: APP_GUIDES[slug].name,
      url: `${SITE.domain}/apps/${slug}`,
    })),
  };

  return (
    <PageShell fabMessage="Hi! Which IPTV app should I use, and can you send my login?">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Breadcrumbs items={[{ name: "IPTV Apps", href: "/apps" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          IPTV Apps &amp; Players — Setup Guides
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 760, margin: "12px auto 8px" }}>
          Best IPTV VIP works in every major IPTV player. Pick yours for a step-by-step 2026 setup
          guide — most connect in under 5 minutes with the Xtream Codes login we send on WhatsApp.
        </p>
        <p style={{ textAlign: "center", color: "#9a8", fontSize: 13, marginBottom: 28 }}>
          Not sure which to use? <strong>IPTV Smarters Pro</strong> (every device) or{" "}
          <strong>TiviMate</strong> (Android TV / Firestick) are the safest picks.
        </p>

        <div className="link-grid">
          {APP_ORDER.map((slug) => {
            const a = APP_GUIDES[slug];
            return (
              <Link key={slug} href={`/apps/${slug}`} className="link-card">
                <span style={{ fontSize: 30 }} aria-hidden="true">{a.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: "#8a8f98", marginTop: 4 }}>
                    {a.platforms.slice(0, 2).join(" · ")}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="section cta-section" style={{ marginTop: 36 }}>
          <h2>Get your login and start watching</h2>
          <p>
            Every guide needs one thing: your Best IPTV VIP credentials. Start a free 24h trial —
            no credit card — and we send your Xtream login on WhatsApp in minutes.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <Link className="btn btn-green" href="/free-trial">Free 24h trial</Link>
          </div>
        </section>

        <section className="section">
          <h2>Prefer a guide by device instead of by app?</h2>
          <p style={{ color: "#b9bcc2" }}>
            If you’d rather start from your hardware, use our{" "}
            <Link href="/devices" className="accent">device install guides</Link> for Firestick,
            Smart TV, Android, iPhone/iPad, MAG box and PC/Mac.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
