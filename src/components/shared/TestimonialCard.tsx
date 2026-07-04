import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating
                ? "text-primary fill-primary"
                : "text-border"
            )}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/70 leading-relaxed mb-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-primary">
          {testimonial.name.charAt(0)}
        </div>
        <span className="text-sm font-medium text-foreground">
          {testimonial.name}
        </span>
      </div>
    </Card>
  );
}
