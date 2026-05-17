import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import { SITE, waLink } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Payment cancelled — Best IPTV VIP",
  description:
    "Your payment was not completed. You can try again or contact our support team on WhatsApp for help.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.domain}/checkout/cancel` },
};

export default async function CheckoutCancel({
  searchParams,
}: {
  searchParams?: Promise<{ o?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const orderId = params.o;
  return (
    <PageShell>
      <article className="article" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>⚠️</div>
        <h1>Payment not completed</h1>
        <p className="lead">
          Your transaction was cancelled or did not go through. No funds were charged.
          You can try again or contact us — we accept card, crypto, PayPal and bank transfer.
        </p>

        {orderId && (
          <p style={{ opacity: 0.7, fontSize: 14 }}>
            Order reference: <code>{orderId}</code>
          </p>
        )}

        <div className="hero-actions" style={{ marginTop: 28, justifyContent: "center" }}>
          <Link className="btn btn-gold" href="/pricing">
            Back to pricing
          </Link>
          <a
            className="btn btn-green"
            href={waLink(
              `Hi! I had an issue with the online payment${orderId ? ` (order ${orderId})` : ""}. Can you help?`,
              orderId || "checkout-cancel",
            )}
            target="_blank"
            rel="noreferrer noopener"
          >
            Contact WhatsApp
          </a>
        </div>
      </article>
    </PageShell>
  );
}
