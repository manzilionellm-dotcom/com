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
  { key: "p1", price: 14, months: 1 },
  { key: "p3", price: 30, months: 3, highlight: true },
  { key: "p6", price: 55, months: 6 },
  { key: "p12", price: 99, months: 12 },
];

/* ============================================================
   Countries (8 — top demand)
   ============================================================ */
const COUNTRIES: Country[] = [
  { slug: "arabic", flag: "🇸🇦", name: "العربية", sub: "MBC, Al Jazeera, beIN",
    desc: "Full Arabic — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.",
    channels: ["MBC 1", "MBC 2", "MBC Drama", "MBC Action", "Al Jazeera", "Al Arabiya", "beIN Sports 1 4K", "beIN Sports 2", "OSN Sports", "Rotana Cinema", "Dubai TV", "Saudi 1", "BBC Arabic", "Nile Drama"] },
  { slug: "english", flag: "🇺🇸", name: "English (US/UK)", sub: "ESPN, BBC, Sky Sports",
    desc: "All English — ESPN, BBC, Sky Sports, BT Sport 4K, HBO, AMC.",
    channels: ["ESPN HD", "NBC", "CBS HD", "FOX Sports", "HBO", "AMC", "BBC One HD", "Sky Sports HD", "BT Sport 4K", "ITV HD", "Sky Cinema", "TNT Sports"] },
  { slug: "french", flag: "🇫🇷", name: "Français", sub: "Canal+, beIN, TF1",
    desc: "Toutes les chaînes françaises — Canal+, beIN Sports, TF1, M6.",
    channels: ["Canal+ 4K", "Canal+ Sport", "beIN Sports 1", "beIN Sports 2", "TF1", "M6", "France 2", "France 3", "BFM TV", "RMC Sport", "OCS", "Disney+"] },
  { slug: "spanish", flag: "🇪🇸", name: "Español", sub: "TVE, LaLiga, Movistar",
    desc: "Spanish channels — TVE, Antena 3, LaLiga, Movistar+.",
    channels: ["TVE 1", "Antena 3", "Telecinco", "Cuatro", "LaLiga TV", "Movistar+", "DAZN ES", "ESPN Latin", "Univision"] },
  { slug: "turkish", flag: "🇹🇷", name: "Türkçe", sub: "TRT, Kanal D, beIN",
    desc: "Tüm Turkish — TRT, Show TV, Kanal D, ATV, beIN Sports TR.",
    channels: ["TRT 1", "Show TV", "Kanal D", "Star TV", "ATV", "FOX Türkiye", "TRT Spor", "beIN Sports TR", "A Spor"] },
  { slug: "indian", flag: "🇮🇳", name: "हिंदी", sub: "Star Plus, Zee, Sony",
    desc: "Indian channels — Star Plus, Zee TV, Sony, Colors, Bollywood.",
    channels: ["Star Plus HD", "Zee TV", "Sony Entertainment", "Colors TV", "Star Sports 1", "Aaj Tak", "Zee Cinema", "Star Gold"] },
  { slug: "german", flag: "🇩🇪", name: "Deutsch", sub: "ZDF, Sky, RTL, Pro7",
    desc: "Deutsche Sender — ZDF, RTL, Pro7, Sky Bundesliga, DAZN.",
    channels: ["ZDF HD", "ARD", "RTL", "Pro7", "Sat.1", "Sky Bundesliga", "DAZN DE", "Sport1"] },
  { slug: "african", flag: "🌍", name: "Afrique", sub: "Canal+, RTS, AFROTV",
    desc: "African channels — Canal+ Afrique, RTS Sénégal, Nollywood.",
    channels: ["Canal+ Afrique", "RTS 1 Sénégal", "TFM Sénégal", "AFROTV", "NTA Nigeria", "Africa 24", "Nollywood TV", "SuperSport Africa"] },
];

/* ============================================================
   Dictionary — EN / FR / AR
   ============================================================ */
