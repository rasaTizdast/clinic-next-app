import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Skeleton className="h-6 w-20 mb-4" />
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-24 w-full mb-8" />
            <div className="flex gap-6 mb-8">
              <Skeleton className="h-16 w-32" />
              <Skeleton className="h-16 w-32" />
            </div>
            <Skeleton className="h-12 w-32" />
          </div>
          <Skeleton className="aspect-square" />
        </div>
      </div>
    </div>
  );
}
