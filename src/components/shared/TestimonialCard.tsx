"use client";

import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative p-6 rounded-2xl bg-surface border border-border/30 hover:border-primary/15 hover:shadow-md transition-all duration-300 group">
      {/* Decorative quote */}
      <div className="absolute top-5 left-5 text-primary/[0.07] group-hover:text-primary/[0.12] transition-colors duration-300">
        <Quote className="h-10 w-10 fill-current" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-0.5 mb-4 relative z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating
                ? "text-primary fill-primary"
                : "text-border"
            )}
          />
        ))}
      </div>

      {/* Quote Text */}
      <p className="text-base text-foreground/50 leading-relaxed mb-6 relative z-10 font-light">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3 relative z-10 pt-4 border-t border-border/20">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-foreground/30">مشتری وفادار</p>
        </div>
      </div>
    </div>
  );
}
