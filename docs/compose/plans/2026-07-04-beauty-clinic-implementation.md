# Ziba Beauty Clinic — Implementation Plan

> [!NOTE]
> This document may not reflect the current implementation.
> See the final report for up-to-date state:
> [Final Report](../reports/beauty-clinic.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Persian (RTL) beauty clinic website with scroll storytelling landing page, consistent design system, and well-thought-out pages for services, packages, offers, about, and contact.

**Architecture:** Next.js 16 App Router with Tailwind CSS 4, Vazirmatn Persian font, RTL-first layout. Mock data in `src/data/`. ISR for static pages, SSR for offers, CSR for contact form. Suspense boundaries for all async loading.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript 5, Vazirmatn (Google Fonts)

## Global Constraints

- Language: Persian (Farsi), RTL layout throughout
- `dir="rtl"` on `<html>`, `lang="fa"`
- Background color: `#FDF8F0` (creamy white)
- Primary accent: `#C4956A` (rose gold)
- Font: Vazirmatn (weights: 300, 400, 500, 600, 700, 900)
- All interactive elements must have `cursor-pointer`
- Minimum contrast ratio: 4.5:1 for text
- Respect `prefers-reduced-motion`
- Mobile-first responsive: 375px → 768px → 1024px → 1440px
- No emojis as icons — use Lucide React icons
- Every page needs: loading.tsx, error.tsx, and meaningful content

---

## Phase 1: Foundation

### Task 1: Design System Setup

**Covers:** [S4]

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts` (if needed for Tailwind v4 config)

**Interfaces:**
- Produces: CSS custom properties for all design tokens, Vazirmatn font loaded

- [ ] **Step 1: Update globals.css with design tokens**

Replace `src/app/globals.css` content:

```css
@import "tailwindcss";

@theme {
  --color-background: #FDF8F0;
  --color-foreground: #2D2A26;
  --color-primary: #C4956A;
  --color-primary-light: #D4AD8A;
  --color-secondary: #E8D5C4;
  --color-accent: #8B9E7C;
  --color-muted: #F5F0EB;
  --color-border: #E8E2DA;
  --color-destructive: #C25450;
  --color-success: #6B8F5E;
  --color-surface: #FFFFFF;

  --font-vazirmatn: "Vazirmatn", sans-serif;

  --shadow-sm: 0 1px 2px rgba(45, 42, 38, 0.05);
  --shadow-md: 0 4px 12px rgba(45, 42, 38, 0.08);
  --shadow-lg: 0 8px 24px rgba(45, 42, 38, 0.12);
  --shadow-xl: 0 16px 48px rgba(45, 42, 38, 0.16);

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}

@layer base {
  html {
    direction: rtl;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-vazirmatn);
    background-color: var(--color-background);
    color: var(--color-foreground);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: var(--color-primary);
    color: white;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-border) transparent;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Update layout.tsx with Vazirmatn font and RTL**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "کلینیک زیبا | زیبایی و جوانی",
    template: "%s | کلینیک زیبا",
  },
  description:
    "کلینیک زیبا ارائه دهنده خدمات تخصصی زیبایی، پوست و مو با بهترین متخصصان",
  keywords: ["کلینیک زیبایی", "جوانسازی پوست", "لیزر موهای زائد", "بوتاکس"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify dev server starts**

Run: `pnpm dev`
Expected: Server starts without errors, page loads with RTL layout and Vazirmatn font

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: setup design system with RTL, Vazirmatn font, and tokens"
```

---

### Task 2: TypeScript Types and Utilities

**Covers:** [S7, S12]

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/utils.ts`

**Interfaces:**
- Produces: `Service`, `Package`, `Offer`, `Testimonial`, `TeamMember` types; `cn()` helper

- [ ] **Step 1: Create types.ts**

```typescript
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  category: "skin" | "hair" | "body" | "face";
  icon: string;
  featured: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular: boolean;
  category: "basic" | "standard" | "premium";
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: "percent" | "fixed";
  expiryDate: string;
  serviceIds: string[];
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}
```

- [ ] **Step 2: Create utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
```

- [ ] **Step 3: Install clsx and tailwind-merge**

Run: `pnpm add clsx tailwind-merge`

- [ ] **Step 4: Commit**

```bash
git add src/lib/types.ts src/lib/utils.ts package.json pnpm-lock.yaml
git commit -m "feat: add TypeScript types and utility functions"
```

---

### Task 3: Mock Data Layer

**Covers:** [S7]

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/packages.ts`
- Create: `src/data/offers.ts`
- Create: `src/data/testimonials.ts`
- Create: `src/data/team.ts`
- Create: `src/data/index.ts`

**Interfaces:**
- Consumes: Types from `src/lib/types.ts`
- Produces: Exported arrays of mock data

- [ ] **Step 1: Create services.ts**

```typescript
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
```

- [ ] **Step 2: Create packages.ts**

```typescript
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
```

- [ ] **Step 3: Create offers.ts**

```typescript
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
```

- [ ] **Step 4: Create testimonials.ts**

```typescript
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
```

- [ ] **Step 5: Create team.ts**

```typescript
import { TeamMember } from "@/lib/types";

export const team: TeamMember[] = [
  {
    id: "1",
    name: "دکتر لیلا احمدی",
    role: "متخصص پوست و زیبایی",
    bio: "فوق تخصص پوست و مو از دانشگاه تهران با بیش از ۱۰ سال تجربه در زمینه جوانسازی پوست.",
    avatar: "/team/dr-ahmadi.jpg",
  },
  {
    id: "2",
    name: "دکتر محمد حسینی",
    role: "متخصص مو",
    bio: "فوق تخصص مو و کاشت مو با بیش از ۸ سال تجربه در روش‌های نوین کاشت مو.",
    avatar: "/team/dr-hosseini.jpg",
  },
  {
    id: "3",
    name: "نیلوفر سالمی",
    role: "کارشناس زیبایی",
    bio: "کارشناس ارشد پوست و مو با تخصص در مزوتراپی و پی‌آرپی.",
    avatar: "/team/niloofar.jpg",
  },
];

export function getTeam(): TeamMember[] {
  return team;
}
```

- [ ] **Step 6: Create index.ts barrel export**

```typescript
export * from "./services";
export * from "./packages";
export * from "./offers";
export * from "./testimonials";
export * from "./team";
```

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add mock data layer for services, packages, offers, testimonials, team"
```

---

## Phase 2: Layout & UI Components

### Task 4: Layout Components

**Covers:** [S6]

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/Container.tsx`
- Create: `src/components/layout/Section.tsx`

**Interfaces:**
- Consumes: Design tokens from globals.css
- Produces: Reusable layout components used by all pages

- [ ] **Step 1: Create Container.tsx**

```tsx
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Create Section.tsx**

```tsx
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "article";
  background?: "default" | "muted" | "surface";
}

