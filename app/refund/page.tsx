import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Refund Policy — 24h Full Money-Back Guarantee",
  description:
    "Best IPTV VIP 24-hour money-back guarantee. Full refund if service quality is below promise and we cannot fix the issue. Transparent, fair policy.",
  alternates: { canonical: `${SITE.domain}/refund` },
};

export default function RefundPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Refund Policy", href: "/refund" }]} />
      <article className="article legal">
        <h1>Refund Policy</h1>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>Last updated: 17 May 2026</p>

        <h2>1. Our promise</h2>
        <p>We offer a <strong>24-hour money-back guarantee</strong> on all new subscriptions. If our service does not meet the quality we advertised (continuous buffering on 25 Mbps Ethernet, missing channels from your plan, repeated downtime) and our support team cannot fix the issue within 24 hours, you receive a full refund — no questions asked.</p>

        <h2>2. Eligibility</h2>
        <ul>
          <li>Refund request must be made within 24 hours of activation.</li>
          <li>You must have first reached out to our support on WhatsApp so we can attempt to fix the issue.</li>
          <li>The issue must be on our side (server quality, missing channels, account problems) — not your internet (less than 15 Mbps), incompatible device, or third-party app problem.</li>
        </ul>

        <h2>3. Free trial first</h2>
        <p>We strongly recommend using the <a href="/free-trial">free 24h trial</a> before paying. Trial gives you exactly the same channels and quality as a paid plan, with no credit card. If trial works well, your paid plan will too.</p>

        <h2>4. Refund process</h2>
        <ol>
          <li>Contact us on WhatsApp +{SITE.whatsapp} describing the issue.</li>
          <li>We will troubleshoot with you (typically &lt;30 minutes).</li>
          <li>If we cannot fix the issue, we issue a full refund via the original payment method within 3-5 business days (Stripe, PayPal) or up to 7 days for crypto / bank transfer.</li>
        </ol>

        <h2>5. Non-refundable cases</h2>
        <ul>
          <li>Refund requested after the first 24 hours of activation.</li>
          <li>Issue caused by customer device, internet speed below requirements, or third-party software.</li>
          <li>Account suspended for breach of <a href="/terms">Terms of Service</a> (credential sharing, resale, abuse).</li>
          <li>Specific channel temporarily unavailable due to upstream provider issues (we always offer alternative channels or extended subscription).</li>
        </ul>

        <h2>6. Pro-rated refunds on long plans</h2>
        <p>For 6 or 12 month plans, after the first 24 hours: if you wish to cancel due to a service degradation on our side, we may issue a pro-rata refund for the unused months at our discretion.</p>

        <h2>7. Contact</h2>
        <p>WhatsApp +{SITE.whatsapp} (fastest) or {SITE.email}.</p>
      </article>
    </PageShell>
  );
}
