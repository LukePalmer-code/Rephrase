import type { ElementType, HTMLAttributes, ReactNode } from "react";

type CreamCardProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  elevated?: boolean;
} & HTMLAttributes<HTMLElement>;

export function CreamCard({
  as: Tag = "div",
  children,
  className = "",
  elevated = false,
  ...rest
}: CreamCardProps) {
  return (
    <Tag
      className={`rounded-rp-lg border border-rp-line shadow-rp-card ${
        elevated ? "bg-rp-cream-50" : "bg-rp-cream-100"
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
