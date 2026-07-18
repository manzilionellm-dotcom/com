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
};
