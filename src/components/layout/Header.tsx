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
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside
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
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-xl backdrop-saturate-150 border-b border-border/40 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110">
              ب
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              کلینیک <span className="text-primary">باران</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+989121234567"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors duration-300"
            >
              <Phone className="h-4 w-4" />
              <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
            </a>
            <button
              ref={buttonRef}
              type="button"
              className="lg:hidden p-2 text-foreground/70 hover:text-primary cursor-pointer transition-colors duration-300 active:scale-95"
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
      </div>

      {/* Mobile Nav - Absolute overlay */}
      <div
        ref={menuRef}
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 transition-all duration-300",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
        )}
      >
        <nav className="mx-4 mb-4 p-4 space-y-1 bg-background/95 backdrop-blur-2xl rounded-2xl shadow-xl shadow-foreground/10 border border-border/50">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-[15px] font-medium text-foreground/70 hover:text-primary hover:bg-muted/50 rounded-xl transition-all duration-300"
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 px-4 border-t border-border/40">
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
  );
}
