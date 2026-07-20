import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppStatusBar } from "../../components/AppStatusBar";
import { BotanicalDecoration } from "../../components/BotanicalDecoration";
import { CreamCard } from "../../components/CreamCard";
import { EditorialHeading } from "../../components/EditorialHeading";
import { PageShell } from "../../components/PageShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ChevronRightIcon, PauseIcon, PlayIcon, SparkleIcon, WaveformIcon } from "../../icons/RephraseIcons";
import { playlists, TARGET_LANGUAGE_CODE } from "../../data/content";

const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;

function parseDurationSeconds(duration: string) {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + (seconds || 0);
}

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function ListenSessionPage() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const playlist = playlists.find((item) => item.id === playlistId) ?? playlists[0];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [complete, setComplete] = useState(false);

  const track = playlist.tracks[trackIndex];
  const isFirst = trackIndex === 0;
  const trackSeconds = parseDurationSeconds(track.duration);

  function goToPrevious() {
    setComplete(false);
    setTrackIndex((index) => Math.max(0, index - 1));
  }

  function goToNext() {
    setTrackIndex((index) => {
      if (index >= playlist.tracks.length - 1) {
        setIsPlaying(false);
        setComplete(true);
        return index;
      }
      return index + 1;
    });
  }

  function replay() {
    setComplete(false);
    setTrackIndex(0);
    setElapsed(0);
    setIsPlaying(true);
  }

  function togglePlaying() {
    if (speechSupported) {
      if (isPlaying) window.speechSynthesis.pause();
      else window.speechSynthesis.resume();
    }
    setIsPlaying((v) => !v);
  }

  // Reset the progress bar whenever the track changes.
  useEffect(() => {
    setElapsed(0);
  }, [trackIndex]);

  // Speak each sentence aloud and auto-advance to the next one when it finishes,
  // so the whole playlist keeps playing hands-free once it's started — perfect
  // for the car, on a bus or train, in the shower, or washing up.
  useEffect(() => {
    if (!isPlaying || complete) return undefined;

    if (speechSupported) {
      const utterance = new SpeechSynthesisUtterance(track.phrase);
      utterance.lang = TARGET_LANGUAGE_CODE;
      utterance.rate = 0.95;
      utterance.onend = () => goToNext();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      return () => {
        utterance.onend = null;
        window.speechSynthesis.cancel();
      };
    }

    // Fallback for browsers without speech synthesis support: still auto-advance
    // using the track's listed duration so playback never needs a screen tap.
    const timeout = setTimeout(goToNext, trackSeconds * 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, isPlaying, complete]);

  // Keep the progress bar moving while playing.
  useEffect(() => {
    if (!isPlaying || complete) return undefined;
    const interval = setInterval(() => {
      setElapsed((seconds) => Math.min(trackSeconds, seconds + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, complete, trackSeconds]);

  // Expose lock-screen / bluetooth / steering-wheel media controls so playback
  // can be driven without ever looking at or touching the screen.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return undefined;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.phrase,
      artist: playlist.title,
      album: "Rephrase",
    });
    navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true));
    navigator.mediaSession.setActionHandler("pause", () => setIsPlaying(false));
    navigator.mediaSession.setActionHandler("previoustrack", goToPrevious);
    navigator.mediaSession.setActionHandler("nexttrack", goToNext);
    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.phrase, playlist.title]);

  return (
    <div className="min-h-screen bg-rp-peach-200 font-rp-body text-rp-cocoa-900">
      <AppStatusBar />
      <PageShell width="mobile" className="relative flex min-h-[calc(100vh-2rem)] flex-col pt-4 pb-10">
        <div className="flex items-center justify-between">
          <Link
            to="/demo/listen"
            aria-label="Back to Listen"
            className="grid h-10 w-10 place-items-center rounded-full border border-rp-line-strong text-rp-cocoa-800 transition-transform duration-150 hover:-translate-y-0.5"
          >
            <ChevronRightIcon size={18} className="rotate-180" aria-hidden />
          </Link>
          <p className="font-rp-body text-[0.65rem] font-bold uppercase tracking-wide text-rp-cocoa-500">
            {complete ? "Playlist Complete" : "Now Playing"}
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
              All Caught Up
            </EditorialHeading>
            <p className="mt-3 max-w-xs font-rp-body text-sm leading-relaxed text-rp-cocoa-700">
              You've listened through every sentence in {playlist.title}.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3">
              <PrimaryButton icon={<SparkleIcon size={18} aria-hidden />} onClick={replay}>
                Replay Playlist
              </PrimaryButton>
              <PrimaryButton to="/demo/listen" variant="outline">
                Done
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 flex flex-1 flex-col items-center text-center" aria-live="polite">
              <div
                className={`grid h-56 w-56 place-items-center rounded-full bg-gradient-to-br from-rp-blush-200 via-rp-peach-300 to-rp-butter-200 shadow-rp-card ${
                  isPlaying ? "animate-pulse motion-reduce:animate-none" : ""
                }`}
              >
                <WaveformIcon size={64} className="text-rp-cocoa-800" aria-hidden />
              </div>

              <p className="mt-8 font-rp-body text-xs font-bold uppercase tracking-wide text-rp-cocoa-500">
                {playlist.title}
              </p>
              <EditorialHeading as="h1" size="title" className="mt-2 max-w-xs text-2xl">
                {track.phrase}
              </EditorialHeading>
              <p className="mt-2 max-w-xs font-rp-body text-sm italic text-rp-cocoa-600">
                "{track.title}"
              </p>
              <p className="mt-2 font-rp-body text-sm text-rp-cocoa-600">
                Track {trackIndex + 1} of {playlist.tracks.length}
              </p>

              <CreamCard className="mt-8 w-full p-4">
                <div className="h-1.5 rounded-full bg-rp-peach-300">
                  <div
                    className="h-full rounded-full bg-rp-cocoa-800 transition-all duration-1000 linear"
                    style={{ width: `${(elapsed / trackSeconds) * 100}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between font-rp-body text-[0.65rem] text-rp-cocoa-500">
                  <span>{formatSeconds(elapsed)}</span>
                  <span>{track.duration}</span>
                </div>
              </CreamCard>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={isFirst}
                aria-label="Previous track"
                className="grid h-14 w-14 place-items-center rounded-full text-rp-cocoa-700 transition-transform duration-150 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRightIcon size={26} className="rotate-180" aria-hidden />
              </button>
              <button
                type="button"
                onClick={togglePlaying}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="grid h-20 w-20 place-items-center rounded-full bg-rp-cocoa-800 text-rp-cream-100 shadow-[0_14px_28px_rgba(87,47,32,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                {isPlaying ? <PauseIcon size={28} aria-hidden /> : <PlayIcon size={28} aria-hidden />}
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next track"
                className="grid h-14 w-14 place-items-center rounded-full text-rp-cocoa-700 transition-transform duration-150 hover:-translate-y-0.5"
              >
                <ChevronRightIcon size={26} aria-hidden />
              </button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-center font-rp-body text-xs text-rp-cocoa-500">
              <span aria-hidden="true">✦</span>
              Hands-free — sit back and let the playlist play through
              <span aria-hidden="true">✦</span>
            </p>
          </>
        )}
      </PageShell>
    </div>
  );
}