export function Section({
  children,
  className,
  containerClassName,
  as: Component = "section",
  background = "default",
}: SectionProps) {
  const bgClasses = {
    default: "",
    muted: "bg-muted",
    surface: "bg-surface",
  };

  return (
    <Component className={cn("py-16 sm:py-20 lg:py-24", bgClasses[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
```

- [ ] **Step 3: Create Header.tsx**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات" },
  { href: "/packages", label: "پکیج‌ها" },
  { href: "/offers", label: "پیشنهادات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">کلینیک زیبا</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+989121234567"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
            </a>
            <button
              type="button"
              className="md:hidden p-2 text-foreground/70 hover:text-primary cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="px-4 py-4 space-y-2 bg-surface border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-muted rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+989121234567"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary"
          >
            <Phone className="h-4 w-4" />
            <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Create Footer.tsx**

```tsx
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "./Container";

const footerLinks = {
  services: [
    { href: "/services/botox", label: "بوتاکس" },
    { href: "/services/laser-hair-removal", label: "لیزر موهای زائد" },
    { href: "/services/facial", label: "پاکسازی پوست" },
    { href: "/services/prp", label: "پی‌آرپی" },
  ],
  company: [
    { href: "/about", label: "درباره ما" },
    { href: "/packages", label: "پکیج‌ها" },
    { href: "/offers", label: "پیشنهادات" },
    { href: "/contact", label: "تماس با ما" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">کلینیک زیبا</h3>
            <p className="text-sm text-background/70 leading-relaxed">
              ارائه دهنده خدمات تخصصی زیبایی، پوست و مو با بهترین متخصصان و
              پیشرفته‌ترین تجهیزات
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">خدمات</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">کلینیک</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>تهران، خیابان ولیعصر، نبش کوچه گل</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@ziba-clinic.ir</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Clock className="h-4 w-4 shrink-0" />
                <span>شنبه تا پنجشنبه ۹ صبح تا ۸ شب</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-background/10 text-center">
          <p className="text-xs text-background/50">
            © ۱۴۰۵ کلینیک زیبا. تمامی حقوق محفوظ است.
          </p>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add layout components (Header, Footer, Container, Section)"
```

---

### Task 5: Basic UI Components

**Covers:** [S6]

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Skeleton.tsx`
- Create: `src/components/ui/ScrollReveal.tsx`

**Interfaces:**
- Produces: Button (primary/secondary/ghost), Badge, Skeleton, ScrollReveal components

- [ ] **Step 1: Create Button.tsx**

```tsx
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg",
    secondary:
      "bg-transparent text-primary border-2 border-primary hover:bg-primary/10",
    ghost: "bg-transparent text-foreground/70 hover:text-primary hover:bg-muted",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create Badge.tsx**

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "accent";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variants = {
    default: "bg-muted text-foreground/70",
    success: "bg-success/10 text-success",
    warning: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create Skeleton.tsx**

```tsx
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted rounded-lg",
        className
      )}
    />
  );
}
```

- [ ] **Step 4: Create ScrollReveal.tsx**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Badge.tsx src/components/ui/Skeleton.tsx src/components/ui/ScrollReveal.tsx
git commit -m "feat: add basic UI components (Button, Badge, Skeleton, ScrollReveal)"
```

---

### Task 6: Card and Input Components

**Covers:** [S6]

**Files:**
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/shared/ServiceCard.tsx`
- Create: `src/components/shared/PackageCard.tsx`
- Create: `src/components/shared/OfferCard.tsx`
- Create: `src/components/shared/TestimonialCard.tsx`

**Interfaces:**
- Consumes: Types from `src/lib/types.ts`, utils from `src/lib/utils.ts`
- Produces: Card, Input, and domain-specific card components

- [ ] **Step 1: Create Card.tsx**

```tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl border border-border shadow-sm overflow-hidden",
        hover && "hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create Input.tsx**

```tsx
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label.replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-3 text-base bg-surface border border-border rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "placeholder:text-foreground/40",
          "transition-colors duration-200",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label.replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-4 py-3 text-base bg-surface border border-border rounded-lg resize-none",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "placeholder:text-foreground/40",
          "transition-colors duration-200",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Create ServiceCard.tsx**

```tsx
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Droplets,
  Heart,
  Scissors,
  Syringe,
  Flower2,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Service } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  zap: Zap,
  droplets: Droplets,
  heart: Heart,
  scissors: Scissors,
  syringe: Syringe,
  flower2: Flower2,
  layers: Layers,
};

const categoryLabels: Record<string, string> = {
  skin: "پوست",
  hair: "مو",
  body: "بدن",
  face: "صورت",
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Sparkles;

  return (
    <Link href={`/services/${service.slug}`}>
      <Card hover className="h-full p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="accent">{categoryLabels[service.category]}</Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-foreground/60 mb-4 flex-1 leading-relaxed">
            {service.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-primary font-bold">{formatPrice(service.price)}</span>
            <span className="text-xs text-foreground/50">{service.duration}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 4: Create PackageCard.tsx**

```tsx
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Package } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card
      className={cn(
        "relative p-6 flex flex-col",
        pkg.popular && "border-primary shadow-lg ring-2 ring-primary/20"
      )}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="warning">محبوب‌ترین</Badge>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
        <p className="text-sm text-foreground/60">{pkg.description}</p>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(pkg.price)}
          </span>
          {pkg.originalPrice && (
            <span className="text-lg text-foreground/40 line-through">
              {formatPrice(pkg.originalPrice)}
            </span>
          )}
        </div>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/70">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={pkg.popular ? "primary" : "secondary"}
        className="w-full"
      >
        رزرو وقت
      </Button>
    </Card>
  );
}
```

- [ ] **Step 5: Create OfferCard.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Clock, Percent, Tag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Offer } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  offer: Offer;
}

function CountdownTimer({ expiryDate }: { expiryDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function calculateTimeLeft() {
      const difference = new Date(expiryDate).getTime() - Date.now();
      if (difference <= 0) return "منقضی شده";

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      return `${days} روز و ${hours} ساعت`;
    }

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="flex items-center gap-1 text-xs text-foreground/60">
      <Clock className="h-3 w-3" />
      <span>{timeLeft}</span>
    </div>
  );
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card className="p-6 relative overflow-visible">
      <div className="absolute -top-2 -right-2">
        <Badge variant="warning" className="gap-1">
          {offer.discountType === "percent" ? (
            <>
              <Percent className="h-3 w-3" />
              {offer.discount}%
            </>
          ) : (
            <>
              <Tag className="h-3 w-3" />
              تخفیف
            </>
          )}
        </Badge>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {offer.title}
        </h3>
        <p className="text-sm text-foreground/60 leading-relaxed">
          {offer.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <CountdownTimer expiryDate={offer.expiryDate} />
        <Button variant="secondary" size="sm">
          استفاده از پیشنهاد
        </Button>
      </div>
    </Card>
  );
}
```

- [ ] **Step 6: Create TestimonialCard.tsx**

```tsx
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating
                ? "text-primary fill-primary"
                : "text-border"
            )}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/70 leading-relaxed mb-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-primary">
          {testimonial.name.charAt(0)}
        </div>
        <span className="text-sm font-medium text-foreground">
          {testimonial.name}
        </span>
      </div>
    </Card>
  );
}

