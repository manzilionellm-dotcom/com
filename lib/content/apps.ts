import type { AppSlug } from "../site";

export type AppStep = { title: string; text: string };
export type AppFaq = { q: string; a: string };

export type AppGuide = {
  slug: AppSlug;
  name: string;
  short: string;
  emoji: string;
  kind: "player" | "box";
  /** Primary keyword this page is approved for in content-map.json */
  keyword: string;
  hero: string;
  description: string;
  /** Answer-first summary (GEO: LLMs read this first) */
  summary: string;
  price: string;
  platforms: string[];
  /** Connection methods this app accepts */
  connection: string[];
  bestFor: string;
  features: string[];
  steps: AppStep[];
  config: AppStep[];
  troubleshooting: AppFaq[];
  faq: AppFaq[];
  /** Honest limitation note — protects EEAT */
  note?: string;
  updated: string;
};

const UPDATED = "2026-07-15";

export const APP_GUIDES: Record<AppSlug, AppGuide> = {
  tivimate: {
    slug: "tivimate",
    name: "TiviMate IPTV Player",
    short: "TiviMate",
    emoji: "📺",
    kind: "player",
    keyword: "tivimate iptv setup",
    hero: "How to set up Best IPTV VIP on TiviMate (Android TV & Firestick)",
    description:
      "Complete 2026 guide to install and configure TiviMate with Best IPTV VIP using Xtream Codes API. Set up EPG, catch-up, recording and custom channel groups on Android TV, Fire TV and NVIDIA Shield.",
    summary:
      "TiviMate is the best-in-class IPTV player for remote-driven devices (Android TV, Fire TV, NVIDIA Shield). Add Best IPTV VIP with the Xtream Codes login we send on WhatsApp, let it pull the EPG automatically, then enable catch-up. It does not run on iPhone, iPad or Samsung/LG Tizen/webOS TVs.",
    price: "Free core app · Premium ~$6/year unlocks recording, multi-playlist, catch-up",
    platforms: ["Android TV", "Google TV", "Amazon Fire TV / Firestick", "NVIDIA Shield", "Android phones/tablets"],
    connection: ["Xtream Codes API (recommended)", "M3U playlist URL"],
    bestFor: "Anyone using a remote — the cleanest EPG grid and catch-up experience on the market.",
    features: [
      "Best-in-class EPG grid with program timeline",
      "7-day catch-up / archive (replay past broadcasts)",
      "DVR recording to USB or internal storage (Premium)",
      "Multiple playlists merged into one interface (Premium)",
      "Custom channel groups, favourites and parental lock",
      "Picture-in-picture and instant channel switching",
    ],
    steps: [
      {
        title: "Install TiviMate from the store",
        text: "On Android TV / Google TV open the Google Play Store and install “TiviMate IPTV Player”. On Firestick, TiviMate is available directly in the Amazon Appstore — search “TiviMate” and install. No sideloading needed on either platform.",
      },
      {
        title: "Choose “Add playlist” → Xtream Codes",
        text: "Launch TiviMate → Add playlist → select “Xtream Codes”. This method pulls channels AND the EPG in one step, which M3U cannot do reliably.",
      },
      {
        title: "Enter your Best IPTV VIP credentials",
        text: "Paste the Server URL, Username and Password we send you on WhatsApp after your order or free trial. Tap Next — TiviMate connects and counts your channels (22,000+).",
      },
      {
        title: "Name the playlist and finish",
        text: "Give it a name (e.g. “Best IPTV VIP”) and confirm. The full channel list, VOD and series load into the interface.",
      },
      {
        title: "Let the EPG populate",
        text: "TiviMate auto-detects the EPG from our Xtream server. Give it 1–2 minutes on first launch; the program guide then fills every channel with now/next data.",
      },
    ],
    config: [
      {
        title: "Enable catch-up (7-day replay)",
        text: "Settings → Playlists → your playlist → make sure Catch-up is On. Then long-press any channel with the archive icon to rewind up to 7 days of live TV.",
      },
      {
        title: "Set the decoder for smooth 4K",
        text: "Settings → Playback → Decoder → set to “Hardware+ (default)”. If a specific 4K/HEVC channel stutters on a weaker box, switch that channel to “Hardware” or “Software” as a fallback.",
      },
      {
        title: "Build custom groups & favourites",
        text: "Settings → Channels → Groups to create “Sports”, “Movies”, “Kids”. Long-press any channel → Add to favourites for a one-click home row.",
      },
      {
        title: "Turn on recording (Premium)",
        text: "Plug a USB drive into your Android TV box, then Settings → Recording → choose the storage target. Schedule recordings straight from the EPG grid.",
      },
    ],
    troubleshooting: [
      {
        q: "TiviMate says “Playlist processing error”",
        a: "The credentials were mistyped or your trial expired. Re-check the Server URL has no trailing spaces and starts with http://. If it still fails, message us on WhatsApp — we’ll confirm your line is active.",
      },
      {
        q: "No EPG / program guide is blank",
        a: "Use the Xtream Codes login (not plain M3U) so the guide is pulled automatically, then wait 2 minutes and force-refresh via Settings → EPG → Update. Set your device timezone correctly or programs will look shifted.",
      },
      {
        q: "4K channel buffers but HD is fine",
        a: "Set Decoder to Hardware+, raise the buffer in Settings → Playback → Buffer size, and confirm 25 Mbps+ down. On Wi-Fi, move closer to the router or use Ethernet.",
      },
    ],
    faq: [
      {
        q: "Does TiviMate work on iPhone or Samsung/LG TVs?",
        a: "No. TiviMate is Android-only (Android TV, Fire OS, Android phones). For iPhone/iPad use IPTV Smarters Pro; for Samsung Tizen or LG webOS use IBO Player Pro or Duplex IPTV.",
      },
      {
        q: "Is the free version enough?",
        a: "The free version plays live TV and VOD fine. Premium (~$6/year) adds recording, multiple merged playlists, catch-up scheduling and the ‘favourites’ sync — worth it if you record sports.",
      },
      {
        q: "Can I use TiviMate on two TVs?",
        a: "TiviMate Premium is licensed per device via a companion account, but your Best IPTV VIP line covers the connections listed on your plan. Ask us about a multi-connection plan if you run several TVs at once.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-smarters-pro": {
    slug: "iptv-smarters-pro",
    name: "IPTV Smarters Pro",
    short: "Smarters Pro",
    emoji: "⚡",
    kind: "player",
    keyword: "iptv smarters pro setup",
    hero: "How to set up Best IPTV VIP on IPTV Smarters Pro (all devices)",
    description:
      "Step-by-step 2026 guide to install IPTV Smarters Pro and log in with Best IPTV VIP using Xtream Codes API. Works on Firestick, Android, iPhone, iPad, Windows and Mac — the most universal IPTV player.",
    summary:
      "IPTV Smarters Pro is the most universal free IPTV player — it runs on Firestick, Android, iPhone, iPad, Windows and Mac. Add Best IPTV VIP with the “Login with Xtream Codes API” option using the server, username and password we send on WhatsApp. It loads live TV, movies, series and full EPG in one step.",
    price: "Free (ad-free, no in-app purchase required)",
    platforms: ["Amazon Firestick / Fire TV", "Android phone/tablet & Android TV", "iPhone / iPad", "Windows", "macOS"],
    connection: ["Login with Xtream Codes API (recommended)", "Load M3U URL", "Load M3U file"],
    bestFor: "The safe default when you want one app that behaves the same on every device you own.",
    features: [
      "Identical interface across mobile, TV and desktop",
      "Live TV, Movies (VOD) and Series in separate tabs",
      "Built-in EPG with now/next and full guide",
      "External player support (MX Player, VLC) for tricky codecs",
      "Multi-screen and parental controls",
      "Automatic reconnect after network drops",
    ],
    steps: [
      {
        title: "Install IPTV Smarters Pro",
        text: "Android/Google TV & iOS: install “IPTV Smarters Pro” from Google Play or the App Store (free). Firestick: it’s in the Amazon Appstore — search and install. Windows/Mac: download the desktop build from the official IPTV Smarters site.",
      },
      {
        title: "Open the app and accept terms",
        text: "On first launch accept the disclaimer. You’ll see the login screen with several options — choose “Login with Xtream Codes API”.",
      },
      {
        title: "Enter your Best IPTV VIP details",
        text: "Any Name (e.g. “Best IPTV VIP”), then paste the Username, Password and Server URL from our WhatsApp confirmation. Tap Add User.",
      },
      {
        title: "Wait for the content to sync",
        text: "The app pulls Live TV, Movies and Series categories plus the EPG. On a full 22,000-channel line this takes 10–30 seconds the first time.",
      },
      {
        title: "Start watching",
        text: "Open Live TV → pick a category → play. Your login is remembered, so next launch drops you straight onto the last channel.",
      },
    ],
    config: [
      {
        title: "Set the stream format",
        text: "Settings → Player Selection. For most 4K channels the built-in player is fine; if a channel won’t play, set that stream to open in MX Player (Android) or VLC (desktop).",
      },
      {
        title: "Enable auto-play & remember last channel",
        text: "Settings → General → turn on “Auto Play” and “Continue watching” so the app resumes where you left off.",
      },
      {
        title: "Lock adult categories",
        text: "Settings → Parental Control → set a PIN and hide adult categories — useful on a family Firestick.",
      },
      {
        title: "Fix EPG timezone",
        text: "Settings → EPG → set your correct timezone/offset so the guide lines up with real broadcast times.",
      },
    ],
    troubleshooting: [
      {
        q: "“Invalid credentials / cannot connect”",
        a: "The Server URL must include http:// and the right port, with no spaces. Copy-paste rather than typing. If it still fails your trial may have ended — ping us on WhatsApp to re-activate.",
      },
      {
        q: "Movies/Series tab is empty but Live TV works",
        a: "Pull down to refresh, or remove and re-add the user so VOD categories re-sync. Some plans separate VOD — confirm yours includes the 120,000-title library.",
      },
      {
        q: "Video stutters on 4K only",
        a: "Switch that stream to an external player (MX Player/VLC), enable hardware decoding there, and make sure you have 25 Mbps+. Wired Ethernet beats Firestick Wi-Fi.",
      },
    ],
    faq: [
      {
        q: "Is IPTV Smarters Pro really free?",
        a: "Yes — the player is free with no subscription. You still need an IPTV line (that’s us). Ignore any site charging for the app itself.",
      },
      {
        q: "Smarters Pro vs TiviMate — which should I pick?",
        a: "Smarters Pro if you want the same app on phone, iPhone, TV and PC. TiviMate if you only use Android TV/Firestick and want the best EPG grid and recording. Both work perfectly with Best IPTV VIP.",
      },
      {
        q: "Can I log in on my phone and my TV at once?",
        a: "You can install the app anywhere, but simultaneous streams are limited by your plan’s connection count. Grab a multi-connection plan if the family watches on several screens together.",
      },
    ],
    updated: UPDATED,
  },

  "ibo-player": {
    slug: "ibo-player",
    name: "IBO Player Pro",
    short: "IBO Player",
    emoji: "🎯",
    kind: "player",
    keyword: "ibo player pro activation",
    hero: "How to activate Best IPTV VIP on IBO Player Pro (Samsung & LG)",
    description:
      "2026 guide to activate IBO Player Pro on Samsung Tizen and LG webOS Smart TVs. Get your Device Key + MAC, upload the Best IPTV VIP playlist from the IBO dashboard, and stream 22,000+ channels with EPG — no sideloading.",
    summary:
      "IBO Player Pro is the go-to IPTV app for Samsung Tizen and LG webOS TVs. You open the app to read its MAC address and Device Key, enter those on the official IBO dashboard together with the M3U/Xtream URL we provide, then reload the app. It carries a small one-time activation fee (~$6–9) but no monthly cost.",
    price: "One-time activation ~$6–9 per device (paid to IBO) · then free for life",
    platforms: ["Samsung Smart TV (Tizen 2017+)", "LG Smart TV (webOS 3.0+)", "Android TV / Fire TV (alt build)"],
    connection: ["M3U playlist URL (uploaded via IBO dashboard)", "Xtream Codes URL"],
    bestFor: "Samsung/LG owners who don’t want to sideload — activation is done from a browser, not the TV.",
    features: [
      "Native Tizen & webOS app (no sideloading, no rooting)",
      "Playlist managed remotely from the IBO web dashboard",
      "EPG support with now/next and full guide",
      "Multiple playlists per device",
      "Auto-boot to the app on TV start (optional)",
      "Clean 10-foot interface for the TV remote",
    ],
    steps: [
      {
        title: "Install IBO Player Pro on your TV",
        text: "Open the Samsung App Store (Smart Hub) or LG Content Store, search “IBO Player Pro”, and install. Launch it once.",
      },
      {
        title: "Note your MAC address and Device Key",
        text: "The IBO Player home screen shows a MAC address (00:1A:79:XX:XX:XX) and a Device Key. Write both down — you’ll need them in the browser step.",
      },
      {
        title: "Open the IBO dashboard in a browser",
        text: "On a phone or PC go to the official IBO activation site (iboplayer.com / ibosol dashboard). Enter your MAC and Device Key to open your device’s playlist manager. Pay the one-time activation if prompted.",
      },
      {
        title: "Add the Best IPTV VIP playlist",
        text: "In the dashboard choose “Add playlist”: paste the M3U or Xtream URL we sent on WhatsApp, give it a name, and save. This pushes the playlist to your TV.",
      },
      {
        title: "Reload the app on the TV",
        text: "Back on the TV, exit and reopen IBO Player Pro (or press the reload/refresh option). Your 22,000+ channels, VOD and EPG appear.",
      },
    ],
    config: [
      {
        title: "Enable EPG",
        text: "In the dashboard, make sure the EPG/XMLTV toggle is on for the playlist. Our Xtream server supplies the guide automatically; on plain M3U you may add our EPG URL (ask support).",
      },
      {
        title: "Set the app to auto-start",
        text: "On Samsung, add IBO Player to the ‘Autostart’ apps in TV settings so it opens on power-on. Handy for a TV used mainly for IPTV.",
      },
      {
        title: "Wire the TV for stability",
        text: "Smart-TV Wi-Fi chips are weak. Connect Ethernet if the port is free — it removes most Samsung/LG buffering complaints instantly.",
      },
      {
        title: "Add a second playlist (optional)",
        text: "The dashboard supports several playlists per device — useful if you keep a sports-only list separate from the full line.",
      },
    ],
    troubleshooting: [
      {
        q: "“Device not activated / expired” on screen",
        a: "IBO gives a 7-day trial then needs the one-time activation fee paid on the dashboard. Pay it once and the app unlocks permanently. This fee goes to IBO, not to Best IPTV VIP.",
      },
      {
        q: "Playlist saved on the dashboard but TV shows nothing",
        a: "Confirm the MAC on the dashboard exactly matches the MAC on the TV screen, then reload the app. A single wrong character sends the playlist to the wrong device.",
      },
      {
        q: "Samsung removed my old IPTV app — is IBO safe?",
        a: "IBO Player Pro is still published on Samsung and LG stores in 2026. If it’s ever pulled in your region, Duplex IPTV or Set IPTV are drop-in alternatives we also support.",
      },
    ],
    faq: [
      {
        q: "Why does IBO cost money if the player is ‘free’?",
        a: "The app download is free; IBO charges a small one-time device activation (~$6–9) after a 7-day trial. That’s separate from your Best IPTV VIP subscription and is a one-off, not recurring.",
      },
      {
        q: "Do I need to sideload anything?",
        a: "No. That’s the point of IBO — everything is done from the store install plus a browser dashboard. Nothing is sideloaded onto the TV.",
      },
      {
        q: "Can I move my playlist to a new TV?",
        a: "Yes, but the activation is tied to the device MAC. On a new TV you activate that device once, then re-add the same Best IPTV VIP playlist from the dashboard.",
      },
    ],
    note: "IBO’s one-time activation fee is charged by IBO Solutions, not by Best IPTV VIP. We only supply the playlist/credentials.",
    updated: UPDATED,
  },

  xciptv: {
    slug: "xciptv",
    name: "XCIPTV Player",
    short: "XCIPTV",
    emoji: "🚀",
    kind: "player",
    keyword: "xciptv player setup",
    hero: "How to set up Best IPTV VIP on XCIPTV Player",
    description:
      "2026 guide to configure XCIPTV Player with Best IPTV VIP using Xtream Codes login. Works on Android, Fire TV and iOS with support for live TV, VOD, series, catch-up and multi-screen.",
    summary:
      "XCIPTV is a feature-rich player for Android, Fire TV and iOS that accepts Xtream Codes, M3U and Stalker portals. Choose “Xtream Codes Login”, enter the Best IPTV VIP server, username and password from WhatsApp, and it loads live TV, movies, series, EPG and catch-up.",
    price: "Free with ads · optional one-time unlock removes ads",
    platforms: ["Android phone/tablet & Android TV", "Amazon Fire TV / Firestick", "iPhone / iPad"],
    connection: ["Xtream Codes Login (recommended)", "M3U URL", "Stalker / MAC portal"],
    bestFor: "Power users who want catch-up, multi-screen and portal support in one flexible app.",
    features: [
      "Supports Xtream, M3U and Stalker portals in one app",
      "Live TV, VOD, series with trailers and posters",
      "Catch-up / archive playback",
      "Multi-screen (watch up to 4 channels at once on capable hardware)",
      "External player fallback (VLC, MX Player)",
      "Chromecast support from Android",
    ],
    steps: [
      {
        title: "Install XCIPTV",
        text: "Get “XCIPTV Player” from Google Play (Android/Google TV), the Amazon Appstore (Firestick) or the App Store (iOS). Open it and accept the disclaimer.",
      },
      {
        title: "Pick the Xtream Codes login",
        text: "On the login selector choose “Xtreme Codes / Xtream Login API” (not M3U) so the EPG loads automatically.",
      },
      {
        title: "Enter Best IPTV VIP credentials",
        text: "Type any playlist name, then the Server URL (with http:// and port), Username and Password from our WhatsApp message. Tap Add / Connect.",
      },
      {
        title: "Let categories load",
        text: "XCIPTV syncs Live, Movies and Series categories plus posters. On the full line this is quick — usually under 30 seconds.",
      },
      {
        title: "Play and pin favourites",
        text: "Open Live TV, long-press to favourite channels, and start watching. XCIPTV remembers your session on next launch.",
      },
    ],
    config: [
      {
        title: "Turn on catch-up",
        text: "Settings → enable Catch-up/Archive. On channels with the archive icon you can rewind past programmes up to the window our server provides (usually 7 days).",
      },
      {
        title: "Choose the decoder",
        text: "Settings → Player → set Hardware decoder for smooth 4K/HEVC. If one channel glitches, set it to Software or route it to VLC.",
      },
      {
        title: "Enable multi-screen (optional)",
        text: "On a strong Android box, Settings → Multi-screen lets you tile 2–4 channels — great for a sports weekend. It needs solid bandwidth per stream.",
      },
      {
        title: "Fix the guide timezone",
        text: "Settings → EPG → set your timezone offset so now/next matches real airtimes.",
      },
    ],
    troubleshooting: [
      {
        q: "App shows ads on top of video",
        a: "The free build is ad-supported. Buy the one-time in-app unlock to remove ads, or use the external player. Ads never affect your Best IPTV VIP line quality.",
      },
      {
        q: "Portal/Stalker mode won’t connect",
        a: "For Best IPTV VIP, use Xtream Codes login, not Stalker — we provision Xtream by default. Only use MAC/portal mode if we specifically issued you a portal URL.",
      },
      {
        q: "Series posters missing / slow",
        a: "That’s cover-art loading, not a stream fault. It fills in over a few seconds; a faster connection speeds it up. Playback is unaffected.",
      },
    ],
    faq: [
      {
        q: "Is XCIPTV free?",
        a: "Yes, with ads. A small one-time purchase removes ads. You still need a Best IPTV VIP line to get channels.",
      },
      {
        q: "Does XCIPTV run on iPhone?",
        a: "Yes — there’s an iOS build. Feature parity is close to Android, though multi-screen depends on device power.",
      },
      {
        q: "Can I use the same login on XCIPTV and Smarters?",
        a: "Yes, the same Xtream credentials work in any compliant player. Simultaneous streams are still capped by your plan’s connection count.",
      },
    ],
    updated: UPDATED,
  },

  "duplex-iptv": {
    slug: "duplex-iptv",
    name: "Duplex IPTV",
    short: "Duplex",
    emoji: "🔗",
    kind: "player",
    keyword: "duplex iptv setup mac address",
    hero: "How to set up Best IPTV VIP on Duplex IPTV (Samsung & LG)",
    description:
      "2026 guide to configure Duplex IPTV on Samsung and LG Smart TVs. Read your Device Key + MAC, upload the Best IPTV VIP playlist at edit.duplexplay.com, and stream 22,000+ channels with EPG.",
    summary:
      "Duplex IPTV is a popular Smart-TV player for Samsung Tizen and LG webOS. You read the MAC and Device Key shown in the app, enter them at the official Duplex web editor (edit.duplexplay.com) along with the M3U/Xtream URL we send, then reload the app on the TV.",
    price: "App free · small one-time device activation may apply",
    platforms: ["Samsung Smart TV (Tizen)", "LG Smart TV (webOS)", "Android (alt build)"],
    connection: ["M3U URL (via Duplex web editor)", "Xtream Codes URL"],
    bestFor: "Samsung/LG users who want a browser-managed playlist and a lightweight TV app.",
    features: [
      "Native Samsung Tizen & LG webOS builds",
      "Playlist added from a web editor — no typing on the TV",
      "EPG / XMLTV support",
      "Multiple playlists per device",
      "Simple, low-resource interface",
      "Favourites and category filtering",
    ],
    steps: [
      {
        title: "Install Duplex IPTV on the TV",
        text: "From the Samsung App Store or LG Content Store, search “Duplex IPTV” (Duplex Play) and install. Launch it once.",
      },
      {
        title: "Read your Device Key and MAC",
        text: "The Duplex home screen displays a Device Key and MAC address. Note both exactly as shown.",
      },
      {
        title: "Open the Duplex web editor",
        text: "On a phone/PC browser go to edit.duplexplay.com. Enter your Device Key and MAC to open your device’s playlist editor.",
      },
      {
        title: "Add the Best IPTV VIP playlist",
        text: "Choose “Add” → Playlist type: M3U URL or Xtream. Paste the URL/credentials from our WhatsApp message, name it, and save. It syncs to your TV.",
      },
      {
        title: "Reload on the TV",
        text: "Reopen Duplex IPTV (or use its refresh option). Your channels, VOD and EPG load. Done — no sideloading.",
      },
    ],
    config: [
      {
        title: "Enable the EPG",
        text: "In the web editor, set the EPG/XMLTV source to ‘auto’ for Xtream, or paste our EPG URL for plain M3U (ask support). Save and reload.",
      },
      {
        title: "Prefer Ethernet",
        text: "As with any Samsung/LG TV, a wired connection removes most buffering. Use Wi-Fi 5GHz at minimum if you can’t run a cable.",
      },
      {
        title: "Organise favourites",
        text: "Use the app’s favourites and hide unused categories to keep the guide snappy on lower-power TVs.",
      },
      {
        title: "Keep the app updated",
        text: "Update Duplex from the TV store when prompted — Samsung/LG occasionally require an updated build after a firmware change.",
      },
    ],
    troubleshooting: [
      {
        q: "Web editor says “device not found”",
        a: "The Device Key or MAC was entered wrong. Re-read them on the TV (they’re case/format-sensitive) and try again. They must match exactly.",
      },
      {
        q: "Playlist added but TV still empty",
        a: "Fully close and reopen the app so it pulls the new playlist; a simple back-out often isn’t enough. If still empty, confirm the URL is valid by testing it in our WhatsApp chat.",
      },
      {
        q: "“Trial expired” message",
        a: "Some regions require Duplex’s one-time device activation after a trial. That fee goes to Duplex, not Best IPTV VIP. Pay it once to unlock the device permanently.",
      },
    ],
    faq: [
      {
        q: "Duplex vs IBO Player — which is better for Samsung?",
        a: "Both are excellent and browser-managed. Duplex has a slightly lighter UI; IBO Pro has richer playlist options. We support both — pick whichever is available/cheaper to activate on your TV.",
      },
      {
        q: "Do I ever type the M3U on the TV remote?",
        a: "No. The whole point is you paste the URL in the web editor on a phone/PC, which is far easier than typing a long URL with a TV remote.",
      },
      {
        q: "Is there a monthly app fee?",
        a: "No monthly app fee. At most a one-time device activation charged by Duplex. Your only recurring cost is your Best IPTV VIP subscription.",
      },
    ],
    note: "Any Duplex activation fee is charged by DuplexPlay, not by Best IPTV VIP. We provide the playlist only.",
    updated: UPDATED,
  },

  "sparkle-tv": {
    slug: "sparkle-tv",
    name: "Sparkle TV",
    short: "Sparkle TV",
    emoji: "✨",
    kind: "player",
    keyword: "sparkle iptv player setup",
    hero: "How to set up Best IPTV VIP on Sparkle TV (Samsung & LG)",
    description:
      "2026 guide to activate Sparkle TV on Samsung Tizen and LG webOS. Read your device MAC, register the Best IPTV VIP playlist on the Sparkle portal, and stream live TV, VOD and EPG.",
    summary:
      "Sparkle TV is a clean Smart-TV IPTV app for Samsung Tizen and LG webOS. You read the MAC/device code in the app, register your Best IPTV VIP M3U or Xtream URL on the Sparkle portal, and reload. It’s a solid alternative when IBO or Duplex isn’t available in your region.",
    price: "App free · one-time device activation may apply",
    platforms: ["Samsung Smart TV (Tizen)", "LG Smart TV (webOS)"],
    connection: ["M3U URL (via Sparkle portal)", "Xtream Codes URL"],
    bestFor: "A lightweight IBO/Duplex alternative for Samsung/LG owners.",
    features: [
      "Native Tizen & webOS app",
      "Portal-managed playlist (browser upload)",
      "EPG support",
      "Fast, minimal interface",
      "Favourites and category hiding",
      "Multiple playlists supported",
    ],
    steps: [
      {
        title: "Install Sparkle TV",
        text: "From the Samsung App Store or LG Content Store, search “Sparkle TV” and install. Launch it to reveal your device MAC/activation code.",
      },
      {
        title: "Note the MAC / device code",
        text: "The Sparkle home screen shows a MAC address and/or device code. Record it exactly.",
      },
      {
        title: "Open the Sparkle portal",
        text: "On a phone/PC, open the official Sparkle activation portal shown in the app. Enter your MAC/device code to reach your playlist manager.",
      },
      {
        title: "Register the Best IPTV VIP playlist",
        text: "Add a playlist → paste the M3U or Xtream URL we sent on WhatsApp → save. Complete the one-time activation if prompted.",
      },
      {
        title: "Reload on the TV",
        text: "Reopen Sparkle TV. Your channels, VOD and EPG appear and are ready to watch.",
      },
    ],
    config: [
      {
        title: "Enable EPG",
        text: "Toggle the EPG/XMLTV source on in the portal (auto for Xtream). Save and reload the app so the guide fills in.",
      },
      {
        title: "Use a wired connection",
        text: "Ethernet on the TV massively reduces buffering versus built-in Wi-Fi. Recommended for 4K channels.",
      },
      {
        title: "Trim categories",
        text: "Hide categories you never watch to keep navigation fast on lower-end Samsung/LG models.",
      },
      {
        title: "Update when prompted",
        text: "Install Sparkle updates from the TV store to stay compatible after Tizen/webOS firmware updates.",
      },
    ],
    troubleshooting: [
      {
        q: "Portal won’t accept my code",
        a: "Double-check the MAC/device code against the TV screen — it’s easy to confuse 0 and O, or 8 and B. Re-enter carefully.",
      },
      {
        q: "Channels load but no EPG",
        a: "Set the EPG source to auto (Xtream) or paste our XMLTV URL in the portal, then fully reopen the app. Also set the correct timezone.",
      },
      {
        q: "App missing from my TV store",
        a: "Sparkle isn’t in every regional store. If you can’t find it, use IBO Player Pro or Duplex IPTV instead — we support all three and setup is nearly identical.",
      },
    ],
    faq: [
      {
        q: "Is Sparkle TV as good as IBO or Duplex?",
        a: "For core IPTV playback, yes. The three are very similar; choice usually comes down to which is available and cheapest to activate on your specific Samsung/LG model.",
      },
      {
        q: "Does it need sideloading?",
        a: "No — it installs from the TV store and the playlist is added via a browser portal. Nothing is sideloaded.",
      },
      {
        q: "Any recurring app cost?",
        a: "No recurring app cost — at most a one-time device activation charged by Sparkle. Your subscription with us is the only recurring fee.",
      },
    ],
    note: "Sparkle’s activation fee (if any) is charged by Sparkle, not by Best IPTV VIP.",
    updated: UPDATED,
  },

  "stb-emulator": {
    slug: "stb-emulator",
    name: "STB Emulator (STB Emu)",
    short: "STB Emu",
    emoji: "🧩",
    kind: "player",
    keyword: "stb emulator portal setup",
    hero: "How to set up Best IPTV VIP on STB Emulator (portal / MAC)",
    description:
      "2026 guide to configure STB Emulator on Android to emulate a MAG box. Set the MAC, enter the Best IPTV VIP portal URL, and stream 22,000+ channels with EPG the way a MAG 254 would.",
    summary:
      "STB Emulator turns an Android device or box into a virtual MAG STB. You set a profile MAC, paste the Best IPTV VIP portal (Stalker/Ministra) URL we issue, and it loads the MAG-style portal with channels and EPG. Use this only if we provisioned you a portal line — our default is Xtream, which suits Smarters/TiviMate better.",
    price: "STB Emu free · STB Emu Pro is a small one-time paid app",
    platforms: ["Android phone/tablet", "Android TV boxes", "Amazon Fire TV (sideload)"],
    connection: ["Stalker / Ministra portal URL + MAC (recommended for this app)"],
    bestFor: "People migrating from a physical MAG box who want the exact same portal interface.",
    features: [
      "Emulates MAG 250/254/256 STB behaviour",
      "Portal (Stalker/Ministra) support with the classic MAG UI",
      "Custom MAC per profile",
      "Multiple portal profiles",
      "EPG from the portal",
      "Works on cheap Android boxes",
    ],
    steps: [
      {
        title: "Install STB Emulator",
        text: "Install “STB Emu” (free) or “STB Emu Pro” (paid) from Google Play, or sideload the APK on Firestick via Downloader. Open it.",
      },
      {
        title: "Open Profiles → add/edit a profile",
        text: "Menu → Settings → Profiles → default. You’ll configure the MAC and portal here.",
      },
      {
        title: "Set the MAC address",
        text: "Profile → STB Configuration → set the MAC to the one we register for you (00:1A:79:XX:XX:XX). The MAC must match what we provisioned or the portal rejects it.",
      },
      {
        title: "Enter the portal URL",
        text: "Profile → Portal settings → Portal URL → paste the Best IPTV VIP portal (e.g. http://portal.example.com/c/). Save.",
      },
      {
        title: "Restart the profile",
        text: "Back out to reload the profile. The MAG-style portal loads with your channel groups, VOD and EPG.",
      },
    ],
    config: [
      {
        title: "Match the STB model",
        text: "In STB Configuration, set the device to emulate MAG254 (a safe default). Some portals expect a specific model — ask support if channels don’t appear.",
      },
      {
        title: "Set screen resolution",
        text: "Profile → Screen resolution → 1920×1080 (or auto). Prevents zoomed/cropped UI on some boxes.",
      },
      {
        title: "Enable EPG caching",
        text: "Turn on EPG in the profile so the guide persists between launches instead of re-downloading each time.",
      },
      {
        title: "Fix video engine on stutter",
        text: "If playback stutters, switch the media player in settings between the built-in and external player, and enable hardware acceleration.",
      },
    ],
    troubleshooting: [
      {
        q: "“Portal not responding” / infinite loading",
        a: "Verify the portal URL ends correctly (often with /c/) and the MAC is exactly the one we registered. A mismatched MAC is the #1 cause. Message us to confirm your MAC is authorised.",
      },
      {
        q: "Should I use STB Emu or Smarters/TiviMate?",
        a: "By default we issue Xtream Codes lines, which work best in Smarters/TiviMate. Only use STB Emulator if you specifically asked for a portal/MAC line. Tell us on WhatsApp which you prefer.",
      },
      {
        q: "Channels load but freeze often",
        a: "Try MAG254 emulation, switch to the external player with hardware acceleration, and confirm 25 Mbps+. Portal lines are more sensitive to weak Wi-Fi than Xtream.",
      },
    ],
    faq: [
      {
        q: "Is STB Emulator legal / safe?",
        a: "The app itself is a legitimate emulator on Google Play (Pro version). It only streams the portal you point it at — that’s your licensed Best IPTV VIP line.",
      },
      {
        q: "Why is the free version gone from Play sometimes?",
        a: "Google periodically pulls the free STB Emu; STB Emu Pro (paid) is the stable option. Both configure identically.",
      },
      {
        q: "Can I change the MAC later?",
        a: "Only to a MAC we’ve authorised. Random MAC changes will break the portal. Ask us to re-register if you switch devices.",
      },
    ],
    note: "STB Emulator needs a portal/MAC line. Best IPTV VIP issues Xtream Codes by default — request a portal line explicitly if you need this app.",
    updated: UPDATED,
  },

  "formuler-z": {
    slug: "formuler-z",
    name: "Formuler Z (Z8 / Z11 Pro)",
    short: "Formuler Z",
    emoji: "📦",
    kind: "box",
    keyword: "formuler z8 iptv setup",
    hero: "How to set up Best IPTV VIP on a Formuler Z box (MyTVOnline)",
    description:
      "2026 guide to configure Best IPTV VIP on Formuler Z8, Z10 and Z11 Pro boxes using the built-in MyTVOnline (MOL2/MOL3) player with Xtream or portal login. Full EPG, catch-up and 4K.",
    summary:
      "Formuler Z boxes (Z8, Z10, Z11 Pro) run the built-in MyTVOnline player (MOL2/MOL3). Add Best IPTV VIP as a new portal using our Xtream Codes credentials or portal URL, and MyTVOnline loads channels, EPG and catch-up in 4K. Because it’s Android-based you can also install TiviMate or Smarters from the Play Store.",
    price: "Hardware box (one-off purchase) · players included / free",
    platforms: ["Formuler Z8", "Formuler Z10 Pro", "Formuler Z11 Pro / Pro Max", "Other Formuler Android boxes"],
    connection: ["Xtream Codes / portal in MyTVOnline (MOL2/MOL3)", "TiviMate or Smarters via Play Store"],
    bestFor: "Owners of a dedicated IPTV box who want a premium remote, 4K and a native player.",
    features: [
      "Native MyTVOnline 2/3 player tuned for IPTV",
      "Excellent EPG grid + catch-up + recording to USB",
      "4K HDR / HEVC hardware decoding",
      "Android-based — also runs TiviMate, Smarters, XCIPTV",
      "‘My Menu’ customisable home and favourites",
      "Premium backlit remote with app hotkeys",
    ],
    steps: [
      {
        title: "Open MyTVOnline (MOL)",
        text: "From the Formuler home screen open MyTVOnline 2 or 3 (MOL2/MOL3) — the built-in IPTV player. First launch offers to add a portal.",
      },
      {
        title: "Add a new portal / playlist",
        text: "Choose Add Portal → select the Xtream Codes (or Portal) type. MOL3 labels this ‘Playlist’.",
      },
      {
        title: "Enter Best IPTV VIP credentials",
        text: "Paste the Server URL, Username and Password we sent on WhatsApp (or the portal URL for a MAC line). Name it ‘Best IPTV VIP’ and save.",
      },
      {
        title: "Let EPG and catch-up load",
        text: "MyTVOnline pulls the guide and archive automatically from our Xtream server. Give it a minute on first sync.",
      },
      {
        title: "Watch in 4K",
        text: "Open Live TV, pick a category and play. The Formuler decodes 4K HEVC in hardware for smooth playback.",
      },
    ],
    config: [
      {
        title: "Enable catch-up & recording",
        text: "In MOL settings, turn on Catch-up and plug a USB drive to record from the EPG. Formuler’s DVR is one of the best on any box.",
      },
      {
        title: "Customise ‘My Menu’",
        text: "Use My Menu to pin Live TV, favourites and your VOD categories to the home screen for one-click access with the remote.",
      },
      {
        title: "Prefer Ethernet or 5GHz",
        text: "For stable 4K, wire the box with Ethernet or use the 5GHz band. Formuler’s Wi-Fi is good, but wired is best for sports.",
      },
      {
        title: "Optional: install TiviMate",
        text: "Since Formuler Z is Android, open the Play Store and install TiviMate or IPTV Smarters if you prefer their UI — the same Best IPTV VIP login works there too.",
      },
    ],
    troubleshooting: [
      {
        q: "MyTVOnline won’t connect to the portal",
        a: "Re-check the Server URL (http:// + port, no spaces) and that your line is active. If MOL2 struggles, MOL3 or TiviMate from the Play Store often connects first try.",
      },
      {
        q: "Catch-up icon missing on channels",
        a: "Make sure you logged in via Xtream (not a bare M3U) so archive metadata is included, and enable Catch-up in MOL settings. Our server provides ~7 days.",
      },
      {
        q: "4K channel stutters",
        a: "Set the player’s decoder to hardware, use Ethernet, and confirm 25 Mbps+. On Z8 (older) very high-bitrate 4K may prefer the Z11 Pro’s newer chip.",
      },
    ],
    faq: [
      {
        q: "Do I need a subscription separate from the box?",
        a: "Yes. The Formuler box is hardware you buy once; the channels come from an IPTV line like Best IPTV VIP. The box does not include content.",
      },
      {
        q: "MOL2 or MOL3 — which player?",
        a: "MOL3 is newer with a slicker UI and better catch-up; MOL2 is simpler and very stable. Both work with our Xtream login — use whichever your model ships with.",
      },
      {
        q: "Can I use TiviMate on Formuler instead?",
        a: "Absolutely. Formuler Z runs Android, so TiviMate, IPTV Smarters and XCIPTV all install from the Play Store and accept the same Best IPTV VIP credentials.",
      },
    ],
    note: "Best IPTV VIP is a subscription/playlist provider. We don’t sell Formuler hardware — buy the box from an authorised Formuler reseller.",
    updated: UPDATED,
  },
};

export const APP_ORDER: AppSlug[] = [
  "iptv-smarters-pro",
  "tivimate",
  "ibo-player",
  "duplex-iptv",
  "xciptv",
  "stb-emulator",
  "sparkle-tv",
  "formuler-z",
];
