"use client";

import Link from "next/link";
import { Phone, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function CTASection() {
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
    <section className="relative py-32 sm:py-40 bg-foreground text-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,140,99,0.15),transparent_70%)] pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-ambient-drift" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className={cn(
            "text-center max-w-3xl mx-auto transition-[opacity,transform] duration-1000",
            "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            همین الان رزرو کنید
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            برای زیبایی خود <span className="text-primary">اقدام کنید</span>
          </h2>

          <p className="text-xl text-background/80 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            برای دریافت مشاوره رایگان و رزرو وقت با ما تماس بگیرید. تیم
            متخصص ما آماده پاسخگویی به سوالات شماست.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <a href="tel:+989121234567" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-3 bg-primary text-white hover:bg-primary-light shadow-xl shadow-primary/30 btn-premium rounded-xl py-5 text-lg">
                <Phone className="h-6 w-6" />
                <span className="font-bold">۰۹۱۲-۱۲۳-۴۵۶۷</span>
              </Button>
            </a>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full gap-3 text-white border border-white/20 hover:bg-white/10 py-5 text-lg rounded-xl">
                فرم تماس
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-background/60 font-light">
            <MapPin className="h-4 w-4 text-primary/70" />
            <span>تهران، خیابان ولیعصر، نبش کوچه گل</span>
          </div>
        </div>
      </div>
    </section>
  );
}
