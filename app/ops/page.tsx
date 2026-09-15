import type { Metadata } from "next";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Closer scripts",
  robots: { index: false, follow: false },
};

const SCRIPTS = [
  ["J+0 essai", "Ville + appareil ? Essai 24 h, pas de carte. Je t'envoie le login."],
  ["J+1 relance", "Ça marche sur ton appareil ? Si l'essai est bon : 1 mois $10 · 3 mois $25 · 6 mois $35 · 1 an $60."],
  ["J+2 dernier jour", "Dernier jour d'essai. Tu veux que j'active quel plan ?"],
  ["Parrainage", "Parrainage : 1 mois offert sur le plan 12 mois ($60) pour toi ET pour l'ami, quand il paie. Numéro WhatsApp de l'ami (différent du tien) :"],
];

export default function OpsPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24, color: "#f0eff0", fontFamily: "sans-serif" }}>
      <h1>Scripts — un numéro {SITE.whatsapp}</h1>
      <p style={{ color: "#7a7a86" }}>Page noindex. Copier-coller. Pas d’envoi auto.</p>
      {SCRIPTS.map(([label, text]) => (
        <section key={label} style={{ marginTop: 24, border: "1px solid #222", borderRadius: 12, padding: 16 }}>
          <h2 style={{ color: "#22c55e", fontSize: 14 }}>{label}</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
        </section>
      ))}
    </main>
  );
}
