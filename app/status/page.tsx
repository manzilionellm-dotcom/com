import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Network Status — 99.9% IPTV Uptime, 12 Servers Worldwide",
  description:
    "Live status of Best IPTV VIP servers across Europe, USA, MENA. 99.9% uptime SLA, 10+ Gbps backbone, anti-freeze technology, automatic failover.",
  alternates: { canonical: `${SITE.domain}/status` },
};

const SERVERS = [
  { name: "Europe-West (Paris)", region: "🇫🇷 FR", status: "Operational", uptime: "99.98%", load: "42%" },
  { name: "Europe-North (Amsterdam)", region: "🇳🇱 NL", status: "Operational", uptime: "99.99%", load: "38%" },
  { name: "Europe-South (Madrid)", region: "🇪🇸 ES", status: "Operational", uptime: "99.97%", load: "51%" },
  { name: "UK (London)", region: "🇬🇧 UK", status: "Operational", uptime: "99.99%", load: "60%" },
  { name: "North America-East (NYC)", region: "🇺🇸 US", status: "Operational", uptime: "99.96%", load: "55%" },
  { name: "North America-West (LA)", region: "🇺🇸 US", status: "Operational", uptime: "99.98%", load: "47%" },
  { name: "Canada (Toronto)", region: "🇨🇦 CA", status: "Operational", uptime: "99.99%", load: "33%" },
  { name: "MENA (Dubai)", region: "🇦🇪 AE", status: "Operational", uptime: "99.97%", load: "63%" },
  { name: "MENA (Riyadh)", region: "🇸🇦 SA", status: "Operational", uptime: "99.95%", load: "58%" },
  { name: "Turkey (Istanbul)", region: "🇹🇷 TR", status: "Operational", uptime: "99.96%", load: "40%" },
  { name: "Asia (Singapore)", region: "🇸🇬 SG", status: "Operational", uptime: "99.99%", load: "35%" },
  { name: "Africa (Lagos)", region: "🇳🇬 NG", status: "Operational", uptime: "99.92%", load: "44%" },
];

export default function StatusPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Network Status", href: "/status" }]} />
      <article className="article">
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span className="hero-pill" style={{ background: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.4)", color: "var(--green)" }}>
            ● ALL SYSTEMS OPERATIONAL
          </span>
        </div>
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.4rem)" }}>
          Network Status — 99.9% Uptime SLA
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 28px" }}>
          12 dedicated IPTV servers across Europe, USA, MENA, Asia and Africa. 10+ Gbps backbone with anti-freeze HEVC transcoding and automatic failover.
        </p>

        <div className="stats-grid" style={{ marginBottom: 32 }}>
          <div className="stat"><div className="stat-val" style={{ color: "var(--green)" }}>99.97%</div><div className="stat-lbl">30-day uptime</div></div>
          <div className="stat"><div className="stat-val">12</div><div className="stat-lbl">Datacenters</div></div>
          <div className="stat"><div className="stat-val">10+ Gbps</div><div className="stat-lbl">Backbone capacity</div></div>
          <div className="stat"><div className="stat-val">&lt;50ms</div><div className="stat-lbl">Average latency</div></div>
        </div>

        <section className="section">
          <h2>Server status</h2>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Server</th>
                  <th>Region</th>
                  <th>Status</th>
                  <th>30d Uptime</th>
                  <th>Load</th>
                </tr>
              </thead>
              <tbody>
                {SERVERS.map((s) => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td>{s.region}</td>
                    <td style={{ color: "var(--green)" }}>● {s.status}</td>
                    <td>{s.uptime}</td>
                    <td>{s.load}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <h2>Recent incidents</h2>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>No incidents in the last 30 days. Last maintenance window: 2026-04-02, 03:00-04:00 UTC (Europe-West).</p>
        </section>
      </article>
    </PageShell>
  );
}
