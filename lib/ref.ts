// Sale attribution reference.
//
// A CTA click is not a sale. Sales close inside WhatsApp, off-site, so the only
// way to tie revenue back to the page that produced it is to carry a reference
// into the conversation and record the same reference when the sale is
// confirmed (see scripts/sale.mjs).
//
// The reference lives in memory for the lifetime of the page session and is
// never written to a cookie or to localStorage: under ePrivacy that storage
// would need prior consent, and attribution is not strictly necessary storage.
// The cost is that a full page reload starts a new reference; the benefit is
// that the mechanism needs no consent banner interaction to work.

let current: string | null = null;

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 — read aloud over chat

function generate(): string {
  const out: string[] = [];
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    for (const b of bytes) out.push(ALPHABET[b % ALPHABET.length]);
  } else {
    for (let i = 0; i < 6; i++) out.push(ALPHABET[Math.floor(Math.random() * ALPHABET.length)]);
  }
  return out.join("");
}

/**
 * The reference for this page session. Server-side this returns an empty
 * string: markup must not embed a reference, or every visitor served the same
 * cached HTML would share one.
 */
export function getRefId(): string {
  if (typeof window === "undefined") return "";
  if (current) return current;

  // An inbound ?ref= wins, so a reference survives a reload when a link carries
  // it. Only accept the exact shape we generate.
  try {
    const fromUrl = new URL(window.location.href).searchParams.get("ref");
    if (fromUrl && /^[A-Z2-9]{6}$/.test(fromUrl)) {
      current = fromUrl;
      return current;
    }
  } catch {}

  current = generate();
  return current;
}
