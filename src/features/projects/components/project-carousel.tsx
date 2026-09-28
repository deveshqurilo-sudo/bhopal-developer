"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string };

export function ProjectCarousel({
  images,
  projectName,
  note,
}: {
  images: readonly GalleryImage[];
  projectName: string;
  note: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const expandButton = expandRef.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      expandButton?.focus();
    };
  }, [open]);

  const move = useCallback(
    (step: number) => {
      setIndex((current) => (current + step + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, open]);

  const selected = images[index];
  return (
    <div aria-label={`${projectName} image gallery`}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-secondary sm:aspect-[2/1]">
        <Image
          src={selected.src}
          alt={`${projectName}: ${selected.alt}`}
          fill
          preload
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous project image"
          className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-sm transition hover:bg-background sm:left-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next project image"
          className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-sm transition hover:bg-background sm:right-5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          ref={expandRef}
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-xs font-semibold shadow-sm hover:bg-background"
        >
          <Expand className="h-4 w-4" />
          View full screen
        </button>
        <span
          aria-live="polite"
          className="absolute bottom-4 left-4 rounded-full bg-ink/65 px-3 py-1.5 text-xs text-ink-foreground"
        >
          {index + 1} / {images.length}
        </span>
      </div>
      <div
        className="mt-4 flex gap-3 overflow-x-auto p-1"
        aria-label="Choose project image"
      >
        {images.map((image, imageIndex) => (
          <button
            key={`${image.src}-${imageIndex}`}
            type="button"
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show image ${imageIndex + 1}: ${image.alt}`}
            aria-current={imageIndex === index ? "true" : undefined}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-32 ${imageIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"}`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="128px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{note}</p>
      <dialog
        ref={dialogRef}
        aria-label={`${projectName} image viewer`}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="lightbox"
      >
        {open && (
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close image viewer"
              className="absolute top-4 right-4 z-10 rounded-full bg-ink/60 p-3 text-white"
            >
              <X />
            </button>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous image"
              className="absolute left-3 z-10 rounded-full bg-ink/60 p-3 text-white"
            >
              <ChevronLeft />
            </button>
            <figure className="max-w-6xl">
              <Image
                src={selected.src}
                alt={`${projectName}: ${selected.alt}`}
                width={1920}
                height={1088}
                sizes="100vw"
                className="max-h-[80vh] w-auto rounded-2xl object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-ink-foreground">
                {selected.alt} · {index + 1} / {images.length}
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next image"
              className="absolute right-3 z-10 rounded-full bg-ink/60 p-3 text-white"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}
