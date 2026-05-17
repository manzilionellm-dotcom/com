import { SITE } from "../lib/site";

export default function Fab({ message }: { message?: string }) {
  const msg = encodeURIComponent(
    message || "Hi Best IPTV VIP! I need help."
  );
  return (
    <>
      <a
        className="fab"
        href={`https://wa.me/${SITE.whatsapp}?text=${msg}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
      >
        <span aria-hidden="true">💬</span>
      </a>
      <div className="sticky-mobile-cta" role="region" aria-label="Quick actions">
        <a
          className="btn btn-gold"
          href="/pricing"
          style={{ flex: 1, padding: "11px 14px", fontSize: 13 }}
        >
          See Pricing
        </a>
        <a
          className="btn btn-green"
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I want a free 24h trial.")}`}
          target="_blank"
          rel="noreferrer noopener"
          style={{ flex: 1, padding: "11px 14px", fontSize: 13 }}
        >
          Free Trial
        </a>
      </div>
    </>
  );
}
