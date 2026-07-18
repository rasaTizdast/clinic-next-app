"use client";

import { getTestimonials } from "@/data";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = getTestimonials();

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-surface relative overflow-hidden">
      {/* Decorative quote marks */}
      <div className="absolute top-20 left-20 text-primary/5 pointer-events-none select-none" style={{ fontSize: "200px", lineHeight: 1, fontFamily: "serif" }}>
        "
      </div>
      <div className="absolute bottom-20 right-20 text-primary/5 pointer-events-none select-none" style={{ fontSize: "200px", lineHeight: 1, fontFamily: "serif" }}>
        "
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 relative">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-6">
              <Quote className="h-6 w-6 text-primary" />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              تجربه مراجعین <span className="text-primary">ما</span>
            </h2>
            <p className="text-lg text-foreground/40 max-w-2xl mx-auto font-light">
              رضایت مشتریان ما بزرگترین سرمایه ماست.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 80}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
