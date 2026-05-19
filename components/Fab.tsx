"use client";

import { SITE } from "../lib/site";
import { track, buildWhatsAppText } from "../lib/analytics";

export default function Fab({ message }: { message?: string }) {
  const baseMessage = message || "Hi Best IPTV VIP! I need help.";
  const fallback = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `${baseMessage} | src:fab`,
  )}`;
  const fallbackTrial = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hi! I want a free 24h trial. | src:sticky-cta",
  )}`;

  function openWhatsApp(source: string, msg: string, event: "whatsapp_click" | "trial_request") {
    track(event, { source, label: msg });
    if (typeof window !== "undefined") {
      const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
        buildWhatsAppText(msg, source),
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <>
      <a
        className="fab"
        href={fallback}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        onClick={(e) => {
          e.preventDefault();
          openWhatsApp("fab", baseMessage, "whatsapp_click");
        }}
        data-cta-source="fab"
      >
        <span aria-hidden="true">💬</span>
      </a>
      <div className="sticky-mobile-cta" role="region" aria-label="Quick actions">
        <a
          className="btn btn-gold"
          href="/pricing"
          style={{ flex: 1, padding: "11px 14px", fontSize: 13 }}
          onClick={() => track("cta_click", { source: "sticky-pricing", label: "See Pricing" })}
          data-cta-source="sticky-pricing"
        >
          See Pricing
        </a>
        <a
          className="btn btn-green"
          href={fallbackTrial}
          target="_blank"
          rel="noreferrer noopener"
          style={{ flex: 1, padding: "11px 14px", fontSize: 13 }}
          onClick={(e) => {
            e.preventDefault();
            openWhatsApp("sticky-cta", "Hi! I want a free 24h trial.", "trial_request");
          }}
          data-cta-source="sticky-cta"
        >
          Free Trial
        </a>
      </div>
    </>
  );
}
