import { Suspense } from "react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "پکیج‌ها",
  description: "پکیج‌های ویژه مراقبت از پوست کلینیک زیبا",
};

function PackagesList() {
  const packages = getPackages();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {packages.map((pkg, index) => (
        <ScrollReveal key={pkg.id} delay={index * 100}>
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
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            پکیج‌های ویژه
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            پکیج‌های مراقبت از پوست با قیمت‌های مناسب و خدمات متنوع
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        }
      >
        <PackagesList />
      </Suspense>
    </Section>
  );
}
