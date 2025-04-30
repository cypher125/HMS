import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Dashboard Header Skeleton */}
        <Skeleton className="mb-8 h-32 w-full rounded-lg" />

        {/* Room Allocation Alert Skeleton */}
        <Skeleton className="mb-8 h-24 w-full rounded-lg" />

        {/* Application Status Skeleton */}
        <Skeleton className="mb-8 h-64 w-full rounded-lg" />

        {/* Tabs Skeleton */}
        <div className="mb-6 flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
