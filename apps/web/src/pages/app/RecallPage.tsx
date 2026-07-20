import { useState } from "react";
import { Link } from "react-router-dom";
import { AppStatusBar } from "../../components/AppStatusBar";
import { AppTopBar } from "../../components/AppTopBar";
import { BotanicalDecoration } from "../../components/BotanicalDecoration";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PastelIconBadge } from "../../components/PastelIconBadge";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SectionDivider } from "../../components/SectionDivider";
import { practiceSets } from "../../data/content";
import { ChevronRightIcon, SparkleIcon, TargetIcon } from "../../icons/RephraseIcons";

const previewSet = practiceSets[0];

export function RecallPage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      <AppStatusBar />
      <PageShell width="mobile" className="relative pt-4">
        <AppTopBar />

        <BotanicalDecoration
          size={70}
          className="pointer-events-none absolute right-5 top-16 text-rp-sage-300"
        />

        <EditorialHeading as="h1" size="title" className="mt-6 text-3xl">
          Recall
        </EditorialHeading>
        <SectionDivider className="mt-4 max-w-[220px]" />
        <p className="mt-4 max-w-xs font-rp-body text-sm leading-relaxed text-rp-cocoa-700">
          Strengthen what is hardest to remember with gentle active recall.
        </p>

        <section className="mt-8" aria-labelledby="practice-sets-heading">
          <div className="flex items-baseline justify-between">
            <EditorialHeading as="h2" id="practice-sets-heading" size="title" className="text-xl">
              Practice Sets
            </EditorialHeading>
            <button
              type="button"
              className="font-rp-body text-xs font-bold text-rp-cocoa-700 underline-offset-4 hover:underline"
            >
              View all
            </button>
          </div>
          <CreamCard as="ul" className="mt-4 divide-y divide-rp-line">
            {practiceSets.map((set) => (
              <li key={set.id}>
                <Link
                  to={`/demo/recall/session/${set.id}`}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-rp-cream-50"
                >
                  <PastelIconBadge tone={set.tone}>
                    <set.icon size={20} aria-hidden />
                  </PastelIconBadge>
                  <span className="flex-1">
                    <span className="block font-rp-display text-lg text-rp-cocoa-900">{set.title}</span>
                    <span className="block font-rp-body text-xs text-rp-cocoa-600">
                      {set.due} due · {set.cards} cards · {set.accuracy}% accuracy
                    </span>
                  </span>
                  <ChevronRightIcon size={18} className="shrink-0 text-rp-cocoa-500" aria-hidden />
                </Link>
              </li>
            ))}
          </CreamCard>
        </section>

        <CreamCard className="mt-6 p-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-rp-display text-lg text-rp-cocoa-900">
              <SparkleIcon size={16} className="text-rp-cocoa-500" aria-hidden />
              Recall Preview
            </p>
            <span className="rounded-full bg-rp-blush-200 px-3 py-1 font-rp-body text-[0.65rem] font-bold text-rp-cocoa-800">
              From {previewSet.title}
            </span>
          </div>

          <p className="mt-5 font-rp-body text-xs font-bold uppercase tracking-wide text-rp-sage-600">
            Recall the translation
          </p>
          <p className="mt-2 font-rp-display text-2xl leading-tight text-rp-cocoa-900">
            I appreciate your help so much.
          </p>

          {revealed && (
            <p className="mt-4 font-rp-body text-sm italic leading-relaxed text-rp-cocoa-700">
              J'apprécie vraiment ton aide.
            </p>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-dashed border-rp-line pt-4">
            <p className="flex items-center gap-2 font-rp-body text-xs text-rp-cocoa-600">
              <TargetIcon size={16} className="text-rp-cocoa-500" aria-hidden />
              Tip: Try to recall before you reveal.
            </p>
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              className="shrink-0 rounded-full bg-rp-blush-200 px-4 py-2 font-rp-body text-xs font-bold text-rp-cocoa-800 transition-transform duration-150 hover:-translate-y-0.5"
            >
              {revealed ? "Hide Answer" : "Reveal Answer"}
            </button>
          </div>
        </CreamCard>

        <PrimaryButton
          icon={<SparkleIcon size={18} aria-hidden />}
          trailingIcon={<ChevronRightIcon size={18} aria-hidden />}
          className="mt-8 w-full"
          to={`/demo/recall/session/${previewSet.id}`}
        >
          Start Recall
        </PrimaryButton>
      </PageShell>
    </div>
  );
}
