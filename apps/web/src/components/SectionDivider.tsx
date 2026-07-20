import { SparkleSmallIcon } from "../icons/RephraseIcons";

type SectionDividerProps = {
  className?: string;
};

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`flex items-center gap-3 text-rp-cocoa-400 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-rp-line-strong" />
      <SparkleSmallIcon size={16} className="text-rp-cocoa-500" aria-hidden />
      <span className="h-px flex-1 bg-rp-line-strong" />
    </div>
  );
}
