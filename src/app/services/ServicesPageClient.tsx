"use client";

import { getServices, getServicesByCategory } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "همه" },
  { key: "face", label: "صورت" },
  { key: "skin", label: "پوست" },
  { key: "hair", label: "مو" },
  { key: "body", label: "بدن" },
] as const;

export function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const services = activeCategory === "all"
    ? getServices()
    : getServicesByCategory(activeCategory as "face" | "skin" | "hair" | "body");

  return (
    <>
      {/* Hero — editorial style with split diptych feel */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden border-b border-border/20">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal>
              <div>
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-px bg-primary" />
                  خدمات ما
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  خدمات <span className="text-primary">تخصصی</span> زیبایی
                </h1>
                <p className="text-lg text-foreground/40 max-w-lg font-light leading-relaxed">
                  با بهترین متخصصان و پیشرفته‌ترین تجهیزات
                </p>
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop"
                  alt="خدمات زیبایی باران"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Category filter */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 justify-center mb-14">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                    activeCategory === cat.key
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground/50 hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="flex flex-col gap-5 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 60}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
