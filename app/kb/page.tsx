import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { KB_ARTICLES } from "../../lib/content/kb";
import { SITE, KB_SLUGS } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Knowledge Base — How IPTV Works, Setup & Requirements | Best IPTV VIP",
  description:
    "Clear, answer-first guides to how IPTV works: how to install it, which device to choose, internet speed requirements, video quality, Xtream Codes vs M3U, and EPG explained.",
  alternates: { canonical: `${SITE.domain}/kb` },
};

export default function KbHubPage() {
  return (
    <PageShell fabMessage="Hi! I have a question about how IPTV works.">
      <Breadcrumbs items={[{ name: "Knowledge Base", href: "/kb" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>IPTV Knowledge Base</h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          The most-asked IPTV questions, answered clearly and up to date for 2026. Each guide starts
          with a straight answer, then the detail — so you can learn fast and choose with confidence.
        </p>

        <div className="link-grid">
          {KB_SLUGS.map((s) => {
            const a = KB_ARTICLES[s];
            return (
              <Link key={s} href={`/kb/${s}`} className="link-card">
                <span style={{ fontSize: 28 }} aria-hidden="true">{a.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{a.category}</div>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="section cta-section">
          <h2>Ready to try it yourself?</h2>
          <p>Start a free 24h trial — no credit card. We&apos;ll send your login on WhatsApp and help you install.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <Link className="btn btn-ghost" href="/free-trial">Free 24h trial</Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
