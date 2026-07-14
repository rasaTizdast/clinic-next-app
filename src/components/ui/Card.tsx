import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl border border-border shadow-sm overflow-hidden",
        hover &&
          "hover:shadow-xl hover:border-primary/15 hover-card",
        className
      )}
    >
      {children}
    </div>
  );
}
