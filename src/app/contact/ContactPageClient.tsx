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
      <section className="relative py-32 sm:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,140,99,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              تماس با <span className="text-primary">باران</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              برای دریافت مشاوره یا رزرو وقت با ما تماس بگیرید
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-10">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-6 group">
                    <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-base text-foreground/60 font-light">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={200}>
              <div className="bg-surface rounded-[2rem] p-8 lg:p-10 shadow-sm border border-border/40">
                <h2 className="text-2xl font-bold text-foreground mb-8">فرم تماس</h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
