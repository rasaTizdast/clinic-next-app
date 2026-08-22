"use client";

import { getProducts } from "@/data";
import { ProductCard } from "@/components/shared/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductsPageClient() {
  const products = getProducts();

  return (
    <>
      {/* Hero — split diptych style */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden border-b border-border/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal>
              <div>
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-px bg-primary" />
                  محصولات
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  محصولات <span className="text-primary">مراقبت از پوست</span>
                </h1>
                <p className="text-lg text-foreground/40 max-w-lg font-light leading-relaxed">
                  محصولات با کیفیت و اصل برای مراقبت روزانه پوست
                </p>
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop"
                  alt="محصولات مراقبت از پوست"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
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
