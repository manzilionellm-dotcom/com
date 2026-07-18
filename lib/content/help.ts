import type { HelpSlug, DeviceSlug } from "../site";

export type HelpArticle = {
  slug: HelpSlug;
  title: string;
  emoji: string;
  description: string;
  /** Answer-first: the fastest fix in 1–2 sentences (also feeds GEO/LLM snippets). */
  answer: string;
  /** Most likely root causes, ordered by probability. */
  causes: string[];
  /** Step-by-step solution. */
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  funnelDevice: DeviceSlug;
  updated: string;
};

export const HELP_ARTICLES: Record<HelpSlug, HelpArticle> = {
  "cant-connect": {
    slug: "cant-connect",
    title: "IPTV won't connect / login failed",
    emoji: "🔌",
    description:
      "Fix 'authorization failed', 'invalid credentials' and connection errors on IPTV Smarters, TiviMate and XCIPTV. Answer-first checklist plus a direct line to support.",
    answer:
      "90% of connection failures are a mistyped server URL, a missing port number, or a login copied with a trailing space. Re-enter the server URL (with http:// and the port), username and password exactly as sent, with no spaces. If it still fails, your line may just need re-activating — message us and we'll confirm it in minutes.",
    causes: [
      "Server URL missing http:// or the port number (e.g. :8080 or :80)",
      "A trailing space when the login was pasted from WhatsApp",
      "Wrong login method chosen (M3U vs Xtream Codes)",
      "Subscription expired or not yet activated",
      "Router/ISP blocking the IPTV server (DNS or geo-block)",
    ],
    steps: [
      { title: "Re-type the credentials carefully", text: "Delete the playlist and re-add it. Type the server URL including http:// and the port, then the username and password. Do not add spaces; logins are case-sensitive." },
      { title: "Use Xtream Codes, not M3U", text: "Choose 'Login with Xtream Codes API'. It's more reliable than a plain M3U link and also pulls in the EPG and VOD." },
      { title: "Test your internet", text: "Open any website or run fast.com. If the internet itself is down or on captive Wi-Fi (hotel/office), the portal can't be reached." },
      { title: "Change your DNS", text: "Set your device or router DNS to 8.8.8.8 / 1.1.1.1. Some ISPs block IPTV servers at the DNS level; this often fixes an instant 'can't connect'." },
      { title: "Confirm the line is active", text: "If everything is correct and it still fails, the subscription may have lapsed or not been provisioned. Send us your username on WhatsApp and we'll re-activate it fast." },
    ],
    faq: [
      { q: "What does 'Authorization failed' mean?", a: "The server rejected the username/password. Re-type them (watch for a trailing space), confirm the port is in the URL, and if correct, ask us to re-check the line." },
      { q: "It worked yesterday and now won't connect", a: "Usually a renewal is due or your ISP changed routing. Try a different DNS first; if that fails, message us — a lapsed line is fixed in minutes." },
      { q: "Do I need a VPN to connect?", a: "Not usually. But if your ISP blocks IPTV, a VPN or a DNS change restores access. We can advise the quickest option for your country." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-16",
  },

  "playback-stops": {
    slug: "playback-stops",
    title: "Stream keeps stopping or freezing",
    emoji: "⏸️",
    description:
      "Your IPTV plays for a while then freezes or drops back to the menu? Answer-first fixes for decoder, buffer and Wi-Fi issues on Firestick, Android and Smart TV.",
    answer:
      "A stream that plays then stops is almost always a decoder or Wi-Fi issue, not the subscription. Switch the player's decoder to Hardware+, raise the buffer, and move to 5 GHz Wi-Fi or Ethernet. If only one channel drops, it's a server node we can rebalance for you.",
    causes: [
      "Software decoder struggling with HEVC/4K (needs Hardware+)",
      "Buffer too small for your connection",
      "Weak 2.4 GHz Wi-Fi or an overloaded router",
      "Device (especially older Firestick) low on memory",
      "A single overloaded channel node",
    ],
    steps: [
      { title: "Switch to hardware decoding", text: "In TiviMate/Smarters/XCIPTV set the decoder to Hardware or Hardware+. Software decoding drops frames on 4K/HEVC and causes the freeze-then-stop pattern." },
      { title: "Increase the buffer", text: "Raise the player buffer to ~2000–3000 ms. This adds a second of start delay but keeps playback smooth through small network dips." },
      { title: "Fix the Wi-Fi", text: "Use 5 GHz Wi-Fi or, ideally, an Ethernet adapter. 2.4 GHz tops out around 20 Mbps real-world — not enough for reliable 4K." },
      { title: "Reboot the device weekly", text: "Firesticks and cheap Android boxes leak memory. A weekly restart (and clearing the app cache) prevents mid-stream stops." },
      { title: "Report a specific channel", text: "If it's always the same channel, that's on us — send the channel name on WhatsApp and we'll move it to a healthier node." },
    ],
    faq: [
      { q: "It only stops during live sports at peak time", a: "Peak-hour load. Hardware+ decoding and a bigger buffer help, and we run anti-freeze load balancing — tell us the exact channel and kickoff time so we can pre-scale it." },
      { q: "Everything stops at once every few minutes", a: "That points to Wi-Fi or router, not the stream. Switch to Ethernet or 5 GHz and reboot the router; the pattern usually disappears." },
      { q: "Does clearing cache delete my login?", a: "No — clear cache is safe and keeps your playlist. Only 'clear data' would remove your login." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-15",
  },

  buffering: {
    slug: "buffering",
    title: "Stop IPTV buffering for good",
    emoji: "🔄",
    description:
      "The definitive fix list for IPTV buffering and lag in 2026 — internet speed, DNS, decoder, buffer size and server load. Answer-first, ranked by impact.",
    answer:
      "Most buffering is bandwidth or decoder-related, and fixable in minutes. Confirm 25+ Mbps on 5 GHz Wi-Fi or Ethernet, set the player to Hardware+ decoding, and change your DNS to 1.1.1.1. If a single channel buffers while others are fine, that's server-side and we'll rebalance it.",
    causes: [
      "Less than 25 Mbps, or weak 2.4 GHz Wi-Fi",
      "Software decoder instead of Hardware+",
      "ISP throttling IPTV traffic (fixed by DNS/VPN)",
      "Router needs a reboot / too many devices",
      "One overloaded channel node",
    ],
    steps: [
      { title: "Test your speed", text: "Run fast.com on the device itself. You need 15+ Mbps for HD and 25+ Mbps for 4K. Below that, no player setting will stop the buffering — upgrade the connection or drop to an HD channel." },
      { title: "Go wired or 5 GHz", text: "Ethernet is best. If Wi-Fi only, use the 5 GHz band and sit near the router. 2.4 GHz is the single biggest cause of buffering." },
      { title: "Set Hardware+ decoding", text: "In your player, set the decoder to Hardware+ so the chip handles HEVC/H.265 instead of the CPU." },
      { title: "Change DNS to beat throttling", text: "Set DNS to 1.1.1.1 or 8.8.8.8 on the device or router. Many ISPs quietly throttle IPTV; a neutral DNS (or a VPN) restores full speed." },
      { title: "Raise the buffer and reboot the router", text: "Bump the player buffer to ~2500 ms and power-cycle your router. Then retest a 4K channel." },
    ],
    faq: [
      { q: "My internet is fast but IPTV still buffers", a: "Then it's usually the decoder (set Hardware+), 2.4 GHz Wi-Fi, or ISP throttling (change DNS / try a VPN). Work through those three in order." },
      { q: "Only 4K channels buffer, HD is fine", a: "Your connection or device can't sustain 4K. Use Ethernet, enable Hardware+, or watch the FHD version of that channel — we carry both for most sports." },
      { q: "One channel buffers, the rest are perfect", a: "That's a server node, not your setup. Send us the channel name and we'll move it — you shouldn't have to troubleshoot our side." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-17",
  },

  "black-screen": {
    slug: "black-screen",
    title: "Black screen (with or without sound)",
    emoji: "⬛",
    description:
      "IPTV shows a black screen but audio still plays, or nothing at all? Answer-first fixes for decoder mismatch, external player and HDCP/HDMI issues.",
    answer:
      "A black screen with sound is a video-decoder mismatch: switch that channel to the VLC or MX external player, or toggle Hardware/Software decoding. A black screen with no sound at all is usually HDMI/HDCP or the channel being temporarily offline — reseat the HDMI cable and try another channel.",
    causes: [
      "Video codec the built-in player can't decode (black + sound)",
      "Wrong decoder mode for that stream",
      "HDMI/HDCP handshake issue (black + no sound)",
      "Channel temporarily offline on the source",
      "Smart TV app needs a full restart",
    ],
    steps: [
      { title: "If there's sound: switch player", text: "In IPTV Smarters/XCIPTV set that channel to the VLC or MX external player, or flip the decoder between Hardware and Software. Black-with-sound is a decoder problem, not a subscription one." },
      { title: "Try another channel", text: "Open a different channel. If that one plays, the first channel's source was briefly down — send us its name so we can check the feed." },
      { title: "If no sound at all: check HDMI", text: "Reseat the HDMI cable, try a different HDMI port, and avoid HDMI switches/soundbars in between — HDCP handshakes cause a dead black screen on some TVs." },
      { title: "Restart the app fully", text: "On Samsung/LG, close the IPTV app completely (not just back out) and reopen. On Firestick, force-stop the app in settings and relaunch." },
      { title: "Update the app", text: "An outdated player can black-screen on newer streams. Update TiviMate/Smarters/IBO to the latest version." },
    ],
    faq: [
      { q: "Black screen but I can hear the channel", a: "Classic decoder mismatch. Switch to the external VLC/MX player or change Hardware/Software decoding for that channel — it'll appear instantly." },
      { q: "All channels are black with no sound", a: "That's HDMI/display, not IPTV. Reseat the cable, change port, remove any HDMI switch, and restart the device." },
      { q: "Only adult/4K channels black out", a: "Some 4K HEVC feeds need Hardware+ decoding or a stronger device. Enable Hardware+; if the device is old, use the FHD version." },
    ],
    funnelDevice: "smart-tv",
    updated: "2026-07-13",
  },

  "network-error": {
    slug: "network-error",
    title: "Network error / connection timed out",
    emoji: "🌐",
    description:
      "'Network error', 'connection timed out' or 'no internet' on your IPTV app? Answer-first fixes for DNS, router and ISP blocking on Firestick and Android.",
    answer:
      "A network error means the app can't reach the server. Confirm the internet works on another app, then change your DNS to 1.1.1.1 / 8.8.8.8 and reboot the router — that clears most 'timed out' errors, which are usually ISP-level blocking rather than a subscription fault.",
    causes: [
      "General internet outage or captive Wi-Fi (hotel/office)",
      "ISP blocking the IPTV server (very common)",
      "Router needs a reboot / DNS cache stale",
      "Device date/time wrong (breaks secure connections)",
      "Server maintenance window",
    ],
    steps: [
      { title: "Confirm the internet works", text: "Open YouTube or a website on the same device. If nothing loads, it's your connection — reconnect Wi-Fi or accept the captive-portal terms on public networks." },
      { title: "Change DNS", text: "Set DNS to 1.1.1.1 and 8.8.8.8 (device network settings, or on the router for whole-home effect). This is the single most effective fix for IPTV network errors caused by ISP blocking." },
      { title: "Reboot the router and device", text: "Power-cycle the router for 30 seconds, then restart the Firestick/box. This clears stale DNS and a jammed connection." },
      { title: "Check the device date & time", text: "Set date/time to automatic. A wrong clock breaks the secure handshake and produces a 'network error' that looks like a server fault." },
      { title: "Still failing? Check status", text: "See our network status page or message us — if we're in a short maintenance window we'll tell you the ETA immediately." },
    ],
    faq: [
      { q: "Why does changing DNS fix a network error?", a: "Many ISPs block IPTV servers at the DNS level. A neutral resolver like 1.1.1.1 bypasses that block, so the app can reach the server again." },
      { q: "It errors only on my home Wi-Fi, not on mobile data", a: "Classic ISP block. Change your router DNS to 1.1.1.1, or use a VPN on the home network. Mobile data working proves your login is fine." },
      { q: "Do I need to reinstall the app?", a: "Rarely. Network errors are connection-side. Try DNS and a reboot first; reinstalling won't fix an ISP block." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-12",
  },

  "update-app": {
    slug: "update-app",
    title: "Update your IPTV app the right way",
    emoji: "⬆️",
    description:
      "How to update TiviMate, IPTV Smarters, XCIPTV, IBO and STB Emulator without losing your playlist — on Firestick, Android and Smart TV.",
    answer:
      "Updating fixes most 'app out of date' and playback bugs and does not delete your login. On Android/Firestick update via the store or by sideloading the new APK over the old one; on Samsung/LG update from the TV app store. Your playlist stays intact — only 'clear data' would remove it.",
    causes: [
      "Old app version incompatible with new streams",
      "'App out of date' warning blocking playback",
      "New features/decoder fixes only in the latest build",
    ],
    steps: [
      { title: "Android TV / phone", text: "Open the Play Store → My apps → Update, or search the app and tap Update. Updating over the top keeps all playlists and settings." },
      { title: "Firestick / Fire TV", text: "For Appstore apps: Settings → Applications → check for updates. For sideloaded apps (TiviMate/STBEmu via Downloader): re-download the latest APK and install over the existing app — your login is preserved." },
      { title: "Samsung / LG Smart TV", text: "Open the TV's app store, find IBO Player Pro / Duplex / Sparkle, and choose Update. Playlists are stored on the provider portal, so nothing is lost." },
      { title: "Verify after updating", text: "Reopen the app; your channels should load immediately. If a stream still misbehaves, clear cache (not data) once." },
      { title: "Turn on auto-update", text: "In the Play Store enable auto-update for the app so you stay on the newest, most stable build." },
    ],
    faq: [
      { q: "Will updating delete my playlist or login?", a: "No. Updating over the top keeps everything. Only 'clear data' or a full uninstall/reinstall removes your login — and even then it's a 30-second re-entry." },
      { q: "How do I update a sideloaded app on Firestick?", a: "Use Downloader to fetch the newest APK and install it over the current app. It upgrades in place and keeps your settings." },
      { q: "The store shows no update but the app says it's outdated", a: "Sideload the latest APK, or ask us for the current version link on WhatsApp. Some players ship updates outside the Amazon store." },
    ],
    funnelDevice: "android",
    updated: "2026-07-11",
  },

  "change-device": {
    slug: "change-device",
    title: "Move IPTV to a new device or a second screen",
    emoji: "🔁",
    description:
      "Got a new Firestick, TV or phone? How to move your Best IPTV VIP subscription to a new device, or add a second screen, in a few minutes.",
    answer:
      "Your subscription is not locked to one device — it's tied to your login (or a registered MAC). Install the player on the new device and enter the same Xtream Codes details to move it. To watch on a second screen at the same time, you just need enough simultaneous connections on your plan.",
    causes: [
      "New Firestick/TV/phone replacing an old one",
      "Wanting a second simultaneous screen",
      "Switching from an Xtream Codes app to a MAC-portal app (or vice-versa)",
    ],
    steps: [
      { title: "Install the player on the new device", text: "Pick the right app: TiviMate/Smarters/XCIPTV on Android/Firestick, IBO/Duplex on Samsung/LG, Smarters on iPhone." },
      { title: "Enter the same Xtream Codes login", text: "Use the identical server URL, username and password. The line moves with the login — no need to buy anything again." },
      { title: "For MAC-portal apps, send us the new MAC", text: "If the new device uses a portal (MAG, STB Emulator, IBO/Duplex), the MAC changes — send us the new MAC on WhatsApp and we'll register it." },
      { title: "Retire the old device (optional)", text: "You can leave the old device logged in, but if you want the connection freed for another screen, just stop using it or tell us." },
      { title: "Need a second simultaneous screen?", text: "Message us to add connections to your plan. Then both screens can stream different channels at once." },
    ],
    faq: [
      { q: "Do I have to pay again to change device?", a: "No. Moving to a new device is free — the subscription follows your login. You only pay more if you want additional simultaneous screens." },
      { q: "How many devices can I use?", a: "You can install the app on as many devices as you like; you can stream on as many at once as your plan's connection count allows. Ask us to increase it anytime." },
      { q: "I switched to a Smart TV app and it needs a MAC", a: "Portal apps (IBO/Duplex/MAG) use a MAC instead of a login. Send us the new MAC and we'll link your line to it." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-10",
  },

  "account-recovery": {
    slug: "account-recovery",
    title: "Recover your account or lost login",
    emoji: "🔑",
    description:
      "Lost your Xtream Codes login, subscription expired, or app forgotten the details? How to recover your Best IPTV VIP account quickly via WhatsApp.",
    answer:
      "Your login lives in your WhatsApp confirmation and on our system — it's recoverable in minutes. Search your WhatsApp chat for the server URL, or message us with the name/email/phone you signed up with and we'll re-send your credentials and confirm your subscription status.",
    causes: [
      "Playlist deleted or app reinstalled without noting the login",
      "Subscription expired and needs renewing",
      "New phone without the old WhatsApp history",
      "Forgotten which server URL/username was used",
    ],
    steps: [
      { title: "Search your WhatsApp chat", text: "Open the chat with us and search for 'http' or 'username' — your original credentials are in the activation message we sent." },
      { title: "Check the app if it still opens", text: "In IPTV Smarters/TiviMate, the playlist settings often still show the server URL and username even if you forgot them." },
      { title: "Message us to re-issue", text: "Send the name, email or phone number you used to sign up. We'll match your account and re-send the server URL, username and password." },
      { title: "Renew if expired", text: "If the line lapsed, we'll tell you and reactivate the moment you renew — your channel list and settings come straight back." },
      { title: "Save it safely this time", text: "Store your login in a notes app or password manager so a reinstall never locks you out again." },
    ],
    faq: [
      { q: "I lost my phone and the WhatsApp history", a: "No problem — tell us the name/email/phone you registered with and we'll verify and re-send your credentials to your new number." },
      { q: "How do I know if my subscription is still active?", a: "Message us your username and we'll tell you the exact expiry date. If it's lapsed, reactivation is instant on renewal." },
      { q: "Can you reset my password?", a: "Yes — we can re-issue your Xtream Codes login. Just confirm your identity with the signup details and we'll sort it in minutes." },
    ],
    funnelDevice: "firestick",
    updated: "2026-07-09",
  },
};
