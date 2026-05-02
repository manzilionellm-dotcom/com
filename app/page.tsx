"use client";

import { useEffect, useMemo, useState } from "react";

/* ============================================================
   Types
============================================================ */
type Locale = "en" | "fr" | "ar";
type PlanKey = "p1" | "p3" | "p6" | "p12";

type Country = {
  slug: string;
  flag: string;
  name: string;
  sub: string;
  desc: string;
  channels: string[];
};

type Copy = {
  status: string;
  urgency: string;
  navPlans: string;
  navChannels: string;
  navCountries: string;
  navDevices: string;
  navFaq: string;
  navWhatsapp: string;
  heroPill: string;
  heroTitle1: string;
  heroTitle2: string;
  heroLead: string;
  heroBtnPlans: string;
  heroBtnTrial: string;
  heroTrust: string;
  trialBadge: string;
  trialTitle: string;
  trialDesc: string;
  trialNote: string;
  trialCta: string;
  trustTitle: string;
  trustItems: { ic: string; t: string; d: string }[];
  plansTitle: string;
  plansSub: string;
  planNames: Record<PlanKey, string>;
  planPerks: Record<PlanKey, string[]>;
  planOrder: string;
  planSave: string;
  planBest: string;
  planBilled: string;
  planTotal: string;
  planMo: string;
  vodTitle: string;
  vodSub: string;
  vodStats: { v: string; l: string }[];
  compareTitle: string;
  compareSub: string;
  compareHeaders: string[];
  compareRows: { s: string; p: string; live: string; vod: boolean; hd: boolean; sup: string; hi?: boolean }[];
  channelsTitle: string;
  channelsSub: string;
  channelsMore: string;
  channelsRegions: { name: string; channels: string[] }[];
  countriesTitle: string;
  countriesSub: string;
  countriesHint: string;
  modalChannels: string;
  modalPrice: string;
  modalPriceSub: string;
  modalOrder: (n: string) => string;
  modalTrial: string;
  devicesTitle: string;
  devicesSub: string;
  devices: { ic: string; n: string }[];
  reviewsTitle: string;
  reviewsSub: string;
  reviews: { name: string; city: string; stars: number; plan: string; text: string }[];
  setupTitle: string;
  setupSub: string;
  setupSteps: { n: string; t: string }[];
  setupCta: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  footerRights: string;
  footerNote: string;
  whatsappGeneric: string;
  whatsappTrial: string;
  whatsappOrder: (p: string, pr: number) => string;
};

/* ============================================================
   Site config
============================================================ */
const SITE = {
  brand: "Best IPTV VIP",
  domain: "https://bestiptv-vip.com",
  whatsapp: "447307410512",
} as const;

const PLANS: { key: PlanKey; price: number; months: number; highlight?: boolean }[] = [
  { key: "p1",  price: 10, months: 1 },
  { key: "p3",  price: 25, months: 3, highlight: true },
  { key: "p6",  price: 35, months: 6 },
  { key: "p12", price: 60, months: 12 },
];

// Single source of truth for ratings (must match app/layout.tsx).
const RATING = { value: "4.9", count: "2847" } as const;