import { cn } from "@/lib/utils";
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/Card.tsx src/components/ui/Input.tsx src/components/shared/
git commit -m "feat: add card, input, and domain-specific card components"
```

---

### Task 7: Status Components

**Covers:** [S6, S9]

**Files:**
- Create: `src/components/ui/EmptyState.tsx`
- Create: `src/components/ui/ErrorState.tsx`
- Create: `src/components/ui/StarRating.tsx`

**Interfaces:**
- Produces: EmptyState, ErrorState, StarRating components

- [ ] **Step 1: Create EmptyState.tsx**

```tsx
import { Inbox } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-muted rounded-full mb-4">
        <Inbox className="h-8 w-8 text-foreground/40" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground/60 max-w-md mb-6">{description}</p>
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create ErrorState.tsx**

```tsx
"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "خطا در بارگذاری",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-destructive/10 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground/60 max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create StarRating.tsx**

```tsx
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < rating
              ? "text-primary fill-primary"
              : "text-border fill-transparent"
          )}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/EmptyState.tsx src/components/ui/ErrorState.tsx src/components/ui/StarRating.tsx
git commit -m "feat: add status components (EmptyState, ErrorState, StarRating)"
```

---

## Phase 3: Pages

### Task 8: Landing Page

**Covers:** [S3, S5]

**Files:**
- Create: `src/components/landing/HeroSection.tsx`
- Create: `src/components/landing/StoryChapter.tsx`
- Create: `src/components/landing/ServicesPreview.tsx`
- Create: `src/components/landing/PackagesPreview.tsx`
- Create: `src/components/landing/TestimonialsSection.tsx`
- Create: `src/components/landing/CTASection.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/loading.tsx`

**Interfaces:**
- Consumes: Data from `src/data/`, UI components, ScrollReveal
- Produces: Complete landing page with 6 storytelling sections

- [ ] **Step 1: Create HeroSection.tsx**

```tsx
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <p className="text-primary font-medium mb-4">کلینیک تخصصی زیبایی</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            زیبایی طبیعی،
            <br />
            <span className="text-primary">اعتماد به نفس</span> واقعی
          </h1>
          <p className="text-lg sm:text-xl text-foreground/60 mb-8 max-w-xl leading-relaxed">
            در کلینیک زیبا، با بهترین متخصصان و پیشرفته‌ترین تجهیزات، زیبایی
            طبیعی خود را کشف کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                رزرو مشاوره رایگان
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg">
                مشاهده خدمات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create StoryChapter.tsx**

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface StoryChapterProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  reverse?: boolean;
}

