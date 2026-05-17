"use client";

import { useState } from "react";

type Props = {
  planKey: string;
  planLabel: string;
  className?: string;
};

export default function CheckoutButton({ planKey, planLabel, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Checkout error");
      }
      window.location.href = data.checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className}
        aria-busy={loading}
      >
        {loading ? "Loading…" : `Pay ${planLabel} via Card`}
      </button>
      {error && (
        <div
          role="alert"
          style={{
            marginTop: 8,
            color: "#ff8a8a",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          {error}. Try WhatsApp instead.
        </div>
      )}
    </>
  );
}
