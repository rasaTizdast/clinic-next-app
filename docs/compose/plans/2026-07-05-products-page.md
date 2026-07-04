# Products Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the offers page with a products page displaying physical products (image, title, description) with individual detail pages.

**Architecture:** Static data file for products, ProductCard component for grid display, dynamic [slug] route for detail pages. Reuse existing patterns: Section, ScrollReveal, EmptyState.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS

## Global Constraints

- Persian/Farsi text for all user-facing content
- Use existing component patterns (Section, ScrollReveal, EmptyState, Skeleton)
- Images stored locally in `public/images/products/`
- Maintain RTL layout consistency

---

### Task 1: Create Product Type

**Covers:** Data model for products

**Files:**
- Modify: `src/lib/types.ts`

**Interfaces:**
- Produces: `Product` type used by data file and components

- [ ] **Step 1: Add Product interface to types.ts**

```typescript
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  price?: number;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add Product type definition"
```

---

### Task 2: Create Products Data

**Covers:** Static product data

**Files:**
- Create: `src/data/products.ts`
- Modify: `src/data/index.ts`

**Interfaces:**
- Consumes: `Product` type from Task 1
- Produces: `getProducts()`, `getProductBySlug()` functions

- [ ] **Step 1: Create products.ts with sample data**

```typescript
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
    ضد آفتاب SPF50",
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
```

- [ ] **Step 2: Update data/index.ts to export products**

Add to `src/data/index.ts`:
```typescript
export * from "./products";
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/data/products.ts src/data/index.ts
git commit -m "feat: add products data with getProducts and getProductBySlug"
```

---

### Task 3: Create ProductCard Component

**Covers:** Product card UI component

**Files:**
- Create: `src/components/shared/ProductCard.tsx`

**Interfaces:**
- Consumes: `Product` type from Task 1
- Produces: `ProductCard` component

- [ ] **Step 1: Create ProductCard.tsx**

```tsx
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-foreground/60 line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/ProductCard.tsx
git commit -m "feat: add ProductCard component"
```

---

### Task 4: Create Products List Page

**Covers:** Products page with grid layout

**Files:**
- Create: `src/app/products/page.tsx`
- Create: `src/app/products/loading.tsx`
- Create: `src/app/products/error.tsx`

**Interfaces:**
- Consumes: `getProducts()` from Task 2, `ProductCard` from Task 3

- [ ] **Step 1: Create products/page.tsx**

```tsx
import { Suspense } from "react";
import { getProducts } from "@/data";
import { ProductCard } from "@/components/shared/ProductCard";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: "محصولات",
  description: "محصولات مراقبت از پوست کلینیک زیبا",
};

function ProductsList() {
  const products = getProducts();

  if (products.length === 0) {
    return (
      <EmptyState
        title="محصولی موجود نیست"
        description="در حال حاضر محصولی وجود نارد. لطفاً بعداً دوباره بررسی کنید."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ScrollReveal key={product.id} delay={index * 100}>
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Section>
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            محصولات
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            محصولات مراقبت از پوست با کیفیت بالا
          </p>
        </div>
      </ScrollReveal>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        }
      >
        <ProductsList />
      </Suspense>
    </Section>
  );
}
```

- [ ] **Step 2: Create products/loading.tsx**

```tsx
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <Section>
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create products/error.tsx**

```tsx
"use client";

import { Section } from "@/components/layout/Section";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          خطا در بارگذاری محصولات
        </h2>
        <p className="text-foreground/60 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/products/
git commit -m "feat: add products list page with loading and error states"
```

---

### Task 5: Create Product Detail Page

**Covers:** Individual product detail pages

**Files:**
- Create: `src/app/products/[slug]/page.tsx`
- Create: `src/app/products/[slug]/loading.tsx`
- Create: `src/app/products/[slug]/error.tsx`
- Create: `src/app/products/[slug]/not-found.tsx`

**Interfaces:**
- Consumes: `getProductBySlug()` from Task 2

- [ ] **Step 1: Create products/[slug]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/data";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Section>
      <ScrollReveal>
        <Link
          href="/products"
          className="inline-flex items-center text-foreground/60 hover:text-foreground mb-8 transition-colors"
        >
          ← بازگشت به محصولات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {product.title}
            </h1>
            <p className="text-foreground/60 mb-6">{product.description}</p>
            {product.price && (
              <p className="text-2xl font-semibold text-primary mb-6">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>
            )}
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/80 leading-relaxed">
                {product.longDescription}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
```

