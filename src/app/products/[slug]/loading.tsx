import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <Section>
      <Skeleton className="h-6 w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Skeleton className="aspect-square rounded-xl" />
        <div>
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-full mb-6" />
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </Section>
  );
}