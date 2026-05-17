import Link from "next/link";
import PageShell from "../components/PageShell";

export const metadata = {
  title: "Page not found (404)",
};

export default function NotFound() {
  return (
    <PageShell>
      <article className="article" style={{ textAlign: "center", padding: "60px 0" }}>
        <h1 style={{ fontSize: "clamp(2rem,8vw,4rem)", margin: 0 }}>404</h1>
        <p className="lead" style={{ maxWidth: 520, margin: "16px auto 24px" }}>
          This page doesn&apos;t exist. Looking for IPTV plans or install guides?
        </p>
        <div className="hero-actions">
          <Link className="btn btn-gold" href="/pricing">See pricing</Link>
          <Link className="btn btn-ghost" href="/">Go home</Link>
        </div>
      </article>
    </PageShell>
  );
}
