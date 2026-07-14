"use client";

import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative p-8 rounded-3xl bg-surface border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
      {/* Decorative quote icon */}
      <div className="absolute top-6 left-6 text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
        <Quote className="h-12 w-12 fill-current" />
      </div>
      
      {/* Rating */}
      <div className="flex items-center gap-1 mb-6 relative z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-5 w-5",
              i < testimonial.rating
                ? "text-primary fill-primary"
                : "text-border"
            )}
          />
        ))}
      </div>
      
      {/* Quote Text */}
      <p className="text-lg text-foreground/70 leading-relaxed mb-8 relative z-10 font-light italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      
      {/* User Info */}
      <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-border/40">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary transition-transform duration-300 group-hover:scale-110">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-foreground/70">مشتری وفادار</p>
        </div>
      </div>
    </div>
  );
}
