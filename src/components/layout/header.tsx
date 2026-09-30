"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/config/site";
import { Brand } from "./brand";
import { ButtonLink } from "@/components/ui/button-link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (media.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", dismiss);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", dismiss);
      media.removeEventListener("change", onResize);
    };
  }, [menuOpen]);
  const solid = scrolled || menuOpen;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${solid ? "bg-background/90 shadow-sm backdrop-blur" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 lg:px-8">
        <Brand light={!solid} />
        <nav
          aria-label="Main navigation"
          className={`hidden items-center gap-5 text-sm font-medium lg:flex xl:gap-8 ${solid ? "text-foreground" : "text-ink-foreground"}`}
        >
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="opacity-80 transition hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <ButtonLink
          href="#enquiry"
          variant="outline"
          className={`hidden shrink-0 !px-5 !py-2.5 lg:inline-flex ${solid ? "" : "text-ink-foreground hover:bg-ink-foreground/10"}`}
        >
          Book a Site Visit
        </ButtonLink>
        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl lg:hidden ${solid ? "text-foreground hover:bg-secondary" : "text-ink-foreground hover:bg-ink-foreground/10"}`}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex flex-col gap-4 border-t bg-background px-5 py-6 text-foreground lg:hidden"
        >
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg"
            >
              {link.label}
            </a>
          ))}
          <ButtonLink href="#enquiry" onClick={() => setMenuOpen(false)}>
            Book a Site Visit
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
