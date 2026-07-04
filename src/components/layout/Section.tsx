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
    muted: "bg-muted",
    surface: "bg-surface",
  };

  return (
    <Component className={cn("py-16 sm:py-20 lg:py-24", bgClasses[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
