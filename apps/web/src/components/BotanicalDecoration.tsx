import { BotanicalSprigIcon } from "../icons/RephraseIcons";

type BotanicalDecorationProps = {
  className?: string;
  size?: number;
  flip?: boolean;
  rotate?: number;
};

export function BotanicalDecoration({
  className = "",
  size = 160,
  flip = false,
  rotate = 0,
}: BotanicalDecorationProps) {
  return (
    <BotanicalSprigIcon
      aria-hidden="true"
      size={size}
      className={`pointer-events-none select-none opacity-70 ${className}`}
      style={{ transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})` }}
    />
  );
}
