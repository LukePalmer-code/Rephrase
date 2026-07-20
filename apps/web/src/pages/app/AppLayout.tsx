import { Outlet } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation";
import { MenuPanel } from "../../components/MenuPanel";
import { MenuProvider } from "../../context/MenuContext";

type AppLayoutProps = {
  basePath?: string;
};

export function AppLayout({ basePath = "/app" }: AppLayoutProps) {
  return (
    <MenuProvider>
      <div className="min-h-screen bg-rp-peach-200 font-rp-body text-rp-cocoa-900">
        <main className="pb-28">
          <Outlet />
        </main>
        <BottomNavigation basePath={basePath} />
        <MenuPanel basePath={basePath} />
      </div>
    </MenuProvider>
  );
}
