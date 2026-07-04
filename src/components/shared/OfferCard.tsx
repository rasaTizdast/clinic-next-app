"use client";

import { useState, useEffect } from "react";
import { Clock, Percent, Tag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Offer } from "@/lib/types";

interface OfferCardProps {
  offer: Offer;
}

function CountdownTimer({ expiryDate }: { expiryDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function calculateTimeLeft() {
      const difference = new Date(expiryDate).getTime() - Date.now();
      if (difference <= 0) return "منقضی شده";

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      return `${days} روز و ${hours} ساعت`;
    }

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="flex items-center gap-1 text-xs text-foreground/60">
      <Clock className="h-3 w-3" />
      <span>{timeLeft}</span>
    </div>
  );
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card className="p-6 relative overflow-visible">
      <div className="absolute -top-2 -right-2">
        <Badge variant="warning" className="gap-1">
          {offer.discountType === "percent" ? (
            <>
              <Percent className="h-3 w-3" />
              {offer.discount}%
            </>
          ) : (
            <>
              <Tag className="h-3 w-3" />
              تخفیف
            </>
          )}
        </Badge>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {offer.title}
        </h3>
        <p className="text-sm text-foreground/60 leading-relaxed">
          {offer.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <CountdownTimer expiryDate={offer.expiryDate} />
        <Button variant="secondary" size="sm">
          استفاده از پیشنهاد
        </Button>
      </div>
    </Card>
  );
}
