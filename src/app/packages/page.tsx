import { Suspense } from "react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "پکیج‌ها",
  description: "پکیج‌های ویژه مراقبت از پوست کلینیک زیبا",
};

function PackagesList() {
  const packages = getPackages();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
      {packages.map((pkg, index) => (
        <ScrollReveal key={pkg.id} delay={index * 80}>
          <PackageCard pkg={pkg} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Sparkles className="h-4 w-4" />
            <span>پیشنهاد ویژه</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            پکیج‌های ویژه
          </h1>
          <p className="text-foreground/50 max-w-xl mx-auto leading-relaxed">
            پکیج‌های مراقبت از پوست با ترکیب خدمات مختلف و قیمت‌های مناسب، بهترین انتخاب
            برای زیبایی و جوانسازی
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        }
      >
        <PackagesList />
      </Suspense>
    </Section>
  );
}
