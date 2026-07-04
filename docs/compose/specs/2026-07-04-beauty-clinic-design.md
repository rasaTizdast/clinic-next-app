# Ziba Beauty Clinic — Design Spec

> [!NOTE]
> This document may not reflect the current implementation.
> See the final report for up-to-date state:
> [Final Report](../reports/beauty-clinic.md)

## [S1] Problem

Build a Persian (RTL) beauty clinic website as an MVP with a modern storytelling scroll landing page, consistent design system, and well-thought-out pages for services, packages, offers, about, and contact. No empty pages or broken links. Each page must handle loading, error, success, and empty states.

## [S2] Solution Overview

A Next.js 16 application with:
- RTL-first layout with Vazirmatn Persian font
- Warm creamy white design system with rose gold accent
- Scroll storytelling landing page with parallax reveals
- ISR for static pages, SSR for offers, CSR for contact form
- Suspense boundaries for async data loading
- Mock data layer (no backend required for MVP)

## [S3] Pages & Routes

| Route | Page | Rendering | Description |
|-------|------|-----------|-------------|
| `/` | Landing | ISR (60s) | Scroll storytelling with 6 chapters |
| `/services` | Services | ISR (3600s) | Grid of all services with filtering |
| `/services/[slug]` | Service Detail | ISR (3600s) | Full service page with booking CTA |
| `/packages` | Packages | ISR (3600s) | Pricing cards with features |
| `/offers` | Offers | SSR | Current promotions with countdown |
| `/about` | About | ISR (3600s) | Clinic story, team, stats |
| `/contact` | Contact | CSR | Form with server action, map placeholder |

## [S4] Design System Tokens

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#FDF8F0` | Page background (creamy white) |
| `--color-foreground` | `#2D2A26` | Primary text |
| `--color-primary` | `#C4956A` | Rose gold — CTAs, accents, highlights |
| `--color-primary-light` | `#D4AD8A` | Hover states, lighter accents |
| `--color-secondary` | `#E8D5C4` | Blush — card backgrounds, subtle fills |
| `--color-accent` | `#8B9E7C` | Sage green — secondary accents, badges |
| `--color-muted` | `#F5F0EB` | Subtle backgrounds, hover states |
| `--color-border` | `#E8E2DA` | Borders, dividers |
| `--color-destructive` | `#C25450` | Error states, destructive actions |
| `--color-success` | `#6B8F5E` | Success states, confirmations |
| `--color-surface` | `#FFFFFF` | Card backgrounds |

### Typography
| Role | Font | Weight | Size (rem) |
|------|------|--------|------------|
| Display | Vazirmatn | 900 | 3.5 / 2.5 / 2 |
| Heading 1 | Vazirmatn | 700 | 2.5 / 2 / 1.75 |
| Heading 2 | Vazirmatn | 700 | 2 / 1.75 / 1.5 |
| Heading 3 | Vazirmatn | 600 | 1.5 / 1.25 / 1.125 |
| Body | Vazirmatn | 400 | 1.125 / 1 / 0.875 |
| Small | Vazirmatn | 400 | 0.875 / 0.75 |
| Caption | Vazirmatn | 300 | 0.75 |

### Spacing Scale
4px base: 1=4, 2=8, 3=12, 4=16, 5=20, 6=24, 8=32, 10=40, 12=48, 16=64, 20=80, 24=96

### Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(45,42,38,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 12px rgba(45,42,38,0.08)` | Cards |
| `--shadow-lg` | `0 8px 24px rgba(45,42,38,0.12)` | Elevated elements |
| `--shadow-xl` | `0 16px 48px rgba(45,42,38,0.16)` | Modals, hero |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Small elements |
| `--radius-md` | 12px | Cards, buttons |
| `--radius-lg` | 16px | Large cards, modals |
| `--radius-xl` | 24px | Hero sections, feature cards |
| `--radius-full` | 9999px | Pills, avatars |

## [S5] Landing Page Storytelling Flow

1. **Hero Section** — Full viewport height. Clinic name "کلینیک زیبا" with tagline. Background gradient from `--color-background` to `--color-secondary`. Floating decorative elements. CTA button.

2. **About Teaser** — "داستان ما" (Our Story). Scroll-triggered fade-in. Brief text about clinic philosophy. Small image placeholder.

3. **Services Preview** — "خدمات ما" (Our Services). 3-4 featured service cards with icons. Staggered entrance animation.

4. **Packages Preview** — "پکیج‌های ویژه" (Special Packages). 2-3 featured packages with pricing. Highlight popular package.

5. **Testimonials** — "نظرات مشتریان" (Client Reviews). Carousel or stacked cards. Star ratings, client names.

6. **CTA Section** — "همین الان رزرو کنید" (Book Now). Final call to action with contact info and booking button.

## [S6] Component Library

