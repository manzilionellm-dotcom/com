"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Locale = "en" | "fr" | "es" | "de" | "ar";
type PlanKey = "p1" | "p3" | "p6" | "p12";
type Msg = { from: "bot" | "user"; text: string };
type Plan = {
  key: PlanKey;
  price: number;
  months: number;
  currency: "USD";
  highlight?: boolean;
  priceValidUntil: string;
};
type FAQItem = { q: string; a: string };
type ReviewItem = {
  name: string;
  city: string;
  stars: number;
  text: string;
  plan: string;
};
type Copy = {
  brand: string;
  top: { status: string; urgency: string };
  nav: {
    offers: string;
    channels: string;
    faq: string;
    setup: string;
    whatsapp: string;
    install: string;
    cities: string;
    devices: string;
  };
  hero: {
    pill: string;
    titleA: string;
    titleB: string;
    lead: string;
    ctaPrices: string;
    ctaAdvisor: string;
    trust: string;
  };
  trial: {
    badge: string;
    title: string;
    sub: string;
    cta: string;
    note: string;
  };
  offers: {
    title: string;
    sub: string;
    order: string;
    billedOnce: string;
    perMonth: string;
    save: string;
    bestSeller: string;
    totalLabel: string;
  };
  planNames: Record<PlanKey, string>;
  planPerks: Record<PlanKey, string[]>;
  channels: { title: string; sub: string; more: string };
  devices: {
    title: string;
    sub: string;
    list: { name: string; icon: string }[];
  };
  vod: {
    title: string;
    sub: string;
    stats: { value: string; label: string }[];
  };
  compare: {
    title: string;
    sub: string;
    headers: string[];
    rows: {
      service: string;
      price: string;
      live: string;
      vod: boolean;
      hd4k: boolean;
      support: string;
      highlight?: boolean;
    }[];
  };
  reviews: { title: string; sub: string; items: ReviewItem[] };
  trust: { title: string; items: { icon: string; title: string; desc: string }[] };
  faq: { title: string; items: FAQItem[] };
  cities: {
    title: string;
    sub: string;
    button: string;
    items: { name: string; text: string }[];
  };
  setup: {
    title: string;
    sub: string;
    button: string;
    steps: { step: string; text: string }[];
  };
  countriesSection: {
    title: string;
    sub: string;
    hint: string;
    notFoundCta: string;
    modalChannelsTitle: string;
    modalKeywordsTitle: string;
    modalKeywordsNote: string;
    priceLine: string;
    priceSub: string;
    moreChannels: string;
    orderCta: (name: string) => string;
    trialCta: string;
  };
  footer: {
    rights: string;
    note: string;
    legal: string;
    privacy: string;
    terms: string;
    refund: string;
  };
  whatsapp: {
    generic: string;
    trial: string;
    orderMessage: (p: string, pr: number, c: string) => string;
  };
  bot: {
    greeting1: string;
    greeting2: string;
    price1: string;
    price2: string;
    install1: string;
    install2: string;
    trial1: string;
    trial2: string;
    default1: string;
    default2: string;
    quick: string[];
    typing: string;
    online: string;
    placeholder: string;
  };
  pwa: {
    install: string;
    installSub: string;
    accept: string;
    iosTitle: string;
    iosBefore: string;
    iosAfter: string;
  };
  intro: {
    tagline: string;
    sub: string;
    skip: string;
  };
  liveWidget: {
    nowLabel: string;
    visitors: string;
    support: string;
    online: string;
    cta: string;
    toastTitle: string;
    toastSub: (n: number) => string;
    toastBtn: string;
    updated: (label: string) => string;
    ago: (n: number) => string;
    justNow: string;
  };
};

const SITE = {
  domain: "https://bestiptv-vip.com",
  brand: "Best IPTV VIP",
  whatsappPhone: "447307410512",
  currency: "USD" as const,
  currencySymbol: "$",
} as const;

const plans: Plan[] = [
  { key: "p1", price: 14, months: 1, currency: "USD", priceValidUntil: "2027-12-31" },
  { key: "p3", price: 30, months: 3, currency: "USD", highlight: true, priceValidUntil: "2027-12-31" },
  { key: "p6", price: 55, months: 6, currency: "USD", priceValidUntil: "2027-12-31" },
  { key: "p12", price: 99, months: 12, currency: "USD", priceValidUntil: "2027-12-31" },
];

const channelPreview = [
  {
    region: "USA & Canada",
    channels: ["ESPN HD", "NBC", "CBS HD", "FOX Sports", "HBO", "AMC", "Discovery", "TSN", "Sportsnet", "CBC"],
  },
  {
    region: "UK & Ireland",
    channels: ["BBC One HD", "Sky Sports HD", "BT Sport 4K", "ITV HD", "Channel 4", "Sky Cinema", "TNT Sports", "RTE One"],
  },
  {
    region: "Europe",
    channels: ["Canal+ 4K", "beIN Sports", "RAI 1", "ZDF HD", "TF1 France", "RTL", "DAZN", "Movistar+", "Eurosport 4K"],
  },
  {
    region: "MENA & Asia",
    channels: ["MBC 1", "Al Jazeera", "beIN Arabic 4K", "OSN Movies", "Star Plus", "Zee TV", "TVB Jade", "Phoenix"],
  },
  {
    region: "LATAM & Africa",
    channels: ["Telemundo", "Univision", "ESPN Latin", "SuperSport", "Canal+ Afrique", "Globo Brasil", "DSTV"],
  },
] as const;

const DEVICE_LIST = [
  { name: "Smart TV", icon: "📺" },
  { name: "Firestick / Fire TV", icon: "🔥" },
  { name: "iPhone & iPad", icon: "📱" },
  { name: "Android", icon: "🤖" },
  { name: "PC & Mac", icon: "💻" },
  { name: "Android TV Box", icon: "📦" },
  { name: "MAG Box", icon: "📡" },
];

type CountryChannel = { n: string; c: string };
type Country = {
  slug: string;
  flag: string;
  name: string;
  sub: string;
  desc: string;
  wa: string;
  keywords: [string, string][];
  channels: CountryChannel[];
};

const COUNTRIES: Country[] = [
  {
    slug: "arabic",
    flag: "🇸🇦",
    name: "العربية",
    sub: "MBC, Al Jazeera, beIN Sports",
    desc: "Full Arabic channel package — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.",
    wa: "Hi! I want Arabic channels (Best IPTV VIP).",
    keywords: [
      ["arabic IPTV", "12k/mo"],
      ["MBC live stream", "8.9k/mo"],
      ["beIN Sports Arabic", "7.2k/mo"],
      ["arabic channels online", "6.5k/mo"],
    ],
    channels: [
      { n: "MBC 1", c: "🎬" },
      { n: "MBC 2", c: "🎬" },
      { n: "MBC Drama", c: "📺" },
      { n: "MBC Action", c: "💥" },
      { n: "Al Jazeera", c: "📰" },
      { n: "Al Arabiya", c: "📰" },
      { n: "beIN Sports 1 4K", c: "⚽" },
      { n: "beIN Sports 2", c: "⚽" },
      { n: "beIN Sports 3", c: "⚽" },
      { n: "OSN Sports", c: "⚽" },
      { n: "Rotana Cinema", c: "🎬" },
      { n: "Rotana Drama", c: "📺" },
      { n: "Dubai TV", c: "🎬" },
      { n: "Abu Dhabi TV", c: "📰" },
      { n: "Saudi 1", c: "🎬" },
      { n: "LBC Lebanon", c: "🎬" },
      { n: "BBC Arabic", c: "📰" },
      { n: "France 24 عربي", c: "📰" },
      { n: "Nile Drama", c: "📺" },
      { n: "MTV Lebanon", c: "🎵" },
    ],
  },
  {
    slug: "turkish",
    flag: "🇹🇷",
    name: "Türkçe",
    sub: "TRT, Show TV, Kanal D",
    desc: "All Turkish favourites — TRT, Show TV, Kanal D, diziler and sports.",
    wa: "Hi! I want Turkish channels (Best IPTV VIP).",
    keywords: [
      ["turkish IPTV", "9.8k/mo"],
      ["turkish channels live", "7.4k/mo"],
      ["TRT abroad", "5.2k/mo"],
      ["türk dizi online", "4.8k/mo"],
    ],
    channels: [
      { n: "TRT 1", c: "🎬" },
      { n: "TRT Haber", c: "📰" },
      { n: "TRT Spor", c: "⚽" },
      { n: "Show TV", c: "🎬" },
      { n: "Kanal D", c: "🎬" },
      { n: "Star TV", c: "🎬" },
      { n: "ATV", c: "🎬" },
      { n: "FOX Türkiye", c: "🎬" },
      { n: "Habertürk", c: "📰" },
      { n: "CNN Türk", c: "📰" },
      { n: "beIN Sports TR", c: "⚽" },
      { n: "A Spor", c: "⚽" },
      { n: "TV8", c: "🎬" },
      { n: "Teve 2", c: "🎬" },
      { n: "TRT 2", c: "🎭" },
    ],
  },
  {
    slug: "exyu",
    flag: "🇧🇦",
    name: "ExYu",
    sub: "Pink, RTS, HRT, Arena Sport",
    desc: "Bosnian, Serbian, Croatian channels — sports, series, news.",
    wa: "Hi! I want ExYu channels (Best IPTV VIP).",
    keywords: [
      ["exyu IPTV", "5.6k/mo"],
      ["balkan channels", "4.3k/mo"],
      ["Pink TV abroad", "3.8k/mo"],
      ["Arena Sport stream", "2.9k/mo"],
    ],
    channels: [
      { n: "Pink 1", c: "🎬" },
      { n: "Pink 2", c: "🎬" },
      { n: "RTS 1 Srbija", c: "🎬" },
      { n: "HRT 1 Hrvatska", c: "🎬" },
      { n: "FTV BiH", c: "🎬" },
      { n: "BHT1", c: "📰" },
      { n: "Arena Sport 1 HD", c: "⚽" },
      { n: "Arena Sport 2 HD", c: "⚽" },
      { n: "Prva TV", c: "🎬" },
      { n: "Nova S Srbija", c: "🎬" },
      { n: "Hayat TV", c: "🎬" },
      { n: "N1 Balkan", c: "📰" },
    ],
  },
  {
    slug: "somali",
    flag: "🇸🇴",
    name: "Somali",
    sub: "Universal TV, Horn Cable",
    desc: "Somali channels — Universal TV, Horn Cable TV, SBC.",
    wa: "Hi! I want Somali channels (Best IPTV VIP).",
    keywords: [
      ["somali IPTV", "3.4k/mo"],
      ["Universal TV abroad", "2.8k/mo"],
      ["somali channels live", "2.1k/mo"],
    ],
    channels: [
      { n: "Universal TV", c: "🎬" },
      { n: "Horn Cable TV", c: "📰" },
      { n: "SBC Somalia", c: "🎬" },
      { n: "Goobjoog TV", c: "📰" },
      { n: "Mustaqbal TV", c: "🎬" },
      { n: "VOA Somali", c: "📰" },
      { n: "BBC Somali", c: "📰" },
    ],
  },
  {
    slug: "persian",
    flag: "🇮🇷",
    name: "فارسی",
    sub: "Manoto, GEM TV, VOA Persian",
    desc: "Iranian channels — Manoto, GEM TV, Iran International.",
    wa: "Hi! I want Persian channels (Best IPTV VIP).",
    keywords: [
      ["persian IPTV", "4.2k/mo"],
      ["Manoto live", "3.5k/mo"],
      ["GEM TV stream", "2.9k/mo"],
    ],
    channels: [
      { n: "Manoto TV", c: "🎬" },
      { n: "GEM TV", c: "🎬" },
      { n: "VOA Persian", c: "📰" },
      { n: "Iran International", c: "📰" },
      { n: "BBC Persian", c: "📰" },
      { n: "Farsi1", c: "🎬" },
      { n: "Varzesh TV", c: "⚽" },
    ],
  },
  {
    slug: "kurdish",
    flag: "🏳️",
    name: "Kurdî",
    sub: "Rudaw, Kurdistan 24, NRT",
    desc: "Kurdish TV channels — Rudaw, Kurdistan 24, NRT, K24.",
    wa: "Hi! I want Kurdish channels (Best IPTV VIP).",
    keywords: [
      ["kurdish IPTV", "3.8k/mo"],
      ["Rudaw live", "2.9k/mo"],
      ["Kurdistan 24", "2.4k/mo"],
    ],
    channels: [
      { n: "Rudaw", c: "📰" },
      { n: "Kurdistan 24", c: "📰" },
      { n: "NRT TV", c: "🎬" },
      { n: "K24", c: "📰" },
      { n: "KTV Kurdistan", c: "🎬" },
      { n: "Zagros TV", c: "🎬" },
    ],
  },
  {
    slug: "polish",
    flag: "🇵🇱",
    name: "Polski",
    sub: "TVP, Polsat, TVN, Canal+",
    desc: "Polish TV channels — TVP, Polsat, TVN, Canal+.",
    wa: "Hi! I want Polish channels (Best IPTV VIP).",
    keywords: [
      ["polish IPTV", "3.1k/mo"],
      ["polskie kanały", "2.6k/mo"],
      ["TVP abroad", "2.0k/mo"],
    ],
    channels: [
      { n: "TVP 1", c: "🎬" },
      { n: "TVP 2", c: "🎬" },
      { n: "TVP Info", c: "📰" },
      { n: "Polsat", c: "🎬" },
      { n: "TVN", c: "🎬" },
      { n: "TVN 24", c: "📰" },
      { n: "Canal+ Sport PL", c: "⚽" },
      { n: "TVP Sport", c: "⚽" },
    ],
  },
  {
    slug: "nordic",
    flag: "🇸🇪",
    name: "Nordic",
    sub: "SVT, NRK, DR, Yle",
    desc: "Nordic channels — Sweden, Norway, Denmark, Finland.",
    wa: "Hi! I want Nordic channels (Best IPTV VIP).",
    keywords: [
      ["nordic IPTV", "2.8k/mo"],
      ["SVT abroad", "2.2k/mo"],
      ["NRK live stream", "1.8k/mo"],
    ],
    channels: [
      { n: "SVT 1 HD", c: "🎬" },
      { n: "SVT 2 HD", c: "🎬" },
      { n: "TV4 HD", c: "🎬" },
      { n: "NRK 1 Norge", c: "🎬" },
      { n: "DR1 Danmark", c: "🎬" },
      { n: "Yle TV1 Suomi", c: "🎬" },
      { n: "C More Sport", c: "⚽" },
    ],
  },
  {
    slug: "indian",
    flag: "🇮🇳",
    name: "हिंदी",
    sub: "Star Plus, Zee TV, Sony",
    desc: "Indian channels — Star Plus, Zee TV, Sony, Colors and Bollywood.",
    wa: "Hi! I want Indian channels (Best IPTV VIP).",
    keywords: [
      ["indian IPTV", "3.2k/mo"],
      ["Star Plus live", "2.8k/mo"],
      ["hindi TV online", "2.1k/mo"],
    ],
    channels: [
      { n: "Star Plus HD", c: "🎬" },
      { n: "Zee TV HD", c: "🎬" },
      { n: "Sony Entertainment", c: "🎬" },
      { n: "Colors TV", c: "🎬" },
      { n: "Star Sports 1", c: "⚽" },
      { n: "Aaj Tak", c: "📰" },
      { n: "Zee Cinema", c: "🎬" },
      { n: "Star Gold", c: "🎬" },
    ],
  },
  {
    slug: "african",
    flag: "🌍",
    name: "Afrique",
    sub: "Canal+, RTS, TFM, AFROTV",
    desc: "African channels — Canal+, RTS Sénégal, TFM, Nollywood.",
    wa: "Hi! I want African channels (Best IPTV VIP).",
    keywords: [
      ["african IPTV", "2.6k/mo"],
      ["Canal+ Afrique", "1.9k/mo"],
      ["african channels live", "1.7k/mo"],
    ],
    channels: [
      { n: "Canal+ Afrique", c: "🎬" },
      { n: "RTS 1 Sénégal", c: "🎬" },
      { n: "TFM Sénégal", c: "🎬" },
      { n: "AFROTV", c: "🎬" },
      { n: "NTA Nigeria", c: "📰" },
      { n: "Africa 24", c: "📰" },
      { n: "Nollywood TV", c: "🎬" },
      { n: "SuperSport Africa", c: "⚽" },
    ],
  },
  {
    slug: "chinese",
    flag: "🇨🇳",
    name: "中文",
    sub: "CCTV, Phoenix, TVB",
    desc: "Chinese channels — CCTV, Phoenix, TVB, Mandarin.",
    wa: "Hi! I want Chinese channels (Best IPTV VIP).",
    keywords: [
      ["chinese IPTV", "2.4k/mo"],
      ["CCTV abroad", "1.9k/mo"],
      ["Phoenix TV live", "1.6k/mo"],
    ],
    channels: [
      { n: "CCTV 1", c: "🎬" },
      { n: "CCTV 4 Int", c: "🎬" },
      { n: "Phoenix InfoNews", c: "📰" },
      { n: "Phoenix Chinese", c: "🎬" },
      { n: "TVB Jade", c: "🎬" },
      { n: "CCTV Sport", c: "⚽" },
    ],
  },
  {
    slug: "spanish",
    flag: "🇪🇸",
    name: "Español",
    sub: "TVE, Antena 3, Univision",
    desc: "Spanish channels — TVE, Antena 3, Univision, LaLiga.",
    wa: "Hi! I want Spanish channels (Best IPTV VIP).",
    keywords: [
      ["spanish IPTV", "3.9k/mo"],
      ["TVE abroad", "2.6k/mo"],
      ["LaLiga stream", "5.3k/mo"],
    ],
    channels: [
      { n: "TVE 1", c: "🎬" },
      { n: "TVE 2", c: "🎬" },
      { n: "Antena 3", c: "🎬" },
      { n: "Telecinco", c: "🎬" },
      { n: "Univision", c: "🌎" },
      { n: "Canal+ LaLiga", c: "⚽" },
      { n: "ESPN Latin", c: "⚽" },
    ],
  },
  {
    slug: "greek",
    flag: "🇬🇷",
    name: "Ελληνικά",
    sub: "ERT, MEGA, ANT1",
    desc: "Greek channels — ERT, MEGA, ANT1, Nova Sports.",
    wa: "Hi! I want Greek channels (Best IPTV VIP).",
    keywords: [
      ["greek IPTV", "1.8k/mo"],
      ["ERT abroad", "1.5k/mo"],
      ["MEGA TV live", "1.2k/mo"],
    ],
    channels: [
      { n: "ERT 1", c: "🎬" },
      { n: "MEGA Channel", c: "🎬" },
      { n: "ANT1", c: "🎬" },
      { n: "SKAI TV", c: "📰" },
      { n: "Nova Sports GR", c: "⚽" },
    ],
  },
  {
    slug: "portuguese",
    flag: "🇵🇹",
    name: "Português",
    sub: "RTP, SIC, TVI, Globo",
    desc: "Portuguese & Brazilian channels — RTP, SIC, Globo Brasil.",
    wa: "Hi! I want Portuguese channels (Best IPTV VIP).",
    keywords: [
      ["portuguese IPTV", "2.6k/mo"],
      ["RTP abroad", "1.9k/mo"],
      ["brasil TV online", "3.1k/mo"],
    ],
    channels: [
      { n: "RTP 1", c: "🎬" },
      { n: "RTP Internacional", c: "🎬" },
      { n: "SIC Portugal", c: "🎬" },
      { n: "TVI Portugal", c: "🎬" },
      { n: "Globo Brasil", c: "🎬" },
      { n: "SporTV", c: "⚽" },
    ],
  },
];

