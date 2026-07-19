import type { PlatformSlug, AppSlug, DeviceSlug } from "../site";

export type PlatformGuide = {
  slug: PlatformSlug;
  name: string;
  short: string;
  emoji: string;
  level: 2 | 3 | 4;
  keyword: string;
  hero: string;
  description: string;
  /** Answer-first summary (featured snippet / GEO). */
  answer: string;
  supportStatus: "Full support" | "Great support" | "Good support" | "Limited support";
  /** Player apps we recommend for this platform (link into /apps). */
  recommendedApps: AppSlug[];
  compatibility: string[];
  steps: { title: string; text: string }[];
  troubleshooting: { q: string; a: string }[];
  faq: { q: string; a: string }[];
  /** Honest caveat, required for Niveau 4 (Roku/Chromecast). */
  honestNote?: string;
  funnelDevice: DeviceSlug;
  updated: string;
};

export const PLATFORM_GUIDES: Record<PlatformSlug, PlatformGuide> = {
  // ---------- Niveau 2 — mainstream platforms ----------
  "fire-tv": {
    slug: "fire-tv",
    name: "Amazon Fire TV / Fire Stick",
    short: "Fire TV",
    emoji: "🔥",
    level: 2,
    keyword: "install iptv on fire tv",
    hero: "Install IPTV on Amazon Fire TV & Fire Stick",
    description:
      "How to install IPTV on any Amazon Fire TV device (Fire Stick, 4K, 4K Max, Fire TV Cube) with Best IPTV VIP — sideload TiviMate or IPTV Smarters Pro via Downloader and stream 4K in minutes.",
    answer:
      "To install IPTV on Fire TV, enable 'Apps from Unknown Sources', install the Downloader app, use it to sideload TiviMate or IPTV Smarters Pro, then log in with your Xtream Codes details. A Fire Stick 4K or 4K Max gives the smoothest 4K playback.",
    supportStatus: "Full support",
    recommendedApps: ["tivimate", "iptv-smarters-pro", "stb-emulator"],
    compatibility: ["Fire TV Stick (all gens)", "Fire TV Stick 4K & 4K Max", "Fire TV Cube", "Fire TV built-in (Toshiba, Insignia)"],
    steps: [
      { title: "Allow sideloading", text: "Settings → My Fire TV → Developer Options → enable 'Apps from Unknown Sources' (and 'Install unknown apps' for Downloader)." },
      { title: "Install Downloader", text: "From the Fire TV search, install the free Downloader app by AFTVnews." },
      { title: "Sideload your player", text: "Open Downloader and enter the APK link we send you for TiviMate or IPTV Smarters Pro. It downloads and installs in under a minute." },
      { title: "Log in with Xtream Codes", text: "Open the player → Add playlist / Login with Xtream Codes → paste the server URL, username and password from WhatsApp." },
      { title: "Enable 4K and enjoy", text: "Set the decoder to Hardware+ and Fire TV display to 4K. Your channels, movies and EPG load automatically." },
    ],
    troubleshooting: [
      { q: "The app won't install / 'app not installed'", a: "Make sure 'Apps from Unknown Sources' is on for Downloader, and free some space (Settings → Applications). Re-enter the APK link exactly." },
      { q: "Buffering on a base Fire Stick", a: "The cheapest models are memory-light. Reboot weekly, clear the app cache, use 5 GHz Wi-Fi, and set decoder to Hardware+. For heavy 4K, the 4K Max is worth it." },
    ],
    faq: [
      { q: "Which is the best IPTV app for Fire TV?", a: "TiviMate for the best EPG and recording; IPTV Smarters Pro for the simplest setup. Both sideload easily via Downloader." },
      { q: "Why isn't the IPTV app in the Amazon store?", a: "Amazon hides some IPTV players from search, so you sideload them with Downloader instead — completely normal and safe with the official APK we provide." },
      { q: "Do I need the 4K Max?", a: "For reliable 4K, yes — more memory means fewer freezes. The standard stick is fine for HD." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-19",
  },

  "android-tv": {
    slug: "android-tv",
    name: "Android TV",
    short: "Android TV",
    emoji: "🤖",
    level: 2,
    keyword: "install iptv on android tv",
    hero: "Install IPTV on Android TV (Sony, TCL, Philips, boxes)",
    description:
      "Install IPTV on any Android TV — Sony Bravia, TCL, Philips, Xiaomi Mi Box, Onn 4K — with Best IPTV VIP. Get TiviMate or IPTV Smarters straight from the Play Store and stream in 4K.",
    answer:
      "Android TV is the easiest platform for IPTV: install TiviMate or IPTV Smarters Pro directly from the Google Play Store, open it, and log in with your Xtream Codes server URL, username and password. No sideloading needed.",
    supportStatus: "Full support",
    recommendedApps: ["tivimate", "iptv-smarters-pro", "xciptv"],
    compatibility: ["Sony Bravia (Android TV)", "TCL & Philips Android TV", "Xiaomi Mi Box / TV Stick", "Onn 4K, Nokia, other Android boxes"],
    steps: [
      { title: "Open the Play Store", text: "On the Android TV home screen, open Google Play and search for TiviMate or IPTV Smarters Pro." },
      { title: "Install your player", text: "Install the app directly — Android TV is officially supported, so there's nothing to sideload." },
      { title: "Add your playlist", text: "Open the app → Add playlist → Xtream Codes → enter the server URL, username and password from WhatsApp." },
      { title: "Set decoder and layout", text: "Set the decoder to Hardware (Hardware+ on strong boxes) and choose your preferred EPG layout." },
      { title: "Watch", text: "Live TV, movies, series and the guide load automatically. Your login is saved for next time." },
    ],
    troubleshooting: [
      { q: "TiviMate isn't in my Play Store", a: "Some cheaper 'Android' boxes aren't certified Android TV. Sideload the APK we provide via the Downloader app, or use IPTV Smarters instead." },
      { q: "Stutter on 4K channels", a: "Use Ethernet or 5 GHz Wi-Fi, enable Hardware+ decoding, and raise the buffer slightly. Weak boxes may need the FHD channel version." },
    ],
    faq: [
      { q: "Best IPTV app for Android TV?", a: "TiviMate for the best remote-friendly EPG and recording; IPTV Smarters Pro for simplicity. XCIPTV is a great free alternative." },
      { q: "Is my TV an Android TV or a Google TV?", a: "Google TV is the newer interface on top of Android TV — both run the same apps, so these steps work for either." },
      { q: "Do I need a box if my TV is Android TV?", a: "No — the apps run on the TV directly. A box (Shield/Formuler) only adds power and features." },
    ],
    funnelDevice: "android",
    updated: "2026-07-19",
  },

  "google-tv": {
    slug: "google-tv",
    name: "Google TV (Chromecast, Onn)",
    short: "Google TV",
    emoji: "🟡",
    level: 2,
    keyword: "install iptv on google tv",
    hero: "Install IPTV on Google TV & Chromecast with Google TV",
    description:
      "Set up IPTV on Google TV — Chromecast with Google TV, Onn 4K Pro, TCL — with Best IPTV VIP. Install TiviMate or IPTV Smarters from the Play Store and stream 4K HDR.",
    answer:
      "Google TV runs Android TV apps, so installing IPTV is simple: get TiviMate or IPTV Smarters Pro from the Play Store, open it, and log in with your Xtream Codes details. 'Chromecast with Google TV' is a full streaming device — not the same as a basic Chromecast dongle.",
    supportStatus: "Full support",
    recommendedApps: ["tivimate", "iptv-smarters-pro"],
    compatibility: ["Chromecast with Google TV (HD & 4K)", "Onn 4K / 4K Pro (Google TV)", "TCL & Hisense Google TV", "Google TV Streamer"],
    steps: [
      { title: "Open Google Play", text: "From the Google TV home, open the Play Store and search TiviMate or IPTV Smarters Pro." },
      { title: "Install the player", text: "Install directly — Google TV supports these apps natively." },
      { title: "Log in with Xtream Codes", text: "Add playlist → Xtream Codes → paste the server URL, username and password from WhatsApp." },
      { title: "Optimise for 4K HDR", text: "Set decoder to Hardware+ and confirm the device output is 4K HDR in Google TV settings." },
      { title: "Enjoy", text: "Channels, VOD and EPG load automatically; pin your player to the Google TV home row for quick access." },
    ],
    troubleshooting: [
      { q: "Low on storage on Chromecast with Google TV", a: "The device has limited storage — uninstall unused apps, clear cache, and keep just your IPTV player. Reboot weekly for smooth playback." },
      { q: "Remote is fiddly for typing the login", a: "Use the Google TV phone app as a remote/keyboard to enter the server URL accurately." },
    ],
    faq: [
      { q: "Is Google TV the same as Chromecast?", a: "'Chromecast with Google TV' is a full Android-TV-based device that runs IPTV apps. A basic Chromecast only casts from a phone — see our Chromecast page for that." },
      { q: "Best IPTV app for Google TV?", a: "TiviMate or IPTV Smarters Pro — both install from the Play Store and work perfectly." },
      { q: "Does Google TV do 4K IPTV?", a: "Yes on the 4K models, with Hardware+ decoding and a 25+ Mbps connection." },
    ],
    funnelDevice: "android",
    updated: "2026-07-19",
  },

  "apple-tv": {
    slug: "apple-tv",
    name: "Apple TV 4K",
    short: "Apple TV",
    emoji: "🍎",
    level: 2,
    keyword: "install iptv on apple tv",
    hero: "Install IPTV on Apple TV 4K",
    description:
      "Install IPTV on Apple TV 4K with Best IPTV VIP using IPTV Smarters Pro from the App Store — or AirPlay from your iPhone. Full EPG, VOD and 4K playback on tvOS.",
    answer:
      "To install IPTV on Apple TV, open the App Store on tvOS, install IPTV Smarters Pro, and log in with your Xtream Codes details. Alternatively, AirPlay the stream from an iPhone or iPad. Apple TV 4K delivers excellent, stable 4K playback.",
    supportStatus: "Great support",
    recommendedApps: ["iptv-smarters-pro"],
    compatibility: ["Apple TV 4K (all gens)", "Apple TV HD", "tvOS 15+"],
    steps: [
      { title: "Open the App Store on Apple TV", text: "On tvOS, open the App Store and search 'IPTV Smarters Pro' (or GSE Smart IPTV)." },
      { title: "Install the app", text: "Install it directly on the Apple TV — no sideloading, no computer needed." },
      { title: "Log in with Xtream Codes", text: "Open the app → Add user → Xtream Codes API → enter the server URL, username and password from WhatsApp." },
      { title: "Or AirPlay from iPhone", text: "Alternatively, play in IPTV Smarters on your iPhone/iPad and AirPlay to the Apple TV in 4K." },
      { title: "Watch", text: "Full EPG, movies and series load. Use the Siri remote to browse; your login is saved." },
    ],
    troubleshooting: [
      { q: "The IPTV app isn't on the tvOS App Store in my region", a: "Availability varies by country. Use GSE Smart IPTV if Smarters is missing, or AirPlay from your iPhone as a reliable fallback." },
      { q: "Playback stutters", a: "Apple TV 4K is powerful, so stutter is almost always network — use Ethernet or strong 5 GHz Wi-Fi and retest a 4K channel." },
    ],
    faq: [
      { q: "Best IPTV app for Apple TV?", a: "IPTV Smarters Pro is the go-to on tvOS; GSE Smart IPTV is a solid alternative. Both use your Xtream Codes login." },
      { q: "Can I AirPlay IPTV to Apple TV?", a: "Yes — play in the iPhone/iPad app and AirPlay to the Apple TV for 4K on the big screen." },
      { q: "Is Apple TV good for IPTV?", a: "Very — the 4K model is fast and stable. The main limit is app availability, which Smarters/GSE cover." },
    ],
    funnelDevice: "ios",
    updated: "2026-07-19",
  },

  "samsung-tv": {
    slug: "samsung-tv",
    name: "Samsung Smart TV (Tizen)",
    short: "Samsung TV",
    emoji: "📺",
    level: 2,
    keyword: "install iptv on samsung smart tv",
    hero: "Install IPTV on Samsung Smart TV (Tizen)",
    description:
      "Install IPTV on any Samsung Smart TV (Tizen) with Best IPTV VIP using IBO Player Pro or Duplex Play — no sideloading. Add your playlist by MAC address and stream in minutes.",
    answer:
      "To install IPTV on a Samsung Smart TV, install IBO Player Pro (or Duplex Play) from the Samsung Apps store, note the MAC address it shows, then add your Best IPTV VIP M3U playlist from the app's website. Reopen the app and your channels appear — no sideloading required.",
    supportStatus: "Good support",
    recommendedApps: ["ibo-player", "duplex-play", "sparkle-tv"],
    compatibility: ["Samsung Tizen 2018+ (recommended)", "Samsung 2016–2017 (Smart IPTV / Set IPTV)", "The Frame, QLED, Crystal UHD, Neo QLED"],
    steps: [
      { title: "Install a Tizen IPTV app", text: "Open Samsung Apps / Smart Hub and install IBO Player Pro (recommended) or Duplex Play." },
      { title: "Note the MAC address", text: "Open the app — the home screen shows your device MAC and key. Photograph it." },
      { title: "Add your playlist online", text: "On your phone, open the app's management site (e.g. iboproapp.com), enter the MAC/key, and paste the M3U URL we send you." },
      { title: "Add EPG (optional)", text: "Paste our EPG URL into the guide field so the TV shows programme names and times." },
      { title: "Reopen the app", text: "Fully close and relaunch the app on the TV — channels, movies and guide load automatically." },
    ],
    troubleshooting: [
      { q: "Samsung removed 'Smart IPTV' from the store", a: "Use IBO Player Pro or Duplex Play instead — both are current on Tizen and work the same MAC-based way. We support all of them." },
      { q: "Playlist doesn't show after adding it", a: "Fully close the app (not just back out) and reopen — it only reads new playlists on a fresh launch. Confirm the MAC matches this TV." },
    ],
    faq: [
      { q: "Best IPTV app for Samsung Smart TV?", a: "IBO Player Pro is the most reliable on newer Tizen; Duplex Play and Sparkle TV are good alternatives if one won't activate on your model." },
      { q: "Do I need a Firestick for my Samsung TV?", a: "No — Tizen apps run natively. A Firestick only adds TiviMate/recording if you want more features." },
      { q: "Is there an activation fee?", a: "The Tizen apps charge a small one-time activation to the app maker, separate from your Best IPTV VIP subscription." },
    ],
    funnelDevice: "smart-tv",
    updated: "2026-07-19",
  },

  "lg-tv": {
    slug: "lg-tv",
    name: "LG Smart TV (webOS)",
    short: "LG TV",
    emoji: "📺",
    level: 2,
    keyword: "install iptv on lg smart tv",
    hero: "Install IPTV on LG Smart TV (webOS)",
    description:
      "Install IPTV on any LG Smart TV (webOS) with Best IPTV VIP using IBO Player Pro or Duplex Play from the LG Content Store. Add your playlist by MAC address — no sideloading.",
    answer:
      "To install IPTV on an LG Smart TV, install IBO Player Pro (or Duplex Play) from the LG Content Store, note the MAC address, then add your Best IPTV VIP M3U playlist from the app's website. Reopen the app and your channels load — no rooting or sideloading needed.",
    supportStatus: "Good support",
    recommendedApps: ["ibo-player", "duplex-play"],
    compatibility: ["LG webOS 3.0+ (2016 and newer)", "OLED, NanoCell, QNED, UHD models", "webOS 22/23/24"],
    steps: [
      { title: "Install a webOS IPTV app", text: "Open the LG Content Store and install IBO Player Pro (recommended) or Duplex Play." },
      { title: "Note the MAC address", text: "Launch the app — it shows your device MAC and key on the home screen. Photograph it." },
      { title: "Add your playlist online", text: "On your phone, open the app's portal, enter the MAC/key, and paste the M3U URL we send you on WhatsApp." },
      { title: "Add EPG (optional)", text: "Paste our EPG URL in the guide field for a full on-screen TV guide." },
      { title: "Reopen the app", text: "Fully close and relaunch on the TV; your full playlist appears." },
    ],
    troubleshooting: [
      { q: "App won't activate on my LG model", a: "Try the other player (IBO ↔ Duplex) — one usually works where the other doesn't. Older webOS 3.0/3.5 sets are pickier; message us and we'll pick the best option." },
      { q: "Channels load but no guide", a: "You added the M3U but not the EPG. Paste our EPG URL into the guide field on the app's portal and relaunch." },
    ],
    faq: [
      { q: "Best IPTV app for LG webOS?", a: "IBO Player Pro is the most dependable; Duplex Play is a strong backup. Both add playlists via a website using your TV's MAC." },
      { q: "Does my old LG TV support IPTV apps?", a: "webOS 3.0+ (2016 onward) generally does. Very old sets may not — a cheap Firestick is the easy upgrade path." },
      { q: "Is the app free?", a: "There's a free trial, then a small one-time activation to the app maker — separate from your subscription." },
    ],
    funnelDevice: "smart-tv",
    updated: "2026-07-19",
  },

  "nvidia-shield": {
    slug: "nvidia-shield",
    name: "NVIDIA Shield TV",
    short: "Shield TV",
    emoji: "🛡️",
    level: 2,
    keyword: "install iptv on nvidia shield",
    hero: "Install IPTV on NVIDIA Shield TV (Pro & Tube)",
    description:
      "Install IPTV on NVIDIA Shield TV and Shield Pro with Best IPTV VIP — the most powerful Android TV box for flawless 4K HEVC. Get TiviMate from the Play Store and go.",
    answer:
      "The NVIDIA Shield is the best Android TV box for IPTV. Install TiviMate or IPTV Smarters Pro from the Play Store, log in with your Xtream Codes details, and set the decoder to Hardware+ for flawless 4K HEVC. Its power means the smoothest possible playback and recording.",
    supportStatus: "Full support",
    recommendedApps: ["tivimate", "iptv-smarters-pro"],
    compatibility: ["NVIDIA Shield TV (Tube)", "NVIDIA Shield TV Pro", "Android TV / Google TV interface"],
    steps: [
      { title: "Open the Play Store", text: "On the Shield home, open Google Play and install TiviMate (best) or IPTV Smarters Pro." },
      { title: "Log in with Xtream Codes", text: "Add playlist → Xtream Codes → enter the server URL, username and password from WhatsApp." },
      { title: "Set Hardware+ decoding", text: "In the player, set the decoder to Hardware+ — the Shield's chip handles 4K HEVC effortlessly." },
      { title: "Enable recording (Pro)", text: "On the Shield Pro, attach USB/network storage and use TiviMate Premium to record live TV." },
      { title: "Enjoy", text: "The Shield delivers the smoothest 4K IPTV of any box, with instant channel switching." },
    ],
    troubleshooting: [
      { q: "Rare stutter on 4K", a: "The Shield is rarely the bottleneck — use Ethernet (built-in on Pro), confirm Hardware+ decoding, and it'll be flawless." },
      { q: "Which Shield should I buy?", a: "The Pro adds more RAM, USB ports (for recording) and Ethernet — best for heavy IPTV use. The Tube is still excellent." },
    ],
    faq: [
      { q: "Is the NVIDIA Shield good for IPTV?", a: "It's the best Android TV box for it — powerful, stable, with the smoothest 4K HEVC playback and full TiviMate support." },
      { q: "Best app for Shield?", a: "TiviMate, hands down, for its EPG and recording. IPTV Smarters Pro if you prefer simplicity." },
      { q: "Can the Shield record IPTV?", a: "Yes — the Pro with attached storage plus TiviMate Premium records live TV, alongside server catch-up." },
    ],
    funnelDevice: "android",
    updated: "2026-07-19",
  },

  // ---------- Niveau 3 — operating systems ----------
  windows: {
    slug: "windows",
    name: "Windows PC",
    short: "Windows",
    emoji: "🪟",
    level: 3,
    keyword: "iptv on windows pc",
    hero: "Watch IPTV on Windows PC & Laptop",
    description:
      "Watch IPTV on Windows 10 and 11 with Best IPTV VIP using the IPTV Smarters desktop app, VLC or MyIPTV Player. Full EPG, VOD and 4K on your PC — cast to the TV when you want.",
    answer:
      "To watch IPTV on Windows, install the IPTV Smarters Pro desktop app and log in with your Xtream Codes details, or open the M3U URL in VLC (Media → Open Network Stream). Smarters gives you the full EPG and VOD; VLC is the quick, no-install option.",
    supportStatus: "Full support",
    recommendedApps: ["iptv-smarters-pro"],
    compatibility: ["Windows 11", "Windows 10", "Windows laptops & desktops"],
    steps: [
      { title: "Choose your player", text: "Install IPTV Smarters Pro for Windows (full EPG/VOD) or use VLC/MyIPTV Player for a lightweight option." },
      { title: "Log in with Xtream Codes", text: "In Smarters desktop: New User → Xtream Codes → enter the server URL, username and password from WhatsApp." },
      { title: "Or open the M3U in VLC", text: "In VLC: Media → Open Network Stream → paste the M3U URL we provide → Play." },
      { title: "Enable hardware decoding", text: "In VLC: Tools → Preferences → Input/Codecs → Hardware-accelerated decoding: Automatic, for smooth 4K." },
      { title: "Cast to the TV (optional)", text: "Use a Chrome tab cast or an HDMI cable to put your PC's IPTV on the big screen." },
    ],
    troubleshooting: [
      { q: "VLC freezes on 4K channels", a: "Enable hardware-accelerated decoding in VLC preferences, and make sure your PC has a modern GPU for HEVC. Otherwise use the FHD channel version." },
      { q: "No EPG in VLC", a: "VLC plays streams but has a weak guide. Use the IPTV Smarters desktop app with Xtream Codes for a full EPG." },
    ],
    faq: [
      { q: "Best IPTV player for Windows?", a: "IPTV Smarters Pro desktop for the full experience (EPG, VOD, series); VLC for a fast, no-frills option." },
      { q: "Can I watch IPTV in a web browser?", a: "For the best experience use a desktop player. Browser playback is possible but limited — Smarters or VLC is recommended." },
      { q: "How do I get IPTV from PC to my TV?", a: "Cast a Chrome tab to a Chromecast, or connect an HDMI cable from the laptop to the TV." },
    ],
    funnelDevice: "pc-mac",
    updated: "2026-07-19",
  },

  macos: {
    slug: "macos",
    name: "Mac (macOS)",
    short: "macOS",
    emoji: "💻",
    level: 3,
    keyword: "iptv on mac",
    hero: "Watch IPTV on Mac & MacBook (macOS)",
    description:
      "Watch IPTV on macOS with Best IPTV VIP using IPTV Smarters Pro, GSE Smart IPTV or VLC. Full EPG and VOD on your Mac — AirPlay to Apple TV for the big screen.",
    answer:
      "To watch IPTV on a Mac, install IPTV Smarters Pro (or GSE Smart IPTV) from the Mac App Store and log in with your Xtream Codes details, or open the M3U URL in VLC. AirPlay to an Apple TV to watch on the big screen in 4K.",
    supportStatus: "Full support",
    recommendedApps: ["iptv-smarters-pro"],
    compatibility: ["macOS (Apple Silicon M1/M2/M3/M4)", "macOS (Intel)", "MacBook, iMac, Mac mini"],
    steps: [
      { title: "Install a player", text: "Get IPTV Smarters Pro or GSE Smart IPTV from the Mac App Store, or download VLC from videolan.org." },
      { title: "Log in with Xtream Codes", text: "In Smarters/GSE: Add user → Xtream Codes → enter the server URL, username and password from WhatsApp." },
      { title: "Or open M3U in VLC", text: "VLC: File → Open Network → paste the M3U URL → Open." },
      { title: "Enable hardware decoding", text: "Apple Silicon handles HEVC natively; in VLC keep hardware decoding on 'Automatic' for smooth 4K." },
      { title: "AirPlay to Apple TV", text: "Use AirPlay from the Mac (or the player) to send the stream to an Apple TV 4K." },
    ],
    troubleshooting: [
      { q: "App won't open on Apple Silicon", a: "Make sure you installed the current version from the App Store. GSE and Smarters both run natively on M-series Macs." },
      { q: "Stutter in VLC", a: "Keep hardware-accelerated decoding on and use Ethernet/5 GHz Wi-Fi. Apple Silicon Macs rarely struggle otherwise." },
    ],
    faq: [
      { q: "Best IPTV app for Mac?", a: "IPTV Smarters Pro or GSE Smart IPTV from the Mac App Store, both using your Xtream Codes login. VLC is the quick alternative." },
      { q: "Does IPTV work on M1/M2/M3 Macs?", a: "Yes — the apps run natively on Apple Silicon with excellent 4K performance." },
      { q: "How do I get Mac IPTV onto my TV?", a: "AirPlay to an Apple TV, or connect via HDMI/USB-C adapter." },
    ],
    funnelDevice: "pc-mac",
    updated: "2026-07-19",
  },

  "android-phone": {
    slug: "android-phone",
    name: "Android Phone & Tablet",
    short: "Android",
    emoji: "📱",
    level: 3,
    keyword: "iptv on android phone",
    hero: "Watch IPTV on Android Phone & Tablet",
    description:
      "Watch IPTV on any Android phone or tablet with Best IPTV VIP using IPTV Smarters Pro, TiviMate or XCIPTV from the Play Store. Stream on the go and cast to your TV.",
    answer:
      "To watch IPTV on an Android phone, install IPTV Smarters Pro (or TiviMate/XCIPTV) from the Play Store and log in with your Xtream Codes details. It's perfect as a portable second screen, and you can cast to a Chromecast or Android TV.",
    supportStatus: "Full support",
    recommendedApps: ["iptv-smarters-pro", "tivimate", "xciptv"],
    compatibility: ["Android phones (Samsung, Pixel, Xiaomi, etc.)", "Android tablets", "Android 8+"],
    steps: [
      { title: "Install a player", text: "From Google Play, install IPTV Smarters Pro (simplest), TiviMate, or XCIPTV." },
      { title: "Log in with Xtream Codes", text: "Open the app → Add user / playlist → Xtream Codes → enter the server URL, username and password from WhatsApp." },
      { title: "Choose the mobile layout", text: "Pick the phone-friendly layout; enable auto-rotate for full-screen landscape viewing." },
      { title: "Cast to the TV", text: "Cast to a Chromecast/Android TV, or use an external player (VLC/MX) for stubborn channels." },
      { title: "Watch anywhere", text: "Stream live TV, movies and series on mobile data or Wi-Fi. Note 4K uses ~7–10 GB/hour on mobile data." },
    ],
    troubleshooting: [
      { q: "High data use on mobile", a: "4K/HD streams use a lot of data. On a capped plan, pick HD/SD versions or watch on Wi-Fi. Check the channel quality label." },
      { q: "A channel is black with sound", a: "Set that channel to the MX/VLC external player in settings — it's a decoder mismatch, not a subscription issue." },
    ],
    faq: [
      { q: "Best IPTV app for Android phones?", a: "IPTV Smarters Pro for simplicity; TiviMate/XCIPTV for more features. All install from the Play Store." },
      { q: "Can I cast phone IPTV to my TV?", a: "Yes — cast to a Chromecast or Android TV, or use the same login directly in the TV's app." },
      { q: "Does IPTV drain the battery?", a: "Video streaming uses battery like any app. Keep the phone plugged in for long sessions." },
    ],
    funnelDevice: "android",
    updated: "2026-07-19",
  },

  iphone: {
    slug: "iphone",
    name: "iPhone",
    short: "iPhone",
    emoji: "📱",
    level: 3,
    keyword: "iptv on iphone",
    hero: "Watch IPTV on iPhone",
    description:
      "Watch IPTV on iPhone with Best IPTV VIP using IPTV Smarters Pro or GSE Smart IPTV from the App Store. Stream live TV and movies, and AirPlay to your Apple TV in 4K.",
    answer:
      "To watch IPTV on iPhone, install IPTV Smarters Pro (or GSE Smart IPTV) from the App Store and log in with your Xtream Codes details. Stream live TV, movies and series anywhere, and AirPlay to an Apple TV 4K for the big screen.",
    supportStatus: "Full support",
    recommendedApps: ["iptv-smarters-pro"],
    compatibility: ["iPhone (iOS 14+)", "iPhone SE to the latest Pro Max"],
    steps: [
      { title: "Install from the App Store", text: "Search 'IPTV Smarters Pro' (or GSE Smart IPTV) on the App Store and install — both are free." },
      { title: "Log in with Xtream Codes", text: "Open the app → Add user → Xtream Codes API → enter the server URL, username and password from WhatsApp." },
      { title: "Browse and watch", text: "Live TV, movies and series are split into tabs and searchable. Enable landscape for full-screen." },
      { title: "AirPlay to Apple TV", text: "Use AirPlay from the player to send the stream to an Apple TV 4K in full quality." },
      { title: "Enable parental controls (optional)", text: "Set a PIN to lock categories on a shared iPhone." },
    ],
    troubleshooting: [
      { q: "GSE or Smarters on iPhone?", a: "GSE has more advanced EPG features; Smarters is simpler and more popular. Both use your Xtream Codes login — try both and keep your favourite." },
      { q: "No 4K on my iPhone screen", a: "iPhone screens are HD/FHD. To watch in true 4K, AirPlay to an Apple TV 4K or use the Apple TV app directly." },
    ],
    faq: [
      { q: "Best IPTV app for iPhone?", a: "IPTV Smarters Pro is the most popular; GSE Smart IPTV is a feature-rich alternative. Both are free on the App Store." },
      { q: "Can I AirPlay iPhone IPTV to my TV?", a: "Yes — AirPlay from the player to an Apple TV for 4K on the big screen." },
      { q: "Why can't I find the app in my region?", a: "App availability varies by country. If Smarters is missing, use GSE Smart IPTV — we'll help you pick." },
    ],
    funnelDevice: "ios",
    updated: "2026-07-19",
  },

  ipad: {
    slug: "ipad",
    name: "iPad",
    short: "iPad",
    emoji: "📲",
    level: 3,
    keyword: "iptv on ipad",
    hero: "Watch IPTV on iPad",
    description:
      "Watch IPTV on iPad with Best IPTV VIP using IPTV Smarters Pro or GSE Smart IPTV from the App Store. The big screen makes it a great portable TV — plus recording on GSE and AirPlay.",
    answer:
      "To watch IPTV on iPad, install IPTV Smarters Pro (or GSE Smart IPTV) from the App Store and log in with your Xtream Codes details. The iPad's large screen makes an excellent portable TV, and GSE even supports recording on iPad.",
    supportStatus: "Full support",
    recommendedApps: ["iptv-smarters-pro"],
    compatibility: ["iPad & iPad Air", "iPad Pro", "iPad mini", "iPadOS 14+"],
    steps: [
      { title: "Install from the App Store", text: "Get IPTV Smarters Pro or GSE Smart IPTV — both are free and optimised for iPad's larger screen." },
      { title: "Log in with Xtream Codes", text: "Add user → Xtream Codes API → enter the server URL, username and password from WhatsApp." },
      { title: "Use split view / PiP", text: "iPadOS lets you keep IPTV in Picture-in-Picture while using other apps." },
      { title: "Record with GSE (optional)", text: "GSE Smart IPTV supports recording on iPad — handy for saving a match or show." },
      { title: "AirPlay to the TV", text: "AirPlay the stream to an Apple TV 4K for the big screen." },
    ],
    troubleshooting: [
      { q: "Which app records on iPad?", a: "GSE Smart IPTV supports recording and advanced EPG on iPad; IPTV Smarters is simpler without recording. Pick based on your needs." },
      { q: "Stream stutters on Wi-Fi", a: "Move closer to the router or use 5 GHz. The iPad is powerful, so stutter is almost always the connection." },
    ],
    faq: [
      { q: "Best IPTV app for iPad?", a: "IPTV Smarters Pro for simplicity; GSE Smart IPTV if you want recording and richer EPG. Both are free." },
      { q: "Can the iPad record IPTV?", a: "Yes, using GSE Smart IPTV. Server-side catch-up also lets you replay past programmes." },
      { q: "Can I use the iPad as a TV?", a: "Absolutely — its screen makes a great portable TV, and you can AirPlay to a real TV anytime." },
    ],
    funnelDevice: "ios",
    updated: "2026-07-19",
  },

  // ---------- Niveau 4 — limited compatibility (honest angle) ----------
  roku: {
    slug: "roku",
    name: "Roku",
    short: "Roku",
    emoji: "🟣",
    level: 4,
    keyword: "iptv on roku",
    hero: "IPTV on Roku — what actually works (honest guide)",
    description:
      "The honest truth about IPTV on Roku: it blocks the popular players like TiviMate and IPTV Smarters. Here's what genuinely works, the workarounds, and why a £30 Fire Stick is the better fix.",
    answer:
      "Roku has limited IPTV support — it blocks the main players (TiviMate, IPTV Smarters, XCIPTV), so there's no clean native app. Your realistic options are screen-mirroring from a phone/PC, or a private/'beta' channel workaround. For a proper experience, plugging in a cheap Fire Stick or Android box is far better than fighting Roku.",
    supportStatus: "Limited support",
    honestNote:
      "We won't oversell this: Roku is the most restrictive platform for IPTV. If Roku is all you have we'll help you get it working, but the honest recommendation is a £30 Fire Stick 4K, which transforms the experience with full TiviMate/Smarters support.",
    recommendedApps: [],
    compatibility: ["Roku Stick / Express / Ultra (mirroring only)", "Roku TV (mirroring only)", "No native TiviMate/Smarters/XCIPTV"],
    steps: [
      { title: "Understand the limitation", text: "Roku does not allow the popular IPTV player apps in its store. There is no clean native way to run TiviMate or IPTV Smarters on Roku." },
      { title: "Option A — Screen mirror from a phone/PC", text: "Enable Screen Mirroring on Roku (Settings → System → Screen Mirroring), then mirror IPTV Smarters from an Android phone or a Windows PC. Quality depends on your Wi-Fi and adds a little lag." },
      { title: "Option B — Private channel workaround", text: "Some users add a web-based IPTV private channel, but these are unofficial, often break, and rarely include a proper EPG. Manage expectations." },
      { title: "Option C (recommended) — add a Fire Stick", text: "Plug a Fire Stick 4K into a spare HDMI port. You keep the Roku for its own apps and get full, smooth IPTV via TiviMate/Smarters — the cleanest fix by far." },
      { title: "Get help choosing", text: "Message us and we'll tell you honestly whether mirroring is worth trying on your setup or whether a cheap stick is the better spend." },
    ],
    troubleshooting: [
      { q: "Mirroring is laggy or keeps dropping", a: "Mirroring is bandwidth-heavy — use 5 GHz Wi-Fi and keep the phone/PC close to the router. Even then it's a compromise; a Fire Stick avoids the lag entirely." },
      { q: "I can't find any IPTV app on Roku", a: "That's expected — Roku blocks them. Don't keep searching; use mirroring or add a Fire Stick/Android box." },
    ],
    faq: [
      { q: "Can you get IPTV on Roku?", a: "Only indirectly — via screen mirroring or unofficial private channels. Roku blocks the proper players, so there's no clean native app. A Fire Stick is the honest better option." },
      { q: "Is there a TiviMate or Smarters for Roku?", a: "No. Neither is available on Roku. That's a Roku restriction, not a subscription limit — your Best IPTV VIP login works perfectly on other devices." },
      { q: "What's the cheapest way to fix it?", a: "A Fire Stick 4K (around £30/$40) plugged into your TV gives full IPTV support and costs less than the frustration of Roku workarounds." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-19",
  },

  chromecast: {
    slug: "chromecast",
    name: "Chromecast",
    short: "Chromecast",
    emoji: "🎯",
    level: 4,
    keyword: "iptv on chromecast",
    hero: "IPTV on Chromecast — casting vs Google TV (honest guide)",
    description:
      "The honest guide to IPTV on Chromecast: a basic Chromecast can only cast from a phone (limited), while 'Chromecast with Google TV' runs full IPTV apps. Here's exactly what works on each.",
    answer:
      "It depends which Chromecast you have. A basic Chromecast dongle has limited support — it can only cast an IPTV stream from a phone, with some lag and no native app. 'Chromecast with Google TV' is different: it's a full Android TV device that runs TiviMate and IPTV Smarters natively. For the best experience, use the Google TV model.",
    supportStatus: "Limited support",
    honestNote:
      "Be clear which device you own. Basic Chromecast = casting only (a compromise). Chromecast with Google TV = a proper streaming device with full IPTV apps. We won't pretend a basic Chromecast is as good — if you're buying, get the Google TV version.",
    recommendedApps: ["iptv-smarters-pro"],
    compatibility: ["Basic Chromecast (1st–3rd gen): cast from phone only", "Chromecast with Google TV (HD/4K): full app support", "Google TV Streamer: full app support"],
    steps: [
      { title: "Identify your Chromecast", text: "If it came with a remote, it's 'Chromecast with Google TV' — treat it like Android TV (install TiviMate/Smarters directly). If it's a plain dongle with no remote, it's cast-only." },
      { title: "Google TV model — install the app", text: "On Chromecast with Google TV, open the Play Store, install IPTV Smarters Pro or TiviMate, and log in with your Xtream Codes details. Full native experience." },
      { title: "Basic dongle — cast from a phone", text: "On a plain Chromecast, open IPTV Smarters on your Android phone and cast the stream to the Chromecast. Expect some lag and no EPG on the TV." },
      { title: "Optimise casting", text: "Use 5 GHz Wi-Fi and keep the phone near the router. Casting keeps the phone busy — calls/notifications can interrupt it." },
      { title: "Best result", text: "If you cast often and find it clunky, switch to Chromecast with Google TV or a Fire Stick for a proper, lag-free app experience." },
    ],
    troubleshooting: [
      { q: "Casting is laggy or drops out", a: "Basic-Chromecast casting is bandwidth-heavy and phone-dependent. Use 5 GHz Wi-Fi, or move to a Chromecast with Google TV for native playback with no phone in the loop." },
      { q: "No TV guide when casting", a: "Casting mirrors the phone, so there's no on-TV EPG. The Google TV model runs the app natively with a full guide." },
    ],
    faq: [
      { q: "Can I watch IPTV on Chromecast?", a: "Yes, but how depends on the model. Basic Chromecast = cast from a phone (limited). Chromecast with Google TV = full native IPTV apps like Android TV." },
      { q: "Which Chromecast should I buy for IPTV?", a: "Chromecast with Google TV (4K) — it runs TiviMate and IPTV Smarters directly, so no phone or casting needed." },
      { q: "Why is casting worse than an app?", a: "Casting relies on your phone and Wi-Fi to relay the stream, adding lag and skipping the on-TV EPG. A native app on Google TV or a Fire Stick avoids all that." },
    ],
    funnelDevice: "android",
    updated: "2026-07-19",
  },
};