/* ============================================================
   Countries (8 — top demand)
============================================================ */
const COUNTRIES: Country[] = [
  { slug: "arabic",  flag: "\u{1F1F8}\u{1F1E6}", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", sub: "MBC, Al Jazeera, beIN", desc: "Full Arabic — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.", channels: ["MBC 1","MBC 2","MBC Drama","MBC Action","Al Jazeera","Al Arabiya","beIN Sports 1 4K","beIN Sports 2","OSN Sports","Rotana Cinema","Dubai TV","Saudi 1","BBC Arabic","Nile Drama"] },
  { slug: "english", flag: "\u{1F1FA}\u{1F1F8}", name: "English (US/UK)", sub: "ESPN, BBC, Sky Sports", desc: "All English — ESPN, BBC, Sky Sports, BT Sport 4K, HBO, AMC.", channels: ["ESPN HD","NBC","CBS HD","FOX Sports","HBO","AMC","BBC One HD","Sky Sports HD","BT Sport 4K","ITV HD","Sky Cinema","TNT Sports"] },
  { slug: "french",  flag: "\u{1F1EB}\u{1F1F7}", name: "Fran\u00E7ais", sub: "Canal+, beIN, TF1", desc: "Toutes les cha\u00EEnes fran\u00E7aises — Canal+, beIN Sports, TF1, M6.", channels: ["Canal+ 4K","Canal+ Sport","beIN Sports 1","beIN Sports 2","TF1","M6","France 2","France 3","BFM TV","RMC Sport","OCS","Disney+"] },
  { slug: "spanish", flag: "\u{1F1EA}\u{1F1F8}", name: "Espa\u00F1ol", sub: "TVE, LaLiga, Movistar", desc: "Spanish channels — TVE, Antena 3, LaLiga, Movistar+.", channels: ["TVE 1","Antena 3","Telecinco","Cuatro","LaLiga TV","Movistar+","DAZN ES","ESPN Latin","Univision"] },
  { slug: "turkish", flag: "\u{1F1F9}\u{1F1F7}", name: "T\u00FCrk\u00E7e", sub: "TRT, Kanal D, beIN", desc: "T\u00FCm Turkish — TRT, Show TV, Kanal D, ATV, beIN Sports TR.", channels: ["TRT 1","Show TV","Kanal D","Star TV","ATV","FOX T\u00FCrkiye","TRT Spor","beIN Sports TR","A Spor"] },
  { slug: "indian",  flag: "\u{1F1EE}\u{1F1F3}", name: "\u0939\u093F\u0902\u0926\u0940", sub: "Star Plus, Zee, Sony", desc: "Indian channels — Star Plus, Zee TV, Sony, Colors, Bollywood.", channels: ["Star Plus HD","Zee TV","Sony Entertainment","Colors TV","Star Sports 1","Aaj Tak","Zee Cinema","Star Gold"] },
  { slug: "german",  flag: "\u{1F1E9}\u{1F1EA}", name: "Deutsch", sub: "ZDF, Sky, RTL, Pro7", desc: "Deutsche Sender — ZDF, RTL, Pro7, Sky Bundesliga, DAZN.", channels: ["ZDF HD","ARD","RTL","Pro7","Sat.1","Sky Bundesliga","DAZN DE","Sport1"] },
  { slug: "african", flag: "\u{1F30D}", name: "Afrique", sub: "Canal+, RTS, AFROTV", desc: "African channels — Canal+ Afrique, RTS S\u00E9n\u00E9gal, Nollywood.", channels: ["Canal+ Afrique","RTS 1 S\u00E9n\u00E9gal","TFM S\u00E9n\u00E9gal","AFROTV","NTA Nigeria","Africa 24","Nollywood TV","SuperSport Africa"] },
];

/* ============================================================
   Dictionary — EN / FR / AR
============================================================ */
const dict: Record<Locale, Copy> = {
  en: {
    status: "System: Online \u2022 Instant WhatsApp support",
    urgency: "\u{1F381} Launch price guaranteed — Free 24h trial",
    navPlans: "Plans", navChannels: "Channels", navCountries: "Countries", navDevices: "Devices", navFaq: "FAQ", navWhatsapp: "WhatsApp",
    heroPill: "WhatsApp support \u2022 4K UHD \u2022 20,000+ channels",
    heroTitle1: "World's #1 Premium IPTV",
    heroTitle2: "Fast. Stable. Simple.",
    heroLead: "Stop overpaying for cable. 20,000+ live channels, premium sports, movies & 100,000+ series — from $10/month worldwide.",
    heroBtnPlans: "See Pricing", heroBtnTrial: "Free 24h Trial",
    heroTrust: "\u2B50\u2B50\u2B50\u2B50\u2B50 4.9/5 from 2,800+ customers worldwide \u2022 Satisfaction guarantee",
    trialBadge: "Free Trial", trialTitle: "Try free for 24 hours",
    trialDesc: "No credit card required. Contact us on WhatsApp and test on Firestick, Smart TV, Android or iPhone.",
    trialNote: "No contract. No automatic charge.", trialCta: "Request Free Trial",
    trustTitle: "Safe & simple worldwide service",
    trustItems: [
      { ic: "\u{1F9EA}", t: "Free 24h trial", d: "Test without card. Zero risk." },
      { ic: "\u26A1",    t: "Activation < 10 min", d: "Instant via WhatsApp." },
      { ic: "\u{1F4AC}", t: "WhatsApp support", d: "Fast reply, every day." },
      { ic: "\u{1F6E1}\uFE0F", t: "Satisfaction guaranteed", d: "Not happy? Contact us within 24h." },
      { ic: "\u{1F4FA}", t: "4K on all plans", d: "No surcharge for quality." },
      { ic: "\u{1F310}", t: "Works worldwide", d: "Compatible with all ISPs." },
    ],
    plansTitle: "Choose your plan",
    plansSub: "All plans include 20,000+ channels, VOD, EPG and WhatsApp support.",
    planNames: { p1: "1 Month", p3: "3 Months", p6: "6 Months", p12: "12 Months" },
    planPerks: {
      p1: ["20,000+ live channels","4K/UHD quality","EPG included","WhatsApp support","No contract"],
      p3: ["Most popular","20,000+ channels","100,000+ movies & series","Priority support","Guided setup"],
      p6: ["Best value","20,000+ channels","Multi-device","EPG + Catch-up","All channels"],
      p12: ["Ultimate value","VIP premium access","20,000+ channels","VIP 24/7 support","Free upgrades"],
    },
    planOrder: "Order via WhatsApp", planSave: "SAVE", planBest: "BEST SELLER",
    planBilled: "Billed", planTotal: "one-time", planMo: "/mo",
    vodTitle: "100,000+ movies & series on demand",
    vodSub: "New content added weekly. Watch anytime, anywhere.",
    vodStats: [
      { v: "100k+", l: "Movies & series" },
      { v: "20k+",  l: "Live channels" },
      { v: "4K UHD", l: "Max quality" },
      { v: "< 10 min", l: "Activation" },
    ],
    compareTitle: "Why choose us?",
    compareSub: "Comparison vs traditional services",
    compareHeaders: ["Service", "Price/mo", "Live", "VOD", "4K", "Support"],
    compareRows: [
      { s: "Netflix Premium",   p: "$22.99",   live: "0",     vod: true, hd: true, sup: "Chat" },
      { s: "Disney+ Premium",   p: "$15.99",   live: "0",     vod: true, hd: true, sup: "Chat" },
      { s: "HBO Max",           p: "$15.99",   live: "0",     vod: true, hd: true, sup: "Chat" },
      { s: "Best IPTV VIP",     p: "from $10", live: "20k+",  vod: true, hd: true, sup: "WhatsApp", hi: true },
    ],
    channelsTitle: "Explore channels worldwide",
    channelsSub: "Pick a region", channelsMore: "\u2026and 20,000+ more",
    channelsRegions: [
      { name: "USA & Canada",     channels: ["ESPN HD","NBC","CBS HD","FOX Sports","HBO","AMC","TSN","Sportsnet"] },
      { name: "UK & Ireland",     channels: ["BBC One HD","Sky Sports HD","BT Sport 4K","ITV HD","Sky Cinema","TNT Sports"] },
      { name: "Europe",           channels: ["Canal+ 4K","beIN Sports","RAI 1","ZDF HD","TF1","DAZN","Movistar+"] },
      { name: "MENA & Asia",      channels: ["MBC 1","Al Jazeera","beIN Arabic 4K","OSN","Star Plus","Zee TV","TVB Jade"] },
      { name: "LATAM & Africa",   channels: ["Telemundo","Univision","ESPN Latin","SuperSport","Globo Brasil"] },
    ],
    countriesTitle: "TV in your language",
    countriesSub: "Pick your country — see channels and order via WhatsApp",
    countriesHint: "\u{1F446} Tap a country to see channels",
    modalChannels: "\u{1F4FA} Channels included",
    modalPrice: "Price: from $10/mo",
    modalPriceSub: "All channels \u2022 Free 24h trial \u2022 No contract",
    modalOrder: (n) => `\u{1F4AC} Order ${n} — WhatsApp`,
    modalTrial: "\u{1F9EA} Free 24h trial",
    devicesTitle: "Works on all your devices",
    devicesSub: "Install on up to 3 devices.",
    devices: [
      { ic: "\u{1F4FA}", n: "Smart TV" },
      { ic: "\u{1F525}", n: "Firestick" },
      { ic: "\u{1F4F1}", n: "iPhone" },
      { ic: "\u{1F916}", n: "Android" },
      { ic: "\u{1F4BB}", n: "PC / Mac" },
      { ic: "\u{1F4E1}", n: "MAG Box" },
    ],
    reviewsTitle: "What customers say",
    reviewsSub: "Reviews from VIP customers worldwide",
    reviews: [
      { name: "John M.",     city: "New York", stars: 5, plan: "3 months",  text: "Setup took 10 minutes. ESPN, NFL and HBO in 4K. Saving $80/month vs cable." },
      { name: "Fatima A.",   city: "Dubai",    stars: 5, plan: "6 months",  text: "All Arabic channels plus international content. MBC, beIN — excellent quality." },
      { name: "Mohammed K.", city: "London",   stars: 5, plan: "12 months", text: "TiviMate worked instantly. 4K on Firestick, no buffering. Best IPTV in 3 years." },
    ],
    setupTitle: "Setup in 10 minutes",
    setupSub: "Works on Firestick, Smart TV, iPhone, Android. We guide you.",
    setupSteps: [
      { n: "1", t: "Contact us on WhatsApp — tell us your device." },
      { n: "2", t: "Choose your plan and pay securely." },
      { n: "3", t: "Receive M3U link + setup guide. Watch in 10 min." },
    ],
    setupCta: "Get Setup Help Now",
    faqTitle: "FAQ",
    faqs: [
      { q: "Which channels are included?", a: "All major worldwide: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF — plus 20,000+ in HD/4K." },
      { q: "Compatible with TiviMate / IPTV Smarters?", a: "Yes. We support TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. M3U link sent via WhatsApp." },
      { q: "Which devices?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac." },
      { q: "How fast is activation?", a: "Usually 5-10 min after WhatsApp order, even on weekends." },
      { q: "Is EPG included?", a: "Yes. Full Electronic Programme Guide included on all plans." },
      { q: "Does it work in my country?", a: "Yes — worldwide. USA, UK, Canada, Europe, MENA, Asia, LATAM, Africa, Oceania." },
      { q: "How do I pay?", a: "Via WhatsApp. We accept PayPal, credit card, crypto, bank transfer." },
      { q: "Sports channels included?", a: "Yes! Premier League, La Liga, Champions League, NBA, NFL, MLB, UFC, F1." },
      { q: "Can I cancel?", a: "No contract. Pay once, service expires automatically." },
    ],
    footerRights: "All rights reserved.",
    footerNote: "Optimized for fast and stable streaming worldwide.",
    whatsappGeneric: "Hi Best IPTV VIP! I need help.",
    whatsappTrial: "Hi Best IPTV VIP, I want a 24H free trial",
    whatsappOrder: (p, pr) => `Hi Best IPTV VIP! I want to order ${p} ($${pr}). Help me start.`,
  },
  fr: {
    status: "Syst\u00E8me : En ligne \u2022 Support WhatsApp instantan\u00E9",
    urgency: "\u{1F381} Prix de lancement garanti — Essai gratuit 24h",
    navPlans: "Offres", navChannels: "Cha\u00EEnes", navCountries: "Pays", navDevices: "Appareils", navFaq: "FAQ", navWhatsapp: "WhatsApp",
    heroPill: "Support WhatsApp \u2022 4K UHD \u2022 20 000+ cha\u00EEnes",
    heroTitle1: "L'IPTV Premium #1 mondial",
    heroTitle2: "Rapide. Stable. Simple.",
    heroLead: "Arr\u00EAtez de surpayer le c\u00E2ble. 20 000+ cha\u00EEnes, sport premium, films & 100 000+ s\u00E9ries — d\u00E8s 10 $/mois.",
    heroBtnPlans: "Voir les Offres", heroBtnTrial: "Essai Gratuit 24h",
    heroTrust: "\u2B50\u2B50\u2B50\u2B50\u2B50 4,9/5 par 2 800+ clients \u2022 Garantie satisfaction",
    trialBadge: "Essai Gratuit", trialTitle: "Essayez gratuitement 24 heures",
    trialDesc: "Aucune carte requise. Contactez-nous sur WhatsApp et testez sur Firestick, Smart TV, Android ou iPhone.",
    trialNote: "Sans engagement. Sans achat automatique.", trialCta: "Demander l'essai gratuit",
    trustTitle: "Service mondial s\u00FBr et simple",
    trustItems: [
      { ic: "\u{1F9EA}", t: "Essai gratuit 24h", d: "Sans carte. Z\u00E9ro risque." },
      { ic: "\u26A1",    t: "Activation < 10 min", d: "Imm\u00E9diat via WhatsApp." },
      { ic: "\u{1F4AC}", t: "Support WhatsApp", d: "R\u00E9ponse rapide, tous les jours." },
      { ic: "\u{1F6E1}\uFE0F", t: "Garantie satisfaction", d: "Pas satisfait ? Contactez-nous en 24h." },
      { ic: "\u{1F4FA}", t: "4K sur toutes les offres", d: "Sans suppl\u00E9ment pour la qualit\u00E9." },
      { ic: "\u{1F310}", t: "Mondial", d: "Compatible avec tous les FAI." },
    ],
    plansTitle: "Choisissez votre offre",
    plansSub: "Toutes incluent 20 000+ cha\u00EEnes, VOD, EPG et support WhatsApp.",
    planNames: { p1: "1 mois", p3: "3 mois", p6: "6 mois", p12: "12 mois" },
    planPerks: {
      p1: ["20 000+ cha\u00EEnes live","Qualit\u00E9 4K/UHD","EPG inclus","Support WhatsApp","Sans engagement"],
      p3: ["Le plus populaire","20 000+ cha\u00EEnes","100 000+ films & s\u00E9ries","Support prioritaire","Installation guid\u00E9e"],
      p6: ["Meilleur rapport qualit\u00E9/prix","20 000+ cha\u00EEnes","Multi-appareils","EPG + Catch-up","Toutes les cha\u00EEnes"],
      p12: ["Valeur ultime","Acc\u00E8s VIP premium","20 000+ cha\u00EEnes","Support VIP 24/7","Mises \u00E0 jour gratuites"],
    },
    planOrder: "Commander via WhatsApp", planSave: "\u00C9CO", planBest: "POPULAIRE",
    planBilled: "Factur\u00E9", planTotal: "paiement unique", planMo: "/mois",
    vodTitle: "100 000+ films & s\u00E9ries \u00E0 la demande",
    vodSub: "Nouveau contenu chaque semaine. Regardez quand vous voulez.",
    vodStats: [
      { v: "100k+", l: "Films & s\u00E9ries" },
      { v: "20k+",  l: "Cha\u00EEnes live" },
      { v: "4K UHD", l: "Qualit\u00E9 max" },
      { v: "< 10 min", l: "Activation" },
    ],
    compareTitle: "Pourquoi nous choisir ?",
    compareSub: "Comparaison vs services traditionnels",
    compareHeaders: ["Service", "Prix/mois", "Live", "VOD", "4K", "Support"],
    compareRows: [
      { s: "Netflix Premium",   p: "$22.99",   live: "0",     vod: true, hd: true, sup: "Chat" },
      { s: "Disney+ Premium",   p: "$15.99",   live: "0",     vod: true, hd: true, sup: "Chat" },
      { s: "Canal+ Total",      p: "$45",      live: "~80",   vod: true, hd: true, sup: "Chat" },
      { s: "Best IPTV VIP",     p: "d\u00E8s $10", live: "20k+", vod: true, hd: true, sup: "WhatsApp", hi: true },
    ],
    channelsTitle: "Aper\u00E7u des cha\u00EEnes",
    channelsSub: "Choisissez une r\u00E9gion", channelsMore: "\u2026et 20 000+ autres",
    channelsRegions: [
      { name: "USA & Canada",     channels: ["ESPN HD","NBC","CBS HD","FOX Sports","HBO","AMC","TSN","Sportsnet"] },
      { name: "UK & Irlande",     channels: ["BBC One HD","Sky Sports HD","BT Sport 4K","ITV HD","Sky Cinema"] },
      { name: "Europe",           channels: ["Canal+ 4K","beIN Sports","RAI 1","ZDF HD","TF1","DAZN","Movistar+"] },
      { name: "MENA & Asie",      channels: ["MBC 1","Al Jazeera","beIN Arabic 4K","OSN","Star Plus","Zee TV"] },
      { name: "LATAM & Afrique",  channels: ["Telemundo","Univision","ESPN Latin","SuperSport","Globo Brasil"] },
    ],
    countriesTitle: "TV dans votre langue",
    countriesSub: "Choisissez votre pays — voyez les cha\u00EEnes et commandez via WhatsApp",
    countriesHint: "\u{1F446} Cliquez sur un pays pour voir les cha\u00EEnes",
    modalChannels: "\u{1F4FA} Cha\u00EEnes incluses",
    modalPrice: "Prix : d\u00E8s 10 $/mois",
    modalPriceSub: "Toutes les cha\u00EEnes \u2022 Essai gratuit 24h \u2022 Sans engagement",
    modalOrder: (n) => `\u{1F4AC} Commander ${n} — WhatsApp`,
    modalTrial: "\u{1F9EA} Essai gratuit 24h",
    devicesTitle: "Compatible avec tous vos appareils",
    devicesSub: "Installez sur jusqu'\u00E0 3 appareils.",
    devices: [
      { ic: "\u{1F4FA}", n: "Smart TV" },
      { ic: "\u{1F525}", n: "Firestick" },
      { ic: "\u{1F4F1}", n: "iPhone" },
      { ic: "\u{1F916}", n: "Android" },
      { ic: "\u{1F4BB}", n: "PC / Mac" },
      { ic: "\u{1F4E1}", n: "MAG Box" },
    ],
    reviewsTitle: "Ce que disent nos clients",
    reviewsSub: "Avis de clients VIP dans le monde",
    reviews: [
      { name: "John M.",     city: "New York", stars: 5, plan: "3 mois",  text: "Installation en 10 min. ESPN, NFL et HBO en 4K. J'\u00E9conomise 80 $/mois vs c\u00E2ble." },
      { name: "Fatima A.",   city: "Duba\u00EF", stars: 5, plan: "6 mois", text: "Toutes les cha\u00EEnes arabes plus international. MBC, beIN — qualit\u00E9 excellente." },
      { name: "Mohammed K.", city: "Londres",  stars: 5, plan: "12 mois", text: "TiviMate imm\u00E9diat. 4K sur Firestick sans buffering. Meilleur IPTV en 3 ans." },
    ],
    setupTitle: "Installation en 10 minutes",
    setupSub: "Fonctionne sur Firestick, Smart TV, iPhone, Android.",
    setupSteps: [
      { n: "1", t: "Contactez-nous sur WhatsApp — indiquez votre appareil." },
      { n: "2", t: "Choisissez votre offre et payez en s\u00E9curit\u00E9." },
      { n: "3", t: "Recevez le lien M3U + guide. Regardez en 10 min." },
    ],
    setupCta: "Obtenir l'aide installation",
    faqTitle: "Questions fr\u00E9quentes",
    faqs: [
      { q: "Quelles cha\u00EEnes sont incluses ?", a: "Toutes les grandes : ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF — 20 000+ en HD/4K." },
      { q: "Compatible TiviMate / IPTV Smarters ?", a: "Oui. TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. Lien M3U envoy\u00E9 via WhatsApp." },
      { q: "Quels appareils ?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac." },
      { q: "Activation rapide ?", a: "Habituellement 5 \u00E0 10 min apr\u00E8s commande WhatsApp, m\u00EAme le week-end." },
      { q: "EPG inclus ?", a: "Oui. Guide EPG complet inclus dans toutes les offres." },
      { q: "Fonctionne dans mon pays ?", a: "Oui — mondialement. USA, UK, Canada, Europe, MENA, Asie, LATAM, Afrique, Oc\u00E9anie." },
      { q: "Comment payer ?", a: "Via WhatsApp. Nous acceptons PayPal, carte, crypto, virement." },
      { q: "Cha\u00EEnes sport ?", a: "Oui ! Premier League, La Liga, Champions League, NBA, NFL, UFC, F1." },
      { q: "Puis-je annuler ?", a: "Aucun engagement. Vous payez une fois, le service expire automatiquement." },
    ],
    footerRights: "Tous droits r\u00E9serv\u00E9s.",
    footerNote: "Optimis\u00E9 pour un streaming rapide et stable mondialement.",
    whatsappGeneric: "Bonjour Best IPTV VIP ! J'ai besoin d'aide.",
    whatsappTrial: "Bonjour Best IPTV VIP, je veux un essai gratuit 24h",
    whatsappOrder: (p, pr) => `Bonjour Best IPTV VIP ! Je veux commander ${p} ($${pr}).`,
  },
  ar: {
    status: "\u0627\u0644\u0646\u0638\u0627\u0645: \u0645\u062A\u0635\u0644 \u2022 \u062F\u0639\u0645 WhatsApp \u0641\u0648\u0631\u064A",
    urgency: "\u{1F381} \u0633\u0639\u0631 \u0627\u0644\u0625\u0637\u0644\u0627\u0642 \u0645\u0636\u0645\u0648\u0646 — \u062A\u062C\u0631\u0628\u0629 \u0645\u062C\u0627\u0646\u064A\u0629 24 \u0633\u0627\u0639\u0629",
    navPlans: "\u0627\u0644\u0628\u0627\u0642\u0627\u062A", navChannels: "\u0627\u0644\u0642\u0646\u0648\u0627\u062A", navCountries: "\u0627\u0644\u062F\u0648\u0644", navDevices: "\u0627\u0644\u0623\u062C\u0647\u0632\u0629", navFaq: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629", navWhatsapp: "\u0648\u0627\u062A\u0633\u0627\u0628",
    heroPill: "\u062F\u0639\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u2022 4K UHD \u2022 +20,000 \u0642\u0646\u0627\u0629",
    heroTitle1: "IPTV \u0627\u0644\u0623\u0648\u0644 \u0639\u0627\u0644\u0645\u064A\u0627\u064B",
    heroTitle2: "\u0633\u0631\u064A\u0639. \u0645\u0633\u062A\u0642\u0631. \u0628\u0633\u064A\u0637.",
    heroLead: "\u062A\u0648\u0642\u0641 \u0639\u0646 \u062F\u0641\u0639 \u0627\u0644\u0643\u062B\u064A\u0631 \u0644\u0644\u0643\u0627\u0628\u0644. +20,000 \u0642\u0646\u0627\u0629\u060C \u0631\u064A\u0627\u0636\u0629 \u0628\u0631\u064A\u0645\u064A\u0648\u0645\u060C \u0623\u0641\u0644\u0627\u0645 \u0648+100,000 \u0645\u0633\u0644\u0633\u0644 — \u0645\u0646 10 \u062F\u0648\u0644\u0627\u0631 \u0634\u0647\u0631\u064A\u0627\u064B.",
    heroBtnPlans: "\u0634\u0627\u0647\u062F \u0627\u0644\u0623\u0633\u0639\u0627\u0631", heroBtnTrial: "\u062A\u062C\u0631\u0628\u0629 \u0645\u062C\u0627\u0646\u064A\u0629 24 \u0633\u0627\u0639\u0629",
    heroTrust: "\u2B50\u2B50\u2B50\u2B50\u2B50 4.9/5 \u0645\u0646 +2,800 \u0639\u0645\u064A\u0644 \u2022 \u0636\u0645\u0627\u0646 \u0627\u0644\u0631\u0636\u0627",
    trialBadge: "\u062A\u062C\u0631\u0628\u0629 \u0645\u062C\u0627\u0646\u064A\u0629", trialTitle: "\u062C\u0631\u0628 \u0645\u062C\u0627\u0646\u0627\u064B 24 \u0633\u0627\u0639\u0629",
    trialDesc: "\u0628\u062F\u0648\u0646 \u0628\u0637\u0627\u0642\u0629 \u0627\u0626\u062A\u0645\u0627\u0646. \u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0644\u0649 \u0648\u0627\u062A\u0633\u0627\u0628.",
    trialNote: "\u0628\u062F\u0648\u0646 \u0639\u0642\u062F. \u0628\u062F\u0648\u0646 \u0631\u0633\u0648\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0629.", trialCta: "\u0627\u0637\u0644\u0628 \u0627\u0644\u062A\u062C\u0631\u0628\u0629",
    trustTitle: "\u062E\u062F\u0645\u0629 \u0639\u0627\u0644\u0645\u064A\u0629 \u0622\u0645\u0646\u0629",
    trustItems: [
      { ic: "\u{1F9EA}", t: "\u062A\u062C\u0631\u0628\u0629 24 \u0633\u0627\u0639\u0629", d: "\u0628\u062F\u0648\u0646 \u0628\u0637\u0627\u0642\u0629." },
      { ic: "\u26A1",    t: "\u062A\u0641\u0639\u064A\u0644 < 10 \u062F\u0642\u0627\u0626\u0642", d: "\u0641\u0648\u0631\u0627\u064B \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628." },
      { ic: "\u{1F4AC}", t: "\u062F\u0639\u0645 \u0648\u0627\u062A\u0633\u0627\u0628", d: "\u0631\u062F \u0633\u0631\u064A\u0639." },
      { ic: "\u{1F6E1}\uFE0F", t: "\u0636\u0645\u0627\u0646 \u0627\u0644\u0631\u0636\u0627", d: "\u062A\u0648\u0627\u0635\u0644 \u062E\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629." },
      { ic: "\u{1F4FA}", t: "4K \u0641\u064A \u0643\u0644 \u0627\u0644\u0628\u0627\u0642\u0627\u062A", d: "\u0628\u062F\u0648\u0646 \u0631\u0633\u0648\u0645 \u0625\u0636\u0627\u0641\u064A\u0629." },
      { ic: "\u{1F310}", t: "\u064A\u0639\u0645\u0644 \u0639\u0627\u0644\u0645\u064A\u0627\u064B", d: "\u0645\u062A\u0648\u0627\u0641\u0642." },
    ],
    plansTitle: "\u0627\u062E\u062A\u0631 \u0628\u0627\u0642\u062A\u0643",
    plansSub: "\u0643\u0644 \u0627\u0644\u0628\u0627\u0642\u0627\u062A \u062A\u0634\u0645\u0644 +20,000 \u0642\u0646\u0627\u0629\u060C VOD\u060C EPG \u0648\u062F\u0639\u0645 \u0648\u0627\u062A\u0633\u0627\u0628.",
    planNames: { p1: "\u0634\u0647\u0631 \u0648\u0627\u062D\u062F", p3: "3 \u0623\u0634\u0647\u0631", p6: "6 \u0623\u0634\u0647\u0631", p12: "12 \u0634\u0647\u0631" },
    planPerks: {
      p1: ["+20,000 \u0642\u0646\u0627\u0629","\u062C\u0648\u062F\u0629 4K","EPG","\u062F\u0639\u0645 \u0648\u0627\u062A\u0633\u0627\u0628","\u0628\u062F\u0648\u0646 \u0639\u0642\u062F"],
      p3: ["\u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u0639\u0628\u064A\u0629","+20,000 \u0642\u0646\u0627\u0629","+100,000 \u0641\u064A\u0644\u0645","\u062F\u0639\u0645 \u0628\u0623\u0648\u0644\u0648\u064A\u0629","\u062A\u062B\u0628\u064A\u062A \u0645\u0648\u062C\u0647"],
      p6: ["\u0623\u0641\u0636\u0644 \u0642\u064A\u0645\u0629","+20,000 \u0642\u0646\u0627\u0629","\u0623\u062C\u0647\u0632\u0629 \u0645\u062A\u0639\u062F\u062F\u0629","EPG + Catch-up","\u0643\u0644 \u0627\u0644\u0642\u0646\u0648\u0627\u062A"],
      p12: ["\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0642\u0635\u0648\u0649","\u0648\u0635\u0648\u0644 VIP","+20,000 \u0642\u0646\u0627\u0629","\u062F\u0639\u0645 VIP 24/7","\u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0645\u062C\u0627\u0646\u064A\u0629"],
    },
    planOrder: "\u0627\u0637\u0644\u0628 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628", planSave: "\u0648\u0641\u0631", planBest: "\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0628\u064A\u0639\u0627\u064B",
    planBilled: "\u0645\u0641\u0648\u062A\u0631", planTotal: "\u062F\u0641\u0639\u0629 \u0648\u0627\u062D\u062F\u0629", planMo: "/\u0634\u0647\u0631",
    vodTitle: "+100,000 \u0641\u064A\u0644\u0645 \u0648\u0645\u0633\u0644\u0633\u0644",
    vodSub: "\u0645\u062D\u062A\u0648\u0649 \u062C\u062F\u064A\u062F \u0623\u0633\u0628\u0648\u0639\u064A\u0627\u064B.",
    vodStats: [
      { v: "+100k", l: "\u0623\u0641\u0644\u0627\u0645" },
      { v: "+20k",  l: "\u0642\u0646\u0648\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629" },
      { v: "4K UHD", l: "\u0623\u0639\u0644\u0649 \u062C\u0648\u062F\u0629" },
      { v: "< 10 \u062F", l: "\u0627\u0644\u062A\u0641\u0639\u064A\u0644" },
    ],
    compareTitle: "\u0644\u0645\u0627\u0630\u0627 \u062A\u062E\u062A\u0627\u0631\u0646\u0627\u061F",
    compareSub: "\u0645\u0642\u0627\u0631\u0646\u0629",
    compareHeaders: ["\u0627\u0644\u062E\u062F\u0645\u0629","\u0627\u0644\u0633\u0639\u0631/\u0634\u0647\u0631","\u0645\u0628\u0627\u0634\u0631","VOD","4K","\u0627\u0644\u062F\u0639\u0645"],
    compareRows: [
      { s: "Netflix Premium", p: "$22.99", live: "0",   vod: true, hd: true, sup: "\u062F\u0631\u062F\u0634\u0629" },
      { s: "Disney+ Premium", p: "$15.99", live: "0",   vod: true, hd: true, sup: "\u062F\u0631\u062F\u0634\u0629" },
      { s: "OSN+",            p: "$15.99", live: "~80", vod: true, hd: true, sup: "\u062F\u0631\u062F\u0634\u0629" },
      { s: "Best IPTV VIP",   p: "\u0645\u0646 $10", live: "+20k", vod: true, hd: true, sup: "\u0648\u0627\u062A\u0633\u0627\u0628", hi: true },
    ],
    channelsTitle: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0642\u0646\u0648\u0627\u062A",
    channelsSub: "\u0627\u062E\u062A\u0631 \u0645\u0646\u0637\u0642\u0629", channelsMore: "\u2026\u0648+20,000 \u0642\u0646\u0627\u0629 \u0623\u062E\u0631\u0649",
    channelsRegions: [
      { name: "USA & Canada",   channels: ["ESPN HD","NBC","CBS HD","FOX Sports","HBO","AMC","TSN"] },
      { name: "UK & Ireland",   channels: ["BBC One HD","Sky Sports HD","BT Sport 4K","ITV HD","Sky Cinema"] },
      { name: "Europe",         channels: ["Canal+ 4K","beIN Sports","RAI 1","ZDF HD","TF1","DAZN"] },
      { name: "MENA & Asia",    channels: ["MBC 1","Al Jazeera","beIN Arabic 4K","OSN","Star Plus"] },
      { name: "LATAM & Africa", channels: ["Telemundo","Univision","ESPN Latin","SuperSport"] },
    ],
    countriesTitle: "\u062A\u0644\u0641\u0627\u0632 \u0628\u0644\u063A\u062A\u0643",
    countriesSub: "\u0627\u062E\u062A\u0631 \u0628\u0644\u062F\u0643",
    countriesHint: "\u{1F446} \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0628\u0644\u062F",
    modalChannels: "\u{1F4FA} \u0627\u0644\u0642\u0646\u0648\u0627\u062A",
    modalPrice: "\u0627\u0644\u0633\u0639\u0631: \u0645\u0646 $10/\u0634\u0647\u0631",
    modalPriceSub: "\u0643\u0644 \u0627\u0644\u0642\u0646\u0648\u0627\u062A \u2022 \u062A\u062C\u0631\u0628\u0629 24 \u0633\u0627\u0639\u0629 \u2022 \u0628\u062F\u0648\u0646 \u0639\u0642\u062F",
    modalOrder: (n) => `\u{1F4AC} \u0627\u0637\u0644\u0628 ${n} — \u0648\u0627\u062A\u0633\u0627\u0628`,
    modalTrial: "\u{1F9EA} \u062A\u062C\u0631\u0628\u0629 24 \u0633\u0627\u0639\u0629",
    devicesTitle: "\u064A\u0639\u0645\u0644 \u0639\u0644\u0649 \u0643\u0644 \u0623\u062C\u0647\u0632\u062A\u0643",
    devicesSub: "\u062B\u0628\u062A \u0639\u0644\u0649 \u0645\u0627 \u064A\u0635\u0644 \u0625\u0644\u0649 3 \u0623\u062C\u0647\u0632\u0629.",
    devices: [
      { ic: "\u{1F4FA}", n: "Smart TV" },
      { ic: "\u{1F525}", n: "Firestick" },
      { ic: "\u{1F4F1}", n: "iPhone" },
      { ic: "\u{1F916}", n: "Android" },
      { ic: "\u{1F4BB}", n: "PC / Mac" },
      { ic: "\u{1F4E1}", n: "MAG Box" },
    ],
    reviewsTitle: "\u0645\u0627\u0630\u0627 \u064A\u0642\u0648\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
    reviewsSub: "\u0622\u0631\u0627\u0621 \u0639\u0645\u0644\u0627\u0621 VIP",
    reviews: [
      { name: "\u062C\u0648\u0646 \u0645.", city: "\u0646\u064A\u0648\u064A\u0648\u0631\u0643", stars: 5, plan: "3 \u0623\u0634\u0647\u0631", text: "\u0627\u0644\u062A\u062B\u0628\u064A\u062A 10 \u062F\u0642\u0627\u0626\u0642. ESPN \u0648 NFL \u0648 HBO \u0628\u0640 4K." },
      { name: "\u0641\u0627\u0637\u0645\u0629 \u0623.", city: "\u062F\u0628\u064A", stars: 5, plan: "6 \u0623\u0634\u0647\u0631", text: "\u0643\u0644 \u0627\u0644\u0642\u0646\u0648\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629. MBC \u0648 beIN \u062C\u0648\u062F\u0629 \u0645\u0645\u062A\u0627\u0632\u0629." },
      { name: "\u0645\u062D\u0645\u062F \u0643.", city: "\u0644\u0646\u062F\u0646", stars: 5, plan: "12 \u0634\u0647\u0631", text: "TiviMate \u064A\u0639\u0645\u0644 \u0641\u0648\u0631\u0627\u064B. 4K \u0628\u062F\u0648\u0646 \u062A\u0642\u0637\u064A\u0639." },
    ],
    setupTitle: "\u0627\u0644\u062A\u062B\u0628\u064A\u062A \u0641\u064A 10 \u062F\u0642\u0627\u0626\u0642",
    setupSub: "\u064A\u0639\u0645\u0644 \u0639\u0644\u0649 Firestick, Smart TV, iPhone, Android.",
    setupSteps: [
      { n: "1", t: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0644\u0649 \u0648\u0627\u062A\u0633\u0627\u0628." },
      { n: "2", t: "\u0627\u062E\u062A\u0631 \u0628\u0627\u0642\u062A\u0643 \u0648\u0623\u0643\u0645\u0644 \u0627\u0644\u062F\u0641\u0639." },
      { n: "3", t: "\u0627\u0633\u062A\u0644\u0645 \u0631\u0627\u0628\u0637 M3U + \u062F\u0644\u064A\u0644." },
    ],
    setupCta: "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629",
    faqTitle: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629",
    faqs: [
      { q: "\u0645\u0627 \u0647\u064A \u0627\u0644\u0642\u0646\u0648\u0627\u062A\u061F", a: "\u0643\u0644 \u0627\u0644\u0643\u0628\u0631\u0649: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC. +20,000 \u0641\u064A HD/4K." },
      { q: "\u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 TiviMate / IPTV Smarters\u061F", a: "\u0646\u0639\u0645. \u0631\u0627\u0628\u0637 M3U \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628." },
      { q: "\u0623\u064A \u0623\u062C\u0647\u0632\u0629\u061F", a: "Firestick, Smart TV, Android, iPhone, iPad, MAG Box, PC/Mac." },
      { q: "\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0641\u0639\u064A\u0644\u061F", a: "5-10 \u062F\u0642\u0627\u0626\u0642 \u0628\u0639\u062F \u0627\u0644\u0637\u0644\u0628." },
      { q: "EPG \u0645\u062F\u0631\u062C\u061F", a: "\u0646\u0639\u0645. \u0641\u064A \u0643\u0644 \u0627\u0644\u0628\u0627\u0642\u0627\u062A." },
      { q: "\u064A\u0639\u0645\u0644 \u0641\u064A \u0628\u0644\u062F\u064A\u061F", a: "\u0646\u0639\u0645 — \u0639\u0627\u0644\u0645\u064A\u0627\u064B." },
      { q: "\u0643\u064A\u0641 \u0623\u062F\u0641\u0639\u061F", a: "\u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628. PayPal, \u0628\u0637\u0627\u0642\u0629, \u0639\u0645\u0644\u0627\u062A \u0631\u0642\u0645\u064A\u0629, \u062A\u062D\u0648\u064A\u0644." },
      { q: "\u0642\u0646\u0648\u0627\u062A \u0631\u064A\u0627\u0636\u064A\u0629\u061F", a: "\u0646\u0639\u0645! Premier League, La Liga, Champions, NBA, NFL, UFC, F1." },
      { q: "\u0647\u0644 \u064A\u0645\u0643\u0646\u0646\u064A \u0627\u0644\u0625\u0644\u063A\u0627\u0621\u061F", a: "\u0628\u062F\u0648\u0646 \u0639\u0642\u062F. \u062A\u062F\u0641\u0639 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629." },
    ],
    footerRights: "\u0643\u0644 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.",
    footerNote: "\u0645\u062D\u0633\u0646 \u0644\u0644\u0628\u062B \u0627\u0644\u0633\u0631\u064A\u0639.",
    whatsappGeneric: "\u0645\u0631\u062D\u0628\u0627\u064B Best IPTV VIP! \u0623\u062D\u062A\u0627\u062C \u0645\u0633\u0627\u0639\u062F\u0629.",
    whatsappTrial: "\u0645\u0631\u062D\u0628\u0627\u064B Best IPTV VIP\u060C \u0623\u0631\u064A\u062F \u062A\u062C\u0631\u0628\u0629 \u0645\u062C\u0627\u0646\u064A\u0629",
    whatsappOrder: (p, pr) => `\u0645\u0631\u062D\u0628\u0627\u064B Best IPTV VIP! \u0623\u0631\u064A\u062F \u0637\u0644\u0628 ${p} ($${pr}).`,
  },
};

/* ============================================================
   Helpers
============================================================ */
function isMobile(ua: string) {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function waLink(msg: string, ua: string, ref?: string) {
  const text = encodeURIComponent(msg + (ref ? ` | Ref: ${ref}` : ""));
  return isMobile(ua)
    ? `https://wa.me/${SITE.whatsapp}?text=${text}`
    : `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&text=${text}`;
}

function detectLang(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const qp = new URLSearchParams(window.location.search).get("lang");
    if (qp === "en" || qp === "fr" || qp === "ar") return qp;
    const ls = window.localStorage.getItem("lang");
    if (ls === "en" || ls === "fr" || ls === "ar") return ls as Locale;
    const nav = (navigator.language || "en").toLowerCase().split("-")[0];
    if (nav === "fr") return "fr";
    if (nav === "ar") return "ar";
  } catch {}
  return "en";
}

/* ============================================================
   Components
============================================================ */
function CountryModal({ country, lang, ua, onClose }: { country: Country; lang: Locale; ua: string; onClose: () => void }) {
  const t = dict[lang];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="modal-overlay" onClick={(e) => { if ((e.target as HTMLElement).classList.contains("modal-overlay")) onClose(); }}>
      <div className="modal-box">
        <div className="modal-head">
          <span className="modal-flag">{country.flag}</span>
          <div className="modal-tb">
            <h2>{country.name}</h2>
            <p>{country.desc}</p>
          </div>
          <button className="modal-close" onClick={onClose}>{"\u2715"}</button>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">{t.modalChannels} ({country.channels.length}+)</div>
            <div className="modal-channels">
              {country.channels.map(ch => (
                <div key={ch} className="modal-chip">
                  <span className="modal-chip-name">{ch}</span>
                  <span>{"\u{1F4FA}"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-price">
            <span style={{ fontSize: 22 }}>{"\u{1F4B0}"}</span>
            <div>
              <b>{t.modalPrice}</b>
              <br />
              <small>{t.modalPriceSub}</small>
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <a className="btn btn-green" href={waLink(`Hi! I want ${country.name} channels.`, ua, `Country-${country.slug}`)} target="_blank" rel="noreferrer">
            {t.modalOrder(country.name)}
          </a>
          <a className="btn btn-ghost" href={waLink(`${t.whatsappTrial} (${country.name})`, ua, `Trial-${country.slug}`)} target="_blank" rel="noreferrer">
            {t.modalTrial}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */
export default function Page() {
  const [lang, setLang] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const detected = detectLang();
    setLang(detected);
    try { localStorage.setItem("lang", detected); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = detected;
      document.documentElement.dir = detected === "ar" ? "rtl" : "ltr";
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const t = dict[lang];
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

  // Single Product schema (single source of truth, aligned with layout.tsx).
  const productSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.brand} \u2014 Premium Worldwide IPTV`,
    brand: { "@type": "Brand", name: SITE.brand },
    description: "20,000+ live channels, 100,000+ movies & series, 4K UHD, EPG. Activation in 10 min via WhatsApp.",
    image: `${SITE.domain}/og-image.png`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING.value,
      reviewCount: RATING.count,
      bestRating: "5",
      worstRating: "1",
    },
    offers: PLANS.map(p => ({
      "@type": "Offer",
      name: t.planNames[p.key],
      price: String(p.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: SITE.domain,
    })),
  }), [t]);

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }), [t]);

  const navLinks = [
    { href: "#plans",     label: t.navPlans },
    { href: "#channels",  label: t.navChannels },
    { href: "#countries", label: t.navCountries },
    { href: "#devices",   label: t.navDevices },
    { href: "#faq",       label: t.navFaq },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-glow" />

      <div className="topbar">
        <div className="topbar-inner">
          <span><span className="dot-live" /> {t.status}</span>
          <span className="urgency">{t.urgency}</span>
        </div>
      </div>

      <header className="header">
        <nav className="nav">
          <a href="#top" className="brand">
            <span className="brand-logo">B</span>
            <span className="brand-text">BEST IPTV <b>VIP</b></span>
          </a>
          <div className="nav-links">
            {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div className="lang-switch desktop-only">
            {(["en", "fr", "ar"] as Locale[]).map(l => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            {menuOpen ? "\u2715" : "\u2630"}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <div className="mobile-lang">
            {(["en", "fr", "ar"] as Locale[]).map(l => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setLang(l); setMenuOpen(false); }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn btn-green" href={waLink(t.whatsappTrial, ua, "Mobile-Menu")} target="_blank" rel="noreferrer" style={{ marginTop: 12 }}>
            {"\u{1F4AC} WhatsApp"}
          </a>
        </div>
      )}

      <main id="top" className="wrap">
        <section className="hero">
          <div className="brand-logo" style={{ width: 56, height: 56, fontSize: 28, margin: "0 auto 18px" }}>B</div>
          <span className="hero-pill">{t.heroPill}</span>
          <h1>{t.heroTitle1}<br /><span className="accent">{t.heroTitle2}</span></h1>
          <p className="lead">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#plans">{t.heroBtnPlans}</a>
            <a className="btn btn-green" href={waLink(t.whatsappTrial, ua, "Hero-Trial")} target="_blank" rel="noreferrer">{t.heroBtnTrial}</a>
          </div>
          <div className="hero-trust">{t.heroTrust}</div>
        </section>

        <section className="section">
          <div className="trial-banner">
            <span className="trial-badge">{t.trialBadge}</span>
            <h3>{t.trialTitle}</h3>
            <p>{t.trialDesc}</p>
            <p className="trial-note">{t.trialNote}</p>
            <a className="btn btn-green" href={waLink(t.whatsappTrial, ua, "Trial-Banner")} target="_blank" rel="noreferrer">
              {t.trialCta}
            </a>
          </div>
        </section>

        <section className="section">
          <div className="section-head"><h2>{t.trustTitle}</h2></div>
          <div className="trust-grid">
            {t.trustItems.map(item => (
              <div key={item.t} className="trust-card">
                <div className="ic">{item.ic}</div>
                <h4>{item.t}</h4>
                <p>{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="plans" className="section">
          <div className="section-head">
            <h2>{t.plansTitle}</h2>
            <p>{t.plansSub}</p>
          </div>
          <div className="plans-grid">
            {PLANS.map(p => {
              const perMo = (p.price / p.months);
              const display = perMo.toFixed(2).replace(/\.00$/, "");
              const basePerMo = PLANS[0].price / PLANS[0].months;
              const save = basePerMo > 0 ? Math.round((1 - perMo / basePerMo) * 100) : 0;
              return (
                <article key={p.key} className={`plan ${p.highlight ? "highlight" : ""}`}>
                  {save > 0 && <div className="plan-badge">{t.planSave} {save}%</div>}
                  <div className="plan-head">
                    <h3>{t.planNames[p.key]}</h3>
                    {p.highlight && <span className="plan-best">{t.planBest}</span>}
                  </div>
                  <div className="plan-price">
                    <span className="cur">$</span>
                    <span className="num">{display}</span>
                    <span className="per">{t.planMo}</span>
                  </div>
                  <div className="plan-billed">
                    {t.planBilled} ${p.price}{p.months > 1 && ` (${t.planTotal})`}
                  </div>
                  <ul className="plan-perks">
                    {t.planPerks[p.key].map(perk => (
                      <li key={perk}><span className="check">{"\u2713"}</span> {perk}</li>
                    ))}
                  </ul>
                  <a className="btn btn-white plan-cta btn-block" href={waLink(t.whatsappOrder(t.planNames[p.key], p.price), ua, `Plan-${p.key}`)} target="_blank" rel="noreferrer">
                    {t.planOrder}
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>{t.vodTitle}</h2>
            <p>{t.vodSub}</p>
          </div>
          <div className="stats-grid">
            {t.vodStats.map(s => (
              <div key={s.l} className="stat">
                <div className="stat-val">{s.v}</div>
                <div className="stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>{t.compareTitle}</h2>
            <p>{t.compareSub}</p>
          </div>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>{t.compareHeaders.map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {t.compareRows.map(r => (
                  <tr key={r.s} className={r.hi ? "compare-row-hi" : ""}>
                    <td>{r.hi && "\u2713 "}{r.s}</td>
                    <td>{r.p}</td>
                    <td>{r.live}</td>
                    <td style={{ color: r.vod ? "#22c55e" : "#ef4444" }}>{r.vod ? "\u2713" : "\u2717"}</td>
                    <td style={{ color: r.hd ? "#22c55e" : "#ef4444" }}>{r.hd ? "\u2713" : "\u2717"}</td>
                    <td>{r.sup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="channels" className="section">
          <div className="section-head">
            <h2>{t.channelsTitle}</h2>
            <p>{t.channelsSub}</p>
          </div>
          <div className="channels-box">
            <div className="tabs">
              {t.channelsRegions.map((r, i) => (
                <button key={i} className={`tab-btn ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>
                  {r.name}
                </button>
              ))}
            </div>
            <div className="channels-list">
              {t.channelsRegions[activeTab].channels.map(c => (
                <div key={c} className="ch">{"\u25B6"} {c}</div>
              ))}
              <div className="ch ch-more">{t.channelsMore}</div>
            </div>
          </div>
        </section>

        <section id="countries" className="section">
          <div className="section-head">
            <h2>{t.countriesTitle}</h2>
            <p>{t.countriesSub}</p>
            <p style={{ color: "var(--gold)", fontSize: 12, marginTop: 6, fontWeight: 600 }}>{t.countriesHint}</p>
          </div>
          <div className="countries-grid">
            {COUNTRIES.map(c => (
              <button key={c.slug} className="country-card" onClick={() => setSelectedCountry(c)}>
                <span className="flag">{c.flag}</span>
                <div className="country-info">
                  <div className="country-name">{c.name}</div>
                  <div className="country-sub">{c.sub}</div>
                </div>
                <span className="country-arrow">{"\u203A"}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="devices" className="section">
          <div className="section-head">
            <h2>{t.devicesTitle}</h2>
            <p>{t.devicesSub}</p>
          </div>
          <div className="devices-grid">
            {t.devices.map(d => (
              <div key={d.n} className="device">
                <div className="ic">{d.ic}</div>
                <div className="name">{d.n}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>{t.reviewsTitle}</h2>
            <p>{t.reviewsSub}</p>
          </div>
          <div className="reviews-grid">
            {t.reviews.map((r, i) => (
              <article key={i} className="review">
                <div className="review-stars">{"\u2B50".repeat(r.stars)}</div>
                <p>&ldquo;{r.text}&rdquo;</p>
                <div className="review-meta">
                  <span className="review-name">{r.name}</span>
                  <span className="review-city">{"\u2014"} {r.city}</span>
                  <span className="review-plan">{r.plan}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>{t.setupTitle}</h2>
            <p>{t.setupSub}</p>
          </div>
          <div className="steps-grid">
            {t.setupSteps.map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <p>{s.t}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <a className="btn btn-gold" href={waLink(t.whatsappGeneric, ua, "Setup-CTA")} target="_blank" rel="noreferrer">
              {t.setupCta}
            </a>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="section-head"><h2>{t.faqTitle}</h2></div>
          {t.faqs.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>{"\u00A9 "}{new Date().getFullYear()} {SITE.brand}. {t.footerRights}</p>
        <p style={{ marginTop: 6 }}>{t.footerNote}</p>
        <div className="footer-links">
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="#plans">{t.navPlans}</a>
          <a href="#faq">{t.navFaq}</a>
        </div>
      </footer>

      <a className="fab" href={waLink(t.whatsappGeneric, ua, "FAB")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        {"\u{1F4AC}"}
      </a>

      {selectedCountry && (
        <CountryModal country={selectedCountry} lang={lang} ua={ua} onClose={() => setSelectedCountry(null)} />
      )}
    </>
  );
}