export function StoryChapter({
  eyebrow,
  title,
  description,
  children,
  reverse = false,
}: StoryChapterProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:direction-rtl" : ""
          }`}
        >
          <ScrollReveal>
            <div>
              <p className="text-primary font-medium mb-3">{eyebrow}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-foreground/60 leading-relaxed">{description}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>{children}</ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create ServicesPreview.tsx**

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFeaturedServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ServicesPreview() {
  const featuredServices = getFeaturedServices();

  return (
    <section className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-3">تخصص ما</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              خدمات تخصصی زیبایی
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              با استفاده از پیشرفته‌ترین تجهیزات و بهترین متخصصان، خدمات متنوعی
              برای زیبایی و جوانسازی ارائه می‌دهیم.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors"
            >
              مشاهده همه خدمات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create PackagesPreview.tsx**

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PackagesPreview() {
  const packages = getPackages();

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-3">پکیج‌های ویژه</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              پکیج‌های مراقبت از پوست
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              پکیج‌های ویژه ما با قیمت‌های مناسب و خدمات متنوع، بهترین انتخاب
              برای مراقبت از پوست شما هستند.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 100}>
              <PackageCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors"
            >
              مشاهده همه پکیج‌ها
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create TestimonialsSection.tsx**

```tsx
import { getTestimonials } from "@/data";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TestimonialsSection() {
  const testimonials = getTestimonials();

  return (
    <section className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-3">نظرات مشتریان</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              تجربه مراجعین ما
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              رضایت مشتریان ما بزرگترین سرمایه ماست. نظرات آنها را درباره خدمات
              کلینیک بخوانید.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 100}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create CTASection.tsx**

```tsx
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-foreground to-foreground/90 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              همین الان رزرو کنید
            </h2>
            <p className="text-background/70 mb-8 leading-relaxed">
              برای دریافت مشاوره رایگان و رزرو وقت با ما تماس بگیرید. تیم
              متخصص ما آماده پاسخگویی به سوالات شماست.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="tel:+989121234567">
                <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary-light">
                  <Phone className="h-5 w-5" />
                  ۰۹۱۲-۱۲۳-۴۵۶۷
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="border-background/30 text-background hover:bg-background/10">
                  فرم تماس
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-background/60">
              <MapPin className="h-4 w-4" />
              <span>تهران، خیابان ولیعصر، نبش کوچه گل</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Update page.tsx (Landing Page)**

Replace `src/app/page.tsx`:

```tsx
import { HeroSection } from "@/components/landing/HeroSection";
import { StoryChapter } from "@/components/landing/StoryChapter";
import { ServicesPreview } from "@/components/landing/ServicesPreview";
import { PackagesPreview } from "@/components/landing/PackagesPreview";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Home() {
  return (
    <>
      <HeroSection />

      <StoryChapter
        eyebrow="داستان ما"
        title="بیش از ۱۰ سال تجربه در زیبایی"
        description="کلینیک زیبا با بیش از ۱۰ سال تجربه در زمینه خدمات زیبایی، پوست و مو، همواره در تلاش است تا بهترین خدمات را با بالاترین کیفیت به مراجعین ارائه دهد. تیم متخصص ما متشکل از بهترین پزشکان و متخصصان زیبایی است."
      >
        <div className="bg-muted rounded-2xl p-8 aspect-video flex items-center justify-center">
          <p className="text-foreground/40 text-sm">تصویر کلینیک</p>
        </div>
      </StoryChapter>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ServicesPreview />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <PackagesPreview />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <TestimonialsSection />
      </Suspense>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 8: Create loading.tsx**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="min-h-[90vh] flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-16 w-96 mb-4" />
          <Skeleton className="h-16 w-64 mb-6" />
          <Skeleton className="h-6 w-80 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Verify landing page renders**

Run: `pnpm dev`
Expected: Landing page loads with RTL layout, Vazirmatn font, all 6 sections visible

- [ ] **Step 10: Commit**

```bash
git add src/components/landing/ src/app/page.tsx src/app/loading.tsx
git commit -m "feat: add landing page with scroll storytelling sections"
```

---

### Task 9: Services Pages

**Covers:** [S3]

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/app/services/loading.tsx`
- Create: `src/app/services/error.tsx`
- Create: `src/app/services/[slug]/page.tsx`
- Create: `src/app/services/[slug]/loading.tsx`
- Create: `src/app/services/[slug]/error.tsx`
- Create: `src/app/services/[slug]/not-found.tsx`

**Interfaces:**
- Consumes: Service data, ServiceCard component
- Produces: Services list page and detail page with all states

- [ ] **Step 1: Create services/page.tsx**

```tsx
import { Suspense } from "react";
import { getServices } from "@/data";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "خدمات",
  description: "لیست خدمات تخصصی زیبایی، پوست و مو کلینیک زیبا",
};

function ServicesList() {
  const services = getServices();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ScrollReveal key={service.id} delay={index * 50}>
          <ServiceCard service={service} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            خدمات تخصصی ما
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            مجموعه‌ای متنوع از خدمات تخصصی زیبایی، پوست و مو با بهترین کیفیت
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        }
      >
        <ServicesList />
      </Suspense>
    </Section>
  );
}
```

- [ ] **Step 2: Create services/loading.tsx**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create services/error.tsx**

```tsx
"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ErrorState
          message={error.message || "خطا در بارگذاری خدمات. لطفاً دوباره تلاش کنید."}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create services/[slug]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getServices, getServiceBySlug } from "@/data";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

