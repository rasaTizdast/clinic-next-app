import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <p className="text-primary font-medium mb-4">کلینیک تخصصی زیبایی</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            زیبایی طبیعی،
            <br />
            <span className="text-primary">اعتماد به نفس</span> واقعی
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 mb-8 max-w-xl leading-relaxed">
            در کلینیک زیبا، با بهترین متخصصان و پیشرفته‌ترین تجهیزات، زیبایی
            طبیعی خود را کشف کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                رزرو مشاوره رایگان
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg">
                مشاهده خدمات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
