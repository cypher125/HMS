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
        {/* Room Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Skeleton className="h-10 w-64 md:w-96" />
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-48" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Room Images */}
            <Skeleton className="mb-8 h-[300px] w-full rounded-lg" />

            {/* Room Details */}
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>

          {/* Right Column - Application */}
          <div>
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
