"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StoryChapterProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export function StoryChapter({
  eyebrow,
  title,
  description,
  children,
  reverse = false,
  className,
}: StoryChapterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
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
    <section
      ref={sectionRef}
      className={cn("py-32 sm:py-40 relative overflow-hidden", className)}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-muted/50 to-background transition-opacity duration-700",
          isVisible ? "opacity-80" : "opacity-0"
        )}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center",
            reverse && "lg:direction-rtl"
          )}
        >
          {/* Text Content */}
          <div
            className={cn(
              "transition-[opacity,transform,filter] duration-1000",
              "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              reverse ? "lg:direction-ltr" : "",
              isVisible
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-10 blur-[4px]"
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-primary" />
              <p className="text-primary font-semibold tracking-wide text-sm uppercase">
                {eyebrow}
              </p>
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {title}
            </h2>

            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Visual Content */}
          <div
            className={cn(
              "relative transition-[opacity,transform] duration-1000 delay-200",
              "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            )}
          >
            {children || (
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-muted to-border overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 animate-pulse" />
                </div>
              </div>
            )}

            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10 blur-xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-primary/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
