import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/data";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Section>
      <ScrollReveal>
        <Link
          href="/products"
          className="inline-flex items-center text-foreground/60 hover:text-foreground mb-8 transition-colors"
        >
          ← بازگشت به محصولات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {product.title}
            </h1>
            <p className="text-foreground/60 mb-6">{product.description}</p>
            {product.price && (
              <p className="text-2xl font-semibold text-primary mb-6">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>
            )}
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/80 leading-relaxed">
                {product.longDescription}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}