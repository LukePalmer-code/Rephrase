import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  className?: string;
};

export function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto aspect-[390/812] w-[300px] max-w-full overflow-hidden rounded-[2.75rem] border-[6px] border-rp-cocoa-900 bg-rp-peach-200 shadow-rp-phone sm:w-[340px] ${className}`}
    >
      <div
        className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-rp-cocoa-900"
        aria-hidden="true"
      />
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </div>
  );
}
