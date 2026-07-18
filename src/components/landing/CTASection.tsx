"use client";

import Link from "next/link";
import { Phone, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-background overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 relative">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 px-4 py-2 rounded-full text-xs font-semibold mb-8">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              همین الان رزرو کنید
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              برای زیبایی خود <span className="text-primary">اقدام کنید</span>
            </h2>

            <p className="text-lg text-background/40 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
              برای دریافت مشاوره رایگان و رزرو وقت با ما تماس بگیرید.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a href="tel:+989121234567" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full gap-3 bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20 btn-premium rounded-xl py-5 text-lg"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-bold">۰۹۱۲-۱۲۳-۴۵۶۷</span>
                </Button>
              </a>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full gap-3 text-white/70 border border-white/15 hover:bg-white/5 py-5 text-lg rounded-xl"
                >
                  فرم تماس
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-background/30 font-light">
              <MapPin className="h-4 w-4 text-primary/60" />
              <span>تهران، خیابان ولیعصر، نبش کوچه گل</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
