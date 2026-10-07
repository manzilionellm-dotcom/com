"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="btn btn-ghost"
      style={{ marginTop: 8, padding: "8px 14px", fontSize: 12 }}
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}
