import type { KbSlug, DeviceSlug } from "../site";

export type KbArticle = {
  slug: KbSlug;
  title: string;
  emoji: string;
  category: string;
  description: string;
  /** Answer-first paragraph (feeds featured snippets & LLM answers). */
  answer: string;
  sections: { heading: string; body: string[] }[];
  faq: { q: string; a: string }[];
  funnelDevice: DeviceSlug;
  updated: string;
};

export const KB_ARTICLES: Record<KbSlug, KbArticle> = {
  "how-to-install-iptv": {
    slug: "how-to-install-iptv",
    title: "How to install IPTV — the complete beginner's guide",
    emoji: "🚀",
    category: "Getting Started",
    description:
      "New to IPTV? This 2026 guide explains exactly how IPTV works and how to install it on any device in three steps: pick a player, log in with Xtream Codes, and watch.",
    answer:
      "Installing IPTV takes three steps on any device: (1) install an IPTV player app such as IPTV Smarters Pro or TiviMate, (2) log in with the Xtream Codes details (server URL, username, password) your provider sends you, and (3) start watching. There's no dish, box wiring or contract — IPTV streams over your internet like Netflix.",
    sections: [
      {
        heading: "What IPTV actually is",
        body: [
          "IPTV (Internet Protocol Television) delivers live channels and on-demand movies over the internet instead of a satellite dish or cable line. Any device with a screen and a decent connection can receive it — Firestick, Smart TV, phone, PC or a dedicated box.",
          "Because it's just data over your broadband, the only real requirements are a stable connection (15+ Mbps for HD, 25+ for 4K) and an app that can play the stream. That app is called an IPTV player.",
        ],
      },
      {
        heading: "The three-step install (works on every device)",
        body: [
          "Step 1 — Install a player. On Firestick/Android use TiviMate or IPTV Smarters Pro; on iPhone use IPTV Smarters Pro; on Samsung/LG use IBO Player Pro or Duplex Play; on a box use MYTVOnline (Formuler) or STB Emulator.",
          "Step 2 — Log in. Choose 'Xtream Codes API' and enter the server URL, username and password from your provider. On Smart TV apps you instead register your MAC address on the app's website and paste the M3U link.",
          "Step 3 — Watch. The app loads your channels, movies and the EPG (TV guide). That's it — your login is saved for next time.",
        ],
      },
      {
        heading: "Xtream Codes vs M3U — which to pick",
        body: [
          "Always choose Xtream Codes if the app offers it. It pulls in the channel groups, the movies/series library and the EPG automatically.",
          "A plain M3U URL works too but often loses the guide. Use M3U only where an app can't do Xtream Codes (some Smart TV players).",
        ],
      },
    ],
    faq: [
      { q: "Is installing IPTV complicated?", a: "No — it's install an app, type one login, and watch. Most people are up and running in under five minutes. Our device guides walk you through each screen with screenshots." },
      { q: "Do I need any special hardware?", a: "No dish or receiver. Any Firestick, Smart TV, phone, PC or Android box you already own will work. A dedicated box like Formuler just gives the smoothest remote experience." },
      { q: "How fast can I start after signing up?", a: "We send your login on WhatsApp within minutes, plus a free 24h trial with no card. Install the app, paste the login, and you're watching." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-17",
  },

  "which-device-for-iptv": {
    slug: "which-device-for-iptv",
    title: "Which device is best for IPTV in 2026?",
    emoji: "🖥️",
    category: "Buying Advice",
    description:
      "Firestick, Android box, Smart TV, Formuler or phone — which is the best device for IPTV? An honest 2026 comparison by budget, ease and picture quality.",
    answer:
      "For most people the best IPTV device in 2026 is a Firestick 4K Max (cheap, TiviMate/Smarters support, easy) or an NVIDIA Shield / Formuler Z if you want top-tier 4K and recording. Smart TVs work but their apps are more limited; phones are great as a second screen. Avoid relying on Roku or Chromecast — their IPTV support is limited.",
    sections: [
      {
        heading: "The quick recommendation",
        body: [
          "Best value: Amazon Firestick 4K / 4K Max. Cheap, runs TiviMate and IPTV Smarters, easy to sideload, great 4K. This is what we recommend to most new customers.",
          "Best performance: NVIDIA Shield or Formuler Z11 Pro. Flawless 4K HEVC, fast UI, recording. Worth it for serious sports and film watchers.",
          "Already have a Smart TV: use IBO Player Pro or Duplex Play — no extra hardware, though features are leaner than a box.",
        ],
      },
      {
        heading: "Honest pros and cons by device",
        body: [
          "Firestick: cheapest route, best app support, but the base model can run low on memory — get the 4K Max and reboot weekly.",
          "Android box / NVIDIA Shield: most powerful, full Play Store, TiviMate + recording. Higher cost. Shield is the gold standard.",
          "Formuler Z: purpose-built IPTV box with the best physical remote and MYTVOnline player; Z11 Pro adds Android TV.",
          "Smart TV (Samsung/LG): zero extra hardware, but apps (IBO/Duplex) lack catch-up/recording and depend on a web portal.",
          "Phone/tablet: perfect as a second screen with IPTV Smarters; AirPlay/cast to the TV when needed.",
        ],
      },
      {
        heading: "Devices to be cautious with",
        body: [
          "Roku: very limited IPTV support — no TiviMate/Smarters. You're stuck with web-based workarounds. If Roku is your only device, we'll set you up, but a £30 Firestick transforms the experience.",
          "Chromecast (basic): fine only if you cast from a phone. 'Chromecast with Google TV' is different — it runs Android TV apps and works great.",
        ],
      },
    ],
    faq: [
      { q: "Firestick or Android box for IPTV?", a: "Firestick 4K Max for value and simplicity; a NVIDIA Shield or Formuler box for the best possible 4K and recording. Both run the same top apps with Best IPTV VIP." },
      { q: "Can I just use my Smart TV without a box?", a: "Yes — IBO Player Pro or Duplex Play run natively on Samsung/LG. You lose catch-up/recording versus a box, but for most viewing it's perfectly good." },
      { q: "Is Roku good for IPTV?", a: "Honestly, no. Roku blocks the popular IPTV players. We can make it work via a web method, but a cheap Firestick is a far better experience — we'd rather tell you that up front." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-16",
  },

  "internet-speed-for-iptv": {
    slug: "internet-speed-for-iptv",
    title: "How much internet speed do you need for IPTV?",
    emoji: "📶",
    category: "Requirements",
    description:
      "Exact IPTV bandwidth requirements for SD, HD, FHD and 4K in 2026, plus Wi-Fi vs Ethernet advice and how to test whether your connection is fast enough.",
    answer:
      "For IPTV you need roughly 10 Mbps for SD, 15–20 Mbps for HD/FHD, and 25+ Mbps for 4K UHD per stream. Stability matters more than headline speed: a steady 30 Mbps on 5 GHz Wi-Fi or Ethernet beats an unstable 100 Mbps on 2.4 GHz. Add bandwidth for each extra screen watching at once.",
    sections: [
      {
        heading: "Speed by picture quality (per stream)",
        body: [
          "SD (480p): ~5–10 Mbps. HD (720p): ~10–15 Mbps. Full HD (1080p): ~15–20 Mbps. 4K UHD (2160p HEVC): ~25–35 Mbps.",
          "These are per simultaneous stream. Two 4K screens at once means budgeting ~60–70 Mbps, plus whatever else uses the connection.",
        ],
      },
      {
        heading: "Why stability beats raw speed",
        body: [
          "IPTV buffers when the connection dips, not just when it's slow. A rock-steady 30 Mbps streams 4K flawlessly; a '100 Mbps' line that drops every few seconds on weak Wi-Fi will stutter.",
          "The two biggest stability killers are 2.4 GHz Wi-Fi and an overloaded router. Move to 5 GHz or, best of all, plug the device into Ethernet with an adapter.",
        ],
      },
      {
        heading: "How to test your connection",
        body: [
          "Run fast.com or speedtest.net on the streaming device itself (not just your phone across the house). Test at the time you actually watch — peak-evening speeds can be far lower than midday.",
          "If you get 25+ Mbps steady on the device and still buffer, the fix is decoder settings or DNS, not more bandwidth — see our buffering guide.",
        ],
      },
    ],
    faq: [
      { q: "Can I watch IPTV on 10 Mbps?", a: "Yes, in HD. 10–15 Mbps handles 720p/1080p comfortably on one screen. For 4K you'll want 25+ Mbps and ideally Ethernet." },
      { q: "Does IPTV use a lot of data?", a: "4K uses roughly 7–10 GB per hour; HD around 2–3 GB. On unlimited home broadband this is a non-issue, but watch it on a capped mobile plan." },
      { q: "Wi-Fi or Ethernet for IPTV?", a: "Ethernet every time if you can. If not, use 5 GHz Wi-Fi near the router. 2.4 GHz is the number-one cause of buffering complaints." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-15",
  },

  "improve-video-quality": {
    slug: "improve-video-quality",
    title: "How to improve IPTV video quality (get true 4K/HD)",
    emoji: "🎬",
    category: "Optimization",
    description:
      "Getting soft or low-res IPTV? How to force real 4K/FHD: hardware decoding, the right channel version, buffer settings and connection fixes for 2026.",
    answer:
      "To get the best IPTV picture, watch the 4K/FHD version of the channel, set your player's decoder to Hardware+, use Ethernet or 5 GHz Wi-Fi, and make sure the device and TV are both set to 4K output. Quality is limited by the weakest link — connection, decoder, channel version or display — so fix all four.",
    sections: [
      {
        heading: "Pick the right channel version",
        body: [
          "We carry many channels in multiple qualities — look for 'FHD', 'UHD' or '4K' in the channel name. If you're on the SD/HD variant, switching to the FHD/4K one is the single biggest quality jump.",
          "Use the search box in your player and type the channel name; the higher-quality versions usually sit in a separate 4K or FHD category too.",
        ],
      },
      {
        heading: "Decoder, buffer and output settings",
        body: [
          "Set the player decoder to Hardware+ so the chip handles HEVC/H.265 — software decoding softens and drops 4K.",
          "Confirm the device output is 4K: on Firestick, Settings → Display → Video Resolution → 4K 60Hz; on Android TV set resolution to 2160p. A device stuck on 1080p output caps every channel at 1080p.",
          "Give the buffer ~2000–2500 ms so brief network dips don't force a quality drop.",
        ],
      },
      {
        heading: "Fix the connection ceiling",
        body: [
          "4K needs 25+ Mbps steady. On weak Wi-Fi the stream auto-degrades to protect against buffering, which looks like 'bad quality'. Ethernet or 5 GHz restores full resolution.",
          "Finally, check the TV's own picture mode isn't in a soft 'Eco' preset — set it to Standard/Movie and enable HDR if the channel supports it.",
        ],
      },
    ],
    faq: [
      { q: "Why does my IPTV look worse than Netflix?", a: "Usually you're on the HD version, decoding in software, or output-capped at 1080p. Switch to the 4K channel, enable Hardware+, and set the device to 4K output — the gap closes fast." },
      { q: "How do I know if I'm actually watching 4K?", a: "The channel name will say UHD/4K, and your TV's info panel will show 2160p. If the TV reports 1080p on a '4K' channel, your device output or connection is the limit." },
      { q: "Does a better device improve picture?", a: "Yes — an NVIDIA Shield or Formuler Z handles 4K HEVC better than a base Firestick, giving a cleaner, more stable image on demanding channels." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-14",
  },

  "xtream-codes-vs-m3u": {
    slug: "xtream-codes-vs-m3u",
    title: "Xtream Codes vs M3U — what's the difference?",
    emoji: "🔗",
    category: "How It Works",
    description:
      "Xtream Codes API or M3U URL for your IPTV login? What each one is, why Xtream Codes is usually better, and when to use a plain M3U link instead.",
    answer:
      "Xtream Codes and M3U are two ways to load the same subscription. Xtream Codes uses a server URL + username + password and automatically brings in the EPG, movies and series — it's the better choice in almost every app. A plain M3U is a single link that lists channels but often loses the guide; use it only where an app can't do Xtream Codes.",
    sections: [
      {
        heading: "What Xtream Codes is",
        body: [
          "Xtream Codes API login = three fields: server URL (e.g. http://server:8080), username and password. The app talks to the panel and pulls live TV, VOD, series and the EPG as organized categories.",
          "This is why apps like TiviMate and IPTV Smarters ask for 'Xtream Codes' — it gives the richest, best-organized experience with the guide included.",
        ],
      },
      {
        heading: "What an M3U URL is",
        body: [
          "An M3U (or M3U_PLUS) is one long link ending in something like get.php?...&type=m3u_plus. It's a flat playlist of channels. Handy for VLC and simple players, but the EPG and VOD structure are often lost or partial.",
          "You'd use M3U on Smart TV apps that add playlists by URL (IBO, Duplex) or in VLC/Kodi on a computer.",
        ],
      },
      {
        heading: "Which should you use?",
        body: [
          "In TiviMate, IPTV Smarters, XCIPTV — choose Xtream Codes. Full EPG, movies and series, one clean login.",
          "In VLC, Kodi, or a Smart TV app that only takes a URL — use the M3U link we provide. For MAG boxes and STB Emulator you use neither: those use a MAC address and portal URL instead.",
        ],
      },
    ],
    faq: [
      { q: "Is Xtream Codes better than M3U?", a: "For almost everyone, yes — it includes the EPG, movies and series, and is a tidy three-field login. Use M3U only where an app can't do Xtream Codes." },
      { q: "Can I get both from you?", a: "Yes. We provide your Xtream Codes login and can generate the matching M3U URL for VLC or a Smart TV app — just ask on WhatsApp." },
      { q: "My M3U works but there's no TV guide", a: "That's normal for a plain M3U. Switch to the Xtream Codes login in your app to get the full EPG, or add our EPG URL separately where the app allows it." },
    ],
    funnelDevice: "android",
    updated: "2026-07-13",
  },

  "what-is-epg": {
    slug: "what-is-epg",
    title: "What is EPG and how to fix a missing TV guide",
    emoji: "🗓️",
    category: "How It Works",
    description:
      "EPG is the on-screen IPTV TV guide. What it is, how it loads, and how to fix a blank or wrong EPG in TiviMate, IPTV Smarters and Smart TV apps.",
    answer:
      "EPG (Electronic Programme Guide) is the on-screen schedule showing what's on now and next per channel. With a Xtream Codes login it loads automatically; if it's blank, force an EPG update in the app's settings, confirm the source is enabled, and fix the timezone offset if programmes look shifted.",
    sections: [
      {
        heading: "What the EPG does",
        body: [
          "The EPG turns a list of channels into a proper TV guide: now/next, full-day schedules, and — with catch-up — the ability to scroll back and replay past programmes.",
          "It's delivered as guide data linked to your channels. Via Xtream Codes it's matched automatically; via M3U you sometimes have to add a separate EPG (XMLTV) URL.",
        ],
      },
      {
        heading: "Why your EPG might be empty",
        body: [
          "You logged in with M3U instead of Xtream Codes, so no guide came with it. Switch to Xtream Codes, or add our EPG URL manually.",
          "The first EPG download didn't finish — apps need the app open for a minute to pull the full guide. Trigger 'Update EPG now'.",
          "The source is toggled off in settings, or the app cache is stale — enable the source and refresh.",
        ],
      },
      {
        heading: "Fixing it per app",
        body: [
          "TiviMate: Settings → EPG → ensure our source is on → 'Update EPG now'. Leave it open a minute.",
          "IPTV Smarters/XCIPTV: pull to refresh, or log out and back in via Xtream Codes. Adjust the EPG time offset if the guide is shifted by an hour.",
          "Smart TV apps (IBO/Duplex): paste our EPG URL into the guide field on the provider portal, then relaunch the app.",
        ],
      },
    ],
    faq: [
      { q: "Why is my EPG blank?", a: "Most often you used an M3U link (no guide) instead of Xtream Codes, or the first EPG download didn't finish. Switch to Xtream Codes or run 'Update EPG now' and wait a minute." },
      { q: "The guide is there but an hour out", a: "That's a timezone offset. Set your EPG time offset in the app settings to match your region and the schedule snaps into place." },
      { q: "Can I get catch-up from the EPG?", a: "Yes, where the channel supports it — open the guide, scroll back and select a past programme. Our server keeps several days of archive on many channels." },
    ],
    funnelDevice: "android",
    updated: "2026-07-12",
  },

  "what-is-iptv": {
    slug: "what-is-iptv",
    title: "What is IPTV and how does it work?",
    emoji: "📡",
    category: "Basics",
    description:
      "IPTV explained simply: what IPTV means, how it streams live TV and movies over the internet, and how it differs from cable, satellite and apps like Netflix.",
    answer:
      "IPTV (Internet Protocol Television) is live TV and on-demand video delivered over the internet instead of a satellite dish or cable line. You install a player app on a Firestick, Smart TV, phone or box, log in with the details your provider gives you, and stream thousands of channels and movies — just like Netflix, but with live channels too.",
    sections: [
      {
        heading: "How IPTV works, step by step",
        body: [
          "Instead of broadcasting over the air or down a coax cable, IPTV sends each channel as a data stream over your broadband. Your player app requests a channel, the server streams it, and it plays instantly on your screen.",
          "Because it's just internet data, any device with a screen and a stable connection can receive it. There's no dish, no receiver box wired to an aerial, and no long contract — only an app and a login.",
        ],
      },
      {
        heading: "IPTV vs cable, satellite and Netflix",
        body: [
          "Versus cable/satellite: IPTV needs no dish or cabling and works anywhere you have internet, usually at a fraction of the price, with far more channels and on-demand content.",
          "Versus Netflix/Disney+: those are on-demand only. IPTV adds thousands of live channels — sports, news, entertainment from many countries — plus a large movies-and-series library on demand.",
        ],
      },
    ],
    faq: [
      { q: "What does IPTV stand for?", a: "Internet Protocol Television — television delivered over the internet using the same technology that carries websites and video calls." },
      { q: "Do I need special equipment for IPTV?", a: "No. Any Firestick, Smart TV, Android box, phone or PC you already own works. You just install an IPTV player app and enter your login." },
      { q: "Is IPTV the same as streaming?", a: "It's a type of streaming. The difference is IPTV focuses on live TV channels (plus on-demand), whereas Netflix-style apps are on-demand only." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "is-iptv-legal": {
    slug: "is-iptv-legal",
    title: "Is IPTV legal?",
    emoji: "⚖️",
    category: "Legal & Safety",
    description:
      "Is IPTV legal in 2026? An honest explanation: the technology is legal, but legality depends on whether the service is properly licensed. How to stay on the right side.",
    answer:
      "IPTV as a technology is completely legal — it's just television delivered over the internet, and major broadcasters use it too. What matters is licensing: a service is legal when it holds the rights to the content it streams. Always choose a provider that's transparent about what it offers, and check the rules for your own country.",
    sections: [
      {
        heading: "The technology vs the content",
        body: [
          "IPTV itself is a legal, mainstream delivery method — telecom providers and broadcasters deliver channels over IP every day. There is nothing unlawful about the protocol or the player apps (TiviMate, IPTV Smarters, etc.).",
          "Legality comes down to the content and its licensing. A service that has secured distribution rights for what it streams is operating legally; one that redistributes channels without permission is not. As a viewer, the safest path is to use reputable, transparent services and to understand your local laws.",
        ],
      },
      {
        heading: "How to stay on the right side",
        body: [
          "Prefer providers that are open about their service, offer proper support, clear billing and a refund policy — hallmarks of a legitimate operation.",
          "Rules differ by country, so if you're unsure about a specific service or channel, check your national regulator's guidance. When in doubt, licensed on-demand apps and official broadcaster IPTV are always the fully compliant option.",
        ],
      },
    ],
    faq: [
      { q: "Are IPTV player apps legal?", a: "Yes. Apps like TiviMate, IPTV Smarters Pro and VLC are neutral tools — they're legal to install and use. Legality depends on the content source you load into them, not the app." },
      { q: "Is it legal to watch IPTV in the UK/US/EU?", a: "The technology is legal everywhere. Whether a specific service is legal depends on its licensing and your local law. Use transparent, reputable providers and check your country's regulator if unsure." },
      { q: "How do I know if a service is legitimate?", a: "Look for clear pricing, a public refund policy, real customer support, and honesty about what's included. Vague claims and no support are red flags." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "is-iptv-safe": {
    slug: "is-iptv-safe",
    title: "Is IPTV safe to use?",
    emoji: "🛡️",
    category: "Legal & Safety",
    description:
      "Is IPTV safe? How to avoid IPTV scams, protect your payment details and devices, and pick a trustworthy provider in 2026.",
    answer:
      "IPTV is safe to use when you choose a reputable provider, use official player apps, and pay through a traceable method. The real risks aren't the technology — they're scam sellers and dodgy APK files. Stick to well-known players, avoid 'lifetime for £10' offers, and use a provider with real support and a refund policy.",
    sections: [
      {
        heading: "The real risks (and how to avoid them)",
        body: [
          "Scam sellers: take your money and disappear, or vanish after a week. Avoid them by testing with a free trial first and paying only providers with a refund policy and responsive support.",
          "Malicious apps: only install well-known players (TiviMate, IPTV Smarters Pro, XCIPTV, IBO Player) from official stores or the exact link your provider gives you. Never sideload random 'all-in-one' APKs from forums.",
        ],
      },
      {
        heading: "How to stay safe",
        body: [
          "Test before you buy: a legitimate provider offers a free trial with no card required, so you can verify quality and honesty first.",
          "Pay traceably: use card, PayPal or a reputable crypto checkout rather than untraceable bank transfers to a personal account. Keep your login in a password manager, and use a VPN if you want extra network privacy.",
        ],
      },
    ],
    faq: [
      { q: "Can IPTV give my device a virus?", a: "The streams themselves can't. Risk only comes from installing untrusted APK files. Stick to official player apps and you're safe." },
      { q: "How do I avoid IPTV scams?", a: "Insist on a free trial, check for a refund policy and real support, and be suspicious of absurd 'lifetime' deals. Pay with a method you can dispute." },
      { q: "Is it safe to enter my card details?", a: "Only on a proper checkout (card processor, PayPal or a known crypto gateway). Never send card photos over chat, and never pay via anonymous transfer." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "do-i-need-a-vpn-for-iptv": {
    slug: "do-i-need-a-vpn-for-iptv",
    title: "Do you need a VPN for IPTV?",
    emoji: "🔒",
    category: "Legal & Safety",
    description:
      "Do you need a VPN for IPTV in 2026? When a VPN helps (privacy, ISP throttling, geo-blocks), when it isn't needed, and how to pick one that won't slow your streams.",
    answer:
      "You don't strictly need a VPN for IPTV, but many people use one for privacy and to stop ISP throttling. A VPN hides your traffic from your internet provider and can bypass ISP blocks that cause buffering. The trade-off is a small speed cost, so pick a fast VPN and a nearby server if you use one.",
    sections: [
      {
        heading: "When a VPN actually helps",
        body: [
          "Beating ISP throttling: some providers slow streaming traffic, which shows up as buffering. A VPN masks the traffic so it can't be selectively throttled — often the single biggest smoothness improvement.",
          "Privacy: a VPN stops your ISP seeing what you stream. It also helps on shared or public networks. If ISP-level blocking is stopping your app connecting, a VPN (or just changing DNS to 1.1.1.1) usually fixes it.",
        ],
      },
      {
        heading: "Choosing and using one without losing speed",
        body: [
          "Pick a VPN known for speed and pick a server geographically close to you — distance and load are what slow streams, not the VPN itself.",
          "You don't always need it. On a fast, unthrottled connection, IPTV runs perfectly without a VPN. Try without first; add one if you hit throttling, blocks, or just want the privacy.",
        ],
      },
    ],
    faq: [
      { q: "Will a VPN stop IPTV buffering?", a: "Often, yes — if the buffering is caused by ISP throttling or blocking. If it's caused by slow Wi-Fi or a weak device, a VPN won't help; fix the connection and decoder settings instead." },
      { q: "Does a VPN slow down IPTV?", a: "A little, always. A good VPN on a nearby server keeps the loss small — usually unnoticeable for HD and fine for 4K on a fast line." },
      { q: "What's the best VPN for IPTV?", a: "Any reputable, fast, no-logs VPN with servers near you works well. Avoid free VPNs — they're slow and often cap data, which ruins streaming." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "how-much-does-iptv-cost": {
    slug: "how-much-does-iptv-cost",
    title: "How much does IPTV cost?",
    emoji: "💷",
    category: "Buying Advice",
    description:
      "How much does IPTV cost in 2026? Typical monthly and yearly prices, why 'lifetime' deals are a red flag, and how to judge real value beyond the headline price.",
    answer:
      "IPTV typically costs around $10–20 per month, dropping to roughly $5–10 per month when you pay yearly. That's a fraction of cable, for far more channels and on-demand content. Be wary of ultra-cheap 'lifetime' offers — they rarely last. Judge value on stability, support and a free trial, not just the lowest price.",
    sections: [
      {
        heading: "Typical pricing in 2026",
        body: [
          "Monthly plans usually land around $10–20. Yearly plans bring the effective cost down to roughly $5–10 a month, which is why most people choose 12 months once they're happy after a trial.",
          "Multi-connection plans (to watch on two or more screens at once) cost a little more. Compared with a cable bill of $60–130 a month, even a premium IPTV plan is dramatically cheaper.",
        ],
      },
      {
        heading: "Why the cheapest option usually costs more",
        body: [
          "'Lifetime IPTV for £10' is a classic red flag — servers cost money to run, so these vanish within weeks and you lose both the service and your payment.",
          "Real value is uptime, 4K stability, working EPG and responsive support. A slightly higher price with a free trial and a refund policy is far cheaper than paying twice because the bargain died.",
        ],
      },
    ],
    faq: [
      { q: "How much is IPTV per month?", a: "Usually $10–20 monthly, or about $5–10 a month on a yearly plan. Prices vary with channel count, 4K content and how many simultaneous screens you need." },
      { q: "Are lifetime IPTV subscriptions worth it?", a: "Almost never. Running servers is an ongoing cost, so 'lifetime' deals are unsustainable and typically disappear fast. Choose a normal monthly or yearly plan with support." },
      { q: "Can I try IPTV before paying?", a: "Yes — a reputable provider offers a free 24h trial with no card, so you can confirm the quality and honesty before committing." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "iptv-free-trial": {
    slug: "iptv-free-trial",
    title: "How to get an IPTV free trial (no credit card)",
    emoji: "🎟️",
    category: "Buying Advice",
    description:
      "How to get a genuine IPTV free trial in 2026 — usually 24 hours, no credit card. What a good trial should include and how to test quality before you buy.",
    answer:
      "A genuine IPTV free trial is usually 24 hours with no credit card required. You message the provider, they send a temporary login, and you test it in any player app. Use the trial to check 4K stability at peak time, sports channels, EPG and support response — if a seller refuses a trial, walk away.",
    sections: [
      {
        heading: "What a real free trial looks like",
        body: [
          "No card, quick setup: you request it (often via WhatsApp), receive a temporary Xtream Codes login within minutes, and load it into IPTV Smarters or TiviMate. No payment details should be needed to trial.",
          "Full access: a good trial gives you the real channel list and VOD, not a crippled demo — so you can judge the actual service.",
        ],
      },
      {
        heading: "How to test in 24 hours",
        body: [
          "Test at peak time (evening) on the channels you care about — especially live sports in 4K, which is the hardest test of stability.",
          "Check the EPG loads, try the movies/series library, and message support with a question to see how fast they respond. A provider confident enough to give a free trial usually has the quality to back it up.",
        ],
      },
    ],
    faq: [
      { q: "Are IPTV free trials really free?", a: "Yes, a legitimate trial is genuinely free and needs no card. It's a short window (often 24h) so you can verify quality before subscribing." },
      { q: "Why do some sellers refuse a free trial?", a: "Usually because they're not confident in their quality — or they're a scam. A refusal to let you test first is a strong reason to look elsewhere." },
      { q: "How do I start a free trial?", a: "Message the provider (we do it over WhatsApp), and you'll get a temporary login in minutes to load into any IPTV player app." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "best-iptv-for-firestick": {
    slug: "best-iptv-for-firestick",
    title: "Best IPTV setup for Amazon Firestick",
    emoji: "🔥",
    category: "Buying Advice",
    description:
      "The best IPTV setup for Firestick in 2026: which Fire TV model to use, the best player apps (TiviMate, IPTV Smarters), and how to get smooth 4K without buffering.",
    answer:
      "The best IPTV experience on Firestick comes from a Firestick 4K or 4K Max running TiviMate or IPTV Smarters Pro, on 5 GHz Wi-Fi or Ethernet, with Hardware+ decoding enabled. The base Firestick works but can run low on memory — the 4K Max is the sweet spot for reliable 4K IPTV.",
    sections: [
      {
        heading: "Best Firestick model and apps",
        body: [
          "Model: Firestick 4K or 4K Max. Both handle 4K HEVC smoothly and have enough memory for a good player. The cheapest Lite/HD model is fine for HD but tighter on 4K.",
          "Apps: TiviMate for the best remote-driven EPG and recording, or IPTV Smarters Pro for the simplest cross-device setup. Both install on Firestick and log in with your Xtream Codes details.",
        ],
      },
      {
        heading: "Getting smooth 4K on Firestick",
        body: [
          "Set the player decoder to Hardware+ so the chip handles 4K, use 5 GHz Wi-Fi (or an Ethernet adapter), and set Fire TV display output to 4K.",
          "Reboot the Firestick weekly and clear the app cache occasionally — Fire OS leaks memory, and this alone prevents most mid-stream stops. See our full Firestick install guide for the step-by-step.",
        ],
      },
    ],
    faq: [
      { q: "Which IPTV app is best for Firestick?", a: "TiviMate for the best EPG and recording; IPTV Smarters Pro for simplicity and multi-device use. Both work great with Best IPTV VIP." },
      { q: "Do I need the 4K Max or is the basic Firestick fine?", a: "The 4K/4K Max is best for reliable 4K IPTV thanks to more memory. The basic model works for HD but can struggle with heavy 4K channels." },
      { q: "Why does IPTV buffer on my Firestick?", a: "Usually 2.4 GHz Wi-Fi, software decoding, or a full cache. Switch to 5 GHz/Ethernet, set Hardware+ decoding, and reboot weekly." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "best-iptv-for-sports": {
    slug: "best-iptv-for-sports",
    title: "Best IPTV for live sports (football, PPV, F1)",
    emoji: "⚽",
    category: "Use Cases",
    description:
      "What to look for in an IPTV service for live sports in 2026: 4K 60fps, anti-freeze servers at peak time, multi-screen, and full match-day channel coverage.",
    answer:
      "The best IPTV for sports delivers 4K/60fps on premium channels without freezing at kickoff, carries the full range of sports networks (football, NBA, NFL, F1, PPV/boxing), and offers multi-screen so you can watch several games at once. Peak-hour stability matters more than channel count — test it during a live match.",
    sections: [
      {
        heading: "What matters for live sports",
        body: [
          "Peak-time stability: the real test is a big match at kickoff, when servers are busiest. Look for providers running anti-freeze load balancing across multiple data centres so 4K sport doesn't stutter.",
          "Coverage: full football (Premier League, Champions League, La Liga), US sports (NBA, NFL, MLB), motorsport (F1), and PPV events like boxing and UFC — plus the FHD/4K versions of each channel.",
        ],
      },
      {
        heading: "Setup for the best match-day experience",
        body: [
          "Use a strong device (Firestick 4K Max, NVIDIA Shield or Formuler) on Ethernet, with Hardware+ decoding and a slightly larger buffer for freeze-free 4K.",
          "Multi-screen players (TiviMate, XCIPTV) let you watch several games side by side. Always test sports on a free trial during a live event before committing.",
        ],
      },
    ],
    faq: [
      { q: "Can I watch football in 4K on IPTV?", a: "Yes, on providers that carry 4K sports feeds. You'll need a 25+ Mbps connection, a 4K-capable device and Hardware+ decoding to get the full quality." },
      { q: "Does IPTV show PPV events like boxing and UFC?", a: "Many services include major PPV and event channels. Confirm coverage of the specific event you want during your free trial." },
      { q: "Will sports channels freeze at kickoff?", a: "Not on a well-run service with load balancing. If one channel freezes at peak, a good provider rebalances it server-side — test during a live match to be sure." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },

  "iptv-on-multiple-devices": {
    slug: "iptv-on-multiple-devices",
    title: "Can I use IPTV on multiple devices at once?",
    emoji: "📶",
    category: "How It Works",
    description:
      "Can you watch IPTV on multiple devices or TVs at the same time? How simultaneous connections work, and how to add more screens to one subscription.",
    answer:
      "Yes — you can install IPTV on as many devices as you like, but the number you can watch at the same time is set by your plan's 'simultaneous connections'. A single-connection plan means one screen at a time; add connections to watch on two or more TVs at once. Your login moves freely between devices.",
    sections: [
      {
        heading: "Devices vs simultaneous connections",
        body: [
          "You can set up your login on the Firestick, the bedroom TV, your phone and a laptop — there's no limit on installs. The limit is how many stream at the same moment.",
          "That limit is the 'connection count' on your plan. One connection = one active stream at a time; two connections = two different channels on two screens simultaneously, and so on.",
        ],
      },
      {
        heading: "Adding more screens",
        body: [
          "If everyone wants to watch different channels at once, ask your provider to increase your connections — it's a small add-on, not a second subscription.",
          "Moving to a new device is free: install the app and enter the same login. For MAC-portal apps (MAG, IBO, Duplex) send the new MAC so it can be registered.",
        ],
      },
    ],
    faq: [
      { q: "How many devices can use one IPTV subscription?", a: "Unlimited installs, but simultaneous viewing is capped by your connection count. One connection streams one screen at a time." },
      { q: "How do I watch on two TVs at the same time?", a: "Get a 2-connection (or higher) plan. Then two TVs can play different channels at once under the same account." },
      { q: "Does switching devices cost extra?", a: "No. Moving your login to a new device is free. You only pay more if you want additional simultaneous screens." },
    ],
    funnelDevice: "smart-tv",
    updated: "2026-07-18",
  },

  "does-iptv-support-4k": {
    slug: "does-iptv-support-4k",
    title: "Does IPTV support 4K UHD?",
    emoji: "🎥",
    category: "Quality",
    description:
      "Does IPTV support 4K? What you need for true 4K UHD IPTV — bandwidth, device, HEVC decoding and the right channel version — and why some 'HD' streams look soft.",
    answer:
      "Yes, IPTV supports 4K UHD on services that carry 4K feeds. To actually get 4K you need a 25+ Mbps connection, a 4K-capable device (Firestick 4K, Shield, Formuler), Hardware+ (HEVC/H.265) decoding, and you must select the channel's 4K/UHD version. Miss any one of those and you'll see HD instead.",
    sections: [
      {
        heading: "What you need for true 4K",
        body: [
          "Bandwidth: 25–35 Mbps steady per 4K stream, ideally over Ethernet or 5 GHz Wi-Fi. On a weak connection the stream auto-drops to HD to avoid buffering.",
          "Device + decoding: a 4K-capable player (Firestick 4K/4K Max, NVIDIA Shield, Formuler Z) with the decoder set to Hardware+ so the chip handles HEVC. A device output stuck at 1080p caps everything at 1080p.",
        ],
      },
      {
        heading: "Why some channels still look HD",
        body: [
          "Not every channel is broadcast in 4K — many sources are FHD at best. Where a 4K version exists, it's usually in a separate 4K/UHD category; select that one.",
          "If a '4K' channel still looks soft, check your device output is set to 2160p and Hardware+ is on. See our improve-quality guide for the full checklist.",
        ],
      },
    ],
    faq: [
      { q: "Is IPTV really 4K or upscaled?", a: "Genuine 4K channels are true UHD where the source provides it. Some channels are only broadcast in HD/FHD, so no service can make those native 4K." },
      { q: "How much internet do I need for 4K IPTV?", a: "About 25–35 Mbps steady per 4K stream, and ideally a wired connection for rock-solid playback." },
      { q: "Why is my 4K IPTV playing in HD?", a: "Usually the connection dropped it to protect against buffering, the device output is capped at 1080p, or you're on the HD version of the channel. Fix all three." },
    ],
    funnelDevice: "android",
    updated: "2026-07-18",
  },

  "what-is-catch-up-tv": {
    slug: "what-is-catch-up-tv",
    title: "What is catch-up / replay TV on IPTV?",
    emoji: "⏮️",
    category: "Features",
    description:
      "Catch-up TV on IPTV explained: how to rewind and replay programmes that already aired, how many days are available, and how to set it up in TiviMate and Smarters.",
    answer:
      "Catch-up (or replay) lets you watch programmes that already aired by scrolling back in the TV guide and pressing play — like a giant rewind for live channels. On supported channels you can typically go back several days. Enable it in your player (TiviMate, XCIPTV) and open a past programme in the EPG to watch it.",
    sections: [
      {
        heading: "How catch-up works",
        body: [
          "The server records supported channels continuously, so you can open the EPG, scroll to an earlier time, select a programme that already finished, and it plays from the start. It's perfect for a match or show you missed.",
          "Availability is usually a rolling window of a few days and varies by channel — the guide marks which programmes can be replayed.",
        ],
      },
      {
        heading: "Setting it up",
        body: [
          "TiviMate: Settings → Playback → enable Catch-up, then open the EPG, pick a past programme and press OK. IPTV Smarters/XCIPTV work the same way from the guide.",
          "You need a Xtream Codes login (not a plain M3U) for catch-up to appear, since the guide data drives it. Our server keeps several days of archive on many channels.",
        ],
      },
    ],
    faq: [
      { q: "What's the difference between catch-up and recording?", a: "Catch-up replays what the server already stored for everyone; recording saves a programme to your own device/USB for later. Catch-up needs no setup beyond enabling it." },
      { q: "How many days of catch-up do I get?", a: "Typically a few days, depending on the channel. The EPG shows which past programmes are available to replay." },
      { q: "Why don't I see catch-up in my app?", a: "You probably logged in with M3U instead of Xtream Codes, or catch-up isn't enabled in the player settings. Switch to Xtream Codes and enable it." },
    ],
    funnelDevice: "android",
    updated: "2026-07-18",
  },

  "how-to-pay-for-iptv-safely": {
    slug: "how-to-pay-for-iptv-safely",
    title: "How to pay for IPTV safely",
    emoji: "💳",
    category: "Buying Advice",
    description:
      "The safest ways to pay for IPTV in 2026: card, PayPal and reputable crypto checkouts, why to avoid anonymous transfers, and how to protect yourself with a trial and refund policy.",
    answer:
      "Pay for IPTV with a traceable method — a card checkout, PayPal, or a reputable crypto gateway — never an anonymous bank transfer to a personal account. Always test with a free trial first and choose a provider with a written refund policy, so if anything goes wrong you can dispute the charge and get your money back.",
    sections: [
      {
        heading: "Safe payment methods",
        body: [
          "Card or a proper card processor: gives you chargeback protection if the service isn't delivered. PayPal adds buyer protection too. A reputable crypto checkout is fine for privacy and is increasingly common.",
          "What to avoid: sending card photos over chat, gift cards, or anonymous transfers to a named individual — these leave you no recourse if the seller vanishes.",
        ],
      },
      {
        heading: "Protect yourself before you pay",
        body: [
          "Trial first: verify quality with a free 24h trial before spending anything. A provider confident in its service will always let you test.",
          "Check the refund policy and support: a clear, written refund window and responsive support are the signs of a legitimate operation worth paying.",
        ],
      },
    ],
    faq: [
      { q: "Can I pay for IPTV with PayPal or card?", a: "Yes — both are among the safest options because they offer buyer/chargeback protection. Use a proper checkout, not card details sent over chat." },
      { q: "Is it safe to pay for IPTV with crypto?", a: "Through a reputable crypto checkout, yes — it's fast and private. Just make sure the provider also offers a trial and refund policy so you're not paying blind." },
      { q: "What payment methods should I avoid?", a: "Anonymous bank transfers to a personal account, gift cards, and sending photos of your card. If those are the only options, choose a different provider." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-18",
  },
};
