import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Stethoscope } from "lucide-react";
import { ServicesFilter } from "./ServicesFilter";

export const metadata = {
  title: "خدمات",
  description: "لیست خدمات تخصصی زیبایی، پوست و مو کلینیک زیبا",
};

export default function ServicesPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Stethoscope className="h-4 w-4" />
            <span>خدمات تخصصی</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            خدمات تخصصی ما
          </h1>
          <p className="text-foreground/50 max-w-xl mx-auto leading-relaxed">
            مجموعه‌ای متنوع از خدمات تخصصی زیبایی، پوست و مو با بهترین کیفیت
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        }
      >
        <ServicesFilter />
      </Suspense>
    </Section>
  );
}
