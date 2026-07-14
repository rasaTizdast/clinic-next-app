"use client";

import { Suspense } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Stethoscope } from "lucide-react";
import { ServicesFilter } from "./ServicesFilter";

export function ServicesPageClient() {
  return (
    <>
      <section className="relative py-32 sm:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,140,99,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
              <Stethoscope className="h-4 w-4 text-primary" />
              <span>خدمات تخصصی</span>
            </div>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              خدمات <span className="text-primary">پیشرفته</span> ما
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              مجموعه‌ای متنوع از خدمات تخصصی زیبایی، پوست و مو با بهترین کیفیت
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-[2rem]" />
                ))}
              </div>
            }
          >
            <ServicesFilter />
          </Suspense>
        </div>
      </section>
    </>
  );
}
