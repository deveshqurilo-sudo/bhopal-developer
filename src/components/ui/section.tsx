import type { ComponentProps } from "react";

export function Section({
  children,
  className = "",
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={`px-5 py-20 md:px-8 md:py-28 ${className}`} {...props}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
