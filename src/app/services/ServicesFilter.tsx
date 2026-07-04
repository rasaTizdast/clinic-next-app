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
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                active === cat.key
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-muted text-foreground/50 hover:text-foreground/70 hover:bg-muted/80"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {filtered.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 60}>
            <ServiceCard service={service} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-foreground/40 text-lg">خدمتی یافت نشد</p>
        </div>
      )}
    </>
  );
}
