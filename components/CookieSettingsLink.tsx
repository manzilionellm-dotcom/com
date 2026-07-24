"use client";

/**
 * Reopens the consent banner so a visitor can withdraw consent as easily as
 * they gave it. The privacy policy points here, and GDPR requires withdrawal to
 * be no harder than granting — a policy that promises this control without
 * shipping it is worse than one that never mentioned it.
 */
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.dispatchEvent(new Event("cookie-consent-open"));
        } catch {}
      }}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        font: "inherit",
        color: "inherit",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      Cookie settings
    </button>
  );
}
