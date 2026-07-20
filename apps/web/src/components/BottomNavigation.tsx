import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import {
  HeadphonesIcon,
  HomeIcon,
  IslandIcon,
  RecallIcon,
  UserIcon,
  type RephraseIconProps,
} from "../icons/RephraseIcons";

type NavItem = {
  to: string;
  label: string;
  Icon: ComponentType<RephraseIconProps>;
};

type BottomNavigationProps = {
  basePath?: string;
};

export function BottomNavigation({ basePath = "/app" }: BottomNavigationProps) {
  const items: NavItem[] = [
    { to: basePath, label: "Narrate", Icon: HomeIcon },
    { to: `${basePath}/listen`, label: "Listen", Icon: HeadphonesIcon },
    { to: `${basePath}/recall`, label: "Recall", Icon: RecallIcon },
    { to: `${basePath}/islands`, label: "Your Islands", Icon: IslandIcon },
    { to: `${basePath}/me`, label: "Me", Icon: UserIcon },
  ];

  return (
    <nav
      aria-label="App navigation"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-rp-line bg-rp-cream-50/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-rp-cream-50/85"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {items.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === basePath}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-rp-md px-1 py-1.5 text-[0.68rem] leading-none transition-colors duration-150 ${
                  isActive ? "font-semibold text-rp-cocoa-900" : "text-rp-cocoa-500"
                }`
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2 : 1.7} aria-hidden />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