const dict: Record<Locale, Copy> = {
  en: {
    brand: SITE.brand,
    top: {
      status: "System: Online • Instant WhatsApp support",
      urgency: "🎁 Launch price guaranteed — Free 24h trial available",
    },
    nav: { offers: "Plans", channels: "Channels", faq: "FAQ", setup: "Setup", whatsapp: "WhatsApp", install: "Install App", cities: "Worldwide", devices: "Devices" },
    hero: {
      pill: "WhatsApp support • 4K/UHD • 20,000+ channels • EPG included",
      titleA: "World's #1 Premium IPTV",
      titleB: "Fast. Stable. Simple.",
      lead: "Stop overpaying for cable. Get 20,000+ live channels, premium sports, movies & 100,000+ series — from just $14/month worldwide.",
      ctaPrices: "See Pricing",
      ctaAdvisor: "Chat with Maya",
      trust: "⭐⭐⭐⭐⭐ 4.9/5 from 12,000+ customers worldwide • Satisfaction guarantee • Free 24h trial",
    },
    trial: { badge: "Free trial", title: "Try free for 24 hours", sub: "No credit card required. Contact us on WhatsApp and test the service on your device — Firestick, Smart TV, Android or iPhone.", cta: "Request free trial now", note: "No contract. No automatic charge." },
    offers: { title: "Choose your plan", sub: "All plans include 20,000+ channels, VOD, EPG and WhatsApp support. Order directly via WhatsApp.", order: "Order via WhatsApp", billedOnce: "Billed", perMonth: "/mo", save: "SAVE", bestSeller: "BEST SELLER", totalLabel: "one-time payment" },
    planNames: { p1: "1 Month", p3: "3 Months", p6: "6 Months", p12: "12 Months" },
    planPerks: {
      p1: ["20,000+ live channels", "4K/UHD quality", "EPG guide included", "WhatsApp support", "No contract"],
      p3: ["Most popular choice", "20,000+ live channels", "100,000+ movies & series", "Priority support", "Guided setup"],
      p6: ["Best value", "20,000+ live channels", "Multi-device support", "EPG + Catch-up TV", "All channels included"],
      p12: ["Ultimate value", "Premium VIP access", "20,000+ channels", "VIP 24/7 support", "Free upgrades"],
    },
    channels: { title: "Explore channels worldwide", sub: "Pick a region to preview what's included", more: "…and 20,000+ more" },
    devices: { title: "Works on all your devices", sub: "Install on up to 3 devices. We guide you on WhatsApp — any device, any country.", list: DEVICE_LIST },
    vod: {
      title: "100,000+ movies & series on demand",
      sub: "New content added every week. Watch anytime, anywhere, on any device.",
      stats: [
        { value: "100,000+", label: "Movies & series" },
        { value: "20,000+", label: "Live channels" },
        { value: "4K/UHD", label: "Max quality" },
        { value: "< 10 min", label: "Activation time" },
      ],
    },
    compare: {
      title: "Why choose Best IPTV VIP?",
      sub: "Comparison with traditional streaming services",
      headers: ["Service", "Price/mo", "Live channels", "VOD", "4K", "Support"],
      rows: [
        { service: "Netflix Premium", price: "$22.99", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Disney+ Premium", price: "$15.99", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "HBO Max", price: "$15.99", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Best IPTV VIP", price: "from $8.25", live: "20,000+", vod: true, hd4k: true, support: "WhatsApp direct", highlight: true },
      ],
    },
    reviews: {
      title: "What our customers say",
      sub: "Reviews from VIP customers worldwide",
      items: [
        { name: "John M.", city: "New York", stars: 5, plan: "3 months", text: "Setup took 10 minutes with WhatsApp support. ESPN, NFL Sunday Ticket and HBO all working in 4K. Saving $80/month vs cable." },
        { name: "Fatima A.", city: "Dubai", stars: 5, plan: "6 months", text: "All Arabic channels included, plus international content for the family. MBC, beIN and Netflix-style movies — excellent quality." },
        { name: "Mohammed K.", city: "London", stars: 5, plan: "12 months", text: "TiviMate worked instantly. 4K on Firestick with zero buffering. Best IPTV I've tried in 3 years." },
        { name: "Anna B.", city: "Paris", stars: 4, plan: "3 months", text: "A bit hesitant at first but the support team walked me through every step. Canal+, beIN and Netflix-style VOD — very happy." },
        { name: "Lars P.", city: "Stockholm", stars: 5, plan: "12 months", text: "Tested free for 24h then bought the annual plan. Premier League, NHL and SVT — all in one place." },
        { name: "Sofia N.", city: "Madrid", stars: 5, plan: "6 months", text: "Works perfectly on my Samsung Smart TV and iPhone. LaLiga, kids channels and movies — great for the family." },
      ],
    },
    trust: {
      title: "Safe & simple worldwide service",
      items: [
        { icon: "🧪", title: "Free 24h trial", desc: "Test without a credit card. Zero risk." },
        { icon: "⚡", title: "Activated in < 10 min", desc: "We activate instantly via WhatsApp." },
        { icon: "💬", title: "WhatsApp support", desc: "Fast response, every day." },
        { icon: "🛡️", title: "Satisfaction guarantee", desc: "Not happy? Contact us within 24h." },
        { icon: "📺", title: "4K on all plans", desc: "No surcharge for quality." },
        { icon: "🌐", title: "Works worldwide", desc: "Compatible with all major ISPs." },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Which channels are included?", a: "All major worldwide channels: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF, RAI, TVE, SVT — plus 20,000+ more in HD/4K." },
        { q: "Compatible with TiviMate and IPTV Smarters?", a: "Yes. We support TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV and all standard M3U apps. We send the M3U link via WhatsApp." },
        { q: "Which devices are supported?", a: "Firestick, Smart TV (Samsung/LG/Sony/Hisense/TCL), Android, iPhone, iPad, Android TV Box, MAG Box and PC/Mac. We guide you for your specific device." },
        { q: "How quickly is the service activated?", a: "Usually within 5–10 minutes after ordering via WhatsApp, even on weekends." },
        { q: "Is EPG (channel guide) included?", a: "Yes. A full Electronic Programme Guide (EPG) is included with all plans." },
        { q: "Can I watch on multiple screens at once?", a: "Standard plan = one connection. Contact us on WhatsApp for multi-screen / household solutions." },
        { q: "Do I need a VPN?", a: "Not required, but we recommend a VPN for extra privacy. We can advise on the best option for your country." },
        { q: "Does it work in my country?", a: "Yes — Best IPTV VIP works worldwide. USA, UK, Canada, Europe, MENA, Asia, LATAM, Africa, Oceania." },
        { q: "How do I pay?", a: "Payment is processed via WhatsApp. We accept PayPal, credit card, crypto, bank transfer and local methods." },
        { q: "What if the service stops working?", a: "Contact us directly on WhatsApp. We resolve technical issues usually within 1–2 hours." },
        { q: "Are sports channels included?", a: "Yes! Premier League, La Liga, Champions League, NBA, NFL, MLB, UFC, F1, tennis, boxing — all included." },
        { q: "Can I cancel my subscription?", a: "There's no contract. You pay once and the service expires automatically after the chosen period." },
      ],
    },
    cities: {
      title: "Premium IPTV worldwide",
      sub: "Optimized servers on 4 continents — for households everywhere.",
      button: "Contact us",
      items: [
        { name: "USA", text: "Perfect for US households replacing cable. ESPN, NFL Sunday Ticket, HBO and 4K movies in one VIP package." },
        { name: "UK", text: "Sky Sports, BT Sport 4K, BBC, ITV and Premier League — all on Firestick, Smart TV and mobile." },
        { name: "Canada", text: "TSN, Sportsnet, CBC and bilingual French/English channels with Canadian-optimized servers." },
        { name: "France", text: "Canal+, beIN Sports, TF1, M6 and international channels — pour toute la famille." },
        { name: "Germany", text: "Sky Bundesliga, ZDF, RTL, Pro7 — plus DAZN and international content." },
        { name: "UAE & MENA", text: "MBC, beIN Arabic 4K, OSN, Rotana plus international channels — Arabic-first VIP service." },
        { name: "Australia", text: "Foxtel-style sports, BBC, Sky and 4K movies on Firestick, Smart TV and Android." },
        { name: "Worldwide", text: "Wherever you are — stable IPTV with WhatsApp support in your timezone." },
      ],
    },
    setup: {
      title: "Quick setup — 10 minutes",
      sub: "Works on Firestick, Smart TV, iPhone, Android and more. We guide you every step.",
      button: "Get setup help now",
      steps: [
        { step: "1", text: "Contact us on WhatsApp — tell us which device you have." },
        { step: "2", text: "Choose your plan and complete payment securely." },
        { step: "3", text: "Receive your M3U link and setup guide — start watching within 10 minutes." },
      ],
    },
    countriesSection: {
      title: "TV in your language, anywhere in the world",
      sub: "Click your country — see all channels and order via WhatsApp",
      hint: "👆 Tap a country to see channels",
      notFoundCta: "💬 Don't see your language? Ask us",
      modalChannelsTitle: "📺 Channels included",
      modalKeywordsTitle: "🔍 What people search on Google",
      modalKeywordsNote: "Volume = monthly worldwide searches",
      priceLine: "Price: from $8.25/mo",
      priceSub: "All channels included • Free 24h trial • No contract",
      moreChannels: "+ 100s more",
      orderCta: (name) => `💬 Order ${name} — WhatsApp`,
      trialCta: "🧪 Try 24h free",
    },
    footer: { rights: "All rights reserved.", note: "Optimized for fast and stable streaming worldwide.", legal: "Legal", privacy: "Privacy Policy", terms: "Terms of Use", refund: "Satisfaction Policy" },
    whatsapp: {
      generic: "Hi Best IPTV VIP! I need help.",
      trial: "Hi Best IPTV VIP, I want a 24H free trial",
      orderMessage: (p, pr, c) => `Hi Best IPTV VIP! I want to order ${p} (${pr} ${c}). Please help me get started.`,
    },
    bot: {
      greeting1: "Hi! 👋 I'm Maya.",
      greeting2: "I can help with plans, free trial or setup. What would you like to know?",
      price1: "Plans from $8.25/mo — 1, 3, 6 or 12 months. All include 20,000+ channels and EPG.",
      price2: "Want me to walk you through the right plan, or try free for 24h first?",
      install1: "Firestick and Smart TV are our most popular devices — setup takes 10 minutes.",
      install2: "I'll send step-by-step setup directly on WhatsApp!",
      trial1: "Absolutely! 24-hour free trial, no credit card needed.",
      trial2: "Click below — I'll send the trial link on WhatsApp.",
      default1: "I can help with plans, free trial, setup and compatibility.",
      default2: "Fastest help is on WhatsApp — click below!",
      quick: ["See prices 💰", "Free 24h trial 🧪", "Firestick help 🔥", "Which channels? 📺"],
      typing: "Maya is typing...",
      online: "Replies fast",
      placeholder: "Type here...",
    },
    pwa: {
      install: "Install as app",
      installSub: "Faster access, offline support",
      accept: "Install",
      iosTitle: "Add to Home Screen",
      iosBefore: "Tap",
      iosAfter: 'then "Add to Home Screen"',
    },
    intro: {
      tagline: "The future of premium TV worldwide",
      sub: "20,000+ channels • 4K/UHD • EPG • WhatsApp support",
      skip: "Skip ›",
    },
    liveWidget: {
      nowLabel: "Live 🌍",
      visitors: "Visitors right now",
      support: "Support",
      online: "Online",
      cta: "Start WhatsApp",
      toastTitle: "Right now 🔥",
      toastSub: (n) => `${n} visitors viewing the offers.`,
      toastBtn: "View",
      updated: (label) => `Updated ${label}`,
      ago: (n) => n === 1 ? "1 min ago" : `${n} min ago`,
      justNow: "just now",
    },
  },
  fr: {
    brand: SITE.brand,
    top: {
      status: "Serveurs : Opérationnels • Support WhatsApp instantané",
      urgency: "🎁 Prix de lancement garanti — Essai gratuit 24h disponible",
    },
    nav: { offers: "Offres", channels: "Chaînes", faq: "FAQ", setup: "Installation", whatsapp: "WhatsApp", install: "Installer l'App", cities: "Mondial", devices: "Appareils" },
    hero: {
      pill: "Support WhatsApp • 4K/UHD • 20 000+ chaînes • EPG inclus",
      titleA: "L'IPTV Premium #1 au monde",
      titleB: "Rapide. Stable. Simple.",
      lead: "Arrêtez de surpayer le câble. Accédez à 20 000+ chaînes, sport premium, films et 100 000+ séries — à partir de 14 $/mois dans le monde entier.",
      ctaPrices: "Voir les offres",
      ctaAdvisor: "Parler à Maya",
      trust: "⭐⭐⭐⭐⭐ 4,9/5 par 12 000+ clients dans le monde • Garantie satisfaction • Essai gratuit 24h",
    },
    trial: { badge: "Essai gratuit", title: "Essayez gratuitement pendant 24h", sub: "Aucune carte requise. Contactez-nous sur WhatsApp et testez sur Firestick, Smart TV, Android ou iPhone.", cta: "Demander l'essai gratuit", note: "Sans engagement. Sans achat automatique." },
    offers: { title: "Choisissez votre offre", sub: "Toutes les offres incluent 20 000+ chaînes, VOD, EPG et support WhatsApp.", order: "Commander via WhatsApp", billedOnce: "Facturé", perMonth: "/mois", save: "ÉCO", bestSeller: "POPULAIRE", totalLabel: "paiement unique" },
    planNames: { p1: "1 mois", p3: "3 mois", p6: "6 mois", p12: "12 mois" },
    planPerks: {
      p1: ["20 000+ chaînes live", "Qualité 4K/UHD", "Guide EPG inclus", "Support WhatsApp", "Sans engagement"],
      p3: ["Choix le plus populaire", "20 000+ chaînes live", "100 000+ films & séries", "Support prioritaire", "Installation guidée"],
      p6: ["Meilleur rapport qualité/prix", "20 000+ chaînes live", "Multi-appareils", "EPG + Catch-up TV", "Toutes chaînes incluses"],
      p12: ["Valeur ultime", "Accès VIP premium", "20 000+ chaînes", "Support VIP 24/7", "Mises à jour gratuites"],
    },
    channels: { title: "Aperçu des chaînes mondiales", sub: "Choisissez une région", more: "…et 20 000+ autres" },
    devices: { title: "Compatible avec tous vos appareils", sub: "Installez sur jusqu'à 3 appareils. Nous vous guidons via WhatsApp.", list: DEVICE_LIST },
    vod: {
      title: "100 000+ films & séries à la demande",
      sub: "Nouveau contenu chaque semaine. Regardez quand vous voulez, où vous voulez.",
      stats: [
        { value: "100 000+", label: "Films & séries" },
        { value: "20 000+", label: "Chaînes live" },
        { value: "4K/UHD", label: "Qualité maximale" },
        { value: "< 10 min", label: "Activation" },
      ],
    },
    compare: {
      title: "Pourquoi choisir Best IPTV VIP ?",
      sub: "Comparaison avec les services traditionnels",
      headers: ["Service", "Prix/mois", "Chaînes live", "VOD", "4K", "Support"],
      rows: [
        { service: "Netflix Premium", price: "21,99 €", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Disney+ Premium", price: "13,99 €", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Canal+ Total", price: "39,99 €", live: "~80", vod: true, hd4k: true, support: "Chat" },
        { service: "Best IPTV VIP", price: "dès 8,25 $", live: "20 000+", vod: true, hd4k: true, support: "WhatsApp direct", highlight: true },
      ],
    },
    reviews: {
      title: "Ce que disent nos clients",
      sub: "Avis de clients VIP dans le monde entier",
      items: [
        { name: "John M.", city: "New York", stars: 5, plan: "3 mois", text: "Installation en 10 minutes avec WhatsApp. ESPN, NFL et HBO tous en 4K. J'économise 80 $/mois vs câble." },
        { name: "Fatima A.", city: "Dubaï", stars: 5, plan: "6 mois", text: "Toutes les chaînes arabes plus du contenu international pour la famille. Excellente qualité." },
        { name: "Mohammed K.", city: "Londres", stars: 5, plan: "12 mois", text: "TiviMate a fonctionné immédiatement. 4K sur Firestick sans buffering. Meilleur IPTV testé en 3 ans." },
        { name: "Anna B.", city: "Paris", stars: 4, plan: "3 mois", text: "Hésitante au début mais l'équipe support m'a guidée pas à pas. Canal+, beIN et VOD — très satisfaite." },
        { name: "Lars P.", city: "Stockholm", stars: 5, plan: "12 mois", text: "Testé 24h gratuit puis pris l'annuel. Premier League, NHL et SVT au même endroit." },
        { name: "Sofia N.", city: "Madrid", stars: 5, plan: "6 mois", text: "Fonctionne parfaitement sur Samsung Smart TV et iPhone. LaLiga, chaînes enfants — top pour la famille." },
      ],
    },
    trust: {
      title: "Service mondial sûr et simple",
      items: [
        { icon: "🧪", title: "Essai gratuit 24h", desc: "Testez sans carte bancaire. Zéro risque." },
        { icon: "⚡", title: "Activation < 10 min", desc: "Activation immédiate via WhatsApp." },
        { icon: "💬", title: "Support WhatsApp", desc: "Réponse rapide, tous les jours." },
        { icon: "🛡️", title: "Garantie satisfaction", desc: "Pas satisfait ? Contactez-nous sous 24h." },
        { icon: "📺", title: "4K sur toutes les offres", desc: "Sans supplément pour la qualité." },
        { icon: "🌐", title: "Fonctionne mondialement", desc: "Compatible avec tous les FAI." },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Quelles chaînes sont incluses ?", a: "Toutes les grandes chaînes mondiales : ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF, RAI, TVE, SVT — plus 20 000+ en HD/4K." },
        { q: "Compatible avec TiviMate et IPTV Smarters ?", a: "Oui. Nous supportons TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV et toutes les apps M3U." },
        { q: "Quels appareils sont supportés ?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box et PC/Mac." },
        { q: "Combien de temps prend l'activation ?", a: "Généralement 5 à 10 minutes après la commande via WhatsApp." },
        { q: "Le guide EPG est-il inclus ?", a: "Oui. Un guide EPG complet est inclus dans toutes les offres." },
        { q: "Puis-je regarder sur plusieurs écrans ?", a: "L'offre standard inclut une connexion. Contactez-nous pour des solutions multi-écrans." },
        { q: "Ai-je besoin d'un VPN ?", a: "Pas obligatoire, mais recommandé pour plus de confidentialité." },
        { q: "Ça fonctionne dans mon pays ?", a: "Oui — Best IPTV VIP fonctionne mondialement. USA, UK, Canada, Europe, MENA, Asie, LATAM, Afrique, Océanie." },
        { q: "Comment puis-je payer ?", a: "Paiement via WhatsApp. Nous acceptons PayPal, carte, crypto, virement et méthodes locales." },
        { q: "Que se passe-t-il en cas de problème ?", a: "Contactez-nous sur WhatsApp. Problèmes résolus en 1 à 2 heures." },
        { q: "Les chaînes sport sont-elles incluses ?", a: "Oui ! Premier League, La Liga, Champions League, NBA, NFL, UFC, F1 — tout est inclus." },
        { q: "Puis-je annuler ?", a: "Aucun engagement. Vous payez une fois et le service expire automatiquement." },
      ],
    },
    cities: {
      title: "IPTV Premium dans le monde entier",
      sub: "Serveurs optimisés sur 4 continents — pour les foyers du monde entier.",
      button: "Nous contacter",
      items: [
        { name: "USA", text: "Parfait pour remplacer le câble. ESPN, NFL, HBO et films 4K dans un seul abonnement VIP." },
        { name: "UK", text: "Sky Sports, BT Sport 4K, BBC, ITV et Premier League — sur Firestick, Smart TV et mobile." },
        { name: "Canada", text: "TSN, Sportsnet, CBC et chaînes bilingues avec serveurs optimisés Canada." },
        { name: "France", text: "Canal+, beIN Sports, TF1, M6 et chaînes internationales — pour toute la famille." },
        { name: "Allemagne", text: "Sky Bundesliga, ZDF, RTL, Pro7 — plus DAZN et contenu international." },
        { name: "EAU & MENA", text: "MBC, beIN Arabic 4K, OSN, Rotana plus chaînes internationales — service VIP arabe." },
        { name: "Australie", text: "Sport style Foxtel, BBC, Sky et films 4K sur Firestick, Smart TV et Android." },
        { name: "Mondial", text: "Où que vous soyez — IPTV stable avec support WhatsApp dans votre fuseau horaire." },
      ],
    },
    setup: {
      title: "Installation rapide — 10 minutes",
      sub: "Fonctionne sur Firestick, Smart TV, iPhone, Android et plus. Nous vous guidons.",
      button: "Obtenir de l'aide maintenant",
      steps: [
        { step: "1", text: "Contactez-nous sur WhatsApp — indiquez votre appareil." },
        { step: "2", text: "Choisissez votre offre et payez en sécurité." },
        { step: "3", text: "Recevez votre lien M3U et guide — commencez en 10 minutes." },
      ],
    },
    countriesSection: {
      title: "TV dans votre langue, partout dans le monde",
      sub: "Cliquez sur votre pays — voyez les chaînes et commandez via WhatsApp",
      hint: "👆 Cliquez sur un pays pour voir les chaînes",
      notFoundCta: "💬 Votre langue n'apparaît pas — demandez-nous",
      modalChannelsTitle: "📺 Chaînes incluses",
      modalKeywordsTitle: "🔍 Recherches Google populaires",
      modalKeywordsNote: "Volume = recherches mensuelles mondiales",
      priceLine: "Prix : dès 8,25 $/mois",
      priceSub: "Toutes les chaînes incluses • Essai gratuit 24h • Sans engagement",
      moreChannels: "+ 100aines en plus",
      orderCta: (name) => `💬 Commander ${name} — WhatsApp`,
      trialCta: "🧪 Tester 24h gratuit",
    },
    footer: { rights: "Tous droits réservés.", note: "Optimisé pour un streaming rapide et stable dans le monde entier.", legal: "Mentions légales", privacy: "Politique de confidentialité", terms: "Conditions d'utilisation", refund: "Politique satisfaction" },
    whatsapp: {
      generic: "Bonjour Best IPTV VIP ! J'ai besoin d'aide.",
      trial: "Bonjour Best IPTV VIP, je veux un essai gratuit 24h",
      orderMessage: (p, pr, c) => `Bonjour Best IPTV VIP ! Je veux commander ${p} (${pr} ${c}).`,
    },
    bot: {
      greeting1: "Bonjour ! 👋 Je suis Maya.",
      greeting2: "Je peux vous aider avec les offres, l'essai gratuit ou l'installation.",
      price1: "Offres dès 8,25 $/mois — 1, 3, 6 ou 12 mois. Toutes incluent 20 000+ chaînes et EPG.",
      price2: "Voulez-vous voir les offres, ou essayer gratuitement 24h d'abord ?",
      install1: "Firestick et Smart TV sont nos appareils les plus populaires — installation en 10 minutes.",
      install2: "Je vous envoie le guide d'installation directement sur WhatsApp !",
      trial1: "Absolument ! Essai gratuit 24h — sans carte bancaire.",
      trial2: "Cliquez ci-dessous, je vous envoie le lien d'essai sur WhatsApp.",
      default1: "Je peux aider avec les offres, l'essai gratuit, l'installation et la compatibilité.",
      default2: "Pour une aide rapide — contactez-moi sur WhatsApp !",
      quick: ["Voir les prix 💰", "Essai gratuit 24h 🧪", "Aide Firestick 🔥", "Quelles chaînes ? 📺"],
      typing: "Maya écrit...",
      online: "Réponse rapide",
      placeholder: "Tapez ici...",
    },
    pwa: {
      install: "Installer comme app",
      installSub: "Accès rapide, hors-ligne",
      accept: "Installer",
      iosTitle: "Ajouter à l'écran d'accueil",
      iosBefore: "Appuyez sur",
      iosAfter: "puis « Sur l'écran d'accueil »",
    },
    intro: {
      tagline: "Le futur de la télévision premium dans le monde",
      sub: "20 000+ chaînes • 4K/UHD • EPG • Support WhatsApp",
      skip: "Passer ›",
    },
    liveWidget: {
      nowLabel: "Live 🌍",
      visitors: "Visiteurs en ce moment",
      support: "Support",
      online: "En ligne",
      cta: "Démarrer WhatsApp",
      toastTitle: "En ce moment 🔥",
      toastSub: (n) => `${n} visiteurs consultent les offres.`,
      toastBtn: "Voir",
      updated: (label) => `Mis à jour ${label}`,
      ago: (n) => n === 1 ? "il y a 1 min" : `il y a ${n} min`,
      justNow: "à l'instant",
    },
  },
  es: {
    brand: SITE.brand,
    top: { status: "Sistema: En línea • Soporte WhatsApp instantáneo", urgency: "🎁 Precio de lanzamiento garantizado — Prueba gratis 24h disponible" },
    nav: { offers: "Planes", channels: "Canales", faq: "FAQ", setup: "Instalación", whatsapp: "WhatsApp", install: "Instalar App", cities: "Mundial", devices: "Dispositivos" },
    hero: {
      pill: "Soporte WhatsApp • 4K/UHD • 20 000+ canales • EPG incluido",
      titleA: "IPTV Premium #1 del mundo",
      titleB: "Rápido. Estable. Simple.",
      lead: "Deja de pagar de más por el cable. Accede a 20 000+ canales en vivo, deportes premium, películas y 100 000+ series — desde solo 14 $/mes en todo el mundo.",
      ctaPrices: "Ver Precios",
      ctaAdvisor: "Hablar con Maya",
      trust: "⭐⭐⭐⭐⭐ 4.9/5 de 12 000+ clientes mundiales • Garantía de satisfacción • Prueba gratis 24h",
    },
    trial: { badge: "Prueba gratis", title: "Prueba gratis durante 24 horas", sub: "Sin tarjeta de crédito. Contáctanos en WhatsApp y prueba en Firestick, Smart TV, Android o iPhone.", cta: "Solicitar prueba gratis", note: "Sin contrato. Sin cargos automáticos." },
    offers: { title: "Elige tu plan", sub: "Todos los planes incluyen 20 000+ canales, VOD, EPG y soporte WhatsApp.", order: "Pedir por WhatsApp", billedOnce: "Facturado", perMonth: "/mes", save: "AHORRO", bestSeller: "MÁS VENDIDO", totalLabel: "pago único" },
    planNames: { p1: "1 Mes", p3: "3 Meses", p6: "6 Meses", p12: "12 Meses" },
    planPerks: {
      p1: ["20 000+ canales en vivo", "Calidad 4K/UHD", "Guía EPG incluida", "Soporte WhatsApp", "Sin contrato"],
      p3: ["La opción más popular", "20 000+ canales en vivo", "100 000+ películas y series", "Soporte prioritario", "Instalación guiada"],
      p6: ["Mejor relación calidad/precio", "20 000+ canales en vivo", "Multi-dispositivo", "EPG + Catch-up TV", "Todos los canales incluidos"],
      p12: ["Valor definitivo", "Acceso VIP premium", "20 000+ canales", "Soporte VIP 24/7", "Actualizaciones gratis"],
    },
    channels: { title: "Explora canales mundiales", sub: "Elige una región", more: "…y 20 000+ más" },
    devices: { title: "Funciona en todos tus dispositivos", sub: "Instala hasta en 3 dispositivos. Te guiamos por WhatsApp.", list: DEVICE_LIST },
    vod: {
      title: "100 000+ películas y series bajo demanda",
      sub: "Contenido nuevo cada semana. Mira cuando quieras, donde quieras.",
      stats: [
        { value: "100 000+", label: "Películas y series" },
        { value: "20 000+", label: "Canales en vivo" },
        { value: "4K/UHD", label: "Calidad máxima" },
        { value: "< 10 min", label: "Activación" },
      ],
    },
    compare: {
      title: "¿Por qué elegir Best IPTV VIP?",
      sub: "Comparación con servicios tradicionales",
      headers: ["Servicio", "Precio/mes", "Canales en vivo", "VOD", "4K", "Soporte"],
      rows: [
        { service: "Netflix Premium", price: "17,99 €", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Disney+ Premium", price: "13,99 €", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Movistar Plus+", price: "39,90 €", live: "~80", vod: true, hd4k: true, support: "Chat" },
        { service: "Best IPTV VIP", price: "desde 8,25 $", live: "20 000+", vod: true, hd4k: true, support: "WhatsApp directo", highlight: true },
      ],
    },
    reviews: {
      title: "Lo que dicen nuestros clientes",
      sub: "Reseñas de clientes VIP en todo el mundo",
      items: [
        { name: "John M.", city: "Nueva York", stars: 5, plan: "3 meses", text: "Instalación en 10 minutos con WhatsApp. ESPN, NFL y HBO en 4K. Ahorro 80 $/mes vs cable." },
        { name: "Fátima A.", city: "Dubái", stars: 5, plan: "6 meses", text: "Todos los canales árabes más contenido internacional. Excelente calidad." },
        { name: "Mohammed K.", city: "Londres", stars: 5, plan: "12 meses", text: "TiviMate funcionó al instante. 4K en Firestick sin buffering. El mejor IPTV en 3 años." },
        { name: "Anna B.", city: "París", stars: 4, plan: "3 meses", text: "Insegura al principio, pero el equipo me guió paso a paso. Muy satisfecha." },
        { name: "Lars P.", city: "Estocolmo", stars: 5, plan: "12 meses", text: "Probé 24h gratis y compré el anual. Premier League, NHL y SVT en un solo lugar." },
        { name: "Sofia N.", city: "Madrid", stars: 5, plan: "6 meses", text: "Funciona perfectamente en Samsung Smart TV e iPhone. LaLiga y canales infantiles — genial para la familia." },
      ],
    },
    trust: {
      title: "Servicio mundial seguro y simple",
      items: [
        { icon: "🧪", title: "Prueba gratis 24h", desc: "Prueba sin tarjeta. Cero riesgo." },
        { icon: "⚡", title: "Activación < 10 min", desc: "Activamos al instante por WhatsApp." },
        { icon: "💬", title: "Soporte WhatsApp", desc: "Respuesta rápida, todos los días." },
        { icon: "🛡️", title: "Garantía satisfacción", desc: "¿No estás contento? Contáctanos en 24h." },
        { icon: "📺", title: "4K en todos los planes", desc: "Sin recargo por calidad." },
        { icon: "🌐", title: "Funciona mundialmente", desc: "Compatible con todos los ISPs." },
      ],
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        { q: "¿Qué canales están incluidos?", a: "Todos los grandes canales mundiales: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF, RAI, TVE — más 20 000+ en HD/4K." },
        { q: "¿Compatible con TiviMate y IPTV Smarters?", a: "Sí. Soportamos TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV y todas las apps M3U." },
        { q: "¿Qué dispositivos son compatibles?", a: "Firestick, Smart TV, Android, iPhone, iPad, Android TV Box, MAG Box y PC/Mac." },
        { q: "¿Cuánto tarda la activación?", a: "Generalmente entre 5 y 10 minutos después del pedido por WhatsApp." },
        { q: "¿Está incluida la guía EPG?", a: "Sí. Una guía EPG completa está incluida en todos los planes." },
        { q: "¿Puedo ver en varias pantallas?", a: "El plan estándar incluye una conexión. Contáctanos para soluciones multi-pantalla." },
        { q: "¿Necesito una VPN?", a: "No es obligatorio, pero recomendado para mayor privacidad." },
        { q: "¿Funciona en mi país?", a: "Sí — Best IPTV VIP funciona en todo el mundo." },
        { q: "¿Cómo pago?", a: "El pago se realiza por WhatsApp. Aceptamos PayPal, tarjeta, crypto, transferencia y métodos locales." },
        { q: "¿Qué pasa si hay un problema?", a: "Contáctanos por WhatsApp. Resolvemos problemas en 1 a 2 horas." },
        { q: "¿Están incluidos los canales deportivos?", a: "¡Sí! Premier League, La Liga, Champions, NBA, NFL, UFC, F1 — todo incluido." },
        { q: "¿Puedo cancelar?", a: "Sin contrato. Pagas una vez y el servicio expira automáticamente." },
      ],
    },
    cities: {
      title: "IPTV Premium en todo el mundo",
      sub: "Servidores optimizados en 4 continentes — para hogares de todo el mundo.",
      button: "Contáctanos",
      items: [
        { name: "USA", text: "Perfecto para reemplazar el cable. ESPN, NFL, HBO y películas 4K." },
        { name: "UK", text: "Sky Sports, BT Sport 4K, BBC, ITV y Premier League en todos los dispositivos." },
        { name: "Canadá", text: "TSN, Sportsnet, CBC y canales bilingües con servidores optimizados." },
        { name: "España", text: "LaLiga, Movistar+, RTVE, Antena 3 — para toda la familia." },
        { name: "México", text: "Liga MX, Telemundo, Univision, ESPN Latin — VIP para hispanohablantes." },
        { name: "EAU & MENA", text: "MBC, beIN Arabic 4K, OSN, Rotana — servicio VIP árabe." },
        { name: "Australia", text: "Foxtel, BBC, Sky y películas 4K en Firestick y Smart TV." },
        { name: "Mundial", text: "Donde sea que estés — IPTV estable con soporte WhatsApp en tu zona horaria." },
      ],
    },
    setup: {
      title: "Instalación rápida — 10 minutos",
      sub: "Funciona en Firestick, Smart TV, iPhone, Android y más. Te guiamos.",
      button: "Obtener ayuda ahora",
      steps: [
        { step: "1", text: "Contáctanos por WhatsApp — dinos qué dispositivo tienes." },
        { step: "2", text: "Elige tu plan y completa el pago de forma segura." },
        { step: "3", text: "Recibe tu enlace M3U y guía — empieza en 10 minutos." },
      ],
    },
    countriesSection: {
      title: "TV en tu idioma, en cualquier parte del mundo",
      sub: "Haz clic en tu país — ve los canales y pide por WhatsApp",
      hint: "👆 Toca un país para ver los canales",
      notFoundCta: "💬 ¿Tu idioma no está? Pregúntanos",
      modalChannelsTitle: "📺 Canales incluidos",
      modalKeywordsTitle: "🔍 Lo que la gente busca en Google",
      modalKeywordsNote: "Volumen = búsquedas mensuales mundiales",
      priceLine: "Precio: desde 8,25 $/mes",
      priceSub: "Todos los canales incluidos • Prueba gratis 24h • Sin contrato",
      moreChannels: "+ 100s más",
      orderCta: (name) => `💬 Pedir ${name} — WhatsApp`,
      trialCta: "🧪 Probar 24h gratis",
    },
    footer: { rights: "Todos los derechos reservados.", note: "Optimizado para streaming rápido y estable en todo el mundo.", legal: "Legal", privacy: "Política de privacidad", terms: "Términos de uso", refund: "Política de satisfacción" },
    whatsapp: {
      generic: "¡Hola Best IPTV VIP! Necesito ayuda.",
      trial: "¡Hola Best IPTV VIP, quiero una prueba gratis 24h!",
      orderMessage: (p, pr, c) => `¡Hola Best IPTV VIP! Quiero pedir ${p} (${pr} ${c}).`,
    },
    bot: {
      greeting1: "¡Hola! 👋 Soy Maya.",
      greeting2: "Puedo ayudarte con planes, prueba gratis o instalación.",
      price1: "Planes desde 8,25 $/mes — 1, 3, 6 o 12 meses. Todos con 20 000+ canales y EPG.",
      price2: "¿Quieres ver los planes, o probar 24h gratis primero?",
      install1: "Firestick y Smart TV son los más populares — instalación en 10 minutos.",
      install2: "¡Te envío la guía paso a paso por WhatsApp!",
      trial1: "¡Por supuesto! Prueba 24h gratis — sin tarjeta.",
      trial2: "Haz clic abajo y te envío el enlace por WhatsApp.",
      default1: "Puedo ayudarte con planes, prueba gratis, instalación y compatibilidad.",
      default2: "Para ayuda rápida — ¡contáctame por WhatsApp!",
      quick: ["Ver precios 💰", "Prueba gratis 24h 🧪", "Ayuda Firestick 🔥", "¿Qué canales? 📺"],
      typing: "Maya está escribiendo...",
      online: "Responde rápido",
      placeholder: "Escribe aquí...",
    },
    pwa: { install: "Instalar como app", installSub: "Acceso rápido, sin conexión", accept: "Instalar", iosTitle: "Añadir a pantalla", iosBefore: "Toca", iosAfter: 'luego "Añadir a pantalla de inicio"' },
    intro: { tagline: "El futuro de la televisión premium en el mundo", sub: "20 000+ canales • 4K/UHD • EPG • Soporte WhatsApp", skip: "Omitir ›" },
    liveWidget: {
      nowLabel: "Live 🌍", visitors: "Visitantes ahora", support: "Soporte", online: "En línea", cta: "Iniciar WhatsApp",
      toastTitle: "Ahora mismo 🔥", toastSub: (n) => `${n} visitantes viendo las ofertas.`, toastBtn: "Ver",
      updated: (label) => `Actualizado ${label}`, ago: (n) => n === 1 ? "hace 1 min" : `hace ${n} min`, justNow: "ahora mismo",
    },
  },
  de: {
    brand: SITE.brand,
    top: { status: "System: Online • Sofortiger WhatsApp-Support", urgency: "🎁 Einführungspreis garantiert — 24h Gratis-Test verfügbar" },
    nav: { offers: "Pakete", channels: "Sender", faq: "FAQ", setup: "Installation", whatsapp: "WhatsApp", install: "App installieren", cities: "Weltweit", devices: "Geräte" },
    hero: {
      pill: "WhatsApp-Support • 4K/UHD • 20.000+ Sender • EPG inklusive",
      titleA: "Weltweit #1 Premium-IPTV",
      titleB: "Schnell. Stabil. Einfach.",
      lead: "Hör auf, zu viel für Kabel zu zahlen. 20.000+ Live-Sender, Premium-Sport, Filme und 100.000+ Serien — schon ab 14 $/Monat weltweit.",
      ctaPrices: "Preise ansehen",
      ctaAdvisor: "Mit Maya chatten",
      trust: "⭐⭐⭐⭐⭐ 4,9/5 von 12.000+ Kunden weltweit • Zufriedenheitsgarantie • 24h Gratis-Test",
    },
    trial: { badge: "Gratis-Test", title: "24 Stunden gratis testen", sub: "Keine Kreditkarte nötig. Kontaktiere uns auf WhatsApp und teste auf Firestick, Smart TV, Android oder iPhone.", cta: "Gratis-Test anfordern", note: "Keine Vertragsbindung. Keine automatische Abbuchung." },
    offers: { title: "Wähle dein Paket", sub: "Alle Pakete mit 20.000+ Sendern, VOD, EPG und WhatsApp-Support.", order: "Über WhatsApp bestellen", billedOnce: "Berechnet", perMonth: "/Mon", save: "SPAREN", bestSeller: "BESTSELLER", totalLabel: "Einmalzahlung" },
    planNames: { p1: "1 Monat", p3: "3 Monate", p6: "6 Monate", p12: "12 Monate" },
    planPerks: {
      p1: ["20.000+ Live-Sender", "4K/UHD-Qualität", "EPG inklusive", "WhatsApp-Support", "Keine Vertragsbindung"],
      p3: ["Beliebteste Wahl", "20.000+ Live-Sender", "100.000+ Filme & Serien", "Priority-Support", "Geführte Installation"],
      p6: ["Bester Wert", "20.000+ Live-Sender", "Multi-Geräte", "EPG + Catch-up TV", "Alle Sender inklusive"],
      p12: ["Ultimativer Wert", "Premium-VIP-Zugang", "20.000+ Sender", "VIP-Support 24/7", "Kostenlose Updates"],
    },
    channels: { title: "Sender weltweit entdecken", sub: "Wähle eine Region", more: "…und 20.000+ weitere" },
    devices: { title: "Funktioniert auf allen Geräten", sub: "Bis zu 3 Geräte. Wir helfen über WhatsApp.", list: DEVICE_LIST },
    vod: {
      title: "100.000+ Filme & Serien on Demand",
      sub: "Wöchentlich neue Inhalte. Schau wann und wo du willst.",
      stats: [
        { value: "100.000+", label: "Filme & Serien" },
        { value: "20.000+", label: "Live-Sender" },
        { value: "4K/UHD", label: "Maximale Qualität" },
        { value: "< 10 Min", label: "Aktivierung" },
      ],
    },
    compare: {
      title: "Warum Best IPTV VIP wählen?",
      sub: "Vergleich mit traditionellen Streaming-Diensten",
      headers: ["Dienst", "Preis/Mon", "Live-Sender", "VOD", "4K", "Support"],
      rows: [
        { service: "Netflix Premium", price: "19,99 €", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Disney+ Premium", price: "13,99 €", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Sky Q Komplett", price: "44,99 €", live: "~100", vod: true, hd4k: true, support: "Chat" },
        { service: "Best IPTV VIP", price: "ab 8,25 $", live: "20.000+", vod: true, hd4k: true, support: "WhatsApp direkt", highlight: true },
      ],
    },
    reviews: {
      title: "Was unsere Kunden sagen",
      sub: "Bewertungen von VIP-Kunden weltweit",
      items: [
        { name: "John M.", city: "New York", stars: 5, plan: "3 Monate", text: "Installation in 10 Minuten mit WhatsApp. ESPN, NFL und HBO in 4K. Spare 80 $/Monat vs Kabel." },
        { name: "Fatima A.", city: "Dubai", stars: 5, plan: "6 Monate", text: "Alle arabischen Sender plus internationale Inhalte. Hervorragende Qualität." },
        { name: "Mohammed K.", city: "London", stars: 5, plan: "12 Monate", text: "TiviMate funktionierte sofort. 4K auf Firestick ohne Buffering. Bestes IPTV in 3 Jahren." },
        { name: "Anna B.", city: "Paris", stars: 4, plan: "3 Monate", text: "Anfangs unsicher, aber das Team hat mich Schritt für Schritt geführt. Sehr zufrieden." },
        { name: "Lars P.", city: "Stockholm", stars: 5, plan: "12 Monate", text: "24h gratis getestet, dann Jahresabo gekauft. Premier League, NHL und SVT — alles an einem Ort." },
        { name: "Sofia N.", city: "Madrid", stars: 5, plan: "6 Monate", text: "Funktioniert perfekt auf Samsung Smart TV und iPhone. LaLiga und Kindersender — top für die Familie." },
      ],
    },
    trust: {
      title: "Sicherer & einfacher weltweiter Service",
      items: [
        { icon: "🧪", title: "24h Gratis-Test", desc: "Test ohne Kreditkarte. Null Risiko." },
        { icon: "⚡", title: "Aktivierung < 10 Min", desc: "Sofort über WhatsApp." },
        { icon: "💬", title: "WhatsApp-Support", desc: "Schnelle Antwort, jeden Tag." },
        { icon: "🛡️", title: "Zufriedenheitsgarantie", desc: "Nicht zufrieden? Kontaktiere uns innerhalb 24h." },
        { icon: "📺", title: "4K in allen Paketen", desc: "Kein Aufpreis für Qualität." },
        { icon: "🌐", title: "Funktioniert weltweit", desc: "Kompatibel mit allen großen ISPs." },
      ],
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        { q: "Welche Sender sind enthalten?", a: "Alle wichtigen weltweiten Sender: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, ZDF, RAI, TVE — plus 20.000+ in HD/4K." },
        { q: "Kompatibel mit TiviMate und IPTV Smarters?", a: "Ja. Wir unterstützen TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV und alle M3U-Apps." },
        { q: "Welche Geräte werden unterstützt?", a: "Firestick, Smart TV, Android, iPhone, iPad, Android TV Box, MAG Box und PC/Mac." },
        { q: "Wie schnell wird aktiviert?", a: "Normalerweise innerhalb 5–10 Minuten nach Bestellung über WhatsApp." },
        { q: "Ist der EPG enthalten?", a: "Ja. Ein vollständiger EPG ist in allen Paketen enthalten." },
        { q: "Mehrere Bildschirme gleichzeitig?", a: "Standard-Paket = eine Verbindung. Kontaktiere uns für Multi-Screen-Lösungen." },
        { q: "Brauche ich ein VPN?", a: "Nicht erforderlich, aber für mehr Privatsphäre empfohlen." },
        { q: "Funktioniert es in meinem Land?", a: "Ja — Best IPTV VIP funktioniert weltweit." },
        { q: "Wie bezahle ich?", a: "Zahlung über WhatsApp. PayPal, Karte, Crypto, Überweisung." },
        { q: "Was, wenn es nicht funktioniert?", a: "Kontaktiere uns direkt auf WhatsApp. Probleme normalerweise in 1–2 Stunden gelöst." },
        { q: "Sind Sportsender enthalten?", a: "Ja! Bundesliga, Premier League, Champions League, NBA, NFL, UFC, F1 — alles dabei." },
        { q: "Kann ich kündigen?", a: "Keine Vertragsbindung. Du zahlst einmal und der Service läuft automatisch ab." },
      ],
    },
    cities: {
      title: "Premium-IPTV weltweit",
      sub: "Optimierte Server auf 4 Kontinenten — für Haushalte überall.",
      button: "Kontaktiere uns",
      items: [
        { name: "USA", text: "Perfekt für US-Haushalte, die Kabel ersetzen wollen. ESPN, NFL, HBO und 4K-Filme." },
        { name: "UK", text: "Sky Sports, BT Sport 4K, BBC, ITV und Premier League auf allen Geräten." },
        { name: "Kanada", text: "TSN, Sportsnet, CBC und zweisprachige Sender." },
        { name: "Frankreich", text: "Canal+, beIN Sports, TF1, M6 und internationale Sender." },
        { name: "Deutschland", text: "Sky Bundesliga, ZDF, RTL, Pro7 — plus DAZN und internationale Inhalte." },
        { name: "VAE & MENA", text: "MBC, beIN Arabic 4K, OSN, Rotana — VIP-Service für die arabische Welt." },
        { name: "Australien", text: "Foxtel-Stil-Sport, BBC, Sky und 4K-Filme auf Firestick und Smart TV." },
        { name: "Weltweit", text: "Wo immer du bist — stabiles IPTV mit WhatsApp-Support in deiner Zeitzone." },
      ],
    },
    setup: {
      title: "Schnelle Installation — 10 Minuten",
      sub: "Funktioniert auf Firestick, Smart TV, iPhone, Android und mehr.",
      button: "Jetzt Installations-Hilfe",
      steps: [
        { step: "1", text: "Kontaktiere uns auf WhatsApp — sage uns dein Gerät." },
        { step: "2", text: "Wähle dein Paket und zahle sicher." },
        { step: "3", text: "Erhalte deinen M3U-Link und Anleitung — starte in 10 Minuten." },
      ],
    },
    countriesSection: {
      title: "TV in deiner Sprache, überall auf der Welt",
      sub: "Klicke auf dein Land — sieh alle Sender und bestelle per WhatsApp",
      hint: "👆 Tippe ein Land an, um die Sender zu sehen",
      notFoundCta: "💬 Deine Sprache nicht dabei? Frag uns",
      modalChannelsTitle: "📺 Enthaltene Sender",
      modalKeywordsTitle: "🔍 Was Leute auf Google suchen",
      modalKeywordsNote: "Volumen = monatliche weltweite Suchen",
      priceLine: "Preis: ab 8,25 $/Mon",
      priceSub: "Alle Sender enthalten • 24h Gratis-Test • Keine Vertragsbindung",
      moreChannels: "+ 100e weitere",
      orderCta: (name) => `💬 ${name} bestellen — WhatsApp`,
      trialCta: "🧪 24h gratis testen",
    },
    footer: { rights: "Alle Rechte vorbehalten.", note: "Optimiert für schnelles und stabiles Streaming weltweit.", legal: "Rechtliches", privacy: "Datenschutz", terms: "Nutzungsbedingungen", refund: "Zufriedenheitspolitik" },
    whatsapp: {
      generic: "Hi Best IPTV VIP! Ich brauche Hilfe.",
      trial: "Hi Best IPTV VIP, ich möchte einen 24h Gratis-Test",
      orderMessage: (p, pr, c) => `Hi Best IPTV VIP! Ich möchte ${p} (${pr} ${c}) bestellen.`,
    },
    bot: {
      greeting1: "Hi! 👋 Ich bin Maya.",
      greeting2: "Ich helfe bei Paketen, Gratis-Test oder Installation.",
      price1: "Pakete ab 8,25 $/Mon — 1, 3, 6 oder 12 Monate. Alle mit 20.000+ Sendern und EPG.",
      price2: "Möchtest du die Pakete sehen oder zuerst 24h gratis testen?",
      install1: "Firestick und Smart TV sind unsere beliebtesten Geräte — Installation in 10 Minuten.",
      install2: "Ich schicke dir die Schritt-für-Schritt-Anleitung direkt auf WhatsApp!",
      trial1: "Auf jeden Fall! 24h Gratis-Test — keine Kreditkarte nötig.",
      trial2: "Klick unten — ich schicke den Test-Link auf WhatsApp.",
      default1: "Ich helfe bei Paketen, Gratis-Test, Installation und Kompatibilität.",
      default2: "Schnellste Hilfe — kontaktiere mich auf WhatsApp!",
      quick: ["Preise sehen 💰", "24h Gratis-Test 🧪", "Firestick-Hilfe 🔥", "Welche Sender? 📺"],
      typing: "Maya schreibt...",
      online: "Antwortet schnell",
      placeholder: "Hier tippen...",
    },
    pwa: { install: "Als App installieren", installSub: "Schneller Zugriff, offline", accept: "Installieren", iosTitle: "Zum Home-Bildschirm", iosBefore: "Tippe auf", iosAfter: 'dann „Zum Home-Bildschirm"' },
    intro: { tagline: "Die Zukunft des Premium-Fernsehens weltweit", sub: "20.000+ Sender • 4K/UHD • EPG • WhatsApp-Support", skip: "Überspringen ›" },
    liveWidget: {
      nowLabel: "Live 🌍", visitors: "Besucher gerade", support: "Support", online: "Online", cta: "WhatsApp starten",
      toastTitle: "Gerade jetzt 🔥", toastSub: (n) => `${n} Besucher schauen sich die Angebote an.`, toastBtn: "Sehen",
      updated: (label) => `Aktualisiert ${label}`, ago: (n) => n === 1 ? "vor 1 Min" : `vor ${n} Min`, justNow: "gerade jetzt",
    },
  },
  ar: {
    brand: SITE.brand,
    top: { status: "النظام: متصل • دعم WhatsApp فوري", urgency: "🎁 سعر الإطلاق مضمون — تجربة مجانية 24 ساعة متاحة" },
    nav: { offers: "الباقات", channels: "القنوات", faq: "الأسئلة", setup: "التثبيت", whatsapp: "واتساب", install: "تثبيت التطبيق", cities: "حول العالم", devices: "الأجهزة" },
    hero: {
      pill: "دعم واتساب • 4K/UHD • +20,000 قناة • دليل EPG مدرج",
      titleA: "IPTV الأول عالمياً",
      titleB: "سريع. مستقر. بسيط.",
      lead: "توقف عن دفع المزيد للكابل. احصل على +20,000 قناة مباشرة، رياضة بريميوم، أفلام و+100,000 مسلسل — من 14 دولار شهرياً فقط.",
      ctaPrices: "شاهد الأسعار",
      ctaAdvisor: "تحدث مع مايا",
      trust: "⭐⭐⭐⭐⭐ 4.9/5 من +12,000 عميل حول العالم • ضمان الرضا • تجربة مجانية 24 ساعة",
    },
    trial: { badge: "تجربة مجانية", title: "جرب مجاناً لمدة 24 ساعة", sub: "بدون بطاقة ائتمان. تواصل معنا على واتساب وجرب على Firestick أو Smart TV أو Android أو iPhone.", cta: "اطلب التجربة المجانية", note: "بدون عقد. بدون رسوم تلقائية." },
    offers: { title: "اختر باقتك", sub: "كل الباقات تشمل +20,000 قناة، VOD، EPG ودعم واتساب.", order: "اطلب عبر واتساب", billedOnce: "مفوتر", perMonth: "/شهر", save: "وفر", bestSeller: "الأكثر مبيعاً", totalLabel: "دفعة واحدة" },
    planNames: { p1: "شهر واحد", p3: "3 أشهر", p6: "6 أشهر", p12: "12 شهر" },
    planPerks: {
      p1: ["+20,000 قناة مباشرة", "جودة 4K/UHD", "دليل EPG مدرج", "دعم واتساب", "بدون عقد"],
      p3: ["الخيار الأكثر شعبية", "+20,000 قناة مباشرة", "+100,000 فيلم ومسلسل", "دعم بأولوية", "تثبيت موجه"],
      p6: ["أفضل قيمة", "+20,000 قناة مباشرة", "أجهزة متعددة", "EPG + Catch-up", "كل القنوات مدرجة"],
      p12: ["القيمة القصوى", "وصول VIP بريميوم", "+20,000 قناة", "دعم VIP 24/7", "تحديثات مجانية"],
    },
    channels: { title: "استكشف القنوات حول العالم", sub: "اختر منطقة", more: "…و+20,000 قناة أخرى" },
    devices: { title: "يعمل على كل أجهزتك", sub: "ثبت على ما يصل إلى 3 أجهزة. نوجهك على واتساب.", list: DEVICE_LIST },
    vod: {
      title: "+100,000 فيلم ومسلسل عند الطلب",
      sub: "محتوى جديد كل أسبوع. شاهد متى وأين تشاء.",
      stats: [
        { value: "+100,000", label: "أفلام ومسلسلات" },
        { value: "+20,000", label: "قنوات مباشرة" },
        { value: "4K/UHD", label: "أعلى جودة" },
        { value: "< 10 دقائق", label: "وقت التفعيل" },
      ],
    },
    compare: {
      title: "لماذا تختار Best IPTV VIP؟",
      sub: "مقارنة مع خدمات البث التقليدية",
      headers: ["الخدمة", "السعر/شهر", "قنوات مباشرة", "VOD", "4K", "الدعم"],
      rows: [
        { service: "Netflix Premium", price: "$22.99", live: "0", vod: true, hd4k: true, support: "دردشة" },
        { service: "Disney+ Premium", price: "$15.99", live: "0", vod: true, hd4k: true, support: "دردشة" },
        { service: "OSN+", price: "$15.99", live: "~80", vod: true, hd4k: true, support: "دردشة" },
        { service: "Best IPTV VIP", price: "من $8.25", live: "+20,000", vod: true, hd4k: true, support: "واتساب مباشر", highlight: true },
      ],
    },
    reviews: {
      title: "ماذا يقول عملاؤنا",
      sub: "آراء عملاء VIP حول العالم",
      items: [
        { name: "جون م.", city: "نيويورك", stars: 5, plan: "3 أشهر", text: "التثبيت استغرق 10 دقائق مع دعم واتساب. ESPN و NFL و HBO تعمل بـ 4K. أوفر 80 دولار شهرياً مقابل الكابل." },
        { name: "فاطمة أ.", city: "دبي", stars: 5, plan: "6 أشهر", text: "كل القنوات العربية ومحتوى دولي للعائلة. MBC و beIN — جودة ممتازة." },
        { name: "محمد ك.", city: "لندن", stars: 5, plan: "12 شهر", text: "TiviMate يعمل فوراً. 4K على Firestick بدون تقطيع. أفضل IPTV جربته في 3 سنوات." },
        { name: "آنا ب.", city: "باريس", stars: 4, plan: "3 أشهر", text: "كنت مترددة في البداية لكن فريق الدعم وجهني خطوة بخطوة. سعيدة جداً." },
        { name: "لارس ب.", city: "ستوكهولم", stars: 5, plan: "12 شهر", text: "جربت 24 ساعة مجاناً ثم اشتريت الباقة السنوية. Premier League و NHL في مكان واحد." },
        { name: "صوفيا ن.", city: "مدريد", stars: 5, plan: "6 أشهر", text: "يعمل بشكل ممتاز على Samsung Smart TV و iPhone. LaLiga وقنوات الأطفال — رائع للعائلة." },
      ],
    },
    trust: {
      title: "خدمة عالمية آمنة وبسيطة",
      items: [
        { icon: "🧪", title: "تجربة مجانية 24 ساعة", desc: "اختبر بدون بطاقة. صفر مخاطرة." },
        { icon: "⚡", title: "تفعيل في < 10 دقائق", desc: "نفعل فوراً عبر واتساب." },
        { icon: "💬", title: "دعم واتساب", desc: "رد سريع، كل يوم." },
        { icon: "🛡️", title: "ضمان الرضا", desc: "غير راضٍ؟ تواصل معنا خلال 24 ساعة." },
        { icon: "📺", title: "4K في كل الباقات", desc: "بدون رسوم إضافية للجودة." },
        { icon: "🌐", title: "يعمل عالمياً", desc: "متوافق مع كل مزودي الإنترنت." },
      ],
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        { q: "ما هي القنوات المدرجة؟", a: "كل القنوات العالمية الكبرى: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus — بالإضافة إلى +20,000 قناة في HD/4K." },
        { q: "متوافق مع TiviMate و IPTV Smarters؟", a: "نعم. ندعم TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV وكل تطبيقات M3U." },
        { q: "ما الأجهزة المدعومة؟", a: "Firestick, Smart TV, Android, iPhone, iPad, Android TV Box, MAG Box و PC/Mac." },
        { q: "ما هي سرعة التفعيل؟", a: "عادة خلال 5-10 دقائق بعد الطلب عبر واتساب." },
        { q: "هل دليل EPG مدرج؟", a: "نعم. دليل EPG كامل مدرج في كل الباقات." },
        { q: "هل يمكنني المشاهدة على شاشات متعددة؟", a: "الباقة القياسية تشمل اتصال واحد. تواصل معنا لحلول متعددة الشاشات." },
        { q: "هل أحتاج VPN؟", a: "غير مطلوب، لكن نوصي بـ VPN لخصوصية إضافية." },
        { q: "هل يعمل في بلدي؟", a: "نعم — Best IPTV VIP يعمل عالمياً." },
        { q: "كيف أدفع؟", a: "الدفع عبر واتساب. نقبل PayPal، بطاقة، عملات رقمية، تحويل بنكي." },
        { q: "ماذا لو توقفت الخدمة؟", a: "تواصل معنا مباشرة على واتساب. نحل المشاكل التقنية عادة في 1-2 ساعة." },
        { q: "هل القنوات الرياضية مدرجة؟", a: "نعم! Premier League, La Liga, Champions, NBA, NFL, UFC, F1 — كلها مدرجة." },
        { q: "هل يمكنني الإلغاء؟", a: "بدون عقد. تدفع مرة واحدة وتنتهي الخدمة تلقائياً." },
      ],
    },
    cities: {
      title: "IPTV بريميوم حول العالم",
      sub: "خوادم محسنة على 4 قارات — للعائلات في كل مكان.",
      button: "تواصل معنا",
      items: [
        { name: "الولايات المتحدة", text: "مثالي لاستبدال الكابل. ESPN, NFL, HBO وأفلام 4K في باقة VIP واحدة." },
        { name: "المملكة المتحدة", text: "Sky Sports, BT Sport 4K, BBC, ITV و Premier League على كل الأجهزة." },
        { name: "كندا", text: "TSN, Sportsnet, CBC وقنوات ثنائية اللغة بخوادم محسنة لكندا." },
        { name: "فرنسا", text: "Canal+, beIN Sports, TF1, M6 وقنوات دولية للعائلة." },
        { name: "ألمانيا", text: "Sky Bundesliga, ZDF, RTL, Pro7 — بالإضافة إلى DAZN ومحتوى دولي." },
        { name: "الإمارات و MENA", text: "MBC, beIN Arabic 4K, OSN, Rotana بالإضافة إلى قنوات دولية — خدمة VIP عربية أولاً." },
        { name: "أستراليا", text: "رياضة بأسلوب Foxtel، BBC، Sky وأفلام 4K على Firestick و Smart TV." },
        { name: "حول العالم", text: "أينما كنت — IPTV مستقر مع دعم واتساب في منطقتك الزمنية." },
      ],
    },
    setup: {
      title: "تثبيت سريع — 10 دقائق",
      sub: "يعمل على Firestick, Smart TV, iPhone, Android والمزيد.",
      button: "احصل على المساعدة الآن",
      steps: [
        { step: "1", text: "تواصل معنا على واتساب — أخبرنا بجهازك." },
        { step: "2", text: "اختر باقتك وأكمل الدفع بأمان." },
        { step: "3", text: "استلم رابط M3U ودليل التثبيت — ابدأ المشاهدة في 10 دقائق." },
      ],
    },
    countriesSection: {
      title: "تلفاز بلغتك في أي مكان في العالم",
      sub: "اضغط على بلدك — شاهد كل القنوات واطلب عبر واتساب",
      hint: "👆 اضغط على بلد لمشاهدة القنوات",
      notFoundCta: "💬 لغتك غير موجودة؟ اسألنا",
      modalChannelsTitle: "📺 القنوات المدرجة",
      modalKeywordsTitle: "🔍 ما يبحث عنه الناس على Google",
      modalKeywordsNote: "الحجم = عمليات بحث شهرية حول العالم",
      priceLine: "السعر: من $8.25/شهر",
      priceSub: "كل القنوات مدرجة • تجربة مجانية 24 ساعة • بدون عقد",
      moreChannels: "+ مئات أخرى",
      orderCta: (name) => `💬 اطلب ${name} — واتساب`,
      trialCta: "🧪 جرب 24 ساعة مجاناً",
    },
    footer: { rights: "كل الحقوق محفوظة.", note: "محسن للبث السريع والمستقر حول العالم.", legal: "قانوني", privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", refund: "سياسة الرضا" },
    whatsapp: {
      generic: "مرحباً Best IPTV VIP! أحتاج مساعدة.",
      trial: "مرحباً Best IPTV VIP، أريد تجربة مجانية 24 ساعة",
      orderMessage: (p, pr, c) => `مرحباً Best IPTV VIP! أريد طلب ${p} (${pr} ${c}).`,
    },
    bot: {
      greeting1: "مرحباً! 👋 أنا مايا.",
      greeting2: "يمكنني المساعدة بالباقات، التجربة المجانية أو التثبيت.",
      price1: "الباقات من $8.25/شهر — 1, 3, 6 أو 12 شهر. كلها تشمل +20,000 قناة و EPG.",
      price2: "تريد رؤية الباقات، أم تجربة 24 ساعة مجاناً أولاً؟",
      install1: "Firestick و Smart TV هما الأكثر شعبية — التثبيت يستغرق 10 دقائق.",
      install2: "سأرسل لك التثبيت خطوة بخطوة على واتساب!",
      trial1: "بالطبع! تجربة 24 ساعة مجانية — بدون بطاقة ائتمان.",
      trial2: "اضغط أدناه — سأرسل رابط التجربة على واتساب.",
      default1: "يمكنني المساعدة بالباقات، التجربة المجانية، التثبيت والتوافق.",
      default2: "أسرع مساعدة على واتساب — اضغط أدناه!",
      quick: ["شاهد الأسعار 💰", "تجربة مجانية 24 ساعة 🧪", "مساعدة Firestick 🔥", "أي قنوات؟ 📺"],
      typing: "مايا تكتب...",
      online: "ترد بسرعة",
      placeholder: "اكتب هنا...",
    },
    pwa: { install: "تثبيت كتطبيق", installSub: "وصول أسرع، يعمل بدون اتصال", accept: "تثبيت", iosTitle: "أضف إلى الشاشة الرئيسية", iosBefore: "اضغط", iosAfter: 'ثم "أضف إلى الشاشة الرئيسية"' },
    intro: { tagline: "مستقبل التلفاز البريميوم حول العالم", sub: "+20,000 قناة • 4K/UHD • EPG • دعم واتساب", skip: "تخطي ›" },
    liveWidget: {
      nowLabel: "مباشر 🌍", visitors: "زوار الآن", support: "الدعم", online: "متصل", cta: "ابدأ واتساب",
      toastTitle: "الآن 🔥", toastSub: (n) => `${n} زائر يشاهد العروض.`, toastBtn: "شاهد",
      updated: (label) => `محدث ${label}`, ago: (n) => n === 1 ? "منذ دقيقة" : `منذ ${n} دقيقة`, justNow: "الآن",
    },
  },
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
type LangCtx = { lang: Locale; setLang: (l: Locale) => void };
const LanguageContext = createContext<LangCtx | null>(null);
function useLanguage(): LangCtx {
  const v = useContext(LanguageContext);
  if (!v) throw new Error("useLanguage must be used inside provider");
  return v;
}

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function isMobileUA(ua: string): boolean {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function generateWhatsAppLink(message: string, ua: string, ref?: string): string {
  const suffix = ref ? ` | Ref: ${ref}` : "";
  const text = encodeURIComponent(message + suffix);
  return isMobileUA(ua)
    ? `https://wa.me/${SITE.whatsappPhone}?text=${text}`
    : `https://api.whatsapp.com/send?phone=${SITE.whatsappPhone}&text=${text}`;
}

function normalizeLocale(raw: string): Locale {
  const l = raw.toLowerCase().replace("_", "-").trim();
  const base = l.split("-")[0];
  if (base === "en" || base === "fr" || base === "es" || base === "de" || base === "ar") return base;
  return "en";
}

function detectLangClient(): Locale {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const qp = params.get("lang");
  if (qp) return normalizeLocale(qp);
  try { const s = window.localStorage.getItem("lang"); if (s) return normalizeLocale(s); } catch {}
  const navLangs = ((navigator.languages?.length ? navigator.languages : [navigator.language]) as string[]).filter(Boolean);
  for (const nl of navLangs) { const n = normalizeLocale(nl); if (dict[n]) return n; }
  return "en";
}

function getISOWeekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}

