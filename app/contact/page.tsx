import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import LeadForm from "../../components/LeadForm";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact — WhatsApp",
  description:
    "Contact Best IPTV VIP on WhatsApp for installation, billing and playback questions. No response-time promise is published on this page.",
  alternates: { canonical: `${SITE.domain}/contact` },
};

export default function ContactPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Contact Best IPTV VIP
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          Write on WhatsApp. This page does not promise a reply time or a list of support languages.
        </p>

        <div className="trust-grid">
          <WhatsAppCTA
            source="contact-card"
            event="whatsapp_click"
            message="Hi Best IPTV VIP! I need help."
            className="trust-card"
            style={{ textDecoration: "none" }}
          >
            <div className="ic">💬</div>
            <h4>WhatsApp (fastest)</h4>
            <p>+{SITE.whatsapp}</p>
          </WhatsAppCTA>
          <div className="trust-card">
            <div className="ic">🌍</div>
            <h4>Worldwide coverage</h4>
            <p>The site is in English. The homepage can also be shown in French or Arabic. Coverage by country is not stated here.</p>
          </div>
        </div>

        <section className="section" style={{ marginTop: 36 }}>
          <h2>Send us a message</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>
            Not on WhatsApp right now? Leave your details. This form does not promise a reply time.
          </p>
          <div style={{ maxWidth: 520 }}>
            <LeadForm
              intent="contact"
              source="contact-form"
              heading="Get in touch"
              subheading="Tell us what you need — installation, billing, channel request, troubleshooting."
              ctaLabel="Send message"
              showDevice
            />
          </div>
        </section>

        <section className="section">
          <h2>Common questions, instant answers</h2>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Before reaching out, check our FAQ on the homepage and our install guides — most answers
            are there.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
