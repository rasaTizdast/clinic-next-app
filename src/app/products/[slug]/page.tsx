"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
      {/* Hero — Split diptych */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary mb-10 transition-colors duration-200"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به محصولات
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Info */}
              <div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-[1.1]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {product.title}
                </h1>

                <p className="text-lg text-white/40 mb-6 leading-relaxed font-light max-w-lg">
                  {product.description}
                </p>

                {product.price && (
                  <p className="text-2xl font-black text-primary mb-6">
                    {product.price.toLocaleString("fa-IR")}
                    <span className="text-sm font-medium text-white/30 mr-1">تومان</span>
                  </p>
                )}

                <p className="text-base text-white/50 mb-10 leading-relaxed font-light">
                  {product.longDescription}
                </p>

                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-light text-white px-8 py-4 shadow-lg shadow-primary/20 rounded-xl btn-premium"
                >
                  افزودن به سبد خرید
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
