import type { DeviceSlug } from "../site";

export type DeviceGuide = {
  slug: DeviceSlug;
  name: string;
  short: string;
  emoji: string;
  hero: string;
  description: string;
  apps: string[];
  steps: { title: string; text: string }[];
  troubleshooting: { q: string; a: string }[];
};

export const DEVICE_GUIDES: Record<DeviceSlug, DeviceGuide> = {
  firestick: {
    slug: "firestick",
    name: "Amazon Firestick",
    short: "Firestick",
    emoji: "🔥",
    hero: "Install IPTV on Amazon Firestick in under 5 minutes",
    description:
      "Step-by-step guide to install Best IPTV VIP on your Amazon Firestick (4K Max, Lite, Cube) using IPTV Smarters Pro, TiviMate or Downloader. Watch 22,000+ live channels and 120,000+ movies in 4K UHD without buffering.",
    apps: ["IPTV Smarters Pro", "TiviMate", "XCIPTV", "IBO Player Pro"],
    steps: [
      {
        title: "Enable Apps from Unknown Sources",
        text: "On your Firestick, go to Settings → My Fire TV → Developer Options → enable Apps from Unknown Sources. This lets you sideload the IPTV player.",
      },
      {
        title: "Install Downloader",
        text: "From the Firestick search bar, type Downloader and install the official app by AFTVnews.",
      },
      {
        title: "Download IPTV Smarters Pro",
        text: "Open Downloader and enter the URL we send you on WhatsApp. The IPTV Smarters APK will download and install in under a minute.",
      },
      {
        title: "Add your Best IPTV VIP playlist",
        text: "Launch IPTV Smarters → Login with Xtream Codes API (recommended) using the username, password and server URL you received via WhatsApp.",
      },
      {
        title: "Enjoy 22,000+ channels in 4K",
        text: "Browse live TV, sports, movies, series and VOD with full EPG. Your Firestick will remember your login next time.",
      },
    ],
    troubleshooting: [
      {
        q: "Why is my Firestick buffering?", a: "The Firestick guide says to check internet speed, with a minimum of 25 Mbps for 4K, to enable Auto Hardware Decoder in Smarters settings, and to clear the app cache weekly. The guide uses IPTV Smarters Pro or TiviMate and adds the playlist with the Xtream Codes username, password and server URL sent on WhatsApp.",
      },
      {
        q: "Can I install on Firestick Lite?", a: "Yes. The Firestick guide says Firestick Lite supports up to 1080p HD streaming, and that 4K UHD needs a Firestick 4K Max or a Fire TV Cube. The install steps still enable Unknown Sources, install Downloader, then IPTV Smarters Pro, and sign in with the login sent on WhatsApp.",
      },
    ],
  },
  "smart-tv": {
    slug: "smart-tv",
    name: "Smart TV (Samsung, LG, Sony)",
    short: "Smart TV",
    emoji: "📺",
    hero: "Install IPTV on Smart TV (Samsung, LG, Sony, Hisense)",
    description:
      "Install Best IPTV VIP on Samsung Tizen, LG webOS, Android TV (Sony, Hisense, TCL, Philips) using Smart IPTV, SS IPTV or IBO Player Pro. Get 22,000+ channels in 4K UHD with full EPG.",
    apps: ["Smart IPTV (SIPTV)", "IBO Player Pro", "SS IPTV", "Set IPTV"],
    steps: [
      {
        title: "Find your TV MAC address",
        text: "Open Smart IPTV / IBO Player Pro on your Smart TV — the home screen shows your unique MAC address (e.g. 00:1A:79:XX:XX:XX).",
      },
      {
        title: "Send us the MAC via WhatsApp",
        text: "Send the MAC address to our WhatsApp. We register your playlist on our portal within minutes — no app sideloading required.",
      },
      {
        title: "Restart the app",
        text: "Close and reopen Smart IPTV. Your full Best IPTV VIP playlist with EPG will load automatically.",
      },
      {
        title: "Enjoy 22,000+ channels in 4K",
        text: "Use the TV remote to browse live channels, VOD, series and catch-up TV. Compatible with Samsung Tizen 2017+ and LG webOS 3.0+.",
      },
    ],
    troubleshooting: [
      {
        q: "Samsung removed Smart IPTV from the store, what now?", a: "The Smart TV guide says to use IBO Player Pro or Set IPTV, which it says are still on Samsung Smart Hub, and that Smart IPTV is supported too. You read the MAC address in the app, send it on WhatsApp, and restart the app so the Best IPTV VIP playlist loads.",
      },
      {
        q: "Channels are slow to load on my Smart TV?", a: "The Smart TV guide says the Wi Fi chips in many sets are weak, so use a wired Ethernet cable if you can, restart the router, and clear the app cache. Playlist setup is the MAC address you send on WhatsApp. The apps named are Smart IPTV, IBO Player Pro, SS IPTV and Set IPTV.",
      },
    ],
  },
  android: {
    slug: "android",
    name: "Android TV / Android Box",
    short: "Android",
    emoji: "🤖",
    hero: "Install IPTV on Android TV, NVIDIA Shield, Xiaomi Mi Box",
    description:
      "Complete guide to install Best IPTV VIP on Android TV boxes (NVIDIA Shield, Xiaomi Mi Box, Chromecast with Google TV, Onn 4K Pro) using TiviMate Premium or IPTV Smarters Pro.",
    apps: ["TiviMate Premium", "IPTV Smarters Pro", "XCIPTV", "OTT Navigator"],
    steps: [
      {
        title: "Install TiviMate from Google Play",
        text: "Open the Play Store on your Android TV box and install TiviMate IPTV Player. Premium unlocks recording, multi-playlist and catch-up.",
      },
      {
        title: "Add a new playlist",
        text: "Open TiviMate → Add Playlist → Xtream Codes. Enter the server URL, username and password we sent you via WhatsApp.",
      },
      {
        title: "Configure EPG and catch-up",
        text: "TiviMate auto-detects the EPG from our server. Enable catch-up to rewind up to 7 days of live TV.",
      },
      {
        title: "Enjoy 22,000+ channels",
        text: "TiviMate is the best UI for Android TV: full EPG, picture-in-picture, parental control, custom groups.",
      },
    ],
    troubleshooting: [
      {
        q: "Should I use TiviMate or IPTV Smarters?", a: "The Android guide says TiviMate has the best EPG and a remote friendly interface, while IPTV Smarters is simpler, and that both work with Best IPTV VIP. TiviMate comes from the Play Store. You add Xtream Codes with the server URL, username and password sent on WhatsApp.",
      },
      {
        q: "How do I enable 4K on NVIDIA Shield?", a: "The Android guide says Shield Pro auto detects 4K HDR, and that TiviMate should use the Hardware plus decoder for smooth 4K HEVC playback. The same guide covers NVIDIA Shield, Xiaomi Mi Box, Chromecast with Google TV and Onn 4K Pro, with TiviMate or IPTV Smarters Pro.",
      },
    ],
  },
  ios: {
    slug: "ios",
    name: "iPhone / iPad / Apple TV",
    short: "iOS",
    emoji: "📱",
    hero: "Install IPTV on iPhone, iPad and Apple TV",
    description:
      "Install Best IPTV VIP on iPhone, iPad and Apple TV 4K using IPTV Smarters Pro or GSE Smart IPTV from the App Store. AirPlay to your TV, watch in 4K UHD.",
    apps: ["IPTV Smarters Pro", "GSE Smart IPTV", "iPlayTV", "Flex IPTV"],
    steps: [
      {
        title: "Download IPTV Smarters Pro from App Store",
        text: "Search IPTV Smarters Pro on the iOS App Store and install (free).",
      },
      {
        title: "Add Xtream Codes login",
        text: "Open the app → Add User → Xtream Codes API. Enter the server URL, username and password from our WhatsApp confirmation.",
      },
      {
        title: "AirPlay to Apple TV (optional)",
        text: "On iPhone/iPad use AirPlay from the player to send the stream to your Apple TV in 4K.",
      },
      {
        title: "Enjoy 22,000+ channels",
        text: "Full EPG, VOD, series, parental controls. Background audio for radio channels supported.",
      },
    ],
    troubleshooting: [
      {
        q: "GSE Smart IPTV vs IPTV Smarters on iOS?", a: "The iPhone guide says GSE has more advanced features, including recording on iPad and EPG color coding, while Smarters is simpler, and that both are supported. IPTV Smarters Pro comes from the App Store. You add Xtream Codes with the server URL, username and password from WhatsApp.",
      },
      {
        q: "Why no 4K on iPhone?", a: "The iPhone guide says iPhone screens are HD and FHD, and that 4K needs AirPlay to an Apple TV 4K or the native Apple TV app. The guide installs IPTV Smarters Pro or GSE Smart IPTV from the App Store and signs in with the Xtream Codes details sent on WhatsApp.",
      },
    ],
  },
  "mag-box": {
    slug: "mag-box",
    name: "MAG Box (Infomir)",
    short: "MAG Box",
    emoji: "📡",
    hero: "Setup Best IPTV VIP on MAG 254 / 322 / 420w / 524",
    description:
      "Activate Best IPTV VIP on any Infomir MAG box (MAG 254, 322, 420w, 522, 524) by sending us your MAC address. Plug-and-play, no app required.",
    apps: ["Stalker / Ministra middleware (built-in)"],
    steps: [
      {
        title: "Find your MAG MAC address",
        text: "On the MAG home menu, open Settings → System Info. Note the MAC address (00:1A:79:XX:XX:XX).",
      },
      {
        title: "Send MAC via WhatsApp",
        text: "Send the MAC to our WhatsApp. We provision your account in minutes on our portal.",
      },
      {
        title: "Restart your MAG box",
        text: "Power-cycle the box. On boot, the portal will load and all channels appear automatically.",
      },
      {
        title: "Enjoy 22,000+ channels",
        text: "Full EPG, VOD, series and catch-up are pre-loaded. Use the MAG remote — no extra config needed.",
      },
    ],
    troubleshooting: [
      {
        q: "MAG portal not loading?", a: "The MAG guide says to set the portal URL manually under Settings, then Servers, then Portals, and to ask WhatsApp support for the current URL. You send the MAC address from System Info and power cycle the box. The guide covers MAG 254, 322, 420w, 522 and 524.",
      },
      {
        q: "Does MAG support 4K?", a: "The MAG guide says MAG 420w, 522 and 524 support 4K HEVC, while MAG 254 is HD and FHD only. You send the MAC address on WhatsApp and restart the box. The guide says EPG, VOD, series and catch up are already loaded in the built in portal.",
      },
    ],
  },
  "pc-mac": {
    slug: "pc-mac",
    name: "PC / Mac / Linux",
    short: "PC / Mac",
    emoji: "💻",
    hero: "Watch Best IPTV VIP on PC, Mac and Linux",
    description:
      "Stream Best IPTV VIP on Windows, macOS and Linux using VLC Media Player, Kodi or the IPTV Smarters desktop app. 22,000+ channels in 4K with full EPG.",
    apps: ["VLC Media Player", "Kodi (PVR IPTV Simple Client)", "IPTV Smarters Pro Desktop", "MyIPTV Player (Windows)"],
    steps: [
      {
        title: "Download VLC or IPTV Smarters",
        text: "Get VLC from videolan.org (free) or IPTV Smarters Pro desktop from siptv.app — both run on Windows, Mac and Linux.",
      },
      {
        title: "Open the M3U URL",
        text: "In VLC: Media → Open Network Stream → paste the M3U URL we sent you via WhatsApp.",
      },
      {
        title: "Or use Xtream Codes login",
        text: "In IPTV Smarters Desktop: New User → Xtream Codes → enter server, username, password. Full EPG loads automatically.",
      },
      {
        title: "Enjoy 22,000+ channels",
        text: "Cast to your TV via Chromecast (Chrome browser), AirPlay (Mac) or HDMI cable.",
      },
    ],
    troubleshooting: [
      {
        q: "VLC freezes on 4K channels?", a: "The PC guide says to turn on hardware decoding in VLC, under Tools, then Preferences, then Input and Codecs, and set it to Automatic. It also describes IPTV Smarters Desktop, where Xtream Codes login loads the EPG, on Windows, Mac and Linux, for the 22000 plus channels it states in 4K.",
      },
      {
        q: "Kodi PVR setup?", a: "The PC guide says to install the PVR IPTV Simple Client in Kodi, open Configure, and paste the M3U URL. It says the EPG URL is auto detected from the Xtream API. VLC can open that same M3U from Media, then Open Network Stream, using the link sent on WhatsApp.",
      },
    ],
  },
};
