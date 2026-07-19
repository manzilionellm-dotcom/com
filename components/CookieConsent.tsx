"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "fr" | "ar";

const COPY: Record<Lang, { title: string; body: string; policy: string; reject: string; accept: string }> = {
  en: {
    title: "Cookies",
    body: "We use essential cookies to run this site, and optional analytics cookies (Google Analytics, Meta Pixel) only with your consent.",
    policy: "Read our privacy policy",
    reject: "Reject",
    accept: "Accept all",
  },
  fr: {
    title: "Cookies",
    body: "Nous utilisons des cookies essentiels au fonctionnement du site, et des cookies analytiques optionnels (Google Analytics, Meta Pixel) uniquement avec votre consentement.",
    policy: "Lire notre politique de confidentialité",
    reject: "Refuser",
    accept: "Tout accepter",
  },
  ar: {
    title: "ملفات تعريف الارتباط",
    body: "نستخدم ملفات تعريف ارتباط أساسية لتشغيل الموقع، وملفات تحليلية اختيارية (Google Analytics، Meta Pixel) بموافقتك فقط.",
    policy: "اقرأ سياسة الخصوصية",
    reject: "رفض",
    accept: "قبول الكل",
  },
};

function currentLang(): Lang {
  if (typeof document === "undefined") return "en";
  const l = document.documentElement.lang;
  return l === "fr" || l === "ar" ? l : "en";
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    setLang(currentLang());
    try {
      if (!localStorage.getItem("cookie-consent")) setOpen(true);
    } catch {}
    // Keep the banner language in sync with the page (the homepage sets
    // <html lang> after mount and on every language switch).
    const obs = new MutationObserver(() => setLang(currentLang()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    // "Cookie settings" link anywhere on the page reopens the banner.
    const reopen = () => { setLang(currentLang()); setOpen(true); };
    window.addEventListener("biv:open-cookie-settings", reopen);
    return () => {
      obs.disconnect();
      window.removeEventListener("biv:open-cookie-settings", reopen);
    };
  }, []);

  function choose(value: "accepted" | "rejected") {
    try { localStorage.setItem("cookie-consent", value); } catch {}
    setOpen(false);
    // Notify ConsentedAnalytics to (un)mount tags without a reload.
    window.dispatchEvent(new CustomEvent("biv:consent-change"));
  }

  if (!open) return null;
  const t = COPY[lang];
  return (
    <div className="cookie-banner" role="dialog" aria-label={t.title} aria-live="polite">
      <div className="cookie-text">
        <strong>{t.title}</strong>
        <p>{t.body} <a href="/privacy">{t.policy}</a>.</p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-ghost" onClick={() => choose("rejected")} type="button" style={{ padding: "8px 14px", fontSize: 12 }}>
          {t.reject}
        </button>
        <button className="btn btn-gold" onClick={() => choose("accepted")} type="button" style={{ padding: "8px 14px", fontSize: 12 }}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}
