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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("py-24 sm:py-32 lg:py-40 relative overflow-hidden", className)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          )}
        >
          {/* Text Content */}
          <div
            className={cn(
              "transition-[opacity,transform] duration-[420ms]",
              "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              reverse ? "lg:order-2" : "",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            <div className="eyebrow mb-4">{eyebrow}</div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-[1.1] tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {title}
            </h2>

            <p className="text-lg text-foreground/50 leading-relaxed max-w-xl font-light">
              {description}
            </p>
          </div>

          {/* Visual Content */}
          <div
            className={cn(
              "relative transition-[opacity,transform] duration-[420ms] delay-150",
              "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              reverse ? "lg:order-1" : "",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            {children || (
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-border overflow-hidden">
                <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
