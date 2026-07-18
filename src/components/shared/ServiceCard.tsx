"use client";

import Link from "next/link";
import {
  Sparkles,
  Zap,
  Droplets,
  Heart,
  Scissors,
  Syringe,
  Flower2,
  Layers,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  zap: Zap,
  droplets: Droplets,
  heart: Heart,
  scissors: Scissors,
  syringe: Syringe,
  flower2: Flower2,
  layers: Layers,
};

const categoryConfig: Record<
  string,
  { label: string; iconBg: string; iconColor: string; badgeVariant: "accent" | "default" | "success" }
> = {
  skin: {
    label: "پوست",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeVariant: "accent",
  },
  hair: {
    label: "مو",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeVariant: "default",
  },
  body: {
    label: "بدن",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    badgeVariant: "success",
  },
  face: {
    label: "صورت",
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
  const Icon = iconMap[service.icon] || Sparkles;
  const config = categoryConfig[service.category];
  const isDark = variant === "dark";

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div
        className={cn(
          "flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden transition-all duration-300",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          isDark
            ? "bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10"
            : "bg-surface border border-border/40 hover:border-primary/20 hover:shadow-lg",
          "hover:-translate-y-0.5"
        )}
      >
        {/* Icon area */}
        <div className={cn(
          "relative sm:w-56 lg:w-64 flex-shrink-0 flex items-center justify-center min-h-[140px] sm:min-h-0",
          isDark ? "bg-white/[0.02]" : "bg-muted/50"
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
            <h3 className={cn(
              "text-lg font-bold mb-1.5 transition-colors duration-200",
              isDark ? "text-white group-hover:text-primary" : "text-foreground group-hover:text-primary"
            )}>
              {service.title}
            </h3>
            <p className={cn(
              "text-sm leading-relaxed line-clamp-2 mb-5",
              isDark ? "text-white/40" : "text-foreground/40"
            )}>
              {service.description}
            </p>
          </div>

          <div className={cn(
            "flex items-center justify-between pt-4 border-t",
            isDark ? "border-white/[0.06]" : "border-border/30"
          )}>
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-primary">
                {formatPrice(service.price)}
              </span>
              <span className={cn("text-xs", isDark ? "text-white/30" : "text-foreground/30")}>تومان</span>
              <span className={cn("hidden sm:inline", isDark ? "text-white/15" : "text-foreground/15")}>|</span>
              <div className={cn("hidden sm:flex items-center gap-1", isDark ? "text-white/30" : "text-foreground/30")}>
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs">{service.duration}</span>
              </div>
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
