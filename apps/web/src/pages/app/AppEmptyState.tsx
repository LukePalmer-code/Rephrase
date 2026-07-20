import type { ComponentType } from "react";
import { AppStatusBar } from "../../components/AppStatusBar";
import { AppTopBar } from "../../components/AppTopBar";
import { BotanicalDecoration } from "../../components/BotanicalDecoration";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PastelIconBadge, type PastelTone } from "../../components/PastelIconBadge";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SectionDivider } from "../../components/SectionDivider";
import { ChevronRightIcon, type RephraseIconProps } from "../../icons/RephraseIcons";

type AppEmptyStateProps = {
  eyebrow: string;
  title: string;
  message: string;
  icon: ComponentType<RephraseIconProps>;
  tone: PastelTone;
  ctaLabel: string;
  ctaTo: string;
};

/**
 * Placeholder screen for the real, backend-connected app (`/app/*`).
 * Reuses the same visual shell as the demo pages so the design stays
 * consistent once each screen is wired up to real data.
 */
export function AppEmptyState({ eyebrow, title, message, icon: Icon, tone, ctaLabel, ctaTo }: AppEmptyStateProps) {
  return (
    <div>
      <AppStatusBar />
      <PageShell width="mobile" className="relative pt-4">
        <AppTopBar />

        <BotanicalDecoration
          size={70}
          className="pointer-events-none absolute right-5 top-16 text-rp-sage-300"
        />

        <p className="mt-6 font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-600">
          {eyebrow}
        </p>
        <EditorialHeading as="h1" size="title" className="mt-2 text-3xl">
          {title}
        </EditorialHeading>
        <SectionDivider className="mt-4 max-w-[220px]" />

        <CreamCard className="mt-8 flex flex-col items-center gap-4 p-8 text-center">
          <PastelIconBadge tone={tone} size={64}>
            <Icon size={28} aria-hidden />
          </PastelIconBadge>
          <p className="max-w-xs font-rp-body text-sm leading-relaxed text-rp-cocoa-700">{message}</p>
        </CreamCard>

        <PrimaryButton to={ctaTo} trailingIcon={<ChevronRightIcon size={18} aria-hidden />} className="mt-8 w-full">
          {ctaLabel}
        </PrimaryButton>
      </PageShell>
    </div>
  );
}
