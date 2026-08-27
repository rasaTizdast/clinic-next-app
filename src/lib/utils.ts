import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAbsTop(el: HTMLElement | null): number {
  if (!el) return 0;
  return el.getBoundingClientRect().top + window.scrollY;
}

export function scrollFilterIntoView(el: HTMLElement | null, headerOffset: number) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fa-IR").format(amount);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}
