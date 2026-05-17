import Link from "next/link";
import { SITE } from "../lib/site";

type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const list = [{ name: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.domain}${c.href}`,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          {list.map((c, i) => (
            <li key={c.href}>
              {i < list.length - 1 ? (
                <Link href={c.href}>{c.name}</Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
              {i < list.length - 1 && <span className="sep" aria-hidden="true"> › </span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
