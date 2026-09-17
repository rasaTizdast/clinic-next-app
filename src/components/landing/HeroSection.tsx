"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="sanctuary-hero relative">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/Hero_section_bg.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="sanctuary-bg-img object-cover"
        />
        {/* Warm rose-gold gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[oklch(10%_0.015_50/92%)] via-[oklch(10%_0.01_50/65%)] to-[oklch(10%_0.01_50/30%)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[oklch(62%_0.14_55/8%)] to-transparent" />
      </div>

      {/* Soft ambient light orbs */}
      <div className="pointer-events-none absolute top-1/3 right-[10%] h-[32rem] w-[32rem] rounded-full bg-[oklch(62%_0.14_55_/_7%)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-[5%] h-[24rem] w-[24rem] rounded-full bg-[oklch(72%_0.12_55_/_4%)] blur-[100px]" />

      {/* Content — vertically centered */}
      <div className="relative z-10 flex min-h-dvh items-center">
        <div className="mx-auto w-full max-w-7xl px-5 pt-24 pb-16 sm:px-8 sm:pb-20 lg:px-12">
          <div className="max-w-[640px]">
            {/* Golden accent line */}
            <div className="sanctuary-accent-line" />

            {/* Eyebrow */}
            <p className="sanctuary-eyebrow">کلینیک زیبایی باران</p>

            {/* Main headline */}
            <h1 className="sanctuary-heading">
              زیبایی طبیعی،
              <br />
              <span className="sanctuary-heading-accent">در آغوش تخصص</span>
            </h1>

            {/* Subheading */}
            <p className="sanctuary-subheading">
              با بیش از یک دهه تجربه و بهره‌گیری از پیشرفته‌ترین تجهیزات روز دنیا، زیبایی
              منحصربه‌فرد شما را شکوفا می‌کنیم.
            </p>

            {/* CTA row */}
            <div className="sanctuary-cta-row">
              <Link href="/contact" className="sanctuary-cta">
                رزرو مشاوره رایگان
              </Link>
            </div>

            {/* Trust bar */}
            <div className="sanctuary-trust-bar">
              <div className="sanctuary-trust-item">
                <span className="sanctuary-trust-number">۱۵+</span>
                <span className="sanctuary-trust-label">متخصص حرفه‌ای</span>
              </div>
              <div className="sanctuary-trust-divider" />
              <div className="sanctuary-trust-item">
                <span className="sanctuary-trust-number">۵۰۰۰+</span>
                <span className="sanctuary-trust-label">مراجع راضی</span>
              </div>
              <div className="sanctuary-trust-divider" />
              <div className="sanctuary-trust-item">
                <div className="flex items-center gap-1">
                  <Star className="-ml-0.5 h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="sanctuary-trust-number">۴.۹</span>
                </div>
                <span className="sanctuary-trust-label">امتیاز مراجعین</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[0.6rem] font-medium tracking-[0.15em] text-white/30 uppercase"></span>
        <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
