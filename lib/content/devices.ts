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
      "Step-by-step guide to install Best IPTV VIP on your Amazon Firestick (4K Max, Lite, Cube) with IPTV Smarters Pro or TiviMate. Watch 22,000+ live channels in 4K UHD.",
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
        q: "Why is my Firestick buffering?",
        a: "Check internet speed (min 25 Mbps for 4K), enable Auto Hardware Decoder in Smarters settings, and clear the app cache weekly.",
      },
      {
        q: "Can I install on Firestick Lite?",
        a: "Yes — Firestick Lite supports up to 1080p HD streaming. For 4K UHD use Firestick 4K Max or Fire TV Cube.",
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
      "Install Best IPTV VIP on Samsung Tizen, LG webOS and Android TV (Sony, Hisense, TCL) using Smart IPTV or IBO Player Pro. Get 22,000+ channels in 4K UHD with EPG.",
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
        q: "Samsung removed Smart IPTV from the store, what now?",
        a: "Use IBO Player Pro or Set IPTV, both still available on Samsung Smart Hub. We support all three.",
      },
      {
        q: "Channels are slow to load on my Smart TV",
        a: "Use a wired Ethernet cable if possible — Smart TV Wi-Fi chips are often weak. Restart the router and clear app cache.",
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
      "Complete guide to install Best IPTV VIP on Android TV boxes (NVIDIA Shield, Xiaomi Mi Box, Chromecast with Google TV) using TiviMate Premium or IPTV Smarters Pro.",
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
        q: "Should I use TiviMate or IPTV Smarters?",
        a: "TiviMate has the best EPG and remote-friendly UI. IPTV Smarters is simpler. Both work perfectly with Best IPTV VIP.",
      },
      {
        q: "How do I enable 4K on NVIDIA Shield?",
        a: "Shield Pro auto-detects 4K HDR. In TiviMate settings, set Decoder to Hardware+ for smooth 4K HEVC playback.",
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
        q: "GSE Smart IPTV vs IPTV Smarters on iOS?",
        a: "GSE has more advanced features (recording on iPad, EPG color coding). Smarters is simpler. Both supported.",
      },
      {
        q: "Why no 4K on iPhone?",
        a: "iPhone screens are HD/FHD. To get 4K, AirPlay to Apple TV 4K or use the native Apple TV app.",
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
        q: "MAG portal not loading?",
        a: "Set portal URL manually in Settings → Servers → Portals: ask our support on WhatsApp for the current URL.",
      },
      {
        q: "Does MAG support 4K?",
        a: "MAG 420w, 522 and 524 support 4K HEVC. MAG 254 is HD/FHD only.",
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
        q: "VLC freezes on 4K channels",
        a: "Enable Hardware Decoding in VLC: Tools → Preferences → Input/Codecs → Hardware-accelerated decoding: Automatic.",
      },
      {
        q: "Kodi PVR setup?",
        a: "Install PVR IPTV Simple Client → Configure → M3U URL: paste our link. EPG URL is auto-detected from Xtream API.",
      },
    ],
  },
};
