import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE, LOCALES } from "../lib/site";
import CookieConsent from "../components/CookieConsent";
import TrackingProvider from "../components/TrackingProvider";

const SITE_URL = SITE.domain;
const LOGO_URL = `${SITE_URL}/icon-512.png`;
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

const TITLE = "Best IPTV VIP — #1 Premium 4K IPTV Subscription Worldwide";
const DESCRIPTION =
  "World's #1 premium IPTV service. 22,000+ live channels, 120,000+ movies & series, 4K UHD, EPG included. Compatible with Smart TV, Firestick, Android, iOS, MAG. 24h free trial, instant activation.";

function languageAlternates(path = "/") {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[l] = `${SITE_URL}${path}?lang=${l}`;
  out["x-default"] = `${SITE_URL}${path}`;
  return out;
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Best IPTV VIP",
  },
  description: DESCRIPTION,
  keywords: [
    "best IPTV service 2026",
    "premium IPTV subscription",
    "IPTV 4K UHD",
    "IPTV worldwide",
    "IPTV free trial 24h",
    "IPTV for Smart TV",
    "IPTV for Firestick",
    "IPTV for Android TV",
    "IPTV for iPhone",
    "IPTV for MAG Box",
    "IPTV streaming service",
    "22000 IPTV channels",
    "live sports IPTV",
    "VOD IPTV 120000",
    "IPTV Smarters Pro",
    "TiviMate IPTV Player",
    "IBO Player IPTV",
    "Smart IPTV app",
    "XCIPTV player",
    "GSE Smart IPTV",
    "IPTV reseller VIP",
    "IPTV EPG guide",
    "stable IPTV no buffering",
    "cheap IPTV subscription",
    "buy IPTV subscription",
    "IPTV Premier League",
    "IPTV NBA NFL",
    "IPTV beIN Sports",
    "IPTV Canal+",
    "IPTV Sky Sports",
    "IPTV MBC OSN",
    "best IPTV provider USA UK France",
  ],
  authors: [{ name: SITE.brand, url: SITE_URL }],
  creator: SITE.brand,
  publisher: SITE.brand,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
    languages: languageAlternates("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_AE", "es_ES", "de_DE"],
    url: SITE_URL,
    siteName: SITE.brand,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Best IPTV VIP — Premium 4K IPTV Worldwide",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bestiptvvip",
    creator: "@bestiptvvip",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icon-maskable-512.png",
        color: "#d4af37",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: SITE.brand,
    statusBarStyle: "black-translucent",
  },
  applicationName: SITE.brand,
  category: "entertainment",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "dark",
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: SITE.brand,
  url: SITE_URL,
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
  description:
    "World's #1 premium IPTV streaming service. 22,000+ live channels in 4K UHD, sports, movies, series. Instant WhatsApp activation.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${SITE.whatsapp}`,
    contactType: "customer support",
    availableLanguage: ["English", "French", "Arabic", "Spanish", "German"],
    areaServed: "Worldwide",
  },
  // TODO(entity): only the WhatsApp profile is verified. Re-add Twitter /
  // Facebook / Instagram URLs once those accounts are confirmed live.
  sameAs: [`https://wa.me/${SITE.whatsapp}`],
  foundingDate: "2019",
  // numberOfEmployees and award fields removed — keep only verifiable claims.
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: SITE.brand,
  url: SITE_URL,
  inLanguage: ["en", "fr", "ar", "es", "de"],
  publisher: { "@id": `${SITE_URL}#organization` },
  // SearchAction removed — site has no /search route. Re-add when search ships.
};


const jsonLdProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}#product`,
  name: "Best IPTV VIP — Premium IPTV Subscription",
  description:
    "Premium 4K IPTV with 22,000+ live channels, 120,000+ movies and series. Works on Smart TV, Firestick, Android, iOS, MAG Box, PC, Mac. Activation in under 10 minutes.",
  image: [OG_IMAGE_URL, LOGO_URL],
  brand: { "@type": "Brand", name: SITE.brand, logo: LOGO_URL },
  sku: "BIVIP-PREMIUM",
  mpn: "BIVIP-2026",
  category: "IPTV / Streaming Subscription",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(SITE.ratingValue),
    reviewCount: String(SITE.reviewCount),
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      author: { "@type": "Person", name: "John M." },
      datePublished: "2026-03-14",
      itemReviewed: { "@id": `${SITE_URL}#product` },
      publisher: { "@id": `${SITE_URL}#organization` },
      reviewBody:
        "Setup took 10 minutes. ESPN, NFL and HBO in 4K. Saving $80/month vs cable.",
      name: "Best IPTV I've used",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      author: { "@type": "Person", name: "Fatima A." },
      datePublished: "2026-02-22",
      itemReviewed: { "@id": `${SITE_URL}#product` },
      publisher: { "@id": `${SITE_URL}#organization` },
      reviewBody:
        "All Arabic channels plus international content. MBC, beIN — excellent quality.",
      name: "Excellent Arabic coverage",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      author: { "@type": "Person", name: "Mohammed K." },
      datePublished: "2026-04-05",
      itemReviewed: { "@id": `${SITE_URL}#product` },
      publisher: { "@id": `${SITE_URL}#organization` },
      reviewBody:
        "TiviMate worked instantly. 4K on Firestick, no buffering. Best IPTV in 3 years.",
      name: "No buffering on Firestick",
    },
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "5",
    highPrice: "60",
    offerCount: "4",
    availability: "https://schema.org/InStock",
    url: SITE_URL,
    priceValidUntil: "2026-12-31",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
    { "@type": "ListItem", position: 3, name: "Free Trial", item: `${SITE_URL}/free-trial` },
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which channels are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All major worldwide: ESPN, NBC, BBC, Sky Sports, beIN, Canal+, MBC, Star Plus, ZDF — plus 20,000+ in HD/4K.",
      },
    },
    {
      "@type": "Question",
      name: "Compatible with TiviMate / IPTV Smarters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We support TiviMate, IPTV Smarters Pro, GSE Smart IPTV, IBO Player, XCIPTV. M3U link sent via WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Which devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box, PC/Mac.",
      },
    },
    {
      "@type": "Question",
      name: "How fast is activation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually 5–10 min after WhatsApp order, even on weekends.",
      },
    },
    {
      "@type": "Question",
      name: "Is EPG included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Full Electronic Programme Guide included on all plans.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work in my country?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — worldwide. USA, UK, Canada, Europe, MENA, Asia, LATAM, Africa, Oceania.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Via WhatsApp. We accept PayPal, credit card, crypto, bank transfer.",
      },
    },
    {
      "@type": "Question",
      name: "Sports channels included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Premier League, La Liga, Champions League, NBA, NFL, MLB, UFC, F1.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No contract. Pay once, service expires automatically.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ga4 = SITE.ga4;
  const pixel = SITE.metaPixel;

  return (
    <html lang="en" style={{ background: "#050507", colorScheme: "dark" }}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        {LOCALES.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`${SITE_URL}/?lang=${l}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="" />
        <meta name="theme-color" content="#050507" />
        <meta name="application-name" content={SITE.brand} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE.brand} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#050507" />
        <meta name="msapplication-TileImage" content="/icon-192.png" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html,body{background:#050507;color:#f5f0f5;margin:0;padding:0}" +
              "html{color-scheme:dark}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
      </head>
      <body style={{ background: "#050507", margin: 0 }}>
        <TrackingProvider />
        {children}
        <CookieConsent />
        {ga4 && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
        {pixel && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
