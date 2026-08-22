"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          مشکلی پیش آمد
        </h2>
        <p className="text-foreground/60 mb-8 leading-relaxed font-light">
          متأسفانه در بارگذاری این صفحه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.
        </p>
        <button
          onClick={reset}
          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-colors duration-300 shadow-md shadow-primary/20"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
