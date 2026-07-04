import { Package } from "@/lib/types";

export const packages: Package[] = [
  {
    id: "1",
    name: "پکیج پاکسازی پایه",
    description: "شروع مناسب برای مراقبت از پوست صورت",
    price: 3500000,
    services: [
      { serviceId: "3", free: false },
      { serviceId: "8", free: false },
    ],
    popular: false,
    category: "basic",
  },
  {
    id: "2",
    name: "پکیج جوانسازی صورت",
    description: "ترکیب بوتاکس و پاکسازی برای جوانسازی کامل",
    price: 6500000,
    originalPrice: 8000000,
    services: [
      { serviceId: "1", free: false },
      { serviceId: "3", free: false },
      { serviceId: "8", free: true },
    ],
    popular: true,
    category: "standard",
  },
  {
    id: "3",
    name: "پکیج لیزر و پاکسازی",
    description: "لیزر موهای زائد همراه با پاکسازی پوست",
    price: 4200000,
    originalPrice: 5300000,
    services: [
      { serviceId: "2", free: false },
      { serviceId: "3", free: false },
    ],
    popular: false,
    category: "basic",
  },
  {
    id: "4",
    name: "پکیج مزوتراپی و PRP",
    description: "جوانسازی عمیق پوست با مزوتراپی و پلاسمای غنی",
    price: 8000000,
    originalPrice: 10200000,
    services: [
      { serviceId: "6", free: false },
      { serviceId: "4", free: false },
      { serviceId: "3", free: true },
    ],
    popular: false,
    category: "standard",
  },
  {
    id: "5",
    name: "پکیج زیبایی صورت",
    description: "بوتاکس، فیلر لب و پاکسازی صورت",
    price: 9500000,
    originalPrice: 12000000,
    services: [
      { serviceId: "1", free: false },
      { serviceId: "7", free: false },
      { serviceId: "3", free: false },
      { serviceId: "8", free: true },
    ],
    popular: true,
    category: "premium",
  },
  {
    id: "6",
    name: "پکیج کاشت مو",
    description: "کاشت موی طبیعی با مراقبت‌های بعد از درمان",
    price: 16500000,
    originalPrice: 19000000,
    services: [
      { serviceId: "5", free: false },
      { serviceId: "6", free: true },
    ],
    popular: false,
    category: "premium",
  },
  {
    id: "7",
    name: "پکیج لایه‌برداری کامل",
    description: "لایه‌برداری شیمیایی و پاکسازی عمیق پوست",
    price: 5000000,
    originalPrice: 6300000,
    services: [
      { serviceId: "8", free: false },
      { serviceId: "3", free: false },
      { serviceId: "6", free: true },
    ],
    popular: false,
    category: "standard",
  },
  {
    id: "8",
    name: "پکیج ضد پیری",
    description: "مجموعه کامل جوانسازی و ضد پیری پوست",
    price: 14000000,
    originalPrice: 18700000,
    services: [
      { serviceId: "1", free: false },
      { serviceId: "4", free: false },
      { serviceId: "6", free: false },
      { serviceId: "3", free: true },
      { serviceId: "8", free: true },
    ],
    popular: true,
    category: "premium",
  },
  {
    id: "9",
    name: "پکیج موی سالم",
    description: "تقویت و بازسازی مو با مزوتراپی و PRP",
    price: 7000000,
    originalPrice: 8700000,
    services: [
      { serviceId: "6", free: false },
      { serviceId: "4", free: false },
    ],
    popular: false,
    category: "standard",
  },
  {
    id: "10",
    name: "پکیج لاکچری زیبایی",
    description: "تجربه لاکچری زیبایی با تمام خدمات ویژه کلینیک",
    price: 28000000,
    originalPrice: 38000000,
    services: [
      { serviceId: "1", free: false },
      { serviceId: "2", free: false },
      { serviceId: "3", free: false },
      { serviceId: "4", free: false },
      { serviceId: "6", free: false },
      { serviceId: "7", free: false },
      { serviceId: "8", free: true },
      { serviceId: "5", free: true },
    ],
    popular: false,
    category: "premium",
  },
];

export function getPackages(): Package[] {
  return packages;
}

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

export function getPopularPackage(): Package | undefined {
  return packages.find((p) => p.popular);
}
