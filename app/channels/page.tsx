import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { COUNTRY_PAGES } from "../../lib/content/countries";
import { SITE, COUNTRY_SLUGS } from "../../lib/site";

export const metadata: Metadata = {
  title: "Regional television viewing guides",
  description:
    "Check programme availability, language and device requirements by region before choosing an authorized service.",
  alternates: { canonical: `${SITE.domain}/channels` },
};

export default function ChannelsIndex() {
  return (
    <PageShell regionalGuide fabMessage="I have a device setup question about the regional viewing guides.">
      <Breadcrumbs items={[{ name: "Channels", href: "/channels" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          Find a television guide by region
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          Choose a region to check where a programme is listed, which languages are offered and how to verify an authorized streaming option.
        </p>

        <div className="stats-grid" style={{ marginBottom: 32 }}>
          <div className="stat"><div className="stat-val">Location</div><div className="stat-lbl">Reception country</div></div>
          <div className="stat"><div className="stat-val">Language</div><div className="stat-lbl">Audio tracks</div></div>
          <div className="stat"><div className="stat-val">Replay</div><div className="stat-lbl">Availability window</div></div>
          <div className="stat"><div className="stat-val">Device</div><div className="stat-lbl">Playback support</div></div>
        </div>

        <section className="section">
          <h2>Browse by region</h2>
          <div className="countries-grid">
            {COUNTRY_SLUGS.map((s) => {
              const p = COUNTRY_PAGES[s];
              return (
                <Link key={s} href={`/channels/${s}`} className="country-card">
                  <span className="flag" aria-hidden="true">{p.flag}</span>
                  <div className="country-info">
                    <div className="country-name">{p.name}</div>
                    <div className="country-sub">{p.channelsHero.slice(0, 3).join(", ")}…</div>
                  </div>
                  <span className="country-arrow" aria-hidden="true">›</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2>Top categories</h2>
          <div className="trust-grid">
            <div className="trust-card"><div className="ic">⚽</div><h4>Sports</h4><p>Full events, highlights and commentary language.</p></div>
            <div className="trust-card"><div className="ic">🎬</div><h4>Movies</h4><p>Release windows, film versions and subtitles.</p></div>
            <div className="trust-card"><div className="ic">📰</div><h4>News</h4><p>Regional bulletins and local broadcast times.</p></div>
            <div className="trust-card"><div className="ic">👶</div><h4>Kids</h4><p>Age ratings and parental controls.</p></div>
            <div className="trust-card"><div className="ic">🎭</div><h4>Entertainment</h4><p>Original audio, episode schedules and replay windows.</p></div>
            <div className="trust-card"><div className="ic">📚</div><h4>Documentary</h4><p>Subject, language and on-demand availability.</p></div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
