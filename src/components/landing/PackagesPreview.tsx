"use client";

import Link from "next/link";
import { ArrowLeft, Gift } from "lucide-react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function RevealItem({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function PackagesPreview() {
  const packages = getPackages().slice(0, 3);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 sm:py-40 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(184,140,99,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-20 transition-[opacity,transform] duration-1000",
            "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-8">
            <Gift className="h-4 w-4" />
            <span>پکیج‌های ویژه</span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            پکیج‌های <span className="text-primary">مراقبت از پوست</span>
          </h2>

          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-light">
            پکیج‌های ویژه ما با ترکیب خدمات مختلف و قیمت‌های مناسب، بهترین انتخاب
            برای مراقبت از پوست شما هستند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => (
            <RevealItem key={pkg.id} delay={index * 100}>
              <PackageCard pkg={pkg} />
            </RevealItem>
          ))}
        </div>

        <RevealItem delay={packages.length * 100}>
          <div className="text-center mt-16">
            <Link
              href="/packages"
              className="inline-flex items-center gap-3 text-primary font-semibold hover:text-primary-light transition-colors duration-300 group text-lg"
            >
              <span>مشاهده همه پکیج‌ها</span>
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-2" />
            </Link>
          </div>
        </RevealItem>
      </div>
    </section>
  );
}
