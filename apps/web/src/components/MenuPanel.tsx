import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import { ChevronRightIcon, LogoutIcon, SettingsIcon, UserIcon } from "../icons/RephraseIcons";
import { PastelIconBadge } from "./PastelIconBadge";

type MenuPanelProps = {
  basePath: string;
};

export function MenuPanel({ basePath }: MenuPanelProps) {
  const { isOpen, close } = useMenu();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
        className="absolute inset-0 bg-rp-cocoa-900/40"
      />

      <div
        className={`absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-rp-cream-50 shadow-[0_20px_50px_rgba(69,35,23,0.25)] transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <span className="font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-600">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-rp-line-strong text-rp-cocoa-800 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <ChevronRightIcon size={16} className="rotate-45" aria-hidden />
          </button>
        </div>

        <Link
          to={`${basePath}/me`}
          onClick={close}
          className="mx-5 mt-5 flex items-center gap-3 rounded-rp-lg border border-rp-line bg-rp-cream-100 p-4 transition-transform duration-150 hover:-translate-y-0.5"
        >
          <PastelIconBadge tone="blush" size={44}>
            <UserIcon size={20} aria-hidden />
          </PastelIconBadge>
          <span>
            <span className="block font-rp-display text-lg text-rp-cocoa-900">Your Profile</span>
            <span className="block font-rp-body text-xs text-rp-cocoa-600">View progress &amp; stats</span>
          </span>
        </Link>

        <nav className="mt-6 flex flex-1 flex-col gap-1 px-3">
          <Link
            to={`${basePath}/settings`}
            onClick={close}
            className="flex items-center gap-3 rounded-rp-lg px-3 py-3 font-rp-body text-base text-rp-cocoa-800 transition-colors duration-150 hover:bg-rp-cream-100"
          >
            <SettingsIcon size={20} aria-hidden />
            Settings
            <ChevronRightIcon size={16} className="ml-auto text-rp-cocoa-400" aria-hidden />
          </Link>
        </nav>

        <div className="mb-8 mt-auto px-3">
          <Link
            to="/"
            onClick={close}
            className="flex items-center gap-3 rounded-rp-lg px-3 py-3 font-rp-body text-base text-rp-cocoa-600 transition-colors duration-150 hover:bg-rp-cream-100"
          >
            <LogoutIcon size={20} aria-hidden />
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}