function makePRNG(seed: number) {
  let s = seed >>> 0;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s >>>= 0; s ^= s << 5; s >>>= 0; return (s >>> 0) / 4294967296; };
}

function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)); }

function timeAgoLabel(from: Date, now: Date, lang: Locale): string {
  const t = dict[lang].liveWidget;
  const sec = Math.max(1, Math.floor((now.getTime() - from.getTime()) / 1000));
  const min = Math.floor(sec / 60);
  if (min <= 0) return t.justNow;
  return t.ago(min);
}

// ─── BOT LOGIC ────────────────────────────────────────────────────────────────
function getBotReply(input: string, lang: Locale): string[] {
  const b = dict[lang].bot;
  const q = input.toLowerCase();
  if (q.includes("price") || q.includes("prix") || q.includes("precio") || q.includes("preis") || q.includes("سعر") || q.includes("plan") || q.includes("paket") || q.includes("باقة") || q.includes("💰")) {
    return [b.price1, b.price2];
  }
  if (q.includes("firestick") || q.includes("install") || q.includes("setup") || q.includes("device") || q.includes("appareil") || q.includes("dispositivo") || q.includes("gerät") || q.includes("جهاز") || q.includes("smart tv") || q.includes("🔥")) {
    return [b.install1, b.install2];
  }
  if (q.includes("trial") || q.includes("essai") || q.includes("prueba") || q.includes("test") || q.includes("تجربة") || q.includes("free") || q.includes("gratis") || q.includes("gratuit") || q.includes("kostenlos") || q.includes("مجان") || q.includes("🧪")) {
    return [b.trial1, b.trial2];
  }
  return [b.default1, b.default2];
}

