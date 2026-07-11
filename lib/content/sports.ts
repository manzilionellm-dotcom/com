// Programmatic "how to watch [sport/league]" registry.
// Each entry generates a high-intent transactional landing page at
// /watch/[slug]. These target the single highest-intent IPTV query class —
// "how to watch <league> live / online / in 4K" — with extraction-friendly
// structure (direct answer block + FAQ) for AI Overviews and featured snippets.
//
// Content is deliberately differentiated per sport (real competitions, teams,
// broadcasters, season windows) so pages are not thin duplicates.

export type WatchGuide = {
  slug: string;
  /** Short label used in nav, cross-links and breadcrumbs. */
  short: string;
  /** Emoji used as a lightweight visual marker (no external assets). */
  icon: string;
  category: "Football" | "US Sports" | "Motorsport" | "Combat" | "Cricket" | "Tennis" | "Other";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One-paragraph direct answer for AI Overviews / featured snippets. */
  answer: string;
  /** Competitions / events bundled under this guide. */
  competitions: string[];
  /** Marquee teams, drivers or fighters — concrete entities for relevance. */
  highlights: string[];
  /** Broadcasters whose feeds this content typically airs on, worldwide. */
  broadcasters: string[];
  /** When the season / tournament runs — sets freshness + intent. */
  season: string;
  /** Sport-specific "why watch it on IPTV instead of X" bullets. */
  why: string[];
  faq: { q: string; a: string }[];
  /** Related guide slugs for internal linking. */
  related: string[];
};

const HOW_TO_INTRO =
  "with Best IPTV VIP on Firestick, Smart TV, Android, iPhone or MAG box";

