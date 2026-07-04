export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <span className="text-lg font-bold text-primary">کلینیک زیبا</span>
        <nav className="flex gap-6 text-sm text-foreground/70">
          <a href="/" className="hover:text-primary transition-colors">خانه</a>
          <a href="/services" className="hover:text-primary transition-colors">خدمات</a>
          <a href="/about" className="hover:text-primary transition-colors">درباره ما</a>
          <a href="/contact" className="hover:text-primary transition-colors">تماس</a>
        </nav>
      </div>
    </header>
  );
}
