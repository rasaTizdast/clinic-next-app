"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-background">
      {/* Decorative subtle grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none texture-grain" />

      {/* Floating Elements */}
      <div className="absolute top-32 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-ambient-drift" />
      <div className="absolute bottom-32 left-20 w-96 h-96 bg-primary-light/10 rounded-full blur-[120px] animate-ambient-drift-slow" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1 hero-stagger-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop"
                alt="کلینیک زیبایی باران"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="order-1 lg:order-2">
            <div className="hero-stagger-2 inline-flex items-center gap-2 bg-secondary border border-border text-foreground/80 px-5 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              کلینیک تخصصی زیبایی باران
            </div>
            
            <h1 className="hero-stagger-3 text-5xl sm:text-6xl lg:text-8xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
              زیبایی طبیعی،
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-primary-light to-primary">اعتماد به نفس</span> واقعی
            </h1>
            
            <p className="hero-stagger-4 text-xl sm:text-2xl text-foreground/60 mb-12 max-w-2xl leading-relaxed font-light">
              در کلینیک زیبایی باران، با بهترین متخصصان و پیشرفته‌ترین تجهیزات، زیبایی
              طبیعی خود را کشف کنید.
            </p>
            
            <div className="hero-stagger-4 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 text-lg shadow-xl shadow-primary/30 btn-premium rounded-xl">
                  رزرو مشاوره رایگان
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="text-foreground hover:text-primary hover:bg-secondary border border-border px-8 py-4 text-lg rounded-xl transition-all duration-300">
                  مشاهده خدمات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40 hero-stagger-4">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/40 to-transparent"></div>
      </div>
    </section>
  );
}
