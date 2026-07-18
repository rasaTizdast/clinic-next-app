"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-foreground/10 backdrop-blur-sm transition-opacity duration-200",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ zIndex: 45 }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* N9 Edge-aligned minimal — wordmark right (RTL start), CTA left (RTL end) */}
      <header
        className="sticky top-0 bg-background/90 backdrop-blur-xl border-b border-border/30"
        style={{ zIndex: 50 }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex h-18 items-center justify-between">
            {/* Wordmark — RTL start (right) */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm transition-transform duration-300 group-hover:scale-105">
                ب
              </div>
              <span className="text-xl font-black text-foreground tracking-tight">
                کلینیک <span className="text-primary">باران</span>
              </span>
            </Link>

            {/* Desktop nav — center */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/50 hover:text-primary rounded-lg hover:bg-muted/50 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop: CTA — RTL end (left) */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+989121234567"
                className="flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-primary transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
              </a>
              <Link
                href="/contact"
                className="text-sm font-semibold text-primary hover:text-primary-light transition-colors duration-200"
              >
                رزرو مشاوره
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              ref={buttonRef}
              type="button"
              className="lg:hidden p-2 text-foreground/60 hover:text-primary cursor-pointer transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          ref={menuRef}
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 transition-all duration-200",
            "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            mobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-1 pointer-events-none invisible"
          )}
        >
          <nav className="mx-4 mt-2 mb-4 p-4 space-y-1 bg-surface rounded-2xl shadow-lg border border-border/30">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-[15px] font-medium text-foreground/60 hover:text-primary hover:bg-muted/50 rounded-xl transition-all duration-200"
                style={{
                  transitionDelay: mobileMenuOpen ? `${i * 40}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-4 border-t border-border/30">
              <a
                href="tel:+989121234567"
                className="flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <Phone className="h-4 w-4" />
                <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
