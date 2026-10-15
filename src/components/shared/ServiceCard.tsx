"use client";

import Link from "next/link";
import Image from "next/image";
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
  { label: string; iconBg: string; iconColor: string }
> = {
  "filler-botox": {
    label: "فیلر و بوتاکس",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  "laser-women": {
    label: "لیزر بانوان",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  "laser-men": {
    label: "لیزر آقایان",
    iconBg: "bg-foreground/5",
    iconColor: "text-foreground/60",
  },
  facial: {
    label: "فیشیال",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
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
          "flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden transition-all duration-300 lg:h-[360px]",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          isDark
            ? "bg-surface border border-border/40 hover:border-primary/20 hover:shadow-lg"
            : "bg-surface border border-border/40 hover:border-primary/20 hover:shadow-lg",
          "hover:-translate-y-0.5"
        )}
      >
        {/* Image area — 4:3 */}
        <div className={cn(
          "relative overflow-hidden shrink-0 w-full max-w-[420px] aspect-[4/3] bg-muted/50",
          "lg:w-auto lg:max-w-none"
        )}>
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 480px, min(420px, 100vw)"
              className="object-cover transition-transform duration-500 group-hover:scale-105 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "p-5 rounded-xl transition-transform duration-300 group-hover:scale-105",
                config.iconBg
              )}>
                <Icon className={cn("h-10 w-10", config.iconColor)} />
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className="bg-foreground text-background shadow-pill">{config.label}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col justify-between">
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
