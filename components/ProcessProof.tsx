"use client";

import { useEffect } from "react";

const PROCESS = [
  { name: "24h trial", plan: "No card", text: "Message WhatsApp with your device. Test before you pay." },
  { name: "Clear prices", plan: "$10–$60", text: "1 month $10 · 3 months $25 · 6 months $35 · 12 months $60." },
  { name: "Private login", plan: "WhatsApp", text: "No public playlist. Credentials sent after the trial or paid plan." },
];

/** Homepage dict still ships invented names in SSR. This swaps visible copy
 *  to process proof (no fake stars) as soon as the client hydrates. */
export default function ProcessProof() {
  useEffect(() => {
    const trust = document.querySelector(".hero-trust");
    if (trust) trust.textContent = "24h trial · no card · WhatsApp activation · from $10/mo";

    const h2 = Array.from(document.querySelectorAll("h2")).find((el) =>
      /customers say|disent nos clients|يقول العملاء/i.test(el.textContent || ""),
    );
    if (h2) h2.textContent = "How we work";

    document.querySelectorAll(".review-stars").forEach((n) => n.remove());
    document.querySelectorAll(".review").forEach((card, i) => {
      const p = PROCESS[i];
      if (!p) return;
      const name = card.querySelector(".review-name");
      const city = card.querySelector(".review-city");
      const plan = card.querySelector(".review-plan");
      const text = card.querySelector("p");
      if (name) name.textContent = p.name;
      city?.remove();
      if (plan) plan.textContent = p.plan;
      if (text) text.textContent = p.text;
    });
  }, []);
  return null;
}
