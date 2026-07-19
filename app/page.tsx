"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  SITE as SITE_CFG,
  LEGAL,
  PLANS,
  LOWEST_MONTHLY,
  monthlyPrice,
  planSavings,
  fmtCount,
  waLink as waLinkShared,
  type Plan,
  type PlanKey,
} from "../lib/site";
import { track, buildWhatsAppText } from "../lib/analytics";
import CookieSettingsLink from "../components/CookieSettingsLink";
import trendingData from "../lib/content/trending.json";

/* ============================================================
   Types
   ============================================================ */
type Locale = "en" | "fr" | "ar";

type TrendingItem = {
  rank: number;
  title: string;
  kind: string;
  hue: number;
  uhd: boolean;
  live: boolean;
  poster: string;
};
const TRENDING = (trendingData.items as TrendingItem[]);

type Country = {
  slug: string;
  flag: string;
  name: string;
  sub: string;
  desc: string;
  channels: string[];
};

/* ============================================================
   Site config (numbers all come from lib/site.ts)
   ============================================================ */
const SITE = {
  brand: SITE_CFG.brand,
  domain: SITE_CFG.domain,
  whatsapp: SITE_CFG.whatsapp,
} as const;

const lowestDisplay = LOWEST_MONTHLY % 1 === 0 ? String(LOWEST_MONTHLY) : LOWEST_MONTHLY.toFixed(2);

/* ============================================================
   Devices grouped by category → each links to its install guide
   ============================================================ */
type DeviceCat = { key: string; items: { n: string; slug: string; ic: string }[] };
const DEVICE_CATS: DeviceCat[] = [
  { key: "tv", items: [
    { n: "Smart TV", slug: "smart-tv", ic: "📺" },
    { n: "Firestick", slug: "firestick", ic: "🔥" },
    { n: "Android TV", slug: "android", ic: "🤖" },
  ] },
  { key: "computer", items: [
    { n: "PC Windows", slug: "pc-mac", ic: "🖥️" },
    { n: "Mac", slug: "pc-mac", ic: "💻" },
  ] },
  { key: "mobile", items: [
    { n: "iPhone / iPad", slug: "ios", ic: "📱" },
    { n: "Android", slug: "android", ic: "📲" },
  ] },
  { key: "box", items: [
    { n: "MAG Box", slug: "mag-box", ic: "📡" },
    { n: "Android Box", slug: "android", ic: "🗳️" },
  ] },
];

/* ============================================================
   Countries (8 — top demand) — "TV in your language"
   ============================================================ */
const COUNTRIES: Country[] = [
  { slug: "arabic", flag: "🇸🇦", name: "العربية", sub: "MBC, Al Jazeera, beIN",
    desc: "MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.",
    channels: ["MBC 1", "MBC 2", "MBC Drama", "MBC Action", "Al Jazeera", "Al Arabiya", "beIN Sports 1 4K", "beIN Sports 2", "OSN Sports", "Rotana Cinema", "Dubai TV", "Saudi 1", "BBC Arabic", "Nile Drama"] },
  { slug: "english", flag: "🇺🇸", name: "English (US/UK)", sub: "ESPN, BBC, Sky Sports",
    desc: "ESPN, BBC, Sky Sports, BT Sport 4K, HBO, AMC.",
    channels: ["ESPN HD", "NBC", "CBS HD", "FOX Sports", "HBO", "AMC", "BBC One HD", "Sky Sports HD", "BT Sport 4K", "ITV HD", "Sky Cinema", "TNT Sports"] },
  { slug: "french", flag: "🇫🇷", name: "Français", sub: "Canal+, beIN, TF1",
    desc: "Canal+, beIN Sports, TF1, M6.",
    channels: ["Canal+ 4K", "Canal+ Sport", "beIN Sports 1", "beIN Sports 2", "TF1", "M6", "France 2", "France 3", "BFM TV", "RMC Sport", "OCS", "Disney+"] },
  { slug: "spanish", flag: "🇪🇸", name: "Español", sub: "TVE, LaLiga, Movistar",
    desc: "TVE, Antena 3, LaLiga, Movistar+.",
    channels: ["TVE 1", "Antena 3", "Telecinco", "Cuatro", "LaLiga TV", "Movistar+", "DAZN ES", "ESPN Latin", "Univision"] },
  { slug: "turkish", flag: "🇹🇷", name: "Türkçe", sub: "TRT, Kanal D, beIN",
    desc: "TRT, Show TV, Kanal D, ATV, beIN Sports TR.",
    channels: ["TRT 1", "Show TV", "Kanal D", "Star TV", "ATV", "FOX Türkiye", "TRT Spor", "beIN Sports TR", "A Spor"] },
  { slug: "indian", flag: "🇮🇳", name: "हिंदी", sub: "Star Plus, Zee, Sony",
    desc: "Star Plus, Zee TV, Sony, Colors, Bollywood.",
    channels: ["Star Plus HD", "Zee TV", "Sony Entertainment", "Colors TV", "Star Sports 1", "Aaj Tak", "Zee Cinema", "Star Gold"] },
  { slug: "german", flag: "🇩🇪", name: "Deutsch", sub: "ZDF, Sky, RTL, Pro7",
    desc: "ZDF, RTL, Pro7, Sky Bundesliga, DAZN.",
    channels: ["ZDF HD", "ARD", "RTL", "Pro7", "Sat.1", "Sky Bundesliga", "DAZN DE", "Sport1"] },
  { slug: "african", flag: "🌍", name: "Afrique", sub: "Canal+, RTS, AFROTV",
    desc: "Canal+ Afrique, RTS Sénégal, Nollywood.",
    channels: ["Canal+ Afrique", "RTS 1 Sénégal", "TFM Sénégal", "AFROTV", "NTA Nigeria", "Africa 24", "Nollywood TV", "SuperSport Africa"] },
];

/* ============================================================
   Dictionary — EN / FR / AR (UI text only; NUMBERS come from
   the central config and are interpolated at render time)
   ============================================================ */
