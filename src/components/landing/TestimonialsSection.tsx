import { getTestimonials } from "@/data";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TestimonialsSection() {
  const testimonials = getTestimonials();

  return (
    <section className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-3">نظرات مشتریان</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              تجربه مراجعین ما
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              رضایت مشتریان ما بزرگترین سرمایه ماست. نظرات آنها را درباره خدمات
              کلینیک بخوانید.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 100}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
