import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { HELP_ARTICLES } from "../../lib/content/help";
import { SITE, HELP_SLUGS, waLink } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Help Center — Fix Buffering, Connection & Playback Issues | Best IPTV VIP",
  description:
    "Answer-first fixes for the most common IPTV problems: can't connect, buffering, black screen, network error, playback stops, app updates and account recovery. Plus 24/7 WhatsApp support.",
  alternates: { canonical: `${SITE.domain}/help` },
};

export default function HelpHubPage() {
  return (
    <PageShell fabMessage="Hi! I have an IPTV problem I need help with.">
      <Breadcrumbs items={[{ name: "Help Center", href: "/help" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>IPTV Help Center</h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          Something not working? Find the fastest fix below — each guide starts with the answer, then
          the exact steps. Still stuck after that? Our support team is one WhatsApp message away.
        </p>

        <div className="link-grid">
          {HELP_SLUGS.map((s) => {
            const a = HELP_ARTICLES[s];
            return (
              <Link key={s} href={`/help/${s}`} className="link-card">
                <span style={{ fontSize: 28 }} aria-hidden="true">{a.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{a.title}</div>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="section cta-section">
          <h2>Can&apos;t find your issue?</h2>
          <p>Message our support team on WhatsApp — describe what you see and we&apos;ll fix it, usually in minutes.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <a
              className="btn btn-green"
              href={waLink("Hi! I need help with an IPTV issue.", "Help-Hub")}
              target="_blank"
              rel="noreferrer noopener"
            >
              Contact support on WhatsApp
            </a>
            <Link className="btn btn-ghost" href="/kb">Knowledge Base</Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
