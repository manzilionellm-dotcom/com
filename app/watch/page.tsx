import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { WATCH_GUIDE_LIST, type WatchGuide } from "../../lib/content/sports";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Watch Live Sports on IPTV — Football, F1, NFL, NBA, UFC & More",
  description:
    "How to watch live sports on IPTV in 2026 — Premier League, Champions League, F1, NFL, NBA, UFC, cricket, tennis and more in HD/4K on any device. From $5/mo, free trial.",
  alternates: { canonical: `${SITE.domain}/watch` },
};

const CATEGORY_ORDER: WatchGuide["category"][] = [
  "Football",
  "US Sports",
  "Motorsport",
  "Combat",
  "Cricket",
  "Tennis",
  "Other",
];

export default function WatchIndex() {
  const byCategory = new Map<WatchGuide["category"], WatchGuide[]>();
  for (const g of WATCH_GUIDE_LIST) {
    const list = byCategory.get(g.category) ?? [];
    list.push(g);
    byCategory.set(g.category, list);
  }

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Watch Live Sports on IPTV",
    url: `${SITE.domain}/watch`,
    hasPart: WATCH_GUIDE_LIST.map((g) => ({
      "@type": "WebPage",
      name: g.h1,
      url: `${SITE.domain}/watch/${g.slug}`,
    })),
  };

  return (
    <PageShell fabMessage="Hi! I want to watch live sports. Send me a free 24h trial.">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Watch", href: "/watch" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Watch Live Sports on IPTV in 4K
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 740, margin: "12px auto 24px" }}>
          Every major league and event, live in HD/4K on Firestick, Smart TV, Android, iPhone or MAG box —
          no cable, no Sky bundle, no per-event pay-per-view fees. Pick your sport to see exactly which
          feeds are included.
        </p>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>{" "}
          <WhatsAppCTA
            source="watch-index-hero"
            event="trial_request"
            message="Hi! I want a free 24h trial to watch live sports."
            className="btn btn-green"
          >
            Free 24h trial
          </WhatsAppCTA>
        </div>

        {CATEGORY_ORDER.map((cat) => {
          const items = byCategory.get(cat);
          if (!items || items.length === 0) return null;
          return (
            <section key={cat} className="section">
              <h2>{cat}</h2>
              <div className="link-grid">
                {items.map((g) => (
                  <Link key={g.slug} href={`/watch/${g.slug}`} className="link-card">
                    <span aria-hidden="true" style={{ fontSize: 22 }}>{g.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff" }}>Watch {g.short}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{g.season}</div>
                    </div>
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
