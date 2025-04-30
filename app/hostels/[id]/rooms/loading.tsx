import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16">
      {/* Breadcrumb */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Skeleton className="h-10 w-64 md:w-96" />
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-40" />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-48" />
          </div>
        </div>

        {/* Room Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>

        {/* Room Type Summary */}
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>

        {/* Filters */}
        <Skeleton className="mb-6 h-32 w-full rounded-lg" />

        {/* Room Listing */}
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </div>
  )
}
