import { AppStatusBar } from "../../components/AppStatusBar";
import { AppTopBar } from "../../components/AppTopBar";
import { BotanicalDecoration } from "../../components/BotanicalDecoration";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PastelIconBadge } from "../../components/PastelIconBadge";
import { profileStats } from "../../data/content";
import { SparkleSmallIcon, UserIcon } from "../../icons/RephraseIcons";

const level = 6;
const levelName = "Growing Fluency";
const percentile = 28;
const progressToNext = 68;

function ProgressRing({ percentage }: { percentage: number }) {
  return (
    <div
      className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-rp-sage-600) ${percentage * 3.6}deg, var(--color-rp-peach-200) 0deg)`,
      }}
      role="img"
      aria-label={`${percentage} percent to next level`}
    >
      <div className="absolute inset-2 rounded-full bg-rp-cream-50" />
      <span className="relative text-rp-cocoa-700">
        <SparkleSmallIcon size={22} aria-hidden />
      </span>
    </div>
  );
}

export function MePage() {
  return (
    <div>
      <AppStatusBar />
      <PageShell width="mobile" className="relative pt-4">
        <AppTopBar />

        <EditorialHeading as="h1" size="title" className="mt-6 text-3xl">
          Me
        </EditorialHeading>

        <div className="relative mt-6 flex items-start gap-4">
          <div className="relative shrink-0">
            <PastelIconBadge tone="blush" size={72}>
              <UserIcon size={34} aria-hidden />
            </PastelIconBadge>
            <span
              className="absolute -bottom-1 -right-1 inline-grid h-7 w-7 place-items-center rounded-full bg-rp-blush-200 text-rp-cocoa-800"
              aria-hidden="true"
            >
              <SparkleSmallIcon size={14} aria-hidden />
            </span>
          </div>
          <div>
            <p className="font-rp-display text-2xl text-rp-cocoa-900">Sofia</p>
            <p className="font-rp-body text-sm text-rp-cocoa-600">
              Lifelong learner <span aria-hidden="true">✦</span>
            </p>
            <p className="mt-2 max-w-[16rem] font-rp-body text-sm leading-relaxed text-rp-cocoa-700">
              You're building real fluency, one moment at a time.
            </p>
          </div>
          <BotanicalDecoration
            size={90}
            className="pointer-events-none absolute -right-2 -top-4 hidden text-rp-sage-300 xs:block"
          />
        </div>

        <CreamCard className="mt-6 p-5">
          <div className="flex items-center justify-between">
            <p className="font-rp-display text-lg text-rp-cocoa-900">Your Progress</p>
            <button
              type="button"
              className="font-rp-body text-xs font-bold text-rp-cocoa-700 underline-offset-4 hover:underline"
            >
              View summary
            </button>
          </div>
          <div className="mt-4 flex items-center gap-5">
            <ProgressRing percentage={progressToNext} />
            <div className="flex-1">
              <p className="font-rp-display text-lg text-rp-cocoa-900">
                Level {level} · {levelName}
              </p>
              <p className="mt-1 font-rp-body text-xs text-rp-cocoa-600">
                You're in the top {percentile}% of learners
              </p>
              <div className="mt-3 h-2 rounded-full bg-rp-peach-200">
                <div
                  className="h-full rounded-full bg-rp-sage-600"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="mt-2 font-rp-body text-xs text-rp-cocoa-600">{progressToNext}% to next level</p>
            </div>
          </div>
        </CreamCard>

        <ul className="mt-6 grid grid-cols-2 gap-3">
          {profileStats.map((stat) => (
            <li key={stat.id}>
              <CreamCard className="flex h-full flex-col gap-2 p-4">
                <PastelIconBadge tone={stat.tone} size={40}>
                  <stat.icon size={18} aria-hidden />
                </PastelIconBadge>
                <span className="font-rp-display text-2xl text-rp-cocoa-900">{stat.value}</span>
                <span className="font-rp-body text-xs font-bold text-rp-cocoa-800">{stat.label}</span>
                <span className="font-rp-body text-[0.7rem] text-rp-cocoa-600">{stat.sublabel}</span>
              </CreamCard>
            </li>
          ))}
        </ul>

        <CreamCard className="relative mt-6 overflow-hidden p-6 text-center">
          <BotanicalDecoration
            size={110}
            rotate={20}
            className="absolute -bottom-6 -right-6 text-rp-sage-300"
          />
          <p className="relative font-rp-display text-xl italic leading-snug text-rp-cocoa-900">
            "Language is the bridge between where you are and who you can become."
          </p>
        </CreamCard>
      </PageShell>
    </div>
  );
}
