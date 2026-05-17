import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { COUNTRY_PAGES } from "../../lib/content/countries";
import { SITE, COUNTRY_SLUGS } from "../../lib/site";

export const metadata: Metadata = {
  title: "All Channels — 22,000+ Live IPTV Channels Worldwide",
  description:
    "Browse Best IPTV VIP's complete catalog of 22,000+ live channels — USA, UK, France, Germany, Spain, Arabic, Turkish, Indian, African. Sports, news, movies, kids — all in 4K UHD.",
  alternates: { canonical: `${SITE.domain}/channels` },
};

export default function ChannelsIndex() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Channels", href: "/channels" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.7rem,5vw,2.6rem)" }}>
          22,000+ Live IPTV Channels Worldwide
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 32px" }}>
          The world&apos;s largest premium IPTV catalog — sports, news, movies, kids, entertainment in HD and 4K UHD. Pick your region to see channel lists, sample EPG and pricing.
        </p>

        <div className="stats-grid" style={{ marginBottom: 32 }}>
          <div className="stat"><div className="stat-val">22,000+</div><div className="stat-lbl">Live channels</div></div>
          <div className="stat"><div className="stat-val">3,500+</div><div className="stat-lbl">4K UHD channels</div></div>
          <div className="stat"><div className="stat-val">120,000+</div><div className="stat-lbl">Movies & series VOD</div></div>
          <div className="stat"><div className="stat-val">50+</div><div className="stat-lbl">Countries covered</div></div>
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
            <div className="trust-card"><div className="ic">⚽</div><h4>Sports</h4><p>Premier League, La Liga, NFL, NBA, MLB, UFC, F1, MotoGP, Champions League</p></div>
            <div className="trust-card"><div className="ic">🎬</div><h4>Movies</h4><p>HBO, Showtime, Cinemax, Canal+ Cinéma, OSN Movies, Sky Cinema, Disney+</p></div>
            <div className="trust-card"><div className="ic">📰</div><h4>News</h4><p>CNN, BBC, Sky News, Al Jazeera, France 24, RT, CNBC, Bloomberg</p></div>
            <div className="trust-card"><div className="ic">👶</div><h4>Kids</h4><p>Cartoon Network, Nickelodeon, Disney, KiKA, MBC 3, Gulli, Spacetoon</p></div>
            <div className="trust-card"><div className="ic">🎭</div><h4>Entertainment</h4><p>Star Plus, Sony, Zee, MBC, Show TV, RTL, Pro7, M6, ITV, FOX</p></div>
            <div className="trust-card"><div className="ic">📚</div><h4>Documentary</h4><p>Discovery, National Geographic, History, Arte, Animal Planet</p></div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
