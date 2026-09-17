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
        description="کلینیک زیبایی باران با بیش از ۱۰ سال تجربه در زمینه خدمات زیبایی، پوست و مو، همواره در تلاش است تا بهترین خدمات را با بالاترین کیفیت به مراجعین ارائه دهد."
      />

      <Suspense
        fallback={
          <div className="py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-5 max-w-5xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-56 rounded-2xl bg-muted" />
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
          <div className="py-32 bg-surface">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
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
          <div className="py-32 bg-surface">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-56 rounded-2xl" />
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
