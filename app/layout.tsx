import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://bestiptv-vip.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Best IPTV VIP — Premium 4K IPTV Subscription Worldwide",
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
    "IPTV Smarters Pro",
    "TiviMate IPTV Player",
    "IBO Player IPTV",
    "Smart IPTV app",
    "XCIPTV player",
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Best IPTV VIP",
    title: "Best IPTV VIP — Premium 4K IPTV Subscription Worldwide",
    description:
      "Premium IPTV service with 4K streaming, live sports, movies & 20,000+ channels worldwide. 24H free trial available.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best IPTV VIP — Premium IPTV Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best IPTV VIP — Premium 4K IPTV Subscription",
    description:
      "Premium IPTV streaming for VIP viewers worldwide. 4K HD, all devices, 24H free trial.",
    images: ["/og-image.jpg"],
    creator: "@bestiptvvip",
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.svg",
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

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Best IPTV VIP",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Premium IPTV streaming service with 4K HD channels, live sports, movies and global content.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7307-410512",
    contactType: "customer support",
    availableLanguage: ["English", "French", "Spanish", "Arabic"],
  },
  sameAs: ["https://wa.me/447307410512"],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Best IPTV VIP",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const jsonLdProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Best IPTV VIP — Premium IPTV Subscription",
  description:
    "Premium 4K IPTV service with 20,000+ live channels, sports, movies, and series worldwide. Compatible with Smart TV, Firestick, Android, iOS, and PC.",
  brand: {
    "@type": "Brand",
    name: "Best IPTV VIP",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    {
      "@type": "Offer",
      name: "1 Month Plan",
      price: "14.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    },
    {
      "@type": "Offer",
      name: "6 Months Plan",
      price: "59.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    },
    {
      "@type": "Offer",
      name: "12 Months Plan",
      price: "99.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    },
  ],
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: `${SITE_URL}#pricing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Free Trial",
      item: `${SITE_URL}#trial`,
    },
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Best IPTV VIP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Best IPTV VIP is a premium IPTV streaming service that delivers over 20,000 live channels, sports, movies, and series in HD, Full HD, and 4K to viewers worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer a free trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer a 24-hour free trial so you can test our premium IPTV servers, channel quality, and streaming speed before subscribing.",
      },
    },
    {
      "@type": "Question",
      name: "Which devices are compatible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our service works on Smart TVs, Amazon Firestick, Android boxes, iOS devices, Windows PCs, Mac, MAG boxes, and more. It is compatible with popular IPTV players such as IPTV Smarters Pro, TiviMate, IBO Player, Smart IPTV, and XCIPTV.",
      },
    },
    {
      "@type": "Question",
      name: "How fast is activation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Activation is typically completed within minutes after your request via WhatsApp.",
      },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Best IPTV VIP" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Best IPTV VIP" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#050507" />
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
      <body style={{ background: "#050507", margin: 0 }}>{children}</body>
    </html>
  );
}