const categoryLabels: Record<string, string> = {
  skin: "پوست",
  hair: "مو",
  body: "بدن",
  face: "صورت",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "خدمت یافت نشد" };
  return {
    title: service.title,
    description: service.description,
  };
}

export async function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary mb-8 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به لیست خدمات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="accent">{categoryLabels[service.category]}</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-foreground/60 mb-6 leading-relaxed">
              {service.description}
            </p>
            <div className="prose prose-lg text-foreground/70 mb-8">
              <p>{service.longDescription}</p>
            </div>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-foreground/50">قیمت</p>
                  <p className="font-bold text-primary">{formatPrice(service.price)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-foreground/50">مدت زمان</p>
                  <p className="font-bold">{service.duration}</p>
                </div>
              </div>
            </div>

            <Link href="/contact">
              <Button size="lg">رزرو وقت</Button>
            </Link>
          </div>

          {/* Image placeholder */}
          <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center">
            <p className="text-foreground/40">تصویر خدمت</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: Create services/[slug]/loading.tsx**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Skeleton className="h-6 w-20 mb-4" />
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-24 w-full mb-8" />
            <div className="flex gap-6 mb-8">
              <Skeleton className="h-16 w-32" />
              <Skeleton className="h-16 w-32" />
            </div>
            <Skeleton className="h-12 w-32" />
          </div>
          <Skeleton className="aspect-square" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create services/[slug]/error.tsx**

```tsx
"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ErrorState
          message={error.message || "خطا در بارگذاری جزئیات خدمت. لطفاً دوباره تلاش کنید."}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create services/[slug]/not-found.tsx**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">خدمت یافت نشد</h1>
        <p className="text-foreground/60 mb-8">
          متأسفانه خدمت مورد نظر شما یافت نشد.
        </p>
        <Link href="/services">
          <Button>بازگشت به لیست خدمات</Button>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Verify services pages**

Run: `pnpm dev`
Expected: `/services` shows all services, `/services/botox` shows detail, invalid slug shows 404

- [ ] **Step 9: Commit**

```bash
git add src/app/services/
git commit -m "feat: add services list and detail pages with loading/error/404 states"
```

---

### Task 10: Packages Page

**Covers:** [S3]

**Files:**
- Create: `src/app/packages/page.tsx`
- Create: `src/app/packages/loading.tsx`
- Create: `src/app/packages/error.tsx`

**Interfaces:**
- Consumes: Package data, PackageCard component
- Produces: Packages page with pricing cards

- [ ] **Step 1: Create packages/page.tsx**

```tsx
import { Suspense } from "react";
import { getPackages } from "@/data";
import { PackageCard } from "@/components/shared/PackageCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "پکیج‌ها",
  description: "پکیج‌های ویژه مراقبت از پوست کلینیک زیبا",
};