export const WATCH_GUIDES: Record<string, WatchGuide> = {
  "premier-league": {
    slug: "premier-league",
    short: "Premier League",
    icon: "⚽",
    category: "Football",
    h1: "How to Watch the Premier League Live in 4K (2026)",
    metaTitle: "Watch Premier League Live in 4K — Every Match, No Blackouts (2026)",
    metaDescription:
      "Stream every Premier League match live in HD/4K on any device. All 380 games, no regional blackouts, no Sky/TNT bundle — from $5/month. Free 24h trial.",
    answer:
      "You can watch every Premier League match live by streaming the Sky Sports, TNT Sports and Amazon Prime feeds through Best IPTV VIP. Unlike a UK Sky bundle (£30+/month) you get all 380 games with no 3pm Saturday blackout, in HD or 4K, on Firestick, Smart TV or phone, from around $5/month. Activation takes under 10 minutes over WhatsApp.",
    competitions: ["Premier League", "FA Cup", "EFL Carabao Cup", "Community Shield"],
    highlights: ["Manchester City", "Arsenal", "Liverpool", "Manchester United", "Chelsea", "Tottenham"],
    broadcasters: ["Sky Sports Premier League", "Sky Sports Main Event", "TNT Sports 1", "Amazon Prime", "NBC Sports (US)", "Peacock"],
    season: "August to May, plus FA Cup rounds through the season.",
    why: [
      "All 380 matches — including 3pm Saturday kickoffs blacked out in the UK",
      "Sky Sports + TNT Sports + Amazon feeds in one subscription",
      "True 4K on the marquee fixtures, no set-top box rental",
      "Multi-view friendly — watch on the TV and follow another game on your phone",
    ],
    faq: [
      { q: "Can I watch the 3pm Saturday blackout games?", a: "Yes. Because the feeds are sourced internationally, the UK 3pm blackout does not apply — you get every fixture live." },
      { q: "Is Premier League available in 4K?", a: "Marquee fixtures that are broadcast in UHD (typically Sky Sports 4K and Amazon) are available in true 4K, provided you have a 25 Mbps connection." },
      { q: "Which app should I use for football?", a: "TiviMate on Firestick/Android TV gives the smoothest experience with EPG; IPTV Smarters Pro works well on iPhone and Smart TV. We send the setup guide on WhatsApp." },
      { q: "Do I need a separate Sky subscription?", a: "No. Best IPTV VIP replaces the Sky Sports and TNT Sports bundle for live football — one plan covers all of it." },
    ],
    related: ["champions-league", "la-liga", "serie-a", "bundesliga"],
  },
  "champions-league": {
    slug: "champions-league",
    short: "Champions League",
    icon: "🏆",
    category: "Football",
    h1: "How to Watch the UEFA Champions League Live (2026)",
    metaTitle: "Watch Champions League Live in 4K — Every Tie, All Teams (2026)",
    metaDescription:
      "Stream every UEFA Champions League match live in HD/4K on any device — no TNT Sports or Paramount+ bundle needed. All ties, all rounds. From $5/mo, free trial.",
    answer:
      "To watch the Champions League live, stream the TNT Sports (UK), Paramount+/CBS (US) and beIN Sports feeds through Best IPTV VIP. You get every tie from the league phase to the final in HD or 4K on any device, without a TNT or Paramount subscription, from about $5/month. Multiple simultaneous matches are available so you never miss a goal.",
    competitions: ["UEFA Champions League", "UEFA Europa League", "UEFA Conference League", "UEFA Super Cup"],
    highlights: ["Real Madrid", "Manchester City", "Bayern Munich", "PSG", "Inter", "Barcelona"],
    broadcasters: ["TNT Sports", "beIN Sports", "Paramount+ / CBS Sports", "Canal+", "Sky Sport (DE/IT)", "Movistar+"],
    season: "September to May, midweek matchdays plus the spring final.",
    why: [
      "Every simultaneous 8pm kickoff available — pick any tie, not just the UK/US pick",
      "Multi-language commentary: English, French, Arabic, Spanish feeds",
      "The final in 4K UHD",
      "No TNT Sports or Paramount+ bundle required",
    ],
    faq: [
      { q: "Can I watch all the matches played at the same time?", a: "Yes. On matchdays where 8 games kick off together, all feeds are available — you choose which tie to watch rather than the one your local broadcaster picks." },
      { q: "What language is the commentary?", a: "You can pick English, French, Arabic or Spanish commentary depending on which broadcaster feed you open." },
      { q: "Is the final available in 4K?", a: "Yes — the Champions League final is carried in UHD on the feeds we provide, subject to a 25 Mbps connection." },
    ],
    related: ["premier-league", "la-liga", "serie-a", "ligue-1"],
  },
  "la-liga": {
    slug: "la-liga",
    short: "LaLiga",
    icon: "⚽",
    category: "Football",
    h1: "How to Watch LaLiga Live Outside Spain (2026)",
    metaTitle: "Watch LaLiga Live in 4K — El Clásico & Every Match (2026)",
    metaDescription:
      "Stream every LaLiga match live including El Clásico, in HD/4K on any device — no Movistar+ or ESPN+ needed. Real Madrid, Barça, Atlético. From $5/mo, free trial.",
    answer:
      "You can watch LaLiga live anywhere by streaming the Movistar+ (Spain), ESPN+ (US) and DAZN feeds through Best IPTV VIP. Every match including El Clásico is available in HD or 4K, on Firestick, Smart TV or phone, without a Movistar or ESPN+ subscription — from around $5/month.",
    competitions: ["LaLiga EA Sports", "Copa del Rey", "Supercopa de España", "LaLiga Hypermotion"],
    highlights: ["Real Madrid", "FC Barcelona", "Atlético Madrid", "Athletic Club", "Real Sociedad", "Sevilla"],
    broadcasters: ["Movistar LaLiga", "DAZN LaLiga", "ESPN+ (US)", "beIN Sports", "LaLiga TV"],
    season: "August to May, El Clásico usually October and spring.",
    why: [
      "El Clásico, Madrid and Barça derbies in 4K",
      "Every fixture — not just the one your region picks",
      "Spanish or English commentary",
      "Watch from anywhere with no Spanish TV account",
    ],
    faq: [
      { q: "Can I watch El Clásico live?", a: "Yes — Real Madrid vs Barcelona is carried live in HD/4K on the feeds we provide, both legs each season." },
      { q: "Do I need Movistar+ or ESPN+?", a: "No. Best IPTV VIP carries the LaLiga feeds directly, so no Spanish or US sports subscription is required." },
    ],
    related: ["premier-league", "champions-league", "serie-a", "bundesliga"],
  },
  "serie-a": {
    slug: "serie-a",
    short: "Serie A",
    icon: "⚽",
    category: "Football",
    h1: "How to Watch Serie A Live Online (2026)",
    metaTitle: "Watch Serie A Live in 4K — Every Italian Match (2026)",
    metaDescription:
      "Stream every Serie A match live in HD/4K on any device — Juventus, Inter, Milan, Napoli. No DAZN Italy or Paramount+ needed. From $5/mo, free 24h trial.",
    answer:
      "To watch Serie A live, stream the DAZN Italy, Sky Sport Italia and Paramount+ (US) feeds through Best IPTV VIP. Every match — including the Derby della Madonnina and Derby d'Italia — is available in HD or 4K on any device, without a DAZN subscription, from around $5/month.",
    competitions: ["Serie A", "Coppa Italia", "Supercoppa Italiana", "Serie B"],
    highlights: ["Inter", "Juventus", "AC Milan", "Napoli", "Roma", "Atalanta"],
    broadcasters: ["DAZN Italia", "Sky Sport Italia", "Paramount+ (US)", "beIN Sports"],
    season: "August to May, with midweek turns and the Coppa Italia.",
    why: [
      "Milan and Turin derbies live",
      "DAZN + Sky Sport Italia feeds combined",
      "Italian or English commentary",
      "No DAZN Italy subscription needed",
    ],
    faq: [
      { q: "Which derbies are included?", a: "All of them — Inter vs Milan (Derby della Madonnina), Juventus vs Inter (Derby d'Italia) and the Rome derby are carried live." },
    ],
    related: ["premier-league", "champions-league", "la-liga", "bundesliga"],
  },
  "bundesliga": {
    slug: "bundesliga",
    short: "Bundesliga",
    icon: "⚽",
    category: "Football",
    h1: "How to Watch the Bundesliga Live (2026)",
    metaTitle: "Watch Bundesliga Live in 4K — Bayern, Dortmund & More (2026)",
    metaDescription:
      "Stream every Bundesliga match live in HD/4K on any device — Bayern Munich, Dortmund, Leverkusen. No Sky Deutschland or ESPN+ needed. From $5/mo, free trial.",
    answer:
      "You can watch the Bundesliga live by streaming the Sky Deutschland, DAZN and ESPN+ (US) feeds through Best IPTV VIP. Every match including Der Klassiker is available in HD or 4K on any device, without a Sky Deutschland subscription — from around $5/month.",
    competitions: ["Bundesliga", "DFB-Pokal", "2. Bundesliga", "DFL-Supercup"],
    highlights: ["Bayern Munich", "Borussia Dortmund", "Bayer Leverkusen", "RB Leipzig", "Eintracht Frankfurt"],
    broadcasters: ["Sky Sport Bundesliga", "DAZN DE", "ESPN+ (US)", "beIN Sports"],
    season: "August to May, with a winter break in Dec/Jan.",
    why: [
      "Der Klassiker (Bayern vs Dortmund) live",
      "Saturday Konferenz multi-match view",
      "German or English commentary",
      "No Sky Deutschland account required",
    ],
    faq: [
      { q: "Can I watch the Saturday Konferenz?", a: "Yes — the parallel Saturday afternoon fixtures are all available, so you can follow the title race across every ground." },
    ],
    related: ["premier-league", "champions-league", "la-liga", "serie-a"],
  },
  "ligue-1": {
    slug: "ligue-1",
    short: "Ligue 1",
    icon: "⚽",
    category: "Football",
    h1: "Comment regarder la Ligue 1 en direct (2026)",
    metaTitle: "Watch Ligue 1 Live in 4K — PSG, Marseille & More (2026)",
    metaDescription:
      "Stream every Ligue 1 match live in HD/4K on any device — PSG, Marseille, Monaco, Lyon. No Canal+ or beIN bundle needed. From $5/mo, free 24h trial.",
    answer:
      "To watch Ligue 1 live, stream the DAZN France, beIN Sports and Canal+ feeds through Best IPTV VIP. Every match including Le Classique (PSG vs Marseille) is available in HD or 4K on any device, without a Canal+ subscription — from around $5/month.",
    competitions: ["Ligue 1", "Coupe de France", "Trophée des Champions", "Ligue 2"],
    highlights: ["Paris Saint-Germain", "Marseille", "Monaco", "Lyon", "Lille", "Nice"],
    broadcasters: ["DAZN France", "beIN Sports", "Canal+ Sport", "Ligue 1 Pass"],
    season: "August to May, Le Classique in autumn and spring.",
    why: [
      "Le Classique PSG vs Marseille live",
      "DAZN + beIN + Canal+ feeds combined",
      "French or English commentary",
      "No Canal+ or DAZN France subscription needed",
    ],
    faq: [
      { q: "Puis-je regarder le PSG en direct ?", a: "Oui — tous les matchs du PSG, y compris Le Classique contre Marseille, sont diffusés en direct en HD/4K." },
    ],
    related: ["premier-league", "champions-league", "la-liga", "serie-a"],
  },
  "nfl": {
    slug: "nfl",
    short: "NFL",
    icon: "🏈",
    category: "US Sports",
    h1: "How to Watch the NFL Live in 4K (2026)",
    metaTitle: "Watch NFL Live — Every Game, RedZone & Super Bowl (2026)",
    metaDescription:
      "Stream every NFL game live in HD/4K — Sunday Ticket, RedZone, Monday & Thursday Night, playoffs and the Super Bowl. No cable or YouTube TV. From $5/mo, free trial.",
    answer:
      "You can watch every NFL game live by streaming the CBS, FOX, NBC, ESPN and NFL RedZone feeds through Best IPTV VIP. That includes Sunday Ticket out-of-market games, Monday/Thursday Night Football, the playoffs and the Super Bowl in HD or 4K — no cable, YouTube TV or Sunday Ticket subscription required, from around $5/month.",
    competitions: ["NFL Regular Season", "NFL Playoffs", "Super Bowl", "NFL RedZone", "Pro Bowl"],
    highlights: ["Kansas City Chiefs", "San Francisco 49ers", "Buffalo Bills", "Philadelphia Eagles", "Dallas Cowboys"],
    broadcasters: ["CBS", "FOX", "NBC Sunday Night Football", "ESPN Monday Night Football", "NFL RedZone", "NFL Network"],
    season: "September to February, Super Bowl in early February.",
    why: [
      "Out-of-market Sunday games without NFL Sunday Ticket",
      "NFL RedZone whip-around coverage included",
      "Super Bowl in 4K",
      "No cable or YouTube TV bill",
    ],
    faq: [
      { q: "Can I watch out-of-market games like Sunday Ticket?", a: "Yes. The regional CBS and FOX feeds we carry let you watch games that would be blacked out or locked behind NFL Sunday Ticket in your area." },
      { q: "Is NFL RedZone included?", a: "Yes — NFL RedZone's commercial-free whip-around coverage is available every Sunday during the season." },
      { q: "Can I watch the Super Bowl in 4K?", a: "Yes, the Super Bowl broadcast is carried in UHD on the feeds we provide, subject to a 25 Mbps connection." },
    ],
    related: ["nba", "mlb", "nhl", "boxing"],
  },
  "nba": {
    slug: "nba",
    short: "NBA",
    icon: "🏀",
    category: "US Sports",
    h1: "How to Watch the NBA Live Online (2026)",
    metaTitle: "Watch NBA Live in 4K — League Pass, Finals & Playoffs (2026)",
    metaDescription:
      "Stream every NBA game live in HD/4K — regular season, playoffs and the Finals. No League Pass blackouts, no cable. All teams. From $5/mo, free 24h trial.",
    answer:
      "To watch the NBA live, stream the ESPN, ABC, TNT and NBA League Pass feeds through Best IPTV VIP. Every game — regular season, playoffs and the Finals — is available in HD or 4K with no League Pass local blackouts, on any device, from around $5/month.",
    competitions: ["NBA Regular Season", "NBA Playoffs", "NBA Finals", "NBA All-Star", "In-Season Tournament"],
    highlights: ["Boston Celtics", "Denver Nuggets", "LA Lakers", "Golden State Warriors", "Milwaukee Bucks"],
    broadcasters: ["ESPN", "ABC", "TNT", "NBA TV", "NBA League Pass"],
    season: "October to June, Finals in June.",
    why: [
      "No League Pass local-market blackouts",
      "Every team's games, not just national picks",
      "Finals in 4K",
      "No cable or League Pass subscription",
    ],
    faq: [
      { q: "Are there local blackouts like League Pass?", a: "No. Because feeds are sourced nationally and internationally, you can watch your home team without the League Pass local blackout." },
    ],
    related: ["nfl", "mlb", "nhl", "ufc"],
  },
  "mlb": {
    slug: "mlb",
    short: "MLB",
    icon: "⚾",
    category: "US Sports",
    h1: "How to Watch MLB Baseball Live (2026)",
    metaTitle: "Watch MLB Live in HD — Every Game & World Series (2026)",
    metaDescription:
      "Stream every MLB game live in HD — regular season, playoffs and the World Series. No MLB.TV blackouts, no cable. All 30 teams. From $5/mo, free 24h trial.",
    answer:
      "You can watch MLB live by streaming the ESPN, FOX, TBS and MLB Network feeds through Best IPTV VIP. Every game including your home team and the World Series is available in HD with no MLB.TV local blackout, on any device, from around $5/month.",
    competitions: ["MLB Regular Season", "MLB Playoffs", "World Series", "MLB All-Star Game"],
    highlights: ["LA Dodgers", "New York Yankees", "Houston Astros", "Atlanta Braves", "Philadelphia Phillies"],
    broadcasters: ["ESPN", "FOX", "TBS", "MLB Network", "Regional Sports Networks"],
    season: "March to October, World Series in late October.",
    why: [
      "No MLB.TV local blackout on your home team",
      "Regional sports networks included",
      "World Series and playoffs live",
      "No cable or MLB.TV subscription",
    ],
    faq: [
      { q: "Can I watch my local team without MLB.TV blackouts?", a: "Yes — the regional sports network feeds we carry let you watch your home team live, which MLB.TV blacks out in-market." },
    ],
    related: ["nfl", "nba", "nhl", "boxing"],
  },
  "nhl": {
    slug: "nhl",
    short: "NHL",
    icon: "🏒",
    category: "US Sports",
    h1: "How to Watch the NHL Live Online (2026)",
    metaTitle: "Watch NHL Hockey Live in HD — Every Game & Stanley Cup (2026)",
    metaDescription:
      "Stream every NHL game live in HD — regular season, playoffs and the Stanley Cup Final. No cable, no local blackouts. All 32 teams. From $5/mo, free trial.",
    answer:
      "To watch the NHL live, stream the ESPN, TNT, Sportsnet (Canada) and NHL Network feeds through Best IPTV VIP. Every game including the Stanley Cup Playoffs is available in HD on any device, with no local blackout, from around $5/month.",
    competitions: ["NHL Regular Season", "Stanley Cup Playoffs", "Stanley Cup Final", "NHL Winter Classic"],
    highlights: ["Edmonton Oilers", "Florida Panthers", "Colorado Avalanche", "Toronto Maple Leafs", "Boston Bruins"],
    broadcasters: ["ESPN", "TNT", "Sportsnet (CA)", "NHL Network", "Regional Sports Networks"],
    season: "October to June, Stanley Cup Final in June.",
    why: [
      "US and Canadian feeds (Sportsnet, ESPN, TNT)",
      "No local blackout on your home team",
      "Every playoff game and the Cup Final",
      "No cable subscription",
    ],
    faq: [
      { q: "Do you carry Canadian feeds like Sportsnet?", a: "Yes — Sportsnet and TVA Sports Canadian feeds are available alongside the US ESPN and TNT coverage." },
    ],
    related: ["nfl", "nba", "mlb", "ufc"],
  },
  "formula-1": {
    slug: "formula-1",
    short: "Formula 1",
    icon: "🏎️",
    category: "Motorsport",
    h1: "How to Watch Formula 1 Live in 4K (2026)",
    metaTitle: "Watch F1 Live in 4K — Every Race, Practice & Qualifying (2026)",
    metaDescription:
      "Stream every F1 Grand Prix live in HD/4K — practice, qualifying, sprint and race. No Sky F1 or ESPN bundle. All 24 rounds. From $5/mo, free 24h trial.",
    answer:
      "You can watch every Formula 1 session live by streaming the Sky Sports F1 and ESPN feeds through Best IPTV VIP. That covers practice, qualifying, the sprint and the race in HD or 4K on any device, without a Sky F1 subscription — from around $5/month. The full 24-round calendar is included.",
    competitions: ["Formula 1 World Championship", "F1 Sprint", "F2", "F3"],
    highlights: ["Max Verstappen", "Lando Norris", "Charles Leclerc", "Lewis Hamilton", "Oscar Piastri"],
    broadcasters: ["Sky Sports F1", "ESPN (US)", "Canal+ (FR)", "beIN Sports"],
    season: "March to December, 24 Grands Prix worldwide.",
    why: [
      "Every session — FP1 through the race — not just the race",
      "Sky Sports F1 lights-out-to-flag coverage in 4K",
      "Onboard and pit-lane channels where available",
      "No Sky F1 or ESPN subscription needed",
    ],
    faq: [
      { q: "Do I get practice and qualifying too?", a: "Yes — the full Sky Sports F1 feed is carried, so every practice session, qualifying, sprint and the race are all live." },
      { q: "Is F1 available in 4K?", a: "Yes, the Sky Sports F1 UHD feed is available in true 4K on a 25 Mbps+ connection." },
    ],
    related: ["ufc", "boxing", "nfl", "premier-league"],
  },
  "ufc": {
    slug: "ufc",
    short: "UFC / MMA",
    icon: "🥊",
    category: "Combat",
    h1: "How to Watch UFC & MMA Live (2026)",
    metaTitle: "Watch UFC Live — Every PPV, Fight Night & Prelims (2026)",
    metaDescription:
      "Stream every UFC event live in HD — numbered PPVs, Fight Night, prelims and early prelims. No ESPN+ PPV fees. From $5/mo, free 24h trial.",
    answer:
      "To watch UFC live, stream the ESPN+, BT/TNT Sports and UFC Fight Pass feeds through Best IPTV VIP. Every event — numbered pay-per-views, Fight Night cards, prelims and early prelims — is available in HD on any device, without paying ESPN+ PPV fees, from around $5/month.",
    competitions: ["UFC Numbered Events (PPV)", "UFC Fight Night", "UFC on ESPN", "Dana White's Contender Series"],
    highlights: ["Islam Makhachev", "Jon Jones", "Alex Pereira", "Ilia Topuria", "Sean O'Malley"],
    broadcasters: ["ESPN+ PPV", "TNT Sports (UK)", "UFC Fight Pass", "DAZN (regional)"],
    season: "Year-round, roughly weekly cards plus monthly PPVs.",
    why: [
      "Numbered PPVs without the $80 ESPN+ pay-per-view fee",
      "Full cards — early prelims, prelims and main card",
      "Boxing and other combat events on the same plan",
      "No ESPN+ or TNT Sports subscription",
    ],
    faq: [
      { q: "Do I have to pay for each PPV?", a: "No. UFC numbered pay-per-views are included in your plan — you do not pay the separate ~$80 ESPN+ PPV charge per event." },
      { q: "Are the prelims included?", a: "Yes — early prelims, prelims and the main card are all carried, so you can watch the full event." },
    ],
    related: ["boxing", "nfl", "nba", "formula-1"],
  },
  "boxing": {
    slug: "boxing",
    short: "Boxing",
    icon: "🥊",
    category: "Combat",
    h1: "How to Watch Boxing Live — Every PPV (2026)",
    metaTitle: "Watch Boxing Live — DAZN, PPV & World Title Fights (2026)",
    metaDescription:
      "Stream every big boxing PPV live in HD — world title fights, DAZN and TNT Sports cards. No per-event pay-per-view fees. From $5/mo, free 24h trial.",
    answer:
      "You can watch major boxing live by streaming the DAZN, TNT Sports Box Office and ESPN feeds through Best IPTV VIP. Marquee world-title pay-per-views and undercards are available in HD on any device, without paying per-event PPV fees, from around $5/month.",
    competitions: ["World Title Fights", "DAZN Boxing", "TNT Sports Box Office", "Riyadh Season cards"],
    highlights: ["Oleksandr Usyk", "Tyson Fury", "Canelo Álvarez", "Terence Crawford", "Naoya Inoue"],
    broadcasters: ["DAZN", "TNT Sports Box Office", "ESPN", "Sky Sports Box Office"],
    season: "Year-round, major cards most weekends.",
    why: [
      "Marquee PPVs without the £20–£25 per-event fee",
      "Full undercards, not just the main event",
      "UFC and combat sports on the same plan",
      "No DAZN or Sky Box Office subscription",
    ],
    faq: [
      { q: "Are pay-per-view fights included?", a: "Yes — the big box-office title fights are carried in your plan, so you avoid the per-event pay-per-view charge." },
    ],
    related: ["ufc", "nfl", "nba", "formula-1"],
  },
  "cricket": {
    slug: "cricket",
    short: "Cricket",
    icon: "🏏",
    category: "Cricket",
    h1: "How to Watch Cricket Live — IPL, T20 & Tests (2026)",
    metaTitle: "Watch Cricket Live in HD — IPL, World Cup & Test Matches (2026)",
    metaDescription:
      "Stream cricket live in HD — IPL, ICC World Cups, The Ashes, BBL and international series. No Willow, Star or Sky bundle. From $5/mo, free 24h trial.",
    answer:
      "To watch cricket live, stream the Star Sports, Sky Sports Cricket, Willow (US) and PTV feeds through Best IPTV VIP. The IPL, ICC World Cups, The Ashes, BBL and bilateral series are available in HD on any device, without a Willow or Sky Cricket subscription — from around $5/month.",
    competitions: ["Indian Premier League (IPL)", "ICC Cricket World Cup", "ICC T20 World Cup", "The Ashes", "Big Bash League"],
    highlights: ["India", "Australia", "England", "Pakistan", "Mumbai Indians", "Chennai Super Kings"],
    broadcasters: ["Star Sports", "Sky Sports Cricket", "Willow TV (US)", "PTV Sports", "SuperSport"],
    season: "IPL Mar–May; internationals and World Cups year-round.",
    why: [
      "Full IPL season including playoffs and the final",
      "Star Sports + Sky Cricket + Willow feeds combined",
      "English and Hindi commentary",
      "No Willow, Star or Sky Cricket subscription",
    ],
    faq: [
      { q: "Can I watch the IPL live?", a: "Yes — every IPL match including the playoffs and final is carried live in HD, with English or Hindi commentary." },
      { q: "Do you cover the ICC World Cup and The Ashes?", a: "Yes, ICC World Cups (ODI and T20) and The Ashes Test series are both carried on the Star Sports and Sky Cricket feeds." },
    ],
    related: ["premier-league", "tennis", "formula-1", "nba"],
  },
  "tennis": {
    slug: "tennis",
    short: "Tennis",
    icon: "🎾",
    category: "Tennis",
    h1: "How to Watch Tennis Live — Grand Slams & ATP/WTA (2026)",
    metaTitle: "Watch Tennis Live in HD — Wimbledon, US Open & More (2026)",
    metaDescription:
      "Stream tennis live in HD — Wimbledon, US Open, Australian Open, Roland-Garros and ATP/WTA Tour. No Tennis Channel or Sky bundle. From $5/mo, free trial.",
    answer:
      "You can watch tennis live by streaming the Sky Sports Tennis, ESPN, Tennis Channel and Eurosport feeds through Best IPTV VIP. All four Grand Slams plus the ATP and WTA Tours are available in HD on any device, with multiple show courts, from around $5/month.",
    competitions: ["Australian Open", "Roland-Garros", "Wimbledon", "US Open", "ATP Tour", "WTA Tour", "ATP Finals"],
    highlights: ["Jannik Sinner", "Carlos Alcaraz", "Novak Djokovic", "Iga Świątek", "Aryna Sabalenka"],
    broadcasters: ["Sky Sports Tennis", "ESPN", "Tennis Channel", "Eurosport", "beIN Sports"],
    season: "January to November; Grand Slams Jan, May, Jul, Sep.",
    why: [
      "All four Grand Slams live",
      "Multiple show courts, not just the main court pick",
      "ATP and WTA Tour week to week",
      "No Tennis Channel or Sky subscription",
    ],
    faq: [
      { q: "Can I choose which court to watch?", a: "Yes — during Grand Slams the multiple show-court feeds are available, so you can follow a specific match rather than the broadcaster's pick." },
    ],
    related: ["formula-1", "cricket", "premier-league", "nba"],
  },
  "europa-league": {
    slug: "europa-league",
    short: "Europa League",
    icon: "🏆",
    category: "Football",
    h1: "How to Watch the UEFA Europa League Live (2026)",
    metaTitle: "Watch Europa League Live in HD — Every Tie & Final (2026)",
    metaDescription:
      "Stream every UEFA Europa League match live in HD/4K on any device — no TNT Sports or Paramount+ bundle. All ties, all rounds. From $5/mo, free 24h trial.",
    answer:
      "To watch the Europa League live, stream the TNT Sports (UK), Paramount+ (US) and beIN Sports feeds through Best IPTV VIP. Every tie from the league phase to the final is available in HD or 4K on any device, without a TNT or Paramount subscription, from around $5/month.",
    competitions: ["UEFA Europa League", "UEFA Conference League", "UEFA Champions League"],
    highlights: ["Roma", "Manchester United", "Tottenham", "Ajax", "Lazio", "Rangers"],
    broadcasters: ["TNT Sports", "Paramount+ (US)", "beIN Sports", "Canal+"],
    season: "September to May, Thursday-night matchdays.",
    why: [
      "Every simultaneous Thursday tie available",
      "Multi-language commentary",
      "The final live in HD/4K",
      "No TNT Sports or Paramount+ subscription",
    ],
    faq: [
      { q: "Are all the Thursday games available?", a: "Yes — when multiple ties kick off at once you can pick any of them, not just the game your local broadcaster shows." },
    ],
    related: ["champions-league", "premier-league", "la-liga", "serie-a"],
  },
};

export const WATCH_SLUGS = Object.keys(WATCH_GUIDES);

/** Convenience export used by the index page and sitemap. */
export const WATCH_GUIDE_LIST: WatchGuide[] = WATCH_SLUGS.map((s) => WATCH_GUIDES[s]);

export { HOW_TO_INTRO };
