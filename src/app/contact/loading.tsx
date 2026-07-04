import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
          <Skeleton className="aspect-square" />
          <Skeleton className="h-80" />
        </div>
      </div>
    </div>
  );
}
