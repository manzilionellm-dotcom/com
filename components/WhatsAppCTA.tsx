"use client";

import { SITE } from "../lib/site";
import { track, buildWhatsAppText } from "../lib/analytics";

type Props = {
  /** Source identifier for funnel attribution (e.g. "fab", "pricing-p3") */
  source: string;
  /** Default message — UTM/source is appended automatically */
  message: string;
  /** Funnel event override. Defaults to `whatsapp_click`. */
  event?: "whatsapp_click" | "trial_request" | "cta_click";
  /** Extra metadata sent to analytics (plan, country, device, value...) */
  meta?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Click handler builds the WhatsApp URL at click-time so it includes the
 * persisted UTM/landing context — even when this component is server-rendered.
 */
export default function WhatsAppCTA({
  source,
  message,
  event = "whatsapp_click",
  meta = {},
  className,
  style,
  children,
}: Props) {
  function onClick() {
    const text = buildWhatsAppText(message, source);
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
    track(event, { source, label: message, ...meta });
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  // Fallback href that works without JS (without UTM enrichment).
  const fallbackHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `${message} | src:${source}`,
  )}`;

  return (
    <a
      href={fallbackHref}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      data-cta-source={source}
    >
      {children}
    </a>
  );
}
