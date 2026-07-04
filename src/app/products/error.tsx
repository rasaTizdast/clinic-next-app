"use client";

import { Section } from "@/components/layout/Section";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          خطا در بارگذاری محصولات
        </h2>
        <p className="text-foreground/60 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    </Section>
  );
}
