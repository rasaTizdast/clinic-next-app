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
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Sparkles;
  const config = categoryConfig[service.category];

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="flex flex-col sm:flex-row items-stretch bg-surface rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
        {/* Image placeholder */}
        <div className="relative sm:w-56 lg:w-64 flex-shrink-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center min-h-[180px] sm:min-h-0">
          <div className={cn("p-5 rounded-2xl transition-transform duration-300 group-hover:scale-110", config.iconBg)}>
            <Icon className={cn("h-10 w-10", config.iconColor)} />
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant={config.badgeVariant}>{config.label}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
              {service.title}
            </h3>
            <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2 mb-4">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-3">
              <span className="text-lg font-extrabold text-primary">
                {formatPrice(service.price)}
              </span>
              <span className="text-xs text-foreground/40">تومان</span>
              <span className="text-foreground/20">|</span>
              <div className="flex items-center gap-1 text-foreground/40">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs">{service.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-primary/60 group-hover:text-primary transition-colors duration-200">
              <span className="hidden sm:inline">جزئیات</span>
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