- [ ] **Step 2: Create products/[slug]/loading.tsx**

```tsx
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <Section>
      <Skeleton className="h-6 w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Skeleton className="aspect-square rounded-xl" />
        <div>
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full mb-6" />
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create products/[slug]/error.tsx**

```tsx
"use client";

import { Section } from "@/components/layout/Section";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          خطا در بارگذاری محصول
        </h2>
        <p className="text-foreground/60 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Create products/[slug]/not-found.tsx**

```tsx
import Link from "next/link";
import { Section } from "@/components/layout/Section";

export default function ProductNotFound() {
  return (
    <Section>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          محصول یافت نشد
        </h2>
        <p className="text-foreground/60 mb-6">
          محصول مورد نظر شما وجود ندارد.
        </p>
        <Link
          href="/products"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-block"
        >
          بازگشت به محصولات
        </Link>
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/app/products/\[slug\]/
git commit -m "feat: add product detail page with loading, error, and not-found states"
```

---

### Task 6: Update Navigation

**Covers:** Header and Footer links

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: None (static link changes)

- [ ] **Step 1: Update Header.tsx navigation link**

Change in `src/components/layout/Header.tsx`:
```typescript
// Before
{ href: "/offers", label: "پیشنهادات" },

// After
{ href: "/products", label: "محصولات" },
```

- [ ] **Step 2: Update Footer.tsx navigation link**

Change in `src/components/layout/Footer.tsx`:
```typescript
// Before
{ href: "/offers", label: "پیشنهادات" },

// After
{ href: "/products", label: "محصولات" },
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "feat: update navigation links from offers to products"
```

---

### Task 7: Remove Offers Code

**Covers:** Clean up old offers implementation

**Files:**
- Delete: `src/app/offers/page.tsx`
- Delete: `src/app/offers/loading.tsx`
- Delete: `src/app/offers/error.tsx`
- Delete: `src/components/shared/OfferCard.tsx`
- Delete: `src/data/offers.ts`
- Modify: `src/data/index.ts`
- Modify: `src/lib/types.ts`

**Interfaces:**
- None (removal only)

- [ ] **Step 1: Delete offers page files**

```bash
rm -rf src/app/offers/
```

- [ ] **Step 2: Delete OfferCard component**

```bash
rm src/components/shared/OfferCard.tsx
```

- [ ] **Step 3: Delete offers data**

```bash
rm src/data/offers.ts
```

- [ ] **Step 4: Remove offers export from data/index.ts**

Remove from `src/data/index.ts`:
```typescript
export * from "./offers";
```

- [ ] **Step 5: Remove Offer type from types.ts**

Remove from `src/lib/types.ts`:
```typescript
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
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: remove offers page and related code"
```

---

### Task 8: Add Placeholder Images

**Covers:** Product images for display

**Files:**
- Create: `public/images/products/` directory
- Create: Placeholder images (or use existing images)

**Interfaces:**
- None (asset files)

- [ ] **Step 1: Create products directory**

```bash
mkdir -p public/images/products
```

- [ ] **Step 2: Add placeholder images**

Copy any existing product-like images or create simple placeholder SVGs. For now, use colored rectangles or find suitable stock images.

- [ ] **Step 3: Commit**

```bash
git add public/images/products/
git commit -m "feat: add product placeholder images"
```

---

### Task 9: Final Verification

**Covers:** End-to-end testing

**Files:**
- None (verification only)

- [ ] **Step 1: Run development server**

```bash
npm run dev
```

- [ ] **Step 2: Test products page**

Navigate to `http://localhost:3000/products` and verify:
- Products grid displays correctly
- Each product shows image, title, description
- Clicking a product navigates to detail page

- [ ] **Step 3: Test product detail page**

Navigate to a product detail page and verify:
- Large image displays
- Title and description show
- Price displays (if applicable)
- Back link works

- [ ] **Step 4: Test navigation**

Verify Header and Footer links point to `/products`

- [ ] **Step 5: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 6: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address any issues found during verification"
```