### Layout Components
- `Header` — Fixed top nav, RTL-aware. Logo left (in RTL), nav links right. Mobile hamburger menu.
- `Footer` — 4-column grid (RTL: right to left). Logo, quick links, services, contact info.
- `Container` — Max-width wrapper with responsive padding.
- `Section` — Vertical spacing, optional background variants.

### UI Components
- `Button` — Primary (rose gold), secondary (outlined), ghost. Sizes: sm, md, lg.
- `Card` — Service/package/offer card with image, title, description, CTA.
- `Badge` — Status indicators (new, popular, discount).
- `Input` — Text, email, phone, textarea. RTL-aware with labels.
- `Modal` — Confirmation dialogs, booking forms.
- `Skeleton` — Loading placeholders matching component shapes.
- `EmptyState` — Icon + message + CTA for empty lists.
- `ErrorState` — Error message with retry button.
- `StarRating` — Visual star display.
- `CountdownTimer` — For offer expiration.
- `ScrollReveal` — Intersection Observer wrapper for fade-in animations.

### Page-Specific Components
- `HeroSection` — Landing page hero with parallax.
- `StoryChapter` — Reusable scroll-triggered content block.
- `ServiceCard` — Service listing card.
- `PackageCard` — Pricing package card with feature list.
- `OfferCard` — Promotion card with countdown.
- `TestimonialCard` — Client review card.
- `ContactForm` — Multi-field form with validation.
- `TeamMember` — About page team grid item.

## [S7] Data Layer (Mock)

All data lives in `src/data/` as TypeScript files with typed arrays. No API calls for MVP.

Files:
- `services.ts` — 8-10 beauty services with slug, title, description, price, duration, category, image placeholder
- `packages.ts` — 3-4 pricing tiers with features, pricing, popular flag
- `offers.ts` — 2-3 active promotions with title, description, discount, expiry date
- `testimonials.ts` — 5-6 client reviews with name, text, rating, avatar placeholder
- `team.ts` — 3-4 team members with name, role, bio, image placeholder

## [S8] State Management

- URL state: `useSearchParams` for filtering (wrapped in Suspense)
- Form state: Local `useState` for contact form
- No global state needed for MVP

## [S9] Error Handling

Each page implements:
- `error.tsx` — Error boundary with retry button
- `loading.tsx` — Skeleton loading state
- `not-found.tsx` — 404 with navigation back

Components implement:
- Loading state: Skeleton shimmer
- Error state: Inline error with retry
- Empty state: Illustrated message with CTA
- Success state: Toast/inline confirmation

## [S10] Accessibility

- RTL `dir="rtl"` on `<html>`
- `lang="fa"` for Persian
- Minimum 4.5:1 contrast ratio
- Visible focus rings on all interactive elements
- `aria-label` on icon-only buttons
- Semantic HTML (nav, main, section, article)
- Skip-to-content link
- Keyboard navigation support
- `prefers-reduced-motion` respected

## [S11] Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, stacked |
| Tablet | 640-1024px | 2-column grid |
| Desktop | > 1024px | Full layout, 3-4 columns |

## [S12] File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with RTL, fonts, Header/Footer
│   ├── page.tsx            # Landing page
│   ├── loading.tsx         # Global loading
│   ├── error.tsx           # Global error
│   ├── not-found.tsx       # Global 404
│   ├── services/
│   │   ├── page.tsx        # Services list
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [slug]/
│   │       ├── page.tsx    # Service detail
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── not-found.tsx
│   ├── packages/
│   │   ├── page.tsx        # Packages listing
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── offers/
│   │   ├── page.tsx        # Active offers
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── about/
│   │   ├── page.tsx        # About page
│   │   ├── loading.tsx
│   │   └── error.tsx
│   └── contact/
│       ├── page.tsx        # Contact form
│       ├── loading.tsx
│       └── error.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── StarRating.tsx
│   │   └── ScrollReveal.tsx
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── StoryChapter.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── PackagesPreview.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   └── shared/
│       ├── ServiceCard.tsx
│       ├── PackageCard.tsx
│       ├── OfferCard.tsx
│       ├── TestimonialCard.tsx
│       ├── ContactForm.tsx
│       └── TeamMember.tsx
├── data/
│   ├── services.ts
│   ├── packages.ts
│   ├── offers.ts
│   ├── testimonials.ts
│   └── team.ts
├── lib/
│   ├── types.ts            # Shared TypeScript interfaces
│   └── utils.ts            # Helper functions (cn, formatDate, etc.)
└── styles/
    └── globals.css          # Tailwind + design tokens
```

## [S13] Implementation Order

1. Design system setup (globals.css, Tailwind config, fonts)
2. Layout components (Header, Footer, Container)
3. UI component library (Button, Card, Skeleton, etc.)
4. Mock data layer
5. Landing page with all sections
6. Services pages
7. Packages page
8. Offers page
9. About page
10. Contact page
11. Error/loading/empty states
12. Final polish and testing
