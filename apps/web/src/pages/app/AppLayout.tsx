import { Outlet } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation";

type AppLayoutProps = {
  basePath?: string;
};

export function AppLayout({ basePath = "/app" }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-rp-peach-200 font-rp-body text-rp-cocoa-900">
      <main className="pb-28">
        <Outlet />
      </main>
      <BottomNavigation basePath={basePath} />
    </div>
  );
}
