import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PageShell from "../../../components/PageShell";
import { SITE, waLink } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Payment received — Activating your IPTV",
  description:
    "Thank you! Your payment is confirmed. Your IPTV credentials are being prepared and will be sent via WhatsApp shortly.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.domain}/checkout/success` },
};

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams?: Promise<{ o?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const orderId = params.o;
  // The actual paid amount is confirmed server-side via the Cryptomus webhook;
  // we use the plan-key embedded in the order ID for an approximate client-side
  // conversion value.
  const PRICE_BY_PLAN: Record<string, number> = { p1: 10, p3: 25, p6: 35, p12: 60 };
  let approxValue: number | undefined;
  if (orderId) {
    const m = orderId.match(/^biv-(p\d+)-/);
    if (m && PRICE_BY_PLAN[m[1]]) approxValue = PRICE_BY_PLAN[m[1]];
  }
  return (
    <PageShell>
      {/* Fire purchase / checkout_success once on render. Idempotent via
          window flag so a hard refresh doesn't double-count. */}
      <Script id="checkout-success-event" strategy="afterInteractive">
        {`(function(){
          try {
            var key='biv_purchase_'+(${JSON.stringify(orderId || "")} || 'noid');
            if (window.sessionStorage.getItem(key)) return;
            window.sessionStorage.setItem(key,'1');
            var ev = { event:'checkout_success', source:'checkout-success', order_id:${JSON.stringify(orderId || "")}, value:${approxValue ?? "undefined"}, currency:'USD', ts: Date.now() };
            (window.dataLayer=window.dataLayer||[]).push(ev);
            if (typeof window.gtag==='function') window.gtag('event','purchase',{transaction_id:${JSON.stringify(orderId || "")}, value:${approxValue ?? 0}, currency:'USD'});
            if (typeof window.fbq==='function') window.fbq('track','Purchase',{value:${approxValue ?? 0}, currency:'USD'});
            try {
              var blob = new Blob([JSON.stringify(ev)],{type:'application/json'});
              if (navigator.sendBeacon) navigator.sendBeacon('/api/track', blob);
            } catch(e){}
          } catch(e){}
        })();`}
      </Script>
      <article className="article" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>✅</div>
        <h1>Payment received</h1>
        <p className="lead">
          Thank you! Your subscription is being activated. You will receive your IPTV
          credentials (M3U link, Xtream Codes, app instructions) on WhatsApp within
          5–10 minutes.
        </p>

        {orderId && (
          <p style={{ opacity: 0.7, fontSize: 14 }}>
            Order reference: <code>{orderId}</code>
          </p>
        )}

        <div className="hero-actions" style={{ marginTop: 28, justifyContent: "center" }}>
          <a
            className="btn btn-green"
            href={waLink(
              `Hi! I just paid online${orderId ? ` (order ${orderId})` : ""}. Please send my IPTV credentials.`,
              orderId || "checkout-success",
            )}
            target="_blank"
            rel="noreferrer noopener"
          >
            Contact support on WhatsApp
          </a>
          <Link className="btn btn-ghost" href="/">
            Back to home
          </Link>
        </div>

        <section className="section" style={{ marginTop: 40, textAlign: "left" }}>
          <h2>Next steps</h2>
          <ol className="bullet-list">
            <li>1. Open WhatsApp and message support with your order reference above.</li>
            <li>2. Tell us which device you will use (Firestick, Smart TV, Android, iOS, MAG…).</li>
            <li>3. We send your M3U link + setup guide within minutes.</li>
            <li>4. Enjoy 22,000+ channels in 4K UHD.</li>
          </ol>
        </section>
      </article>
    </PageShell>
  );
}
