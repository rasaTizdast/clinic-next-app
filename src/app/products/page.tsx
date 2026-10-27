import type { Metadata } from "next";
import { ProductsPageClient } from "./ProductsPageClient";
import { getPublicProducts } from "@/lib/public-site/api";

export const metadata: Metadata = {
  title: "محصولات",
  description: "محصولات مراقبت از پوست کلینیک زیبایی باران",
};

export default async function ProductsPage() {
  const products = await getPublicProducts();
  return <ProductsPageClient products={products} />;
}
