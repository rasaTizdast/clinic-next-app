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
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="p-6 bg-destructive/10 rounded-[2rem] mb-8">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-base text-foreground/70 max-w-md mb-8 font-light">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="gap-2 px-6 py-3 rounded-xl">
          <RefreshCw className="h-4 w-4" />
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}
