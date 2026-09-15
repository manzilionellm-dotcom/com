import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Refer a friend — 1 extra month on the 12-month plan",
  description:
    "When a friend pays the 12-month plan ($60), you both get 1 extra month. Same WhatsApp. The 24h trial alone does not trigger the bonus.",
  alternates: { canonical: `${SITE.domain}/refer` },
};

export default function ReferPage() {
  return (
    <PageShell fabMessage="Hi — referral: +1 month on the 12-month plan for me and a friend when they pay. Friend WhatsApp number:">
      <Breadcrumbs items={[{ name: "Refer", href: "/refer" }]} />
      <article className="article">
        <h1>1 extra month for you and a friend</h1>
        <p className="lead">
          Friend pays the 12-month plan ($60). You both get +1 month on that term.
          Trial-only does not count. Friend WhatsApp must be different from yours.
        </p>
        <ol className="steps-grid" style={{ marginTop: 28 }}>
          <li className="step"><div className="step-num">1</div><p>Message WhatsApp with your friend’s number.</p></li>
          <li className="step"><div className="step-num">2</div><p>They get the same 24h trial. No card.</p></li>
          <li className="step"><div className="step-num">3</div><p>When they pay $60 / 12 months, both accounts get +1 month.</p></li>
        </ol>
        <p style={{ marginTop: 28 }}>
          <WhatsAppCTA
            source="refer"
            event="whatsapp_click"
            message="Hi — referral: +1 month on the 12-month ($60) for me and a friend when they pay. Friend WhatsApp number:"
            className="btn btn-green"
          >
            Start a referral on WhatsApp
          </WhatsAppCTA>
        </p>
      </article>
    </PageShell>
  );
}
