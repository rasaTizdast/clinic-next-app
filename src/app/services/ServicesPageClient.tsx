"use client";

import { getServices, getServicesByCategory } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState, useRef } from "react";
import { cn, scrollFilterIntoView } from "@/lib/utils";

const categories = [
  { key: "all", label: "همه" },
  { key: "filler-botox", label: "فیلر و بوتاکس" },
  { key: "laser-women", label: "لیزر بانوان" },
  { key: "laser-men", label: "لیزر آقایان" },
  { key: "facial", label: "فیشیال" },
] as const;

export function ServicesPageClient() {
  type CategoryKey = (typeof categories)[number]["key"];
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const listTopRef = useRef<HTMLDivElement>(null);
  const services = activeCategory === "all"
    ? getServices()
    : getServicesByCategory(activeCategory);

  const handleSelect = (key: CategoryKey) => {
    setActiveCategory(key);
    // defer until after state update so DOM is stable
    requestAnimationFrame(() => {
      const offset = window.matchMedia("(min-width: 1024px)").matches ? 64 : 76;
      scrollFilterIntoView(listTopRef.current, offset);
    });
  };

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
                <p className="text-lg text-foreground/60 max-w-lg font-light leading-relaxed">
                  با بهترین متخصصان و پیشرفته‌ترین تجهیزات
                </p>
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={100}>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                <div className="w-36 h-36 rounded-full bg-primary/15 animate-pulse blur-xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* sentinel — non-sticky anchor for scroll-to-top */}
          <div ref={listTopRef} className="h-0 scroll-mt-[76px] lg:scroll-mt-[64px]" aria-hidden />
          {/* Category filter — sticky under header */}
          <div
            className={cn(
              "sticky top-[76px] lg:top-[64px] z-40 -mx-5 sm:-mx-8 lg:-mx-12",
              "px-5 sm:px-8 lg:px-12 py-3 mb-12",
              "bg-background/85 backdrop-blur-xl border-b border-border/40"
            )}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleSelect(cat.key)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                    activeCategory === cat.key
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground/70 hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

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
