import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "botox",
    title: "تزریق بوتاکس",
    description: "جوانسازی و رفع چین و چروک صورت با بوتاکس اصل",
    longDescription:
      "تزریق بوتاکس یکی از محبوب‌ترین روش‌های جوانسازی پوست است. این روش با تضعیف موقت عضلات صورت، چین و چروک‌ها را کاهش می‌دهد و ظاهری جوان‌تر و شاداب‌تر به شما می‌بخشد. ما از بهترین برندهای بوتاکس استفاده می‌کنیم.",
    price: 2500000,
    duration: "30 دقیقه",
    category: "face",
    icon: "sparkles",
    featured: true,
  },
  {
    id: "2",
    slug: "laser-hair-removal",
    title: "لیزر موهای زائد",
    description: "حذف دائمی موهای زائد با پیشرفته‌ترین دستگاه‌های لیزر",
    longDescription:
      "لیزر موهای زائد با استفاده از دستگاه‌های دایود و الکس انجام می‌شود. این روش برای تمام نقاط بدن مناسب است و بعد از 6 تا 8 جلسه، نتیجه دائمی حاصل می‌شود.",
    price: 800000,
    duration: "45-60 دقیقه",
    category: "body",
    icon: "zap",
    featured: true,
  },
  {
    id: "3",
    slug: "facial",
    title: "پاکسازی و جوانسازی پوست",
    description: "پاکسازی عمیق، لایه‌برداری و جوانسازی پوست صورت",
    longDescription:
      "پاکسازی پوست شامل پاکسازی عمیق منافذ، لایه‌برداری شیمیایی، ماسک تغذیه‌ای و ماساژ صورت است. این روش پوست را شفاف، نرم و جوان می‌کند.",
    price: 1500000,
    duration: "60 دقیقه",
    category: "skin",
    icon: "droplets",
    featured: true,
  },
  {
    id: "4",
    slug: "prp",
    title: "پی‌آرپی (پلاسمای غنی از پلاکت)",
    description: "جوانسازی طبیعی پوست با پلاسمای خود بدن",
    longDescription:
      "PRP یا پلاسمای غنی از پلاکت از خون خود بیمار تهیه می‌شود و با تزریق به پوست، کلاژن‌سازی را تحریک می‌کند. این روش کاملاً طبیعی و بدون عوارض است.",
    price: 3500000,
    duration: "45 دقیقه",
    category: "skin",
    icon: "heart",
    featured: false,
  },
  {
    id: "5",
    slug: "hair-transplant",
    title: "کاشت مو",
    description: "کاشت موی طبیعی با روش FUE و FIT",
    longDescription:
      "کاشت مو با روش‌های FUE و FIT انجام می‌شود. فولیکول‌های مو از ناحیه دهنده برداشته و در ناحیه کم‌پشت کاشته می‌شوند. نتیجه دائمی و طبیعی است.",
    price: 15000000,
    duration: "4-6 ساعت",
    category: "hair",
    icon: "scissors",
    featured: false,
  },
  {
    id: "6",
    slug: "mesotherapy",
    title: "مزوتراپی",
    description: "تقویت مو و جوانسازی پوست با تزریق ویتامین‌ها",
    longDescription:
      "مزوتراپی تزریق میکرو ویتامین‌ها، مواد معدنی و اسیدهای آمینه به لایه میانی پوست است. این روش برای تقویت مو، رفع سلولیت و جوانسازی پوست مؤثر است.",
    price: 1200000,
    duration: "30 دقیقه",
    category: "skin",
    icon: "syringe",
    featured: false,
  },
  {
    id: "7",
    slug: "lip-filler",
    title: "تزریق فیلر لب",
    description: "حجم‌دهی و فرم‌دهی لب‌ها با فیلرهای هیالورونیک اسید",
    longDescription:
      "تزریق فیلر لب با استفاده از فیلرهای هیالورونیک اسید انجام می‌شود. این روش لب‌ها را حجیم‌تر، متوازن‌تر و جوان‌تر می‌کند.",
    price: 2000000,
    duration: "20 دقیقه",
    category: "face",
    icon: "flower2",
    featured: false,
  },
  {
    id: "8",
    slug: "chemical-peel",
    title: "لایه‌برداری شیمیایی",
    description: "لایه‌برداری پوست با اسیدهای میوه برای شفافیت و جوانسازی",
    longDescription:
      "لایه‌برداری شیمیایی با اسیدهای مختلف (گلیکولیک، سالیسیلیک، TCA) انجام می‌شود. این روش لایه‌های مرده پوست را حذف کرده و پوست جدید و شفاف ایجاد می‌کند.",
    price: 1800000,
    duration: "40 دقیقه",
    category: "skin",
    icon: "layers",
    featured: false,
  },
];

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category);
}
