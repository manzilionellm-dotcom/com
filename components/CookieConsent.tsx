"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("cookie-consent");
      if (!v) setOpen(true);
    } catch {}
  }, []);

  // ConsentedAnalytics listens for this so the tags mount on acceptance
  // without a reload — and, just as importantly, never before it.
  function record(choice: "accepted" | "rejected") {
    try { localStorage.setItem("cookie-consent", choice); } catch {}
    try { window.dispatchEvent(new Event("cookie-consent-change")); } catch {}
    setOpen(false);
  }
  const accept = () => record("accepted");
  const reject = () => record("rejected");

  if (!open) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-text">
        <strong>Cookies</strong>
        <p>We use essential cookies to run this site, and optional analytics cookies (Google Analytics, Meta Pixel) only with your consent. <a href="/privacy">Read our privacy policy</a>.</p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-ghost" onClick={reject} type="button" style={{ padding: "8px 14px", fontSize: 12 }}>
          Reject
        </button>
        <button className="btn btn-gold" onClick={accept} type="button" style={{ padding: "8px 14px", fontSize: 12 }}>
          Accept all
        </button>
      </div>
    </div>
  );
}
