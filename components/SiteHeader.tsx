"use client";

import Link from "next/link";
import { SITE } from "../lib/site";
import { track, buildWhatsAppText } from "../lib/analytics";

export default function SiteHeader() {
  function onHeaderWhatsApp(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    track("whatsapp_click", { source: "header", label: "Header WhatsApp" });
    if (typeof window !== "undefined") {
      const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
        buildWhatsAppText("Hi Best IPTV VIP! I have a question.", "header"),
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <header className="header">
      <nav className="nav" aria-label="Main">
        <Link href="/" className="brand" aria-label={`${SITE.brand} home`}>
          <span className="brand-logo" aria-hidden="true">B</span>
          <span className="brand-text">BEST IPTV <b>VIP</b></span>
        </Link>
        <div className="nav-links">
          <Link href="/pricing">Pricing</Link>
          <Link href="/watch">Watch Sports</Link>
          <Link href="/channels">Channels</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/devices">Devices</Link>
          <Link href="/guides/firestick">Guides</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <a
          className="btn btn-green"
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Best IPTV VIP! I have a question. | src:header")}`}
          target="_blank"
          rel="noreferrer noopener"
          style={{ padding: "8px 14px", fontSize: 13 }}
          onClick={onHeaderWhatsApp}
          data-cta-source="header"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
