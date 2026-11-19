import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Breadcrumbs from "../../components/Breadcrumbs";
import WhatsAppCTA from "../../components/WhatsAppCTA";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Service status and playback support",
  description: "Find out how to report a playback issue to Best IPTV VIP support.",
  alternates: { canonical: `${SITE.domain}/status` },
};

export default function StatusPage() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ name: "Service status", href: "/status" }]} />
      <article className="article">
        <h1>Service status</h1>
        <p className="lead">Live service status is unavailable on this page.</p>
        <h2>Report a playback problem</h2>
        <p>
          Tell support which device and player you use, when the problem started
          and whether it affects one channel or several.
        </p>
        <WhatsAppCTA
          className="btn btn-green"
          source="bestiptv-vip.com/status"
          message="Hi, I need help with a playback problem."
        >
          Contact support on WhatsApp
        </WhatsAppCTA>
      </article>
    </PageShell>
  );
}
