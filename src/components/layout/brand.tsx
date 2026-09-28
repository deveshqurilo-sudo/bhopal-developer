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
      className={`flex items-center gap-2 font-display text-2xl ${light ? "text-ink-foreground" : "text-foreground"}`}
      aria-label={`${siteConfig.name} home`}
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm text-primary-foreground"
      >
        B
      </span>
      {siteConfig.name}
    </a>
  );
}
