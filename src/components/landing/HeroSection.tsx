"use client";

import Link from "next/link";
import { Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="sanctuary-hero relative">
      {/* Background image with Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&h=900&fit=crop"
          alt=""
          className="sanctuary-bg-img w-full h-full object-cover"
        />
        {/* Warm rose-gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(10%_0.015_50_/_92%)] via-[oklch(10%_0.01_50_/_65%)] to-[oklch(10%_0.01_50_/_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(62%_0.14_55_/_8%)] to-transparent" />
      </div>

      {/* Soft ambient light orbs */}
      <div className="absolute top-1/3 right-[10%] w-[32rem] h-[32rem] bg-[oklch(62%_0.14_55_/_7%)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[24rem] h-[24rem] bg-[oklch(72%_0.12_55_/_4%)] rounded-full blur-[100px] pointer-events-none" />

      {/* Content — vertically centered */}
      <div className="relative z-10 flex items-center min-h-dvh">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-24 pb-16 sm:pb-20">
          <div className="max-w-[640px]">
            {/* Golden accent line */}
            <div className="sanctuary-accent-line" />

            {/* Eyebrow */}
            <p className="sanctuary-eyebrow">
              کلینیک زیبایی باران
            </p>

            {/* Main headline */}
            <h1 className="sanctuary-heading">
              زیبایی طبیعی،
              <br />
              <span className="sanctuary-heading-accent">در آغوش تخصص</span>
            </h1>

            {/* Subheading */}
            <p className="sanctuary-subheading">
              با بیش از یک دهه تجربه و بهره‌گیری از پیشرفته‌ترین تجهیزات روز دنیا،
              زیبایی منحصربه‌فرد شما را شکوفا می‌کنیم.
            </p>

            {/* CTA row */}
            <div className="sanctuary-cta-row">
              <Link
                href="/contact"
                className="sanctuary-cta"
              >
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
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 -ml-0.5" />
                  <span className="sanctuary-trust-number">۴.۹</span>
                </div>
                <span className="sanctuary-trust-label">امتیاز مراجعین</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[0.6rem] font-medium text-white/30 tracking-[0.15em] uppercase">
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
