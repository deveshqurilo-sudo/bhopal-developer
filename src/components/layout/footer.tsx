import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { Brand } from "./brand";

type SocialNetwork = "Instagram" | "Facebook";

function SocialIcon({ network }: { network: SocialNetwork }) {
  if (network === "Instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="6" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M16.7 12.9h-3V22H9.6v-9.1H7V9.2h2.6V6.7C9.6 3.5 11 2 14 2h3v3.7h-1.9c-1.4 0-1.5.5-1.5 1.5v2h3.3l-.2 3.7Z" />
    </svg>
  );
}

export function Footer() {
  const socialLinks = [
    { label: "Instagram", href: siteConfig.social.instagram },
    { label: "Facebook", href: siteConfig.social.facebook },
  ] as const;

  return (
    <footer className="bg-ink px-5 py-14 text-ink-foreground md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <Brand light />
          <p className="mt-3 text-sm opacity-70">
            Premium Plots &amp; Farmhouse Projects in Bhopal
          </p>
          <div
            className="mt-6 flex items-center gap-3"
            aria-label="Social media"
          >
            {socialLinks.map(({ label, href }) => {
              const className =
                "grid h-10 w-10 place-items-center rounded-full border border-ink-foreground/25 transition";

              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} profile`}
                  className={`${className} hover:border-ink-foreground hover:bg-ink-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <SocialIcon network={label} />
                </a>
              ) : (
                <span
                  key={label}
                  role="img"
                  aria-label={`${label} profile link coming soon`}
                  title={`${label} profile link coming soon`}
                  className={`${className} opacity-60`}
                >
                  <SocialIcon network={label} />
                </span>
              );
            })}
          </div>
        </div>
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm opacity-80 sm:grid-cols-3"
        >
          {navigation.map((link) => (
            <a key={link.label} href={link.href} className="hover:opacity-100">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-ink-foreground/15 pt-6 text-xs opacity-60">
        © 2026 {siteConfig.company}. All Rights Reserved.
      </p>
    </footer>
  );
}

export function ContactActions() {
  return (
    <>
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed right-5 bottom-20 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-soft transition hover:scale-105 md:bottom-6"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <nav
        aria-label="Quick contact"
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t bg-background text-xs font-semibold md:hidden"
      >
        <a
          href={siteConfig.phoneHref}
          className="flex items-center justify-center gap-1.5 py-4"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border-x py-4"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href="#enquiry"
          className="flex items-center justify-center gap-1.5 bg-primary py-4 text-primary-foreground"
        >
          <CalendarCheck className="h-4 w-4" />
          Site Visit
        </a>
      </nav>
    </>
  );
}
