import { Link } from "react-router-dom";
import { AppStatusBar } from "../components/AppStatusBar";
import { BotanicalDecoration } from "../components/BotanicalDecoration";
import { CreamCard } from "../components/CreamCard";
import { EditorialHeading } from "../components/EditorialHeading";
import { PageShell } from "../components/PageShell";
import { PastelIconBadge } from "../components/PastelIconBadge";
import { PhoneFrame } from "../components/PhoneFrame";
import { PrimaryButton } from "../components/PrimaryButton";
import { featureHighlights, languageIslands, todayTasks } from "../data/content";
import {
  HeadphonesIcon,
  HomeIcon,
  IslandIcon,
  RecallIcon,
  SparkleIcon,
  UserIcon,
} from "../icons/RephraseIcons";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#process", label: "Process" },
  { href: "#design", label: "Design" },
  { href: "#impact", label: "Impact" },
  { href: "#learnings", label: "Learnings" },
];

const miniNav = [
  { label: "Narrate", Icon: HomeIcon, active: true },
  { label: "Listen", Icon: HeadphonesIcon, active: false },
  { label: "Recall", Icon: RecallIcon, active: false },
  { label: "Islands", Icon: IslandIcon, active: false },
  { label: "Me", Icon: UserIcon, active: false },
];

