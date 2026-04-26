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
  { region: "USA & Canada", channels: ["ESPN HD", "NBC", "CBS HD", "FOX Sports", "HBO", "AMC", "Discovery", "TSN", "Sportsnet", "CBC"] },
  { region: "UK & Ireland", channels: ["BBC One HD", "Sky Sports HD", "BT Sport 4K", "ITV HD", "Channel 4", "Sky Cinema", "TNT Sports", "RTE One"] },
  { region: "Europe", channels: ["Canal+ 4K", "beIN Sports", "RAI 1", "ZDF HD", "TF1 France", "RTL", "DAZN", "Movistar+", "Eurosport 4K"] },
  { region: "MENA & Asia", channels: ["MBC 1", "Al Jazeera", "beIN Arabic 4K", "OSN Movies", "Star Plus", "Zee TV", "TVB Jade", "Phoenix"] },
  { region: "LATAM & Africa", channels: ["Telemundo", "Univision", "ESPN Latin", "SuperSport", "Canal+ Afrique", "Globo Brasil", "DSTV"] },
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
  { slug: "arabic", flag: "🇸🇦", name: "العربية", sub: "MBC, Al Jazeera, beIN Sports",
    desc: "Full Arabic channel package — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.",
    wa: "Hi! I want Arabic channels (Best IPTV VIP).",
    keywords: [["arabic IPTV","12k/mo"],["MBC live stream","8.9k/mo"],["beIN Sports Arabic","7.2k/mo"],["arabic channels online","6.5k/mo"]],
    channels: [{n:"MBC 1",c:"🎬"},{n:"MBC 2",c:"🎬"},{n:"MBC Drama",c:"📺"},{n:"MBC Action",c:"💥"},{n:"Al Jazeera",c:"📰"},{n:"Al Arabiya",c:"📰"},{n:"beIN Sports 1 4K",c:"⚽"},{n:"beIN Sports 2",c:"⚽"},{n:"beIN Sports 3",c:"⚽"},{n:"OSN Sports",c:"⚽"},{n:"Rotana Cinema",c:"🎬"},{n:"Rotana Drama",c:"📺"},{n:"Dubai TV",c:"🎬"},{n:"Abu Dhabi TV",c:"📰"},{n:"Saudi 1",c:"🎬"},{n:"LBC Lebanon",c:"🎬"},{n:"BBC Arabic",c:"📰"},{n:"France 24 عربي",c:"📰"},{n:"Nile Drama",c:"📺"},{n:"MTV Lebanon",c:"🎵"}] },
  { slug: "turkish", flag: "🇹🇷", name: "Türkçe", sub: "TRT, Show TV, Kanal D",
    desc: "All Turkish favourites — TRT, Show TV, Kanal D, diziler and sports.",
    wa: "Hi! I want Turkish channels (Best IPTV VIP).",
    keywords: [["turkish IPTV","9.8k/mo"],["turkish channels live","7.4k/mo"],["TRT abroad","5.2k/mo"],["türk dizi online","4.8k/mo"]],
    channels: [{n:"TRT 1",c:"🎬"},{n:"TRT Haber",c:"📰"},{n:"TRT Spor",c:"⚽"},{n:"Show TV",c:"🎬"},{n:"Kanal D",c:"🎬"},{n:"Star TV",c:"🎬"},{n:"ATV",c:"🎬"},{n:"FOX Türkiye",c:"🎬"},{n:"Habertürk",c:"📰"},{n:"CNN Türk",c:"📰"},{n:"beIN Sports TR",c:"⚽"},{n:"A Spor",c:"⚽"},{n:"TV8",c:"🎬"},{n:"Teve 2",c:"🎬"},{n:"TRT 2",c:"🎭"}] },
  { slug: "exyu", flag: "🇧🇦", name: "ExYu", sub: "Pink, RTS, HRT, Arena Sport",
    desc: "Bosnian, Serbian, Croatian channels — sports, series, news.",
    wa: "Hi! I want ExYu channels (Best IPTV VIP).",
    keywords: [["exyu IPTV","5.6k/mo"],["balkan channels","4.3k/mo"],["Pink TV abroad","3.8k/mo"],["Arena Sport stream","2.9k/mo"]],
    channels: [{n:"Pink 1",c:"🎬"},{n:"Pink 2",c:"🎬"},{n:"RTS 1 Srbija",c:"🎬"},{n:"HRT 1 Hrvatska",c:"🎬"},{n:"FTV BiH",c:"🎬"},{n:"BHT1",c:"📰"},{n:"Arena Sport 1 HD",c:"⚽"},{n:"Arena Sport 2 HD",c:"⚽"},{n:"Prva TV",c:"🎬"},{n:"Nova S Srbija",c:"🎬"},{n:"Hayat TV",c:"🎬"},{n:"N1 Balkan",c:"📰"}] },
  { slug: "somali", flag: "🇸🇴", name: "Somali", sub: "Universal TV, Horn Cable",
    desc: "Somali channels — Universal TV, Horn Cable TV, SBC.",
    wa: "Hi! I want Somali channels (Best IPTV VIP).",
    keywords: [["somali IPTV","3.4k/mo"],["Universal TV abroad","2.8k/mo"],["somali channels live","2.1k/mo"]],
    channels: [{n:"Universal TV",c:"🎬"},{n:"Horn Cable TV",c:"📰"},{n:"SBC Somalia",c:"🎬"},{n:"Goobjoog TV",c:"📰"},{n:"Mustaqbal TV",c:"🎬"},{n:"VOA Somali",c:"📰"},{n:"BBC Somali",c:"📰"}] },
  { slug: "persian", flag: "🇮🇷", name: "فارسی", sub: "Manoto, GEM TV, VOA Persian",
    desc: "Iranian channels — Manoto, GEM TV, Iran International.",
    wa: "Hi! I want Persian channels (Best IPTV VIP).",
    keywords: [["persian IPTV","4.2k/mo"],["Manoto live","3.5k/mo"],["GEM TV stream","2.9k/mo"]],
    channels: [{n:"Manoto TV",c:"🎬"},{n:"GEM TV",c:"🎬"},{n:"VOA Persian",c:"📰"},{n:"Iran International",c:"📰"},{n:"BBC Persian",c:"📰"},{n:"Farsi1",c:"🎬"},{n:"Varzesh TV",c:"⚽"}] },
  { slug: "kurdish", flag: "🏳️", name: "Kurdî", sub: "Rudaw, Kurdistan 24, NRT",
    desc: "Kurdish TV channels — Rudaw, Kurdistan 24, NRT, K24.",
    wa: "Hi! I want Kurdish channels (Best IPTV VIP).",
    keywords: [["kurdish IPTV","3.8k/mo"],["Rudaw live","2.9k/mo"],["Kurdistan 24","2.4k/mo"]],
    channels: [{n:"Rudaw",c:"📰"},{n:"Kurdistan 24",c:"📰"},{n:"NRT TV",c:"🎬"},{n:"K24",c:"📰"},{n:"KTV Kurdistan",c:"🎬"},{n:"Zagros TV",c:"🎬"}] },
  { slug: "polish", flag: "🇵🇱", name: "Polski", sub: "TVP, Polsat, TVN, Canal+",
    desc: "Polish TV channels — TVP, Polsat, TVN, Canal+.",
    wa: "Hi! I want Polish channels (Best IPTV VIP).",
    keywords: [["polish IPTV","3.1k/mo"],["polskie kanały","2.6k/mo"],["TVP abroad","2.0k/mo"]],
    channels: [{n:"TVP 1",c:"🎬"},{n:"TVP 2",c:"🎬"},{n:"TVP Info",c:"📰"},{n:"Polsat",c:"🎬"},{n:"TVN",c:"🎬"},{n:"TVN 24",c:"📰"},{n:"Canal+ Sport PL",c:"⚽"},{n:"TVP Sport",c:"⚽"}] },
  { slug: "nordic", flag: "🇸🇪", name: "Nordic", sub: "SVT, NRK, DR, Yle",
    desc: "Nordic channels — Sweden, Norway, Denmark, Finland.",
    wa: "Hi! I want Nordic channels (Best IPTV VIP).",
    keywords: [["nordic IPTV","2.8k/mo"],["SVT abroad","2.2k/mo"],["NRK live stream","1.8k/mo"]],
    channels: [{n:"SVT 1 HD",c:"🎬"},{n:"SVT 2 HD",c:"🎬"},{n:"TV4 HD",c:"🎬"},{n:"NRK 1 Norge",c:"🎬"},{n:"DR1 Danmark",c:"🎬"},{n:"Yle TV1 Suomi",c:"🎬"},{n:"C More Sport",c:"⚽"}] },
  { slug: "indian", flag: "🇮🇳", name: "हिंदी", sub: "Star Plus, Zee TV, Sony",
    desc: "Indian channels — Star Plus, Zee TV, Sony, Colors and Bollywood.",
    wa: "Hi! I want Indian channels (Best IPTV VIP).",
    keywords: [["indian IPTV","3.2k/mo"],["Star Plus live","2.8k/mo"],["hindi TV online","2.1k/mo"]],
    channels: [{n:"Star Plus HD",c:"🎬"},{n:"Zee TV HD",c:"🎬"},{n:"Sony Entertainment",c:"🎬"},{n:"Colors TV",c:"🎬"},{n:"Star Sports 1",c:"⚽"},{n:"Aaj Tak",c:"📰"},{n:"Zee Cinema",c:"🎬"},{n:"Star Gold",c:"🎬"}] },
  { slug: "african", flag: "🌍", name: "Afrique", sub: "Canal+, RTS, TFM, AFROTV",
    desc: "African channels — Canal+, RTS Sénégal, TFM, Nollywood.",
    wa: "Hi! I want African channels (Best IPTV VIP).",
    keywords: [["african IPTV","2.6k/mo"],["Canal+ Afrique","1.9k/mo"],["african channels live","1.7k/mo"]],
    channels: [{n:"Canal+ Afrique",c:"🎬"},{n:"RTS 1 Sénégal",c:"🎬"},{n:"TFM Sénégal",c:"🎬"},{n:"AFROTV",c:"🎬"},{n:"NTA Nigeria",c:"📰"},{n:"Africa 24",c:"📰"},{n:"Nollywood TV",c:"🎬"},{n:"SuperSport Africa",c:"⚽"}] },
  { slug: "chinese", flag: "🇨🇳", name: "中文", sub: "CCTV, Phoenix, TVB",
    desc: "Chinese channels — CCTV, Phoenix, TVB, Mandarin.",
    wa: "Hi! I want Chinese channels (Best IPTV VIP).",
    keywords: [["chinese IPTV","2.4k/mo"],["CCTV abroad","1.9k/mo"],["Phoenix TV live","1.6k/mo"]],
    channels: [{n:"CCTV 1",c:"🎬"},{n:"CCTV 4 Int",c:"🎬"},{n:"Phoenix InfoNews",c:"📰"},{n:"Phoenix Chinese",c:"🎬"},{n:"TVB Jade",c:"🎬"},{n:"CCTV Sport",c:"⚽"}] },
  { slug: "spanish", flag: "🇪🇸", name: "Español", sub: "TVE, Antena 3, Univision",
    desc: "Spanish channels — TVE, Antena 3, Univision, LaLiga.",
    wa: "Hi! I want Spanish channels (Best IPTV VIP).",
    keywords: [["spanish IPTV","3.9k/mo"],["TVE abroad","2.6k/mo"],["LaLiga stream","5.3k/mo"]],
    channels: [{n:"TVE 1",c:"🎬"},{n:"TVE 2",c:"🎬"},{n:"Antena 3",c:"🎬"},{n:"Telecinco",c:"🎬"},{n:"Univision",c:"🌎"},{n:"Canal+ LaLiga",c:"⚽"},{n:"ESPN Latin",c:"⚽"}] },
  { slug: "greek", flag: "🇬🇷", name: "Ελληνικά", sub: "ERT, MEGA, ANT1",
    desc: "Greek channels — ERT, MEGA, ANT1, Nova Sports.",
    wa: "Hi! I want Greek channels (Best IPTV VIP).",
    keywords: [["greek IPTV","1.8k/mo"],["ERT abroad","1.5k/mo"],["MEGA TV live","1.2k/mo"]],
    channels: [{n:"ERT 1",c:"🎬"},{n:"MEGA Channel",c:"🎬"},{n:"ANT1",c:"🎬"},{n:"SKAI TV",c:"📰"},{n:"Nova Sports GR",c:"⚽"}] },
  { slug: "portuguese", flag: "🇵🇹", name: "Português", sub: "RTP, SIC, TVI, Globo",
    desc: "Portuguese & Brazilian channels — RTP, SIC, Globo Brasil.",
    wa: "Hi! I want Portuguese channels (Best IPTV VIP).",
    keywords: [["portuguese IPTV","2.6k/mo"],["RTP abroad","1.9k/mo"],["brasil TV online","3.1k/mo"]],
    channels: [{n:"RTP 1",c:"🎬"},{n:"RTP Internacional",c:"🎬"},{n:"SIC Portugal",c:"🎬"},{n:"TVI Portugal",c:"🎬"},{n:"Globo Brasil",c:"🎬"},{n:"SporTV",c:"⚽"}] },
];
