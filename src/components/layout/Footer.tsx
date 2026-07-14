"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Globe, Send } from "lucide-react";
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
    <footer className="relative bg-background border-t border-border/40">
      {/* Top decorative line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <Container>
        <div className="relative py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110">
                ب
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">
                کلینیک <span className="text-primary">باران</span>
              </span>
            </Link>
            <p className="text-base text-foreground/70 leading-relaxed font-light">
              ارائه دهنده خدمات تخصصی زیبایی، پوست و مو با بهترین متخصصان و
              پیشرفته\u200cترین تجهیزات
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold tracking-widest text-foreground/80 uppercase">خدمات</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline-hover text-base text-foreground/70 hover:text-primary transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold tracking-widest text-foreground/80 uppercase">کلینیک</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline-hover text-base text-foreground/70 hover:text-primary transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold tracking-widest text-foreground/80 uppercase">تماس با ما</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base text-foreground/70 font-light">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary/70" />
                <span>تهران، خیابان ولیعصر، نبش کوچه گل، پلاک ۱۲</span>
              </li>
              <li className="flex items-center gap-3 text-base text-foreground/70 font-light">
                <Phone className="h-5 w-5 shrink-0 text-primary/70" />
                <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
              </li>
              <li className="flex items-center gap-3 text-base text-foreground/70 font-light">
                <Mail className="h-5 w-5 shrink-0 text-primary/70" />
                <span>info@baran-clinic.ir</span>
              </li>
              <li className="flex items-center gap-3 text-base text-foreground/70 font-light">
                <Clock className="h-5 w-5 shrink-0 text-primary/70" />
                <span>شنبه تا پنجشنبه ۹ صبح تا ۸ شب</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative py-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60 font-light">
            © ۱۴۰۵ کلینیک زیبایی باران. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6 text-sm text-foreground/60 font-light">
            <a href="#" className="hover:text-primary transition-colors duration-300">حریم خصوصی</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">شرایط استفاده</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
