import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "./Container";

const footerLinks = {
  services: [
    { href: "/services/botox", label: "بوتاکس" },
    { href: "/services/laser-hair-removal", label: "لیزر موهای زائد" },
    { href: "/services/facial", label: "پاکسازی پوست" },
    { href: "/services/prp", label: "پی\u200cآرپی" },
  ],
  company: [
    { href: "/about", label: "درباره ما" },
    { href: "/packages", label: "پکیج\u200cها" },
    { href: "/products", label: "محصولات" },
    { href: "/contact", label: "تماس با ما" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">کلینیک زیبا</h3>
            <p className="text-sm text-background/70 leading-relaxed">
              ارائه دهنده خدمات تخصصی زیبایی، پوست و مو با بهترین متخصصان و
              پیشرفته\u200cترین تجهیزات
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">خدمات</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">کلینیک</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>تهران، خیابان ولیعصر، نبش کوچه گل</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@ziba-clinic.ir</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Clock className="h-4 w-4 shrink-0" />
                <span>شنبه تا پنجشنبه ۹ صبح تا ۸ شب</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-background/10 text-center">
          <p className="text-xs text-background/50">
            © ۱۴۰۵ کلینیک زیبا. تمامی حقوق محفوظ است.
          </p>
        </div>
      </Container>
    </footer>
  );
}
