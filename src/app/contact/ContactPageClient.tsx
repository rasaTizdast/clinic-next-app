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
      {/* Hero — split diptych style */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal>
              <div>
                <div className="eyebrow text-white/50 mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-px bg-primary" />
                  تماس با ما
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  تماس با <span className="text-primary">باران</span>
                </h1>
                <p className="text-lg text-white/40 max-w-lg font-light leading-relaxed">
                  برای دریافت مشاوره یا رزرو وقت با ما تماس بگیرید
                </p>
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-2xl overflow-hidden bg-white/5 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
                  alt="کلینیک زیبایی باران"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
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
