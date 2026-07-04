import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFeaturedServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ServicesPreview() {
  const featuredServices = getFeaturedServices();

  return (
    <section className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-3">تخصص ما</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              خدمات تخصصی زیبایی
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              با استفاده از پیشرفته‌ترین تجهیزات و بهترین متخصصان، خدمات متنوعی
              برای زیبایی و جوانسازی ارائه می‌دهیم.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors"
            >
              مشاهده همه خدمات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