const dict: Record<Locale, Copy> = {
  en: {
    status: "System: Online • Instant WhatsApp support",
    urgency: "🎁 Launch price guaranteed — Free 24h trial",
    navPlans: "Plans", navChannels: "Channels", navCountries: "Countries", navDevices: "Devices", navFaq: "FAQ", navWhatsapp: "WhatsApp",
    heroPill: "WhatsApp support • 4K UHD • 20,000+ channels",
    heroTitle1: "World's #1 Premium IPTV",
    heroTitle2: "Fast. Stable. Simple.",
    heroLead: "Stop overpaying for cable. 20,000+ live channels, premium sports, movies & 100,000+ series — from $14/month worldwide.",
    heroBtnPlans: "See Pricing", heroBtnTrial: "Free 24h Trial",
    heroTrust: "⭐⭐⭐⭐⭐ 4.9/5 from 12,000+ customers worldwide • Satisfaction guarantee",
    trialBadge: "Free Trial",
    trialTitle: "Try free for 24 hours",
    trialDesc: "No credit card required. Contact us on WhatsApp and test on Firestick, Smart TV, Android or iPhone.",
    trialNote: "No contract. No automatic charge.",
    trialCta: "Request Free Trial",
    trustTitle: "Safe & simple worldwide service",
    trustItems: [
      { ic: "🧪", t: "Free 24h trial", d: "Test without card. Zero risk." },
      { ic: "⚡", t: "Activation < 10 min", d: "Instant via WhatsApp." },
      { ic: "💬", t: "WhatsApp support", d: "Fast reply, every day." },
      { ic: "🛡️", t: "Satisfaction guaranteed", d: "Not happy? Contact us within 24h." },
      { ic: "📺", t: "4K on all plans", d: "No surcharge for quality." },
      { ic: "🌐", t: "Works worldwide", d: "Compatible with all ISPs." },
    ],
    plansTitle: "Choose your plan",
    plansSub: "All plans include 20,000+ channels, VOD, EPG and WhatsApp support.",
    planNames: { p1: "1 Month", p3: "3 Months", p6: "6 Months", p12: "12 Months" },
    planPerks: {
      p1: ["20,000+ live channels", "4K/UHD quality", "EPG included", "WhatsApp support", "No contract"],
      p3: ["Most popular", "20,000+ channels", "100,000+ movies & series", "Priority support", "Guided setup"],
      p6: ["Best value", "20,000+ channels", "Multi-device", "EPG + Catch-up", "All channels"],
      p12: ["Ultimate value", "VIP premium access", "20,000+ channels", "VIP 24/7 support", "Free upgrades"],
    },
    planOrder: "Order via WhatsApp", planSave: "SAVE", planBest: "BEST SELLER",
    planBilled: "Billed", planTotal: "one-time", planMo: "/mo",
    vodTitle: "100,000+ movies & series on demand",
    vodSub: "New content added weekly. Watch anytime, anywhere.",
    vodStats: [
      { v: "100k+", l: "Movies & series" },
      { v: "20k+", l: "Live channels" },
      { v: "4K UHD", l: "Max quality" },
      { v: "< 10 min", l: "Activation" },
    ],
    compareTitle: "Why choose us?",
    compareSub: "Comparison vs traditional services",
    compareHeaders: ["Service", "Price/mo", "Live", "VOD", "4K", "Support"],
    compareRows: [
      { s: "Netflix Premium", p: "$22.99", live: "0", vod: true, hd: true, sup: "Chat" },
      { s: "Disney+ Premium", p: "$15.99", live: "0", vod: true, hd: true, sup: "Chat" },
      { s: "HBO Max", p: "$15.99", live: "0", vod: true, hd: true, sup: "Chat" },
      { s: "Best IPTV VIP", p: "from $8.25", live: "20k+", vod: true, hd: true, sup: "WhatsApp", hi: true },
    ],
    channelsTitle: "Explore channels worldwide",
    channelsSub: "Pick a region",
    channelsMore: "…and 20,000+ more",
    channelsRegions: [
      { name: "USA & Canada", channels: ["ESPN HD", "NBC", "CBS HD", "FOX Sports", "HBO", "AMC", "TSN", "Sportsnet"] },
      { name: "UK & Ireland", channels: ["BBC One HD", "Sky Sports HD", "BT Sport 4K", "ITV HD", "Sky Cinema", "TNT Sports"] },
      { name: "Europe", channels: ["Canal+ 4K", "beIN Sports", "RAI 1", "ZDF HD", "TF1", "DAZN", "Movistar+"] },
      { name: "MENA & Asia", channels: ["MBC 1", "Al Jazeera", "beIN Arabic 4K", "OSN", "Star Plus", "Zee TV", "TVB Jade"] },
      { name: "LATAM & Africa", channels: ["Telemundo", "Univision", "ESPN Latin", "SuperSport", "Globo Brasil"] },
    ],
    countriesTitle: "TV in your language",
    countriesSub: "Pick your country — see channels and order via WhatsApp",
    countriesHint: "👆 Tap a country to see channels",
    modalChannels: "📺 Channels included",
    modalPrice: "Price: from $8.25/mo",
    modalPriceSub: "All channels • Free 24h trial • No contract",
    modalOrder: (n) => `💬 Order ${n} — WhatsApp`,
    modalTrial: "🧪 Free 24h trial",
    devicesTitle: "Works on all your devices",
    devicesSub: "Install on up to 3 devices.",
    devices: [
      { ic: "📺", n: "Smart TV" },
      { ic: "🔥", n: "Firestick" },
      { ic: "📱", n: "iPhone" },
      { ic: "🤖", n: "Android" },
      { ic: "💻", n: "PC / Mac" },
      { ic: "📡", n: "MAG Box" },
    ],
    reviewsTitle: "What customers say",
    reviewsSub: "Reviews from VIP customers worldwide",
    reviews: [
      { name: "John M.", city: "New York", stars: 5, plan: "3 months", text: "Setup took 10 minutes. ESPN, NFL and HBO in 4K. Saving $80/month vs cable." },
      { name: "Fatima A.", city: "Dubai", stars: 5, plan: "6 months", text: "All Arabic channels plus international content. MBC, beIN — excellent quality." },
      { name: "Mohammed K.", city: "London", stars: 5, plan: "12 months", text: "TiviMate worked instantly. 4K on Firestick, no buffering. Best IPTV in 3 years." },
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
      { q: "How fast is activation?", a: "Usually 5–10 min after WhatsApp order, even on weekends." },
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
    status: "Système : En ligne • Support WhatsApp instantané",
    urgency: "🎁 Prix de lancement garanti — Essai gratuit 24h",
    navPlans: "Offres", navChannels: "Chaînes", navCountries: "Pays", navDevices: "Appareils", navFaq: "FAQ", navWhatsapp: "WhatsApp",
    heroPill: "Support WhatsApp • 4K UHD • 20 000+ chaînes",
    heroTitle1: "L'IPTV Premium #1 mondial",
    heroTitle2: "Rapide. Stable. Simple.",
    heroLead: "Arrêtez de surpayer le câble. 20 000+ chaînes, sport premium, films & 100 000+ séries — dès 14 $/mois.",
    heroBtnPlans: "Voir les Offres", heroBtnTrial: "Essai Gratuit 24h",
    heroTrust: "⭐⭐⭐⭐⭐ 4,9/5 par 12 000+ clients • Garantie satisfaction",
    trialBadge: "Essai Gratuit",
    trialTitle: "Essayez gratuitement 24 heures",
    trialDesc: "Aucune carte requise. Contactez-nous sur WhatsApp et testez sur Firestick, Smart TV, Android ou iPhone.",
    trialNote: "Sans engagement. Sans achat automatique.",
    trialCta: "Demander l'essai gratuit",
    trustTitle: "Service mondial sûr et simple",
    trustItems: [
      { ic: "🧪", t: "Essai gratuit 24h", d: "Sans carte. Zéro risque." },
      { ic: "⚡", t: "Activation < 10 min", d: "Immédiat via WhatsApp." },
      { ic: "💬", t: "Support WhatsApp", d: "Réponse rapide, tous les jours." },
      { ic: "🛡️", t: "Garantie satisfaction", d: "Pas satisfait ? Contactez-nous en 24h." },
      { ic: "📺", t: "4K sur toutes les offres", d: "Sans supplément pour la qualité." },
      { ic: "🌐", t: "Mondial", d: "Compatible avec tous les FAI." },
    ],
    plansTitle: "Choisissez votre offre",
    plansSub: "Toutes incluent 20 000+ chaînes, VOD, EPG et support WhatsApp.",
    planNames: { p1: "1 mois", p3: "3 mois", p6: "6 mois", p12: "12 mois" },
    planPerks: {
      p1: ["20 000+ chaînes live", "Qualité 4K/UHD", "EPG inclus", "Support WhatsApp", "Sans engagement"],
      p3: ["Le plus populaire", "20 000+ chaînes", "100 000+ films & séries", "Support prioritaire", "Installation guidée"],
      p6: ["Meilleur rapport qualité/prix", "20 000+ chaînes", "Multi-appareils", "EPG + Catch-up", "Toutes les chaînes"],
      p12: ["Valeur ultime", "Accès VIP premium", "20 000+ chaînes", "Support VIP 24/7", "Mises à jour gratuites"],
    },
    planOrder: "Commander via WhatsApp", planSave: "ÉCO", planBest: "POPULAIRE",
    planBilled: "Facturé", planTotal: "paiement unique", planMo: "/mois",
    vodTitle: "100 000+ films & séries à la demande",
    vodSub: "Nouveau contenu chaque semaine. Regardez quand vous voulez.",
    vodStats: [
      { v: "100k+", l: "Films & séries" },
      { v: "20k+", l: "Chaînes live" },
      { v: "4K UHD", l: "Qualité max" },
      { v: "< 10 min", l: "Activation" },
    ],
    compareTitle: "Pourquoi nous choisir ?",
    compareSub: "Comparaison vs services traditionnels",
    compareHeaders: ["Service", "Prix/mois", "Live", "VOD", "4K", "Support"],
    compareRows: [
      { s: "Netflix Premium", p: "21,99 €", live: "0", vod: true, hd: true, sup: "Chat" },
      { s: "Disney+ Premium", p: "13,99 €", live: "0", vod: true, hd: true, sup: "Chat" },
      { s: "Canal+ Total", p: "39,99 €", live: "~80", vod: true, hd: true, sup: "Chat" },
      { s: "Best IPTV VIP", p: "dès 8,25 $", live: "20k+", vod: true, hd: true, sup: "WhatsApp", hi: true },
    ],
    channelsTitle: "Aperçu des chaînes",
    channelsSub: "Choisissez une région",
    channelsMore: "…et 20 000+ autres",
    channelsRegions: [
      { name: "USA & Canada", channels: ["ESPN HD", "NBC", "CBS HD", "FOX Sports", "HBO", "AMC", "TSN", "Sportsnet"] },
      { name: "UK & Irlande", channels: ["BBC One HD", "Sky Sports HD", "BT Sport 4K", "ITV HD", "Sky Cinema"] },
      { name: "Europe", channels: ["Canal+ 4K", "beIN Sports", "RAI 1", "ZDF HD", "TF1", "DAZN", "Movistar+"] },
      { name: "MENA & Asie", channels: ["MBC 1", "Al Jazeera", "beIN Arabic 4K", "OSN", "Star Plus", "Zee TV"] },
      { name: "LATAM & Afrique", channels: ["Telemundo", "Univision", "ESPN Latin", "SuperSport", "Globo Brasil"] },
    ],
    countriesTitle: "TV dans votre langue",
    countriesSub: "Choisissez votre pays — voyez les chaînes et commandez via WhatsApp",
    countriesHint: "👆 Cliquez sur un pays pour voir les chaînes",
    modalChannels: "📺 Chaînes incluses",
    modalPrice: "Prix : dès 8,25 $/mois",
    modalPriceSub: "Toutes les chaînes • Essai gratuit 24h • Sans engagement",
    modalOrder: (n) => `💬 Commander ${n} — WhatsApp`,
    modalTrial: "🧪 Essai gratuit 24h",
    devicesTitle: "Compatible avec tous vos appareils",
    devicesSub: "Installez sur jusqu'à 3 appareils.",
    devices: [
      { ic: "📺", n: "Smart TV" },
      { ic: "🔥", n: "Firestick" },
      { ic: "📱", n: "iPhone" },
      { ic: "🤖", n: "Android" },
      { ic: "💻", n: "PC / Mac" },
      { ic: "📡", n: "MAG Box" },
    ],
    reviewsTitle: "Ce que disent nos clients",
    reviewsSub: "Avis de clients VIP dans le monde",
    reviews: [
      { name: "John M.", city: "New York", stars: 5, plan: "3 mois", text: "Installation en 10 min. ESPN, NFL et HBO en 4K. J'économise 80 $/mois vs câble." },
      { name: "Fatima A.", city: "Dubaï", stars: 5, plan: "6 mois", text: "Toutes les chaînes arabes plus international. MBC, beIN — qualité excellente." },
      { name: "Mohammed K.", city: "Londres", stars: 5, plan: "12 mois", text: "TiviMate immédiat. 4K sur Firestick sans buffering. Meilleur IPTV en 3 ans." },
    ],
    setupTitle: "Installation en 10 minutes",
    setupSub: "Fonctionne sur Firestick, Smart TV, iPhone, Android.",
    setupSteps: [
      { n: "1", t: "Contactez-nous sur WhatsApp — indiquez votre appareil." },
      { n: "2", t: "Choisissez votre offre et payez en sécurité." },
      { n: "3", t: "Recevez le lien M3U + guide. Regardez en 10 min." },
    ],
    setupCta: "Obtenir l'aide installation",
    faqTitle: "Questions fréquentes",
    faqs: [
      { q: "Quelles chaînes sont incluses ?", a: "Toutes les grandes : ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF — 20 000+ en HD/4K." },
      { q: "Compatible TiviMate / IPTV Smarters ?", a: "Oui. TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. Lien M3U envoyé via WhatsApp." },
      { q: "Quels appareils ?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac." },
      { q: "Activation rapide ?", a: "Habituellement 5 à 10 min après commande WhatsApp, même le week-end." },
      { q: "EPG inclus ?", a: "Oui. Guide EPG complet inclus dans toutes les offres." },
      { q: "Fonctionne dans mon pays ?", a: "Oui — mondialement. USA, UK, Canada, Europe, MENA, Asie, LATAM, Afrique, Océanie." },
      { q: "Comment payer ?", a: "Via WhatsApp. Nous acceptons PayPal, carte, crypto, virement." },
      { q: "Chaînes sport ?", a: "Oui ! Premier League, La Liga, Champions League, NBA, NFL, UFC, F1." },
      { q: "Puis-je annuler ?", a: "Aucun engagement. Vous payez une fois, le service expire automatiquement." },
    ],
    footerRights: "Tous droits réservés.",
    footerNote: "Optimisé pour un streaming rapide et stable mondialement.",
    whatsappGeneric: "Bonjour Best IPTV VIP ! J'ai besoin d'aide.",
    whatsappTrial: "Bonjour Best IPTV VIP, je veux un essai gratuit 24h",
    whatsappOrder: (p, pr) => `Bonjour Best IPTV VIP ! Je veux commander ${p} (${pr} $).`,
  },
  ar: {
    status: "النظام: متصل • دعم WhatsApp فوري",
    urgency: "🎁 سعر الإطلاق مضمون — تجربة مجانية 24 ساعة",
    navPlans: "الباقات", navChannels: "القنوات", navCountries: "الدول", navDevices: "الأجهزة", navFaq: "الأسئلة", navWhatsapp: "واتساب",
    heroPill: "دعم واتساب • 4K UHD • +20,000 قناة",
    heroTitle1: "IPTV الأول عالمياً",
    heroTitle2: "سريع. مستقر. بسيط.",
    heroLead: "توقف عن دفع الكثير للكابل. +20,000 قناة، رياضة بريميوم، أفلام و+100,000 مسلسل — من 14 دولار شهرياً.",
    heroBtnPlans: "شاهد الأسعار", heroBtnTrial: "تجربة مجانية 24 ساعة",
    heroTrust: "⭐⭐⭐⭐⭐ 4.9/5 من +12,000 عميل • ضمان الرضا",
    trialBadge: "تجربة مجانية",
    trialTitle: "جرب مجاناً 24 ساعة",
    trialDesc: "بدون بطاقة ائتمان. تواصل معنا على واتساب وجرب على Firestick أو Smart TV أو Android أو iPhone.",
    trialNote: "بدون عقد. بدون رسوم تلقائية.",
    trialCta: "اطلب التجربة المجانية",
    trustTitle: "خدمة عالمية آمنة وبسيطة",
    trustItems: [
      { ic: "🧪", t: "تجربة 24 ساعة", d: "بدون بطاقة. صفر مخاطرة." },
      { ic: "⚡", t: "تفعيل < 10 دقائق", d: "فوراً عبر واتساب." },
      { ic: "💬", t: "دعم واتساب", d: "رد سريع، كل يوم." },
      { ic: "🛡️", t: "ضمان الرضا", d: "غير راضٍ؟ تواصل معنا خلال 24 ساعة." },
      { ic: "📺", t: "4K في كل الباقات", d: "بدون رسوم إضافية." },
      { ic: "🌐", t: "يعمل عالمياً", d: "متوافق مع كل المزودين." },
    ],
    plansTitle: "اختر باقتك",
    plansSub: "كل الباقات تشمل +20,000 قناة، VOD، EPG ودعم واتساب.",
    planNames: { p1: "شهر واحد", p3: "3 أشهر", p6: "6 أشهر", p12: "12 شهر" },
    planPerks: {
      p1: ["+20,000 قناة مباشرة", "جودة 4K/UHD", "EPG مدرج", "دعم واتساب", "بدون عقد"],
      p3: ["الأكثر شعبية", "+20,000 قناة", "+100,000 فيلم ومسلسل", "دعم بأولوية", "تثبيت موجه"],
      p6: ["أفضل قيمة", "+20,000 قناة", "أجهزة متعددة", "EPG + Catch-up", "كل القنوات"],
      p12: ["القيمة القصوى", "وصول VIP بريميوم", "+20,000 قناة", "دعم VIP 24/7", "تحديثات مجانية"],
    },
    planOrder: "اطلب عبر واتساب", planSave: "وفر", planBest: "الأكثر مبيعاً",
    planBilled: "مفوتر", planTotal: "دفعة واحدة", planMo: "/شهر",
    vodTitle: "+100,000 فيلم ومسلسل عند الطلب",
    vodSub: "محتوى جديد كل أسبوع. شاهد متى تشاء.",
    vodStats: [
      { v: "+100k", l: "أفلام ومسلسلات" },
      { v: "+20k", l: "قنوات مباشرة" },
      { v: "4K UHD", l: "أعلى جودة" },
      { v: "< 10 د", l: "التفعيل" },
    ],
    compareTitle: "لماذا تختارنا؟",
    compareSub: "مقارنة مع الخدمات التقليدية",
    compareHeaders: ["الخدمة", "السعر/شهر", "مباشر", "VOD", "4K", "الدعم"],
    compareRows: [
      { s: "Netflix Premium", p: "$22.99", live: "0", vod: true, hd: true, sup: "دردشة" },
      { s: "Disney+ Premium", p: "$15.99", live: "0", vod: true, hd: true, sup: "دردشة" },
      { s: "OSN+", p: "$15.99", live: "~80", vod: true, hd: true, sup: "دردشة" },
      { s: "Best IPTV VIP", p: "من $8.25", live: "+20k", vod: true, hd: true, sup: "واتساب", hi: true },
    ],
    channelsTitle: "استكشف القنوات",
    channelsSub: "اختر منطقة",
    channelsMore: "…و+20,000 قناة أخرى",
    channelsRegions: [
      { name: "USA & Canada", channels: ["ESPN HD", "NBC", "CBS HD", "FOX Sports", "HBO", "AMC", "TSN"] },
      { name: "UK & Ireland", channels: ["BBC One HD", "Sky Sports HD", "BT Sport 4K", "ITV HD", "Sky Cinema"] },
      { name: "Europe", channels: ["Canal+ 4K", "beIN Sports", "RAI 1", "ZDF HD", "TF1", "DAZN"] },
      { name: "MENA & Asia", channels: ["MBC 1", "Al Jazeera", "beIN Arabic 4K", "OSN", "Star Plus"] },
      { name: "LATAM & Africa", channels: ["Telemundo", "Univision", "ESPN Latin", "SuperSport"] },
    ],
    countriesTitle: "تلفاز بلغتك",
    countriesSub: "اختر بلدك — شاهد القنوات واطلب عبر واتساب",
    countriesHint: "👆 اضغط على بلد لمشاهدة القنوات",
    modalChannels: "📺 القنوات المدرجة",
    modalPrice: "السعر: من $8.25/شهر",
    modalPriceSub: "كل القنوات • تجربة 24 ساعة • بدون عقد",
    modalOrder: (n) => `💬 اطلب ${n} — واتساب`,
    modalTrial: "🧪 تجربة 24 ساعة",
    devicesTitle: "يعمل على كل أجهزتك",
    devicesSub: "ثبت على ما يصل إلى 3 أجهزة.",
    devices: [
      { ic: "📺", n: "Smart TV" },
      { ic: "🔥", n: "Firestick" },
      { ic: "📱", n: "iPhone" },
      { ic: "🤖", n: "Android" },
      { ic: "💻", n: "PC / Mac" },
      { ic: "📡", n: "MAG Box" },
    ],
    reviewsTitle: "ماذا يقول العملاء",
    reviewsSub: "آراء عملاء VIP حول العالم",
    reviews: [
      { name: "جون م.", city: "نيويورك", stars: 5, plan: "3 أشهر", text: "التثبيت 10 دقائق. ESPN و NFL و HBO بـ 4K. أوفر 80 دولار شهرياً." },
      { name: "فاطمة أ.", city: "دبي", stars: 5, plan: "6 أشهر", text: "كل القنوات العربية ومحتوى دولي. MBC و beIN — جودة ممتازة." },
      { name: "محمد ك.", city: "لندن", stars: 5, plan: "12 شهر", text: "TiviMate يعمل فوراً. 4K بدون تقطيع. أفضل IPTV في 3 سنوات." },
    ],
    setupTitle: "التثبيت في 10 دقائق",
    setupSub: "يعمل على Firestick, Smart TV, iPhone, Android.",
    setupSteps: [
      { n: "1", t: "تواصل معنا على واتساب — أخبرنا بجهازك." },
      { n: "2", t: "اختر باقتك وأكمل الدفع بأمان." },
      { n: "3", t: "استلم رابط M3U + دليل. شاهد في 10 دقائق." },
    ],
    setupCta: "احصل على المساعدة الآن",
    faqTitle: "الأسئلة الشائعة",
    faqs: [
      { q: "ما هي القنوات المدرجة؟", a: "كل القنوات الكبرى: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC — +20,000 في HD/4K." },
      { q: "متوافق مع TiviMate / IPTV Smarters؟", a: "نعم. TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. رابط M3U عبر واتساب." },
      { q: "أي أجهزة؟", a: "Firestick, Smart TV, Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac." },
      { q: "سرعة التفعيل؟", a: "عادة 5-10 دقائق بعد الطلب على واتساب." },
      { q: "EPG مدرج؟", a: "نعم. دليل EPG كامل في كل الباقات." },
      { q: "يعمل في بلدي؟", a: "نعم — عالمياً. USA, UK, Canada, Europe, MENA, Asia, LATAM, Africa." },
      { q: "كيف أدفع؟", a: "عبر واتساب. PayPal, بطاقة, عملات رقمية, تحويل." },
      { q: "قنوات رياضية؟", a: "نعم! Premier League, La Liga, Champions, NBA, NFL, UFC, F1." },
      { q: "هل يمكنني الإلغاء؟", a: "بدون عقد. تدفع مرة واحدة، الخدمة تنتهي تلقائياً." },
    ],
    footerRights: "كل الحقوق محفوظة.",
    footerNote: "محسن للبث السريع والمستقر عالمياً.",
    whatsappGeneric: "مرحباً Best IPTV VIP! أحتاج مساعدة.",
    whatsappTrial: "مرحباً Best IPTV VIP، أريد تجربة مجانية 24 ساعة",
    whatsappOrder: (p, pr) => `مرحباً Best IPTV VIP! أريد طلب ${p} ($${pr}).`,
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
    <div className="modal-overlay" onClick={(e) => {
      if ((e.target as HTMLElement).classList.contains("modal-overlay")) onClose();
    }}>
      <div className="modal-box">
        <div className="modal-head">
          <span className="modal-flag">{country.flag}</span>
          <div className="modal-tb">
            <h2>{country.name}</h2>
            <p>{country.desc}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">{t.modalChannels} ({country.channels.length}+)</div>
            <div className="modal-channels">
              {country.channels.map(ch => (
                <div key={ch} className="modal-chip">
                  <span className="modal-chip-name">{ch}</span>
                  <span>📺</span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-price">
            <span style={{ fontSize: 22 }}>💰</span>
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
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
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

  const productSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.brand} — Premium Worldwide IPTV`,
    brand: { "@type": "Brand", name: SITE.brand },
    description: "20,000+ live channels, 100,000+ movies & series, 4K UHD, EPG. Activation in 10 min via WhatsApp.",
    image: `${SITE.domain}/icon-512.png`,
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "12000", bestRating: "5" },
    offers: PLANS.map(p => ({
      "@type": "Offer", name: t.planNames[p.key],
      price: String(p.price), priceCurrency: "USD",
      availability: "https://schema.org/InStock", url: SITE.domain,
    })),
  }), [t]);

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }), [t]);

  const navLinks = [
    { href: "#plans", label: t.navPlans },
    { href: "#channels", label: t.navChannels },
    { href: "#countries", label: t.navCountries },
    { href: "#devices", label: t.navDevices },
    { href: "#faq", label: t.navFaq },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-glow" />

      {/* Top status */}
      <div className="topbar">
        <div className="topbar-inner">
          <span><span className="dot-live" /> {t.status}</span>
          <span className="urgency">{t.urgency}</span>
        </div>
      </div>

      {/* Header */}
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
            {menuOpen ? "✕" : "☰"}
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
            💬 WhatsApp
          </a>
        </div>
      )}

      <main id="top" className="wrap">
        {/* Hero */}
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

        {/* Trial banner */}
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

        {/* Trust */}
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

        {/* Plans */}
        <section id="plans" className="section">
          <div className="section-head">
            <h2>{t.plansTitle}</h2>
            <p>{t.plansSub}</p>
          </div>
          <div className="plans-grid">
            {PLANS.map(p => {
              const perMo = (p.price / p.months);
              const display = perMo.toFixed(2).replace(/\.00$/, "");
              const save = Math.round((1 - perMo / 14) * 100);
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
                      <li key={perk}><span className="check">✓</span> {perk}</li>
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

        {/* VOD stats */}
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

        {/* Compare */}
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
                    <td>{r.hi && "✓ "}{r.s}</td>
                    <td>{r.p}</td>
                    <td>{r.live}</td>
                    <td style={{ color: r.vod ? "#22c55e" : "#ef4444" }}>{r.vod ? "✓" : "✗"}</td>
                    <td style={{ color: r.hd ? "#22c55e" : "#ef4444" }}>{r.hd ? "✓" : "✗"}</td>
                    <td>{r.sup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Channels */}
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
                <div key={c} className="ch">▶ {c}</div>
              ))}
              <div className="ch ch-more">{t.channelsMore}</div>
            </div>
          </div>
        </section>

        {/* Countries */}
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
                <span className="country-arrow">›</span>
              </button>
            ))}
          </div>
        </section>

        {/* Devices */}
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

        {/* Reviews */}
        <section className="section">
          <div className="section-head">
            <h2>{t.reviewsTitle}</h2>
            <p>{t.reviewsSub}</p>
          </div>
          <div className="reviews-grid">
            {t.reviews.map((r, i) => (
              <article key={i} className="review">
                <div className="review-stars">{"⭐".repeat(r.stars)}</div>
                <p>&ldquo;{r.text}&rdquo;</p>
                <div className="review-meta">
                  <span className="review-name">{r.name}</span>
                  <span className="review-city">— {r.city}</span>
                  <span className="review-plan">{r.plan}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Setup */}
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

        {/* FAQ */}
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
        <p>© {new Date().getFullYear()} {SITE.brand}. {t.footerRights}</p>
        <p style={{ marginTop: 6 }}>{t.footerNote}</p>
        <div className="footer-links">
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="#plans">{t.navPlans}</a>
          <a href="#faq">{t.navFaq}</a>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a className="fab" href={waLink(t.whatsappGeneric, ua, "FAB")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        💬
      </a>

      {/* Country modal */}
      {selectedCountry && (
        <CountryModal country={selectedCountry} lang={lang} ua={ua} onClose={() => setSelectedCountry(null)} />
      )}
    </>
  );
}
