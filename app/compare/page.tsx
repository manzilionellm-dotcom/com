import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { COMPARISONS, COMPARE_SLUGS } from "../../lib/content/comparisons";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Comparisons — vs Cable, Netflix, Disney+, Sling, YouTube TV",
  description:
    "Compare Best IPTV VIP head-to-head against cable TV, Netflix, Disney+, Sling TV and YouTube TV. Price, channels, 4K coverage, sports, support — honest 2026 verdicts.",
  alternates: { canonical: `${SITE.domain}/compare` },
};

export default function CompareIndex() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Compare", href: "/compare" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          IPTV vs Cable, Netflix, Disney+ and More
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          Head-to-head comparisons updated for 2026 — price, channels, 4K coverage, sports, support.
          Pick the matchup that fits your current subscription and see exactly where Best IPTV VIP wins
          or loses.
        </p>

        <div className="link-grid">
          {COMPARE_SLUGS.map((slug) => {
            const c = COMPARISONS[slug];
            return (
              <Link key={slug} href={`/compare/${slug}`} className="link-card">
                <span aria-hidden="true" style={{ fontSize: 22 }}>⚖️</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>IPTV vs {c.competitorShort}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{c.metaDescription.slice(0, 90)}…</div>
                </div>
              </Link>
            );
          })}
        </div>
      </article>
    </PageShell>
  );
}
