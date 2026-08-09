import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { getServiceBySlug } from "@/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const categoryLabels: Record<string, string> = {
  skin: "پوست",
  hair: "مو",
  body: "بدن",
  face: "صورت",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero — Split diptych */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary mb-10 transition-colors duration-200"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به لیست خدمات
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Info */}
              <div>
                <Badge variant="accent" className="mb-5 px-3 py-1 text-xs">
                  {categoryLabels[service.category]}
                </Badge>

                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-[1.1]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {service.title}
                </h1>

                <p className="text-lg text-white/40 mb-8 leading-relaxed font-light max-w-lg">
                  {service.longDescription}
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/15 rounded-xl">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/30 mb-0.5">قیمت</p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(service.price)}
                        <span className="text-xs font-normal text-white/30 mr-1">تومان</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/5 rounded-xl">
                      <Clock className="h-5 w-5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/30 mb-0.5">مدت زمان</p>
                      <p className="text-lg font-bold text-white/70">{service.duration}</p>
                    </div>
                  </div>
                </div>

                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary-light text-white px-8 py-4 shadow-lg shadow-primary/20 rounded-xl btn-premium"
                  >
                    رزرو وقت
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Visual */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/15 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-primary/15 animate-pulse blur-xl" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
