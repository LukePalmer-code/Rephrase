import type { ElementType, ReactNode } from "react";

type EditorialHeadingProps = {
  as?: ElementType;
  children: ReactNode;
  size?: "hero" | "display" | "section" | "title";
  italic?: boolean;
  className?: string;
  id?: string;
};

const sizeClass: Record<NonNullable<EditorialHeadingProps["size"]>, string> = {
  hero: "text-[clamp(3.8rem,7.2vw,7.4rem)] leading-[0.9]",
  display: "text-[clamp(3.6rem,16vw,5.5rem)] leading-[0.92]",
  section: "text-[clamp(2rem,4vw,3rem)] leading-[0.98]",
  title: "text-3xl sm:text-4xl leading-[0.98]",
};

export function EditorialHeading({
  as: Tag = "h2",
  children,
  size = "section",
  italic = false,
  className = "",
  id,
}: EditorialHeadingProps) {
  return (
    <Tag
      id={id}
      className={`font-rp-display font-medium tracking-[-0.035em] text-rp-cocoa-900 ${sizeClass[size]} ${italic ? "italic" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
