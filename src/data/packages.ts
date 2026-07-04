import { Package } from "@/lib/types";

export const packages: Package[] = [
  {
    id: "1",
    name: "پکیج پایه",
    description: "شروع مناسب برای مراقبت از پوست",
    price: 5000000,
    features: [
      "پاکسازی صورت",
      "ماسک تغذیه‌ای",
      "مشاوره پوست",
      "按摩 صورت",
    ],
    popular: false,
    category: "basic",
  },
  {
    id: "2",
    name: "پکیج استاندارد",
    description: "مراقبت کامل پوست و زیبایی",
    price: 12000000,
    originalPrice: 15000000,
    features: [
      "پاکسازی صورت",
      "لایه‌برداری شیمیایی",
      "ماسک تغذیه‌ای",
      "مشاوره پوست",
      "massage صورت",
      "یک جلسه مزوتراپی",
    ],
    popular: true,
    category: "standard",
  },
  {
    id: "3",
    name: "پکیج ویژه",
    description: "تجربه لاکچری زیبایی کامل",
    price: 25000000,
    originalPrice: 32000000,
    features: [
      "پاکسازی صورت",
      "لایه‌برداری شیمیایی",
      "ماسک تغذیه‌ای",
      "مشاوره پوست",
      "massage صورت",
      "سه جلسه مزوتراپی",
      "یک جلسه پی‌آرپی",
      "مراقبت بعد از درمان",
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
