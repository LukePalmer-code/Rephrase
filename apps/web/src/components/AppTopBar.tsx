import type { ReactNode } from "react";
import { useMenu } from "../context/MenuContext";
import { FlowerBadgeIcon, MenuIcon } from "../icons/RephraseIcons";

type AppTopBarProps = {
  onMenuClick?: () => void;
  trailing?: ReactNode;
};

export function AppTopBar({ onMenuClick, trailing }: AppTopBarProps) {
  const { open } = useMenu();

  return (
    <header className="flex items-center justify-between">
      <button
        type="button"
        onClick={onMenuClick ?? open}
        aria-label="Open menu"
        className="grid h-11 w-11 place-items-center rounded-full border border-rp-line-strong bg-rp-cream-100/70 text-rp-cocoa-900 transition-transform duration-150 hover:-translate-y-0.5"
      >
        <MenuIcon size={20} aria-hidden />
      </button>
      {trailing ?? (
        <span
          className="inline-grid h-11 w-11 place-items-center rounded-full border border-rp-line-strong text-rp-cocoa-800"
          aria-hidden="true"
        >
          <FlowerBadgeIcon size={20} aria-hidden />
        </span>
      )}
    </header>
  );
}
