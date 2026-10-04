import { buildFaqPage, faqFor, jsonLdString, type AioLang } from "../lib/aio";

/**
 * Sales-page FAQ. The h3 question is immediately followed by a paragraph,
 * and the FAQPage JSON-LD repeats that same paragraph.
 */
export function SalesFaq({
  lang = "en",
  title = "FAQ",
  centered = false,
}: {
  lang?: AioLang;
  title?: string;
  centered?: boolean;
}) {
  const items = faqFor(lang);
  return (
    <section id="faq" className="section faq-static">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildFaqPage(lang)) }}
      />
      <div className={centered ? "section-head" : undefined}>
        <h2>{title}</h2>
        <p className={centered ? undefined : "aio-kicker"}>
          Published answers for plans, the 24 hour trial, devices and payment.
        </p>
      </div>
      {items.map((f) => (
        <div key={f.q} className="faq-item">
          <h3 className="faq-q">{f.q}</h3>
          <p className="faq-a">{f.a}</p>
        </div>
      ))}
    </section>
  );
}
