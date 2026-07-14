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
    headerBg: "bg-gradient-to-br from-muted to-background",
    accentColor: "text-foreground",
    ringColor: "ring-border/50",
  },
  standard: {
    label: "استاندارد",
    headerBg: "bg-gradient-to-br from-primary/10 to-primary/5",
    accentColor: "text-primary",
    ringColor: "ring-primary/30",
  },
  premium: {
    label: "ویژه",
    headerBg: "bg-gradient-to-br from-foreground to-foreground/90",
    accentColor: "text-primary",
    ringColor: "ring-primary/40",
  },
};

export function PackageCard({ pkg }: PackageCardProps) {
  const config = categoryConfig[pkg.category];
  const freeCount = pkg.services.filter((s) => s.free).length;

  const isPremium = pkg.category === "premium";

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[2rem] bg-surface border transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl",
        pkg.popular ? "border-primary/40 ring-1 ring-primary/20" : "border-border/40",
        isPremium && "text-white bg-foreground border-transparent"
      )}
    >
      {pkg.popular && (
        <div className="h-1.5 bg-gradient-to-r from-primary via-primary-light to-primary" />
      )}

      {/* Header */}
      <div className={cn("p-8 pb-6", isPremium ? "bg-transparent" : config.headerBg)}>
        <div className="flex items-center justify-between mb-6">
          <Badge
            variant={pkg.popular ? "warning" : "default"}
            className={cn(
              "px-3 py-1 text-sm font-semibold rounded-full",
              !pkg.popular && !isPremium && "bg-foreground/5 text-foreground/70",
              isPremium && "bg-primary/20 text-primary border-none"
            )}
          >
            {pkg.popular && <Star className="h-3.5 w-3.5 ml-1.5 fill-current" />}
            {pkg.popular ? "محبوب‌ترین" : config.label}
          </Badge>
          
          {freeCount > 0 && (
            <span className={cn(
              "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full",
              isPremium ? "bg-success/20 text-success" : "bg-success/10 text-success"
            )}>
              <Gift className="h-3.5 w-3.5" />
              {freeCount} رایگان
            </span>
          )}
        </div>
        
        <h3 className={cn("text-2xl font-bold mb-2", isPremium ? "text-white" : "text-foreground")}>
          {pkg.name}
        </h3>
        <p className={cn("text-sm leading-relaxed", isPremium ? "text-white/70" : "text-foreground/70")}>
          {pkg.description}
        </p>
      </div>

      {/* Services list */}
      <div className="px-8 py-6 flex-1">
        <p className={cn(
          "text-xs font-bold uppercase tracking-widest mb-4",
          isPremium ? "text-white/60" : "text-foreground/60"
        )}>
          خدمات شامل
        </p>
        <ul className="space-y-3">
          {pkg.services.map((pkgService, index) => {
            const service = getServiceById(pkgService.serviceId);
            return (
              <li
                key={index}
                className={cn(
                  "flex items-center justify-between gap-3 py-3 px-4 rounded-xl",
                  isPremium 
                    ? "bg-white/5" 
                    : pkgService.free ? "bg-success/5" : "bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                      pkgService.free 
                        ? "bg-success/20 text-success" 
                        : isPremium ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                    )}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className={cn(
                    "text-[15px] font-medium truncate",
                    isPremium ? "text-white/80" : "text-foreground/70"
                  )}>
                    {service?.title || "خدمت"}
                  </span>
                </div>
                
                {pkgService.free && (
                  <span className="flex-shrink-0 text-xs font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
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
        "px-8 pb-8 pt-6 mt-auto",
        isPremium ? "border-t border-white/10" : "border-t border-border/40"
      )}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-baseline gap-2">
              <span className={cn("text-3xl font-black tracking-tight", config.accentColor)}>
                {formatPrice(pkg.price)}
              </span>
              <span className={cn("text-sm font-medium", isPremium ? "text-white/60" : "text-foreground/60")}>تومان</span>
            </div>
            {pkg.originalPrice && (
              <span className={cn("text-sm line-through", isPremium ? "text-white/50" : "text-foreground/50")}>
                {formatPrice(pkg.originalPrice)}
              </span>
            )}
          </div>
          {pkg.originalPrice && (
            <span className="text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full">
              {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}٪ تخفیف
            </span>
          )}
        </div>
        
        <Button
          variant={isPremium ? "primary" : "secondary"}
          className={cn(
            "w-full py-4 text-base font-bold rounded-xl transition-all duration-300 group",
            isPremium 
              ? "bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/30" 
              : "border-border/60 hover:border-primary hover:text-primary"
          )}
        >
          <span>رزرو وقت</span>
          <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-2" />
        </Button>
      </div>
    </div>
  );
}
