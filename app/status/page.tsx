import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Service status",
  description:
    "Best IPTV VIP does not publish live uptime, server load or incident history on this page. Report a playback problem on WhatsApp or by email.",
  alternates: { canonical: `${SITE.domain}/status` },
};

// À CONFIRMER: no monitoring feed is connected in this repo. Do not render uptime, datacenters or incident dates as measurements.
export default function StatusPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Service status", href: "/status" }]} />
      <article className="article">
        <h1 style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.4rem)" }}>
          Service status
        </h1>
        <p className="lead" style={{ textAlign: "center", maxWidth: 720, margin: "12px auto 28px" }}>
          This page does not show live measurements. Uptime, datacenter load and incident history are not recorded here.
        </p>
        <section className="section">
          <h2>If something fails</h2>
          <p>
            Message WhatsApp +{SITE.whatsapp} or email {SITE.email} with your device and the channel that failed. That is the support path. It is not a published uptime figure.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
