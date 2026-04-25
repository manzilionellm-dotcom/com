"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, type FormEvent } from "react";

const WHATSAPP_LINK =
  "https://wa.me/447307410512?text=Hi%20Best%20IPTV%20VIP%2C%20I%20want%20a%2024H%20free%20trial";

const DEFAULT_MODEL = "openai/gpt-5-nano";

/* ============================================================
   EMBEDDED AI CHAT (Vercel AI Gateway, streaming)
   ============================================================ */
function EmbeddedAIChat() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error } = useChat();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || status === "streaming") return;
    sendMessage({ text }, { body: { modelId: DEFAULT_MODEL } });
    setInput("");
  };

  return (
    <section id="ai-chat" className="relative py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">
            VIP AI Assistant
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
            Ask Anything About Best IPTV VIP
          </h2>
          <p className="mt-6 text-gray-400 text-base md:text-lg">
            Plans, devices, free trial, channels — get instant answers from our AI assistant.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-4 md:p-6">
          <div
            ref={scrollRef}
            className="h-[420px] overflow-y-auto space-y-4 px-2 md:px-4 py-4"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center text-ink-900 font-display font-black text-xl shadow-gold mb-4">
                  AI
                </div>
                <p className="text-gray-300 text-sm md:text-base max-w-md">
                  Hi! I&apos;m your Best IPTV VIP assistant. Try:{" "}
                  <span className="text-gold">&ldquo;What plans do you offer?&rdquo;</span>{" "}
                  or{" "}
                  <span className="text-gold">&ldquo;Does it work on Firestick?&rdquo;</span>
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "btn-gold rounded-br-sm"
                      : "bg-ink-700 border border-gold/15 text-gray-100 rounded-bl-sm"
                  }`}
                >
                  {m.parts.map((p, i) =>
                    p.type === "text" ? <span key={i}>{p.text}</span> : null,
                  )}
                </div>
              </div>
            ))}

            {status === "streaming" && (
              <div className="flex justify-start">
                <div className="bg-ink-700 border border-gold/15 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <span
                      className="w-2 h-2 rounded-full bg-gold animate-pulse"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-gold animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center text-xs text-red-400 px-4 py-2 rounded-lg bg-red-950/30 border border-red-900/40">
                AI temporarily unavailable. Reach us on{" "}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-gold"
                >
                  WhatsApp
                </a>{" "}
                for instant VIP support.
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex gap-3 mt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about plans, devices, free trial…"
              className="flex-1 bg-ink-700 border border-gold/20 rounded-full px-5 py-3 text-sm md:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition"
              disabled={status === "streaming"}
            />
            <button
              type="submit"
              disabled={!input.trim() || status === "streaming"}
              className="btn-gold px-6 py-3 rounded-full text-sm md:text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Powered by Vercel AI Gateway · For instant human VIP support, contact us on{" "}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOMEPAGE
   ============================================================ */
export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ink-900 text-white overflow-hidden">
      {/* ===== NAVBAR ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ink-900/70 border-b border-gold/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group" aria-label="Best IPTV VIP Home">
            <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center font-display font-black text-ink-900 text-lg shadow-gold">
              B
            </div>
            <span className="text-gradient-gold font-display font-bold text-lg md:text-xl tracking-wide">
              BEST IPTV <span className="text-white">VIP</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
            <li><a href="#vip-difference" className="hover:text-gold transition">VIP Difference</a></li>
            <li><a href="#devices" className="hover:text-gold transition">Devices &amp; Apps</a></li>
            <li><a href="#pricing" className="hover:text-gold transition">Pricing</a></li>
            <li><a href="#ai-chat" className="hover:text-gold transition">AI Assistant</a></li>
            <li><a href="#faq" className="hover:text-gold transition">FAQ</a></li>
          </ul>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-gold px-5 py-2.5 rounded-full text-sm tracking-wide"
          >
            Get 24H Free Trial
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden btn-whatsapp px-4 py-2 rounded-full text-xs"
            aria-label="WhatsApp Free Trial"
          >
            Free Trial
          </a>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section id="top" className="relative pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute inset-0 radial-glow pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="live-dot" />
              <span className="text-xs md:text-sm font-medium text-gray-300">
                Limited slots today — VIP servers online
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-5xl">
              <span className="block text-white">Premium IPTV Streaming for</span>
              <span className="shimmer-text block mt-2">VIP Viewers Worldwide</span>
            </h1>

            <p className="mt-6 text-base md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              Watch live TV, sports, movies, and international channels in
              <span className="text-gold font-semibold"> HD, Full HD, and 4K </span>
              on all your devices. Stable servers, fast activation, VIP support.
            </p>

            <ul className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { icon: "🎁", label: "24H Free Trial" },
                { icon: "⚡", label: "Instant Activation" },
                { icon: "🌍", label: "Works Worldwide" },
                { icon: "🎬", label: "4K Streaming" },
              ].map((b) => (
                <li
                  key={b.label}
                  className="glass-card rounded-full px-4 py-2 text-xs md:text-sm font-medium text-gray-200 flex items-center gap-2"
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold tracking-wide animate-pulse-gold"
              >
                Start 24H Free Trial →
              </a>
              <a
                href="#pricing"
                className="btn-outline-gold w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold tracking-wide"
              >
                View VIP Plans
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-4xl">
              {[
                { value: "20,000+", label: "Live Channels" },
                { value: "99.9%", label: "Uptime" },
                { value: "4K UHD", label: "Streaming Quality" },
                { value: "24/7", label: "VIP Support" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass-card glass-card-hover rounded-2xl p-4 md:p-6 text-center"
                >
                  <div className="text-2xl md:text-4xl font-display font-black text-gradient-gold">
                    {s.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIP DIFFERENCE ===== */}
      <section id="vip-difference" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">
              The VIP Difference
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
              Built for Viewers Who Demand the Best
            </h2>
            <p className="mt-6 text-gray-400 text-base md:text-lg">
              We don&apos;t just offer an IPTV subscription. We deliver a private, high-end
              streaming experience engineered for premium viewers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Stable High-Speed Servers", desc: "Tier-1 dedicated servers across 4 continents deliver buffer-free 4K streams 24/7.", icon: "⚡" },
              { title: "Fast Setup", desc: "Activation in minutes. We handle the technical part — you just press play.", icon: "🚀" },
              { title: "VIP Support", desc: "Personal WhatsApp support from real humans. Real answers, fast.", icon: "💎" },
              { title: "Optimized Streaming", desc: "Adaptive bitrate, low latency, and pristine HD/4K image quality on every device.", icon: "🎬" },
            ].map((f) => (
              <article key={f.title} className="glass-card glass-card-hover rounded-2xl p-6 md:p-8 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== GLOBAL COVERAGE ===== */}
      <section id="global-coverage" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">Global Coverage</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">IPTV Channels Worldwide</h2>
            <p className="mt-6 text-gray-400 text-base md:text-lg">
              From American sports to European football, Bollywood films to Arabic series —
              your entire world of entertainment in one premium IPTV subscription.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { region: "USA", desc: "ESPN, NBA, NFL, MLB, premium movie networks", flag: "🇺🇸" },
              { region: "UK", desc: "Sky Sports, BT Sport, BBC, ITV, Premier League", flag: "🇬🇧" },
              { region: "Canada", desc: "TSN, Sportsnet, CBC, French &amp; English channels", flag: "🇨🇦" },
              { region: "Europe", desc: "DAZN, beIN, Bundesliga, La Liga, Serie A", flag: "🇪🇺" },
              { region: "Africa", desc: "SuperSport, regional news, music, films", flag: "🌍" },
              { region: "Asia", desc: "Bollywood, K-drama, anime, regional networks", flag: "🌏" },
              { region: "Middle East", desc: "MBC, OSN, beIN Arabic, Quran channels", flag: "🕌" },
              { region: "Latin America", desc: "Liga MX, Copa Libertadores, Telemundo", flag: "🌎" },
            ].map((r) => (
              <article key={r.region} className="glass-card glass-card-hover rounded-2xl p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{r.flag}</span>
                  <h3 className="font-display font-bold text-lg text-gold">{r.region}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: r.desc }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== DEVICES + APPS ===== */}
      <section id="devices" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">Devices &amp; Apps</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
              Works with the Most Popular IPTV Apps
            </h2>
            <p className="mt-6 text-gray-400 text-base md:text-lg">
              Use our service with the IPTV player you already love. Compatible with all major
              IPTV applications and every modern streaming device.
            </p>
            <p className="mt-3 text-xs text-gray-500 italic">
              Apps mentioned below are independent third-party players. We are not affiliated
              with or endorsed by their developers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16">
            {[
              { name: "IPTV Smarters Pro", desc: "Most popular cross-platform IPTV player." },
              { name: "TiviMate", desc: "Premium experience for Android TV &amp; Firestick." },
              { name: "IBO Player", desc: "Lightweight player for Smart TVs &amp; boxes." },
              { name: "Smart IPTV", desc: "Native app for Samsung &amp; LG Smart TVs." },
              { name: "XCIPTV", desc: "Customizable Android-based IPTV player." },
            ].map((app) => (
              <article key={app.name} className="glass-card glass-card-hover rounded-2xl p-5 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold-gradient flex items-center justify-center text-ink-900 font-display font-black text-xl shadow-gold">
                  {app.name.charAt(0)}
                </div>
                <h3 className="font-bold text-white text-sm md:text-base mb-2">{app.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: app.desc }} />
              </article>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { device: "Smart TV", desc: "Samsung, LG, Sony, Hisense, TCL, Philips", icon: "📺" },
              { device: "Firestick", desc: "Amazon Fire TV Stick, Fire TV Cube", icon: "🔥" },
              { device: "Android / iOS", desc: "Phones, tablets, Android TV boxes", icon: "📱" },
              { device: "PC / Mac", desc: "Windows, macOS, browsers, MAG boxes", icon: "💻" },
            ].map((d) => (
              <article key={d.device} className="glass-card glass-card-hover rounded-2xl p-6 text-center">
                <div className="text-5xl mb-4">{d.icon}</div>
                <h3 className="font-display font-bold text-lg text-gold mb-2">{d.device}</h3>
                <p className="text-xs text-gray-400">{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== CONTENT SECTION ===== */}
      <section id="content" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">Endless Entertainment</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
              Everything You Want to Watch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Live Sports", desc: "Football, Premier League, Champions League, NBA, NFL, UFC, Formula 1, tennis, boxing and more — in real time.", icon: "⚽" },
              { title: "Movies On Demand", desc: "Thousands of premium films across every genre — from Hollywood blockbusters to international cinema, in HD and 4K.", icon: "🎬" },
              { title: "TV Series", desc: "Complete seasons of trending series, documentaries and award-winning shows updated regularly.", icon: "🎞️" },
              { title: "International Channels", desc: "Channels from over 80 countries: news, music, kids, lifestyle, religious — all in one subscription.", icon: "🌐" },
            ].map((c) => (
              <article key={c.title} className="glass-card glass-card-hover rounded-2xl p-6 md:p-8">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-display font-bold text-xl text-gold mb-3">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== PRICING ===== */}
      <section id="pricing" className="relative py-20 md:py-32">
        <div className="absolute inset-0 radial-glow pointer-events-none opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">VIP Plans</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
              Choose Your VIP Subscription
            </h2>
            <p className="mt-6 text-gray-400 text-base md:text-lg">
              Premium IPTV at honest prices. Cancel anytime. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "1 Month", price: "14.99", period: "month", badge: null, cta: "Start 1 Month",
                features: [
                  "20,000+ live channels", "Movies &amp; Series VOD", "4K / Full HD streaming",
                  "EPG (electronic program guide)", "Fast activation", "WhatsApp VIP support",
                  "Multi-device compatibility", "Anti-buffer technology",
                ],
              },
              {
                name: "6 Months", price: "59.99", period: "6 months", badge: "BEST VALUE", cta: "Start 6 Months",
                features: [
                  "Everything in 1 Month", "20,000+ live channels", "4K UHD priority servers",
                  "EPG &amp; catch-up", "Instant activation", "Priority WhatsApp support",
                  "Premium sports packages", "Save 33% vs monthly",
                ],
                highlighted: true,
              },
              {
                name: "12 Months", price: "99.99", period: "year", badge: "ELITE", cta: "Start Elite Plan",
                features: [
                  "Everything in 6 Months", "Elite-tier dedicated servers", "Highest 4K UHD bitrate",
                  "Full EPG, catch-up &amp; replay", "Instant priority activation", "VIP concierge WhatsApp",
                  "All premium sports packages", "Save 44% vs monthly",
                ],
              },
            ].map((plan) => (
              <article
                key={plan.name}
                className={`relative rounded-3xl p-8 md:p-10 transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-ink-700 to-ink-800 border-2 border-gold shadow-gold-lg scale-100 md:scale-105"
                    : "glass-card glass-card-hover"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gold-gradient text-ink-900 text-xs font-black tracking-widest shadow-gold">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-display font-bold text-2xl text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gold text-2xl font-bold">$</span>
                  <span className="font-display font-black text-5xl md:text-6xl text-gradient-gold">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-1">/ {plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center w-full py-4 rounded-full font-bold tracking-wide transition ${
                    plan.highlighted ? "btn-gold" : "btn-outline-gold"
                  }`}
                >
                  {plan.cta} →
                </a>
              </article>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-10">
            Secure orders processed via WhatsApp. No long-term commitment.
          </p>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">How It Works</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
              Streaming in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Request Free Trial", desc: "Click the WhatsApp button. Send us a message — no signup, no payment required." },
              { step: "02", title: "Receive Setup", desc: "Get your personalized credentials and an easy step-by-step setup for your device." },
              { step: "03", title: "Watch Instantly", desc: "Open your IPTV player, log in, and enjoy 4K streaming in minutes — anywhere in the world." },
            ].map((s) => (
              <article key={s.step} className="relative glass-card glass-card-hover rounded-2xl p-8 text-center">
                <div className="text-7xl font-display font-black text-gradient-gold opacity-90 mb-4">{s.step}</div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Get Free Trial on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== TRUST SECTION ===== */}
      <section id="trust" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">Why Trust Us</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
              A Premium Experience You Can Rely On
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔒", title: "Secure Experience", desc: "Encrypted connections and discreet WhatsApp ordering." },
              { icon: "📅", title: "No Long-Term Commitment", desc: "Pick any plan. Cancel any time. No surprises." },
              { icon: "💬", title: "Real Support Included", desc: "Human VIP support every day on WhatsApp." },
              { icon: "🚀", title: "Optimized Servers", desc: "Tier-1 hardware tuned for low latency and 4K." },
            ].map((t) => (
              <article key={t.title} className="glass-card glass-card-hover rounded-2xl p-6 text-center">
                <div className="text-5xl mb-4">{t.icon}</div>
                <h3 className="font-display font-bold text-lg text-gold mb-2">{t.title}</h3>
                <p className="text-sm text-gray-400">{t.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="live-dot" />
                <div>
                  <p className="font-bold text-white">Live System Status</p>
                  <p className="text-xs text-gray-400">Updated in real time</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div><p className="text-gold font-display font-bold text-lg">Online</p><p className="text-xs text-gray-400">Servers</p></div>
                <div><p className="text-gold font-display font-bold text-lg">Fast</p><p className="text-xs text-gray-400">Activation</p></div>
                <div><p className="text-gold font-display font-bold text-lg">Active</p><p className="text-xs text-gray-400">VIP Support</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== EMBEDDED AI CHAT ===== */}
      <EmbeddedAIChat />

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== FAQ ===== */}
      <section id="faq" className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold uppercase text-xs md:text-sm tracking-[0.3em] font-semibold mb-4">FAQ</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-gradient-luxe">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "What is Best IPTV VIP and how does it work?", a: "Best IPTV VIP is a premium IPTV streaming service that delivers 20,000+ live channels, on-demand movies, series, and international content in HD, Full HD, and 4K. After activation, you simply log in to your favorite IPTV player and start watching." },
              { q: "Do you offer a free trial?", a: "Yes. We offer a 24-hour IPTV free trial so you can test the channel quality, server stability, and 4K streaming before subscribing. Just message us on WhatsApp." },
              { q: "Which IPTV apps are compatible with your service?", a: "Our service is compatible with all major IPTV applications including IPTV Smarters Pro, TiviMate IPTV Player, IBO Player IPTV, Smart IPTV app, and XCIPTV player. These apps are independent third-party players we are compatible with — not partners or affiliates." },
              { q: "Which devices can I use for IPTV streaming?", a: "You can use Smart TVs (Samsung, LG, Sony, Hisense, TCL), Amazon Firestick / Fire TV, Android TV boxes, Android phones &amp; tablets, iPhone &amp; iPad, Windows PC, Mac, MAG boxes, and most modern streaming hardware." },
              { q: "How fast is activation after I order?", a: "Activation is typically completed within 5 to 30 minutes. For most orders placed during business hours, our VIP support team activates your subscription almost instantly via WhatsApp." },
              { q: "Is the IPTV stream really in 4K?", a: "Yes. Where the original broadcaster provides 4K UHD feeds, we deliver them in true 4K. Other channels are streamed in Full HD or HD with optimized bitrate for smooth playback." },
              { q: "Will it work in my country?", a: "Yes. Our IPTV service works worldwide — USA, UK, Canada, Europe, Africa, Asia, the Middle East, and Latin America. As long as you have a stable internet connection (10 Mbps+ recommended for HD, 25 Mbps+ for 4K), you can stream." },
              { q: "Do I need a VPN to use IPTV?", a: "A VPN is not required to use our service. Some users prefer to use one for general privacy, but it is entirely optional and depends on your personal preference." },
              { q: "Can I use the same subscription on multiple devices?", a: "Each subscription includes multi-device compatibility so you can install it on your Smart TV, phone, and tablet. Concurrent streams depend on your selected plan — our team will guide you on WhatsApp." },
              { q: "What internet speed do I need for IPTV streaming?", a: "We recommend at least 10 Mbps for HD streaming, 20 Mbps for Full HD, and 25 Mbps or more for smooth 4K UHD playback without buffering." },
              { q: "How do I pay and is it safe?", a: "All orders are processed securely through WhatsApp. We accept the most popular international payment methods. No long-term commitment required — pay only for the plan you choose." },
              { q: "What happens if I have an issue with my IPTV service?", a: "Our VIP support team is available daily through WhatsApp to fix any issue, replace your line if needed, or guide you step by step. Real humans, real fast answers." },
              { q: "Are sports channels included in the IPTV subscription?", a: "Yes. All plans include premium live sports — football, Premier League, La Liga, Champions League, NBA, NFL, MLB, UFC, Formula 1, tennis, boxing, and more." },
              { q: "Can I cancel my IPTV subscription anytime?", a: "Yes. There is no long-term commitment. You can stop, switch, or upgrade your plan at any time without penalties." },
            ].map((item, i) => (
              <details key={i} className="group glass-card glass-card-hover rounded-2xl p-6 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="font-display font-bold text-base md:text-lg text-white pr-2">{item.q}</h3>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold transition-transform group-open:rotate-45 text-xl font-light">+</span>
                </summary>
                <p className="mt-4 text-sm md:text-base text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ===== FINAL CTA ===== */}
      <section id="trial" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-8">
            <span className="live-dot" />
            <span className="text-xs md:text-sm font-medium text-gray-300">
              Limited slots today — VIP servers online
            </span>
          </div>

          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight">
            <span className="block text-white">Your VIP Streaming</span>
            <span className="shimmer-text block mt-2">Access Starts Today</span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-300">
            Join thousands of premium viewers worldwide. Test our service free for 24 hours —
            no signup, no payment, no risk.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full sm:w-auto px-10 py-5 rounded-full text-lg font-bold tracking-wide animate-pulse-gold"
            >
              Claim Your 24H Free Trial →
            </a>
            <a
              href="#pricing"
              className="btn-outline-gold w-full sm:w-auto px-10 py-5 rounded-full text-lg font-semibold tracking-wide"
            >
              See VIP Plans
            </a>
          </div>

          <p className="mt-8 text-xs text-gray-500">
            By messaging us you agree to receive setup instructions on WhatsApp.
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-gold/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center font-display font-black text-ink-900 text-lg">B</div>
                <span className="text-gradient-gold font-display font-bold text-xl tracking-wide">
                  BEST IPTV <span className="text-white">VIP</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                Premium IPTV streaming for VIP viewers worldwide. 20,000+ live channels,
                4K UHD quality, multi-device compatibility, and personal WhatsApp support.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 btn-whatsapp px-5 py-3 rounded-full text-sm font-bold"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                </svg>
                WhatsApp Support
              </a>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#pricing" className="hover:text-gold transition">Pricing</a></li>
                <li><a href="#trial" className="hover:text-gold transition">Free Trial</a></li>
                <li><a href="#devices" className="hover:text-gold transition">Devices &amp; Apps</a></li>
                <li><a href="#how-it-works" className="hover:text-gold transition">How It Works</a></li>
                <li><a href="#ai-chat" className="hover:text-gold transition">AI Assistant</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Information</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#vip-difference" className="hover:text-gold transition">VIP Difference</a></li>
                <li><a href="#global-coverage" className="hover:text-gold transition">Global Coverage</a></li>
                <li><a href="#faq" className="hover:text-gold transition">FAQ</a></li>
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Best IPTV VIP. All rights reserved.</p>
            <p className="text-center md:text-right max-w-2xl">
              Best IPTV VIP is an independent IPTV streaming service. App names mentioned
              (IPTV Smarters Pro, TiviMate, IBO Player, Smart IPTV, XCIPTV) are trademarks
              of their respective owners and are referenced only as compatible third-party
              players. No partnership or endorsement is implied.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE WHATSAPP BUTTON ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-ink-900 via-ink-900/95 to-transparent pt-6 pb-4 px-4"
        aria-label="Get free trial on WhatsApp"
      >
        <div className="btn-whatsapp w-full py-4 rounded-full text-center text-sm font-bold flex items-center justify-center gap-2 shadow-2xl">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
          </svg>
          Get 24H Free Trial Now
        </div>
      </a>

      {/* ===== FLOATING WHATSAPP CHAT BUTTON (DESKTOP) ===== */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full btn-whatsapp items-center justify-center shadow-2xl animate-pulse-gold"
        aria-label="Chat with Best IPTV VIP on WhatsApp"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold border-2 border-ink-900 animate-pulse" />
      </a>
    </main>
  );
}