type Copy = {
  status: string;
  urgency: string;
  nav: { plans: string; trending: string; devices: string; faq: string; countries: string };
  heroTitle: string;
  heroPriceFrom: string;
  heroPricePer: string;
  heroNoEngage: string;
  heroCta: string;
  heroLegal: string;
  trustRated: string;         // "{n}/5 on {source}" prefix — composed with numbers
  trustRatedSuffix: string;
  trustGuarantee: string;
  trustActivation: string;
  top10Title: string;
  top10Sub: string;
  badgeLive: string;
  badgeUhd: string;
  kinds: Record<string, string>;
  plansTitle: string;
  plansSub: string;
  planNames: Record<PlanKey, string>;
  recommended: string;
  save: string;
  billed: string;
  oneTime: string;
  perMo: string;
  cmpVideo: string;
  cmpDevices: string;
  cmpDevicesUnit: string;
  cmpVod: string;
  cmpEpg: string;
  cmpCatchup: string;
  cmpSupport: string;
  support: { standard: string; priority: string; vip: string };
  planOrder: string;
  benefitsTitle: string;
  benefits: { ic: string; t: string; d: string }[];
  devicesTitle: string;
  devicesSub: string;
  deviceCats: Record<string, string>;
  deviceGuide: string;
  countriesTitle: string;
  countriesSub: string;
  countriesHint: string;
  modalChannels: string;
  modalOrder: (n: string) => string;
  modalTrial: string;
  reviewsTitle: string;
  reviewsSub: string;
  reviews: { name: string; city: string; stars: number; plan: string; text: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  footerNote: string;
  footerCols: { service: string; guides: string; regions: string; company: string; legal: string };
  footerLinks: {
    service: { href: string; label: string }[];
    guides: { href: string; label: string }[];
    regions: { href: string; label: string }[];
    company: { href: string; label: string }[];
    legal: { href: string; label: string }[];
  };
  langLabel: string;
  cookieSettings: string;
  legalTitle: string;
  legalCompany: string;
  legalReg: string;
  legalAddress: string;
  legalEmail: string;
  legalTodo: string;
  footerRights: string;
  whatsappGeneric: string;
  whatsappTrial: string;
  whatsappOrder: (p: string, pr: number) => string;
};

const dict: Record<Locale, Copy> = {
  en: {
    status: "System: Online · Instant WhatsApp support",
    urgency: `🎁 Free ${SITE_CFG.trialHours}h trial · Launch price guaranteed`,
    nav: { plans: "Plans", trending: "Top 10", devices: "Devices", faq: "FAQ", countries: "Languages" },
    heroTitle: "All the world's TV. One subscription.",
    heroPriceFrom: "From",
    heroPricePer: "/month",
    heroNoEngage: "No contract — cancel whenever you want.",
    heroCta: "Start your free 24h trial",
    heroLegal: `Free ${SITE_CFG.trialHours}-hour trial, no card required. Paid plans are one-time payments — no auto-renewal, cancel anytime.`,
    trustRated: "Rated",
    trustRatedSuffix: "on",
    trustGuarantee: "Satisfaction guarantee",
    trustActivation: "Activation",
    top10Title: "Top 10 trending this week",
    top10Sub: "A taste of the catalogue — live sport, blockbusters, series & more.",
    badgeLive: "LIVE",
    badgeUhd: "4K",
    kinds: { sport: "Sport", film: "Movies", series: "Series", kids: "Kids", doc: "Docs", news: "News" },
    plansTitle: "Choose your plan",
    plansSub: "Same premium catalogue on every plan. Pay once — no contract.",
    planNames: { p1: "1 Month", p3: "3 Months", p6: "6 Months", p12: "12 Months" },
    recommended: "RECOMMENDED",
    save: "SAVE",
    billed: "Billed",
    oneTime: "one-time",
    perMo: "/mo",
    cmpVideo: "Video quality",
    cmpDevices: "Simultaneous devices",
    cmpDevicesUnit: "device(s)",
    cmpVod: "Movies & series (VOD)",
    cmpEpg: "EPG guide",
    cmpCatchup: "7-day catch-up",
    cmpSupport: "Support",
    support: { standard: "WhatsApp", priority: "Priority", vip: "VIP 24/7" },
    planOrder: "Order via WhatsApp",
    benefitsTitle: "Why Best IPTV VIP",
    benefits: [
      { ic: "🌐", t: "A massive catalogue", d: "Live channels, sports, movies and series in 4K UHD — all in one place." },
      { ic: "📲", t: "All your devices", d: "Smart TV, Firestick, mobile, computer, MAG box — install in minutes." },
      { ic: "⚡", t: "Simple setup", d: "Order on WhatsApp, get your line, and start watching in under 10 minutes." },
    ],
    devicesTitle: "Works on every device",
    devicesSub: "Pick your device and follow its step-by-step install guide.",
    deviceCats: { tv: "TV", computer: "Computer", mobile: "Mobile & Tablet", box: "Consoles / Box" },
    deviceGuide: "Install guide",
    countriesTitle: "TV in your language",
    countriesSub: "Pick your region — see channels and order on WhatsApp.",
    countriesHint: "👆 Tap a language to see channels",
    modalChannels: "📺 Channels included",
    modalOrder: (n) => `💬 Order ${n} — WhatsApp`,
    modalTrial: "🧪 Free 24h trial",
    reviewsTitle: "What customers say",
    reviewsSub: "Reviews from VIP customers worldwide",
    reviews: [
      { name: "John M.", city: "New York", stars: 5, plan: "3 months", text: "Setup took 10 minutes. ESPN, NFL and HBO in 4K. Saving $80/month vs cable." },
      { name: "Fatima A.", city: "Dubai", stars: 5, plan: "6 months", text: "All Arabic channels plus international content. MBC, beIN — excellent quality." },
      { name: "Mohammed K.", city: "London", stars: 5, plan: "12 months", text: "TiviMate worked instantly. 4K on Firestick, no buffering. Best IPTV in 3 years." },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Which channels are included?", a: "All major worldwide: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF — plus thousands more in HD/4K." },
      { q: "Compatible with TiviMate / IPTV Smarters?", a: "Yes. We support TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. M3U link sent via WhatsApp." },
      { q: "Which devices?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac." },
      { q: "How fast is activation?", a: "Usually 5–10 minutes after your WhatsApp order, even on weekends." },
      { q: "Is EPG included?", a: "Yes. Full Electronic Programme Guide included on all plans." },
      { q: "Does it work in my country?", a: "Yes — worldwide. USA, UK, Canada, Europe, MENA, Asia, LATAM, Africa, Oceania." },
      { q: "How do I pay?", a: "Card or crypto at checkout, or PayPal / bank transfer via WhatsApp." },
      { q: "Can I cancel?", a: "No contract. Pay once, the service expires automatically." },
    ],
    footerNote: "Premium worldwide IPTV, optimized for fast and stable streaming.",
    footerCols: { service: "Service", guides: "Install guides", regions: "By region", company: "Company", legal: "Legal" },
    footerLinks: {
      service: [
        { href: "/pricing", label: "Pricing" },
        { href: "/free-trial", label: "Free 24h trial" },
        { href: "/channels", label: "All channels" },
        { href: "/devices", label: "Compatible devices" },
        { href: "/status", label: "Network status" },
      ],
      guides: [
        { href: "/guides/firestick", label: "Firestick" },
        { href: "/guides/smart-tv", label: "Smart TV" },
        { href: "/guides/android", label: "Android TV" },
        { href: "/guides/ios", label: "iPhone / iPad" },
        { href: "/guides/mag-box", label: "MAG Box" },
        { href: "/guides/pc-mac", label: "PC / Mac" },
      ],
      regions: [
        { href: "/channels/english", label: "English (US/UK)" },
        { href: "/channels/french", label: "French IPTV" },
        { href: "/channels/arabic", label: "Arabic IPTV" },
        { href: "/channels/spanish", label: "Spanish IPTV" },
        { href: "/channels/german", label: "German IPTV" },
        { href: "/channels/turkish", label: "Turkish IPTV" },
      ],
      company: [
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
        { href: "/compare", label: "Comparisons" },
      ],
      legal: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/refund", label: "Refund Policy" },
      ],
    },
    langLabel: "Language",
    cookieSettings: "Cookie settings",
    legalTitle: "Company details",
    legalCompany: "Registered name",
    legalReg: "Registration",
    legalAddress: "Address",
    legalEmail: "Email",
    legalTodo: "To be completed",
    footerRights: "All rights reserved.",
    whatsappGeneric: "Hi Best IPTV VIP! I need help.",
    whatsappTrial: "Hi Best IPTV VIP, I want a 24H free trial",
    whatsappOrder: (p, pr) => `Hi Best IPTV VIP! I want to order ${p} ($${pr}). Help me start.`,
  },
  fr: {
    status: "Système : En ligne · Support WhatsApp instantané",
    urgency: `🎁 Essai gratuit ${SITE_CFG.trialHours}h · Prix de lancement garanti`,
    nav: { plans: "Offres", trending: "Top 10", devices: "Appareils", faq: "FAQ", countries: "Langues" },
    heroTitle: "Toute la TV du monde. Un seul abonnement.",
    heroPriceFrom: "Dès",
    heroPricePer: "/mois",
    heroNoEngage: "Sans engagement — annulez quand vous voulez.",
    heroCta: "Démarrer l'essai gratuit 24h",
    heroLegal: `Essai gratuit de ${SITE_CFG.trialHours}h, sans carte bancaire. Les offres sont des paiements uniques — sans reconduction automatique, résiliables à tout moment.`,
    trustRated: "Noté",
    trustRatedSuffix: "sur",
    trustGuarantee: "Garantie satisfaction",
    trustActivation: "Activation",
    top10Title: "Top 10 tendances cette semaine",
    top10Sub: "Un aperçu du catalogue — sport en direct, blockbusters, séries et plus.",
    badgeLive: "DIRECT",
    badgeUhd: "4K",
    kinds: { sport: "Sport", film: "Films", series: "Séries", kids: "Jeunesse", doc: "Docs", news: "Infos" },
    plansTitle: "Choisissez votre offre",
    plansSub: "Le même catalogue premium sur chaque offre. Paiement unique — sans engagement.",
    planNames: { p1: "1 mois", p3: "3 mois", p6: "6 mois", p12: "12 mois" },
    recommended: "RECOMMANDÉ",
    save: "ÉCO",
    billed: "Facturé",
    oneTime: "paiement unique",
    perMo: "/mois",
    cmpVideo: "Qualité vidéo",
    cmpDevices: "Appareils simultanés",
    cmpDevicesUnit: "appareil(s)",
    cmpVod: "Films & séries (VOD)",
    cmpEpg: "Guide EPG",
    cmpCatchup: "Replay 7 jours",
    cmpSupport: "Support",
    support: { standard: "WhatsApp", priority: "Prioritaire", vip: "VIP 24/7" },
    planOrder: "Commander via WhatsApp",
    benefitsTitle: "Pourquoi Best IPTV VIP",
    benefits: [
      { ic: "🌐", t: "Un catalogue immense", d: "Chaînes en direct, sport, films et séries en 4K UHD — le tout au même endroit." },
      { ic: "📲", t: "Tous vos appareils", d: "Smart TV, Firestick, mobile, ordinateur, box MAG — installez en quelques minutes." },
      { ic: "⚡", t: "Installation simple", d: "Commandez sur WhatsApp, recevez votre ligne et regardez en moins de 10 minutes." },
    ],
    devicesTitle: "Compatible avec tous les appareils",
    devicesSub: "Choisissez votre appareil et suivez son guide d'installation pas à pas.",
    deviceCats: { tv: "TV", computer: "Ordinateur", mobile: "Mobile & Tablette", box: "Consoles / Box" },
    deviceGuide: "Guide d'installation",
    countriesTitle: "La TV dans votre langue",
    countriesSub: "Choisissez votre région — voyez les chaînes et commandez sur WhatsApp.",
    countriesHint: "👆 Cliquez sur une langue pour voir les chaînes",
    modalChannels: "📺 Chaînes incluses",
    modalOrder: (n) => `💬 Commander ${n} — WhatsApp`,
    modalTrial: "🧪 Essai gratuit 24h",
    reviewsTitle: "Ce que disent nos clients",
    reviewsSub: "Avis de clients VIP dans le monde",
    reviews: [
      { name: "John M.", city: "New York", stars: 5, plan: "3 mois", text: "Installation en 10 min. ESPN, NFL et HBO en 4K. J'économise 80 $/mois vs câble." },
      { name: "Fatima A.", city: "Dubaï", stars: 5, plan: "6 mois", text: "Toutes les chaînes arabes plus international. MBC, beIN — qualité excellente." },
      { name: "Mohammed K.", city: "Londres", stars: 5, plan: "12 mois", text: "TiviMate immédiat. 4K sur Firestick sans buffering. Meilleur IPTV en 3 ans." },
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      { q: "Quelles chaînes sont incluses ?", a: "Toutes les grandes : ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF — et des milliers d'autres en HD/4K." },
      { q: "Compatible TiviMate / IPTV Smarters ?", a: "Oui. TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. Lien M3U envoyé via WhatsApp." },
      { q: "Quels appareils ?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac." },
      { q: "Activation rapide ?", a: "Habituellement 5 à 10 minutes après commande WhatsApp, même le week-end." },
      { q: "EPG inclus ?", a: "Oui. Guide EPG complet inclus dans toutes les offres." },
      { q: "Fonctionne dans mon pays ?", a: "Oui — mondialement. USA, UK, Canada, Europe, MENA, Asie, LATAM, Afrique, Océanie." },
      { q: "Comment payer ?", a: "Carte ou crypto au paiement, ou PayPal / virement via WhatsApp." },
      { q: "Puis-je annuler ?", a: "Aucun engagement. Vous payez une fois, le service expire automatiquement." },
    ],
    footerNote: "IPTV premium mondial, optimisé pour un streaming rapide et stable.",
    footerCols: { service: "Service", guides: "Guides d'installation", regions: "Par région", company: "Entreprise", legal: "Légal" },
    footerLinks: {
      service: [
        { href: "/pricing", label: "Tarifs" },
        { href: "/free-trial", label: "Essai gratuit 24h" },
        { href: "/channels", label: "Toutes les chaînes" },
        { href: "/devices", label: "Appareils compatibles" },
        { href: "/status", label: "État du réseau" },
      ],
      guides: [
        { href: "/guides/firestick", label: "Firestick" },
        { href: "/guides/smart-tv", label: "Smart TV" },
        { href: "/guides/android", label: "Android TV" },
        { href: "/guides/ios", label: "iPhone / iPad" },
        { href: "/guides/mag-box", label: "MAG Box" },
        { href: "/guides/pc-mac", label: "PC / Mac" },
      ],
      regions: [
        { href: "/channels/english", label: "IPTV anglais" },
        { href: "/channels/french", label: "IPTV français" },
        { href: "/channels/arabic", label: "IPTV arabe" },
        { href: "/channels/spanish", label: "IPTV espagnol" },
        { href: "/channels/german", label: "IPTV allemand" },
        { href: "/channels/turkish", label: "IPTV turc" },
      ],
      company: [
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
        { href: "/compare", label: "Comparatifs" },
      ],
      legal: [
        { href: "/privacy", label: "Confidentialité" },
        { href: "/terms", label: "Conditions" },
        { href: "/refund", label: "Remboursement" },
      ],
    },
    langLabel: "Langue",
    cookieSettings: "Paramètres cookies",
    legalTitle: "Identité légale",
    legalCompany: "Raison sociale",
    legalReg: "Immatriculation",
    legalAddress: "Adresse",
    legalEmail: "Email",
    legalTodo: "À compléter",
    footerRights: "Tous droits réservés.",
    whatsappGeneric: "Bonjour Best IPTV VIP ! J'ai besoin d'aide.",
    whatsappTrial: "Bonjour Best IPTV VIP, je veux un essai gratuit 24h",
    whatsappOrder: (p, pr) => `Bonjour Best IPTV VIP ! Je veux commander ${p} (${pr} $).`,
  },
  ar: {
    status: "النظام: متصل · دعم واتساب فوري",
    urgency: `🎁 تجربة مجانية ${SITE_CFG.trialHours} ساعة · سعر الإطلاق مضمون`,
    nav: { plans: "الباقات", trending: "الأكثر رواجاً", devices: "الأجهزة", faq: "الأسئلة", countries: "اللغات" },
    heroTitle: "كل تلفزيون العالم. اشتراك واحد.",
    heroPriceFrom: "من",
    heroPricePer: "/شهر",
    heroNoEngage: "بدون عقد — ألغِ متى شئت.",
    heroCta: "ابدأ التجربة المجانية 24 ساعة",
    heroLegal: `تجربة مجانية لمدة ${SITE_CFG.trialHours} ساعة، بدون بطاقة. الباقات مدفوعة لمرة واحدة — بدون تجديد تلقائي، يمكن الإلغاء في أي وقت.`,
    trustRated: "تقييم",
    trustRatedSuffix: "على",
    trustGuarantee: "ضمان الرضا",
    trustActivation: "التفعيل",
    top10Title: "الأكثر رواجاً هذا الأسبوع",
    top10Sub: "لمحة عن المكتبة — رياضة مباشرة، أفلام ضخمة، مسلسلات والمزيد.",
    badgeLive: "مباشر",
    badgeUhd: "4K",
    kinds: { sport: "رياضة", film: "أفلام", series: "مسلسلات", kids: "أطفال", doc: "وثائقي", news: "أخبار" },
    plansTitle: "اختر باقتك",
    plansSub: "نفس المكتبة المميزة في كل باقة. دفعة واحدة — بدون عقد.",
    planNames: { p1: "شهر واحد", p3: "3 أشهر", p6: "6 أشهر", p12: "12 شهر" },
    recommended: "موصى به",
    save: "وفّر",
    billed: "مفوتر",
    oneTime: "دفعة واحدة",
    perMo: "/شهر",
    cmpVideo: "جودة الفيديو",
    cmpDevices: "أجهزة متزامنة",
    cmpDevicesUnit: "جهاز",
    cmpVod: "أفلام ومسلسلات (VOD)",
    cmpEpg: "دليل EPG",
    cmpCatchup: "إعادة 7 أيام",
    cmpSupport: "الدعم",
    support: { standard: "واتساب", priority: "أولوية", vip: "VIP 24/7" },
    planOrder: "اطلب عبر واتساب",
    benefitsTitle: "لماذا Best IPTV VIP",
    benefits: [
      { ic: "🌐", t: "مكتبة ضخمة", d: "قنوات مباشرة ورياضة وأفلام ومسلسلات بدقة 4K UHD — كلها في مكان واحد." },
      { ic: "📲", t: "كل أجهزتك", d: "Smart TV، Firestick، الجوال، الكمبيوتر، جهاز MAG — التثبيت في دقائق." },
      { ic: "⚡", t: "تثبيت بسيط", d: "اطلب على واتساب، استلم خطك، وشاهد في أقل من 10 دقائق." },
    ],
    devicesTitle: "يعمل على كل جهاز",
    devicesSub: "اختر جهازك واتبع دليل التثبيت خطوة بخطوة.",
    deviceCats: { tv: "تلفاز", computer: "كمبيوتر", mobile: "جوال ولوحي", box: "أجهزة / بوكس" },
    deviceGuide: "دليل التثبيت",
    countriesTitle: "التلفاز بلغتك",
    countriesSub: "اختر منطقتك — شاهد القنوات واطلب عبر واتساب.",
    countriesHint: "👆 اضغط على لغة لمشاهدة القنوات",
    modalChannels: "📺 القنوات المدرجة",
    modalOrder: (n) => `💬 اطلب ${n} — واتساب`,
    modalTrial: "🧪 تجربة مجانية 24 ساعة",
    reviewsTitle: "ماذا يقول العملاء",
    reviewsSub: "آراء عملاء VIP حول العالم",
    reviews: [
      { name: "جون م.", city: "نيويورك", stars: 5, plan: "3 أشهر", text: "التثبيت 10 دقائق. ESPN و NFL و HBO بـ 4K. أوفر 80 دولار شهرياً." },
      { name: "فاطمة أ.", city: "دبي", stars: 5, plan: "6 أشهر", text: "كل القنوات العربية ومحتوى دولي. MBC و beIN — جودة ممتازة." },
      { name: "محمد ك.", city: "لندن", stars: 5, plan: "12 شهر", text: "TiviMate يعمل فوراً. 4K بدون تقطيع. أفضل IPTV في 3 سنوات." },
    ],
    faqTitle: "الأسئلة الشائعة",
    faqs: [
      { q: "ما هي القنوات المدرجة؟", a: "كل القنوات الكبرى: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC — وآلاف أخرى في HD/4K." },
      { q: "متوافق مع TiviMate / IPTV Smarters؟", a: "نعم. TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. رابط M3U عبر واتساب." },
      { q: "أي أجهزة؟", a: "Firestick, Smart TV, Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac." },
      { q: "سرعة التفعيل؟", a: "عادة 5-10 دقائق بعد الطلب على واتساب." },
      { q: "EPG مدرج؟", a: "نعم. دليل EPG كامل في كل الباقات." },
      { q: "يعمل في بلدي؟", a: "نعم — عالمياً. USA, UK, Canada, Europe, MENA, Asia, LATAM, Africa." },
      { q: "كيف أدفع؟", a: "بطاقة أو عملات رقمية عند الدفع، أو PayPal / تحويل عبر واتساب." },
      { q: "هل يمكنني الإلغاء؟", a: "بدون عقد. تدفع مرة واحدة، الخدمة تنتهي تلقائياً." },
    ],
    footerNote: "IPTV مميز عالمياً، محسّن لبث سريع ومستقر.",
    footerCols: { service: "الخدمة", guides: "أدلة التثبيت", regions: "حسب المنطقة", company: "الشركة", legal: "قانوني" },
    footerLinks: {
      service: [
        { href: "/pricing", label: "الأسعار" },
        { href: "/free-trial", label: "تجربة مجانية 24 ساعة" },
        { href: "/channels", label: "كل القنوات" },
        { href: "/devices", label: "الأجهزة المتوافقة" },
        { href: "/status", label: "حالة الشبكة" },
      ],
      guides: [
        { href: "/guides/firestick", label: "Firestick" },
        { href: "/guides/smart-tv", label: "Smart TV" },
        { href: "/guides/android", label: "Android TV" },
        { href: "/guides/ios", label: "iPhone / iPad" },
        { href: "/guides/mag-box", label: "MAG Box" },
        { href: "/guides/pc-mac", label: "PC / Mac" },
      ],
      regions: [
        { href: "/channels/english", label: "IPTV إنجليزي" },
        { href: "/channels/french", label: "IPTV فرنسي" },
        { href: "/channels/arabic", label: "IPTV عربي" },
        { href: "/channels/spanish", label: "IPTV إسباني" },
        { href: "/channels/german", label: "IPTV ألماني" },
        { href: "/channels/turkish", label: "IPTV تركي" },
      ],
      company: [
        { href: "/blog", label: "المدونة" },
        { href: "/contact", label: "اتصل بنا" },
        { href: "/compare", label: "المقارنات" },
      ],
      legal: [
        { href: "/privacy", label: "الخصوصية" },
        { href: "/terms", label: "الشروط" },
        { href: "/refund", label: "الاسترداد" },
      ],
    },
    langLabel: "اللغة",
    cookieSettings: "إعدادات ملفات الارتباط",
    legalTitle: "الهوية القانونية",
    legalCompany: "الاسم المسجل",
    legalReg: "رقم التسجيل",
    legalAddress: "العنوان",
    legalEmail: "البريد",
    legalTodo: "بانتظار الاستكمال",
    footerRights: "كل الحقوق محفوظة.",
    whatsappGeneric: "مرحباً Best IPTV VIP! أحتاج مساعدة.",
    whatsappTrial: "مرحباً Best IPTV VIP، أريد تجربة مجانية 24 ساعة",
    whatsappOrder: (p, pr) => `مرحباً Best IPTV VIP! أريد طلب ${p} ($${pr}).`,
  },
};

