import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Fab from "./Fab";

export default function PageShell({
  children,
  fabMessage,
}: {
  children: React.ReactNode;
  fabMessage?: string;
}) {
  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <SiteHeader />
      <main className="wrap" style={{ paddingTop: 24, paddingBottom: 80 }}>
        {children}
      </main>
      <SiteFooter />
      <Fab message={fabMessage} />
    </>
  );
}
