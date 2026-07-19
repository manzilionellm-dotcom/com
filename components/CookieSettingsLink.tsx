"use client";

/**
 * Footer control that re-opens the cookie consent banner so visitors can
 * change their choice at any time (required "Cookie settings" link).
 */
export default function CookieSettingsLink({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("biv:open-cookie-settings"))}
    >
      {label}
    </button>
  );
}
