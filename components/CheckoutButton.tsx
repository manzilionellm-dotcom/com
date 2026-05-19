"use client";

import { useState } from "react";
import { track } from "../lib/analytics";
import { readUTMFlat } from "../lib/utm";

type Props = {
  planKey: string;
  planLabel: string;
  /** Numeric plan price in USD — used for analytics value. */
  planValue?: number;
  className?: string;
};

export default function CheckoutButton({ planKey, planLabel, planValue, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (loading) return;
    setError(null);
    setLoading(true);

    const utm = readUTMFlat();
    track("checkout_start", {
      source: `pricing-${planKey}`,
      label: planLabel,
      plan: planKey,
      value: planValue,
      currency: "USD",
    });

    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, utm }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Checkout error");
      }
      window.location.href = data.checkoutUrl;
    } catch (e) {
      track("checkout_cancel", {
        source: `pricing-${planKey}`,
        plan: planKey,
        label: e instanceof Error ? e.message : "error",
      });
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
        data-cta-source={`pricing-${planKey}-card`}
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
