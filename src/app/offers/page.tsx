import { Suspense } from "react";
import { getActiveOffers } from "@/data";
import { OfferCard } from "@/components/shared/OfferCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "پیشنهادات ویژه",
  description: "پیشنهادات و تخفیف‌های ویژه کلینیک زیبا",
};

export const dynamic = "force-dynamic";

function OffersList() {
  const offers = getActiveOffers();

  if (offers.length === 0) {
    return (
      <EmptyState
        title="پیشنهادی موجود نیست"
        description="در حال حاضر پیشنهاد فعالی وجود نارد. لطفاً بعداً دوباره بررسی کنید."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer, index) => (
        <ScrollReveal key={offer.id} delay={index * 100}>
          <OfferCard offer={offer} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function OffersPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            پیشنهادات ویژه
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            از تخفیف‌ها و پیشنهادات ویژه کلینیک زیبا بهره‌مند شوید
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        }
      >
        <OffersList />
      </Suspense>
    </Section>
  );
}
