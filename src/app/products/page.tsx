import { Suspense } from "react";
import { getProducts } from "@/data";
import { ProductCard } from "@/components/shared/ProductCard";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "محصولات",
  description: "محصولات مراقبت از پوست کلینیک زیبا",
};

function ProductsList() {
  const products = getProducts();

  if (products.length === 0) {
    return (
      <EmptyState
        title="محصولی موجود نیست"
        description="در حال حاضر محصولی وجود نارد. لطفاً بعداً دوباره بررسی کنید."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ScrollReveal key={product.id} delay={index * 100}>
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            محصولات
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            محصولات مراقبت از پوست با کیفیت بالا
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        }
      >
        <ProductsList />
      </Suspense>
    </Section>
  );
}
