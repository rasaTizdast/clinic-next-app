import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "article";
  background?: "default" | "muted" | "surface";
}

export function Section({
  children,
  className,
  containerClassName,
  as: Component = "section",
  background = "default",
}: SectionProps) {
  const bgClasses = {
    default: "",
    muted: "bg-muted/50",
    surface: "bg-surface",
  };

  return (
    <Component className={cn("py-20 sm:py-24 lg:py-28", bgClasses[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
