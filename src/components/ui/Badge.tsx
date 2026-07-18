import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "accent";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variants = {
    default: "bg-muted text-foreground/60",
    success: "bg-success/10 text-success",
    warning: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
