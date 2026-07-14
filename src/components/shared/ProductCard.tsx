"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-surface rounded-[2rem] overflow-hidden border border-border/40 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 pb-8 relative">
        <div className="absolute -top-8 right-6">
          <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-lg border border-border/40 transform translate-y-1/2 group-hover:-translate-y-1 transition-transform duration-500">
            <span className="text-sm font-bold text-primary">جدید</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 pt-2">
          {product.title}
        </h3>
        <p className="text-[15px] text-foreground/70 line-clamp-2 leading-relaxed font-light">
          {product.description}
        </p>
      </div>
    </Link>
  );
}
