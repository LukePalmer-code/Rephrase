import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppStatusBar } from "../../components/AppStatusBar";
import { BotanicalDecoration } from "../../components/BotanicalDecoration";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ChevronRightIcon, MicrophoneIcon, SparkleIcon } from "../../icons/RephraseIcons";
import { practiceSets } from "../../data/content";

type Phase = "prompt" | "recording" | "revealed";

export function RecallSessionPage() {
  const { setId } = useParams<{ setId: string }>();
  const practiceSet = practiceSets.find((item) => item.id === setId) ?? practiceSets[0];
  const cards = practiceSet.cardItems;

  const [cardIndex, setCardIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("prompt");
  const [correctCount, setCorrectCount] = useState(0);
  const [complete, setComplete] = useState(false);

  const card = cards[cardIndex];
  const isLastCard = cardIndex === cards.length - 1;

  function handleMicTap() {
    if (phase !== "prompt") return;
    setPhase("recording");
    setTimeout(() => setPhase("revealed"), 1200);
  }

  function advance(gotItRight: boolean) {
    if (gotItRight) setCorrectCount((count) => count + 1);
    if (isLastCard) {
      setComplete(true);
      return;
    }
    setCardIndex((index) => index + 1);
    setPhase("prompt");
  }

  function restart() {
    setCardIndex(0);
    setPhase("prompt");
    setCorrectCount(0);
    setComplete(false);
  }

  const accuracy = Math.round((correctCount / cards.length) * 100);

  return (
    <div className="min-h-screen bg-rp-peach-200 font-rp-body text-rp-cocoa-900">
      <AppStatusBar />
      <PageShell width="mobile" className="relative flex min-h-[calc(100vh-2rem)] flex-col pt-4 pb-10">
        <div className="flex items-center justify-between">
          <Link
            to="/demo/recall"
            aria-label="Back to Recall"
            className="grid h-10 w-10 place-items-center rounded-full border border-rp-line-strong text-rp-cocoa-800 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <ChevronRightIcon size={18} className="rotate-180" aria-hidden />
          </Link>
          <p className="font-rp-body text-[0.65rem] font-bold uppercase tracking-wide text-rp-cocoa-500">
            {practiceSet.title}
          </p>
          <span className="h-10 w-10" aria-hidden="true" />
        </div>

        <BotanicalDecoration
          size={70}
          className="pointer-events-none absolute right-5 top-16 text-rp-sage-300"
        />

        {complete ? (
          <div className="mt-16 flex flex-1 flex-col items-center text-center">
            <SparkleIcon size={36} className="text-rp-cocoa-700" aria-hidden />
            <EditorialHeading as="h1" size="title" className="mt-4 text-3xl">
              Session Complete
            </EditorialHeading>
            <p className="mt-3 max-w-xs font-rp-body text-sm leading-relaxed text-rp-cocoa-700">
              You recalled {correctCount} of {cards.length} sentences correctly.
            </p>
            <CreamCard className="mt-8 w-full p-6">
              <p className="font-rp-display text-4xl text-rp-cocoa-900">{accuracy}%</p>
              <p className="mt-1 font-rp-body text-xs uppercase tracking-wide text-rp-cocoa-500">
                Session accuracy
              </p>
            </CreamCard>
            <div className="mt-8 flex w-full flex-col gap-3">
              <PrimaryButton icon={<SparkleIcon size={18} aria-hidden />} onClick={restart}>
                Practice Again
              </PrimaryButton>
              <PrimaryButton to="/demo/recall" variant="outline">
                Done
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-6 text-center font-rp-body text-sm text-rp-cocoa-600">
              Card {cardIndex + 1} of {cards.length}
            </p>
            <div className="mt-2 h-1.5 rounded-full bg-rp-peach-300">
              <div
                className="h-full rounded-full bg-rp-cocoa-800 transition-all duration-300"
                style={{ width: `${((cardIndex + (phase === "revealed" ? 1 : 0)) / cards.length) * 100}%` }}
              />
            </div>

            <div className="mt-10 flex flex-1 flex-col items-center text-center">
              <p className="font-rp-body text-xs font-bold uppercase tracking-wide text-rp-sage-600">
                Recall the translation
              </p>
              <p className="mt-4 max-w-xs font-rp-display text-3xl leading-tight text-rp-cocoa-900">
                {card.sentence}
              </p>

              {phase === "revealed" && (
                <CreamCard className="mt-8 w-full p-5" aria-live="polite">
                  <p className="font-rp-body text-sm italic leading-relaxed text-rp-cocoa-700">
                    {card.translation}
                  </p>
                </CreamCard>
              )}
            </div>

            {phase !== "revealed" ? (
              <div className="mt-8 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleMicTap}
                  aria-label={phase === "recording" ? "Listening" : "Tap to recall aloud"}
                  className={`grid h-24 w-24 place-items-center rounded-full border border-rp-line-strong bg-rp-cream-100/60 p-2 transition-transform duration-150 hover:-translate-y-0.5 ${
                    phase === "recording" ? "animate-pulse motion-reduce:animate-none" : ""
                  }`}
                >
                  <span className="grid h-full w-full place-items-center rounded-full bg-rp-cocoa-800 text-rp-cream-100 shadow-[0_14px_28px_rgba(87,47,32,0.28)]">
                    <MicrophoneIcon size={30} aria-hidden />
                  </span>
                </button>
                <p className="mt-3 flex items-center justify-center gap-2 text-center font-rp-body text-xs text-rp-cocoa-500">
                  <span aria-hidden="true">✦</span>
                  {phase === "recording" ? "Listening…" : "Tap to recall aloud"}
                  <span aria-hidden="true">✦</span>
                </p>
              </div>
            ) : (
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => advance(false)}
                  className="flex-1 rounded-full border border-rp-line-strong px-4 py-3 font-rp-body text-sm font-bold text-rp-cocoa-800 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Needed Help
                </button>
                <button
                  type="button"
                  onClick={() => advance(true)}
                  className="flex-1 rounded-full bg-rp-cocoa-800 px-4 py-3 font-rp-body text-sm font-bold text-rp-cream-100 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Got It Right
                </button>
              </div>
            )}
          </>
        )}
      </PageShell>
    </div>
  );
}
