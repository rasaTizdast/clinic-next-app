import { Suspense } from "react";
import { getServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "خدمات",
  description: "لیست خدمات تخصصی زیبایی، پوست و مو کلینیک زیبا",
};

function ServicesList() {
  const services = getServices();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ScrollReveal key={service.id} delay={index * 50}>
          <ServiceCard service={service} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            خدمات تخصصی ما
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            مجموعه‌ای متنوع از خدمات تخصصی زیبایی، پوست و مو با بهترین کیفیت
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        }
      >
        <ServicesList />
      </Suspense>
    </Section>
  );
}
