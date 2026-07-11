import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { BEST_GUIDE_LIST, type BestGuide } from "../../lib/content/best";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Best IPTV Buyer Guides — By Device, Sport, Region & Price",
  description:
    "Best IPTV guides for 2026 — the top pick for Firestick, Smart TV, Android, iPhone, sports, 4K, UK, USA, Arabic and cheap plans. Honest criteria + free 24h trial.",
  alternates: { canonical: `${SITE.domain}/best` },
};

const GROUP_ORDER: BestGuide["group"][] = ["Devices", "Use cases", "Regions", "Value"];

export default function BestIndex() {
  const byGroup = new Map<BestGuide["group"], BestGuide[]>();
  for (const g of BEST_GUIDE_LIST) {
    const list = byGroup.get(g.group) ?? [];
    list.push(g);
    byGroup.set(g.group, list);
  }

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best IPTV Buyer Guides",
    url: `${SITE.domain}/best`,
    hasPart: BEST_GUIDE_LIST.map((g) => ({
      "@type": "WebPage",
      name: g.h1,
      url: `${SITE.domain}/best/${g.slug}`,
    })),
  };

  return (
    <PageShell fabMessage="Hi! Help me pick the best IPTV plan. Send me a free 24h trial.">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Best IPTV", href: "/best" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Best IPTV Buyer Guides (2026)
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 740, margin: "12px auto 24px" }}>
          Honest, use-case-specific guides to picking the right IPTV — by device, by sport, by region
          and by price. Each guide lists the criteria that actually matter, then how Best IPTV VIP
          measures up. Every one comes with a free 24h trial.
        </p>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>{" "}
          <WhatsAppCTA
            source="best-index-hero"
            event="trial_request"
            message="Hi! Help me pick the best IPTV plan — send me a free 24h trial."
            className="btn btn-green"
          >
            Free 24h trial
          </WhatsAppCTA>
        </div>

        {GROUP_ORDER.map((group) => {
          const items = byGroup.get(group);
          if (!items || items.length === 0) return null;
          return (
            <section key={group} className="section">
              <h2>{group}</h2>
              <div className="link-grid">
                {items.map((g) => (
                  <Link key={g.slug} href={`/best/${g.slug}`} className="link-card">
                    <span aria-hidden="true" style={{ fontSize: 22 }}>{g.icon}</span>
                    <span style={{ fontWeight: 700, color: "#fff" }}>Best IPTV for {g.short}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </article>
    </PageShell>
  );
}
