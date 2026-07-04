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
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Service } from "@/lib/types";

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

const categoryLabels: Record<string, string> = {
  skin: "پوست",
  hair: "مو",
  body: "بدن",
  face: "صورت",
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Sparkles;

  return (
    <Link href={`/services/${service.slug}`}>
      <Card hover className="h-full p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="accent">{categoryLabels[service.category]}</Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-foreground/60 mb-4 flex-1 leading-relaxed">
            {service.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-primary font-bold">{formatPrice(service.price)}</span>
            <span className="text-xs text-foreground/50">{service.duration}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
