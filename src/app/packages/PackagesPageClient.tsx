"use client";

import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState, useRef } from "react";
import { PackageGroup } from "@/lib/types";
import { cn, scrollFilterIntoView } from "@/lib/utils";

const groups: { key: PackageGroup | "all"; label: string }[] = [
  { key: "all", label: "همه" },
  { key: "carbon", label: "کربن تراپی" },
  { key: "laser-women", label: "لیزر بانوان" },
  { key: "laser-men", label: "لیزر آقایان" },
];

export function PackagesPageClient() {
  const [activeGroup, setActiveGroup] = useState<PackageGroup | "all">("all");
  const listTopRef = useRef<HTMLDivElement>(null);
  const all = getPackages();
  const packages =
    activeGroup === "all" ? all : all.filter((p) => p.group === activeGroup);

  const handleSelect = (key: PackageGroup | "all") => {
    setActiveGroup(key);
    requestAnimationFrame(() => {
      const offset = window.matchMedia("(min-width: 1024px)").matches ? 64 : 76;
      scrollFilterIntoView(listTopRef.current, offset);
    });
  };

  const countFor = (key: PackageGroup | "all") =>
    key === "all" ? all.length : all.filter((p) => p.group === key).length;

  return (
    <>
      {/* Hero — split diptych style */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden border-b border-border/20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal>
              <div>
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-px bg-primary" />
                  پکیج‌ها
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  پکیج‌های <span className="text-primary">ویژه</span> با قیمت اقتصادی‌تر
                </h1>
                <p className="text-lg text-foreground/60 max-w-lg font-light leading-relaxed">
                  با رزرو پکیج چند جلسه‌ای، هزینه هر جلسه به‌مرور کمتر می‌شود؛
                  دسته‌بندی را انتخاب کنید تا پکیج مناسب شما را پیدا کنیم.
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
          {/* Group filter — sticky under header */}
          <div
            className={cn(
              "sticky top-[76px] lg:top-[64px] z-40 -mx-5 sm:-mx-8 lg:-mx-12",
              "px-5 sm:px-8 lg:px-12 py-3 mb-12",
              "bg-background/85 backdrop-blur-xl border-b border-border/40"
            )}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {groups.map((g) => (
                <button
                  key={g.key}
                  onClick={() => handleSelect(g.key)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                    "flex items-center gap-2",
                    activeGroup === g.key
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-muted text-foreground/70 hover:text-primary hover:bg-primary/10"
                  )}
                >
                  {g.label}
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px]",
                      activeGroup === g.key
                        ? "bg-white/20 text-white"
                        : "bg-foreground/10 text-foreground/60"
                    )}
                  >
                    {countFor(g.key)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} delay={Math.min(index, 8) * 60}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>

          {/* Note */}
          <ScrollReveal delay={200}>
            <p className="text-center text-sm text-foreground/50 mt-16 max-w-xl mx-auto leading-relaxed">
              قیمت‌ها به تومان است و تعداد جلسات هر پکیج روی کارت هر پکیج مشخص
              شده است.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
