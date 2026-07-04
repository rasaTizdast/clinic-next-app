import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Package } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card
      className={cn(
        "relative p-6 flex flex-col",
        pkg.popular && "border-primary shadow-lg ring-2 ring-primary/20"
      )}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="warning">محبوب‌ترین</Badge>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
        <p className="text-sm text-foreground/60">{pkg.description}</p>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(pkg.price)}
          </span>
          {pkg.originalPrice && (
            <span className="text-lg text-foreground/40 line-through">
              {formatPrice(pkg.originalPrice)}
            </span>
          )}
        </div>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/70">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={pkg.popular ? "primary" : "secondary"}
        className="w-full"
      >
        رزرو وقت
      </Button>
    </Card>
  );
}
