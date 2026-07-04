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
