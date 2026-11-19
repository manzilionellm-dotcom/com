// Programmatic comparison-page registry.
// Each entry generates a high-intent transactional landing page at
// /compare/[slug] with extraction-friendly structure for AI Overviews.

export type ComparisonRow = {
  feature: string;
  us: string;
  them: string;
  winner?: "us" | "them" | "tie";
};

export type Comparison = {
  slug: string;
  competitor: string;
  competitorShort: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One-paragraph direct answer for AI Overviews / featured snippets. */
  answer: string;
  /** Three bullets summarising who should pick which option. */
  verdict: { audience: string; pick: "us" | "them"; reason: string }[];
  rows: ComparisonRow[];
  pros: { us: string[]; them: string[] };
  cons: { us: string[]; them: string[] };
  faq: { q: string; a: string }[];
};

export const COMPARISONS: Record<string, Comparison> = {
  "iptv-vs-cable-tv": {
    slug: "iptv-vs-cable-tv",
    competitor: "Cable TV",
    competitorShort: "Cable",
    h1: "IPTV vs Cable TV — Honest 2026 Comparison",
    metaTitle: "IPTV vs Cable TV (2026) — Price and Channels",
    metaDescription:
      "IPTV vs cable TV in 2026: price, channel count, 4K quality, sports coverage and support. See where IPTV wins and where cable still has the edge.",
    answer:
      "Our listed prices are $10 for 1 month and $60 for 12 months. This page does not publish a channel count or a yearly saving versus cable. Cable can still include local affiliate channels and a DVR.",
    verdict: [
      {
        audience: "Sports + movies + international viewers",
        pick: "us",
        reason: "All major leagues in 4K plus 50+ countries' channels in one $10/month plan.",
      },
      {
        audience: "Local-news-only households",
        pick: "them",
        reason: "Cable bundles your zip-code's ABC/NBC/CBS/FOX affiliates reliably.",
      },
      {
        audience: "Cord-cutters wanting one app on any device",
        pick: "us",
        reason: "IPTV runs on Firestick, Smart TV, phone, MAG box — no rented set-top.",
      },
    ],
    rows: [
      { feature: "Monthly price", us: "$5–$10", them: "$80–$160", winner: "us" },
      { feature: "Live channels", us: "Not published", them: "150–500 local", winner: "tie" },
      { feature: "4K UHD channels", us: "Not published", them: "Often 720p/1080i", winner: "tie" },
      { feature: "VOD library", us: "Not published", them: "On-demand add-on", winner: "tie" },
      { feature: "Sports (Premier League, NBA, NFL, F1)", us: "Bundled", them: "Per-package add-on", winner: "us" },
      { feature: "Local affiliates (US locals, weather)", us: "Limited", them: "Bundled by ZIP", winner: "them" },
      { feature: "DVR / catch-up", us: "7-day catch-up + player recording", them: "Multi-room cloud DVR", winner: "them" },
      { feature: "Equipment rental fees", us: "$0", them: "$10–$25/month", winner: "us" },
      { feature: "Contract", us: "No contract", them: "12–24 months typical", winner: "us" },
      { feature: "Activation time", us: "Via WhatsApp", them: "Days to weeks (truck-roll)", winner: "us" },
      { feature: "Support", us: "WhatsApp", them: "Phone + chat", winner: "tie" },
      { feature: "Works while travelling", us: "Not stated", them: "No — geo-locked", winner: "tie" },
    ],
    pros: {
      us: [
        "Massive savings vs cable bundle",
        "Live channels",
        "Works on devices you already own",
        "No long-term contract",
        "International sports + movies in one bill",
      ],
      them: [
        "Bundled local news and emergency alerts",
        "Polished cloud DVR with multi-room",
        "In-country call-centre support",
        "No internet-dependency for OTA stations",
      ],
    },
    cons: {
      us: [
        "Requires 25 Mbps for 4K",
        "Local affiliate coverage varies by region",
        "Needs decent Wi-Fi or Ethernet to the TV",
      ],
      them: [
        "Expensive — $1,200–$2,000/year",
        "Equipment rental, install fees, hidden surcharges",
        "Long-term contracts, painful cancellations",
        "Limited 4K coverage outside premium tiers",
      ],
    },
    faq: [
      {
        q: "Is IPTV legal as a cable replacement?",
        a: "This site does not state that Best IPTV VIP holds a broadcast licence. Check the law where you live. Broadcast rights stay with their owners.",
      },
      {
        q: "Will I lose live local news with IPTV?",
        a: "You can still get major national news (CNN, BBC, FOX News, Sky News) in HD. Hyper-local zip-code affiliates are weaker — pair IPTV with a free over-the-air antenna ($25 one-off) for local news.",
      },
      {
        q: "Do I need a smart TV?",
        a: "No. Any TV with HDMI plus a $40 Firestick or Android box works. Or watch directly on a phone, tablet, PC or MAG box.",
      },
    ],
  },

  "iptv-vs-netflix": {
    slug: "iptv-vs-netflix",
    competitor: "Netflix",
    competitorShort: "Netflix",
    h1: "IPTV vs Netflix — Which One Should You Pay For?",
    metaTitle: "IPTV vs Netflix (2026) — Live TV + VOD vs On-Demand-Only",
    metaDescription:
      "Netflix is on-demand only. IPTV is a live-TV subscription. This page does not publish a channel or title count.",
    answer:
      "Netflix is on-demand only: no live TV in the Netflix product. The 1-month price on this site is $10. A channel count is not published here. Netflix originals are not part of this subscription.",
    verdict: [
      {
        audience: "Live sports + news viewers",
        pick: "us",
        reason: "Netflix has zero live sport and zero news. IPTV covers Premier League, NFL, NBA, F1, BBC, CNN.",
      },
      {
        audience: "Netflix-original superfans",
        pick: "them",
        reason: "Stranger Things, Squid Game and Netflix exclusives are only on Netflix.",
      },
      {
        audience: "Multi-language / international households",
        pick: "us",
        reason: "MBC, beIN, Star Plus, ZDF, TF1, TVE, Sun TV — 50+ countries in one plan.",
      },
    ],
    rows: [
      { feature: "Monthly price", us: "$5–$10", them: "$15.49–$22.99", winner: "us" },
      { feature: "Live TV", us: "Live TV", them: "None", winner: "us" },
      { feature: "Live sports", us: "Where the feed includes them", them: "None", winner: "us" },
      { feature: "Live news", us: "BBC, CNN, Sky News, Al Jazeera, France 24", them: "None", winner: "us" },
      { feature: "On-demand library", us: "Not published", them: "~7,000 titles", winner: "tie" },
      { feature: "Netflix Originals", us: "No", them: "Yes (exclusive)", winner: "them" },
      { feature: "4K UHD", us: "Not published", them: "Premium tier only", winner: "tie" },
      { feature: "Simultaneous devices", us: "Up to 3", them: "1–4 by tier", winner: "tie" },
      { feature: "Offline downloads", us: "Player-dependent", them: "Yes (mobile)", winner: "them" },
      { feature: "Contract", us: "No contract", them: "Monthly rolling", winner: "tie" },
      { feature: "Free trial", us: "24h free, no card", them: "Discontinued", winner: "us" },
    ],
    pros: {
      us: [
        "Live TV + VOD in one bill, cheaper than Netflix alone",
        "Full sports + news coverage",
        "International channels in 50+ countries",
        "No contract, 24h free trial",
      ],
      them: [
        "Netflix originals (Stranger Things, Squid Game…)",
        "Polished UX and recommendations",
        "Mobile offline downloads",
        "Single, simple subscription",
      ],
    },
    cons: {
      us: [
        "No Netflix-exclusive originals",
        "Quality of VOD library varies — newer titles are best",
      ],
      them: [
        "Most expensive streaming service per hour of unique content",
        "No live TV, sports or news at all",
        "Price hikes year over year",
      ],
    },
    faq: [
      {
        q: "Should I cancel Netflix if I get IPTV?",
        a: "Most households keep both for the first month and decide. Netflix originals are the only real lock-in — if you don't watch them, you can drop Netflix and save $20+/month.",
      },
      {
        q: "Can I watch Netflix-style movies on IPTV?",
        a: "On-demand titles are part of the plans that mention them. A title count is not published on this page.",
      },
      {
        q: "Does IPTV replace Disney+, HBO Max, Prime Video too?",
        a: "Partly — premium movie channels (HBO, Showtime, Sky Cinema, Canal+ Cinéma) are bundled. Studio-exclusive originals stay on their native platforms.",
      },
    ],
  },

  "iptv-vs-disney-plus": {
    slug: "iptv-vs-disney-plus",
    competitor: "Disney+",
    competitorShort: "Disney+",
    h1: "IPTV vs Disney+ — Live TV vs Family Streaming",
    metaTitle: "IPTV vs Disney+ (2026) — Honest Comparison",
    metaDescription:
      "Disney+ covers Disney, Marvel, Star Wars and Pixar. This IPTV subscription is for live TV. A channel count is not published here.",
    answer:
      "Disney+ is an on-demand library with no live TV. This IPTV subscription is a separate live-TV product. Studio exclusives stay on Disney+. A channel count is not published here.",
    verdict: [
      {
        audience: "Disney/Marvel/Star Wars completionists",
        pick: "them",
        reason: "Exclusive originals (Mandalorian, Loki, new Pixar releases) only stream on Disney+.",
      },
      {
        audience: "Families wanting live kids channels + cartoons",
        pick: "us",
        reason: "Cartoon Network, Nick, Boomerang, KiKA, Spacetoon, MBC 3 — all live, with EPG.",
      },
      {
        audience: "Sports + general entertainment",
        pick: "us",
        reason: "Disney+ has no live sports. IPTV covers every major league in 4K.",
      },
    ],
    rows: [
      { feature: "Monthly price", us: "$5–$10", them: "$9.99–$15.99", winner: "us" },
      { feature: "Live TV", us: "Live TV", them: "None", winner: "us" },
      { feature: "Live kids networks", us: "Listed on the country pages", them: "None", winner: "us" },
      { feature: "Disney Originals", us: "No", them: "Yes (exclusive)", winner: "them" },
      { feature: "Sports", us: "Where the feed includes them", them: "None (ESPN+ separate)", winner: "us" },
      { feature: "Parental controls", us: "Yes (player level)", them: "Yes (built-in)", winner: "them" },
      { feature: "4K HDR", us: "Not published", them: "Originals only", winner: "tie" },
      { feature: "Devices supported", us: "Every device", them: "Every device", winner: "tie" },
      { feature: "Family-safe content", us: "Filter by group", them: "Default family-friendly", winner: "them" },
      { feature: "Free trial", us: "24h free, no card", them: "Discontinued", winner: "us" },
    ],
    pros: {
      us: [
        "Live kids + family channels with EPG",
        "Live sports for the parents",
        "Cheaper monthly cost",
        "International cartoons and kids content (Spacetoon, Gulli, JimJam)",
      ],
      them: [
        "Disney, Marvel, Star Wars, Pixar exclusives",
        "Built-in kid profiles and content filters",
        "Native 4K HDR Dolby Vision on originals",
        "Polished, kid-safe UI",
      ],
    },
    cons: {
      us: [
        "No Disney/Marvel/Star Wars originals",
        "Parental filters depend on the IPTV player",
      ],
      them: [
        "No live TV or sports",
        "Library rotates — content can disappear",
        "Price has doubled since launch",
      ],
    },
    faq: [
      {
        q: "Can I watch Disney+ originals on IPTV?",
        a: "No — studio exclusives like The Mandalorian or Andor are not on any IPTV service. If you must watch those, keep Disney+ and add IPTV for live TV.",
      },
      {
        q: "Are kids channels included in Best IPTV VIP?",
        a: "Yes — Cartoon Network, Nick, Boomerang, Disney Channel (regional feeds), Spacetoon, MBC 3, Gulli, KiKA, JimJam and more.",
      },
    ],
  },

  "iptv-vs-sling-tv": {
    slug: "iptv-vs-sling-tv",
    competitor: "Sling TV",
    competitorShort: "Sling TV",
    h1: "IPTV vs Sling TV — Worldwide Live TV Compared",
    metaTitle: "IPTV vs Sling TV (2026) — Channels, Price, Sports",
    metaDescription:
      "Sling TV is a US live-TV product. The 1-month price on this site is $10. A channel count is not published here.",
    answer:
      "Sling TV is a US live-TV product. Prices on this site are $10 for 1 month and $60 for 12 months ($5 per month across that term). This page does not state that the channel list matches Sling, and it does not publish a channel count.",
    verdict: [
      {
        audience: "US-only viewers wanting an established US brand",
        pick: "them",
        reason: "Sling is a US streaming brand with its own apps.",
      },
      {
        audience: "International / expat households",
        pick: "us",
        reason: "Sling has no Arabic, French, Spanish (beyond a small add-on), German, Turkish or Asian channels.",
      },
      {
        audience: "Cost-conscious sports fans",
        pick: "us",
        reason: "Premier League, La Liga, F1 and global sports are bundled — Sling adds them as expensive packs.",
      },
    ],
    rows: [
      { feature: "Monthly price", us: "$5–$10", them: "$40–$60+", winner: "us" },
      { feature: "Channel count", us: "Not published", them: "~50 US base + add-ons", winner: "tie" },
      { feature: "4K UHD", us: "Not published", them: "Limited", winner: "tie" },
      { feature: "International channels", us: "Not published", them: "Paid extras only", winner: "tie" },
      { feature: "Local US affiliates", us: "Partial", them: "Major markets via add-on", winner: "them" },
      { feature: "Cloud DVR", us: "7-day catch-up", them: "Included (50h)", winner: "them" },
      { feature: "Simultaneous streams", us: "Up to 3", them: "1–3 by plan", winner: "tie" },
      { feature: "Free trial", us: "24h free, no card", them: "3-day trial w/ card", winner: "us" },
      { feature: "Works abroad", us: "Not stated", them: "No (US-only)", winner: "tie" },
    ],
    pros: {
      us: [
        "1 month on this site is $10",
        "International channels in one bill",
        "Works while travelling abroad",
        "Sports bundled, not add-on",
      ],
      them: [
        "Its own apps on US streaming devices",
        "Built-in cloud DVR with multi-stream",
        "Better local US affiliate coverage",
        "Native app on every US streaming platform",
      ],
    },
    cons: {
      us: [
        "Local US ABC/NBC/CBS affiliate coverage varies",
        "Player choice matters (TiviMate, Smarters)",
      ],
      them: [
        "Expensive once you add sports + extras",
        "US-only — geo-locks while travelling",
        "Channel line-up is small vs IPTV",
        "Price hikes outpace inflation",
      ],
    },
    faq: [
      {
        q: "Does Sling TV have Premier League?",
        a: "Sling Blue carries USA Network and NBC Sports add-on which include selected Premier League matches — but not the full slate. IPTV carries every Premier League match across Sky Sports and TNT Sports feeds.",
      },
      {
        q: "Can I watch Sling TV abroad?",
        a: "No — Sling geo-locks to the US (with limited international packages). IPTV works on any ISP in any country.",
      },
    ],
  },

  "iptv-vs-youtube-tv": {
    slug: "iptv-vs-youtube-tv",
    competitor: "YouTube TV",
    competitorShort: "YouTube TV",
    h1: "IPTV vs YouTube TV — 2026 Cord-Cutter Comparison",
    metaTitle: "IPTV vs YouTube TV (2026) — Price, Channels, 4K",
    metaDescription:
      "YouTube TV is a US live-TV product. The 1-month price on this site is $10. A channel count is not published here.",
    answer:
      "YouTube TV is a US live-TV product with its own DVR. Prices on this site are $10 for 1 month and $60 for 12 months. This page does not state that the channel list matches YouTube TV, and it does not publish a saving.",
    verdict: [
      {
        audience: "US households wanting a single polished cord-cutter app",
        pick: "them",
        reason: "Unlimited DVR, 6 accounts, native YouTube integration are unmatched.",
      },
      {
        audience: "Budget-focused cord-cutters",
        pick: "us",
        reason: "Same US channels at one-eighth the price, plus international + VOD.",
      },
      {
        audience: "International / multilingual households",
        pick: "us",
        reason: "YouTube TV is US-only; IPTV covers 50+ countries' channels in one plan.",
      },
    ],
    rows: [
      { feature: "Monthly price", us: "$5–$10", them: "$82.99", winner: "us" },
      { feature: "Annual cost", us: "$60–$120", them: "~$995", winner: "us" },
      { feature: "Channels", us: "Not published", them: "~100 US", winner: "tie" },
      { feature: "Cloud DVR", us: "7-day catch-up", them: "Unlimited", winner: "them" },
      { feature: "4K UHD", us: "Not published", them: "Add-on $9.99/mo", winner: "tie" },
      { feature: "Simultaneous streams", us: "Up to 3", them: "3 (6 with add-on)", winner: "them" },
      { feature: "International channels", us: "Not published", them: "Paid extras", winner: "tie" },
      { feature: "Works abroad", us: "Not stated", them: "No (US-only)", winner: "tie" },
      { feature: "Free trial", us: "24h free, no card", them: "Was 14 days, often unavailable", winner: "us" },
    ],
    pros: {
      us: [
        "This page does not calculate a monthly saving",
        "International channels included",
        "Works on any device, any country",
        "Same major US networks YouTube TV carries",
      ],
      them: [
        "Unlimited cloud DVR — best in market",
        "Polished Google-grade app on every device",
        "6 user accounts with separate libraries",
        "Native 4K add-on for major sports",
      ],
    },
    cons: {
      us: [
        "No unlimited cloud DVR (catch-up only)",
        "Local affiliate coverage varies",
      ],
      them: [
        "$82.99/month base — among the most expensive",
        "US-only — useless when travelling",
        "4K is a separate $9.99 add-on",
        "No international channels in base plan",
      ],
    },
    faq: [
      {
        q: "Is YouTube TV worth $82.99?",
        a: "For US households who heavily use cloud DVR and want one-click setup, yes. For cost-conscious viewers or anyone watching international content, IPTV delivers similar live coverage at 10% of the price.",
      },
      {
        q: "Can I share IPTV with family like YouTube TV's 6 accounts?",
        a: "12-month plans support up to 3 simultaneous devices, which covers most households. For more streams, contact us on WhatsApp about multi-stream packs.",
      },
    ],
  },
};

export const COMPARE_SLUGS = Object.keys(COMPARISONS);
