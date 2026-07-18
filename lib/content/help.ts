import type { HelpSlug } from "../site";

export type HelpFaq = { q: string; a: string };
export type HelpSolution = { title: string; text: string };

export type HelpTopic = {
  slug: HelpSlug;
  title: string;
  emoji: string;
  keyword: string;
  description: string;
  /** Answer-first: the fix in 1–2 sentences (GEO featured-snippet target) */
  answer: string;
  /** Probable causes, most common first */
  causes: string[];
  /** Ordered fix steps */
  solutions: HelpSolution[];
  faq: HelpFaq[];
  updated: string;
};

const UPDATED = "2026-07-15";

export const HELP_TOPICS: Record<HelpSlug, HelpTopic> = {
  "iptv-not-connecting": {
    slug: "iptv-not-connecting",
    title: "IPTV not connecting / “cannot connect to server”",
    emoji: "🔌",
    keyword: "iptv not connecting",
    description:
      "Fix IPTV that won’t connect or shows ‘cannot connect to server’ / ‘invalid credentials’. Check credentials, URL format, subscription status and DNS in a few minutes.",
    answer:
      "In 9 out of 10 cases it’s a mistyped Server URL or an expired line. Re-enter your Xtream credentials exactly (copy-paste, http:// + port, no spaces), confirm your subscription is active, and if it still fails, switch your DNS to 8.8.8.8 or test on mobile data to rule out ISP blocking.",
    causes: [
      "Server URL, username or password typed incorrectly (spaces, wrong port)",
      "Subscription or free trial has expired",
      "ISP is blocking the IPTV server (common in some countries)",
      "Device DNS is failing to resolve the server",
      "Max connections reached — too many devices streaming at once",
    ],
    solutions: [
      {
        title: "Re-enter your credentials exactly",
        text: "Delete the playlist/user and re-add it. Copy-paste the Server URL, Username and Password from our WhatsApp message rather than typing. The URL must start with http:// and include the port (e.g. http://server.com:8080).",
      },
      {
        title: "Confirm your line is active",
        text: "If your trial ended or the plan lapsed, connection is refused. Message us on WhatsApp — we confirm your status instantly and renew in minutes.",
      },
      {
        title: "Change your DNS",
        text: "Set your device or router DNS to Google (8.8.8.8 / 8.8.4.4) or Cloudflare (1.1.1.1). Many ‘cannot connect’ errors are DNS resolution failures, not dead lines.",
      },
      {
        title: "Test on mobile data",
        text: "Temporarily connect the device (or hotspot) to a different network / mobile data. If it works there, your ISP is blocking the server — a VPN then fixes it.",
      },
      {
        title: "Close other streams",
        text: "If several devices are watching, you may have hit your plan’s connection limit. Stop the extras or ask us about a multi-connection upgrade.",
      },
    ],
    faq: [
      {
        q: "It worked yesterday and stopped today — why?",
        a: "Usually the line expired or the app cached an old token. Reboot the device, re-add the login, and check your renewal date with us on WhatsApp.",
      },
      {
        q: "Do I need a VPN to connect?",
        a: "Only if your ISP blocks the server (the mobile-data test above confirms it). Otherwise IPTV connects fine without one.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-buffering": {
    slug: "iptv-buffering",
    title: "IPTV buffering — how to stop it",
    emoji: "⏳",
    keyword: "iptv buffering fix",
    description:
      "Stop IPTV buffering for good. Fix weak Wi-Fi, low bandwidth, wrong decoder settings and overloaded devices with this step-by-step 2026 guide.",
    answer:
      "Most buffering is a local network problem, not the IPTV server. Switch to Ethernet (or 5GHz Wi-Fi), make sure you have 25 Mbps+ for 4K, raise the app’s buffer size, and set the decoder to Hardware. If only 4K channels buffer while HD is smooth, your connection is the bottleneck.",
    causes: [
      "Weak Wi-Fi signal or 2.4GHz congestion",
      "Under 25 Mbps of real download bandwidth for 4K",
      "App buffer set too low, or software decoding forced",
      "Old / underpowered device (cheap Android box, Firestick Lite on 4K)",
      "Peak-hour ISP congestion or throttling",
    ],
    solutions: [
      {
        title: "Go wired or 5GHz",
        text: "Plug the device into Ethernet if you can — it eliminates most buffering. If wired isn’t possible, use the 5GHz Wi-Fi band and move closer to the router.",
      },
      {
        title: "Check your real speed",
        text: "Run a speed test on the same device. You need ~10 Mbps for HD and 25 Mbps+ for 4K. If you’re below that, lower the stream to HD or upgrade your internet.",
      },
      {
        title: "Raise the buffer & use hardware decoding",
        text: "In your player (TiviMate/Smarters/XCIPTV): set Decoder to Hardware/Hardware+, and increase Buffer size. This smooths high-bitrate 4K streams.",
      },
      {
        title: "Clear the app cache & reboot",
        text: "Clear the player’s cache and restart both the device and your router. A weekly reboot keeps cheap boxes and Firesticks responsive.",
      },
      {
        title: "Test another channel / time",
        text: "If only one channel buffers, it’s that source — not you. If everything buffers at 8pm only, it’s peak-hour ISP congestion; a VPN sometimes bypasses throttling.",
      },
    ],
    faq: [
      {
        q: "Why does only 4K buffer but HD is fine?",
        a: "4K needs 4–6× the bandwidth of HD. Your line can carry HD but not 4K — go wired, get 25 Mbps+, or watch those channels in HD.",
      },
      {
        q: "Is buffering the provider’s fault?",
        a: "Occasionally a single overloaded channel is. But if HD is smooth and speed tests are low, it’s local network/bandwidth. Our 12-server network is built to avoid peak-hour freezing.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-black-screen": {
    slug: "iptv-black-screen",
    title: "IPTV black screen (audio but no picture)",
    emoji: "⬛",
    keyword: "iptv black screen",
    description:
      "Fix an IPTV black screen where audio plays but there’s no video, or the screen stays black on 4K channels. Change the decoder, player and HDMI settings.",
    answer:
      "A black screen with working audio is almost always a decoder/codec mismatch. Switch the channel’s decoder from Hardware to Software (or vice-versa), or open the stream in an external player like VLC/MX Player. For an all-black screen with no audio, it’s usually a dead stream or wrong input — try another channel first.",
    causes: [
      "HEVC/H.265 codec the current decoder can’t render (audio-only result)",
      "Hardware decoder incompatible with a specific 4K channel",
      "HDMI/HDCP handshake issue on the TV input",
      "Single dead channel (not a device fault)",
      "GPU/driver issue on PC players",
    ],
    solutions: [
      {
        title: "Switch the decoder",
        text: "In the player settings, toggle the decoder between Hardware, Hardware+ and Software for that channel. HEVC black-screens usually clear when you change this.",
      },
      {
        title: "Open in an external player",
        text: "Set the stream to play in VLC (desktop) or MX Player (Android). These handle codecs the built-in player can’t, restoring the picture.",
      },
      {
        title: "Test another channel",
        text: "If other channels show video fine, the black one is a temporary dead stream — skip it and tell us so we can refresh that source.",
      },
      {
        title: "Fix HDMI / input",
        text: "If the whole screen is black (no audio either), reseat the HDMI cable, try another port, and make sure the TV is on the right input. Restart the device.",
      },
      {
        title: "Update the app & device",
        text: "Update the player and the device firmware. Outdated builds sometimes drop video after a codec change on the server side.",
      },
    ],
    faq: [
      {
        q: "Audio works but video is black on 4K only",
        a: "That’s a classic HEVC decoder issue. Switch to Software decoding or an external player for those channels; HD channels using H.264 will keep working on Hardware.",
      },
      {
        q: "Every channel is black — what now?",
        a: "That’s a device/HDMI problem, not the line. Reboot, reseat HDMI, verify the input, and test the same login on a phone to confirm the line is fine.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-channels-not-loading": {
    slug: "iptv-channels-not-loading",
    title: "IPTV channels not loading / empty channel list",
    emoji: "📭",
    keyword: "iptv channels not loading",
    description:
      "Fix an empty IPTV channel list or channels that won’t load. Refresh the playlist, re-sync categories, and check for an expired or wrong-type line.",
    answer:
      "If the app connects but the channel list is empty, force a playlist refresh and re-sync categories. Nine times out of ten it’s a cached load or a Movies/Series tab that didn’t sync — remove and re-add the Xtream login. If the list was there and vanished, your line likely expired.",
    causes: [
      "Cached / incomplete first sync",
      "Only one section (e.g. VOD) failed to load",
      "Expired subscription",
      "Wrong connection type (M3U vs Xtream) for that app",
      "Server maintenance window",
    ],
    solutions: [
      {
        title: "Force-refresh the playlist",
        text: "In your player, pull to refresh or use Settings → Playlists → Refresh. This re-pulls the full category and channel list from our server.",
      },
      {
        title: "Remove and re-add the login",
        text: "Delete the user/playlist and re-add it via Xtream Codes (not bare M3U). This rebuilds Live, Movies and Series categories cleanly.",
      },
      {
        title: "Check the right tab",
        text: "Make sure you’re in Live TV, not an empty custom group. Some apps hide categories you filtered out — reset category filters.",
      },
      {
        title: "Verify your line is active",
        text: "If the list was full and is now empty, the subscription probably expired. Confirm your renewal date with us on WhatsApp.",
      },
      {
        title: "Wait out maintenance",
        text: "Rarely, a brief server maintenance empties the list. Check our status page; it repopulates automatically once done.",
      },
    ],
    faq: [
      {
        q: "Live TV loads but Movies/Series are empty",
        a: "That section failed to sync or isn’t on your plan. Refresh first; if still empty, message us to confirm your plan includes the 120,000-title VOD library.",
      },
      {
        q: "Do I use M3U or Xtream to fix this?",
        a: "Use Xtream Codes login — it loads categories and EPG together and is far more reliable than a plain M3U URL.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-app-crashing": {
    slug: "iptv-app-crashing",
    title: "IPTV app keeps crashing or closing",
    emoji: "💥",
    keyword: "iptv app keeps crashing",
    description:
      "Fix an IPTV player that keeps crashing, freezing on launch or closing to the home screen. Clear cache, free memory, update the app and device.",
    answer:
      "Crashes are usually low memory or a corrupt cache on cheap boxes and Firesticks. Clear the app’s cache and data, close background apps, reboot the device, and update both the player and the firmware. If it crashes only on launch after an update, reinstall the app fresh.",
    causes: [
      "Low RAM / storage full (common on Firestick Lite, cheap boxes)",
      "Corrupt app cache after an update",
      "Outdated player or device firmware",
      "Too many background apps",
      "A specific huge VOD category overloading the app",
    ],
    solutions: [
      {
        title: "Clear cache and data",
        text: "Device Settings → Apps → your IPTV player → Clear cache (then Clear data if needed). You’ll re-enter your login, but this fixes most crash loops.",
      },
      {
        title: "Free up memory",
        text: "Close background apps, and on Firestick uninstall apps you don’t use. Keep at least ~500MB free storage. Reboot the device fully (unplug 30s).",
      },
      {
        title: "Update everything",
        text: "Update the IPTV player from its store and install any pending device/firmware updates. Old builds crash after server-side changes.",
      },
      {
        title: "Reinstall the app",
        text: "If it crashes on launch, uninstall and reinstall the player fresh from the store, then re-add your Xtream login.",
      },
      {
        title: "Avoid the overload trigger",
        text: "If it crashes only when opening a massive VOD category, scroll more slowly or use a player like TiviMate/Smarters that paginates better on weak hardware.",
      },
    ],
    faq: [
      {
        q: "It crashes right after I open a category",
        a: "That category is large and your device is low on RAM. Clear cache, reboot, and switch to a lighter player. A more powerful box (or NVIDIA Shield/Formuler) removes it entirely.",
      },
      {
        q: "Only one app crashes, others are fine",
        a: "Then it’s that app, not your line. Reinstall it, or switch to IPTV Smarters/TiviMate with the same credentials.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-audio-video-out-of-sync": {
    slug: "iptv-audio-video-out-of-sync",
    title: "IPTV audio out of sync with video",
    emoji: "🔉",
    keyword: "iptv audio out of sync",
    description:
      "Fix IPTV audio that lags behind or leads the video. Adjust the audio delay, switch decoder/player, and correct TV audio-processing settings.",
    answer:
      "Audio drift is usually the decoder or the TV’s audio processing, not the stream. Use the player’s audio-delay/sync offset to nudge it back into line, switch between hardware and software decoding, and turn off any ‘audio sync’, Dolby post-processing or Bluetooth speaker (which adds latency).",
    causes: [
      "Decoder mismatch causing gradual drift",
      "TV audio post-processing (Dolby/DTS) adding delay",
      "Bluetooth speakers/headphones (inherent latency)",
      "Underpowered device dropping frames",
      "A single badly-encoded channel",
    ],
    solutions: [
      {
        title: "Use the audio-sync offset",
        text: "Most players (VLC, MX Player, Smarters) have an audio delay control. Nudge it ±100–400ms until lips match. VLC: use the J/K keys or Audio → Audio Track Sync.",
      },
      {
        title: "Switch the decoder",
        text: "Toggle Hardware/Software decoding in the player. Frame-drop drift often disappears when you switch modes.",
      },
      {
        title: "Turn off TV audio processing",
        text: "In TV settings disable Dolby/DTS post-processing and ‘lip-sync/auto’ features, or set audio output to PCM. These add variable delay.",
      },
      {
        title: "Avoid Bluetooth audio",
        text: "Bluetooth speakers/headphones add 100–300ms latency. Use wired/HDMI-ARC audio for perfect sync, or use the app’s offset to compensate.",
      },
      {
        title: "Test another channel",
        text: "If only one channel drifts, it’s that encode. Report it to us; others will be fine.",
      },
    ],
    faq: [
      {
        q: "It slowly drifts further out over time",
        a: "That’s a decoder/frame-drop issue. Switch decoding mode and use a more powerful device; a fixed offset won’t hold if frames keep dropping.",
      },
      {
        q: "Sync is perfect on my phone but off on the TV",
        a: "The TV’s audio processing or a Bluetooth soundbar is the culprit. Disable post-processing or switch to HDMI-ARC/wired audio.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-frozen-playback": {
    slug: "iptv-frozen-playback",
    title: "IPTV freezing / stuttering every few seconds",
    emoji: "🧊",
    keyword: "iptv freezing stuttering",
    description:
      "Fix IPTV that freezes or stutters every few seconds. Diagnose Wi-Fi drops, buffer settings, overheating devices and peak-hour congestion.",
    answer:
      "Regular micro-freezes point to an unstable network or an overheating/underpowered device. Go wired, raise the buffer, set hardware decoding, and make sure the box isn’t overheating. If it only stutters at peak evening hours, it’s ISP congestion — a VPN or a wired connection usually smooths it.",
    causes: [
      "Unstable Wi-Fi with periodic packet loss",
      "Buffer too small for a high-bitrate stream",
      "Device overheating and throttling",
      "Peak-hour ISP congestion / throttling",
      "Weak power supply on a streaming stick",
    ],
    solutions: [
      {
        title: "Stabilise the network",
        text: "Wired Ethernet is the single biggest fix. If on Wi-Fi, use 5GHz, reduce distance/obstacles, and reboot the router. Periodic freezes = periodic packet loss.",
      },
      {
        title: "Increase the buffer",
        text: "In the player, raise the buffer size and enable hardware decoding. A bigger buffer rides through short network dips without freezing.",
      },
      {
        title: "Cool the device",
        text: "Firesticks and cheap boxes throttle when hot (especially behind a TV). Give it airflow or an extension so it isn’t baking against the panel.",
      },
      {
        title: "Check the power supply",
        text: "Use the official power adapter, not the TV’s USB port — under-powered sticks stutter. This is a very common, overlooked cause on Firestick.",
      },
      {
        title: "Test peak vs off-peak",
        text: "If it’s smooth at midday but stutters at 8–11pm, that’s ISP congestion. A VPN can bypass throttling; wired helps too.",
      },
    ],
    faq: [
      {
        q: "It freezes for a second then continues, repeatedly",
        a: "Classic buffer-underrun from network dips. Go wired, raise the buffer, and enable hardware decoding — that combination fixes most cases.",
      },
      {
        q: "Only happens in the evening",
        a: "That’s peak-hour ISP congestion, not the line. Try a VPN or wired connection, and test a lower-bitrate (HD) feed at peak times.",
      },
    ],
    updated: UPDATED,
  },

  "iptv-change-device": {
    slug: "iptv-change-device",
    title: "Move your IPTV subscription to a new device",
    emoji: "🔄",
    keyword: "move iptv subscription to new device",
    description:
      "Move your Best IPTV VIP subscription to a new TV, box or phone. Reuse your Xtream login, handle MAC-locked apps, and avoid connection-limit errors.",
    answer:
      "Your Best IPTV VIP line isn’t tied to one device — install any compatible player on the new device and log in with the same Xtream credentials. The only exception is MAC-locked Smart-TV apps (IBO, Duplex, Sparkle, STB Emu): for those, send us the new device’s MAC so we can register it.",
    causes: [
      "Bought a new TV, box, Firestick or phone",
      "MAC-locked app needs the new MAC registered",
      "Old device still counting against your connection limit",
      "Different app on the new device needs the login re-entered",
    ],
    solutions: [
      {
        title: "Install a player on the new device",
        text: "On the new device install IPTV Smarters Pro, TiviMate or the app that suits it, then log in with the same Server URL, Username and Password you already have. No new subscription needed.",
      },
      {
        title: "For MAC-locked TV apps, send the new MAC",
        text: "IBO Player, Duplex, Sparkle and STB Emulator tie the playlist to a device MAC. Open the app on the new TV, read its MAC, and send it to us on WhatsApp — we re-register it in minutes.",
      },
      {
        title: "Free up a connection",
        text: "If you hit a ‘max connections’ error, stop streaming on the old device or ask us to reset your active connections. Consider a multi-connection plan if you keep both.",
      },
      {
        title: "Re-add EPG & favourites",
        text: "The new app won’t carry your old favourites. Re-add favourites and let the EPG re-sync — it takes a minute on first launch.",
      },
    ],
    faq: [
      {
        q: "Do I have to pay again to switch devices?",
        a: "No. One active line works on any device you install a player on, within your plan’s connection limit. Only MAC-locked apps need the new MAC registered (free).",
      },
      {
        q: "Can I watch on the old and new device at the same time?",
        a: "Only if your plan allows multiple simultaneous connections. Otherwise stop one before starting the other, or upgrade to a multi-connection plan.",
      },
    ],
    updated: UPDATED,
  },
};

export const HELP_ORDER: HelpSlug[] = [
  "iptv-buffering",
  "iptv-not-connecting",
  "iptv-frozen-playback",
  "iptv-black-screen",
  "iptv-channels-not-loading",
  "iptv-app-crashing",
  "iptv-audio-video-out-of-sync",
  "iptv-change-device",
];
