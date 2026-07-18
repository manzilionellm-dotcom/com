import type { AppSlug, DeviceSlug } from "../site";

export type AppGuide = {
  slug: AppSlug;
  name: string;
  short: string;
  emoji: string;
  category: "IPTV Player" | "Set-Top Box";
  hero: string;
  description: string;
  /** Answer-first summary used at top of page and for GEO/LLM snippets. */
  answer: string;
  /** Honest compatibility list. */
  platforms: string[];
  price: string;
  bestFor: string;
  /** Login method this app expects from us. */
  loginMethod: "Xtream Codes API" | "M3U URL" | "MAC address / Portal";
  pros: string[];
  cons: string[];
  steps: { title: string; text: string }[];
  config: { title: string; text: string }[];
  troubleshooting: { q: string; a: string }[];
  faq: { q: string; a: string }[];
  /** Money page (device guide) this app funnels into. */
  funnelDevice: DeviceSlug;
  updated: string;
};

export const APP_GUIDES: Record<AppSlug, AppGuide> = {
  tivimate: {
    slug: "tivimate",
    name: "TiviMate IPTV Player",
    short: "TiviMate",
    emoji: "📺",
    category: "IPTV Player",
    hero: "TiviMate setup guide — the best EPG player for Android TV & Firestick",
    description:
      "Complete 2026 TiviMate setup guide for Best IPTV VIP: add your Xtream Codes playlist, configure EPG and catch-up, enable recording, and fix the most common TiviMate errors. Works on Android TV, Firestick and NVIDIA Shield.",
    answer:
      "To set up TiviMate with Best IPTV VIP, open TiviMate → Add playlist → Xtream Codes, then enter the server URL, username and password we send you on WhatsApp. The EPG loads automatically. TiviMate is remote-first, so it is the smoothest player for TV boxes — but it does not run on iPhone, Samsung Tizen or LG webOS.",
    platforms: ["Android TV", "Google TV", "Amazon Firestick / Fire TV", "NVIDIA Shield", "Android phones & tablets", "Chromecast with Google TV"],
    price: "Free tier available · Premium ~$6.99/yr unlocks recording, multi-playlist, catch-up",
    bestFor: "TV-box users who want the best remote-driven EPG and recording",
    loginMethod: "Xtream Codes API",
    pros: [
      "Best-in-class EPG grid, built for a TV remote",
      "Recording, catch-up (up to 7 days) and picture-in-picture on Premium",
      "Multi-playlist, custom channel groups and parental lock",
    ],
    cons: [
      "No iOS, Samsung Tizen or LG webOS version — Android/Fire OS only",
      "Recording and catch-up are Premium-only (one-time or yearly unlock)",
    ],
    steps: [
      { title: "Install TiviMate", text: "On Android TV / Google TV open the Play Store and install TiviMate IPTV Player. On Firestick, install it via the Downloader app or the Amazon Appstore — search 'TiviMate'." },
      { title: "Open 'Add playlist'", text: "Launch TiviMate. On the first screen tap 'Add playlist', then choose 'Xtream Codes' (recommended) rather than M3U — Xtream Codes pulls in the EPG and VOD automatically." },
      { title: "Enter your Best IPTV VIP credentials", text: "Type the Server URL, Username and Password exactly as we send them on WhatsApp. Keep http:// and the port number intact — a missing port is the #1 cause of 'playlist error'." },
      { title: "Name the playlist and let it process", text: "Give it a name (e.g. 'Best IPTV VIP') and confirm. TiviMate downloads channels, groups and the EPG — this takes 10–30 seconds on a good connection." },
      { title: "Start watching", text: "Press OK on any channel. Use the left/right arrows for the mini-guide and the up arrow for the full EPG grid. Your login is saved for next time." },
    ],
    config: [
      { title: "EPG source", text: "TiviMate auto-detects the EPG from our Xtream Codes server, so you normally do nothing. If some logos or programmes are missing, go to Settings → EPG → check that our source is enabled, then 'Update EPG now'." },
      { title: "Catch-up (Premium)", text: "Settings → Playback → enable Catch-up. On any channel, open the EPG, scroll back in time and press OK on a past programme to replay up to 7 days." },
      { title: "Hardware decoder", text: "For smooth 4K, Settings → Playback → Decoder → set to 'Hardware'. Switch to 'Hardware+' on NVIDIA Shield or Firestick 4K Max for HEVC/H.265 channels." },
      { title: "Buffer size", text: "On slower Wi-Fi, Settings → Advanced → increase 'Buffer size' to 1500–3000 ms to trade a small start delay for freeze-free playback." },
    ],
    troubleshooting: [
      { q: "TiviMate says 'Playlist processing error' or 'HTTP 403'", a: "This is almost always a wrong URL/port or an expired login. Re-check the Server URL includes http:// and the correct port, and that username/password have no trailing space. If it still fails, message us on WhatsApp — we'll confirm your line is active." },
      { q: "EPG is empty or shows 'No information'", a: "Settings → EPG → make sure our source is toggled on, then run 'Update EPG now'. TiviMate needs the app open for a minute to finish the first EPG download." },
      { q: "Channels buffer only at peak hours", a: "Set Decoder to Hardware+, raise the buffer to ~2500 ms, and prefer 5 GHz Wi-Fi or Ethernet. If one specific channel freezes, tell us the channel name — we load-balance it server-side." },
    ],
    faq: [
      { q: "Is TiviMate free?", a: "The core player is free and enough to watch live TV. Premium (a low yearly fee paid to TiviMate, not to us) adds recording, catch-up, multiple playlists and PiP." },
      { q: "Does TiviMate work on Firestick?", a: "Yes — Firestick, Fire TV Stick 4K and Fire TV Cube all run TiviMate perfectly. It's one of the best pairings for Best IPTV VIP." },
      { q: "Can I use TiviMate on my iPhone or Samsung TV?", a: "No. TiviMate is Android/Fire OS only. On iPhone use IPTV Smarters Pro; on Samsung/LG use IBO Player Pro or Duplex Play." },
    ],
    funnelDevice: "android",
    updated: "2026-07-15",
  },

  "iptv-smarters-pro": {
    slug: "iptv-smarters-pro",
    name: "IPTV Smarters Pro",
    short: "Smarters Pro",
    emoji: "⚡",
    category: "IPTV Player",
    hero: "IPTV Smarters Pro setup on any device (Firestick, iOS, Android, PC)",
    description:
      "Step-by-step 2026 guide to install and configure IPTV Smarters Pro with Best IPTV VIP. Xtream Codes login, EPG, VOD, parental controls and fixes for the most common Smarters errors — on Firestick, iPhone, Android and desktop.",
    answer:
      "To set up IPTV Smarters Pro, open the app → 'Login with Xtream Codes API' → enter any name plus the server URL, username and password we send on WhatsApp. It is the most cross-platform IPTV player — the same login works on Firestick, iPhone, iPad, Android and Windows/Mac.",
    platforms: ["Amazon Firestick / Fire TV", "Android TV & phones", "iPhone / iPad", "Apple TV", "Windows & macOS", "Some Android-based Smart TVs"],
    price: "Free (some app stores list a paid 'Smarters Player Lite' clone — use the free official app)",
    bestFor: "People who want one identical app across phone, TV and computer",
    loginMethod: "Xtream Codes API",
    pros: [
      "Runs on more platforms than any other IPTV player",
      "Simple, beginner-friendly interface with live TV, movies and series split out",
      "Built-in multi-screen, parental lock and external-player support (VLC/MX)",
    ],
    cons: [
      "EPG grid is less powerful than TiviMate's",
      "App-store clones with different names exist — stick to the official one we link",
    ],
    steps: [
      { title: "Install IPTV Smarters Pro", text: "iPhone/iPad: App Store → 'IPTV Smarters Pro'. Android/Android TV: Play Store. Firestick: use the Downloader app with the URL we provide (Amazon sometimes hides it from search)." },
      { title: "Choose 'Login with Xtream Codes API'", text: "On the start screen pick the Xtream Codes option, not 'Load playlist file'. Xtream Codes gives you EPG, VOD and series categories automatically." },
      { title: "Enter your credentials", text: "Any Name you like, then the Server URL (with http:// and port), Username and Password from your WhatsApp confirmation. Tap Add User." },
      { title: "Let it load, then open Live TV", text: "The app fetches your channels and guide. Tap 'Live TV' for channels, 'Movies' for VOD, 'Series' for box sets. Everything is searchable." },
      { title: "Cast or AirPlay to the big screen", text: "On iPhone use AirPlay to Apple TV; on desktop cast a Chrome tab; on Firestick you're already on the TV." },
    ],
    config: [
      { title: "Set the external player (fixes many codec issues)", text: "Settings → Player Selection → set VLC or MX Player as external player for problem channels. The built-in player handles most streams, but this is the quickest fix for odd freezes." },
      { title: "Parental controls", text: "Settings → Parental Control → set a PIN and lock adult or specific categories — useful on a family Firestick." },
      { title: "EPG time offset", text: "If the guide is shifted by an hour, Settings → EPG → adjust the time offset to match your timezone." },
      { title: "Auto-start on boot (TV boxes)", text: "Settings → General → enable 'Automatically start app on boot' so your Firestick opens straight into IPTV." },
    ],
    troubleshooting: [
      { q: "'Invalid credentials' or 'Authorization failed'", a: "Re-type the server URL, username and password carefully — they are case-sensitive and the port matters. If you copied from WhatsApp, remove any trailing space. Still failing? We'll re-issue your line instantly." },
      { q: "Live TV loads but movies/series are empty", a: "That means the EPG/VOD didn't sync. Pull down to refresh, or log out and back in with Xtream Codes (not M3U). VOD can take a minute on first login." },
      { q: "Audio plays but the picture is frozen or black", a: "Switch that channel to the VLC/MX external player (Settings → Player Selection). It's a decoder mismatch, not a subscription problem." },
    ],
    faq: [
      { q: "Is IPTV Smarters Pro really free?", a: "Yes, the official app is free. Ignore paid look-alikes with slightly different names — we link the correct one on WhatsApp." },
      { q: "Which is better, Smarters or TiviMate?", a: "Smarters wins on device coverage (it's the only one that's on iPhone, Android and PC). TiviMate wins on EPG and recording for TV boxes. Many customers use Smarters on the phone and TiviMate on the TV." },
      { q: "Can I use one subscription on two devices with Smarters?", a: "Your plan includes a set number of simultaneous connections. You can install Smarters on many devices, but only stream on as many screens as your plan allows — ask us to bump your connections if needed." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-16",
  },

  "ibo-player": {
    slug: "ibo-player",
    name: "IBO Player Pro",
    short: "IBO Player",
    emoji: "🎯",
    category: "IPTV Player",
    hero: "IBO Player Pro setup for Samsung & LG Smart TV (no sideloading)",
    description:
      "How to activate IBO Player Pro on Samsung Tizen and LG webOS with Best IPTV VIP. Use your TV's MAC address and device key to add the playlist from the IBO Pro website — no rooting, no sideloading, no PC.",
    answer:
      "IBO Player Pro is the go-to IPTV app for Samsung and LG Smart TVs. You install it from your TV's app store, note the MAC address and device key it shows, then add your Best IPTV VIP playlist from iboproapp.com. There's a small one-time activation fee paid to IBO — after that the app is yours for life on that TV.",
    platforms: ["Samsung Smart TV (Tizen)", "LG Smart TV (webOS)", "Android TV / Firestick (secondary)"],
    price: "One-time activation fee (~$6–9) paid to IBO after a short free trial",
    bestFor: "Samsung/LG Smart TV owners who don't want to sideload anything",
    loginMethod: "M3U URL",
    pros: [
      "Native Samsung Tizen & LG webOS app — installs straight from the TV store",
      "You add the playlist from a website, so no typing long URLs with the TV remote",
      "Clean interface with live TV, movies and series",
    ],
    cons: [
      "Requires a one-time activation payment to IBO (separate from your subscription)",
      "No EPG catch-up/recording like TiviMate — it's a lean player",
    ],
    steps: [
      { title: "Install IBO Player Pro on your TV", text: "Samsung: Apps/Smart Hub → search 'IBO Player Pro'. LG: LG Content Store → search 'IBO Player Pro'. Install and open it." },
      { title: "Note the MAC address and Device Key", text: "The IBO home screen shows a MAC address (00:1A:79:XX:XX:XX) and a Device Key. Keep this screen visible or take a photo." },
      { title: "Go to iboproapp.com on your phone", text: "On a phone or laptop, open the official IBO Pro management site and log in / register with the MAC address and Device Key shown on your TV." },
      { title: "Add the Best IPTV VIP playlist", text: "Choose 'Add playlist' → paste the M3U URL we send you on WhatsApp → give it a name → save. Optionally add our EPG URL in the same form." },
      { title: "Reload the app on your TV", text: "Back on the TV, exit and reopen IBO Player Pro. Your full channel list and VOD appear automatically." },
    ],
    config: [
      { title: "Add EPG for the TV guide", text: "In the iboproapp.com playlist form there's an 'EPG URL' field — paste the guide link from WhatsApp so the programme guide shows on your TV." },
      { title: "Sort and hide categories", text: "The management site lets you reorder categories and hide ones you don't watch — do this on your phone, it's far faster than the TV remote." },
      { title: "Multiple playlists", text: "IBO Pro supports several playlists per device. Keep the Best IPTV VIP one as default and it loads on launch." },
    ],
    troubleshooting: [
      { q: "The playlist doesn't appear after adding it online", a: "Fully close IBO Player Pro on the TV (not just back out) and reopen it — it only pulls new playlists on a fresh launch. Also double-check you edited the device with the exact MAC shown on that TV." },
      { q: "'This app requires activation'", a: "The free trial has ended. IBO charges a small one-time fee via iboproapp.com to unlock the app permanently on that TV. This is an IBO charge, not part of your Best IPTV VIP plan." },
      { q: "Channels load but the guide is empty", a: "You added the M3U but not the EPG. Go back to the playlist on iboproapp.com and paste our EPG URL into the EPG field, then reopen the app." },
    ],
    faq: [
      { q: "Do I need a PC to set up IBO Player Pro?", a: "No — a phone browser is enough. You only need it to open iboproapp.com and paste the playlist; everything else is on the TV." },
      { q: "Is the activation fee monthly?", a: "No, it's a one-time payment to IBO for that specific TV. Your Best IPTV VIP subscription is separate and renews on its own schedule." },
      { q: "My Samsung TV is older — will IBO work?", a: "IBO Player Pro supports Samsung Tizen 2018+ and LG webOS 3.0+. On older sets use Duplex Play or Smart IPTV instead — message us and we'll pick the right one." },
    ],
    funnelDevice: "smart-tv",
    updated: "2026-07-14",
  },

  xciptv: {
    slug: "xciptv",
    name: "XCIPTV Player",
    short: "XCIPTV",
    emoji: "🚀",
    category: "IPTV Player",
    hero: "XCIPTV Player setup with Xtream Codes (Android & Firestick)",
    description:
      "Install and configure XCIPTV Player with Best IPTV VIP on Android TV, phones and Firestick. Xtream Codes login, multi-screen, external players and fixes for the usual XCIPTV playback issues.",
    answer:
      "XCIPTV is a lightweight, feature-rich player for Android and Firestick. Add Best IPTV VIP via 'Xtream Codes Login' using the server URL, username and password from WhatsApp. It supports EPG, catch-up, multi-screen and external players out of the box — a solid free alternative to TiviMate.",
    platforms: ["Android TV & phones", "Amazon Firestick / Fire TV", "Android tablets"],
    price: "Free (an ad-free paid build exists on some stores)",
    bestFor: "Android/Firestick users who want TiviMate-style features for free",
    loginMethod: "Xtream Codes API",
    pros: [
      "Xtream Codes, M3U and Stalker portals all supported in one app",
      "Multi-screen (up to 4 channels), catch-up and external player support",
      "Frequent updates and a clean modern UI",
    ],
    cons: [
      "Android/Fire OS only — no iOS or native Samsung/LG version",
      "The free build shows occasional ads",
    ],
    steps: [
      { title: "Install XCIPTV", text: "Play Store on Android/Android TV, or the Downloader app on Firestick with the URL we provide. Open the app and accept the permissions." },
      { title: "Choose 'Xtream Codes Login'", text: "On the login selector pick Xtream Codes (not M3U). Enter a playlist name, then the server URL, username and password from WhatsApp." },
      { title: "Load your channels", text: "XCIPTV pulls live TV, movies, series and the EPG. Give it 10–20 seconds on first login." },
      { title: "Set your home layout", text: "Pick the layout you like (grid or list) in the first-run prompt — you can change it later in Settings." },
      { title: "Watch and multi-screen", text: "Open any channel; long-press or use the multi-screen button to watch up to four channels at once — great for sports weekends." },
    ],
    config: [
      { title: "External player for stubborn channels", text: "Settings → Player → set VLC or MX Player as the external player and choose it from the channel menu if a stream won't decode natively." },
      { title: "EPG & catch-up", text: "Settings → EPG → enable auto-update. For catch-up, open the EPG, select a past programme and play — our server keeps several days of archive." },
      { title: "Auto-start and last channel", text: "Settings → General → enable auto-start on boot and 'resume last channel' so your box opens straight into TV." },
      { title: "Hardware decoding", text: "Settings → Player → Decoder → Hardware (or Hardware+ on a 4K Firestick/Shield) for smooth HEVC playback." },
    ],
    troubleshooting: [
      { q: "XCIPTV shows a blank channel list after login", a: "Log out and log back in via Xtream Codes, and confirm the port is included in the server URL. A blank list almost always means the URL was cut off before the port number." },
      { q: "Constant buffering on one category", a: "Switch that category's channels to the external VLC player and enable Hardware+ decoding. If a specific channel still buffers, send us its name and we'll rebalance it." },
      { q: "App crashes on launch after an update", a: "Clear the app cache (not data) in your device settings and reopen. If it persists, reinstall the latest build — your login is quick to re-enter." },
    ],
    faq: [
      { q: "Is XCIPTV as good as TiviMate?", a: "For free, it's the closest. TiviMate still has the more polished EPG and recording, but XCIPTV adds multi-screen and Stalker support that TiviMate lacks." },
      { q: "Does XCIPTV work on iPhone?", a: "No. It's Android/Fire OS only. On iPhone/iPad use IPTV Smarters Pro or GSE Smart IPTV." },
      { q: "M3U or Xtream Codes in XCIPTV?", a: "Use Xtream Codes with us — it delivers EPG, VOD and series automatically, where a plain M3U link often loses the guide." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-13",
  },

  "duplex-play": {
    slug: "duplex-play",
    name: "Duplex Play (Duplex IPTV)",
    short: "Duplex Play",
    emoji: "🟢",
    category: "IPTV Player",
    hero: "Duplex Play setup on Samsung & LG Smart TV",
    description:
      "Add Best IPTV VIP to Duplex Play on Samsung Tizen and LG webOS. Use the on-screen device key and MAC to link your playlist from the Duplex website — a lightweight, free-to-try Smart TV IPTV app.",
    answer:
      "Duplex Play (Duplex IPTV) is a popular Smart TV player for Samsung and LG. Install it from the TV store, read off the MAC + device key, then add your Best IPTV VIP M3U playlist at edit.duplaycms.app (the Duplex device portal). Reopen the app and your channels appear.",
    platforms: ["Samsung Smart TV (Tizen)", "LG Smart TV (webOS)"],
    price: "Free trial, then a small one-time device activation fee to Duplex",
    bestFor: "Samsung/LG owners who want a free-to-try alternative to IBO Player",
    loginMethod: "M3U URL",
    pros: [
      "Native Samsung/LG app — no sideloading",
      "Add playlists from a website instead of typing on the TV",
      "Clean live/VOD/series layout with EPG support",
    ],
    cons: [
      "Charges a one-time activation after the trial (paid to Duplex)",
      "Portal URL for adding playlists changes occasionally — we keep the current one on WhatsApp",
    ],
    steps: [
      { title: "Install Duplex Play on the TV", text: "Samsung Smart Hub / LG Content Store → search 'Duplex Play' (or 'Duplex IPTV') → install and open." },
      { title: "Read the MAC and Device Key", text: "The home screen shows your device MAC and a Device Key. Photograph this screen — you'll need both." },
      { title: "Open the Duplex device portal on your phone", text: "Go to the Duplex device management URL we send you (the official portal changes name occasionally, so use our current link). Enter the MAC and Device Key." },
      { title: "Add the Best IPTV VIP playlist", text: "Add a new playlist → paste the M3U URL from WhatsApp → add our EPG URL in the guide field → save." },
      { title: "Reopen Duplex Play", text: "Fully close and relaunch the app on your TV; your channels, movies and guide load automatically." },
    ],
    config: [
      { title: "EPG guide", text: "Paste our EPG URL into the playlist's guide field on the portal so the TV shows programme names and times." },
      { title: "Reorder & favourites", text: "Use the portal to sort categories and mark favourites — much faster than the TV remote." },
      { title: "Keep the app updated", text: "Duplex occasionally pushes an update via the TV store; installing it fixes most sudden playback problems." },
    ],
    troubleshooting: [
      { q: "'No playlist' after adding one online", a: "Close Duplex Play completely and reopen — it reads new playlists only on a fresh launch. Confirm you edited the device matching the MAC shown on that exact TV." },
      { q: "The portal URL won't open", a: "Duplex renames its device portal from time to time. Message us on WhatsApp for the current working URL and paste your playlist there." },
      { q: "App asks to pay to continue", a: "The free trial expired. Duplex charges a small one-time activation for that TV, separate from your Best IPTV VIP subscription." },
    ],
    faq: [
      { q: "Duplex Play or IBO Player for my Samsung TV?", a: "Both are excellent and work the same way (MAC + device key + website). IBO tends to be more stable on newer Tizen; Duplex on some older models. If one won't activate, try the other — we support both." },
      { q: "Is the activation fee recurring?", a: "No, it's a one-time charge to Duplex for that device. Your subscription with us is separate." },
      { q: "Can I add EPG in Duplex Play?", a: "Yes — paste our EPG URL into the guide field on the Duplex portal when you add the playlist." },
    ],
    funnelDevice: "smart-tv",
    updated: "2026-07-12",
  },

  "sparkle-tv": {
    slug: "sparkle-tv",
    name: "Sparkle TV",
    short: "Sparkle TV",
    emoji: "✨",
    category: "IPTV Player",
    hero: "Sparkle TV setup on Samsung Smart TV",
    description:
      "Install Sparkle TV on Samsung Tizen and load your Best IPTV VIP playlist by MAC address. A simple, reliable Smart TV IPTV player for when IBO or Duplex aren't available.",
    answer:
      "Sparkle TV is a straightforward IPTV player for Samsung Smart TVs. Install it from Smart Hub, note the MAC address, then register your Best IPTV VIP M3U playlist on the Sparkle portal. It's a clean, no-frills option and a good fallback when other Smart TV apps won't activate.",
    platforms: ["Samsung Smart TV (Tizen)", "Some LG webOS models"],
    price: "Free trial, then a small one-time activation to Sparkle",
    bestFor: "Samsung owners wanting a simple backup player",
    loginMethod: "M3U URL",
    pros: [
      "Very simple, lightweight interface",
      "Native Samsung app — no sideloading",
      "Good fallback when IBO/Duplex won't activate on a set",
    ],
    cons: [
      "Fewer features than IBO/Duplex (basic EPG, no catch-up)",
      "One-time activation fee to Sparkle after the trial",
    ],
    steps: [
      { title: "Install Sparkle TV", text: "Samsung Smart Hub → search 'Sparkle TV' → install and open." },
      { title: "Note the MAC address", text: "The start screen displays your device MAC. Photograph it." },
      { title: "Open the Sparkle portal", text: "On your phone, open the Sparkle device portal link we provide and enter your MAC address to register the device." },
      { title: "Add the Best IPTV VIP M3U", text: "Paste the M3U URL from WhatsApp (and our EPG URL if there's a field) and save." },
      { title: "Reopen the app", text: "Relaunch Sparkle TV on the television; channels load automatically." },
    ],
    config: [
      { title: "EPG", text: "If the portal has an EPG field, paste our guide URL so programme info appears." },
      { title: "Favourites", text: "Mark your regular channels as favourites for one-click access from the home row." },
      { title: "Restart to apply changes", text: "Sparkle applies new playlists on relaunch — always fully close and reopen after editing on the portal." },
    ],
    troubleshooting: [
      { q: "Nothing loads after adding the playlist", a: "Close the app completely and reopen it; confirm the MAC on the portal matches the TV. If it still fails, re-copy the M3U URL — a truncated URL is the usual cause." },
      { q: "Guide is missing", a: "Sparkle's EPG is basic. Add our EPG URL on the portal; if the model doesn't support it, use IBO Player Pro for a fuller guide." },
      { q: "App won't continue past the trial", a: "Pay the small one-time Sparkle activation on the portal for that TV — it's separate from your subscription." },
    ],
    faq: [
      { q: "Should I use Sparkle TV or IBO Player?", a: "IBO Player Pro is more full-featured; Sparkle is a simpler fallback. If IBO or Duplex won't activate on your specific Samsung model, Sparkle often will." },
      { q: "Does Sparkle TV have catch-up?", a: "No — it focuses on live TV and VOD. For catch-up and recording use TiviMate on an Android box connected to the same TV." },
      { q: "Is it free?", a: "There's a free trial, then a one-time activation to Sparkle. Your Best IPTV VIP plan is billed separately." },
    ],
    funnelDevice: "smart-tv",
    updated: "2026-07-11",
  },

  "formuler-z": {
    slug: "formuler-z",
    name: "Formuler Z Box (MYTVOnline)",
    short: "Formuler Z",
    emoji: "📦",
    category: "Set-Top Box",
    hero: "Formuler Z8 / Z11 setup with MYTVOnline & Best IPTV VIP",
    description:
      "Configure your Formuler Z8, Z10 or Z11 box with Best IPTV VIP using the MYTVOnline player and a Xtream Codes or portal login. EPG, catch-up and the fastest remote-driven IPTV experience on a dedicated box.",
    answer:
      "Formuler Z boxes run the MYTVOnline (MOL) player. Add Best IPTV VIP by creating a new portal/playlist in MOL and entering the Xtream Codes or portal details we send on WhatsApp. Formuler boxes are purpose-built for IPTV, with an EPG-first remote and rock-solid 4K playback.",
    platforms: ["Formuler Z8", "Formuler Z8 Pro", "Formuler Z10 Pro", "Formuler Z11 Pro (Android TV)"],
    price: "Box is a one-time hardware purchase; MYTVOnline player is included",
    bestFor: "Buyers who want a dedicated, TV-remote-first IPTV box, not an app on another device",
    loginMethod: "MAC address / Portal",
    pros: [
      "Purpose-built IPTV box with the best physical remote (dedicated guide/mouse keys)",
      "MYTVOnline 2/3 has an excellent EPG, catch-up and recording to USB",
      "Newer Z11 Pro runs full Android TV, so TiviMate/Smarters also install",
    ],
    cons: [
      "Requires buying the hardware up front",
      "MYTVOnline setup screens differ a little between Z8 and Z11",
    ],
    steps: [
      { title: "Connect and update the box", text: "Plug the Formuler Z into HDMI and network (Ethernet preferred). On first boot, install any firmware and MYTVOnline update it offers." },
      { title: "Open MYTVOnline → Add Portal/Playlist", text: "Launch the MYTVOnline (MOL) player → Settings/Playlists → Add. Choose Xtream Codes or Portal depending on what we send you." },
      { title: "Enter your Best IPTV VIP details", text: "For Xtream Codes: server URL, username, password. For a portal: paste the portal URL — your box MAC is already registered by us if you sent it on WhatsApp." },
      { title: "Load channels and EPG", text: "MOL downloads channels, groups and the guide. Choose your default group and layout." },
      { title: "Watch with the Formuler remote", text: "Use the dedicated GUIDE and mouse keys. Long-press favourites and set a boot channel for instant TV." },
    ],
    config: [
      { title: "Catch-up & recording", text: "In MYTVOnline enable catch-up on our source; plug a USB drive to record live TV directly on the box." },
      { title: "Boot to last channel", text: "MOL settings → enable 'boot to player' and 'resume last channel' so the box turns on straight into IPTV." },
      { title: "Buffer & decoder", text: "If a 4K channel stutters, raise the buffer slightly in MOL playback settings and confirm hardware decoding is on." },
      { title: "Z11 Pro extras", text: "On the Android-TV-based Z11 Pro you can also install TiviMate or IPTV Smarters from the Play Store and log in with the same Xtream Codes details." },
    ],
    troubleshooting: [
      { q: "Portal loads no channels", a: "Confirm you sent us the box MAC (Settings → System Info) so we could register it, and that the portal URL is exact. Reboot the box after we confirm activation." },
      { q: "EPG missing in MYTVOnline", a: "Re-select our source as the EPG provider in MOL settings and trigger a guide update; leave the player open for a minute to finish." },
      { q: "4K channel stutters", a: "Use Ethernet, enable hardware decoding and add a little buffer. If one channel is the culprit, tell us its name and we'll rebalance server-side." },
    ],
    faq: [
      { q: "Do I need a subscription and a Formuler box?", a: "The box is the hardware; Best IPTV VIP is the service that fills it with channels. You buy the box once and subscribe to us for the content." },
      { q: "Formuler Z8 vs Z11 Pro?", a: "Z8/Z10 run Formuler's own OS with MYTVOnline — simplest and very stable. Z11 Pro adds full Android TV, so you also get the Play Store, TiviMate and Smarters." },
      { q: "Can Formuler record live TV?", a: "Yes — plug in a USB drive and use MYTVOnline's recording, plus catch-up on supported channels." },
    ],
    funnelDevice: "android",
    updated: "2026-07-10",
  },

  "stb-emulator": {
    slug: "stb-emulator",
    name: "STB Emulator (STBEmu)",
    short: "STB Emulator",
    emoji: "🖥️",
    category: "IPTV Player",
    hero: "STB Emulator (STBEmu) portal setup on Android & Firestick",
    description:
      "Configure STB Emulator (STBEmu) on Android TV and Firestick to run a Best IPTV VIP MAC portal. Create a profile, set the portal URL, spoof the MAC we register, and get a MAG-box experience on any Android device.",
    answer:
      "STB Emulator turns an Android box or Firestick into a virtual MAG box. Create a profile, set the Portal URL we provide, and set the profile MAC to the address we register on WhatsApp. It's ideal when your line is provisioned as a Stalker/Ministra portal rather than Xtream Codes.",
    platforms: ["Android TV & phones", "Amazon Firestick / Fire TV", "Android boxes"],
    price: "Free (STB Emulator Pro is a paid one-time upgrade)",
    bestFor: "Portal/MAC (Stalker) lines and MAG-box fans on Android hardware",
    loginMethod: "MAC address / Portal",
    pros: [
      "Emulates a MAG/Stalker box so portal-only lines work on cheap Android hardware",
      "Full MAG-style UI with EPG and catch-up",
      "Great for reusing an existing portal subscription on a Firestick",
    ],
    cons: [
      "Setup is more technical (profile + portal URL + MAC) than Xtream Codes apps",
      "Firestick remote makes typing the portal URL fiddly — a USB/Bluetooth keyboard helps",
    ],
    steps: [
      { title: "Install STB Emulator", text: "Android/Android TV: Play Store ('STB Emulator' by Kirill Volkov). Firestick: use the Downloader app with the URL we provide." },
      { title: "Open the profile settings", text: "Launch STBEmu → menu → Settings → Profiles → tap the default profile to edit it." },
      { title: "Set the Portal URL", text: "Under 'STB Configuration → Portal settings', paste the Portal (Stalker/Ministra) URL we send you on WhatsApp." },
      { title: "Set the MAC address", text: "Under Profile → 'STB MAC address', enter the exact MAC we registered for you (it usually starts 00:1A:79:). This must match what's on our portal." },
      { title: "Restart the profile", text: "Back out to the main screen (or restart the app). STBEmu connects to the portal and loads your channels, EPG and VOD like a MAG box." },
    ],
    config: [
      { title: "EPG & catch-up", text: "The portal supplies the EPG automatically. Open the guide, scroll back and select a past programme to use catch-up where available." },
      { title: "Screen resolution", text: "Settings → set the screen resolution to match your TV (1080p or 4K) to avoid a stretched MAG interface." },
      { title: "Auto-load on boot", text: "Enable 'load profile on startup' so the box opens straight into the portal." },
    ],
    troubleshooting: [
      { q: "'Portal not responding' or a blank MAG screen", a: "The most common cause is a MAC mismatch. Confirm the profile MAC is exactly the one we registered, and that the portal URL is complete. Ping us on WhatsApp and we'll re-check the MAC on our side." },
      { q: "Channels list is empty after connecting", a: "Your line may be provisioned but not yet linked to that MAC — send us the MAC from your profile and we'll bind it, then restart the app." },
      { q: "Firestick keyboard makes the URL a nightmare", a: "Pair a Bluetooth keyboard or use the Fire TV phone app as a remote to type the portal URL and MAC accurately — one wrong character stops it connecting." },
    ],
    faq: [
      { q: "What's the difference between STB Emulator and IPTV Smarters?", a: "Smarters uses Xtream Codes/M3U; STB Emulator uses a MAC portal (Stalker/Ministra), exactly like a physical MAG box. We can provision your line either way — tell us which app you're using." },
      { q: "Is STB Emulator free?", a: "The standard app is free. 'STB Emulator Pro' is an optional one-time paid upgrade; you don't need it for Best IPTV VIP." },
      { q: "Can I run STBEmu on a Firestick?", a: "Yes — sideload it via Downloader. A Bluetooth keyboard makes the portal/MAC entry much easier." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-09",
  },
};
