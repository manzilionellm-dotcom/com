import type { CountrySlug } from "../site";

export type CountryPage = {
  slug: CountrySlug;
  name: string;
  hero: string;
  flag: string;
  description: string;
  channelsHero: string[];
  sportsChannels: string[];
  newsChannels: string[];
  entertainmentChannels: string[];
  kidsChannels: string[];
  vodHighlights: string[];
  faq: { q: string; a: string }[];
};

export const COUNTRY_PAGES: Record<CountrySlug, CountryPage> = {
  arabic: {
    slug: "arabic",
    name: "Arabic IPTV (MENA)",
    flag: "🇸🇦",
    hero: "Best Arabic IPTV — MBC, beIN, OSN, Rotana, Al Jazeera in 4K",
    description:
      "Premium Arabic IPTV with 3,500+ MENA channels — MBC, beIN Sports 4K, OSN, Rotana, Al Jazeera, Dubai TV and Abu Dhabi, with full Arabic EPG and 7-day catch-up.",
    channelsHero: ["MBC 1 HD", "MBC 2 HD", "MBC Drama", "MBC Action", "MBC Max", "MBC Bollywood"],
    sportsChannels: ["beIN Sports 1 4K", "beIN Sports 2 4K", "beIN Sports MAX", "Abu Dhabi Sports", "Dubai Sports", "Saudi Sports", "Al Kass HD"],
    newsChannels: ["Al Jazeera HD", "Al Jazeera English", "Al Arabiya HD", "Sky News Arabia", "BBC Arabic", "France 24 Arabic", "Al Hadath"],
    entertainmentChannels: ["Rotana Cinema", "Rotana Classic", "Rotana Drama", "Rotana Khalijia", "OSN First", "OSN Movies", "ART Aflam", "ART Cinema"],
    kidsChannels: ["MBC 3", "Spacetoon", "Cartoon Network Arabic", "Baraem", "Jeem TV"],
    vodHighlights: ["Latest Arabic series Ramadan 2026", "Egyptian classic cinema", "Turkish drama dubbed in Arabic", "Khaleeji series", "Islamic content & Quran TV"],
    faq: [
      { q: "Do you have beIN Sports 4K?", a: "Yes — all beIN Sports premium channels in 4K UHD, including Champions League, La Liga, Premier League." },
      { q: "Does it work in Saudi Arabia, UAE, Kuwait?", a: "Yes — works perfectly in all GCC countries. We recommend a stable 25 Mbps connection." },
      { q: "Arabic EPG included?", a: "Yes — full Arabic Electronic Programme Guide for 7 days in advance." },
    ],
  },
  english: {
    slug: "english",
    name: "English IPTV (USA / UK)",
    flag: "🇺🇸",
    hero: "Best English IPTV — ESPN, NFL, Sky Sports, HBO, BBC, FOX",
    description:
      "Premium USA and UK IPTV with 4,000+ English channels — ESPN, NFL Network, NBA TV, Sky Sports, BT Sport 4K, HBO, BBC One HD and ITV HD, with full EPG and catch-up.",
    channelsHero: ["ESPN HD", "Sky Sports Main Event 4K", "BBC One HD", "HBO Max", "Netflix US Mirror", "Disney+"],
    sportsChannels: ["ESPN", "ESPN 2", "NFL Network", "NBA TV", "MLB Network", "FOX Sports 1", "Sky Sports Premier League", "BT Sport 4K", "TNT Sports UK", "TSN Canada"],
    newsChannels: ["CNN", "Fox News", "MSNBC", "BBC News", "Sky News UK", "CNBC", "Bloomberg"],
    entertainmentChannels: ["HBO", "AMC", "FX", "Showtime", "Starz", "Sky Cinema", "Sky Atlantic", "Channel 4"],
    kidsChannels: ["Cartoon Network", "Nickelodeon", "Disney Channel", "Boomerang", "CBeebies"],
    vodHighlights: ["Latest Netflix releases", "HBO Max originals", "Premier League replays", "NBA full games on demand", "British drama box-sets"],
    faq: [
      { q: "Does it have NFL Sunday Ticket and Premier League?", a: "Yes — all NFL games, Sunday Ticket, Premier League, NBA, MLB, NHL, UFC, PPV included." },
      { q: "Can I watch HBO Max and Showtime?", a: "Yes — HBO, Showtime, Starz, AMC+ premium channels with VOD library." },
      { q: "Does it work in USA, UK, Ireland, Canada, Australia?", a: "Yes — works worldwide with any ISP. No VPN required." },
    ],
  },
  french: {
    slug: "french",
    name: "French IPTV (France / Belgique / Suisse)",
    flag: "🇫🇷",
    hero: "Meilleur IPTV Français — Canal+, beIN, RMC Sport, TF1",
    description:
      "IPTV français premium avec 2,500+ chaînes — Canal+ 4K, Canal+ Sport, beIN Sports, RMC Sport, TF1, M6, France 2/3/4/5, OCS et BFM TV. EPG complet et replay 7 jours.",
    channelsHero: ["Canal+ 4K", "TF1 HD", "France 2 HD", "M6 HD", "beIN Sports 1", "RMC Sport 1"],
    sportsChannels: ["Canal+ Sport", "beIN Sports 1/2/3", "RMC Sport 1/2/3/4", "L'Équipe", "Eurosport 1/2", "Multisports"],
    newsChannels: ["BFM TV", "CNEWS", "LCI", "France Info", "TV5 Monde"],
    entertainmentChannels: ["Canal+", "Canal+ Cinéma", "OCS Max", "OCS City", "TF1 Séries Films", "6ter", "TFX"],
    kidsChannels: ["Gulli", "Canal J", "Tiji", "Boomerang", "Disney Channel France"],
    vodHighlights: ["Films français récents", "Séries Canal+ Créations Originales", "Replay TF1 / M6 / France TV", "Documentaires Arte"],
    faq: [
      { q: "Canal+ Sport et beIN Sports inclus ?", a: "Oui — toutes les chaînes Canal+ Sport, beIN Sports 1/2/3, RMC Sport 1-4 en HD/4K." },
      { q: "Fonctionne en France, Belgique, Suisse, Maroc, Algérie ?", a: "Oui — partout dans le monde francophone avec n'importe quel opérateur." },
      { q: "EPG français inclus ?", a: "Oui — guide TV français complet sur 7 jours avec replay." },
    ],
  },
  spanish: {
    slug: "spanish",
    name: "Spanish IPTV (España / LATAM)",
    flag: "🇪🇸",
    hero: "Mejor IPTV Español — LaLiga, Movistar, DAZN, TVE",
    description:
      "IPTV español premium con 2,000+ canales — LaLiga TV, Movistar+, DAZN España, TVE 1, Antena 3, Telecinco, Univision, Telemundo. Cobertura completa España y LATAM.",
    channelsHero: ["LaLiga TV 4K", "Movistar+ Liga", "DAZN ES", "TVE 1 HD", "Antena 3 HD", "Telecinco HD"],
    sportsChannels: ["LaLiga TV", "Movistar Liga de Campeones", "DAZN La Liga", "DAZN F1", "Movistar Deportes", "Eurosport ES"],
    newsChannels: ["TVE 24h", "Antena 3 Noticias", "La Sexta Noticias", "TeleSur", "CNN Español"],
    entertainmentChannels: ["Antena 3", "Telecinco", "Cuatro", "La Sexta", "FOX España", "AXN", "Movistar Series"],
    kidsChannels: ["Clan TVE", "Boing", "Disney Channel ES", "Cartoon Network ES"],
    vodHighlights: ["Películas españolas estreno", "Series Movistar+ originales", "Telenovelas latinoamericanas", "Fútbol LaLiga catch-up 7 días"],
    faq: [
      { q: "¿Incluye LaLiga y Champions?", a: "Sí — LaLiga TV completa, Champions League, Copa del Rey, F1, MotoGP en HD/4K." },
      { q: "¿Funciona en España, México, Argentina, Colombia?", a: "Sí — funciona en todo el mundo hispanohablante." },
    ],
  },
  turkish: {
    slug: "turkish",
    name: "Turkish IPTV (Türkiye)",
    flag: "🇹🇷",
    hero: "En İyi Türk IPTV — beIN Sports, TRT, Show TV, Kanal D",
    description:
      "Premium Türk IPTV — 1,500+ kanal: TRT 1 HD, Show TV, Kanal D, Star TV, ATV, beIN Sports Türkiye, A Spor. Tüm Süper Lig, Avrupa Kupası, Türk dizileri ve filmleri.",
    channelsHero: ["TRT 1 HD", "Show TV", "Kanal D", "Star TV", "ATV", "beIN Sports 1 TR"],
    sportsChannels: ["beIN Sports 1/2/3/4 TR", "S Sport", "A Spor", "TRT Spor", "Tivibu Spor"],
    newsChannels: ["TRT Haber", "CNN Türk", "NTV", "Haber Türk", "A Haber"],
    entertainmentChannels: ["Show TV", "Kanal D", "Star TV", "FOX Türkiye", "TLC", "Dizimax"],
    kidsChannels: ["TRT Çocuk", "Cartoon Network TR", "Nickelodeon TR", "Disney Channel TR"],
    vodHighlights: ["Türk dizileri en yeni bölümler", "BluTV / Exxen içerikleri", "Türk filmleri klasik & yeni"],
    faq: [
      { q: "Süper Lig ve Avrupa Kupası dahil mi?", a: "Evet — tüm beIN Sports Türkiye kanalları, S Sport, Tivibu Spor dahil." },
      { q: "Türkiye dışında çalışır mı?", a: "Evet — Almanya, Hollanda, Fransa, ABD'deki Türk gurbetçiler için mükemmel." },
    ],
  },
  indian: {
    slug: "indian",
    name: "Indian IPTV (Hindi / Tamil / Telugu)",
    flag: "🇮🇳",
    hero: "Best Indian IPTV — Star, Sony, Zee, Colors, Hotstar",
    description:
      "Premium Indian IPTV with 2,500+ channels — Star Plus HD, Sony, Zee TV, Colors, Star Sports and Aaj Tak, plus Hindi, Tamil, Telugu and Punjabi Bollywood VOD.",
    channelsHero: ["Star Plus HD", "Sony Entertainment HD", "Zee TV HD", "Colors HD", "Star Sports 1 HD", "Sony SAB"],
    sportsChannels: ["Star Sports 1/2/3 HD", "Sony Six", "Sony Ten 1/2/3", "DSport", "Eurosport India"],
    newsChannels: ["Aaj Tak", "NDTV 24x7", "Times Now", "Republic TV", "India Today"],
    entertainmentChannels: ["Star Plus", "Zee TV", "Sony Entertainment", "Colors", "&TV", "Sony SAB", "Star Bharat"],
    kidsChannels: ["Cartoon Network India", "Pogo", "Nick India", "Disney India", "Hungama"],
    vodHighlights: ["Latest Bollywood movies", "Star Plus serials catch-up", "Tamil Sun TV content", "Telugu ETV", "Punjabi PTC"],
    faq: [
      { q: "Tamil, Telugu, Malayalam kanaal includ?", a: "Yes — Sun TV, ETV, Asianet, Surya TV, Mazhavil Manorama all in HD." },
      { q: "Cricket matches included (IPL, T20)?", a: "Yes — all Star Sports cricket, IPL live, T20 World Cup, Test matches in HD." },
    ],
  },
  german: {
    slug: "german",
    name: "German IPTV (Deutschland / Österreich / Schweiz)",
    flag: "🇩🇪",
    hero: "Bestes IPTV Deutschland — Sky Bundesliga, DAZN, ZDF, RTL",
    description:
      "Premium IPTV Deutschland — 1,800+ Sender: ZDF HD, ARD HD, RTL, Pro7, Sat.1, Sky Bundesliga, DAZN, Sport1. Volle Bundesliga, Champions League, DFB-Pokal Abdeckung.",
    channelsHero: ["ZDF HD", "ARD HD", "RTL HD", "Pro7 HD", "Sat.1 HD", "Sky Bundesliga 4K"],
    sportsChannels: ["Sky Bundesliga 1-10", "Sky Sport News", "DAZN 1/2", "Sport1", "Eurosport 1/2 DE"],
    newsChannels: ["ZDF Heute", "Tagesschau 24", "N-TV", "Welt", "Phoenix"],
    entertainmentChannels: ["RTL", "Pro7", "Sat.1", "Vox", "Kabel 1", "Sky One", "Sky Atlantic"],
    kidsChannels: ["KiKA", "Super RTL", "Disney Channel DE", "Nickelodeon DE"],
    vodHighlights: ["Sky Originals deutsche Serien", "Tatort Mediathek", "ZDF Mediathek Inhalte", "Bundesliga Highlights"],
    faq: [
      { q: "Sky Bundesliga und DAZN enthalten?", a: "Ja — alle Sky Bundesliga Kanäle in 4K, plus DAZN 1 & 2 für Champions League." },
      { q: "Funktioniert in Deutschland, Österreich, Schweiz?", a: "Ja — funktioniert in DACH-Region und weltweit mit jedem Internetanbieter." },
    ],
  },
  african: {
    slug: "african",
    name: "African IPTV (Afrique francophone & anglophone)",
    flag: "🌍",
    hero: "Best African IPTV — Canal+ Afrique, SuperSport, RTS, NTA",
    description:
      "Premium African IPTV with 1,200+ channels for francophone and anglophone Africa — Canal+ Afrique, SuperSport, RTS Sénégal, TFM, NTA Nigeria and Nollywood TV.",
    channelsHero: ["Canal+ Afrique", "SuperSport Premier League", "RTS 1 Sénégal", "TFM Sénégal", "AFROTV", "NTA Nigeria"],
    sportsChannels: ["SuperSport 1/2/3", "Canal+ Sport Afrique", "beIN Sports Afrique", "Eurosport Africa"],
    newsChannels: ["Africa 24", "Africanews", "TV5 Monde Afrique", "France 24", "BBC Africa", "CGTN Africa"],
    entertainmentChannels: ["Canal+ Afrique", "Nollywood TV", "AFROTV", "Trace Africa", "Novelas TV"],
    kidsChannels: ["Tiji Afrique", "Disney Channel Afrique", "JimJam"],
    vodHighlights: ["Films Nollywood récents", "Séries africaines francophones", "Documentaires sur l'Afrique"],
    faq: [
      { q: "Canal+ Afrique inclus ?", a: "Oui — bouquet Canal+ Afrique complet : Canal+ Sport, Cinéma, Family, Décalé." },
      { q: "Fonctionne au Sénégal, Côte d'Ivoire, Maroc, Nigeria ?", a: "Oui — partout en Afrique avec une connexion 10 Mbps minimum." },
    ],
  },
};