function PackagesList() {
  const packages = getPackages();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {packages.map((pkg, index) => (
        <ScrollReveal key={pkg.id} delay={index * 100}>
          <PackageCard pkg={pkg} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            پکیج‌های ویژه
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            پکیج‌های مراقبت از پوست با قیمت‌های مناسب و خدمات متنوع
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        }
      >
        <PackagesList />
      </Suspense>
    </Section>
  );
}
```

- [ ] **Step 2: Create packages/loading.tsx**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create packages/error.tsx**

```tsx
"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ErrorState
          message={error.message || "خطا در بارگذاری پکیج‌ها. لطفاً دوباره تلاش کنید."}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify packages page**

Run: `pnpm dev`
Expected: `/packages` shows 3 pricing cards with features

- [ ] **Step 5: Commit**

```bash
git add src/app/packages/
git commit -m "feat: add packages page with pricing cards"
```

---

### Task 11: Offers Page

**Covers:** [S3]

**Files:**
- Create: `src/app/offers/page.tsx`
- Create: `src/app/offers/loading.tsx`
- Create: `src/app/offers/error.tsx`

**Interfaces:**
- Consumes: Offer data, OfferCard component
- Produces: Offers page with active promotions

- [ ] **Step 1: Create offers/page.tsx**

```tsx
import { Suspense } from "react";
import { getActiveOffers } from "@/data";
import { OfferCard } from "@/components/shared/OfferCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "پیشنهادات ویژه",
  description: "پیشنهادات و تخفیف‌های ویژه کلینیک زیبا",
};

export const dynamic = "force-dynamic";

function OffersList() {
  const offers = getActiveOffers();

  if (offers.length === 0) {
    return (
      <EmptyState
        title="پیشنهادی موجود نیست"
        description="در حال حاضر پیشنهاد فعالی وجود نارد. لطفاً بعداً دوباره بررسی کنید."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer, index) => (
        <ScrollReveal key={offer.id} delay={index * 100}>
          <OfferCard offer={offer} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function OffersPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            پیشنهادات ویژه
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            از تخفیف‌ها و پیشنهادات ویژه کلینیک زیبا بهره‌مند شوید
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        }
      >
        <OffersList />
      </Suspense>
    </Section>
  );
}
```

- [ ] **Step 2: Create offers/loading.tsx**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-56 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create offers/error.tsx**

```tsx
"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ErrorState
          message={error.message || "خطا در بارگذاری پیشنهادات. لطفاً دوباره تلاش کنید."}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify offers page**

Run: `pnpm dev`
Expected: `/offers` shows active offers with countdown timers

- [ ] **Step 5: Commit**

```bash
git add src/app/offers/
git commit -m "feat: add offers page with active promotions"
```

---

### Task 12: About Page

**Covers:** [S3]

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/about/loading.tsx`
- Create: `src/app/about/error.tsx`
- Create: `src/components/shared/TeamMember.tsx`

**Interfaces:**
- Consumes: Team data, ScrollReveal
- Produces: About page with team section

- [ ] **Step 1: Create TeamMember.tsx**

```tsx
import { Card } from "@/components/ui/Card";
import { TeamMember as TeamMemberType } from "@/lib/types";

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <Card className="p-6 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-primary">
        {member.name.charAt(0)}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
      <p className="text-sm text-primary mb-3">{member.role}</p>
      <p className="text-sm text-foreground/60 leading-relaxed">{member.bio}</p>
    </Card>
  );
}
```

- [ ] **Step 2: Create about/page.tsx**

```tsx
import { Suspense } from "react";
import { getTeam } from "@/data";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StoryChapter } from "@/components/landing/StoryChapter";
import { TeamMember } from "@/components/shared/TeamMember";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Award, Users, Heart, Clock } from "lucide-react";

export const metadata = {
  title: "درباره ما",
  description: "درباره کلینیک زیبا و تیم متخصص ما بیشتر بدانید",
};

const stats = [
  { icon: Clock, value: "۱۰+", label: "سال تجربه" },
  { icon: Users, value: "۵۰۰۰+", label: "مشتری راضی" },
  { icon: Award, value: "۲۰+", label: "جایزه و گواهی" },
  { icon: Heart, value: "۹۸٪", label: "رضایت مشتریان" },
];

function TeamGrid() {
  const team = getTeam();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member, index) => (
        <ScrollReveal key={member.id} delay={index * 100}>
          <TeamMember member={member} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Section>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              درباره کلینیک زیبا
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              بیش از ۱۰ سال تجربه در ارائه بهترین خدمات زیبایی و جوانسازی
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="text-center p-6 bg-surface rounded-xl border border-border">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <StoryChapter
        eyebrow="چشم‌انداز ما"
        title="زیبایی، اعتماد به نفس، زندگی"
        description="ما باور داریم که زیبایی تنها ظاهر نیست، بلکه اعتماد به نفسی است که از درون می‌آید. تیم متخصص ما با بهترین تجهیزات و روش‌ها، به شما کمک می‌کند تا نسخه بهتر خودتان باشید."
        reverse
      >
        <div className="bg-muted rounded-2xl p-8 aspect-video flex items-center justify-center">
          <p className="text-foreground/40 text-sm">تصویر محیط کلینیک</p>
        </div>
      </StoryChapter>

      <Section background="muted">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              تیم متخصص ما
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              بهترین متخصصان زیبایی در کنار شما هستند
            </p>
          </div>
        </ScrollReveal>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          }
        >
          <TeamGrid />
        </Suspense>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Create about/loading.tsx**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create about/error.tsx**

```tsx
"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ErrorState
          message={error.message || "خطا در بارگذاری صفحه درباره ما. لطفاً دوباره تلاش کنید."}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify about page**

Run: `pnpm dev`
Expected: `/about` shows stats, story chapter, and team members

- [ ] **Step 6: Commit**

```bash
git add src/app/about/ src/components/shared/TeamMember.tsx
git commit -m "feat: add about page with team section and stats"
```

---

### Task 13: Contact Page

**Covers:** [S3]

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/contact/loading.tsx`
- Create: `src/app/contact/error.tsx`
- Create: `src/components/shared/ContactForm.tsx`
- Create: `src/app/api/contact/route.ts`

**Interfaces:**
- Consumes: Input, Button, Textarea components
- Produces: Contact page with form and contact info

- [ ] **Step 1: Create ContactForm.tsx**

```tsx
"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "نام الزامی است";
    if (!phone) newErrors.phone = "شماره تماس الزامی است";
    if (message && message.length < 10) newErrors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          پیام شما ارسال شد
        </h3>
        <p className="text-foreground/60">
          تیم ما در اسرع وقت با شما تماس خواهد گرفت.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="نام کامل"
          name="name"
          placeholder="نام خود را وارد کنید"
          error={errors.name}
          required
        />
        <Input
          label="شماره تماس"
          name="phone"
          type="tel"
          placeholder="۰۹۱۲-۱۲۳-۴۵۶۷"
          error={errors.phone}
          required
        />
        <Textarea
          label="پیام (اختیاری)"
          name="message"
          placeholder="پیام خود را بنویسید..."
          rows={4}
          error={errors.message}
        />
        <Button
          type="submit"
          className="w-full gap-2"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === "loading" ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-destructive text-center">
            خطا در ارسال پیام. لطفاً دوباره تلاش کنید.
          </p>
        )}
      </form>
    </Card>
  );
}
```

- [ ] **Step 2: Create API route**

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "نام و شماره تماس الزامی هستند" },
        { status: 400 }
      );
    }

    // In production, you would send this to a database or email service
    console.log("Contact form submission:", { name, phone, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "خطا در پردازش درخواست" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Create contact/page.tsx**

```tsx
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/shared/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "تماس با ما",
  description: "با کلینیک زیبا تماس بگیرید و وقت رزرو کنید",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "آدرس",
    value: "تهران، خیابان ولیعصر، نبش کوچه گل، پلاک ۱۲",
  },
  {
    icon: Phone,
    title: "تلفن",
    value: "۰۹۱۲-۱۲۳-۴۵۶۷",
  },
  {
    icon: Mail,
    title: "ایمیل",
    value: "info@ziba-clinic.ir",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه ۹ صبح تا ۸ شب",
  },
];

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              تماس با ما
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              برای دریافت مشاوره یا رزرو وقت با ما تماس بگیرید
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <ScrollReveal>
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/60">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Map Placeholder */}
          <ScrollReveal delay={100}>
            <div className="bg-muted rounded-xl aspect-square flex items-center justify-center">
              <p className="text-foreground/40 text-sm">نقشه</p>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={200}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Create contact/loading.tsx**

