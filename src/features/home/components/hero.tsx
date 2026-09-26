import Image from "next/image";
import { siteImages } from "@/config/site";
import { ButtonLink } from "@/components/ui/button-link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <Image
        src={siteImages.hero}
        alt="Farmhouse development surrounded by greenery near Bhopal"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-40 pt-32 text-ink-foreground md:px-8 md:pb-48">
        <p className="text-xs font-semibold tracking-[0.25em] opacity-90">
          PREMIUM PLOTS &amp; FARMHOUSES IN BHOPAL
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] md:text-7xl lg:text-8xl">
          Find Your Space.
          <br />
          <em className="font-light">Build Your Future.</em>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed opacity-85 md:text-lg">
          Premium plotted developments and farmhouse projects in and around
          Bhopal, thoughtfully planned for living, investment and long-term
          value.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#projects">Explore Projects</ButtonLink>
          <ButtonLink
            href="#enquiry"
            variant="outline"
            className="text-ink-foreground hover:bg-ink-foreground/10"
          >
            Book a Site Visit
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs tracking-wide opacity-75">
          Site Visits Available • Project Assistance • Direct Enquiry
        </p>
      </div>
    </section>
  );
}
