"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { SITE } from "../lib/site";

/**
 * Third-party analytics, gated on consent.
 *
 * Loading gtag.js or the Meta Pixel already sets identifiers and sends a page
 * view — the tag itself is the processing, so gating only the later events is
 * too late. These scripts therefore do not render at all until the visitor has
 * accepted, and they mount as soon as they do without needing a reload.
 *
 * First-party funnel measurement (/api/e) is unaffected: it stores no
 * identifier and no personal data, so it needs no consent to run.
 */
export default function ConsentedAnalytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setAccepted(window.localStorage.getItem("cookie-consent") === "accepted");
      } catch {
        setAccepted(false);
      }
    };
    read();
    window.addEventListener("cookie-consent-change", read);
    // Consent granted in another tab.
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("cookie-consent-change", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  if (!accepted) return null;

  const ga4 = SITE.ga4;
  const pixel = SITE.metaPixel;

  return (
    <>
      {ga4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {pixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
