"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, Tag, CheckCircle } from "lucide-react";
import { getServices, getServiceBySlug } from "@/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { use } from "react";

const categoryLabels: Record<string, string> = {
  skin: "پوست",
  hair: "مو",
  body: "بدن",
  face: "صورت",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="relative py-32 sm:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,140,99,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary mb-10 transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به لیست خدمات
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Info */}
              <div>
                <Badge variant="accent" className="mb-6 px-4 py-1.5 text-sm">
                  {categoryLabels[service.category]}
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  {service.title}
                </h1>
                
                <p className="text-xl text-white/80 mb-8 leading-relaxed font-light">
                  {service.description}
                </p>
                
                <div className="text-lg text-white/70 mb-10 leading-relaxed font-light">
                  <p>{service.longDescription}</p>
                </div>

                <div className="flex flex-wrap gap-8 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Tag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-0.5">قیمت</p>
                      <p className="text-xl font-bold text-primary">{formatPrice(service.price)} <span className="text-sm font-normal text-white/60">تومان</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Clock className="h-6 w-6 text-white/70" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-0.5">مدت زمان</p>
                      <p className="text-xl font-bold text-white">{service.duration}</p>
                    </div>
                  </div>
                </div>

                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary-light text-white px-8 py-4 text-lg shadow-lg shadow-primary/30 rounded-xl">
                    رزرو وقت
                  </Button>
                </Link>
              </div>

              {/* Image placeholder */}
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="absolute inset-0 texture-grain opacity-[0.03]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse blur-xl" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
