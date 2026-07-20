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
import { languageIslands, todayTasks } from "../../data/content";
import { ChevronRightIcon, SparkleIcon } from "../../icons/RephraseIcons";

const taskLinks: Record<string, string> = {
  narrate: "/demo/narrate",
  listen: "/demo/listen",
  recall: "/demo/recall",
};

const today = new Date().toLocaleDateString(undefined, {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function HomePage() {
  return (
    <div>
      <AppStatusBar />
      <PageShell width="mobile" className="relative pt-4">
        <AppTopBar />

        <BotanicalDecoration
          size={90}
          className="pointer-events-none absolute right-5 top-16 text-rp-sage-300"
        />

        <EditorialHeading as="h1" size="display" className="mt-7 max-w-[70%]">
          Language,
          <br />
          Gently
        </EditorialHeading>
        <SectionDivider className="mt-5 max-w-[220px]" />
        <p className="mt-5 max-w-xs font-rp-body text-sm leading-relaxed text-rp-cocoa-700">
          Learn from your real life. Turn the sentences you say and hear into lasting language.
        </p>

        <section className="mt-9" aria-labelledby="today-heading">
          <div className="flex items-baseline justify-between">
            <EditorialHeading as="h2" id="today-heading" size="title" className="text-2xl">
              Today
            </EditorialHeading>
            <span className="font-rp-body text-xs text-rp-cocoa-600">{today}</span>
          </div>
          <CreamCard as="ul" className="mt-4 divide-y divide-rp-line">
            {todayTasks.map((task) => (
              <li key={task.id}>
                <Link
                  to={taskLinks[task.id] ?? "/demo"}
                  className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-rp-cream-50"
                >
                  <PastelIconBadge tone={task.tone}>
                    <task.icon size={22} aria-hidden />
                  </PastelIconBadge>
                  <span className="flex-1">
                    <span className="block font-rp-display text-lg text-rp-cocoa-900">{task.title}</span>
                    <span className="block font-rp-body text-xs text-rp-cocoa-600">{task.subtitle}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-rp-peach-200 px-3 py-1 font-rp-body text-xs font-bold text-rp-cocoa-800">
                    {task.duration}
                  </span>
                </Link>
              </li>
            ))}
          </CreamCard>
        </section>

        <section className="mt-9" aria-labelledby="islands-heading">
          <CreamCard className="p-5">
            <div className="flex items-center justify-between">
              <EditorialHeading as="h2" id="islands-heading" size="title" className="text-xl">
                Your Islands
              </EditorialHeading>
              <Link
                to="/demo/islands"
                className="font-rp-body text-xs font-bold text-rp-cocoa-700 underline-offset-4 hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="mt-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {languageIslands.slice(0, 4).map((island) => (
                <li key={island.id} className="shrink-0">
                  <Link
                    to="/demo/islands"
                    className="flex items-center gap-2 rounded-full bg-rp-peach-100 py-1.5 pl-1.5 pr-4"
                  >
                    <PastelIconBadge tone={island.chipTone} size={32}>
                      <island.icon size={16} aria-hidden />
                    </PastelIconBadge>
                    <span className="font-rp-body text-xs font-bold text-rp-cocoa-800">{island.chipLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CreamCard>
        </section>

        <PrimaryButton
          to="/demo/narrate"
          icon={<SparkleIcon size={18} aria-hidden />}
          trailingIcon={<ChevronRightIcon size={18} aria-hidden />}
          className="mt-9 w-full"
        >
          Begin Today
        </PrimaryButton>
      </PageShell>
    </div>
  );
}
