"use client";

import { Star, ArrowLeft, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatAmount } from "@/lib/utils";
import { Package } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

const groupConfig = {
  carbon: {
    label: "کربن تراپی",
    chipClass: "bg-success/10 text-success",
  },
  "laser-women": {
    label: "لیزر بانوان",
    chipClass: "bg-primary/10 text-primary",
  },
  "laser-men": {
    label: "لیزر آقایان",
    chipClass: "bg-foreground/10 text-foreground/70",
  },
};

export function PackageCard({ pkg }: PackageCardProps) {
  const config = groupConfig[pkg.group];
  const hasTiers = pkg.tiers.length > 1;
  // The last tier is always the best value (cheapest per session)
  const bestTierIndex = hasTiers ? pkg.tiers.length - 1 : -1;
  const savingsPercent =
    hasTiers && pkg.tiers[0].price > 0
      ? Math.round(
          ((pkg.tiers[0].price - pkg.tiers[bestTierIndex].price) /
            pkg.tiers[0].price) *
            100
        )
      : 0;

  return (
    <div
      className={cn(
        "relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        pkg.popular ? "border-primary/40 shadow-md shadow-primary/5" : "border-border/40"
      )}
    >
      {pkg.popular && (
        <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />
      )}

      {/* Header */}
      <div className="p-6 pb-5">
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 text-[11px] font-bold rounded-full",
              config.chipClass
            )}
          >
            {config.label}
          </span>

          {pkg.popular && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              <Star className="h-3 w-3 fill-current" />
              پیشنهاد ویژه
            </span>
          )}
        </div>

        <h3 className="text-xl font-black mb-2 text-foreground leading-snug">
          {pkg.name}
        </h3>
        <p className="text-sm leading-relaxed text-foreground/60 min-h-[42px]">
          {pkg.description}
        </p>
      </div>

      {/* Pricing tiers */}
      <div className="px-6 pb-5 flex-1">
        {hasTiers ? (
          <>
            <p className="text-[11px] font-bold tracking-wide mb-3 text-foreground/50">
              قیمت هر جلسه
            </p>
            <ul className="space-y-2">
              {pkg.tiers.map((tier, index) => {
                const isBest = index === bestTierIndex;
                return (
                  <li
                    key={index}
                    className={cn(
                      "flex items-center justify-between gap-3 py-3 px-4 rounded-xl border",
                      isBest
                        ? "bg-primary/10 border-primary/30"
                        : "bg-muted/50 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={cn(
                          "text-sm truncate",
                          isBest
                            ? "font-bold text-foreground"
                            : "font-medium text-foreground/70"
                        )}
                      >
                        {tier.label}
                      </span>
                      {isBest && (
                        <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <span className="flex-shrink-0 whitespace-nowrap">
                      <span
                        className={cn(
                          "font-black",
                          isBest ? "text-base text-primary" : "text-sm text-foreground/80"
                        )}
                      >
                        {formatAmount(tier.price)}
                      </span>
                      <span className="text-[10px] font-medium text-foreground/50 mr-1">
                        تومان
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            {savingsPercent > 0 && (
              <p className="flex items-center gap-1.5 mt-3">
                <span className="inline-flex items-center text-[11px] font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
                  تا {formatAmount(savingsPercent)}٪ ارزان‌تر با پکیج
                </span>
              </p>
            )}
          </>
        ) : (
          /* Single-tier offer — big centered price */
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-5 text-center">
            <p className="text-[11px] font-bold text-foreground/60 mb-1.5">
              {pkg.tiers[0].label}
            </p>
            <p>
              <span className="text-3xl font-black text-primary tracking-tight">
                {formatAmount(pkg.tiers[0].price)}
              </span>
              <span className="text-xs font-medium text-foreground/50 mr-1.5">
                تومان
              </span>
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 pt-5 mt-auto border-t border-border/20">
        <Button
          variant={pkg.popular ? "primary" : "secondary"}
          className={cn(
            "w-full py-3.5 text-sm font-bold rounded-xl transition-all duration-200 group",
            !pkg.popular && "border-border/40 hover:border-primary hover:text-primary"
          )}
        >
          <span>رزرو وقت</span>
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
