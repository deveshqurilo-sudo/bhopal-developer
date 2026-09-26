"use client";

import Image from "next/image";
import { Film, Play, RotateCcw, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { VideoConfig } from "@/config/site";
import { getMediaUrl } from "../lib/media-url";

export function ProjectVideo({ video }: { video: VideoConfig }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = getMediaUrl(video.src);

  useEffect(() => {
    if (!started) return;
    const player = videoRef.current;
    player?.focus();
    // Playback follows an explicit click. Native controls remain if the browser blocks it.
    void player?.play().catch(() => undefined);
  }, [started]);

  return (
    <article className="min-w-0 overflow-hidden rounded-3xl bg-ink text-ink-foreground shadow-soft">
      <div className="relative aspect-video bg-ink">
        {started && src ? (
          <video
            ref={videoRef}
            src={src}
            poster={video.poster}
            controls
            playsInline
            preload="none"
            tabIndex={0}
            aria-label={video.title}
            onError={() => setFailed(true)}
            className="h-full w-full object-contain focus-visible:-outline-offset-4 focus-visible:outline-ink-foreground"
          >
            {video.captions.map((track) => (
              <track
                key={`${track.language}-${track.src}`}
                kind="captions"
                src={track.src}
                srcLang={track.language}
                label={track.label}
                default={track.default}
              />
            ))}
            Your browser does not support this video.{" "}
            <a href={src}>Open video</a>.
          </video>
        ) : (
          <>
            <Image
              src={video.poster}
              alt="Preview of the project walkthrough"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/10" />
            {src ? (
              <button
                type="button"
                onClick={() => setStarted(true)}
                aria-label={`Play project film: ${video.title}`}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-4 focus-visible:-outline-offset-4 focus-visible:outline-ink-foreground"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full border border-ink-foreground/40 bg-card/15 backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-card/25 md:h-20 md:w-20">
                  <Play className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7" />
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] uppercase">
                  Watch the film
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-ink-foreground/30 bg-card/10 backdrop-blur-sm md:h-20 md:w-20">
                  <Film className="h-7 w-7" />
                </span>
                <p className="rounded-full bg-ink/60 px-4 py-2 text-xs font-medium">
                  Project film coming soon
                </p>
              </div>
            )}
            {video.durationLabel && src && (
              <span className="absolute right-4 bottom-4 rounded-full bg-ink/70 px-3 py-1 text-xs tabular-nums">
                {video.durationLabel}
              </span>
            )}
          </>
        )}
      </div>
      {failed && src && (
        <div
          role="alert"
          className="border-t border-ink-foreground/15 px-6 py-5 text-sm md:px-8"
        >
          <p>
            The video couldn&apos;t load. Please try again or open it in a new
            tab.
          </p>
          <div className="mt-3 flex flex-wrap gap-5">
            <button
              type="button"
              className="inline-flex items-center gap-2 underline underline-offset-4"
              onClick={() => {
                setFailed(false);
                setStarted(false);
              }}
            >
              <RotateCcw className="h-4 w-4" />
              Back to player
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 underline underline-offset-4"
            >
              Open video
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
      <div className="p-6 md:p-8">
        <p className="text-[0.72rem] font-semibold tracking-[0.22em] uppercase opacity-60">
          The project film
        </p>
        <h3 className="mt-3 text-3xl md:text-4xl">{video.title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed opacity-70">
          A sense of the surroundings. A feel for the space. Discover the
          project before you experience it in person.
        </p>
      </div>
    </article>
  );
}
