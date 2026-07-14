"use client";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label.replace(/\s/g, "-");

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-foreground/80"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full px-5 py-4 text-base bg-background border border-border/60 rounded-xl",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          "placeholder:text-foreground/30",
          "transition-all duration-300",
          error && "border-destructive focus:ring-destructive/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
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
    <div className="space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-foreground/80"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-5 py-4 text-base bg-background border border-border/60 rounded-xl resize-none",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          "placeholder:text-foreground/30",
          "transition-all duration-300",
          error && "border-destructive focus:ring-destructive/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