function MiniHomePreview() {
  return (
    <div className="flex h-full flex-col font-rp-body text-rp-cocoa-900">
      <AppStatusBar />
      <div className="flex-1 overflow-hidden px-5 pt-3">
        <EditorialHeading as="p" size="title" className="text-[1.65rem] leading-[0.95]">
          Language,
          <br />
          <span className="italic">Gently.</span>
        </EditorialHeading>
        <p className="mt-2 font-rp-body text-[0.65rem] leading-snug text-rp-cocoa-700">
          Your personalised path to fluency, built from real life.
        </p>

        <p className="mt-4 font-rp-display text-base text-rp-cocoa-900">Today</p>
        <CreamCard className="mt-2 divide-y divide-rp-line">
          {todayTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2.5 px-3 py-2.5">
              <PastelIconBadge tone={task.tone} size={30}>
                <task.icon size={14} aria-hidden />
              </PastelIconBadge>
              <span className="flex-1">
                <span className="block font-rp-display text-[0.8rem] leading-tight text-rp-cocoa-900">
                  {task.title}
                </span>
              </span>
            </div>
          ))}
        </CreamCard>

        <p className="mt-4 font-rp-display text-base text-rp-cocoa-900">Your Islands</p>
        <div className="mt-2 flex gap-2 overflow-hidden">
          {languageIslands.slice(0, 3).map((island) => (
            <div key={island.id} className="w-16 shrink-0 rounded-rp-md border border-rp-line bg-rp-cream-100 p-2">
              <PastelIconBadge tone={island.tone} size={22}>
                <island.icon size={11} aria-hidden />
              </PastelIconBadge>
              <p className="mt-1 font-rp-display text-[0.6rem] leading-tight text-rp-cocoa-900">{island.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-rp-lg bg-rp-cocoa-800 py-2.5 text-center font-rp-display text-sm text-rp-cream-100">
          Begin Today
        </div>
      </div>

      <div className="flex justify-between border-t border-rp-line bg-rp-cream-50/90 px-3 py-2">
        {miniNav.map(({ label, Icon, active }) => (
          <div key={label} className={`flex flex-col items-center gap-0.5 ${active ? "text-rp-cocoa-900" : "text-rp-cocoa-400"}`}>
            <Icon size={14} aria-hidden />
            <span className="text-[0.5rem]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioPage() {
  return (
    <div className="font-rp-body text-rp-cocoa-900">
      <header className="border-b border-rp-line/70 bg-rp-peach-200/80 backdrop-blur supports-[backdrop-filter]:bg-rp-peach-200/60">
        <PageShell width="wide" className="flex items-center justify-between py-5">
          <span className="font-rp-display text-2xl text-rp-cocoa-900">rephrase ✦</span>
          <nav aria-label="Case study sections" className="hidden gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-rp-body text-sm text-rp-cocoa-700 transition-colors duration-150 hover:text-rp-cocoa-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <PrimaryButton href="#process" icon={<SparkleIcon size={16} aria-hidden />} className="min-h-0 py-2.5 text-base">
            View Case Study
          </PrimaryButton>
        </PageShell>
      </header>

      <main>
        <section id="overview" className="relative overflow-hidden">
          <BotanicalDecoration
            size={220}
            rotate={-8}
            className="pointer-events-none absolute -right-10 -top-10 hidden text-rp-sage-300 lg:block"
          />
          <BotanicalDecoration
            size={160}
            rotate={150}
            className="pointer-events-none absolute -bottom-10 -left-16 hidden text-rp-sage-300 lg:block"
          />
          <PageShell width="wide" className="relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[58%_42%] lg:gap-8 lg:py-24">
            <div>
              <p className="font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-700">
                <span aria-hidden="true">✦ </span>Portfolio project
              </p>
              <EditorialHeading as="h1" size="hero" className="mt-5">
                Most language apps teach phrases you never <span className="italic">actually</span> use.
              </EditorialHeading>

              <div className="my-8 flex items-center gap-4 text-rp-cocoa-400" aria-hidden="true">
                <span className="h-px flex-1 bg-rp-line-strong" />
                <SparkleIcon size={20} />
                <span className="h-px flex-1 bg-rp-line-strong" />
              </div>

              <p className="max-w-xl font-rp-body text-lg leading-relaxed text-rp-cocoa-700">
                Rephrase turns the sentences you naturally say about your own life into a personalised
                curriculum — narrated, translated, grouped into language islands, and practised through
                listening, shadowing and voice-based active recall.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <PrimaryButton href="#process" icon={<SparkleIcon size={18} aria-hidden />}>
                  View Case Study
                </PrimaryButton>
                <PrimaryButton to="/demo" variant="outline">
                  See the App →
                </PrimaryButton>
              </div>
            </div>

            <div className="relative mx-auto">
              <PhoneFrame>
                <MiniHomePreview />
              </PhoneFrame>
            </div>
          </PageShell>

          <PageShell width="wide" className="pb-16 lg:pb-24">
            <CreamCard className="grid grid-cols-1 divide-y divide-rp-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {featureHighlights.map((feature) => (
                <div key={feature.id} className="flex flex-col items-start gap-3 p-8">
                  <PastelIconBadge tone={feature.tone} size={56}>
                    <feature.icon size={24} aria-hidden />
                  </PastelIconBadge>
                  <p className="font-rp-display text-xl text-rp-cocoa-900">{feature.title}</p>
                  <p className="font-rp-body text-sm leading-relaxed text-rp-cocoa-700">{feature.description}</p>
                </div>
              ))}
            </CreamCard>
          </PageShell>
        </section>

        <section id="process" className="border-t border-rp-line/70 bg-rp-cream-100/40 py-16 lg:py-24">
          <PageShell width="wide">
            <p className="font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-700">
              The problem
            </p>
            <EditorialHeading as="h2" size="section" className="mt-4 max-w-3xl">
              Textbook phrases don't prepare you for your own life.
            </EditorialHeading>
            <p className="mt-6 max-w-2xl font-rp-body text-base leading-relaxed text-rp-cocoa-700">
              Generic vocabulary lists teach words a learner may never say. Rephrase inverts the model:
              narrate naturally, let an agentic pipeline clean, deduplicate, classify and translate what you
              actually said, then review and approve it before it enters your curriculum.
            </p>

            <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Narrate", body: "Speak naturally about daily life in short recorded segments." },
                { step: "02", title: "Process", body: "Transcribe, clean, deduplicate and classify into language islands." },
                { step: "03", title: "Review", body: "Approve, edit or discard extracted sentences before they're saved." },
                { step: "04", title: "Practise", body: "Listen, shadow and recall through adaptive, voice-first exercises." },
              ].map((item) => (
                <li key={item.step}>
                  <CreamCard className="h-full p-6">
                    <span className="font-rp-display text-sm text-rp-sage-600">{item.step}</span>
                    <p className="mt-2 font-rp-display text-xl text-rp-cocoa-900">{item.title}</p>
                    <p className="mt-2 font-rp-body text-sm leading-relaxed text-rp-cocoa-700">{item.body}</p>
                  </CreamCard>
                </li>
              ))}
            </ol>
          </PageShell>
        </section>

        <section id="design" className="border-t border-rp-line/70 py-16 lg:py-24">
          <PageShell width="wide">
            <p className="font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-700">Design</p>
            <EditorialHeading as="h2" size="section" className="mt-4 max-w-3xl">
              Calm, editorial, and unmistakably warm.
            </EditorialHeading>
            <p className="mt-6 max-w-2xl font-rp-body text-base leading-relaxed text-rp-cocoa-700">
              Large serif headlines, restrained line icons and generous negative space carry the visual
              hierarchy. Every surface stays low-contrast and warm — no bright white, pure black or neon —
              so the learning experience feels unhurried rather than gamified.
            </p>
          </PageShell>
        </section>

        <section id="impact" className="border-t border-rp-line/70 bg-rp-cream-100/40 py-16 lg:py-24">
          <PageShell width="wide">
            <p className="font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-700">Impact</p>
            <EditorialHeading as="h2" size="section" className="mt-4 max-w-3xl">
              What this project is built to demonstrate.
            </EditorialHeading>
            <p className="mt-6 max-w-2xl font-rp-body text-base leading-relaxed text-rp-cocoa-700">
              Rephrase is a portfolio project pairing an agentic FastAPI backend (LangGraph, structured
              LLM outputs, RAG over pgvector, RAGAS evaluation, Langfuse observability) with this React and
              TypeScript frontend, deployed on AWS infrastructure managed with Terraform.
            </p>
          </PageShell>
        </section>

        <section id="learnings" className="border-t border-rp-line/70 py-16 lg:py-24">
          <PageShell width="wide">
            <p className="font-rp-body text-xs font-bold uppercase tracking-[0.2em] text-rp-cocoa-700">Learnings</p>
            <EditorialHeading as="h2" size="section" className="mt-4 max-w-3xl">
              Still being built, one honest slice at a time.
            </EditorialHeading>
            <p className="mt-6 max-w-2xl font-rp-body text-base leading-relaxed text-rp-cocoa-700">
              This case study grows alongside the build. The next milestones are the narration-processing
              pipeline and voice-based active recall — both documented as they ship.
            </p>
          </PageShell>
        </section>
      </main>

      <footer className="border-t border-rp-line/70 py-10">
        <PageShell width="wide" className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-rp-display text-lg text-rp-cocoa-900">rephrase ✦</span>
          <Link to="/demo" className="font-rp-body text-sm text-rp-cocoa-700 underline-offset-4 hover:underline">
            Open the app
          </Link>
        </PageShell>
      </footer>
    </div>
  );
}
