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
        description="کلینیک زیبایی باران با بیش از ۱۰ سال تجربه در زمینه خدمات زیبایی، پوست و مو، همواره در تلاش است تا بهترین خدمات را با بالاترین کیفیت به مراجعین ارائه دهد. تیم متخصص ما متشکل از بهترین پزشکان و متخصصان زیبایی است."
      >
        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 texture-grain opacity-[0.03]" />
          <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse blur-xl" />
        </div>
      </StoryChapter>

      <Suspense
        fallback={
          <div className="py-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 rounded-3xl bg-foreground/5" />
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
          <div className="py-40 bg-surface">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-96 rounded-3xl" />
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
          <div className="py-40 bg-surface">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 rounded-3xl" />
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
