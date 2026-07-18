"use client";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label.replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-foreground/60"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-3 text-sm bg-background border border-border/40 rounded-xl",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "placeholder:text-foreground/25",
          "transition-all duration-200",
          error && "border-destructive focus:ring-destructive/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label.replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-foreground/60"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-4 py-3 text-sm bg-background border border-border/40 rounded-xl resize-none",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "placeholder:text-foreground/25",
          "transition-all duration-200",
          error && "border-destructive focus:ring-destructive/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
