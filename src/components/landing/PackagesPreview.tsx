"use client";

import Link from "next/link";
import { ArrowLeft, Gift } from "lucide-react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PackagesPreview() {
  const packages = getPackages().slice(0, 3);

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold mb-6">
              <Gift className="h-3.5 w-3.5" />
              <span>پکیج‌های ویژه</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              پکیج‌های <span className="text-primary">مراقبت از پوست</span>
            </h2>

            <p className="text-lg text-foreground/40 max-w-2xl mx-auto leading-relaxed font-light">
              پکیج‌های ویژه ما با ترکیب خدمات مختلف و قیمت‌های مناسب، بهترین انتخاب
              برای مراقبت از پوست شما هستند.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 80}>
              <PackageCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={packages.length * 80}>
          <div className="text-center mt-14">
            <Link
              href="/packages"
              className="inline-flex items-center gap-3 text-primary font-semibold hover:text-primary-light transition-colors duration-200 group text-base"
            >
              <span>مشاهده همه پکیج‌ها</span>
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
