import Link from "next/link";
import { SITE, DEVICE_SLUGS, COUNTRY_SLUGS } from "../lib/site";

const deviceLabel: Record<string, string> = {
  firestick: "Amazon Firestick",
  "smart-tv": "Smart TV",
  android: "Android TV",
  ios: "iPhone / iPad",
  "mag-box": "MAG Box",
  "pc-mac": "PC / Mac",
};

const countryLabel: Record<string, string> = {
  arabic: "Arabic",
  english: "English (US/UK)",
  french: "French",
  spanish: "Spanish",
  turkish: "Turkish",
  indian: "Indian",
  german: "German",
  african: "African",
};

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-rich" role="contentinfo">
      <div className="footer-grid">
        <div>
          <div className="brand" style={{ marginBottom: 10 }}>
            <span className="brand-logo" aria-hidden="true">B</span>
            <span className="brand-text">BEST IPTV <b>VIP</b></span>
          </div>
          <p style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>
            World&apos;s #1 premium IPTV. 22,000+ live channels, 120,000+ movies and series, 4K UHD streaming, 24/7 WhatsApp support.
          </p>
          <a
            className="btn btn-green"
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noreferrer noopener"
            style={{ marginTop: 12, padding: "8px 14px", fontSize: 12 }}
          >
            Chat on WhatsApp
          </a>
        </div>
        <div>
          <h5>Service</h5>
          <ul>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/free-trial">Free 24h Trial</Link></li>
            <li><Link href="/channels">All Channels</Link></li>
            <li><Link href="/devices">Compatible Devices</Link></li>
            <li><Link href="/status">Network Status</Link></li>
          </ul>
        </div>
        <div>
          <h5>Install Guides</h5>
          <ul>
            {DEVICE_SLUGS.map((s) => (
              <li key={s}><Link href={`/guides/${s}`}>{deviceLabel[s]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Setup &amp; Help</h5>
          <ul>
            <li><Link href="/apps">IPTV Apps &amp; Players</Link></li>
            <li><Link href="/apps/iptv-smarters-pro">IPTV Smarters Pro</Link></li>
            <li><Link href="/apps/tivimate">TiviMate Setup</Link></li>
            <li><Link href="/help">Help Center</Link></li>
            <li><Link href="/kb">Knowledge Base</Link></li>
            <li><Link href="/kb/what-is-iptv">What is IPTV?</Link></li>
          </ul>
        </div>
        <div>
          <h5>By Region</h5>
          <ul>
            {COUNTRY_SLUGS.map((s) => (
              <li key={s}><Link href={`/channels/${s}`}>{countryLabel[s]} IPTV</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {year} {SITE.brand}. All rights reserved.</p>
        <p style={{ marginTop: 4 }}>
          Optimized for fast, stable 4K streaming worldwide.
          {" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </div>
    </footer>
  );
}
