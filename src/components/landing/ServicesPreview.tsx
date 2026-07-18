"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getFeaturedServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ServicesPreview() {
  const featuredServices = getFeaturedServices();

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-foreground relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 relative">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-full text-xs font-semibold mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>تخصص ما</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              خدمات <span className="text-primary">پیشرفته</span> زیبایی
            </h2>

            <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
              با استفاده از پیشرفته‌ترین تجهیزات و بهترین متخصصان، خدمات متنوعی
              برای زیبایی و جوانسازی ارائه می‌دهیم.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-5 max-w-5xl mx-auto">
          {featuredServices.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 80}>
              <ServiceCard service={service} variant="dark" />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={featuredServices.length * 80}>
          <div className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-white/60 font-semibold hover:text-primary transition-colors duration-200 group text-base"
            >
              <span>مشاهده همه خدمات</span>
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
