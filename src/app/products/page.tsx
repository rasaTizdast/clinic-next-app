import { getProducts } from "@/data";
import { ProductCard } from "@/components/shared/ProductCard";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "محصولات",
  description: "محصولات مراقبت از پوست کلینیک زیبا",
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            محصولات
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            محصولات مراقبت از پوست با کیفیت بالا
          </p>
        </div>
      </ScrollReveal>
      {products.length === 0 ? (
        <EmptyState
          title="محصولی موجود نیست"
          description="در حال حاضر محصولی وجود ندارد. لطفاً بعداً دوباره بررسی کنید."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </Section>
  );
}
