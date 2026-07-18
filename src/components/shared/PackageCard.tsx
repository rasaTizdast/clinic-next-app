"use client";

import { Check, Gift, Star, ArrowLeft } from "lucide-react";
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
    headerBg: "bg-muted/50",
    accentColor: "text-foreground",
  },
  standard: {
    label: "استاندارد",
    headerBg: "bg-primary/5",
    accentColor: "text-primary",
  },
  premium: {
    label: "ویژه",
    headerBg: "bg-foreground",
    accentColor: "text-primary",
  },
};

export function PackageCard({ pkg }: PackageCardProps) {
  const config = categoryConfig[pkg.category];
  const freeCount = pkg.services.filter((s) => s.free).length;
  const isPremium = pkg.category === "premium";

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl bg-surface border transition-all duration-300 hover:-translate-y-0.5",
        pkg.popular ? "border-primary/30" : "border-border/30",
        isPremium && "text-white bg-foreground border-transparent"
      )}
    >
      {pkg.popular && (
        <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />
      )}

      {/* Header */}
      <div className={cn("p-6 pb-5", isPremium ? "bg-transparent" : config.headerBg)}>
        <div className="flex items-center justify-between mb-5">
          <Badge
            variant={pkg.popular ? "warning" : "default"}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-full",
              !pkg.popular && !isPremium && "bg-foreground/5 text-foreground/60",
              isPremium && "bg-primary/20 text-primary border-none"
            )}
          >
            {pkg.popular && <Star className="h-3 w-3 ml-1 fill-current" />}
            {pkg.popular ? "محبوب‌ترین" : config.label}
          </Badge>

          {freeCount > 0 && (
            <span className={cn(
              "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full",
              isPremium ? "bg-success/20 text-success" : "bg-success/10 text-success"
            )}>
              <Gift className="h-3 w-3" />
              {freeCount} رایگان
            </span>
          )}
        </div>

        <h3 className={cn("text-xl font-bold mb-1.5", isPremium ? "text-white" : "text-foreground")}>
          {pkg.name}
        </h3>
        <p className={cn("text-sm leading-relaxed", isPremium ? "text-white/50" : "text-foreground/40")}>
          {pkg.description}
        </p>
      </div>

      {/* Services list */}
      <div className="px-6 py-5 flex-1">
        <p className={cn(
          "text-[10px] font-bold uppercase tracking-widest mb-3",
          isPremium ? "text-white/30" : "text-foreground/30"
        )}>
          خدمات شامل
        </p>
        <ul className="space-y-2">
          {pkg.services.map((pkgService, index) => {
            const service = getServiceById(pkgService.serviceId);
            return (
              <li
                key={index}
                className={cn(
                  "flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg",
                  isPremium
                    ? "bg-white/[0.04]"
                    : pkgService.free ? "bg-success/5" : "bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                      pkgService.free
                        ? "bg-success/20 text-success"
                        : isPremium ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    )}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span className={cn(
                    "text-sm font-medium truncate",
                    isPremium ? "text-white/60" : "text-foreground/50"
                  )}>
                    {service?.title || "خدمت"}
                  </span>
                </div>

                {pkgService.free && (
                  <span className="flex-shrink-0 text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                    رایگان
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price + CTA */}
      <div className={cn(
        "px-6 pb-6 pt-5 mt-auto",
        isPremium ? "border-t border-white/[0.06]" : "border-t border-border/20"
      )}>
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className={cn("text-2xl font-black tracking-tight", config.accentColor)}>
                {formatPrice(pkg.price)}
              </span>
              <span className={cn("text-xs font-medium", isPremium ? "text-white/30" : "text-foreground/30")}>تومان</span>
            </div>
            {pkg.originalPrice && (
              <span className={cn("text-xs line-through", isPremium ? "text-white/25" : "text-foreground/25")}>
                {formatPrice(pkg.originalPrice)}
              </span>
            )}
          </div>
          {pkg.originalPrice && (
            <span className="text-[10px] font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
              {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}٪ تخفیف
            </span>
          )}
        </div>

        <Button
          variant={isPremium ? "primary" : "secondary"}
          className={cn(
            "w-full py-3.5 text-sm font-bold rounded-xl transition-all duration-200 group",
            isPremium
              ? "bg-primary hover:bg-primary-light text-white shadow-md shadow-primary/20"
              : "border-border/40 hover:border-primary hover:text-primary"
          )}
        >
          <span>رزرو وقت</span>
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
