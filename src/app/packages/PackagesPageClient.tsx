"use client";

import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PackagesPageClient() {
  const packages = getPackages();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <div className="eyebrow text-white/50 mb-4">پکیج‌ها</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              پکیج‌های <span className="text-primary">ویژه</span> مراقبت از پوست
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
              ترکیب خدمات مختلف با قیمت‌های مناسب
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} delay={index * 60}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
