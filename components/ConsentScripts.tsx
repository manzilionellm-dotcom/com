"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { SITE } from "../lib/site";

const EVENT = "biv:consent";

export function consentChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

export default function ConsentScripts() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        setOk(localStorage.getItem("cookie-consent") === "accepted");
      } catch {
        setOk(false);
      }
    };
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!ok) return null;
  const ga4 = SITE.ga4;
  const pixel = SITE.metaPixel;

  return (
    <>
      {ga4 ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {pixel ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
