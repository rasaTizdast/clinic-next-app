import { HeroSection } from "@/components/landing/HeroSection";
import { StoryChapter } from "@/components/landing/StoryChapter";
import { ServicesPreview } from "@/components/landing/ServicesPreview";
import { PackagesPreview } from "@/components/landing/PackagesPreview";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Home() {
  return (
    <>
      <HeroSection />

      <StoryChapter
        eyebrow="داستان ما"
        title="بیش از ۱۰ سال تجربه در زیبایی"
        description="کلینیک زیبا با بیش از ۱۰ سال تجربه در زمینه خدمات زیبایی، پوست و مو، همواره در تلاش است تا بهترین خدمات را با بالاترین کیفیت به مراجعین ارائه دهد. تیم متخصص ما متشکل از بهترین پزشکان و متخصصان زیبایی است."
      >
        <div className="bg-muted rounded-2xl p-8 aspect-video flex items-center justify-center">
          <p className="text-foreground/40 text-sm">تصویر کلینیک</p>
        </div>
      </StoryChapter>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ServicesPreview />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <PackagesPreview />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <TestimonialsSection />
      </Suspense>

      <CTASection />
    </>
  );
}
