import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { KB_ARTICLES, KB_ORDER } from "../../lib/content/kb";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Knowledge Base — Guides & Answers to Common Questions",
  description:
    "Clear, answer-first guides to the most-searched IPTV questions: what IPTV is, how to install it, speed requirements, Xtream vs M3U, EPG, VPN setup and legality. Updated 2026.",
  alternates: { canonical: `${SITE.domain}/kb` },
};

export default function KbHubPage() {
  return (
    <PageShell fabMessage="Hi! I have a question about IPTV.">
      <Breadcrumbs items={[{ name: "Knowledge Base", href: "/kb" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          IPTV Knowledge Base
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 760, margin: "12px auto 28px" }}>
          Straight answers to the questions people ask most about IPTV — each guide leads with the
          answer, then explains it in plain English. No jargon, no fluff.
        </p>

        <div className="link-grid">
          {KB_ORDER.map((slug) => {
            const a = KB_ARTICLES[slug];
            return (
              <Link key={slug} href={`/kb/${slug}`} className="link-card">
                <span style={{ fontSize: 28 }} aria-hidden="true">{a.emoji}</span>
                <span style={{ fontWeight: 600 }}>{a.title}</span>
              </Link>
            );
          })}
        </div>

        <section className="section cta-section" style={{ marginTop: 36 }}>
          <h2>Ready to try it yourself?</h2>
          <p>
            The best way to understand IPTV is to watch it. Start a free 24h trial — no credit card —
            and we’ll have you streaming in minutes.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/pricing">See pricing</Link>
            <Link className="btn btn-green" href="/free-trial">Free 24h trial</Link>
          </div>
        </section>

        <section className="section">
          <h2>Need setup help instead?</h2>
          <p style={{ color: "#b9bcc2" }}>
            Jump to the <Link href="/apps" className="accent">app setup guides</Link>, browse{" "}
            <Link href="/devices" className="accent">device guides</Link>, or fix a problem in the{" "}
            <Link href="/help" className="accent">Help Center</Link>.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
