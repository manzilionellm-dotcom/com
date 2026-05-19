import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import CheckoutButton from "../../components/CheckoutButton";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "IPTV Pricing — Best 4K IPTV Plans From $5/month",
  description:
    "Best IPTV VIP pricing — 1, 3, 6 and 12 month premium IPTV plans from $5/month. 22,000+ channels, 4K UHD, EPG, multi-device. 24h free trial, no contract.",
  alternates: { canonical: `${SITE.domain}/pricing` },
};

const PLANS = [
  { key: "p1", name: "1 Month", price: 10, months: 1, perks: ["22,000+ live channels", "4K UHD quality", "EPG included", "WhatsApp support", "No contract"] },
  { key: "p3", name: "3 Months", price: 25, months: 3, highlight: true, perks: ["Most popular", "22,000+ channels", "120,000+ movies & series", "Priority support", "Guided setup"] },
  { key: "p6", name: "6 Months", price: 35, months: 6, perks: ["Best value", "22,000+ channels", "Multi-device", "EPG + 7-day catch-up", "All premium channels"] },
  { key: "p12", name: "12 Months", price: 60, months: 12, perks: ["Ultimate value", "VIP premium access", "Up to 3 devices", "VIP 24/7 support", "Free upgrades"] },
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
          Every plan includes 22,000+ live channels, 120,000+ movies and series, 4K UHD, full EPG, WhatsApp support and a 24h free trial. No contract. Cancel anytime.
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
            <div className="trust-card"><div className="ic">💳</div><h4>Credit / Debit Card</h4><p>Visa, Mastercard, AMEX — secure 3D Secure checkout</p></div>
            <div className="trust-card"><div className="ic">🅿️</div><h4>PayPal</h4><p>Pay with PayPal balance, bank account or card</p></div>
            <div className="trust-card"><div className="ic">₿</div><h4>Cryptocurrency</h4><p>Bitcoin, Ethereum, USDT (TRC20/ERC20)</p></div>
            <div className="trust-card"><div className="ic">🏦</div><h4>Bank Transfer</h4><p>SEPA, Wise, international wire</p></div>
          </div>
        </section>

        <section className="section">
          <h2>What you get with every plan</h2>
          <ul className="bullet-list">
            <li>✓ 22,000+ premium live channels worldwide</li>
            <li>✓ 3,500+ true 4K UHD channels (sports, movies)</li>
            <li>✓ 120,000+ movies and series on demand (VOD)</li>
            <li>✓ Full EPG (Electronic Programme Guide) — 7 days forward</li>
            <li>✓ 7-day catch-up TV on major channels</li>
            <li>✓ Anti-freeze servers — 99.9% uptime SLA</li>
            <li>✓ Compatible with Firestick, Smart TV, Android TV, iOS, MAG, PC, Mac</li>
            <li>✓ Supports IPTV Smarters Pro, TiviMate, IBO Player, Smart IPTV, XCIPTV</li>
            <li>✓ Up to 3 connected devices (12-month plan)</li>
            <li>✓ Instant WhatsApp activation under 10 minutes</li>
            <li>✓ 24/7 support in English, French, Arabic, Spanish, German</li>
            <li>✓ No contract — cancel anytime</li>
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
