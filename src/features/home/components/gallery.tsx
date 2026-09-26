"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "../data/content";
import { Section } from "@/components/ui/section";

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const open = selected !== null;
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  function navigate(direction: number) {
    setSelected((index) =>
      index === null
        ? null
        : (index + direction + gallery.length) % gallery.length,
    );
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1);
    }
  }
  const active = selected === null ? null : gallery[selected];
  return (
    <>
      <Section
        className="bg-secondary/60 !pt-20"
        aria-labelledby="gallery-heading"
      >
        <h2 id="gallery-heading" className="text-4xl md:text-6xl">
          Experience the Projects
        </h2>
        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {gallery.map((item, index) => (
            <button
              key={item.alt}
              type="button"
              aria-label={`View ${item.alt}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelected(index);
              }}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={item.tall ? 1000 : 600}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${item.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.alt}
              </span>
            </button>
          ))}
        </div>
      </Section>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Project image gallery"
        aria-describedby="gallery-caption"
        onCancel={(event) => {
          event.preventDefault();
          setSelected(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
        onKeyDown={handleKeyDown}
      >
        {active && (
          <>
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 rounded-full p-3 text-ink-foreground focus-visible:outline-ink-foreground"
            >
              <X />
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => navigate(-1)}
              className="absolute left-2 z-10 rounded-full bg-ink/50 p-3 text-ink-foreground focus-visible:outline-ink-foreground md:left-5"
            >
              <ChevronLeft />
            </button>
            <figure className="max-w-5xl">
              <Image
                src={active.src}
                alt={active.alt}
                width={1920}
                height={1088}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="max-h-[80vh] w-auto rounded-2xl object-contain"
              />
              <figcaption
                id="gallery-caption"
                aria-live="polite"
                className="mt-3 text-center text-sm text-ink-foreground/80"
              >
                {active.alt}{" "}
                <span className="ml-2 opacity-60">
                  {(selected ?? 0) + 1} / {gallery.length}
                </span>
              </figcaption>
            </figure>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => navigate(1)}
              className="absolute right-2 z-10 rounded-full bg-ink/50 p-3 text-ink-foreground focus-visible:outline-ink-foreground md:right-5"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
