/**
 * "Quick answer" box — extraction-friendly for Google AI Overviews and
 * featured snippets. A concise, self-contained answer placed high on the page.
 * Server component (presentational only).
 */
export default function AnswerBlock({
  children,
  label = "Quick answer",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div
      className="answer-block"
      style={{
        background: "rgba(212,175,55,0.06)",
        border: "1px solid rgba(212,175,55,0.25)",
        borderRadius: 10,
        padding: 18,
        margin: "20px auto 28px",
        maxWidth: 760,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 0.6,
          color: "var(--gold)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <p style={{ margin: 0, lineHeight: 1.6, color: "#dcdce4", fontSize: 15 }}>{children}</p>
    </div>
  );
}
