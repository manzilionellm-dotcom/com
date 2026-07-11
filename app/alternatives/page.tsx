import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { ALTERNATIVE_LIST } from "../../lib/content/alternatives";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Alternatives — Switch From Netflix, Cable, YouTube TV & More",
  description:
    "Thinking of switching? See the best IPTV alternative to Netflix, cable, Sling TV, YouTube TV, Disney+, Hulu, DIRECTV STREAM and fuboTV — what you keep, what you gain, how to move. Free 24h trial.",
  alternates: { canonical: `${SITE.domain}/alternatives` },
};

export default function AlternativesIndex() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best IPTV Alternatives",
    url: `${SITE.domain}/alternatives`,
    hasPart: ALTERNATIVE_LIST.map((a) => ({
      "@type": "WebPage",
      name: a.h1,
      url: `${SITE.domain}/alternatives/${a.slug}`,
    })),
  };

  return (
    <PageShell fabMessage="Hi! I want to switch to IPTV. Send me a free 24h trial.">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Alternatives", href: "/alternatives" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Best IPTV Alternatives (2026)
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 740, margin: "12px auto 24px" }}>
          Ready to cut a bill? These guides show exactly what you keep, what you gain, and how to
          switch — from streaming apps to cable and live-TV services. Every switch comes with a free
          24h trial so you never cancel before you&apos;re sure.
        </p>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>{" "}
          <WhatsAppCTA
            source="alt-index-hero"
            event="trial_request"
            message="Hi! I want to switch to IPTV — send me a free 24h trial."
            className="btn btn-green"
          >
            Free 24h trial
          </WhatsAppCTA>
        </div>

        <div className="link-grid">
          {ALTERNATIVE_LIST.map((a) => (
            <Link key={a.slug} href={`/alternatives/${a.slug}`} className="link-card">
              <span aria-hidden="true" style={{ fontSize: 22 }}>{a.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#fff" }}>Best {a.competitorShort} alternative</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{a.metaDescription.slice(0, 84)}…</div>
              </div>
            </Link>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
