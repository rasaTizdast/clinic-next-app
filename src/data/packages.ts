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
    description: "کربن تراپی صورت کامل",
    group: "carbon",
    tiers: carbonTiers(1500000, 4000000),
    popular: true,
  },
  {
    id: "carbon-face-neck",
    name: "صورت + گردن",
    description: "کربن تراپی صورت و گردن",
    group: "carbon",
    tiers: carbonTiers(1900000, 5000000),
  },
  {
    id: "carbon-face-neck-décolleté",
    name: "صورت + گردن + دکلته",
    description: "کربن تراپی صورت، گردن و دکلته",
    group: "carbon",
    tiers: carbonTiers(2500000, 6500000),
  },
  {
    id: "carbon-neck",
    name: "گردن",
    description: "کربن تراپی گردن",
    group: "carbon",
    tiers: carbonTiers(1000000, 2700000),
  },
  {
    id: "carbon-décolleté",
    name: "دکلته",
    description: "کربن تراپی دکلته",
    group: "carbon",
    tiers: carbonTiers(1500000, 3000000),
  },
  {
    id: "carbon-underarm",
    name: "زیر بغل",
    description: "کربن تراپی زیر بغل",
    group: "carbon",
    tiers: carbonTiers(1000000, 2700000),
  },
  {
    id: "carbon-full-hand",
    name: "دست کامل",
    description: "کربن تراپی دست کامل",
    group: "carbon",
    tiers: carbonTiers(1500000, 4000000),
  },
  {
    id: "carbon-bikini",
    name: "بیکینی",
    description: "کربن تراپی ناحیه بیکینی",
    group: "carbon",
    tiers: carbonTiers(1000000, 2700000),
  },
  {
    id: "carbon-abdomen-back",
    name: "شکم / کمر",
    description: "کربن تراپی شکم و کمر",
    group: "carbon",
    tiers: carbonTiers(1000000, 4000000),
  },
  {
    id: "carbon-genital-area",
    name: "ناحیه تناسلی",
    description: "کربن تراپی ناحیه تناسلی",
    group: "carbon",
    tiers: carbonTiers(700000, 1800000),
  },
  {
    id: "carbon-lip",
    name: "لب",
    description: "کربن تراپی لب",
    group: "carbon",
    tiers: carbonTiers(600000, 1500000),
  },
  {
    id: "carbon-ankle",
    name: "قوزک پا",
    description: "کربن تراپی قوزک پا",
    group: "carbon",
    tiers: carbonTiers(600000, 1500000),
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
