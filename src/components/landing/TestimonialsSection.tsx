"use client";

import { getTestimonials } from "@/data";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";
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

export function TestimonialsSection() {
  const testimonials = getTestimonials();
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
    <section className="py-32 sm:py-40 bg-surface relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,140,99,0.05),transparent_60%)] pointer-events-none" />

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-8 mx-auto">
            <Quote className="h-8 w-8 text-primary" />
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            تجربه مراجعین <span className="text-primary">ما</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto font-light">
            رضایت مشتریان ما بزرگترین سرمایه ماست. نظرات آنها را درباره خدمات
            کلینیک بخوانید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <RevealItem key={testimonial.id} delay={index * 100}>
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
