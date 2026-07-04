import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface StoryChapterProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  reverse?: boolean;
}

export function StoryChapter({
  eyebrow,
  title,
  description,
  children,
  reverse = false,
}: StoryChapterProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:direction-rtl" : ""
          }`}
        >
          <ScrollReveal>
            <div>
              <p className="text-primary font-medium mb-3">{eyebrow}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-foreground/60 leading-relaxed">{description}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>{children}</ScrollReveal>
        </div>
      </div>
    </section>
  );
}
