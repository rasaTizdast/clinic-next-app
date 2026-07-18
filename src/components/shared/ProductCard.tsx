"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="rounded-2xl overflow-hidden bg-surface border border-border/30 hover:border-primary/15 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        {/* Image */}
        <div className="aspect-[4/3] bg-muted/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-1.5">
            {product.title}
          </h3>
          <p className="text-sm text-foreground/40 leading-relaxed line-clamp-2 mb-4 font-light">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border/20">
            {product.price && (
              <span className="text-lg font-black text-primary">
                {formatPrice(product.price)}
                <span className="text-xs font-medium text-foreground/30 mr-1">تومان</span>
              </span>
            )}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-primary/70 group-hover:text-primary transition-colors duration-200">
              <span>مشاهده</span>
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
