import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { DEVICE_GUIDES } from "../../lib/content/devices";
import { SITE, DEVICE_SLUGS } from "../../lib/site";

export const metadata: Metadata = {
  title: "Compatible Devices — Install IPTV on Any Device",
  description:
    "Best IPTV VIP works on every device — Firestick, Smart TV (Samsung, LG, Sony), Android TV, iPhone, iPad, Apple TV, MAG box, PC, Mac, Linux. Step-by-step guides for each.",
  alternates: { canonical: `${SITE.domain}/devices` },
};

export default function DevicesPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Devices", href: "/devices" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Works on Every Device — Install Guides
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          Best IPTV VIP is compatible with every major streaming device on the planet. Pick yours below for a step-by-step install guide with screenshots.
        </p>

        <div className="link-grid">
          {DEVICE_SLUGS.map((s) => {
            const g = DEVICE_GUIDES[s];
            return (
              <Link key={s} href={`/guides/${s}`} className="link-card">
                <span style={{ fontSize: 32 }} aria-hidden="true">{g.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{g.apps.slice(0, 2).join(", ")}</div>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="section">
          <h2>Supported IPTV players</h2>
          <div className="trust-grid">
            <div className="trust-card"><div className="ic">⚡</div><h4>IPTV Smarters Pro</h4><p>iOS, Android, Firestick, Windows, Mac — free</p></div>
            <div className="trust-card"><div className="ic">📺</div><h4>TiviMate Premium</h4><p>Android TV, Firestick — best EPG UI</p></div>
            <div className="trust-card"><div className="ic">🎯</div><h4>IBO Player Pro</h4><p>Samsung Tizen, LG webOS</p></div>
            <div className="trust-card"><div className="ic">🌐</div><h4>Smart IPTV (SIPTV)</h4><p>Samsung & LG Smart TV</p></div>
            <div className="trust-card"><div className="ic">🚀</div><h4>XCIPTV</h4><p>Android, Firestick — open source</p></div>
            <div className="trust-card"><div className="ic">🎮</div><h4>GSE Smart IPTV</h4><p>iOS, iPad — advanced EPG features</p></div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
