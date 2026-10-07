import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Refund Policy — 24h Refund Rules",
  description:
    "Best IPTV VIP refund rules: ask within 24 hours of activation, after support has tried to fix a problem on our side. Conditions are listed on this page.",
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
        <p>We offer a <strong>24-hour refund</strong> on new subscriptions when the conditions in the next section are met. If support cannot fix a problem on our side within 24 hours of activation, the amount paid for that term is refunded.</p>

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
          <li>We will try to troubleshoot with you. No duration is promised.</li>
          <li>If we cannot fix the issue, the refund uses the original payment method. This page does not name a processor or a day count.</li>
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
        <p>Contact us via WhatsApp (+{SITE.whatsapp}).</p>
      </article>
    </PageShell>
  );
}
