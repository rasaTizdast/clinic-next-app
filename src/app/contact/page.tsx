import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/shared/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "تماس با ما",
  description: "با کلینیک زیبا تماس بگیرید و وقت رزرو کنید",
};

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
    value: "info@ziba-clinic.ir",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه ۹ صبح تا ۸ شب",
  },
];

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              تماس با ما
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              برای دریافت مشاوره یا رزرو وقت با ما تماس بگیرید
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <ScrollReveal>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/60">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Map Placeholder */}
          <ScrollReveal delay={100}>
            <div className="bg-muted rounded-xl aspect-square flex items-center justify-center">
              <p className="text-foreground/40 text-sm">نقشه</p>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={200}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
