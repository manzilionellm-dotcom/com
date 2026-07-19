"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Loads GA4 + Meta Pixel ONLY after the visitor has accepted analytics
 * cookies. Before consent, no third-party tag is injected at all — this is
 * the hard block required for GDPR/ePrivacy opt-in. Re-checks on the
 * `biv:consent-change` event dispatched by the cookie banner, so accepting
 * activates tracking without a page reload.
 */
export default function ConsentedAnalytics({ ga4, pixel }: { ga4?: string; pixel?: string }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setConsented(localStorage.getItem("cookie-consent") === "accepted");
      } catch {
        setConsented(false);
      }
    };
    read();
    window.addEventListener("biv:consent-change", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("biv:consent-change", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  if (!consented) return null;

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
