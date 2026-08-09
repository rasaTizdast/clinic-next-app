"use client";

import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PackagesPageClient() {
  const packages = getPackages();

  return (
    <>
      {/* Hero — split diptych style */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal>
              <div>
                <div className="eyebrow text-white/50 mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-px bg-primary" />
                  پکیج‌ها
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  پکیج‌های <span className="text-primary">ویژه</span> مراقبت از پوست
                </h1>
                <p className="text-lg text-white/40 max-w-lg font-light leading-relaxed">
                  ترکیب خدمات مختلف با قیمت‌های مناسب
                </p>
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-2xl overflow-hidden bg-white/5 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop"
                  alt="پکیج‌های مراقبت از پوست"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
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
