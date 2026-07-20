import { useEffect, useState } from "react";
import { AppStatusBar } from "../../components/AppStatusBar";
import { AppTopBar } from "../../components/AppTopBar";
import { BotanicalDecoration } from "../../components/BotanicalDecoration";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { SectionDivider } from "../../components/SectionDivider";
import { MicrophoneIcon, SparkleSmallIcon, WaveformIcon } from "../../icons/RephraseIcons";

type Status = "idle" | "recording" | "paused";

const rawLine = "I had breakfast with my friend before work.";
const refinedLine = "I had breakfast with a friend before going to work.";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function NarratePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [seconds, setSeconds] = useState(0);
  const [showRaw, setShowRaw] = useState(false);
  const [showRefined, setShowRefined] = useState(false);

  useEffect(() => {
    if (status !== "recording") return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== "recording" || showRaw) return;
    const timeout = setTimeout(() => setShowRaw(true), 1400);
    return () => clearTimeout(timeout);
  }, [status, showRaw]);

  useEffect(() => {
    if (!showRaw || showRefined) return;
    const timeout = setTimeout(() => setShowRefined(true), 1600);
    return () => clearTimeout(timeout);
  }, [showRaw, showRefined]);

  const isRecording = status === "recording";

  function handlePrimaryTap() {
    if (status === "idle" || status === "paused") {
      setStatus("recording");
    } else {
      setStatus("idle");
      setSeconds(0);
      setShowRaw(false);
      setShowRefined(false);
    }
  }

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
          Narrate
        </EditorialHeading>
        <SectionDivider className="mt-4 max-w-[220px]" />
        <p className="mt-4 max-w-xs font-rp-body text-sm leading-relaxed text-rp-cocoa-700">
          Speak naturally about your day. We'll turn it into sentences you can learn from.
        </p>

        <div className="mt-10 flex flex-col items-center">
          <div
            className={`grid h-48 w-48 place-items-center rounded-full bg-gradient-to-br from-rp-blush-200 via-rp-peach-300 to-rp-butter-200 shadow-rp-card ${
              isRecording ? "animate-pulse motion-reduce:animate-none" : ""
            }`}
          >
            <WaveformIcon size={56} className="text-rp-cocoa-800" aria-hidden />
          </div>
          <p className="mt-5 flex items-center gap-2 font-rp-display text-2xl text-rp-cocoa-900">
            {isRecording && <WaveformIcon size={20} className="text-rp-cocoa-600" aria-hidden />}
            {status === "idle" && "Ready when you are"}
            {status === "recording" && "Listening…"}
            {status === "paused" && "Paused"}
          </p>
          <p className="mt-1 font-rp-body text-sm text-rp-cocoa-600">{formatTime(seconds)}</p>
        </div>

        {showRaw && (
          <CreamCard className="mt-8 divide-y divide-rp-line p-0 text-left" aria-live="polite">
            <div className="flex items-start gap-3 p-4">
              <span
                className="mt-0.5 inline-grid h-8 w-8 shrink-0 place-items-center rounded-full bg-rp-blush-200 text-rp-cocoa-800"
                aria-hidden="true"
              >
                <SparkleSmallIcon size={16} aria-hidden />
              </span>
              <p className="flex-1 font-rp-body text-sm leading-relaxed text-rp-cocoa-800">{rawLine}</p>
              <span className="shrink-0 rounded-full bg-rp-blush-200 px-2.5 py-1 font-rp-body text-[0.65rem] font-bold uppercase tracking-wide text-rp-cocoa-800">
                Live
              </span>
            </div>
            {showRefined && (
              <div className="flex items-start gap-3 p-4">
                <span
                  className="mt-0.5 inline-grid h-8 w-8 shrink-0 place-items-center rounded-full bg-rp-sage-100 text-rp-cocoa-800"
                  aria-hidden="true"
                >
                  <SparkleSmallIcon size={16} aria-hidden />
                </span>
                <p className="flex-1 font-rp-body text-sm italic leading-relaxed text-rp-cocoa-700">
                  {refinedLine}
                </p>
              </div>
            )}
          </CreamCard>
        )}

        <div className="mt-10 flex items-center justify-center">
          <button
            type="button"
            onClick={handlePrimaryTap}
            aria-label={status === "idle" ? "Start narrating" : "Stop narrating"}
            className="grid h-24 w-24 place-items-center rounded-full border border-rp-line-strong bg-rp-cream-100/60 p-2 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <span className="grid h-full w-full place-items-center rounded-full bg-rp-cocoa-800 text-rp-cream-100 shadow-[0_14px_28px_rgba(87,47,32,0.28)]">
              <MicrophoneIcon size={30} aria-hidden />
            </span>
          </button>
        </div>
        <p className="mt-3 flex items-center justify-center gap-2 text-center font-rp-body text-xs text-rp-cocoa-500">
          <span aria-hidden="true">✦</span>
          {status === "idle" ? "Tap to start" : "Tap to stop"}
          <span aria-hidden="true">✦</span>
        </p>
      </PageShell>
    </div>
  );
}
