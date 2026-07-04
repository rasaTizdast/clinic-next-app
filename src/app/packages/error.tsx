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
