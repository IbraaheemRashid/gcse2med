"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Video } from "@/content/video";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/* useSyncExternalStore rather than an effect that calls setState: the
   preference is external state that can change mid-visit, and React 19 flags
   the set-state-in-effect form. Same approach as the saved-attempt store in
   components/assessment/savedAttempt.ts. */
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

/**
 * A 9:16 player shaped like the feed these clips were filmed for.
 *
 * `feed` mode autoplays muted while the clip is on screen and pauses when it
 * scrolls away — the behaviour people already expect from a vertical video,
 * and it keeps a phone from downloading a clip nobody scrolled to. `click`
 * mode is for anything long enough that starting it should be a decision:
 * poster until tapped, then sound on, because someone who pressed play meant
 * to watch it.
 *
 * Both recordings carry burned-in captions, so muted playback still reads. The
 * text equivalent for anyone who cannot see them is rendered by the caller from
 * `video.summary`.
 */
export function VerticalVideo({
  video,
  mode = "feed",
  className = "",
}: {
  video: Video;
  mode?: "feed" | "click";
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(mode === "feed");
  const [started, setStarted] = useState(mode === "feed");
  const [progress, setProgress] = useState(0);

  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    // Server render assumes no preference: the markup is identical either way,
    // since what the preference changes is whether playback starts, not what
    // is on the page.
    () => false,
  );

  const autoplays = mode === "feed" && !reduced;

  /* Play only while on screen. Without this every vertical video on the page
     downloads and decodes at once, which on a phone is the difference between
     a page that scrolls and one that stutters. */
  useEffect(() => {
    const el = ref.current;
    if (!el || !autoplays) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Rejects when the browser declines to autoplay; nothing to recover,
          // the poster and the play control are already there.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoplays]);

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setStarted(true);
    if (el.paused) {
      if (mode === "click") {
        el.muted = false;
        setMuted(false);
      }
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [mode]);

  const toggleMute = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) el.play().catch(() => {});
  }, []);

  return (
    <div
      className={`relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[1.75rem] bg-ink-900 shadow-lift ring-1 ring-ink-900/10 sm:max-w-[380px] ${className}`}
      style={{ maxHeight: "70vh" }}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted={muted}
        loop={mode === "feed"}
        playsInline
        preload={mode === "feed" ? "metadata" : "none"}
        aria-label={video.label}
        className="h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration) setProgress((el.currentTime / el.duration) * 100);
        }}
      />

      {/* One button over the whole frame: tapping anywhere is how these players
          behave, and it gives keyboard users a single obvious target. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${video.label}` : `Play: ${video.label}`}
        className="absolute inset-0 flex items-center justify-center focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-6px] focus-visible:outline-accent-400"
      >
        {!playing || !started ? (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lift">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-ink-900">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : null}
      </button>

      {playing ? (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-ink-900/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-ink-900/85 focus-visible:outline focus-visible:outline-3 focus-visible:outline-accent-400"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
            {muted ? (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3l2.7-2.7-1.4-1.4L15.2 10.6 12.5 7.9l-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4L16.6 12z" />
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 2v2a8 8 0 010 16v2a10 10 0 000-20z" />
            )}
          </svg>
          {muted ? "Tap for sound" : "Sound on"}
        </button>
      ) : null}

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
        <div className="h-full bg-accent-400 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
