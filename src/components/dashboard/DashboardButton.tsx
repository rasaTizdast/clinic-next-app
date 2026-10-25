import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-[var(--dashboard-ink)] text-white shadow-md shadow-black/10 hover:-translate-y-0.5 hover:shadow-lg",
  secondary:
    "border border-[var(--dashboard-line)] bg-white text-[var(--dashboard-ink)] hover:border-[var(--dashboard-accent)] hover:text-[var(--dashboard-accent)]",
  ghost: "text-[var(--dashboard-muted)] hover:bg-white/80 hover:text-[var(--dashboard-ink)]",
  danger: "text-red-700 hover:bg-red-50",
} as const;

const sizes = {
  sm: "min-h-9 rounded-xl px-3 text-xs",
  md: "min-h-11 rounded-2xl px-4 text-sm",
  lg: "min-h-12 rounded-2xl px-5 text-sm",
} as const;

export function DashboardButton({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      data-slot="dashboard-button"
      type={type}
      className={cn(
        "dashboard-focus inline-flex items-center justify-center gap-2 font-bold transition-[transform,box-shadow,color,background-color,border-color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-55 motion-reduce:transition-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
