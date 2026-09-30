import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Brand({
  light = false,
  href = "#home",
}: {
  light?: boolean;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-w-0 shrink-0 items-center gap-2.5 ${light ? "text-ink-foreground" : "text-foreground"}`}
      aria-label={`${siteConfig.name} home`}
    >
      <span
        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm"
        aria-hidden="true"
      >
        <Image
          src={siteConfig.brand.logo}
          alt=""
          width={145}
          height={145}
          className="absolute top-1/2 left-1/2 max-w-none"
          style={{ transform: "translate(-50%, -34%)" }}
        />
      </span>
      <span className="min-w-0 leading-none">
        <span className="block whitespace-nowrap font-display text-[1.45rem] font-semibold tracking-wide sm:text-[1.7rem]">
          {siteConfig.brand.name}
        </span>
        <span className="mt-1 block whitespace-nowrap font-sans text-[0.55rem] font-bold tracking-[0.12em] uppercase sm:text-[0.65rem]">
          {siteConfig.brand.descriptor}
        </span>
      </span>
    </a>
  );
}
