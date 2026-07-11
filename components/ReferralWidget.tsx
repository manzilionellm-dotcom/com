"use client";

import { useMemo, useState } from "react";
import { SITE } from "../lib/site";
import { track } from "../lib/analytics";
import { readUTMFlat } from "../lib/utm";

/**
 * Referral loop widget.
 *
 * A customer enters their name + WhatsApp/email; we derive a stable referral
 * code from it, register them as a `referral` lead (so the operator can credit
 * the reward), and hand back a ready-to-share WhatsApp message + link pointing
 * at /free-trial?ref=CODE. The existing UTM capture stores that `ref` on the
 * friend's first visit, closing the attribution loop.
 */

// Small deterministic hash → stable, human-readable code (no Math.random so a
// returning customer always gets the same code).
function codeFor(seed: string): string {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const base = (h >>> 0).toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  return `BIV-${base}`;
}

export default function ReferralWidget() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const code = useMemo(
    () => (contact.trim() ? codeFor(contact.trim().toLowerCase()) : ""),
    [contact],
  );

  const shareUrl = code ? `${SITE.domain}/free-trial?ref=${code}` : "";
  const shareText = code
    ? `I use Best IPTV VIP — 22,000+ channels & sports in 4K. Use my code ${code} for a free 24h trial + a bonus month when you subscribe: ${shareUrl}`
    : "";

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (hp) return; // honeypot tripped
    if (!contact.trim()) {
      setError("Enter your WhatsApp number or email");
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "referral",
          source: "referral-widget",
          name: name.trim() || undefined,
          contact: contact.trim(),
          note: `Referral code: ${code}`,
          page: typeof location !== "undefined" ? location.pathname : undefined,
          utm: readUTMFlat(),
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Request failed");
      }
      track("referral_share", { source: "referral-generate", label: code });
      setStatus("ready");
    } catch (e2) {
      setStatus("error");
      setError(e2 instanceof Error ? e2.message : "Network error");
    }
  }

  function shareWhatsApp() {
    track("referral_share", { source: "referral-whatsapp", label: code });
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      track("referral_share", { source: "referral-copy", label: code });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed — select the text manually.");
    }
  }

  if (status === "ready") {
    return (
      <div className="lead-form" role="status">
        <h3 style={{ textAlign: "center" }}>Your referral code is ready 🎉</h3>
        <p className="lead-form-sub" style={{ textAlign: "center" }}>
          Share it with friends. When they subscribe with your code, you both get a bonus month —
          our team credits it automatically.
        </p>

        <div
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 2,
            color: "var(--gold)",
            background: "rgba(212,175,55,0.08)",
            border: "1px dashed rgba(212,175,55,0.4)",
            borderRadius: 12,
            padding: "16px 12px",
            margin: "8px 0 16px",
          }}
        >
          {code}
        </div>

        <div className="hero-actions" style={{ marginBottom: 12 }}>
          <button type="button" className="btn btn-green" onClick={shareWhatsApp}>
            Share on WhatsApp
          </button>
          <button type="button" className="btn btn-white" onClick={copy}>
            {copied ? "Copied ✓" : "Copy invite"}
          </button>
        </div>

        <label className="lead-field">
          <span>Your shareable link</span>
          <input type="text" readOnly value={shareUrl} onFocus={(e) => e.currentTarget.select()} />
        </label>

        <p className="lead-form-note">
          Tip: post it in family and football group chats — that&apos;s where it converts best.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onGenerate} noValidate>
      <h3>Get your referral code</h3>
      <p className="lead-form-sub">
        Generate a personal code in seconds. Every friend who subscribes with it earns you both a
        free month.
      </p>

      <label className="lead-field">
        <span>Your name (optional)</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          maxLength={80}
        />
      </label>

      <label className="lead-field">
        <span>Your WhatsApp or email *</span>
        <input
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="+44 7XX XXX XXXX or you@email.com"
          maxLength={120}
        />
      </label>

      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }} aria-hidden="true">
        <label>
          Leave empty
          <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      {error && <p className="lead-error" role="alert">{error}</p>}

      <button
        type="submit"
        className="btn btn-gold btn-block"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? "Generating…" : "Generate my code"}
      </button>
      <p className="lead-form-note">
        We only use your contact to credit your reward. See our <a href="/privacy">privacy policy</a>.
      </p>
    </form>
  );
}
