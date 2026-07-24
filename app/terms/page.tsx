import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Best IPTV VIP terms of service — subscription and payment terms, free trial rules, acceptable use, liability limits, refunds and dispute resolution.",
  alternates: { canonical: `${SITE.domain}/terms` },
};

export default function TermsPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />
      <article className="article legal">
        <h1>Terms of Service</h1>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>Last updated: 17 May 2026</p>

        <h2>1. Acceptance</h2>
        <p>By ordering or using Best IPTV VIP services, you agree to these Terms. If you do not agree, do not use the service.</p>

        <h2>2. Service description</h2>
        <p>Best IPTV VIP provides a private IPTV streaming subscription — access to 22,000+ live channels, 120,000+ VOD movies and series, delivered via Xtream Codes API and M3U links. Service is delivered as-is. We do not own or claim ownership of any broadcast content.</p>

        <h2>3. Subscriptions and payment</h2>
        <ul>
          <li>Plans are paid in advance (1, 3, 6 or 12 months).</li>
          <li>Payment via Stripe, PayPal, cryptocurrency or bank transfer.</li>
          <li>No automatic renewal — service expires at the end of the paid period unless you renew manually.</li>
          <li>Prices may change without notice; existing subscriptions are honored at the price paid.</li>
        </ul>

        <h2>4. Free trial</h2>
        <p>The 24h free trial is offered once per new customer / device. We reserve the right to refuse trials in case of suspected abuse (multiple trials from the same IP/device).</p>

        <h2>5. Acceptable use</h2>
        <ul>
          <li>You agree not to share, resell or redistribute your credentials.</li>
          <li>You agree not to use the service for any unlawful purpose.</li>
          <li>One subscription = up to 3 simultaneous connections from your household (12-month plan).</li>
          <li>We may suspend accounts showing suspicious activity (mass IP changes, abuse, sharing).</li>
        </ul>

        <h2>6. Service quality</h2>
        <p>We work to keep the service continuously available, but we do not promise uninterrupted service and we publish no uptime figure we cannot evidence. Outages may occur due to maintenance, ISP issues, or upstream changes. Report a problem and we restore service as fast as we can.</p>

        <h2>7. Compatibility</h2>
        <p>Customer is responsible for ensuring their device, internet speed (minimum 15 Mbps HD, 25 Mbps 4K) and player software are compatible. We provide install guides on {SITE.domain}/guides.</p>

        <h2>8. Refunds</h2>
        <p>See our <a href="/refund">Refund Policy</a>. In short: full refund within 24h if service is below promised quality and we cannot fix the issue.</p>

        <h2>9. Intellectual property</h2>
        <p>The Best IPTV VIP brand, website, content and software remain our property. Broadcast content remains the property of its respective rights holders.</p>

        <h2>10. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, our liability is limited to the amount you paid for the current subscription period. We are not liable for indirect damages, loss of profit, data, or use.</p>

        <h2>11. Suspension and termination</h2>
        <p>We may suspend or terminate your subscription without refund if you breach these Terms. You may stop using the service any time — no contract.</p>

        <h2>12. Governing law</h2>
        <p>These Terms are governed by the laws of the United Kingdom. Disputes are subject to the jurisdiction of London courts, without prejudice to mandatory consumer protection laws in your country of residence.</p>

        <h2>13. Changes</h2>
        <p>We may update these Terms. Material changes will be notified via WhatsApp or email at least 14 days in advance.</p>

        <h2>14. Contact</h2>
        <p>Questions: {SITE.email} or WhatsApp +{SITE.whatsapp}.</p>
      </article>
    </PageShell>
  );
}