// ─── LIVE ACTIVITY WIDGET ────────────────────────────────────────────────────
function LiveActivityWidget({ userAgent }: { userAgent: string }) {
  const { lang } = useLanguage();
  const t = dict[lang].liveWidget;
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState<{ viewing: number; updatedLabel: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const weekKey = getISOWeekKey(now);
    const weekSeed = hash32(`${SITE.domain}|${weekKey}`);
    const rndWeek = makePRNG(weekSeed);
    const viewingBase = 5 + Math.floor(rndWeek() * 12);
    let lastUpdate = new Date();
    const tick = () => {
      const tt = new Date();
      const minuteKey = `${weekKey}|${tt.getUTCHours()}:${tt.getUTCMinutes()}`;
      const rnd = makePRNG(hash32(`${SITE.domain}|${minuteKey}`));
      const jitter = () => (rnd() < 0.33 ? -1 : rnd() < 0.66 ? 0 : 1);
      const viewing = clamp(viewingBase + jitter(), 5, 28);
      if (rnd() < 0.25) lastUpdate = tt;
      setData({ viewing, updatedLabel: timeAgoLabel(lastUpdate, tt, lang) });
    };
    tick();
    const id = window.setInterval(tick, 12000);
    return () => window.clearInterval(id);
  }, [lang]);

  useEffect(() => {
    const k = "live_toast_v3";
    try { if (sessionStorage.getItem(k) === "1") return; } catch {}
    const onScroll = () => {
      const el = document.getElementById("offers");
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.7) {
        window.removeEventListener("scroll", onScroll);
        try { sessionStorage.setItem(k, "1"); } catch {}
        setToast(true);
        window.setTimeout(() => setToast(false), 5000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {toast && data && (
        <div className="liveToast" role="status" aria-live="polite">
          <span className="liveDot" />
          <div className="liveToastText">
            <div className="liveToastTitle">{t.toastTitle}</div>
            <div className="liveToastSub">{t.toastSub(data.viewing)}</div>
          </div>
          <button className="liveToastBtn" onClick={() => setOpen(true)}>{t.toastBtn}</button>
        </div>
      )}
      <button className="liveBadge" onClick={() => setOpen(v => !v)} aria-label="Live activity">
        <span className="liveDot" />
        <span className="liveBadgeText">{data ? `${data.viewing} live` : "Live"}</span>
      </button>
      {open && data && (
        <div className="livePanel">
          <div className="liveHead">
            <div style={{ fontWeight: 900 }}>{t.nowLabel}</div>
            <div className="liveSub">{t.updated(data.updatedLabel)}</div>
          </div>
          <div className="liveStats">
            <div className="liveRow"><span>{t.visitors}</span><b>{data.viewing}</b></div>
            <div className="liveRow"><span>{t.support}</span><b style={{ color: "#22c55e" }}>{t.online}</b></div>
          </div>
          <button className="liveCta" onClick={() => window.open(generateWhatsAppLink(dict[lang].whatsapp.generic, userAgent, "Live-Widget"), "_blank")}>
            {t.cta}
          </button>
        </div>
      )}
    </>
  );
}

// ─── MAYA CHAT ───────────────────────────────────────────────────────────────
function MayaChat({ userAgent }: { userAgent: string }) {
  const { lang } = useLanguage();
  const tBot = dict[lang].bot;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showQuick, setShowQuick] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement | null>(null);
  const avatarUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSI0MCIgeTI9IjQwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNGRkQ3MDAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEM0E5M0EiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjIwIiB5PSIyNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMwNTA1MDciPk08L3RleHQ+PC9zdmc+";

  const pushBot = async (text: string, delay = 900) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setMsgs(prev => [...prev, { from: "bot", text }]);
    setIsTyping(false);
  };

  useEffect(() => {
    try { if (localStorage.getItem("chatDismissed") === "true") setDismissed(true); } catch {}
  }, []);

  useEffect(() => {
    if (msgs.length > 0) msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (msgs.filter(m => m.from === "bot").length >= 2) setShowQuick(true);
  }, [msgs, isTyping]);

  useEffect(() => { if (open) setUnread(0); }, [open]);

  useEffect(() => {
    if (dismissed || msgs.length > 0) return;
    const tt = window.setTimeout(() => {
      pushBot(tBot.greeting1, 0).then(() => pushBot(tBot.greeting2, 1200));
      setUnread(2);
    }, 3500);
    return () => window.clearTimeout(tt);
  }, [dismissed, msgs.length, lang, tBot]);

  const handleOpen = () => { setOpen(true); setDismissed(false); try { localStorage.removeItem("chatDismissed"); } catch {} };
  const handleClose = () => { setOpen(false); setDismissed(true); try { localStorage.setItem("chatDismissed", "true"); } catch {} };
  const handleToggle = () => open ? handleClose() : handleOpen();

  const doSend = async (val: string) => {
    if (!val.trim() || isTyping) return;
    setMsgs(prev => [...prev, { from: "user", text: val }]);
    setInput("");
    setShowQuick(false);
    const replies = getBotReply(val, lang);
    for (const r of replies) await pushBot(r, 700);
    window.setTimeout(() => {
      window.open(generateWhatsAppLink(`Maya chat: ${val}`, userAgent, "Maya-Chat"), "_blank");
    }, 1200);
  };

  const teaserMsgs = useMemo(() => {
    const bots = msgs.filter(m => m.from === "bot");
    return bots.slice(Math.max(0, bots.length - 3));
  }, [msgs]);

  return (
    <>
      {!open && !dismissed && teaserMsgs.length > 0 && (
        <button className="miliTeaser" onClick={handleOpen} aria-label="Open chat">
          <div className="miliTeaserHead">
            <img src={avatarUrl} alt="Maya" className="miliTeaserAvatar" loading="lazy" width={22} height={22} />
            <span className="miliTeaserTitle">Maya • Support</span>
            {unread > 0 && <span className="miliBadge">{unread}</span>}
          </div>
          <div className="miliTeaserLines">
            {teaserMsgs.map((m, i) => <div key={i} className="miliTeaserLine">{m.text}</div>)}
          </div>
        </button>
      )}
      <button className="miliFab" onClick={handleToggle} aria-label="Chat with Maya">
        <div className="fabContent">
          <img src={avatarUrl} alt="Maya" className="fabAvatar" loading="lazy" width={35} height={35} />
          <span className="fabPulse" />
          <span className="fabText">Support</span>
          {unread > 0 && <span className="miliBadge miliBadgeFab">{unread}</span>}
        </div>
      </button>
      {open && (
        <div className="miliBox" role="dialog" aria-label="Chat with Maya">
          <div className="miliHeader">
            <div className="headerAvatarWrapper">
              <img src={avatarUrl} alt="Maya" className="headerAvatar" width={40} height={40} />
              <span className="onlineIndicator" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 14 }}>Maya • Support</div>
              <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>
                {isTyping ? tBot.typing : tBot.online}
              </div>
            </div>
            <button className="miliClose" onClick={handleClose} aria-label="Close chat">✕</button>
          </div>
          <div className="miliBody">
            <div className="miliMsgs">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === "bot" ? "miliMsgBot" : "miliMsgUser"}>{m.text}</div>
              ))}
              <div ref={msgsEndRef} />
            </div>
            {isTyping && (
              <div className="typingIndicator"><span>.</span><span>.</span><span>.</span></div>
            )}
            {showQuick && !isTyping && (
              <div className="quickReplies">
                {tBot.quick.map(q => (
                  <button key={q} className="quickReply" onClick={() => doSend(q)}>{q}</button>
                ))}
              </div>
            )}
            <div className="miliInputRow">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && doSend(input)}
                placeholder={tBot.placeholder}
              />
              <button onClick={() => doSend(input)}>→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── CHANNEL EXPLORER ────────────────────────────────────────────────────────
