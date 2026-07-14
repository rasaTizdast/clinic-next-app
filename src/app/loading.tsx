export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>
        <p className="text-foreground/70 font-light tracking-wide">در حال بارگذاری...</p>
      </div>
    </div>
  );
}
