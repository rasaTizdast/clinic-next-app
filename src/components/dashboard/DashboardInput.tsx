import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function DashboardInput({ className, ...props }: Props) {
  return (
    <input
      data-slot="dashboard-input"
      className={cn(
        "dashboard-focus min-h-11 w-full rounded-xl border border-[var(--dashboard-line)] bg-white px-3 text-sm text-[var(--dashboard-ink)] transition outline-none placeholder:text-[var(--dashboard-muted)]/75 focus:border-[var(--dashboard-accent)] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}
