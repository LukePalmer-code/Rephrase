import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppStatusBar } from "../../components/AppStatusBar";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PastelIconBadge } from "../../components/PastelIconBadge";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SectionDivider } from "../../components/SectionDivider";
import { TARGET_LANGUAGE_LABEL } from "../../data/content";
import { ChevronRightIcon, FlameIcon, LogoutIcon, TargetIcon, UserIcon } from "../../icons/RephraseIcons";

type SettingsPageProps = {
  basePath: string;
};

function SettingsRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-rp-line px-4 py-4 last:border-b-0">
      <span className="text-rp-cocoa-600" aria-hidden="true">
        {icon}
      </span>
      <span className="font-rp-body text-sm text-rp-cocoa-800">{label}</span>
      <span className="ml-auto font-rp-body text-sm text-rp-cocoa-500">{value}</span>
    </div>
  );
}

export function SettingsPage({ basePath }: SettingsPageProps) {
  const [remindersOn, setRemindersOn] = useState(true);

  return (
    <div>
      <AppStatusBar />
      <PageShell width="mobile" className="relative pt-4 pb-10">
        <div className="flex items-center justify-between">
          <Link
            to={basePath}
            aria-label="Back"
            className="grid h-10 w-10 place-items-center rounded-full border border-rp-line-strong text-rp-cocoa-800 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <ChevronRightIcon size={18} className="rotate-180" aria-hidden />
          </Link>
          <p className="font-rp-body text-[0.65rem] font-bold uppercase tracking-wide text-rp-cocoa-500">
            Settings
          </p>
          <span className="h-10 w-10" aria-hidden="true" />
        </div>

        <EditorialHeading as="h1" size="title" className="mt-6 text-3xl">
          Settings
        </EditorialHeading>
        <SectionDivider className="mt-4 max-w-[220px]" />

        <p className="mt-6 font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-600">
          Account
        </p>
        <CreamCard className="mt-3">
          <SettingsRow icon={<UserIcon size={18} aria-hidden />} label="Name" value="Alex Rivera" />
          <SettingsRow icon={<UserIcon size={18} aria-hidden />} label="Email" value="alex@example.com" />
        </CreamCard>

        <p className="mt-6 font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-600">
          Learning
        </p>
        <CreamCard className="mt-3">
          <SettingsRow icon={<TargetIcon size={18} aria-hidden />} label="Target Language" value={TARGET_LANGUAGE_LABEL} />
        </CreamCard>

        <p className="mt-6 font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-600">
          Notifications
        </p>
        <CreamCard className="mt-3 flex items-center gap-3 px-4 py-4">
          <PastelIconBadge tone="sage" size={40}>
            <FlameIcon size={18} aria-hidden />
          </PastelIconBadge>
          <span className="font-rp-body text-sm text-rp-cocoa-800">Daily practice reminders</span>
          <button
            type="button"
            role="switch"
            aria-checked={remindersOn}
            onClick={() => setRemindersOn((value) => !value)}
            className={`ml-auto flex h-7 w-12 items-center rounded-full p-1 transition-colors duration-150 ${
              remindersOn ? "bg-rp-sage-600" : "bg-rp-line-strong"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-rp-cream-50 shadow transition-transform duration-150 ${
                remindersOn ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </CreamCard>

        <PrimaryButton to="/" variant="outline" icon={<LogoutIcon size={18} aria-hidden />} className="mt-10 w-full">
          Log Out
        </PrimaryButton>
      </PageShell>
    </div>
  );
}
