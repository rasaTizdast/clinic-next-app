import type { Metadata } from "next";
import { ProductsPageClient } from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "محصولات",
  description: "محصولات مراقبت از پوست کلینیک زیبایی باران",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
