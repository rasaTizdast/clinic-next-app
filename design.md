# Design — کلینیک زیبایی باران (Baran Beauty Clinic)

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
editorial

## Macrostructure family
- Marketing pages (Home): Sanctuary Hero — full-viewport image-led hero with elegant typography, integrated CTA, and trust bar
- Listing pages (Services, Packages, Products): Split Studio variant — grid with split hero
- Detail pages (Service detail, Product detail): Long Document variant — editorial prose
- Info pages (About, Contact): Stat-Led variant — data-driven with editorial voice

## Theme
Custom luxury palette — warm rose-gold anchor (hue ~50)

- `--color-paper`   oklch(97% 0.010 50)
- `--color-paper-2` oklch(94% 0.012 50)
- `--color-ink`     oklch(18% 0.010 50)
- `--color-ink-2`   oklch(40% 0.008 50)
- `--color-rule`    oklch(82% 0.008 50)
- `--color-accent`  oklch(62% 0.14 55)
- `--color-focus`   oklch(55% 0.16 55)

## Typography
- Display: Vazirmatn, weight 900, style normal
- Body: Vazirmatn, weight 300
- Labels: Vazirmatn, weight 600, letter-spacing 0.08em, uppercase
- Display tracking: -0.03em (marquee), -0.02em (section heads)
- Type scale anchor: --text-marquee = clamp(3.5rem, 10vw + 1rem, 9rem)

## Spacing
4-point named scale:
- --space-3xs: 0.125rem (2px)
- --space-2xs: 0.25rem (4px)
- --space-xs: 0.5rem (8px)
- --space-sm: 0.75rem (12px)
- --space-md: 1rem (16px)
- --space-lg: 1.5rem (24px)
- --space-xl: 2.5rem (40px)
- --space-2xl: 4rem (64px)
- --space-3xl: 6rem (96px)

## Motion
- Easings: cubic-bezier(0.16, 1, 0.3, 1) named --ease-out
- Reveal pattern: fade + slide-up (24px), 420ms, staggered 60ms per item
- Reduced-motion fallback: opacity-only, ≤ 150ms
- Duration tokens: --dur-micro: 120ms, --dur-short: 220ms, --dur-long: 420ms

## Microinteractions stance
- Silent success (no celebratory toasts)
- Hover delay 800ms · focus delay 0ms
- Button: translateY(-1px) on hover, translateY(0) on active

## CTA voice
- Primary CTA: filled accent (oklch(62% 0.14 55)), rounded-xl (16px), generous padding
- Secondary CTA: outlined, border rule color, rounded-xl
- Icon: ArrowLeft (RTL-flipped)

## Nav: N5 (Floating pill)
Fixed floating pill, detached from edges, soft blur backdrop, soft shadow.
Wordmark left, nav links center, CTA right.
Mobile: hamburger + wordmark only.

## Footer: Ft6 (Letter close)
Closes like a letter — "با عشق، تیم باران". Optional postscript with contact info.
Warm, personal, editorial-quiet.
