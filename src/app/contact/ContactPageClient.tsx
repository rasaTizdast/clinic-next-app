"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/shared/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const contactInfo = [
  {
    icon: MapPin,
    title: "آدرس",
    value: "تهران، خیابان ولیعصر، نبش کوچه گل، پلاک ۱۲",
  },
  {
    icon: Phone,
    title: "تلفن",
    value: "۰۹۱۲-۱۲۳-۴۵۶۷",
  },
  {
    icon: Mail,
    title: "ایمیل",
    value: "info@baran-clinic.ir",
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
      {/* Hero */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <div className="eyebrow text-white/50 mb-4">تماس با ما</div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              تماس با <span className="text-primary">باران</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
              برای دریافت مشاوره یا رزرو وقت با ما تماس بگیرید
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Split: Info + Form */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-5 group">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors duration-200">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/40 font-light">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={100}>
              <div className="bg-surface rounded-2xl p-6 lg:p-8 border border-border/30">
                <h2 className="text-xl font-bold text-foreground mb-6">فرم تماس</h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
