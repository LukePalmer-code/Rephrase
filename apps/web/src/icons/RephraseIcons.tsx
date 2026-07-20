import type { SVGProps } from "react";

export type RephraseIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  title?: string;
};

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MenuIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M4 7h16"/>
  <path d="M4 12h16"/>
  <path d="M4 17h16"/>
    </svg>
  );
}

export function SparkleIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M12 2.8c.65 5.2 3.95 8.5 9.2 9.2-5.25.7-8.55 4-9.2 9.2-.65-5.2-3.95-8.5-9.2-9.2 5.25-.7 8.55-4 9.2-9.2Z"/>
    </svg>
  );
}

export function SparkleSmallIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M12 5.5c.42 3.7 2.8 6.08 6.5 6.5-3.7.42-6.08 2.8-6.5 6.5-.42-3.7-2.8-6.08-6.5-6.5 3.7-.42 6.08-2.8 6.5-6.5Z"/>
    </svg>
  );
}

export function NarrateIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M6.5 5.5h8.75A3.25 3.25 0 0 1 18.5 8.75v4.5a3.25 3.25 0 0 1-3.25 3.25H11l-3.9 2.55.75-2.55H6.5a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3Z"/>
  <path d="M10.9 8.4v5.1"/>
  <path d="M8.9 10.1v1.7"/>
  <path d="M12.9 9.3v3.3"/>
  <path d="M19.5 4.1c.18 1.45 1.05 2.33 2.5 2.5-1.45.17-2.32 1.05-2.5 2.5-.18-1.45-1.05-2.33-2.5-2.5 1.45-.17 2.32-1.05 2.5-2.5Z"/>
    </svg>
  );
}

export function HomeIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="m3.5 10.6 8.5-7.1 8.5 7.1"/>
  <path d="M5.5 9.4v10.1h13V9.4"/>
  <path d="M9.3 19.5v-5.6h5.4v5.6"/>
    </svg>
  );
}

export function HeadphonesIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M4.2 13.2v-1.5a7.8 7.8 0 0 1 15.6 0v1.5"/>
  <path d="M4.2 13.2h2.1v6H5.4a2.4 2.4 0 0 1-2.4-2.4v-1.2a2.4 2.4 0 0 1 1.2-2.1Z"/>
  <path d="M19.8 13.2h-2.1v6h.9a2.4 2.4 0 0 0 2.4-2.4v-1.2a2.4 2.4 0 0 0-1.2-2.1Z"/>
    </svg>
  );
}

export function RecallIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M18.4 8.2A7.7 7.7 0 0 0 6.1 5.9L4.4 7.6"/>
  <path d="M4.4 3.8v3.8h3.8"/>
  <path d="M5.6 15.8a7.7 7.7 0 0 0 12.3 2.3l1.7-1.7"/>
  <path d="M19.6 20.2v-3.8h-3.8"/>
    </svg>
  );
}

export function IslandIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M3.2 19.5c2.2-2 4.8-3 8.8-3s6.6 1 8.8 3"/>
  <path d="M12 16.5v-7"/>
  <path d="M12 10c-1.8-2.2-4.1-2.8-6.2-2.1 1.3 2.4 3.4 3.6 6.2 3.2"/>
  <path d="M12 10c1.8-2.2 4.1-2.8 6.2-2.1-1.3 2.4-3.4 3.6-6.2 3.2"/>
  <path d="M12 8.7c-.1-2.5 1-4.3 2.8-5.5.9 2.5.2 4.7-2.2 6.2"/>
    </svg>
  );
}

export function UserIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <circle cx="12" cy="8" r="3.2"/>
  <path d="M5.2 20c.6-4.2 3-6.4 6.8-6.4s6.2 2.2 6.8 6.4"/>
    </svg>
  );
}

export function MicrophoneIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <rect x="8.2" y="3" width="7.6" height="12.2" rx="3.8"/>
  <path d="M5.8 11.3a6.2 6.2 0 0 0 12.4 0"/>
  <path d="M12 17.5V21"/>
  <path d="M8.7 21h6.6"/>
    </svg>
  );
}

export function WaveformIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M3.2 10.2v3.6"/>
  <path d="M6.7 7.2v9.6"/>
  <path d="M10.2 4.8v14.4"/>
  <path d="M13.8 6.2v11.6"/>
  <path d="M17.3 8.3v7.4"/>
  <path d="M20.8 10.3v3.4"/>
    </svg>
  );
}

