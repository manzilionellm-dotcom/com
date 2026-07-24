import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "../lib/site";
import CookieConsent from "../components/CookieConsent";
import ConsentedAnalytics from "../components/ConsentedAnalytics";
import TrackingProvider from "../components/TrackingProvider";

const SITE_URL = SITE.domain;
const LOGO_URL = `${SITE_URL}/icon-512.png`;
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

const TITLE = "Best IPTV VIP — Premium 4K IPTV Subscription Worldwide";
const DESCRIPTION =
  "Premium IPTV service with 22,000+ live channels, 120,000+ movies & series, 4K UHD and EPG. Works on Smart TV, Firestick, Android, iOS and MAG. 24h free trial.";

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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
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
    "Premium IPTV streaming service. 22,000+ live channels in 4K UHD, sports, movies and series. Activation over WhatsApp.",
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
  // English only: this is what the server actually renders. The in-page
  // language switcher is client-side and produces no separate URL.
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}#organization` },
  // SearchAction removed — site has no /search route. Re-add when search ships.
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ background: "#050507", colorScheme: "dark" }}>
      <head>
        {/* Canonical and hreflang are emitted per page through the Metadata API.
            Never hard-code them here: this element renders on every route. */}
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
        {/* Product, FAQPage and BreadcrumbList belong to the pages that show
            them, not to every route. They live in the page files. */}
      </head>
      <body style={{ background: "#050507", margin: 0 }}>
        <TrackingProvider />
        {children}
        <CookieConsent />
        <ConsentedAnalytics />
      </body>
    </html>
  );
}
