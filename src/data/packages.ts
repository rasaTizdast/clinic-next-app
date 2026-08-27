import { Package } from "@/lib/types";

const carbonTiers = (single: number, packageRate: number): Package["tiers"] => [
  { label: "تک جلسه", price: single },
  { label: "هر جلسه با رزرو پکیج ۳ جلسه‌ای", price: packageRate },
];

const laserWomenTiers = (single: number, four: number, eight: number): Package["tiers"] => [
  { label: "تک جلسه", price: single },
  { label: "هر جلسه با پکیج ۴ جلسه‌ای", price: four },
  { label: "هر جلسه با پکیج ۸ جلسه‌ای", price: eight },
];

export const packages: Package[] = [
  // ─── کربن تراپی ───
  {
    id: "carbon-face",
    name: "صورت کامل",
    description: "کربن تراپی صورت برای پوستی شفاف، یکدست و بدون منافذ باز",
    group: "carbon",
    tiers: carbonTiers(1200000, 850000),
    popular: true,
  },
  {
    id: "carbon-hand-back",
    name: "پشت دست",
    description: "کربن تراپی پشت دست برای روشنی و شفافیت پوست",
    group: "carbon",
    tiers: carbonTiers(700000, 500000),
  },
  {
    id: "carbon-underarm",
    name: "زیربغل",
    description: "کربن تراپی زیربغل برای روشن‌شدگی و کاهش تیرگی ناحیه",
    group: "carbon",
    tiers: carbonTiers(900000, 600000),
  },
  {
    id: "carbon-elbow",
    name: "آرنج",
    description: "کربن تراپی آرنج برای کاهش تیرگی و یکدست‌شدن رنگ پوست",
    group: "carbon",
    tiers: carbonTiers(700000, 500000),
  },
  {
    id: "carbon-knee",
    name: "زانو",
    description: "کربن تراپی زانو برای شفافیت و لطافت ناحیه",
    group: "carbon",
    tiers: carbonTiers(700000, 500000),
  },
  {
    id: "carbon-bikini",
    name: "بیکینی",
    description: "کربن تراپی ناحیه بیکینی برای روشن‌شدگی و طراوت پوست",
    group: "carbon",
    tiers: carbonTiers(990000, 700000),
  },
  {
    id: "carbon-buttocks",
    name: "باسن",
    description: "کربن تراپی باسن برای یکدست‌سازی رنگ و شفافیت پوست",
    group: "carbon",
    tiers: carbonTiers(1500000, 1000000),
  },
  {
    id: "carbon-groin",
    name: "کشاله",
    description: "کربن تراپی کشاله ران برای کاهش تیرگی ناحیه",
    group: "carbon",
    tiers: carbonTiers(990000, 700000),
  },
  {
    id: "carbon-ankle",
    name: "قوزک",
    description: "کربن تراپی قوزک پا برای روشنی و لطافت پوست",
    group: "carbon",
    tiers: carbonTiers(700000, 500000),
  },

  // ─── پکیج‌های لیزر بانوان ───
  {
    id: "laser-w-practical",
    name: "پکیج کاربردی",
    description: "ترکیبی از ساق، ساعد، بیکینی و زیربغل برای پوشش نواحی پرکاربرد",
    group: "laser-women",
    tiers: laserWomenTiers(990000, 890000, 790000),
  },
  {
    id: "laser-w-total",
    name: "پکیج توتال",
    description: "پوشش تمامی قسمت‌های بدن با بهترین صرفه‌جویی در جلسات متعدد",
    group: "laser-women",
    tiers: laserWomenTiers(1290000, 1190000, 1090000),
    popular: true,
  },
  {
    id: "laser-w-whole-body",
    name: "پکیج کل بدن",
    description: "دست و پا کامل، بیکینی کامل، زیربغل، گودی کمر، خط ناف و صورت",
    group: "laser-women",
    tiers: laserWomenTiers(1090000, 990000, 890000),
  },

  // ─── پکیج لیزر آقایان ───
  {
    id: "laser-m-fullbody",
    name: "پکیج فول بادی آقایان",
    description: "۶ جلسه فول بادی + ۲ جلسه هدیه",
    group: "laser-men",
    tiers: [{ label: "پکیج ۶ + ۲ جلسه", price: 9990000 }],
    popular: true,
  },
];

export function getPackages(): Package[] {
  return packages;
}

export function getPackagesByGroup(group: Package["group"]): Package[] {
  return packages.filter((p) => p.group === group);
}
