import Link from "next/link";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { getFeaturedServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ServicesPreview() {
  const featuredServices = getFeaturedServices();

  return (
    <section className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Stethoscope className="h-4 w-4" />
              <span>تخصص ما</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              خدمات تخصصی زیبایی
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto leading-relaxed">
              با استفاده از پیشرفته‌ترین تجهیزات و بهترین متخصصان، خدمات متنوعی
              برای زیبایی و جوانسازی ارائه می‌دهیم.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {featuredServices.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 80}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors group"
            >
              <span>مشاهده همه خدمات</span>
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
