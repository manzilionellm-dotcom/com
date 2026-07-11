"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "../lib/site";
import { track, buildWhatsAppText } from "../lib/analytics";
import { readUTMFlat } from "../lib/utm";

/**
 * Site-wide exit-intent capture.
 *
 * Fires once per visitor (7-day cooldown) when they signal they're about to
 * leave — desktop: cursor exits the top of the viewport; mobile: fast scroll
 * back up after reading. Offers the free trial with a one-field capture posting
 * to /api/lead, plus a direct WhatsApp fallback. Suppressed if the visitor has
 * already submitted a lead this session.
 */

const SEEN_KEY = "biv_exit_intent_seen";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

function alreadySeen(): boolean {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    return Number.isFinite(ts) && Date.now() - ts < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {}
}

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const armed = useRef(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (alreadySeen()) return;

    function trigger() {
      if (!armed.current) return;
      armed.current = false;
      markSeen();
      setOpen(true);
      track("exit_intent_view", { source: "exit-intent" });
    }

    function onMouseOut(e: MouseEvent) {
      // Cursor leaving via the top of the viewport = intent to close/switch tab.
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    }

    function onScroll() {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docH > 0 ? y / docH : 0;
      // Mobile heuristic: read a good chunk, then scroll back up quickly.
      if (depth > 0.5 && y < lastScrollY.current - 40) trigger();
      lastScrollY.current = y;
    }

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (hp) return;
    if (!contact.trim()) {
      setError("Enter your WhatsApp or email");
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "free_trial",
          source: "exit-intent",
          contact: contact.trim(),
          page: typeof location !== "undefined" ? location.pathname : undefined,
          utm: readUTMFlat(),
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Request failed");
      }
      track("lead_submit", { source: "exit-intent", label: "free_trial" });
      track("trial_request", { source: "exit-intent", label: "modal" });
      setStatus("ok");
    } catch (e2) {
      setStatus("error");
      setError(e2 instanceof Error ? e2.message : "Network error");
    }
  }

  function whatsApp() {
    track("whatsapp_click", { source: "exit-intent" });
    const text = buildWhatsAppText("Hi Best IPTV VIP! I want the free 24h trial.", "exit-intent");
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
    close();
  }

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains("modal-overlay")) close();
      }}
    >
      <div className="modal-box" style={{ maxWidth: 460 }}>
        <div className="modal-head">
          <div className="modal-tb" style={{ flex: 1 }}>
            <h2 id="exit-intent-title" style={{ fontSize: 20 }}>Wait — grab a free 24h trial 🎁</h2>
            <p style={{ color: "var(--muted)", fontSize: 13, margin: "4px 0 0" }}>
              No card. Test 22,000+ channels &amp; 4K on your own device. Credentials in 10 minutes.
            </p>
          </div>
          <button className="modal-close" onClick={close} aria-label="Close" type="button">
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="modal-body" style={{ padding: 16 }}>
          {status === "ok" ? (
            <div className="lead-form-ok" style={{ padding: "16px 8px" }}>
              <div style={{ fontSize: 44, lineHeight: 1 }}>✅</div>
              <h3 style={{ marginTop: 10 }}>Done — check your WhatsApp</h3>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>
                We&apos;ll message your trial details within 10 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <label className="lead-field">
                <span>WhatsApp number or email</span>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+44 7XX XXX XXXX or you@email.com"
                  maxLength={120}
                  autoFocus
                />
              </label>

              <div style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }} aria-hidden="true">
                <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
              </div>

              {error && <p className="lead-error" role="alert">{error}</p>}

              <button
                type="submit"
                className="btn btn-gold btn-block"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Send me my free trial"}
              </button>

              <div style={{ textAlign: "center", margin: "10px 0", color: "var(--muted)", fontSize: 12 }}>or</div>

              <button type="button" className="btn btn-green btn-block" onClick={whatsApp}>
                Get it on WhatsApp
              </button>

              <p className="lead-form-note">No spam. We only message you about your trial.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
