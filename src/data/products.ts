import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "vitamin-c-serum",
    title: "سروم ویتامین C",
    description: "سروم روشن‌کننده و آنتی‌اکسیدان با غلظت بالا",
    longDescription: "سروم ویتامین C با غلظت ۲۰٪، مناسب برای روشن‌کنندگی پوست و محافظت در برابر رادیکال‌های آزاد. استفاده روزانه باعث بهبود بافت پوست و کاهش لک‌های تیره می‌شود.",
    image: "/images/products/vitamin-c-serum.jpg",
    price: 450000,
  },
  {
    id: "2",
    slug: "hyaluronic-acid-cream",
    title: "کرم هیالورونیک اسید",
    description: "کرم مرطوب‌کننده عمیق با هیالورونیک اسید خالص",
    longDescription: "کرم مرطوب‌کننده با فرمولاسیون پیشرفته هیالورونیک اسید، مناسب برای انواع پوست. آبرسانی ۲۴ ساعته و بهبود خاصیت ارتجاعی پوست.",
    image: "/images/products/hyaluronic-acid-cream.jpg",
    price: 380000,
  },
  {
    id: "3",
    slug: "sunscreen-spf50",
    title: "ضد آفتاب SPF50",
    description: "ضد آفتاب SPF50 با محافظت UVA/UVB",
    longDescription: "ضد آفتاب با SPF50 و محافظت کامل در برابر اشعه‌های UVA و UVB. فرمول سبک و غیرچرب، مناسب برای استفاده روزانه زیر آرایش.",
    image: "/images/products/sunscreen-spf50.jpg",
    price: 320000,
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}