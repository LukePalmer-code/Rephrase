import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  width?: "mobile" | "wide" | "full";
};

const widthClass: Record<NonNullable<PageShellProps["width"]>, string> = {
  mobile: "mx-auto w-full max-w-md",
  wide: "mx-auto w-full max-w-[1180px]",
  full: "w-full",
};

export function PageShell({ children, className = "", width = "wide" }: PageShellProps) {
  return <div className={`${widthClass[width]} px-5 sm:px-6 ${className}`}>{children}</div>;
}
