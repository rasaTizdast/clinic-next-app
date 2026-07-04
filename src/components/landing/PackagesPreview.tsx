import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PackagesPreview() {
  const packages = getPackages();

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-3">پکیج‌های ویژه</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              پکیج‌های مراقبت از پوست
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              پکیج‌های ویژه ما با قیمت‌های مناسب و خدمات متنوع، بهترین انتخاب
              برای مراقبت از پوست شما هستند.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 100}>
              <PackageCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors"
            >
              مشاهده همه پکیج‌ها
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
