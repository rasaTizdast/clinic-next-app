"use client";

import { getProducts } from "@/data";
import { ProductCard } from "@/components/shared/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductsPageClient() {
  const products = getProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <div className="eyebrow text-white/50 mb-4">محصولات</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              محصولات <span className="text-primary">مراقبت از پوست</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
              محصولات با کیفیت و اصل برای مراقبت روزانه پوست
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 60}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
