"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getFeaturedServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
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

export function ServicesPreview() {
  const featuredServices = getFeaturedServices();
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
    <section className="py-32 sm:py-40 bg-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none texture-grain" />

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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>تخصص ما</span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            خدمات <span className="text-primary">پیشرفته</span> زیبایی
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
            با استفاده از پیشرفته‌ترین تجهیزات و بهترین متخصصان، خدمات متنوعی
            برای زیبایی و جوانسازی ارائه می‌دهیم.
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {featuredServices.map((service, index) => (
            <RevealItem key={service.id} delay={index * 100}>
              <ServiceCard service={service} variant="dark" />
            </RevealItem>
          ))}
        </div>

        <RevealItem delay={featuredServices.length * 100}>
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-white font-semibold hover:text-primary transition-colors duration-300 group text-lg"
            >
              <span>مشاهده همه خدمات</span>
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-2" />
            </Link>
          </div>
        </RevealItem>
      </div>
    </section>
  );
}
