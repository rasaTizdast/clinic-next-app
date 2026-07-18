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
      {/* Hero */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <div className="eyebrow text-white/50 mb-4">خدمات ما</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              خدمات <span className="text-primary">تخصصی</span> زیبایی
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
              با بهترین متخصصان و پیشرفته‌ترین تجهیزات
            </p>
          </ScrollReveal>
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
