import Link from "next/link";
import { Section } from "@/components/layout/Section";

export default function ProductNotFound() {
  return (
    <Section>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          محصول یافت نشد
        </h2>
        <p className="text-foreground/60 mb-6">
          محصول مورد نظر شما وجود ندارد.
        </p>
        <Link
          href="/products"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-block"
        >
          بازگشت به محصولات
        </Link>
      </div>
    </Section>
  );
}