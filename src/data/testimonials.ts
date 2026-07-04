import { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "سارا احمدی",
    text: "من از خدمات بوتاکس کلینیک زیبا بسیار راضی هستم. نتیجه عالی بود و پرسنل بسیار حرفه‌ای هستند.",
    rating: 5,
    avatar: "/avatars/sara.jpg",
  },
  {
    id: "2",
    name: "مریم حسینی",
    text: "لیزر موهای زائد در این کلینیک واقعاً تأثیرگذار بود. بعد از 6 جلسه کاملاً راضی هستم.",
    rating: 5,
    avatar: "/avatars/maryam.jpg",
  },
  {
    id: "3",
    name: "نیلوفر کریمی",
    text: "پاکسازی پوست صورتم را اینجا انجام دادم و پوستم خیلی شفاف و نرم شد. حتماً دوباره مراجعه می‌کنم.",
    rating: 4,
    avatar: "/avatars/niloufar.jpg",
  },
  {
    id: "4",
    name: "زهرا محمدی",
    text: "محیط کلینیک بسیار تمیز و حرفه‌ای است. از تیم پزشکی و پرسنل تشکر می‌کنم.",
    rating: 5,
    avatar: "/avatars/zahra.jpg",
  },
  {
    id: "5",
    name: "الناز رضایی",
    text: "مزوتراپی مو انجام دادم و بعد از 3 جلسه نتیجه عالی بود. موهایم خیلی تقویت شد.",
    rating: 5,
    avatar: "/avatars/elnaz.jpg",
  },
];

export function getTestimonials(): Testimonial[] {
  return testimonials;
}
