import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-foreground to-foreground/90 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              همین الان رزرو کنید
            </h2>
            <p className="text-background/70 mb-8 leading-relaxed">
              برای دریافت مشاوره رایگان و رزرو وقت با ما تماس بگیرید. تیم
              متخصص ما آماده پاسخگویی به سوالات شماست.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="tel:+989121234567">
                <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-light">
                  <Phone className="h-5 w-5" />
                  ۰۹۱۲-۱۲۳-۴۵۶۷
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="border-background/30 text-background hover:bg-background/10">
                  فرم تماس
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-background/60">
              <MapPin className="h-4 w-4" />
              <span>تهران، خیابان ولیعصر، نبش کوچه گل</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
