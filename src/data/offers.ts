import { Offer } from "@/lib/types";

export const offers: Offer[] = [
  {
    id: "1",
    title: "تخفیف ویژه بوتاکس",
    description: "۲۰٪ تخفیف ویژه تزریق بوتاکس تا پایان ماه",
    discount: 20,
    discountType: "percent",
    expiryDate: "2026-07-31",
    serviceIds: ["1"],
    active: true,
  },
  {
    id: "2",
    title: "پکیج لیزر + مزوتراپی",
    description: "خرید پکیج لیزر موهای زائد به همراه مزوتراپی رایگان",
    discount: 500000,
    discountType: "fixed",
    expiryDate: "2026-08-15",
    serviceIds: ["2", "6"],
    active: true,
  },
  {
    id: "3",
    title: "مشاوره رایگان پوست",
    description: "مشاوره تخصصی پوست با بهترین متخصصان به صورت رایگان",
    discount: 100,
    discountType: "percent",
    expiryDate: "2026-07-10",
    serviceIds: ["3"],
    active: true,
  },
];

export function getActiveOffers(): Offer[] {
  return offers.filter((o) => o.active && new Date(o.expiryDate) > new Date());
}

export function getOfferById(id: string): Offer | undefined {
  return offers.find((o) => o.id === id);
}
