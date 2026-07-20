import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type PrimaryButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "filled" | "outline";
  icon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const base =
  "inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-full px-6 font-rp-display text-xl transition-[transform,box-shadow,background-color] duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline-none motion-reduce:hover:translate-y-0";

const variantClass: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  filled:
    "border border-rp-cocoa-900/10 bg-rp-cocoa-800 text-rp-cream-100 shadow-[0_14px_28px_rgba(87,47,32,0.18)] hover:bg-rp-cocoa-900 hover:shadow-[0_18px_34px_rgba(87,47,32,0.22)]",
  outline: "border border-rp-line-strong bg-transparent text-rp-cocoa-800 hover:bg-rp-cream-100",
};

export function PrimaryButton({
  children,
  to,
  href,
  variant = "filled",
  icon,
  trailingIcon,
  className = "",
  ...rest
}: PrimaryButtonProps) {
  const classes = `${base} ${variantClass[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {icon}
        {children}
        {trailingIcon}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon}
        {children}
        {trailingIcon}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {icon}
      {children}
      {trailingIcon}
    </button>
  );
}
