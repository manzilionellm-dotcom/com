"use client";

import { useState } from "react";
import { track } from "../lib/analytics";
import { readUTMFlat } from "../lib/utm";

type Props = {
  /** Lead intent — used for routing and attribution */
  intent: "free_trial" | "contact" | "callback" | "pricing";
  source: string;
  heading?: string;
  subheading?: string;
  showDevice?: boolean;
  showCountry?: boolean;
  ctaLabel?: string;
};

const DEVICES = ["Firestick", "Smart TV", "Android TV", "iPhone / iPad", "MAG Box", "PC / Mac", "Other"];

export default function LeadForm({
  intent,
  source,
  heading = "Get your free 24h trial",
  subheading = "We send credentials to WhatsApp or email within 10 minutes.",
  showDevice = true,
  showCountry = false,
  ctaLabel = "Send me my trial",
}: Props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [device, setDevice] = useState("");
  const [country, setCountry] = useState("");
  const [note, setNote] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (hp) return; // honeypot tripped — drop silently
    if (!contact.trim()) {
      setError("WhatsApp or email is required");
      return;
    }
    setError(null);
    setStatus("loading");

    const utm = readUTMFlat();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          source,
          name: name.trim() || undefined,
          contact: contact.trim(),
          device: device || undefined,
          country: country.trim() || undefined,
          note: note.trim() || undefined,
          page: typeof location !== "undefined" ? location.pathname : undefined,
          utm,
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Request failed");
      }
      track("lead_submit", {
        source,
        label: intent,
        device,
        country: country || undefined,
      });
      if (intent === "free_trial") {
        track("trial_request", { source, label: "form" });
      }
      setStatus("ok");
    } catch (e2) {
      setStatus("error");
      setError(e2 instanceof Error ? e2.message : "Network error");
    }
  }

  if (status === "ok") {
    return (
      <div className="lead-form lead-form-ok" role="status">
        <div style={{ fontSize: 48, lineHeight: 1 }}>✅</div>
        <h3 style={{ marginTop: 12 }}>Got it — check your WhatsApp</h3>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Our team will message you within 10 minutes. If you don&apos;t see anything,
          ping us on WhatsApp directly.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <h3>{heading}</h3>
      <p className="lead-form-sub">{subheading}</p>

      <label className="lead-field">
        <span>Name (optional)</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          maxLength={80}
        />
      </label>

      <label className="lead-field">
        <span>WhatsApp number or email *</span>
        <input
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          autoComplete="email"
          placeholder="+44 7XX XXX XXXX or you@email.com"
          maxLength={120}
        />
      </label>

      {showDevice && (
        <label className="lead-field">
          <span>Device you&apos;ll use</span>
          <select value={device} onChange={(e) => setDevice(e.target.value)}>
            <option value="">— choose one —</option>
            {DEVICES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
      )}

      {showCountry && (
        <label className="lead-field">
          <span>Country / language preference</span>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            maxLength={60}
          />
        </label>
      )}

      <label className="lead-field">
        <span>Anything we should know? (optional)</span>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={400}
        />
      </label>

      {/* Honeypot — bots fill, humans don't see */}
      <div style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }} aria-hidden="true">
        <label>
          Leave this empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
      </div>

      {error && <p className="lead-error" role="alert">{error}</p>}

      <button
        type="submit"
        className="btn btn-gold btn-block"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? "Sending…" : ctaLabel}
      </button>
      <p className="lead-form-note">
        No spam. We only message you about your trial. By submitting you accept our{" "}
        <a href="/privacy">privacy policy</a>.
      </p>
    </form>
  );
}
