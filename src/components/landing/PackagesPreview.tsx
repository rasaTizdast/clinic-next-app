import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PackagesPreview() {
  const packages = getPackages().slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Sparkles className="h-4 w-4" />
              <span>پکیج‌های ویژه</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              پکیج‌های مراقبت از پوست
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto leading-relaxed">
              پکیج‌های ویژه ما با ترکیب خدمات مختلف و قیمت‌های مناسب، بهترین انتخاب
              برای مراقبت از پوست شما هستند.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 100}>
              <PackageCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-14">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors group"
            >
              <span>مشاهده همه پکیج‌ها</span>
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
