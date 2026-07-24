import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Best IPTV VIP privacy policy — what personal data we collect, how we use and store it, cookies, your GDPR rights, and how to contact us with a data request.",
  alternates: { canonical: `${SITE.domain}/privacy` },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <article className="article legal">
        <h1>Privacy Policy</h1>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>Last updated: 17 May 2026</p>

        <h2>1. Who we are</h2>
        <p>Best IPTV VIP (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates {SITE.domain}. We provide premium IPTV subscription services worldwide. Contact: {SITE.email}.</p>

        <h2>2. Data we collect</h2>
        <ul>
          <li><strong>Contact data:</strong> name (optional), WhatsApp number, email — only when you contact us or place an order.</li>
          <li><strong>Order data:</strong> chosen plan, device type, payment method (we do not store full card numbers — handled by Stripe/PayPal).</li>
          <li><strong>Technical data:</strong> pages visited, device type and browser type. Your IP address is used only to rate-limit abusive traffic and is never stored: it is hashed in memory and discarded.</li>
          <li><strong>Measurement data:</strong> we record which pages and buttons lead to enquiries, using a random six-character reference generated in your browser (for example <code>AB7XKD</code>). It is not linked to your name, number or email, it is not stored on your device, and it disappears when you close the page. These records contain no personal details — no name, contact, or message content.</li>
          <li><strong>Cookies and local storage:</strong> a language preference you select, and — only after you accept — analytics storage (Google Analytics 4, Meta Pixel) and campaign attribution. Nothing optional is written before you accept.</li>
        </ul>

        <h2>3. How we use your data</h2>
        <ul>
          <li>To activate, deliver and support your IPTV subscription.</li>
          <li>To respond to WhatsApp / email enquiries.</li>
          <li>To prevent fraud and account abuse.</li>
          <li>To improve our service (anonymized analytics, A/B testing).</li>
          <li>To send service notifications (renewals, server changes). No marketing without your consent.</li>
        </ul>

        <h2>4. Legal basis (GDPR)</h2>
        <p>We process data based on: contract performance (order, delivery), legitimate interest (security, fraud prevention) and consent (analytics, marketing). You can withdraw consent any time via {SITE.email}.</p>

        <h2>5. Data sharing</h2>
        <p>We share data with strictly necessary processors: payment providers (Stripe, PayPal), hosting (Vercel, Cloudflare), WhatsApp Business (Meta). We never sell your data.</p>

        <h2>6. Data retention</h2>
        <p>Order data: 5 years (legal requirement). Support chats: 12 months. Measurement records: 13 months, then deleted. Analytics: 14 months (Google Analytics standard). You can request deletion any time.</p>

        <h2>7. Your rights (GDPR / CCPA)</h2>
        <ul>
          <li>Access — request a copy of your data.</li>
          <li>Rectification — correct inaccurate data.</li>
          <li>Erasure — request deletion (&quot;right to be forgotten&quot;).</li>
          <li>Portability — receive your data in machine-readable format.</li>
          <li>Object / restrict — stop certain processing.</li>
          <li>Withdraw consent at any time.</li>
        </ul>
        <p>Submit requests to {SITE.email}. We respond within 30 days.</p>

        <h2>8. Cookies</h2>
        <p>We store a language preference when you choose one. The Google Analytics and Meta Pixel scripts are not loaded at all until you accept the banner — declining means they never run, rather than running without recording. You can change or withdraw your choice at any time with the &quot;Cookie settings&quot; link in the footer.</p>

        <h2>9. International transfers</h2>
        <p>Some of our processors are outside the EU. We rely on Standard Contractual Clauses approved by the European Commission for these transfers.</p>

        <h2>10. Children</h2>
        <p>Our service is not directed at children under 16. We do not knowingly collect data from minors.</p>

        <h2>11. Changes to this policy</h2>
        <p>We may update this policy. Material changes will be notified via WhatsApp or email. The &quot;Last updated&quot; date will reflect any change.</p>

        <h2>12. Contact</h2>
        <p>Questions or data requests: {SITE.email} or WhatsApp +{SITE.whatsapp}.</p>
      </article>
    </PageShell>
  );
}
