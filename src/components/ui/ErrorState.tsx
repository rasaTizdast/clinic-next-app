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
