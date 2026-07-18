import type { KbSlug } from "../site";

export type KbFaq = { q: string; a: string };
export type KbSection = { heading: string; body: string[] };

export type KbArticle = {
  slug: KbSlug;
  title: string;
  emoji: string;
  keyword: string;
  description: string;
  /** Answer-first summary (FAQPage/GEO snippet target) */
  answer: string;
  sections: KbSection[];
  faq: KbFaq[];
  updated: string;
};

const UPDATED = "2026-07-15";

export const KB_ARTICLES: Record<KbSlug, KbArticle> = {
  "what-is-iptv": {
    slug: "what-is-iptv",
    title: "What is IPTV and how does it work?",
    emoji: "📡",
    keyword: "what is iptv and how does it work",
    description:
      "IPTV explained simply: what it is, how it delivers live TV and movies over the internet, the difference from cable and streaming apps, and what you need to watch it.",
    answer:
      "IPTV (Internet Protocol Television) delivers live TV channels, movies and series over your internet connection instead of through a satellite dish or cable line. You install a player app (like IPTV Smarters or TiviMate) on a device you already own, log in with credentials from a provider, and stream thousands of channels on demand.",
    sections: [
      {
        heading: "How IPTV actually works",
        body: [
          "Traditional TV broadcasts every channel at once over cable or satellite; your box just tunes to one. IPTV is different — the video is stored on servers and sent to you as data packets over the internet, only for the channel you request, exactly like YouTube or Netflix streams a video.",
          "A provider’s servers ‘ingest’ TV channels, transcode them into internet-friendly formats (usually H.264 for HD and H.265/HEVC for 4K), and expose them through a playlist. Your player app requests a channel, the server streams it, and you watch in near real-time.",
          "Because it’s just data, IPTV works on almost anything with a screen and internet: Smart TVs, Firestick, Android boxes, phones, tablets and computers.",
        ],
      },
      {
        heading: "What you need to watch IPTV",
        body: [
          "1) A compatible device — Firestick, Smart TV, Android box, phone, or PC. 2) A stable internet connection — about 10 Mbps for HD, 25 Mbps+ for 4K. 3) A player app — IPTV Smarters Pro, TiviMate, IBO Player and similar. 4) A subscription/line from a provider, which gives you the login (Xtream Codes credentials or an M3U link).",
          "Setup is quick: install the app, enter the login, and the channels, movies and EPG (program guide) load automatically. With Best IPTV VIP that’s typically under 10 minutes from order to first channel.",
        ],
      },
      {
        heading: "IPTV vs cable vs streaming apps",
        body: [
          "Versus cable/satellite: IPTV needs no dish, no engineer visit, no long contract — and it costs far less. You reuse devices you already own.",
          "Versus Netflix/Disney+: those are single-catalogue apps. IPTV aggregates live TV (including sports and news) plus a large on-demand library in one interface, across regions, which no single mainstream app offers.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a special box to watch IPTV?",
        a: "No. Any Firestick, Smart TV, Android box, phone or PC you already own works. A dedicated box like Formuler or NVIDIA Shield is nicer but optional.",
      },
      {
        q: "Is IPTV the same as streaming?",
        a: "Technically yes — it streams video over the internet. The difference is IPTV focuses on live TV channels plus VOD, while apps like Netflix are on-demand only.",
      },
      {
        q: "How much internet speed do I need?",
        a: "Around 10 Mbps for HD and 25 Mbps+ for smooth 4K. See our internet-speed guide for details.",
      },
    ],
    updated: UPDATED,
  },

  "how-to-install-iptv": {
    slug: "how-to-install-iptv",
    title: "How to install IPTV (any device, step by step)",
    emoji: "🛠️",
    keyword: "how to install iptv",
    description:
      "A universal step-by-step guide to install IPTV on any device: choose an app, get your login, enter Xtream Codes, and load channels and EPG in minutes.",
    answer:
      "To install IPTV: pick a player app for your device (IPTV Smarters Pro works everywhere), install it from the app store, choose ‘Login with Xtream Codes API’, and enter the Server URL, Username and Password from your provider. The channels, movies and program guide load automatically — usually in under five minutes.",
    sections: [
      {
        heading: "Step 1 — Choose the right app for your device",
        body: [
          "Firestick / Android TV: TiviMate (best EPG) or IPTV Smarters Pro. iPhone / iPad: IPTV Smarters Pro or GSE Smart IPTV. Samsung / LG Smart TV: IBO Player Pro, Duplex IPTV or Sparkle TV. PC / Mac: VLC, Kodi or IPTV Smarters Desktop. MAG box: it’s built in — just send your MAC.",
          "If you’re unsure, IPTV Smarters Pro is the safe universal choice — it behaves the same on every platform.",
        ],
      },
      {
        heading: "Step 2 — Get your login",
        body: [
          "From your provider you’ll receive either Xtream Codes credentials (a Server URL, Username and Password) or a single M3U URL. Xtream is preferred because it loads the channel list and the EPG together. With Best IPTV VIP we send these on WhatsApp right after your order or free trial.",
        ],
      },
      {
        heading: "Step 3 — Enter the login and sync",
        body: [
          "Open the app, choose ‘Add playlist / Login with Xtream Codes API’, and paste your details exactly (the URL starts with http:// and includes the port). The app connects and pulls Live TV, Movies, Series and the EPG.",
          "Give the guide a minute to populate on first launch, set your timezone so it lines up, then create a few favourites. That’s it — you’re watching.",
        ],
      },
      {
        heading: "Step 4 — Optimise (optional but recommended)",
        body: [
          "Set the decoder to Hardware for smooth 4K, prefer Ethernet or 5GHz Wi-Fi, and enable catch-up if your app supports it. These small tweaks prevent most buffering and playback issues later.",
        ],
      },
    ],
    faq: [
      {
        q: "Which is the easiest app to install?",
        a: "IPTV Smarters Pro — it’s a free store install on every platform and uses the same Xtream login everywhere. TiviMate is best if you only use Android TV/Firestick.",
      },
      {
        q: "Do I use the M3U link or Xtream Codes?",
        a: "Use Xtream Codes if you have it — it loads channels and the EPG in one step. M3U works too but often needs a separate EPG URL.",
      },
      {
        q: "How long does installation take?",
        a: "Usually under five minutes once you have your login. Our device-specific guides walk you through each app screen by screen.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-internet-speed-requirements": {
    slug: "iptv-internet-speed-requirements",
    title: "IPTV internet speed requirements (SD, HD, 4K)",
    emoji: "🚀",
    keyword: "iptv internet speed requirements",
    description:
      "How much internet speed do you need for IPTV? Exact Mbps for SD, HD, Full HD and 4K, plus why a stable connection matters more than raw speed.",
    answer:
      "For IPTV you need roughly 5 Mbps for SD, 10 Mbps for HD, 15–20 Mbps for Full HD, and 25 Mbps+ for 4K UHD per stream. Add up every device streaming at once. Stability matters more than headline speed — a steady 30 Mbps beats a spiky 100 Mbps that drops packets.",
    sections: [
      {
        heading: "Speed by quality (per stream)",
        body: [
          "SD (480p): ~3–5 Mbps. HD (720p): ~8–10 Mbps. Full HD (1080p): ~12–20 Mbps. 4K UHD (2160p, HEVC): ~25–35 Mbps. These are per simultaneous stream — two 4K TVs at once need ~50–70 Mbps combined.",
          "Best IPTV VIP uses H.265/HEVC transcoding, so our 4K needs less bandwidth than un-optimised providers, but you should still plan for 25 Mbps+ per 4K screen.",
        ],
      },
      {
        heading: "Why stability beats raw speed",
        body: [
          "IPTV streams in real time, so brief drops cause freezing even on a ‘fast’ line. Packet loss, high latency and Wi-Fi interference hurt more than a lower-but-steady speed. That’s why a wired Ethernet connection almost always outperforms Wi-Fi for IPTV, even at the same Mbps.",
          "Run a speed test on the actual streaming device (not just your phone next to the router) to see the real number that matters.",
        ],
      },
      {
        heading: "How to improve a marginal connection",
        body: [
          "Go wired, or move to 5GHz Wi-Fi and reduce distance/obstacles. Raise the buffer in your player. Reboot the router weekly. If your line genuinely can’t hit 25 Mbps, watch those channels in HD instead of 4K — it’ll be flawless.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch IPTV on 10 Mbps?",
        a: "Yes, in HD comfortably. 4K will struggle on 10 Mbps — stick to HD channels or upgrade your internet for 4K.",
      },
      {
        q: "Does more speed stop buffering?",
        a: "Only up to a point. Past 25 Mbps, stability (low packet loss, wired connection) matters more than extra Mbps. See our buffering fix guide.",
      },
      {
        q: "How much for two TVs at once?",
        a: "Add the per-stream figures: two 4K streams ≈ 50–70 Mbps; a 4K + an HD ≈ 35 Mbps.",
      },
    ],
    updated: UPDATED,
  },

  "how-to-improve-iptv-video-quality": {
    slug: "how-to-improve-iptv-video-quality",
    title: "How to improve IPTV picture quality",
    emoji: "🎬",
    keyword: "how to improve iptv picture quality",
    description:
      "Get sharper IPTV picture quality: pick 4K/FHD streams, set hardware decoding, fix your network, and tune TV settings for the best image without buffering.",
    answer:
      "To improve IPTV picture quality: choose the 4K/FHD version of a channel where offered, set your player’s decoder to Hardware, ensure 25 Mbps+ on a wired connection, and turn off aggressive TV ‘smoothing’ while enabling the correct HDR/4K output. Quality is capped by the lowest of source resolution, bandwidth and device.",
    sections: [
      {
        heading: "Pick the highest-quality source",
        body: [
          "Many channels are offered in multiple qualities (SD/HD/FHD/4K). Choose the FHD or 4K variant if your bandwidth and device allow it. A channel can only look as good as the feed you select.",
          "Best IPTV VIP carries 3,500+ channels in true 4K UHD — look for the 4K/UHD category rather than the default SD list.",
        ],
      },
      {
        heading: "Set the device and player correctly",
        body: [
          "In your player, set the decoder to Hardware/Hardware+ so the device’s chip renders 4K/HEVC efficiently. On the TV, make sure the HDMI input is set to accept 4K/HDR (Samsung: ‘HDMI UHD Color’ / ‘Input Signal Plus’; LG: ‘HDMI Deep Colour’), or 4K sources fall back to 1080p.",
          "Use a capable device: Firestick 4K Max, NVIDIA Shield, Formuler Z11 or a modern Smart TV. A Firestick Lite or old box tops out at 1080p regardless of the source.",
        ],
      },
      {
        heading: "Fix the network and TV processing",
        body: [
          "Bandwidth throttling silently drops quality: go wired, get 25 Mbps+, and raise the buffer so the player doesn’t down-rate under pressure.",
          "On the TV, disable heavy motion-smoothing/‘soap opera’ effects and noise reduction for a more natural picture, and set Picture mode to Movie/Filmmaker for accurate colour.",
        ],
      },
    ],
    faq: [
      {
        q: "Why does my 4K channel look like HD?",
        a: "Either the TV’s HDMI input isn’t set to accept 4K/HDR, your bandwidth is forcing a lower rate, or the device can’t decode 4K. Fix the HDMI setting first, then check speed and decoder.",
      },
      {
        q: "Does the app affect picture quality?",
        a: "Indirectly — via the decoder and buffer settings. The source resolution and your bandwidth set the ceiling; the app just needs hardware decoding enabled.",
      },
      {
        q: "Is 4K worth it over Full HD?",
        a: "On a 55\"+ TV with 25 Mbps+, yes — noticeably sharper. On a phone or small TV, Full HD looks essentially identical and uses far less data.",
      },
    ],
    updated: UPDATED,
  },

  "xtream-codes-vs-m3u": {
    slug: "xtream-codes-vs-m3u",
    title: "Xtream Codes vs M3U — which login should you use?",
    emoji: "🔑",
    keyword: "xtream codes vs m3u url",
    description:
      "Xtream Codes API vs M3U URL explained: the difference, why Xtream loads EPG automatically, and when to use each for your IPTV player.",
    answer:
      "Use Xtream Codes API when your app offers it — it loads live TV, movies, series and the EPG together and organises everything into categories. An M3U URL is a single link that mainly carries the channel list and usually needs a separate EPG URL. Same subscription, two ways to connect; Xtream is the better experience in modern apps.",
    sections: [
      {
        heading: "What each one is",
        body: [
          "Xtream Codes API is a login made of three parts — Server URL, Username and Password. The app talks to the provider’s panel and pulls a structured catalogue: Live TV, Movies, Series, categories and the EPG, all in one step.",
          "An M3U (or M3U8) URL is one long link containing your username/password as parameters. It delivers a flat playlist of channels. It works in almost everything (including VLC), but categories and EPG are more limited and often need a separate XMLTV/EPG link.",
        ],
      },
      {
        heading: "When to use which",
        body: [
          "Use Xtream Codes in TiviMate, IPTV Smarters, XCIPTV and MyTVOnline — it gives the best EPG, catch-up and VOD organisation. This is what Best IPTV VIP issues by default.",
          "Use M3U for VLC, Kodi (PVR IPTV Simple Client), or any app that doesn’t support Xtream. It’s the universal fallback. For Kodi you’ll add our EPG URL separately for a guide.",
        ],
      },
      {
        heading: "They’re the same subscription",
        body: [
          "Both point at the same line — choosing M3U instead of Xtream doesn’t change your channels or cost. Pick whichever your player supports best. If an app offers both, choose Xtream.",
        ],
      },
    ],
    faq: [
      {
        q: "Is Xtream Codes safer than M3U?",
        a: "Neither is ‘safer’ — they’re just two ways to connect to your line. Xtream is more feature-rich (EPG, categories, catch-up); M3U is more universally compatible.",
      },
      {
        q: "My app only supports M3U — is that a problem?",
        a: "No. M3U plays all your channels. You may just need to add our EPG URL separately for a program guide. Ask us on WhatsApp and we’ll send it.",
      },
      {
        q: "Can I switch between them later?",
        a: "Yes, any time — both work on the same subscription. Many people use Xtream on their TV app and M3U in VLC on a laptop.",
      },
    ],
    updated: UPDATED,
  },

  "what-is-epg-iptv": {
    slug: "what-is-epg-iptv",
    title: "What is EPG in IPTV (and how to fix a blank guide)?",
    emoji: "🗓️",
    keyword: "what is epg in iptv",
    description:
      "EPG in IPTV explained: what the Electronic Program Guide does, how it loads, and how to fix a blank or wrong-time guide by using Xtream login and setting your timezone.",
    answer:
      "EPG (Electronic Program Guide) is the on-screen TV schedule showing what’s on now and next for each channel, plus a full timeline. It loads automatically when you connect via Xtream Codes. If it’s blank, use the Xtream login (not bare M3U), refresh the EPG, and set your device timezone so programmes line up.",
    sections: [
      {
        heading: "What the EPG does",
        body: [
          "The EPG turns a raw channel list into a proper TV guide: current and upcoming programmes, descriptions, and a scrollable timeline. It’s what powers catch-up (rewinding past shows) and scheduled recording in apps like TiviMate.",
          "Behind the scenes the guide is an XMLTV data feed the provider supplies alongside the channels. Your app matches each channel to its schedule.",
        ],
      },
      {
        heading: "Why your EPG might be blank or wrong",
        body: [
          "Blank guide: you connected via a plain M3U link with no EPG source, or the first sync hasn’t finished. Fix it by logging in with Xtream Codes (which includes the EPG) or by adding our EPG/XMLTV URL manually, then refreshing.",
          "Wrong times: your device timezone is off, so every programme looks shifted by a few hours. Set the correct timezone/offset in the device or the app’s EPG settings.",
        ],
      },
      {
        heading: "How to refresh the EPG",
        body: [
          "In TiviMate: Settings → EPG → Update. In IPTV Smarters/XCIPTV: pull to refresh or re-add the user. Give it a minute — a full 22,000-channel guide takes a moment to download on first load.",
        ],
      },
    ],
    faq: [
      {
        q: "My guide is empty — how do I fix it fastest?",
        a: "Re-add your line using Xtream Codes (not M3U), then force an EPG refresh and set your timezone. That resolves the vast majority of blank-guide cases.",
      },
      {
        q: "Why are the programme times wrong?",
        a: "Your device or app timezone is incorrect. Set it to your local timezone and the schedule will realign immediately.",
      },
      {
        q: "Do all channels have EPG?",
        a: "Most major channels do. A few niche or regional channels may have partial or no guide data — that’s normal and not a fault with your line.",
      },
    ],
    updated: UPDATED,
  },

  "is-iptv-legal": {
    slug: "is-iptv-legal",
    title: "Is IPTV legal?",
    emoji: "⚖️",
    keyword: "is iptv legal",
    description:
      "Is IPTV legal? A clear, honest explanation: the technology is legal, legality depends on content licensing and your country’s laws, and how to stay on the right side of it.",
    answer:
      "IPTV as a technology is completely legal — it’s just television delivered over the internet, used by major broadcasters and telecom operators worldwide. What can be legal or not is the content: a service is legitimate when it holds the proper rights/licences for the channels it carries. Legality also depends on your country’s laws, so check local regulations.",
    sections: [
      {
        heading: "The technology vs the content",
        body: [
          "IPTV itself is a mainstream, legal delivery method. Telecom giants and broadcasters (BT, Orange, AT&T and many others) deliver their TV over IPTV. There is nothing inherently unlawful about streaming television over the internet.",
          "The legal question is about rights: whether the service distributing a given channel or film holds the licence to do so, and whether viewing it is permitted where you live. That varies by provider, by content and by jurisdiction.",
        ],
      },
      {
        heading: "How to stay on the right side of it",
        body: [
          "Understand your local laws — rules differ significantly between countries and can change. This article is general information, not legal advice; if you’re unsure, check the regulations that apply to you.",
          "Choose providers transparently and keep your own use lawful in your region. When in doubt about a specific channel or region, ask the provider directly what rights and coverage they offer.",
        ],
      },
      {
        heading: "Privacy and good practice",
        body: [
          "Many users run a VPN for general privacy on any streaming service — it encrypts traffic and is a common, legal privacy tool. See our VPN setup guide if you want that layer.",
          "Keep payments and accounts on reputable methods, and prefer services that offer a trial, clear support and a refund policy so you can evaluate quality and legitimacy before committing.",
        ],
      },
    ],
    faq: [
      {
        q: "Is using an IPTV app illegal?",
        a: "No — apps like VLC, Kodi, TiviMate and IPTV Smarters are legal, general-purpose players. Legality depends on the content you access and your local laws, not the app.",
      },
      {
        q: "Do I need a VPN for IPTV?",
        a: "It’s not required. Some people use one for general privacy on any streaming service. It’s a legal privacy tool; see our VPN guide.",
      },
      {
        q: "Does IPTV legality differ by country?",
        a: "Yes, significantly. Content licensing and streaming laws vary by jurisdiction and change over time — always check the rules where you live.",
      },
    ],
    updated: UPDATED,
  },

  "how-to-setup-vpn-for-iptv": {
    slug: "how-to-setup-vpn-for-iptv",
    title: "How to set up a VPN for IPTV",
    emoji: "🔒",
    keyword: "best vpn for iptv setup",
    description:
      "Set up a VPN for IPTV in minutes: why people use one, how to pick a fast server, and how to install it on Firestick, Android and routers without buffering.",
    answer:
      "To use a VPN with IPTV, install a reputable VPN app on your streaming device (or router), connect to a nearby, fast server, then open your IPTV player as normal. A VPN is a privacy tool and can bypass ISP throttling; pick a low-latency server and enable it before launching the app to avoid buffering.",
    sections: [
      {
        heading: "Why people use a VPN with IPTV",
        body: [
          "A VPN encrypts your internet traffic, which is a general privacy benefit on any streaming service. It can also bypass ISP throttling — if your provider slows video at peak times, a VPN sometimes restores smooth playback.",
          "It’s optional: IPTV works fine without one. If your ISP blocks a server (your streams fail on home Wi-Fi but work on mobile data), a VPN is the usual fix.",
        ],
      },
      {
        heading: "Choosing a server for speed",
        body: [
          "Latency matters more than distance marketing. Pick a server geographically close to you or close to the content’s region, and prefer providers with high-bandwidth, low-latency networks so 4K doesn’t buffer.",
          "Enable the VPN before opening your IPTV player. Test a channel; if it buffers, switch to a different nearby server — speeds vary a lot between servers.",
        ],
      },
      {
        heading: "Installing on your device",
        body: [
          "Firestick / Android TV: install the VPN app from the Amazon Appstore or Google Play, sign in, connect, then open your IPTV app. iPhone/iPad & Android phones: install from the App Store/Play Store the same way.",
          "Router-level: installing the VPN on your router protects every device at once (including Smart TVs that have no VPN app), but set it up carefully so it doesn’t slow your whole network. Use a router with a fast processor.",
        ],
      },
    ],
    faq: [
      {
        q: "Will a VPN slow down my IPTV?",
        a: "A good VPN on a nearby, fast server adds minimal overhead. A distant or overloaded server will slow things — switch servers if you see buffering.",
      },
      {
        q: "Do I have to use a VPN?",
        a: "No. IPTV works without one. Use it if you want general streaming privacy or if your ISP is blocking/throttling the connection.",
      },
      {
        q: "Which device should I install it on?",
        a: "The device you stream on (Firestick, phone, box). For Smart TVs without a VPN app, install it on your router instead.",
      },
    ],
    updated: UPDATED,
  },
};

export const KB_ORDER: KbSlug[] = [
  "what-is-iptv",
  "how-to-install-iptv",
  "iptv-internet-speed-requirements",
  "how-to-improve-iptv-video-quality",
  "xtream-codes-vs-m3u",
  "what-is-epg-iptv",
  "how-to-setup-vpn-for-iptv",
  "is-iptv-legal",
];
