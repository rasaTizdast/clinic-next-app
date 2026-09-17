"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const contactInfo = [
  {
    icon: MapPin,
    title: "آدرس",
    value:
      "تهران — منطقه ۲۲ – بلوار پژوهش – شهرک چیتگر – برج جی۴ – طبقه اداری غربی",
  },
  {
    icon: Phone,
    title: "تلفن",
    value: "۰۹۱۰۰۳۰۰۸۷۵ / ۰۹۱۰۰۳۰۰۸۷۶ / ۰۹۱۰۰۳۰۰۸۷۷",
    href: "tel:+989100300875",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه ۹ صبح تا ۸ شب",
  },
];

export function ContactPageClient() {
  return (
    <>
      {/* Hero — split diptych style */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden border-b border-border/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal>
              <div>
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-px bg-primary" />
                  تماس با ما
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  تماس با <span className="text-primary">باران</span>
                </h1>
                <p className="text-lg text-foreground font-semibold max-w-xl leading-relaxed">
                  برای دریافت مشاوره یا رزرو وقت با ما تماس بگیرید
                </p>
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-4/3">
                {/* Image will be added here */}
                <div className="absolute inset-0 bg-linear-to-t from-foreground/5 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {contactInfo.map((item) => {
              const content = item.href ? (
                <a
                  href={item.href}
                  className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-base sm:text-lg font-bold text-foreground leading-relaxed">
                  {item.value}
                </p>
              );

              return (
                <ScrollReveal key={item.title}>
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    {content}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