export function CarIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="m5.2 9.4 1.5-3.2h10.6l1.5 3.2"/>
  <path d="M4.2 9.4h15.6a1.7 1.7 0 0 1 1.7 1.7v4.5a1.7 1.7 0 0 1-1.7 1.7H4.2a1.7 1.7 0 0 1-1.7-1.7v-4.5a1.7 1.7 0 0 1 1.7-1.7Z"/>
  <path d="M5.3 17.3v2"/>
  <path d="M18.7 17.3v2"/>
  <path d="M6.5 13.4h.01"/>
  <path d="M17.5 13.4h.01"/>
    </svg>
  );
}

export function CupIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M5.2 8.2h11v5.1a4.4 4.4 0 0 1-4.4 4.4H9.6a4.4 4.4 0 0 1-4.4-4.4V8.2Z"/>
  <path d="M16.2 9.6h1.7a2.5 2.5 0 0 1 0 5h-1.8"/>
  <path d="M3.8 20h14.8"/>
  <path d="M8.3 5.6c-1-1.1-.4-2 .4-2.8"/>
  <path d="M12 5.6c-1-1.1-.4-2 .4-2.8"/>
    </svg>
  );
}

export function BriefcaseIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <rect x="3" y="7" width="18" height="12" rx="2.2"/>
  <path d="M8.3 7V5.4A1.4 1.4 0 0 1 9.7 4h4.6a1.4 1.4 0 0 1 1.4 1.4V7"/>
  <path d="M3 12.2c5.8 2.1 12.2 2.1 18 0"/>
  <path d="M10.5 12.9h3v2.2h-3z"/>
    </svg>
  );
}

export function FamilyHomeIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="m3.5 10.2 8.5-7 8.5 7"/>
  <path d="M5.5 9.1v10.4h13V9.1"/>
  <path d="M12 16.7s-3.2-1.9-3.2-4.1c0-1.1.8-2 1.9-2 .7 0 1.1.3 1.3.8.2-.5.7-.8 1.3-.8 1.1 0 1.9.9 1.9 2 0 2.2-3.2 4.1-3.2 4.1Z"/>
    </svg>
  );
}

export function StarIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="m12 3.2 2.65 5.38 5.94.86-4.3 4.19 1.02 5.91L12 16.75l-5.31 2.79 1.02-5.91-4.3-4.19 5.94-.86L12 3.2Z"/>
    </svg>
  );
}

export function SunIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <circle cx="12" cy="12" r="4"/>
  <path d="M12 2.7v2"/>
  <path d="M12 19.3v2"/>
  <path d="m5.4 5.4 1.4 1.4"/>
  <path d="m17.2 17.2 1.4 1.4"/>
  <path d="M2.7 12h2"/>
  <path d="M19.3 12h2"/>
  <path d="m5.4 18.6 1.4-1.4"/>
  <path d="m17.2 6.8 1.4-1.4"/>
    </svg>
  );
}

export function DocumentCheckIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M6 3.5h9l3 3v14H6z"/>
  <path d="M15 3.5v3h3"/>
  <path d="M8.7 10h5.5"/>
  <path d="M8.7 13h3.2"/>
  <path d="m11.6 17 1.6 1.6 3.1-3.4"/>
    </svg>
  );
}

export function ClockIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5"/>
  <path d="M12 7.2v5.2l3.5 2"/>
    </svg>
  );
}

export function FlameIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M13.2 3.2c.7 3.2-1.4 4.4-1.4 6.2 0 1 .6 1.8 1.6 2.4-.1-2.2 1.1-3.4 2.2-4.4 2.2 2 3.4 4.3 3.4 6.9a7 7 0 0 1-14 0c0-3.5 2.1-6.4 5.2-8.9-.3 2.5.1 3.8 1 4.8.2-2.8 1-4.9 2-7Z"/>
    </svg>
  );
}

export function SentencesIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M5.2 5.2h13.6A2.2 2.2 0 0 1 21 7.4v7.2a2.2 2.2 0 0 1-2.2 2.2H11l-4.4 3 .8-3H5.2A2.2 2.2 0 0 1 3 14.6V7.4a2.2 2.2 0 0 1 2.2-2.2Z"/>
  <path d="M7.5 9.2h9"/>
  <path d="M7.5 12.5h6.2"/>
    </svg>
  );
}

