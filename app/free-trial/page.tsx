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
    "Get a 100% free 24-hour IPTV trial with 22,000+ live channels in 4K UHD. No credit card, no commitment. Instant WhatsApp activation in under 10 minutes.",
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
          Test Best IPTV VIP with 22,000+ live channels, 4K UHD streaming, full EPG and instant catch-up. We send your trial credentials on WhatsApp in under 10 minutes.
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
            subheading="Drop your WhatsApp number or email and we'll send your credentials within 10 minutes."
            ctaLabel="Send me my free trial"
            showDevice
            showCountry
          />
        </div>

        <section className="section">
          <h2>How it works</h2>
          <div className="steps-grid">
            <div className="step"><div className="step-num">1</div><p>Click the WhatsApp button above (or fill the form) and tell us your device (Firestick, Smart TV, Android, iOS…).</p></div>
            <div className="step"><div className="step-num">2</div><p>We send your free trial M3U link, Xtream Codes API and setup guide within 10 minutes.</p></div>
            <div className="step"><div className="step-num">3</div><p>Install IPTV Smarters / TiviMate, enter your credentials, enjoy 22,000+ channels free for 24h.</p></div>
          </div>
        </section>

        <section className="section">
          <h2>What you get during your free 24h</h2>
          <ul className="bullet-list">
            <li>✓ Full 22,000+ live channels — same as paying customers</li>
            <li>✓ All 3,500+ 4K UHD channels (sports, movies)</li>
            <li>✓ Full 120,000+ VOD library access</li>
            <li>✓ EPG and 7-day catch-up</li>
            <li>✓ All devices supported</li>
            <li>✓ No credit card, no automatic charge</li>
            <li>✓ Switch to paid plan only if you love it</li>
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
