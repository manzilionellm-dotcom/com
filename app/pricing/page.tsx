import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import CheckoutButton from "../../components/CheckoutButton";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Pricing — Plans From $5/month",
  description:
    "Best IPTV VIP prices: 1 month $10, 3 months $25, 6 months $35, 12 months $60. 24h trial, no card. A counted channel catalog is not published on this page.",
  alternates: { canonical: `${SITE.domain}/pricing` },
};

const PLANS = [
  { key: "p1", name: "1 Month", price: 10, months: 1, perks: ["Live channels", "EPG included", "WhatsApp support", "No contract"] },
  { key: "p3", name: "3 Months", price: 25, months: 3, highlight: true, perks: ["Live channels", "On-demand titles", "WhatsApp support", "Guided setup"] },
  { key: "p6", name: "6 Months", price: 35, months: 6, perks: ["Live channels", "More than one device", "EPG and catch-up", "WhatsApp support"] },
  { key: "p12", name: "12 Months", price: 60, months: 12, perks: ["Live channels", "On-demand titles", "Up to 3 devices", "WhatsApp support"] },
];

export default function PricingPage() {
  return (
    <PageShell>
      <Script id="pricing-view" strategy="afterInteractive">
        {`(function(){try{
          var ev = { event:'plan_view', source:'pricing-page', label:'pricing-list', ts: Date.now(), path:'/pricing' };
          (window.dataLayer=window.dataLayer||[]).push(ev);
          if (typeof window.gtag==='function') window.gtag('event','view_item_list',{item_list_name:'Pricing plans'});
          if (typeof window.fbq==='function') window.fbq('track','ViewContent',{content_name:'Pricing',content_category:'pricing'});
        } catch(e){}})();`}
      </Script>
      <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          IPTV Plans — From $5/month
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 28px" }}>
          1 month $10, 3 months $25, 6 months $35, 12 months $60. The $5 figure is $60 divided by 12. No automatic renewal. 24h trial, no card. Channel counts are not published here.
        </p>

        <div className="plans-grid">
          {PLANS.map((p) => {
            const perMo = (p.price / p.months).toFixed(2).replace(/\.00$/, "");
            const basePerMo = 10;
            const save = Math.round((1 - (p.price / p.months) / basePerMo) * 100);
            return (
              <div key={p.key} className={`plan ${p.highlight ? "highlight" : ""}`}>
                {save > 0 && <div className="plan-badge">SAVE {save}%</div>}
                <div className="plan-head">
                  <h3>{p.name}</h3>
                  {p.highlight && <span className="plan-best">BEST SELLER</span>}
                </div>
                <div className="plan-price">
                  <span className="cur">$</span>
                  <span className="num">{perMo}</span>
                  <span className="per">/mo</span>
                </div>
                <div className="plan-billed">Billed ${p.price}{p.months > 1 && " (one-time)"}</div>
                <ul className="plan-perks">
                  {p.perks.map((perk) => (
                    <li key={perk}><span className="check">✓</span> {perk}</li>
                  ))}
                </ul>
                <CheckoutButton
                  planKey={p.key}
                  planLabel={`$${p.price}`}
                  planValue={p.price}
                  className="btn btn-gold plan-cta btn-block"
                />
                <WhatsAppCTA
                  source={`pricing-${p.key}-wa`}
                  event="cta_click"
                  message={`Hi! I want ${p.name} ($${p.price}).`}
                  className="btn btn-white plan-cta btn-block"
                  style={{ marginTop: 8 }}
                  meta={{ plan: p.key, value: p.price, currency: "USD" }}
                >
                  Order via WhatsApp
                </WhatsAppCTA>
              </div>
            );
          })}
        </div>

        <section className="section">
          <h2>Payment methods accepted</h2>
          <div className="trust-grid">
            <div className="trust-card"><div className="ic">💳</div><h4>Card</h4><p>The pricing buttons open the on-site checkout.</p></div>
            <div className="trust-card"><div className="ic">₿</div><h4>Cryptocurrency</h4><p>The same checkout is created in USD and settled toward USDT.</p></div>
          </div>
        </section>

        <section className="section">
          <h2>What you get with every plan</h2>
          <ul className="bullet-list">
            <li>✓ Live channels and on-demand titles. Counts are not published on this page.</li>
            <li>✓ Programme guide on these plans</li>
            <li>✓ Players named in the install guides: Firestick, Smart TV, Android TV, iOS, MAG, PC, Mac</li>
            <li>✓ Up to 3 connected devices on the 12-month plan</li>
            <li>✓ Access is sent on WhatsApp. No response-time promise is stated here.</li>
            <li>✓ No automatic renewal</li>
          </ul>
        </section>

        <section className="section cta-section">
          <h2>Not sure? Try 24h free</h2>
          <p>No credit card required. Get instant credentials via WhatsApp and test full quality on your device.</p>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-gold" href="/free-trial">Start free trial</Link>
            <Link className="btn btn-ghost" href="/refund">Refund policy</Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