export function TargetIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5"/>
  <circle cx="12" cy="12" r="4.7"/>
  <circle cx="12" cy="12" r="1.3"/>
  <path d="m14.8 9.2 5.7-5.7"/>
  <path d="M16.4 3.5h4.1v4.1"/>
    </svg>
  );
}

export function ChevronRightIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="m9 5 7 7-7 7"/>
    </svg>
  );
}

export function PlayIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="m8.4 5.4 10.1 6.6-10.1 6.6V5.4Z"/>
    </svg>
  );
}

export function PauseIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M8.5 5.5v13"/>
  <path d="M15.5 5.5v13"/>
    </svg>
  );
}

export function FlowerBadgeIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M12 20V9.5"/>
  <path d="M12 14c-2.6-2.4-4.7-2.6-6.7-1.2 1.2 2.4 3.3 3.3 6.7 2.4"/>
  <path d="M12 11.3c2.4-2.2 4.5-2.5 6.4-1.1-1.1 2.3-3.1 3.2-6.4 2.3"/>
  <path d="M12 9.5c-2.3-.2-3.5-1.3-3.7-3.3 2-.4 3.4.5 4.1 2.7"/>
  <path d="M12 9.5c2.3-.2 3.5-1.3 3.7-3.3-2-.4-3.4.5-4.1 2.7"/>
  <circle cx="12" cy="5.4" r="1.3"/>
    </svg>
  );
}

export function SettingsIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M4 7h9"/>
  <circle cx="16.5" cy="7" r="2"/>
  <path d="M19 7h1"/>
  <path d="M4 12h1"/>
  <circle cx="8.5" cy="12" r="2"/>
  <path d="M11.5 12h8.5"/>
  <path d="M4 17h9"/>
  <circle cx="16.5" cy="17" r="2"/>
  <path d="M19 17h1"/>
    </svg>
  );
}

export function LogoutIcon({ size = 24, title, ...props }: RephraseIconProps) {
  return (
    <svg
      {...baseProps}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <path d="M9 4H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H9"/>
  <path d="m14 8 4 4-4 4"/>
  <path d="M18 12H9"/>
    </svg>
  );
}

export function BotanicalSprigIcon({ size = 160, title, ...props }: RephraseIconProps) {
  return (
    <svg
      width={size}
      height={typeof size === "number" ? size * 1.375 : size}
      viewBox="0 0 160 220"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      <g stroke="#7B8868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 204C75 159 89 112 101 30"/>
        <path d="M70 159c-23-4-38 3-48 20 21 6 38 1 51-15"/>
        <path d="M79 135c20-2 34 5 42 20-19 4-33-1-44-16"/>
        <path d="M88 106c-18-6-32-1-43 13 18 7 32 3 45-9"/>
        <path d="M95 78c18-2 31 4 39 18-17 4-30 0-40-14"/>
        <path d="M101 51c-15-5-27-1-36 11 15 6 27 3 37-7"/>
        <path d="M91 91C73 79 63 65 58 48"/>
        <path d="M107 63c15-9 25-20 31-34"/>
        <path d="M100 121c17-11 29-24 35-40"/>
      </g>
      <g fill="#EDAFA3" stroke="#C98076" strokeWidth="1">
        <circle cx="58" cy="47" r="5"/>
        <circle cx="49" cy="39" r="4"/>
        <circle cx="65" cy="36" r="4"/>
        <circle cx="139" cy="27" r="5"/>
        <circle cx="146" cy="37" r="4"/>
        <circle cx="131" cy="39" r="4"/>
        <circle cx="136" cy="80" r="5"/>
        <circle cx="145" cy="88" r="4"/>
        <circle cx="128" cy="91" r="4"/>
      </g>
    </svg>
  );
}

export const rephraseIconNames = [
  "menu",
  "sparkle",
  "sparkle-small",
  "narrate",
  "home",
  "headphones",
  "recall",
  "island",
  "user",
  "microphone",
  "waveform",
  "car",
  "cup",
  "briefcase",
  "family-home",
  "star",
  "sun",
  "document-check",
  "clock",
  "flame",
  "sentences",
  "target",
  "chevron-right",
  "play",
  "pause",
  "flower-badge",
  "botanical-sprig",
] as const;

export type RephraseIconName = (typeof rephraseIconNames)[number];