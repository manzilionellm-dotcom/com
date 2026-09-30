import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import LeadForm from "../../components/LeadForm";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Free 24h IPTV Trial — No Credit Card Required",
  description:
    "Request a 24-hour IPTV trial with no card. Credentials are sent on WhatsApp. This page does not publish a channel count or a reply time.",
  alternates: { canonical: `${SITE.domain}/free-trial` },
};

export default function FreeTrialPage() {
  return (
    <PageShell fabMessage="Hi! I want a free 24h IPTV trial.">
      <Breadcrumbs items={[{ name: "Free Trial", href: "/free-trial" }]} />
      <article className="article">
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span className="hero-pill">🎁 FREE TRIAL • NO CARD</span>
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Free 24h IPTV Trial — No Credit Card
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 28px" }}>
          Request a 24-hour trial with no card. Credentials are sent on WhatsApp. Channel counts and a reply time are not published here.
        </p>

        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "minmax(280px, 1fr)",
            alignItems: "start",
            maxWidth: 920,
            margin: "0 auto 36px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <WhatsAppCTA
              source="trial-hero"
              event="trial_request"
              message="Hi! I want a free 24h IPTV trial. My device is: __"
              className="btn btn-green"
              style={{ fontSize: 16, padding: "16px 32px" }}
            >
              💬 Start free trial on WhatsApp
            </WhatsAppCTA>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
              Prefer not to use WhatsApp? Use the form below.
            </p>
          </div>

          <LeadForm
            intent="free_trial"
            source="trial-form"
            heading="Or request your trial without WhatsApp"
            subheading="Leave a WhatsApp number or email. This form does not promise a reply time."
            ctaLabel="Send me my free trial"
            showDevice
            showCountry
          />
        </div>

        <section className="section">
          <h2>How it works</h2>
          <div className="steps-grid">
            <div className="step"><div className="step-num">1</div><p>Click the WhatsApp button above (or fill the form) and tell us your device (Firestick, Smart TV, Android, iOS…).</p></div>
            <div className="step"><div className="step-num">2</div><p>We send a trial M3U link, Xtream Codes API details and setup notes on WhatsApp.</p></div>
            <div className="step"><div className="step-num">3</div><p>Install IPTV Smarters or TiviMate, enter the credentials, and use the trial for 24 hours.</p></div>
          </div>
        </section>

        <section className="section">
          <h2>What you get during your free 24h</h2>
          <ul className="bullet-list">
            <li>✓ The same trial access we send to new customers. A channel count is not published here.</li>
            <li>✓ No credit card and no automatic charge</li>
            <li>✓ A paid plan is optional after the trial</li>
          </ul>
        </section>

        <section className="section cta-section">
          <h2>Trial expired? See full pricing</h2>
          <p>Paid plans from $5/month. Free 24h trial available on every new device.</p>
          <Link className="btn btn-gold" href="/pricing" style={{ marginTop: 12 }}>See pricing →</Link>
        </section>
      </article>
    </PageShell>
  );
}
