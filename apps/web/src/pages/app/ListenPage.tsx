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
import { playlists } from "../../data/content";
import { ChevronRightIcon, PauseIcon, PlayIcon, SparkleIcon, WaveformIcon } from "../../icons/RephraseIcons";

export function ListenPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const nowPlaying = playlists[0];

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
          Listen
        </EditorialHeading>
        <SectionDivider className="mt-4 max-w-[220px]" />
        <p className="mt-4 max-w-xs font-rp-body text-sm leading-relaxed text-rp-cocoa-700">
          Choose a playlist and let your own sentences become effortless listening practice.
        </p>

        <section className="mt-8" aria-labelledby="playlists-heading">
          <EditorialHeading as="h2" id="playlists-heading" size="title" className="text-xl">
            Playlists
          </EditorialHeading>
          <CreamCard as="ul" className="mt-4 divide-y divide-rp-line">
            {playlists.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/demo/listen/session/${item.id}`}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-rp-cream-50"
                >
                  <PastelIconBadge tone={item.tone}>
                    <item.icon size={20} aria-hidden />
                  </PastelIconBadge>
                  <span className="flex-1">
                    <span className="block font-rp-display text-lg text-rp-cocoa-900">{item.title}</span>
                    <span className="block font-rp-body text-xs text-rp-cocoa-600">
                      {item.sentenceCount} sentences · {item.duration}
                    </span>
                  </span>
                  <ChevronRightIcon size={18} className="shrink-0 text-rp-cocoa-500" aria-hidden />
                </Link>
              </li>
            ))}
          </CreamCard>
        </section>

        <CreamCard className="mt-6 flex items-center gap-4 p-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-rp-md bg-rp-peach-200 text-rp-cocoa-700"
            aria-hidden="true"
          >
            <WaveformIcon size={24} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-rp-body text-[0.65rem] font-bold uppercase tracking-wide text-rp-cocoa-500">
              Now playing
            </p>
            <p className="truncate font-rp-display text-lg text-rp-cocoa-900">{nowPlaying.title}</p>
            <p className="font-rp-body text-xs text-rp-cocoa-600">Track 3 of {nowPlaying.sentenceCount}</p>
            <div className="mt-2 h-1.5 rounded-full bg-rp-peach-300">
              <div className="h-full w-2/5 rounded-full bg-rp-cocoa-800" />
            </div>
            <div className="mt-1 flex justify-between font-rp-body text-[0.65rem] text-rp-cocoa-500">
              <span>03:28</span>
              <span>{nowPlaying.duration}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPlaying((v) => !v)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rp-blush-200 text-rp-cocoa-800 transition-transform duration-150 hover:-translate-y-0.5"
          >
            {isPlaying ? <PauseIcon size={18} aria-hidden /> : <PlayIcon size={18} aria-hidden />}
          </button>
        </CreamCard>

        <PrimaryButton
          icon={<SparkleIcon size={18} aria-hidden />}
          trailingIcon={<ChevronRightIcon size={18} aria-hidden />}
          className="mt-8 w-full"
          to={`/demo/listen/session/${nowPlaying.id}`}
        >
          Start Listening
        </PrimaryButton>
      </PageShell>
    </div>
  );
}
