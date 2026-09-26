import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { Brand } from "./brand";

export function Footer() {
  const links = [
    ...navigation,
    { label: "Privacy Policy", href: siteConfig.privacyHref },
    { label: "Terms & Conditions", href: siteConfig.termsHref },
  ];
  return (
    <footer className="bg-ink px-5 py-14 text-ink-foreground md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <Brand light />
          <p className="mt-3 text-sm opacity-70">
            Premium Plots &amp; Farmhouse Projects in Bhopal
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm opacity-80 sm:grid-cols-4"
        >
          {links.map((link) => (
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
