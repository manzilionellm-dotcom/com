/** Visible question + direct answer. Not an accordion: the paragraph is in the server HTML. */
export function CitationList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <>
      {items.map((f) => (
        <div key={f.q} className="faq-item">
          <h3 className="faq-q">{f.q}</h3>
          <p className="faq-a">{f.a}</p>
        </div>
      ))}
    </>
  );
}
