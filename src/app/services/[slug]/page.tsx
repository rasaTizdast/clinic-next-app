import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getServices, getServiceBySlug } from "@/data";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

const categoryLabels: Record<string, string> = {
  skin: "پوست",
  hair: "مو",
  body: "بدن",
  face: "صورت",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "خدمت یافت نشد" };
  return {
    title: service.title,
    description: service.description,
  };
}

export async function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary mb-8 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به لیست خدمات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="accent">{categoryLabels[service.category]}</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-foreground/60 mb-6 leading-relaxed">
              {service.description}
            </p>
            <div className="prose prose-lg text-foreground/70 mb-8">
              <p>{service.longDescription}</p>
            </div>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-foreground/50">قیمت</p>
                  <p className="font-bold text-primary">{formatPrice(service.price)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-foreground/50">مدت زمان</p>
                  <p className="font-bold">{service.duration}</p>
                </div>
              </div>
            </div>

            <Link href="/contact">
              <Button size="lg">رزرو وقت</Button>
            </Link>
          </div>

          {/* Image placeholder */}
          <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center">
            <p className="text-foreground/40">تصویر خدمت</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
