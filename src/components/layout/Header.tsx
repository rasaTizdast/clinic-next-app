"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/packages", label: "پکیج\u200cها" },
  { href: "/products", label: "محصولات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen, closeMenu]);

  /* ------------------------------------------------------------------ */
  /*  Shared logo & nav-link rendering                                   */
  /* ------------------------------------------------------------------ */
  const logo = (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-xs transition-transform duration-300 group-hover:scale-105">
        ب
      </div>
      <span className="text-base font-black text-foreground tracking-tight hidden sm:inline">
        کلینیک <span className="text-primary">باران</span>
      </span>
    </Link>
  );

  const renderedNavLinks = navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
        pathname === link.href
          ? "text-primary bg-primary/20"
          : "text-foreground/80 hover:text-primary hover:bg-muted/50"
      )}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      {/* ------ Tablet / Mobile: backdrop ------ */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/10 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ zIndex: 45 }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ------ Desktop header (full-width bar) ------ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 hidden lg:block">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-10">
            {logo}
            <nav className="flex items-center gap-1">{renderedNavLinks}</nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+989121234567"
              className="flex items-center gap-2 text-xs font-semibold text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              <span>۰۹۱۰۰۳۰۰۸۷۵</span>
              <Phone className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/contact"
              className="text-sm font-semibold bg-primary hover:bg-primary-light text-white px-5 py-2 rounded-full transition-all duration-200"
            >
              رزرو مشاوره
            </Link>
          </div>
        </div>
      </header>

      {/* ------ Tablet / Mobile: floating pill ------ */}
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2",
          "inline-flex items-center gap-3 sm:gap-5",
          "px-4 sm:px-5 py-2.5",
          "bg-background/78 backdrop-blur-xl border border-border/40 rounded-full shadow-pill",
          "z-50 w-auto max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)]",
          "lg:hidden"
        )}
      >
        {logo}

        {/* Hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className={cn(
            "lg:hidden flex items-center justify-center w-10 h-10 shrink-0",
            "text-foreground/60 hover:text-primary transition-colors duration-200",
            "rounded-full hover:bg-muted/50"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Mobile Nav Panel — centered on pill axis */}
        <div
          id="mobile-nav"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="منوی ناوبری"
          className={cn(
            "lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-3",
            "transition-all duration-250",
            "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            mobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 pointer-events-none invisible"
          )}
        >
          <nav className="p-3 space-y-0.5 bg-background/95 backdrop-blur-xl rounded-2xl shadow-lg border border-border/30 w-auto min-w-[260px] max-w-[90vw]">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "block px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-muted/50"
                )}
                style={{
                  transitionDelay: mobileMenuOpen ? `${i * 40}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-4 mt-2 border-t border-border/50">
              <a
                href="tel:+989100300875"
                className="flex items-center gap-2 py-1 text-sm font-semibold text-primary"
              >
                <Phone className="h-4 w-4" />
                <span>۰۹۱۰۰۳۰۰۸۷۵</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
