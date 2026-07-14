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
    iconBg: "bg-gradient-to-br from-accent/15 to-accent/5",
    iconColor: "text-accent",
    badgeVariant: "accent",
  },
  hair: {
    label: "مو",
    iconBg: "bg-gradient-to-br from-primary/15 to-primary/5",
    iconColor: "text-primary",
    badgeVariant: "default",
  },
  body: {
    label: "بدن",
    iconBg: "bg-gradient-to-br from-success/15 to-success/5",
    iconColor: "text-success",
    badgeVariant: "success",
  },
  face: {
    label: "صورت",
    iconBg: "bg-gradient-to-br from-primary/20 to-primary/8",
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
          "flex flex-col sm:flex-row items-stretch rounded-3xl overflow-hidden transition-all duration-500",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          isDark 
            ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 shadow-xl" 
            : "bg-surface border border-border/60 hover:shadow-xl hover:border-primary/20",
          "hover:-translate-y-1"
        )}
      >
        {/* Image placeholder */}
        <div className={cn(
          "relative sm:w-64 lg:w-72 flex-shrink-0 flex items-center justify-center min-h-[180px] sm:min-h-0",
          isDark ? "bg-white/5" : "bg-gradient-to-br from-muted to-muted/50"
        )}>
          <div className={cn(
            "p-6 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
            config.iconBg
          )}>
            <Icon className={cn("h-12 w-12", config.iconColor)} />
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant={config.badgeVariant}>{config.label}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h3 className={cn(
              "text-xl font-bold mb-2 transition-colors duration-300",
              isDark ? "text-white group-hover:text-primary" : "text-foreground group-hover:text-primary"
            )}>
              {service.title}
            </h3>
            <p className={cn(
              "text-base leading-relaxed line-clamp-2 mb-6",
              isDark ? "text-white/70" : "text-foreground/70"
            )}>
              {service.description}
            </p>
          </div>

          <div className={cn(
            "flex items-center justify-between pt-4 border-t",
            isDark ? "border-white/10" : "border-border/50"
          )}>
            <div className="flex items-center gap-4">
              <span className="text-xl font-black text-primary">
                {formatPrice(service.price)}
              </span>
              <span className={cn("text-sm", isDark ? "text-white/50" : "text-foreground/50")}>تومان</span>
              <span className={cn("hidden sm:inline", isDark ? "text-white/30" : "text-foreground/30")}>|</span>
              <div className={cn("hidden sm:flex items-center gap-1.5", isDark ? "text-white/60" : "text-foreground/60")}>
                <Clock className="h-4 w-4" />
                <span className="text-sm">{service.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors duration-300">
              <span>جزئیات</span>
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
