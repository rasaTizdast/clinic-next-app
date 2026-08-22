"use client";

import { useState } from "react";
import { getServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "همه خدمات" },
  { key: "skin", label: "پوست" },
  { key: "hair", label: "مو" },
  { key: "face", label: "صورت" },
  { key: "body", label: "بدن" },
] as const;

export function ServicesFilter() {
  const [active, setActive] = useState<string>("all");
  const allServices = getServices();
  const filtered =
    active === "all"
      ? allServices
      : allServices.filter((s) => s.category === active);

  return (
    <>
      <ScrollReveal delay={100}>
        <div className="flex items-center justify-center gap-3 mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={cn(
                "px-6 py-2.5 rounded-full text-[15px] font-semibold cursor-pointer",
                "transition-all duration-300",
                "active:scale-[0.97]",
                active === cat.key
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-muted/50 text-foreground/60 hover:text-foreground hover:bg-muted border border-transparent hover:border-border/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {filtered.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 80}>
            <ServiceCard service={service} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-foreground/60 text-xl font-light">خدمتی یافت نشد</p>
        </div>
      )}
    </>
  );
}
