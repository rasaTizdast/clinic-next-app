"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { use } from "react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="relative py-32 sm:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,140,99,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary mb-10 transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به محصولات
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  {product.title}
                </h1>
                
                <p className="text-xl text-white/80 mb-8 leading-relaxed font-light">
                  {product.description}
                </p>
                
                {product.price && (
                  <p className="text-3xl font-black text-primary mb-10">
                    {product.price.toLocaleString("fa-IR")} <span className="text-base font-medium text-white/60">تومان</span>
                  </p>
                )}
                
                <div className="text-lg text-white/70 mb-10 leading-relaxed font-light">
                  <p>{product.longDescription}</p>
                </div>

                <Button size="lg" className="bg-primary hover:bg-primary-light text-white px-8 py-4 text-lg shadow-lg shadow-primary/30 rounded-xl">
                  افزودن به سبد خرید
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