/* ============================================================
   Helpers
   ============================================================ */
function waClick(
  event: "whatsapp_click" | "trial_request" | "cta_click",
  source: string,
  message: string,
  meta: Record<string, unknown> = {},
) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    track(event, { source, label: message, ...meta });
    if (typeof window !== "undefined") {
      const url = `https://wa.me/${SITE_CFG.whatsapp}?text=${encodeURIComponent(
        buildWhatsAppText(message, source),
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
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
   Country modal
   ============================================================ */
function CountryModal({ country, lang, onClose }: { country: Country; lang: Locale; onClose: () => void }) {
  const t = dict[lang];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="country-modal-title"
      onClick={(e) => { if ((e.target as HTMLElement).classList.contains("modal-overlay")) onClose(); }}
    >
      <div className="modal-box">
        <div className="modal-head">
          <span className="modal-flag" aria-hidden="true">{country.flag}</span>
          <div className="modal-tb">
            <h2 id="country-modal-title">{country.name}</h2>
            <p>{country.desc}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close" type="button">
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">{t.modalChannels} ({country.channels.length}+)</div>
            <div className="modal-channels">
              {country.channels.map(ch => (
                <div key={ch} className="modal-chip">
                  <span className="modal-chip-name">{ch}</span>
                  <span aria-hidden="true">📺</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <a
            className="btn btn-green"
            href={waLinkShared(`Hi! I want ${country.name} channels.`, `Country-${country.slug}`)}
            target="_blank"
            rel="noreferrer"
            onClick={waClick("cta_click", `home-country-${country.slug}-order`, `Hi! I want ${country.name} channels.`, { country: country.slug })}
          >
            {t.modalOrder(country.name)}
          </a>
          <a
            className="btn btn-ghost"
            href={waLinkShared(`${t.whatsappTrial} (${country.name})`, `Trial-${country.slug}`)}
            target="_blank"
            rel="noreferrer"
            onClick={waClick("trial_request", `home-country-${country.slug}-trial`, `${t.whatsappTrial} (${country.name})`, { country: country.slug })}
          >
            {t.modalTrial}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Poster tile — CSS-generated placeholder (or real WebP).
   NOTE(missing-data): drop WebP thumbnails into /public and set
   `poster` in trending.json to swap the gradient for real art.
   ============================================================ */
function PosterTile({ hue, title, poster }: { hue: number; title: string; poster: string }) {
  if (poster) {
    return <img className="poster-img" src={poster} alt={title} loading="lazy" decoding="async" width={160} height={240} />;
  }
  return (
    <div
      className="poster-css"
      aria-hidden="true"
      style={{
        background: `linear-gradient(150deg, hsl(${hue} 55% 22%), hsl(${(hue + 40) % 360} 48% 10%))`,
      }}
    >
      <span className="poster-mono" style={{ color: `hsl(${hue} 60% 65%)` }}>
        {title.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()}
      </span>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Page() {
  const [lang, setLang] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const detected = detectLang();
    setLang(detected);
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

  const navLinks: { href: string; label: string; external?: boolean }[] = [
    { href: "/pricing", label: t.nav.plans, external: true },
    { href: "#trending", label: t.nav.trending },
    { href: "/devices", label: t.nav.devices, external: true },
    { href: "#countries", label: t.nav.countries },
    { href: "#faq", label: t.nav.faq },
  ];

  const channelsFmt = fmtCount(SITE_CFG.channelsCount, lang);
  const vodFmt = fmtCount(SITE_CFG.vodCount, lang);
  const ratingFmt = fmtCount(SITE_CFG.ratingValue, lang);

  return (
    <>
      <div className="bg-glow" aria-hidden="true" />

      {/* Top status */}
      <div className="topbar">
        <div className="topbar-inner">
          <span><span className="dot-live" aria-hidden="true" /> {t.status}</span>
          <span className="urgency">{t.urgency}</span>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <nav className="nav" aria-label="Primary">
          <a href="#top" className="brand">
            <span className="brand-logo" aria-hidden="true">B</span>
            <span className="brand-text">BEST IPTV <b>VIP</b></span>
          </a>
          <div className="nav-links">
            {navLinks.map(l => l.external
              ? <Link key={l.href} href={l.href}>{l.label}</Link>
              : <a key={l.href} href={l.href}>{l.label}</a>
            )}
          </div>
          <div className="lang-switch desktop-only" role="group" aria-label={t.langLabel}>
            {(["en", "fr", "ar"] as Locale[]).map(l => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)} aria-pressed={lang === l} lang={l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            type="button"
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)} role="dialog" aria-label="Mobile menu">
          {navLinks.map(l => l.external
            ? <Link key={l.href} href={l.href}>{l.label}</Link>
            : <a key={l.href} href={l.href}>{l.label}</a>
          )}
          <div className="mobile-lang">
            {(["en", "fr", "ar"] as Locale[]).map(l => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setLang(l); setMenuOpen(false); }} lang={l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <main id="top">
        {/* ===== SECTION 1 — HERO (poster wall) ===== */}
        <section className="hero-v2" aria-labelledby="hero-title">
          <div className="poster-wall" aria-hidden="true">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="poster-wall-tile"
                style={{ background: `linear-gradient(160deg, hsl(${(i * 47) % 360} 45% 18%), hsl(${(i * 47 + 30) % 360} 40% 8%))` }}
              />
            ))}
          </div>
          <div className="hero-v2-inner wrap">
            <span className="hero-pill">{t.status}</span>
            <h1 id="hero-title">{t.heroTitle}</h1>
            <p className="hero-v2-sub">
              <strong>{t.heroPriceFrom} ${lowestDisplay}{t.heroPricePer}</strong> · {t.heroNoEngage}
            </p>
            <div className="hero-v2-cta">
              <a
                className="btn btn-gold btn-lg"
                href={waLinkShared(t.whatsappTrial, "Hero-Trial")}
                target="_blank"
                rel="noreferrer noopener"
                onClick={waClick("trial_request", "hero-trial", t.whatsappTrial)}
              >
                {t.heroCta}
              </a>
            </div>
            <p className="hero-legal">{t.heroLegal}</p>

            {/* Trust bar */}
            <div className="trust-bar" role="list">
              <div className="trust-bar-item" role="listitem">
                <span className="trust-stars" aria-hidden="true">★★★★★</span>
                {SITE_CFG.reviewSourceUrl ? (
                  <a href={SITE_CFG.reviewSourceUrl} target="_blank" rel="noreferrer noopener nofollow" className="trust-link">
                    {t.trustRated} <b>{ratingFmt}/5</b> {t.trustRatedSuffix} {SITE_CFG.reviewSourceName}
                  </a>
                ) : (
                  <span>{t.trustRated} <b>{ratingFmt}/5</b></span>
                )}
              </div>
              <div className="trust-bar-item" role="listitem">
                <span aria-hidden="true">🛡️</span> {t.trustGuarantee}
              </div>
              <div className="trust-bar-item" role="listitem">
                <span aria-hidden="true">⚡</span> {t.trustActivation} &lt; {SITE_CFG.activationMinutes} min
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          {/* ===== SECTION 2 — TOP 10 / TRENDING ===== */}
          <section id="trending" className="section" aria-labelledby="trending-title">
            <div className="section-head">
              <h2 id="trending-title">{t.top10Title}</h2>
              <p>{t.top10Sub}</p>
            </div>
            <ul className="top10-row" aria-label={t.top10Title}>
              {TRENDING.map((item) => (
                <li key={item.rank} className="top10-item">
                  <Link
                    href="/channels"
                    className="top10-link"
                    aria-label={`#${item.rank} ${item.title} — ${t.kinds[item.kind] ?? item.kind}`}
                    onClick={() => track("cta_click", { source: "home-top10", label: item.title })}
                  >
                    <span className="top10-rank" aria-hidden="true">{item.rank}</span>
                    <div className="top10-poster">
                      <PosterTile hue={item.hue} title={item.title} poster={item.poster} />
                      <div className="top10-badges" aria-hidden="true">
                        {item.uhd && <span className="badge-uhd">{t.badgeUhd}</span>}
                        {item.live && <span className="badge-live">{t.badgeLive}</span>}
                      </div>
                    </div>
                    <div className="top10-meta">
                      <span className="top10-title">{item.title}</span>
                      <span className="top10-kind">{t.kinds[item.kind] ?? item.kind}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="top10-note">
              {channelsFmt}+ · {vodFmt}+ VOD · 4K UHD
            </p>
          </section>

          {/* ===== SECTION 3 — PLANS (comparative) ===== */}
          <section id="plans" className="section" aria-labelledby="plans-title">
            <div className="section-head">
              <h2 id="plans-title">{t.plansTitle}</h2>
              <p>{t.plansSub}</p>
            </div>
            <div className="plans-grid">
              {PLANS.map((p: Plan) => {
                const save = planSavings(p);
                const rows: { label: string; value: React.ReactNode }[] = [
                  { label: t.cmpVideo, value: "4K UHD" },
                  { label: t.cmpDevices, value: `${p.simultaneousDevices} ${t.cmpDevicesUnit}` },
                  { label: t.cmpVod, value: <span className="cmp-yes" aria-label="yes">✓</span> },
                  { label: t.cmpEpg, value: <span className="cmp-yes" aria-label="yes">✓</span> },
                  { label: t.cmpCatchup, value: p.catchup ? <span className="cmp-yes" aria-label="yes">✓</span> : <span className="cmp-no" aria-label="no">—</span> },
                  { label: t.cmpSupport, value: t.support[p.supportTier] },
                ];
                return (
                  <article key={p.key} className={`plan ${p.recommended ? "highlight" : ""}`}>
                    {p.recommended
                      ? <div className="plan-badge">{t.recommended}</div>
                      : save > 0 && <div className="plan-badge plan-badge-save">{t.save} {save}%</div>}
                    <div className="plan-head">
                      <h3>{t.planNames[p.key]}</h3>
                    </div>
                    <div className="plan-price">
                      <span className="cur">$</span>
                      <span className="num">{monthlyPrice(p)}</span>
                      <span className="per">{t.perMo}</span>
                    </div>
                    <div className="plan-billed">
                      {t.billed} ${p.price}{p.months > 1 && ` · ${t.oneTime}`}
                    </div>
                    <dl className="plan-cmp">
                      {rows.map((r) => (
                        <div key={r.label} className="plan-cmp-row">
                          <dt>{r.label}</dt>
                          <dd>{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <a
                      className={`btn ${p.recommended ? "btn-gold" : "btn-white"} plan-cta btn-block`}
                      href={waLinkShared(t.whatsappOrder(t.planNames[p.key], p.price), `Plan-${p.key}`)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={waClick("cta_click", `home-plan-${p.key}`, t.whatsappOrder(t.planNames[p.key], p.price), { plan: p.key, value: p.price, currency: "USD" })}
                    >
                      {t.planOrder}
                    </a>
                  </article>
                );
              })}
            </div>
            <p className="plans-foot">
              <Link href="/pricing" onClick={() => track("cta_click", { source: "home-plans-seeall", label: "pricing" })}>
                {t.nav.plans} →
              </Link>
            </p>
          </section>

          {/* ===== SECTION 4 — THREE BENEFITS ===== */}
          <section className="section" aria-labelledby="benefits-title">
            <div className="section-head"><h2 id="benefits-title">{t.benefitsTitle}</h2></div>
            <div className="benefits-grid">
              {t.benefits.map((b) => (
                <div key={b.t} className="benefit-card">
                  <div className="benefit-ic" aria-hidden="true">{b.ic}</div>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== SECTION 5 — DEVICES BY CATEGORY ===== */}
          <section id="devices" className="section" aria-labelledby="devices-title">
            <div className="section-head">
              <h2 id="devices-title">{t.devicesTitle}</h2>
              <p>{t.devicesSub}</p>
            </div>
            <div className="device-cats">
              {DEVICE_CATS.map((cat) => (
                <div key={cat.key} className="device-cat">
                  <h3 className="device-cat-title">{t.deviceCats[cat.key]}</h3>
                  <ul className="device-cat-list">
                    {cat.items.map((d) => (
                      <li key={d.n}>
                        <Link
                          href={`/guides/${d.slug}`}
                          className="device-link"
                          onClick={() => track("device_view", { source: "home-devices", device: d.slug, label: d.n })}
                        >
                          <span className="device-ic" aria-hidden="true">{d.ic}</span>
                          <span className="device-name">{d.n}</span>
                          <span className="device-guide">{t.deviceGuide} →</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ===== "TV in your language" ===== */}
          <section id="countries" className="section" aria-labelledby="countries-title">
            <div className="section-head">
              <h2 id="countries-title">{t.countriesTitle}</h2>
              <p>{t.countriesSub}</p>
              <p className="countries-hint">{t.countriesHint}</p>
            </div>
            <div className="countries-grid">
              {COUNTRIES.map(c => (
                <button
                  key={c.slug}
                  className="country-card"
                  onClick={() => {
                    track("country_view", { source: "home-country-card", country: c.slug, label: c.name });
                    setSelectedCountry(c);
                  }}
                >
                  <span className="flag" aria-hidden="true">{c.flag}</span>
                  <div className="country-info">
                    <div className="country-name">{c.name}</div>
                    <div className="country-sub">{c.sub}</div>
                  </div>
                  <span className="country-arrow" aria-hidden="true">›</span>
                </button>
              ))}
            </div>
          </section>

          {/* ===== Reviews (social proof) ===== */}
          <section className="section" aria-labelledby="reviews-title">
            <div className="section-head">
              <h2 id="reviews-title">{t.reviewsTitle}</h2>
              <p>{t.reviewsSub}</p>
            </div>
            <div className="reviews-grid">
              {t.reviews.map((r, i) => (
                <article key={i} className="review">
                  <div className="review-stars" aria-label={`${r.stars} / 5`}>{"⭐".repeat(r.stars)}</div>
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

          {/* ===== SECTION 6 — FAQ ===== */}
          <section id="faq" className="section" aria-labelledby="faq-title">
            <div className="section-head"><h2 id="faq-title">{t.faqTitle}</h2></div>
            {t.faqs.map((f, i) => (
              <details
                key={i}
                className="faq-item"
                onToggle={(e) => {
                  if ((e.currentTarget as HTMLDetailsElement).open) {
                    track("faq_open", { source: "home-faq", label: f.q });
                  }
                }}
              >
                <summary className="faq-q">{f.q}</summary>
                <p className="faq-a">{f.a}</p>
              </details>
            ))}
          </section>
        </div>
      </main>

      {/* ===== SECTION 7 — RICH FOOTER ===== */}
      <footer className="footer-rich" role="contentinfo">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 10 }}>
              <span className="brand-logo" aria-hidden="true">B</span>
              <span className="brand-text">BEST IPTV <b>VIP</b></span>
            </div>
            <p className="footer-note-text">{t.footerNote}</p>
            {/* Language selector */}
            <div className="footer-lang" role="group" aria-label={t.langLabel}>
              <span className="footer-lang-label">{t.langLabel}:</span>
              {(["en", "fr", "ar"] as Locale[]).map(l => (
                <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)} aria-pressed={lang === l} lang={l}>
                  {l === "en" ? "EN" : l === "fr" ? "FR" : "AR"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5>{t.footerCols.service}</h5>
            <ul>{t.footerLinks.service.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h5>{t.footerCols.guides}</h5>
            <ul>{t.footerLinks.guides.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h5>{t.footerCols.regions}</h5>
            <ul>{t.footerLinks.regions.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h5>{t.footerCols.company}</h5>
            <ul>{t.footerLinks.company.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
            <h5 style={{ marginTop: 18 }}>{t.footerCols.legal}</h5>
            <ul>
              {t.footerLinks.legal.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
              <li><CookieSettingsLink label={t.cookieSettings} className="footer-linklike" /></li>
            </ul>
          </div>
        </div>

        {/* Legal identity block */}
        <div className="footer-legal">
          <h6>{t.legalTitle}</h6>
          <dl>
            <div><dt>{t.legalCompany}</dt><dd>{LEGAL.companyName || <em>{t.legalTodo}</em>}</dd></div>
            <div><dt>{t.legalReg}</dt><dd>{LEGAL.registration || <em>{t.legalTodo}</em>}</dd></div>
            <div><dt>{t.legalAddress}</dt><dd>{LEGAL.address || <em>{t.legalTodo}</em>}</dd></div>
            <div><dt>{t.legalEmail}</dt><dd><a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></dd></div>
          </dl>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {SITE.brand}. {t.footerRights}</p>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        className="fab"
        href={waLinkShared(t.whatsappGeneric, "FAB")}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        onClick={waClick("whatsapp_click", "home-fab", t.whatsappGeneric)}
      >
        <span aria-hidden="true">💬</span>
      </a>

      {/* Sticky mobile CTA — single primary action */}
      <div className="sticky-mobile-cta" role="region" aria-label="Quick actions">
        <a
          className="btn btn-gold"
          href={waLinkShared(t.whatsappTrial, "Sticky-CTA")}
          target="_blank"
          rel="noreferrer noopener"
          style={{ flex: 1, padding: "12px 14px", fontSize: 14 }}
          onClick={waClick("trial_request", "home-sticky-trial", t.whatsappTrial)}
        >
          {t.heroCta}
        </a>
      </div>

      {selectedCountry && (
        <CountryModal country={selectedCountry} lang={lang} onClose={() => setSelectedCountry(null)} />
      )}
    </>
  );
}
