import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import { SITE, waLink } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Check your payment status",
  description: "Check the payment status with your payment provider or ask support about an order reference.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.domain}/checkout/success` },
};

export default async function CheckoutReturn({
  searchParams,
}: {
  searchParams?: Promise<{ o?: string | string[] }>;
}) {
  const reference = (await searchParams)?.o;
  const orderId = typeof reference === "string" && /^biv-p(?:1|3|6|12)-\d{13}-[a-f0-9]{8}$/.test(reference)
    ? reference
    : undefined;

  return (
    <PageShell>
      <article className="article" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <h1>Check your payment status</h1>
        <p className="lead">
          Open your payment provider’s receipt to see the current status.
          If you need help, support can check the order before activation.
        </p>
        {orderId && (
          <p>Order reference: <code>{orderId}</code></p>
        )}
        <div className="hero-actions" style={{ marginTop: 28, justifyContent: "center" }}>
          <a
            className="btn btn-green"
            href={waLink(
              `Hi, could you check my payment status${orderId ? ` for order ${orderId}` : ""}?`,
              "bestiptv-vip.com/checkout/success",
            )}
            target="_blank"
            rel="noreferrer noopener"
          >
            Check an order on WhatsApp
          </a>
          <Link className="btn btn-ghost" href="/">Back to home</Link>
        </div>
      </article>
    </PageShell>
  );
}
