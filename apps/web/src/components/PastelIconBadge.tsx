import type { ReactNode } from "react";

export type PastelTone = "blush" | "sage" | "butter" | "peach";

type PastelIconBadgeProps = {
  children: ReactNode;
  tone?: PastelTone;
  size?: number;
  className?: string;
};

const toneClass: Record<PastelTone, string> = {
  blush: "bg-rp-blush-200 text-rp-cocoa-800",
  sage: "bg-rp-sage-200 text-rp-sage-600",
  butter: "bg-rp-butter-200 text-rp-cocoa-800",
  peach: "bg-rp-peach-300 text-rp-cocoa-800",
};

export function PastelIconBadge({
  children,
  tone = "blush",
  size = 52,
  className = "",
}: PastelIconBadgeProps) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full ${toneClass[tone]} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
