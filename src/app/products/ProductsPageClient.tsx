"use client";

import { getProducts } from "@/data";
import { ProductCard } from "@/components/shared/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Package } from "lucide-react";

export function ProductsPageClient() {
  const products = getProducts();

  return (
    <>
      <section className="relative py-32 sm:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,140,99,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
              <Package className="h-4 w-4 text-primary" />
              <span>محصولات ویژه</span>
            </div>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              محصولات <span className="text-primary">مراقبت از پوست</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              محصولات مراقبت از پوست با کیفیت بالا و تأیید متخصصان
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <EmptyState
              title="محصولی موجود نیست"
              description="در حال حاضر محصولی وجود ندارد. لطفاً بعداً دوباره بررسی کنید."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 100}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
