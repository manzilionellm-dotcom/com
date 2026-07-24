import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Service Status & Outage Reporting",
  description:
    "How Best IPTV VIP reports service problems: what we publish, what we do not yet measure automatically, how to report an outage on WhatsApp and what happens next.",
  alternates: { canonical: `${SITE.domain}/status` },
};

export default function StatusPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Service Status", href: "/status" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.4rem)" }}>
          Service status and outage reporting
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 760, margin: "12px auto 28px" }}>
          This page tells you exactly how to reach a human when something stops working, and
          exactly what we do and do not measure. We do not publish an automated live status
          dashboard yet, so you will not find invented uptime percentages here.
        </p>

        <section className="section">
          <h2>What we publish today</h2>
          <p>
            Streaming quality depends on three separate things: our delivery servers, the route
            between them and your internet provider, and your own device and connection. A single
            site-wide green badge would hide which of the three is actually
            failing on your line, so instead of a synthetic green light we give you a direct
            reporting channel and a diagnosis path. A single green badge would tell you nothing
            useful at the moment your stream freezes.
          </p>
          <p>
            Automated per-region monitoring with a public history is on our roadmap. Until the
            monitoring is real and independently recorded, we publish no uptime figure, no
            datacenter count and no latency number. If you see those numbers quoted anywhere about
            this service, they did not come from a measurement.
          </p>
        </section>

        <section className="section">
          <h2>Report a problem — what to send</h2>
          <p>
            Message support on WhatsApp with these four details. They cut diagnosis time
            dramatically, because they separate a delivery problem from a local one:
          </p>
          <ul>
            <li>The exact channel or title that fails, and the time it failed.</li>
            <li>Your device and app (for example Firestick with TiviMate, or Samsung Smart TV).</li>
            <li>Whether other channels play normally at the same moment.</li>
            <li>Whether the problem persists on mobile data instead of Wi-Fi.</li>
          </ul>
          <p>
            If the last point fixes it, the issue is on your local network rather than the stream,
            and our{" "}
            <Link href="/blog/how-to-fix-iptv-buffering">buffering troubleshooting guide</Link>{" "}
            usually resolves it faster than waiting for a reply.
          </p>
        </section>

        <section className="section">
          <h2>What happens after you report</h2>
          <p>
            Support answers in the same WhatsApp conversation you ordered from. If the fault is on
            our side and we cannot fix it, our{" "}
            <Link href="/refund">24-hour money-back guarantee</Link> applies as written — it is a
            policy you can read in full, not a slogan. If the fault is on your device, we walk
            through the fix step by step using the{" "}
            <Link href="/guides/firestick">device setup guides</Link>.
          </p>
          <p>
            Not a customer yet and want to test reliability before paying? Take the{" "}
            <Link href="/free-trial">24-hour free trial</Link> and watch the channels you actually
            care about, at the hours you actually watch them. That is a better reliability test
            than any status page.
          </p>
        </section>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <WhatsAppCTA
            source="status-report"
            message="Hi! I want to report a problem with my IPTV service."
            className="btn btn-green"
            event="cta_click"
          >
            Report a problem on WhatsApp
          </WhatsAppCTA>
        </div>
      </article>
    </PageShell>
  );
}
