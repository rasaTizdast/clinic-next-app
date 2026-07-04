import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="min-h-[90vh] flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-16 w-96 mb-4" />
          <Skeleton className="h-16 w-64 mb-6" />
          <Skeleton className="h-6 w-80 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}