```tsx
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
          <Skeleton className="aspect-square" />
          <Skeleton className="h-80" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create contact/error.tsx**

```tsx
"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ErrorState
          message={error.message || "خطا در بارگذاری صفحه تماس. لطفاً دوباره تلاش کنید."}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Verify contact page**

Run: `pnpm dev`
Expected: `/contact` shows contact info, map placeholder, and form with validation

- [ ] **Step 7: Commit**

```bash
git add src/app/contact/ src/components/shared/ContactForm.tsx src/app/api/
git commit -m "feat: add contact page with form, validation, and API route"
```

---

## Phase 4: States & Polish

### Task 14: Global Error and 404 States

**Covers:** [S9]

**Files:**
- Create: `src/app/not-found.tsx`
- Create: `src/app/error.tsx`

**Interfaces:**
- Produces: Global error boundary and 404 page

- [ ] **Step 1: Create global not-found.tsx**

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          صفحه یافت نشد
        </h2>
        <p className="text-foreground/60 mb-8 max-w-md">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
        </p>
        <Link href="/">
          <Button>بازگشت به خانه</Button>
        </Link>
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Create global error.tsx**

```tsx
"use client";

import { Container } from "@/components/layout/Container";
import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center">
        <ErrorState
          message={error.message || "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید."}
          onRetry={reset}
        />
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Verify error states**

Run: `pnpm dev`
Expected: Navigate to non-existent page shows 404, global error boundary catches crashes

- [ ] **Step 4: Commit**

```bash
git add src/app/not-found.tsx src/app/error.tsx
git commit -m "feat: add global 404 and error boundary pages"
```

---

### Task 15: Final Build Verification

**Covers:** [S10, S11]

**Files:**
- Verify all pages build without errors
- Verify no broken links

**Interfaces:**
- Consumes: All implemented pages and components
- Produces: Clean production build

- [ ] **Step 1: Run production build**

Run: `pnpm build`
Expected: Build succeeds without errors

- [ ] **Step 2: Check for TypeScript errors**

Run: `pnpm tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Run linter**

Run: `pnpm lint`
Expected: No lint errors

- [ ] **Step 4: Start production server and test all routes**

Run: `pnpm start`
Expected: All routes accessible:
- `/` (landing)
- `/services` (services list)
- `/services/botox` (service detail)
- `/services/laser-hair-removal` (service detail)
- `/packages` (pricing)
- `/offers` (promotions)
- `/about` (about)
- `/contact` (contact form)
- `/nonexistent` (404 page)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final verification and polish"
```

---

## Summary

| Phase | Tasks | Components |
|-------|-------|------------|
| Foundation | 1-3 | Design system, types, mock data |
| Layout & UI | 4-7 | Header, Footer, Button, Card, etc. |
| Pages | 8-13 | Landing, Services, Packages, Offers, About, Contact |
| States | 14-15 | Error states, build verification |

**Total Files Created:** ~40 files
**Total Components:** ~25 components
**Pages:** 7 routes with loading/error states
