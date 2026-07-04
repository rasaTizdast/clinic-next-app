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
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-3 text-base bg-surface border border-border rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "placeholder:text-foreground/40",
          "transition-colors duration-200",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
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
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          "w-full px-4 py-3 text-base bg-surface border border-border rounded-lg resize-none",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "placeholder:text-foreground/40",
          "transition-colors duration-200",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
