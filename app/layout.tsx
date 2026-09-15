import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE, LOCALES } from "../lib/site";
import CookieConsent from "../components/CookieConsent";
import TrackingProvider from "../components/TrackingProvider";
import ConsentScripts from "../components/ConsentScripts";
import ProcessProof from "../components/ProcessProof";

const SITE_URL = SITE.domain;
const LOGO_URL = `${SITE_URL}/icon-512.png`;
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

const TITLE = "Best IPTV VIP — Plans from $10/mo";
const DESCRIPTION =
  "Live TV subscription via WhatsApp. 24h trial, no card. Plans $10 / $25 / $35 / $60. Firestick, Smart TV, Android, iPhone.";

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
    url: SITE_URL,
    siteName: SITE.brand,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: SITE.brand, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
  userScalable: true,
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
  description: DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${SITE.whatsapp}`,
    contactType: "customer support",
    availableLanguage: ["English", "French", "Arabic", "Spanish", "German"],
    areaServed: "Worldwide",
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: SITE.brand,
  url: SITE_URL,
  inLanguage: ["en", "fr", "ar", "es", "de"],
  publisher: { "@id": `${SITE_URL}#organization` },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}#service`,
  name: "Best IPTV VIP subscription",
  serviceType: "IPTV streaming subscription",
  description: DESCRIPTION,
  provider: { "@id": `${SITE_URL}#organization` },
  url: SITE_URL,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "VIP plans",
    itemListElement: [
      { "@type": "Offer", name: "1 Month", price: "10", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${SITE_URL}/pricing` },
      { "@type": "Offer", name: "3 Months", price: "25", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${SITE_URL}/pricing` },
      { "@type": "Offer", name: "6 Months", price: "35", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${SITE_URL}/pricing` },
      { "@type": "Offer", name: "12 Months", price: "60", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${SITE_URL}/pricing` },
    ],
  },
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I start?",
      acceptedAnswer: { "@type": "Answer", text: "Message WhatsApp for a 24h trial. No card. After the trial pick a plan and we send the login." },
    },
    {
      "@type": "Question",
      name: "What are the prices?",
      acceptedAnswer: { "@type": "Answer", text: "1 month $10, 3 months $25, 6 months $35, 12 months $60. Paid once per term. No auto-renew contract." },
    },
    {
      "@type": "Question",
      name: "Which devices?",
      acceptedAnswer: { "@type": "Answer", text: "Firestick, Smart TV, Android, iPhone, iPad, MAG Box, PC/Mac." },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ background: "#050507", colorScheme: "dark" }}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        {LOCALES.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={`${SITE_URL}/?lang=${l}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      </head>
      <body style={{ background: "#050507", margin: 0 }}>
        <TrackingProvider />
        {children}
        <ProcessProof />
        <CookieConsent />
        <ConsentScripts />
      </body>
    </html>
  );
}
