import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import ReferralWidget from "../../components/ReferralWidget";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Referral Program — Give a Free Trial, Get a Free Month",
  description:
    "Refer friends to Best IPTV VIP and you both get a bonus month free. Generate your personal referral code and share it in one tap. No limit on referrals.",
  alternates: { canonical: `${SITE.domain}/referral` },
};

const STEPS = [
  { t: "Generate your code", d: "Enter your contact and get a personal referral code instantly." },
  { t: "Share it", d: "Send it to friends and family on WhatsApp or in group chats in one tap." },
  { t: "They try free", d: "Your friend gets a free 24h trial with your code — no card needed." },
  { t: "You both win", d: "When they subscribe, you each get a bonus month credited automatically." },
];

export default function ReferralPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How the Best IPTV VIP referral program works",
    description:
      "Refer a friend to Best IPTV VIP and you both get a free bonus month.",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.t,
      text: s.d,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many people can I refer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There is no limit — every friend who subscribes with your code earns you another free month.",
        },
      },
      {
        "@type": "Question",
        name: "When do I get my free month?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once your referred friend subscribes with your code, our team credits the bonus month to your account automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to be a customer to refer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can generate a code any time, but the reward is credited to an active subscription. Start with a free trial if you are not a member yet.",
        },
      },
    ],
  };

  return (
    <PageShell fabMessage="Hi! I have a question about the referral program.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={[{ name: "Referral", href: "/referral" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Refer a friend — you both get a free month
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 700, margin: "12px auto 32px" }}>
          Love your IPTV? Share it. Generate a personal code, send it in a tap, and every friend who
          subscribes earns you both a bonus month. No limit, no catch.
        </p>

        <section className="section" style={{ maxWidth: 520, margin: "0 auto" }}>
          <ReferralWidget />
        </section>

        <section className="section">
          <h2>How it works</h2>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step">
                <div className="step-num">{i + 1}</div>
                <h4 style={{ margin: "0 0 4px", color: "#fff", fontSize: 15 }}>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Referral FAQ</h2>
          <details className="faq-item">
            <summary className="faq-q">How many people can I refer?</summary>
            <p className="faq-a">There is no limit — every friend who subscribes with your code earns you another free month.</p>
          </details>
          <details className="faq-item">
            <summary className="faq-q">When do I get my free month?</summary>
            <p className="faq-a">Once your referred friend subscribes with your code, our team credits the bonus month to your account automatically.</p>
          </details>
          <details className="faq-item">
            <summary className="faq-q">Do I need to be a customer to refer?</summary>
            <p className="faq-a">You can generate a code any time, but the reward is credited to an active subscription. Start with a free trial if you are not a member yet.</p>
          </details>
        </section>

        <section className="section cta-section">
          <h2>Not a member yet?</h2>
          <p>Start with a free 24h trial, then invite your friends and start earning free months.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/free-trial">Start free trial</Link>
            <Link className="btn btn-white" href="/pricing">See pricing</Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
