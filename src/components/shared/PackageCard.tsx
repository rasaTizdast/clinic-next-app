import { Check, Gift, Star, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Package } from "@/lib/types";
import { getServiceById } from "@/data";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

const categoryConfig = {
  basic: {
    label: "پایه",
    headerBg: "bg-gradient-to-br from-accent/10 via-accent/5 to-transparent",
    accentColor: "text-accent",
    ringColor: "ring-accent/15",
  },
  standard: {
    label: "استاندارد",
    headerBg: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
    accentColor: "text-primary",
    ringColor: "ring-primary/15",
  },
  premium: {
    label: "ویژه",
    headerBg: "bg-gradient-to-br from-primary/15 via-primary/8 to-transparent",
    accentColor: "text-primary",
    ringColor: "ring-primary/20",
  },
};

export function PackageCard({ pkg }: PackageCardProps) {
  const config = categoryConfig[pkg.category];
  const freeCount = pkg.services.filter((s) => s.free).length;

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden",
        pkg.popular && "border-primary/40 shadow-xl ring-1 ring-primary/15"
      )}
    >
      {pkg.popular && (
        <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />
      )}

      {/* Header */}
      <div className={cn("p-5 pb-4", config.headerBg)}>
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant={pkg.popular ? "warning" : "default"}
            className={cn(!pkg.popular && "bg-muted text-foreground/50")}
          >
            {pkg.popular && <Star className="h-3 w-3 ml-1 fill-current" />}
            {pkg.popular ? "محبوب‌ترین" : config.label}
          </Badge>
          {freeCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
              <Gift className="h-3 w-3" />
              {freeCount} خدمت رایگان
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">{pkg.name}</h3>
        <p className="text-sm text-foreground/45 leading-relaxed">{pkg.description}</p>
      </div>

      {/* Services list */}
      <div className="px-5 py-4 flex-1">
        <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider mb-3">
          خدمات شامل
        </p>
        <ul className="space-y-2">
          {pkg.services.map((pkgService, index) => {
            const service = getServiceById(pkgService.serviceId);
            return (
              <li
                key={index}
                className={cn(
                  "flex items-center justify-between gap-2 py-2 px-3 rounded-lg",
                  pkgService.free ? "bg-success/5" : "bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                      pkgService.free ? "bg-success/15" : "bg-primary/10"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-3 w-3",
                        pkgService.free ? "text-success" : "text-primary"
                      )}
                    />
                  </span>
                  <span className="text-sm text-foreground/70 truncate">
                    {service?.title || "خدمت"}
                  </span>
                </div>
                {pkgService.free && (
                  <span className="flex-shrink-0 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                    رایگان
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price + CTA */}
      <div className="px-5 pb-5 pt-2 border-t border-border/40">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className={cn("text-2xl font-extrabold tracking-tight", config.accentColor)}>
                {formatPrice(pkg.price)}
              </span>
              <span className="text-xs text-foreground/40">تومان</span>
            </div>
            {pkg.originalPrice && (
              <span className="text-xs text-foreground/30 line-through">
                {formatPrice(pkg.originalPrice)}
              </span>
            )}
          </div>
          {pkg.originalPrice && (
            <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
              {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}٪ تخفیف
            </span>
          )}
        </div>
        <Button
          variant={pkg.popular ? "primary" : "secondary"}
          className="w-full group"
        >
          <span>رزرو وقت</span>
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}
