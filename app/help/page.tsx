import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { HELP_TOPICS, HELP_ORDER } from "../../lib/content/help";
import { SITE, waLink } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Help Center — Fix Buffering, Connection & Playback Issues",
  description:
    "Answer-first fixes for the most common IPTV problems: buffering, can’t connect, black screen, freezing, crashes, audio out of sync and moving to a new device. Step-by-step, updated 2026.",
  alternates: { canonical: `${SITE.domain}/help` },
};

export default function HelpHubPage() {
  return (
    <PageShell fabMessage="Hi! I have an IPTV problem I need help fixing.">
      <Breadcrumbs items={[{ name: "Help Center", href: "/help" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          IPTV Help Center
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 760, margin: "12px auto 28px" }}>
          Fast, answer-first fixes for the most common IPTV issues. Each guide gives you the solution
          up top, the likely cause, and step-by-step instructions — then a direct line to our team.
        </p>

        <div className="link-grid">
          {HELP_ORDER.map((slug) => {
            const t = HELP_TOPICS[slug];
            return (
              <Link key={slug} href={`/help/${slug}`} className="link-card">
                <span style={{ fontSize: 28 }} aria-hidden="true">{t.emoji}</span>
                <span style={{ fontWeight: 600 }}>{t.title}</span>
              </Link>
            );
          })}
        </div>

        <section className="section cta-section" style={{ marginTop: 36 }}>
          <h2>Can’t find your fix?</h2>
          <p>
            Our support team troubleshoots live on WhatsApp — usually a 2-minute fix. Tell us your
            device, app and what you see on screen.
          </p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <a
              className="btn btn-green"
              href={waLink("Hi! I have an IPTV problem: ", "Help-Center")}
              target="_blank"
              rel="noreferrer noopener"
            >
              Chat with support
            </a>
            <Link className="btn btn-gold" href="/status">Check network status</Link>
          </div>
        </section>

        <section className="section">
          <h2>Related resources</h2>
          <p style={{ color: "#b9bcc2" }}>
            Setting up for the first time? See the{" "}
            <Link href="/apps" className="accent">app setup guides</Link> or the{" "}
            <Link href="/kb" className="accent">knowledge base</Link>. New to IPTV? Start with{" "}
            <Link href="/kb/what-is-iptv" className="accent">what is IPTV</Link>.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
