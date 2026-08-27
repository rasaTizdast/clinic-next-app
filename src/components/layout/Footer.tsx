"use client";

import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

const footerLinks = {
  services: [
    { href: "/services/botox", label: "بوتاکس" },
    { href: "/services/laser-hair-removal", label: "لیزر موهای زائد" },
    { href: "/services/facial", label: "پاکسازی پوست" },
    { href: "/services/prp", label: "پی\u200cآرپی" },
  ],
  company: [
    { href: "/about", label: "درباره ما" },
    { href: "/packages", label: "پکیج\u200cها" },
    { href: "/products", label: "محصولات" },
    { href: "/contact", label: "تماس با ما" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-surface border-t border-border/30 text-foreground">
      {/* Ft6 Letter Close — intimate, personal signoff */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        {/* Large closing statement */}
        <p
          className="text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.4] tracking-tight max-w-2xl mb-12 text-foreground"
          style={{ letterSpacing: "-0.01em" }}
        >
          زیبایی حق هر انسانی است.
          <br />
          <span className="text-primary font-bold">ما اینجاییم</span> تا کمکتان
          کنیم.
        </p>

        {/* Letter signoff */}
        <div className="mb-12">
          <p
            className="text-lg font-light text-foreground/70"
            style={{ fontStyle: "italic" }}
          >
            با عشق،
          </p>
          <p className="text-xl font-bold text-foreground mt-1">
            — کلینیک زیبایی باران
          </p>
        </div>

        {/* Hairline divider */}
        <div className="h-px bg-border mb-10" />

        {/* Contact info — postscript style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
            <span className="text-sm text-foreground/70 font-light">
              تهران — منطقه ۲۲ – بلوار پژوهش – شهرک چیتگر – برج جی۴ – طبقه اداری
              غربی
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-primary/60" />
            <a
              href="tel:+989100300875"
              className="text-sm text-foreground/70 font-light hover:text-primary transition-colors duration-200"
            >
              ۰۹۱۰۰۳۰۰۸۷۵
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 shrink-0 text-primary/60" />
            <span className="text-sm text-foreground/70 font-light">
              شنبه تا پنجشنبه ۹ تا ۲۰
            </span>
          </div>
        </div>

        {/* Bottom row — wordmark, links, copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
              ب
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-200">
              کلینیک زیبایی باران
            </span>
          </Link>

          <div className="flex items-center gap-6 text-xs text-foreground/60 font-light">
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs text-foreground/50 font-light">
            ©{" "}
            {new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
              new Date(),
            )}{" "}
            کلینیک زیبایی باران
          </p>
        </div>
      </div>
    </footer>
  );
}
