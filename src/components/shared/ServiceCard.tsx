"use client";

import Link from "next/link";
import { Syringe, Zap, Sparkles, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatAmount } from "@/lib/utils";
import { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "filler-botox": Syringe,
  "laser-women": Zap,
  "laser-men": Zap,
  facial: Sparkles,
};

const categoryConfig: Record<
  Service["category"],
  { label: string; iconBg: string; iconColor: string; badgeVariant: "accent" | "default" | "success" }
> = {
  "filler-botox": {
    label: "فیلر و بوتاکس",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeVariant: "accent",
  },
  "laser-women": {
    label: "لیزر بانوان",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    badgeVariant: "success",
  },
  "laser-men": {
    label: "لیزر آقایان",
    iconBg: "bg-foreground/5",
    iconColor: "text-foreground/60",
    badgeVariant: "default",
  },
  facial: {
    label: "فیشیال",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeVariant: "default",
  },
};

interface ServiceCardProps {
  service: Service;
  variant?: "light" | "dark";
}

export function ServiceCard({ service, variant = "light" }: ServiceCardProps) {
  const Icon = iconMap[service.category] || Sparkles;
  const config = categoryConfig[service.category];
  const isDark = variant === "dark";

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div
        className={cn(
          "flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden transition-all duration-300",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          isDark
            ? "bg-surface border border-border/40 hover:border-primary/20 hover:shadow-lg"
            : "bg-surface border border-border/40 hover:border-primary/20 hover:shadow-lg",
          "hover:-translate-y-0.5"
        )}
      >
        {/* Icon area */}
        <div className={cn(
          "relative sm:w-56 lg:w-64 flex-shrink-0 flex items-center justify-center min-h-[140px] sm:min-h-0",
          isDark ? "bg-muted/50" : "bg-muted/50"
        )}>
          <div className={cn(
            "p-5 rounded-xl transition-transform duration-300 group-hover:scale-105",
            config.iconBg
          )}>
            <Icon className={cn("h-10 w-10", config.iconColor)} />
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant={config.badgeVariant}>{config.label}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h3 className={cn(
                "text-lg font-bold transition-colors duration-200",
                "text-foreground group-hover:text-primary"
              )}>
                {service.title}
              </h3>
              {service.subcategory && (
                <span className="text-[10px] font-semibold text-foreground/50 bg-muted px-2 py-0.5 rounded-full">
                  {service.subcategory}
                </span>
              )}
            </div>
            <p className={cn(
              "text-sm leading-relaxed line-clamp-3 mb-5",
              "text-foreground/60"
            )}>
              {service.description}
            </p>
          </div>

          <div className={cn(
            "flex items-center justify-between pt-4 border-t",
            "border-border/30"
          )}>
            <div className="flex items-center gap-1.5">
              {service.fromPrice && (
                <span className="text-xs font-medium text-foreground/60">از</span>
              )}
              <span className="text-lg font-black text-primary">
                {formatAmount(service.price)}
              </span>
              <span className="text-xs text-foreground/50">تومان</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary/70 group-hover:text-primary transition-colors duration-200">
              <span>جزئیات</span>
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
