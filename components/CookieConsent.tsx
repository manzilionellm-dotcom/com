"use client";

import { useEffect, useState } from "react";
import { consentChanged } from "./ConsentScripts";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("cookie-consent");
      if (!v) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem("cookie-consent", "accepted");
    } catch {
      /* ignore */
    }
    consentChanged();
    setOpen(false);
  }
  function reject() {
    try {
      localStorage.setItem("cookie-consent", "rejected");
    } catch {
      /* ignore */
    }
    consentChanged();
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-text">
        <strong>Cookies</strong>
        <p>
          We use essential cookies to run this site, and optional analytics cookies (Google Analytics, Meta Pixel) only with your consent.{" "}
          <a href="/privacy">Read our privacy policy</a>.
        </p>
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
