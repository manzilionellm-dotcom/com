import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Fab from "./Fab";

export default function PageShell({
  children,
  fabMessage,
  regionalGuide = false,
}: {
  children: React.ReactNode;
  fabMessage?: string;
  regionalGuide?: boolean;
}) {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <SiteHeader />
      <main className="wrap" style={{ paddingTop: 24, paddingBottom: 80 }}>
        {children}
      </main>
      <SiteFooter regionalGuide={regionalGuide} />
      <Fab message={fabMessage} />
    </>
  );
}
