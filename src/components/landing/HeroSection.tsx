"use client";

import { ArrowLeft, ChevronDown, Star, Users, Award, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const stats = [
  { icon: Users, value: "+۱۰,۰۰۰", label: "مراجع راضی" },
  { icon: Star, value: "۴.۹", label: "امتیاز" },
  { icon: Award, value: "+۱۰", label: "سال تجربه" },
  { icon: Clock, value: "۲۴/۷", label: "پشتیبانی" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-ambient-drift pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-ambient-drift pointer-events-none" style={{ animationDelay: "-8s" }} />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 lg:py-0 w-full">
        {/* H2 Split Diptych — text right, image left (RTL natural) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column — RTL start (right) */}
          <div className="order-1 lg:order-1">
            <div className="hero-stagger-1 eyebrow mb-6 flex items-center gap-2">
              <span className="inline-block w-8 h-px bg-primary" />
              کلینیک تخصصی زیبایی باران
            </div>

            <h1
              className="hero-stagger-2 font-black text-foreground mb-6 leading-[1.1] tracking-tight"
              style={{
                fontSize: "var(--text-display)",
                letterSpacing: "-0.02em",
              }}
            >
              زیبایی طبیعی،
              <br />
              <span className="text-primary">اعتماد به نفس</span>{" "}
              واقعی
            </h1>

            <p className="hero-stagger-3 text-lg sm:text-xl text-foreground/50 mb-10 max-w-lg leading-relaxed font-light">
              در کلینیک زیبایی باران، با بهترین متخصصان و پیشرفته‌ترین تجهیزات،
              زیبایی طبیعی خود را کشف کنید.
            </p>

            <div className="hero-stagger-4 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/20 btn-premium rounded-xl"
                >
                  رزرو مشاوره رایگان
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-xl"
                >
                  مشاهده خدمات
                </Button>
              </Link>
            </div>
          </div>

          {/* Image column — RTL end (left) */}
          <div className="order-2 lg:order-2 hero-stagger-3">
            <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop"
                alt="کلینیک زیبایی باران"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Subtle warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              {/* Floating accent dot */}
              <div className="absolute bottom-6 left-6 w-3 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stagger-5 mt-16 lg:mt-20">
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-foreground/40">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-stagger-5">
        <div className="flex flex-col items-center gap-1 text-foreground/20 animate-bounce">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
