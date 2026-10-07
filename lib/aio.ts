import config from "../aio.config.json";

export type AioLang = "en" | "fr" | "ar";

export const aio = config;
export const defaultLang = config.defaultLang as AioLang;

export function faqFor(lang: AioLang = defaultLang) {
  return config.i18n[lang].faq;
}

/** FAQPage whose acceptedAnswer text is the same string rendered in the Citation Hooks. */
export function buildFaqPage(lang: AioLang = defaultLang) {
  const url = config.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    inLanguage: lang,
    mainEntity: faqFor(lang).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** One Product per published plan. Prices come only from aio.config.json. */
export function buildProductGraph(lang: AioLang = defaultLang) {
  const url = config.siteUrl;
  const products = config.plans.map((p) => ({
    "@type": "Product",
    "@id": `${url}/#product-${p.id}`,
    name: `${config.siteName} - ${p.name[lang]}`,
    description: config.i18n[lang].productDescription.replace("{name}", p.name[lang]),
    brand: { "@type": "Brand", name: config.siteName },
    offers: {
      "@type": "Offer",
      url: `${url}/pricing`,
      price: p.price.toFixed(2),
      priceCurrency: config.currency,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${url}#organization` },
    },
  }));
  return { "@context": "https://schema.org", "@graph": products };
}

/** Sérialisation sûre pour <script type="application/ld+json"> */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
