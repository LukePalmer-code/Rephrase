import { AppStatusBar } from "../../components/AppStatusBar";
import { AppTopBar } from "../../components/AppTopBar";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PastelIconBadge } from "../../components/PastelIconBadge";
import { languageIslands } from "../../data/content";
import { ChevronRightIcon } from "../../icons/RephraseIcons";

export function IslandsPage() {
  return (
    <div>
      <AppStatusBar />
      <PageShell width="mobile" className="pt-4">
        <AppTopBar />

        <EditorialHeading as="h1" size="title" className="mt-6 text-3xl">
          Your Islands
        </EditorialHeading>
        <p className="mt-2 font-rp-body text-sm text-rp-cocoa-700">
          Broad, recurring topics built from what you actually talk about.
        </p>

        <ul className="mt-6 space-y-3">
          {languageIslands.map((island) => (
            <li key={island.id}>
              <CreamCard className="flex items-center gap-4 p-4">
                <PastelIconBadge tone={island.tone} size={56}>
                  <island.icon size={24} aria-hidden />
                </PastelIconBadge>
                <span className="flex-1">
                  <span className="block font-rp-display text-xl text-rp-cocoa-900">{island.name}</span>
                  <span className="block font-rp-body text-xs text-rp-cocoa-600">{island.description}</span>
                  <span className="mt-1 block font-rp-body text-[0.7rem] font-bold text-rp-sage-600">
                    {island.sentenceCount} sentences
                  </span>
                </span>
                <ChevronRightIcon size={18} className="shrink-0 text-rp-cocoa-500" aria-hidden />
              </CreamCard>
            </li>
          ))}
        </ul>
      </PageShell>
    </div>
  );
}
