"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STAGGER_STEP_MS = 60;
const MAX_STAGGER_STEPS = 5;
const BATCH_WINDOW_MS = 150;

let batchCount = 0;
let lastRevealAt = 0;

function nextStaggerDelay() {
  const now = performance.now();
  if (now - lastRevealAt > BATCH_WINDOW_MS) batchCount = 0;
  lastRevealAt = now;
  const stagger = Math.min(batchCount, MAX_STAGGER_STEPS) * STAGGER_STEP_MS;
  batchCount += 1;
  return stagger;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [revealDelay, setRevealDelay] = useState(delay);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealDelay(delay > 0 ? delay : nextStaggerDelay());
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[420ms]",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        "motion-reduce:transition-none",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        className
      )}
      style={{ transitionDelay: `${revealDelay}ms` }}
    >
      {children}
    </div>
  );
}