function ChannelExplorer() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section id="channels" className="section">
      <div className="sectionHead">
        <h2>{t.channels.title}</h2>
        <p>{t.channels.sub}</p>
      </div>
      <div className="explorerBox">
        <div className="tabs">
          {channelPreview.map((item, i) => (
            <button key={i} className={`tabBtn ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>
              {item.region}
            </button>
          ))}
        </div>
        <div className="channelList">
          {channelPreview[activeTab].channels.map(ch => (
            <div key={ch} className="channelItem">▶ {ch}</div>
          ))}
          <div className="channelItem more">{t.channels.more}</div>
        </div>
      </div>
    </section>
  );
}

// ─── COUNTRIES SECTION ───────────────────────────────────────────────────────
function CountriesSection({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang].countriesSection;
  const [selected, setSelected] = useState<Country | null>(null);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);
  const closeModal = () => setSelected(null);
  return (
    <>
      <section id="countries" className="section">
        <div className="sectionHead">
          <h2>{t.title}</h2>
          <p>{t.sub}</p>
          <p style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600, marginTop: 6 }}>{t.hint}</p>
        </div>
        <div className="countriesGrid">
          {COUNTRIES.map(c => (
            <button key={c.slug} className="countryCard" onClick={() => setSelected(c)}>
              <span className="ctryFlag">{c.flag}</span>
              <div className="ctryInfo">
                <div className="ctryName">{c.name}</div>
                <div className="ctrySub">{c.sub}</div>
              </div>
              <span className="ctryArrow">›</span>
            </button>
          ))}
        </div>
        <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
          <a className="btnSecondary" href={generateWhatsAppLink(dict[lang].whatsapp.generic, ua, "Countries-NotFound")} target="_blank" rel="noreferrer">
            {t.notFoundCta}
          </a>
        </div>
      </section>
      {selected && (
        <div className="countryModalOverlay" onClick={(e) => { if ((e.target as HTMLElement).classList.contains("countryModalOverlay")) closeModal(); }} role="dialog" aria-modal="true" aria-label={selected.name}>
          <div className="countryModalBox">
            <div className="countryModalHd">
              <span className="countryModalFlag">{selected.flag}</span>
              <div className="countryModalTb">
                <h2>{selected.name}</h2>
                <p>{selected.desc}</p>
              </div>
              <button className="countryModalClose" onClick={closeModal} aria-label="Close">✕</button>
            </div>
            <div className="countryModalBd">
              <div className="countryModalSec">
                <div className="countryModalSecTitle">{t.modalChannelsTitle} ({selected.channels.length}+)</div>
                <div className="countryChGrid">
                  {selected.channels.map(ch => (
                    <div key={ch.n} className="countryChChip">
                      <div className="countryChName">{ch.n}</div>
                      <div className="countryChIcon">{ch.c}</div>
                    </div>
                  ))}
                  <div className="countryChChip countryChChipGold">
                    <div className="countryChName" style={{ color: "#C9A84C" }}>{t.moreChannels}</div>
                    <div className="countryChIcon">💬</div>
                  </div>
                </div>
              </div>
              <div className="countryModalSec">
                <div className="countryModalSecTitle">{t.modalKeywordsTitle}</div>
                <div className="countryKwWrap">
                  {selected.keywords.map(([kw, vol]) => (
                    <div key={kw} className="countryKwPill">
                      <span className="countryKwText">{kw}</span>
                      <span className="countryKwVol">{vol}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>{t.modalKeywordsNote}</p>
              </div>
              <div className="countryPriceBox">
                <span style={{ fontSize: 26, flexShrink: 0 }}>💰</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>{t.priceLine}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.priceSub}</div>
                </div>
              </div>
            </div>
            <div className="countryModalFt">
              <a className="trialCta" style={{ flex: 1, minWidth: 140, textAlign: "center", fontSize: 14, padding: "13px 18px" }} href={generateWhatsAppLink(selected.wa, ua, `Country-${selected.slug}`)} target="_blank" rel="noreferrer">
                {t.orderCta(selected.name)}
              </a>
              <a className="btnSecondary" style={{ flex: 1, minWidth: 130, textAlign: "center", fontSize: 13, padding: "13px 14px" }} href={generateWhatsAppLink(`${dict[lang].whatsapp.trial} (${selected.name})`, ua, `Trial-${selected.slug}`)} target="_blank" rel="noreferrer">
                {t.trialCta}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── DEVICE / TRIAL / VOD / COMPARE / REVIEWS / TRUST / CITIES / SETUP ──────
function DeviceSection({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section id="devices" className="section">
      <div className="sectionHead"><h2>{t.devices.title}</h2><p>{t.devices.sub}</p></div>
      <div className="deviceGrid">
        {t.devices.list.map(d => (
          <div key={d.name} className="deviceCard">
            <span className="deviceIcon">{d.icon}</span>
            <span className="deviceName">{d.name}</span>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
        <a className="btnSecondary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Device-Section")} target="_blank" rel="noreferrer">
          {t.setup.button}
        </a>
      </div>
    </section>
  );
}

function TrialBanner({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <div className="trialBanner">
      <span className="trialBadge">{t.trial.badge}</span>
      <div className="trialContent">
        <h3>{t.trial.title}</h3>
        <p>{t.trial.sub}</p>
        <p className="trialNote">{t.trial.note}</p>
      </div>
      <a className="trialCta" href={generateWhatsAppLink(t.whatsapp.trial, ua, "Trial-Banner")} target="_blank" rel="noreferrer">
        {t.trial.cta}
      </a>
    </div>
  );
}

function VODSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section vodSection">
      <div className="sectionHead"><h2>{t.vod.title}</h2><p>{t.vod.sub}</p></div>
      <div className="statsGrid">
        {t.vod.stats.map(s => (
          <div key={s.label} className="statCard">
            <div className="statValue">{s.value}</div>
            <div className="statLabel">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CompareSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section">
      <div className="sectionHead"><h2>{t.compare.title}</h2><p>{t.compare.sub}</p></div>
      <div className="compareWrap">
        <table className="compareTable">
          <thead>
            <tr>{t.compare.headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {t.compare.rows.map(row => (
              <tr key={row.service} className={row.highlight ? "highlightRow" : ""}>
                <td className="serviceName">{row.highlight && <span className="bestTag">✓ </span>}{row.service}</td>
                <td className={row.highlight ? "accentPrice" : ""}>{row.price}</td>
                <td>{row.live}</td>
                <td style={{ color: row.vod ? "#22c55e" : "#ef4444" }}>{row.vod ? "✓" : "✗"}</td>
                <td style={{ color: row.hd4k ? "#22c55e" : "#ef4444" }}>{row.hd4k ? "✓" : "✗"}</td>
                <td>{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section">
      <div className="sectionHead"><h2>{t.reviews.title}</h2><p>{t.reviews.sub}</p></div>
      <div className="reviewsGrid">
        {t.reviews.items.map((r, i) => (
          <article key={i} className="reviewCard">
            <div className="reviewStars">{"⭐".repeat(r.stars)}</div>
            <p className="reviewText">&ldquo;{r.text}&rdquo;</p>
            <div className="reviewMeta">
              <span className="reviewName">{r.name}</span>
              <span className="reviewCity">— {r.city}</span>
              <span className="reviewPlan">{r.plan}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section trustSection">
      <div className="sectionHead"><h2>{t.trust.title}</h2></div>
      <div className="trustGrid">
        {t.trust.items.map(item => (
          <div key={item.title} className="trustCard">
            <span className="trustIcon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorldwideCities({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section id="cities" className="section">
      <div className="sectionHead"><h2>{t.cities.title}</h2><p>{t.cities.sub}</p></div>
      <div className="grid">
        {t.cities.items.map(city => (
          <article key={city.name} className="card">
            <div className="cardHeader"><h3>{city.name}</h3></div>
            <p className="cityText">{city.text}</p>
            <a className="btnPlan" href={generateWhatsAppLink(`${t.whatsapp.generic} (${city.name})`, ua, `${city.name}-Region`)} target="_blank" rel="noreferrer">
              {t.cities.button} — {city.name}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickSetup({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section id="setup" className="section">
      <div className="sectionHead"><h2>{t.setup.title}</h2><p>{t.setup.sub}</p></div>
      <div className="stepsGrid">
        {t.setup.steps.map(item => (
          <div key={item.step} className="stepCard">
            <div className="stepNumber">{item.step}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap">
        <a className="btnPrimary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Setup-CTA")} target="_blank" rel="noreferrer">
          {t.setup.button}
        </a>
      </div>
    </section>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function BrandLogo({ size = 36, showText = true }: { size?: number; showText?: boolean }) {
  const h = size;
  const w = showText ? size * 5.4 : size;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${showText ? 216 : 40} 40`} xmlns="http://www.w3.org/2000/svg" aria-label={SITE.brand}>
      <defs>
        <linearGradient id="lgGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE9A0"/>
          <stop offset="50%" stopColor="#D4AF37"/>
          <stop offset="100%" stopColor="#A8862A"/>
        </linearGradient>
        <linearGradient id="lgBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1820"/>
          <stop offset="100%" stopColor="#050507"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="9" fill="url(#lgBg)" stroke="url(#lgGold)" strokeWidth="1.2"/>
      <text x="20" y="28" fontFamily="-apple-system, sans-serif" fontWeight="900" fontSize="20" textAnchor="middle" fill="url(#lgGold)">B</text>
      {showText && (
        <>
          <text x="50" y="19" fontFamily="-apple-system, sans-serif" fontWeight="800" fontSize="13" letterSpacing="2" fill="#f5f0f5">BEST IPTV</text>
          <line x1="50" y1="23" x2="210" y2="23" stroke="url(#lgGold)" strokeWidth="0.7" opacity="0.6"/>
          <text x="50" y="35" fontFamily="-apple-system, sans-serif" fontWeight="900" fontSize="11" letterSpacing="6" fill="url(#lgGold)">VIP WORLDWIDE</text>
        </>
      )}
    </svg>
  );
}

// ─── CINEMATIC INTRO ─────────────────────────────────────────────────────────
function CinematicIntro({ onDone }: { onDone: () => void }) {
  const { lang } = useLanguage();
  const t = dict[lang].intro;
  const [exiting, setExiting] = useState(false);
  const skip = () => { setExiting(true); window.setTimeout(onDone, 420); };
  useEffect(() => {
    const tt = window.setTimeout(() => { setExiting(true); window.setTimeout(onDone, 420); }, 3000);
    return () => window.clearTimeout(tt);
  }, [onDone]);
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: (i * 97 + 13) % 100,
    size: 1 + (i * 31) % 3,
    delay: ((i * 137) % 400) / 100,
    dur: 4 + ((i * 73) % 300) / 100,
  }));
  return (
    <div className={`cinWrap${exiting ? " cinExit" : ""}`}>
      <div className="cinBg" />
      <div className="cinVignette" />
      <div className="cinParticles" aria-hidden="true">
        {particles.map(p => (
          <span key={p.id} className="cinParticle" style={{
            left: `${p.left}%`, bottom: "-4px",
            width: `${p.size}px`, height: `${p.size}px`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
            opacity: 0,
          }} />
        ))}
      </div>
      <div className="cinLensFlare" aria-hidden="true" />
      <div className="cinContent">
        <div className="cinEmblemWrap">
          <div className="cinEmblemGlow" />
          <BrandLogo size={120} showText={false} />
        </div>
        <div className="cinTitleWrap">
          <h1 className="cinTitle">BEST IPTV VIP</h1>
          <div className="cinTitleLine" />
        </div>
        <p className="cinTagline">{t.tagline}</p>
        <p className="cinSub">{t.sub}</p>
      </div>
      <button className="cinSkip" onClick={skip} type="button">{t.skip}</button>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}
