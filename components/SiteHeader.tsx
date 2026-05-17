import Link from "next/link";
import { SITE } from "../lib/site";

export default function SiteHeader() {
  return (
    <header className="header">
      <nav className="nav" aria-label="Main">
        <Link href="/" className="brand" aria-label={`${SITE.brand} home`}>
          <span className="brand-logo" aria-hidden="true">B</span>
          <span className="brand-text">BEST IPTV <b>VIP</b></span>
        </Link>
        <div className="nav-links">
          <Link href="/pricing">Pricing</Link>
          <Link href="/channels">Channels</Link>
          <Link href="/devices">Devices</Link>
          <Link href="/guides/firestick">Guides</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <a
          className="btn btn-green"
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noreferrer noopener"
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
