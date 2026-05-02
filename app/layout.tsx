import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://bestiptv-vip.com";

// Use real PNG assets when available; fall back to favicon.ico to avoid 404.
// IMPORTANT: when /og-image.png (1200x630) and /icon-512.png are added to /public,
// update OG_IMAGE_URL and LOGO_URL accordingly.
const LOGO_URL = `${SITE_URL}/favicon.ico`;
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

// Single source of truth for ratings (avoid JSON-LD conflicts).
const RATING = {
  value: "4.9",
  count: "2847",
  best: "5",
  worst: "1",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Best IPTV VIP \u2014 Premium 4K IPTV Subscription Worldwide",
  description:
    "Premium IPTV service with 4K streaming, live sports, movies & 20,000+ channels worldwide. Compatible with Smart TV, Firestick, Android & iOS. 24H free trial.",
  keywords: [
    "best IPTV service",
    "IPTV subscription",
    "premium IPTV",
    "IPTV 4K",
    "IPTV worldwide",
    "IPTV free trial",
    "IPTV for Smart TV",
    "IPTV for Firestick",
    "IPTV for Android",
    "IPTV for iPhone",
    "IPTV streaming service",
    "IPTV channels worldwide",
  ],
  authors: [{ name: "Best IPTV VIP" }],
  creator: "Best IPTV VIP",
  publisher: "Best IPTV VIP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": `${SITE_URL}/?lang=en`,
      "fr-FR": `${SITE_URL}/?lang=fr`,
      "ar":    `${SITE_URL}/?lang=ar`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_AR"],
    url: SITE_URL,
    siteName: "Best IPTV VIP",
    title: "Best IPTV VIP \u2014 Premium 4K IPTV Subscription Worldwide",
    description:
      "Premium IPTV service with 4K streaming, live sports, movies & 20,000+ channels worldwide. 24H free trial available.",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Best IPTV VIP \u2014 Premium IPTV",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best IPTV VIP \u2014 Premium 4K IPTV Subscription",
    description:
      "Premium IPTV streaming for VIP viewers worldwide. 4K HD, all devices, 24H free trial.",
    creator: "@bestiptvvip",
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Best IPTV VIP",
    statusBarStyle: "black-translucent",
  },
  applicationName: "Best IPTV VIP",
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

// ---------------------------------------------------------------
// JSON-LD : Organization + WebSite only.
// Product and FAQPage schemas are emitted ONCE from app/page.tsx
// to avoid duplicate / conflicting structured data.
// ---------------------------------------------------------------
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Best IPTV VIP",
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    "Premium IPTV streaming service with 4K HD channels, live sports, movies and global content.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7307-410512",
    contactType: "customer support",
    availableLanguage: ["English", "French", "Arabic"],
  },
  sameAs: ["https://wa.me/447307410512"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: RATING.value,
    reviewCount: RATING.count,
    bestRating: RATING.best,
    worstRating: RATING.worst,
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Best IPTV VIP",
  url: SITE_URL,
  inLanguage: ["en", "fr", "ar"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ background: "#050507", colorScheme: "dark" }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* hreflang (locale switching is client-side via ?lang=) */}
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/?lang=en`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/?lang=fr`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/?lang=ar`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <meta name="application-name" content="Best IPTV VIP" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Best IPTV VIP" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#050507" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
        <meta name="msapplication-tap-highlight" content="no" />
        {/* Anti-flash : applique le fond noir avant tout paint */}
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
      </head>
      <body style={{ background: "#050507", margin: 0 }}>{children}</body>
    </html>
  );
}
