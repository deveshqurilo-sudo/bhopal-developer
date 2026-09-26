import type { ComponentProps } from "react";

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90";
export const buttonOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border border-current px-7 py-3.5 text-sm font-semibold transition hover:bg-foreground/5";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "primary" | "outline";
};
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`${variant === "primary" ? buttonPrimary : buttonOutline} ${className}`}
      {...props}
    />
  );
}
