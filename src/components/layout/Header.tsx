"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/packages", label: "پکیج\u200cها" },
  { href: "/offers", label: "پیشنهادات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">کلینیک زیبا</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+989121234567"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
            </a>
            <button
              type="button"
              className="md:hidden p-2 text-foreground/70 hover:text-primary cursor-pointer"
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

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="px-4 py-4 space-y-2 bg-surface border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-muted rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+989121234567"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary"
          >
            <Phone className="h-4 w-4" />
            <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
