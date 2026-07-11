// Programmatic "best <competitor> alternative" registry.
// Distinct intent from /compare (head-to-head): the searcher has already
// decided to leave a service and wants the switch. Content is migration-framed
// — what you keep, what you gain, and how to move — at /alternatives/[slug].

export type Alternative = {
  slug: string;
  competitor: string;
  competitorShort: string;
  icon: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Direct answer for AI Overviews / featured snippets. */
  answer: string;
  /** Why people are leaving this service — the pain being searched. */
  leaving: string[];
  /** What you keep when you switch (so the move feels safe). */
  keep: string[];
  /** What you gain over the old service. */
  gain: string[];
  /** 3-step migration path. */
  migration: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const ALTERNATIVES: Record<string, Alternative> = {
  "netflix": {
    slug: "netflix",
    competitor: "Netflix",
    competitorShort: "Netflix",
    icon: "🎬",
    h1: "The Best Netflix Alternative in 2026",
    metaTitle: "Best Netflix Alternative 2026 — Live TV + 120,000 Titles",
    metaDescription:
      "Leaving Netflix over price hikes and ads? The best alternative adds 22,000+ live channels and sports to a 120,000-title VOD library — for less. Free 24h trial.",
    answer:
      "The best Netflix alternative in 2026 is an IPTV service that keeps the on-demand movies and series you watch Netflix for, then adds 22,000+ live channels and live sport Netflix has never offered — all for around $5–$10/month versus Netflix's $15.49–$22.99. Best IPTV VIP gives you a 120,000-title VOD library plus live TV, with a free 24h trial.",
    leaving: [
      "Repeated price rises with an ad-supported basic tier",
      "No live TV, news or sport",
      "Shrinking catalogue as studios pull titles to their own apps",
      "Password-sharing crackdown adding per-member fees",
    ],
    keep: [
      "A huge on-demand movie and series library (120,000+ titles)",
      "Watch on the same TV, phone, tablet and Firestick",
      "Binge-friendly VOD with new content added weekly",
    ],
    gain: [
      "22,000+ live channels — news, entertainment and sport",
      "Live sport: Premier League, NFL, NBA, F1, UFC",
      "One bill instead of stacking Netflix + a live-TV service",
      "Lower monthly cost with no ad tier",
    ],
    migration: [
      { t: "Keep watching on the same devices", d: "IPTV runs on your existing TV, Firestick, phone or tablet — nothing new to buy." },
      { t: "Start a free 24h trial", d: "Test the VOD library and live channels with no card before you cancel Netflix." },
      { t: "Switch once you're happy", d: "Subscribe from ~$5/month and cancel the Netflix bill — your team is set up in 10 minutes." },
    ],
    faq: [
      { q: "Does the Netflix alternative have on-demand movies?", a: "Yes — a 120,000-title VOD library of movies and series, plus 22,000+ live channels Netflix doesn't offer." },
      { q: "Can I watch live sports?", a: "Yes, which Netflix never had — Premier League, NFL, NBA, F1, UFC and more in HD/4K." },
      { q: "Is it cheaper than Netflix?", a: "Yes — from about $5/month versus Netflix's $15.49–$22.99, and it includes live TV on top of VOD." },
    ],
    related: ["disney-plus", "hulu", "cable", "sling-tv"],
  },
  "cable": {
    slug: "cable",
    competitor: "Cable TV",
    competitorShort: "Cable",
    icon: "📡",
    h1: "The Best Cable TV Alternative in 2026",
    metaTitle: "Best Cable TV Alternative 2026 — Cut the Cord, Save $1,500/yr",
    metaDescription:
      "The best cable TV alternative in 2026 — 22,000+ live channels, sports and 4K for $5–$10/month instead of $80–$160. No box rental, no contract. Free 24h trial.",
    answer:
      "The best cable TV alternative in 2026 is IPTV: it keeps the live channels, sports and news you have cable for, drops the $80–$160 bill to around $5–$10/month, and removes box-rental fees and the 12–24 month contract. Best IPTV VIP delivers 22,000+ live channels in HD/4K on devices you already own, saving roughly $1,500/year.",
    leaving: [
      "$80–$160/month bills that keep climbing",
      "Rented set-top boxes at $10–$25/month each",
      "12–24 month contracts with early-termination fees",
      "Channels you never watch in forced bundles",
    ],
    keep: [
      "All the live channels, sport and news you actually watch",
      "A full EPG TV guide and 7-day catch-up",
      "Watch on the main TV in every room",
    ],
    gain: [
      "22,000+ channels vs 150–500 on cable",
      "Real 4K instead of 720p/1080i",
      "No box rental, no contract, no early-termination fee",
      "Works while travelling — not geo-locked to your home",
    ],
    migration: [
      { t: "Keep your TVs", d: "Add a cheap Firestick or use your Smart TV app — no cable box, no truck-roll." },
      { t: "Test before you cancel", d: "Run the free 24h trial alongside cable to confirm the channels you need." },
      { t: "Cut the cord", d: "Subscribe from ~$5/month and cancel cable — activation takes under 10 minutes." },
    ],
    faq: [
      { q: "Will I lose my local channels?", a: "Most locals are available; local-affiliate coverage varies by region, so test yours on the free trial first." },
      { q: "Do I need a special box?", a: "No — a $30 Firestick or your Smart TV's own app is enough. No rented cable box." },
      { q: "How much will I save?", a: "Typically $1,400–$1,800 per year versus an $80–$160/month cable bundle." },
    ],
    related: ["sling-tv", "youtube-tv", "directv-stream", "fubotv"],
  },
  "sling-tv": {
    slug: "sling-tv",
    competitor: "Sling TV",
    competitorShort: "Sling TV",
    icon: "📺",
    h1: "The Best Sling TV Alternative in 2026",
    metaTitle: "Best Sling TV Alternative 2026 — More Channels, No Splits",
    metaDescription:
      "The best Sling TV alternative in 2026 — every channel in one plan, no Orange/Blue split, plus 4K and international channels. From $5/mo. Free 24h trial.",
    answer:
      "The best Sling TV alternative in 2026 is IPTV that removes Sling's Orange/Blue package split and channel gaps: you get all sports, entertainment and news in one plan, plus 4K and international channels Sling lacks, from around $5/month. Best IPTV VIP carries 22,000+ live channels with no add-on tiers.",
    leaving: [
      "Orange vs Blue split forcing two packages for full sport",
      "Missing channels and frequent line-up changes",
      "Streams capped at 1080p, no real 4K",
      "Price creep on add-on 'Extras'",
    ],
    keep: [
      "The US entertainment and sports channels you stream now",
      "Cloud-DVR-style catch-up on the player",
      "Watch on Firestick, Roku-class devices, phone and TV",
    ],
    gain: [
      "No Orange/Blue split — everything in one plan",
      "22,000+ channels including international and 4K",
      "Live sport with no blackouts",
      "Lower price with no add-on tiers",
    ],
    migration: [
      { t: "Same streaming devices", d: "Runs on the Firestick or Smart TV you already use for Sling." },
      { t: "Trial the channel list free", d: "Confirm your teams and shows are covered in 24h, no card." },
      { t: "Switch and simplify", d: "One plan from ~$5/month replaces Orange + Blue + Extras." },
    ],
    faq: [
      { q: "Do I still have to choose Orange or Blue?", a: "No — the single plan carries the channels split across both Sling packages, plus many more." },
      { q: "Is there 4K?", a: "Yes, real 4K on marquee content, which Sling does not offer." },
    ],
    related: ["youtube-tv", "cable", "fubotv", "directv-stream"],
  },
  "youtube-tv": {
    slug: "youtube-tv",
    competitor: "YouTube TV",
    competitorShort: "YouTube TV",
    icon: "▶️",
    h1: "The Best YouTube TV Alternative in 2026",
    metaTitle: "Best YouTube TV Alternative 2026 — Half the Price, More TV",
    metaDescription:
      "The best YouTube TV alternative in 2026 — the same live networks and sport for a fraction of $82.99/month, plus 4K and international channels. Free 24h trial.",
    answer:
      "The best YouTube TV alternative in 2026 is IPTV that matches the live networks, RSNs and sport for around $5–$10/month instead of $82.99, and adds international channels and out-of-market games YouTube TV blacks out. Best IPTV VIP carries 22,000+ live channels with unlimited-style catch-up.",
    leaving: [
      "$82.99/month and rising",
      "Local and sports blackouts by ZIP code",
      "4K only as a paid add-on",
      "Limited to US content",
    ],
    keep: [
      "All the major US networks, news and cable channels",
      "Sports coverage including NFL, NBA, MLB",
      "Multi-device viewing and catch-up",
    ],
    gain: [
      "Roughly 1/10th the monthly price",
      "No local or out-of-market sports blackouts",
      "4K included, not a $10 add-on",
      "22,000+ channels including international",
    ],
    migration: [
      { t: "Keep your devices", d: "Runs on the same Firestick, Smart TV or phone you use for YouTube TV." },
      { t: "Free 24h trial", d: "Check your locals and teams are covered before cancelling." },
      { t: "Switch and save", d: "From ~$5/month replaces the $82.99 bill — set up in 10 minutes." },
    ],
    faq: [
      { q: "Are there blackouts like YouTube TV?", a: "No — out-of-market and local sports blackouts don't apply, so you get your home team live." },
      { q: "Is 4K extra?", a: "No, 4K is included on marquee content rather than a paid add-on." },
    ],
    related: ["sling-tv", "fubotv", "directv-stream", "cable"],
  },
  "disney-plus": {
    slug: "disney-plus",
    competitor: "Disney+",
    competitorShort: "Disney+",
    icon: "🏰",
    h1: "The Best Disney+ Alternative in 2026",
    metaTitle: "Best Disney+ Alternative 2026 — Live TV + Movies in One",
    metaDescription:
      "The best Disney+ alternative in 2026 — keep on-demand movies and add 22,000+ live channels and sport in one plan, from $5/mo. Free 24h trial, no card.",
    answer:
      "The best Disney+ alternative in 2026 is IPTV that keeps a large on-demand movie and series library while adding the live TV, news and sport Disney+ lacks, for around $5–$10/month. Best IPTV VIP pairs 120,000+ VOD titles with 22,000+ live channels, so one plan replaces a stack of streaming apps.",
    leaving: [
      "VOD-only with no live TV or sport",
      "Rising price and an ad tier",
      "Content siloed away from other studios' apps",
      "Needing a second service for live channels",
    ],
    keep: [
      "A big on-demand movie and family-series library",
      "Watch on the same TV, tablet, phone and Firestick",
      "Kids and family content",
    ],
    gain: [
      "22,000+ live channels and live sport",
      "One plan instead of Disney+ plus a live-TV service",
      "4K across live and VOD",
      "Lower combined monthly cost",
    ],
    migration: [
      { t: "Same devices", d: "Runs on your existing TV, Firestick, tablet or phone." },
      { t: "Trial free for 24h", d: "Test the VOD library and live channels before switching." },
      { t: "Consolidate", d: "One IPTV plan from ~$5/month replaces multiple streaming subscriptions." },
    ],
    faq: [
      { q: "Does it have kids and family content?", a: "Yes — the VOD library includes family films and series, alongside 22,000+ live channels." },
      { q: "Can I drop my other streaming apps?", a: "Often yes — one plan combines a large VOD library with live TV and sport." },
    ],
    related: ["netflix", "hulu", "cable", "youtube-tv"],
  },
  "hulu": {
    slug: "hulu",
    competitor: "Hulu",
    competitorShort: "Hulu",
    icon: "🟢",
    h1: "The Best Hulu Alternative in 2026",
    metaTitle: "Best Hulu Alternative 2026 — Live TV + VOD Without Ads",
    metaDescription:
      "The best Hulu alternative in 2026 — on-demand shows plus 22,000+ live channels and sport, no ad tier, from $5/mo. Cheaper than Hulu + Live TV. Free trial.",
    answer:
      "The best Hulu alternative in 2026 is IPTV that combines on-demand series with 22,000+ live channels and sport for around $5–$10/month — well below Hulu + Live TV at $82.99 — and without an ad-supported tier. Best IPTV VIP delivers VOD plus live TV in one plan.",
    leaving: [
      "Ads unless you pay the premium tier",
      "Hulu + Live TV priced at $82.99/month",
      "Catalogue gaps and rotating titles",
      "Separate bills for VOD and live TV",
    ],
    keep: [
      "On-demand series and next-day TV episodes",
      "Watch on your current devices",
      "Live TV channels (on the equivalent of the Live tier)",
    ],
    gain: [
      "22,000+ live channels vs Hulu's live line-up",
      "No ad tier — one price",
      "4K on marquee content",
      "International channels and sport with no blackouts",
    ],
    migration: [
      { t: "Keep your devices", d: "Runs on the same Firestick, Smart TV or phone." },
      { t: "Free 24h trial", d: "Compare the live channels and VOD before cancelling." },
      { t: "Switch", d: "From ~$5/month instead of $82.99 for Hulu + Live TV." },
    ],
    faq: [
      { q: "Is it cheaper than Hulu + Live TV?", a: "Yes — from about $5/month versus $82.99, with live TV and VOD together." },
      { q: "Are there ads?", a: "No forced ad tier — you get one plan at one price." },
    ],
    related: ["netflix", "disney-plus", "youtube-tv", "sling-tv"],
  },
  "directv-stream": {
    slug: "directv-stream",
    competitor: "DIRECTV STREAM",
    competitorShort: "DIRECTV STREAM",
    icon: "🛰️",
    h1: "The Best DIRECTV STREAM Alternative in 2026",
    metaTitle: "Best DIRECTV STREAM Alternative 2026 — More TV, Far Less",
    metaDescription:
      "The best DIRECTV STREAM alternative in 2026 — the same sports and locals for a fraction of $86.99–$154.99/month, plus 4K and international. Free 24h trial.",
    answer:
      "The best DIRECTV STREAM alternative in 2026 is IPTV that matches the sports, RSNs and local networks for around $5–$10/month instead of $86.99–$154.99, and adds 4K and international channels. Best IPTV VIP carries 22,000+ live channels with no contract.",
    leaving: [
      "$86.99–$154.99/month packages",
      "Regional sports network surcharges",
      "Contract and equipment considerations",
      "Bundled channels you don't watch",
    ],
    keep: [
      "Live sports, RSNs and local networks",
      "Full TV guide and catch-up",
      "Multi-room viewing",
    ],
    gain: [
      "A fraction of the monthly cost",
      "22,000+ channels including international",
      "Real 4K and no blackouts",
      "No contract, no equipment fees",
    ],
    migration: [
      { t: "Same devices", d: "Runs on a Firestick or Smart TV — no satellite hardware." },
      { t: "Trial free", d: "Confirm your RSNs and locals in 24h before switching." },
      { t: "Downgrade the bill", d: "From ~$5/month replaces a $90–$155 package." },
    ],
    faq: [
      { q: "Do I keep regional sports networks?", a: "Yes — RSNs are carried, and you avoid DIRECTV's RSN surcharge." },
      { q: "Is there a contract?", a: "No — pay month-to-month or annually, no lock-in." },
    ],
    related: ["youtube-tv", "fubotv", "sling-tv", "cable"],
  },
  "fubotv": {
    slug: "fubotv",
    competitor: "fuboTV",
    competitorShort: "fuboTV",
    icon: "⚽",
    h1: "The Best fuboTV Alternative in 2026",
    metaTitle: "Best fuboTV Alternative 2026 — All Sports, No Price Hikes",
    metaDescription:
      "The best fuboTV alternative in 2026 — every league and international sport in one plan for a fraction of $84.99/month, plus 4K. No blackouts. Free 24h trial.",
    answer:
      "The best fuboTV alternative in 2026 is IPTV built for sport: it carries every major league plus international football fuboTV is known for, from around $5–$10/month instead of $84.99, with no blackouts and real 4K. Best IPTV VIP bundles 22,000+ channels including global sports.",
    leaving: [
      "$84.99/month with regular price rises",
      "Regional and league blackouts",
      "Channel drops during carriage disputes",
      "Add-on tiers for full sport",
    ],
    keep: [
      "Domestic and international football coverage",
      "Multi-view and catch-up",
      "Watch on your current streaming devices",
    ],
    gain: [
      "Every league in one plan — no add-ons",
      "No blackouts on home teams or big matches",
      "22,000+ channels including worldwide sport",
      "A fraction of the monthly price",
    ],
    migration: [
      { t: "Keep your devices", d: "Runs on the Firestick or Smart TV you already stream fubo on." },
      { t: "Free 24h trial", d: "Test a live match and your leagues before switching." },
      { t: "Switch", d: "One plan from ~$5/month replaces $84.99 plus add-ons." },
    ],
    faq: [
      { q: "Does it have international football like fubo?", a: "Yes — domestic and international leagues in one plan, with no add-on tiers." },
      { q: "Are there blackouts?", a: "No — home-team and big-match blackouts don't apply." },
    ],
    related: ["youtube-tv", "sling-tv", "directv-stream", "cable"],
  },
};

export const ALTERNATIVE_SLUGS = Object.keys(ALTERNATIVES);

export const ALTERNATIVE_LIST: Alternative[] = ALTERNATIVE_SLUGS.map((s) => ALTERNATIVES[s]);
