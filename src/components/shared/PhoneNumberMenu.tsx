"use client";

import { ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const clinicPhoneNumbers = [
  { display: "۰۹۱۰۰۳۰۰۸۷۵", tel: "+989100300875" },
  { display: "۰۹۱۰۰۳۰۰۸۷۶", tel: "+989100300876" },
  { display: "۰۹۱۰۰۳۰۰۸۷۷", tel: "+989100300877" },
] as const;

type PhoneNumberMenuVariant = "compact" | "footer" | "cta";

interface PhoneNumberMenuProps {
  variant?: PhoneNumberMenuVariant;
  className?: string;
}

const triggerStyles: Record<PhoneNumberMenuVariant, string> = {
  compact:
    "h-10 px-3 text-xs font-bold text-foreground/80 hover:text-primary hover:bg-primary/8",
  footer:
    "px-0 text-sm font-light text-foreground/70 hover:text-primary",
  cta:
    "w-full justify-center bg-primary px-6 py-4 text-base font-bold text-white hover:bg-primary-light sm:w-auto",
};

export function PhoneNumberMenu({
  variant = "compact",
  className,
}: PhoneNumberMenuProps) {
  return (
    <details className={cn("group relative", className)}>
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-2 rounded-full transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "[&::-webkit-details-marker]:hidden",
          triggerStyles[variant],
        )}
      >
        <Phone className={cn("shrink-0", variant === "cta" ? "h-5 w-5" : "h-3.5 w-3.5")} />
        <span>{variant === "cta" ? "انتخاب شماره تماس" : "تماس"}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <div
        className={cn(
          "absolute z-[60] mt-2 min-w-56 overflow-hidden rounded-2xl bg-background p-2",
          "shadow-md ring-1 ring-border/70",
          variant === "footer" ? "bottom-full right-0 mb-2 mt-0" : "right-0",
        )}
        aria-label="شماره تلفن مورد نظر را انتخاب کنید"
      >
        <p className="px-3 pb-2 pt-1 text-xs font-semibold text-foreground/55">
          شماره مورد نظر را انتخاب کنید
        </p>
        {clinicPhoneNumbers.map((number) => (
          <a
            key={number.tel}
            href={`tel:${number.tel}`}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary focus-visible:bg-primary/10 focus-visible:text-primary focus-visible:outline-none"
          >
            <span dir="ltr">{number.display}</span>
            <Phone className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          </a>
        ))}
      </div>
    </details>
  );
}