type IOSNavigator = Navigator & { standalone?: boolean };

export default function Page() {
  const [lang, setLang] = useState<Locale>("en");
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPWABar, setShowPWABar] = useState(false);
  const [showIOSBar, setShowIOSBar] = useState(false);

  useEffect(() => {
    const detected = detectLangClient();
    setLang(detected);
    try { localStorage.setItem("lang", detected); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = detected;
      document.documentElement.dir = detected === "ar" ? "rtl" : "ltr";
    }
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    const handleInstall = (e: Event) => { e.preventDefault(); setInstallPrompt(e as BeforeInstallPromptEvent); };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleInstall);
  }, []);

  useEffect(() => {
    if (!installPrompt) return;
    const key = "pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const timer = window.setTimeout(() => setShowPWABar(true), 2600);
    return () => window.clearTimeout(timer);
  }, [installPrompt]);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isInStandalone = (window.navigator as IOSNavigator).standalone === true;
    if (!isIOS || isInStandalone) return;
    const key = "ios_pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const timer = window.setTimeout(() => setShowIOSBar(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    setShowPWABar(false);
    try { localStorage.removeItem("pwa_dismissed_v1"); } catch {}
    installPrompt.prompt();
    installPrompt.userChoice.then((c) => { if (c.outcome === "accepted") setInstallPrompt(null); });
  };

  const handlePWADismiss = () => { setShowPWABar(false); try { localStorage.setItem("pwa_dismissed_v1", "1"); } catch {} };
  const handleIOSDismiss = () => { setShowIOSBar(false); try { localStorage.setItem("ios_pwa_dismissed_v1", "1"); } catch {} };

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const t = dict[lang];

  const seller = { "@type": "Organization", name: SITE.brand, url: SITE.domain };
  const shippingDetails = {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
    shippingDestination: { "@type": "DefinedRegion", name: "Worldwide" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "MIN" },
      transitTime:  { "@type": "QuantitativeValue", minValue: 0, maxValue: 10, unitCode: "MIN" },
    },
  };
  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 1,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.domain}/#product`,
    name: `${SITE.brand} — Premium Worldwide IPTV`,
    brand: { "@type": "Brand", name: SITE.brand },
    description: "Best IPTV VIP — 20,000+ live channels, 100,000+ movies & series, EPG, 4K/UHD. Activation in 10 minutes via WhatsApp. Compatible with Firestick, Smart TV, iPhone, Android and PC.",
    image: `${SITE.domain}/og-image.jpg`,
    url: SITE.domain,
    sku: "BIVIP-STREAM-WW",
    mpn: "BIVIP-2025",
    category: "Streaming / IPTV",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "12000",
      bestRating: "5",
      worstRating: "1",
    },
    offers: plans.map(p => ({
      "@type": "Offer",
      "@id": `${SITE.domain}/#offer-${p.key}`,
      name: t.planNames[p.key],
      description: `${SITE.brand} ${t.planNames[p.key]} — 20,000+ channels, 4K/UHD, EPG included.`,
      price: String(p.price),
      priceCurrency: "USD",
      priceValidUntil: p.priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: SITE.domain,
      seller,
      shippingDetails,
      hasMerchantReturnPolicy: returnPolicy,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    "@id": `${SITE.domain}/#business`,
    name: SITE.brand,
    url: SITE.domain,
    logo: `${SITE.domain}/og-image.jpg`,
    image: `${SITE.domain}/og-image.jpg`,
    description: "Best IPTV VIP — 20,000+ channels, 4K/UHD, sports, movies & series. Worldwide premium IPTV streaming.",
    foundingDate: "2024",
    areaServed: { "@type": "Place", name: "Worldwide" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${SITE.whatsappPhone}`,
      availableLanguage: ["English", "French", "Spanish", "German", "Arabic"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "12000", bestRating: "5" },
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
    priceRange: "$14-$99",
    currenciesAccepted: "USD, EUR, GBP",
    paymentAccepted: "PayPal, Credit Card, Crypto, Bank Transfer",
  };

  const navLinks = [
    { href: "#offers", label: t.nav.offers },
    { href: "#channels", label: t.nav.channels },
    { href: "#countries", label: "🌍" },
    { href: "#devices", label: t.nav.devices },
    { href: "#cities", label: t.nav.cities },
    { href: "#faq", label: t.nav.faq },
    { href: "#setup", label: t.nav.setup },
  ];

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="app">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <div className="bg" />

        <div className="topBar">
          <div className="topBarInner">
            <span><span className="greenDot" /> {t.top.status}</span>
            <span className="urgency">{t.top.urgency}</span>
          </div>
        </div>

        <header className="header">
          <nav className="nav">
            <a href="#" className="brand"><BrandLogo size={34} showText={true} /></a>
            <div className="links">
              {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
              <div className="langSwitch">
                {(["en","fr","es","de","ar"] as Locale[]).map(l => (
                  <button key={l} className={`langBtn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)} type="button">
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              {installPrompt && (
                <button onClick={handleInstallClick} className="installBtn" type="button">📲 {t.nav.install}</button>
              )}
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu" type="button">
              {menuOpen ? "✕" : "☰"}
            </button>
          </nav>
        </header>

        {menuOpen && (
          <div className="mobileMenu" onClick={() => setMenuOpen(false)}>
            <div className="mobileMenuLogo"><BrandLogo size={40} showText={true} /></div>
            {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <div className="mobileLangSwitch">
              {(["en","fr","es","de","ar"] as Locale[]).map(l => (
                <button key={l} className={`langBtn ${lang === l ? "active" : ""}`} onClick={e => { e.stopPropagation(); setLang(l); setMenuOpen(false); }} type="button">
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a className="btnPrimary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Mobile-Menu")} target="_blank" rel="noreferrer" style={{ textAlign: "center", marginTop: 8 }}>
              💬 WhatsApp
            </a>
          </div>
        )}

        <main className="main">
          <section className="hero">
            <div className="heroContent">
              <div className="heroLogo"><BrandLogo size={64} showText={false} /></div>
              <p className="pill">{t.hero.pill}</p>
              <h1>{t.hero.titleA}<br /><span className="accent">{t.hero.titleB}</span></h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="actions">
                <a className="btnPrimary" href="#offers">{t.hero.ctaPrices}</a>
                <a className="btnSecondary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Hero-Generic")} target="_blank" rel="noreferrer">
                  {t.hero.ctaAdvisor}
                </a>
              </div>
              <div className="heroTrust">{t.hero.trust}</div>
            </div>
          </section>

          <TrialBanner ua={ua} />
          <TrustSection />

          <section id="offers" className="section">
            <div className="sectionHead"><h2>{t.offers.title}</h2><p>{t.offers.sub}</p></div>
            <div className="grid">
              {plans.map(p => {
                const pricePerMonth = (p.price / p.months);
                const display = pricePerMonth.toFixed(2).replace(/\.00$/, "");
                const baseline = 14;
                const saving = Math.round((1 - pricePerMonth / baseline) * 100);
                return (
                  <article key={p.key} className={`card ${p.highlight ? "highlight" : ""}`}>
                    {saving > 0 && (<div className="saveBadge">{t.offers.save} {saving}%</div>)}
                    <div className="cardHeader">
                      <h3>{t.planNames[p.key]}</h3>
                      {p.highlight && <span className="bestSellerBadge">{t.offers.bestSeller}</span>}
                    </div>
                    <div className="priceLockup">
                      <span className="currency">{SITE.currencySymbol}</span>
                      <span className="bigNumber">{display}</span>
                      <span className="perMonth">{t.offers.perMonth}</span>
                    </div>
                    <div className="billedInfo">
                      {t.offers.billedOnce} {SITE.currencySymbol}{p.price}{p.months > 1 && ` (${t.offers.totalLabel})`}
                    </div>
                    <ul className="perks">
                      {t.planPerks[p.key].map(perk => (
                        <li key={perk}><span className="check">✓</span> {perk}</li>
                      ))}
                    </ul>
                    <a className="btnPlan" href={generateWhatsAppLink(t.whatsapp.orderMessage(t.planNames[p.key], p.price, SITE.currency), ua, `Plan-${p.key}`)} target="_blank" rel="noreferrer">
                      {t.offers.order}
                    </a>
                  </article>
                );
              })}
            </div>
          </section>

          <VODSection />
          <CompareSection />
          <ChannelExplorer />
          <CountriesSection ua={ua} />
          <DeviceSection ua={ua} />
          <ReviewsSection />
          <WorldwideCities ua={ua} />
          <QuickSetup ua={ua} />

          <section id="faq" className="section">
            <div className="sectionHead"><h2>{t.faq.title}</h2></div>
            <div className="faq">
              {t.faq.items.map((f, i) => (
                <details key={i} className="faqItem">
                  <summary className="faqSummary">{f.q}</summary>
                  <p className="faqAnswer">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footerLogo"><BrandLogo size={32} showText={true} /></div>
          <p>© {new Date().getFullYear()} {SITE.brand}. {t.footer.rights}</p>
          <p style={{ marginTop: 6 }}>{t.footer.note}</p>
          <div className="footerLinks">
            <a href="#faq">{t.footer.legal}</a>
            <a href="#faq">{t.footer.privacy}</a>
            <a href="#faq">{t.footer.terms}</a>
            <a href="#faq">{t.footer.refund}</a>
          </div>
        </footer>

        {showPWABar && (
          <div className="pwaBar">
            <span className="pwaIcon">📲</span>
            <div className="pwaText">
              <strong>{t.pwa.install}</strong>
              <span>{t.pwa.installSub}</span>
            </div>
            <button className="pwaAccept" onClick={handleInstallClick}>{t.pwa.accept}</button>
            <button className="pwaDismiss" onClick={handlePWADismiss} aria-label="Close">✕</button>
          </div>
        )}
        {showIOSBar && (
          <div className="pwaBar pwaBarIOS">
            <span className="pwaIcon">📲</span>
            <div className="pwaText">
              <strong>{t.pwa.iosTitle}</strong>
              <span>{t.pwa.iosBefore} <span className="iosShareIcon">⬆</span> {t.pwa.iosAfter}</span>
            </div>
            <button className="pwaDismiss" onClick={handleIOSDismiss} aria-label="Close">✕</button>
          </div>
        )}

        <LiveActivityWidget userAgent={ua} />
        <MayaChat userAgent={ua} />

        <style jsx global>{`
          :root {
            --bg: #050507;
            --card: #0b0b0d;
            --card-hi: #111114;
            --accent: #7c1326;
            --accent-hi: #9a1830;
            --accent-glow: rgba(124,19,38,0.38);
            --fg: #f0eff0;
            --muted: #7a7a86;
            --border: rgba(255,255,255,0.07);
            --border-accent: rgba(212,175,55,0.35);
            --gold: #D4AF37;
          }
          html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; background: #050507; overflow-x: hidden; max-width: 100vw; }
          body { margin: 0; background: #050507; color: #f5f0f5; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; overscroll-behavior-y: contain; overflow-x: hidden; max-width: 100vw; width: 100%; }
          html[dir="rtl"] body { font-family: "Segoe UI", Tahoma, "Arial", sans-serif; }
          *, *::before, *::after { box-sizing: border-box; min-width: 0; }
          .app { overflow-x: hidden; max-width: 100vw; width: 100%; }
          img, video, iframe, table, svg { max-width: 100%; height: auto; }
          h1, h2, h3, h4, p, a, span, li, td, th, button { overflow-wrap: break-word; word-wrap: break-word; }
          a, button { -webkit-tap-highlight-color: rgba(212,175,55,0.15); }
          .bg { position: fixed; inset: 0; z-index: -1; background:
              radial-gradient(ellipse 80% 40% at 50% -5%, #1a0409 0%, transparent 60%),
              radial-gradient(ellipse 100% 60% at 50% 100%, #0a0008 0%, transparent 70%),
              #050507; }
          .main { max-width: 1100px; margin: 0 auto; padding: 0 20px 80px; }
          .section { margin-bottom: 80px; }
          .sectionHead { text-align: center; margin-bottom: 40px; }
          .sectionHead h2 { font-size: 2rem; margin: 0 0 10px; }
          .sectionHead p { color: var(--muted); }
          .topBar { background: #050407; font-size: 12px; border-bottom: 1px solid rgba(212,175,55,0.18); padding: 8px 0; }
          .topBarInner { max-width: 1100px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
          .greenDot { display: inline-block; width: 6px; height: 6px; background: #22c55e; border-radius: 50%; margin-right: 6px; box-shadow: 0 0 5px #22c55e; }
          .urgency { color: var(--gold); font-weight: 700; }
          .header { position: sticky; top: 0; z-index: 100; backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); background: rgba(5,4,7,0.92); border-bottom: 1px solid rgba(212,175,55,0.15); }
          .nav { max-width: 1100px; margin: 0 auto; padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
          .brand { display: flex; align-items: center; gap: 8px; text-decoration: none; }
          .heroLogo { display: flex; justify-content: center; margin-bottom: 20px; filter: drop-shadow(0 0 18px rgba(212,175,55,0.45)); }
          .footerLogo { display: flex; justify-content: center; margin-bottom: 16px; opacity: 0.85; }
          .mobileMenuLogo { padding: 16px 0 8px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px; }
          .links { display: flex; gap: 18px; font-weight: 500; font-size: 14px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
          .links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
          .links a:hover { color: #fff; }
          .langSwitch { display: flex; align-items: center; gap: 6px; }
          .langBtn { background: none; border: 1px solid var(--border); cursor: pointer; padding: 4px 8px; border-radius: 6px; color: #fff; font-size: 11px; transition: 0.2s; font-weight: 700; }
          .langBtn.active { border-color: var(--gold); background: rgba(212,175,55,0.18); color: var(--gold); }
          .installBtn { background: rgba(255,255,255,0.1); border: 1px solid var(--gold); color: #fff; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 700; }
          .hamburger { display: none; background: none; border: 1px solid var(--border); color: #fff; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px; }
          .mobileMenu { position: fixed; inset: 0; padding-top: 70px; background: rgba(5,4,7,0.99); z-index: 99; display: flex; flex-direction: column; padding: 20px 24px 40px; gap: 4px; overflow-y: auto; }
          .mobileMenu a { font-size: 18px; color: #fff; text-decoration: none; padding: 14px 0; border-bottom: 1px solid var(--border); display: block; }
          .mobileLangSwitch { display: flex; gap: 10px; padding: 16px 0; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
          .hero { padding: 80px 0 60px; text-align: center; }
          .heroContent { max-width: 780px; margin: 0 auto; }
          .pill { display: inline-block; padding: 6px 16px; border: 1px solid var(--border-accent); color: var(--gold); background: rgba(212,175,55,0.07); border-radius: 99px; font-size: 12px; font-weight: 700; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.5px; }
          h1 { font-size: clamp(2.2rem, 6vw, 4.2rem); line-height: 1.05; font-weight: 800; margin: 0 0 24px; letter-spacing: -1px; }
          .accent { background: linear-gradient(135deg, #FFE9A0 0%, var(--gold) 60%, #A8862A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .lead { color: var(--muted); font-size: 1.1rem; max-width: 620px; margin: 0 auto 32px; line-height: 1.6; }
          .actions { display: flex; gap: 12px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
          .btnPrimary { background: linear-gradient(135deg, var(--gold) 0%, #A8862A 100%); color: #050507; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; transition: transform 0.2s, box-shadow 0.2s; border: none; cursor: pointer; display: inline-block; }
          .btnPrimary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -6px rgba(212,175,55,0.5); }
          .btnSecondary { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: background 0.2s; display: inline-block; }
          .btnSecondary:hover { background: rgba(255,255,255,0.1); }
          .heroTrust { color: var(--muted); font-size: 13px; font-weight: 500; line-height: 1.6; }
          .trialBanner { background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(168,134,42,0.05)); border: 1px solid rgba(212,175,55,0.28); border-radius: 16px; padding: 32px; margin-bottom: 80px; display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; }
          .trialBadge { display: inline-flex; align-items: center; padding: 6px 14px; background: linear-gradient(135deg, var(--gold), #A8862A); color: #050507; font-size: 11px; font-weight: 800; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; height: fit-content; margin-top: 4px; }
          .trialContent { flex: 1; min-width: 220px; }
          .trialContent h3 { margin: 0 0 8px; font-size: 1.3rem; font-weight: 800; }
          .trialContent p { margin: 0 0 6px; color: var(--muted); font-size: 14px; line-height: 1.6; }
          .trialNote { font-size: 12px !important; opacity: 0.6; }
          .trialCta { display: inline-flex; align-items: center; background: #22c55e; color: #000; font-weight: 800; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; white-space: nowrap; transition: 0.2s; align-self: center; flex-shrink: 0; }
          .trialCta:hover { background: #16a34a; transform: translateY(-1px); }
          .trustSection { margin-bottom: 80px; }
          .trustGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
          .trustCard { background: var(--card); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; text-align: center; transition: 0.2s; }
          .trustCard:hover { border-color: rgba(255,255,255,0.25); }
          .trustIcon { font-size: 28px; display: block; margin-bottom: 10px; }
          .trustCard h4 { margin: 0 0 6px; font-size: 13px; font-weight: 700; }
          .trustCard p { margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5; }
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
          .card { position: relative; background: var(--card); border: 1px solid rgba(255,255,255,0.06); padding: 32px 24px; border-radius: 16px; display: flex; flex-direction: column; transition: transform 0.3s, border-color 0.3s; }
          .card:hover { transform: translateY(-5px); border-color: rgba(212,175,55,0.3); box-shadow: 0 8px 30px rgba(212,175,55,0.12); }
          .card.highlight { border: 1px solid var(--border-accent); box-shadow: 0 0 40px rgba(212,175,55,0.14); background: linear-gradient(180deg, rgba(212,175,55,0.07) 0%, rgba(14,11,15,0) 100%); }
          .saveBadge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, var(--gold), #A8862A); color: #050507; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 20px; box-shadow: 0 4px 14px rgba(212,175,55,0.5); z-index: 2; }
          .cardHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 10px; }
          .cardHeader h3 { margin: 0; font-size: 1.1rem; }
          .bestSellerBadge { font-size: 10px; background: var(--gold); color: #050507; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
          .priceLockup { display: flex; align-items: baseline; justify-content: center; line-height: 1; margin-bottom: 8px; }
          .currency { font-size: 1.2rem; font-weight: 500; margin-right: 4px; color: var(--muted); }
          .bigNumber { font-size: 3.6rem; font-weight: 800; letter-spacing: -2px; }
          .perMonth { font-size: 1rem; color: var(--muted); margin-left: 6px; }
          .billedInfo { text-align: center; color: var(--muted); font-size: 13px; margin-bottom: 24px; font-weight: 500; }
          .perks { list-style: none; padding: 0; margin: 0 0 24px 0; flex-grow: 1; }
          .perks li { padding: 8px 0; font-size: 14px; color: #e5e5e5; display: flex; gap: 10px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); }
          .perks li:last-child { border-bottom: none; }
          .check { color: var(--gold); font-weight: bold; }
          .btnPlan { display: block; width: 100%; text-align: center; background: #fff; color: #000; font-weight: 800; padding: 14px; border-radius: 8px; text-decoration: none; transition: 0.2s; }
          .btnPlan:hover { background: #e5e5e5; transform: scale(1.02); }
          .highlight .btnPlan { background: linear-gradient(135deg, var(--gold), #A8862A); color: #050507; box-shadow: 0 4px 18px rgba(212,175,55,0.45); }
          .statsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; }
          .statCard { background: var(--card); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px 20px; text-align: center; }
          .statValue { font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -1px; }
          .statLabel { font-size: 13px; color: var(--muted); margin-top: 6px; }
          .compareWrap { overflow-x: auto; border-radius: 14px; border: 1px solid var(--border); }
          .compareTable { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 560px; }
          .compareTable thead tr { background: rgba(255,255,255,0.04); }
          .compareTable th { padding: 14px 16px; text-align: left; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); border-bottom: 1px solid var(--border); }
          .compareTable td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #ccc; }
          .highlightRow { background: rgba(212,175,55,0.08); }
          .highlightRow td { color: #fff; font-weight: 600; border-bottom: 1px solid rgba(212,175,55,0.2); }
          .accentPrice { color: var(--gold) !important; font-weight: 800 !important; font-size: 15px; }
          .serviceName { font-weight: 600; color: #fff; }
          .bestTag { color: #4ade80; font-weight: 900; }
          .compareTable tr:last-child td { border-bottom: none; }
          .explorerBox { background: var(--card); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
          .tabs { display: flex; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); overflow-x: auto; }
          .tabBtn { flex: 1; padding: 16px; background: none; border: none; color: var(--muted); cursor: pointer; font-weight: 600; font-size: 14px; min-width: 120px; white-space: nowrap; }
          .tabBtn.active { color: white; background: rgba(255,255,255,0.04); border-bottom: 2px solid var(--gold); }
          .channelList { padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
          .channelItem { font-size: 13px; color: #ccc; display: flex; align-items: center; gap: 8px; }
          .more { color: var(--muted); font-style: italic; }
          .countriesGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
          .countryCard { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 11px; cursor: pointer; transition: all 0.2s; text-align: left; width: 100%; -webkit-tap-highlight-color: rgba(212,175,55,0.2); }
          .countryCard:hover { transform: translateY(-2px) translateX(2px); border-color: rgba(212,175,55,0.5); background: #130d18; box-shadow: 0 6px 24px rgba(0,0,0,0.5); }
          .ctryFlag { font-size: 22px; flex-shrink: 0; }
          .ctryInfo { flex: 1; min-width: 0; overflow: hidden; }
          .ctryName { font-weight: 700; font-size: 14px; color: #f0ecf5; }
          .ctrySub { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .ctryArrow { color: rgba(212,175,55,0.5); font-size: 18px; flex-shrink: 0; transition: transform 0.2s; }
          .countryCard:hover .ctryArrow { transform: translateX(4px); color: var(--gold); }
          .countryModalOverlay { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.82); backdrop-filter: blur(8px); display: flex; align-items: flex-end; justify-content: center; animation: fadeIn 0.2s ease; overflow: hidden; }
          @media (min-width: 640px) { .countryModalOverlay { align-items: center; padding: 20px; } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .countryModalBox { background: #0d0a12; border: 1px solid rgba(255,255,255,0.12); border-radius: 20px 20px 0 0; width: 100%; max-width: 680px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; animation: slideUp 0.3s ease; }
          @media (min-width: 640px) { .countryModalBox { border-radius: 20px; max-height: 88vh; } }
          .countryModalHd { padding: 20px 20px 0; display: flex; align-items: flex-start; gap: 14px; flex-shrink: 0; min-width: 0; overflow: hidden; }
          .countryModalFlag { font-size: 44px; line-height: 1; flex-shrink: 0; }
          .countryModalTb { flex: 1; min-width: 0; overflow: hidden; overflow-wrap: break-word; }
          .countryModalTb h2 { font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 4px; word-break: break-word; }
          .countryModalTb p { font-size: 13px; color: var(--muted); line-height: 1.5; margin: 0; word-break: break-word; }
          .countryModalClose { background: rgba(255,255,255,0.08); border: none; border-radius: 50%; width: 36px; height: 36px; color: var(--muted); font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
          .countryModalBd { overflow-y: auto; padding: 16px 20px 24px; flex: 1; }
          .countryModalSec { margin-bottom: 24px; }
          .countryModalSecTitle { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(212,175,55,0.7); margin-bottom: 12px; }
          .countryChGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 7px; }
          .countryChChip { background: #130d18; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; gap: 6px; }
          .countryChChipGold { background: rgba(212,175,55,0.06); border-color: rgba(212,175,55,0.2); }
          .countryChName { font-size: 13px; font-weight: 600; color: #f0ecf5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
          .countryChIcon { font-size: 14px; }
          .countryKwWrap { display: flex; flex-wrap: wrap; gap: 7px; }
          .countryKwPill { background: rgba(0,106,167,0.1); border: 1px solid rgba(0,106,167,0.25); border-radius: 20px; padding: 5px 12px; display: flex; align-items: center; gap: 6px; }
          .countryKwText { font-size: 12px; color: rgba(240,236,245,0.75); }
          .countryKwVol { font-size: 11px; color: #4AB4E8; font-weight: 700; }
          .countryPriceBox { background: rgba(61,190,122,0.06); border: 1px solid rgba(61,190,122,0.2); border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
          .countryModalFt { padding: 14px 20px 20px; border-top: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; display: flex; gap: 10px; flex-wrap: wrap; }
          .deviceGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; }
          .deviceCard { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
          .deviceCard:hover { border-color: rgba(255,255,255,0.25); transform: translateY(-3px); }
          .deviceIcon { font-size: 32px; }
          .deviceName { font-size: 13px; font-weight: 600; color: #ccc; }
          .reviewsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
          .reviewCard { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 12px; }
          .reviewStars { font-size: 14px; letter-spacing: 1px; }
          .reviewText { margin: 0; font-size: 14px; color: #d4d4d8; line-height: 1.6; font-style: italic; flex: 1; }
          .reviewMeta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; }
          .reviewName { font-weight: 700; color: #fff; }
          .reviewCity { color: var(--muted); }
          .reviewPlan { margin-left: auto; background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.25); color: var(--gold); padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
          .cityText { color: var(--muted); line-height: 1.6; margin-bottom: 20px; }
          .stepsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
          .stepCard { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
          .stepNumber { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), #A8862A); display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 14px; color: #050507; }
          .stepCard p { margin: 0; color: var(--muted); line-height: 1.6; }
          .stepsCtaWrap { display: flex; justify-content: center; margin-top: 24px; }
          .faqItem { background: var(--card); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 12px; }
          .faqItem[open] { background: rgba(255,255,255,0.03); border-color: rgba(212,175,55,0.2); }
          .faqSummary { padding: 18px; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 15px; }
          .faqSummary::-webkit-details-marker { display: none; }
          .faqSummary::after { content: "+"; font-size: 18px; color: var(--muted); }
          .faqItem[open] .faqSummary::after { content: "−"; }
          .faqAnswer { padding: 0 18px 18px; margin: 0; color: var(--muted); line-height: 1.6; font-size: 14px; }
          .footer { padding: 60px 20px; text-align: center; color: #555; font-size: 13px; border-top: 1px solid var(--border); margin-top: 80px; }
          .footerLinks { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
          .footerLinks a { color: #555; text-decoration: none; font-size: 12px; }
          .footerLinks a:hover { color: var(--muted); }
          .miliFab { position: fixed; bottom: 25px; left: 25px; background: #000; border: 1px solid rgba(212,175,55,0.4); padding: 0; border-radius: 30px; cursor: pointer; z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); overflow: hidden; transition: transform 0.2s; }
          .miliFab:hover { transform: scale(1.05); }
          .fabContent { display: flex; align-items: center; padding: 6px 16px 6px 6px; gap: 12px; position: relative; }
          .fabAvatar { border-radius: 50%; border: 2px solid var(--gold); object-fit: cover; background: #130810; }
          .fabText { font-weight: 700; font-size: 13px; color: #fff; }
          .fabPulse { position: absolute; top: 8px; left: 32px; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid #000; }
          .miliTeaser { position: fixed; bottom: 95px; left: 25px; width: 300px; background: rgba(20,20,20,0.95); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 10px 12px; z-index: 999; cursor: pointer; box-shadow: 0 12px 30px rgba(0,0,0,0.45); text-align: left; }
          .miliTeaserHead { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
          .miliTeaserAvatar { border-radius: 50%; object-fit: cover; background: #130810; }
          .miliTeaserTitle { font-weight: 800; font-size: 12px; color: #fff; }
          .miliTeaserLines { display: flex; flex-direction: column; gap: 5px; }
          .miliTeaserLine { font-size: 12px; color: #d4d4d8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .miliBadge { background: linear-gradient(135deg, var(--gold), #A8862A); color: #050507; font-weight: 900; font-size: 11px; padding: 2px 7px; border-radius: 999px; margin-left: auto; }
          .miliBadgeFab { position: absolute; top: -6px; right: -6px; margin-left: 0; }
          .miliBox { position: fixed; bottom: 85px; left: 25px; width: 320px; max-height: 75vh; background: #18181b; border: 1px solid var(--border); border-radius: 16px; z-index: 1000; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .miliHeader { padding: 16px; background: #27272a; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .miliClose { background: none; border: 1px solid rgba(255,255,255,0.12); color: #fff; width: 34px; height: 34px; border-radius: 10px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
          .headerAvatarWrapper { position: relative; }
          .headerAvatar { border-radius: 50%; object-fit: cover; background: #130810; }
          .onlineIndicator { position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid #27272a; }
          .miliBody { display: flex; flex-direction: column; min-height: 0; flex: 1; }
          .miliMsgs { flex: 1; min-height: 0; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
          .miliMsgBot { align-self: flex-start; background: #3f3f46; color: #fff; padding: 10px 14px; border-radius: 12px 12px 12px 2px; font-size: 14px; line-height: 1.4; max-width: 85%; }
          .miliMsgUser { align-self: flex-end; background: linear-gradient(135deg, var(--gold), #A8862A); color: #050507; padding: 10px 14px; border-radius: 12px 12px 2px 12px; font-size: 14px; max-width: 85%; }
          .quickReplies { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px 0; }
          .quickReply { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 6px 12px; border-radius: 16px; font-size: 12px; cursor: pointer; white-space: nowrap; }
          .miliInputRow { display: flex; padding: 12px; border-top: 1px solid rgba(255,255,255,0.1); background: #27272a; gap: 8px; }
          .miliInputRow input { flex: 1; background: #18181b; border: 1px solid #3f3f46; border-radius: 20px; padding: 8px 12px; color: white; outline: none; font-size: 14px; }
          .miliInputRow button { background: none; border: none; color: var(--gold); font-weight: bold; font-size: 18px; cursor: pointer; padding: 0; }
          .typingIndicator { padding: 0 16px 8px; font-size: 20px; color: #666; display: flex; gap: 2px; line-height: 10px; }
          .typingIndicator span { animation: blink 1.4s infinite both; }
          .typingIndicator span:nth-child(2) { animation-delay: 0.2s; }
          .typingIndicator span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
          .liveBadge { position: fixed; bottom: 25px; right: 25px; background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 99px; color: #fff; cursor: pointer; z-index: 1000; display: flex; align-items: center; gap: 8px; }
          .liveDot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; animation: pulseLive 2s infinite; flex-shrink: 0; }
          @keyframes pulseLive { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
          .liveBadgeText { font-weight: 700; font-size: 13px; }
          .livePanel { position: fixed; bottom: 80px; right: 25px; width: 260px; background: #18181b; border: 1px solid var(--border); border-radius: 16px; padding: 16px; z-index: 1000; animation: slideUp 0.3s; }
          .liveHead { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px; }
          .liveSub { font-size: 11px; color: var(--muted); margin-top: 3px; }
          .liveStats { margin-bottom: 12px; }
          .liveRow { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #e4e4e7; }
          .liveCta { width: 100%; background: linear-gradient(135deg, var(--gold), #A8862A); color: #050507; border: none; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
          .liveToast { position: fixed; bottom: 85px; right: 25px; background: rgba(20,20,20,0.97); backdrop-filter: blur(12px); border: 1px solid var(--border-accent); border-left: 4px solid var(--gold); padding: 14px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px; z-index: 1100; animation: slideLeft 0.4s cubic-bezier(0.175,0.885,0.32,1.275); width: 300px; }
          @keyframes slideLeft { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          .liveToastTitle { font-weight: 800; font-size: 13px; color: #fff; margin-bottom: 2px; }
          .liveToastSub { font-size: 12px; color: #ccc; }
          .liveToastBtn { margin-left: auto; background: rgba(255,255,255,0.1); border: none; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; }
          @media (max-width: 900px) {
            .links a { display: none; }
            .langSwitch { display: none; }
            .installBtn { display: none; }
            .hamburger { display: flex; }
          }
          @media (max-width: 640px) {
            .main { padding: 0 14px calc(100px + env(safe-area-inset-bottom, 0px)); max-width: 100vw; }
            .section { margin-bottom: 52px; }
            .sectionHead { margin-bottom: 28px; padding: 0 4px; }
            .sectionHead h2 { font-size: clamp(1.3rem, 5.5vw, 1.55rem); line-height: 1.2; }
            .sectionHead p { font-size: 13px; }
            .topBar { padding: 6px 0; padding-top: max(6px, env(safe-area-inset-top, 0px)); }
            .topBarInner { flex-direction: column; gap: 4px; font-size: 10.5px; padding: 0 14px; text-align: center; }
            .urgency { font-size: 10.5px; }
            .nav { padding: 10px 14px; gap: 8px; }
            .brand { flex-shrink: 1; min-width: 0; overflow: hidden; }
            .hero { padding: 36px 0 28px; }
            .heroContent { padding: 0 4px; }
            h1 { font-size: clamp(1.6rem, 7.5vw, 2.4rem); letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.1; }
            .pill { font-size: 10px; padding: 5px 12px; margin-bottom: 14px; }
            .lead { font-size: 0.9rem; margin-bottom: 22px; padding: 0 4px; }
            .actions { gap: 10px; flex-direction: column; align-items: stretch; padding: 0 8px; }
            .btnPrimary, .btnSecondary { width: 100%; max-width: 100%; padding: 14px 20px; font-size: 14px; text-align: center; }
            .heroTrust { font-size: 11px; padding: 0 8px; }
            .trialBanner { flex-direction: column; align-items: stretch; padding: 18px 14px; gap: 14px; margin-bottom: 50px; border-radius: 14px; }
            .trialContent h3 { font-size: 1.1rem; }
            .trialContent p { font-size: 13px; }
            .trialCta { text-align: center; justify-content: center; padding: 14px 18px; font-size: 14px; width: 100%; }
            .trustGrid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
            .trustCard { padding: 12px 8px; border-radius: 10px; }
            .trustIcon { font-size: 22px; margin-bottom: 6px; }
            .trustCard h4 { font-size: 11.5px; }
            .trustCard p { font-size: 10.5px; }
            .grid { grid-template-columns: 1fr; gap: 18px; }
            .card { padding: 22px 16px; border-radius: 14px; }
            .cardHeader h3 { font-size: 1rem; }
            .bigNumber { font-size: 2.8rem; letter-spacing: -1.5px; }
            .currency { font-size: 1rem; }
            .perks li { font-size: 13px; padding: 6px 0; }
            .btnPlan { padding: 13px; font-size: 14px; }
            .saveBadge { font-size: 10px; padding: 4px 10px; top: -10px; }
            .statsGrid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .statCard { padding: 18px 12px; border-radius: 12px; }
            .statValue { font-size: 1.5rem; }
            .statLabel { font-size: 11px; }
            .compareWrap { border-radius: 10px; max-width: calc(100vw - 28px); margin-left: -2px; }
            .compareTable { font-size: 10.5px; min-width: 360px; }
            .compareTable th { padding: 9px 6px; font-size: 10px; }
            .compareTable td { padding: 9px 6px; }
            .accentPrice { font-size: 11.5px !important; }
            .explorerBox { border-radius: 12px; }
            .tabBtn { font-size: 11px; padding: 11px 8px; min-width: 90px; }
            .channelList { padding: 14px; grid-template-columns: repeat(2, 1fr); gap: 8px; }
            .channelItem { font-size: 11.5px; }
            .countriesGrid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
            .countryCard { padding: 12px 12px; gap: 9px; border-radius: 10px; }
            .ctryFlag { font-size: 20px; }
            .ctryName { font-size: 13px; }
            .ctrySub { font-size: 10px; }
            .countryModalFlag { font-size: 32px; }
            .countryModalHd { gap: 10px; padding: 14px 14px 0; }
            .countryModalTb h2 { font-size: 17px; }
            .countryModalTb p { font-size: 12px; }
            .countryModalBd { padding: 10px 14px 18px; }
            .countryChGrid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
            .countryChChip { padding: 7px 9px; }
            .countryChName { font-size: 11.5px; }
            .countryModalFt { flex-direction: column; padding: 12px 14px 14px; gap: 8px; }
            .countryModalFt a { width: 100% !important; min-width: 0 !important; padding: 13px !important; font-size: 13px !important; }
            .deviceGrid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
            .deviceCard { padding: 14px 6px; gap: 6px; border-radius: 10px; }
            .deviceIcon { font-size: 24px; }
            .deviceName { font-size: 11px; }
            .reviewsGrid { grid-template-columns: 1fr; gap: 12px; }
            .reviewCard { padding: 18px 16px; border-radius: 12px; }
            .reviewText { font-size: 13px; }
            .stepsGrid { grid-template-columns: 1fr; gap: 12px; }
            .stepCard { padding: 18px 16px; border-radius: 14px; }
            .faqItem { border-radius: 10px; margin-bottom: 8px; }
            .faqSummary { padding: 14px; font-size: 13.5px; }
            .faqAnswer { padding: 0 14px 14px; font-size: 13px; }
            .footer { padding: 40px 14px calc(40px + env(safe-area-inset-bottom, 0px)); }
            .footerLinks { gap: 12px; }
            .footerLinks a { font-size: 11px; }
            .liveBadge { display: none; }
            .liveToast { bottom: max(12px, env(safe-area-inset-bottom, 0px)); left: 10px; right: 10px; width: auto; padding: 12px 14px; }
            .miliFab { bottom: max(12px, env(safe-area-inset-bottom, 0px)); left: auto; right: 12px; }
            .miliTeaser { bottom: max(86px, env(safe-area-inset-bottom, 0px) + 70px); left: auto; right: 12px; width: min(280px, calc(100vw - 24px)); }
            .miliBox { bottom: max(86px, env(safe-area-inset-bottom, 0px) + 70px); left: 10px; right: 10px; width: auto; max-height: 70vh; }
            .fabText { display: none; }.fabContent { padding: 8px; gap: 0; }
            .pwaBar { left: 10px; right: 10px; bottom: max(12px, env(safe-area-inset-bottom, 0px)); width: auto; transform: none; padding: 10px 12px; }
            .pwaBarIOS { bottom: max(80px, env(safe-area-inset-bottom, 0px) + 70px); }
            .mobileMenu { padding-top: calc(70px + env(safe-area-inset-top, 0px)); }
          }
          @media (max-width: 380px) {
            .main { padding: 0 10px calc(100px + env(safe-area-inset-bottom, 0px)); }
            .nav { padding: 8px 10px; }
            .topBarInner { padding: 0 10px; font-size: 9.5px; }
            h1 { font-size: clamp(1.4rem, 7vw, 2rem); }
            .lead { font-size: 0.85rem; }
            .bigNumber { font-size: 2.4rem; }
            .compareTable { font-size: 9.5px; min-width: 320px; }
            .countriesGrid { grid-template-columns: 1fr; }
            .deviceGrid { grid-template-columns: repeat(2, 1fr); }
            .channelList { grid-template-columns: 1fr; }
            .trustGrid { grid-template-columns: 1fr; }
            .statsGrid { grid-template-columns: 1fr; }
          }
          .cinWrap { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; flex-direction: column; overflow: hidden; }
          .cinWrap.cinExit { animation: cinFadeOut 0.42s cubic-bezier(0.4,0,1,1) forwards; }
          @keyframes cinFadeOut { to { opacity: 0; transform: scale(1.04); } }
          .cinBg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, #1a0a14 0%, #0a0008 55%, #000 100%); }
          .cinVignette { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%); pointer-events: none; }
          .cinParticles { position: absolute; inset: 0; pointer-events: none; }
          .cinParticle { position: absolute; border-radius: 50%; background: var(--gold); animation: cinFloat linear infinite; }
          @keyframes cinFloat { 0% { transform: translateY(0) scale(1); opacity: 0; } 8% { opacity: 0.55; } 90% { opacity: 0.3; } 100% { transform: translateY(-105vh) scale(0.4); opacity: 0; } }
          .cinLensFlare { position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.04), rgba(212,175,55,0.09), transparent); animation: cinLens 0.7s ease-out 1.0s forwards; pointer-events: none; }
          @keyframes cinLens { to { left: 140%; } }
          .cinEmblemWrap { position: relative; margin-bottom: 28px; filter: drop-shadow(0 0 24px rgba(212,175,55,0.5)); }
          .cinEmblemGlow { position: absolute; inset: -30px; border-radius: 50%; background: radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%); animation: cinGlowPulse 2s ease-in-out 1.1s infinite; }
          @keyframes cinGlowPulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
          .cinContent { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; }
          .cinTitleWrap { margin-bottom: 14px; }
          .cinTitle { font-size: clamp(2.2rem, 7vw, 4.5rem); font-weight: 900; letter-spacing: 0.22em; color: var(--gold); text-shadow: 0 0 32px rgba(212,175,55,0.7), 0 0 64px rgba(212,175,55,0.28); margin: 0 0 8px; opacity: 0; animation: cinTitleIn 0.48s cubic-bezier(0.16,1,0.3,1) 1.2s forwards; }
          @keyframes cinTitleIn { 0% { opacity: 0; letter-spacing: 0.45em; transform: scale(1.04); filter: blur(6px); } 100% { opacity: 1; letter-spacing: 0.22em; transform: scale(1); filter: blur(0); } }
          .cinTitleLine { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); width: 0; margin: 0 auto; animation: cinLineExpand 0.38s ease 1.5s forwards; }
          @keyframes cinLineExpand { to { width: 240px; } }
          .cinTagline { font-size: 0.9rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.62); font-weight: 400; margin: 0 0 8px; opacity: 0; animation: cinFadeUp 0.35s ease 1.7s forwards; }
          .cinSub { font-size: 11px; letter-spacing: 0.08em; color: rgba(212,175,55,0.5); margin: 0; opacity: 0; animation: cinFadeUp 0.3s ease 1.9s forwards; }
          @keyframes cinFadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          .cinSkip { position: absolute; bottom: 28px; right: 20px; background: rgba(0,0,0,0.35); border: 1px solid rgba(212,175,55,0.3); color: rgba(212,175,55,0.65); font-size: 12px; letter-spacing: 0.08em; padding: 8px 18px; border-radius: 20px; cursor: pointer; z-index: 10; min-height: 40px; opacity: 0; animation: fadeIn 0.3s ease 0.6s forwards; }
          .cinSkip:hover { border-color: var(--gold); color: var(--gold); background: rgba(212,175,55,0.06); }
          @media (prefers-reduced-motion: reduce) { .cinWrap { display: none !important; } }
          .pwaBar { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); width: min(460px, calc(100vw - 32px)); background: var(--card-hi); border: 1px solid var(--border-accent); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; z-index: 1050; box-shadow: 0 8px 32px rgba(0,0,0,0.5); animation: pwaSlideUp 0.4s cubic-bezier(0.16,1,0.3,1); }
          @keyframes pwaSlideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
          .pwaIcon { font-size: 24px; flex-shrink: 0; }
          .pwaText { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
          .pwaText strong { font-size: 13px; font-weight: 700; color: var(--fg); }
          .pwaText span { font-size: 11px; color: var(--muted); }
          .pwaAccept { background: linear-gradient(135deg, var(--gold), #A8862A); color: #050507; border: none; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; }
          .pwaDismiss { background: none; border: none; color: var(--muted); font-size: 14px; cursor: pointer; padding: 4px 6px; flex-shrink: 0; }
          .pwaBarIOS { bottom: 150px; }
          .iosShareIcon { display: inline-block; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.3); border-radius: 4px; padding: 1px 5px; font-size: 11px; color: var(--gold); margin: 0 1px; vertical-align: middle; }
        `}</style>
      </div>
    </LanguageContext.Provider>
  );
}
