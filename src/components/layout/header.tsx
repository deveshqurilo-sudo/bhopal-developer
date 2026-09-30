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
    const media = window.matchMedia("(min-width: 768px)");
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
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Brand light={!solid} />
        <nav
          aria-label="Main navigation"
          className={`hidden gap-8 text-sm font-medium md:flex ${solid ? "text-foreground" : "text-ink-foreground"}`}
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
      
            {/* className=" mt-8 text-ink-foreground hover:bg-ink-foreground/10" */}
        <ButtonLink href="#enquiry"   variant="outline" className="hidden !py-2.5 md:inline-flex">
          Book a Site Visit 
        </ButtonLink>
        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`-m-2 p-2 md:hidden ${solid ? "text-foreground" : "text-ink-foreground"}`}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex flex-col gap-4 border-t bg-background px-5 py-6 md:hidden"
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
