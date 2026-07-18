"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "./Container";

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
    <footer className="relative bg-foreground text-background">
      <Container>
        {/* Ft5 Statement — large closing sentence */}
        <div className="py-20 lg:py-28">
          <p
            className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight max-w-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            زیبایی حق هر انسانی است.
            <br />
            <span className="text-primary">ما اینجاییم</span> تا کمکتان کنیم.
          </p>
        </div>

        {/* Meta row — wordmark, links, contact, copyright */}
        <div className="py-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  ب
                </div>
                <span className="text-lg font-black tracking-tight">
                  باران
                </span>
              </Link>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                ارائه دهنده خدمات تخصصی زیبایی، پوست و مو
              </p>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase">خدمات</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-primary transition-colors duration-200 font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase">کلینیک</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-primary transition-colors duration-200 font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase">تماس</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/60 font-light">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
                  <span>تهران، خیابان ولیعصر، پلاک ۱۲</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 font-light">
                  <Phone className="h-4 w-4 shrink-0 text-primary/60" />
                  <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 font-light">
                  <Mail className="h-4 w-4 shrink-0 text-primary/60" />
                  <span>info@baran-clinic.ir</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60 font-light">
                  <Clock className="h-4 w-4 shrink-0 text-primary/60" />
                  <span>شنبه تا پنجشنبه ۹ تا ۲۰</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-light">
              © ۱۴۰۵ کلینیک زیبایی باران. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/30 font-light">
              <a href="#" className="hover:text-primary transition-colors duration-200">حریم خصوصی</a>
              <a href="#" className="hover:text-primary transition-colors duration-200">شرایط استفاده</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
