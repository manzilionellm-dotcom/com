import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { SITE, waLink } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact — 24/7 IPTV Support via WhatsApp & Email",
  description:
    "Need help? Best IPTV VIP support is available 24/7 on WhatsApp and email. Replies in under 10 minutes — installation, billing, channel requests, troubleshooting.",
  alternates: { canonical: `${SITE.domain}/contact` },
};

export default function ContactPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Contact Best IPTV VIP — 24/7 Support
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          We respond in under 10 minutes on WhatsApp, 24 hours a day, in English, French, Arabic, Spanish and German.
        </p>

        <div className="trust-grid">
          <a
            className="trust-card"
            href={waLink("Hi Best IPTV VIP! I need help.", "Contact-WA")}
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none" }}
          >
            <div className="ic">💬</div>
            <h4>WhatsApp (fastest)</h4>
            <p>+{SITE.whatsapp}<br />Reply &lt;10 min, 24/7</p>
          </a>
          <a
            className="trust-card"
            href={`mailto:${SITE.email}`}
            style={{ textDecoration: "none" }}
          >
            <div className="ic">✉️</div>
            <h4>Email</h4>
            <p>{SITE.email}<br />Reply within 1 hour</p>
          </a>
          <div className="trust-card">
            <div className="ic">🌍</div>
            <h4>Worldwide coverage</h4>
            <p>Support in 5 languages<br />USA, EU, MENA, Asia, LATAM, Africa</p>
          </div>
        </div>

        <section className="section">
          <h2>Common questions, instant answers</h2>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Before reaching out, check our FAQ on the homepage and our install guides — most answers are there.</p>
        </section>
      </article>
    </PageShell>
  );
}
